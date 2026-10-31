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

// ---------- page-scroll mode: these docs run on it (.doc-app = dd-app-shell dd-app-shell--page dd-app-shell--offcanvas-md) ----------
const DOCS = '.doc-app';
const DOCS_MENU = '.doc-bar .dd-top-bar__nav-btn';
const docsSettled = (page) => page.waitFor(() => {
  const n = document.getElementById('doc-nav');
  return n.classList.contains('is-mobile-open') ? Math.abs(n.getBoundingClientRect().left) < 1 : getComputedStyle(n).visibility === 'hidden';
});
const locked = (page) => page.get(() => ({
  lock: document.documentElement.classList.contains('dd-side-nav-lock'), overflow: getComputedStyle(document.documentElement).overflow,
}));
// A real wheel turn at (x, y), then let the scroll land.
const wheel = async (page, x, y, deltaY = 600) => { await page.send('Input.dispatchMouseEvent', { type: 'mouseWheel', x, y, deltaX: 0, deltaY }); await page.sleep(300); };

test('page-scroll mode (these docs): the document scrolls, the side nav and top bar stick, the content is no scroller', async ({ open, assert }) => {
  const page = await fresh(open, { width: 1440, height: 900 });
  assert.ok(await page.get((s) => document.querySelector(s).matches('.dd-app-shell.dd-app-shell--page'), DOCS), 'the docs shell is in page mode');
  await page.evaluate(() => scrollTo(0, 1400));
  await page.sleep(100);
  const r = await page.get((s) => {
    const shell = document.querySelector(s); const nav = shell.querySelector(':scope > .dd-side-nav'); const bar = shell.querySelector(':scope > .dd-app-shell__main > .dd-top-bar');
    const content = shell.querySelector(':scope > .dd-app-shell__main > .dd-app-shell__content');
    const box = (el) => el.getBoundingClientRect();
    return {
      y: scrollY, vh: innerHeight, shellH: box(shell).height, navTop: box(nav).top, navH: box(nav).height, barTop: box(bar).top,
      pos: [getComputedStyle(nav).position, getComputedStyle(bar).position],
      overflow: [getComputedStyle(shell).overflowY, getComputedStyle(content).overflowY], contain: getComputedStyle(shell).contain,
    };
  }, DOCS);
  assert.equal(r.y, 1400, 'the window scrolls');
  assert.ok(r.shellH > r.vh * 2, 'the shell grows with its content');
  assert.deepEqual(r.pos, ['sticky', 'sticky']);
  assert.equal(r.navTop, 0, 'side nav sticks');
  assert.equal(r.navH, r.vh, 'at the full window height');
  assert.equal(r.barTop, 0, 'top bar sticks');
  assert.deepEqual(r.overflow, ['visible', 'visible'], 'neither the shell nor its content is a scroll container');
  assert.equal(r.contain, 'none');
  // The frame-mode demos on the page keep the default: their height, and only their content scrolls.
  assert.equal(await page.get((s) => document.querySelector(s).getBoundingClientRect().height, shellOf(FULL)), 700);
  assert.equal(await page.get((s) => getComputedStyle(document.querySelector(`${s} > .dd-app-shell__main > .dd-app-shell__content`)).overflowY, shellOf(FULL)), 'auto');
});

test('page-scroll mode at 860: the off-canvas nav is fixed to the window wherever the page is, the page behind stays put, and widening drops it', async ({ open, assert }) => {
  const page = await fresh(open, { width: 860, height: 760 });
  await page.evaluate(() => scrollTo(0, 1600));
  await page.sleep(100);
  const y = await page.get(() => scrollY);
  // Open from the keyboard. (Chrome's focus() and a pointer click both scroll a sticky element "into view", so focus it
  // without scrolling: the button is in view.)
  await page.get((s) => document.querySelector(s).focus({ preventScroll: true }), DOCS_MENU);
  await page.press('Enter');
  await docsSettled(page);
  const r = await page.get(() => {
    const n = document.getElementById('doc-nav'); const b = n.getBoundingClientRect();
    return { top: Math.round(b.top), left: Math.round(b.left), h: Math.round(b.height), vh: innerHeight, toWindow: n.offsetParent === null, y: scrollY, focusIn: n.contains(document.activeElement) };
  });
  assert.deepEqual([r.top, r.left, r.h], [0, 0, r.vh], 'over the window, full height, scrolled or not');
  assert.ok(r.toWindow, 'fixed to the window, not to the shell');
  assert.equal(r.y, y, 'opening does not move the page');
  assert.ok(r.focusIn, 'focus went in');
  assert.deepEqual(await locked(page), { lock: true, overflow: 'hidden' }, 'the page is locked');
  await wheel(page, 835, 400);
  assert.equal(await page.get(() => scrollY), y, 'a wheel over the scrim does not scroll the page behind');

  await page.press('Escape');
  await docsSettled(page);
  assert.deepEqual(await locked(page), { lock: false, overflow: 'visible' }, 'unlocked on close');
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), DOCS_MENU), 'focus back on the menu button');
  await wheel(page, 835, 400);
  assert.ok((await page.get(() => scrollY)) > y, 'the page scrolls again');

  // Widening past the breakpoint while it is open: the nav is in view again, no longer "open", and the lock goes.
  await page.get((s) => document.querySelector(s).focus({ preventScroll: true }), DOCS_MENU);
  await page.press('Enter');
  await docsSettled(page);
  assert.equal((await locked(page)).lock, true);
  await page.send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
  await page.waitFor(() => !document.getElementById('doc-nav').classList.contains('is-mobile-open'));
  assert.deepEqual(await locked(page), { lock: false, overflow: 'visible' });
  assert.equal(await page.attr(DOCS_MENU, 'aria-expanded'), 'false');
  assert.equal(await page.get(() => getComputedStyle(document.getElementById('doc-nav')).position), 'sticky', 'back in the page, sticky');
});

