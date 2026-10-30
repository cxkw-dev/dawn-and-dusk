import { test } from './lib/test.mjs';
import { BASE } from './lib/browser.mjs';

// ds/behaviors/theme.js + the layout's inline ?theme= script.
const DAWN_BG = '#f4efe7';
const DUSK_BG = '#1c1916';
const toggle = '.doc-theme';
const url = (path) => `${BASE}${path}`;

const state = (page) => page.get(() => ({
  attr: document.documentElement.getAttribute('data-theme'),
  bg: getComputedStyle(document.documentElement).getPropertyValue('--dd-bg').trim().toLowerCase(),
  pressed: document.querySelector('.doc-theme').getAttribute('aria-pressed'),
  stored: localStorage.getItem('dd-theme'),
}));

// Navigate (or reload) and wait for the new document's load.
async function go(page, target) {
  await page.evaluate(() => { window.__stale = true; });
  await (target ? page.send('Page.navigate', { url: target }) : page.send('Page.reload'));
  const end = Date.now() + 6000;
  while (Date.now() < end) {
    try { if (await page.evaluate(() => !window.__stale && document.readyState === 'complete')) { await page.sleep(200); return; } } catch { /* navigating */ }
    await page.sleep(60);
  }
  throw new Error(`navigation to ${target || 'reload'} timed out`);
}
const os = (page, scheme) => page.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: scheme }] });

test('the toggle flips data-theme and aria-pressed, by click and keyboard, and persists across reloads', async ({ open, assert }) => {
  const page = await open('components/button');
  assert.deepEqual(await state(page), { attr: 'dawn', bg: DAWN_BG, pressed: 'false', stored: 'dawn' });
  await page.click(toggle);
  assert.deepEqual(await state(page), { attr: 'dusk', bg: DUSK_BG, pressed: 'true', stored: 'dusk' });
  await go(page, url('components/button'));
  assert.deepEqual(await state(page), { attr: 'dusk', bg: DUSK_BG, pressed: 'true', stored: 'dusk' }, 'dusk survives a reload');
  await page.focus(toggle);
  await page.press('Enter');
  assert.deepEqual(await state(page), { attr: 'dawn', bg: DAWN_BG, pressed: 'false', stored: 'dawn' }, 'Enter on the toggle flips back');
  await page.press('Space');
  assert.equal((await state(page)).attr, 'dusk', 'Space flips too');
  await go(page, url('components/tabs'));
  assert.equal((await state(page)).attr, 'dusk', 'the choice carries to other pages');
  await page.click(toggle);
});

test('?theme= applies, wins over the stored choice and becomes the stored choice', async ({ open, assert }) => {
  const page = await open('components/button', { theme: 'dusk' });
  assert.deepEqual(await state(page), { attr: 'dusk', bg: DUSK_BG, pressed: 'true', stored: 'dusk' });
  await go(page, url('components/button?theme=dawn'));
  assert.deepEqual(await state(page), { attr: 'dawn', bg: DAWN_BG, pressed: 'false', stored: 'dawn' });
  await go(page, url('components/button?theme=nonsense'));
  assert.equal((await state(page)).attr, 'dawn', 'an unknown value is ignored and the stored choice stays');
});

test('with nothing stored the OS decides, and OS changes are followed live until a choice is made', async ({ open, assert }) => {
  const page = await open('components/button');
  await page.evaluate(() => localStorage.removeItem('dd-theme'));
  await os(page, 'dark');
  await go(page, url('components/button'));
  assert.deepEqual(await state(page), { attr: null, bg: DUSK_BG, pressed: 'true', stored: null }, 'dark OS → dusk, no attribute');
  await os(page, 'light');
  await page.waitFor(() => document.querySelector('.doc-theme').getAttribute('aria-pressed') === 'false');
  assert.deepEqual(await state(page), { attr: null, bg: DAWN_BG, pressed: 'false', stored: null }, 'light OS → dawn, live');
  await os(page, 'dark');
  await page.waitFor(() => document.querySelector('.doc-theme').getAttribute('aria-pressed') === 'true');
  // A click flips away from what the OS shows, and from then on the stored choice wins over the OS.
  await page.click(toggle);
  assert.deepEqual(await state(page), { attr: 'dawn', bg: DAWN_BG, pressed: 'false', stored: 'dawn' });
  await os(page, 'light');
  await os(page, 'dark');
  await page.sleep(100);
  assert.equal((await state(page)).attr, 'dawn', 'the stored choice ignores OS changes');
  await os(page, 'light');
});

test('rapid toggles stay consistent and leave no transition blocker behind', async ({ open, assert }) => {
  const page = await open('components/button');
  for (let k = 0; k < 7; k++) await page.evaluate(() => document.querySelector('.doc-theme').click());
  await page.sleep(100);
  const s = await state(page);
  assert.deepEqual(s, { attr: 'dusk', bg: DUSK_BG, pressed: 'true', stored: 'dusk' });
  assert.equal(await page.get(() => [...document.querySelectorAll('style')].filter((el) => el.textContent.includes('transition:none!important')).length), 0);
  // Every toggle on the page agrees (the landing pattern has its own moon button).
  await go(page, url('patterns/landing'));
  const pressed = await page.get(() => [...document.querySelectorAll('[data-dd-theme-toggle]')].map((b) => b.getAttribute('aria-pressed')));
  assert.ok(pressed.length >= 2 && pressed.every((p) => p === 'true'), `all toggles pressed: ${pressed}`);
  await page.click('.dd-pattern-landing [data-dd-theme-toggle]');
  assert.equal((await state(page)).attr, 'dawn');
  const after = await page.get(() => [...document.querySelectorAll('[data-dd-theme-toggle]')].map((b) => b.getAttribute('aria-pressed')));
  assert.ok(after.every((p) => p === 'false'), `all toggles released: ${after}`);
});
