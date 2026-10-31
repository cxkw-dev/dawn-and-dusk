import { test } from './lib/test.mjs';

// The docs chrome: site/layouts/Docs.astro + site/scripts/docs.js (+ copy.js for Copy HTML) — per-example theme, code,
// copy, TOC, and the app shell the docs run on: side nav (#doc-nav: rail, panel, search, fold, off-canvas) and top bar.

// Tag the first n example frames so they can be addressed by selector: [data-t="ex0"], [data-t="ex1"]…
const tagFrames = (page, n = 3) => page.evaluate((k) => [...document.querySelectorAll('.ex-frame')].slice(0, k).forEach((f, i) => { f.dataset.t = `ex${i}`; }), n);
const stageTheme = (page, k) => page.attr(`[data-t="ex${k}"] .ex-stage`, 'data-theme');
const stageBg = (page, k) => page.get((s) => getComputedStyle(document.querySelector(s)).getPropertyValue('--dd-bg').trim().toLowerCase(), `[data-t="ex${k}"] .ex-stage`);

test('"View in dusk" flips only its own example, and back', async ({ open, assert }) => {
  const page = await open('components/button');
  await tagFrames(page);
  assert.equal(await stageTheme(page, 0), null);
  assert.ok(await page.visible('[data-t="ex0"] .ex-t-dusk'), 'label offers dusk');
  await page.click('[data-t="ex0"] [data-ex-theme]');
  assert.equal(await stageTheme(page, 0), 'dusk');
  assert.equal(await stageBg(page, 0), '#1c1916', 'the stage really is dusk');
  assert.ok(await page.visible('[data-t="ex0"] .ex-t-dawn'), 'label now offers dawn');
  assert.equal(await stageTheme(page, 1), null, 'the next example is untouched');
  assert.equal(await page.attr('html', 'data-theme'), 'dawn', 'the page is untouched');
  await page.click('[data-t="ex1"] [data-ex-theme]');
  assert.equal(await stageTheme(page, 1), 'dusk');
  await page.click('[data-t="ex0"] [data-ex-theme]');
  assert.equal(await stageTheme(page, 0), null, 'back to following the page');
  assert.equal(await stageTheme(page, 1), 'dusk', 'independent');
});

test('in dusk the button offers dawn, and a theme toggle inside an example drops the override', async ({ open, assert }) => {
  const page = await open('components/button', { theme: 'dusk' });
  await tagFrames(page);
  assert.ok(await page.visible('[data-t="ex0"] .ex-t-dawn'));
  await page.click('[data-t="ex0"] [data-ex-theme]');
  assert.equal(await stageTheme(page, 0), 'dawn');
  assert.equal(await stageBg(page, 0), '#f4efe7');
  const land = await open('patterns/landing');
  await land.click('.ex-frame [data-ex-theme]');
  assert.equal(await land.attr('.ex-stage', 'data-theme'), 'dusk');
  await land.click('.dd-pattern-landing [data-dd-theme-toggle]');
  assert.equal(await land.attr('html', 'data-theme'), 'dusk', 'the inner toggle flips the page');
  assert.equal(await land.attr('.ex-stage', 'data-theme'), null, 'and the example follows the page again');
});

test('Code shows and hides the source with aria-expanded in sync', async ({ open, assert }) => {
  const page = await open('components/button');
  await tagFrames(page);
  const btn = '[data-t="ex0"] [data-ex-code]';
  assert.equal(await page.attr(btn, 'aria-expanded'), 'false');
  assert.equal(await page.visible('[data-t="ex0"] .ex-code'), false);
  await page.click(btn);
  assert.equal(await page.attr(btn, 'aria-expanded'), 'true');
  assert.ok(await page.visible('[data-t="ex0"] .ex-code'));
  assert.equal(await page.visible('[data-t="ex1"] .ex-code'), false, 'other examples stay closed');
  await page.focus(btn);
  await page.press('Enter');
  assert.equal(await page.attr(btn, 'aria-expanded'), 'false', 'Enter toggles it back');
  assert.equal(await page.visible('[data-t="ex0"] .ex-code'), false);
});

