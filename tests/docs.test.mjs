import { test } from './lib/test.mjs';

// The docs chrome: site/scripts/docs.js (+ copy.js for Copy HTML) — per-example theme, code, copy, mobile menu, TOC.

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

test('mobile docs menu: opens as a drawer, focuses the current page, closes on Esc / scrim / tab-out', async ({ open, assert }) => {
  const page = await open('components/tabs', { width: 375, height: 760 });
  const isOpen = () => page.get(() => document.getElementById('doc-side').classList.contains('is-open'));
  assert.equal(await page.visible('#doc-side'), false);
  await page.tap('.doc-menu');
  assert.equal(await page.attr('.doc-menu', 'aria-expanded'), 'true');
  await page.waitFor(() => { const r = document.getElementById('doc-side').getBoundingClientRect(); return r.left >= -1; });
  assert.ok(await page.visible('#doc-side'));
  assert.ok(await page.get(() => document.activeElement === document.querySelector('#doc-side [aria-current="page"]')), 'focus on the current page link');
  assert.ok(await page.get(() => document.documentElement.classList.contains('doc-nav-open')), 'page scroll locked');
  await page.press('Escape');
  assert.equal(await isOpen(), false);
  assert.equal(await page.attr('.doc-menu', 'aria-expanded'), 'false');
  assert.equal(await page.active(), 'button.doc-menu', 'Esc returns focus to the menu button');
  // scrim
  await page.click('.doc-menu');
  assert.ok(await isOpen());
  await page.sleep(350);
  await page.get(() => true);
  const { x, y } = await page.get(() => ({ x: innerWidth - 12, y: innerHeight - 40 }));
  await page.send('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', clickCount: 1 });
  await page.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', clickCount: 1 });
  await page.sleep(150);
  assert.equal(await isOpen(), false, 'a click on the scrim closes it');
  assert.equal(await page.active(), 'button.doc-menu');
  assert.equal(await page.get(() => document.documentElement.classList.contains('doc-nav-open')), false, 'scroll unlocked');
  // tab out past the last link
  await page.click('.doc-menu');
  await page.evaluate(() => { const links = document.querySelectorAll('#doc-side a'); links[links.length - 1].focus(); });
  await page.press('Tab');
  assert.equal(await isOpen(), false, 'tabbing out closes it');
  assert.equal(await page.get(() => document.getElementById('doc-side').contains(document.activeElement)), false);
  // the menu button toggles too, and widening the window closes it
  await page.click('.doc-menu');
  await page.click('.doc-menu');
  assert.equal(await isOpen(), false, 'the button closes it again');
  await page.click('.doc-menu');
  await page.send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
  await page.waitFor(() => !document.getElementById('doc-side').classList.contains('is-open'));
  assert.equal(await page.attr('.doc-menu', 'aria-expanded'), 'false');
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
