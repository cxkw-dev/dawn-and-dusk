import { test } from './lib/test.mjs';

// The docs page's examples, in order: flagship, grouped, loading, filtered-empty, no data.
const ex = (n) => `.doc-main figure.ex:nth-of-type(${n})`;
const FL = `${ex(1)} .dd-data-table`;
const GR = `${ex(2)} .dd-data-table`;
const LD = `${ex(3)} .dd-data-table`;
const EM = `${ex(4)} .dd-data-table`;
const ND = `${ex(5)} .dd-data-table`;
const sortBtn = (col, root = FL) => `${root} th[data-col="${col}"] .dd-data-table__sort`;

// Visible data rows' first-column text, in DOM order.
const visibleNames = (page, root = FL) => page.get((r) => [...document.querySelector(r).querySelectorAll('tbody > tr')]
  .filter((tr) => !tr.matches('.dd-data-table__detail, .dd-data-table__empty-row, .dd-data-table__group') && !tr.hidden)
  .map((tr) => (tr.querySelector('[data-col="service"] a') || tr.querySelector('.is-frozen')).textContent.trim()), root);
// Every data row, hidden or not (sorting reorders all of them, across pages).
const allNames = (page) => page.get((r) => [...document.querySelector(r).querySelectorAll('tbody > tr')]
  .filter((tr) => !tr.matches('.dd-data-table__detail, .dd-data-table__empty-row'))
  .map((tr) => tr.querySelector('[data-col="service"] a').textContent.trim()), FL);
