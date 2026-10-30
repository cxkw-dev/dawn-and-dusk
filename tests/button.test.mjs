import { test } from './lib/test.mjs';

// Counts click events that reach the page's own (bubbling) handlers, per button.
const countClicks = (page) => page.get(() => { window.__clicks = new Map(); document.addEventListener('click', (e) => { const b = e.target.closest('.dd-btn'); if (b) __clicks.set(b, (__clicks.get(b) || 0) + 1); }); return true; });
const clicks = (page, sel) => page.get((s) => __clicks.get(document.querySelector(s)) || 0, sel);
const bg = (page, sel) => page.get((s) => getComputedStyle(document.querySelector(s)).backgroundColor, sel);
const states = '.ex-stage:has(.is-loading)';

test('hover steps the fill, keyboard focus draws the ring, pressing nudges down', async ({ open, assert }) => {
  for (const theme of ['dawn', 'dusk']) {
    const page = await open('components/button', { theme });
    for (const v of ['primary', 'secondary', 'ink', 'ghost', 'danger']) {
      const sel = `.ex-stage .dd-row > .dd-btn--${v}:not(:disabled)`;
      await page.hover('.doc-head h1');
      const rest = await bg(page, sel);
      await page.hover(sel);
      await page.waitFor((s, r) => getComputedStyle(document.querySelector(s)).backgroundColor !== r, { args: [sel, rest] });
    }
    // Pressed: translateY(1px) while the mouse is down.
    const p = await page.get(() => { const r = document.querySelector('.ex-stage .dd-btn--primary').getBoundingClientRect(); return { x: r.left + 10, y: r.top + 10 }; });
    await page.send('Input.dispatchMouseEvent', { type: 'mousePressed', ...p, button: 'left', clickCount: 1 });
    await page.sleep(220);
    assert.match(await page.get(() => getComputedStyle(document.querySelector('.ex-stage .dd-btn--primary')).transform), /matrix\(1, 0, 0, 1, 0, 1\)/, `${theme}: pressed moves down 1px`);
    await page.send('Input.dispatchMouseEvent', { type: 'mouseReleased', ...p, button: 'left', clickCount: 1 });
    // Keyboard focus ring.
    await page.focus('.doc-head h1');
    await page.get(() => { const h = document.querySelector('.doc-head h1'); h.tabIndex = -1; h.focus(); return true; });
    await page.press('Tab');
    let guard = 0;
    while (!(await page.get(() => document.activeElement.matches('.ex-stage .dd-btn'))) && guard++ < 40) await page.press('Tab');
    assert.equal(await page.get(() => getComputedStyle(document.activeElement).outlineStyle), 'solid', `${theme}: focus ring`);
  }
});

test('disabled buttons ignore clicks and are skipped by Tab; the aria-disabled link does not navigate', async ({ open, assert }) => {
  const page = await open('components/button');
  await countClicks(page);
  const disabled = `${states} .dd-btn--primary:disabled`;
  await page.click(disabled);
  assert.equal(await clicks(page, disabled), 0);
  // Tab from the control just before the States example goes past every disabled button to the first busy one.
  await page.focus('h2#icon-only + p + figure .ex-bar [data-dd-copy]');
  await page.press('Tab');
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(`${s} .is-loading`), states), 'Tab skips disabled buttons');
  const link = `${states} a[aria-disabled="true"]`;
  const before = await page.get(() => location.href);
  await page.click(link);
  assert.equal(await page.get(() => location.href), before);
  assert.ok(Number(await page.get((s) => getComputedStyle(document.querySelector(s)).opacity, disabled)) < 0.6, 'disabled is faded');
});

test('a busy button ignores clicks, Enter and Space; it says it is busy and spins', async ({ open, assert }) => {
  const page = await open('components/button', { theme: 'dusk' });
  await countClicks(page);
  const busy = `${states} .dd-btn--primary.is-loading`;
  assert.equal(await page.attr(busy, 'aria-busy'), 'true');
  await page.click(busy);
  await page.focus(busy);
  await page.press('Enter', ' ');
  assert.equal(await clicks(page, busy), 0, 'no click reaches the page from pointer or keyboard');
  assert.ok(await page.get((s) => document.querySelector(`${s} .dd-btn__spinner`).getAnimations().some((a) => a.playState === 'running'), busy), 'spinner animates');
});

test('live busy state: Redeploy goes busy, ignores repeat clicks, then restores and confirms once', async ({ open, assert }) => {
  const page = await open('components/button');
  const btn = '#bt-redeploy';
  await page.click(btn);
  assert.ok(await page.get((s) => document.querySelector(s).classList.contains('is-loading'), btn));
  assert.equal(await page.attr(btn, 'aria-busy'), 'true');
  assert.equal(await page.text(btn), 'Redeploying');
  await page.click(btn);
  await page.focus(btn);
  await page.press('Enter');
  await page.waitFor((s) => !document.querySelector(s).classList.contains('is-loading'), { args: [btn], timeout: 4000 });
  assert.equal(await page.text(btn), 'Redeploy');
  assert.equal(await page.attr(btn, 'aria-busy'), null);
  await page.waitFor(() => document.querySelectorAll('.dd-toast').length > 0);
  await page.sleep(300);
  assert.equal(await page.count('.dd-toast'), 1, 'repeat clicks while busy did not queue more work');
  // The copy icon button confirms too.
  await page.click('[aria-label="Copy deployment ID"]');
  await page.waitFor(() => document.querySelectorAll('.dd-toast').length === 2);
});

test('the link button navigates; buttons work by keyboard (Enter and Space)', async ({ open, assert }) => {
  const page = await open('components/button');
  await countClicks(page);
  const ghost = '.ex-stage .dd-row > .dd-btn--ghost';
  await page.focus(ghost);
  await page.press('Enter', ' ');
  assert.equal(await clicks(page, ghost), 2);
  await page.click('.ex-stage a.dd-btn--link[href]');
  assert.equal(await page.get(() => location.hash), '#guidelines');
});

test('375px: block buttons fill their container, the surface row wraps, taps work', async ({ open, assert }) => {
  const page = await open('components/button', { width: 375, theme: 'dusk' });
  const [btn, box] = await page.get(() => { const b = document.querySelector('.dd-btn--block'); return [b.getBoundingClientRect().width, b.parentElement.getBoundingClientRect().width]; });
  assert.ok(Math.abs(btn - box) < 1, 'block fills the width');
  assert.ok(await page.get(() => [...document.querySelectorAll('.ex-stage .dd-btn')].every((b) => b.getBoundingClientRect().right <= 376)), 'no button overflows 375px');
  await page.tap('#bt-redeploy');
  assert.ok(await page.get(() => document.getElementById('bt-redeploy').classList.contains('is-loading')), 'tap starts the busy state');
});