test('Copy HTML puts exactly the example’s HTML on the clipboard and confirms', async ({ open, assert }) => {
  const page = await open('components/button');
  await tagFrames(page);
  await page.evaluate(() => {
    window.__clip = [];
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: (t) => { window.__clip.push(t); return Promise.resolve(); } } });
  });
  const btn = '[data-t="ex1"] [data-dd-copy]';
  await page.click(btn);
  const [copied] = await page.get(() => window.__clip);
  const source = await page.get(() => document.querySelector('[data-t="ex1"] .ex-code pre').textContent);
  assert.equal(copied, source.trim(), 'clipboard = the shown source');
  assert.ok(copied.startsWith('<') && copied.endsWith('>'), 'it is HTML, trimmed');
  assert.ok(!copied.includes('data-ex-'), 'no docs chrome in it');
  assert.ok(await page.visible(`${btn} .ex-copied`), 'shows Copied ✓');
  await page.waitFor((s) => !document.querySelector(s).hasAttribute('data-copied'), { args: [btn], timeout: 2500 });
  assert.ok(await page.visible(`${btn} .ex-copy`), 'label returns');
});

test('placeholder links inside examples don’t jump the page; real in-page links still work', async ({ open, assert }) => {
  const page = await open('patterns/landing');
  const link = '.dd-pattern-landing a[aria-label="GitHub"]';
  await page.evaluate((s) => document.querySelector(s).scrollIntoView({ block: 'center' }), link);
  await page.sleep(100);
  const y = await page.get(() => scrollY);
  assert.ok(y > 0, 'scrolled into the page');
  await page.click(link);
  assert.equal(await page.get(() => scrollY), y);
  assert.equal(await page.get(() => location.hash), '');
  // The section links inside the example are real anchors and still go somewhere.
  await page.click('.dd-pattern-landing .dd-top-bar__link[href="#landing-contact"]');
  await page.waitFor(() => Math.abs(document.getElementById('landing-contact').getBoundingClientRect().top) < 120);
  assert.equal(await page.get(() => location.hash), '#landing-contact');
});

test('On this page: built from the h2s, a click scrolls there and marks it, scrolling keeps it current', async ({ open, assert }) => {
  const page = await open('components/button', { width: 1440, height: 900, theme: 'dusk' });
  assert.ok(await page.visible('.doc-toc'));
  const heads = await page.get(() => [...document.querySelectorAll('.doc-main > h2')].map((h) => h.id));
  const links = await page.get(() => [...document.querySelectorAll('.doc-toc a')].map((a) => a.hash.slice(1)));
  assert.deepEqual(links, heads);
  const current = () => page.get(() => document.querySelector('.doc-toc a[aria-current]')?.hash.slice(1) ?? null);
  assert.equal(await current(), heads[0]);
  const target = heads[3];
  await page.click(`.doc-toc a[href="#${target}"]`);
  assert.equal(await current(), target, 'marked at once');
  await page.waitFor((id) => Math.abs(document.getElementById(id).getBoundingClientRect().top - 80) < 4, { args: [target], timeout: 3000 });
  assert.equal(await page.get(() => location.hash), `#${target}`);
  await page.sleep(300);
  assert.equal(await current(), target, 'still marked after the glide');
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitFor((id) => document.querySelector('.doc-toc a[aria-current]')?.hash === `#${id}`, { args: [heads[0]] });
  await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
  await page.waitFor((id) => document.querySelector('.doc-toc a[aria-current]')?.hash === `#${id}`, { args: [heads[heads.length - 1]] });
  assert.equal(await page.count('.doc-toc a[aria-current]'), 1, 'one current item');
});

test('pattern pages have no TOC (they are wide)', async ({ open, assert }) => {
  const page = await open('patterns/dashboard', { width: 1440 });
  assert.equal(await page.exists('.doc-toc'), false);
});

