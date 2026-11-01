import { test } from './lib/test.mjs';

const live = '#cp-live';
const opener = '[data-dd-command="cp-live"]';
const inline = '.ex-stage > .dd-command:has(#cp-open-list)';

// What the palette shows right now: open?, the visible row names, the selected one, the input's active descendant.
const state = (page, root) => page.get((r) => {
  const el = document.querySelector(r);
  const rows = [...el.querySelectorAll('.dd-command__item')].filter((x) => !x.closest('[hidden]'));
  const sel = el.querySelector('.dd-command__item[aria-selected="true"]');
  const input = el.querySelector('.dd-command__input');
  const name = (x) => x.querySelector('.dd-command__body > :first-child').textContent.trim();
  return {
    open: el.open ?? true, rows: rows.map(name), selected: sel ? name(sel) : null, query: input.value,
    active: input.getAttribute('aria-activedescendant'), selId: sel?.id ?? null,
    groups: [...el.querySelectorAll('.dd-command__group')].filter((g) => !g.hidden).length,
    listHidden: el.querySelector('.dd-command__list').hidden, emptyHidden: el.querySelector('.dd-command__empty').hidden,
    echo: el.querySelector('.dd-command__query')?.textContent, focusIn: el.contains(document.activeElement),
  };
}, root);
// Record dd:command events on the page.
const listen = (page) => page.get(() => { window.__cmds = []; document.addEventListener('dd:command', (e) => window.__cmds.push({ value: e.detail.value, isItem: e.detail.item?.classList.contains('dd-command__item') })); });
const cmds = (page) => page.get(() => window.__cmds);

test('⌘K and Ctrl K toggle the page palette; focus lands in the empty search', async ({ open, assert }) => {
  const page = await open('components/command-palette');
  assert.equal((await state(page, live)).open, false);
  await page.press({ key: 'k', meta: true });
  await page.waitFor((s) => document.querySelector(s).open, { args: [live] });
  let s = await state(page, live);
  assert.ok(s.focusIn && (await page.get(() => document.activeElement.classList.contains('dd-command__input'))), 'search has focus');
  assert.equal(s.query, '');
  assert.equal(s.rows.length, 10, 'every row shows');
  assert.equal(s.selected, 'dawn-and-dusk', 'first row selected');
  assert.equal(s.active, s.selId, 'aria-activedescendant points at the selected row');
  await page.press({ key: 'k', meta: true });
  assert.equal((await state(page, live)).open, false, '⌘K again closes');
  await page.press({ key: 'k', ctrl: true });
  assert.equal((await state(page, live)).open, true, 'Ctrl K opens');
  // Rapid toggles settle on the right state.
  await page.press({ key: 'k', ctrl: true }, { key: 'k', ctrl: true }, { key: 'k', ctrl: true });
  assert.equal((await state(page, live)).open, false);
});

test('the opener button opens it; Esc clears, then closes and returns focus', async ({ open, assert }) => {
  const page = await open('components/command-palette');
  await page.click(opener);
  assert.equal((await state(page, live)).open, true);
  await page.type('kube');
  let s = await state(page, live);
  assert.equal(s.listHidden, true, 'no matches: list hides');
  assert.equal(s.emptyHidden, false, 'empty state shows');
  assert.equal(s.echo, 'kube', 'empty state echoes the query');
  assert.equal(s.active, null, 'no active descendant when nothing matches');
  await page.press('Enter');
  assert.equal((await state(page, live)).open, true, 'Enter with no match does nothing');
  await page.press('Escape');
  s = await state(page, live);
  assert.equal(s.open, true, 'first Esc only clears');
  assert.equal(s.query, '');
  assert.equal(s.rows.length, 10);
  await page.press('Escape');
  assert.equal((await state(page, live)).open, false, 'second Esc closes');
  assert.ok(await page.get((o) => document.activeElement === document.querySelector(o), opener), 'focus back on the opener');
  // Reopening after a miss starts fresh, and deleting a miss brings the rows back.
  await page.click(opener);
  await page.type('zz');
  await page.press('Escape', 'Escape');
  await page.click(opener);
  s = await state(page, live);
  assert.equal(s.query, '');
  assert.equal(s.listHidden, false, 'list is back after reopening');
  assert.equal(s.rows.length, 10);
  await page.type('edgex');
  await page.press('Backspace');
  assert.deepEqual((await state(page, live)).rows, ['edge-cache'], 'Backspace out of a miss shows matches again');
});

