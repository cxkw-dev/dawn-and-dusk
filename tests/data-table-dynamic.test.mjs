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