const sortState = (page, root = FL) => page.get((r) => Object.fromEntries([...document.querySelectorAll(`${r} th[aria-sort]`)].map((th) => [th.dataset.col, th.getAttribute('aria-sort')])), root);
const listen = (page, ...names) => page.get((ns) => {
  window.__ev = [];
  for (const n of ns) document.addEventListener(n, (e) => window.__ev.push({ type: e.type, ...Object.fromEntries(Object.entries(e.detail).map(([k, v]) => [k, Array.isArray(v) ? v.length : v])) }));
}, names);
const events = (page) => page.get(() => window.__ev);
const range = (page) => page.text(`${FL} .dd-pagination__range`);
const stepOff = (page, k) => page.get((r, i) => document.querySelectorAll(`${r} .dd-pagination__step`)[i].getAttribute('aria-disabled') === 'true', FL, k);
const PREV = `${FL} .dd-pagination__step[aria-label="Previous page"]`;
const NEXT = `${FL} .dd-pagination__step[aria-label="Next page"]`;
const check = (name) => `${FL} input[aria-label="Select ${name}"]`;
const ALL = `${FL} thead .dd-data-table__check`;
async function shiftClick(page, sel) {
  const p = await page.get((s) => { const el = document.querySelector(s); el.scrollIntoView({ block: 'center' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
  for (const type of ['mousePressed', 'mouseReleased']) await page.send('Input.dispatchMouseEvent', { type, x: p.x, y: p.y, button: 'left', clickCount: 1, modifiers: 8 });
  await page.sleep(120);
}

test('sort cycles none → ascending → descending → none, one column at a time, and emits dd:sort', async ({ open, assert }) => {
  const page = await open('components/data-table');
  await listen(page, 'dd:sort');
  const original = await allNames(page);
  await page.click(sortBtn('service'));
  assert.equal((await sortState(page)).service, 'ascending');
  const asc = await allNames(page);
  assert.deepEqual(asc, [...original].sort((a, b) => a.localeCompare(b)));
  await page.click(sortBtn('service'));
  assert.equal((await sortState(page)).service, 'descending');
  assert.deepEqual(await allNames(page), [...asc].reverse());
  await page.click(sortBtn('service'));
  assert.equal((await sortState(page)).service, 'none');
  assert.deepEqual(await allNames(page), original, 'third click restores the original order');

  // Numeric column, and only one column sorted at a time.
  await page.click(sortBtn('service'));
  await page.click(sortBtn('req'));
  await page.click(sortBtn('req'));
  const st = await sortState(page);
  assert.equal(st.req, 'descending');
  assert.equal(st.service, 'none', 'sorting another column resets the first');
  assert.equal((await allNames(page))[0], 'edge-cache', 'highest req/min first');
  // Blank figures sort last both ways; detail rows travel with their row.
  await page.click(sortBtn('err'));
  assert.equal((await allNames(page)).at(-1), 'notify-fanout');
  const detailFollows = await page.get((r) => { const btn = document.querySelector(`${r} [aria-controls="dt-svc-0167"]`); return btn.closest('tr').nextElementSibling.id; }, FL);
  assert.equal(detailFollows, 'dt-svc-0167');
  const ev = await events(page);
  assert.deepEqual(ev.slice(0, 3).map((e) => e.direction), ['ascending', 'descending', 'none']);
  assert.equal(ev[0].column, 'service');
  assert.equal(ev.at(-1).column, 'err');
});

test('keyboard sorts and expands; expanders also toggle by click, with rapid repeats', async ({ open, assert }) => {
  const page = await open('components/data-table');
  await page.focus(sortBtn('p95'));
  await page.press('Enter');
  assert.equal((await sortState(page)).p95, 'ascending');
  await page.press('Space');
  assert.equal((await sortState(page)).p95, 'descending');
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), sortBtn('p95')), 'focus stays on the header');
  const exp = `${FL} [aria-controls="dt-svc-0141"]`;
  await page.focus(exp);
  await page.press('Space');
  assert.equal(await page.attr(exp, 'aria-expanded'), 'true');
  assert.ok(await page.visible('#dt-svc-0141'));
  await page.press('Enter');
  assert.equal(await page.attr(exp, 'aria-expanded'), 'false');
  assert.ok(!(await page.visible('#dt-svc-0141')));
  // By pointer; the one that starts open is expanded.
  assert.equal(await page.attr(`${FL} [aria-controls="dt-svc-0167"]`, 'aria-expanded'), 'true');
  assert.ok(await page.visible('#dt-svc-0167'));
  const exp2 = `${FL} [aria-controls="dt-svc-0152"]`;
  assert.ok(!(await page.visible('#dt-svc-0152')));
  await page.click(exp2);
  assert.equal(await page.attr(exp2, 'aria-expanded'), 'true');
  assert.ok(await page.visible('#dt-svc-0152'));
  assert.match(await page.text('#dt-svc-0152'), /7be03d1/);
  await page.click(exp2);
  await page.click(exp2);
  await page.click(exp2); // rapid repeats land on a consistent state
  assert.equal(await page.attr(exp2, 'aria-expanded'), 'false');
  assert.ok(!(await page.visible('#dt-svc-0152')));
});

test('select rows, select all with indeterminate, shift-click range, bulk bar count, feedback and clear', async ({ open, assert }) => {
  const page = await open('components/data-table');
  await listen(page, 'dd:selectionchange');
  const allState = () => page.get((s) => { const b = document.querySelector(s); return { checked: b.checked, ind: b.indeterminate }; }, ALL);
  const bulk = `${FL} .dd-data-table__bulk`;
  assert.deepEqual(await allState(), { checked: false, ind: true }, 'two preselected rows → indeterminate');
  assert.ok(await page.visible(bulk));
  assert.equal(await page.text(`${FL} [data-dd-data-table-selected]`), '2');

  await page.click(ALL);
  assert.deepEqual(await allState(), { checked: true, ind: false });
  assert.equal(await page.text(`${FL} [data-dd-data-table-selected]`), '10', 'select all takes the visible page');
  assert.equal(await page.count(`${FL} tbody tr.is-selected:not([hidden])`), 10);
  await page.click(ALL);
  assert.deepEqual(await allState(), { checked: false, ind: false });
  assert.ok(!(await page.visible(bulk)), 'bulk bar hides when nothing is selected');

  await page.click(check('edge-cache'));
  assert.deepEqual(await allState(), { checked: false, ind: true });
  assert.ok(await page.get((s) => document.querySelector(s).closest('tr').classList.contains('is-selected'), check('edge-cache')));
  assert.equal(await page.text(`${FL} [data-dd-data-table-selected]`), '1');

  await page.click(`${bulk} [data-dd-toast="Restart queued"]`);
  await page.waitFor(() => [...document.querySelectorAll('.dd-toast__title')].some((t) => t.textContent === 'Restart queued'));

  await page.click(`${bulk} [data-dd-data-table-clear]`);
  assert.ok(!(await page.visible(bulk)));
  assert.equal(await page.count(`${FL} tbody tr.is-selected`), 0);
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), ALL), 'focus moves to select-all, not the page');
  const ev = await events(page);
  assert.deepEqual(ev.map((e) => e.count), [10, 0, 1, 0]);
  // Shift-click selects a range; Space toggles a focused box.
  await page.click(check('auth-gateway'));
  await shiftClick(page, check('ledger-sync'));
  const sel = await page.get((r) => [...document.querySelectorAll(`${r} tbody tr.is-selected`)].map((tr) => tr.querySelector('[data-col="service"] a').textContent), FL);
  assert.deepEqual(sel, ['auth-gateway', 'billing-worker', 'search-indexer', 'edge-cache', 'ledger-sync']);
  await page.focus(check('mail-relay'));
  await page.press('Space');
  assert.equal(await page.text(`${FL} [data-dd-data-table-selected]`), '6');
});

