import { test } from './lib/test.mjs';

// Shared Chrome profile: a fold persisted by one test would leak into the next, so start and end clean.
const clearNavs = (page) => page.get(() => Object.keys(localStorage).filter((k) => k.startsWith('dd-side-nav:')).forEach((k) => localStorage.removeItem(k)));
const reload = async (page) => {
  await page.get(() => { window.__before = 1; location.reload(); });
  const end = Date.now() + 5000;
  for (;;) {
    try { if (await page.get(() => !window.__before && document.readyState === 'complete')) break; } catch { /* context swapped */ }
    if (Date.now() > end) throw new Error('reload timed out');
    await page.sleep(60);
  }
  await page.sleep(300);
};
const fresh = async (open, opts) => {
  const page = await open('components/app-shell', opts);
  if (await page.get(() => Object.keys(localStorage).some((k) => k.startsWith('dd-side-nav:')))) { await clearNavs(page); await reload(page); }
  return page;
};

const FULL = '#shell-demo-nav';
const PHONE = '#shell-demo-phone-nav';
const shellOf = (nav) => `.dd-app-shell:has(> ${nav})`;
const isOpen = (page, nav) => page.get((s) => document.querySelector(s).classList.contains('is-mobile-open'), nav);
// The off-canvas nav slides for --dd-dur: wait until it has arrived / left before aiming at things inside it.
const settled = (page, nav) => page.waitFor((s) => {
  const n = document.querySelector(s); const shell = n.parentElement.getBoundingClientRect();
  return n.classList.contains('is-mobile-open') ? Math.abs(n.getBoundingClientRect().left - shell.left) < 1 : getComputedStyle(n).visibility === 'hidden';
}, { args: [nav] });
const tapScrim = async (page, nav, touch = false) => {
  const p = await page.get((s) => { const n = document.querySelector(s); n.parentElement.scrollIntoView({ block: 'center' }); const r = n.parentElement.getBoundingClientRect(); return { x: r.right - 15, y: r.top + r.height / 2 }; }, nav);
  if (touch) {
    await page.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [p] });
    await page.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  } else {
    await page.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: p.x, y: p.y, button: 'left', clickCount: 1 });
    await page.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: p.x, y: p.y, button: 'left', clickCount: 1 });
  }
  await page.sleep(150);
};

test('wide shell: nav in the flow, chevron folds it and the page reflows; the fold is remembered', async ({ open, assert }) => {
  const page = await fresh(open);
  const shell = shellOf(FULL);
  assert.equal(await page.get((s) => document.querySelector(s).getBoundingClientRect().height, shell), 700, 'shell takes --dd-app-shell-h');
  assert.ok(!(await page.visible(`${shell} .dd-top-bar__nav-btn`)), 'no menu button while the nav is in view');
  assert.ok(await page.visible(`${shell} .dd-top-bar__context`), 'context shows');
  const mainW = () => page.get((s) => document.querySelector(`${s} .dd-app-shell__main`).getBoundingClientRect().width, shell);
  const before = await mainW();

  await page.click(`${FULL} [data-dd-nav-toggle]`);
  assert.equal(await page.attr(`${FULL} [data-dd-nav-toggle]`, 'aria-expanded'), 'false');
  await page.waitFor((s) => document.querySelector(`${s} .dd-side-nav__panel`).getBoundingClientRect().width === 0, { args: [FULL] });
  assert.ok((await mainW()) > before + 200, 'main column grew into the space');
  assert.equal(await page.get(() => localStorage.getItem('dd-side-nav:shell-demo-nav')), 'collapsed');

  await reload(page);
  assert.ok(await page.get((s) => document.querySelector(s).classList.contains('is-collapsed'), FULL), 'still folded after reload');
  await page.click(`${FULL} [data-dd-nav-toggle]`);
  assert.ok(!(await page.get((s) => document.querySelector(s).classList.contains('is-collapsed'), FULL)));
  await clearNavs(page);
});

test('wide shell: rail switches sections, a link becomes the page, content scrolls inside', async ({ open, assert }) => {
  const page = await fresh(open);
  const shell = shellOf(FULL);
  await page.click(`${FULL} [data-dd-nav-section="projects"]`);
  assert.ok(await page.get((s) => !document.querySelector(`${s} [data-dd-nav-pane="projects"]`).hidden, FULL));
  await page.click(`${FULL} [data-dd-nav-pane="projects"] .dd-side-nav__link`);
  assert.equal(await page.text(`${shell} .dd-page-header__title`), 'dawn-and-dusk', 'page header follows the link');
  assert.equal(await page.count(`${FULL} [aria-current="page"]`), 1);
  assert.equal(await page.get(() => location.hash), '', 'no jump');

  await page.click(`${shell} .dd-tabs__tab:nth-child(3)`);
  assert.equal(await page.attr(`${shell} .dd-tabs__tab:nth-child(3)`, 'aria-current'), 'page', 'tab link becomes current');
  assert.equal(await page.count(`${shell} .dd-tabs__tab[aria-current]`), 1);

  // Only the content area scrolls; the chrome stays put.
  const r = await page.get((s) => {
    const c = document.querySelector(`${s} .dd-app-shell__content`); const bar = document.querySelector(`${s} .dd-top-bar`);
    const top = bar.getBoundingClientRect().top; c.scrollTop = 400;
    return { scrolled: c.scrollTop, barMoved: bar.getBoundingClientRect().top - top, overflow: getComputedStyle(c).overflowY };
  }, shell);
  assert.ok(r.scrolled > 0, 'content scrolls');
  assert.equal(r.barMoved, 0, 'top bar stays');

  await page.click(`${shell} .dd-page-header__actions .dd-btn--secondary`);
  await page.waitFor(() => [...document.querySelectorAll('.dd-toast')].some((t) => /redeploys dawn-and-dusk/.test(t.textContent)));
});

