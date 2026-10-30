/* Popover: <button popovertarget="deploy-pop"> + <div class="dd-popover" id="deploy-pop" popover role="dialog">.
   The browser does the opening, Esc and outside-click closing, and puts the panel in the top layer; this script places
   it beside the button that opened it, flips it when there is no room, points .dd-popover__arrow at the button,
   keeps aria-expanded in sync and follows the button on scroll and resize.
     data-dd-placement  on the popover: bottom (default) · top · left · right, optionally -start / -end
   From code: dd.popover.open(panel, anchor) · dd.popover.close(panel) · dd.popover.toggle(panel, anchor). */
(() => {
  const anchors = new WeakMap();
  const open = new Set();

  // Place a fixed element beside an anchor: flip to the other side if it doesn't fit, keep it 8px inside the
  // viewport and aim --dd-arrow-x / --dd-arrow-y at the anchor's centre.
  const place = (el, anchor, want = 'bottom', gap = 10) => {
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
      el.style.setProperty('--dd-arrow-x', `${Math.min(Math.max(a.left + a.width / 2 - x, 14), w - 14)}px`);
    } else {
      x = side === 'left' ? a.left - gap - w : a.right + gap;
      y = align === 'start' ? a.top : align === 'end' ? a.bottom - h : a.top + a.height / 2 - h / 2;
      y = Math.min(Math.max(y, m), vh - h - m);
      el.style.setProperty('--dd-arrow-y', `${Math.min(Math.max(a.top + a.height / 2 - y, 14), h - 14)}px`);
    }
    el.style.left = `${Math.round(x)}px`;
    el.style.top = `${Math.round(y)}px`;
    el.dataset.placement = align === 'center' ? side : `${side}-${align}`;
  };

  const anchorOf = (pop) => anchors.get(pop) || document.querySelector(`[popovertarget="${CSS.escape(pop.id)}"]`);
  const reposition = (pop) => { const a = anchorOf(pop); if (a?.isConnected) place(pop, a, pop.dataset.ddPlacement || 'bottom'); };

  // Remember which button opened which popover (a panel can have several triggers).
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[popovertarget]');
    if (!btn) return;
    const pop = document.getElementById(btn.getAttribute('popovertarget'));
    if (pop?.classList.contains('dd-popover') && !pop.contains(btn)) anchors.set(pop, btn);
  }, true);

  document.addEventListener('toggle', (e) => {
    const pop = e.target;
    if (!(pop instanceof HTMLElement) || !pop.classList.contains('dd-popover')) return;
    const a = anchorOf(pop);
    if (e.newState === 'open') {
      open.add(pop);
      reposition(pop);
      a?.setAttribute('aria-expanded', 'true');
    } else {
      open.delete(pop);
      document.querySelectorAll(`[popovertarget="${CSS.escape(pop.id)}"]`).forEach((b) => { if (!pop.contains(b)) b.setAttribute('aria-expanded', 'false'); });
      // An anchor passed to dd.popover.open() hears about the close too.
      if (a && !pop.contains(a) && a.hasAttribute('aria-expanded')) a.setAttribute('aria-expanded', 'false');
    }
  }, true);

  const follow = () => open.forEach(reposition);
  window.addEventListener('scroll', follow, { capture: true, passive: true });
  window.addEventListener('resize', follow, { passive: true });

  // Set the initial aria-expanded so the state is announced before the first click.
  const init = () => document.querySelectorAll('[popovertarget]').forEach((b) => {
    const pop = document.getElementById(b.getAttribute('popovertarget'));
    if (pop?.classList.contains('dd-popover') && !pop.contains(b) && !b.hasAttribute('aria-expanded')) b.setAttribute('aria-expanded', 'false');
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.dd = window.dd || {};
  window.dd.popover = {
    open(pop, anchor) { if (anchor) anchors.set(pop, anchor); if (!pop.matches(':popover-open')) pop.showPopover(); },
    close(pop) { if (pop.matches(':popover-open')) pop.hidePopover(); },
    toggle(pop, anchor) { if (pop.matches(':popover-open')) this.close(pop); else this.open(pop, anchor); },
  };
})();