test('search narrows rows, updates the count, shows the empty state and resets', async ({ open, assert }) => {
  const page = await open('components/data-table');
  const count = `${FL} [data-dd-data-table-count]`;
  assert.equal(await page.text(count), '12 services');
  await page.click(`${FL} [data-dd-data-table-search]`);
  await page.type('cache');
  assert.deepEqual(await visibleNames(page), ['edge-cache']);
  assert.equal(await page.text(count), '1 of 12 services');
  assert.equal(await range(page), '1 of 1');
  await page.evaluate(`document.querySelector('${FL} [data-dd-data-table-search]').select()`);
  await page.type('zzz');
  assert.deepEqual(await visibleNames(page), []);
  assert.ok(await page.visible(`${FL} .dd-data-table__empty-row`));
  assert.equal(await page.text(`${FL} [data-dd-data-table-query]`), '“zzz”');
  assert.equal(await page.text(count), '0 of 12 services');
  await page.click(`${FL} [data-dd-data-table-reset]`);
  assert.equal(await page.text(count), '12 services');
  assert.equal(await page.get((s) => document.querySelector(s).value, `${FL} [data-dd-data-table-search]`), '');
  assert.ok(!(await page.visible(`${FL} .dd-data-table__empty-row`)));
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), `${FL} [data-dd-data-table-search]`), 'focus returns to the search');
});

test('status chips OR within a column, the region menu ANDs across columns; Esc closes the menu', async ({ open, assert }) => {
  const page = await open('components/data-table');
  const degraded = `${FL} [data-dd-data-table-filter="status=warn"]`;
  await page.click(degraded);
  assert.equal(await page.attr(degraded, 'aria-pressed'), 'true');
  assert.deepEqual(await visibleNames(page), ['search-indexer', 'metrics-agg']);
  await page.click(`${FL} [data-dd-data-table-filter="status=bad"]`);
  assert.deepEqual(await visibleNames(page), ['search-indexer', 'notify-fanout', 'metrics-agg']);

  const region = `${FL} .dd-data-table__menu--start`;
  await page.click(`${region} > summary`);
  assert.ok(await page.get((s) => document.querySelector(s).open, region));
  await page.click(`${region} input[data-dd-data-table-filter="region=eu-west-2"]`);
  assert.deepEqual(await visibleNames(page), ['notify-fanout']);
  assert.equal(await page.text(`${FL} [data-dd-data-table-filter-label="region"]`), 'eu-west-2');
  assert.ok(await page.get((s) => document.querySelector(s).classList.contains('is-active'), `${region} > summary`));
  await page.click(`${region} input[data-dd-data-table-filter="region=ap-south-1"]`);
  assert.equal(await page.text(`${FL} [data-dd-data-table-filter-label="region"]`), '2 selected');
  assert.deepEqual(await visibleNames(page), ['notify-fanout', 'metrics-agg']);
  await page.press('Escape');
  assert.ok(!(await page.get((s) => document.querySelector(s).open, region)), 'Esc closes the menu');
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), `${region} > summary`), 'focus returns to the chip');
  await page.click(degraded);
  await page.click(`${FL} [data-dd-data-table-filter="status=bad"]`);
  assert.equal(await page.text(`${FL} [data-dd-data-table-count]`), '8 of 12 services', 'two regions, no status filter');
});

