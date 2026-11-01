import { test } from './lib/test.mjs';

// Examples on the docs page, in order: numbered, first page, labelled, compact, with page size, table footer.
const ex = (n) => `.doc-main figure.ex:nth-of-type(${n}) .ex-stage`;
const NUM = ex(1); const FIRST = ex(2); const LAB = ex(3); const COMPACT = ex(4); const SIZE = ex(5); const FULL = ex(6);
const page_ = (root, n) => `${root} .dd-pagination__page[aria-label="Page ${n}"]`;
const steps = (root) => `${root} .dd-pagination__step`;
const prev = (root) => `${root} .dd-pagination__pages > li:first-child .dd-pagination__step, ${root} .dd-pagination--compact > .dd-pagination__step:first-of-type`;
const next = (root) => `${root} .dd-pagination__pages > li:last-child .dd-pagination__step, ${root} .dd-pagination--compact > .dd-pagination__step:last-of-type`;
const slots = (page, root) => page.get((r) => [...document.querySelectorAll(`${r} .dd-pagination__pages > li:not(.dd-pagination__status)`)].filter((li) => !li.querySelector('.dd-pagination__step')).map((li) => li.textContent.trim()).join(' '), root);
const current = (page, root) => page.text(`${root} [aria-current="page"]`);
const off = (page, sel) => page.attr(sel, 'aria-disabled').then((v) => v === 'true');
const listen = (page) => page.get(() => { window.__ev = []; document.addEventListener('dd:pagechange', (e) => window.__ev.push(e.detail)); });
const events = (page) => page.get(() => window.__ev);
const isActive = (page, sel) => page.get((s) => document.activeElement === document.querySelector(s), sel);
const setSize = (page, root, v) => page.evaluate(`(() => { const s = document.querySelector('${root} select'); s.value = '${v}'; s.dispatchEvent(new Event('change', { bubbles: true })); })()`);

test('numbered: clicking pages and arrows moves aria-current, redraws the window and emits dd:pagechange', async ({ open, assert }) => {
  const page = await open('components/pagination');
  await listen(page);
  assert.equal(await current(page, NUM), '6');
  assert.equal(await slots(page, NUM), '1 … 5 6 7 … 50');
  await page.click(page_(NUM, 7));
  assert.equal(await current(page, NUM), '7');
  assert.equal(await slots(page, NUM), '1 … 6 7 8 … 50');
  assert.equal(await page.count(`${NUM} [aria-current="page"]`), 1, 'one current page');
  await page.click(next(NUM));
  assert.equal(await current(page, NUM), '8');
  await page.click(prev(NUM));
  await page.click(prev(NUM));
  assert.equal(await current(page, NUM), '6');
  await page.click(page_(NUM, 50));
  assert.equal(await slots(page, NUM), '1 … 46 47 48 49 50');
  assert.ok(await off(page, next(NUM)), 'next disables on the last page');
  assert.ok(!(await off(page, prev(NUM))));
  await page.click(page_(NUM, 1));
  assert.equal(await slots(page, NUM), '1 2 3 4 5 … 50');
  assert.ok(await off(page, prev(NUM)), 'previous disables on page 1');
  await page.click(prev(NUM)); // disabled: nothing happens
  assert.equal(await current(page, NUM), '1');
  assert.equal(await page.text(`${NUM} .dd-pagination__status`), 'Page 1 of 50');
  const ev = await events(page);
  assert.deepEqual(ev.map((d) => d.page), [7, 8, 7, 6, 50, 1]);
  assert.equal(ev[0].pages, 50);
  assert.equal(await current(page, FIRST), '1', 'other pagers on the page are untouched');
});