// ---------- the app shell: side nav (#doc-nav) and top bar (.doc-bar) ----------
const NAV = '#doc-nav';
const FOLD_KEY = 'dd-side-nav:doc-nav';
const MENU = '.doc-bar .dd-top-bar__nav-btn';
// The Chrome profile is shared by every test: a fold persisted here would leak into the next page, so start and end clean.
const unfold = (page) => page.get((k) => localStorage.removeItem(k), FOLD_KEY);
const shownPane = (page) => page.get(() => [...document.querySelectorAll('#doc-nav [data-dd-nav-pane]')].filter((p) => p.getClientRects().length).map((p) => p.dataset.ddNavPane));
const railCurrent = (page) => page.get(() => [...document.querySelectorAll('#doc-nav [data-dd-nav-section]')].filter((b) => b.getAttribute('aria-current') === 'true').map((b) => b.dataset.ddNavSection));
const titles = (page) => page.get(() => [...document.querySelectorAll('#doc-nav-list a[data-find]')].filter((a) => a.getClientRects().length).map((a) => a.textContent.trim()));
const isOpen = (page) => page.get(() => document.getElementById('doc-nav').classList.contains('is-mobile-open'));
// Navigate in the same tab and wait for the new document.
async function reload(page) {
  await page.evaluate(() => { window.__stale = true; });
  await page.send('Page.reload');
  const end = Date.now() + 6000;
  for (;;) {
    try { if (await page.evaluate(() => !window.__stale && document.readyState === 'complete')) break; } catch { /* navigating */ }
    if (Date.now() > end) throw new Error('reload timed out');
    await page.sleep(60);
  }
  await page.sleep(250);
}
// Follow a nav link without scrolling the list to it first (a pointer click would centre it).
const follow = async (page, href) => {
  await page.evaluate((h) => document.querySelector(`#doc-nav a[href$="${h}"]`).click(), href);
  await page.waitFor((h) => location.pathname.endsWith(h) && document.readyState === 'complete', { args: [href], timeout: 6000 });
  await page.sleep(250);
};

test('side nav: the rail marks the current section, its pane lists the pages, and the page is current', async ({ open, assert }) => {
  const page = await open('components/tabs', { width: 1440 });
  await unfold(page);
  assert.ok(await page.visible(`${NAV} .dd-side-nav__logo.dd-logo-tile`), 'the "d&" tile heads the rail');
  assert.equal(await page.attr(`${NAV} .dd-side-nav__logo`, 'href'), '/dawn-and-dusk/');
  assert.deepEqual(await page.get(() => [...document.querySelectorAll('#doc-nav [data-dd-nav-section]')].map((b) => b.getAttribute('aria-label'))), ['Start', 'Foundations', 'Components', 'Patterns']);
  assert.deepEqual(await railCurrent(page), ['components']);
  assert.deepEqual(await shownPane(page), ['components']);
  assert.equal(await page.count(`${NAV} [aria-current="page"]`), 1, 'one current page');
  assert.match(await page.attr(`${NAV} [aria-current="page"]`, 'href'), /\/components\/tabs$/);
  assert.ok(await page.visible(`${NAV} [aria-current="page"]`), 'the current page is in view in the panel');
  const sections = await page.get(() => [...document.querySelectorAll('#doc-nav [data-dd-nav-pane="components"] .dd-side-nav__section')].map((p) => p.textContent));
  assert.deepEqual(sections, ['Actions', 'Forms', 'Data display', 'Feedback & status', 'Navigation', 'Overlays', 'Layout'], 'components are grouped under micro-caps labels');
  assert.equal(await page.get(() => document.querySelectorAll('#doc-nav [data-dd-nav-pane="start"] a[data-find]').length), 2, 'start: introduction and the agent skill');
  // Another rail item switches the panel without navigating; the page stays current in its own pane.
  const url = await page.get(() => location.href);
  await page.click(`${NAV} [data-dd-nav-section="patterns"]`);
  assert.deepEqual(await shownPane(page), ['patterns']);
  assert.deepEqual(await railCurrent(page), ['patterns']);
  assert.equal(await page.get(() => location.href), url, 'no navigation');
  assert.deepEqual(await titles(page), ['Dashboard', 'Data explorer', 'Settings', 'Landing page']);
  await page.click(`${NAV} [data-dd-nav-section="foundations"]`);
  assert.deepEqual(await shownPane(page), ['foundations']);
  // Following a link lands on its page, with its section current.
  await page.click(`${NAV} [data-dd-nav-pane="foundations"] a[href$="/foundations/motion"]`);
  await page.waitFor(() => location.pathname.endsWith('/foundations/motion') && document.readyState === 'complete', { timeout: 6000 });
  await page.sleep(250);
  assert.deepEqual(await railCurrent(page), ['foundations']);
  assert.match(await page.attr(`${NAV} [aria-current="page"]`, 'href'), /\/foundations\/motion$/);
});