test('column menu shows and hides columns; Esc and outside clicks close it', async ({ open, assert }) => {
  const page = await open('components/data-table');
  const menu = `${FL} .dd-data-table__menu:not(.dd-data-table__menu--start)`;
  const colHidden = (c) => page.get((r, col) => { const th = document.querySelector(`${r} thead th[data-col="${col}"]`); const i = [...th.parentElement.cells].indexOf(th); return [...document.querySelectorAll(`${r} tbody tr:not(.dd-data-table__detail, .dd-data-table__empty-row)`)].every((tr) => tr.cells[i].hidden) && th.hidden; }, FL, c);
  assert.ok(await colHidden('owner'), 'owner starts hidden (its box is unchecked)');
  await page.click(`${menu} > summary`);
  assert.ok(await page.visible(`${menu} .dd-data-table__menu-panel`));
  await page.click(`${menu} input[data-dd-data-table-column="id"]`);
  assert.ok(await colHidden('id'));
  assert.equal(await page.attr('#dt-svc-0167 > td', 'colspan'), '11', 'detail rows span the visible columns');
  await page.click(`${menu} input[data-dd-data-table-column="owner"]`);
  assert.ok(!(await colHidden('owner')));
  await page.press('Escape');
  assert.ok(!(await page.get((s) => document.querySelector(s).open, menu)));
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), `${menu} > summary`), 'focus returns to Columns');
  await page.press('Enter');
  assert.ok(await page.get((s) => document.querySelector(s).open, menu), 'Enter reopens it');
  await page.click('.doc-main h1');
  assert.ok(!(await page.get((s) => document.querySelector(s).open, menu)), 'outside click closes it');
  await page.click(`${menu} > summary`);
  await page.click(sortBtn('p95', GR));
  assert.ok(!(await page.get((s) => document.querySelector(s).open, menu)), 'a click in another table closes it too');
});

test('pages through rows: range, aria-disabled ends, page size, dd:pagechange', async ({ open, assert }) => {
  const page = await open('components/data-table');
  await listen(page, 'dd:pagechange');
  assert.equal(await range(page), '1–10 of 12');
  assert.equal((await visibleNames(page)).length, 10);
  assert.ok(await stepOff(page, 0), 'previous is disabled on page 1');
  assert.ok(!(await stepOff(page, 1)));
  await page.click(NEXT);
  assert.equal(await range(page), '11–12 of 12');
  assert.deepEqual(await visibleNames(page), ['cron-runner', 'webhook-relay']);
  assert.ok(await stepOff(page, 1), 'next is disabled on the last page');
  assert.ok(!(await stepOff(page, 0)));
  await page.click(NEXT); // disabled: nothing happens
  assert.equal(await range(page), '11–12 of 12');
  // Keyboard: focus stays on the arrow even as it disables.
  await page.focus(PREV);
  await page.press('Enter');
  assert.equal(await range(page), '1–10 of 12');
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), PREV));
  // Select-all only takes this page.
  await page.click(`${FL} [data-dd-data-table-clear]`);
  await page.click(NEXT);
  await page.click(ALL);
  assert.equal(await page.text(`${FL} [data-dd-data-table-selected]`), '2');
  // Filtering goes back to page 1; sorting keeps the page.
  await page.click(sortBtn('service'));
  assert.equal(await range(page), '11–12 of 12');
  assert.deepEqual(await visibleNames(page), ['session-store', 'webhook-relay']);
  await page.click(`${FL} [data-dd-data-table-search]`);
  await page.type('e');
  assert.match(await range(page), /^1–/);
  await page.evaluate(`(() => { const i = document.querySelector('${FL} [data-dd-data-table-search]'); i.value = ''; i.dispatchEvent(new Event('input', { bubbles: true })); })()`);
  // Page size.
  await page.evaluate(`(() => { const s = document.querySelector('${FL} .dd-pagination__size select'); s.value = '25'; s.dispatchEvent(new Event('change', { bubbles: true })); })()`);
  assert.equal(await range(page), '1–12 of 12');
  assert.equal((await visibleNames(page)).length, 12);
  assert.ok((await stepOff(page, 0)) && (await stepOff(page, 1)), 'one page: both arrows disabled');
  const ev = await events(page);
  assert.deepEqual(ev.map((e) => e.page), [2, 1, 2, 1]);
  assert.equal(ev.at(-1).pageSize, 25);
  assert.equal(ev[0].from, 11);
  assert.equal(ev[0].total, 12);
});

