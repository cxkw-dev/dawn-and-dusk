import { test } from './lib/test.mjs';

// Every test shares one Chrome profile, so a fold persisted by one test would leak into the next: start clean.
const fresh = async (open, path, opts) => {
  const page = await open(path, opts);
  const dirty = await page.get(() => Object.keys(localStorage).filter((k) => k.startsWith('dd-side-nav:')).length);
  if (dirty) {
    await page.get(() => Object.keys(localStorage).filter((k) => k.startsWith('dd-side-nav:')).forEach((k) => localStorage.removeItem(k)));
    await reload(page);
  }
  return page;
};
const reload = async (page) => {
  await page.get(() => { window.__before = 1; location.reload(); });
  const end = Date.now() + 5000;
  for (;;) {
    try { if (await page.get(() => !window.__before && document.readyState === 'complete')) break; } catch { /* context swapped mid-poll */ }
    if (Date.now() > end) throw new Error('reload timed out');
    await page.sleep(60);
  }
  await page.sleep(300);
};
// The off-canvas nav slides for --dd-dur; wait until it has arrived (or left) before aiming at things inside it.
const settled = (page, nav) => page.waitFor((s) => {
  const n = document.querySelector(s); const left = n.getBoundingClientRect().left;
  const frame = n.parentElement.getBoundingClientRect().left;
  return n.classList.contains('is-mobile-open') ? Math.abs(left - frame) < 1 : getComputedStyle(n).visibility === 'hidden';
}, { args: [nav] });
const clearNavs = (page) => page.get(() => Object.keys(localStorage).filter((k) => k.startsWith('dd-side-nav:')).forEach((k) => localStorage.removeItem(k)));

const NAV = '#nav-demo';
const item = (nav, section) => `${nav} [data-dd-nav-section="${section}"]`;
const chevron = (nav) => `${nav} [data-dd-nav-toggle]`;
const pane = (nav, name) => `${nav} [data-dd-nav-pane="${name}"]`;
const paneShown = (page, nav, name) => page.get((s) => { const p = document.querySelector(s); return !p.hidden && p.getBoundingClientRect().width > 0; }, pane(nav, name));
const collapsed = (page, nav) => page.get((s) => document.querySelector(s).classList.contains('is-collapsed'), nav);
const panelWidth = (page, nav) => page.get((s) => document.querySelector(`${s} .dd-side-nav__panel`).getBoundingClientRect().width, nav);
const tip = (page, sel) => page.get((s) => { const cs = getComputedStyle(document.querySelector(s), '::after'); return { text: cs.content.replace(/^"|"$/g, ''), opacity: Number(cs.opacity) }; }, sel);

test('rail icons switch the panel and keep aria-current / aria-expanded in sync', async ({ open, assert }) => {
  const page = await fresh(open, 'components/side-nav');
  assert.ok(await paneShown(page, NAV, 'projects'), 'projects pane starts visible');
  assert.equal(await page.attr(item(NAV, 'projects'), 'aria-current'), 'true');
  assert.equal(await page.attr(item(NAV, 'projects'), 'aria-expanded'), 'true');

  await page.click(item(NAV, 'deploys'));
  assert.ok(await paneShown(page, NAV, 'deploys'), 'deploys pane shown');
  assert.equal(await page.get((s) => document.querySelector(s).hidden, pane(NAV, 'projects')), true, 'projects pane hidden');
  assert.equal(await page.attr(item(NAV, 'deploys'), 'aria-current'), 'true');
  assert.equal(await page.attr(item(NAV, 'projects'), 'aria-current'), null, 'old item lost aria-current');
  assert.equal(await page.attr(item(NAV, 'projects'), 'aria-expanded'), null, 'old item lost aria-expanded');
  assert.equal(await page.attr(item(NAV, 'deploys'), 'aria-expanded'), 'true');
  assert.ok(!(await collapsed(page, NAV)), 'switching keeps the panel open');

  // Keyboard: rail items are real buttons.
  await page.focus(item(NAV, 'logs'));
  await page.press('Enter');
  assert.ok(await paneShown(page, NAV, 'logs'), 'Enter on a rail icon switches the panel');
  await page.focus(item(NAV, 'projects'));
  await page.press('Space');
  assert.ok(await paneShown(page, NAV, 'projects'), 'Space on a rail icon switches the panel');
  assert.equal(await page.get(() => location.hash), '', 'no navigation to #');
});