test('top bar: section / page breadcrumb, GitHub as a ghost icon button and the theme toggle; no section links', async ({ open, assert }) => {
  const page = await open('components/tabs', { width: 1440 });
  const crumbs = await page.get(() => [...document.querySelectorAll('.doc-bar .dd-breadcrumbs__link')].map((a) => [a.textContent.trim(), a.getAttribute('href'), a.getAttribute('aria-current')]));
  assert.deepEqual(crumbs, [['Components', '/dawn-and-dusk/components/button', null], ['Tabs', null, 'page']]);
  assert.ok(await page.visible('.doc-bar .dd-top-bar__context'), 'the context shows beside the nav');
  assert.equal(await page.visible(MENU), false, 'no menu button while the nav is in view');
  assert.equal(await page.visible('.doc-bar .dd-top-bar__brand'), false, 'the rail carries the logo');
  const gh = '.doc-bar a[href="https://github.com/cxkw-dev/dawn-and-dusk"]';
  assert.equal(await page.attr(gh, 'class'), 'dd-btn dd-btn--ghost dd-btn--icon');
  assert.equal(await page.attr(gh, 'aria-label'), 'GitHub');
  assert.ok(await page.exists('.doc-bar .doc-theme[data-dd-theme-toggle]'));
  assert.equal(await page.count('.doc-bar .dd-top-bar__links, .doc-toplinks'), 0, 'the rail replaces the section links');
  const label = () => page.get(() => document.querySelector('.doc-bar .doc-theme').innerText.trim());
  assert.equal(await label(), 'dawn', 'the toggle names the theme');
  await page.click('.doc-bar .doc-theme');
  assert.equal(await label(), 'dusk');
  await page.click('.doc-bar .doc-theme');
  // Home and pages outside the nav still get a context.
  const home = await open('', { width: 1440 });
  assert.equal(await home.text('.doc-bar .dd-breadcrumbs'), 'Start Introduction');
  assert.deepEqual(await railCurrent(home), ['start']);
  const lost = await open('404', { width: 1440 });
  assert.equal(await lost.text('.doc-bar .dd-breadcrumbs'), 'not found');
  assert.deepEqual(await shownPane(lost), ['start']);
  assert.equal(await lost.count(`${NAV} [aria-current="page"]`), 0);
});

test('fold: the chevron folds the panel to the rail, tooltips label the icons, and the fold is applied before paint on the next page', async ({ open, assert }) => {
  const page = await open('components/button', { width: 1440 });
  await unfold(page);
  const panelW = () => page.get(() => document.querySelector('#doc-nav .dd-side-nav__panel').getBoundingClientRect().width);
  const mainLeft = () => page.get(() => document.querySelector('.doc-app > .dd-app-shell__main').getBoundingClientRect().left);
  assert.equal(await panelW(), 224);
  const left = await mainLeft();
  await page.click(`${NAV} [data-dd-nav-toggle]`);
  await page.waitFor(() => document.querySelector('#doc-nav .dd-side-nav__panel').getBoundingClientRect().width === 0);
  assert.equal(await page.attr(`${NAV} [data-dd-nav-toggle]`, 'aria-expanded'), 'false');
  assert.ok((await mainLeft()) < left - 200, 'the page reflows into the room');
  assert.equal(await page.get((k) => localStorage.getItem(k), FOLD_KEY), 'collapsed');
  await page.hover(`${NAV} [data-dd-nav-section="patterns"]`);
  await page.waitFor(() => Number(getComputedStyle(document.querySelector('#doc-nav [data-dd-nav-section="patterns"]'), '::after').opacity) > 0.95);
  assert.equal(await page.get(() => getComputedStyle(document.querySelector('#doc-nav [data-dd-nav-section="patterns"]'), '::after').content), '"Patterns"', 'the rail shows its tooltip');
  // Next page: folded already when the parser finishes (before side-nav.js runs), so it never opens and closes.
  await page.send('Page.addScriptToEvaluateOnNewDocument', { source: `document.addEventListener('readystatechange', () => { if (document.readyState !== 'interactive') return; const n = document.getElementById('doc-nav'); window.__atParse = { folded: n.classList.contains('is-collapsed'), restoring: n.classList.contains('is-restoring'), w: n.querySelector('.dd-side-nav__panel').getBoundingClientRect().width }; });` });
  await reload(page);
  assert.deepEqual(await page.get(() => window.__atParse), { folded: true, restoring: true, w: 0 }, 'folded, without a transition, before the scripts');
  assert.equal(await panelW(), 0);
  assert.equal(await page.attr(`${NAV} [data-dd-nav-toggle]`, 'aria-label'), 'Expand navigation');
  assert.equal(await page.get(() => document.getElementById('doc-nav').classList.contains('is-restoring')), false, 'transitions are back after the first frames');
  // Unfold: remembered too.
  await page.click(`${NAV} [data-dd-nav-toggle]`);
  await page.waitFor(() => document.querySelector('#doc-nav .dd-side-nav__panel').getBoundingClientRect().width === 224);
  assert.equal(await page.get((k) => localStorage.getItem(k), FOLD_KEY), 'open');
  await unfold(page);
});

