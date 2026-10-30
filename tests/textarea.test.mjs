import { test } from './lib/test.mjs';

const retype = async (page, sel, text) => {
  await page.focus(sel);
  await page.get((s) => document.querySelector(s).select(), sel);
  if (text) await page.type(text); else await page.press('Backspace');
};
const box = (page, sel) => page.get((s) => {
  const el = document.querySelector(s); const cs = getComputedStyle(el);
  return { h: el.getBoundingClientRect().height, line: parseFloat(cs.lineHeight), overflow: cs.overflowY, scrolls: el.scrollHeight > el.clientHeight + 1 };
}, sel);
const counterText = (page, sel) => page.get((s) => document.querySelector(s).closest('.dd-field').querySelector('.dd-field__counter').textContent, sel);

test('counter follows typing and a long paste stops at maxlength', async ({ open, assert }) => {
  const page = await open('components/textarea');
  assert.equal(await counterText(page, '#ta-1'), `${await page.get(() => document.querySelector('#ta-1').value.length)} / 500`);
  await retype(page, '#ta-1', 'Ships the new log viewer.');
  assert.equal(await counterText(page, '#ta-1'), '25 / 500');
  await page.type(' Rollout notes follow.'.repeat(30)); // 660 more characters
  assert.equal(await page.get(() => document.querySelector('#ta-1').value.length), 500);
  assert.equal(await counterText(page, '#ta-1'), '500 / 500');
  assert.ok(await page.get(() => document.querySelector('#ta-1').closest('.dd-field').querySelector('.dd-field__counter').classList.contains('is-near')));
});

test('auto-grow: starts at two lines, grows per line, caps at ten and scrolls, shrinks back', async ({ open, assert }) => {
  const page = await open('components/textarea');
  const start = await box(page, '#ta-2');
  assert.ok(start.h < start.line * 3.2, `starts near two lines (${start.h}px)`);
  assert.equal(start.overflow, 'hidden');
  await page.focus('#ta-2');
  await page.type('Looks good overall.');
  await page.press('Enter', 'Enter', 'Enter', 'Enter');
  await page.type('One nit: the retry count.');
  const mid = await box(page, '#ta-2');
  assert.ok(mid.h > start.h + mid.line * 2.5, `grew with the lines (${start.h} → ${mid.h})`);
  assert.ok(!mid.scrolls, 'no scrollbar while it fits');
  await page.press(...Array(12).fill('Enter'));
  const full = await box(page, '#ta-2');
  assert.ok(full.h <= full.line * 10 + 30 && full.h >= full.line * 9, `caps near ten lines (${full.h}px)`);
  assert.ok(full.scrolls, 'scrolls past the cap');
  assert.equal(full.overflow, 'auto');
  await retype(page, '#ta-2', 'Approved.');
  const back = await box(page, '#ta-2');
  assert.ok(Math.abs(back.h - start.h) < 2, `shrinks back (${back.h} vs ${start.h})`);
});

test('auto-grow: Discard resets and refits; Comment posts a toast and empties the box', async ({ open, assert }) => {
  const page = await open('components/textarea');
  const start = await box(page, '#ta-2');
  await page.focus('#ta-2');
  await page.type('Line one');
  await page.press(...Array(6).fill('Enter'));
  assert.ok((await box(page, '#ta-2')).h > start.h + 40);
  await page.click('#ta-2-form button[type="reset"]');
  await page.waitFor((h) => Math.abs(document.querySelector('#ta-2').getBoundingClientRect().height - h) < 2, { args: [start.h] });
  assert.equal(await page.get(() => document.querySelector('#ta-2').value), '');
  // Empty + required: the browser stops the submit, no toast.
  await page.click('#ta-2-form button[type="submit"]');
  assert.equal(await page.count('.dd-toast'), 0);
  await page.focus('#ta-2');
  await page.type('Ship it.');
  await page.click('#ta-2-form button[type="submit"]');
  await page.waitFor(() => [...document.querySelectorAll('.dd-toast')].some((t) => t.textContent.includes('Comment posted')));
  assert.equal(await page.get(() => document.querySelector('#ta-2').value), '');
});

test('soft limit (dusk): over shows the error and invalid state; under hides both; over again brings them back', async ({ open, assert }) => {
  const page = await open('components/textarea', { theme: 'dusk' });
  assert.equal(await counterText(page, '#ta-3'), '88 / 72');
  assert.equal(await page.attr('#ta-3', 'aria-invalid'), 'true');
  assert.ok(await page.visible('#ta-3-err'));
  await retype(page, '#ta-3', 'fix(edge-cache): respect stale-while-revalidate on 304s');
  assert.equal(await counterText(page, '#ta-3'), '55 / 72');
  assert.equal(await page.attr('#ta-3', 'aria-invalid'), null);
  assert.ok(!(await page.visible('#ta-3-err')), 'error hidden once under the limit');
  await page.type(' so purges stop racing the origin');
  assert.equal(await page.attr('#ta-3', 'aria-invalid'), 'true');
  assert.ok(await page.visible('#ta-3-err'));
});

test('disabled textarea cannot be focused or edited; others resize vertically', async ({ open, assert }) => {
  const page = await open('components/textarea');
  await page.click('#ta-4');
  assert.notEqual(await page.active(), '#ta-4');
  const r = await page.get(() => ['#ta-1', '#ta-2', '#ta-4', '#ta-5'].map((s) => getComputedStyle(document.querySelector(s)).resize));
  assert.deepEqual(r, ['vertical', 'none', 'none', 'vertical']);
});

test('labels focus their textarea, also by tap at 375', async ({ open, assert }) => {
  const page = await open('components/textarea', { width: 375 });
  await page.click('label[for="ta-5"]');
  assert.equal(await page.active(), '#ta-5');
  const start = await box(page, '#ta-2');
  await page.tap('#ta-2');
  assert.equal(await page.active(), '#ta-2');
  await page.type('From my phone');
  await page.press('Enter', 'Enter', 'Enter');
  assert.ok((await box(page, '#ta-2')).h > start.h + start.line * 1.5, 'auto-grow works at 375');
  assert.ok(await page.get(() => document.documentElement.scrollWidth <= innerWidth), 'no sideways scroll');
});