test('the shell reaches only its own side nav and top bar: shells and bars in its content keep their own state', async ({ open, assert }) => {
  // 1440: the docs shell is wide (its nav in view), yet the phone demo inside still shows its menu button and logo.
  const page = await fresh(open, { width: 1440 });
  const phone = shellOf(PHONE);
  assert.equal(await page.visible(DOCS_MENU), false, 'the docs bar has no menu button');
  assert.ok(await page.visible(`${phone} .dd-top-bar__nav-btn`), 'the phone demo keeps its menu button');
  assert.ok(await page.visible(`${phone} .dd-top-bar__brand.dd-top-bar__narrow`), 'and its logo');
  assert.equal(await page.visible(`${phone} .dd-top-bar__context`), false, 'and folds its context away');

  // 860: the docs shell is narrow (its nav off-canvas), yet the 800px full demo keeps its nav in view and no menu button.
  const narrow = await fresh(open, { width: 860 });
  const full = shellOf(FULL);
  assert.ok(await narrow.visible(DOCS_MENU), 'the docs’ own menu button shows');
  assert.ok((await narrow.get((s) => document.querySelector(s).getBoundingClientRect().width, full)) >= 768, 'the demo shell is wide');
  assert.equal(await narrow.visible(`${full} .dd-top-bar__nav-btn`), false, 'no menu button leaks into the demo');
  assert.equal(await narrow.visible(`${full} .dd-top-bar__narrow`), false, 'nor the narrow-only logo');
  assert.ok(await narrow.visible(`${full} .dd-top-bar__context`), 'the demo keeps its context');
  assert.equal(await narrow.get((s) => getComputedStyle(document.querySelector(s)).position, FULL), 'relative', 'the demo nav stays in its shell’s flow');
  assert.ok(await narrow.visible(FULL));
});

