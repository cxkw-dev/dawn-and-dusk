import { test } from './lib/test.mjs';

const trigger = (id) => `[popovertarget="${id}"]:not(#${id} *)`;
const isOpen = (id) => (s) => document.getElementById(s).matches(':popover-open');
const opened = (page, id) => page.get((s) => document.getElementById(s).matches(':popover-open'), id);
const rect = (page, sel) => page.get((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { l: r.left, r: r.right, t: r.top, b: r.bottom, w: r.width, h: r.height }; }, sel);
const clickAt = async (page, x, y) => { for (const type of ['mouseMoved', 'mousePressed', 'mouseReleased']) await page.send('Input.dispatchMouseEvent', { type, x, y, button: 'left', clickCount: 1 }); await page.sleep(120); };

test('click opens beside its trigger with aria-expanded; Tab moves in; Esc closes and returns focus', async ({ open, assert }) => {
  const page = await open('components/popover');
  const t = trigger('pop-promote');
  assert.equal(await page.attr(t, 'aria-expanded'), 'false', 'state is announced before the first click');
  await page.click(t);
  assert.ok(await opened(page, 'pop-promote'));
  assert.equal(await page.attr(t, 'aria-expanded'), 'true');
  const [a, p] = [await rect(page, t), await rect(page, '#pop-promote')];
  assert.ok(p.t >= a.b, 'below the trigger');
  assert.ok(Math.abs(p.r - a.r) < 2, `aligned to its end edge (${p.r} vs ${a.r})`);
  assert.equal(await page.attr('#pop-promote', 'data-placement'), 'bottom-end');
  await page.press('Tab');
  assert.ok(await page.get(() => document.getElementById('pop-promote').contains(document.activeElement)), 'Tab from the trigger goes into the popover');
  await page.press('Escape');
  assert.equal(await opened(page, 'pop-promote'), false);
  assert.equal(await page.attr(t, 'aria-expanded'), 'false');
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), t), 'focus back on the trigger');
});

test('outside click, ×, Cancel and Promote all close it; Promote confirms with a toast', async ({ open, assert }) => {
  const page = await open('components/popover');
  const t = trigger('pop-promote');
  await page.click(t);
  await page.click('.doc-main h1');
  assert.equal(await opened(page, 'pop-promote'), false, 'outside click');
  for (const sel of ['#pop-promote .dd-popover__close', '#pop-promote .dd-popover__actions .dd-btn--ghost']) {
    await page.click(t);
    assert.ok(await opened(page, 'pop-promote'));
    await page.click(sel);
    assert.equal(await opened(page, 'pop-promote'), false, sel);
    assert.equal(await page.attr(t, 'aria-expanded'), 'false');
  }
  await page.click(t);
  await page.click('#pop-promote .dd-popover__actions .dd-btn--primary');
  assert.equal(await opened(page, 'pop-promote'), false);
  await page.waitFor(() => !!document.querySelector('.dd-toaster > .dd-toast'));
  assert.match(await page.text('.dd-toaster .dd-toast__title'), /promot/i);
});

test('only one open at a time; rapid clicks leave a consistent state', async ({ open, assert }) => {
  const page = await open('components/popover');
  await page.click(trigger('pop-top'));
  assert.ok(await opened(page, 'pop-top'));
  await page.click(trigger('pop-left'));
  assert.ok(await opened(page, 'pop-left'));
  assert.equal(await opened(page, 'pop-top'), false, 'opening another closes the first');
  assert.equal(await page.attr(trigger('pop-top'), 'aria-expanded'), 'false');
  assert.equal(await page.count('.dd-popover:popover-open'), 1);
  await page.click(trigger('pop-left')); // toggles closed
  assert.equal(await page.count('.dd-popover:popover-open'), 0);
  for (let k = 0; k < 5; k++) await page.click(trigger('pop-regions'));
  assert.ok(await opened(page, 'pop-regions'), 'odd number of clicks: open');
  assert.equal(await page.attr(trigger('pop-regions'), 'aria-expanded'), 'true');
});

test('dd.popover open/toggle/close from code, anchored anywhere; aria-expanded follows', async ({ open, assert }) => {
  const page = await open('components/popover');
  await page.get(() => { const b = document.createElement('button'); b.id = 'anchor'; b.textContent = 'anchor'; b.setAttribute('aria-expanded', 'false'); document.querySelector('#info').after(b); });
  await page.get(() => { document.getElementById('anchor').scrollIntoView({ block: 'center' }); dd.popover.open(document.getElementById('pop-regions'), document.getElementById('anchor')); });
  await page.waitFor(isOpen(), { args: ['pop-regions'] });
  assert.equal(await page.attr('#anchor', 'aria-expanded'), 'true');
  const [a, p] = [await rect(page, '#anchor'), await rect(page, '#pop-regions')];
  assert.ok(p.l >= a.r, 'placed to the right of the anchor it was given');
  await page.get(() => dd.popover.toggle(document.getElementById('pop-regions')));
  assert.equal(await opened(page, 'pop-regions'), false);
  assert.equal(await page.attr('#anchor', 'aria-expanded'), 'false', 'anchor told it closed');
  await page.get(() => { const p = document.getElementById('pop-regions'); dd.popover.toggle(p, document.getElementById('anchor')); dd.popover.open(p); });
  assert.ok(await opened(page, 'pop-regions'), 'open twice is still open');
  await page.get(() => { const p = document.getElementById('pop-regions'); dd.popover.close(p); dd.popover.close(p); });
  assert.equal(await opened(page, 'pop-regions'), false);
  // toggle events fire for listeners.
  await page.get(() => { window.__s = []; document.getElementById('pop-top').addEventListener('toggle', (e) => window.__s.push(e.newState)); });
  await page.click(trigger('pop-top'));
  await page.press('Escape');
  assert.deepEqual(await page.get(() => window.__s), ['open', 'closed']);
});

