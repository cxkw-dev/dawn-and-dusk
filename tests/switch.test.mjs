import { test } from './lib/test.mjs';

const sw = (n) => `.ex-stage .dd-row > .dd-switch:nth-child(${n})`; // States example
const on = (page, sel) => page.get((s) => document.querySelector(s).checked, sel);
// The knob's horizontal offset (its ::before transform), so we know it actually slid.
const knobX = (page, sel) => page.get((s) => { const m = new DOMMatrix(getComputedStyle(document.querySelector(s), '::before').transform); return m.m41; }, sel);

test('click toggles a switch and slides the knob; disabled ones stay put', async ({ open, assert }) => {
  const page = await open('components/switch');
  const input = `${sw(2)} > input`;
  assert.equal(await page.attr(input, 'role'), 'switch');
  assert.equal(await on(page, input), false);
  await page.click(input);
  assert.equal(await on(page, input), true);
  await page.waitFor((s) => new DOMMatrix(getComputedStyle(document.querySelector(s), '::before').transform).m41 > 10, { args: [input] });
  await page.click(sw(2), { dx: 40 });
  assert.equal(await on(page, input), false, 'clicking the label text toggles it back');
  await page.waitFor((s) => new DOMMatrix(getComputedStyle(document.querySelector(s), '::before').transform).m41 < 1, { args: [input] });
  await page.click(`${sw(3)} > input`);
  await page.click(`${sw(4)} > input`);
  assert.deepEqual([await on(page, `${sw(3)} > input`), await on(page, `${sw(4)} > input`)], [true, false], 'disabled unchanged');
  for (let k = 0; k < 7; k++) await page.click(input);
  assert.equal(await on(page, input), true, 'seven rapid clicks: on');
  assert.equal(await on(page, `${sw(1)} > input`), true, 'neighbours untouched');
});

test('keyboard: Space toggles, Tab skips disabled, focus ring shows', async ({ open, assert }) => {
  const page = await open('components/switch');
  await page.focus(`${sw(1)} > input`);
  await page.press('Space');
  assert.equal(await on(page, `${sw(1)} > input`), false);
  await page.press('Space');
  assert.equal(await on(page, `${sw(1)} > input`), true);
  await page.press('Tab');
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), `${sw(2)} > input`));
  assert.equal(await page.get(() => getComputedStyle(document.activeElement).outlineStyle), 'solid');
  await page.press('Tab');
  assert.equal(await page.get(() => !!document.activeElement.closest('.dd-row')), false, 'disabled switches are skipped');
});

test('every size toggles; label-less switches carry an aria-label', async ({ open, assert }) => {
  const page = await open('components/switch', { theme: 'dusk' });
  const row = '.ex-stage:has(.dd-switch--lg) .dd-row';
  const n = await page.count(`${row} > .dd-switch`);
  assert.equal(n, 6);
  for (let k = 1; k <= n; k++) {
    const input = `${row} > .dd-switch:nth-child(${k}) > input`;
    const before = await on(page, input);
    await page.click(input);
    assert.equal(await on(page, input), !before, `size switch ${k} toggles`);
    const named = await page.get((s) => { const el = document.querySelector(s); return !!(el.getAttribute('aria-label') || el.closest('label').textContent.trim()); }, input);
    assert.ok(named, `switch ${k} has a name`);
  }
  // In dusk the on track is the accent and differs from the off track.
  const offOn = await page.get(() => { const all = [...document.querySelectorAll('.dd-switch__input:not(:disabled)')]; const c = all.find((x) => x.checked); const u = all.find((x) => !x.checked); return [getComputedStyle(c).backgroundColor, getComputedStyle(u).backgroundColor]; });
  assert.notEqual(offOn[0], offOn[1], 'on and off tracks differ in dusk');
});

test('settings rows: the whole row toggles and a toast confirms', async ({ open, assert }) => {
  const page = await open('components/switch');
  const row = '.dd-form__choices--rows > .dd-switch--end:nth-child(2)';
  await page.click(`${row} .dd-switch__desc`);
  assert.equal(await on(page, `${row} > input`), true);
  await page.waitFor(() => [...document.querySelectorAll('.dd-toast__title')].some((t) => t.textContent === 'Maintenance mode: on'));
  await page.click(`${row} > input`);
  await page.waitFor(() => [...document.querySelectorAll('.dd-toast__title')].some((t) => t.textContent === 'Maintenance mode: off'));
});

test('phone: tapping a switch or its row toggles it', async ({ open, assert }) => {
  const page = await open('components/switch', { width: 375 });
  await page.tap(`${sw(2)} > input`);
  assert.equal(await on(page, `${sw(2)} > input`), true);
  const row = '.dd-form__choices--rows > .dd-switch--end:nth-child(1)';
  await page.tap(`${row} .dd-switch__label`);
  assert.equal(await on(page, `${row} > input`), false);
  assert.ok(await page.get(() => document.documentElement.scrollWidth <= innerWidth));
});
