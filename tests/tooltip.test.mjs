import { test } from './lib/test.mjs';

const redeploy = '[data-dd-tooltip="Redeploy the last build to every region"]';
const copy = '.ex-stage [data-dd-tooltip="Copy link"]';
const isOpen = () => !!document.querySelector('.dd-tooltip.is-open:not(.dd-tooltip--static)');
const away = (page) => page.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 2, y: 400, button: 'none' });
const moveTo = async (page, x, y) => { await page.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y, button: 'none' }); };

test('hover: shows after a short delay, says the right thing, wires aria-describedby, hides on leave', async ({ open, assert }) => {
  const page = await open('components/tooltip');
  await page.hover(redeploy);
  assert.equal(await page.get(isOpen), false, 'not instantly: a passing pointer doesn’t flash it');
  await page.waitFor(isOpen, { timeout: 1500 });
  assert.equal(await page.text('#dd-tooltip'), 'Redeploy the last build to every region');
  assert.equal(await page.attr('#dd-tooltip', 'role'), 'tooltip');
  assert.equal(await page.attr(redeploy, 'aria-describedby'), 'dd-tooltip');
  // Sits above the trigger (default placement top).
  const [tip, btn] = await page.get((s) => [document.getElementById('dd-tooltip').getBoundingClientRect().bottom, document.querySelector(s).getBoundingClientRect().top], redeploy);
  assert.ok(tip <= btn, 'above its trigger');
  await away(page);
  await page.waitFor(() => !document.querySelector('.dd-tooltip.is-open'));
  assert.equal(await page.attr(redeploy, 'aria-describedby'), null, 'describedby removed when hidden');
});

