import { test } from './lib/test.mjs';

// The examples, by their labels.
const ENV = '[data-dd-select]:has(#se-value)';
const OWNER = '[data-dd-select]:has(#sp-value)';
const REGION = '[data-dd-select]:has(#sc-value)';
const MULTI = '[data-dd-select]:has(#sm-value)';
const SORT = '[data-dd-select]:has([aria-label="Sort deploys"])';
const trig = (root) => `${root} > [aria-haspopup="listbox"]`;
const list = (root) => `${root} > [role="listbox"]`;
const isOpen = (page, root) => page.get((s) => !document.querySelector(s).hidden, list(root));
const activeLabel = (page, root) => page.get((s) => {
  const l = document.querySelector(s); const a = l.querySelector('[role="option"].is-active');
  return a && l.getAttribute('aria-activedescendant') === a.id ? (a.querySelector('.dd-listbox__label') || a).textContent.trim() : null;
}, list(root));
const focusIn = (page, sel) => page.get((s) => document.activeElement === document.querySelector(s), sel);
const recordSelect = (page) => page.get(() => { window._sel = []; document.addEventListener('dd-select', (e) => window._sel.push({ value: e.detail.value, label: e.detail.label, values: e.detail.values, selected: e.detail.selected, hasOption: e.detail.option instanceof HTMLElement })); });

test('click opens on the selected option, choosing updates trigger, aria and fires dd-select', async ({ open, assert }) => {
  const page = await open('components/select');
  await recordSelect(page);
  await page.click(trig(ENV));
  assert.ok(await isOpen(page, ENV));
  assert.equal(await page.attr(trig(ENV), 'aria-expanded'), 'true');
  assert.equal(await page.attr(trig(ENV), 'aria-controls'), await page.attr(list(ENV), 'id'));
  assert.ok(await focusIn(page, list(ENV)), 'focus moves to the listbox');
  assert.equal(await activeLabel(page, ENV), 'Production', 'starts on the selected option');
  await page.click(`${list(ENV)} [data-value="preview"]`);
  assert.ok(!(await isOpen(page, ENV)));
  assert.equal(await page.attr(trig(ENV), 'aria-expanded'), 'false');
  assert.equal(await page.text('#se-value'), 'Preview');
  assert.ok(await page.exists('#se-value .dd-listbox__icon'), 'the option icon is copied into the trigger');
  assert.equal(await page.attr(`${list(ENV)} [data-value="preview"]`, 'aria-selected'), 'true');
  assert.equal(await page.attr(`${list(ENV)} [data-value="production"]`, 'aria-selected'), 'false');
  assert.ok(await focusIn(page, trig(ENV)), 'focus returns to the trigger');
  assert.deepEqual(await page.get(() => window._sel), [{ value: 'preview', label: 'Preview', values: ['preview'], selected: true, hasOption: true }]);
});

test('keyboard: ↓ opens, arrows/Home/End move, Enter chooses, Esc closes and returns focus', async ({ open, assert }) => {
  const page = await open('components/select');
  await page.focus(trig(OWNER));
  await page.press('ArrowDown');
  assert.ok(await isOpen(page, OWNER));
  assert.equal(await activeLabel(page, OWNER), 'Andy Nguyen', 'nothing selected: opens on the first');
  await page.press('ArrowDown', 'ArrowDown', 'ArrowDown');
  assert.equal(await activeLabel(page, OWNER), 'Jules Sato', 'stops at the end');
  await page.press('Home');
  assert.equal(await activeLabel(page, OWNER), 'Andy Nguyen');
  await page.press('End', 'ArrowUp');
  assert.equal(await activeLabel(page, OWNER), 'Mika Kato');
  await page.press('Enter');
  assert.ok(!(await isOpen(page, OWNER)));
  assert.equal(await page.text('#sp-value'), 'Mika Kato');
  assert.ok(!(await page.get(() => document.querySelector('#sp-value').classList.contains('dd-select__placeholder'))), 'placeholder look goes');
  assert.ok(await focusIn(page, trig(OWNER)));
  // Space on the trigger opens on the chosen one; Esc closes without changing it.
  await page.press('Space');
  assert.ok(await isOpen(page, OWNER));
  assert.equal(await activeLabel(page, OWNER), 'Mika Kato');
  await page.press('ArrowDown', 'Escape');
  assert.ok(!(await isOpen(page, OWNER)));
  assert.equal(await page.text('#sp-value'), 'Mika Kato');
  assert.ok(await focusIn(page, trig(OWNER)));
  // ↑ opens on the last option.
  await page.press('ArrowUp');
  assert.equal(await activeLabel(page, OWNER), 'Jules Sato');
  await page.press('Space');
  assert.equal(await page.text('#sp-value'), 'Jules Sato');
});

test('typeahead: letters jump, a repeated letter cycles, typing on the closed trigger opens there', async ({ open, assert }) => {
  const page = await open('components/select');
  await page.focus(trig(OWNER));
  await page.press('j');
  assert.ok(await isOpen(page, OWNER), 'typing opens the list');
  assert.equal(await activeLabel(page, OWNER), 'Jules Sato');
  await page.press('Escape');
  // Region list (rendered open): "e" then "e" steps through the eu- regions; "u" after a pause jumps to us-.
  await page.click(trig(REGION));
  if (!(await isOpen(page, REGION))) await page.click(trig(REGION));
  assert.equal(await activeLabel(page, REGION), 'eu-west-1');
  await page.press('e');
  assert.equal(await activeLabel(page, REGION), 'eu-central-1');
  await page.press('e');
  assert.equal(await activeLabel(page, REGION), 'eu-west-1', 'wraps around');
  await page.sleep(650);
  await page.press('u', 's', '-', 'w');
  assert.equal(await activeLabel(page, REGION), 'us-west-2', 'a typed prefix');
  await page.sleep(650);
  await page.press('a');
  assert.equal(await activeLabel(page, REGION), 'us-west-2', 'disabled ap-southeast-1 is never reached');
});

