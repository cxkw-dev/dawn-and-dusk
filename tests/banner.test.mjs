import { test } from './lib/test.mjs';

const tag = (page, sel, n, name) => page.get((s, k, t) => { const el = document.querySelectorAll(s)[k]; if (el) el.dataset.t = t; return !!el; }, sel, n, name);
const gone = (page, sel) => page.waitFor((s) => !document.querySelector(s), { args: [sel] });

test('dismiss collapses the announcement banner and keeps focus in its example', async ({ open, assert }) => {
  const page = await open('components/banner');
  await tag(page, '.dd-banner:has([data-dd-dismiss])', 0, 'b1');
  await page.get(() => { window.__ev = []; document.addEventListener('dd:dismiss', (e) => window.__ev.push(e.target.dataset.t)); });
  const h0 = await page.get(() => document.querySelector('[data-t="b1"]').parentElement.offsetHeight);
  await page.focus('[data-t="b1"] .dd-banner__dismiss');
  await page.press('Enter');
  await gone(page, '[data-t="b1"]');
  assert.deepEqual(await page.get(() => window.__ev), ['b1']);
  assert.equal(await page.get(() => document.activeElement === document.body), false, 'focus not dropped on <body>');
  assert.ok(await page.get(() => !!document.activeElement.closest('.ex-stage')), 'focus stays in the example');
  const h1 = await page.get(() => document.activeElement.offsetHeight);
  assert.ok(h1 < h0, 'the space the banner took is gone');
});

test('intents: only the dismissible one closes; preventDefault keeps it', async ({ open, assert }) => {
  const page = await open('components/banner');
  await tag(page, '#intents ~ .ex .dd-banner--warn', 0, 'warn');
  await tag(page, '#intents ~ .ex .dd-banner--bad', 0, 'bad');
  assert.equal(await page.exists('[data-t="bad"] [data-dd-dismiss]'), false, 'an open incident has no dismiss');
  assert.equal(await page.attr('[data-t="bad"]', 'role'), 'alert');
  await page.get(() => document.addEventListener('dd:dismiss', (e) => e.preventDefault(), { once: true }));
  await page.click('[data-t="warn"] .dd-banner__dismiss');
  await page.sleep(400);
  assert.ok(await page.visible('[data-t="warn"]'), 'kept after preventDefault');
  await page.click('[data-t="warn"] .dd-banner__dismiss');
  await gone(page, '[data-t="warn"]');
  assert.ok(await page.visible('[data-t="bad"]'));
});

test('dd.dismiss() from code, double dismiss is a no-op; dusk at 375 by touch', async ({ open, assert }) => {
  const page = await open('components/banner', { theme: 'dusk', width: 375 });
  await tag(page, '.dd-banner--neutral', 0, 'n');
  await page.get(() => { window.__n = 0; document.addEventListener('dd:dismiss', () => window.__n++); const el = document.querySelector('[data-t="n"]'); dd.dismiss(el); dd.dismiss(el); });
  await gone(page, '[data-t="n"]');
  assert.equal(await page.get(() => window.__n), 1);
  await tag(page, '.dd-banner:has([data-dd-dismiss])', 0, 'b1');
  // Dismiss sits in the top-right corner when narrow and stays tappable.
  await page.tap('[data-t="b1"] .dd-banner__dismiss');
  await gone(page, '[data-t="b1"]');
});

test('sticky banner stays pinned while its panel scrolls, and Reload answers', async ({ open, assert }) => {
  const page = await open('components/banner');
  await tag(page, '.dd-banner--sticky', 0, 's');
  const top0 = await page.get(() => document.querySelector('[data-t="s"]').getBoundingClientRect().top);
  await page.get(() => { document.querySelector('[data-t="s"]').parentElement.scrollTop = 120; });
  await page.sleep(50);
  const top1 = await page.get(() => document.querySelector('[data-t="s"]').getBoundingClientRect().top);
  assert.ok(Math.abs(top1 - top0) < 1, `stays put (${top0} → ${top1})`);
  await page.click('[data-t="s"] .dd-banner__action');
  await page.waitFor(() => !!document.querySelector('.dd-toaster > .dd-toast'));
});
