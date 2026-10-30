import { test } from './lib/test.mjs';

// Tablists on the docs page, by aria-label: Project · Inbox · Service · Range (sm, one disabled) · Filter deploys (pill)
// · Settings (vertical) · Regions (overflow).
const list = (label) => `[role="tablist"][aria-label="${label}"]`;
const tab = (label, n) => `${list(label)} > [role="tab"]:nth-child(${n})`;

// Everything a tablist's state should agree on, read in one go.
const state = (label) => {
  const l = document.querySelector(`[role="tablist"][aria-label="${label}"]`);
  const tabs = [...l.querySelectorAll('[role="tab"]')];
  const panels = tabs.map((t) => document.getElementById(t.getAttribute('aria-controls')));
  return {
    selected: tabs.map((t, i) => (t.getAttribute('aria-selected') === 'true' ? i : -1)).filter((i) => i >= 0),
    tabindex: tabs.map((t) => t.tabIndex),
    shown: panels.map((p, i) => (p && !p.hidden ? i : -1)).filter((i) => i >= 0),
    labelled: panels.every((p, i) => p && p.getAttribute('aria-labelledby') === tabs[i].id),
    focused: tabs.indexOf(document.activeElement),
  };
};
const expectSelected = async (page, assert, label, i, { focused } = {}) => {
  const s = await page.get(state, label);
  assert.deepEqual(s.selected, [i], `${label}: only tab ${i} is aria-selected`);
  assert.deepEqual(s.shown, [i], `${label}: only panel ${i} is shown`);
  assert.equal(s.tabindex.filter((t) => t === 0).length, 1, `${label}: one tab stop`);
  assert.equal(s.tabindex[i], 0, `${label}: the selected tab is the tab stop`);
  if (focused) assert.equal(s.focused, i, `${label}: focus is on tab ${i}`);
};
// Record dd:tabchange events on a tablist's wrapper.
const listen = (label) => {
  const root = document.querySelector(`[role="tablist"][aria-label="${label}"]`).closest('[data-dd-tabs]');
  window.__tc = [];
  root.addEventListener('dd:tabchange', (e) => window.__tc.push({
    tab: e.detail.tab?.textContent.trim(), panelOk: e.detail.panel?.id === e.detail.tab?.getAttribute('aria-controls'),
    previous: e.detail.previous?.textContent.trim(), bubbles: e.bubbles,
  }));
};

test('every tablist is wired on load: ids, aria-controls/labelledby, one selected tab and panel', async ({ open, assert }) => {
  const page = await open('components/tabs');
  for (const [label, sel] of [['Project', 0], ['Inbox', 0], ['Service', 0], ['Range', 1], ['Filter deploys', 0], ['Settings', 0], ['Regions', 0]]) {
    await expectSelected(page, assert, label, sel);
    assert.ok((await page.get(state, label)).labelled, `${label}: panels are labelled by their tabs`);
  }
});

test('click selects a tab, shows its panel and fires dd:tabchange once with tab, panel and previous', async ({ open, assert }) => {
  const page = await open('components/tabs');
  await page.get(listen, 'Project');
  await page.click(tab('Project', 3));
  await expectSelected(page, assert, 'Project', 2);
  await page.click(tab('Project', 3)); // pressing the current tab again is not a change
  const events = await page.get(() => window.__tc);
  assert.equal(events.length, 1, 'one event');
  assert.deepEqual(events[0], { tab: 'Logs', panelOk: true, previous: 'Overview', bubbles: true });
  assert.ok(await page.visible(`#${await page.attr(tab('Project', 3), 'aria-controls')}`), 'the Logs panel is visible');
});

test('← → Home End move focus and select in one step (automatic activation) and wrap', async ({ open, assert }) => {
  const page = await open('components/tabs');
  await page.get(listen, 'Project');
  await page.focus(tab('Project', 1));
  await page.press('ArrowRight');
  await expectSelected(page, assert, 'Project', 1, { focused: true });
  await page.press('ArrowLeft', 'ArrowLeft');
  await expectSelected(page, assert, 'Project', 3, { focused: true }); // wrapped to the last
  await page.press('Home');
  await expectSelected(page, assert, 'Project', 0, { focused: true });
  await page.press('End');
  await expectSelected(page, assert, 'Project', 3, { focused: true });
  await page.press('ArrowRight');
  await expectSelected(page, assert, 'Project', 0, { focused: true }); // wrapped to the first
  assert.equal((await page.get(() => window.__tc)).length, 6, 'a dd:tabchange per move');
  // ↑ ↓ do nothing on a horizontal list
  await page.press('ArrowDown');
  await expectSelected(page, assert, 'Project', 0, { focused: true });
});