test('warm: once one is open the next shows at once; the label-only tooltip adds no describedby', async ({ open, assert }) => {
  const page = await open('components/tooltip');
  await page.hover(redeploy);
  await page.waitFor(isOpen, { timeout: 1500 });
  await page.hover(copy);
  assert.equal(await page.text('#dd-tooltip'), 'Copy link', 'switched without the delay');
  assert.equal(await page.attr(copy, 'aria-describedby'), null, 'aria-label already says it');
  assert.equal(await page.attr(redeploy, 'aria-describedby'), null, 'the previous trigger was released');
  // The pointer can travel onto the tooltip without losing it.
  const t = await page.get(() => { const r = document.getElementById('dd-tooltip').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
  await moveTo(page, t.x, t.y);
  await page.sleep(300);
  assert.ok(await page.get(isOpen), 'still open with the pointer on it');
  // A click anywhere hides it.
  await page.click('.doc-main h1');
  assert.equal(await page.get(isOpen), false);
});

test('keyboard: Tab focus shows it at once, Esc hides it, Tab away hides it', async ({ open, assert }) => {
  const page = await open('components/tooltip');
  await page.focus(copy);
  await page.press('Tab'); // → Download logs, by keyboard
  assert.equal(await page.get(() => document.activeElement.getAttribute('data-dd-tooltip')), 'Download logs');
  assert.ok(await page.get(isOpen), 'shown on keyboard focus');
  assert.equal(await page.text('#dd-tooltip'), 'Download logs');
  await page.press('Escape');
  assert.equal(await page.get(isOpen), false, 'Esc hides');
  assert.equal(await page.get(() => document.activeElement.getAttribute('data-dd-tooltip')), 'Download logs', 'Esc keeps focus');
  await page.press('Tab');
  assert.equal(await page.text('#dd-tooltip'), 'Redeploy the last build to every region');
  assert.equal(await page.attr(redeploy, 'aria-describedby'), 'dd-tooltip');
  // Non-button with tabindex works too.
  await page.press('Tab', 'Tab');
  assert.equal(await page.text('#dd-tooltip'), '12 Oct 2026, 09:41:07 UTC');
  await page.press({ key: 'Tab', shift: true });
  assert.equal(await page.text('#dd-tooltip'), 'Settings');
  await page.get(() => document.activeElement.blur());
  await page.sleep(50);
  assert.equal(await page.get(isOpen), false, 'blur hides');
});

test('placement: requested sides, shortcut keys, and a flip when there is no room above', async ({ open, assert }) => {
  const page = await open('components/tooltip');
  await page.get(() => document.querySelector('.ex-stage [data-dd-tooltip-placement="top"]').scrollIntoView({ block: 'center' }));
  await page.focus('.ex-stage [data-dd-tooltip-placement="top"]');
  for (const side of ['bottom', 'left', 'right', 'bottom-start']) {
    await page.press('Tab'); // walk the row by keyboard
    assert.equal(await page.get(() => document.activeElement.dataset.ddTooltipPlacement), side);
    await page.waitFor(isOpen);
    assert.equal(await page.attr('#dd-tooltip', 'data-placement'), side);
  }
  await page.hover('.ex-stage [data-dd-tooltip-kbd="⌘ K"]');
  await page.waitFor(isOpen, { timeout: 1500 });
  assert.deepEqual(await page.get(() => [...document.querySelectorAll('#dd-tooltip kbd')].map((k) => k.textContent)), ['⌘', 'K']);
  await away(page);
  await page.waitFor(() => !document.querySelector('.dd-tooltip.is-open'));
  // Put a bottom-placed trigger at the very bottom of the viewport: it flips above.
  const low = '.ex-stage [data-dd-tooltip-placement="bottom"]';
  const p = await page.get((s) => { const el = document.querySelector(s); scrollBy(0, el.getBoundingClientRect().bottom - innerHeight + 6); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, low);
  await page.sleep(100);
  await moveTo(page, p.x, p.y);
  await page.waitFor(isOpen, { timeout: 1500 });
  assert.equal(await page.text('#dd-tooltip'), 'Placed below');
  assert.equal(await page.attr('#dd-tooltip', 'data-placement'), 'top', 'flipped');
  const inView = await page.get(() => { const r = document.getElementById('dd-tooltip').getBoundingClientRect(); return r.top >= 0 && r.bottom <= innerHeight; });
  assert.ok(inView, 'flipped tooltip is fully on screen');
  // Scrolling hides it.
  await page.get(() => scrollBy(0, 40));
  await page.waitFor(() => !document.querySelector('.dd-tooltip.is-open'));
});

test('touch at 375: a tap does not open a tooltip, and nothing sticks', async ({ open, assert }) => {
  const page = await open('components/tooltip', { width: 375 });
  await page.tap(redeploy);
  await page.sleep(600);
  assert.equal(await page.get(isOpen), false);
  // Near the right edge, a left/right tooltip stays inside the viewport.
  await page.focus('.ex-stage [data-dd-tooltip-placement="left"]');
  await page.press('Tab');
  await page.waitFor(isOpen);
  assert.equal(await page.text('#dd-tooltip'), 'Placed to the right');
  const r = await page.get(() => { const b = document.getElementById('dd-tooltip').getBoundingClientRect(); return { l: b.left, r: b.right, w: innerWidth }; });
  assert.ok(r.l >= 0 && r.r <= r.w, `inside the viewport: ${JSON.stringify(r)}`);
});

test('dusk, and a tooltip takes the theme of its trigger’s stage; rapid hovering is stable', async ({ open, assert }) => {
  const page = await open('components/tooltip', { theme: 'dusk' });
  await page.hover(redeploy);
  await page.waitFor(isOpen, { timeout: 1500 });
  const duskBg = await page.get(() => getComputedStyle(document.getElementById('dd-tooltip')).backgroundColor);
  await away(page);
  await page.waitFor(() => !document.querySelector('.dd-tooltip.is-open'));
  // Flip the first example to dawn: its tooltip goes dawn too.
  await page.get((s) => document.querySelector(s).closest('.ex-frame').querySelector('[data-ex-theme]').click(), redeploy);
  await page.hover(redeploy);
  await page.waitFor(isOpen, { timeout: 1500 });
  assert.equal(await page.attr('#dd-tooltip', 'data-theme'), 'dawn');
  assert.notEqual(await page.get(() => getComputedStyle(document.getElementById('dd-tooltip')).backgroundColor), duskBg);
  for (let k = 0; k < 6; k++) { await page.hover(copy); await page.hover(redeploy); }
  await away(page);
  await page.waitFor(() => !document.querySelector('.dd-tooltip.is-open'));
  assert.equal(await page.count('.dd-tooltip:not(.dd-tooltip--static)'), 1, 'one shared tooltip');
});

test('a trigger removed under the pointer (a list re-rendered) takes its tooltip with it on the next move', async ({ open, assert }) => {
  const page = await open('components/tooltip');
  await page.hover(redeploy);
  await page.waitFor(isOpen, { timeout: 1500 });
  const c = await page.get((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, redeploy);
  await page.get((s) => document.querySelector(s).remove(), redeploy);
  for (let k = 1; k <= 4; k++) await moveTo(page, c.x + k * 4, c.y + 30 + k * 4);
  await page.waitFor(() => !document.querySelector('.dd-tooltip.is-open:not(.dd-tooltip--static)'), { timeout: 1000 });
  // Tooltips still work afterwards.
  await page.hover(copy);
  await page.waitFor(isOpen, { timeout: 1500 });
  assert.equal(await page.text('#dd-tooltip'), 'Copy link');
});

test('inside a modal dialog: the tooltip lives in the dialog (so the pointer can reach it), looks the same, and Esc hides only it', async ({ open, assert }) => {
  const page = await open('components/tooltip');
  // How it looks outside a dialog first.
  const look = () => page.get(() => { const cs = getComputedStyle(document.getElementById('dd-tooltip')); return ['backgroundColor', 'color', 'fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'padding', 'borderRadius', 'boxShadow', 'width', 'height'].map((k) => cs[k]).join(' | '); });
  await page.get(() => document.querySelector('.doc-main').insertAdjacentHTML('afterbegin', `
    <p style="padding: 60px"><button class="dd-btn" id="tt-out" data-dd-tooltip="Same words, either side">Out</button></p>
    <dialog class="dd-dialog" id="tt-dlg" aria-label="Test"><div class="dd-dialog__body" style="padding: 60px">
      <button class="dd-btn" id="tt-in" data-dd-tooltip="Same words, either side">In</button></div></dialog>`));
  await page.hover('#tt-out');
  await page.waitFor(isOpen, { timeout: 1500 });
  const outside = await look();
  await away(page);
  await page.waitFor(() => !document.querySelector('.dd-tooltip.is-open'));

  await page.get(() => dd.dialog.open('#tt-dlg'));
  await page.sleep(300);
  await page.hover('#tt-in');
  await page.waitFor(isOpen, { timeout: 1500 });
  assert.equal(await page.get(() => document.getElementById('dd-tooltip').parentElement.id), 'tt-dlg', 'moved into the dialog');
  assert.equal(await look(), outside, 'looks exactly as it does outside');
  // Glide from the trigger onto the tooltip: it stays.
  const r = await page.get(() => { const t = document.getElementById('dd-tooltip').getBoundingClientRect(); const a = document.getElementById('tt-in').getBoundingClientRect(); return { ax: a.left + a.width / 2, ay: a.top + 2, tx: t.left + t.width / 2, ty: t.top + t.height / 2 }; });
  assert.equal(await page.get((x, y) => document.elementFromPoint(x, y)?.closest('.dd-tooltip')?.id, r.tx, r.ty), 'dd-tooltip', 'not inert');
  for (let k = 1; k <= 5; k++) await moveTo(page, r.ax + ((r.tx - r.ax) * k) / 5, r.ay + ((r.ty - r.ay) * k) / 5);
  await page.sleep(400);
  assert.ok(await page.get(isOpen), 'still open with the pointer on it');
  // One Esc hides the tooltip and leaves the dialog open; the next closes the dialog.
  await page.focus('#tt-in');
  await page.press('Escape');
  await page.sleep(300);
  assert.equal(await page.get(isOpen), false, 'Esc hides the tooltip');
  assert.ok(await page.get(() => document.getElementById('tt-dlg').open), 'and only the tooltip');
  await page.press('Escape');
  await page.waitFor(() => !document.getElementById('tt-dlg').open);
  // Back outside, it moves back to <body>.
  await page.hover('#tt-out');
  await page.waitFor(isOpen, { timeout: 1500 });
  assert.equal(await page.get(() => document.getElementById('dd-tooltip').parentElement === document.body), true);
  assert.equal(await page.count('.dd-tooltip:not(.dd-tooltip--static)'), 1, 'still one shared tooltip');
});