test('row actions open a menu from each row and give feedback', async ({ open, assert }) => {
  const page = await open('components/data-table');
  const trig = `${FL} [aria-label="Actions for edge-cache"]`;
  await page.click(trig);
  assert.equal(await page.attr(trig, 'aria-expanded'), 'true');
  assert.ok(await page.visible('#dt-row-menu'));
  await page.press('Escape');
  assert.ok(!(await page.visible('#dt-row-menu')));
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), trig), 'focus returns to that row’s button');
  const trig2 = `${FL} [aria-label="Actions for auth-gateway"]`;
  await page.click(trig2);
  await page.click('#dt-row-menu [data-dd-toast="Restart queued"]');
  await page.waitFor(() => [...document.querySelectorAll('.dd-toast__title')].some((t) => t.textContent === 'Restart queued'));
  assert.ok(!(await page.visible('#dt-row-menu')));
  await page.click(`${FL} .dd-data-table__tools [data-dd-toast="Export started"]`);
  await page.waitFor(() => [...document.querySelectorAll('.dd-toast__title')].some((t) => t.textContent === 'Export started'));
});

test('tables on one page are independent; grouped rows stay in their group', async ({ open, assert }) => {
  const page = await open('components/data-table');
  await page.click(sortBtn('p95', GR));
  await page.click(sortBtn('p95', GR));
  assert.equal((await sortState(page, GR)).p95, 'descending');
  assert.ok(Object.values(await sortState(page)).every((v) => v === 'none'), 'the flagship is untouched');
  const groups = await page.get((r) => {
    const out = []; let cur;
    for (const tr of document.querySelector(r).querySelectorAll('tbody > tr')) {
      if (tr.matches('.dd-data-table__group')) out.push(cur = { g: tr.querySelector('b').textContent, p95: [] });
      else cur.p95.push(Number(tr.cells[4].dataset.value ?? NaN));
    }
    return out;
  }, GR);
  assert.deepEqual(groups.map((g) => g.g), ['us-east-1', 'eu-west-2', 'ap-south-1']);
  assert.deepEqual(groups.map((g) => g.p95.length), [4, 4, 4]);
  for (const g of groups) { const nums = g.p95.filter((n) => !Number.isNaN(n)); assert.deepEqual(nums, [...nums].sort((a, b) => b - a), `${g.g} sorted inside its group`); }
  assert.equal(await page.text(`${FL} [data-dd-data-table-selected]`), '2', 'the flagship selection is untouched');
});

test('filtered-empty example: removing the chip and Clear filters bring rows back; loading and no-data examples', async ({ open, assert }) => {
  const page = await open('components/data-table');
  const chip = `${EM} [data-dd-data-table-filter]`;
  assert.ok(await page.visible(`${EM} .dd-data-table__empty-row`));
  assert.equal(await page.text(`${EM} [data-dd-data-table-count]`), '0 of 3 services');
  assert.equal(await page.text(`${EM} [data-dd-data-table-query]`), '“edge-proxy”');
  await page.click(chip);
  assert.ok(!(await page.visible(chip)), 'removed chip disappears');
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), `${EM} [data-dd-data-table-search]`));
  assert.ok(await page.visible(`${EM} .dd-data-table__empty-row`), 'the search still matches nothing');
  await page.click(`${EM} [data-dd-data-table-reset]`);
  assert.ok(!(await page.visible(`${EM} .dd-data-table__empty-row`)));
  assert.equal(await page.text(`${EM} [data-dd-data-table-count]`), '3 services');
  assert.deepEqual(await visibleNames(page, EM), ['auth-gateway', 'billing-worker', 'search-indexer']);

  assert.equal(await page.attr(`${LD} .dd-data-table__scroll`, 'aria-busy'), 'true');
  assert.equal(await page.count(`${LD} tbody tr`), 5);
  assert.ok(await page.get((s) => document.querySelector(s).disabled, `${LD} thead .dd-data-table__check`));
  await page.click(`${ND} [data-dd-toast]`);
  await page.waitFor(() => [...document.querySelectorAll('.dd-toast__title')].some((t) => t.textContent === 'Add webhook'));
});

