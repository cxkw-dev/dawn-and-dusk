import { test } from './lib/test.mjs';

// Records dd-date events (detail + which calendar fired them).
const listen = (page) => page.get(() => {
  window.__ev = [];
  document.addEventListener('dd-date', (e) => window.__ev.push({ ...e.detail, cal: e.target.id || e.target.closest('[data-dd-date-picker]')?.querySelector('input')?.id || '' }));
});
const events = (page) => page.get(() => window.__ev);
// Give the inline / range calendars ids so selectors stay readable.
const nameCalendars = (page) => page.get(() => {
  const inline = document.querySelector('#inline ~ .ex').querySelectorAll('[data-dd-calendar]');
  inline[0].id = 'cal-a'; inline[1].id = 'cal-limits';
  document.querySelector('#range ~ .ex [data-dd-calendar]').id = 'cal-range';
});
const focused = (page) => page.get(() => document.activeElement?.dataset.date ?? document.activeElement?.id ?? document.activeElement?.tagName);
const value = (page, sel) => page.get((s) => document.querySelector(s).value, sel);
const toggleOf = (id) => `#${id} ~ .dd-input__affix [data-dd-date-toggle]`;
const outside = (page) => page.click('.doc-head h1');

test('toggle opens with focus on the chosen day; Esc closes and returns focus to the toggle', async ({ open, assert }) => {
  const page = await open('components/date-picker');
  await page.click(toggleOf('dp-2'));
  assert.equal(await page.attr(toggleOf('dp-2'), 'aria-expanded'), 'true');
  assert.ok(await page.visible('#dp-2-pop'));
  assert.equal(await focused(page), '2026-11-26');
  assert.equal(await page.attr('#dp-2-pop [data-date="2026-11-26"]', 'aria-pressed'), 'true');
  assert.equal(await page.text('#dp-2-pop .dd-calendar__title'), 'November 2026');
  await page.press('Escape');
  assert.equal(await page.attr(toggleOf('dp-2'), 'aria-expanded'), 'false');
  assert.ok(!(await page.visible('#dp-2-pop')));
  assert.equal(await page.get((s) => document.activeElement === document.querySelector(s), toggleOf('dp-2')), true);
  assert.equal(await value(page, '#dp-2'), 'Nov 26, 2026', 'Esc changes nothing');
});

test('keyboard grid: ↓ in the input opens; arrows, Page Up/Down, Home/End move; Enter chooses', async ({ open, assert }) => {
  const page = await open('components/date-picker');
  await listen(page);
  await page.focus('#dp-2');
  await page.press('ArrowDown');
  assert.equal(await page.attr(toggleOf('dp-2'), 'aria-expanded'), 'true');
  assert.equal(await focused(page), '2026-11-26');
  await page.press('ArrowRight');
  assert.equal(await focused(page), '2026-11-27');
  await page.press('ArrowDown');
  assert.equal(await focused(page), '2026-12-04', 'crossing the month edge turns the page');
  assert.equal(await page.text('#dp-2-pop .dd-calendar__title'), 'December 2026');
  assert.equal(await page.attr('#dp-2-pop .dd-calendar__grid', 'aria-label'), 'December 2026');
  await page.press('ArrowUp', 'ArrowLeft');
  assert.equal(await focused(page), '2026-11-26');
  await page.press('Home');
  assert.equal(await focused(page), '2026-11-23', 'Home: Monday of that week');
  await page.press('End');
  assert.equal(await focused(page), '2026-11-29', 'End: Sunday');
  await page.press('PageUp');
  assert.equal(await focused(page), '2026-10-29', 'Page Up: same day, previous month');
  await page.press('End', 'ArrowRight', 'ArrowRight', 'ArrowRight');
  assert.equal(await focused(page), '2026-11-04');
  await page.press('ArrowLeft', 'ArrowLeft', 'ArrowLeft', 'ArrowLeft', 'ArrowLeft');
  assert.equal(await focused(page), '2026-10-30');
  await page.press('ArrowRight', 'PageDown');
  assert.equal(await focused(page), '2026-11-30', 'Oct 31 → Nov 30: the last day of a shorter month');
  await page.press('PageDown');
  assert.equal(await focused(page), '2026-12-30');
  assert.equal(await page.count('#dp-2-pop .dd-calendar__day[tabindex="0"]'), 1, 'one tab stop in the grid');
  await page.press('Enter');
  assert.equal(await value(page, '#dp-2'), 'Dec 30, 2026');
  assert.ok(!(await page.visible('#dp-2-pop')), 'choosing closes');
  assert.equal(await page.active(), '#dp-2', 'focus back in the input');
  assert.deepEqual((await events(page)).at(-1), { value: '2026-12-30', cal: 'dp-2' });
});