test('pressing the active rail icon folds and unfolds the panel', async ({ open, assert }) => {
  const page = await fresh(open, 'components/side-nav');
  await page.click(item(NAV, 'projects'));
  assert.ok(await collapsed(page, NAV), 'folded');
  assert.equal(await page.attr(item(NAV, 'projects'), 'aria-expanded'), 'false');
  assert.equal(await page.attr(chevron(NAV), 'aria-expanded'), 'false');
  await page.waitFor((s) => document.querySelector(`${s} .dd-side-nav__panel`).getBoundingClientRect().width === 0, { args: [NAV] });
  assert.equal(await page.get((s) => getComputedStyle(document.querySelector(`${s} .dd-side-nav__panel`)).visibility, NAV), 'hidden', 'folded panel is out of the tab order');

  // A different section while folded unfolds onto that section.
  await page.click(item(NAV, 'deploys'));
  assert.ok(!(await collapsed(page, NAV)), 'unfolded');
  assert.ok(await paneShown(page, NAV, 'deploys'));
  assert.equal(await page.attr(chevron(NAV), 'aria-expanded'), 'true');
  await clearNavs(page);
});

test('the chevron folds the panel, updates its label, and the choice survives a reload', async ({ open, assert }) => {
  const page = await fresh(open, 'components/side-nav');
  await page.click(chevron(NAV));
  assert.ok(await collapsed(page, NAV));
  assert.equal(await page.attr(chevron(NAV), 'aria-expanded'), 'false');
  assert.equal(await page.attr(chevron(NAV), 'aria-label'), 'Expand navigation');
  assert.equal(await page.attr(chevron(NAV), 'data-label'), 'Expand');
  assert.equal(await page.get(() => localStorage.getItem('dd-side-nav:nav-demo')), 'collapsed');
  // Only this nav folded.
  assert.ok(!(await collapsed(page, '#nav-demo-groups')), 'other navs are independent');

  await reload(page);
  assert.ok(await collapsed(page, NAV), 'still folded after reload');
  assert.equal(await page.attr(chevron(NAV), 'aria-expanded'), 'false', 'aria restored');
  assert.equal(await page.attr(chevron(NAV), 'data-label'), 'Expand', 'tooltip restored');
  assert.equal(await page.get((s) => document.querySelector(s).classList.contains('is-restoring'), NAV), false, 'restore class removed');

  await page.click(chevron(NAV));
  assert.ok(!(await collapsed(page, NAV)));
  assert.equal(await page.get(() => localStorage.getItem('dd-side-nav:nav-demo')), 'open');
  await page.waitFor((s) => document.querySelector(`${s} .dd-side-nav__panel`).getBoundingClientRect().width > 200, { args: [NAV] });
  await clearNavs(page);
});

test('the collapsed example starts folded and unfolds; a stored "open" wins over the markup', async ({ open, assert }) => {
  const page = await fresh(open, 'components/side-nav');
  const C = '#nav-demo-collapsed';
  assert.ok(await collapsed(page, C), 'starts folded');
  assert.equal(await panelWidth(page, C), 0);
  assert.equal(await page.attr(chevron(C), 'aria-expanded'), 'false');
  await page.click(chevron(C));
  assert.ok(!(await collapsed(page, C)));
  await reload(page);
  assert.ok(!(await collapsed(page, C)), 'stored "open" beats is-collapsed in the markup');
  await clearNavs(page);
});

