import { test } from './lib/test.mjs';

// The accessibility tree as Chrome computes it: { role, name } for every match.
const ax = async (page, sel) => {
  const { root } = await page.send('DOM.getDocument', { depth: 0 });
  const { nodeIds } = await page.send('DOM.querySelectorAll', { nodeId: root.nodeId, selector: sel });
  const out = [];
  for (const nodeId of nodeIds) {
    const { nodes } = await page.send('Accessibility.getPartialAXTree', { nodeId, fetchRelatives: false });
    out.push({ role: nodes[0].role?.value, name: nodes[0].name?.value ?? '' });
  }
  return out;
};
const toasts = (page) => page.get(() => [...document.querySelectorAll('.dd-toast__title')].map((t) => t.textContent));
const toasted = (page, title, n = 1) => page.waitFor((t, k) => [...document.querySelectorAll('.dd-toast__title')].filter((x) => x.textContent === t).length >= k, { args: [title, n] });

const tables = '.ex-stage .dd-table';
const invoices = '.dd-table--interactive';
const row = (n) => `${invoices} tbody tr:nth-child(${n})`;

test('semantics: labelled scroll regions, column headers, a row header on the total, status words', async ({ open, assert }) => {
  const page = await open('components/table');
  const regions = await ax(page, tables);
  assert.equal(regions.length, 5);
  assert.deepEqual(regions.map((r) => r.role), Array(5).fill('region'));
  // (Titles named via aria-labelledby come through lowercased: the heading lockup is text-transform: lowercase.)
  assert.deepEqual(regions.map((r) => r.name.toLowerCase()), ['projects', 'open source', 'projects', 'recent deploys', 'invoices']);
  assert.ok(await page.get((s) => [...document.querySelectorAll(s)].every((t) => t.tabIndex === 0), tables), 'every card is a tab stop');

  assert.ok(await page.get(() => [...document.querySelectorAll('.ex-stage .dd-table thead th')].every((th) => th.getAttribute('scope') === 'col')));
  const heads = await ax(page, '.ex-stage .dd-table--compact thead th');
  assert.deepEqual(heads.map((h) => h.role), Array(5).fill('columnheader'));
  assert.deepEqual(heads.map((h) => h.name), ['Commit', 'Service', 'Environment', 'Duration', 'Started']);
  const [total] = await ax(page, `${invoices} tfoot th`);
  assert.deepEqual(total, { role: 'rowheader', name: 'Total, last 3 months' });

  // Status is a dot plus a word, never colour alone; figures right-align.
  assert.ok(await page.get(() => [...document.querySelectorAll('.ex-stage .dd-table__status')].every((s) => s.textContent.trim().length > 2)));
  assert.ok(await page.get(() => [...document.querySelectorAll('.ex-stage .dd-table .is-num')].every((c) => getComputedStyle(c).textAlign === 'right')));
});

test('dusk: an interactive row lights up on hover, opens from a click anywhere on it, and rings on keyboard focus', async ({ open, assert }) => {
  const page = await open('components/table', { theme: 'dusk' });
  const amount = `${row(1)} td.is-num`;
  const card = await page.get((s) => getComputedStyle(document.querySelector(s)).backgroundColor, invoices);
  const rest = await page.get((s) => getComputedStyle(document.querySelector(s)).backgroundColor, row(1));
  await page.hover(amount);
  await page.waitFor((s, before) => getComputedStyle(document.querySelector(s)).backgroundColor !== before, { args: [row(1), rest] });
  assert.notEqual(await page.get((s) => getComputedStyle(document.querySelector(s)).backgroundColor, row(1)), card, 'hover tone differs from the card');
  assert.equal(await page.get((s) => getComputedStyle(document.querySelector(s)).cursor, row(1)), 'pointer');

  // A click on the amount (far from the link text) still opens the row: the link covers it.
  const url = await page.get(() => location.href);
  const y = await page.get(() => scrollY);
  await page.click(amount);
  await toasted(page, 'Opening INV-2026-0142');
  assert.equal(await page.get(() => location.href), url, 'placeholder link does not navigate');
  assert.equal(await page.get(() => scrollY), y, 'nor jump the page');

  // Keyboard: Tab from the card lands on the first row's link, which rings the whole row; Enter opens it.
  await page.focus(invoices);
  await page.press('Tab');
  assert.equal(await page.get(() => document.activeElement.textContent), 'INV-2026-0142');
  assert.equal(await page.get((s) => getComputedStyle(document.querySelector(s)).outlineStyle, row(1)), 'solid', 'row is ringed');
  await page.press('Tab');
  assert.equal(await page.get((s) => getComputedStyle(document.querySelector(s)).outlineStyle, row(1)), 'none', 'ring moves on');
  assert.equal(await page.get((s) => getComputedStyle(document.querySelector(s)).outlineStyle, row(2)), 'solid');
  await page.press('Enter');
  await toasted(page, 'Opening INV-2026-0131');
});

test('placeholder links stay put; the header action and the empty-state buttons give feedback by click and keyboard', async ({ open, assert }) => {
  const page = await open('components/table');
  const link = '.ex-stage .dd-table td a[href="#"]';
  await page.focus(link);
  const y = await page.get(() => scrollY);
  await page.press('Enter');
  assert.equal(await page.get(() => location.hash), '');
  assert.equal(await page.get(() => scrollY), y, 'Enter on a placeholder link does not jump to the top');

  await page.focus('.dd-table-header__action');
  await page.press('Enter');
  await toasted(page, 'Opening all 12 projects');

  const headerBtn = '.dd-table-header > .dd-btn';
  const emptyBtn = '.dd-table__empty .dd-btn';
  await page.click(headerBtn);
  await toasted(page, 'New project');
  await page.focus(emptyBtn);
  await page.press('Space');
  await toasted(page, 'New project', 2);
  assert.equal((await toasts(page)).length, 3);

  // An app swaps the empty body out with the hidden attribute.
  await page.get(() => { document.querySelector('.dd-table__empty').hidden = true; });
  assert.equal(await page.visible('.dd-table__empty'), false, '[hidden] hides the empty body');
});

test('375px: wide tables scroll inside their card (arrow keys too), never the page; a tap opens a row', async ({ open, assert }) => {
  const page = await open('components/table', { width: 375 });
  assert.ok(await page.get(() => document.documentElement.scrollWidth <= innerWidth), 'no sideways page scroll');
  assert.ok(await page.get((s) => [...document.querySelectorAll(`${s}:has(tbody)`)].every((t) => t.scrollWidth > t.clientWidth), tables), 'every card with rows overflows at 375');

  const compact = '.ex-stage .dd-table--compact';
  // Tab in from the previous example's last button, as a keyboard user would.
  await page.focus('.ex:has(.dd-table__empty) [data-dd-copy]');
  await page.press('Tab');
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), compact), 'the card is the next tab stop');
  assert.equal(await page.get((s) => getComputedStyle(document.querySelector(s)).outlineStyle, compact), 'solid', 'focused card shows a ring');
  await page.press('ArrowRight', 'ArrowRight', 'ArrowRight');
  assert.ok(await page.get((s) => document.querySelector(s).scrollLeft > 0, compact), 'arrow keys scroll the table');
  assert.ok(await page.get(() => document.documentElement.scrollWidth <= innerWidth && scrollX === 0), 'the page still does not move sideways');

  await page.tap(`${row(3)} td.is-num`);
  await toasted(page, 'Opening INV-2026-0119');
});
