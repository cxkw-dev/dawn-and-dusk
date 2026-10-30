import { test } from './lib/test.mjs';

// Where a range input's thumb is, from its value (positions run thumb-centre to thumb-centre).
const thumb = (page, id) => page.get((i) => {
  const el = document.getElementById(i);
  el.scrollIntoView({ block: 'center' });
  const r = el.getBoundingClientRect();
  const t = parseFloat(getComputedStyle(el.closest('.dd-slider')).getPropertyValue('--_thumb')) || 18;
  const min = Number(el.min || 0); const max = Number(el.max || 100);
  return { x: r.left + t / 2 + (r.width - t) * ((el.value - min) / (max - min)), y: r.top + r.height / 2, w: r.width - t };
}, id);
const mouse = (page, type, x, y, buttons = 0) => page.send('Input.dispatchMouseEvent', { type, x, y, button: type === 'mouseMoved' && !buttons ? 'none' : 'left', buttons, clickCount: 1 });
async function dragBy(page, x, y, dx, steps = 10) {
  await mouse(page, 'mouseMoved', x, y);
  await mouse(page, 'mousePressed', x, y, 1);
  for (let k = 1; k <= steps; k++) await mouse(page, 'mouseMoved', x + (dx * k) / steps, y, 1);
  await mouse(page, 'mouseReleased', x + dx, y);
  await page.sleep(120);
}
const val = (page, id) => page.get((i) => Number(document.getElementById(i).value), id);
const out = (page, id) => page.text(`output[for="${id}"]`);
const listen = (page) => page.get(() => { window.__ch = []; document.addEventListener('dd:change', (e) => window.__ch.push({ value: e.detail.value, id: e.detail.input.id, on: e.target.className })); });
const changes = (page) => page.get(() => window.__ch);
const activeTicks = (page, id) => page.get((i) => [...document.getElementById(i).closest('.dd-slider').querySelectorAll('.dd-slider__ticks > .is-active')].map((t) => t.dataset.value), id);

test('keyboard steps, jumps and ends; output, fill and tick follow; dd:change fires', async ({ open, assert }) => {
  const page = await open('components/slider');
  await listen(page);
  await page.focus('#sl-1');
  await page.press('ArrowRight');
  assert.equal(await val(page, 'sl-1'), 5);
  assert.equal(await out(page, 'sl-1'), '5');
  assert.deepEqual(await activeTicks(page, 'sl-1'), ['5']);
  assert.equal(await page.get(() => document.getElementById('sl-1').closest('.dd-slider').style.getPropertyValue('--_p')), '0.4444', 'fill follows');
  await page.press('ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowDown');
  assert.equal(await val(page, 'sl-1'), 3);
  await page.press('End');
  assert.equal(await out(page, 'sl-1'), '10');
  await page.press('Home');
  assert.equal(await out(page, 'sl-1'), '1');
  assert.deepEqual(await activeTicks(page, 'sl-1'), ['1']);
  await page.press('PageUp');
  assert.ok((await val(page, 'sl-1')) > 1, 'Page Up jumps');
  const ch = await changes(page);
  assert.ok(ch.length >= 7, 'every key step commits');
  assert.deepEqual(ch[0], { value: 5, id: 'sl-1', on: 'dd-slider' });
  // The bubble slider jumps a tenth of its range with Page Up / Down.
  await page.focus('#sl-3');
  await page.press('PageUp');
  assert.equal(await val(page, 'sl-3'), 35);
  assert.equal(await page.text('.dd-slider__bubble[data-for="sl-3"]'), '35%', 'bubble follows');
  await page.press('PageDown', 'PageDown');
  assert.equal(await page.text('.dd-slider__bubble[data-for="sl-3"]'), '15%');
});

test('drag and click: the thumb follows the pointer, dd:change fires on release', async ({ open, assert }) => {
  const page = await open('components/slider', { theme: 'dusk' });
  await listen(page);
  const t = await thumb(page, 'sl-1');
  await dragBy(page, t.x, t.y, t.w * (3 / 9)); // three steps right
  assert.equal(await val(page, 'sl-1'), 7);
  assert.equal(await out(page, 'sl-1'), '7');
  assert.deepEqual(await activeTicks(page, 'sl-1'), ['7']);
  assert.deepEqual((await changes(page)).map((c) => c.value), [7], 'one dd:change on release, not one per move');
  // Clicking the track jumps there.
  const b = await thumb(page, 'sl-3');
  await mouse(page, 'mousePressed', b.x - b.w * 0.25 + b.w * 0.75, b.y, 1); // 75%
  await mouse(page, 'mouseReleased', b.x - b.w * 0.25 + b.w * 0.75, b.y);
  await page.sleep(100);
  assert.equal(await val(page, 'sl-3'), 75);
  assert.equal(await page.get(() => getComputedStyle(document.querySelector('.dd-slider__bubble[data-for="sl-3"]')).getPropertyValue('--_p').trim()), '0.7500', 'bubble rides to 75%');
});