test('the content scrolls with the page: the side nav and top bar stick, anchors land under the bar, the nav keeps its own view transition name', async ({ open, assert }) => {
  const page = await open('components/button', { width: 1440, height: 900 });
  await page.evaluate(() => scrollTo(0, 1500));
  await page.sleep(100);
  const r = await page.get(() => ({
    y: scrollY,
    nav: document.getElementById('doc-nav').getBoundingClientRect().top,
    navH: document.getElementById('doc-nav').getBoundingClientRect().height,
    bar: document.querySelector('.doc-bar').getBoundingClientRect().top,
    toc: document.querySelector('.doc-toc').getBoundingClientRect().top,
    vt: [getComputedStyle(document.getElementById('doc-nav')).viewTransitionName, getComputedStyle(document.querySelector('.doc-bar')).viewTransitionName],
  }));
  assert.equal(r.y, 1500, 'the document scrolls');
  assert.equal(r.nav, 0, 'side nav sticks');
  assert.equal(r.navH, 900, 'full height');
  assert.equal(r.bar, 0, 'top bar sticks');
  assert.ok(r.toc >= 60 && r.toc < 120, 'the TOC sticks under the bar');
  assert.deepEqual(r.vt, ['doc-nav', 'doc-bar']);
  // An anchor jump lands below the sticky bar (scroll-padding on the document).
  const id = await page.get(() => document.querySelectorAll('.doc-main > h2')[2].id);
  await page.evaluate((h) => { location.hash = h; }, id);
  await page.waitFor((h) => Math.abs(document.getElementById(h).getBoundingClientRect().top - 80) < 4, { args: [id] });
  // Narrow: off-canvas, so no view transition name (it would freeze the sliding nav into the page swap).
  await page.send('Emulation.setDeviceMetricsOverride', { width: 375, height: 760, deviceScaleFactor: 1, mobile: true });
  await page.waitFor(() => getComputedStyle(document.getElementById('doc-nav')).position === 'fixed');
  assert.equal(await page.get(() => getComputedStyle(document.getElementById('doc-nav')).viewTransitionName), 'none');
});

