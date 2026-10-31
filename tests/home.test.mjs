import { test } from './lib/test.mjs';

// The introduction (site/pages/index.astro + site/styles/home.css): a cover split diagonally into dawn and dusk. The
// base face carries the page's theme and the overlay (cut along the seam) the other one; the seam is a slider.

const COVER = '.home-cover';
const HANDLE = '.home-cover .home-handle';
const themes = (page, sel = COVER) => page.get((s) => {
  const c = document.querySelector(s);
  return [c.querySelector('.home-face--base').dataset.theme, c.querySelector('.home-face--over').dataset.theme];
}, sel);
const value = (page) => page.get((s) => Number(document.querySelector(s).getAttribute('aria-valuenow')), HANDLE);
// How far the window (and the cut it carries) has slid, and the face inside it the other way.
const shift = (page) => page.get(() => {
  const x = (el) => new DOMMatrix(getComputedStyle(el).transform).m41;
  return { win: x(document.querySelector('.home-cover .home-window')), face: x(document.querySelector('.home-cover .home-face--over')) };
});
const settle = (page) => page.waitFor(() => !document.querySelector('.home-cover').classList.contains('is-intro'), { timeout: 6000 });

test('the cover is one composition cut into a dawn half and a dusk half, in both page themes', async ({ open, assert }) => {
  const dawn = await open('', { width: 1440 });
  assert.deepEqual(await themes(dawn), ['dawn', 'dusk'], 'dawn page: the base face is dawn, the cut-in face dusk');
  const over = await dawn.get(() => {
    const w = document.querySelector('.home-cover .home-window');
    return { clip: getComputedStyle(w).clipPath, inert: w.inert, hidden: w.getAttribute('aria-hidden') };
  });
  assert.match(over.clip, /^polygon/, 'the overlay is clipped along a polygon');
  assert.ok(over.inert && over.hidden === 'true', 'the overlay copy is inert and hidden from assistive tech');
  assert.equal(await dawn.get(() => document.querySelector('.home-cover .home-face--base').innerHTML === document.querySelector('.home-cover .home-face--over').innerHTML), true, 'both faces hold the same markup');
  // The seam's own geometry: at rest it crosses the cover (part of the cover in each light).
  await settle(dawn);
  const { win } = await shift(dawn);
  assert.ok(Math.abs(win) < 1, 'at rest the window is not shifted');

  const dusk = await open('', { theme: 'dusk', width: 1440 });
  assert.deepEqual(await themes(dusk), ['dusk', 'dawn'], 'dusk page: the base face is dusk, the cut-in face dawn');
  assert.deepEqual(await themes(dusk, '.home-collage'), ['dusk', 'dawn'], 'the component lookbook mirrors too');
  // Flipping the page theme flips the halves with it.
  await dusk.click('.doc-bar .doc-theme');
  assert.equal(await dusk.attr('html', 'data-theme'), 'dawn');
  assert.deepEqual(await themes(dusk), ['dawn', 'dusk']);
  assert.deepEqual(await themes(dusk, '.home-collage'), ['dawn', 'dusk']);
});

test('each caption names the light it sits in', async ({ open, assert }) => {
  const page = await open('', { width: 1440 });
  const shown = await page.get(() => [...document.querySelectorAll('.home-cover .home-face')].map((f) =>
    [...f.querySelectorAll('.home-when > span')].filter((s) => getComputedStyle(s).display !== 'none').map((s) => s.textContent.trim())));
  assert.deepEqual(shown, [['dawn', 'dawn'], ['dusk', 'dusk']]);
});

test('the calls to action open foundations, components and the agent skill', async ({ open, assert }) => {
  const page = await open('', { width: 1440 });
  const links = await page.get(() => [...document.querySelectorAll('.home-cover .home-face--base .home-cover__ctas a')].map((a) => [a.textContent.trim(), new URL(a.href).pathname]));
  assert.deepEqual(links, [
    ['Start with foundations', '/dawn-and-dusk/foundations/colors'],
    ['Browse components', '/dawn-and-dusk/components/button'],
    ['Agent skill', '/dawn-and-dusk/skill'],
  ]);
  assert.equal(await page.count('.home-cover .home-cover__ctas .dd-btn--primary'), 2, 'one primary per face (the overlay copy is inert)');
  const figures = await page.get(() => [...document.querySelectorAll('.home-figure')].map((a) => [a.querySelector('.home-figure__n').textContent, new URL(a.href).pathname]));
  assert.deepEqual(figures, [['59', '/dawn-and-dusk/components/button'], ['2', '/dawn-and-dusk/foundations/colors'], ['1', '/dawn-and-dusk/skill']]);
  // A real click on the primary lands on Colors, even though the inert overlay copy is drawn over part of the cover.
  await settle(page);
  await page.click('.home-cover .home-face--base .dd-btn--primary');
  await page.waitFor(() => location.pathname.replace(/\/$/, '').endsWith('/foundations/colors'));
});

