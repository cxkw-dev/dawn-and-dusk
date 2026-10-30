import { test } from './lib/test.mjs';

// ---- helpers ----
const opener = (id) => `[data-dd-dialog-open="#${id}"]`;
const isOpen = (page, id) => page.get((i) => document.getElementById(i).open, id);
const waitClosed = (page, id) => page.waitFor((i) => !document.getElementById(i).open, { args: [id] });
const waitOpen = (page, id) => page.waitFor((i) => { const d = document.getElementById(i); return d.open && d.matches(':modal'); }, { args: [id] });
/** Open and wait for the slide-in to finish (the panel's right edge meets the viewport's). */
const waitSettled = (page, id) => page.waitFor((i) => { const d = document.getElementById(i); return d.open && Math.abs(d.getBoundingClientRect().right - innerWidth) < 1 && !d.getAnimations().length; }, { args: [id] });
const returnValue = (page, id) => page.get((i) => document.getElementById(i).returnValue, id);
const focusInside = (page, id) => page.get((i) => document.getElementById(i).contains(document.activeElement), id);
const focusIs = (page, sel) => page.get((s) => document.activeElement === document.querySelector(s), sel);
const rect = (page, id) => page.get((i) => { const r = document.getElementById(i).getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, width: r.width, height: r.height }; }, id);
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
test('slides in full height from the right; focus moves in; Esc slides it out and focus returns', async ({ open, assert }) => {
  const page = await open('components/drawer');
  await page.click(opener('deploy-drawer'));
  await waitOpen(page, 'deploy-drawer');
  assert.ok(await focusInside(page, 'deploy-drawer'), 'focus moved into the drawer');
  await waitSettled(page, 'deploy-drawer');
  const r = await rect(page, 'deploy-drawer');
  assert.equal(Math.round(r.top), 0); assert.equal(Math.round(r.height), 900);
  assert.equal(Math.round(r.width), 480, 'medium is 480px');
  await page.press('Escape');
  assert.ok(await page.get(() => document.getElementById('deploy-drawer').classList.contains('is-closing')), 'plays the slide-out');
  await waitClosed(page, 'deploy-drawer');
  assert.ok(await focusIs(page, opener('deploy-drawer')), 'focus returned to the trigger');
});

test('the scrim closes the details drawer; clicks inside it do not', async ({ open, assert }) => {
  const page = await open('components/drawer');
  await page.click(opener('deploy-drawer'));
  await waitSettled(page, 'deploy-drawer');
  await page.click('#deploy-drawer .dd-drawer__log');
  await page.click('#deploy-drawer .dd-drawer__title');
  assert.ok(await isOpen(page, 'deploy-drawer'));
  await clickAt(page, 40, 450);
  await waitClosed(page, 'deploy-drawer');
  assert.equal(await returnValue(page, 'deploy-drawer'), '');
});

test('footer actions close with their value and the demo reports it', async ({ open, assert }) => {
  const page = await open('components/drawer');
  await page.click(opener('deploy-drawer'));
  await waitSettled(page, 'deploy-drawer');
  await page.click('#deploy-drawer [data-dd-dialog-close="redeploy"]');
  await waitClosed(page, 'deploy-drawer');
  assert.equal(await returnValue(page, 'deploy-drawer'), 'redeploy');
  await page.waitFor(() => /redeploying auth-gateway/i.test(document.querySelector('.dd-toaster')?.textContent || ''));
  await page.click(opener('deploy-drawer'));
  await waitSettled(page, 'deploy-drawer');
  await page.click('#deploy-drawer [data-dd-dialog-close="promote"]');
  await waitClosed(page, 'deploy-drawer');
  assert.equal(await returnValue(page, 'deploy-drawer'), 'promote');
});

test('editing: a static backdrop ignores the scrim; Esc and Cancel still close', async ({ open, assert }) => {
  const page = await open('components/drawer');
  await page.click(opener('env-drawer'));
  await waitSettled(page, 'env-drawer');
  await clickAt(page, 40, 450);
  await page.sleep(300);
  assert.ok(await isOpen(page, 'env-drawer'), 'scrim click keeps a static drawer open');
  await page.press('Escape');
  await waitClosed(page, 'env-drawer');
  await page.click(opener('env-drawer'));
  await waitSettled(page, 'env-drawer');
  await page.click('#env-drawer .dd-drawer__foot [data-dd-dialog-close=""]');
  await waitClosed(page, 'env-drawer');
  assert.equal(await returnValue(page, 'env-drawer'), '');
});