test('Tab from the selected tab goes into its panel, Shift+Tab comes back', async ({ open, assert }) => {
  const page = await open('components/tabs');
  await page.click(tab('Inbox', 2));
  await page.press('Tab');
  assert.ok(await page.get(() => document.activeElement.getAttribute('role') === 'tabpanel' && document.activeElement.textContent.includes('assigned to you')), 'focus is on the Assigned panel');
  await page.press({ key: 'Tab', shift: true });
  await expectSelected(page, assert, 'Inbox', 1, { focused: true });
});

test('modified arrows (Alt/⌘ + ←) are left to the browser', async ({ open, assert }) => {
  const page = await open('components/tabs');
  await page.focus(tab('Project', 1));
  await page.press({ key: 'ArrowRight', alt: true }, { key: 'ArrowRight', meta: true });
  await expectSelected(page, assert, 'Project', 0, { focused: true });
});

test('disabled tabs are skipped by keys and ignore clicks', async ({ open, assert }) => {
  const page = await open('components/tabs');
  await page.get(listen, 'Range');
  assert.ok(await page.get((s) => document.querySelector(s).disabled, tab('Range', 5)), 'Custom is disabled');
  await page.click(tab('Range', 5));
  await expectSelected(page, assert, 'Range', 1);
  await page.focus(tab('Range', 2));
  await page.press('End');
  await expectSelected(page, assert, 'Range', 3, { focused: true }); // 30d, not Custom
  await page.press('ArrowRight');
  await expectSelected(page, assert, 'Range', 0, { focused: true }); // wraps past Custom to 1h
  await page.press('ArrowLeft');
  await expectSelected(page, assert, 'Range', 3, { focused: true });
  assert.ok(!(await page.get(() => window.__tc)).some((e) => e.tab === 'Custom'), 'never selected the disabled tab');
});

test('vertical tabs move with ↑ ↓ and ignore ← →', async ({ open, assert }) => {
  const page = await open('components/tabs');
  assert.equal(await page.attr(list('Settings'), 'aria-orientation'), 'vertical');
  await page.focus(tab('Settings', 1));
  await page.press('ArrowDown');
  await expectSelected(page, assert, 'Settings', 1, { focused: true });
  await page.press('ArrowRight', 'ArrowLeft');
  await expectSelected(page, assert, 'Settings', 1, { focused: true });
  await page.press('ArrowUp', 'ArrowUp');
  await expectSelected(page, assert, 'Settings', 4, { focused: true });
  assert.ok(await page.get(() => [...document.querySelectorAll('.dd-tabs--vertical [role="tabpanel"]')].find((p) => !p.hidden).textContent.includes('Billing')), 'Billing panel shown');
  await page.click(tab('Settings', 3));
  await expectSelected(page, assert, 'Settings', 2);
});

test('tab sets on one page are independent; rapid clicks settle on the last one', async ({ open, assert }) => {
  const page = await open('components/tabs');
  await page.click(tab('Inbox', 3));
  await page.click(tab('Service', 4));
  await expectSelected(page, assert, 'Inbox', 2);
  await expectSelected(page, assert, 'Service', 3);
  await expectSelected(page, assert, 'Project', 0);
  for (const n of [2, 3, 4, 1, 3, 2, 4]) await page.click(tab('Filter deploys', n));
  await expectSelected(page, assert, 'Filter deploys', 3);
});

test('dd.tabs.select (element or selector) and dd.tabs.init for tabs added later', async ({ open, assert }) => {
  const page = await open('components/tabs');
  await page.get(listen, 'Service');
  await page.get((s) => window.dd.tabs.select(document.querySelector(s)), tab('Service', 5));
  await expectSelected(page, assert, 'Service', 4);
  await page.get((s) => window.dd.tabs.select(s), tab('Service', 2));
  await expectSelected(page, assert, 'Service', 1);
  await page.get((s) => window.dd.tabs.select(s), tab('Range', 5)); // disabled: refused
  await expectSelected(page, assert, 'Range', 1);
  assert.deepEqual((await page.get(() => window.__tc)).map((e) => e.tab), ['Settings', 'Deploys32']);

  await page.get(() => {
    const d = document.createElement('div');
    d.className = 'dd-tabs'; d.setAttribute('data-dd-tabs', '');
    d.innerHTML = '<div class="dd-tabs__list" role="tablist" aria-label="Late"><button class="dd-tabs__tab" role="tab" type="button">One</button><button class="dd-tabs__tab" role="tab" type="button">Two</button></div><div role="tabpanel">first</div><div role="tabpanel">second</div>';
    document.querySelector('.doc-main').prepend(d);
    window.dd.tabs.init();
  });
  await expectSelected(page, assert, 'Late', 0);
  await page.click(tab('Late', 2));
  await expectSelected(page, assert, 'Late', 1);
});

