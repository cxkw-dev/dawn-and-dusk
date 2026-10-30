import { test } from './lib/test.mjs';

const demo = '[data-stepper-demo]';
const next = `${demo} [data-stepper-go="next"]`;
const back = `${demo} [data-stepper-go="back"]`;
// The live stepper's state: which steps are done / current, the marker contents and the announced status.
const state = () => {
  const box = document.querySelector('[data-stepper-demo]');
  const steps = [...box.querySelectorAll('.dd-stepper__step')];
  return {
    done: steps.map((s, n) => (s.classList.contains('is-done') ? n : -1)).filter((n) => n >= 0),
    current: steps.map((s, n) => (s.getAttribute('aria-current') === 'step' && s.classList.contains('is-current') ? n : -1)).filter((n) => n >= 0),
    markers: steps.map((s) => (s.querySelector('.dd-stepper__marker svg') ? '✓' : s.querySelector('.dd-stepper__marker').textContent.trim())),
    status: box.querySelector('[aria-live]').textContent,
    back: box.querySelector('[data-stepper-go="back"]').disabled,
    next: box.querySelector('[data-stepper-go="next"]').textContent.trim(),
  };
};

test('every stepper is a labelled list; at most one step is current, and it is marked both ways', async ({ open, assert }) => {
  const page = await open('components/stepper');
  const lists = await page.get(() => [...document.querySelectorAll('.ex-stage .dd-stepper')].map((ol) => ({
    tag: ol.tagName, label: !!ol.getAttribute('aria-label'),
    current: ol.querySelectorAll('[aria-current="step"]').length,
    currentMatches: [...ol.querySelectorAll('[aria-current="step"]')].every((s) => s.classList.contains('is-current'))
      && [...ol.querySelectorAll('.is-current')].every((s) => s.getAttribute('aria-current') === 'step'),
  })));
  assert.ok(lists.length >= 8);
  for (const l of lists) {
    assert.equal(l.tag, 'OL'); assert.ok(l.label, 'aria-label');
    assert.ok(l.current <= 1, 'one current step at most'); assert.ok(l.currentMatches, 'is-current ⇔ aria-current="step"');
  }
});

test('done, error and pipeline states are spoken, not only drawn', async ({ open, assert }) => {
  const page = await open('components/stepper');
  const missing = await page.get(() => [...document.querySelectorAll('.ex-stage .dd-stepper__step:is(.is-done, .is-error, .is-skipped)')]
    .filter((s) => !s.querySelector('.dd-stepper__label .dd-visually-hidden')).map((s) => s.textContent.trim()));
  assert.deepEqual(missing, [], 'each finished / failed / skipped step carries hidden state text');
  // markers are decoration
  assert.equal(await page.count('.ex-stage .dd-stepper__marker svg:not([aria-hidden="true"])'), 0);
});

test('the live flow: Next and Back move the current step, markers and announcement follow', async ({ open, assert }) => {
  const page = await open('components/stepper');
  assert.deepEqual(await page.get(state), { done: [], current: [0], markers: ['1', '2', '3', '4'], status: 'Step 1 of 4', back: true, next: 'Next' });
  await page.click(next);
  await page.click(next);
  assert.deepEqual(await page.get(state), { done: [0, 1], current: [2], markers: ['✓', '✓', '3', '4'], status: 'Step 3 of 4', back: false, next: 'Next' });
  await page.click(back);
  assert.deepEqual((await page.get(state)).current, [1]);
  await page.click(next); await page.click(next);
  assert.deepEqual(await page.get(state), { done: [0, 1, 2], current: [3], markers: ['✓', '✓', '✓', '4'], status: 'Step 4 of 4', back: false, next: 'Finish' });
  await page.click(next);
  assert.deepEqual(await page.get(state), { done: [0, 1, 2, 3], current: [], markers: ['✓', '✓', '✓', '✓'], status: 'All 4 steps done', back: false, next: 'Start over' });
  await page.click(next);
  assert.deepEqual((await page.get(state)).current, [0], 'start over');
  assert.equal(await page.attr(`${demo} .dd-stepper`, 'aria-describedby'), 'stepper-demo-status');
});

test('keyboard: Back disabling itself hands focus to Next; rapid clicks never break the state', async ({ open, assert }) => {
  const page = await open('components/stepper');
  await page.focus(next);
  await page.press('Enter');
  await page.press({ key: 'Tab', shift: true });
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), back), 'Back is reachable');
  await page.press('Enter');
  assert.deepEqual((await page.get(state)).current, [0]);
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), next), 'focus moved to Next, not lost');
  for (let k = 0; k < 11; k++) await page.click(next); // 4 to finish, 1 to restart, 6 more
  const s = await page.get(state);
  assert.equal(s.current.length + (s.status.startsWith('All') ? 1 : 0), 1, 'always exactly one current step or all done');
  assert.equal(s.done.length, s.current[0] ?? 4);
});

test('375px: horizontal steppers keep only the current label visible, and stay on screen', async ({ open, assert }) => {
  const page = await open('components/stepper', { width: 375 });
  const r = await page.get(() => {
    const ol = document.querySelector('[data-stepper-demo] .dd-stepper');
    return [...ol.querySelectorAll('.dd-stepper__text')].map((t) => t.getBoundingClientRect().width > 1);
  });
  assert.deepEqual(r, [true, false, false, false]);
  assert.ok(await page.get(() => document.documentElement.scrollWidth <= innerWidth), 'no sideways scroll');
  await page.tap(next);
  assert.deepEqual((await page.get(state)).current, [1]);
  assert.ok(await page.get(() => document.querySelectorAll('[data-stepper-demo] .dd-stepper__text')[1].getBoundingClientRect().width > 1), 'the new current label shows');
});

test('dusk: the current marker is filled with the accent, done marks are green', async ({ open, assert }) => {
  const page = await open('components/stepper', { theme: 'dusk' });
  await page.click(next);
  await page.sleep(400); // marker colours ease over --dd-dur
  const c = await page.get(() => {
    const steps = document.querySelectorAll('[data-stepper-demo] .dd-stepper__step');
    const probe = document.createElement('i'); document.body.append(probe);
    const tok = (v) => { probe.style.color = `var(${v})`; return getComputedStyle(probe).color; };
    return { cur: getComputedStyle(steps[1].querySelector('.dd-stepper__marker')).backgroundColor, accent: tok('--dd-accent'),
      done: getComputedStyle(steps[0].querySelector('.dd-stepper__marker')).color, ok: tok('--dd-ok') };
  });
  assert.equal(c.cur, c.accent);
  assert.equal(c.done, c.ok);
});
