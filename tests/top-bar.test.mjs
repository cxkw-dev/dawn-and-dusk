import { test } from './lib/test.mjs';

const bars = '.ex-stage .dd-top-bar';
const nth = (n) => `.ex:nth-of-type(${n}) .dd-top-bar`;
// Example order on the page: 1 app header · 2 avatar menu (shown open) · 3 narrow · 4 site header · 5 site header, narrow.
const userOf = (bar) => `${bar} .dd-top-bar__user`;
const isOpen = (page, sel) => page.get((s) => document.querySelector(s).open, sel);
const toasts = (page) => page.get(() => [...document.querySelectorAll('.dd-toast')].map((t) => t.textContent.replace(/\s+/g, ' ').trim()));

test('avatar menu: click opens, outside click closes, choosing an item closes', async ({ open, assert }) => {
  const page = await open('components/top-bar');
  const bar = await page.get(() => { const all = [...document.querySelectorAll('.ex .dd-top-bar')]; return all.length; });
  assert.ok(bar >= 5, 'five top bar examples');
  const U = userOf('.ex:nth-of-type(1) .dd-top-bar');
  // The pinned-open example starts open; opening another closes it (one dropdown at a time).
  assert.ok(await isOpen(page, userOf(nth(2))), 'second example starts open');
  await page.click(`${U} > summary`);
  assert.ok(await isOpen(page, U), 'opens on click');
  assert.ok(!(await isOpen(page, userOf(nth(2)))), 'the other open menu closed');
  assert.ok(await page.visible(`${U} .dd-top-bar__menu`), 'menu visible');
  // Not clipped by the example frame.
  const fits = await page.get((s) => { const m = document.querySelector(s).getBoundingClientRect(); return m.right <= innerWidth && m.width >= 200; }, `${U} .dd-top-bar__menu`);
  assert.ok(fits, 'menu fully on screen');

  await page.click('.doc-head h1');
  assert.ok(!(await isOpen(page, U)), 'outside click closes');

  await page.click(`${U} > summary`);
  await page.click(`${U} .dd-top-bar__menu-item[href]`);
  assert.ok(!(await isOpen(page, U)), 'choosing an item closes');
  assert.equal(await page.get(() => location.hash), '', 'placeholder link did not jump');

  // Rapid toggling stays consistent.
  for (let k = 0; k < 4; k++) await page.click(`${U} > summary`);
  assert.ok(!(await isOpen(page, U)), 'even number of clicks → closed');
});

test('avatar menu: keyboard — ↓ opens at the first item, ↑ ↓ move, Esc closes and returns focus', async ({ open, assert }) => {
  const page = await open('components/top-bar');
  const U = userOf(nth(1));
  await page.focus(`${U} > summary`);
  await page.press('ArrowDown');
  assert.ok(await isOpen(page, U), '↓ opens');
  assert.equal(await page.text(':focus'), 'Profile', 'focus on the first item');
  await page.press('ArrowDown');
  assert.equal(await page.text(':focus'), 'Settings⌘,');
  await page.press('ArrowUp', 'ArrowUp');
  assert.equal(await page.text(':focus'), 'Sign out', '↑ wraps to the last item');
  await page.press('Escape');
  assert.ok(!(await isOpen(page, U)), 'Esc closes');
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), `${U} > summary`), 'focus back on the avatar');
  await page.press('Enter');
  assert.ok(await isOpen(page, U), 'Enter on the summary opens it (native details)');
  await page.press('Escape');
});

test('avatar menu: "Toggle dusk" flips the theme and closes the menu', async ({ open, assert }) => {
  const page = await open('components/top-bar');
  const U = userOf(nth(1));
  await page.click(`${U} > summary`);
  await page.click(`${U} [data-dd-theme-toggle]`);
  assert.equal(await page.get(() => document.documentElement.dataset.theme), 'dusk');
  assert.ok(!(await isOpen(page, U)), 'menu closed after choosing');
  assert.equal(await page.attr(`${U} [data-dd-theme-toggle]`, 'aria-pressed'), 'true');
  await page.click(`${U} > summary`);
  await page.click(`${U} [data-dd-theme-toggle]`);
  assert.equal(await page.get(() => document.documentElement.dataset.theme), 'dawn');
  await page.get(() => localStorage.removeItem('dd-theme'));
});

