import { test } from './lib/test.mjs';

const parent = 'input[data-dd-check-all="purge"]';
const kid = (n) => `.dd-checkbox-group__nested > .dd-checkbox:nth-child(${n}) > input`;
// [checked, indeterminate] of the select-all parent and each child.
const purge = (page) => page.get((p) => {
  const el = document.querySelector(p);
  return { all: [el.checked, el.indeterminate], kids: [...document.querySelectorAll('input[data-dd-check-in="purge"]')].map((c) => c.checked) };
}, parent);
// The nth checkbox in the first (States) example.
const st = (n) => `.ex-stage .dd-row > .dd-checkbox:nth-child(${n}) > input`;
const checked = (page, sel) => page.get((s) => document.querySelector(s).checked, sel);

test('clicking the box or its label toggles; disabled ones stay put', async ({ open, assert }) => {
  const page = await open('components/checkbox');
  assert.equal(await checked(page, st(1)), true);
  await page.click(st(1));
  assert.equal(await checked(page, st(1)), false, 'box click unchecks');
  await page.click(`.ex-stage .dd-row > .dd-checkbox:nth-child(2)`, { dx: 20 });
  assert.equal(await checked(page, st(2)), true, 'label text click checks');
  await page.click(st(4));
  await page.click(`.ex-stage .dd-row > .dd-checkbox:nth-child(5)`, { dx: 30 });
  assert.equal(await checked(page, st(4)), true, 'disabled on stays on');
  assert.equal(await checked(page, st(5)), false, 'disabled off stays off');
  // Rapid clicks land on the right state.
  for (let k = 0; k < 5; k++) await page.click(st(2));
  assert.equal(await checked(page, st(2)), false, 'five more clicks: off');
});

test('mixed starts indeterminate; one click resolves it to checked', async ({ open, assert }) => {
  const page = await open('components/checkbox');
  const mixed = '.ex-stage input[data-dd-indeterminate]';
  assert.deepEqual(await page.get((s) => [document.querySelector(s).indeterminate, document.querySelector(s).matches(':indeterminate')], mixed), [true, true]);
  await page.click(mixed);
  assert.deepEqual(await page.get((s) => [document.querySelector(s).checked, document.querySelector(s).indeterminate], mixed), [true, false]);
});

test('keyboard: Tab skips disabled boxes, Space toggles, focus ring shows', async ({ open, assert }) => {
  const page = await open('components/checkbox');
  await page.focus(st(3));
  await page.press('Tab');
  // The two disabled boxes are skipped: the next stop is outside the States row.
  assert.equal(await page.get(() => document.activeElement.disabled), false);
  assert.equal(await page.get(() => !!document.activeElement.closest('.dd-row')), false, 'Tab left the row past the disabled boxes');
  await page.press({ key: 'Tab', shift: true });
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), st(3)));
  assert.ok(await page.get(() => getComputedStyle(document.activeElement).outlineStyle === 'solid'), 'focus-visible ring');
  await page.press('Space');
  assert.equal(await page.get((s) => document.querySelector(s).checked, st(3)), true, 'Space checks the mixed box');
  await page.press('Space');
  assert.equal(await page.get((s) => document.querySelector(s).checked, st(3)), false);
});

test('select all: parent mirrors children; checking it sets every child', async ({ open, assert }) => {
  const page = await open('components/checkbox');
  assert.deepEqual(await purge(page), { all: [false, true], kids: [true, true, false, false] }, 'mixed on load');
  await page.click(parent);
  assert.deepEqual(await purge(page), { all: [true, false], kids: [true, true, true, true] }, 'mixed → all');
  await page.click(parent);
  assert.deepEqual(await purge(page), { all: [false, false], kids: [false, false, false, false] }, 'all → none');
  await page.click(kid(3));
  assert.deepEqual(await purge(page), { all: [false, true], kids: [false, false, true, false] }, 'one child → mixed');
  for (const n of [1, 2, 4]) await page.click(kid(n));
  assert.deepEqual(await purge(page), { all: [true, false], kids: [true, true, true, true] }, 'every child → parent checked');
  // Keyboard on the parent.
  await page.focus(parent);
  await page.press('Space');
  assert.deepEqual(await purge(page), { all: [false, false], kids: [false, false, false, false] });
  // Other groups on the page are untouched.
  assert.equal(await page.count('.dd-checkbox-group--inline input:checked'), 3);
});

test('cards: the whole card toggles, tints when chosen; the disabled card does nothing', async ({ open, assert }) => {
  const page = await open('components/checkbox', { theme: 'dusk' });
  const card = (n) => `.dd-checkbox-cards > .dd-checkbox-card:nth-of-type(${n})`;
  const info = (n) => page.get((s) => { const c = document.querySelector(s); return { on: c.querySelector('input').checked, bg: getComputedStyle(c).backgroundColor }; }, card(n));
  const before = await info(2);
  assert.equal(before.on, false);
  await page.click(card(2), { dx: -40 });
  await page.hover('h1');
  const after = await info(2);
  assert.equal(after.on, true, 'clicking the card text checks it');
  assert.notEqual(after.bg, before.bg, 'chosen card takes the accent tint in dusk');
  await page.click(`${card(2)} .dd-checkbox-card__aside`);
  assert.equal((await info(2)).on, false, 'clicking the price unchecks it');
  await page.click(card(4));
  assert.equal((await info(4)).on, false, 'disabled card stays off');
  // Keyboard focus rings the card.
  await page.focus(`${card(1)} input`);
  await page.press({ key: 'Tab', shift: true }, 'Tab');
  assert.equal(await page.get((s) => getComputedStyle(document.querySelector(s)).outlineStyle, card(1)), 'solid');
});

test('phone: tapping a card or a label toggles it', async ({ open, assert }) => {
  const page = await open('components/checkbox', { width: 375 });
  const c = '.dd-checkbox-cards > .dd-checkbox-card:nth-of-type(2)';
  await page.tap(c);
  assert.equal(await checked(page, `${c} input`), true);
  await page.tap(parent);
  assert.deepEqual((await purge(page)).kids, [true, true, true, true]);
  assert.ok(await page.get(() => document.documentElement.scrollWidth <= innerWidth), 'no sideways scroll at 375');
});