test('dusk: selection and pressed chips take a tone; sticky cells stay opaque', async ({ open, assert }) => {
  const page = await open('components/data-table', { theme: 'dusk' });
  assert.equal(await page.get(() => document.documentElement.dataset.theme), 'dusk');
  const bg = (s) => page.get((sel) => getComputedStyle(document.querySelector(sel)).backgroundColor, s);
  const selCell = await bg(`${FL} tr.is-selected > td:nth-child(3)`);
  const plainCell = await bg(`${FL} tr:not(.is-selected):not([hidden]) > td:nth-child(3)`);
  assert.notEqual(selCell, plainCell, 'selected rows read differently');
  const chip = `${FL} [data-dd-data-table-filter="status=warn"]`;
  const before = await bg(chip);
  await page.click(chip);
  await page.hover('.doc-main h1');
  await page.sleep(250);
  assert.notEqual(await bg(chip), before, 'pressed chip takes the accent tone');
  const frozen = await bg(`${FL} tbody tr:not([hidden]) td.is-frozen`);
  assert.ok(!/rgba\(.*, 0\)$|transparent/.test(frozen), `frozen cell is opaque (${frozen})`);
});

test('375px: taps sort, select and page; nothing overflows the page', async ({ open, assert }) => {
  const page = await open('components/data-table', { width: 375 });
  await page.tap(sortBtn('service'));
  assert.equal((await sortState(page)).service, 'ascending');
  await page.tap(check('auth-gateway'));
  assert.equal(await page.text(`${FL} [data-dd-data-table-selected]`), '3');
  await page.tap(NEXT);
  assert.equal(await range(page), '11–12 of 12');
  await page.tap(`${FL} .dd-data-table__menu--start > summary`);
  assert.ok(await page.visible(`${FL} .dd-data-table__menu--start .dd-data-table__menu-panel`));
  const panel = await page.get((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { l: r.left, r: r.right }; }, `${FL} .dd-data-table__menu--start .dd-data-table__menu-panel`);
  assert.ok(panel.l >= 0 && panel.r <= 375, `region menu fits the screen (${panel.l}–${panel.r})`);
  assert.ok(await page.get(() => document.documentElement.scrollWidth <= innerWidth + 1), 'no sideways page scroll');
});

test('select all skips disabled rows, and the header’s checked / indeterminate state ignores them', async ({ open, assert }) => {
  const page = await open('components/data-table');
  const allState = () => page.get((s) => { const b = document.querySelector(s); return { checked: b.checked, ind: b.indeterminate }; }, ALL);
  const isChecked = (name) => page.get((s) => document.querySelector(s).checked, check(name));
  const selected = () => page.text(`${FL} [data-dd-data-table-selected]`);
  await page.click(`${FL} [data-dd-data-table-clear]`);
  // Two rows on the first page can't be changed (e.g. the workspace owner).
  await page.get((r) => ['auth-gateway', 'edge-cache'].forEach((n) => { document.querySelector(`${r} input[aria-label="Select ${n}"]`).disabled = true; }), FL);
  await page.click(ALL);
  assert.ok(!(await isChecked('auth-gateway')) && !(await isChecked('edge-cache')), 'disabled boxes stay unchecked');
  assert.equal(await selected(), '8', 'the eight enabled rows on the page');
  assert.deepEqual(await allState(), { checked: true, ind: false }, 'every row it can change is selected: fully checked');
  await page.click(check('billing-worker'));
  assert.deepEqual(await allState(), { checked: false, ind: true });
  await page.click(ALL);
  assert.equal(await selected(), '8');
  await page.click(ALL);
  assert.deepEqual(await allState(), { checked: false, ind: false });
  assert.equal(await selected(), '0');
  // A range across a disabled row leaves it alone.
  await page.click(check('billing-worker'));
  await shiftClick(page, check('ledger-sync'));
  assert.ok(!(await isChecked('edge-cache')));
  assert.equal(await selected(), '3', 'billing-worker, search-indexer, ledger-sync');
  // A disabled row that is checked (locked in) stays checked through select all and Clear, and still counts.
  await page.click(`${FL} [data-dd-data-table-clear]`);
  await page.get((s) => { document.querySelector(s).checked = true; dd.dataTable.refresh(s); }, check('auth-gateway'));
  assert.deepEqual(await allState(), { checked: false, ind: false }, 'a locked-in row does not make the header indeterminate');
  await page.click(ALL);
  assert.deepEqual(await allState(), { checked: true, ind: false });
  assert.equal(await selected(), '9');
  await page.click(`${FL} [data-dd-data-table-clear]`);
  assert.ok(await isChecked('auth-gateway'), 'Clear leaves the disabled box as it is');
  assert.equal(await selected(), '1');
});

