import { test } from './lib/test.mjs';

test('rows added or removed from script refresh the count, empty row and selection on their own', async ({ open, assert }) => {
  const page = await open('components/data-table');
  const root = await page.get(() => {
    const r = [...document.querySelectorAll('.ex-stage [data-dd-data-table]')].find((t) => t.querySelector('[data-dd-data-table-count]'));
    r.id = 'dyn'; return !!r;
  });
  assert.ok(root, 'an example with a live count exists');
  const count = () => page.text('#dyn [data-dd-data-table-count]');
  const before = await count();
  await page.get(() => { const tb = document.querySelector('#dyn tbody'); const row = [...tb.rows].find((r) => !r.matches('.dd-data-table__empty-row, .dd-data-table__group, .dd-data-table__detail')); tb.append(row.cloneNode(true)); });
  await page.waitFor((b) => document.querySelector('#dyn [data-dd-data-table-count]').textContent.trim() !== b, { args: [before] });
  const n = (s) => Number((s.match(/\d+/g) || []).pop());
  assert.equal(n(await count()), n(before) + 1, 'count went up by one');
  // stays stable: no refresh loop
  const mutations = await page.get(async () => { let k = 0; const mo = new MutationObserver((l) => { k += l.length; }); mo.observe(document.getElementById('dyn'), { subtree: true, childList: true, attributes: true, characterData: true }); await new Promise((r) => setTimeout(r, 500)); mo.disconnect(); return k; });
  assert.ok(mutations < 5, `idle table stays still (saw ${mutations} mutations)`);
  await page.get(() => { const tb = document.querySelector('#dyn tbody'); tb.lastElementChild.remove(); });
  await page.waitFor((b) => document.querySelector('#dyn [data-dd-data-table-count]').textContent.trim() === b, { args: [before] });
});

const FL = '.doc-main figure.ex:nth-of-type(1) .dd-data-table';
const check = (name) => `${FL} input[aria-label="Select ${name}"]`;
const removeRow = (page, name) => page.get((r, n) => {
  const tr = [...document.querySelectorAll(`${r} tbody > tr`)].find((t) => t.querySelector('[data-col="service"] a')?.textContent === n);
  document.getElementById(tr.querySelector('.dd-data-table__expand').getAttribute('aria-controls'))?.remove();
  tr.remove();
}, FL, name);
const focusOn = (page, sel, what) => page.waitFor((s) => document.activeElement === document.querySelector(s), { args: [sel] }).catch(async () => {
  throw new Error(`${what}: focus is on ${await page.get(() => document.activeElement?.outerHTML.slice(0, 120))}`);
});

// The table follows focus through focusin, which a background tab only gets with focus emulation on (a real page has it).
const focused = async (open) => { const page = await open('components/data-table'); await page.send('Emulation.setFocusEmulationEnabled', { enabled: true }); return page; };

test('a removed row hands focus to the next row (else the previous one, else select-all); a moved row keeps it', async ({ open, assert }) => {
  const page = await focused(open);
  // Focus in a row, the row removed from script: the next row's first control.
  await page.focus(check('billing-worker'));
  await removeRow(page, 'billing-worker');
  await focusOn(page, check('search-indexer'), 'next row');
  // From the row's ⋯ menu (the docs' Remove from fleet reads the row from menu.ddTrigger).
  await page.click(`${FL} [aria-label="Actions for search-indexer"]`);
  await page.click('#dt-row-menu [data-dt-remove]');
  await focusOn(page, check('edge-cache'), 'next row after a menu removal');
  assert.ok(!(await page.exists(`${FL} [aria-label="Actions for search-indexer"]`)));
  await page.waitFor(() => [...document.querySelectorAll('.dd-toast__title')].some((t) => t.textContent === 'search-indexer removed'));
  // The last shown row: the previous one. (Ten rows are left, all on page 1.)
  assert.equal(await page.text(`${FL} [data-dd-data-table-count]`), '10 services');
  await page.focus(check('webhook-relay'));
  await removeRow(page, 'webhook-relay');
  await focusOn(page, check('cron-runner'), 'previous row');
  // A row that is only moved (re-sorted or re-inserted by a framework) keeps its focus.
  await page.focus(check('ledger-sync'));
  await page.get((s) => { const tr = document.querySelector(s).closest('tr'); tr.parentElement.prepend(tr); }, check('ledger-sync'));
  await page.sleep(100);
  await focusOn(page, check('ledger-sync'), 'moved row');
  // Focus elsewhere on the page is never pulled back into the table.
  await page.focus(`${FL} [data-dd-data-table-search]`);
  await removeRow(page, 'cron-runner');
  await page.sleep(100);
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), `${FL} [data-dd-data-table-search]`), 'search keeps focus');
  // Every row gone: the select-all box.
  await page.focus(check('edge-cache'));
  await page.get((r) => document.querySelectorAll(`${r} tbody > tr:not(.dd-data-table__empty-row)`).forEach((tr) => tr.remove()), FL);
  await focusOn(page, `${FL} thead .dd-data-table__check`, 'select-all');
  assert.ok(await page.visible(`${FL} .dd-data-table__empty-row`));
});