test('demo buttons give feedback instead of doing nothing', async ({ open, assert }) => {
  const page = await open('components/top-bar');
  const A = nth(1);
  await page.click(`${A} .dd-top-bar__search`);
  await page.waitFor(() => document.querySelectorAll('.dd-toast').length >= 1);
  assert.match((await toasts(page)).join(' | '), /command palette/);
  await page.click(`${A} .dd-top-bar__switch:last-of-type`);
  await page.click(`${A} .dd-top-bar__icon-btn`);
  await page.click(`${A} .dd-btn--primary`);
  await page.waitFor(() => document.querySelectorAll('.dd-toast').length >= 4);
  const all = (await toasts(page)).join(' | ');
  assert.match(all, /Switch auth-gateway/);
  assert.match(all, /notifications/);
  assert.match(all, /deploy/i);
});

test('narrow bar (in its phone frame): menu button in, search an icon, extras out', async ({ open, assert }) => {
  const page = await open('components/top-bar');
  const N = nth(3);
  assert.ok(await page.visible(`${N} .dd-top-bar__nav-btn`), 'menu button shows');
  assert.ok(!(await page.visible(`${N} .dd-top-bar__context`)), 'context hidden');
  assert.ok(!(await page.visible(`${N} .dd-top-bar__wide`)), '__wide hidden');
  assert.ok(!(await page.visible(`${N} .dd-top-bar__search > span`)), 'search label hidden');
  assert.ok(await page.visible(`${N} .dd-top-bar__search`), 'search icon still there');
  // The wide example keeps everything.
  assert.ok(!(await page.visible(`${nth(1)} .dd-top-bar__nav-btn`)), 'wide bar has no menu button');
  assert.ok(await page.visible(`${nth(1)} .dd-top-bar__context`));
  // Its avatar menu opens inside the frame.
  const U = userOf(N);
  await page.click(`${U} > summary`);
  const inFrame = await page.get((s) => { const m = document.querySelector(`${s} .dd-top-bar__menu`).getBoundingClientRect(); const f = document.querySelector(s).closest('.tb-phone').getBoundingClientRect(); return m.left >= f.left - 1 && m.right <= f.right + 1 && m.bottom <= f.bottom + 1; }, U);
  assert.ok(inFrame, 'menu stays inside the phone frame');
  await page.click(`${N} .dd-top-bar__nav-btn`);
  await page.waitFor(() => [...document.querySelectorAll('.dd-toast')].some((t) => /side nav/.test(t.textContent)));
});

test('site header: links on wide; the narrow menu button opens a menu of the same links', async ({ open, assert }) => {
  const page = await open('components/top-bar');
  const W = nth(4), N = nth(5);
  assert.ok(await page.visible(`${W} .dd-top-bar__links`), 'links show when wide');
  assert.equal(await page.attr(`${W} .dd-top-bar__link[aria-current]`, 'aria-current'), 'page');
  assert.ok(!(await page.visible(`${W} .dd-top-bar__nav-btn`)));
  assert.ok(!(await page.visible(`${N} .dd-top-bar__links`)), 'links fold away when narrow');
  const btn = `${N} .dd-top-bar__nav-btn`;
  await page.click(btn);
  assert.equal(await page.attr(btn, 'aria-expanded'), 'true');
  assert.ok(await page.visible('#tb-site-menu-narrow'), 'menu opens');
  assert.deepEqual(await page.get(() => [...document.querySelectorAll('#tb-site-menu-narrow [role=menuitem]')].map((a) => a.textContent.trim())), ['Components', 'Guides', 'Changelog']);
  assert.ok(await page.get(() => document.getElementById('tb-site-menu-narrow').contains(document.activeElement)), 'focus moved into the menu');
  await page.press('ArrowDown');
  assert.equal(await page.text(':focus'), 'Guides');
  await page.press('Escape');
  assert.equal(await page.attr(btn, 'aria-expanded'), 'false');
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), btn), 'focus back on the menu button');
  // No toast for buttons that already do something.
  assert.equal((await toasts(page)).length, 0);
});

test('phone width (375): every bar folds to its narrow form and the menus work by touch', async ({ open, assert }) => {
  const page = await open('components/top-bar', { width: 375, height: 800 });
  const widths = await page.get((s) => [...document.querySelectorAll(s)].map((b) => b.scrollWidth <= b.clientWidth + 1), bars);
  assert.ok(widths.every(Boolean), 'no bar overflows sideways');
  assert.ok(await page.visible(`${nth(1)} .dd-top-bar__nav-btn`), 'app header shows its menu button');
  assert.ok(!(await page.visible(`${nth(1)} .dd-top-bar__context`)));
  const U = userOf(nth(1));
  await page.tap(`${U} > summary`);
  assert.ok(await isOpen(page, U), 'tap opens the avatar menu');
  const m = await page.get((s) => { const r = document.querySelector(`${s} .dd-top-bar__menu`).getBoundingClientRect(); return { l: r.left, r: r.right }; }, U);
  assert.ok(m.l >= 0 && m.r <= 375, `avatar menu on screen (${m.l}–${m.r})`);
  await page.tap('.doc-head h1');
  assert.ok(!(await isOpen(page, U)), 'tap outside closes');
  const btn = `${nth(4)} .dd-top-bar__nav-btn`;
  await page.tap(btn);
  assert.ok(await page.visible('#tb-site-menu'), 'site menu opens by tap');
  await page.tap('#tb-site-menu [role=menuitem]');
  assert.ok(!(await page.visible('#tb-site-menu')), 'choosing closes it');
});

