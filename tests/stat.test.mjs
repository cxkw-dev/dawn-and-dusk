import { test } from './lib/test.mjs';

const joined = '.ex-stage .dd-stat-grid--joined';
const bg = (page, sel) => page.get((s) => getComputedStyle(document.querySelector(s)).backgroundColor, sel);

test('deltas never rely on colour alone; sparklines are decorative', async ({ open, assert }) => {
  const page = await open('components/stat');
  const deltas = await page.get(() => [...document.querySelectorAll('.ex-stage .dd-stat__delta')].map((d) => d.querySelector('.dd-visually-hidden')?.textContent));
  assert.ok(deltas.length >= 10);
  assert.ok(deltas.every((t) => ['Up', 'Down', 'No change'].includes(t)), `hidden direction text: ${deltas}`);
  assert.equal(await page.count('.ex-stage .dd-stat__spark:not([aria-hidden="true"])'), 0);
  // The tone follows meaning: latency up is bad, errors down is good.
  assert.ok(await page.exists('.ex-stage .dd-stat__delta--bad .dd-icon use[href="#dd-i-arrow-up"]'));
  assert.ok(await page.exists('.ex-stage .dd-stat__delta--ok .dd-icon use[href="#dd-i-arrow-down"]'));
});

for (const theme of ['dawn', 'dusk']) {
  test(`linked tiles (${theme}): hover steps away from the page, Tab walks them with a focus ring`, async ({ open, assert }) => {
    const page = await open('components/stat', { theme });
    const tile = `${joined} > a:nth-child(2)`;
    const rest = await bg(page, tile);
    await page.hover(tile);
    await page.waitFor((s, r) => getComputedStyle(document.querySelector(s)).backgroundColor !== r, { args: [tile, rest] });
    assert.notEqual(await bg(page, tile), await bg(page, `${joined} > a:nth-child(1)`), 'hovered tile differs from its neighbour');
    // Keyboard: the four tiles are consecutive tab stops.
    await page.focus(`${joined} > a:nth-child(1)`);
    const order = [];
    for (let k = 0; k < 4; k++) {
      order.push(await page.get(() => document.activeElement.querySelector('.dd-stat__label')?.textContent));
      assert.equal(await page.get(() => getComputedStyle(document.activeElement).outlineStyle), 'solid', 'focus ring');
      await page.press('Tab');
    }
    assert.deepEqual(order, ['Spend this month', 'Forecast', 'Budget left', 'Open invoices']);
  });
}

test('375px: grids stack to one column and nothing scrolls sideways', async ({ open, assert }) => {
  const page = await open('components/stat', { width: 375 });
  const cols = await page.get(() => new Set([...document.querySelectorAll('.ex-stage .dd-stat-grid:not(.dd-stat-grid--joined) > .dd-stat')].map((t) => Math.round(t.getBoundingClientRect().left))).size);
  assert.equal(cols, 1, 'one column');
  assert.ok(await page.get(() => document.documentElement.scrollWidth <= innerWidth));
  await page.tap(`${joined} > a:nth-child(3)`);
  assert.equal(await page.get(() => location.hash), '#budget', 'a tapped tile follows its link');
});
