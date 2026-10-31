import { test } from './lib/test.mjs';

const live = '.dd-toaster > .dd-toast:not([data-leaving])';
const shown = (page) => page.count(live);
const titles = (page) => page.get((s) => [...document.querySelectorAll(s)].map((t) => t.querySelector('.dd-toast__title')?.textContent), live);
// A touch swipe (touchStart → touchMove… → touchEnd) at the element's centre; pointer events come out as pointerType touch.
const swipe = async (page, sel, dx, steps = 8) => {
  const p = await page.get((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
  await page.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: p.x, y: p.y }] });
  for (let i = 1; i <= steps; i++) { await page.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: p.x + (dx * i) / steps, y: p.y }] }); await page.sleep(16); }
  await page.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await page.sleep(150);
};

test('dd.toast: each intent, its icon and role; the stack is a polite live region', async ({ open, assert }) => {
  const page = await open('components/toast');
  const got = await page.get(async () => {
    const out = [];
    for (const intent of ['info', 'ok', 'warn', 'bad']) {
      const t = dd.toast({ title: `t-${intent}`, description: '<b>not html</b>', intent, duration: 0 });
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      out.push({ intent, cls: t.el.className, icon: t.el.querySelector('use').getAttribute('href'), role: t.el.getAttribute('role'), text: t.el.querySelector('.dd-toast__text').innerHTML });
    }
    return out;
  });
  assert.deepEqual(got.map((g) => g.icon), ['#dd-i-info', '#dd-i-success', '#dd-i-alert', '#dd-i-danger']);
  assert.ok(got.every((g) => g.cls.includes(`dd-toast--${g.intent}`)));
  assert.deepEqual(got.map((g) => g.role), [null, null, null, 'alert'], 'only bad interrupts');
  assert.equal(got[0].text, '&lt;b&gt;not html&lt;/b&gt;', 'text is set as text');
  assert.equal(await page.attr('.dd-toaster', 'aria-live'), 'polite');
  assert.equal(await page.attr('.dd-toaster', 'aria-label'), 'Notifications');
  assert.equal(await shown(page), 4);
  await page.get(() => dd.toast.clear());
  await page.waitFor(() => !document.querySelector('.dd-toaster > .dd-toast'));
  // A string works too; the dismiss button has a name.
  await page.get(() => { dd.toast('Saved'); });
  await page.waitFor(() => !!document.querySelector('.dd-toaster > .dd-toast'));
  assert.equal(await page.text('.dd-toaster .dd-toast__title'), 'Saved');
  assert.equal(await page.attr('.dd-toaster .dd-toast__dismiss', 'aria-label'), 'Dismiss notification');
  // Dismissed before it had a chance to show: it never appears.
  await page.get(() => { dd.toast.clear(); const t = dd.toast({ title: 'never', duration: 0 }); t.dismiss(); });
  await page.sleep(400);
  assert.equal(await page.count('.dd-toaster > .dd-toast'), 0);
});

test('action runs onClick with the handle, then the toast closes', async ({ open, assert }) => {
  const page = await open('components/toast');
  await page.get(() => { window.__t = dd.toast({ title: 'Post archived', intent: 'ok', duration: 0, action: { label: 'Undo', onClick: (h) => { window.__undo = h === window.__t; } } }); });
  await page.waitFor(() => !!document.querySelector('.dd-toaster .dd-toast__action'));
  await page.click('.dd-toaster .dd-toast__action');
  assert.equal(await page.get(() => window.__undo), true);
  await page.waitFor(() => !document.querySelector('.dd-toaster > .dd-toast'));
  // The page's own Archive post button: Undo raises a follow-up toast.
  await page.click('.ex-stage button[onclick*="Post archived"]');
  await page.waitFor(() => !!document.querySelector('.dd-toaster .dd-toast__action'));
  await page.click('.dd-toaster .dd-toast__action');
  await page.waitFor(() => [...document.querySelectorAll('.dd-toaster .dd-toast__title')].some((t) => t.textContent === 'Post restored'));
});

test('auto-dismiss after its duration, with a timer line; sticky toasts have none', async ({ open, assert }) => {
  const page = await open('components/toast');
  await page.get(() => { dd.toast({ title: 'quick', duration: 500 }); dd.toast({ title: 'sticky', duration: 0 }); });
  await page.waitFor(() => document.querySelectorAll('.dd-toaster > .dd-toast').length === 2);
  assert.equal(await page.count('.dd-toaster .dd-toast__progress'), 1);
  await page.waitFor(() => ![...document.querySelectorAll('.dd-toaster .dd-toast__title')].some((t) => t.textContent === 'quick'), { timeout: 2000 });
  await page.sleep(300);
  assert.deepEqual(await titles(page), ['sticky']);
});

