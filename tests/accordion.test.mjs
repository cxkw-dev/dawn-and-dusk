import { test } from './lib/test.mjs';

// Docs examples: [0] default FAQ (several open) · [1] one open at a time (name="svc") · [2] boxed (name="boxed") · [3] expand cards
const openStates = (n) => {
  const s = [...document.querySelectorAll('figure.ex')][n].querySelector('.ex-stage');
  return [...s.querySelectorAll('details')].map((d) => d.open);
};
const sum = (n, k) => `[data-acc="${n}-${k}"]`;
// Tag every summary so tests can address it: data-acc="<example>-<item>".
const tag = () => [...document.querySelectorAll('figure.ex')].forEach((f, n) => f.querySelectorAll('.ex-stage summary').forEach((s, k) => s.setAttribute('data-acc', `${n}-${k}`)));
const bodyShown = (s) => { const d = document.querySelector(s).parentElement; const b = d.querySelector(':scope > :not(summary)'); return d.open && b.getBoundingClientRect().height > 8; };
const bodyHidden = (s) => { const sm = document.querySelector(s); const d = sm.parentElement; return !d.open && d.getBoundingClientRect().height - sm.getBoundingClientRect().height < 3; };

test('default: click opens and closes a section; several can be open at once', async ({ open, assert }) => {
  const page = await open('components/accordion');
  await page.get(tag);
  assert.deepEqual(await page.get(openStates, 0), [true, false, false, false]);
  await page.click(sum(0, 1));
  await page.click(sum(0, 3));
  assert.deepEqual(await page.get(openStates, 0), [true, true, false, true]);
  await page.waitFor(bodyShown, { args: [sum(0, 3)] });
  await page.click(sum(0, 0));
  assert.deepEqual(await page.get(openStates, 0), [false, true, false, true]);
  await page.waitFor(bodyHidden, { args: [sum(0, 0)] });
});

test('one open at a time: opening a section in a name group closes the other', async ({ open, assert }) => {
  const page = await open('components/accordion');
  await page.get(tag);
  assert.deepEqual(await page.get(openStates, 1), [true, false, false, false]);
  await page.click(sum(1, 1));
  assert.deepEqual(await page.get(openStates, 1), [false, true, false, false]);
  await page.click(sum(1, 3));
  assert.deepEqual(await page.get(openStates, 1), [false, false, false, true]);
  await page.click(sum(1, 3)); // the open one closes too, leaving none open
  assert.deepEqual(await page.get(openStates, 1), [false, false, false, false]);
  // groups are independent: the boxed group and the FAQ did not move
  assert.deepEqual(await page.get(openStates, 2), [true, false, false]);
  assert.deepEqual(await page.get(openStates, 0), [true, false, false, false]);
  await page.click(sum(2, 2));
  assert.deepEqual(await page.get(openStates, 2), [false, false, true]);
  assert.deepEqual(await page.get(openStates, 1), [false, false, false, false]);
});

test('keyboard: Tab reaches each summary, Enter and Space toggle it', async ({ open, assert }) => {
  const page = await open('components/accordion');
  await page.get(tag);
  await page.focus(sum(0, 1));
  await page.press('Enter');
  assert.deepEqual(await page.get(openStates, 0), [true, true, false, false]);
  await page.press('Space');
  assert.deepEqual(await page.get(openStates, 0), [true, false, false, false]);
  await page.press('Tab');
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), sum(0, 2)), 'Tab moves to the next summary');
  await page.press('Space');
  assert.deepEqual(await page.get(openStates, 0), [true, false, true, false]);
  // focus ring on keyboard focus
  assert.notEqual(await page.get(() => getComputedStyle(document.activeElement).outlineStyle), 'none', 'focus ring shows');
  // exclusive group by keyboard
  await page.focus(sum(1, 2));
  await page.press('Enter');
  assert.deepEqual(await page.get(openStates, 1), [false, false, true, false]);
});

test('the chevron turns with the open state; rapid clicks settle cleanly', async ({ open, assert }) => {
  const page = await open('components/accordion');
  await page.get(tag);
  const turned = (s) => getComputedStyle(document.querySelector(s).querySelector('.dd-accordion__chevron, .dd-expand__chevron')).transform;
  await page.waitFor((s) => getComputedStyle(document.querySelector(s).querySelector('.dd-accordion__chevron')).transform !== 'none', { args: [sum(0, 0)] });
  assert.equal(await page.get(turned, sum(0, 1)), 'none');
  for (let k = 0; k < 5; k++) await page.click(sum(0, 1));
  assert.deepEqual(await page.get(openStates, 0), [true, true, false, false], 'odd number of clicks leaves it open');
  await page.waitFor(bodyShown, { args: [sum(0, 1)] });
  await page.waitFor((s) => getComputedStyle(document.querySelector(s).querySelector('.dd-accordion__chevron')).transform !== 'none', { args: [sum(0, 1)] });
});

test('expandable cards open and close independently', async ({ open, assert }) => {
  const page = await open('components/accordion');
  await page.get(tag);
  assert.deepEqual(await page.get(openStates, 3), [true, false, false]);
  await page.click(sum(3, 1));
  assert.deepEqual(await page.get(openStates, 3), [true, true, false]);
  await page.waitFor(bodyShown, { args: [sum(3, 1)] });
  assert.ok(await page.get((s) => document.querySelector(s).parentElement.textContent.includes('0042_invoice_currency'), sum(3, 1)));
  await page.click(sum(3, 0));
  assert.deepEqual(await page.get(openStates, 3), [false, true, false]);
});

test('at 375px a tap toggles and nothing overflows sideways', async ({ open, assert }) => {
  const page = await open('components/accordion', { width: 375 });
  await page.get(tag);
  await page.tap(sum(1, 2));
  assert.deepEqual(await page.get(openStates, 1), [false, false, true, false]);
  await page.tap(sum(3, 2));
  assert.deepEqual(await page.get(openStates, 3), [true, false, true]);
  assert.ok(await page.get(() => document.documentElement.scrollWidth <= innerWidth), 'no sideways scroll');
});

test('dusk: a closed boxed item lifts on hover, clear of its resting tone', async ({ open, assert }) => {
  const page = await open('components/accordion', { theme: 'dusk' });
  await page.get(tag);
  const bg = (s) => getComputedStyle(document.querySelector(s).parentElement).backgroundColor;
  const rest = await page.get(bg, sum(2, 1));
  await page.hover(sum(2, 1));
  await page.waitFor((s, r) => getComputedStyle(document.querySelector(s).parentElement).backgroundColor !== r, { args: [sum(2, 1), rest] });
  await page.click(sum(2, 1));
  assert.deepEqual(await page.get(openStates, 2), [false, true, false]);
});
