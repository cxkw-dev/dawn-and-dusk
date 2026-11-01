/* Chart: keyboard, touch and table view for .dd-chart. Opt in with [data-dd-chart] on the .dd-chart figure.
   Marks — .dd-chart__slot (columns), .dd-chart__hit (line/area points), .dd-chart__seg (100% bar), .dd-chart__arc (donut)
   or anything with [data-dd-chart-point] — become ONE tab stop per group of siblings (roving tabindex):
     ← → (↑ ↓) step through the marks, Home / End jump to the ends, Esc hides the tooltip until the next move.
   The mark under the pointer, finger or keyboard focus gets .is-active, which shows its tooltip: the .dd-chart__tip
   inside it, or — for marks without one — a floating tip built from data-dd-chart-label / data-dd-chart-value
   (plus the mark's series class). Tapping a mark on a touch screen shows its tooltip; tapping elsewhere hides it.
   Tooltips flip to whichever side has room.
   View as table: a button [data-dd-chart-view] (aria-controls = the table container, or the figure's .dd-chart__data)
   swaps the plot for its data table and back; aria-pressed and .is-table on the figure follow. A plain
   <details class="dd-chart__data"> needs no script. Fires `dd:change` on the figure with { view: 'chart' | 'table' }.
   Expand: a button [data-dd-chart-expand] moves the figure into a large modal dialog (.dd-chart-dialog), leaving a
   placeholder of the same height, and moves it back when the dialog closes (Esc, backdrop, or the button again); focus
   returns to the button. Fires `dd:change` with { expanded: true | false }: expanded: true just before the figure
   leaves the page, expanded: false once it is back, so both reach listeners on its container. In between the figure
   sits in the dialog at the end of <body>: events from it then (a Table toggle) reach the figure itself and document,
   not its old container. The figure itself moves, so keep it out of framework-owned markup (render your own dialog
   there). */