test('click: month buttons turn pages, a day fills the input and fires change', async ({ open, assert }) => {
  const page = await open('components/date-picker');
  await page.get(() => { window.__changes = 0; document.querySelector('#dp-3').addEventListener('change', () => window.__changes++); });
  await page.click(toggleOf('dp-3'));
  assert.equal(await focused(page), '2026-10-30', 'no value: focus on today');
  assert.equal(await page.attr('#dp-3-pop [data-date="2026-10-30"]', 'aria-current'), 'date');
  await page.click('#dp-3-pop [data-dd-cal-nav="1"]');
  assert.equal(await page.text('#dp-3-pop .dd-calendar__title'), 'November 2026');
  await page.click('#dp-3-pop [data-dd-cal-nav="1"]');
  await page.click('#dp-3-pop [data-dd-cal-nav="-1"]');
  assert.equal(await page.text('#dp-3-pop .dd-calendar__title'), 'November 2026');
  await page.click('#dp-3-pop [data-date="2026-11-30"]');
  assert.equal(await value(page, '#dp-3'), 'Nov 30, 2026');
  assert.equal(await page.get(() => window.__changes), 1);
  assert.equal(await page.attr(toggleOf('dp-3'), 'aria-expanded'), 'false');
  // Reopening shows the new choice.
  await page.click(toggleOf('dp-3'));
  assert.equal(await page.attr('#dp-3-pop [data-date="2026-11-30"]', 'aria-pressed'), 'true');
});

test('outside click and Tab out close without changes; pickers are independent; rapid toggling stays in sync', async ({ open, assert }) => {
  const page = await open('components/date-picker');
  await page.click(toggleOf('dp-2'));
  await page.click(toggleOf('dp-3'));
  assert.equal(await page.attr(toggleOf('dp-2'), 'aria-expanded'), 'false', 'opening one closes the other');
  assert.equal(await page.attr(toggleOf('dp-3'), 'aria-expanded'), 'true');
  await outside(page);
  assert.equal(await page.attr(toggleOf('dp-3'), 'aria-expanded'), 'false');
  await page.click(toggleOf('dp-2'));
  await page.press('Tab');
  assert.ok(!(await page.visible('#dp-2-pop')), 'Tab out of the grid closes');
  for (let k = 0; k < 5; k++) await page.click(toggleOf('dp-2'));
  assert.equal(await page.attr(toggleOf('dp-2'), 'aria-expanded'), 'true');
  assert.equal(await page.visible('#dp-2-pop'), true);
  assert.equal(await value(page, '#dp-2'), 'Nov 26, 2026');
});

