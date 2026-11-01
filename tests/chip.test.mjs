import { test } from './lib/test.mjs';

const REMOVABLE = '.ex-stage .dd-chip-group:has([aria-label="Remove region: fra1"])';
const STATUS = '.ex-stage [role="group"][aria-label="Status"]';
const BOX = '.ex-stage .dd-chip-input';
const FIELD = `${BOX} .dd-chip-input__field`;
const x = (label) => `.ex-stage [aria-label="Remove ${label}"]`;

// Record bubbling dd:* events on the document: page.get(() => window.__ev)
const listen = (page) => page.evaluate(`window.__ev = []; for (const t of ['dd:chip-remove', 'dd:chip-toggle', 'dd:chips-change'])
  document.addEventListener(t, (e) => __ev.push({ type: e.type, detail: e.detail, target: e.target.dataset?.value || e.target.textContent.trim() }));`);
const events = (page, type) => page.get((t) => window.__ev.filter((e) => e.type === t), type);
const chipsIn = (page, sel) => page.get((s) => [...document.querySelector(s).querySelectorAll('.dd-chip')].map((c) => c.dataset.value || c.textContent.trim()), sel);
const focusedLabel = (page) => page.get(() => document.activeElement?.getAttribute('aria-label') || document.activeElement?.className || null);

test('remove: × removes the chip, fires dd:chip-remove, and focus moves to the next chip', async ({ open, assert }) => {
  const page = await open('components/chip');
  await listen(page);
  await page.evaluate(`document.querySelector('${REMOVABLE}').id = 'rm-group'`); // the :has() selector stops matching once fra1 goes
  await page.focus(x('status: failed'));
  await page.press('Enter');
  await page.waitFor((s) => !document.querySelector(s), { args: [x('status: failed')] });
  assert.deepEqual(await chipsIn(page, REMOVABLE), ['region: fra1', 'service: billing-worker', 'last 24h']);
  assert.deepEqual((await events(page, 'dd:chip-remove')).map((e) => e.detail.value), ['status: failed']);
  assert.equal(await focusedLabel(page), 'Remove service: billing-worker', 'focus moved to the next ×');
  // Delete and Backspace on a focused × work too; the last one hands focus back to the previous chip.
  await page.press('Delete');
  await page.waitFor((s) => !document.querySelector(s), { args: [x('service: billing-worker')] });
  await page.focus(x('last 24h'));
  await page.press('Backspace');
  await page.waitFor((s) => !document.querySelector(s), { args: [x('last 24h')] });
  assert.equal(await focusedLabel(page), 'Remove region: fra1');
  // Removing the very last chip keeps focus in the group instead of dropping it on <body>.
  await page.press('Space');
  await page.waitFor(() => document.querySelectorAll('#rm-group .dd-chip').length === 0);
  assert.ok(await page.get(() => document.activeElement === document.getElementById('rm-group')), 'focus parked on the group');
});

test('dd:chip-remove is cancelable; rapid clicks remove a chip once', async ({ open, assert }) => {
  const page = await open('components/chip');
  await listen(page);
  await page.evaluate(`document.addEventListener('dd:chip-remove', (e) => { if (e.detail.value === 'region: fra1') e.preventDefault(); })`);
  await page.click(x('region: fra1'));
  await page.sleep(250);
  assert.ok(await page.exists(x('region: fra1')), 'cancelled removal keeps the chip');
  // Three quick clicks on one ×: only one removal.
  await page.evaluate(`(() => { const b = document.querySelector('${x('last 24h')}'); b.click(); b.click(); b.click(); })()`);
  await page.waitFor((s) => !document.querySelector(s), { args: [x('last 24h')] });
  assert.equal((await events(page, 'dd:chip-remove')).filter((e) => e.detail.value === 'last 24h').length, 1);
  assert.equal(await page.count(`${REMOVABLE} .dd-chip`), 3);
});