test('rapid clicks on the chevron settle in a consistent state', async ({ open, assert }) => {
  const page = await fresh(open, 'components/side-nav');
  for (let k = 0; k < 5; k++) await page.click(chevron(NAV));
  assert.ok(await collapsed(page, NAV), 'odd number of clicks → folded');
  assert.equal(await page.attr(chevron(NAV), 'aria-expanded'), 'false');
  assert.equal(await page.attr(item(NAV, 'projects'), 'aria-expanded'), 'false');
  await page.waitFor((s) => document.querySelector(`${s} .dd-side-nav__panel`).getBoundingClientRect().width === 0, { args: [NAV] });
  await clearNavs(page);
});

test('rail tooltips show on hover and keyboard focus, also on the folded rail', async ({ open, assert }) => {
  const page = await fresh(open, 'components/side-nav');
  const C = '#nav-demo-collapsed';
  const analytics = `${C} .dd-side-nav__item[data-label="Analytics"]`;
  assert.equal((await tip(page, analytics)).opacity, 0, 'hidden at rest');
  await page.hover(analytics);
  await page.waitFor((s) => Number(getComputedStyle(document.querySelector(s), '::after').opacity) === 1, { args: [analytics] });
  assert.equal((await tip(page, analytics)).text, 'Analytics');
  // The tooltip pokes out past the folded rail, into the page, and is not clipped by the nav.
  const box = await page.get((s) => { const el = document.querySelector(s); const nav = el.closest('.dd-side-nav').getBoundingClientRect(); const r = el.getBoundingClientRect(); return { navRight: nav.right, itemRight: r.right, overflow: getComputedStyle(el.closest('.dd-side-nav')).overflow }; }, analytics);
  assert.equal(box.overflow, 'visible', 'nav does not clip its tooltips');

  // Keyboard focus shows it too; the chevron's tooltip says what it will do.
  await page.hover('.doc-head');
  await page.focus(chevron(C));
  await page.press('Tab'); await page.press({ key: 'Tab', shift: true }); // make focus "visible"
  await page.waitFor((s) => Number(getComputedStyle(document.querySelector(s), '::after').opacity) === 1, { args: [chevron(C)] });
  assert.equal((await tip(page, chevron(C))).text, 'Expand');
  await page.press('Enter');
  assert.ok(!(await collapsed(page, C)), 'Enter on the chevron unfolds');
  assert.equal((await tip(page, chevron(C))).text, 'Collapse');
  await clearNavs(page);
});

test('groups in the panel open and close (native details)', async ({ open, assert }) => {
  const page = await fresh(open, 'components/side-nav');
  const groups = '#nav-demo-groups .dd-side-nav__group';
  const second = `${groups}:nth-of-type(2)`;
  assert.equal(await page.get((s) => document.querySelector(s).open, second), false);
  await page.click(`${second} > summary`);
  assert.equal(await page.get((s) => document.querySelector(s).open, second), true);
  await page.waitFor((s) => getComputedStyle(document.querySelector(s + ' .dd-side-nav__chev')).rotate === '180deg', { args: [second] });
  // Demo: following a page link makes it the current page.
  await page.click(`${second} .dd-side-nav__sub .dd-side-nav__link:nth-child(2)`);
  assert.equal(await page.attr(`${second} .dd-side-nav__sub .dd-side-nav__link:nth-child(2)`, 'aria-current'), 'page');
  assert.equal(await page.count('#nav-demo-groups [aria-current="page"]'), 1, 'only one current page');
  assert.equal(await page.text('#nav-demo-groups ~ .sn-page h3'), 'Jobs');
  assert.equal(await page.get(() => location.hash), '', 'no jump');
  await page.focus(`${second} > summary`);
  await page.press('Enter');
  assert.equal(await page.get((s) => document.querySelector(s).open, second), false, 'Enter toggles it closed');
});

