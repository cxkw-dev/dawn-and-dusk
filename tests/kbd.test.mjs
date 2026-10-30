import { test } from './lib/test.mjs';

const cap = (label) => `#kbd-live .dd-kbd:nth-child(${['⌃', '⌥', '⇧', '⌘', 'K', '/', '↵', 'esc'].indexOf(label) + 1})`;
const active = (page) => page.get(() => [...document.querySelectorAll('#kbd-live .is-active')].map((k) => k.textContent).join(' '));
const key = async (page, type, key, code, vk, mods = 0) => page.send('Input.dispatchKeyEvent', { type, key, code, windowsVirtualKeyCode: vk, modifiers: mods });

test('live keys light while held and clear on release (⌘ K, Shift, Esc)', async ({ open, assert }) => {
  const page = await open('components/kbd');
  assert.equal(await active(page), '');
  await key(page, 'rawKeyDown', 'Meta', 'MetaLeft', 91, 4);
  await page.sleep(50);
  assert.equal(await active(page), '⌘');
  await key(page, 'rawKeyDown', 'k', 'KeyK', 75, 4);
  await page.sleep(50);
  assert.equal(await active(page), '⌘ K');
  assert.match(await page.text('#kbd-live-out'), /⌘ K/);
  // Held keys take the accent fill.
  const [on, off] = await page.get((a, b) => [getComputedStyle(document.querySelector(a)).backgroundColor, getComputedStyle(document.querySelector(b)).backgroundColor], cap('⌘'), cap('⇧'));
  assert.notEqual(on, off);
  // macOS swallows the K keyup while ⌘ is down; releasing ⌘ clears everything.
  await key(page, 'keyUp', 'Meta', 'MetaLeft', 91);
  await page.sleep(50);
  assert.equal(await active(page), '');
  assert.equal(await page.text('#kbd-live-out'), 'nothing');
  await page.press({ key: 'Shift', shift: true });
  assert.equal(await active(page), '', 'Shift press and release leaves nothing held');
  await key(page, 'rawKeyDown', 'Escape', 'Escape', 27);
  await page.sleep(50);
  assert.equal(await active(page), 'esc');
  await key(page, 'keyUp', 'Escape', 'Escape', 27);
  await page.sleep(50);
  assert.equal(await active(page), '');
});

test('leaving the window mid-press releases held keys', async ({ open, assert }) => {
  const page = await open('components/kbd', { theme: 'dusk' });
  await key(page, 'rawKeyDown', 'Alt', 'AltLeft', 18, 1);
  await page.sleep(50);
  assert.equal(await active(page), '⌥');
  await page.get(() => { dispatchEvent(new Event('blur')); return true; });
  assert.equal(await active(page), '');
});

test('keycaps: glyph combos have a title, keys inside buttons follow the button ink, quiet has no cap', async ({ open, assert }) => {
  for (const theme of ['dawn', 'dusk']) {
    const page = await open('components/kbd', { theme });
    assert.ok(await page.get(() => [...document.querySelectorAll('h2#combos ~ figure:first-of-type .dd-kbd-combo')].slice(0, 3).every((c) => c.title)), 'glyph-only combos are titled');
    const [btnInk, keyInk] = await page.get(() => { const b = document.querySelector('.ex-stage .dd-btn--primary'); return [getComputedStyle(b).color, getComputedStyle(b.querySelector('.dd-kbd')).color]; });
    assert.equal(keyInk, btnInk, `${theme}: key in a primary button uses the button's ink`);
    const quiet = await page.get(() => getComputedStyle(document.querySelector('.dd-kbd--quiet')).backgroundColor);
    assert.match(quiet, /rgba\(0, 0, 0, 0\)|transparent/);
  }
});

test('375px: the shortcut list and the keys fit without overflowing', async ({ open, assert }) => {
  const page = await open('components/kbd', { width: 375 });
  assert.ok(await page.get(() => [...document.querySelectorAll('.ex-stage .dd-kbd, .ex-stage .dd-kbd-list')].every((k) => k.getBoundingClientRect().right <= 376)), 'nothing runs off the screen');
  const [dt, dd] = await page.get(() => { const l = document.querySelector('.dd-kbd-list'); return [l.querySelector('dt').getBoundingClientRect().top, l.querySelector('dd').getBoundingClientRect().top]; });
  assert.ok(Math.abs(dt - dd) < 4, 'action and keys stay on one row');
});
