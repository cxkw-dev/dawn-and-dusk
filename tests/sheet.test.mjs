import { test } from './lib/test.mjs';

// ---- helpers ----
const opener = (id) => `[data-dd-dialog-open="#${id}"]`;
const isOpen = (page, id) => page.get((i) => document.getElementById(i).open, id);
const waitClosed = (page, id) => page.waitFor((i) => !document.getElementById(i).open, { args: [id] });
/** Open and risen: pinned to the bottom edge with its animation done. */
const waitSettled = (page, id) => page.waitFor((i) => { const d = document.getElementById(i); return d.open && d.matches(':modal') && Math.abs(d.getBoundingClientRect().bottom - innerHeight) < 1 && !d.getAnimations().length; }, { args: [id] });
const returnValue = (page, id) => page.get((i) => document.getElementById(i).returnValue, id);
const focusInside = (page, id) => page.get((i) => document.getElementById(i).contains(document.activeElement), id);
const focusIs = (page, sel) => page.get((s) => document.activeElement === document.querySelector(s), sel);
const rect = (page, sel) => page.get((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, width: r.width, height: r.height }; }, sel);
async function clickAt(page, x, y) {
  for (const type of ['mouseMoved', 'mousePressed', 'mouseReleased']) await page.send('Input.dispatchMouseEvent', { type, x, y, button: type === 'mouseMoved' ? 'none' : 'left', clickCount: 1 });
  await page.sleep(120);
}
async function tapAt(page, x, y) {
  await page.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] });
  await page.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await page.sleep(150);
}
const luminance = (page, sel, prop = 'backgroundColor') => page.get((s, pr) => {
  const c = document.createElement('canvas').getContext('2d');
  c.fillStyle = getComputedStyle(document.querySelector(s))[pr]; c.fillRect(0, 0, 1, 1);
  const [r, g, b] = [...c.getImageData(0, 0, 1, 1).data].map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}, sel, prop);

// ---- tests ----
test('rises from the bottom as a centred column; Esc slides it away and focus returns', async ({ open, assert }) => {
  const page = await open('components/sheet');
  await page.click(opener('rollback-sheet'));
  await waitSettled(page, 'rollback-sheet');
  assert.ok(await focusInside(page, 'rollback-sheet'), 'focus moved into the sheet');
  const r = await rect(page, '#rollback-sheet');
  assert.equal(Math.round(r.width), 560, 'a 560px column on wide screens');
  // centred in the layout viewport (the page keeps a scrollbar gutter, so measure the body, not the window)
  const mid = await page.get(() => document.body.clientWidth / 2);
  assert.ok(Math.abs((r.left + r.right) / 2 - mid) < 2, 'centred');
  await page.press('Escape');
  assert.ok(await page.get(() => document.getElementById('rollback-sheet').classList.contains('is-closing')), 'plays the slide-down');
  await waitClosed(page, 'rollback-sheet');
  assert.equal(await returnValue(page, 'rollback-sheet'), '');
  assert.ok(await focusIs(page, opener('rollback-sheet')));
});

test('confirm: Roll back closes with its value, Cancel without; the scrim closes it', async ({ open, assert }) => {
  const page = await open('components/sheet');
  await page.click(opener('rollback-sheet'));
  await waitSettled(page, 'rollback-sheet');
  await page.click('#rollback-sheet [data-dd-dialog-close="rollback"]');
  await waitClosed(page, 'rollback-sheet');
  assert.equal(await returnValue(page, 'rollback-sheet'), 'rollback');
  await page.waitFor(() => /rolling back billing-worker/i.test(document.querySelector('.dd-toaster')?.textContent || ''));
  await page.click(opener('rollback-sheet'));
  await waitSettled(page, 'rollback-sheet');
  await page.click('#rollback-sheet .dd-sheet__desc');
  assert.ok(await isOpen(page, 'rollback-sheet'), 'a click inside keeps it open');
  await clickAt(page, 640, 60);
  await waitClosed(page, 'rollback-sheet');
  assert.equal(await returnValue(page, 'rollback-sheet'), '');
});

test('actions: ↑ ↓ Home End move between rows (wrapping); Enter picks the focused row', async ({ open, assert }) => {
  const page = await open('components/sheet');
  await page.click(opener('project-sheet'));
  await waitSettled(page, 'project-sheet');
  await page.press('Tab'); // close → first row
  const label = () => page.text(':focus .dd-sheet__item-label');
  assert.equal(await label(), 'Copy share link');
  await page.press('ArrowDown');
  assert.equal(await label(), 'Duplicate');
  await page.press('ArrowUp', 'ArrowUp');
  assert.equal(await label(), 'Delete project', '↑ from the first row wraps to the last');
  await page.press('ArrowDown');
  assert.equal(await label(), 'Copy share link', '↓ from the last wraps to the first');
  await page.press('End');
  assert.equal(await label(), 'Delete project');
  await page.press('Home', 'ArrowDown', 'ArrowDown');
  assert.equal(await label(), 'Pin to sidebar');
  await page.press('Enter');
  await waitClosed(page, 'project-sheet');
  assert.equal(await returnValue(page, 'project-sheet'), 'pin');
  assert.ok(await focusIs(page, opener('project-sheet')));
  await page.waitFor(() => /pinned to the sidebar/i.test(document.querySelector('.dd-toaster')?.textContent || ''));
});

