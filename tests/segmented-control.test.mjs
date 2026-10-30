import { test } from './lib/test.mjs';

const range = '[data-dd-segmented][aria-label="Time range"]';
const level = '[data-dd-segmented][aria-label="Log level"]';
const states = (page, g) => page.get((s) => [...document.querySelectorAll(`${s} [role="radio"]`)].map((b) => (b.getAttribute('aria-checked') === 'true' ? 1 : 0) + ':' + b.tabIndex).join(' '), g);
const listen = (page, g) => page.get((s) => { window.__seg = []; document.querySelector(s).addEventListener('dd:change', (e) => __seg.push(e.detail.value + '|' + (e.detail.item?.tagName || ''))); return true; }, g);

test('click chooses a segment, keeps aria-checked and the roving tabindex in sync, fires dd:change once', async ({ open, assert }) => {
  const page = await open('components/segmented-control');
  await listen(page, range);
  assert.equal(await states(page, range), '0:-1 1:0 0:-1 0:-1');
  await page.click(`${range} [role="radio"]:nth-child(3)`);
  assert.equal(await states(page, range), '0:-1 0:-1 1:0 0:-1');
  await page.click(`${range} [role="radio"]:nth-child(3)`);
  assert.deepEqual(await page.get(() => __seg), ['7d|BUTTON'], 'fires once, not again for the chosen segment');
  // The chosen segment takes a deeper tone than its neighbours.
  const [on, off] = await page.get((s) => [...document.querySelectorAll(`${s} [role="radio"]`)].slice(1, 3).reverse().map((b) => getComputedStyle(b).backgroundColor), range);
  assert.notEqual(on, off);
  // Rapid clicks across segments end on the last one, with exactly one checked.
  for (const n of [1, 4, 2, 4, 1]) await page.click(`${range} [role="radio"]:nth-child(${n})`);
  assert.equal(await states(page, range), '1:0 0:-1 0:-1 0:-1');
});

test('keyboard: Tab lands on the chosen segment, arrows wrap, Home/End, disabled skipped, Tab leaves', async ({ open, assert }) => {
  const page = await open('components/segmented-control');
  await listen(page, level);
  await page.focus(`${level} [role="radio"][value="all"]`);
  await page.press('ArrowLeft');
  assert.equal(await page.attr(':focus', 'value'), 'warn', 'wraps backwards past the disabled “Debug”');
  assert.equal(await page.attr(`${level} [value="warn"]`, 'aria-checked'), 'true', 'arrows choose as they move');
  await page.press('ArrowRight');
  assert.equal(await page.attr(':focus', 'value'), 'all', 'wraps forwards, skipping “Debug”');
  await page.press('ArrowDown');
  assert.equal(await page.attr(':focus', 'value'), 'error');
  await page.press('End');
  assert.equal(await page.attr(':focus', 'value'), 'warn');
  await page.press('Home');
  assert.equal(await page.attr(':focus', 'value'), 'all');
  assert.deepEqual(await page.get(() => __seg.map((x) => x.split('|')[0])), ['warn', 'all', 'error', 'warn', 'all']);
  assert.equal(await page.text('[data-seg-out]'), 'all', 'the demo output follows dd:change');
  await page.press('ArrowRight');
  assert.equal(await page.text('[data-seg-out]'), 'error');
  // Only one segment is tabbable, so Tab leaves the control.
  await page.press('Tab');
  assert.ok(await page.get((s) => !document.querySelector(s).contains(document.activeElement), level), 'Tab moves out');
  await page.press({ key: 'Tab', shift: true });
  assert.equal(await page.attr(':focus', 'value'), 'error', 'Shift Tab comes back to the chosen segment');
  // Clicking the disabled segment does nothing.
  await page.click(`${level} [value="debug"]`);
  assert.equal(await page.attr(`${level} [value="debug"]`, 'aria-checked'), 'false');
});

test('several controls on one page stay independent', async ({ open, assert }) => {
  const page = await open('components/segmented-control');
  const groups = '[aria-label^="Editor mode"]';
  await page.click('[aria-label="Editor mode, small"] [role="radio"]:nth-child(2)');
  await page.focus('[aria-label="Editor mode, large"] [role="radio"]:nth-child(1)');
  await page.press('ArrowRight');
  const s = await page.get((sel) => [...document.querySelectorAll(sel)].map((g) => [...g.querySelectorAll('[role="radio"]')].map((b) => b.getAttribute('aria-checked') === 'true' ? 1 : 0).join('')), groups);
  assert.deepEqual(s, ['01', '10', '01']);
});

test('without JavaScript: native radios check on click, arrows move, disabled skipped', async ({ open, assert }) => {
  const page = await open('components/segmented-control');
  const checked = (name) => page.get((n) => document.querySelector(`input[name="${n}"]:checked`)?.value, name);
  await page.click('fieldset.dd-segmented label:has(input[value="monthly"])');
  assert.equal(await checked('period'), 'monthly');
  await page.focus('input[name="region"][value="fra1"]');
  await page.press('ArrowRight');
  assert.equal(await checked('region'), 'iad1', 'wraps past the disabled hnd1');
  // The focused segment draws the ring.
  assert.notEqual(await page.get(() => getComputedStyle(document.activeElement.parentElement).outlineStyle), 'none');
});

test('dusk and 375px touch: tap chooses; the chosen tone reads on the inset track', async ({ open, assert }) => {
  const page = await open('components/segmented-control', { theme: 'dusk', width: 375 });
  const target = '[data-dd-segmented][aria-label="Deploy target"]';
  await page.tap(`${target} [role="radio"]:nth-child(2)`);
  assert.equal(await states(page, target), '0:-1 1:0');
  const [on, track] = await page.get((s) => [getComputedStyle(document.querySelector(`${s} [aria-checked="true"]`)).backgroundColor, getComputedStyle(document.querySelector(s)).backgroundColor], target);
  assert.notEqual(on, track);
  // Nothing on the page overflows the narrow viewport.
  assert.ok(await page.get(() => [...document.querySelectorAll('.dd-segmented')].every((g) => g.getBoundingClientRect().right <= 375 + 1)), 'controls fit 375px');
  await page.tap(`${level} [role="radio"][value="warn"]`);
  assert.equal(await page.text('[data-seg-out]'), 'warn');
});