test('off-canvas: menu button opens, Esc / scrim / link / chevron close, focus goes in and comes back', async ({ open, assert }) => {
  const page = await fresh(open, 'components/side-nav');
  const M = '#nav-demo-mobile';
  const btn = `[data-dd-nav-open="${M}"]`;
  const isOpen = () => page.get((s) => document.querySelector(s).classList.contains('is-mobile-open'), M);

  // The example starts open to show the state; it is live — close it first via the scrim.
  if (await isOpen()) {
    await page.get((s) => document.querySelector(s).scrollIntoView({ block: 'center' }), M);
    const frame = await page.get((s) => { const r = document.querySelector(s).closest('.sn-frame').getBoundingClientRect(); return { x: r.right - 20, y: r.bottom - 40 }; }, M);
    await page.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: frame.x, y: frame.y, button: 'left', clickCount: 1 });
    await page.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: frame.x, y: frame.y, button: 'left', clickCount: 1 });
    await page.sleep(100);
    assert.ok(!(await isOpen()), 'scrim click closes');
    assert.equal(await page.attr(btn, 'aria-expanded'), 'false');
  }

  await page.click(btn);
  assert.ok(await isOpen(), 'menu button opens');
  assert.equal(await page.attr(btn, 'aria-expanded'), 'true');
  await page.waitFor((s) => document.activeElement?.matches(`${s} [aria-current="page"]`), { args: [M] });
  await page.waitFor((s) => document.querySelector(s).getBoundingClientRect().left >= document.querySelector(s).closest('.sn-frame').getBoundingClientRect().left - 1, { args: [M] });

  await page.press('Escape');
  assert.ok(!(await isOpen()), 'Esc closes');
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), btn), 'focus back on the menu button');

  // The chevron inside an off-canvas nav closes it rather than folding.
  await page.click(btn);
  await settled(page, M);
  await page.click(chevron(M));
  assert.ok(!(await isOpen()), 'chevron closes the off-canvas nav');
  assert.ok(!(await collapsed(page, M)), 'and does not fold it');
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), btn), 'focus back on the menu button');

  // Switching a section inside the off-canvas nav keeps it open; following a link closes it.
  await page.click(btn);
  await settled(page, M);
  await page.click(item(M, 'deploys'));
  assert.ok(await isOpen(), 'switching sections keeps it open');
  assert.ok(await paneShown(page, M, 'deploys'));
  await page.click(`${pane(M, 'deploys')} .dd-side-nav__link`);
  assert.ok(!(await isOpen()), 'following a link closes it');
  assert.equal(await page.get(() => location.hash), '', 'placeholder link did not jump');
});

test('off-canvas: tabbing out closes it', async ({ open, assert }) => {
  const page = await fresh(open, 'components/side-nav');
  const M = '#nav-demo-mobile';
  const btn = `[data-dd-nav-open="${M}"]`;
  const isOpen = () => page.get((s) => document.querySelector(s).classList.contains('is-mobile-open'), M);
  if (!(await isOpen())) await page.click(btn);
  // Focus the last link of the visible pane, then Tab past it.
  await page.get((s) => [...document.querySelectorAll(`${s} .dd-side-nav__pane:not([hidden]) a[href]`)].pop().focus(), M);
  await page.sleep(80);
  assert.ok(await isOpen());
  await page.press('Tab');
  assert.ok(!(await isOpen()), 'focus left → closed');
  assert.ok(await page.get((s) => !document.querySelector(s).contains(document.activeElement), M), 'focus carried on into the page');

  // Shift+Tab out of the top closes it too; focus that never was inside (another example) leaves it open.
  await page.click(btn);
  await page.waitFor((s) => document.querySelector(s).contains(document.activeElement), { args: [M] });
  await page.focus(`${M} .dd-side-nav__logo`);
  await page.press({ key: 'Tab', shift: true });
  assert.ok(!(await isOpen()), 'Shift+Tab out closes');
  await page.click(btn);
  await page.waitFor((s) => document.querySelector(s).contains(document.activeElement), { args: [M] });
  await page.get(() => document.activeElement.blur()); // focus to nowhere (as on load, when the example starts open)
  assert.ok(await isOpen(), 'blur alone does not close it');
  await page.focus(chevron(NAV));
  assert.ok(await isOpen(), 'still open when focus moves between other things on the page');
});

