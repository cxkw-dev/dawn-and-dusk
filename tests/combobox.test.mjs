import { test } from './lib/test.mjs';

// Records every dd-combobox event the page fires, so tests can check the detail.
const listen = (page) => page.get(() => {
  window.__ev = [];
  document.addEventListener('dd-combobox', (e) => window.__ev.push({ value: e.detail.value, values: e.detail.values, created: !!e.detail.created, option: e.detail.option?.dataset.value ?? null }));
});
const events = (page) => page.get(() => window.__ev);
// Replace the field's text the way a person would: select it all, then type over it.
const retype = async (page, sel, text) => { await page.get((s) => { const el = document.querySelector(s); el.focus(); el.select(); }, sel); await page.type(text); };
const listOf = (id) => `#${id}-list`;
const visibleValues = (page, list) => page.get((s) => [...document.querySelectorAll(`${s} [role="option"]:not([hidden])`)].map((o) => o.dataset.value), list);
const activeValue = (page, input) => page.get((s) => { const id = document.querySelector(s).getAttribute('aria-activedescendant'); return id ? document.getElementById(id)?.dataset.value ?? null : null; }, input);
const outside = (page) => page.click('.doc-head h1');

test('single: opens on click with the choice active, arrows move, Enter chooses and closes', async ({ open, assert }) => {
  const page = await open('components/combobox');
  await listen(page);
  await outside(page);
  assert.equal(await page.attr('#cbx-1', 'aria-expanded'), 'false', 'pinned-open example closes on an outside click');
  assert.ok(!(await page.visible(listOf('cbx-1'))));
  await page.click('#cbx-1');
  assert.equal(await page.attr('#cbx-1', 'aria-expanded'), 'true');
  assert.ok(await page.visible(listOf('cbx-1')));
  assert.equal(await activeValue(page, '#cbx-1'), 'billing-worker', 'opens on the current choice');
  await page.press('ArrowDown');
  assert.equal(await activeValue(page, '#cbx-1'), 'log-shipper');
  await page.press('ArrowUp', 'ArrowUp');
  assert.equal(await activeValue(page, '#cbx-1'), 'edge-cache', 'moves across group headers');
  await page.press('Enter');
  assert.equal(await page.get(() => document.querySelector('#cbx-1').value), 'edge-cache');
  assert.equal(await page.attr('#cbx-1', 'aria-expanded'), 'false');
  assert.equal(await page.get(() => document.querySelectorAll('#cbx-1-list [aria-selected="true"]').length), 1, 'exactly one option selected');
  assert.equal(await page.attr('#cbx-1-list [data-value="edge-cache"]', 'aria-selected'), 'true');
  assert.equal(await page.active(), '#cbx-1', 'focus stays in the input');
  const ev = await events(page);
  assert.equal(ev.at(-1).value, 'edge-cache');
  assert.deepEqual(ev.at(-1).values, ['edge-cache']);
});

test('single: typing filters, hides empty groups, underlines the match, Enter takes the first match', async ({ open, assert }) => {
  const page = await open('components/combobox');
  await retype(page, '#cbx-2', 'auth');
  assert.deepEqual(await visibleValues(page, listOf('cbx-2')), ['auth-gateway']);
  assert.equal(await page.get(() => [...document.querySelectorAll('#cbx-2-list .dd-listbox__group:not([hidden])')].map((g) => g.textContent.trim()).join()), 'Edge', 'only the group with a hit stays');
  assert.equal(await page.text('#cbx-2-list [data-value="auth-gateway"] .dd-listbox__match'), 'auth');
  assert.equal(await activeValue(page, '#cbx-2'), 'auth-gateway');
  await page.press('Enter');
  assert.equal(await page.get(() => document.querySelector('#cbx-2').value), 'auth-gateway');
  // Reopening with ↓ on the chosen label shows every option again.
  await page.press('ArrowDown');
  assert.equal((await visibleValues(page, listOf('cbx-2'))).length, 7);
  assert.equal(await page.count('#cbx-2-list .dd-listbox__match'), 0, 'no stale underline');
});

