import { test } from './lib/test.mjs';

const ax = async (page, sel) => {
  const { root } = await page.send('DOM.getDocument', { depth: 0 });
  const { nodeIds } = await page.send('DOM.querySelectorAll', { nodeId: root.nodeId, selector: sel });
  const out = [];
  for (const nodeId of nodeIds) {
    const { nodes } = await page.send('Accessibility.getPartialAXTree', { nodeId, fetchRelatives: false });
    out.push({ role: nodes[0].role?.value, name: nodes[0].name?.value ?? '', ignored: nodes[0].ignored });
  }
  return out;
};
const toasted = (page, title) => page.waitFor((t) => [...document.querySelectorAll('.dd-toast__title')].some((x) => x.textContent === t), { args: [title] });
const actions = '.ex-stage .dd-empty-state__actions > :is(a, button)';

test('semantics: the title is a heading, the icon is decoration, every action is a real tab stop', async ({ open, assert }) => {
  const page = await open('components/empty-state');
  const titles = await ax(page, '.ex-stage .dd-empty-state__title');
  assert.deepEqual(titles.map((t) => t.role), Array(6).fill('heading'));
  assert.equal(titles[0].name, 'No deploys yet');
  const icons = await ax(page, '.ex-stage .dd-empty-state__icon svg, .ex-stage .dd-empty-state__actions svg');
  assert.ok(icons.length >= 12 && icons.every((n) => n.ignored), 'icons are hidden from screen readers');
  const acts = await page.get((s) => [...document.querySelectorAll(s)].map((a) => [a.tagName, a.tabIndex, a.textContent.trim(), a.getAttribute('type') || a.getAttribute('href')]), actions);
  assert.deepEqual(acts.map((a) => a[2]), ['New deploy', 'Read the guide', 'Clear filters', 'Request access', 'Try again', 'New project', 'Import']);
  assert.ok(acts.every(([tag, ti, , t]) => ti === 0 && ((tag === 'BUTTON' && t === 'button') || (tag === 'A' && t))), JSON.stringify(acts));
  // When data arrives, an app hides the empty state with the hidden attribute.
  await page.get(() => { document.querySelector('.ex-stage .dd-empty-state').hidden = true; });
  assert.equal(await page.visible('.ex-stage .dd-empty-state'), false);
});

test('every action answers with feedback, by click and keyboard; the guide link does not move the page', async ({ open, assert }) => {
  const page = await open('components/empty-state');
  const titles = { 'New deploy': 'New deploy', 'Read the guide': 'Opening the deploy guide', 'Clear filters': 'Filters cleared', 'Request access': 'Access requested', 'Try again': 'Loading metrics again', 'New project': 'New project', Import: 'Import' };
  const labels = Object.keys(titles);
  const url = await page.get(() => location.href);
  for (const [k, label] of labels.entries()) {
    const idx = await page.get((s, l) => [...document.querySelectorAll(s)].findIndex((a) => a.textContent.trim() === l), actions, label);
    await page.get((s, n) => { window.dd.toast.clear(); document.querySelectorAll(s)[n].setAttribute('data-t', 'x'); }, actions, idx);
    // Alternate pointer, Enter and Space so each kind of activation is covered.
    if (k % 3 === 0) await page.click('[data-t="x"]');
    else {
      await page.focus('[data-t="x"]');
      await page.press(k % 3 === 1 || label === 'Read the guide' ? 'Enter' : 'Space'); // a link only takes Enter
    }
    await toasted(page, titles[label]);
    await page.get(() => document.querySelector('[data-t="x"]').removeAttribute('data-t'));
  }
  assert.equal(await page.get(() => location.href), url, 'no navigation');
  // The “Request access” toast is a success.
  await page.get(() => window.dd.toast.clear());
  await page.click('.ex-stage [data-dd-toast="Access requested"]');
  await page.waitFor(() => !!document.querySelector('.dd-toast--ok'));
});

test('dusk: the icon tile is a tone step, the text is quieter than the title', async ({ open, assert }) => {
  const page = await open('components/empty-state', { theme: 'dusk' });
  const [tile, surface, title, text] = await page.get(() => {
    const es = document.querySelector('.ex-stage .dd-empty-state');
    const cs = (el) => getComputedStyle(el);
    return [cs(es.querySelector('.dd-empty-state__icon')).backgroundColor, cs(es.parentElement).backgroundColor, cs(es.querySelector('.dd-empty-state__title')).color, cs(es.querySelector('.dd-empty-state__text')).color];
  });
  assert.notEqual(tile, surface);
  assert.notEqual(title, text);
});

test('375px: compact cards stack in one column, actions wrap, nothing spills; a tap answers', async ({ open, assert }) => {
  const page = await open('components/empty-state', { width: 375 });
  assert.ok(await page.get(() => document.documentElement.scrollWidth <= innerWidth));
  assert.ok(await page.get(() => [...document.querySelectorAll('.ex-stage')].every((s) => s.scrollWidth <= s.clientWidth + 1)), 'nothing spills out of a stage');
  const lefts = await page.get(() => [...document.querySelectorAll('.ex-stage .dd-empty-state--compact')].map((e) => Math.round(e.getBoundingClientRect().left)));
  assert.equal(new Set(lefts).size, 1, 'one column');
  await page.tap('.ex-stage [data-dd-toast="Filters cleared"]');
  await toasted(page, 'Filters cleared');
});

test('300px: the compact grid still fits (no fixed 240px minimum)', async ({ open, assert }) => {
  const page = await open('components/empty-state', { width: 300 });
  assert.ok(await page.get(() => document.documentElement.scrollWidth <= innerWidth));
  assert.ok(await page.get(() => { const g = document.querySelector('.ex-stage .dd-empty-state--compact').closest('[style*="grid"]'); return g.scrollWidth <= g.clientWidth + 1; }));
});
