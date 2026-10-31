import { test } from './lib/test.mjs';

// ---- helpers ----
const opener = (id) => `[data-dd-dialog-open="#${id}"]`;
const isOpen = (page, id) => page.get((i) => document.getElementById(i).open, id);
const waitClosed = (page, id) => page.waitFor((i) => !document.getElementById(i).open, { args: [id] });
const waitOpen = (page, id) => page.waitFor((i) => { const d = document.getElementById(i); return d.open && d.matches(':modal'); }, { args: [id] });
const returnValue = (page, id) => page.get((i) => document.getElementById(i).returnValue, id);
const focusInside = (page, id) => page.get((i) => { const d = document.getElementById(i); return d.contains(document.activeElement); }, id);
const focusIs = (page, sel) => page.get((s) => document.activeElement === document.querySelector(s), sel);
/** A raw pointer click at viewport coordinates (for the scrim). */
async function clickAt(page, x, y) {
  for (const type of ['mouseMoved', 'mousePressed', 'mouseReleased']) await page.send('Input.dispatchMouseEvent', { type, x, y, button: type === 'mouseMoved' ? 'none' : 'left', clickCount: 1 });
  await page.sleep(120);
}
/** Press inside the dialog, release on the scrim (drag-selecting text) — must not close it. */
async function dragOut(page, sel, toX, toY) {
  const p = await page.get((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
  await page.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: p.x, y: p.y, button: 'none' });
  await page.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: p.x, y: p.y, button: 'left', clickCount: 1 });
  await page.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: toX, y: toY, button: 'left', buttons: 1 });
  await page.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: toX, y: toY, button: 'left', clickCount: 1 });
  await page.sleep(150);
}
/** Relative luminance of any CSS colour (normalised through a canvas). */
const luminance = (page, sel, prop = 'backgroundColor') => page.get((s, pr) => {
  const c = document.createElement('canvas').getContext('2d');
  c.fillStyle = getComputedStyle(document.querySelector(s))[pr]; c.fillRect(0, 0, 1, 1);
  const [r, g, b] = [...c.getImageData(0, 0, 1, 1).data].map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}, sel, prop);

// ---- tests ----
test('opens from its trigger as a modal, focus moves in, Esc closes with the exit motion and focus returns', async ({ open, assert }) => {
  const page = await open('components/dialog');
  await page.click(opener('publish-dialog'));
  await waitOpen(page, 'publish-dialog');
  assert.ok(await focusInside(page, 'publish-dialog'), 'focus moved into the dialog');
  assert.ok(await page.visible('#publish-dialog'));
  await page.press('Escape');
  assert.ok(await page.get(() => document.getElementById('publish-dialog').classList.contains('is-closing')) || !(await isOpen(page, 'publish-dialog')), 'Esc starts the exit');
  await waitClosed(page, 'publish-dialog');
  assert.equal(await returnValue(page, 'publish-dialog'), '');
  assert.ok(await focusIs(page, opener('publish-dialog')), 'focus returned to the trigger');
  assert.equal(await page.get(() => document.getElementById('publish-dialog').classList.contains('is-closing')), false);
});

test('close buttons set returnValue and fire the native close event', async ({ open, assert }) => {
  const page = await open('components/dialog');
  await page.get(() => { window.__closes = []; document.getElementById('publish-dialog').addEventListener('close', (e) => window.__closes.push(e.target.returnValue)); });
  await page.click(opener('publish-dialog'));
  await waitOpen(page, 'publish-dialog');
  await page.click('#publish-dialog [data-dd-dialog-close="publish"]');
  await waitClosed(page, 'publish-dialog');
  assert.equal(await returnValue(page, 'publish-dialog'), 'publish');
  await page.waitFor(() => /published/i.test(document.querySelector('.dd-toaster')?.textContent || ''));
  assert.match(await page.text('.dd-toaster'), /returnValue "publish"/, 'the docs demo reports the result in a toast');
  // Reopening clears the old result; the × closes with an empty value.
  await page.click(opener('publish-dialog'));
  await waitOpen(page, 'publish-dialog');
  assert.equal(await returnValue(page, 'publish-dialog'), '');
  await page.click('#publish-dialog .dd-dialog__close');
  await waitClosed(page, 'publish-dialog');
  await page.waitFor(() => window.__closes.length === 2); // the native close event is queued as a task
  assert.deepEqual(await page.get(() => window.__closes), ['publish', '']);
  assert.ok(await focusIs(page, opener('publish-dialog')));
});