test('single: no matches shows the empty row; editing brings matches back', async ({ open, assert }) => {
  const page = await open('components/combobox');
  await retype(page, '#cbx-3', 'redis-cluster');
  assert.ok(await page.visible('#cbx-3-list .dd-listbox__empty'), 'empty row shown');
  assert.equal((await visibleValues(page, listOf('cbx-3'))).length, 0);
  assert.equal(await page.attr('#cbx-3', 'aria-activedescendant'), null, 'nothing active');
  await page.press('Enter');
  assert.equal(await page.get(() => document.querySelector('#cbx-3').value), 'redis-cluster', 'Enter with no match does nothing');
  await retype(page, '#cbx-3', 'edge');
  assert.ok(!(await page.visible('#cbx-3-list .dd-listbox__empty')));
  assert.deepEqual(await visibleValues(page, listOf('cbx-3')), ['edge-cache']);
});

test('single: Esc closes, Esc again clears; blur restores the choice or takes an exact match; Tab closes', async ({ open, assert }) => {
  const page = await open('components/combobox');
  await listen(page);
  await outside(page);
  await page.click('#cbx-1');
  await page.press('Escape');
  assert.equal(await page.attr('#cbx-1', 'aria-expanded'), 'false');
  assert.equal(await page.get(() => document.querySelector('#cbx-1').value), 'billing-worker', 'first Esc keeps the text');
  await page.press('Escape');
  assert.equal(await page.get(() => document.querySelector('#cbx-1').value), '');
  assert.equal(await page.count('#cbx-1-list [aria-selected="true"]'), 0, 'selection cleared');
  assert.equal((await events(page)).at(-1).value, '');

  // Text that matches nothing is dropped on blur; an exact (any-case) label is chosen.
  await retype(page, '#cbx-2', 'nope');
  await page.press('Tab');
  assert.equal(await page.attr('#cbx-2', 'aria-expanded'), 'false', 'Tab closes');
  assert.equal(await page.get(() => document.querySelector('#cbx-2').value), '');
  await retype(page, '#cbx-2', 'AI-FOCUS');
  await outside(page);
  assert.equal(await page.get(() => document.querySelector('#cbx-2').value), 'ai-focus');
  assert.equal(await page.attr('#cbx-2-list [data-value="ai-focus"]', 'aria-selected'), 'true');
});

test('single: ↓ after Esc reopens on the typed text, not the whole list', async ({ open, assert }) => {
  const page = await open('components/combobox');
  await retype(page, '#cbx-2', 'work');
  await page.press('Escape');
  await page.press('ArrowDown');
  assert.equal(await page.attr('#cbx-2', 'aria-expanded'), 'true');
  assert.deepEqual(await visibleValues(page, listOf('cbx-2')), ['billing-worker']);
});

test('toggle button opens and closes, keeps focus in the input; rapid clicks stay in sync', async ({ open, assert }) => {
  const page = await open('components/combobox');
  await outside(page);
  const toggle = '#cbx-1 ~ .dd-input__affix [data-dd-combobox-toggle]';
  await page.click(toggle);
  assert.equal(await page.attr('#cbx-1', 'aria-expanded'), 'true');
  assert.equal(await page.active(), '#cbx-1');
  await page.click(toggle);
  assert.equal(await page.attr('#cbx-1', 'aria-expanded'), 'false');
  assert.equal(await page.active(), '#cbx-1');
  for (let k = 0; k < 5; k++) await page.click(toggle);
  assert.equal(await page.attr('#cbx-1', 'aria-expanded'), 'true');
  assert.equal(await page.get(() => !document.querySelector('#cbx-1-list').hidden), true, 'aria-expanded matches the list');
  assert.equal(await page.get(() => document.querySelector('#cbx-1').closest('.dd-combobox').classList.contains('is-open')), true);
});

