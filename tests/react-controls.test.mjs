import { test } from './lib/test.mjs';
import { build } from 'esbuild';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
const built = await build({ entryPoints: ['tests/fixtures/react-controls.tsx'], bundle: true, write: false, format: 'esm', jsx: 'automatic', define: { 'process.env.NODE_ENV': '"development"' } });
const css = await readFile(new URL('../release/dawn-and-dusk.css', import.meta.url), 'utf8');
const server = createServer((req, res) => {
  res.setHeader('Content-Type', req.url === '/app.js' ? 'text/javascript' : req.url === '/styles.css' ? 'text/css' : 'text/html');
  res.end(req.url === '/app.js' ? built.outputFiles[0].text : req.url === '/styles.css' ? css : '<!doctype html><html lang="en"><head><link rel="stylesheet" href="/styles.css"></head><body><div id="root"></div><script type="module" src="/app.js"></script></body></html>');
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve)); server.unref();
const url = `http://127.0.0.1:${server.address().port}/`;

test('React controls support controlled state, native refs, form submission and accessible errors', async ({ open, assert }) => {
  const page = await open(url);
  await page.click('#ref-check'); assert.equal(await page.text('#refs'), 'TEXTAREA|SELECT|INPUT|DIALOG');
  await page.focus('textarea[name="bio"]'); await page.get(() => document.querySelector('textarea[name="bio"]').select()); await page.type('Changed');
  assert.match(await page.text('#state'), /^Changed/);
  await page.focus('select[name="region"]'); await page.press('b', 'Enter');
  assert.match(await page.text('#state'), /\|b\|/);
  await page.click('input[name="consent"]'); assert.match(await page.text('#state'), /true$/);
  assert.equal(await page.get(() => document.querySelector('[role="switch"]').checked), true);
  assert.equal(await page.get(() => new FormData(document.querySelector('form')).get('region')), 'b');
  assert.equal(await page.get(() => document.querySelector('input[name="consent"]').getAttribute('aria-describedby')?.length > 0), true, 'numeric hints remain associated');
  await page.focus('textarea[name="bio"]'); await page.get(() => document.querySelector('textarea[name="bio"]').select()); await page.type('x'); await page.click('button[type="submit"]');
  assert.equal(await page.attr('textarea[name="bio"]', 'aria-invalid'), 'true');
  assert.match(await page.attr('textarea[name="bio"]', 'aria-describedby'), /^external-hint /);
  assert.equal(await page.get(() => document.querySelector('textarea[name="bio"]').value), 'x');
});

test('React modal survives Strict Mode, traps focus, closes by Escape, and returns focus', async ({ open, assert }) => {
  const page = await open(url);
  for (let i=0; i<3; i++) {
    await page.click('#open-dialog'); await page.waitFor(() => document.querySelector('dialog').open);
    await page.sleep(100); assert.equal(await page.text('#modal-state'), 'true', 'stale close events do not dismiss a reopened modal');
    await page.press('Tab'); assert.equal(await page.get(() => !!document.activeElement.closest('dialog')), true, 'Tab stays in dialog');
    await page.focus('#done-dialog'); await page.press('Tab');
    assert.equal(await page.get(() => document.activeElement.className), 'dd-dialog__close', 'focus wraps past invisible and inert actions');
    await page.press({ key:'Tab', shift:true }); assert.equal(await page.active(), '#done-dialog', 'backwards wrapping reaches the last usable control');
    await page.press('Escape'); await page.waitFor(() => !document.querySelector('dialog').open);
    assert.equal(await page.text('#modal-state'), 'false'); assert.equal(await page.active(), '#open-dialog');
  }
  await page.click('#open-dialog'); await page.click('#done-dialog'); await page.waitFor(() => !document.querySelector('dialog').open);
});

test('React tabs skip disabled items, wrap, and link each panel to its tab', async ({ open, assert }) => {
  const page = await open(url); await page.focus('[role="tab"]');
  await page.press({key:'ArrowRight',alt:true}, {key:'ArrowRight',ctrl:true}, {key:'ArrowRight',meta:true});
  assert.equal(await page.text('#tab-state'), 'first', 'modified keys remain available to the browser');
  await page.press('ArrowRight');
  assert.equal(await page.text('#tab-state'), 'last');
  assert.equal(await page.get(() => document.activeElement.textContent), 'Last');
  await page.press('ArrowRight'); assert.equal(await page.text('#tab-state'), 'first');
  await page.press('End'); assert.equal(await page.text('#tab-state'), 'last');
  await page.press('Home'); assert.equal(await page.text('#tab-state'), 'first');
  assert.equal(await page.count('[role="tab"][tabindex="0"]'), 1);
  assert.equal(await page.count('[role="tabpanel"]:not([hidden])'), 1);
  assert.equal(await page.get(() => { const tab = document.querySelector('[role="tab"][aria-selected="true"]'); return document.getElementById(tab.getAttribute('aria-controls')).getAttribute('aria-labelledby') === tab.id; }), true);
});
