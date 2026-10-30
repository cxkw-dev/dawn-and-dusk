import { test } from './lib/test.mjs';

// Reading the clipboard back needs permission; writing works without it.
const grant = (page) => page.send('Browser.grantPermissions', { permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite'] });
const clip = (page) => page.get(() => navigator.clipboard.readText());
const shown = (page, sel, icon) => page.get((s, n) => {
  const use = document.querySelector(s).querySelector(`use[href$="#dd-i-${n}"]`);
  const svg = use.closest('svg');
  return getComputedStyle(svg).display !== 'none' && svg.getBoundingClientRect().width > 0;
}, sel, icon);

const block = '#code-astro';
const blockCopy = '[data-dd-copy-target="#code-astro"]';

test('code block: copy copies the exact code and the button confirms', async ({ open, assert }) => {
  const page = await open('components/code');
  await grant(page);
  assert.ok(await shown(page, blockCopy, 'copy'), 'copy icon before');
  await page.click(blockCopy);
  await page.waitFor((s) => document.querySelector(s).hasAttribute('data-copied'), { args: [blockCopy] });
  assert.ok(await shown(page, blockCopy, 'check'), 'check icon while copied');
  assert.ok(!(await shown(page, blockCopy, 'copy')), 'copy icon hidden while copied');
  const text = await clip(page);
  assert.equal(text, (await page.get((s) => document.querySelector(s).textContent, block)).trim());
  assert.equal(text.split('\n').length, 10, 'one line per source line, no blank extras');
  assert.match(text, /^import \{ defineConfig \} from 'astro\/config';/);
  // The confirmation goes away by itself.
  await page.waitFor((s) => !document.querySelector(s).hasAttribute('data-copied'), { args: [blockCopy], timeout: 2500 });
});

test('numbered and diff blocks copy the code without their gutters', async ({ open, assert }) => {
  const page = await open('components/code');
  await grant(page);
  await page.click('[data-dd-copy-target="#code-diff"]');
  await page.waitFor(() => document.querySelector('[data-dd-copy-target="#code-diff"]').hasAttribute('data-copied'));
  const diff = await clip(page);
  assert.equal(diff.split('\n').length, 7);
  assert.ok(diff.split('\n').every((l) => !/^[+−-]\s/.test(l)), 'no +/− markers in the copied text');
  await page.click('[data-dd-copy-target="#code-retry"]');
  await page.waitFor(() => document.querySelector('[data-dd-copy-target="#code-retry"]').hasAttribute('data-copied'));
  const retry = await clip(page);
  assert.match(retry, /^export async function withRetry/, 'no line numbers in the copied text');
  assert.equal(retry.split('\n').length, 10);
});

test('keyboard: the copy button is a real button; Enter copies, Tab moves on to the code', async ({ open, assert }) => {
  const page = await open('components/code');
  await grant(page);
  const bare = '[data-dd-copy-target="#code-bare"]';
  assert.equal(await page.get((s) => document.querySelector(s).tagName, bare), 'BUTTON');
  await page.focus(bare);
  await page.press('Enter');
  await page.waitFor((s) => document.querySelector(s).hasAttribute('data-copied'), { args: [bare] });
  assert.equal(await clip(page), 'npm install @cxkw/dawn-and-dusk');
  // The <pre> after it is the next tab stop, so long lines can be scrolled from the keyboard.
  await page.press('Tab');
  assert.ok(await page.get(() => document.activeElement.matches('.dd-code__pre') && document.activeElement.querySelector('#code-bare') !== null));
});

test('rapid repeat copies keep the confirmation until 1.6s after the last one', async ({ open, assert }) => {
  const page = await open('components/code');
  await grant(page);
  for (let k = 0; k < 4; k++) await page.click(blockCopy);
  assert.ok(await page.get((s) => document.querySelector(s).hasAttribute('data-copied'), blockCopy));
  assert.equal(page.errors.length, 0);
  await page.sleep(1000);
  await page.click(blockCopy);
  await page.sleep(800);
  assert.ok(await page.get((s) => document.querySelector(s).hasAttribute('data-copied'), blockCopy), 'still confirming the last click');
});

const field = '.dd-code-field:has([data-dd-code-secret])';
const reveal = `${field} [data-dd-code-reveal]`;
const value = `${field} [data-dd-code-secret]`;
const SECRET = 'dd_live_51Hc7aQ2xK9mV0dRb4Lp8TzY3f9a';

test('code field: reveal swaps masked ↔ secret with aria-pressed and label; copy always copies the secret', async ({ open, assert }) => {
  const page = await open('components/code');
  await grant(page);
  const masked = await page.text(value);
  assert.notEqual(masked, SECRET);
  assert.equal(await page.attr(reveal, 'aria-pressed'), 'false');
  assert.equal(await page.attr(reveal, 'aria-label'), 'Show key');
  // Copy while masked still copies the real value.
  await page.click(`${field} [data-dd-copy]`);
  await page.waitFor((s) => document.querySelector(s).hasAttribute('data-copied'), { args: [`${field} [data-dd-copy]`] });
  assert.equal(await clip(page), SECRET);

  await page.click(reveal);
  assert.equal(await page.attr(reveal, 'aria-pressed'), 'true');
  assert.equal(await page.attr(reveal, 'aria-label'), 'Hide key');
  assert.equal(await page.text(value), SECRET);
  assert.ok(await shown(page, reveal, 'eye-off'), 'eye-off icon while revealed');

  // Keyboard: Space on the focused button hides it again.
  await page.focus(reveal);
  await page.press('Space');
  assert.equal(await page.attr(reveal, 'aria-pressed'), 'false');
  assert.equal(await page.text(value), masked);
  // Rapid toggles land back where they started.
  for (let k = 0; k < 4; k++) await page.click(reveal);
  assert.equal(await page.text(value), masked);
  assert.equal(await page.attr(reveal, 'aria-label'), 'Show key');
});

test('dusk: terminal copies only the command; the copy button confirms', async ({ open, assert }) => {
  const page = await open('components/code', { theme: 'dusk' });
  await grant(page);
  const btn = '.dd-code--terminal .dd-code__copy';
  await page.click(btn);
  await page.waitFor((s) => document.querySelector(s).hasAttribute('data-copied'), { args: [btn] });
  assert.equal(await clip(page), 'npm run deploy -- --region eu-west-2');
  assert.ok(await shown(page, btn, 'check'));
  // Prompts are not selectable, so a manual copy can't pick them up either.
  assert.equal(await page.get(() => getComputedStyle(document.querySelector('.dd-code__prompt')).userSelect), 'none');
});

test('375px: tap copies, and a long line scrolls inside its block from the keyboard', async ({ open, assert }) => {
  const page = await open('components/code', { width: 375 });
  await grant(page);
  const btn = '[data-dd-copy-target="#code-retry"]';
  await page.tap(btn);
  await page.waitFor((s) => document.querySelector(s).hasAttribute('data-copied'), { args: [btn] });
  assert.match(await clip(page), /^export async function withRetry/);
  const pre = '.dd-code--numbered .dd-code__pre';
  assert.ok(await page.get((s) => { const p = document.querySelector(s); return p.scrollWidth > p.clientWidth; }, pre), 'overflows at 375');
  assert.ok(await page.get(() => document.documentElement.scrollWidth <= innerWidth), 'the page itself does not scroll sideways');
  await page.focus(pre);
  await page.press('ArrowRight', 'ArrowRight', 'ArrowRight');
  assert.ok(await page.get((s) => document.querySelector(s).scrollLeft > 0, pre), 'arrow keys scroll the code');
});