test('a click on the scrim closes it; clicks inside and drag-selecting out of it do not', async ({ open, assert }) => {
  const page = await open('components/dialog');
  await page.click(opener('publish-dialog'));
  await waitOpen(page, 'publish-dialog');
  await page.click('#publish-dialog .dd-dialog__body p');
  assert.ok(await isOpen(page, 'publish-dialog'), 'click inside keeps it open');
  await dragOut(page, '#publish-dialog .dd-dialog__body p', 12, 12);
  assert.ok(await isOpen(page, 'publish-dialog'), 'drag from inside to the scrim keeps it open');
  await page.sleep(100);
  assert.ok(await isOpen(page, 'publish-dialog'));
  await clickAt(page, 12, 12);
  await waitClosed(page, 'publish-dialog');
  assert.ok(await focusIs(page, opener('publish-dialog')));
});

test('destructive: autofocus lands on the safe choice; Enter keeps the project', async ({ open, assert }) => {
  const page = await open('components/dialog');
  await page.click(opener('delete-dialog'));
  await waitOpen(page, 'delete-dialog');
  assert.equal(await page.attr('#delete-dialog', 'role'), 'alertdialog');
  assert.match(await page.text(':focus'), /keep it/i, 'focus on “Keep it”');
  await page.press('Enter');
  await waitClosed(page, 'delete-dialog');
  assert.equal(await returnValue(page, 'delete-dialog'), '');
  // and the destructive path reports its value
  await page.click(opener('delete-dialog'));
  await waitOpen(page, 'delete-dialog');
  await page.click('#delete-dialog [data-dd-dialog-close="delete"]');
  await waitClosed(page, 'delete-dialog');
  assert.equal(await returnValue(page, 'delete-dialog'), 'delete');
});

test('form: native validation blocks an empty submit; a valid one closes with the button value', async ({ open, assert }) => {
  const page = await open('components/dialog');
  await page.click(opener('domain-dialog'));
  await waitOpen(page, 'domain-dialog');
  assert.ok(await focusIs(page, '#domain-name'), 'autofocus on the domain field');
  await page.click('#domain-dialog button[type="submit"]');
  await page.sleep(200);
  assert.ok(await isOpen(page, 'domain-dialog'), 'invalid form keeps the dialog open');
  assert.ok(await page.get(() => document.getElementById('domain-name').matches(':invalid')));
  await page.focus('#domain-name');
  await page.type('status.cxkw.dev');
  await page.press('Enter'); // implicit submission uses the form's submit button
  await waitClosed(page, 'domain-dialog');
  assert.equal(await returnValue(page, 'domain-dialog'), 'add');
  await page.waitFor(() => /status\.cxkw\.dev added/.test(document.querySelector('.dd-toaster')?.textContent || ''));
  assert.ok(await focusIs(page, opener('domain-dialog')));
});

test('form: Cancel closes without validating and without a value', async ({ open, assert }) => {
  const page = await open('components/dialog');
  await page.click(opener('domain-dialog'));
  await waitOpen(page, 'domain-dialog');
  await page.click('#domain-dialog [data-dd-dialog-close]:not(.dd-dialog__close)');
  await waitClosed(page, 'domain-dialog');
  assert.equal(await returnValue(page, 'domain-dialog'), '');
});

test('Tab and Shift+Tab wrap inside the dialog', async ({ open, assert }) => {
  const page = await open('components/dialog');
  await page.click(opener('size-md'));
  await waitOpen(page, 'size-md');
  assert.ok(await focusIs(page, '#size-md .dd-dialog__close'), 'first control focused');
  await page.press({ key: 'Tab', shift: true });
  assert.match(await page.text(':focus'), /promote/i, 'Shift+Tab from the first wraps to the last');
  await page.press('Tab');
  assert.ok(await focusIs(page, '#size-md .dd-dialog__close'), 'Tab from the last wraps to the first');
  for (let k = 0; k < 7; k++) { await page.press('Tab'); assert.ok(await focusInside(page, 'size-md'), `focus stays inside (tab ${k + 1})`); }
});