test('breakpoints: --offcanvas-md / --offcanvas-lg move the off-canvas width; an explicit dd-side-nav--offcanvas wins at any width', async ({ open, assert }) => {
  const page = await fresh(open, { width: 1440, height: 900 });
  const S = shellOf(FULL);
  // Size the full demo shell and pick its breakpoint class; read back the nav and its top bar.
  const at = (w, cls) => page.get((s, w, c) => {
    const sh = document.querySelector(s);
    sh.style.width = w ? `${w}px` : '';
    sh.classList.remove('dd-app-shell--offcanvas-md', 'dd-app-shell--offcanvas-lg');
    if (c) sh.classList.add(`dd-app-shell--offcanvas-${c}`);
    const shown = (el) => getComputedStyle(el).display !== 'none';
    const nav = sh.querySelector(':scope > .dd-side-nav');
    return { w: Math.round(sh.getBoundingClientRect().width), off: getComputedStyle(nav).position === 'fixed', btn: shown(sh.querySelector('.dd-top-bar__nav-btn')), logo: shown(sh.querySelector('.dd-top-bar__narrow')) };
  }, S, w, cls);
  for (const [w, cls, off] of [[950, null, false], [950, 'md', false], [950, 'lg', true], [1030, 'lg', false], [850, null, false], [850, 'md', true], [850, 'lg', true], [760, null, true]]) {
    const r = await at(w, cls);
    const name = `${cls ? `--offcanvas-${cls}` : 'default'} at ${w}px`;
    assert.equal(r.w, w);
    assert.equal(r.off, off, `${name}: ${off ? 'off-canvas' : 'in view'}`);
    assert.equal(r.btn, off, `${name}: the menu button follows`);
    assert.equal(r.logo, off, `${name}: the narrow-only logo follows`);
  }
  await at(null, null);

  // An explicit --offcanvas nav in a wide shell: off-canvas, the bar keeps its menu button, and it works.
  await page.get((s) => document.querySelector(s).classList.add('dd-side-nav--offcanvas'), FULL);
  assert.equal(await page.get((s) => getComputedStyle(document.querySelector(s)).position, FULL), 'fixed', '--offcanvas beats the shell');
  await page.waitFor((s) => getComputedStyle(document.querySelector(s)).visibility === 'hidden', { args: [FULL] }); // after its exit transition
  const btn = `${S} [data-dd-nav-open]`;
  assert.ok(await page.visible(btn), 'menu button shows on a wide shell');
  assert.ok(await page.visible(`${S} .dd-top-bar__narrow`), 'and the logo');
  const main = await page.get((s) => [document.querySelector(`${s} > .dd-app-shell__main`).getBoundingClientRect().width, document.querySelector(s).getBoundingClientRect().width], S);
  assert.ok(Math.abs(main[0] - main[1]) < 1, 'the page takes the full width');
  await page.click(btn);
  await settled(page, FULL);
  assert.ok(await isOpen(page, FULL));
  assert.ok(await page.get((s) => document.querySelector(s).offsetParent === document.querySelector(s).parentElement, FULL), 'fixed to its frame-mode shell');
  assert.equal((await locked(page)).lock, false, 'a nav fixed to its frame doesn’t lock the page');
  await page.press('Escape');
  assert.ok(!(await isOpen(page, FULL)));
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), btn), 'focus back on the menu button');
  await page.get((s) => document.querySelector(s).classList.remove('dd-side-nav--offcanvas'), FULL);
  assert.equal(await page.get((s) => getComputedStyle(document.querySelector(s)).position, FULL), 'relative', 'back in the flow without it');
  await clearNavs(page);
});

test('phone frame: a mouse click on the scrim returns focus to the menu button; tabbing out onto the menu button closes it', async ({ open, assert }) => {
  const page = await fresh(open);
  const shell = shellOf(PHONE);
  const btn = `${shell} [data-dd-nav-open]`;
  const onBtn = () => page.get((s) => document.activeElement === document.querySelector(s), btn);
  await page.click(btn);
  await settled(page, PHONE);
  assert.ok(await page.get((s) => document.querySelector(s).contains(document.activeElement), PHONE), 'focus inside');
  await tapScrim(page, PHONE);
  assert.ok(!(await isOpen(page, PHONE)), 'the scrim closes it');
  assert.ok(await onBtn(), 'focus is back on the menu button, not on <body>');

  // In the shell the nav comes first, so the stop after its last link is the top bar's menu button.
  await page.click(btn);
  await settled(page, PHONE);
  await page.get((s) => [...document.querySelectorAll(`${s} .dd-side-nav__pane:not([hidden]) a[href]`)].pop().focus(), PHONE);
  await page.press('Tab');
  assert.ok(!(await isOpen(page, PHONE)), 'tabbing onto the menu button closes it');
  assert.ok(await onBtn(), 'focus is on the menu button');
  assert.equal(await page.attr(btn, 'aria-expanded'), 'false');
  await page.press('Enter');
  assert.ok(await isOpen(page, PHONE), 'Enter opens it again');
  assert.equal((await locked(page)).lock, false, 'a nav fixed to its frame doesn’t lock the page');
  await page.press('Escape');
  assert.ok(await onBtn());
  await clearNavs(page);
});

test('tables follow the shell: no cell grain on a frame-mode shell’s plain page, the page grain in page mode', async ({ open, assert }) => {
  const grain = (page) => page.get(() => getComputedStyle(document.querySelector('.dd-data-table')).getPropertyValue('--_grain').trim());
  const page = await open('components/data-table', { theme: 'dusk' });
  assert.ok(await page.get(() => !document.querySelector('.dd-data-table').closest('.ex-stage .dd-app-shell')), 'the first table sits right in the docs (page mode)');
  assert.notEqual(await grain(page), 'none', 'page mode keeps the grain');
  // A frame-mode shell (the default) holding a dense table: the shell has a plain page, so the table drops its grain.
  const framed = await page.get(() => {
    const host = document.querySelector('.ex-stage');
    host.insertAdjacentHTML('beforeend', '<div class="dd-app-shell" style="--dd-app-shell-h: 200px" id="frame-shell"><div class="dd-app-shell__main"><div class="dd-app-shell__content"><div class="dd-data-table" id="framed-table"></div></div></div></div>');
    return getComputedStyle(document.getElementById('framed-table')).getPropertyValue('--_grain').trim();
  });
  assert.equal(framed, 'none', 'the frame-mode shell drops it');
});
