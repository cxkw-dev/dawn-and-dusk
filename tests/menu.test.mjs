import { test } from './lib/test.mjs';

const trigger = '[data-dd-menu="mn-project"][aria-controls]';

test('opens on click, moves focus in, closes on Esc and returns focus', async ({ open, assert }) => {
  const page = await open('components/menu');
  await page.click(trigger);
  assert.equal(await page.attr(trigger, 'aria-expanded'), 'true');
  assert.ok(await page.visible('#mn-project'), 'menu is visible');
  assert.ok(await page.get(() => document.getElementById('mn-project').contains(document.activeElement)), 'focus moved into the menu');
  await page.press('Escape');
  assert.equal(await page.attr(trigger, 'aria-expanded'), 'false');
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), trigger), 'focus returned to the trigger');
});

test('arrow keys move between items in dusk too', async ({ open, assert }) => {
  const page = await open('components/menu', { theme: 'dusk' });
  await page.click(trigger);
  const first = await page.text(':focus');
  await page.press('ArrowDown');
  assert.notEqual(await page.text(':focus'), first);
});