test('hovering the stack pauses every timer; leaving resumes them', async ({ open, assert }) => {
  const page = await open('components/toast');
  await page.get(() => { dd.toast({ title: 'held', duration: 400 }); });
  await page.waitFor(() => !!document.querySelector('.dd-toaster > .dd-toast'));
  await page.hover('.dd-toaster > .dd-toast');
  await page.sleep(650);
  assert.equal(await shown(page), 1, 'still there while hovered');
  assert.equal(await page.get(() => document.querySelector('.dd-toaster > .dd-toast').ddToast.timer.playState), 'paused');
  await page.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 5, y: 5, button: 'none' });
  await page.waitFor(() => !document.querySelector('.dd-toaster > .dd-toast'), { timeout: 2000 });
});

test('after × with the mouse, a toast that lands under the resting pointer waits until it moves away', async ({ open, assert }) => {
  const page = await open('components/toast');
  await page.get(() => { dd.toast({ title: 'first', duration: 0 }); });
  await page.waitFor(() => !!document.querySelector('.dd-toaster > .dd-toast'));
  await page.click('.dd-toaster .dd-toast__dismiss');
  await page.waitFor(() => !document.querySelector('.dd-toaster > .dd-toast'));
  await page.get(() => { dd.toast({ title: 'second', duration: 400 }); });
  await page.waitFor(() => !!document.querySelector('.dd-toaster > .dd-toast'));
  await page.sleep(600);
  assert.equal(await shown(page), 1, 'under the pointer it is hovered, so it holds');
  await page.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 5, y: 5, button: 'none' });
  await page.waitFor(() => !document.querySelector('.dd-toaster > .dd-toast'), { timeout: 2000 });
});

test('keyboard: focus pauses, Esc dismisses and focus moves to the next toast, then back', async ({ open, assert }) => {
  const page = await open('components/toast');
  await page.get(() => { const b = document.createElement('button'); b.id = 'origin'; b.textContent = 'origin'; document.querySelector('.doc-main').prepend(b); });
  await page.focus('#origin');
  await page.press('Shift'); // keyboard modality, so programmatic focus counts as :focus-visible
  await page.get(() => { dd.toast({ title: 'one', duration: 500 }); dd.toast({ title: 'two', duration: 500 }); });
  await page.waitFor(() => document.querySelectorAll('.dd-toaster > .dd-toast').length === 2);
  await page.get(() => document.querySelector('.dd-toaster > .dd-toast .dd-toast__dismiss').focus());
  await page.sleep(800);
  assert.equal(await shown(page), 2, 'focus inside the stack holds the timers');
  await page.press('Escape');
  assert.deepEqual(await titles(page), ['two']);
  assert.ok(await page.get(() => document.activeElement.closest('.dd-toast')?.querySelector('.dd-toast__title').textContent === 'two'), 'focus moved to the remaining toast');
  await page.press('Escape');
  assert.equal(await shown(page), 0);
  assert.equal(await page.active(), '#origin', 'focus returned to where it came from');
});

test('swipe with the mouse: a long drag dismisses, a short one springs back', async ({ open, assert }) => {
  const page = await open('components/toast');
  await page.get(() => { dd.toast({ title: 'stay', duration: 0 }); });
  await page.waitFor(() => !!document.querySelector('.dd-toaster > .dd-toast'));
  await page.sleep(350); // let the slide-in finish
  await page.drag('.dd-toaster > .dd-toast .dd-toast__body', 18, 0, 6);
  await page.sleep(250);
  assert.equal(await shown(page), 1, 'short drag springs back');
  assert.equal(await page.get(() => document.querySelector('.dd-toaster > .dd-toast').style.translate), '');
  await page.drag('.dd-toaster > .dd-toast .dd-toast__body', 260, 0, 10);
  assert.equal(await shown(page), 0, 'long drag dismisses');
  await page.waitFor(() => !document.querySelector('.dd-toaster > .dd-toast'));
});

test('touch swipe at 375: the stack spans the width and a swipe dismisses (dusk)', async ({ open, assert }) => {
  const page = await open('components/toast', { width: 375, theme: 'dusk' });
  await page.get(() => { dd.toast({ title: 'Link copied', intent: 'neutral', duration: 0 }); });
  await page.waitFor(() => !!document.querySelector('.dd-toaster > .dd-toast'));
  await page.sleep(350);
  const w = await page.get(() => document.querySelector('.dd-toaster > .dd-toast').getBoundingClientRect().width);
  assert.ok(w > 320, `full width on a phone (${w})`);
  const bg = await page.get(() => getComputedStyle(document.querySelector('.dd-toaster > .dd-toast')).backgroundColor);
  await swipe(page, '.dd-toaster > .dd-toast', -200);
  await page.waitFor(() => !document.querySelector('.dd-toaster > .dd-toast'));
  assert.ok(bg, 'has a background');
});