test('a bulk action that removes the selected rows moves focus from the hidden bulk bar to select-all', async ({ open, assert }) => {
  const page = await focused(open);
  const bulk = `${FL} .dd-data-table__bulk`;
  assert.ok(await page.visible(bulk), 'two rows start selected');
  await page.focus(`${bulk} [data-dd-toast="Traffic paused"]`);
  await page.get((r) => document.querySelectorAll(`${r} tbody > tr.is-selected`).forEach((tr) => tr.remove()), FL);
  await page.waitFor((s) => document.querySelector(s).hidden, { args: [bulk] });
  await focusOn(page, `${FL} thead .dd-data-table__check`, 'select-all');
  assert.equal(await page.text(`${FL} [data-dd-data-table-count]`), '10 services');
});

test('a table added after load is set up by its first dd.dataTable.refresh and then follows its rows on its own', async ({ open, assert }) => {
  const page = await open('components/data-table');
  await page.get(() => {
    const src = [...document.querySelectorAll('.ex-stage [data-dd-data-table]')].find((t) => t.querySelector('[data-dd-data-table-count]'));
    const late = src.cloneNode(true);
    late.id = 'late-table';
    late.querySelectorAll('[id]').forEach((el) => { el.id = `late-${el.id}`; });
    document.querySelector('.doc-main').append(late);
    window.dd.dataTable.refresh(late);
  });
  const count = () => page.get(() => Number((document.querySelector('#late-table [data-dd-data-table-count]').textContent.match(/\d+/g) || []).pop()));
  const rows = () => page.get(() => [...document.querySelectorAll('#late-table tbody > tr')].filter((r) => !r.matches('.dd-data-table__empty-row, .dd-data-table__group, .dd-data-table__detail')).length);
  const before = await count();
  assert.equal(before, await rows(), 'counted on refresh');
  await page.get(() => { const tb = document.querySelector('#late-table tbody'); const row = [...tb.rows].find((r) => !r.matches('.dd-data-table__empty-row, .dd-data-table__group, .dd-data-table__detail')); tb.append(row.cloneNode(true)); });
  await page.waitFor((b) => Number((document.querySelector('#late-table [data-dd-data-table-count]').textContent.match(/\d+/g) || []).pop()) === b + 1, { args: [before] });
  // A second refresh does not set it up twice (one observer: one refresh per batch, no loop).
  await page.get(() => window.dd.dataTable.refresh('#late-table'));
  const mutations = await page.get(async () => { let k = 0; const mo = new MutationObserver((l) => { k += l.length; }); mo.observe(document.getElementById('late-table'), { subtree: true, childList: true, attributes: true, characterData: true }); await new Promise((r) => setTimeout(r, 500)); mo.disconnect(); return k; });
  assert.ok(mutations < 5, `idle table stays still (saw ${mutations} mutations)`);
});

