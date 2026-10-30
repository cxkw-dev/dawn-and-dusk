import { test } from './lib/test.mjs';

// Replace a control's value the way a user would: focus, select everything, type over it.
const retype = async (page, sel, text) => {
  await page.focus(sel);
  await page.get((s) => document.querySelector(s).select(), sel);
  if (text) await page.type(text); else await page.press('Backspace');
};
const counter = (page, sel) => page.get((s) => {
  const c = document.querySelector(s).closest('.dd-field').querySelector('.dd-field__counter');
  return { text: c.textContent, near: c.classList.contains('is-near'), over: c.classList.contains('is-over') };
}, sel);
// A token resolved to rgb() in the theme of the element, for comparing computed colours.
const tokenColor = (page, sel, token) => page.get((s, t) => {
  const p = document.createElement('span'); p.style.color = `var(${t})`; document.querySelector(s).append(p);
  const c = getComputedStyle(p).color; p.remove(); return c;
}, sel, token);

test('every counter matches its control on load', async ({ open, assert }) => {
  const page = await open('components/form-field');
  const rows = await page.get(() => [...document.querySelectorAll('.ex-stage .dd-field__counter')].map((c) => {
    const ctl = c.closest('.dd-field').querySelector('input, textarea');
    const max = Number(c.dataset.ddCounter) || Number(ctl.getAttribute('maxlength'));
    return [c.textContent, `${ctl.value.length} / ${max}`];
  }));
  assert.ok(rows.length >= 3, 'the page has live counters');
  for (const [shown, want] of rows) assert.equal(shown, want);
});

test('counter follows typing, warns at 90%, and typing stops at maxlength', async ({ open, assert }) => {
  const page = await open('components/form-field');
  await retype(page, '#ff-1', 'auth-gateway');
  assert.deepEqual(await counter(page, '#ff-1'), { text: '12 / 40', near: false, over: false });
  await retype(page, '#ff-1', 'x'.repeat(37));
  assert.deepEqual(await counter(page, '#ff-1'), { text: '37 / 40', near: true, over: false });
  await page.type('y'.repeat(10));
  assert.equal(await page.get(() => document.querySelector('#ff-1').value.length), 40, 'maxlength holds');
  assert.equal((await counter(page, '#ff-1')).text, '40 / 40');
  assert.equal(await page.attr('#ff-1', 'aria-invalid'), null, 'a hard limit never marks the field invalid');
  await page.press('Backspace');
  assert.equal((await counter(page, '#ff-1')).text, '39 / 40');
});

test('soft limit (dusk): over turns the counter and label red and sets aria-invalid; back under clears it', async ({ open, assert }) => {
  const page = await open('components/form-field', { theme: 'dusk' });
  await retype(page, '#ff-9', 'Degraded performance on edge-cache in eu-west-1');
  assert.deepEqual(await counter(page, '#ff-9'), { text: '47 / 40', near: false, over: true });
  assert.equal(await page.attr('#ff-9', 'aria-invalid'), 'true');
  const bad = await tokenColor(page, '#ff-9-c', '--dd-bad');
  await page.waitFor((c) => getComputedStyle(document.querySelector('#ff-9-c')).color === c && getComputedStyle(document.querySelector('label[for="ff-9"]')).color === c, { args: [bad] });
  await retype(page, '#ff-9', 'Degraded: edge-cache eu-west-1');
  assert.deepEqual(await counter(page, '#ff-9'), { text: '30 / 40', near: false, over: false });
  assert.equal(await page.attr('#ff-9', 'aria-invalid'), null);
});

test('a soft limit leaves an author-set aria-invalid alone', async ({ open, assert }) => {
  const page = await open('components/form-field');
  // ff-4 is invalid from the markup; give its field a soft counter and type under the limit.
  await page.get(() => {
    const c = document.createElement('span'); c.className = 'dd-field__counter'; c.dataset.ddCounter = '60';
    document.querySelector('#ff-4').closest('.dd-field').append(c);
  });
  await retype(page, '#ff-4', 'status.cxkw');
  assert.equal(await page.attr('#ff-4', 'aria-invalid'), 'true');
  assert.equal((await counter(page, '#ff-4')).text, '11 / 60');
});

test('Reset restores the values and re-counts, clearing the soft-limit error', async ({ open, assert }) => {
  const page = await open('components/form-field');
  await retype(page, '#ff-9', 'Partial outage: billing-worker queue is backing up');
  await retype(page, '#ff-10', 'Short');
  assert.equal(await page.attr('#ff-9', 'aria-invalid'), 'true');
  assert.equal((await counter(page, '#ff-10')).text, '5 / 120');
  await page.click('form:has(#ff-9) button[type="reset"]');
  await page.waitFor(() => document.querySelector('#ff-9-c').textContent === '18 / 40');
  assert.equal(await page.get(() => document.querySelector('#ff-9').value), 'All systems normal');
  assert.equal(await page.attr('#ff-9', 'aria-invalid'), null);
  assert.equal((await counter(page, '#ff-10')).text, '30 / 120');
});

test('clicking a tucked label focuses its control; typing at 375 updates the counter', async ({ open, assert }) => {
  const page = await open('components/form-field', { width: 375 });
  await page.tap('label[for="ff-1"]');
  assert.equal(await page.active(), '#ff-1');
  await page.get(() => document.querySelector('#ff-1').select());
  await page.type('edge-cache');
  assert.equal((await counter(page, '#ff-1')).text, '10 / 40');
  assert.ok(await page.get(() => document.documentElement.scrollWidth <= innerWidth), 'no sideways scroll at 375');
});