test('sort: numbers only when both are numeric, ISO dates by time, other text in numeric order', async ({ open, assert }) => {
  const page = await open('components/data-table');
  const FI = `${ex(6)} .dd-data-table`;
  const ids = () => page.get((r) => [...document.querySelectorAll(`${r} tbody > tr`)].map((tr) => tr.cells[0].textContent.trim()), FI);
  const colIdx = (col) => page.get((r, c) => { const th = document.querySelector(`${r} th[data-col="${c}"]`); return [...th.parentElement.cells].indexOf(th); }, FI, col);
  const values = (col) => page.get((r, i) => [...document.querySelectorAll(`${r} tbody > tr`)].map((tr) => tr.cells[i].dataset.value ?? tr.cells[i].textContent.trim()), FI, col);
  const setValues = (i, vals) => page.get((r, k, v) => [...document.querySelectorAll(`${r} tbody > tr`)].forEach((tr, n) => { tr.cells[k].dataset.value = v[n]; }), FI, i, vals);
  const original = await ids();

  // ISO dates in an .is-num column: by time (a number parse would read every one as 2026 or 2025 and tie).
  const created = await colIdx('created');
  await page.click(sortBtn('created', FI));
  const asc = await values(created);
  assert.deepEqual(asc, [...asc].sort((a, b) => Date.parse(a) - Date.parse(b)), 'oldest first');
  assert.equal(asc[0], '2025-12-31T23:47');
  assert.equal(asc.at(-1), '2026-10-30T09:41');
  await page.click(sortBtn('created', FI));
  assert.equal((await values(created))[0], '2026-10-30T09:41', 'newest first');
  await page.click(sortBtn('created', FI));
  assert.deepEqual(await ids(), original);
  // Mixed date-only and date-time values still order by time.
  await setValues(created, ['2026-10-30', '2026-10-29T23:59', '2026-10-30T00:01', '2026-01-02', '2025-12-31T23:59:59', '2026-10-29', '2026-03-04T12:00', '2026-03-04', '2026-10-30T12:00', '2024-02-29', '2026-07-01T08:00']);
  await page.click(sortBtn('created', FI));
  assert.deepEqual(await values(created), ['2024-02-29', '2025-12-31T23:59:59', '2026-01-02', '2026-03-04', '2026-03-04T12:00', '2026-07-01T08:00', '2026-10-29', '2026-10-29T23:59', '2026-10-30', '2026-10-30T00:01', '2026-10-30T12:00']);

  // A text column with fully numeric values: by number (signs, decimals, separators, %, a currency sign, exponents).
  const service = await colIdx('service');
  await setValues(service, ['10', '-3', '2.5', '0.25', '1,240', '7', '-0.5', '100', '3e2', '$40', '12%']);
  await page.click(sortBtn('service', FI));
  assert.deepEqual(await values(service), ['-3', '-0.5', '0.25', '2.5', '7', '10', '12%', '$40', '100', '3e2', '1,240']);
  // Text with numbers in it: localeCompare with numeric collation ("svc-9" before "svc-10").
  await page.click(sortBtn('service', FI));
  await page.click(sortBtn('service', FI));
  await setValues(service, ['svc-12', 'svc-3', 'svc-110', 'svc-7', 'svc-1', 'SVC-25', 'svc-9', 'svc-40', 'svc-2', 'svc-18', 'svc-5']);
  await page.click(sortBtn('service', FI));
  assert.deepEqual(await values(service), ['svc-1', 'svc-2', 'svc-3', 'svc-5', 'svc-7', 'svc-9', 'svc-12', 'svc-18', 'SVC-25', 'svc-40', 'svc-110']);

  // A figure column without data-value: "18.2 s" reads as 18.2; the dash is blank and sorts last both ways.
  await page.click(sortBtn('build', FI));
  const builds = await values(await colIdx('build'));
  assert.deepEqual(builds.slice(0, 3), ['9.4s', '12.1s', '15.0s']);
  assert.equal(builds.at(-1), '—');
  await page.click(sortBtn('build', FI));
  const desc = await values(await colIdx('build'));
  assert.equal(desc[0], '63.5s');
  assert.equal(desc.at(-1), '—');
  // The flagship's Updated column carries ISO data-values too.
  await page.click(sortBtn('at'));
  assert.equal((await allNames(page))[0], 'notify-fanout', 'earliest update first');
});

