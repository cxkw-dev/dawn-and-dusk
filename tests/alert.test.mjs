import { test } from './lib/test.mjs';

// Tags the nth element matching `sel` with data-t="name" so later steps can find it by a stable selector.
const tag = (page, sel, n, name) => page.get((s, k, t) => { const el = document.querySelectorAll(s)[k]; if (el) el.dataset.t = t; return !!el; }, sel, n, name);
const gone = (page, sel) => page.waitFor((s) => !document.querySelector(s), { args: [sel] });
const dismissable = '#actions ~ .ex .dd-alert:has([data-dd-dismiss])';

test('dismiss button fades the alert out, removes it and leaves the others alone', async ({ open, assert }) => {
  const page = await open('components/alert');
  const before = await page.count('.dd-alert');
  await tag(page, dismissable, 0, 'a1');
  await tag(page, dismissable, 1, 'a2');
  await page.click('[data-t="a1"] .dd-alert__dismiss');
  assert.ok(await page.exists('[data-t="a1"][data-dd-leaving]'), 'marked as leaving while it animates');
  await gone(page, '[data-t="a1"]');
  assert.equal(await page.count('.dd-alert'), before - 1);
  assert.ok(await page.visible('[data-t="a2"]'), 'the next alert is untouched');
  assert.equal(await page.get(() => document.activeElement === document.body), false, 'focus not dropped on <body>');
});

test('dd:dismiss fires on the alert, bubbles, and preventDefault keeps it', async ({ open, assert }) => {
  const page = await open('components/alert');
  await tag(page, dismissable, 0, 'a1');
  await page.get(() => {
    window.__ev = [];
    document.addEventListener('dd:dismiss', (e) => { window.__ev.push({ t: e.target.dataset.t, cancelable: e.cancelable }); if (window.__keep) e.preventDefault(); });
    window.__keep = true;
  });
  await page.click('[data-t="a1"] .dd-alert__dismiss');
  await page.sleep(400);
  assert.ok(await page.visible('[data-t="a1"]'), 'cancelled dismissal keeps the alert');
  assert.equal(await page.attr('[data-t="a1"]', 'data-dd-leaving'), null);
  assert.deepEqual(await page.get(() => window.__ev), [{ t: 'a1', cancelable: true }]);
  await page.get(() => { window.__keep = false; });
  await page.click('[data-t="a1"] .dd-alert__dismiss');
  await gone(page, '[data-t="a1"]');
  assert.equal(await page.get(() => window.__ev.length), 2);
});

test('keyboard: Enter on dismiss removes it and focus stays in the example', async ({ open, assert }) => {
  const page = await open('components/alert');
  await tag(page, dismissable, 0, 'a1');
  await page.get(() => { const s = document.querySelector('[data-t="a1"]').parentElement; s.dataset.t = 'stack'; });
  await page.focus('[data-t="a1"] .dd-alert__dismiss');
  await page.press('Enter');
  await gone(page, '[data-t="a1"]');
  assert.ok(await page.get(() => document.querySelector('[data-t="stack"]').contains(document.activeElement)), 'focus moved to the stack the alert was in');
  // Tab continues from there, into the next alert.
  await page.press('Tab');
  assert.ok(await page.get(() => document.activeElement.closest('.dd-alert') !== null), 'Tab lands in the next alert');
  assert.equal(await page.attr('[data-t="stack"]', 'tabindex'), null, 'temporary tabindex is cleaned up');
});

test('dd.dismiss(el) and data-dd-dismiss="#id" from outside; rapid clicks are harmless', async ({ open, assert }) => {
  const page = await open('components/alert');
  await tag(page, '.dd-alert', 0, 'first');
  await page.get(() => dd.dismiss(document.querySelector('[data-t="first"]')));
  await gone(page, '[data-t="first"]');
  // A button elsewhere that names its target.
  await tag(page, '.dd-alert', 0, 'named');
  await page.get(() => { const a = document.querySelector('[data-t="named"]'); a.id = 'named-alert'; const b = document.createElement('button'); b.id = 'ext'; b.textContent = 'hide'; b.setAttribute('data-dd-dismiss', '#named-alert'); document.querySelector('.doc-main').prepend(b); });
  await page.click('#ext');
  await gone(page, '#named-alert');
  // Hammer one dismiss button: one event, no errors.
  await tag(page, dismissable, 0, 'r');
  await page.get(() => { window.__n = 0; document.addEventListener('dd:dismiss', () => window.__n++); });
  await page.get(() => { const b = document.querySelector('[data-t="r"] .dd-alert__dismiss'); for (let k = 0; k < 5; k++) b.click(); });
  await gone(page, '[data-t="r"]');
  assert.equal(await page.get(() => window.__n), 1);
});

test('reduced motion removes at once; dusk and 375px work', async ({ open, assert }) => {
  const page = await open('components/alert', { theme: 'dusk', width: 375 });
  await page.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await tag(page, dismissable, 0, 'a1');
  // Dusk alerts are a solid fill, not a wash over the page.
  const bg = await page.get(() => getComputedStyle(document.querySelector('[data-t="a1"]')).backgroundColor);
  assert.ok(!/rgba?\(.*,\s*0\)$/.test(bg), `solid background in dusk: ${bg}`);
  await page.tap('[data-t="a1"] .dd-alert__dismiss');
  assert.equal(await page.exists('[data-t="a1"]'), false, 'gone without waiting for an animation');
});

test('alert actions give feedback', async ({ open, assert }) => {
  const page = await open('components/alert');
  await tag(page, '#actions ~ .ex .dd-alert', 1, 'deploy');
  await page.click('[data-t="deploy"] .dd-alert__action');
  await page.waitFor(() => !!document.querySelector('.dd-toaster > .dd-toast'));
  assert.match(await page.text('.dd-toaster > .dd-toast .dd-toast__title'), /retry/i);
});

test('focus moved on during the exit animation stays where the user put it', async ({ open, assert }) => {
  const page = await open('components/alert');
  await tag(page, dismissable, 0, 'a1');
  await page.get(() => document.querySelector('.doc-main').insertAdjacentHTML('beforeend', '<button class="dd-btn" id="elsewhere">Elsewhere</button>'));
  await page.focus('[data-t="a1"] .dd-alert__dismiss');
  await page.press('Enter');
  assert.ok(await page.exists('[data-t="a1"][data-dd-leaving]'), 'still leaving');
  await page.focus('#elsewhere');
  await gone(page, '[data-t="a1"]');
  await page.sleep(50);
  assert.equal(await page.active(), '#elsewhere', 'not pulled back to the alert’s parent');
});