test('keyboard: Enter and Space go; focus stays on the chosen page, and on an arrow as it disables', async ({ open, assert }) => {
  const page = await open('components/pagination');
  await page.focus(page_(NUM, 7));
  await page.press('Enter');
  assert.equal(await current(page, NUM), '7');
  assert.ok(await isActive(page, `${NUM} [aria-current="page"]`), 'focus moves to the redrawn current page');
  await page.press('Tab');
  await page.press('Space');
  assert.equal(await current(page, NUM), '8', 'Space on the next page number');
  // Labelled pager: walk to the end with the keyboard.
  await page.focus(next(LAB));
  for (let k = 0; k < 6; k++) await page.press('Enter');
  assert.equal(await current(page, LAB), '6');
  assert.ok(await off(page, next(LAB)));
  assert.ok(await isActive(page, next(LAB)), 'focus did not drop to the page');
  assert.equal(await slots(page, LAB), '1 2 3 4 5 6', 'short sets show every page');
});

test('first-page example: arrows enable and disable at the edges; rapid clicks keep count', async ({ open, assert }) => {
  const page = await open('components/pagination');
  assert.ok(await off(page, prev(FIRST)));
  await page.click(next(FIRST));
  assert.equal(await current(page, FIRST), '2');
  assert.ok(!(await off(page, prev(FIRST))));
  await page.click(prev(FIRST));
  assert.ok(await off(page, prev(FIRST)), 'previous dims again on page 1');
  for (let k = 0; k < 5; k++) await page.click(next(FIRST));
  assert.equal(await current(page, FIRST), '6');
  assert.equal(await slots(page, FIRST), '1 … 5 6 7 … 50');
});

test('compact and page size: range text, ends, size change keeps the first row in view', async ({ open, assert }) => {
  const page = await open('components/pagination');
  await listen(page);
  const rangeOf = (r) => page.text(`${r} .dd-pagination__range`);
  assert.equal(await rangeOf(COMPACT), '1–50 of 2,481');
  assert.ok(await off(page, prev(COMPACT)));
  await page.click(next(COMPACT));
  assert.equal(await rangeOf(COMPACT), '51–100 of 2,481');
  assert.ok(!(await off(page, prev(COMPACT))));
  const st = await page.get((s) => dd.pagination(document.querySelector(s).closest('[data-dd-pagination]'), { page: 50 }), `${COMPACT} .dd-pagination__range`);
  assert.deepEqual(st, { page: 50, pages: 50, pageSize: 50, total: 2481, from: 2451, to: 2481 });
  assert.equal(await rangeOf(COMPACT), '2,451–2,481 of 2,481');
  assert.ok(await off(page, next(COMPACT)), 'next disables on the last page');
  assert.equal((await events(page)).length, 1, 'dd.pagination() sets state without an event');

  assert.equal(await rangeOf(SIZE), '51–100 of 2,481');
  await setSize(page, SIZE, 25);
  assert.equal(await rangeOf(SIZE), '51–75 of 2,481', 'row 51 stays in view');
  await setSize(page, SIZE, 250);
  assert.equal(await rangeOf(SIZE), '1–250 of 2,481');
  await page.click(next(SIZE));
  assert.equal(await rangeOf(SIZE), '251–500 of 2,481');
  const last = (await events(page)).at(-1);
  assert.deepEqual([last.page, last.pageSize, last.from, last.to], [2, 250, 251, 500]);
});

test('table footer: the size select, range and numbered pages share one state', async ({ open, assert }) => {
  const page = await open('components/pagination');
  assert.equal(await current(page, FULL), '4');
  await page.click(page_(FULL, 5));
  assert.equal(await page.text(`${FULL} .dd-pagination__range`), '201–250 of 2,481');
  await setSize(page, FULL, 100);
  assert.equal(await page.text(`${FULL} .dd-pagination__range`), '201–300 of 2,481');
  assert.equal(await current(page, FULL), '3');
  assert.equal(await slots(page, FULL), '1 2 3 4 5 … 25');
  assert.equal(await page.text(`${FULL} .dd-pagination__status`), 'Page 3 of 25');
});

