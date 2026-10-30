import { test } from './lib/test.mjs';

const V1 = '.ex-stage [data-dd-json-viewer][aria-label^="Deploy"]';
const V2 = '.ex-stage [data-dd-json-viewer][aria-label="Services"]';
// The treeitem whose path is p, inside viewer v.
const node = (v, p) => `${v} [role="treeitem"][data-path='${p}']`;
const row = (v, p) => `${node(v, p)} > .dd-json-viewer__row`;
const toggle = (v, p) => `${node(v, p)} > .dd-json-viewer__row > .dd-json-viewer__toggle`;
const focusedPath = (page) => page.get(() => document.activeElement?.dataset.path ?? null);
const pathShown = (page, v) => page.text(`${v} .dd-json-viewer__path-value`);

test('renders a labelled tree, opened to data-depth', async ({ open, assert }) => {
  const page = await open('components/json-viewer');
  await page.waitFor((v) => document.querySelector(v)?.hasAttribute('data-dd-json-viewer-ready'), { args: [V1] });
  assert.equal(await page.attr(`${V1} [role="tree"]`, 'aria-label'), 'Deploy dpl_7Hq2xK9m');
  assert.equal(await page.attr(node(V1, '$'), 'aria-expanded'), 'true');
  assert.equal(await page.attr(node(V1, '$.commit'), 'aria-expanded'), 'true', 'level 1 open at depth 2');
  assert.equal(await page.attr(node(V1, '$.replicas[0]'), 'aria-expanded'), 'false', 'level 2 closed at depth 2');
  assert.ok(await page.visible(row(V1, '$.commit.sha')));
  assert.ok(!(await page.visible(row(V1, '$.replicas[0].zone'))), 'children of a closed node are hidden');
  assert.equal(await page.text(`${node(V1, '$.replicas')} > .dd-json-viewer__row .dd-json-viewer__count`), '3 items');
  // One tab stop: only the root takes tabindex=0.
  assert.equal(await page.count(`${V1} [role="treeitem"][tabindex="0"]`), 1);
  assert.equal(await page.attr(node(V1, '$'), 'tabindex'), '0');
  // depth=1 viewer: only the root is open.
  assert.equal(await page.count(`${V2} [role="treeitem"][aria-expanded="true"]`), 1);
});