test('flips below when there is no room above, and follows its trigger on scroll', async ({ open, assert }) => {
  const page = await open('components/popover');
  const t = trigger('pop-top');
  await page.click(t);
  assert.equal(await page.attr('#pop-top', 'data-placement'), 'top');
  await page.press('Escape');
  // Trigger just under the docs header: no room above.
  const c = await page.get((s) => { const el = document.querySelector(s); scrollBy(0, el.getBoundingClientRect().top - 80); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, t);
  await page.sleep(80);
  await clickAt(page, c.x, c.y);
  assert.ok(await opened(page, 'pop-top'));
  assert.equal(await page.attr('#pop-top', 'data-placement'), 'bottom', 'flipped');
  const y0 = (await rect(page, '#pop-top')).t;
  await page.get(() => scrollBy(0, 30));
  await page.sleep(150);
  const y1 = (await rect(page, '#pop-top')).t;
  assert.ok(Math.abs(y0 - y1 - 30) < 2, `followed the trigger (${y0} → ${y1})`);
  // With room above again, it goes back to the side it asked for.
  await page.get(() => scrollBy(0, -200));
  await page.sleep(150);
  assert.equal(await page.attr('#pop-top', 'data-placement'), 'top');
});

test('touch at 375 in dusk: tap opens, left falls back below, tap outside closes', async ({ open, assert }) => {
  const page = await open('components/popover', { width: 375, theme: 'dusk' });
  await page.tap(trigger('pop-left'));
  assert.ok(await opened(page, 'pop-left'));
  assert.equal(await page.attr('#pop-left', 'data-placement'), 'bottom', 'no room on the left at 375');
  const p = await rect(page, '#pop-left');
  assert.ok(p.l >= 0 && p.r <= 375, `stays on screen: ${p.l}–${p.r}`);
  await page.tap('.doc-main h1');
  assert.equal(await opened(page, 'pop-left'), false);
  await page.tap(trigger('pop-promote'));
  assert.ok(await opened(page, 'pop-promote'));
  const q = await rect(page, '#pop-promote');
  assert.ok(q.l >= 0 && q.r <= 375, `promote stays on screen: ${q.l}–${q.r}`);
});

test('a trigger rendered after load gets aria-expanded when it takes focus, and it follows open and close', async ({ open, assert }) => {
  const page = await open('components/popover');
  await page.send('Emulation.setFocusEmulationEnabled', { enabled: true }); // focus events, as in a focused window
  await page.get(() => {
    const box = document.createElement('div');
    box.innerHTML = '<button class="dd-btn" type="button" id="late-pop-btn" popovertarget="late-pop">Later</button><div class="dd-popover" id="late-pop" popover role="dialog"><p>hello</p></div>';
    document.querySelector('.doc-main').prepend(box);
  });
  await page.focus('#late-pop-btn');
  assert.equal(await page.attr('#late-pop-btn', 'aria-expanded'), 'false');
  await page.press('Enter');
  assert.ok(await opened(page, 'late-pop'));
  assert.equal(await page.attr('#late-pop-btn', 'aria-expanded'), 'true');
});

test('a panel removed while open (a re-render) lets its trigger go: aria-expanded back to false, nothing left to follow', async ({ open, assert }) => {
  const page = await open('components/popover');
  const id = await page.get(() => document.querySelector('.ex-stage .dd-popover[popover]').id);
  await page.click(trigger(id));
  assert.ok(await opened(page, id));
  assert.equal(await page.attr(trigger(id), 'aria-expanded'), 'true');
  await page.get((i) => { window.__panel = document.getElementById(i); window.__panel.remove(); }, id);
  await page.waitFor((s) => document.querySelector(s).getAttribute('aria-expanded') === 'false', { args: [trigger(id)] });
  // Put it back (the re-render's new node): it opens and closes as before.
  await page.get(() => document.querySelector('.ex-stage').append(window.__panel));
  await page.click(trigger(id));
  assert.ok(await opened(page, id));
  assert.equal(await page.attr(trigger(id), 'aria-expanded'), 'true');
  await page.press('Escape');
  assert.equal(await page.attr(trigger(id), 'aria-expanded'), 'false');
});
