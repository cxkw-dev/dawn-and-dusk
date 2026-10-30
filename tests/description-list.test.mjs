import { test } from './lib/test.mjs';

// Record what gets copied (headless Chrome has no real clipboard to read back).
const stubClipboard = (page) => page.get(() => {
  window.__copied = [];
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async (t) => { window.__copied.push(t); } } });
});
const firstCopy = '.ex-stage .dd-description-list .dd-description-list__copy';
const opacity = (page, sel) => page.get((s) => Number(getComputedStyle(document.querySelector(s)).opacity), sel);

test('copy button appears on row hover, copies the value and confirms', async ({ open, assert }) => {
  const page = await open('components/description-list');
  await stubClipboard(page);
  assert.ok(await page.count('.ex-stage .dd-description-list__copy') >= 6);
  // Every copy button names what it copies.
  assert.equal(await page.count('.ex-stage .dd-description-list__copy:not([aria-label^="Copy "])'), 0);
  await page.hover('.ex-stage .dd-description-list__item:nth-child(4) .dd-description-list__term');
  assert.ok(await opacity(page, firstCopy) < 0.1, 'hidden until its own row is hovered');
  await page.hover('.ex-stage .dd-description-list__item:first-child .dd-description-list__term');
  await page.waitFor((s) => Number(getComputedStyle(document.querySelector(s)).opacity) > 0.9, { args: [firstCopy] });
  await page.click(firstCopy);
  assert.deepEqual(await page.get(() => window.__copied), ['dpl_7Hq2xK9mW4']);
  assert.equal(await page.attr(firstCopy, 'data-copied'), '');
  assert.ok(await page.get((s) => getComputedStyle(document.querySelector(`${s} .dd-icon:last-child`)).display !== 'none', firstCopy), 'check icon shows');
  assert.equal(await page.count('.ex-stage [data-copied]'), 1, 'only the clicked button confirms');
  // Moving away keeps the confirmation visible until it times out.
  await page.hover('.doc-main h2');
  assert.ok(await opacity(page, firstCopy) > 0.9);
  await page.waitFor((s) => !document.querySelector(s).hasAttribute('data-copied'), { args: [firstCopy], timeout: 2500 });
});

test('keyboard: Tab reveals the copy button, Enter copies (dusk)', async ({ open, assert }) => {
  const page = await open('components/description-list', { theme: 'dusk' });
  await stubClipboard(page);
  // Tab from the start of the first list: copy buttons and the link are the only stops.
  await page.focus(firstCopy);
  await page.waitFor((s) => Number(getComputedStyle(document.querySelector(s)).opacity) > 0.9, { args: [firstCopy] }); // visible on focus
  await page.press('Tab');
  assert.equal(await page.get(() => document.activeElement.getAttribute('aria-label')), 'Copy commit SHA');
  await page.press('Enter');
  await page.press('Tab', 'Tab');
  assert.equal(await page.get(() => document.activeElement.getAttribute('aria-label')), 'Copy URL', 'skips over the domain link to its copy button');
  await page.press(' ');
  assert.deepEqual(await page.get(() => window.__copied), ['a41f9c2', 'https://dawn-and-dusk.cxkw.dev']);
});

test('touch at 375px: copy buttons are always visible and tap to copy; lists stack', async ({ open, assert }) => {
  const page = await open('components/description-list', { width: 375 });
  await stubClipboard(page);
  assert.ok(await opacity(page, firstCopy) > 0.9, 'no hover on touch, so always shown');
  await page.tap('.ex-stage .dd-description-list--card .dd-description-list__copy');
  assert.deepEqual(await page.get(() => window.__copied), ['auth-gateway.internal:8443']);
  assert.ok(await page.get(() => document.documentElement.scrollWidth <= innerWidth), 'no sideways scroll');
  // Inline list switches to term-above-value when narrow.
  const stacked = await page.get(() => { const it = document.querySelector('.ex-stage .dd-description-list__item'); const [t, d] = it.children; return d.getBoundingClientRect().top >= t.getBoundingClientRect().bottom - 1; });
  assert.ok(stacked, 'term sits above value at 375px');
});