test('editing: required fields block Save; Save closes with "save", Delete with "delete"', async ({ open, assert }) => {
  const page = await open('components/drawer');
  await page.click(opener('env-drawer'));
  await waitSettled(page, 'env-drawer');
  await page.get(() => { document.getElementById('env-value').value = ''; });
  await page.click('#env-drawer button[type="submit"]');
  await page.sleep(250);
  assert.ok(await isOpen(page, 'env-drawer'), 'an empty required value keeps it open');
  assert.ok(await page.get(() => document.getElementById('env-value').matches(':invalid')));
  await page.focus('#env-value');
  await page.type('whsec_new_value');
  await page.click('#env-drawer button[type="submit"]');
  await waitClosed(page, 'env-drawer');
  assert.equal(await returnValue(page, 'env-drawer'), 'save');
  await page.waitFor(() => /STRIPE_WEBHOOK_SECRET saved/.test(document.querySelector('.dd-toaster')?.textContent || ''));
  await page.click(opener('env-drawer'));
  await waitSettled(page, 'env-drawer');
  await page.click('#env-drawer [data-dd-dialog-close="delete"]');
  await waitClosed(page, 'env-drawer');
  assert.equal(await returnValue(page, 'env-drawer'), 'delete');
});

test('Tab and Shift+Tab wrap inside the drawer', async ({ open, assert }) => {
  const page = await open('components/drawer');
  await page.click(opener('env-drawer'));
  await waitSettled(page, 'env-drawer');
  await page.focus('#env-drawer .dd-drawer__close');
  await page.press({ key: 'Tab', shift: true });
  assert.ok(await focusIs(page, '#env-drawer button[type="submit"]'), 'Shift+Tab from the first wraps to Save');
  await page.press('Tab');
  assert.ok(await focusIs(page, '#env-drawer .dd-drawer__close'), 'Tab from Save wraps to the close button');
  for (let k = 0; k < 4; k++) { await page.press('Tab'); assert.ok(await focusInside(page, 'env-drawer'), `focus stays inside (tab ${k + 1})`); }
});

test('sizes: small 360, medium 480, large 720 — each opens and closes on its own; the page behind stays put', async ({ open, assert }) => {
  const page = await open('components/drawer');
  for (const [id, w] of [['drawer-sm', 360], ['drawer-md', 480], ['drawer-lg', 720]]) {
    await page.click(opener(id));
    await waitSettled(page, id);
    assert.equal(Math.round((await rect(page, id)).width), w, `${id} is ${w}px`);
    assert.equal(await page.count('dialog.dd-drawer[open]:modal'), 1, 'only one drawer open');
    const y = await page.get(() => scrollY);
    await page.send('Input.dispatchMouseEvent', { type: 'mouseWheel', x: 40, y: 300, deltaX: 0, deltaY: 600 });
    await page.sleep(150);
    assert.equal(await page.get(() => scrollY), y, 'wheel on the scrim does not scroll the page');
    await page.click(`#${id} .dd-drawer__foot [data-dd-dialog-close]`);
    await waitClosed(page, id);
    assert.ok(await focusIs(page, opener(id)));
  }
});

test('rapid open / close: reopening during the slide-out keeps it open', async ({ open, assert }) => {
  const page = await open('components/drawer');
  await page.click(opener('deploy-drawer'));
  await waitSettled(page, 'deploy-drawer');
  await page.press('Escape');
  await page.get(() => dd.dialog.open('#deploy-drawer'));
  await page.sleep(700);
  assert.ok(await isOpen(page, 'deploy-drawer'));
  assert.equal(await page.get(() => document.getElementById('deploy-drawer').classList.contains('is-closing')), false);
  await waitSettled(page, 'deploy-drawer');
  await page.press('Escape');
  await waitClosed(page, 'deploy-drawer');
});

test('phone (375): fills the screen and works by touch', async ({ open, assert }) => {
  const page = await open('components/drawer', { width: 375, height: 700 });
  await page.tap(opener('deploy-drawer'));
  await waitSettled(page, 'deploy-drawer');
  const r = await rect(page, 'deploy-drawer');
  assert.equal(Math.round(r.left), 0); assert.equal(Math.round(r.width), 375);
  assert.ok(await page.get(() => { const f = document.querySelector('#deploy-drawer .dd-drawer__foot').getBoundingClientRect(); return f.bottom <= innerHeight + 1; }), 'footer in view');
  await page.tap('#deploy-drawer .dd-drawer__close');
  await waitClosed(page, 'deploy-drawer');
  // the small size fills the phone too
  await page.tap(opener('drawer-sm'));
  await waitSettled(page, 'drawer-sm');
  assert.equal(Math.round((await rect(page, 'drawer-sm')).width), 375);
  await page.tap('#drawer-sm .dd-drawer__foot .dd-btn');
  await waitClosed(page, 'drawer-sm');
});

test('dusk: a dark panel that still opens and closes', async ({ open, assert }) => {
  const page = await open('components/drawer', { theme: 'dusk' });
  await page.click(opener('deploy-drawer'));
  await waitSettled(page, 'deploy-drawer');
  assert.ok((await luminance(page, '#deploy-drawer')) < 0.1, 'dusk surface is dark');
  assert.ok((await luminance(page, '#deploy-drawer', 'color')) > 0.5, 'text is light');
  await clickAt(page, 40, 450);
  await waitClosed(page, 'deploy-drawer');
});
