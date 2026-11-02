import { test } from './lib/test.mjs';

// Examples on the page, in order: 0 grouped · 1 line · 2 area · 3 hbars · 4 stacked · 5 100% bars · 6 donut · … · 9 empty.
const tagExamples = (page) => page.get(() => document.querySelectorAll('.ex').forEach((ex, k) => { ex.id = `ex${k}`; }));
const focused = (page) => page.get(() => {
  const a = document.activeElement;
  const marks = [...a.parentElement.children].filter((c) => c.matches('.dd-chart__slot, .dd-chart__hit, .dd-chart__seg, .dd-chart__arc'));
  return { index: marks.indexOf(a), label: a.getAttribute('aria-label') || '', cls: a.getAttribute('class') };
});
// The inner tooltip of the focused (or given) mark is showing.
const tipShown = (page, sel) => page.get((s) => {
  const m = s ? document.querySelector(s) : document.activeElement;
  const tip = m?.querySelector(':scope > .dd-chart__tip');
  return !!tip && getComputedStyle(tip).visibility === 'visible' && Number(getComputedStyle(tip).opacity) > 0.5;
}, sel);
const floatTip = (page, ex) => page.get((s) => {
  const t = document.querySelector(`${s} .dd-chart__tip--float`);
  return t && t.classList.contains('is-open') ? t.textContent : null;
}, ex);

test('columns: one tab stop, arrows/Home/End move, tooltip follows focus, Esc hides it', async ({ open, assert }) => {
  const page = await open('components/chart');
  await tagExamples(page);
  assert.equal(await page.count('#ex0 .dd-chart__slot[tabindex="0"]'), 1, 'roving tabindex: a single stop');
  // Shift+Tab back from the example bar: "View as table" summary, then the plot, then out of the chart.
  await page.focus('#ex0 [data-ex-theme]');
  await page.press({ key: 'Tab', shift: true }, { key: 'Tab', shift: true });
  let f = await focused(page);
  assert.equal(f.index, 0, 'Tab lands on the first day');
  assert.match(f.label, /^Mon/);
  await page.waitFor(() => getComputedStyle(document.activeElement.querySelector('.dd-chart__tip')).visibility === 'visible');
  await page.press('ArrowRight');
  f = await focused(page);
  assert.equal(f.index, 1);
  assert.ok(await tipShown(page), 'tooltip opens on the newly focused day');
  assert.equal(await page.count('#ex0 .dd-chart__slot[tabindex="0"]'), 1);
  assert.equal(await page.attr('#ex0 .dd-chart__slot:nth-child(2)', 'tabindex'), '0', 'tab stop follows focus');
  await page.press('End');
  assert.equal((await focused(page)).index, 6);
  await page.press('ArrowRight');
  assert.equal((await focused(page)).index, 6, 'stops at the end');
  await page.press('Home');
  assert.equal((await focused(page)).index, 0);
  await page.press('ArrowLeft', 'ArrowUp');
  assert.equal((await focused(page)).index, 0, 'stops at the start');
  await page.press('Escape');
  await page.waitFor(() => getComputedStyle(document.activeElement.querySelector('.dd-chart__tip')).visibility === 'hidden');
  assert.equal((await focused(page)).index, 0, 'Esc keeps focus on the mark');
  await page.press('ArrowDown');
  assert.equal((await focused(page)).index, 1);
  assert.ok(await tipShown(page), 'next move brings the tooltip back');
  // Other charts on the page are untouched.
  assert.equal(await page.count('#ex4 .is-active'), 0);
  await page.press({ key: 'Tab', shift: true });
  assert.ok(await page.get(() => !document.activeElement.closest('#ex0 .dd-chart__cols')), 'Shift+Tab leaves the plot in one step');
  assert.equal(await page.count('#ex0 .is-active'), 0, 'leaving clears the active mark');
});

