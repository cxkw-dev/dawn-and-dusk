/* Calendar + date picker.
   Calendar: [data-dd-calendar] on a .dd-calendar with data-month="YYYY-MM", data-today, data-week-start (1 = Monday,
   default; 0 = Sunday), data-min / data-max (YYYY-MM-DD), data-mode="single" (data-value) or "range"
   (data-start / data-end). The script renders the month body, moves months ([data-dd-cal-nav="-1|1"]), selects days
   and supports ← → ↑ ↓, Page Up / Down (month), Home / End (week). Fires bubbling "dd:date" and legacy "dd-date" events with
   detail { value } or { start, end }.
   Date picker: [data-dd-date-picker] wraps a .dd-input (with a [data-dd-date-toggle] button) and a
   .dd-date-picker__popover holding a calendar. Choosing a day fills the input and closes; a range closes on its
   second click unless the popover has [data-dd-date-apply]. [data-start][data-end] or [data-days="7"] buttons with
   .dd-date-picker__preset set a range. Esc, the toggle, a click outside or tabbing out closes without changes (a range
   picked but not applied goes back). Single mode parses a typed date on change: YYYY-MM-DD (or YYYY-MM, the 1st) is a
   local day, anything else goes through Date.parse with data-today's year when none is typed ("Oct 14", "12/1"); a day
   the month doesn't have ("2026-02-31") is invalid, not rolled over. */
