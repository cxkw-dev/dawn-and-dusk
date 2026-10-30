import { test } from './lib/test.mjs';

// Which option of a named group is chosen, by its label text.
const chosen = (page, name) => page.get((n) => {
  const r = document.querySelector(`input[name="${n}"]:checked`);
  return r ? r.closest('label').querySelector('.dd-radio__label, .dd-radio-card__title')?.textContent.trim() ?? r.closest('label').textContent.trim() : null;
}, name);
const opt = (name, n) => `fieldset:has(input[name="${name}"]) > label:nth-of-type(${n})`;
const isFocused = (page, sel) => page.get((s) => document.activeElement === document.querySelector(s), sel);

test('click picks one option per group; disabled can’t be picked', async ({ open, assert }) => {
  const page = await open('components/radio');
  assert.equal(await chosen(page, 'strategy'), 'Rolling');
  await page.click(opt('strategy', 3), { dx: 40 });
  assert.equal(await chosen(page, 'strategy'), 'Canary', 'clicking the label text picks it');
  assert.equal(await page.count('input[name="strategy"]:checked'), 1, 'only one checked');
  await page.click(opt('strategy', 4), { dx: 40 });
  assert.equal(await chosen(page, 'strategy'), 'Canary', 'disabled Shadow is not picked');
  // Rapid clicks between options settle on the last one.
  for (const n of [1, 2, 1, 2, 3, 2]) await page.click(`${opt('strategy', n)} > input`);
  assert.equal(await chosen(page, 'strategy'), 'Blue / green');
  // Other groups are independent.
  assert.equal(await chosen(page, 'cycle'), 'Yearly · two months free');
  assert.equal(await chosen(page, 'plan'), 'Studio');
});

test('arrow keys move and select, skip disabled, wrap; Tab leaves the group', async ({ open, assert }) => {
  const page = await open('components/radio');
  await page.focus(`${opt('strategy', 1)} > input`);
  await page.press('ArrowDown');
  assert.equal(await chosen(page, 'strategy'), 'Blue / green');
  await page.press('ArrowRight');
  assert.equal(await chosen(page, 'strategy'), 'Canary');
  await page.press('ArrowDown');
  assert.equal(await chosen(page, 'strategy'), 'Rolling', 'skips disabled Shadow and wraps');
  await page.press('ArrowUp');
  assert.equal(await chosen(page, 'strategy'), 'Canary', 'ArrowUp wraps back');
  assert.ok(await isFocused(page, `${opt('strategy', 3)} > input`), 'focus follows the selection');
  assert.equal(await page.get(() => getComputedStyle(document.activeElement).outlineStyle), 'solid', 'focus ring');
  // Tab leaves the group at once (the example's own toolbar buttons come next), and the next group's stop is its
  // chosen radio — Monthly is skipped.
  await page.press('Tab');
  assert.equal(await page.get(() => document.activeElement.type), 'button', 'one Tab leaves the group');
  for (let k = 0; k < 6 && (await page.get(() => document.activeElement.type)) !== 'radio'; k++) await page.press('Tab');
  assert.deepEqual(await page.get(() => [document.activeElement.name, document.activeElement.checked]), ['cycle', true]);
  await page.focus(`${opt('strategy', 3)} > input`);
  await page.press('Tab', { key: 'Tab', shift: true });
  assert.ok(await isFocused(page, `${opt('strategy', 3)} > input`), 'Shift+Tab returns to the chosen option');
});

test('radio cards: click anywhere picks; the check badge and icon follow; arrows work on the hidden input', async ({ open, assert }) => {
  const page = await open('components/radio', { theme: 'dusk' });
  const card = (n) => opt('plan', n);
  const look = (n) => page.get((s) => {
    const c = document.querySelector(s);
    return { mark: getComputedStyle(c.querySelector('.dd-radio-card__mark')).transform, bg: getComputedStyle(c).backgroundColor };
  }, card(n));
  await page.click(card(1), { dy: 20 });
  await page.hover('h1');
  assert.equal(await chosen(page, 'plan'), 'Hobby');
  await page.waitFor((s) => getComputedStyle(document.querySelector(s)).transform === 'none' || getComputedStyle(document.querySelector(s)).transform === 'matrix(1, 0, 0, 1, 0, 0)', { args: [`${card(1)} .dd-radio-card__mark`] });
  await page.waitFor((s) => getComputedStyle(document.querySelector(s)).transform === 'matrix(0, 0, 0, 0, 0, 0)', { args: [`${card(2)} .dd-radio-card__mark`] });
  const [a, b] = [await look(1), await look(2)];
  assert.notEqual(a.bg, b.bg, 'chosen card is tinted, the others are not');
  // Keyboard: focus the hidden input, arrow to the next card; the card shows the focus ring.
  await page.focus(`${card(1)} > input`);
  await page.press('ArrowRight');
  assert.equal(await chosen(page, 'plan'), 'Studio');
  await page.press('ArrowRight');
  assert.equal(await chosen(page, 'plan'), 'Team');
  assert.equal(await page.get((s) => getComputedStyle(document.querySelector(s)).outlineStyle, card(3)), 'solid', 'focused card shows the ring');
  // Row cards are their own group.
  assert.equal(await chosen(page, 'size'), 'Medium');
  await page.click(opt('size', 3));
  assert.equal(await chosen(page, 'size'), 'Large');
  assert.equal(await chosen(page, 'plan'), 'Team');
});

test('phone: tapping a card or a label picks it, and nothing scrolls sideways', async ({ open, assert }) => {
  const page = await open('components/radio', { width: 375 });
  await page.tap(opt('plan', 3));
  assert.equal(await chosen(page, 'plan'), 'Team');
  await page.tap(opt('cycle', 1));
  assert.equal(await chosen(page, 'cycle'), 'Monthly');
  await page.tap(opt('size', 1));
  assert.equal(await chosen(page, 'size'), 'Small');
  assert.ok(await page.get(() => document.documentElement.scrollWidth <= innerWidth));
});
