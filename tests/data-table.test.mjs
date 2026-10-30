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