test('pointer: hover a day shows its tooltip and dims the rest; leaving hides it', async ({ open, assert }) => {
  const page = await open('components/chart');
  await tagExamples(page);
  const slot = '#ex0 .dd-chart__slot:nth-child(3)';
  await page.hover(slot);
  assert.ok(await tipShown(page, slot), 'tooltip on hover');
  assert.match(await page.text(`${slot} .dd-chart__tip`), /Wed, Oct 22.*dawn-and-dusk\s*35 min/);
  // Other days step back (the fade is a transition, so wait for it to land).
  await page.waitFor(() => Number(getComputedStyle(document.querySelector('#ex0 .dd-chart__slot:nth-child(1) .dd-chart__col')).opacity) < 0.6);
  await page.hover('#ex0 .dd-chart__title');
  await page.waitFor((s) => getComputedStyle(document.querySelector(`${s} .dd-chart__tip`)).visibility === 'hidden', { args: [slot] });
  // Line chart crosshair: hover a point, the dots show.
  const hit = '#ex1 .dd-chart__hit:nth-child(4)';
  await page.hover(hit);
  assert.ok(await tipShown(page, hit));
  assert.match(await page.text(`${hit} .dd-chart__tip`), /01:00.*edge-cache\s*15\.9K/);
  await page.waitFor((s) => Number(getComputedStyle(document.querySelector(`${s} .dd-chart__dot`)).opacity) > 0.5, { args: [hit] });
  // Rapid hovering across every point never leaves two tips open.
  for (let k = 1; k <= 12; k += 3) await page.hover(`#ex1 .dd-chart__hit:nth-child(${k})`);
  assert.equal(await page.count('#ex1 .dd-chart__hit.is-active'), 1);
});

test('segments and donut arcs: floating tooltip on hover and keyboard', async ({ open, assert }) => {
  const page = await open('components/chart', { theme: 'dusk' });
  await tagExamples(page);
  await page.hover('#ex5 .dd-chart__stack .dd-chart__seg:nth-child(2)');
  assert.match(await floatTip(page, '#ex5 .dd-chart:nth-child(1)'), /dockey-ui\s*3\.1 TB · 25%/);
  await page.hover('#ex5 .dd-chart__title');
  await page.waitFor(() => !document.querySelector('#ex5 .dd-chart__tip--float.is-open'));
  // Keyboard on the donut: Tab in, arrows step through the arcs, Esc closes.
  await page.focus('#ex6 [data-ex-theme]');
  await page.press({ key: 'Tab', shift: true });
  let f = await focused(page);
  assert.equal(f.index, 0);
  assert.match(f.cls, /dd-chart__arc/);
  assert.match(await floatTip(page, '#ex6'), /dawn-and-dusk\s*5\.4 TB · \d+%/);
  assert.ok(await page.get(() => getComputedStyle(document.querySelector('#ex6 .dd-chart__donut')).outlineStyle === 'solid'), 'donut shows the focus ring');
  await page.press('ArrowRight');
  assert.match(await floatTip(page, '#ex6'), /dockey-ui/);
  await page.press('End');
  assert.match(await floatTip(page, '#ex6'), /Other \(4\)/);
  // The tip sits inside the card.
  const inside = await page.get(() => { const t = document.querySelector('#ex6 .dd-chart__tip--float').getBoundingClientRect(); const c = document.querySelector('#ex6 .dd-chart').getBoundingClientRect(); return t.left >= c.left - 1 && t.right <= c.right + 1; });
  assert.ok(inside, 'floating tip is clamped to the card');
  await page.press('Escape');
  assert.equal(await floatTip(page, '#ex6'), null, 'Esc closes the floating tip');
  assert.ok(await page.get(() => document.activeElement.matches('#ex6 .dd-chart__arc')), 'focus stays on the arc');
});