test('the page behind does not scroll while a dialog is open, and does again after', async ({ open, assert }) => {
  const page = await open('components/dialog', { height: 700 });
  await page.get(() => window.scrollTo(0, 400));
  await page.sleep(100);
  const before = await page.get(() => scrollY);
  await page.evaluate(`document.querySelector('${opener('size-sm')}').click()`);
  await waitOpen(page, 'size-sm');
  assert.equal(await page.get(() => getComputedStyle(document.documentElement).overflow), 'hidden');
  await page.send('Input.dispatchMouseEvent', { type: 'mouseWheel', x: 20, y: 20, deltaX: 0, deltaY: 600 });
  await page.sleep(300);
  assert.equal(await page.get(() => scrollY), before, 'wheel on the scrim does not scroll the page');
  await page.press('Escape');
  await waitClosed(page, 'size-sm');
  assert.notEqual(await page.get(() => getComputedStyle(document.documentElement).overflow), 'hidden');
  assert.equal(await page.get(() => scrollY), before, 'scroll position kept');
});

test('long content: the dialog stops at 85% of the screen and only its body scrolls', async ({ open, assert }) => {
  const page = await open('components/dialog', { height: 520 });
  await page.click(opener('changelog-dialog'));
  await waitOpen(page, 'changelog-dialog');
  await page.sleep(350);
  const m = await page.get(() => {
    const d = document.getElementById('changelog-dialog'), b = d.querySelector('.dd-dialog__body'), f = d.querySelector('.dd-dialog__foot');
    return { h: d.getBoundingClientRect().height, vh: innerHeight, scrolls: b.scrollHeight > b.clientHeight + 4, footBottom: f.getBoundingClientRect().bottom, dBottom: d.getBoundingClientRect().bottom };
  });
  assert.ok(m.h <= m.vh * 0.85 + 1, `dialog ${m.h}px ≤ 85% of ${m.vh}px`);
  assert.ok(m.scrolls, 'body overflows and scrolls');
  assert.ok(m.footBottom <= m.dBottom + 1, 'footer stays in view');
  const p = await page.get(() => { const r = document.querySelector('#changelog-dialog .dd-dialog__body').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
  await page.send('Input.dispatchMouseEvent', { type: 'mouseWheel', x: p.x, y: p.y, deltaX: 0, deltaY: 300 });
  await page.waitFor(() => document.querySelector('#changelog-dialog .dd-dialog__body').scrollTop > 0);
});

test('dd.dialog.open / close from script, by selector or element, with a value', async ({ open, assert }) => {
  const page = await open('components/dialog');
  assert.equal(await page.get(() => typeof dd.dialog.open + typeof dd.dialog.close), 'functionfunction');
  await page.get(() => dd.dialog.open('#size-lg'));
  await waitOpen(page, 'size-lg');
  await page.get(() => dd.dialog.close(document.getElementById('size-lg'), 'rotate'));
  await waitClosed(page, 'size-lg');
  assert.equal(await returnValue(page, 'size-lg'), 'rotate');
  await page.get(() => dd.dialog.open(document.getElementById('size-lg')));
  await waitOpen(page, 'size-lg');
  await page.get(() => dd.dialog.close('#size-lg'));
  await waitClosed(page, 'size-lg');
  assert.equal(await returnValue(page, 'size-lg'), '');
  // unknown targets are ignored, not thrown
  await page.get(() => { dd.dialog.open('#nope'); dd.dialog.close('#nope'); });
});

test('rapid open / close never leaves it stuck', async ({ open, assert }) => {
  const page = await open('components/dialog');
  // Reopening while the exit animation plays cancels the exit and keeps it open.
  await page.get(() => dd.dialog.open('#size-md'));
  await waitOpen(page, 'size-md');
  await page.get(() => { dd.dialog.close('#size-md'); dd.dialog.open('#size-md'); });
  await page.sleep(800);
  assert.ok(await isOpen(page, 'size-md'), 'still open after close → open');
  assert.equal(await page.get(() => document.getElementById('size-md').classList.contains('is-closing')), false);
  // Double clicks on the trigger and repeated Esc don't throw or desync.
  await page.get(() => dd.dialog.close('#size-md'));
  await waitClosed(page, 'size-md');
  await page.click(opener('size-md'));
  await page.get(() => document.querySelector('[data-dd-dialog-open="#size-md"]').click());
  await waitOpen(page, 'size-md');
  await page.press('Escape', 'Escape', 'Escape');
  await waitClosed(page, 'size-md');
  for (let k = 0; k < 4; k++) { await page.get(() => dd.dialog.open('#size-sm')); await page.get(() => dd.dialog.close('#size-sm', 'restart')); }
  await waitClosed(page, 'size-sm');
  await page.sleep(400);
  assert.equal(await isOpen(page, 'size-sm'), false);
  await page.click(opener('size-sm'));
  await waitOpen(page, 'size-sm');
  assert.ok(await page.visible('#size-sm'), 'opens normally afterwards');
});

test('a dialog opened from inside another stacks on top; Esc closes only the top one', async ({ open, assert }) => {
  const page = await open('components/dialog');
  await page.click(opener('size-md'));
  await waitOpen(page, 'size-md');
  await page.get(() => dd.dialog.open('#size-sm')); // opener = the focused control inside size-md
  await waitOpen(page, 'size-sm');
  await page.press('Tab', 'Tab', 'Tab');
  assert.ok(await focusInside(page, 'size-sm'), 'Tab stays in the top dialog');
  await page.press('Escape');
  await waitClosed(page, 'size-sm');
  assert.ok(await isOpen(page, 'size-md'), 'the one below stays open');
  assert.ok(await focusInside(page, 'size-md'), 'focus returns into the dialog below');
  await page.press('Escape');
  await waitClosed(page, 'size-md');
  assert.ok(await focusIs(page, opener('size-md')));
});

test('dusk: the card is a dark surface over the scrim, and still opens and closes', async ({ open, assert }) => {
  const page = await open('components/dialog', { theme: 'dusk' });
  await page.click(opener('publish-dialog'));
  await waitOpen(page, 'publish-dialog');
  assert.ok((await luminance(page, '#publish-dialog')) < 0.1, 'dusk surface is dark');
  assert.ok((await luminance(page, '#publish-dialog', 'color')) > 0.5, 'text is light');
  await page.press('Escape');
  await waitClosed(page, 'publish-dialog');
});

test('phone (375): fills the width less a margin, actions split the footer, works by touch', async ({ open, assert }) => {
  const page = await open('components/dialog', { width: 375, height: 740 });
  await page.tap(opener('publish-dialog'));
  await waitOpen(page, 'publish-dialog');
  await page.sleep(350);
  const m = await page.get(() => {
    const d = document.getElementById('publish-dialog').getBoundingClientRect();
    const btns = [...document.querySelectorAll('#publish-dialog .dd-dialog__foot > .dd-btn')].map((b) => Math.round(b.getBoundingClientRect().width));
    return { left: d.left, right: d.right, btns, hint: getComputedStyle(document.querySelector('#publish-dialog .dd-dialog__hint')).display };
  });
  assert.ok(m.left >= 10 && 375 - m.right >= 10, `margins ${m.left} / ${375 - m.right}`);
  assert.ok(Math.abs(m.btns[0] - m.btns[1]) <= 2, `actions share the footer ${m.btns}`);
  assert.equal(m.hint, 'none');
  await page.tap('#publish-dialog [data-dd-dialog-close="publish"]');
  await waitClosed(page, 'publish-dialog');
  assert.equal(await returnValue(page, 'publish-dialog'), 'publish');
});

test('opened from a menu item: focus returns to the menu’s trigger, or to the next row’s when the dialog removed it', async ({ open, assert }) => {
  const page = await open('components/dialog');
  const more = (name) => `[data-dd-menu="dlg-member-menu"][aria-label="Actions for ${name}"]`;
  const REMOVE = '#dlg-member-menu [data-dd-dialog-open="#remove-member-dialog"]';
  const menuOpen = () => page.get(() => !document.getElementById('dlg-member-menu').hidden);
  // Pointer: ⋯ → Remove from team… → Keep. The menu item is hidden by then; focus goes to that row's ⋯.
  await page.click(more('Jun Park'));
  await page.click(REMOVE);
  await waitOpen(page, 'remove-member-dialog');
  assert.ok(!(await menuOpen()), 'the menu closed as the dialog opened');
  assert.equal(await page.text('#remove-member-title'), 'Remove Jun Park?', 'the dialog names the row the menu was opened from');
  assert.ok(await focusIs(page, '#remove-member-dialog [autofocus]'), 'focus starts on Keep');
  await page.press('Escape');
  await waitClosed(page, 'remove-member-dialog');
  assert.ok(await focusIs(page, more('Jun Park')), 'Esc: focus back on the ⋯ that opened the menu');
  // Keyboard: Enter opens the menu, End to Remove, Enter opens the dialog; Remove deletes the row in a close listener.
  await page.press('Enter');
  assert.ok(await menuOpen());
  await page.press('End', 'Enter');
  await waitOpen(page, 'remove-member-dialog');
  await page.click('#remove-member-dialog [data-dd-dialog-close="remove"]');
  await waitClosed(page, 'remove-member-dialog');
  await page.waitFor(() => !document.querySelector('[data-member="Jun Park"]'));
  await page.waitFor((s) => document.activeElement === document.querySelector(s), { args: [more('Sam Rivera')] });
  await page.waitFor(() => [...document.querySelectorAll('.dd-toast__title')].some((t) => t.textContent === 'Jun Park removed'));
  // The last row: no next one, so focus goes to the one before.
  await page.click(more('Ines Duarte'));
  await page.click(REMOVE);
  await waitOpen(page, 'remove-member-dialog');
  await page.click('#remove-member-dialog [data-dd-dialog-close="remove"]');
  await waitClosed(page, 'remove-member-dialog');
  await page.waitFor((s) => document.activeElement === document.querySelector(s), { args: [more('Sam Rivera')] });
  // The trigger's row removed while the dialog is still open (by something else): Keep lands on the next row.
  await page.click(more('Mara Okafor'));
  await page.click(REMOVE);
  await waitOpen(page, 'remove-member-dialog');
  await page.get(() => document.querySelector('[data-member="Mara Okafor"]').remove());
  await page.click('#remove-member-dialog [data-dd-dialog-close]:not([data-dd-dialog-close="remove"])');
  await waitClosed(page, 'remove-member-dialog');
  await page.waitFor((s) => document.activeElement === document.querySelector(s), { args: [more('Sam Rivera')] });
  assert.equal(await page.count('[data-member]'), 1);
});

test('a plain opener removed by a close listener hands focus to its neighbour', async ({ open, assert }) => {
  const page = await open('components/dialog');
  // Sizes example: remove the "Small" button when its dialog closes; focus goes to "Medium" beside it.
  await page.get(() => { const d = document.getElementById('size-sm'); d.addEventListener('close', () => document.querySelector('[data-dd-dialog-open="#size-sm"]').remove(), { once: true }); });
  await page.click(opener('size-sm'));
  await waitOpen(page, 'size-sm');
  await page.press('Escape');
  await waitClosed(page, 'size-sm');
  await page.waitFor((s) => document.activeElement === document.querySelector(s), { args: [opener('size-md')] });
});

test('Tab wraps inside the top dialog even when it sits before the one below it in the page', async ({ open, assert }) => {
  const page = await open('components/dialog');
  await page.get(() => {
    const make = (id, html) => { const d = document.createElement('dialog'); d.className = 'dd-dialog'; d.id = id; d.innerHTML = `<div class="dd-dialog__body">${html}</div>`; return d; };
    document.body.prepend(make('stack-top', '<button id="top-1">One</button> <button id="top-2">Two</button>')); // earlier in the page…
    document.body.append(make('stack-under', '<button id="under-1">Below</button>'));
    dd.dialog.open('#stack-under');
    dd.dialog.open('#stack-top'); // …but opened last, so on top
  });
  await waitOpen(page, 'stack-top');
  await page.focus('#top-1');
  const seen = [];
  for (let k = 0; k < 3; k++) { await page.press('Tab'); seen.push(await page.active()); }
  assert.deepEqual(seen, ['#top-2', '#top-1', '#top-2'], 'Tab moves and wraps in the top dialog');
  await page.press({ key: 'Tab', shift: true });
  assert.equal(await page.active(), '#top-1');
});

test('the scrollbar width is measured even when the script loads after the page (a late or injected script)', async ({ open, assert }) => {
  const page = await open('components/dialog');
  const observed = await page.get(async () => {
    const frame = document.createElement('iframe');
    document.body.append(frame);
    await new Promise((r) => { frame.onload = r; frame.srcdoc = '<!doctype html><p>late</p>'; });
    const w = frame.contentWindow;
    const seen = [];
    const observe = w.ResizeObserver.prototype.observe;
    w.ResizeObserver.prototype.observe = function (t) { seen.push(t.tagName); return observe.call(this, t); };
    const s = frame.contentDocument.createElement('script');
    s.src = new URL('../release/dawn-and-dusk.js', location.href).href;
    await new Promise((r, j) => { s.onload = r; s.onerror = j; frame.contentDocument.head.append(s); });
    return seen;
  });
  assert.ok(observed.includes('BODY'), 'the body is watched for size changes');
});