test('stacking: at most four; the oldest leaves; rapid clicks on a trigger are fine', async ({ open, assert }) => {
  const page = await open('components/toast');
  await page.get(() => { for (let k = 1; k <= 6; k++) dd.toast({ title: `n${k}`, duration: 0 }); });
  await page.waitFor(() => document.querySelectorAll('.dd-toaster > .dd-toast:not([data-leaving])').length === 4);
  assert.deepEqual(await titles(page), ['n3', 'n4', 'n5', 'n6']);
  await page.waitFor(() => document.querySelectorAll('.dd-toaster > .dd-toast').length === 4);
  await page.get(() => dd.toast.clear());
  await page.waitFor(() => !document.querySelector('.dd-toaster > .dd-toast'));
  const deploy = '.ex-stage [data-dd-toast="Deployed to production"]';
  for (let k = 0; k < 6; k++) await page.click(deploy);
  assert.ok(await shown(page) <= 4);
  assert.equal(await page.get(() => document.querySelector('.dd-toaster > .dd-toast:last-child').classList.contains('dd-toast--ok')), true);
});

test('declarative triggers: description, intent, duration 0; a toast from a dusk stage is dusk', async ({ open, assert }) => {
  const page = await open('components/toast');
  await page.click('.ex-stage [data-dd-toast-intent="bad"]');
  await page.waitFor(() => !!document.querySelector('.dd-toaster > .dd-toast--bad'));
  assert.match(await page.text('.dd-toaster > .dd-toast--bad .dd-toast__text'), /timed out/);
  assert.equal(await page.count('.dd-toaster > .dd-toast--bad .dd-toast__progress'), 0, 'duration 0 has no timer');
  // Flip the live example to dusk, then raise one from it.
  await page.get(() => { const s = document.querySelector('.ex-stage [data-dd-toast-intent="bad"]').closest('.ex-frame'); s.querySelector('[data-ex-theme]').click(); });
  await page.click('.ex-stage [data-dd-toast="Deployed to production"]');
  await page.waitFor(() => !!document.querySelector('.dd-toaster > .dd-toast--ok'));
  assert.equal(await page.attr('.dd-toaster > .dd-toast--ok', 'data-theme'), 'dusk');
});

test('static previews on the page work too: × dismisses, Undo answers', async ({ open, assert }) => {
  const page = await open('components/toast');
  const n = await page.count('.ex-stage .dd-toast');
  await page.click('.ex-stage .dd-toast--warn .dd-toast__dismiss');
  await page.waitFor((k) => document.querySelectorAll('.ex-stage .dd-toast').length === k - 1, { args: [n] });
  await page.click('.ex-stage .dd-toast .dd-toast__action');
  await page.waitFor(() => !!document.querySelector('.dd-toaster > .dd-toast'));
});

test('a toast raised while a modal dialog is open shows above its scrim and stays clickable', async ({ open, assert }) => {
  const page = await open('components/dialog');
  await page.click('[data-dd-dialog-open="#publish-dialog"]');
  await page.waitFor(() => !!document.querySelector('dialog:modal'));
  await page.evaluate(`window.__undo = 0; void dd.toast({ title: 'Draft saved', duration: 0, action: { label: 'Undo', onClick() { window.__undo++; } } })`);
  await page.waitFor((s) => !!document.querySelector(s), { args: [live] });
  await page.sleep(400); // past the entrance
  const hit = await page.get((s) => {
    const t = document.querySelector(s); const r = t.getBoundingClientRect();
    return { inToast: t.contains(document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2)), corner: document.body.clientWidth - r.right < 40 && innerHeight - r.bottom < 40 };
  }, live);
  assert.deepEqual(hit, { inToast: true, corner: true }, 'on top, in the bottom-right corner');
  await page.click('.dd-toast__action');
  assert.equal(await page.get(() => window.__undo), 1, 'the action works over the modal');
  assert.ok(await page.get(() => !!document.querySelector('dialog:modal')), 'and the dialog stays open');
  // After the dialog closes, toasts raised later still show (the stack is back in <body>).
  await page.evaluate(`void dd.toast({ title: 'One more', duration: 0 }); void dd.toast({ title: 'Kept', duration: 0 })`);
  await page.waitFor((s) => document.querySelectorAll(s).length === 2, { args: [live] });
  await page.press('Escape'); // focus is in the dialog: Esc closes it
  await page.waitFor(() => !document.querySelector('dialog:modal'));
  assert.ok(await page.get(() => document.querySelector('.dd-toaster').parentElement === document.body));
  assert.ok(await page.visible(live), 'toasts that were up stay visible after the dialog closes');
  await page.evaluate(`void dd.toast({ title: 'After', duration: 0 })`);
  await page.waitFor(() => [...document.querySelectorAll('.dd-toaster > .dd-toast')].some((t) => t.textContent.includes('After') && t.getBoundingClientRect().height > 0));
});