test('a row removed once focus has left the table leaves focus and the scroll position alone', async ({ open, assert }) => {
  const page = await focused(open);
  // Scrolled to the bottom of the page, well past the table (scroll anchoring may shift a few pixels as rows go).
  const toBottom = () => page.get(() => scrollTo(0, document.body.scrollHeight));
  const state = () => page.get((r) => ({ onPage: document.activeElement === document.body, tableAbove: document.querySelector(r).getBoundingClientRect().bottom < 0 }), FL);
  // Focus in a row, then a click on empty space: focus is on the page; a poll later removes that row.
  await page.click(check('billing-worker'));
  await page.click(check('billing-worker'));
  await page.click('.doc-main h1', { dx: 400 });
  await toBottom();
  await removeRow(page, 'billing-worker');
  await page.sleep(250);
  assert.deepEqual(await state(), { onPage: true, tableAbove: true }, 'not pulled back into the table');
  // The same after focus moved on to another control (here the search, outside any row) and then to the page.
  await page.focus(check('search-indexer'));
  await page.focus(`${FL} [data-dd-data-table-search]`);
  await page.click('.doc-main h1', { dx: 400 });
  await toBottom();
  await removeRow(page, 'search-indexer');
  await page.sleep(250);
  assert.deepEqual(await state(), { onPage: true, tableAbove: true });
  // Focus still in the row while the page scrolls away: it moves to the next row, without scrolling back.
  await page.focus(check('edge-cache'));
  await toBottom();
  const next = await page.get((s) => { const tr = document.querySelector(s).closest('tr'); let n = tr.nextElementSibling; while (n && (n.hidden || n.matches('.dd-data-table__detail'))) n = n.nextElementSibling; return n.querySelector('.dd-data-table__select input').getAttribute('aria-label'); }, check('edge-cache'));
  await removeRow(page, 'edge-cache');
  await focusOn(page, `${FL} input[aria-label="${next}"]`, 'next row');
  assert.equal((await state()).tableAbove, true, 'landing focus does not scroll back to the table');
});

test('hidden columns stay hidden in rows added later', async ({ open, assert }) => {
  const page = await open('components/data-table');
  const shown = (sel) => page.get((s) => [...document.querySelector(s).cells].filter((c) => !c.hidden).length, sel);
  // Owner starts hidden; a row rendered afterwards (no hidden cells of its own) hides its owner cell too.
  await page.get((r) => {
    const tb = document.querySelector(`${r} tbody`);
    const row = [...tb.rows].find((x) => !x.matches('.dd-data-table__empty-row, .dd-data-table__group, .dd-data-table__detail'));
    const fresh = row.cloneNode(true);
    fresh.id = 'fresh-row';
    fresh.querySelectorAll('[hidden]').forEach((c) => { c.hidden = false; });
    fresh.querySelectorAll('[id]').forEach((el) => el.removeAttribute('id'));
    tb.prepend(fresh);
  }, FL);
  await page.waitFor(() => !!document.querySelector('#fresh-row') && [...document.querySelector('#fresh-row').cells].some((c) => c.hidden));
  assert.equal(await shown('#fresh-row'), await shown(`${FL} thead tr`), 'as many cells as the header shows');
});

test('a <tbody> swapped in by a framework is watched from then on', async ({ open }) => {
  const page = await open('components/data-table');
  // A framework swaps the whole body (two rows fewer): the count follows, and so does a later change in the new body.
  const COUNT = `${FL} [data-dd-data-table-count]`;
  const before = await page.get((s) => Number((document.querySelector(s).textContent.match(/\d+/g) || []).pop()), COUNT);
  const settles = (n) => page.waitFor((s, k) => Number((document.querySelector(s).textContent.match(/\d+/g) || []).pop()) === k, { args: [COUNT, n] });
  await page.get((r) => {
    const old = document.querySelector(`${r} tbody`);
    const fresh = old.cloneNode(true);
    fresh.id = 'fresh-body';
    const data = [...fresh.rows].filter((x) => !x.matches('.dd-data-table__empty-row, .dd-data-table__group, .dd-data-table__detail'));
    data[0].remove(); data[1].remove();
    old.replaceWith(fresh);
  }, FL);
  await settles(before - 2);
  await page.get(() => { const b = document.querySelector('#fresh-body'); [...b.rows].find((x) => !x.matches('.dd-data-table__empty-row, .dd-data-table__detail')).remove(); });
  await settles(before - 3);
});

test('a swapped <tbody> that held focus hands it to the new body’s first row', async ({ open, assert }) => {
  const page = await focused(open);
  await page.focus(check('ledger-sync'));
  await page.get((r) => { const old = document.querySelector(`${r} tbody`); old.replaceWith(old.cloneNode(true)); }, FL);
  await page.waitFor(() => document.activeElement !== document.body);
  assert.ok(await page.get((r) => { const a = document.activeElement; const first = [...document.querySelectorAll(`${r} tbody > tr`)].find((t) => !t.hidden && !t.matches('.dd-data-table__detail, .dd-data-table__empty-row')); return first.contains(a); }, FL), 'first shown row');
});
