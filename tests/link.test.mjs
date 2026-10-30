import { test } from './lib/test.mjs';

const css = (page, sel, prop, pseudo = null) => page.get((s, p) => getComputedStyle(document.querySelector(s))[p], sel, prop);
const inline = '.ex-stage p.dd-text a.dd-link';

test('hover takes the accent and turns the dots solid; arrows nudge and lift', async ({ open, assert }) => {
  for (const theme of ['dawn', 'dusk']) {
    const page = await open('components/link', { theme });
    const accent = await page.get(() => { const d = document.createElement('i'); d.style.color = 'var(--dd-accent)'; document.querySelector('.ex-stage').append(d); const c = getComputedStyle(d).color; d.remove(); return c; });
    assert.equal(await css(page, inline, 'textDecorationStyle'), 'dotted');
    await page.hover(inline);
    await page.waitFor((s, c) => getComputedStyle(document.querySelector(s)).color === c, { args: [inline, accent] });
    assert.equal(await css(page, inline, 'textDecorationStyle'), 'solid', `${theme}: solid on hover`);
    const arrow = '.dd-link--standalone > .dd-icon';
    await page.hover('.dd-link--standalone');
    await page.waitFor((s) => getComputedStyle(document.querySelector(s)).transform.endsWith('3, 0)'), { args: [arrow] });
    const ext = '.dd-link--external[href^="https://github"] > .dd-icon';
    const rest = await css(page, ext, 'transform');
    assert.notEqual(rest, 'none', 'external arrow is tilted at rest');
    await page.hover('.dd-link--external[href^="https://github"]');
    await page.waitFor((s, r) => getComputedStyle(document.querySelector(s)).transform !== r, { args: [ext, rest] });
  }
});

test('keyboard: Tab reaches links and draws the ring; the disabled link is skipped and inert', async ({ open, assert }) => {
  const page = await open('components/link');
  await page.get(() => { const h = document.querySelector('.doc-head h1'); h.tabIndex = -1; h.focus(); return true; });
  await page.press('Tab');
  assert.ok(await page.get(() => document.activeElement.matches('.ex-stage a.dd-link')), 'first Tab lands on the first link');
  assert.equal(await page.get(() => getComputedStyle(document.activeElement).outlineStyle), 'solid');
  const disabled = 'a.dd-link[aria-disabled="true"]';
  assert.ok(await page.get((s) => { const a = document.querySelector(s); a.focus(); return document.activeElement !== a; }, disabled), 'no href, so it cannot take focus');
  const before = await page.get(() => location.href);
  await page.click(disabled);
  assert.equal(await page.get(() => location.href), before);
});

test('placeholder links do not jump the page; new-tab links are rel=noopener', async ({ open, assert }) => {
  const page = await open('components/link');
  const muted = '.ex-stage .dd-link--muted';
  await page.get((s) => { document.querySelector(s).scrollIntoView({ block: 'center' }); return true; }, muted);
  const y = await page.get(() => scrollY);
  assert.ok(y > 0);
  await page.click(muted);
  assert.equal(await page.get(() => scrollY), y, 'page did not jump to the top');
  assert.equal(await page.get(() => location.hash), '');
  assert.ok(await page.get(() => [...document.querySelectorAll('.ex-stage a[target="_blank"]')].every((a) => /noopener/.test(a.rel))), 'every new-tab link has rel=noopener');
});

test('nav: the current page has a solid underline; a click makes that link current', async ({ open, assert }) => {
  const page = await open('components/link', { theme: 'dusk' });
  const nav = '.ex-stage .dd-link-nav';
  const current = () => page.get((s) => [...document.querySelectorAll(`${s} a`)].filter((a) => a.getAttribute('aria-current') === 'page').map((a) => a.textContent), nav);
  assert.deepEqual(await current(), ['Work']);
  const [on, off] = await page.get((s) => [...document.querySelectorAll(`${s} a`)].slice(0, 2).map((a) => getComputedStyle(a).textDecorationStyle + getComputedStyle(a).textDecorationColor), nav);
  assert.notEqual(on, off);
  await page.click(`${nav} a:nth-child(3)`);
  assert.deepEqual(await current(), ['Lab']);
  await page.focus(`${nav} a:nth-child(2)`);
  await page.press('Enter');
  assert.deepEqual(await current(), ['Writing']);
});

test('on ink: the focus ring switches to the page colour so it shows in dusk', async ({ open, assert }) => {
  const page = await open('components/link', { theme: 'dusk' });
  const ink = '.ex-stage a.dd-link--inverse:not(.dd-link--external)';
  await page.get(() => { const h = document.querySelector('h2#inverse'); h.tabIndex = -1; h.focus(); return true; });
  await page.press('Tab');
  let guard = 0;
  while (!(await page.get((s) => document.activeElement === document.querySelector(s), ink)) && guard++ < 6) await page.press('Tab');
  const [ring, normal] = await page.get((s) => [getComputedStyle(document.querySelector(s)).outlineColor, getComputedStyle(document.querySelector('.dd-link--standalone')).getPropertyValue('outline-color')], ink);
  assert.equal(await page.get(() => getComputedStyle(document.activeElement).outlineStyle), 'solid');
  assert.notEqual(ring, normal);
});

test('375px: links wrap inside their examples', async ({ open, assert }) => {
  const page = await open('components/link', { width: 375 });
  assert.ok(await page.get(() => [...document.querySelectorAll('.ex-stage .dd-link')].every((a) => a.getBoundingClientRect().right <= 376)), 'no link runs off the screen');
  await page.tap('.ex-stage .dd-link-nav a:nth-child(4)');
  assert.equal(await page.attr('.ex-stage .dd-link-nav a:nth-child(4)', 'aria-current'), 'page');
});