test('the seam follows a pointer drag and the keyboard', async ({ open, assert }) => {
  const page = await open('', { width: 1440 });
  await settle(page);
  const rest = await value(page);
  assert.ok(rest > 20 && rest < 80, `rests mid-cover (${rest})`);
  assert.equal(await page.attr(HANDLE, 'role'), 'slider');
  // Drag the handle left: the overlay's light takes more of the cover.
  await page.drag(HANDLE, -260, 0);
  const left = await value(page);
  assert.ok(left < rest - 10, `dragging left lowers the value (${rest} → ${left})`);
  const s = await shift(page);
  assert.ok(s.win < -100, 'the window slid left');
  assert.ok(Math.abs(s.win + s.face) < 0.01, 'the face inside slid back by the same amount, so it stays put');
  // The handle stays on the line under the pointer.
  await page.drag(HANDLE, 180, 0);
  assert.ok(await value(page) > left, 'dragging right gives the base light back');
  // Keyboard: it is in the tab order right after the cover's links.
  await page.focus('.home-cover .home-face--base .home-cover__ctas a:last-child');
  await page.press('Tab');
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), HANDLE), 'Tab reaches the handle');
  await page.press('Home');
  assert.equal(await value(page), 0);
  assert.equal(await page.attr(HANDLE, 'aria-valuetext'), 'all dusk');
  await page.press('ArrowRight');
  assert.equal(await value(page), 5);
  await page.press('End');
  assert.equal(await value(page), 100);
  assert.equal(await page.attr(HANDLE, 'aria-valuetext'), 'all dawn');
  await page.press('PageDown');
  assert.equal(await value(page), 80);
  assert.match(await page.attr(HANDLE, 'aria-valuetext'), /^dawn 80%, dusk 20%$/);
});

test('focus on a link the overlay covers brings the seam back to rest', async ({ open, assert }) => {
  const page = await open('', { width: 1440 });
  await settle(page);
  const rest = await value(page);
  await page.focus(HANDLE);
  await page.press('Home');
  assert.equal(await value(page), 0, 'the overlay now covers the whole cover');
  await page.focus('.home-cover .home-face--base .dd-btn--primary');
  await page.waitFor((r) => Number(document.querySelector('.home-cover .home-handle').getAttribute('aria-valuenow')) >= r, { args: [rest] });
});

test('no horizontal overflow on a phone, in either theme', async ({ open, assert }) => {
  for (const theme of ['dawn', 'dusk']) {
    const page = await open('', { theme, width: 390, height: 844 });
    await settle(page);
    const [sw, cw] = await page.get(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
    assert.ok(sw <= cw, `${theme}: scrollWidth ${sw} ≤ ${cw}`);
    assert.deepEqual(await themes(page), theme === 'dawn' ? ['dawn', 'dusk'] : ['dusk', 'dawn']);
    // The phone's seam still crosses the lockup: the overlay is drawn over part of the cover.
    assert.ok(await page.visible(HANDLE), 'the handle is on screen');
  }
});

test('reduced motion: a still diagonal, no entrance, no drift, no scroll sweep', async ({ open, assert }) => {
  const page = await open('', { width: 1440 });
  await page.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await page.evaluate(() => location.reload());
  await page.sleep(1200);
  assert.equal(await page.get(() => document.querySelector('.home-cover').classList.contains('is-intro')), false, 'no entrance');
  assert.ok(Math.abs((await shift(page)).win) < 1, 'the seam is at rest straight away');
  assert.match(await page.get(() => getComputedStyle(document.querySelector('.home-cover .home-window')).clipPath), /^polygon/, 'still cut on the diagonal');
  // The mouse no longer pulls the line.
  const c = await page.get(() => { const r = document.querySelector('.home-cover').getBoundingClientRect(); return { x: r.left + 40, y: r.top + 200 }; });
  await page.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: c.x, y: c.y, button: 'none' });
  await page.sleep(400);
  assert.ok(Math.abs((await shift(page)).win) < 1, 'no pointer drift');
  assert.equal(await page.get(() => getComputedStyle(document.querySelector('.home-collage .home-window')).animationName), 'none', 'the lookbook seam does not sweep');
  // Direct manipulation still works.
  await page.focus(HANDLE);
  await page.press('End');
  assert.equal(await value(page), 100);
});
