import { test } from './lib/test.mjs';

const ACCOUNT = '.ex-stage button.dd-avatar[aria-controls="av-account"]';
const MENU = '#av-account';
const REVIEWER = (name) => `.ex-stage .dd-avatar-group > a.dd-avatar[aria-label="${name}"]`;
const isActive = (page, sel) => page.get((s) => document.activeElement === document.querySelector(s), sel);
const shadow = (page, sel) => page.get((s) => getComputedStyle(document.querySelector(s)).boxShadow, sel);
const tipText = (page) => page.get(() => { const t = document.getElementById('dd-tooltip'); return t && t.getClientRects().length && getComputedStyle(t).visibility !== 'hidden' && Number(getComputedStyle(t).opacity) > 0.05 ? t.textContent.trim() : null; });

test('account avatar opens its menu with a halo; Esc closes and returns focus', async ({ open, assert }) => {
  const page = await open('components/avatar');
  const rest = await shadow(page, ACCOUNT);
  await page.click(ACCOUNT);
  assert.equal(await page.attr(ACCOUNT, 'aria-expanded'), 'true');
  assert.ok(await page.visible(MENU));
  assert.ok(await page.get((m) => document.querySelector(m).contains(document.activeElement), MENU), 'focus moved into the menu');
  await page.hover('.doc-main h1'); // pointer away: the halo stays because the menu is open
  await page.sleep(200);
  assert.notEqual(await shadow(page, ACCOUNT), rest, 'halo while open');
  await page.press('Escape');
  assert.equal(await page.attr(ACCOUNT, 'aria-expanded'), 'false');
  assert.ok(!(await page.visible(MENU)));
  assert.ok(await isActive(page, ACCOUNT), 'focus back on the avatar');
});

test('keyboard: ↓ opens at the first item, Enter on Sign out closes the menu and says so', async ({ open, assert }) => {
  const page = await open('components/avatar');
  await page.focus(ACCOUNT);
  await page.press('ArrowDown');
  assert.equal(await page.attr(ACCOUNT, 'aria-expanded'), 'true');
  assert.equal(await page.text(':focus'), 'Profile');
  await page.press('End');
  assert.equal(await page.text(':focus'), 'Sign out');
  await page.press('Enter');
  assert.equal(await page.attr(ACCOUNT, 'aria-expanded'), 'false');
  await page.waitFor(() => [...document.querySelectorAll('.dd-toast')].some((t) => t.textContent.includes('Signed out')));
  assert.ok(await isActive(page, ACCOUNT), 'focus back on the avatar');
});

test('clicking outside closes the menu; rapid clicks on the avatar settle', async ({ open, assert }) => {
  const page = await open('components/avatar');
  await page.click(ACCOUNT);
  await page.click('.doc-main h1');
  assert.equal(await page.attr(ACCOUNT, 'aria-expanded'), 'false');
  for (let k = 0; k < 5; k++) await page.click(ACCOUNT);
  assert.equal(await page.attr(ACCOUNT, 'aria-expanded'), 'true', 'odd number of clicks leaves it open');
  assert.ok(await page.visible(MENU));
  await page.click(ACCOUNT);
  assert.equal(await page.attr(ACCOUNT, 'aria-expanded'), 'false');
});

test('reviewers: hover and focus bring an avatar forward and name it in a tooltip', async ({ open, assert }) => {
  const page = await open('components/avatar');
  const mai = REVIEWER('Mai Kha');
  const lift = () => page.get((s) => { const cs = getComputedStyle(document.querySelector(s)); return { z: cs.zIndex, t: cs.translate }; }, mai);
  assert.deepEqual(await lift(), { z: 'auto', t: 'none' });
  await page.hover(mai);
  await page.waitFor(() => document.getElementById('dd-tooltip')?.textContent.includes('Mai Kha'), { timeout: 2000 });
  assert.equal(await tipText(page), 'Mai Kha');
  assert.equal(await page.attr(mai, 'aria-describedby'), null, 'the tooltip repeats the name, so it is not announced twice');
  await page.sleep(200);
  assert.deepEqual(await lift(), { z: '1', t: '0px -2px' });
  // Keyboard: Tab to the next reviewer.
  await page.focus(mai);
  await page.press('Tab');
  assert.ok(await isActive(page, REVIEWER('Jonas Sauer')));
  await page.waitFor(() => document.getElementById('dd-tooltip')?.textContent.includes('Jonas Sauer'), { timeout: 2000 });
  assert.equal(await page.get((s) => getComputedStyle(document.querySelector(s)).zIndex, REVIEWER('Jonas Sauer')), '1');
  // The overflow avatar names who is hidden.
  await page.press('Tab', 'Tab');
  await page.waitFor(() => document.getElementById('dd-tooltip')?.textContent.includes('Tomás Cruz'), { timeout: 2000 });
  assert.equal(await page.attr('.ex-stage .dd-avatar-group > a.dd-avatar--more', 'aria-describedby'), 'dd-tooltip', 'the names add to “3 more reviewers”');
});

test('dusk: the halo shows on hover', async ({ open, assert }) => {
  const page = await open('components/avatar', { theme: 'dusk' });
  const rest = await shadow(page, ACCOUNT);
  await page.hover(ACCOUNT);
  await page.sleep(250);
  const on = await shadow(page, ACCOUNT);
  assert.notEqual(on, rest);
  assert.match(on, /3px/, 'a 3px halo');
});

test('375px: tap opens the account menu, tap outside closes it', async ({ open, assert }) => {
  const page = await open('components/avatar', { width: 375 });
  await page.tap(ACCOUNT);
  assert.equal(await page.attr(ACCOUNT, 'aria-expanded'), 'true');
  assert.ok(await page.get((m) => { const r = document.querySelector(m).getBoundingClientRect(); return r.left >= 0 && r.right <= innerWidth; }, MENU), 'menu stays on screen');
  await page.tap('.doc-main h1');
  assert.equal(await page.attr(ACCOUNT, 'aria-expanded'), 'false');
});
