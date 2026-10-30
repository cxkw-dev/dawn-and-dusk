import { test } from './lib/test.mjs';

const start = '[data-dd-guide-start="deploys"]';
const cue = (n) => `.dd-guide-cue[data-dd-guide="deploys"]:nth-of-type(${n})`;
// Which step is showing: index of the open cue among the tour's cues (-1 for none).
const step = (page) => page.get(() => [...document.querySelectorAll('.dd-guide-cue[data-dd-guide="deploys"]')].findIndex((c) => c.matches(':popover-open')));
const openCue = '.dd-guide-cue[data-dd-guide="deploys"]:popover-open';
const listen = (page) => page.get(() => { window.__steps = []; window.__end = []; document.addEventListener('dd:guide-step', (e) => window.__steps.push(e.detail.index)); document.addEventListener('dd:guide-end', (e) => window.__end.push(e.detail.completed)); });

test('start, Next, Back, Done: count, pips, ring, beacon, events and focus', async ({ open, assert }) => {
  const page = await open('components/guide-cue');
  await listen(page);
  await page.click(start);
  assert.equal(await step(page), 0);
  assert.equal(await page.text(`${openCue} .dd-guide-cue__count`), '1 of 3');
  assert.deepEqual(await page.get((s) => [...document.querySelectorAll(`${s} .dd-guide-cue__pips i`)].map((i) => i.className), openCue), ['is-current', '', '']);
  assert.ok(await page.exists('#tour-new[data-dd-guide-active]'), 'target is ringed');
  assert.equal(await page.count('.dd-guide-beacon:not(.dd-guide-beacon--static)'), 1);
  assert.ok(await page.get((s) => document.querySelector(s).contains(document.activeElement), openCue), 'focus moved into the cue');
  const [t, c] = await page.get((s) => [document.getElementById('tour-new').getBoundingClientRect(), document.querySelector(s).getBoundingClientRect()].map((r) => ({ l: r.left, b: r.bottom, t: r.top })), openCue);
  assert.ok(c.t > t.b && Math.abs(c.l - t.l) < 2, 'below the target, start-aligned');

  await page.click(`${openCue} [data-dd-guide-next]`);
  assert.equal(await step(page), 1);
  assert.equal(await page.text(`${openCue} .dd-guide-cue__count`), '2 of 3');
  assert.deepEqual(await page.get((s) => [...document.querySelectorAll(`${s} .dd-guide-cue__pips i`)].map((i) => i.className), openCue), ['is-done', 'is-current', '']);
  assert.equal(await page.exists('#tour-new[data-dd-guide-active]'), false, 'previous target released');
  assert.ok(await page.exists('#tour-filter[data-dd-guide-active]'));

  await page.click(`${openCue} [data-dd-guide-back]`);
  assert.equal(await step(page), 0);
  await page.click(`${openCue} [data-dd-guide-next]`);
  await page.click(`${openCue} [data-dd-guide-next]`);
  assert.equal(await step(page), 2);
  assert.equal(await page.text(`${openCue} .dd-guide-cue__count`), '3 of 3');
  await page.click(`${openCue} [data-dd-guide-next]`); // Done
  assert.equal(await step(page), -1, 'finished');
  assert.equal(await page.count('.dd-guide-beacon:not(.dd-guide-beacon--static)'), 0);
  assert.equal(await page.count('[data-dd-guide-active]'), 0);
  assert.deepEqual(await page.get(() => [window.__steps, window.__end]), [[0, 1, 0, 1, 2], [true]]);
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), start), 'focus back on Take the tour');
});