test('actions: Space activates a row too; Tab stays inside the sheet', async ({ open, assert }) => {
  const page = await open('components/sheet');
  await page.click(opener('project-sheet'));
  await waitSettled(page, 'project-sheet');
  await page.press({ key: 'Tab', shift: true });
  assert.equal(await page.text(':focus .dd-sheet__item-label'), 'Delete project', 'Shift+Tab from the close button wraps to the last row');
  await page.press('Tab');
  assert.ok(await focusIs(page, '#project-sheet .dd-sheet__close'), 'Tab from the last row wraps to the close button');
  await page.press('Tab', 'ArrowDown', 'Space');
  await waitClosed(page, 'project-sheet');
  assert.equal(await returnValue(page, 'project-sheet'), 'duplicate');
});

test('choices: picking a region checks it, closes with its code and updates the button', async ({ open, assert }) => {
  const page = await open('components/sheet');
  const checked = () => page.get(() => [...document.querySelectorAll('#region-sheet [role="menuitemradio"][aria-checked="true"]')].map((r) => r.dataset.ddDialogClose));
  assert.deepEqual(await checked(), ['fra1']);
  await page.click(opener('region-sheet'));
  await waitSettled(page, 'region-sheet');
  await page.click('#region-sheet [data-dd-dialog-close="hnd1"]');
  await waitClosed(page, 'region-sheet');
  assert.equal(await returnValue(page, 'region-sheet'), 'hnd1');
  assert.deepEqual(await checked(), ['hnd1'], 'exactly one row checked: the new one');
  assert.match(await page.text('#region-trigger'), /hnd1 · Tokyo/);
  assert.equal(await page.get(() => document.querySelector('.sht-preview [aria-checked="true"]')?.getAttribute('data-dd-dialog-close')), 'hnd1', 'the still follows');
  // Done closes without changing the choice.
  await page.click(opener('region-sheet'));
  await waitSettled(page, 'region-sheet');
  await page.click('#region-sheet .dd-sheet__foot [data-dd-dialog-close]');
  await waitClosed(page, 'region-sheet');
  assert.deepEqual(await checked(), ['hnd1']);
  assert.match(await page.text('#region-trigger'), /hnd1 · Tokyo/);
});

test('phone (375): full width, stops at 85% with the body scrolling, closes by tapping the scrim', async ({ open, assert }) => {
  const page = await open('components/sheet', { width: 375, height: 640 });
  await page.tap(opener('region-sheet'));
  await waitSettled(page, 'region-sheet');
  const r = await rect(page, '#region-sheet');
  assert.equal(Math.round(r.width), 375);
  assert.ok(r.height <= 640 * 0.85 + 1, `height ${r.height} ≤ 85%`);
  assert.ok(await page.get(() => { const b = document.querySelector('#region-sheet .dd-sheet__body'); return b.scrollHeight > b.clientHeight; }), 'body scrolls');
  const foot = await rect(page, '#region-sheet .dd-sheet__foot');
  assert.ok(foot.bottom <= 641, 'footer stays on screen');
  await page.tap('#region-sheet [data-dd-dialog-close="sin1"]');
  await waitClosed(page, 'region-sheet');
  assert.equal(await returnValue(page, 'region-sheet'), 'sin1');
  await page.tap(opener('project-sheet'));
  await waitSettled(page, 'project-sheet');
  await tapAt(page, 187, 30);
  await waitClosed(page, 'project-sheet');
  assert.equal(await returnValue(page, 'project-sheet'), '');
});

test('rapid open / close: reopening during the slide-down keeps it open', async ({ open, assert }) => {
  const page = await open('components/sheet');
  await page.click(opener('rollback-sheet'));
  await waitSettled(page, 'rollback-sheet');
  await page.get(() => { dd.dialog.close('#rollback-sheet'); dd.dialog.open('#rollback-sheet'); });
  await page.sleep(700);
  assert.ok(await isOpen(page, 'rollback-sheet'));
  assert.equal(await page.get(() => document.getElementById('rollback-sheet').classList.contains('is-closing')), false);
  await page.press('Escape');
  await waitClosed(page, 'rollback-sheet');
});

test('dusk: a dark sheet that still opens and closes', async ({ open, assert }) => {
  const page = await open('components/sheet', { theme: 'dusk' });
  await page.click(opener('project-sheet'));
  await waitSettled(page, 'project-sheet');
  assert.ok((await luminance(page, '#project-sheet')) < 0.1, 'dusk surface is dark');
  assert.ok((await luminance(page, '#project-sheet .dd-sheet__item', 'color')) > 0.5, 'rows are light text');
  await page.press('Escape');
  await waitClosed(page, 'project-sheet');
});