test('click selects a row: path in the bar, copy copies it; the chevron toggles', async ({ open, assert }) => {
  const page = await open('components/json-viewer');
  await page.send('Browser.grantPermissions', { permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite'] });
  await page.click(row(V1, '$.env["jwks.ttl"]'));
  assert.equal(await page.attr(node(V1, '$.env["jwks.ttl"]'), 'aria-selected'), 'true');
  assert.equal(await pathShown(page, V1), '$.env["jwks.ttl"]');
  assert.equal(await page.count(`${V1} [aria-selected="true"]`), 1);
  await page.click(`${V1} .dd-json-viewer__path [data-dd-copy]`);
  await page.waitFor((v) => document.querySelector(`${v} .dd-json-viewer__path [data-dd-copy]`).hasAttribute('data-copied'), { args: [V1] });
  assert.equal(await page.get(() => navigator.clipboard.readText()), '$.env["jwks.ttl"]');

  // Clicking a container's label selects it without toggling; the chevron toggles.
  await page.click(`${row(V1, '$.commit')} .dd-json-viewer__key`);
  assert.equal(await page.attr(node(V1, '$.commit'), 'aria-expanded'), 'true');
  await page.click(toggle(V1, '$.commit'));
  assert.equal(await page.attr(node(V1, '$.commit'), 'aria-expanded'), 'false');
  assert.ok(!(await page.visible(row(V1, '$.commit.sha'))));
  await page.click(`${row(V1, '$.commit')} .dd-json-viewer__preview`);
  assert.equal(await page.attr(node(V1, '$.commit'), 'aria-expanded'), 'true', 'the …} preview opens it too');
  // Rapid toggling ends in a consistent state.
  for (let k = 0; k < 5; k++) await page.click(toggle(V1, '$.replicas[1]'));
  assert.equal(await page.attr(node(V1, '$.replicas[1]'), 'aria-expanded'), 'true');
  assert.ok(await page.visible(row(V1, '$.replicas[1].restarts')));
});

test('keyboard follows the WAI-ARIA tree pattern', async ({ open, assert }) => {
  const page = await open('components/json-viewer');
  await page.focus(node(V1, '$'));
  await page.press('ArrowDown');
  assert.equal(await focusedPath(page), '$.id');
  assert.equal(await pathShown(page, V1), '$.id', 'selection follows focus');
  await page.press('End');
  assert.equal(await focusedPath(page), '$.finishedAt');
  await page.press('Home');
  assert.equal(await focusedPath(page), '$');
  // To the closed replicas[0]: → opens it, → again moves to its first child, ← goes back to the parent, ← closes.
  await page.focus(node(V1, '$.replicas'));
  await page.press('ArrowDown');
  assert.equal(await focusedPath(page), '$.replicas[0]');
  await page.press('ArrowRight');
  assert.equal(await page.attr(node(V1, '$.replicas[0]'), 'aria-expanded'), 'true');
  assert.equal(await focusedPath(page), '$.replicas[0]', '→ on a closed node opens it without moving');
  await page.press('ArrowRight');
  assert.equal(await focusedPath(page), '$.replicas[0].id');
  await page.press('ArrowLeft');
  assert.equal(await focusedPath(page), '$.replicas[0]');
  await page.press('ArrowLeft');
  assert.equal(await page.attr(node(V1, '$.replicas[0]'), 'aria-expanded'), 'false');
  // Enter and Space toggle; ↓ skips hidden children.
  await page.press('Enter');
  assert.equal(await page.attr(node(V1, '$.replicas[0]'), 'aria-expanded'), 'true');
  await page.press('Space');
  assert.equal(await page.attr(node(V1, '$.replicas[0]'), 'aria-expanded'), 'false');
  await page.press('ArrowDown');
  assert.equal(await focusedPath(page), '$.replicas[1]');
  // Roving tabindex: still a single tab stop, on the focused node.
  assert.equal(await page.count(`${V1} [role="treeitem"][tabindex="0"]`), 1);
  assert.equal(await page.attr(node(V1, '$.replicas[1]'), 'tabindex'), '0');
  // Space didn't scroll the page.
  const y = await page.get(() => scrollY);
  await page.press('Space');
  assert.equal(await page.get(() => scrollY), y);
});

test('expand all / collapse all; the other viewer is untouched', async ({ open, assert }) => {
  const page = await open('components/json-viewer');
  await page.click(`${V1} [data-dd-json-viewer-expand]`);
  assert.equal(await page.count(`${V1} [role="treeitem"][aria-expanded="false"]`), 0);
  assert.ok(await page.visible(row(V1, '$.replicas[2].restarts')));
  assert.equal(await page.count(`${V2} [role="treeitem"][aria-expanded="true"]`), 1, 'second viewer unchanged');
  await page.click(row(V1, '$.replicas[2].zone'));
  await page.click(`${V1} [data-dd-json-viewer-collapse]`);
  assert.equal(await page.count(`${V1} [role="treeitem"][aria-expanded="true"]`), 1, 'only the root stays open');
  assert.equal(await page.attr(node(V1, '$'), 'tabindex'), '0', 'the tab stop returns to a visible node');
  assert.equal(await pathShown(page, V1), '$');
  assert.equal(await page.count(`${V1} [aria-selected="true"]`), 0, 'no hidden node stays selected');
  // Selecting in one viewer doesn't move the other's path.
  await page.click(row(V2, '$[3]'));
  assert.equal(await pathShown(page, V2), '$[3]');
  assert.equal(await pathShown(page, V1), '$');
});

test('dd.jsonViewer renders data, and .init() renders viewers added later', async ({ open, assert }) => {
  const page = await open('components/json-viewer');
  const r = await page.get(() => {
    const el = document.createElement('div');
    el.id = 'api-viewer';
    document.querySelector('.doc-main').append(el);
    dd.jsonViewer(el, { service: 'edge-cache', 'hit.ratio': 0.71, regions: ['eu-west-2', 'us-east-1'], paused: false, owner: null, tags: {} }, { depth: 1, label: 'edge-cache' });
    const q = (s) => el.querySelector(s);
    return {
      cls: el.classList.contains('dd-json-viewer'),
      label: q('[role="tree"]').getAttribute('aria-label'),
      open: el.querySelectorAll('[aria-expanded="true"]').length,
      count: q('[data-path="$.regions"] .dd-json-viewer__count').textContent,
      quoted: !!q('[data-path=\'$["hit.ratio"]\']'),
      types: ['string', 'number', 'boolean', 'null'].map((t) => !!q(`.dd-json-viewer__value--${t}`)),
      empty: q('[data-path="$.tags"] .dd-json-viewer__value').textContent,
    };
  });
  assert.deepEqual(r, { cls: true, label: 'edge-cache', open: 1, count: '2 items', quoted: true, types: [true, true, true, true], empty: '{}' });
  // Keyboard works on a viewer rendered from script.
  await page.focus('#api-viewer [data-path="$"]');
  await page.press('ArrowDown');
  assert.equal(await focusedPath(page), '$.service');

  const later = await page.get(() => {
    const el = document.createElement('div');
    el.setAttribute('data-dd-json-viewer', '');
    el.innerHTML = '<script type="application/json">{"ok": true}</script>';
    const bad = document.createElement('div');
    bad.setAttribute('data-dd-json-viewer', '');
    bad.innerHTML = '<script type="application/json">{nope</script>';
    document.querySelector('.doc-main').append(el, bad);
    dd.jsonViewer.init();
    return [el.hasAttribute('data-dd-json-viewer-ready'), !!el.querySelector('[data-path="$.ok"]'), !!bad.querySelector('.dd-json-viewer__error')];
  });
  assert.deepEqual(later, [true, true, true]);
});

test('dusk: types keep distinct colours; selection is visible', async ({ open, assert }) => {
  const page = await open('components/json-viewer', { theme: 'dusk' });
  const colors = await page.get((v) => ['string', 'number', 'boolean', 'null'].map((t) => getComputedStyle(document.querySelector(`${v} .dd-json-viewer__value--${t}`)).color), V1);
  assert.equal(new Set(colors).size, 4, `four type colours, got ${colors}`);
  const bg = (p) => page.get((s) => getComputedStyle(document.querySelector(s)).backgroundColor, row(V1, p));
  const before = await bg('$.region');
  await page.click(row(V1, '$.region'));
  assert.notEqual(await bg('$.region'), before, 'the selected row takes a tone');
});

test('375px: tap a chevron to open a node, tap a row to select it', async ({ open, assert }) => {
  const page = await open('components/json-viewer', { width: 375 });
  await page.tap(toggle(V2, '$[0]'));
  assert.equal(await page.attr(node(V2, '$[0]'), 'aria-expanded'), 'true');
  await page.tap(row(V2, '$[0].rpm'));
  assert.equal(await pathShown(page, V2), '$[0].rpm');
  assert.ok(await page.get(() => document.documentElement.scrollWidth <= innerWidth), 'no sideways page scroll');
});