test('typing filters by text and keywords, hides empty groups, ignores shortcut hints', async ({ open, assert }) => {
  const page = await open('components/command-palette');
  await page.click(opener);
  await page.type('service');
  let s = await state(page, live);
  assert.deepEqual(s.rows, ['auth-gateway', 'billing-worker', 'edge-cache'], 'keywords match');
  assert.equal(s.groups, 1, 'only the Services group stays');
  assert.equal(s.selected, 'auth-gateway', 'first match selected');
  await page.press('Escape');
  await page.type('dark');
  assert.deepEqual((await state(page, live)).rows, ['Switch to dusk']);
  await page.press('Escape');
  await page.type('auth deploy');
  assert.deepEqual((await state(page, live)).rows, ['Redeploy auth-gateway'], 'every word must match');
  await page.press('Escape');
  await page.type('then');
  assert.equal((await state(page, live)).rows.length, 0, '“then” from the G then L hint does not match');
});

test('↑ ↓ and Ctrl N / P move the selection, wrap, and skip disabled rows', async ({ open, assert }) => {
  const page = await open('components/command-palette');
  await page.click(opener);
  await page.press('ArrowDown');
  assert.equal((await state(page, live)).selected, 'dockey-ui');
  await page.press('ArrowUp', 'ArrowUp');
  let s = await state(page, live);
  assert.equal(s.selected, 'Invite a teammate…', 'wraps to the last row');
  assert.equal(s.active, s.selId);
  await page.press({ key: 'n', ctrl: true });
  assert.equal((await state(page, live)).selected, 'dawn-and-dusk', 'Ctrl N wraps to the first');
  await page.press({ key: 'p', ctrl: true });
  assert.equal((await state(page, live)).selected, 'Invite a teammate…', 'Ctrl P');
  // A disabled row is skipped by the keys and can't be run.
  await page.get(() => document.querySelectorAll('#cp-live .dd-command__item')[1].setAttribute('aria-disabled', 'true'));
  await page.press('ArrowDown', 'ArrowDown');
  assert.equal((await state(page, live)).selected, 'ai-focus', 'skips the disabled dockey-ui');
});

test('Enter runs the selected row: dd:command with a clean value, closes, toast feedback', async ({ open, assert }) => {
  const page = await open('components/command-palette');
  await listen(page);
  await page.click(opener);
  await page.type('redeploy');
  await page.press('Enter');
  assert.equal((await state(page, live)).open, false, 'closes after running');
  assert.deepEqual(await cmds(page), [{ value: 'Redeploy auth-gateway', isItem: true }]);
  await page.waitFor(() => [...document.querySelectorAll('.dd-toast__title')].some((t) => t.textContent.includes('Redeploy auth-gateway')));
});

test('pointer: hover selects, click runs, backdrop click closes', async ({ open, assert }) => {
  const page = await open('components/command-palette');
  await listen(page);
  await page.click(opener);
  await page.hover('#cp-live-5');
  assert.equal((await state(page, live)).selected, 'edge-cache', 'hover moves the selection');
  await page.click('#cp-live-5');
  assert.equal((await state(page, live)).open, false);
  assert.equal((await cmds(page))[0].value, 'edge-cache');
  await page.click(opener);
  const r = await page.get(() => { const b = document.querySelector('#cp-live').getBoundingClientRect(); return { x: 20, y: b.bottom + 40 }; });
  await page.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: r.x, y: r.y, button: 'left', clickCount: 1 });
  await page.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: r.x, y: r.y, button: 'left', clickCount: 1 });
  await page.waitFor((s) => !document.querySelector(s).open, { args: [live] });
  assert.equal((await cmds(page)).length, 1, 'backdrop click runs nothing');
});

test('inline palettes filter and run independently, and stay open', async ({ open, assert }) => {
  const page = await open('components/command-palette', { theme: 'dusk' });
  await listen(page);
  await page.click(`${inline} .dd-command__input`);
  await page.type('cdn');
  let s = await state(page, inline);
  assert.deepEqual(s.rows, ['edge-cache']);
  assert.equal((await state(page, live)).rows.length, 10, 'the dialog palette is untouched');
  await page.press('Enter');
  assert.deepEqual(await cmds(page), [{ value: 'edge-cache', isItem: true }]);
  assert.ok(await page.visible(`${inline} .dd-command__list`), 'inline palette stays');
  // The filtered example narrows further as you type.
  const filtered = '.dd-command:has(#cp-filter-list)';
  await page.click(`${filtered} .dd-command__input`);
  await page.press('End');
  await page.type(' roll');
  assert.deepEqual((await state(page, filtered)).rows, ['Roll back last deploy'], '“deploy roll”');
  await page.press('Backspace', 'Backspace', 'Backspace', 'Backspace', 'Backspace');
  assert.equal((await state(page, filtered)).rows.length, 5, 'back to “deploy”: every row, recent deploys by keyword');
  // Empty example echoes what you type.
  await page.click('.dd-command:has(#cp-empty-list) .dd-command__input');
  await page.press('End');
  await page.type('s');
  assert.equal(await page.text('.dd-command:has(#cp-empty-list) .dd-command__query'), 'kubernetess');
  // Selected row reads in dusk: tone differs from the panel.
  const bg = await page.get(() => { const el = document.querySelector('#cp-open-list .dd-command__item[aria-selected="true"]'); return [getComputedStyle(el).backgroundColor, getComputedStyle(el.closest('.dd-command')).backgroundColor]; });
  assert.notEqual(bg[0], bg[1]);
});