test('filter chips toggle aria-pressed by click and Space, and fire dd:chip-toggle', async ({ open, assert }) => {
  const page = await open('components/chip');
  await listen(page);
  const down = `${STATUS} .dd-chip:nth-child(3)`;
  const healthy = `${STATUS} .dd-chip:nth-child(1)`;
  assert.equal(await page.attr(down, 'aria-pressed'), 'false');
  await page.click(down);
  assert.equal(await page.attr(down, 'aria-pressed'), 'true');
  assert.ok(await page.visible(`${down} .dd-chip__check`), 'check shows when on');
  await page.focus(healthy);
  await page.press('Space');
  assert.equal(await page.attr(healthy, 'aria-pressed'), 'false');
  await page.press('Enter');
  assert.equal(await page.attr(healthy, 'aria-pressed'), 'true');
  assert.deepEqual((await events(page, 'dd:chip-toggle')).map((e) => [e.target, e.detail.pressed]), [['Down', true], ['Healthy', false], ['Healthy', true]]);
  // Chips in another group are independent.
  assert.equal(await page.attr('.ex-stage [role="group"][aria-label="Topics"] .dd-chip:nth-child(2)', 'aria-pressed'), 'false');
});

test('chip input: Enter and comma add, duplicates flash, Backspace removes the last', async ({ open, assert }) => {
  const page = await open('components/chip');
  await listen(page);
  // Clicking the empty part of the box focuses the field.
  await page.click(BOX, { dx: 180 });
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), FIELD));
  await page.type('canary');
  await page.press('Enter');
  assert.deepEqual(await chipsIn(page, BOX), ['release', 'breaking', 'canary']);
  assert.equal(await page.get((s) => document.querySelector(s).value, FIELD), '');
  const made = `${BOX} .dd-chip[data-value="canary"]`;
  assert.match(await page.attr(made, 'class'), /dd-chip--set-[1-8]/, 'takes a colour from the set');
  assert.equal(await page.attr(`${made} .dd-chip__remove`, 'aria-label'), 'Remove canary');
  assert.ok(await page.visible(`${made} .dd-chip__remove svg`), 'its × icon renders');
  await page.type('eu-west-2');
  await page.press(',');
  assert.deepEqual(await chipsIn(page, BOX), ['release', 'breaking', 'canary', 'eu-west-2']);
  assert.deepEqual((await events(page, 'dd:chips-change')).map((e) => e.detail.values.length), [3, 4]);
  // Same tag in another case: flashes the existing one instead of adding a twin.
  await page.type('Release');
  await page.press('Enter');
  assert.equal(await page.count(`${BOX} .dd-chip`), 4);
  assert.ok(await page.get((s) => document.querySelector(`${s} .dd-chip[data-value="release"]`).classList.contains('is-duplicate'), BOX));
  await page.waitFor((s) => !document.querySelector(`${s} .is-duplicate`), { args: [BOX] });
  // Empty Enter does nothing; Backspace in the empty field removes the last chip and keeps focus in the field.
  await page.press('Enter');
  assert.equal(await page.count(`${BOX} .dd-chip`), 4);
  await page.press('Backspace');
  await page.waitFor((s) => document.querySelectorAll(`${s} .dd-chip`).length === 3, { args: [BOX] });
  assert.deepEqual(await chipsIn(page, BOX), ['release', 'breaking', 'canary']);
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), FIELD));
  // Backspace with text in the field edits the text, not the chips.
  await page.type('ab');
  await page.press('Backspace');
  assert.equal(await page.count(`${BOX} .dd-chip`), 3);
  assert.equal(await page.get((s) => document.querySelector(s).value, FIELD), 'a');
});

test('chip input: removing a chip with its × moves focus on, then to the field', async ({ open, assert }) => {
  const page = await open('components/chip');
  await page.click(`${BOX} [aria-label="Remove breaking"]`);
  await page.waitFor((s) => document.querySelectorAll(`${s} .dd-chip`).length === 1, { args: [BOX] });
  await page.focus(`${BOX} [aria-label="Remove release"]`);
  await page.press('Enter');
  await page.waitFor((s) => document.querySelectorAll(`${s} .dd-chip`).length === 0, { args: [BOX] });
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), FIELD), 'focus lands in the field');
});

