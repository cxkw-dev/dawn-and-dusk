/* Tooltip: data-dd-tooltip="Copy link" on any element shows a tooltip on mouse hover (after a short delay; instant
   while moving between tooltips) and on keyboard focus. Esc, a click, scrolling or leaving hides it.
     data-dd-tooltip-placement  top (default) · bottom · left · right, optionally -start / -end. Flips when it doesn't fit.
     data-dd-tooltip-kbd        a key hint, keys separated by spaces: "⌘ K" → <kbd>⌘</kbd><kbd>K</kbd>
   One shared .dd-tooltip (role="tooltip") lives at the end of <body> — or, for a trigger inside an open modal dialog
   (drawer, sheet), at the end of that dialog, since everything outside a modal is inert. While it is open the trigger
   points at it with aria-describedby. It takes the dawn/dusk theme of its trigger. Pointer can move onto the tooltip
   without losing it. Esc hides it and stops there (an Esc inside a dialog hides the tooltip, not the dialog); an Esc
   something else already handled is left alone. Where the browser supports it the tooltip is a manual popover, so it
   shows in the top layer — above open dialogs, drawers and popovers whose buttons it describes. */
(() => {
  const DELAY = 450;
  const WARM = 500;
  let tip;
  let current = null;
  let showTimer = 0;
  let hideTimer = 0;
  let lastHidden = 0;
  let closeTimer = 0;
  const topLayer = typeof HTMLElement !== 'undefined' && 'showPopover' in HTMLElement.prototype;

  // Place a fixed element beside an anchor: flip to the other side if it doesn't fit, keep it 8px inside the
  // viewport and aim --dd-arrow-x / --dd-arrow-y at the anchor's centre.
  const place = (el, anchor, want = 'top', gap = 8) => {
    let [side, align = 'center'] = want.split('-');
    const a = anchor.getBoundingClientRect();
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    const vw = document.documentElement.clientWidth;
    const vh = window.innerHeight;
    const m = 8;
    const room = { top: a.top - gap - h >= m, bottom: a.bottom + gap + h <= vh - m, left: a.left - gap - w >= m, right: a.right + gap + w <= vw - m };
    const flip = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' };
    if (!room[side]) side = room[flip[side]] ? flip[side] : (side === 'left' || side === 'right') ? (room.top ? 'top' : 'bottom') : side;
    let x;
    let y;
    if (side === 'top' || side === 'bottom') {
      y = side === 'top' ? a.top - gap - h : a.bottom + gap;
      x = align === 'start' ? a.left : align === 'end' ? a.right - w : a.left + a.width / 2 - w / 2;
      x = Math.min(Math.max(x, m), vw - w - m);
      el.style.setProperty('--dd-arrow-x', `${Math.min(Math.max(a.left + a.width / 2 - x, 10), w - 10)}px`);
    } else {
      x = side === 'left' ? a.left - gap - w : a.right + gap;
      y = align === 'start' ? a.top : align === 'end' ? a.bottom - h : a.top + a.height / 2 - h / 2;
      y = Math.min(Math.max(y, m), vh - h - m);
      el.style.setProperty('--dd-arrow-y', `${Math.min(Math.max(a.top + a.height / 2 - y, 10), h - 10)}px`);
    }
    el.style.left = `${Math.round(x)}px`;
    el.style.top = `${Math.round(y)}px`;
    el.dataset.placement = align === 'center' ? side : `${side}-${align}`;
  };

  // Outside an open modal dialog everything is inert: a tooltip left in <body> couldn't be reached by the pointer, and
  // moving onto it would close it. So it goes into the trigger's modal dialog while it describes something there.
  const hostOf = (el) => { try { return el.closest('dialog:modal') || document.body; } catch { return document.body; } };

  const ensure = () => {
    if (tip?.isConnected) return tip;
    tip = document.createElement('div');
    tip.className = 'dd-tooltip';
    tip.id = 'dd-tooltip';
    tip.setAttribute('role', 'tooltip');
    if (topLayer) tip.setAttribute('popover', 'manual');
    tip.addEventListener('pointerenter', () => clearTimeout(hideTimer));
    tip.addEventListener('pointerleave', () => hideSoon());
    document.body.append(tip);
    return tip;
  };

  const show = (el) => {
    clearTimeout(showTimer);
    clearTimeout(hideTimer);
    const text = el.getAttribute('data-dd-tooltip');
    if (!text || !el.isConnected) return;
    if (current && current !== el) release(current);
    const t = ensure();
    const host = hostOf(el);
    if (t.parentElement !== host) host.append(t); // leaving the top layer as it moves: it reopens just below
    t.replaceChildren(Object.assign(document.createElement('span'), { textContent: text }));
    const kbd = el.getAttribute('data-dd-tooltip-kbd');
    if (kbd) {
      const keys = document.createElement('span');
      keys.className = 'dd-tooltip__keys';
      kbd.trim().split(/\s+/).forEach((k) => keys.append(Object.assign(document.createElement('kbd'), { textContent: k })));
      t.append(keys);
    }
    const scope = el.closest('[data-theme]');
    if (scope && scope !== document.documentElement) t.dataset.theme = scope.dataset.theme;
    else delete t.dataset.theme;
    clearTimeout(closeTimer);
    if (topLayer && !t.matches(':popover-open')) t.showPopover();
    const wasOpen = t.classList.contains('is-open');
    place(t, el, el.getAttribute('data-dd-tooltip-placement') || 'top');
    // Opening from closed: commit the new side first, so the fade slides in from the side it ends up on.
    if (!wasOpen) void t.offsetWidth;
    t.classList.add('is-open');
    current = el;
    if (el.getAttribute('aria-label') !== text) {
      const ids = (el.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean);
      if (!ids.includes(t.id)) el.setAttribute('aria-describedby', [...ids, t.id].join(' '));
    }
  };

  const release = (el) => {
    const ids = (el.getAttribute('aria-describedby') || '').split(/\s+/).filter((id) => id && id !== 'dd-tooltip');
    if (ids.length) el.setAttribute('aria-describedby', ids.join(' '));
    else el.removeAttribute('aria-describedby');
  };

  const hide = () => {
    clearTimeout(showTimer);
    clearTimeout(hideTimer);
    if (!current) return;
    release(current);
    current = null;
    tip?.classList.remove('is-open');
    lastHidden = Date.now();
    // Leave the top layer once the fade-out has finished.
    clearTimeout(closeTimer);
    if (topLayer && tip) closeTimer = setTimeout(() => { if (!tip.classList.contains('is-open') && tip.matches(':popover-open')) tip.hidePopover(); }, 200);
  };
  const hideSoon = () => { clearTimeout(hideTimer); hideTimer = setTimeout(hide, 120); };

  document.addEventListener('pointerover', (e) => {
    if (e.pointerType === 'touch') return;
    if (current && !current.isConnected) hide(); // its trigger was removed under the pointer (a list re-rendered)
    const el = e.target.closest?.('[data-dd-tooltip]');
    if (!el) return;
    if (el === current) { clearTimeout(hideTimer); return; }
    clearTimeout(showTimer);
    const warm = current || Date.now() - lastHidden < WARM;
    if (warm) show(el);
    else showTimer = setTimeout(() => show(el), DELAY);
  });
  document.addEventListener('pointerout', (e) => {
    const el = e.target.closest?.('[data-dd-tooltip]');
    if (!el || el.contains(e.relatedTarget)) return;
    clearTimeout(showTimer);
    if (el === current) hideSoon();
  });
  document.addEventListener('focusin', (e) => {
    const el = e.target.closest?.('[data-dd-tooltip]');
    if (el && e.target.matches(':focus-visible')) show(el);
  });
  document.addEventListener('focusout', (e) => {
    const el = e.target.closest?.('[data-dd-tooltip]');
    if (el && el === current) hide();
  });
  document.addEventListener('pointerdown', (e) => { if (!tip?.contains(e.target)) hide(); });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    clearTimeout(showTimer); // a tooltip on its way doesn't pop up after Esc
    if (current && !e.defaultPrevented) { e.preventDefault(); hide(); }
  });
  window.addEventListener('scroll', hide, { capture: true, passive: true });
  window.addEventListener('resize', hide, { passive: true });
})();
