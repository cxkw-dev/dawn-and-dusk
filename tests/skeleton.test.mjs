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
const region = '#sk-members';
const reload = '[data-sk-reload]';
const busy = (page) => page.attr(region, 'aria-busy');
const height = (page) => page.get((s) => document.querySelector(s).getBoundingClientRect().height, region);

test('semantics: each busy region says what is loading; every shape is hidden from screen readers', async ({ open, assert }) => {
  const page = await open('components/skeleton');
  const msgs = await page.get(() => [...document.querySelectorAll('.ex-stage [aria-busy="true"]')].map((r) => r.querySelector(':scope > .dd-visually-hidden')?.textContent));
  assert.deepEqual(msgs, ['Loading release notes…', 'Loading members…', 'Loading projects…', 'Loading deploys…']);
  assert.ok(await page.get(() => [...document.querySelectorAll('.ex-stage .dd-skeleton')].every((s) => s.closest('[aria-hidden="true"]'))), 'shapes are aria-hidden');
  // What a screen reader finds inside each busy region: the message, and nothing else.
  const { root } = await page.send('DOM.getDocument', { depth: 0 });
  const { nodeIds } = await page.send('DOM.querySelectorAll', { nodeId: root.nodeId, selector: '.ex-stage [aria-busy="true"]' });
  for (const [k, nodeId] of nodeIds.entries()) {
    const { nodes } = await page.send('Accessibility.queryAXTree', { nodeId, role: 'StaticText' });
    assert.deepEqual(nodes.filter((n) => !n.ignored).map((n) => n.name.value), [msgs[k]]);
  }
  const shapes = await ax(page, '.ex-stage [aria-busy="true"] .dd-skeleton');
  assert.ok(shapes.length > 30 && shapes.every((n) => n.ignored));
  assert.equal(await page.get(() => getComputedStyle(document.querySelector('.ex-stage .dd-skeleton-group[aria-busy="true"]')).cursor), 'progress');
  // An app swaps a skeleton out with the hidden attribute.
  await page.get(() => { document.querySelector('.ex-stage .dd-skeleton-group').hidden = true; });
  assert.equal(await page.visible('.ex-stage .dd-skeleton-group'), false, '[hidden] hides a skeleton group');
});

test('live: Reload shows skeleton rows while aria-busy, then the real rows land in the same place', async ({ open, assert }) => {
  const page = await open('components/skeleton');
  assert.equal(await busy(page), 'false');
  assert.equal(await page.count(`${region} li`), 3);
  const before = await height(page);
  await page.click(reload);
  assert.equal(await busy(page), 'true');
  assert.ok(await page.visible(`${region} [data-sk-loading] .dd-skeleton`), 'skeleton showing');
  assert.equal(await page.visible(`${region} [data-sk-loaded]`), false, 'data hidden while loading');
  assert.ok(Math.abs((await height(page)) - before) < 1, 'the region keeps its height: nothing jumps');
  await page.waitFor((s) => document.querySelector(s).getAttribute('aria-busy') === 'false', { args: [region] });
  assert.equal(await page.visible(`${region} [data-sk-loading]`), false);
  assert.ok(await page.visible(`${region} [data-sk-loaded]`));
  assert.ok(Math.abs((await height(page)) - before) < 1);
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), reload), 'focus stays on Reload');

  // Keyboard, and rapid repeats: the wait starts over and ends once, with the same three rows.
  await page.press('Enter');
  assert.equal(await busy(page), 'true');
  await page.press('Space');
  await page.click(reload);
  assert.equal(await busy(page), 'true');
  await page.waitFor((s) => document.querySelector(s).getAttribute('aria-busy') === 'false', { args: [region] });
  assert.equal(await page.count(`${region} li`), 3);
});

test('the shimmer moves; reduced motion leaves still, flat shapes', async ({ open, assert }) => {
  const page = await open('components/skeleton');
  const sk = '.ex-stage .dd-skeleton--title';
  const style = () => page.get((s) => { const cs = getComputedStyle(document.querySelector(s)); return { name: cs.animationName, image: cs.backgroundImage, pos: cs.backgroundPosition, bg: cs.backgroundColor }; }, sk);
  const a = await style();
  assert.equal(a.name, 'dd-skeleton-shimmer');
  assert.match(a.image, /linear-gradient/);
  await page.sleep(200);
  assert.notEqual((await style()).pos, a.pos, 'the shine travels');

  await page.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await page.waitFor((s) => getComputedStyle(document.querySelector(s)).animationName === 'none', { args: [sk] });
  const still = await style();
  assert.equal(still.image, 'none', 'no shine');
  assert.equal(still.bg, a.bg, 'the flat tone stays');
});

test('dusk: shapes are a visible tone on the page and on a surface, with a shine', async ({ open, assert }) => {
  const page = await open('components/skeleton', { theme: 'dusk' });
  // Composite the shape's tone over what is behind it and compare.
  const [onPage, onSurface] = await page.get(() => {
    const cv = document.createElement('canvas'); cv.width = cv.height = 1; const cx = cv.getContext('2d', { willReadFrequently: true });
    const px = (layers) => { cx.clearRect(0, 0, 1, 1); for (const c of layers) { cx.fillStyle = c; cx.fillRect(0, 0, 1, 1); } return [...cx.getImageData(0, 0, 1, 1).data].slice(0, 3).join(); };
    const pair = (el, backdrop) => [px([backdrop]), px([backdrop, getComputedStyle(el).backgroundColor])];
    const stage = getComputedStyle(document.querySelector('.ex-stage')).backgroundColor;
    const pageBg = stage === 'rgba(0, 0, 0, 0)' ? getComputedStyle(document.body).backgroundColor : stage;
    const card = document.querySelector('.ex-stage .dd-surface .dd-skeleton');
    return [pair(document.querySelector('.ex-stage .dd-skeleton--title'), pageBg), pair(card, getComputedStyle(card.closest('.dd-surface')).backgroundColor)];
  });
  assert.notEqual(onPage[0], onPage[1], 'tone shows on the page');
  assert.notEqual(onSurface[0], onSurface[1], 'tone shows on a surface');
  assert.match(await page.get(() => getComputedStyle(document.querySelector('.ex-stage .dd-skeleton')).backgroundImage), /linear-gradient/);
});

test('375px: cards stack, the table skeleton scrolls in its own box, the page never sideways; tap Reload', async ({ open, assert }) => {
  const page = await open('components/skeleton', { width: 375 });
  assert.ok(await page.get(() => document.documentElement.scrollWidth <= innerWidth));
  const lefts = await page.get(() => [...document.querySelectorAll('.ex-stage [aria-busy] > .dd-surface')].map((c) => Math.round(c.getBoundingClientRect().left)));
  assert.equal(lefts.length, 2);
  assert.equal(lefts[0], lefts[1], 'cards stack in one column');
  assert.ok(await page.get(() => { const t = [...document.querySelectorAll('.ex-stage [aria-busy="true"]')].at(-1); return t.scrollWidth > t.clientWidth && getComputedStyle(t).overflowX === 'auto'; }));
  await page.tap(reload);
  assert.equal(await busy(page), 'true');
  await page.waitFor((s) => document.querySelector(s).getAttribute('aria-busy') === 'false', { args: [region] });
});