test('disabled options are skipped by keys and ignore clicks', async ({ open, assert }) => {
  const page = await open('components/select');
  await page.click(trig(REGION));
  if (!(await isOpen(page, REGION))) await page.click(trig(REGION));
  await page.press('End');
  assert.equal(await activeLabel(page, REGION), 'us-west-2');
  await page.press('ArrowDown');
  assert.equal(await activeLabel(page, REGION), 'us-west-2');
  await page.click(`${list(REGION)} [data-value="ap-southeast-1"]`);
  assert.ok(await isOpen(page, REGION), 'still open');
  assert.equal(await page.attr(`${list(REGION)} [data-value="ap-southeast-1"]`, 'aria-selected'), 'false');
  await page.click(`${list(REGION)} [data-value="us-east-1"]`);
  assert.equal(await page.text('#sc-value'), 'us-east-1');
  assert.equal(await page.get(() => document.querySelector('input[name="region"]').value), 'us-east-1', 'hidden input follows');
});

test('outside click and Tab close; opening one select closes the other', async ({ open, assert }) => {
  const page = await open('components/select');
  await page.click(trig(ENV));
  assert.ok(await isOpen(page, ENV));
  await page.click('#se-note');
  assert.ok(!(await isOpen(page, ENV)), 'outside click closes');
  assert.equal(await page.text('#se-value'), 'Production');
  await page.click(trig(ENV));
  await page.click(trig(OWNER));
  assert.ok(!(await isOpen(page, ENV)), 'the first closed');
  assert.ok(await isOpen(page, OWNER));
  assert.equal(await page.attr(trig(ENV), 'aria-expanded'), 'false');
  await page.press('Tab');
  assert.ok(!(await isOpen(page, OWNER)), 'Tab closes');
  assert.equal(await page.attr(trig(OWNER), 'aria-expanded'), 'false');
  // Rapid clicks on one trigger toggle cleanly.
  for (let n = 0; n < 5; n++) await page.click(trig(SORT));
  assert.ok(await isOpen(page, SORT));
  assert.equal(await page.attr(trig(SORT), 'aria-expanded'), 'true');
});

test('hover moves the highlight; the Save button reports the choices', async ({ open, assert }) => {
  const page = await open('components/select');
  await page.click(trig(ENV));
  await page.hover(`${list(ENV)} [data-value="development"]`);
  assert.equal(await activeLabel(page, ENV), 'Development');
  await page.press('Enter');
  assert.equal(await page.text('#se-value'), 'Development');
  await page.click('#se-form button[type="submit"]');
  await page.waitFor(() => [...document.querySelectorAll('.dd-toast')].some((t) => t.textContent.includes('Development') && t.textContent.includes('Unassigned')));
});

test('multiple: toggles stay open, trigger lists choices, hidden input and dd-select carry every value', async ({ open, assert }) => {
  const page = await open('components/select', { theme: 'dusk' });
  await recordSelect(page);
  const hidden = () => page.get(() => document.querySelector('input[name="notify"]').value);
  await page.click(trig(MULTI));
  assert.equal(await page.attr(list(MULTI), 'aria-multiselectable'), 'true');
  await page.click(`${list(MULTI)} [data-value="spend"]`);
  assert.ok(await isOpen(page, MULTI), 'stays open after a pick');
  assert.equal(await page.text('#sm-value'), 'Failed deploys, Rollbacks, Spend alerts');
  assert.equal(await hidden(), 'deploy-failed,rollback,spend');
  await page.press('Home', 'Space');
  assert.equal(await page.attr(`${list(MULTI)} [data-value="deploy-failed"]`, 'aria-selected'), 'false');
  assert.equal(await page.text('#sm-value'), 'Rollbacks, Spend alerts');
  await page.press('ArrowDown', 'Enter');
  assert.equal(await page.text('#sm-value'), 'Spend alerts');
  await page.press('End');
  assert.equal(await activeLabel(page, MULTI), 'Spend alerts', 'disabled Incidents skipped');
  await page.press('Space');
  assert.equal(await page.text('#sm-value'), 'Nothing', 'placeholder when nothing is chosen');
  assert.ok(await page.get(() => document.querySelector('#sm-value').classList.contains('dd-select__placeholder')));
  assert.equal(await hidden(), '');
  const ev = await page.get(() => window._sel);
  assert.equal(ev.length, 4);
  assert.deepEqual(ev[0], { value: 'spend', label: 'Spend alerts', values: ['deploy-failed', 'rollback', 'spend'], selected: true, hasOption: true });
  assert.deepEqual(ev[3], { value: 'spend', label: 'Spend alerts', values: [], selected: false, hasOption: true });
  await page.press('Escape');
  assert.ok(!(await isOpen(page, MULTI)));
  assert.ok(await focusIn(page, trig(MULTI)));
});

test('touch at 375: tap opens, tap chooses, tap outside closes', async ({ open, assert }) => {
  const page = await open('components/select', { width: 375 });
  await page.tap(trig(ENV));
  assert.ok(await isOpen(page, ENV));
  assert.ok(await page.get((s) => { const r = document.querySelector(s).getBoundingClientRect(); return r.left >= 0 && r.right <= innerWidth; }, list(ENV)), 'list fits the screen');
  await page.tap(`${list(ENV)} [data-value="development"]`);
  assert.equal(await page.text('#se-value'), 'Development');
  await page.tap(trig(OWNER));
  assert.ok(await isOpen(page, OWNER));
  await page.tap('#se-note');
  assert.ok(!(await isOpen(page, OWNER)));
});
