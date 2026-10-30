/* Guide cue: a short onboarding tour, one cue per step.
     <button data-dd-guide-start="deploys">Take the tour</button>
     <div class="dd-guide-cue" popover="manual" role="dialog" aria-labelledby="…"
          data-dd-guide="deploys" data-dd-guide-target="#new-deploy" data-dd-placement="bottom">
       <span class="dd-guide-cue__arrow"></span>
       <p class="dd-guide-cue__step"></p>            ← filled with "1 of 3" (or its .dd-guide-cue__count; empty
                                                     .dd-guide-cue__pips get one pip per step)
       <h3 class="dd-guide-cue__title">…</h3> <p class="dd-guide-cue__text">…</p>
       <div class="dd-guide-cue__actions"><button data-dd-guide-dismiss>Skip tour</button><button data-dd-guide-next>Next</button></div>
     </div>
   Steps run in document order. Next on the last step finishes the tour; Esc or [data-dd-guide-dismiss] ends it early.
   Each step scrolls its target into view, rings it, drops a beacon on it and points the arrow at it. Focus moves to
   the cue and returns to the start button at the end. Events on document: "dd:guide-step" (detail.index) and
   "dd:guide-end" (detail.completed). From code: dd.guide.start(name, trigger) · dd.guide.next() · dd.guide.end(). */
(() => {
  let tour = null;
  const still = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Place a fixed element beside an anchor: flip to the other side if it doesn't fit, keep it 8px inside the
  // viewport and aim --dd-arrow-x / --dd-arrow-y at the anchor's centre.
  const place = (el, anchor, want = 'bottom', gap = 14) => {
    let [side, align = 'center'] = want.split('-');
    const a = anchor.getBoundingClientRect();
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    const vw = document.documentElement.clientWidth;
    const vh = window.innerHeight;
    const m = 8;
    const room = { top: a.top - gap - h >= m, bottom: a.bottom + gap + h <= vh - m, left: a.left - gap - w >= m, right: a.right + gap + w <= vw - m };
    const flip = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' };
    if (!room[side]) side = room[flip[side]] ? flip[side] : (side === 'left' || side === 'right') ? (room.bottom ? 'bottom' : 'top') : side;
    let x;
    let y;
    if (side === 'top' || side === 'bottom') {
      y = side === 'top' ? a.top - gap - h : a.bottom + gap;
      x = align === 'start' ? a.left : align === 'end' ? a.right - w : a.left + a.width / 2 - w / 2;
      x = Math.min(Math.max(x, m), vw - w - m);
      el.style.setProperty('--dd-arrow-x', `${Math.min(Math.max(a.left + a.width / 2 - x, 16), w - 16)}px`);
    } else {
      x = side === 'left' ? a.left - gap - w : a.right + gap;
      y = align === 'start' ? a.top : align === 'end' ? a.bottom - h : a.top + a.height / 2 - h / 2;
      y = Math.min(Math.max(y, m), vh - h - m);
      el.style.setProperty('--dd-arrow-y', `${Math.min(Math.max(a.top + a.height / 2 - y, 16), h - 16)}px`);
    }
    el.style.left = `${Math.round(x)}px`;
    el.style.top = `${Math.round(y)}px`;
    el.dataset.placement = align === 'center' ? side : `${side}-${align}`;
  };

  const targetOf = (cue) => document.querySelector(cue.dataset.ddGuideTarget || '');
  const showCue = (cue) => { if (cue.showPopover) { if (!cue.matches(':popover-open')) cue.showPopover(); } else cue.hidden = false; };
  const hideCue = (cue) => { if (cue.hidePopover) { if (cue.matches(':popover-open')) cue.hidePopover(); } else cue.hidden = true; };

  const layout = () => {
    if (!tour) return;
    const cue = tour.steps[tour.i];
    const target = cue && targetOf(cue);
    if (!target) return;
    place(cue, target, cue.dataset.ddPlacement || 'bottom');
    const r = target.getBoundingClientRect();
    tour.beacon.style.left = `${Math.round(r.right - 2)}px`;
    tour.beacon.style.top = `${Math.round(r.top + 2)}px`;
  };

  const go = (i) => {
    if (!tour) return;
    const prev = tour.steps[tour.i];
    if (prev) { hideCue(prev); targetOf(prev)?.removeAttribute('data-dd-guide-active'); }
    const cue = tour.steps[i];
    if (!cue) return end(true);
    tour.i = i;
    const target = targetOf(cue);
    if (!target) return go(i + 1);
    const step = cue.querySelector('.dd-guide-cue__step');
    const count = cue.querySelector('.dd-guide-cue__count') || (step && !step.children.length ? step : null);
    if (count) count.textContent = `${i + 1} of ${tour.steps.length}`;
    const pips = cue.querySelector('.dd-guide-cue__pips');
    if (pips) pips.replaceChildren(...tour.steps.map((_, k) => Object.assign(document.createElement('i'), { className: k < i ? 'is-done' : k === i ? 'is-current' : '' })));
    if (!cue.hasAttribute('tabindex')) cue.setAttribute('tabindex', '-1');
    target.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: still() ? 'auto' : 'smooth' });
    target.setAttribute('data-dd-guide-active', '');
    const scope = target.closest('[data-theme]');
    if (scope && scope !== document.documentElement) tour.beacon.dataset.theme = scope.dataset.theme;
    showCue(cue);
    layout();
    // Smooth scrolling may still be moving the target; settle the position once it stops.
    setTimeout(layout, 350);
    cue.focus({ preventScroll: true });
    document.dispatchEvent(new CustomEvent('dd:guide-step', { detail: { name: tour.name, index: i, cue } }));
  };

  const start = (name, trigger) => {
    end(false, true);
    const steps = [...document.querySelectorAll('.dd-guide-cue[data-dd-guide]')].filter((c) => c.dataset.ddGuide === name);
    if (!steps.length) return;
    const beacon = document.createElement('span');
    beacon.className = 'dd-guide-beacon';
    beacon.setAttribute('aria-hidden', 'true');
    document.body.append(beacon);
    tour = { name, steps, i: -1, trigger: trigger || document.activeElement, beacon };
    go(0);
  };

  function end(completed = false, quiet = false) {
    if (!tour) return;
    const t = tour;
    tour = null;
    const cue = t.steps[t.i];
    if (cue) { hideCue(cue); targetOf(cue)?.removeAttribute('data-dd-guide-active'); }
    t.beacon.remove();
    if (!quiet) {
      t.trigger?.focus?.({ preventScroll: true });
      document.dispatchEvent(new CustomEvent('dd:guide-end', { detail: { name: t.name, completed } }));
    }
  }

  document.addEventListener('click', (e) => {
    const s = e.target.closest('[data-dd-guide-start]');
    if (s) { start(s.getAttribute('data-dd-guide-start'), s); return; }
    if (!tour) return;
    if (e.target.closest('[data-dd-guide-next]')) go(tour.i + 1);
    else if (e.target.closest('[data-dd-guide-back]')) go(Math.max(0, tour.i - 1));
    else if (e.target.closest('[data-dd-guide-dismiss]')) end(false);
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && tour) { e.preventDefault(); end(false); } });
  window.addEventListener('scroll', layout, { capture: true, passive: true });
  window.addEventListener('resize', layout, { passive: true });

  window.dd = window.dd || {};
  window.dd.guide = { start, next: () => tour && go(tour.i + 1), back: () => tour && go(Math.max(0, tour.i - 1)), end: () => end(false) };
})();
