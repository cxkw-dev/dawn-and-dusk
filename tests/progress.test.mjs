import { test } from './lib/test.mjs';

const live = '[data-progress-demo]';
const now = (page) => page.get((s) => Number(document.querySelector(`${s} [role="progressbar"]`).getAttribute('aria-valuenow')), live);

test('every bar and meter states its value; the fill matches it', async ({ open, assert }) => {
  const page = await open('components/progress');
  const bad = await page.get(() => [...document.querySelectorAll('.ex-stage [role="progressbar"], .ex-stage [role="meter"]')].flatMap((el) => {
    const out = [];
    const name = el.getAttribute('aria-label') || document.getElementById(el.getAttribute('aria-labelledby') || '')?.textContent;
    if (!name) out.push('no accessible name');
    const indet = el.classList.contains('is-indeterminate');
    const v = el.getAttribute('aria-valuenow');
    if (indet && v !== null) out.push('indeterminate bar has aria-valuenow');
    if (!indet) {
      const min = +el.getAttribute('aria-valuemin'), max = +el.getAttribute('aria-valuemax');
      if (v === null || +v < min || +v > max) out.push(`value ${v} outside ${min}–${max}`);
      const fill = el.querySelector(':scope > .dd-progress__fill');
      if (fill) {
        const pct = (fill.getBoundingClientRect().width / el.getBoundingClientRect().width) * 100;
        if (Math.abs(pct - +v) > 1.5) out.push(`fill ${pct.toFixed(1)}% ≠ ${v}`);
      }
    }
    return out.map((m) => `${name || el.outerHTML.slice(0, 60)}: ${m}`);
  }));
  assert.deepEqual(bad, []);
  assert.ok(await page.count('.ex-stage .is-indeterminate') >= 3);
  assert.equal(await page.count('.ex-stage [role="meter"][aria-valuetext]'), 5, 'meters and quotas say what the level means');
  // One current step per pipeline, failed pipeline has none.
  assert.equal(await page.count('.ex-stage .dd-progress-steps [aria-current="step"]'), 2);
});

test('indeterminate bars slide, and hold still under reduced motion (dusk)', async ({ open, assert }) => {
  const page = await open('components/progress', { theme: 'dusk' });
  const anim = () => page.get(() => getComputedStyle(document.querySelector('.ex-stage .dd-progress__track.is-indeterminate .dd-progress__fill')).animationName);
  assert.notEqual(await anim(), 'none');
  await page.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  assert.equal(await anim(), 'none');
  assert.ok(await page.get(() => Number(getComputedStyle(document.querySelector('.ex-stage .dd-progress__track.is-indeterminate .dd-progress__fill')).opacity) < 0.6), 'half strength when still');
});

test('live demo: start, pause, resume, finish and reset keep aria-valuenow in sync', async ({ open, assert }) => {
  const page = await open('components/progress');
  const toggle = `${live} [data-progress-act="toggle"]`;
  const reset = `${live} [data-progress-act="reset"]`;
  assert.equal(await now(page), 0);
  assert.equal(await page.get((s) => document.querySelector(s).disabled, reset), true, 'nothing to reset yet');
  await page.click(toggle);
  assert.equal(await page.text(toggle), 'Pause');
  await page.waitFor((s) => +document.querySelector(`${s} [role="progressbar"]`).getAttribute('aria-valuenow') >= 20, { args: [live] });
  await page.click(toggle);
  const paused = await now(page);
  assert.equal(await page.text(toggle), 'Resume');
  assert.match(await page.text(`${live} [data-progress-hint]`), /paused/);
  await page.sleep(400);
  assert.equal(await now(page), paused, 'stays put while paused');
  assert.equal(await page.text(`${live} [data-progress-pct]`), `${paused}%`);
  // Rapid clicks: resume/pause/resume — still one timer.
  await page.click(toggle); await page.click(toggle); await page.click(toggle);
  await page.waitFor((s) => document.querySelector(`${s} [role="progressbar"]`).getAttribute('aria-valuenow') === '100', { args: [live], timeout: 6000 });
  assert.match(await page.text(`${live} [data-progress-hint]`), /Done — 61 MB uploaded/);
  assert.equal(await page.text(toggle), 'Upload again');
  const fill = await page.get((s) => { const t = document.querySelector(`${s} .dd-progress__track`); return t.querySelector('.dd-progress__fill').getBoundingClientRect().width / t.getBoundingClientRect().width; }, live);
  await page.waitFor((s) => { const t = document.querySelector(`${s} .dd-progress__track`); return t.querySelector('.dd-progress__fill').getBoundingClientRect().width / t.getBoundingClientRect().width > 0.99; }, { args: [live] });
  assert.ok(fill > 0.5);
  // Keyboard: reset with Enter; focus lands back on the start button.
  await page.focus(reset);
  await page.press('Enter');
  assert.equal(await now(page), 0);
  assert.equal(await page.text(toggle), 'Start upload');
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), toggle), 'focus moves to Start when Reset disables itself');
});

test('live demo works by touch at 375px', async ({ open, assert }) => {
  const page = await open('components/progress', { width: 375 });
  await page.tap(`${live} [data-progress-act="toggle"]`);
  await page.waitFor((s) => +document.querySelector(`${s} [role="progressbar"]`).getAttribute('aria-valuenow') > 0, { args: [live] });
  await page.tap(`${live} [data-progress-act="toggle"]`);
  assert.equal(await page.text(`${live} [data-progress-act="toggle"]`), 'Resume');
  assert.ok(await page.get(() => document.documentElement.scrollWidth <= innerWidth), 'no sideways scroll');
});