test('typed dates: ISO is a local day, text dates parse, junk and out-of-range are invalid', async ({ open, assert }) => {
  const page = await open('components/date-picker');
  await listen(page);
  await page.focus('#dp-3');
  await page.type('2026-12-01');
  await page.press('Tab');
  assert.equal(await value(page, '#dp-3'), 'Dec 1, 2026', 'not Nov 30 (UTC parse)');
  assert.deepEqual((await events(page)).at(-1), { value: '2026-12-01', cal: 'dp-3' });
  await page.click(toggleOf('dp-3'));
  assert.equal(await page.attr('#dp-3-pop [data-date="2026-12-01"]', 'aria-pressed'), 'true');
  await page.press('Escape');
  await page.get(() => { const i = document.querySelector('#dp-3'); i.focus(); i.select(); });
  await page.type('Jan 5, 2027');
  await page.press('Tab');
  assert.equal(await value(page, '#dp-3'), 'Jan 5, 2027');
  await page.get(() => { const i = document.querySelector('#dp-3'); i.focus(); i.select(); });
  await page.type('next tuesday-ish');
  await page.press('Tab');
  assert.equal(await page.attr('#dp-3', 'aria-invalid'), 'true');
  // Choosing from the calendar clears the error.
  await page.click(toggleOf('dp-3'));
  await page.press('Enter');
  assert.equal(await page.attr('#dp-3', 'aria-invalid'), null);
  assert.equal(await value(page, '#dp-3'), 'Jan 5, 2027');
});

test('inline calendars: click selects, min/max days are disabled and keyboard stops at the limits', async ({ open, assert }) => {
  const page = await open('components/date-picker');
  await nameCalendars(page);
  await listen(page);
  await page.click('#cal-a [data-date="2026-10-08"]');
  assert.equal(await page.count('#cal-a [aria-pressed="true"]'), 1);
  assert.equal(await page.attr('#cal-a [data-date="2026-10-08"]', 'aria-pressed'), 'true');
  assert.deepEqual((await events(page)).at(-1), { value: '2026-10-08', cal: 'cal-a' });
  // Independent: the other calendar keeps its value.
  assert.equal(await page.attr('#cal-limits [data-date="2026-10-21"]', 'aria-pressed'), 'true');
  // Week starts on Sunday in the second one.
  assert.equal(await page.text('#cal-limits thead th'), 'su');
  assert.ok(await page.get(() => document.querySelector('#cal-limits [data-date="2026-10-18"]').disabled));
  await page.click('#cal-limits [data-date="2026-10-18"]');
  assert.equal(await page.attr('#cal-limits [data-date="2026-10-18"]', 'aria-pressed'), 'false', 'disabled day ignores clicks');
  await page.click('#cal-limits [data-date="2026-10-19"]');
  await page.press('ArrowLeft');
  assert.equal(await focused(page), '2026-10-19', 'stops at data-min');
  await page.press('ArrowUp');
  assert.equal(await focused(page), '2026-10-19');
  await page.press('PageDown', 'PageDown');
  assert.equal(await focused(page), '2026-11-13', 'stops at data-max');
  const stop = await page.get(() => [...document.querySelectorAll('#cal-limits .dd-calendar__day[tabindex="0"]')].map((b) => [b.dataset.date, b.disabled]));
  assert.deepEqual(stop, [['2026-11-13', false]], 'the tab stop is never a disabled day');
  // A month that starts before data-min puts its tab stop on data-min.
  await page.click('#cal-limits [data-dd-cal-nav="-1"]');
  assert.equal(await page.get(() => document.querySelector('#cal-limits .dd-calendar__day[tabindex="0"]').dataset.date), '2026-10-19');
});