test('dd.chip.create / remove from code', async ({ open, assert }) => {
  const page = await open('components/chip');
  await listen(page);
  const r = await page.get(() => {
    const a = dd.chip.create('edge-cache');
    const b = dd.chip.create('edge-cache');
    document.querySelector('.ex-stage .dd-chip-input .dd-chip-input__field').before(a);
    return { same: a.className === b.className, value: a.dataset.value, label: a.querySelector('.dd-chip__remove').getAttribute('aria-label') };
  });
  assert.deepEqual(r, { same: true, value: 'edge-cache', label: 'Remove edge-cache' });
  await page.evaluate(`dd.chip.remove(document.querySelector('.ex-stage .dd-chip[data-value="edge-cache"]'))`);
  await page.waitFor(() => !document.querySelector('.ex-stage .dd-chip[data-value="edge-cache"]'));
  assert.deepEqual((await events(page, 'dd:chip-remove')).map((e) => e.detail.value), ['edge-cache']);
});

test('reduced motion: removal is instant and a duplicate still flashes', async ({ open, assert }) => {
  const page = await open('components/chip');
  await page.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await page.click(x('region: fra1'));
  assert.ok(!(await page.exists(x('region: fra1'))), 'gone at once');
  await page.focus(FIELD);
  await page.type('breaking');
  await page.press('Enter');
  const dup = `${BOX} .dd-chip[data-value="breaking"]`;
  const st = await page.get((s) => { const el = document.querySelector(s); const cs = getComputedStyle(el); return { on: el.classList.contains('is-duplicate'), anim: cs.animationName, bg: cs.backgroundColor }; }, dup);
  assert.ok(st.on, 'still marked as the duplicate');
  assert.equal(st.anim, 'none', 'no movement');
  await page.waitFor((s) => !document.querySelector(s).classList.contains('is-duplicate'), { args: [dup] });
  assert.notEqual(await page.get((s) => getComputedStyle(document.querySelector(s)).backgroundColor, dup), st.bg, 'the tint was deeper while flagged');
});

test('dusk: on and off filter chips are told apart', async ({ open, assert }) => {
  const page = await open('components/chip', { theme: 'dusk' });
  const bg = (n) => page.get((s) => getComputedStyle(document.querySelector(s)).backgroundColor, `${STATUS} .dd-chip:nth-child(${n})`);
  assert.notEqual(await bg(1), await bg(3), 'pressed and unpressed differ');
  await page.click(`${STATUS} .dd-chip:nth-child(3)`);
  await page.hover('.doc-main h1');
  await page.sleep(250);
  assert.equal(await bg(3), await bg(1), 'turned on, it matches the other on chip');
});

test('375px: tap removes a chip and toggles a filter', async ({ open, assert }) => {
  const page = await open('components/chip', { width: 375 });
  await page.tap(x('service: billing-worker'));
  await page.waitFor((s) => !document.querySelector(s), { args: [x('service: billing-worker')] });
  await page.tap(`${STATUS} .dd-chip:nth-child(4)`);
  assert.equal(await page.attr(`${STATUS} .dd-chip:nth-child(4)`, 'aria-pressed'), 'true');
  assert.ok(await page.get(() => document.documentElement.scrollWidth <= innerWidth), 'no sideways page scroll');
});

test('two quick Backspaces: dd:chips-change never reports a chip that is already leaving', async ({ open, assert }) => {
  const page = await open('components/chip');
  await listen(page);
  await page.focus(FIELD);
  const before = await chipsIn(page, BOX);
  await page.press('Backspace', 'Backspace');
  await page.waitFor((s, n) => document.querySelectorAll(`${s} .dd-chip`).length === n, { args: [BOX, before.length - 2] });
  await page.sleep(100);
  const reported = (await events(page, 'dd:chips-change')).map((e) => e.detail.values);
  assert.ok(reported.length >= 1);
  for (const v of reported) assert.deepEqual(v, before.slice(0, -2), 'every report leaves both leaving chips out');
});