test('at 375px the overflowing list scrolls the selected tab into view (keys and tap)', async ({ open, assert }) => {
  const page = await open('components/tabs', { width: 375 });
  const inView = (s) => { const t = document.querySelector(s); const l = t.closest('[role="tablist"]'); const a = t.getBoundingClientRect(), b = l.getBoundingClientRect(); return a.left >= b.left - 1 && a.right <= b.right + 1; };
  assert.ok(await page.get((s) => { const l = document.querySelector(s); return l.scrollWidth > l.clientWidth; }, list('Regions')), 'the Regions list overflows');
  assert.ok(await page.get(() => document.documentElement.scrollWidth <= innerWidth), 'the page itself does not scroll sideways');
  await page.focus(tab('Regions', 1));
  await page.press('End');
  await expectSelected(page, assert, 'Regions', 9, { focused: true });
  await page.waitFor(inView, { args: [tab('Regions', 10)] });
  await page.press('Home');
  await page.waitFor(inView, { args: [tab('Regions', 1)] });
  await page.tap(tab('Project', 4));
  await expectSelected(page, assert, 'Project', 3);
});

test('link tabs are left to navigate (no tab roles, no hijacking)', async ({ open, assert }) => {
  const page = await open('components/tabs');
  const nav = '.ex-stage nav[aria-label="Project"] .dd-tabs__list';
  assert.equal(await page.count(`${nav} [role="tab"]`), 0, 'no tab roles on link tabs');
  // A real href navigates: the script must not preventDefault it.
  await page.get((s) => { document.querySelector(`${s} > a:nth-child(3)`).setAttribute('href', '#analytics-view'); }, nav);
  await page.click(`${nav} > a:nth-child(3)`);
  assert.equal(await page.get(() => location.hash), '#analytics-view');
  // The docs demo moves aria-current on the placeholder links so the marker can be tried.
  await page.click(`${nav} > a:nth-child(2)`);
  assert.equal(await page.attr(`${nav} > a:nth-child(2)`, 'aria-current'), 'page');
  assert.equal(await page.count(`${nav} > [aria-current]`), 1);
});

test('dusk: the active tab has an ink marker, others none until hover; pill and vertical use tone', async ({ open, assert }) => {
  const page = await open('components/tabs', { theme: 'dusk' });
  assert.equal(await page.get(() => document.documentElement.dataset.theme), 'dusk');
  const marker = (s) => getComputedStyle(document.querySelector(s), '::after').backgroundColor;
  const bg = (s) => getComputedStyle(document.querySelector(s)).backgroundColor;
  const ink = await page.get(() => getComputedStyle(document.body).color);
  assert.equal(await page.get(marker, tab('Project', 1)), ink, 'selected marker is ink');
  assert.equal(await page.get(marker, tab('Project', 2)), 'rgba(0, 0, 0, 0)', 'unselected marker is clear');
  await page.hover(tab('Project', 2));
  await page.waitFor((s) => getComputedStyle(document.querySelector(s), '::after').backgroundColor !== 'rgba(0, 0, 0, 0)', { args: [tab('Project', 2)] });
  assert.notEqual(await page.get(marker, tab('Project', 2)), ink, 'hover marker is softer than the active one');
  assert.notEqual(await page.get(bg, tab('Filter deploys', 1)), 'rgba(0, 0, 0, 0)', 'selected pill has a tone');
  assert.notEqual(await page.get(bg, tab('Settings', 1)), 'rgba(0, 0, 0, 0)', 'selected vertical tab has a tone');
  await page.click(tab('Settings', 2));
  await page.waitFor((s) => getComputedStyle(document.querySelector(s)).backgroundColor === 'rgba(0, 0, 0, 0)', { args: [tab('Settings', 1)] });
});