test('range calendar: start, hover preview, end in either order; keyboard previews too', async ({ open, assert }) => {
  const page = await open('components/date-picker');
  await nameCalendars(page);
  await listen(page);
  await page.click('#cal-range [data-date="2026-10-20"]');
  assert.equal(await page.attr('#cal-range', 'data-end'), '');
  assert.deepEqual((await events(page)).at(-1), { start: '2026-10-20', end: '', cal: 'cal-range' });
  await page.hover('#cal-range [data-date="2026-10-24"]');
  assert.ok(await page.get(() => document.querySelector('#cal-range [data-date="2026-10-22"]').parentElement.classList.contains('is-preview')), 'hover previews the band');
  await page.click('#cal-range [data-date="2026-10-12"]');
  assert.deepEqual((await events(page)).at(-1), { start: '2026-10-12', end: '2026-10-20', cal: 'cal-range' }, 'an earlier second day becomes the start');
  assert.ok(await page.get(() => document.querySelector('#cal-range [data-date="2026-10-12"]').parentElement.classList.contains('is-range-start')));
  assert.ok(await page.get(() => document.querySelector('#cal-range [data-date="2026-10-15"]').parentElement.classList.contains('is-in-range')));
  assert.equal(await page.count('#cal-range [aria-pressed="true"]'), 2);
  // Keyboard: a new start, then arrows preview, Enter ends.
  await page.press('Enter');
  await page.press('ArrowDown');
  assert.ok(await page.get(() => document.querySelector('#cal-range [data-date="2026-10-15"]').parentElement.classList.contains('is-preview')), 'keyboard focus previews');
  await page.press('Enter');
  assert.deepEqual((await events(page)).at(-1), { start: '2026-10-12', end: '2026-10-19', cal: 'cal-range' });
});

test('range picker: presets, Apply commits; Cancel / Esc / outside click restore range and preset', async ({ open, assert }) => {
  const page = await open('components/date-picker');
  const pressed = () => page.get(() => [...document.querySelectorAll('#dp-r-pop .dd-date-picker__preset[aria-pressed="true"]')].map((b) => b.textContent.trim()));
  const preset = (label) => page.get((l) => [...document.querySelectorAll('#dp-r-pop .dd-date-picker__preset')].findIndex((b) => b.textContent.trim() === l), label).then((n) => page.click(`#dp-r-pop .dd-date-picker__preset:nth-child(${n + 1})`));
  assert.deepEqual(await pressed(), ['Last 14 days']);
  // Shown open on load: a half-picked range dropped by an outside click goes back to what the input says.
  await page.click('#dp-r-pop [data-date="2026-10-03"]');
  assert.equal(await page.text('#dp-r-pop .dd-date-picker__summary'), 'Oct 3, 2026 – pick an end date');
  assert.deepEqual(await pressed(), [], 'picking a day un-presses the preset');
  await outside(page);
  assert.ok(!(await page.visible('#dp-r-pop')));
  await page.click('#dp-r');
  assert.ok(await page.visible('#dp-r-pop'), 'the read-only input opens it too');
  assert.equal(await page.attr('#dp-r-pop [data-dd-calendar]', 'data-start'), '2026-10-17');
  assert.equal(await page.attr('#dp-r-pop [data-dd-calendar]', 'data-end'), '2026-10-30');
  assert.deepEqual(await pressed(), ['Last 14 days']);

  await preset('Last 7 days');
  assert.deepEqual(await pressed(), ['Last 7 days']);
  assert.equal(await page.text('#dp-r-pop .dd-date-picker__summary'), 'Oct 24 – Oct 30, 2026 · 7 days');
  assert.equal(await value(page, '#dp-r'), 'Oct 17 – Oct 30, 2026', 'nothing changes before Apply');
  await page.click('#dp-r-pop [data-dd-date-apply]');
  assert.equal(await value(page, '#dp-r'), 'Oct 24 – Oct 30, 2026');
  assert.ok(!(await page.visible('#dp-r-pop')));

  await page.click(toggleOf('dp-r'));
  await preset('Last quarter');
  assert.equal(await page.text('#dp-r-pop .dd-calendar__title'), 'September 2026', 'jumps to the preset’s end month');
  await page.click('#dp-r-pop [data-dd-date-cancel]');
  assert.equal(await value(page, '#dp-r'), 'Oct 24 – Oct 30, 2026');
  await page.click(toggleOf('dp-r'));
  assert.deepEqual(await pressed(), ['Last 7 days'], 'Cancel restores the pressed preset');
  assert.equal(await page.attr('#dp-r-pop [data-dd-calendar]', 'data-start'), '2026-10-24');
  await page.click('#dp-r-pop [data-date="2026-10-05"]');
  await page.click('#dp-r-pop [data-date="2026-10-09"]');
  assert.ok(await page.visible('#dp-r-pop'), 'with Apply, the second day does not close');
  assert.equal(await page.text('#dp-r-pop .dd-date-picker__summary'), 'Oct 5 – Oct 9, 2026 · 5 days');
  await page.press('Escape');
  assert.equal(await value(page, '#dp-r'), 'Oct 24 – Oct 30, 2026');
});