for (const width of [375, 860]) {
  test(`off-canvas at ${width}: the top bar's menu button opens the side nav, focus goes to the current page, Esc / scrim / tab-out close it`, async ({ open, assert }) => {
    const page = await open('components/tabs', { width, height: 760 });
    assert.equal(await page.visible(NAV), false, 'out of view');
    assert.ok(await page.visible(MENU), 'menu button shows');
    assert.ok(await page.visible('.doc-bar .dd-top-bar__brand'), 'the wordmark shows in the bar');
    const settled = () => page.waitFor(() => { const n = document.getElementById('doc-nav'); return n.classList.contains('is-mobile-open') ? Math.abs(n.getBoundingClientRect().left) < 1 : getComputedStyle(n).visibility === 'hidden'; });
    await (width < 600 ? page.tap(MENU) : page.click(MENU));
    await settled();
    assert.equal(await page.attr(MENU, 'aria-expanded'), 'true');
    assert.ok(await page.visible(NAV));
    assert.ok(await page.get(() => document.activeElement === document.querySelector('#doc-nav [aria-current="page"]')), 'focus on the current page link');
    assert.ok(await page.get(() => { const l = document.getElementById('doc-nav-list').getBoundingClientRect(); const c = document.querySelector('#doc-nav [aria-current="page"]').getBoundingClientRect(); return c.top >= l.top && c.bottom <= l.bottom; }), 'and it is in view');
    assert.equal(await page.get(() => getComputedStyle(document.documentElement).overflow), 'hidden', 'the page stays put behind it');
    await page.press('Escape');
    await settled();
    assert.equal(await isOpen(page), false, 'Esc closes');
    assert.equal(await page.attr(MENU, 'aria-expanded'), 'false');
    assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), MENU), 'Esc returns focus to the menu button');
    assert.notEqual(await page.get(() => getComputedStyle(document.documentElement).overflow), 'hidden', 'scroll unlocked');
    // scrim
    await page.click(MENU);
    await settled();
    const { x, y } = await page.get(() => ({ x: innerWidth - 12, y: innerHeight - 40 }));
    await page.send('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', clickCount: 1 });
    await page.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', clickCount: 1 });
    await settled();
    assert.equal(await isOpen(page), false, 'a click on the scrim closes it');
    assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), MENU));
    // tab out past the last link
    await page.click(MENU);
    await settled();
    await page.evaluate(() => { const links = [...document.querySelectorAll('#doc-nav-list a')].filter((a) => a.getClientRects().length); links[links.length - 1].focus(); });
    await page.press('Tab');
    assert.equal(await isOpen(page), false, 'tabbing out closes it');
    assert.equal(await page.get(() => document.getElementById('doc-nav').contains(document.activeElement)), false);
    // the chevron closes it too, and widening the window takes it back into the page
    await page.click(MENU);
    await settled();
    await page.click(`${NAV} [data-dd-nav-toggle]`);
    await settled();
    assert.equal(await isOpen(page), false, 'the chevron closes it');
    await page.click(MENU);
    await settled();
    await page.send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
    await page.waitFor(() => !document.getElementById('doc-nav').classList.contains('is-mobile-open') && getComputedStyle(document.getElementById('doc-nav')).position === 'sticky');
    assert.equal(await page.attr(MENU, 'aria-expanded'), 'false');
    assert.ok(await page.visible(NAV), 'back in the page');
    assert.equal(await page.visible(MENU), false);
  });
}

test('the panel keeps its scroll position between pages and per section, and the current page stays in view', async ({ open, assert }) => {
  const page = await open('components/form-field', { width: 1440, height: 900 });
  await unfold(page);
  const list = () => page.get(() => document.getElementById('doc-nav-list').scrollTop);
  await page.evaluate(() => { document.getElementById('doc-nav-list').scrollTop = 120; });
  await page.sleep(100);
  await follow(page, '/components/text-input');
  assert.equal(await list(), 120, 'same place in the list on the next page');
  // Switch to another section and back: each keeps its place.
  await page.click(`${NAV} [data-dd-nav-section="start"]`);
  assert.equal(await list(), 0);
  await page.click(`${NAV} [data-dd-nav-section="components"]`);
  assert.equal(await list(), 120, 'back where the section was left');
  // A page far down the list scrolls it into view, however the list was left.
  await page.evaluate(() => { document.getElementById('doc-nav-list').scrollTop = 0; });
  await page.sleep(100);
  await follow(page, '/components/accordion');
  assert.ok(await page.get(() => { const l = document.getElementById('doc-nav-list').getBoundingClientRect(); const c = document.querySelector('#doc-nav [aria-current="page"]').getBoundingClientRect(); return c.top >= l.top && c.bottom <= l.bottom; }), 'current page in view');
  await unfold(page);
});