test('height: --dd-data-table-height: none drops the cap, --fill fills its box (and an app shell page), and the shell drops the grain in dusk', async ({ open, assert }) => {
  const page = await open('components/data-table', { theme: 'dusk' });
  const scroller = `${GR} .dd-data-table__scroll`;
  const box = (s) => page.get((sel) => { const el = document.querySelector(sel); return { h: el.clientHeight, sh: el.scrollHeight, mh: getComputedStyle(el).maxHeight }; }, s);
  await page.get((r) => document.querySelector(r).style.setProperty('--dd-data-table-height', '160px'), GR);
  let b = await box(scroller);
  assert.ok(b.h <= 160 && b.sh > b.h, `capped: scrolls inside (${b.h} / ${b.sh})`);
  await page.get((r) => document.querySelector(r).style.setProperty('--dd-data-table-height', 'none'), GR);
  b = await box(scroller);
  assert.equal(b.mh, 'none');
  assert.ok(b.sh <= b.h + 1, `none: the table grows with its rows, no inner scroll (${b.h} / ${b.sh})`);

  // --fill in a box with a set height: the scroll area takes the rest and scrolls; the table ends at the box's end.
  const FI = `${ex(6)} .dd-data-table`;
  const fill = await page.get((r) => {
    const root = document.querySelector(r), wrap = root.parentElement, sc = root.querySelector('.dd-data-table__scroll');
    return { wrapBottom: wrap.getBoundingClientRect().bottom, rootBottom: root.getBoundingClientRect().bottom, scBottom: sc.getBoundingClientRect().bottom, h: sc.clientHeight, sh: sc.scrollHeight, mh: getComputedStyle(sc).maxHeight };
  }, FI);
  assert.ok(Math.abs(fill.rootBottom - fill.wrapBottom) <= 1 && Math.abs(fill.scBottom - fill.wrapBottom) <= 1, `fills the 340px box (${fill.scBottom} vs ${fill.wrapBottom})`);
  assert.ok(fill.sh > fill.h, 'its rows scroll inside');
  assert.equal(fill.mh, 'none');

  // In an app shell: page height 100% + --fill → the content area doesn't scroll; the table body does. Cells drop the grain.
  const shell = await page.get((r) => {
    const host = document.createElement('div');
    host.id = 'shell-host';
    host.innerHTML = `<div class="dd-app-shell" style="--dd-app-shell-h: 520px"><div class="dd-app-shell__main"><div class="dd-app-shell__content"><div class="dd-app-shell__page" style="height: 100%"><h1 class="dd-h3">deploys</h1></div></div></div></div>`;
    document.querySelector('.doc-main').append(host);
    const t = document.querySelector(r).cloneNode(true);
    host.querySelector('.dd-app-shell__page').append(t);
    host.scrollIntoView();
    const content = host.querySelector('.dd-app-shell__content'), sc = t.querySelector('.dd-data-table__scroll');
    const cell = t.querySelector('tbody td');
    return { outer: content.scrollHeight - content.clientHeight, inner: sc.scrollHeight - sc.clientHeight, grain: getComputedStyle(cell).backgroundImage, tableBg: getComputedStyle(cell).backgroundColor, shellBg: getComputedStyle(host.firstElementChild).backgroundColor };
  }, FI);
  assert.ok(shell.outer <= 1, `the shell's content area doesn't scroll (${shell.outer}px over)`);
  assert.ok(shell.inner > 0, 'the table body scrolls instead');
  assert.equal(shell.grain, 'none', 'no grain on cells in the shell');
  assert.equal(shell.tableBg, shell.shellBg, 'cells are the shell content’s tone');
  // Outside the shell the page grain stays; --dd-data-table-grain brings it back inside.
  assert.match(await page.get((r) => getComputedStyle(document.querySelector(`${r} tbody td`)).backgroundImage, FI), /^url\(/);
  const back = await page.get(() => { const t = document.querySelector('#shell-host .dd-data-table'); t.style.setProperty('--dd-data-table-grain', 'var(--dd-grain)'); return getComputedStyle(t.querySelector('tbody td')).backgroundImage; });
  assert.match(back, /^url\(/);
});