(() => {
  const MARK = '.dd-chart__slot, .dd-chart__hit, .dd-chart__seg, .dd-chart__arc, [data-dd-chart-point]';
  const chartOf = (el) => el.closest('[data-dd-chart]');
  const markOf = (el) => {
    const m = el instanceof Element ? el.closest(MARK) : null;
    return m && chartOf(m) ? m : null;
  };
  const marksIn = (group) => [...group.children].filter((c) => c.matches(MARK));

  // Roving tabindex: one stop per group; it stays on the last mark used.
  const initGroup = (group, current) => {
    const marks = marksIn(group);
    const cur = current || marks.find((m) => m.tabIndex === 0 && m.dataset.ddChartRoved) || marks[0];
    for (const m of marks) { m.tabIndex = m === cur ? 0 : -1; m.dataset.ddChartRoved = ''; }
  };
  const init = (root = document) => {
    const groups = new Set();
    root.querySelectorAll('[data-dd-chart]').forEach((c) => c.querySelectorAll(MARK).forEach((m) => groups.add(m.parentElement)));
    groups.forEach((g) => initGroup(g));
  };

  // Floating tip for marks that carry their data in attributes.
  const floatTip = (chart) => {
    let tip = chart.querySelector(':scope > .dd-chart__tip--float');
    if (!tip) {
      tip = document.createElement('div');
      tip.className = 'dd-chart__tip dd-chart__tip--float';
      tip.setAttribute('aria-hidden', 'true');
      chart.append(tip);
    }
    return tip;
  };
  // Where a mark's floating tip points: an arc's midpoint on the ring (with the outward direction), otherwise the
  // top centre of the mark (pointing up).
  const anchor = (mark) => {
    if (mark.matches('.dd-chart__arc')) {
      const svg = mark.ownerSVGElement.getBoundingClientRect();
      const [len] = (mark.getAttribute('stroke-dasharray') || '0').split(/[\s,]+/).map(Number);
      const off = -Number(mark.getAttribute('stroke-dashoffset') || 0);
      const total = Number(mark.getAttribute('pathLength') || 100);
      const a = ((off + len / 2) / total) * 2 * Math.PI; // 0 = 12 o'clock (the SVG is turned -90deg), clockwise
      const r = svg.width / 2;
      return { x: svg.left + r + Math.sin(a) * r, y: svg.top + r - Math.cos(a) * r, dx: Math.sin(a), dy: -Math.cos(a) };
    }
    const b = mark.getBoundingClientRect();
    return { x: b.left + b.width / 2, y: b.top, dx: 0, dy: -1 };
  };
  const showFloat = (chart, mark) => {
    const tip = floatTip(chart);
    const series = [...mark.classList].find((c) => /^dd-chart-(s\d|other)$/.test(c)) || '';
    tip.replaceChildren();
    const title = mark.dataset.ddChartTitle;
    if (title) { const t = document.createElement('p'); t.className = 'dd-chart__tip-title'; t.textContent = title; tip.append(t); }
    const row = document.createElement('p');
    row.className = `dd-chart__tip-row ${series}`.trim();
    row.append(mark.dataset.ddChartLabel || mark.getAttribute('aria-label') || '');
    if (mark.dataset.ddChartValue) { const b = document.createElement('b'); b.textContent = mark.dataset.ddChartValue; row.append(b); }
    tip.append(row);
    const box = chart.getBoundingClientRect();
    const p = anchor(mark);
    const w = tip.offsetWidth, h = tip.offsetHeight, gap = 8;
    // Centre the tip just outside the mark along its direction, then keep it inside the card.
    let x = p.x - box.left - w / 2 + p.dx * (w / 2 + gap);
    let y = p.y - box.top - h / 2 + p.dy * (h / 2 + gap);
    if (box.top + y < 0) y = p.y - box.top + gap * 2; // no room above in the viewport: open below
    x = Math.min(Math.max(x, 0), Math.max(box.width - w, 0));
    tip.style.left = `${Math.round(x)}px`;
    tip.style.top = `${Math.round(y)}px`;
    tip.classList.add('is-open');
  };
  const hideFloat = (chart) => chart.querySelector(':scope > .dd-chart__tip--float')?.classList.remove('is-open');

  // Inner tips (slots, hits) open beside their mark: the authored side if it fits in the card, else the other side,
  // else (narrow cards) above the plot, centred on the mark and clamped to the card.
  const placeInner = (mark) => {
    const tip = mark.querySelector(':scope > .dd-chart__tip');
    if (!tip) return;
    if (mark.dataset.ddChartFlip === undefined) mark.dataset.ddChartFlip = mark.classList.contains('is-flip') ? 'authored' : '';
    const authored = mark.dataset.ddChartFlip === 'authored';
    tip.style.left = tip.style.right = tip.style.top = tip.style.bottom = '';
    const card = chartOf(mark).getBoundingClientRect();
    const lo = Math.max(card.left, 0), hi = Math.min(card.right, document.documentElement.clientWidth);
    const fits = () => { const r = tip.getBoundingClientRect(); return r.left >= lo && r.right <= hi; };
    mark.classList.toggle('is-flip', authored);
    if (fits()) return;
    mark.classList.toggle('is-flip', !authored);
    if (fits()) return;
    mark.classList.toggle('is-flip', authored);
    const m = mark.getBoundingClientRect(), w = tip.offsetWidth;
    const x = Math.min(Math.max(m.left + m.width / 2 - w / 2, lo + 4), hi - w - 4);
    tip.style.left = `${Math.round(x - m.left)}px`;
    tip.style.right = 'auto';
    tip.style.top = 'auto'; // above the plot, so it doesn't sit on the mark under your finger
    tip.style.bottom = 'calc(100% + 6px)';
  };

  const deactivate = (chart) => {
    chart.querySelectorAll('.is-active').forEach((m) => { if (m.matches(MARK)) m.classList.remove('is-active', 'is-tip-off'); });
    hideFloat(chart);
  };
  const activate = (mark) => {
    const chart = chartOf(mark);
    chart.querySelectorAll('.is-active, .is-tip-off').forEach((m) => { if (m !== mark && m.matches(MARK)) m.classList.remove('is-active', 'is-tip-off'); });
    mark.classList.remove('is-tip-off');
    mark.classList.add('is-active');
    if (mark.querySelector(':scope > .dd-chart__tip')) { hideFloat(chart); placeInner(mark); }
    else if (mark.dataset.ddChartLabel || mark.dataset.ddChartValue) showFloat(chart, mark);
  };

  document.addEventListener('pointerover', (e) => {
    if (e.pointerType === 'touch') return; // touch goes through focus (tap) instead
    const mark = markOf(e.target);
    if (mark && !mark.classList.contains('is-active')) activate(mark);
  });
  document.addEventListener('pointerout', (e) => {
    if (e.pointerType === 'touch') return;
    const mark = markOf(e.target);
    if (!mark || (e.relatedTarget && mark.contains(e.relatedTarget))) return;
    if (document.activeElement === mark && mark.matches(':focus-visible')) return; // keyboard owns it
    const chart = chartOf(mark);
    mark.classList.remove('is-active', 'is-tip-off');
    if (!chart.querySelector('.is-active')) hideFloat(chart);
  });
  document.addEventListener('focusin', (e) => {
    const mark = markOf(e.target);
    if (!mark) return;
    if (!mark.dataset.ddChartRoved) initGroup(mark.parentElement, mark);
    else for (const m of marksIn(mark.parentElement)) m.tabIndex = m === mark ? 0 : -1;
    activate(mark);
  });
  document.addEventListener('focusout', (e) => {
    const mark = markOf(e.target);
    if (!mark) return;
    const to = e.relatedTarget && markOf(e.relatedTarget);
    if (to && chartOf(to) === chartOf(mark)) return;
    if (mark.matches(':hover')) { mark.classList.remove('is-tip-off'); return; }
    deactivate(chartOf(mark));
  });
  // Touch: a tap opens the mark's tip (and focuses it natively, via tabindex); a tap anywhere else closes it.
  document.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'touch') return;
    const mark = markOf(e.target);
    if (mark) activate(mark);
    document.querySelectorAll('[data-dd-chart]').forEach((c) => { if (!mark || chartOf(mark) !== c) deactivate(c); });
  });

  document.addEventListener('keydown', (e) => {
    const mark = markOf(e.target);
    if (!mark || e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key === 'Escape') {
      if (!mark.classList.contains('is-active') || mark.classList.contains('is-tip-off')) return;
      e.preventDefault();
      mark.classList.add('is-tip-off');
      hideFloat(chartOf(mark));
      return;
    }
    const marks = marksIn(mark.parentElement);
    const k = marks.indexOf(mark);
    const next = { ArrowRight: k + 1, ArrowDown: k + 1, ArrowLeft: k - 1, ArrowUp: k - 1, Home: 0, End: marks.length - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const to = marks[Math.max(0, Math.min(marks.length - 1, next))];
    if (to !== mark) to.focus({ preventScroll: true }); else activate(mark); // at an end: bring the tip back after Esc
  });

  // View as table.
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-dd-chart-view]');
    if (!btn) return;
    const chart = btn.closest('.dd-chart');
    if (!chart) return;
    const id = btn.getAttribute('aria-controls');
    const table = (id && document.getElementById(id)) || chart.querySelector('.dd-chart__data');
    if (!table) return;
    const on = btn.getAttribute('aria-pressed') !== 'true';
    btn.setAttribute('aria-pressed', String(on));
    chart.classList.toggle('is-table', on);
    table.hidden = !on; // the plot itself is hidden by CSS (.is-table)
    deactivate(chart);
    chart.dispatchEvent(new CustomEvent('dd:change', { bubbles: true, detail: { view: on ? 'table' : 'chart' } }));
  });

  // Expand: the figure moves into one shared dialog and comes back on close (Esc, backdrop, or the button again).
  let expandDialog = null;
  const dialogFor = () => {
    if (expandDialog?.isConnected) return expandDialog;
    expandDialog = document.createElement('dialog');
    expandDialog.className = 'dd-dialog dd-chart-dialog';
    document.body.append(expandDialog);
    return expandDialog;
  };
  const collapse = (dlg) => {
    const chart = dlg.querySelector(':scope > .dd-chart.is-expanded');
    const spot = chart?.ddPlaceholder;
    if (!chart) return;
    if (spot?.isConnected) spot.replaceWith(chart); else chart.remove();
    chart.ddPlaceholder = null;
    chart.classList.remove('is-expanded');
    deactivate(chart);
    const btn = chart.querySelector('[data-dd-chart-expand]');
    if (btn) { btn.setAttribute('aria-label', btn.dataset.ddLabel || 'Expand chart'); if (chart.isConnected) btn.focus({ preventScroll: true }); }
    chart.dispatchEvent(new CustomEvent('dd:change', { bubbles: true, detail: { expanded: false } }));
  };
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-dd-chart-expand]');
    const chart = btn?.closest('.dd-chart');
    if (!chart) return;
    const dlg = dialogFor();
    if (chart.classList.contains('is-expanded')) {
      if (window.dd?.dialog) window.dd.dialog.close(dlg); else dlg.close();
      return;
    }
    const spot = document.createElement('div');
    spot.className = 'dd-chart__placeholder';
    spot.setAttribute('aria-hidden', 'true');
    spot.style.height = `${chart.offsetHeight}px`;
    deactivate(chart);
    // Announced while the figure is still in place, so it reaches listeners on its container (collapse announces once
    // it is back): in the dialog at the end of <body> it is out of their reach.
    chart.dispatchEvent(new CustomEvent('dd:change', { bubbles: true, detail: { expanded: true } }));
    chart.replaceWith(spot);
    chart.ddPlaceholder = spot;
    chart.classList.add('is-expanded');
    btn.dataset.ddLabel = btn.dataset.ddLabel || btn.getAttribute('aria-label') || 'Expand chart';
    btn.setAttribute('aria-label', 'Close expanded chart');
    dlg.setAttribute('aria-label', chart.querySelector('.dd-chart__title')?.textContent.trim() || 'Chart');
    // A chart in a section with its own data-theme keeps that theme in the dialog (which lives at the end of <body>).
    const scope = spot.parentElement?.closest('[data-theme]');
    if (scope && scope !== document.documentElement) dlg.dataset.theme = scope.dataset.theme; else delete dlg.dataset.theme;
    dlg.replaceChildren(chart);
    if (window.dd?.dialog) window.dd.dialog.open(dlg); else dlg.showModal();
    btn.focus({ preventScroll: true });
  });
  // Capture, so the figure is back in the page before the dialog behaviour returns focus to its button.
  document.addEventListener('close', (e) => { if (e.target === expandDialog) collapse(expandDialog); }, true);

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => init());
  else init();
})();