test('375px: numbers collapse to “Page n of N”; taps on the arrows move it', async ({ open, assert }) => {
  const page = await open('components/pagination', { width: 375 });
  assert.ok(!(await page.visible(page_(NUM, 6))), 'page numbers hide');
  assert.ok(await page.visible(`${NUM} .dd-pagination__status`));
  assert.equal(await page.text(`${NUM} .dd-pagination__status`), 'Page 6 of 50');
  await page.tap(next(NUM));
  assert.equal(await page.text(`${NUM} .dd-pagination__status`), 'Page 7 of 50');
  await page.tap(prev(NUM));
  await page.tap(prev(NUM));
  assert.equal(await page.text(`${NUM} .dd-pagination__status`), 'Page 5 of 50');
  assert.ok(await page.get(() => document.documentElement.scrollWidth <= innerWidth + 1), 'no sideways page scroll');
});

test('dusk: the current page sits on a tone; disabled arrows dim', async ({ open, assert }) => {
  const page = await open('components/pagination', { theme: 'dusk' });
  const bg = (s) => page.get((sel) => getComputedStyle(document.querySelector(sel)).backgroundColor, s);
  assert.notEqual(await bg(`${NUM} [aria-current="page"]`), await bg(page_(NUM, 5)));
  await page.click(page_(NUM, 7));
  await page.hover('.doc-main h1');
  await page.sleep(200);
  assert.notEqual(await bg(page_(NUM, 7)), await bg(page_(NUM, 6)), 'the tone moved with the current page');
  assert.ok(Number(await page.get((s) => getComputedStyle(document.querySelector(s)).opacity, prev(FIRST))) < 0.6);
  assert.equal(await page.count(steps(NUM)), 2);
});

test('top and bottom pagers on one root: each list’s own arrows go the right way and disable at the ends', async ({ open, assert }) => {
  const page = await open('components/pagination');
  await page.get(() => {
    const pager = (id) => `<nav class="dd-pagination" id="${id}" aria-label="Pagination"><ul class="dd-pagination__pages">
      <li><button class="dd-pagination__step" type="button" aria-label="Previous page">‹</button></li>
      <li><button class="dd-pagination__page" type="button" aria-label="Page 1">1</button></li>
      <li><button class="dd-pagination__step" type="button" aria-label="Next page">›</button></li></ul></nav>`;
    document.querySelector('.doc-main').insertAdjacentHTML('beforeend', `<div id="pg-two" data-dd-pagination data-pages="10" data-page="5">${pager('pg-top')}<p>rows</p>${pager('pg-bottom')}</div>`);
    dd.pagination('#pg-two');
  });
  const at = () => page.get(() => document.getElementById('pg-two').dataset.page);
  const arrows = () => page.get(() => [...document.querySelectorAll('#pg-two .dd-pagination__step')].map((b) => (b.getAttribute('aria-disabled') === 'true' ? 'off' : 'on')).join(' '));
  await page.click('#pg-bottom .dd-pagination__pages > li:first-child .dd-pagination__step');
  assert.equal(await at(), '4', 'the bottom Previous goes back');
  await page.click('#pg-bottom .dd-pagination__pages > li:last-child .dd-pagination__step');
  assert.equal(await at(), '5', 'the bottom Next goes forward');
  await page.click('#pg-top .dd-pagination__pages > li:first-child .dd-pagination__step');
  assert.equal(await at(), '4', 'the top Previous goes back');
  await page.click('#pg-bottom .dd-pagination__page[aria-label="Page 1"]');
  assert.equal(await arrows(), 'off on off on', 'both Previous arrows disable on page 1');
  await page.click('#pg-top .dd-pagination__page[aria-label="Page 10"]');
  assert.equal(await arrows(), 'on off on off', 'both Next arrows disable on the last page');
  assert.equal(await page.text('#pg-bottom [aria-current="page"]'), '10', 'both lists show the page');
});