test('range: thumbs drag independently, can’t cross, and the fill, bubbles, ticks follow', async ({ open, assert }) => {
  const page = await open('components/slider');
  await listen(page);
  const lo = await thumb(page, 'sl-2a');
  await dragBy(page, lo.x, lo.y, lo.w * (100 / 500)); // 80 → 180
  assert.equal(await val(page, 'sl-2a'), 180);
  assert.equal(await out(page, 'sl-2a'), '180');
  assert.equal(await page.text('.dd-slider__bubble[data-for="sl-2a"]'), '180 ms');
  assert.deepEqual(await activeTicks(page, 'sl-2a'), ['200', '300']);
  assert.deepEqual((await changes(page)).at(-1), { value: [180, 320], id: 'sl-2a', on: 'dd-slider dd-slider--range' });
  // Drag the low thumb past the high one: it stops at the high value.
  const lo2 = await thumb(page, 'sl-2a');
  await dragBy(page, lo2.x, lo2.y, lo2.w * (250 / 500));
  assert.equal(await val(page, 'sl-2a'), 320, 'low thumb stops at the high one');
  assert.equal(await val(page, 'sl-2b'), 320);
  const fill = await page.get(() => { const s = document.getElementById('sl-2a').closest('.dd-slider').style; return [s.getPropertyValue('--_lo'), s.getPropertyValue('--_hi')]; });
  assert.deepEqual(fill, ['0.6400', '0.6400']);
  // Keyboard on the high thumb: Home stops at the low thumb, End goes to the max.
  await page.focus('#sl-2b');
  await page.press('End');
  assert.equal(await out(page, 'sl-2b'), '500');
  await page.press('Home');
  assert.equal(await val(page, 'sl-2b'), 320, 'Home on the high thumb stops at the low one');
  await page.press('ArrowRight', 'ArrowRight');
  assert.equal(await val(page, 'sl-2b'), 340);
  await page.focus('#sl-2a');
  await page.press('ArrowRight', 'ArrowRight', 'ArrowRight');
  assert.equal(await val(page, 'sl-2a'), 340, 'low thumb can’t pass the high one with keys either');
  assert.deepEqual((await changes(page)).at(-1).value, [340, 340]);
});

test('range: stacked thumbs at either end can still be pulled apart with the pointer', async ({ open, assert }) => {
  const page = await open('components/slider');
  // Both thumbs at the bottom end.
  await page.focus('#sl-2a'); await page.press('Home');
  await page.focus('#sl-2b'); await page.press('Home');
  assert.deepEqual([await val(page, 'sl-2a'), await val(page, 'sl-2b')], [0, 0]);
  let t = await thumb(page, 'sl-2b');
  await dragBy(page, t.x, t.y, t.w * 0.2);
  assert.equal(await val(page, 'sl-2b'), 100, 'the high thumb comes off the bottom end');
  // Both at the top end.
  await page.focus('#sl-2b'); await page.press('End');
  await page.focus('#sl-2a'); await page.press('End');
  assert.deepEqual([await val(page, 'sl-2a'), await val(page, 'sl-2b')], [500, 500]);
  t = await thumb(page, 'sl-2a');
  await dragBy(page, t.x, t.y, -t.w * 0.2);
  assert.equal(await val(page, 'sl-2a'), 400, 'the low thumb comes off the top end');
});

test('disabled slider ignores pointer and keyboard; sliders are independent', async ({ open, assert }) => {
  const page = await open('components/slider');
  await listen(page);
  const t = await thumb(page, 'sl-5');
  await dragBy(page, t.x, t.y, 60);
  assert.equal(await val(page, 'sl-5'), 8);
  await page.focus('#sl-4');
  await page.press('Tab');
  assert.notEqual(await page.active(), '#sl-5', 'Tab skips the disabled slider');
  await page.focus('#sl-4');
  await page.press('ArrowRight');
  assert.equal(await out(page, 'sl-4'), '61%', 'small slider output keeps its unit');
  assert.equal(await out(page, 'sl-1'), '4', 'the others are untouched');
  assert.equal(await out(page, 'sl-5'), '8 GB');
  assert.deepEqual((await changes(page)).map((c) => c.id), ['sl-4']);
});

test('phone: a touch drag moves the thumb', async ({ open, assert }) => {
  const page = await open('components/slider', { width: 375 });
  const t = await thumb(page, 'sl-1');
  const touch = (type, x) => page.send('Input.dispatchTouchEvent', { type, touchPoints: type === 'touchEnd' ? [] : [{ x, y: t.y }] });
  await touch('touchStart', t.x);
  for (let k = 1; k <= 8; k++) await touch('touchMove', t.x + (t.w * (5 / 9) * k) / 8);
  await touch('touchEnd');
  await page.sleep(150);
  assert.equal(await val(page, 'sl-1'), 9);
  assert.equal(await out(page, 'sl-1'), '9');
  assert.ok(await page.get(() => document.documentElement.scrollWidth <= innerWidth));
});