test('instances are independent: opening one closes the others; hover moves the highlight', async ({ open, assert }) => {
  const page = await open('components/combobox');
  await outside(page);
  await page.click('#cbx-1');
  await page.click('#cbx-2');
  assert.equal(await page.attr('#cbx-1', 'aria-expanded'), 'false');
  assert.equal(await page.attr('#cbx-2', 'aria-expanded'), 'true');
  assert.equal(await page.get(() => document.querySelector('#cbx-1').value), 'billing-worker', 'the other field keeps its value');
  await page.hover('#cbx-2-list [data-value="dockey-ui"]');
  assert.equal(await activeValue(page, '#cbx-2'), 'dockey-ui');
  await page.click('#cbx-2-list [data-value="dockey-ui"]');
  assert.equal(await page.get(() => document.querySelector('#cbx-2').value), 'dockey-ui');
  assert.equal(await page.active(), '#cbx-2', 'clicking an option keeps focus in the input');
});

test('multi: clicking toggles chips, hidden input and aria-selected; list stays open', async ({ open, assert }) => {
  const page = await open('components/combobox');
  await listen(page);
  const chips = () => page.get(() => document.querySelector('#cbm-1').closest('.dd-input').querySelectorAll('.dd-combobox__chip').length);
  const hidden = () => page.get(() => document.querySelector('#cbm-1').closest('.dd-combobox').querySelector('input[type="hidden"]').value);
  assert.equal(await chips(), 3);
  await page.click('#cbm-1');
  await page.click('#cbm-1-list [data-value="infra"]');
  assert.equal(await chips(), 4);
  assert.equal(await page.attr('#cbm-1-list [data-value="infra"]', 'aria-selected'), 'true');
  assert.equal(await hidden(), 'frontend,infra,billing,design-system');
  assert.equal(await page.attr('#cbm-1', 'aria-expanded'), 'true', 'stays open while picking');
  assert.equal(await page.active(), '#cbm-1');
  await page.click('#cbm-1-list [data-value="frontend"]');
  assert.equal(await page.attr('#cbm-1-list [data-value="frontend"]', 'aria-selected'), 'false');
  assert.equal(await hidden(), 'infra,billing,design-system');
  const ev = (await events(page)).at(-1);
  assert.deepEqual(ev.values, ['infra', 'billing', 'design-system']);
  assert.equal(ev.option, 'frontend');
  // Chip colour comes from the option's data-set.
  assert.equal(await page.get(() => document.querySelector('#cbm-1').closest('.dd-input').querySelector('.dd-combobox__chip[data-value="infra"]').style.getPropertyValue('--dd-chip').trim()), 'var(--dd-set-2)');
});

test('multi: type + Enter adds, Backspace on empty removes the last chip, × removes one', async ({ open, assert }) => {
  const page = await open('components/combobox');
  const chipValues = () => page.get(() => [...document.querySelector('#cbm-1').closest('.dd-input').querySelectorAll('.dd-combobox__chip')].map((c) => c.dataset.value));
  await page.focus('#cbm-1');
  await page.type('perf');
  assert.deepEqual(await visibleValues(page, listOf('cbm-1')), ['performance']);
  await page.press('Enter');
  assert.deepEqual(await chipValues(), ['frontend', 'billing', 'design-system', 'performance']);
  assert.equal(await page.get(() => document.querySelector('#cbm-1').value), '', 'input clears after a pick');
  await page.press('Backspace');
  assert.deepEqual(await chipValues(), ['frontend', 'billing', 'design-system']);
  assert.equal(await page.attr('#cbm-1-list [data-value="performance"]', 'aria-selected'), 'false');
  await page.click('.dd-combobox__chip[data-value="billing"] .dd-combobox__remove');
  assert.deepEqual(await chipValues(), ['frontend', 'design-system']);
  assert.equal(await page.attr('#cbm-1-list [data-value="billing"]', 'aria-selected'), 'false');
  assert.equal(await page.active(), '#cbm-1', 'focus returns to the input');
});