test('phone width (375): off-canvas works by touch', async ({ open, assert }) => {
  const page = await fresh(open, 'components/side-nav', { width: 375, height: 760 });
  const M = '#nav-demo-mobile';
  const btn = `[data-dd-nav-open="${M}"]`;
  const isOpen = () => page.get((s) => document.querySelector(s).classList.contains('is-mobile-open'), M);
  if (await isOpen()) { await page.focus(btn); await page.press('Escape'); }
  assert.ok(!(await isOpen()));
  await page.tap(btn);
  assert.ok(await isOpen(), 'tap opens');
  await settled(page, M);
  const r = await page.get((s) => { const n = document.querySelector(s); const f = n.closest('.sn-frame').getBoundingClientRect(); return { navW: n.getBoundingClientRect().width, frameW: f.width }; }, M);
  assert.ok(r.navW <= r.frameW - 39, `nav leaves a strip of scrim to tap (${r.navW} of ${r.frameW})`);
  await page.tap(item(M, 'logs'));
  assert.ok(await paneShown(page, M, 'logs'), 'tap switches section');
  await page.sleep(350);
  assert.equal((await tip(page, item(M, 'logs'))).opacity, 0, 'no sticky hover tooltip after a tap');
  await page.tap(`${pane(M, 'logs')} .dd-side-nav__link`);
  assert.ok(!(await isOpen()), 'tapping a link closes it');

  // The two-level example still works at phone width: the page hides while the panel is open.
  await page.tap(chevron(NAV));
  assert.ok(await collapsed(page, NAV));
  assert.ok(await page.visible(`${NAV} ~ .sn-page`), 'page shows beside the folded rail');
  await page.tap(chevron(NAV));
  assert.ok(!(await collapsed(page, NAV)));
  await clearNavs(page);
});

test('dusk: active rail item and links read in ink on a deeper tone', async ({ open, assert }) => {
  const page = await fresh(open, 'components/side-nav', { theme: 'dusk' });
  await page.click(item(NAV, 'deploys'));
  await page.sleep(250); // let the colour transition finish
  const c = await page.get((s) => {
    const it = document.querySelector(s);
    const probe = document.createElement('i'); probe.style.color = 'var(--dd-text)'; it.append(probe);
    const ink = getComputedStyle(probe).color; probe.remove();
    return { color: getComputedStyle(it).color, ink, bg: getComputedStyle(it).backgroundColor, theme: document.documentElement.dataset.theme };
  }, item(NAV, 'deploys'));
  assert.equal(c.theme, 'dusk');
  assert.equal(c.color, c.ink, 'active rail icon in ink');
  assert.notEqual(c.bg, 'rgba(0, 0, 0, 0)', 'active rail icon on a tone');
  assert.ok(await paneShown(page, NAV, 'deploys'));
});

// ---------- off-canvas: focus on every close path, the menu button, the scroll lock ----------
const M = '#nav-demo-mobile';
const MBTN = `[data-dd-nav-open="${M}"]`;
const mOpen = (page) => page.get((s) => document.querySelector(s).classList.contains('is-mobile-open'), M);
const onMBtn = (page) => page.get((s) => document.activeElement === document.querySelector(s), MBTN);
const pressAt = async (page, { x, y }) => {
  await page.send('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', clickCount: 1 });
  await page.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', clickCount: 1 });
  await page.sleep(150);
};
const lockState = (page) => page.get(() => ({ lock: document.documentElement.classList.contains('dd-side-nav-lock'), overflow: getComputedStyle(document.documentElement).overflow }));
// Start with the demo closed (it is open in the markup, to show the state).
const closeDemo = async (page) => { if (await mOpen(page)) { await page.focus(MBTN); await page.press('Escape'); } await settled(page, M); };