test('keyboard: Enter starts, Tab reaches the buttons, Esc ends early and returns focus', async ({ open, assert }) => {
  const page = await open('components/guide-cue', { theme: 'dusk' });
  await listen(page);
  await page.focus(start);
  await page.press('Enter');
  assert.equal(await step(page), 0);
  // Tab walks the cue’s own buttons: ×, Skip, Next.
  await page.press('Tab');
  assert.equal(await page.get(() => document.activeElement.getAttribute('aria-label')), 'End tour');
  await page.press('Tab', 'Tab');
  assert.ok(await page.get(() => document.activeElement.hasAttribute('data-dd-guide-next')));
  await page.press('Enter');
  assert.equal(await step(page), 1);
  assert.ok(await page.get((s) => document.querySelector(s).contains(document.activeElement), openCue), 'focus follows to step 2');
  await page.press('Escape');
  assert.equal(await step(page), -1);
  assert.deepEqual(await page.get(() => window.__end), [false]);
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), start));
  // Dusk: the cue is a raised surface, not the dawn ink slab.
  await page.click(start);
  const bg = await page.get((s) => getComputedStyle(document.querySelector(s)).backgroundColor, openCue);
  assert.ok(bg && bg !== 'rgba(0, 0, 0, 0)', bg);
});

test('× and Skip tour end it from any step', async ({ open, assert }) => {
  const page = await open('components/guide-cue');
  await listen(page);
  await page.click(start);
  await page.click(`${openCue} .dd-guide-cue__close`);
  assert.equal(await step(page), -1);
  await page.click(start);
  await page.click(`${openCue} .dd-guide-cue__actions [data-dd-guide-dismiss]`);
  assert.equal(await step(page), -1);
  await page.click(start);
  await page.click(`${openCue} [data-dd-guide-next]`);
  await page.click(`${openCue} .dd-guide-cue__close`);
  assert.equal(await step(page), -1);
  assert.deepEqual(await page.get(() => window.__end), [false, false, false]);
  assert.equal(await page.count('.dd-guide-beacon:not(.dd-guide-beacon--static)'), 0);
});

test('dd.guide API; restarting mid-tour and hammering Next stay consistent', async ({ open, assert }) => {
  const page = await open('components/guide-cue');
  await listen(page);
  await page.get(() => dd.guide.start('deploys'));
  assert.equal(await step(page), 0);
  await page.get(() => { dd.guide.next(); dd.guide.next(); });
  assert.equal(await step(page), 2);
  await page.get(() => dd.guide.back());
  assert.equal(await step(page), 1);
  await page.get(() => dd.guide.start('deploys')); // restart
  assert.equal(await step(page), 0);
  assert.equal(await page.count('.dd-guide-beacon:not(.dd-guide-beacon--static)'), 1, 'one beacon after a restart');
  await page.get(() => dd.guide.end());
  assert.equal(await step(page), -1);
  assert.deepEqual(await page.get(() => window.__end), [false]);
  // Unknown tour: nothing happens.
  await page.get(() => dd.guide.start('nope'));
  assert.equal(await page.count('.dd-guide-beacon:not(.dd-guide-beacon--static)'), 0);
  // Hammer Next: the tour finishes exactly once.
  await page.click(start);
  await page.get(() => { for (let k = 0; k < 6; k++) document.querySelector('.dd-guide-cue[data-dd-guide="deploys"]:popover-open [data-dd-guide-next]')?.click(); });
  assert.equal(await step(page), -1);
  assert.deepEqual(await page.get(() => window.__end), [false, true]);
});

test('375 by touch: each cue stays on screen and Next works', async ({ open, assert }) => {
  const page = await open('components/guide-cue', { width: 375 });
  await page.tap(start);
  for (let n = 0; n < 3; n++) {
    assert.equal(await step(page), n);
    await page.sleep(400); // smooth scroll settles, layout() runs again
    const r = await page.get((s) => { const b = document.querySelector(s).getBoundingClientRect(); return { l: b.left, r: b.right, t: b.top, b: b.bottom, h: innerHeight }; }, openCue);
    assert.ok(r.l >= 0 && r.r <= 375 && r.t >= 0 && r.b <= r.h, `cue ${n + 1} on screen: ${JSON.stringify(r)}`);
    await page.tap(`${openCue} [data-dd-guide-next]`);
  }
  assert.equal(await step(page), -1);
});