test('search: "/" focuses it, typing searches every section with other names, keys walk and open results, Esc restores the section', async ({ open, assert }) => {
  const page = await open('components/button', { width: 1440 });
  await unfold(page);
  await page.press('/');
  assert.equal(await page.get(() => document.activeElement.id), 'doc-find', '"/" focuses the search');
  assert.ok(await page.get(() => !!document.activeElement.closest('#doc-nav .dd-side-nav__panel')), 'it sits in the side nav panel');
  assert.ok(await page.exists('.doc-find .dd-input.dd-input--sm'), 'a system input');
  await page.type('modal');
  assert.deepEqual(await titles(page), ['Dialog'], 'another name finds the page');
  assert.equal(await page.text('#doc-find-status'), '1 page');
  assert.deepEqual(await shownPane(page), ['components'], 'empty sections hide');
  assert.deepEqual(await page.get(() => [...document.querySelectorAll('#doc-nav [data-dd-nav-pane="components"] .dd-side-nav__section')].filter((p) => p.getClientRects().length).map((p) => p.textContent)), ['Overlays'], 'and empty groups');
  await page.press('Escape');
  assert.equal(await page.get(() => document.getElementById('doc-find').value), '');
  assert.equal((await titles(page)).length, 59, 'Esc restores the section');
  // Every section is searched, whatever the rail is on; matches sit under their section's heading.
  await page.type('col');
  assert.deepEqual(await shownPane(page), ['foundations', 'components']);
  assert.deepEqual(await titles(page), ['Colors', 'Accordion']);
  const head = (p) => page.get((s) => [...document.querySelectorAll(`${s} .dd-side-nav__head > *`)].map((e) => e.textContent), `${NAV} [data-dd-nav-pane="${p}"]`);
  assert.deepEqual(await head('foundations'), ['foundations', '1'], 'the heading counts the matches');
  assert.equal(await page.get(() => document.querySelector('#doc-nav mark')?.textContent.toLowerCase()), 'col', 'the match is marked');
  await page.press('Escape');
  assert.deepEqual(await shownPane(page), ['components'], 'clearing brings back the section the rail is on');
  assert.deepEqual(await railCurrent(page), ['components']);
  assert.deepEqual(await head('components'), ['components', '59']);
  await page.type('tab');
  assert.ok((await titles(page)).includes('Tabs'));
  await page.press('ArrowDown');
  const first = await page.get(() => document.activeElement.textContent.trim());
  await page.press('ArrowDown');
  assert.notEqual(await page.get(() => document.activeElement.textContent.trim()), first, '↓ walks the results');
  await page.press('ArrowUp', 'ArrowUp');
  assert.equal(await page.get(() => document.activeElement.id), 'doc-find', '↑ from the first result returns to the field');
  await page.press('Escape');
  await page.type('zzz');
  assert.match(await page.text('#doc-find-status'), /Nothing matches/);
  assert.deepEqual(await shownPane(page), []);
  await page.press('Escape');
  await page.type('motion');
  await page.press('Enter');
  await page.waitFor(() => location.pathname.endsWith('/foundations/motion'), { timeout: 5000 });
});

test('search: "/" unfolds a folded rail first', async ({ open, assert }) => {
  const page = await open('components/button', { width: 1440 });
  await unfold(page);
  await page.click(`${NAV} [data-dd-nav-toggle]`);
  assert.ok(await page.get(() => document.getElementById('doc-nav').classList.contains('is-collapsed')));
  await page.press('/');
  assert.equal(await page.get(() => document.getElementById('doc-nav').classList.contains('is-collapsed')), false);
  assert.equal(await page.get(() => document.activeElement.id), 'doc-find');
  await unfold(page);
});

test('search at 375: "/" opens the off-canvas nav and focuses the field; Esc clears first, then closes', async ({ open, assert }) => {
  const page = await open('components/button', { width: 375, theme: 'dusk' });
  await page.press('/');
  await page.waitFor(() => document.getElementById('doc-nav').classList.contains('is-mobile-open'));
  await page.waitFor(() => document.activeElement.id === 'doc-find');
  await page.type('chip');
  assert.ok(await page.visible('#doc-nav a[href$="/components/chip"]'));
  await page.press('Escape');
  assert.equal(await page.get(() => document.getElementById('doc-find').value), '');
  assert.ok(await isOpen(page), 'the first Esc only clears the query');
  await page.press('Escape');
  assert.equal(await isOpen(page), false, 'the next one closes the nav');
});