test('phone: tap opens the palette and a tapped row runs', async ({ open, assert }) => {
  const page = await open('components/command-palette', { width: 375 });
  await listen(page);
  await page.tap(opener);
  await page.waitFor((s) => document.querySelector(s).open, { args: [live] });
  const fits = await page.get(() => { const r = document.querySelector('#cp-live').getBoundingClientRect(); return r.left >= 0 && r.right <= innerWidth; });
  assert.ok(fits, 'dialog fits a 375px screen');
  await page.tap('#cp-live-2');
  assert.equal((await state(page, live)).open, false);
  assert.equal((await cmds(page))[0].value, 'ai-focus');
});

test('drag-selecting the search text out onto the backdrop keeps it open; a click there still closes', async ({ open, assert }) => {
  const page = await open('components/command-palette');
  await page.click(opener);
  await page.type('deploy');
  const [from, to] = await page.get((s) => {
    const i = document.querySelector(`${s} .dd-command__input`).getBoundingClientRect(), b = document.querySelector(s).getBoundingClientRect();
    return [{ x: i.left + 16, y: i.top + i.height / 2 }, { x: 20, y: b.bottom + 40 }];
  }, live);
  await page.send('Input.dispatchMouseEvent', { type: 'mousePressed', ...from, button: 'left', clickCount: 1 });
  await page.send('Input.dispatchMouseEvent', { type: 'mouseMoved', ...to, button: 'left', buttons: 1 });
  await page.send('Input.dispatchMouseEvent', { type: 'mouseReleased', ...to, button: 'left', clickCount: 1 });
  await page.sleep(150);
  const s = await state(page, live);
  assert.equal(s.open, true, 'a press that started in the search box does not close it');
  assert.equal(s.query, 'deploy');
  await page.send('Input.dispatchMouseEvent', { type: 'mousePressed', ...to, button: 'left', clickCount: 1 });
  await page.send('Input.dispatchMouseEvent', { type: 'mouseReleased', ...to, button: 'left', clickCount: 1 });
  await page.waitFor((x) => !document.querySelector(x).open, { args: [live] });
});

test('a row that opens a dialog: when the dialog closes, focus goes back to what had it before the palette', async ({ open, assert }) => {
  const page = await open('components/command-palette');
  await page.get((s) => {
    document.querySelector('.doc-main').insertAdjacentHTML('afterbegin', '<button class="dd-btn" id="cp-start">I had focus</button>');
    document.querySelector(`${s} .dd-command__group`).insertAdjacentHTML('afterbegin', '<button class="dd-command__item" type="button" data-dd-dialog-open="#cp-new-dlg"><span class="dd-command__body"><span>Start a sandbox…</span></span></button>');
    // Right after the palette, where focus used to land when the row it remembered had closed with the palette.
    document.querySelector(s).insertAdjacentHTML('afterend', '<button class="dd-btn" id="cp-after">After the palette</button><dialog class="dd-dialog" id="cp-new-dlg"><div class="dd-dialog__body"><button class="dd-btn" data-dd-dialog-close>Done</button></div></dialog>');
  }, live);
  await page.focus('#cp-start');
  await page.press({ key: 'k', meta: true });
  await page.waitFor((s) => document.querySelector(s).open, { args: [live] });
  assert.equal(await page.get((s) => document.querySelector(s).ddReturn?.id, live), 'cp-start', 'the palette keeps what had focus as ddReturn');
  await page.type('sandbox');
  await page.press('Enter');
  await page.waitFor(() => document.getElementById('cp-new-dlg').matches(':modal'));
  assert.equal((await state(page, live)).open, false, 'the palette closed as the row ran');
  await page.press('Escape');
  await page.waitFor(() => !document.getElementById('cp-new-dlg').open);
  await page.waitFor(() => document.activeElement?.id === 'cp-start');
  await page.sleep(100);
  assert.equal(await page.active(), '#cp-start', 'and stays there');
});