test('phone frame: the nav is off-canvas; menu opens it, focus goes in; Esc / scrim / link close it', async ({ open, assert }) => {
  const page = await fresh(open);
  const shell = shellOf(PHONE);
  const btn = `${shell} [data-dd-nav-open]`;
  assert.ok(await page.visible(btn), 'menu button shows');
  assert.ok(await page.visible(`${shell} .dd-top-bar__brand.dd-top-bar__narrow`), 'logo shows in the bar');
  assert.ok(!(await page.visible(`${shell} .dd-top-bar__context`)), 'context folds away');
  assert.equal(await page.get((s) => getComputedStyle(document.querySelector(s)).visibility, PHONE), 'hidden', 'nav hidden off-canvas');
  const pageW = await page.get((s) => document.querySelector(`${s} .dd-app-shell__main`).getBoundingClientRect().width, shell);
  const shellW = await page.get((s) => document.querySelector(s).getBoundingClientRect().width, shell);
  assert.ok(Math.abs(pageW - shellW) < 2, 'page takes the full width');

  await page.click(btn);
  assert.ok(await isOpen(page, PHONE));
  assert.equal(await page.attr(btn, 'aria-expanded'), 'true');
  await settled(page, PHONE);
  assert.ok(await page.get((s) => document.activeElement?.matches(`${s} [aria-current="page"]`), PHONE), 'focus on the current page link');
  await page.press('Escape');
  assert.ok(!(await isOpen(page, PHONE)), 'Esc closes');
  assert.equal(await page.attr(btn, 'aria-expanded'), 'false');
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), btn), 'focus back on the menu button');

  await page.click(btn);
  await settled(page, PHONE);
  await tapScrim(page, PHONE);
  assert.ok(!(await isOpen(page, PHONE)), 'scrim closes');

  await page.click(btn);
  await settled(page, PHONE);
  await page.click(`${PHONE} [data-dd-nav-pane="services"] .dd-side-nav__link:nth-of-type(2)`);
  assert.ok(!(await isOpen(page, PHONE)), 'following a link closes it');
  assert.equal(await page.text(`${shell} .dd-page-header__title`), 'billing-worker');
  // The chevron on an off-canvas nav closes it instead of folding.
  await page.click(btn);
  await settled(page, PHONE);
  await page.click(`${PHONE} [data-dd-nav-toggle]`);
  assert.ok(!(await isOpen(page, PHONE)));
  assert.ok(!(await page.get((s) => document.querySelector(s).classList.contains('is-collapsed'), PHONE)), 'not folded');
  await clearNavs(page);
});

test('phone width (375): both shells go off-canvas and work by touch, in dusk', async ({ open, assert }) => {
  const page = await fresh(open, { width: 375, height: 800, theme: 'dusk' });
  const shell = shellOf(FULL);
  const btn = `${shell} [data-dd-nav-open]`;
  assert.ok(await page.visible(btn), 'menu button shows at 375');
  assert.equal(await page.get((s) => document.querySelector(s).scrollWidth <= document.querySelector(s).clientWidth + 1, `${shell} .dd-top-bar`), true, 'top bar does not overflow');
  await page.tap(btn);
  assert.ok(await isOpen(page, FULL), 'tap opens');
  await settled(page, FULL);
  const nav = await page.get((s) => { const n = document.querySelector(s).getBoundingClientRect(); const sh = document.querySelector(s).parentElement.getBoundingClientRect(); return { w: n.width, shell: sh.width }; }, FULL);
  assert.ok(nav.w <= nav.shell - 39, 'a strip of scrim stays tappable');
  // Scrim is the overlay token, not transparent.
  assert.notEqual(await page.get((s) => getComputedStyle(document.querySelector(s), '::before').backgroundColor, FULL), 'rgba(0, 0, 0, 0)');
  await page.tap(`${FULL} [data-dd-nav-section="projects"]`);
  assert.ok(await isOpen(page, FULL), 'switching section keeps it open');
  await tapScrim(page, FULL, true);
  assert.ok(!(await isOpen(page, FULL)), 'tap on the scrim closes');
  await page.tap(btn);
  await settled(page, FULL);
  await page.tap(`${FULL} [data-dd-nav-pane="projects"] .dd-side-nav__link:nth-of-type(3)`);
  assert.ok(!(await isOpen(page, FULL)), 'tapping a link closes');
  assert.equal(await page.text(`${shell} .dd-page-header__title`), 'ai-focus');
  await clearNavs(page);
});