(() => {
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const DOW = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];
  const DOW_LONG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const pad = (n) => String(n).padStart(2, '0');
  const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const parse = (s) => { if (!s) return null; const [y, m, d] = s.split('-').map(Number); return y ? new Date(y, (m || 1) - 1, d || 1) : null; };
  const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
  const short = (d, year = true) => d.toLocaleDateString('en-US', year ? { month: 'short', day: 'numeric', year: 'numeric' } : { month: 'short', day: 'numeric' });
  const span = (a, b) => Math.round((b - a) / 864e5) + 1;
  const rangeText = (a, b) => (a.getFullYear() === b.getFullYear() ? `${short(a, false)} – ${short(b)}` : `${short(a)} – ${short(b)}`);

  // ---------- calendar ----------
  const state = (cal) => {
    const d = cal.dataset;
    const today = d.today || iso(new Date());
    return {
      month: parse(d.month || (d.value || d.start || today).slice(0, 7)),
      today, ws: Number(d.weekStart ?? 1), mode: d.mode || 'single',
      value: d.value || '', start: d.start || '', end: d.end || '', min: d.min || '', max: d.max || '',
    };
  };

  const cellClass = (s, day, hover) => {
    if (s.mode !== 'range' || !s.start) return '';
    let a = s.start; let b = s.end || hover || '';
    if (!b) return day === a ? 'is-range-start is-range-end' : '';
    if (b < a) [a, b] = [b, a];
    const preview = !s.end ? ' is-preview' : '';
    if (day === a && day === b) return 'is-range-start is-range-end';
    if (day === a) return `is-range-start${preview}`;
    if (day === b) return `is-range-end${preview}`;
    return day > a && day < b ? `is-in-range${preview}` : '';
  };

  const render = (cal) => {
    const s = state(cal);
    const first = new Date(s.month.getFullYear(), s.month.getMonth(), 1);
    const lead = (first.getDay() - s.ws + 7) % 7;
    const start = addDays(first, -lead);
    const inMonth = (d) => d.getMonth() === first.getMonth();
    // Roving tabindex: selected day, else today, else the 1st — whichever is in this month.
    const ym = iso(first).slice(0, 7);
    const allowed = (v) => !(s.min && v < s.min) && !(s.max && v > s.max);
    const anchors = [s.value, s.start, s.today].filter((v) => v && v.slice(0, 7) === ym && allowed(v));
    // …or the 1st, or data-min when the month starts before it.
    let focusDay = anchors[0] || iso(first);
    if (!allowed(focusDay) && s.min && s.min.slice(0, 7) === ym) focusDay = s.min;
    let rows = '';
    for (let w = 0; w < 6; w++) {
      rows += '<tr>';
      for (let k = 0; k < 7; k++) {
        const d = addDays(start, w * 7 + k);
        const day = iso(d);
        const pressed = s.mode === 'range' ? day === s.start || day === s.end : day === s.value;
        const off = (s.min && day < s.min) || (s.max && day > s.max);
        const cls = cellClass(s, day);
        rows += `<td${cls ? ` class="${cls}"` : ''}><button class="dd-calendar__day${inMonth(d) ? '' : ' is-outside'}" type="button" data-date="${day}" tabindex="${day === focusDay ? 0 : -1}" aria-pressed="${pressed}"${day === s.today ? ' aria-current="date"' : ''}${off ? ' disabled' : ''}>${d.getDate()}</button></td>`;
      }
      rows += '</tr>';
    }
    const title = cal.querySelector('.dd-calendar__title');
    if (title) title.innerHTML = `${MONTHS[first.getMonth()]} <span>${first.getFullYear()}</span>`;
    const grid = cal.querySelector('.dd-calendar__grid');
    if (!grid) return;
    grid.setAttribute('aria-label', `${MONTHS[first.getMonth()]} ${first.getFullYear()}`);
    const head = `<tr>${Array.from({ length: 7 }, (_, k) => { const n = (s.ws + k) % 7; return `<th scope="col" abbr="${DOW_LONG[n]}">${DOW[n]}</th>`; }).join('')}</tr>`;
    if (!grid.tHead) grid.createTHead();
    if (grid.tHead.innerHTML !== head) grid.tHead.innerHTML = head;
    const body = grid.tBodies[0] || grid.createTBody();
    body.innerHTML = rows;
  };

  const paintHover = (cal, hover) => {
    const s = state(cal);
    if (s.mode !== 'range' || !s.start || s.end) return;
    cal.querySelectorAll('.dd-calendar__day').forEach((b) => {
      const td = b.parentElement;
      const cls = cellClass(s, b.dataset.date, hover);
      td.className = cls;
    });
  };

  const emit = (cal) => {
    const s = state(cal);
    const detail = s.mode === 'range' ? { start: s.start, end: s.end } : { value: s.value };
    cal.dispatchEvent(new CustomEvent('dd-date', { bubbles: true, detail }));
    cal.dispatchEvent(new CustomEvent('dd:date', { bubbles: true, detail }));
  };

  const pick = (cal, day) => {
    const d = cal.dataset;
    if ((d.mode || 'single') === 'range') {
      if (!d.start || d.end) { d.start = day; d.end = ''; }
      else if (day < d.start) { d.end = d.start; d.start = day; }
      else d.end = day;
    } else d.value = day;
    d.month = day.slice(0, 7);
    render(cal);
    cal.querySelector(`[data-date="${day}"]`)?.focus();
    emit(cal);
  };

  const shiftMonth = (cal, n) => {
    const m = state(cal).month;
    cal.dataset.month = iso(new Date(m.getFullYear(), m.getMonth() + n, 1)).slice(0, 7);
    render(cal);
  };

  const sameDay = (d, n) => new Date(d.getFullYear(), d.getMonth() + n, Math.min(d.getDate(), new Date(d.getFullYear(), d.getMonth() + n + 1, 0).getDate()));

  const focusDate = (cal, d) => {
    const { min, max } = cal.dataset;
    let day = iso(d);
    // Arrows stop at data-min / data-max instead of landing on a day that can't be chosen.
    if (min && day < min) day = min;
    if (max && day > max) day = max;
    if (!cal.querySelector(`[data-date="${day}"]:not(.is-outside)`)) { cal.dataset.month = day.slice(0, 7); render(cal); }
    const btn = cal.querySelector(`[data-date="${day}"]`);
    if (!btn) return;
    cal.querySelectorAll('.dd-calendar__day[tabindex="0"]').forEach((b) => { b.tabIndex = -1; });
    btn.tabIndex = 0;
    btn.focus();
    // Picking a range by keyboard previews it like hovering does.
    if (cal.dataset.mode === 'range' && cal.dataset.start && !cal.dataset.end) { cal.dataset.ddHover = day; paintHover(cal, day); }
  };

  // ---------- picker ----------
  const pickerParts = (root) => ({
    input: root.querySelector('.dd-input__control'),
    toggle: root.querySelector('[data-dd-date-toggle]'),
    pop: root.querySelector('.dd-date-picker__popover'),
    cal: root.querySelector('[data-dd-calendar]'),
  });

  const summarise = (root) => {
    const { cal } = pickerParts(root);
    const out = root.querySelector('.dd-date-picker__summary');
    if (!cal || !out) return;
    const s = state(cal);
    const a = parse(s.start); const b = parse(s.end);
    out.textContent = a && b ? `${rangeText(a, b)} · ${span(a, b)} day${span(a, b) === 1 ? '' : 's'}` : a ? `${short(a)} – pick an end date` : 'Pick a start date';
  };

  const commit = (root) => {
    const { input, cal } = pickerParts(root);
    const s = state(cal);
    if (s.mode === 'range') {
      const a = parse(s.start); const b = parse(s.end);
      if (!a || !b) return false;
      input.value = rangeText(a, b);
    } else {
      const v = parse(s.value);
      if (!v) return false;
      input.value = short(v);
    }
    input.removeAttribute('aria-invalid');
    const hidden = root.querySelector('input[type="hidden"]');
    if (hidden) hidden.value = s.mode === 'range' ? `${s.start}/${s.end}` : s.value;
    input.dispatchEvent(new Event('change', { bubbles: true }));
    return true;
  };

  // Keep an open popover inside the viewport: nudge it left when it would run off the right edge.
  const place = (root) => {
    const { pop } = pickerParts(root);
    if (!pop || pop.hidden || pop.classList.contains('dd-date-picker__popover--static')) return;
    pop.style.translate = '';
    const r = pop.getBoundingClientRect();
    const over = r.right - (document.documentElement.clientWidth - 8);
    if (over > 0) pop.style.translate = `${-Math.min(over, Math.max(0, r.left - 8))}px 0`;
    // On narrow screens the presets become a scrolling row: bring the active one into view.
    const row = pop.querySelector('.dd-date-picker__presets'); const on = row?.querySelector('[aria-pressed="true"]');
    if (row && on && row.scrollWidth > row.clientWidth) row.scrollLeft = on.offsetLeft - row.offsetLeft - (row.clientWidth - on.offsetWidth) / 2;
  };

  // What Esc, Cancel or a click outside goes back to: the calendar's value and the pressed preset.
  const save = (root) => {
    const { cal } = pickerParts(root);
    if (!cal) return;
    const presets = [...root.querySelectorAll('.dd-date-picker__preset')];
    root.dataset.ddSaved = JSON.stringify({ value: cal.dataset.value, start: cal.dataset.start, end: cal.dataset.end, preset: presets.findIndex((p) => p.getAttribute('aria-pressed') === 'true') });
  };

  const openPicker = (root) => {
    const { toggle, pop, cal, input } = pickerParts(root);
    if (!pop || input?.disabled) return;
    document.querySelectorAll('[data-dd-date-picker].is-open').forEach((r) => r !== root && closePicker(r, false, true));
    pop.hidden = false;
    root.classList.add('is-open');
    toggle?.setAttribute('aria-expanded', 'true');
    if (cal) {
      save(root);
      const s = state(cal);
      const sel = s.value || s.start;
      if (sel) cal.dataset.month = sel.slice(0, 7);
      render(cal);
      summarise(root);
    }
    place(root);
    cal?.querySelector('.dd-calendar__day[tabindex="0"]')?.focus();
  };

  const closePicker = (root, refocus = true, revert = false) => {
    const { toggle, pop, cal } = pickerParts(root);
    if (!pop || pop.hidden) return;
    if (revert && cal && root.dataset.ddSaved) {
      const saved = JSON.parse(root.dataset.ddSaved);
      for (const k of ['value', 'start', 'end']) { if (saved[k] === undefined) delete cal.dataset[k]; else cal.dataset[k] = saved[k]; }
      root.querySelectorAll('.dd-date-picker__preset').forEach((p, n) => p.setAttribute('aria-pressed', String(n === saved.preset)));
    }
    pop.hidden = true;
    root.classList.remove('is-open');
    toggle?.setAttribute('aria-expanded', 'false');
    if (refocus) (toggle || pickerParts(root).input)?.focus();
  };

  document.addEventListener('click', (e) => {
    const t = e.target;
    const root = t.closest('[data-dd-date-picker]');
    document.querySelectorAll('[data-dd-date-picker].is-open').forEach((r) => r !== root && closePicker(r, false, true));

    const nav = t.closest('[data-dd-cal-nav]');
    if (nav) { const cal = nav.closest('[data-dd-calendar]'); if (cal) shiftMonth(cal, Number(nav.dataset.ddCalNav)); return; }

    const dayBtn = t.closest('.dd-calendar__day');
    if (dayBtn && !dayBtn.disabled) {
      const cal = dayBtn.closest('[data-dd-calendar]');
      if (!cal) return;
      pick(cal, dayBtn.dataset.date);
      if (root) {
        root.querySelectorAll('.dd-date-picker__preset[aria-pressed="true"]').forEach((p) => p.setAttribute('aria-pressed', 'false'));
        summarise(root);
        const s = state(cal);
        const done = s.mode === 'range' ? s.start && s.end : s.value;
        if (done && !root.querySelector('[data-dd-date-apply]')) { commit(root); closePicker(root, false); pickerParts(root).input?.focus(); }
      }
      return;
    }

    if (!root) return;
    const preset = t.closest('.dd-date-picker__preset');
    if (preset) {
      const { cal } = pickerParts(root);
      if (!cal) return;
      let { start, end } = preset.dataset;
      if (preset.dataset.days) {
        const today = parse(cal.dataset.today || iso(new Date()));
        end = iso(today);
        start = iso(addDays(today, -(Number(preset.dataset.days) - 1)));
      }
      Object.assign(cal.dataset, { start, end, month: end.slice(0, 7) });
      render(cal);
      root.querySelectorAll('.dd-date-picker__preset').forEach((p) => p.setAttribute('aria-pressed', String(p === preset)));
      summarise(root);
      emit(cal);
      if (!root.querySelector('[data-dd-date-apply]')) { commit(root); closePicker(root, false); pickerParts(root).input?.focus(); }
      return;
    }
    if (t.closest('[data-dd-date-toggle]') || (t.matches('.dd-input__control') && t.readOnly)) {
      // Closing from the toggle drops what wasn't applied, like Esc; otherwise it would become the next baseline.
      if (pickerParts(root).pop.hidden) openPicker(root); else closePicker(root, true, true);
      return;
    }
    if (t.closest('[data-dd-date-apply]')) { if (commit(root)) closePicker(root); return; }
    if (t.closest('[data-dd-date-cancel]')) { closePicker(root, true, true); }
  });

  document.addEventListener('mouseover', (e) => {
    const b = e.target.closest?.('.dd-calendar__day');
    const cal = b?.closest('[data-dd-calendar][data-mode="range"]');
    if (cal && !b.disabled && cal.dataset.ddHover !== b.dataset.date) { cal.dataset.ddHover = b.dataset.date; paintHover(cal, b.dataset.date); }
  });

  document.addEventListener('keydown', (e) => {
    const root = e.target.closest?.('[data-dd-date-picker]');
    if (e.key === 'Escape' && root && !pickerParts(root).pop?.hidden) { e.preventDefault(); closePicker(root, true, true); return; }
    if (root && e.target === pickerParts(root).input && e.key === 'ArrowDown' && (e.altKey || pickerParts(root).pop?.hidden)) {
      e.preventDefault(); openPicker(root); return;
    }
    const b = e.target.closest?.('.dd-calendar__day');
    const cal = b?.closest('[data-dd-calendar]');
    if (!cal) return; // a calendar without the hook is the page's own (a framework renders it)
    const d = parse(b.dataset.date);
    const ws = Number(cal.dataset.weekStart ?? 1);
    const moves = {
      ArrowLeft: () => addDays(d, -1), ArrowRight: () => addDays(d, 1), ArrowUp: () => addDays(d, -7), ArrowDown: () => addDays(d, 7),
      // Same day of the previous / next month, or its last day when the month is shorter (Jan 31 → Feb 28).
      PageUp: () => sameDay(d, -1), PageDown: () => sameDay(d, 1),
      Home: () => addDays(d, -((d.getDay() - ws + 7) % 7)), End: () => addDays(d, 6 - ((d.getDay() - ws + 7) % 7)),
    };
    if (moves[e.key]) { e.preventDefault(); focusDate(cal, moves[e.key]()); }
  });

  // Tabbing out of an open picker closes it like a click outside (pending range changes are dropped).
  document.addEventListener('focusout', (e) => {
    const root = e.target.closest?.('[data-dd-date-picker].is-open');
    if (root && e.relatedTarget && !root.contains(e.relatedTarget)) closePicker(root, false, true);
  });

  // Typed text → a local day ("YYYY-MM-DD"), or '' when it isn't a real date. YYYY-MM(-DD) is read as a local day
  // (Date.parse would take it as UTC midnight, the day before west of Greenwich); anything else goes through Date.parse,
  // with `year` added when none was typed ("Oct 14" alone would be 2001). A day past the month's end is refused rather
  // than rolled into the next month ("2026-02-31", "Feb 31, 2026" are not Mar 3).
  const readDate = (text, year) => {
    const m = text.match(/^(\d{4})-(\d{1,2})(?:-(\d{1,2}))?$/);
    if (m) {
      const [y, mo, d] = [+m[1], +m[2] - 1, +(m[3] || 1)];
      const v = new Date(y, mo, d);
      return v.getFullYear() === y && v.getMonth() === mo && v.getDate() === d ? iso(v) : '';
    }
    const hasYear = /\d{4}/.test(text) || /^\d{1,2}([/.-])\d{1,2}\1\d{2}$/.test(text); // or M/D/YY
    const t = Date.parse(hasYear ? text : `${text} ${year}`);
    if (Number.isNaN(t)) return '';
    const v = new Date(t);
    // Rolled over: the month it landed in is neither named nor numbered in what was typed.
    const named = text.toLowerCase().includes(MONTHS[v.getMonth()].slice(0, 3).toLowerCase());
    return named || (text.match(/\d+/g) || []).map(Number).includes(v.getMonth() + 1) ? iso(v) : '';
  };

  // Typed dates move the calendar (see readDate). A date outside data-min / data-max, or text that isn't a date, marks
  // the field invalid; clearing the field clears the value.
  document.addEventListener('change', (e) => {
    const root = e.target.closest?.('[data-dd-date-picker]');
    if (!root || e.target !== pickerParts(root).input || !e.isTrusted) return;
    const { cal } = pickerParts(root);
    if (!cal || (cal.dataset.mode || 'single') === 'range') return;
    const text = e.target.value.trim();
    const hidden = root.querySelector('input[type="hidden"]');
    if (!text) {
      e.target.removeAttribute('aria-invalid');
      if (!cal.dataset.value) return;
      delete cal.dataset.value;
      if (hidden) hidden.value = '';
      render(cal); emit(cal);
      return;
    }
    const v = readDate(text, (cal.dataset.today || iso(new Date())).slice(0, 4));
    if (!v) { e.target.setAttribute('aria-invalid', 'true'); return; }
    const { min, max } = cal.dataset;
    if ((min && v < min) || (max && v > max)) { e.target.setAttribute('aria-invalid', 'true'); return; }
    e.target.removeAttribute('aria-invalid');
    Object.assign(cal.dataset, { value: v, month: v.slice(0, 7) });
    if (hidden) hidden.value = v;
    render(cal);
    e.target.value = short(parse(v));
    emit(cal);
  });

  const placeOpen = () => document.querySelectorAll('[data-dd-date-picker].is-open').forEach(place);
  addEventListener('resize', placeOpen);
  const init = () => {
    document.querySelectorAll('[data-dd-calendar]').forEach((c) => render(c));
    // A picker rendered open has nothing saved yet: remember its state now, so closing it without applying restores it.
    document.querySelectorAll('[data-dd-date-picker]').forEach((r) => { const { pop } = pickerParts(r); if (pop && !pop.hidden) save(r); });
    placeOpen();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
