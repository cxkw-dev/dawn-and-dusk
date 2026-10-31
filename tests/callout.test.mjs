import { test } from './lib/test.mjs';

// Callouts carry no dismiss button on the docs page (they are asides in prose), but dismiss.js treats them like alerts:
// these tests drive it through dd.dismiss() and through a [data-dd-dismiss] button added the way an app would.
const tag = (page, sel, n, name) => page.get((s, k, t) => { const el = document.querySelectorAll(s)[k]; if (el) el.dataset.t = t; return !!el; }, sel, n, name);
const gone = (page, sel) => page.waitFor((s) => !document.querySelector(s), { args: [sel] });

test('dd.dismiss(callout) fires dd:dismiss and removes it; the others stay', async ({ open, assert }) => {
  const page = await open('components/callout');
  const before = await page.count('.dd-callout');
  await tag(page, '.dd-callout--tip', 0, 'tip');
  await page.get(() => { window.__ev = []; document.addEventListener('dd:dismiss', (e) => window.__ev.push([e.target.dataset.t, e.cancelable, e.bubbles])); });
  await page.get(() => dd.dismiss(document.querySelector('[data-t="tip"]')));
  await gone(page, '[data-t="tip"]');
  assert.deepEqual(await page.get(() => window.__ev), [['tip', true, true]]);
  assert.equal(await page.count('.dd-callout'), before - 1);
});

test('a [data-dd-dismiss] button inside a callout closes it; preventDefault keeps it', async ({ open, assert }) => {
  const page = await open('components/callout');
  await tag(page, '.dd-callout--warning', 0, 'w');
  await page.get(() => { const b = document.createElement('button'); b.type = 'button'; b.id = 'got-it'; b.textContent = 'Got it'; b.setAttribute('data-dd-dismiss', ''); document.querySelector('[data-t="w"]').append(b); });
  await page.get(() => document.addEventListener('dd:dismiss', (e) => e.preventDefault(), { once: true }));
  await page.click('#got-it');
  await page.sleep(400);
  assert.ok(await page.visible('[data-t="w"]'), 'cancelled');
  await page.focus('#got-it');
  await page.press('Enter');
  await gone(page, '[data-t="w"]');
  assert.equal(await page.get(() => document.activeElement === document.body), false, 'focus moved to the callout’s container, not <body>');
});

test('links inside a rich callout are reachable by keyboard; dusk', async ({ open, assert }) => {
  const page = await open('components/callout', { theme: 'dusk' });
  await tag(page, '.dd-callout a[href]', 0, 'link');
  await page.focus('[data-t="link"]');
  assert.ok(await page.get(() => document.activeElement.dataset.t === 'link'));
  // Only the label carries colour: the title tint differs from the body text.
  const [title, body] = await page.get(() => { const c = document.querySelector('.dd-callout--caution'); return [getComputedStyle(c.querySelector('.dd-callout__title')).color, getComputedStyle(c.querySelector('p:not(.dd-callout__title)')).color]; });
  assert.notEqual(title, body);
});

test('compact callout dismisses instantly under reduced motion at 375', async ({ open, assert }) => {
  const page = await open('components/callout', { width: 375 });
  await page.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await tag(page, '.dd-callout--compact', 0, 'c');
  await page.get(() => dd.dismiss(document.querySelector('[data-t="c"]')));
  assert.equal(await page.exists('[data-t="c"]'), false);
});

for (const theme of ['dawn', 'dusk']) test(`documented dismiss button is usable at 375px (${theme})`, async ({ open, assert }) => {
  const page = await open('components/callout', { theme, width: 375 });
  const button = '.ex-stage .dd-callout__dismiss';
  assert.equal(await page.attr(button, 'aria-label'), 'Dismiss note');
  const layout = await page.get((s) => {
    const b = document.querySelector(s).getBoundingClientRect();
    const title = document.querySelector(s).parentElement.querySelector('.dd-callout__title').getBoundingClientRect();
    return { width: b.width, height: b.height, noOverlap: title.right <= b.left };
  }, button);
  assert.ok(layout.width >= 25 && layout.height >= 25 && layout.noOverlap);
  await page.focus(button);
  await page.press('Enter');
  await page.waitFor(() => !document.querySelector('.ex-stage .dd-callout__dismiss'));
});