test('off-canvas: a mouse click on the scrim puts focus back on the menu button, not on <body>', async ({ open, assert }) => {
  const page = await fresh(open, 'components/side-nav');
  await closeDemo(page);
  await page.click(MBTN);
  await settled(page, M);
  assert.ok(await page.get((s) => document.querySelector(s).contains(document.activeElement), M), 'focus went in');
  // A point on the scrim: inside the frame, right of the nav (centre the frame so its foot is on screen).
  const scrimPoint = () => page.get(async (s) => {
    const f = document.querySelector(s).closest('.sn-frame'); f.scrollIntoView({ block: 'center' });
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    const r = f.getBoundingClientRect(); return { x: r.right - 20, y: r.bottom - 40 };
  }, M);
  await pressAt(page, await scrimPoint());
  assert.ok(!(await mOpen(page)), 'the scrim closes it');
  assert.ok(await onMBtn(page), 'focus is back on the menu button');
  // By touch too.
  await page.click(MBTN);
  await settled(page, M);
  await page.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [await scrimPoint()] });
  await page.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await page.sleep(200);
  assert.ok(!(await mOpen(page)), 'a tap on the scrim closes it');
  assert.ok(await onMBtn(page), 'focus is back on the menu button');
});

test('off-canvas: a menu button above the scrim closes it on press (focus landing on it is no tab-out that reopens it)', async ({ open, assert }) => {
  const page = await fresh(open, 'components/side-nav');
  await closeDemo(page);
  // Lift the demo's top bar over the scrim, as an app might with a menu / close toggle.
  await page.get((s) => { document.querySelector(s).closest('.sn-frame').querySelector('.dd-top-bar').style.cssText = 'position: relative; z-index: 9999'; }, M);
  await page.click(MBTN);
  await settled(page, M);
  assert.ok(await page.get((s) => document.querySelector(s).contains(document.activeElement), M));
  await page.click(MBTN);
  assert.ok(!(await mOpen(page)), 'the press closes it and it stays closed');
  assert.equal(await page.attr(MBTN, 'aria-expanded'), 'false');
  assert.ok(await onMBtn(page), 'focus on the menu button');
  // A keyboard Tab onto the same button still counts as tabbing out.
  await page.press('Enter');
  await settled(page, M);
  assert.ok(await mOpen(page));
  await page.focus(`${M} .dd-side-nav__logo`);
  await page.press({ key: 'Tab', shift: true }, { key: 'Tab', shift: true });
  assert.ok(!(await mOpen(page)), 'tabbing back out closes it');
});

test('scroll lock: a nav over the window keeps the page behind still without shifting it; a nav fixed to its frame does not lock', async ({ open, assert }) => {
  const page = await fresh(open, 'components/side-nav', { width: 1280, height: 800 });
  await closeDemo(page);
  // The demo is fixed to its frame (contain: layout): no lock.
  await page.click(MBTN);
  await settled(page, M);
  assert.deepEqual(await lockState(page), { lock: false, overflow: 'visible' }, 'framed: the page still scrolls');
  await page.press('Escape');
  await settled(page, M);
  // Out of its frame it is fixed to the window, as a standalone off-canvas nav in an app.
  await page.get((s) => document.body.append(document.querySelector(s)), M);
  await page.evaluate(() => scrollTo(0, 900));
  await page.sleep(100);
  const before = await page.get(() => ({ y: scrollY, w: document.querySelector('.doc-main').getBoundingClientRect().width, x: document.querySelector('.doc-main').getBoundingClientRect().left }));
  await page.get((s) => document.querySelector(s).click(), MBTN);
  await page.waitFor((s) => Math.abs(document.querySelector(s).getBoundingClientRect().left) < 1, { args: [M] });
  assert.ok(await page.get((s) => document.querySelector(s).offsetParent === null, M), 'fixed to the window');
  assert.deepEqual(await lockState(page), { lock: true, overflow: 'hidden' }, 'locked');
  const during = await page.get(() => ({ y: scrollY, w: document.querySelector('.doc-main').getBoundingClientRect().width, x: document.querySelector('.doc-main').getBoundingClientRect().left }));
  assert.deepEqual(during, before, 'nothing moved or shifted sideways');
  await page.send('Input.dispatchMouseEvent', { type: 'mouseWheel', x: 900, y: 400, deltaX: 0, deltaY: 500 });
  await page.sleep(300);
  assert.equal(await page.get(() => scrollY), before.y, 'the wheel does not scroll the page behind');
  await pressAt(page, { x: 900, y: 400 });
  assert.ok(!(await mOpen(page)), 'the scrim closes it');
  assert.deepEqual(await lockState(page), { lock: false, overflow: 'visible' }, 'unlocked');
  assert.ok(await onMBtn(page), 'focus back on the menu button');
});

