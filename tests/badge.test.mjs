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
const name = async (page, sel) => (await ax(page, sel))[0].name;
const bell = '#bd-notifications';
const chat = '#bd-messages';
const corner = (host) => `${host} .dd-badge--corner`;

test('counts: the number on the badge is the number in the button’s name; bare counts are plain readable text', async ({ open, assert }) => {
  const page = await open('components/badge');
  assert.equal(await name(page, bell), 'Notifications, 3 unread');
  assert.equal(await page.attr(corner(bell), 'aria-hidden'), 'true', 'the corner badge is not read twice');
  assert.ok((await name(page, bell)).includes(await page.text(corner(bell))));
  assert.equal(await name(page, chat), 'Messages, new');

  const counts = await page.get(() => [...document.querySelectorAll('.ex-stage .dd-badge--count:not(.dd-badge--corner)')].map((b) => [b.textContent, b.closest('[aria-hidden="true"]') === null, getComputedStyle(b).fontFamily]));
  assert.deepEqual(counts.map((c) => c[0]), ['128', '7', '2']);
  assert.ok(counts.every((c) => c[1]), 'not hidden from screen readers');
  assert.ok(counts.every((c) => /DM Mono/.test(c[2])), 'mono figures');
  assert.deepEqual(await page.get(() => [...document.querySelectorAll('.ex-stage .dd-badge__count')].map((c) => c.textContent)), ['12', '3', '2/14']);
  // Leading icons are decoration: the word carries the meaning.
  const icons = await ax(page, '.ex-stage .dd-badge > svg');
  assert.ok(icons.length === 3 && icons.every((n) => n.ignored));
  assert.ok(await page.get(() => [...document.querySelectorAll('.ex-stage .dd-badge:not(.dd-badge--corner)')].every((b) => b.textContent.trim().length > 0)), 'no badge is colour alone');
});

test('corner badges mark read and come back, by click and keyboard; the button’s name follows', async ({ open, assert }) => {
  const page = await open('components/badge');
  await page.click(bell);
  assert.equal(await page.visible(corner(bell)), false, 'count gone');
  assert.equal(await name(page, bell), 'Notifications');
  await page.press('Enter');
  assert.equal(await page.visible(corner(bell)), true, 'Enter brings it back');
  assert.equal(await name(page, bell), 'Notifications, 3 unread');

  await page.focus(chat);
  await page.press('Space');
  assert.equal(await page.visible(corner(chat)), false);
  assert.equal(await name(page, chat), 'Messages');
  assert.equal(await page.visible(corner(bell)), true, 'the two buttons are independent');

  for (let k = 0; k < 4; k++) await page.click(bell);
  assert.equal(await page.visible(corner(bell)), true, 'an even number of rapid clicks lands where it started');
  assert.equal(await name(page, bell), 'Notifications, 3 unread');
});

test('static badges do not pretend to be interactive', async ({ open, assert }) => {
  const page = await open('components/badge');
  const stat = await page.get(() => [...document.querySelectorAll('.ex-stage span.dd-badge:not(:is(a, button) *)')].map((b) => [b.tabIndex, getComputedStyle(b).cursor]));
  assert.ok(stat.length > 40);
  assert.ok(stat.every(([t, c]) => t < 0 && c !== 'pointer'), 'no tab stop, no pointer cursor');
  // The only tab stops in the counts example are its two buttons.
  await page.focus(bell);
  await page.press('Tab');
  assert.equal(await page.get(() => document.activeElement.id), 'bd-messages');
  await page.press('Tab');
  assert.ok(await page.get(() => document.activeElement.matches('.ex-bar .ex-btn')), 'then on to the example bar');
});

test('dusk: the corner badge is ringed in the page tone, an empty one is a round 9px dot, solid text reads on its fill', async ({ open, assert }) => {
  const page = await open('components/badge', { theme: 'dusk' });
  const [ring, pageBg] = await page.get((s) => [getComputedStyle(document.querySelector(s)).boxShadow, getComputedStyle(document.querySelector(s).closest('[data-theme]') || document.body).backgroundColor], corner(bell));
  assert.match(ring, /2px/);
  assert.ok(ring.includes(pageBg) || ring.startsWith(pageBg), `ring ${ring} uses the page tone ${pageBg}`);
  const dot = await page.get((s) => { const r = document.querySelector(s).getBoundingClientRect(); return [Math.round(r.width), Math.round(r.height), getComputedStyle(document.querySelector(s)).borderRadius]; }, corner(chat));
  assert.deepEqual(dot, [9, 9, '50%']);
  const solids = await page.get(() => [...document.querySelectorAll('.ex-stage .dd-badge--solid')].map((b) => [getComputedStyle(b).color, getComputedStyle(b).backgroundColor]));
  assert.ok(solids.length >= 6 && solids.every(([c, bg]) => c !== bg));
});

test('375px: badge rows wrap inside the stage, never the page; tapping the bell marks it read', async ({ open, assert }) => {
  const page = await open('components/badge', { width: 375 });
  assert.ok(await page.get(() => document.documentElement.scrollWidth <= innerWidth));
  assert.ok(await page.get(() => [...document.querySelectorAll('.ex-stage')].every((s) => s.scrollWidth <= s.clientWidth + 1)), 'nothing spills out of a stage');
  await page.tap(bell);
  assert.equal(await page.visible(corner(bell)), false);
  assert.equal(await name(page, bell), 'Notifications');
});