test('view as table: details disclosure and the Table swap toggle', async ({ open, assert }) => {
  const page = await open('components/chart');
  await tagExamples(page);
  await page.click('#ex0 .dd-chart__data > summary');
  assert.ok(await page.get(() => document.querySelector('#ex0 .dd-chart__data').open));
  assert.equal(await page.count('#ex0 .dd-chart__data tbody tr'), 7, 'one row per day');
  assert.equal(await page.count('#ex0 .dd-chart__data tbody th[scope="row"]'), 7);
  // Swap toggle on the area chart.
  const btn = '#ex2 [data-dd-chart-view]';
  await page.get(() => { window.__views = []; document.addEventListener('dd:change', (e) => window.__views.push(e.detail.view)); });
  assert.equal(await page.attr(btn, 'aria-pressed'), 'false');
  assert.ok(!(await page.visible('#p95-table')));
  await page.click(btn);
  assert.equal(await page.attr(btn, 'aria-pressed'), 'true');
  assert.ok(await page.visible('#p95-table'), 'table shown');
  assert.ok(!(await page.visible('#ex2 .dd-chart__frame')), 'plot hidden');
  assert.equal(await page.count('#p95-table tbody tr'), 25);
  assert.ok(await page.get(() => document.activeElement.matches('[data-dd-chart-view]')), 'focus stays on the toggle');
  await page.press('Space');
  assert.equal(await page.attr(btn, 'aria-pressed'), 'false');
  assert.ok(await page.visible('#ex2 .dd-chart__frame'), 'plot back');
  assert.ok(!(await page.visible('#p95-table')));
  assert.deepEqual(await page.get(() => window.__views), ['table', 'chart']);
  // Empty chart's button gives feedback.
  await page.click('#ex9 .dd-chart__empty .dd-btn');
  await page.waitFor(() => /Range picker/.test(document.querySelector('.dd-toast')?.textContent || ''));
});

test('touch at 375px: tap a day or a segment for its tooltip, tap away to close', async ({ open, assert }) => {
  const page = await open('components/chart', { width: 375 });
  await tagExamples(page);
  const slot = '#ex0 .dd-chart__slot:nth-child(4)';
  await page.tap(slot);
  assert.ok(await tipShown(page, slot), 'tap opens the tooltip');
  const fits = await page.get((s) => { const r = document.querySelector(`${s} .dd-chart__tip`).getBoundingClientRect(); return r.left >= 0 && r.right <= innerWidth; }, slot);
  assert.ok(fits, 'tooltip stays on screen');
  await page.tap('#ex0 .dd-chart__title');
  await page.waitFor((s) => getComputedStyle(document.querySelector(`${s} .dd-chart__tip`)).visibility === 'hidden', { args: [slot] });
  await page.tap('#ex5 .dd-chart__stack .dd-chart__seg:nth-child(1)');
  assert.match(await floatTip(page, '#ex5 .dd-chart:nth-child(1)'), /dawn-and-dusk/);
  await page.tap('#ex5 .dd-chart__title');
  await page.waitFor(() => !document.querySelector('#ex5 .dd-chart__tip--float.is-open'));
});