test('the panel scrolls with the sleek scrollbar: no track, a tonal thumb only while hovered or focused', async ({ open, assert }) => {
  const page = await fresh(open, 'components/side-nav', { theme: 'dusk' });
  const P = pane(NAV, 'projects');
  const bar = () => page.get((s) => { const cs = getComputedStyle(document.querySelector(s)); return { color: cs.scrollbarColor, width: cs.scrollbarWidth, gutter: cs.scrollbarGutter }; }, P);
  await page.hover('.doc-head');
  await page.sleep(400);
  assert.deepEqual(await bar(), { color: 'rgba(0, 0, 0, 0) rgba(0, 0, 0, 0)', width: 'thin', gutter: 'stable' }, 'invisible at rest');
  await page.hover(`${P} .dd-side-nav__link`);
  await page.sleep(400);
  const on = await bar();
  assert.match(on.color, /\/ 0\.2\) rgba\(0, 0, 0, 0\)$/, `thumb tinted from the text at 20%, no track (${on.color})`);
});

test('an author’s own toggle labels are kept (aria-expanded carries the state); a handled Esc leaves the off-canvas nav open', async ({ open, assert }) => {
  const page = await fresh(open, 'components/side-nav');
  await page.get(() => document.querySelector('.doc-main').insertAdjacentHTML('beforeend', `
    <nav class="dd-side-nav" aria-label="Haupt"><div class="dd-side-nav__rail">
      <button class="dd-side-nav__item dd-side-nav__collapse" type="button" id="sn-de" data-dd-nav-toggle aria-expanded="true" aria-label="Seitenleiste" data-label="Leiste">‹</button>
    </div></nav>`));
  await page.get(() => document.getElementById('sn-de').click());
  assert.deepEqual(await page.get(() => ['aria-expanded', 'aria-label', 'data-label'].map((a) => document.getElementById('sn-de').getAttribute(a))), ['false', 'Seitenleiste', 'Leiste']);
  await page.get(() => document.getElementById('sn-de').click());
  assert.deepEqual(await page.get(() => ['aria-expanded', 'aria-label', 'data-label'].map((a) => document.getElementById('sn-de').getAttribute(a))), ['true', 'Seitenleiste', 'Leiste']);

  const M = '#nav-demo-mobile';
  const isOpen = () => page.get((s) => document.querySelector(s).classList.contains('is-mobile-open'), M);
  if (await isOpen()) await page.press('Escape'); // the example starts open to show the state
  await page.click(`[data-dd-nav-open="${M}"]`);
  await page.waitFor((s) => document.querySelector(s).contains(document.activeElement), { args: [M] });
  await page.get(() => document.activeElement.addEventListener('keydown', (e) => e.preventDefault(), { once: true }));
  await page.press('Escape');
  assert.ok(await isOpen(), 'an Esc something inside handled is not the nav’s');
  await page.press('Escape');
  assert.ok(!(await isOpen()), 'the next Esc closes it');
});