test('range picker without Apply: a preset or the second day commits and closes', async ({ open, assert }) => {
  const page = await open('components/date-picker');
  // Same markup as the example, minus its Apply / Cancel footer.
  await page.get(() => {
    const field = document.querySelector('#dp-r').closest('.dd-field');
    const copy = field.cloneNode(true);
    copy.querySelector('input').id = 'dp-q';
    copy.querySelector('.dd-date-picker__popover').id = 'dp-q-pop';
    copy.querySelector('.dd-date-picker__foot').remove();
    copy.querySelector('.dd-date-picker').classList.remove('is-open');
    copy.querySelector('.dd-date-picker__popover').hidden = true;
    copy.querySelector('[data-dd-date-toggle]').setAttribute('aria-expanded', 'false');
    field.closest('.ex').after(copy);
  });
  await page.click('#dp-q');
  await page.click('#dp-q-pop .dd-date-picker__preset:nth-child(1)');
  assert.equal(await value(page, '#dp-q'), 'Oct 30 – Oct 30, 2026');
  assert.ok(!(await page.visible('#dp-q-pop')));
  await page.click('#dp-q');
  await page.click('#dp-q-pop [data-date="2026-10-06"]');
  assert.ok(await page.visible('#dp-q-pop'), 'still open after the first day');
  await page.click('#dp-q-pop [data-date="2026-10-02"]');
  assert.equal(await value(page, '#dp-q'), 'Oct 2 – Oct 6, 2026');
  assert.ok(!(await page.visible('#dp-q-pop')));
});

test('submit in the form example gives feedback', async ({ open, assert }) => {
  const page = await open('components/date-picker');
  await page.click('#interactive ~ .ex button[type="submit"]');
  await page.waitFor(() => [...document.querySelectorAll('.dd-toast')].some((t) => t.textContent.includes('Freeze scheduled')));
  assert.ok(true);
});

test('dusk: chosen day uses the accent fill; today keeps its marker', async ({ open, assert }) => {
  const page = await open('components/date-picker', { theme: 'dusk' });
  await page.click(toggleOf('dp-2'));
  const [chosen, plain] = await page.get(() => ['2026-11-26', '2026-11-25'].map((d) => getComputedStyle(document.querySelector(`#dp-2-pop [data-date="${d}"]`)).backgroundColor));
  assert.notEqual(chosen, plain);
  await page.press('ArrowLeft', 'Enter');
  assert.equal(await value(page, '#dp-2'), 'Nov 25, 2026');
});

test('touch at 375: tap opens a popover that fits the screen, tap a day chooses', async ({ open, assert }) => {
  const page = await open('components/date-picker', { width: 375 });
  await page.tap(toggleOf('dp-3'));
  assert.equal(await page.attr(toggleOf('dp-3'), 'aria-expanded'), 'true');
  const box = await page.get(() => { const r = document.querySelector('#dp-3-pop').getBoundingClientRect(); return [r.left, r.right]; });
  assert.ok(box[0] >= 0 && box[1] <= 375, `popover inside the viewport: ${box}`);
  await page.tap('#dp-3-pop [data-date="2026-10-31"]');
  assert.equal(await value(page, '#dp-3'), 'Oct 31, 2026');
  assert.ok(!(await page.visible('#dp-3-pop')));
});