test('dusk: the avatar menu floats on its own tone and the narrow theme button is pressed', async ({ open, assert }) => {
  const page = await open('components/top-bar', { theme: 'dusk', width: 375 });
  const U = userOf(nth(1));
  await page.click(`${U} > summary`);
  const c = await page.get((s) => { const m = getComputedStyle(document.querySelector(`${s} .dd-top-bar__menu`)); return { bg: m.backgroundColor, shadow: m.boxShadow }; }, U);
  assert.notEqual(c.bg, 'rgba(0, 0, 0, 0)');
  assert.notEqual(c.shadow, 'none', 'floating shadow');
  assert.equal(await page.attr(`${nth(4)} .dd-top-bar__narrow[data-dd-theme-toggle]`, 'aria-pressed'), 'true');
});

test('inside the docs’ app shell, example bars keep their own width rules: the shell reaches only its own top bar', async ({ open, assert }) => {
  // 860: the docs shell is narrow (its side nav off-canvas), yet the wide example bars show no menu button or __narrow.
  const page = await open('components/top-bar', { width: 860 });
  assert.ok(await page.visible('.doc-bar .dd-top-bar__nav-btn'), 'the docs’ own bar shows its menu button');
  assert.ok(await page.get((s) => document.querySelector(s).getBoundingClientRect().width > 640, nth(1)), 'the app header example is wide');
  assert.equal(await page.visible(`${nth(1)} .dd-top-bar__nav-btn`), false, 'no menu button in the wide app header');
  assert.ok(await page.visible(`${nth(1)} .dd-top-bar__context`), 'it keeps its context');
  assert.equal(await page.visible(`${nth(4)} .dd-top-bar__nav-btn`), false, 'no menu button in the wide site header');
  assert.equal(await page.visible(`${nth(4)} .dd-top-bar__narrow`), false, 'its narrow-only theme button stays hidden');
  assert.ok(await page.visible(`${nth(4)} .dd-top-bar__links`));
  // 1440: the docs shell is wide (its nav in view), yet the narrow examples keep their menu button and __narrow stand-in.
  const wide = await open('components/top-bar', { width: 1440 });
  assert.equal(await wide.visible('.doc-bar .dd-top-bar__nav-btn'), false, 'the docs bar drops its menu button');
  assert.ok(await wide.visible(`${nth(3)} .dd-top-bar__nav-btn`), 'the narrow app header keeps its menu button');
  assert.equal(await wide.visible(`${nth(3)} .dd-top-bar__context`), false, 'and folds its context away');
  assert.ok(await wide.visible(`${nth(5)} .dd-top-bar__nav-btn`));
  assert.ok(await wide.visible(`${nth(5)} .dd-top-bar__narrow`), 'the narrow site header shows its icon-only theme button');
  assert.equal(await wide.visible(`${nth(5)} .dd-top-bar__wide`), false, 'and hides its __wide items');
});

test('avatar menu: Esc pressed elsewhere on the page closes an open menu without pulling focus to it', async ({ open, assert }) => {
  const page = await open('components/top-bar');
  const U = userOf(nth(2)); // shown open on load
  assert.ok(await isOpen(page, U));
  await page.focus('.doc-main a[href]:not(.dd-top-bar a)');
  const before = await page.get(() => { document.activeElement.id ||= 'focus-here'; return document.activeElement.id; });
  const y = await page.get(() => scrollY);
  await page.press('Escape');
  assert.ok(!(await isOpen(page, U)), 'it closes');
  assert.equal(await page.active(), `#${before}`, 'focus stays where it was');
  assert.equal(await page.get(() => scrollY), y, 'the page does not jump to the menu');
  // From inside the menu, Esc still hands focus back to the avatar.
  await page.focus(`${U} > summary`);
  await page.press('ArrowDown', 'Escape');
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), `${U} > summary`));
});