test('create: a new value gets a Create row, Enter adds it as an option and a chip', async ({ open, assert }) => {
  const page = await open('components/combobox');
  await listen(page);
  await page.focus('#cbm-2');
  await page.type('flaky-test');
  assert.ok(await page.visible('#cbm-2-list .dd-combobox__create'), 'Create row shown');
  assert.match(await page.text('#cbm-2-list .dd-combobox__create'), /Create flaky-test/);
  assert.ok(!(await page.visible('#cbm-2-list .dd-listbox__empty')), 'no "no matches" next to Create');
  assert.ok(await page.get(() => document.querySelector('#cbm-2-list .dd-combobox__create').classList.contains('is-active')), 'Create is active when nothing matches');
  await page.press('Enter');
  const chip = await page.get(() => [...document.querySelector('#cbm-2').closest('.dd-input').querySelectorAll('.dd-combobox__chip')].map((c) => c.dataset.value));
  assert.deepEqual(chip, ['infra', 'incident', 'flaky-test']);
  assert.equal(await page.attr('#cbm-2-list [role="option"][data-value="flaky-test"]:not([data-dd-create])', 'aria-selected'), 'true');
  assert.ok(!(await page.visible('#cbm-2-list .dd-combobox__create')), 'Create row hides again');
  const ev = (await events(page)).at(-1);
  assert.equal(ev.created, true);
  assert.deepEqual(ev.values, ['infra', 'incident', 'flaky-test']);
  // An existing label (any case) is never offered again.
  await page.type('INFRA');
  assert.ok(!(await page.visible('#cbm-2-list .dd-combobox__create')));
  await page.get(() => { const i = document.querySelector('#cbm-2'); i.value = ''; i.dispatchEvent(new Event('input', { bubbles: true })); });
  await page.type('flaky-test');
  assert.ok(!(await page.visible('#cbm-2-list .dd-combobox__create')), 'the created value now exists');
  // Comboboxes without the attribute never offer it.
  await retype(page, '#cbx-3', 'brand-new-svc');
  assert.equal(await page.count('#cbx-3-list .dd-combobox__create'), 0);
});

test('disabled field ignores clicks; standalone chips dismiss', async ({ open, assert }) => {
  const page = await open('components/combobox');
  await page.click('#cbs-2').catch(() => {});
  await page.click('#cbs-2 ~ .dd-input__affix');
  assert.equal(await page.attr('#cbs-2', 'aria-expanded'), 'false');
  assert.notEqual(await page.active(), '#cbs-2');
  // Invalid field still works as a combobox.
  await retype(page, '#cbs-1', 'plat');
  await page.press('Enter');
  assert.equal(await page.get(() => document.querySelector('#cbs-1').value), 'platform');
  const n = await page.count('#chips ~ .ex .dd-combobox__chip');
  await page.click('#chips ~ .ex .dd-combobox__chip [aria-label="Remove docs"]');
  await page.waitFor((k) => document.querySelectorAll('#chips ~ .ex .dd-combobox__chip').length === k - 1, { args: [n] });
});

test('dusk: keyboard flow and the active row is tinted', async ({ open, assert }) => {
  const page = await open('components/combobox', { theme: 'dusk' });
  await outside(page);
  await page.focus('#cbx-1');
  await page.press('ArrowDown');
  assert.equal(await page.attr('#cbx-1', 'aria-expanded'), 'true');
  const bg = await page.get(() => {
    const a = document.querySelector('#cbx-1-list .is-active'); const b = document.querySelector('#cbx-1-list [role="option"]:not(.is-active)');
    return [getComputedStyle(a).backgroundColor, getComputedStyle(b).backgroundColor];
  });
  assert.notEqual(bg[0], bg[1], 'active option has its own tone');
  await page.press('ArrowDown', 'Enter');
  assert.equal(await page.get(() => document.querySelector('#cbx-1').value), 'log-shipper');
});

test('touch at 375: tap opens, tap an option chooses', async ({ open, assert }) => {
  const page = await open('components/combobox', { width: 375 });
  await page.tap('.doc-head h1');
  await page.tap('#cbx-2');
  assert.equal(await page.attr('#cbx-2', 'aria-expanded'), 'true');
  await page.tap('#cbx-2-list [data-value="image-resizer"]');
  assert.equal(await page.get(() => document.querySelector('#cbx-2').value), 'image-resizer');
  assert.equal(await page.attr('#cbx-2', 'aria-expanded'), 'false');
  const fits = await page.get(() => { const r = document.querySelector('#cbx-2').closest('.dd-combobox').getBoundingClientRect(); return r.right <= innerWidth; });
  assert.ok(fits, 'field fits the viewport');
});