test('expand: the chart opens large in a dialog and comes back with Esc or its button', async ({ open, assert }) => {
  const page = await open('components/chart');
  await tagExamples(page);
  const size = (sel) => page.get((s) => { const c = document.querySelector(s); return c ? { w: c.offsetWidth, h: c.offsetHeight } : null; }, sel);
  const before = await size('#ex0 .dd-chart');
  await page.click('#ex0 [data-dd-chart-expand]');
  await page.sleep(450);
  const state = await page.get(() => {
    const d = document.querySelector('dialog.dd-chart-dialog');
    return { open: d?.open, modal: d?.matches(':modal'), label: d?.getAttribute('aria-label'), focus: document.activeElement?.getAttribute('aria-label'),
      inDialog: !!d?.querySelector(':scope > .dd-chart.is-expanded'), placeholder: document.querySelector('#ex0 .dd-chart__placeholder')?.offsetHeight };
  });
  assert.ok(state.open && state.modal, 'a modal dialog opens');
  assert.ok(state.inDialog, 'the figure itself moves into the dialog');
  assert.equal(state.label, 'Build minutes per day', 'the dialog is named by the chart title');
  assert.equal(state.focus, 'Close expanded chart', 'focus stays on the button, now a close');
  assert.equal(state.placeholder, before.h, 'a placeholder holds the chart’s place');
  const big = await size('dialog.dd-chart-dialog .dd-chart');
  assert.ok(big.w > before.w && big.h > before.h, `the chart grows (${before.w}×${before.h} → ${big.w}×${big.h})`);
  // Marks still respond inside the dialog.
  await page.hover('dialog.dd-chart-dialog .dd-chart__slot:nth-child(3)');
  assert.ok(await tipShown(page, 'dialog.dd-chart-dialog .dd-chart__slot:nth-child(3)'), 'tooltips work while expanded');
  await page.focus('dialog.dd-chart-dialog [data-dd-chart-expand]');
  await page.press('Escape');
  await page.sleep(450);
  const back = await page.get(() => ({ inPage: !!document.querySelector('#ex0 .dd-chart:not(.is-expanded)'), placeholder: !!document.querySelector('.dd-chart__placeholder'),
    open: document.querySelector('dialog.dd-chart-dialog')?.open, focus: document.activeElement?.matches('#ex0 [data-dd-chart-expand]'),
    label: document.querySelector('#ex0 [data-dd-chart-expand]').getAttribute('aria-label') }));
  assert.deepEqual(back, { inPage: true, placeholder: false, open: false, focus: true, label: 'Expand chart' }, 'Esc puts it back and returns focus');
  assert.deepEqual(await size('#ex0 .dd-chart'), before, 'back at its original size');
  // The button closes it too, and the Table toggle keeps its state through the round trip.
  await page.click('#ex2 [data-dd-chart-expand]');
  await page.sleep(450);
  await page.click('dialog.dd-chart-dialog [data-dd-chart-view]');
  assert.ok(await page.get(() => document.querySelector('dialog.dd-chart-dialog .dd-chart').classList.contains('is-table')), 'Table works inside');
  await page.click('dialog.dd-chart-dialog [data-dd-chart-expand]');
  await page.sleep(450);
  assert.ok(await page.get(() => document.querySelector('#ex2 .dd-chart').classList.contains('is-table') && !document.querySelector('dialog.dd-chart-dialog').open), 'the button closes it; the table view stays');
});

test('expand: a chart in a dusk example keeps dusk in the dialog', async ({ open, assert }) => {
  const page = await open('components/chart');
  await tagExamples(page);
  await page.click('#ex6 [data-ex-theme]');
  await page.click('#ex6 [data-dd-chart-expand]');
  await page.sleep(450);
  assert.equal(await page.attr('dialog.dd-chart-dialog', 'data-theme'), 'dusk');
  const donut = await page.get(() => document.querySelector('dialog.dd-chart-dialog .dd-chart__donut').offsetWidth);
  assert.ok(donut > 168, `the donut grows (${donut}px)`);
  await page.press('Escape');
});

test('expand: dd:change { expanded } reaches listeners on the chart’s own container, both ways', async ({ open, assert }) => {
  const page = await open('components/chart');
  await tagExamples(page);
  await page.get(() => { window.__ex = []; document.getElementById('ex0').addEventListener('dd:change', (e) => window.__ex.push({ ...e.detail, figure: e.target.matches('.dd-chart') })); });
  await page.click('#ex0 [data-dd-chart-expand]');
  await page.sleep(450);
  assert.ok(await page.get(() => document.querySelector('dialog.dd-chart-dialog').open));
  await page.press('Escape');
  await page.sleep(450);
  assert.deepEqual(await page.get(() => window.__ex), [{ expanded: true, figure: true }, { expanded: false, figure: true }]);
});
