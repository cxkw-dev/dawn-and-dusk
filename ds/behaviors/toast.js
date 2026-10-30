/* Toast: dd.toast({ title, description, intent, action, duration }) adds a toast to the stack at the bottom-right.
     intent    'info' (default) · 'ok' · 'warn' · 'bad' · 'neutral'
     action    { label: 'Undo', onClick(toast) {} } — clicking it runs onClick, then dismisses the toast
     duration  ms before it leaves on its own (default 5000; 0 keeps it until dismissed). A hairline shows the time
               left; hovering or focusing the stack pauses every timer, and so does hiding the tab.
   Swipe a toast sideways (or drag it with the mouse) to dismiss it; Esc dismisses the toast that has focus, and focus
   then moves to the next toast or back to where it was before the stack. The stack is a manual popover (top layer),
   so toasts show above modal dialogs; while a modal is open the stack moves inside it so its buttons aren't inert.
     icon      any sprite name, to override the intent's icon
   Returns { el, dismiss() }. dd.toast('Saved') works too, and dd.toast.clear() empties the stack.
   Declarative: <button data-dd-toast="Title" data-dd-toast-description="…" data-dd-toast-intent="ok"
   data-dd-toast-action="Undo" data-dd-toast-duration="8000">. The toast takes the dawn/dusk theme of the
   element that raised it, so a toast from a dusk panel is a dusk toast. Icons come from the inline sprite
   (#dd-i-NAME); set dd.iconSprite = 'icons.svg' to use an external one. */
(() => {
  window.dd = window.dd || {};
  const dd = window.dd;
  const MAX = 4;
  const ICONS = { info: 'info', ok: 'success', warn: 'alert', bad: 'danger', neutral: 'bell' };
  const still = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const icon = (name) => {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('class', 'dd-icon');
    svg.setAttribute('aria-hidden', 'true');
    const use = document.createElementNS(ns, 'use');
    use.setAttribute('href', `${dd.iconSprite || ''}#dd-i-${name}`);
    svg.append(use);
    return svg;
  };
  const make = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };

  const live = new Set(); // toasts with a running timer
  // Where supported the stack is a manual popover, so it shows in the top layer: above modal dialogs, drawers and
  // their scrims, and clickable there (not inert behind a modal).
  const topLayer = typeof HTMLElement !== 'undefined' && 'showPopover' in HTMLElement.prototype;
  let stack;
  let held = false;
  let returnTo = null; // where focus was before it entered the stack
  const hold = (on) => {
    held = on;
    live.forEach((t) => (on ? t.timer?.pause() : t.timer?.play()));
  };
  const toaster = () => {
    if (stack?.isConnected) return stack;
    stack = document.querySelector('.dd-toaster');
    if (!stack) {
      stack = make('section', 'dd-toaster');
      document.body.append(stack);
    }
    stack.setAttribute('aria-label', 'Notifications');
    stack.setAttribute('aria-live', 'polite');
    if (topLayer) stack.setAttribute('popover', 'manual');
    stack.addEventListener('pointerenter', () => hold(true));
    stack.addEventListener('pointerleave', () => { if (!stack.contains(document.activeElement)) hold(false); });
    stack.addEventListener('focusin', (e) => {
      if (e.relatedTarget && !stack.contains(e.relatedTarget)) returnTo = e.relatedTarget;
      hold(true);
    });
    stack.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      const t = e.target.closest?.('.dd-toast');
      if (t?.ddToast) { e.preventDefault(); t.ddToast.dismiss(); }
    });
    stack.addEventListener('focusout', (e) => { if (!stack.contains(e.relatedTarget) && !stack.matches(':hover')) hold(false); });
    return stack;
  };
  document.addEventListener('visibilitychange', () => hold(document.hidden || !!stack?.matches(':hover') || !!stack?.contains(document.activeElement)));

  // Put the stack at the top of the top layer. Everything outside an open modal dialog is inert, so while one is
  // open the stack lives inside the topmost modal (as a top-layer popover it still sits fixed at the viewport
  // corner, above the dialog and its scrim) and goes back to <body> when that dialog closes. Toasts that are
  // already showing don't replay their entrance when the stack moves.
  const topModal = () => document.activeElement?.closest?.('dialog:modal') || [...document.querySelectorAll('dialog:modal')].pop() || null;
  const raise = () => {
    if (!topLayer || !stack?.isConnected) return;
    const host = topModal() || document.body;
    if (stack.parentElement !== host) {
      if (stack.contains(document.activeElement)) return; // don't pull focus out from under a keyboard user
      stack.querySelectorAll(':scope > .dd-toast').forEach((t) => t.classList.add('is-settled'));
      host.append(stack); // leaving the DOM hides the popover
    } else if (stack.matches(':popover-open')) return;
    stack.showPopover();
  };
  document.addEventListener('close', (e) => {
    if (!stack || !(e.target instanceof HTMLDialogElement) || !e.target.contains(stack)) return;
    stack.querySelectorAll(':scope > .dd-toast').forEach((t) => t.classList.add('is-settled'));
    document.body.append(stack);
    if (stack.querySelector('.dd-toast')) raise();
  }, true);

  // Toasts already in the stack glide to their new place instead of jumping when one is added (FLIP).
  const glide = (region, change) => {
    const kids = still() ? [] : [...region.querySelectorAll(':scope > .dd-toast:not([data-leaving])')];
    const before = kids.map((k) => k.getBoundingClientRect().top);
    change();
    kids.forEach((k, n) => {
      const dy = before[n] - k.getBoundingClientRect().top;
      if (Math.abs(dy) > 0.5) k.animate([{ transform: `translateY(${dy}px)` }, { transform: 'none' }], { duration: 320, easing: 'cubic-bezier(.45, 0, .55, 1)', composite: 'add' });
    });
  };

  const toast = (opts = {}) => {
    if (typeof opts === 'string') opts = { title: opts };
    const { title = '', description = '', intent = 'info', action, duration = 5000, dismissible = true } = opts;
    const el = make('div', `dd-toast dd-toast--${intent}`);
    if (intent === 'bad') el.setAttribute('role', 'alert');
    const from = opts.from || document.activeElement;
    const scope = from?.closest?.('[data-theme]');
    if (scope && scope !== document.documentElement) el.dataset.theme = scope.dataset.theme;

    el.append(icon(opts.icon || ICONS[intent] || 'info'));
    const body = make('div', 'dd-toast__body');
    if (title) body.append(make('p', 'dd-toast__title', title));
    if (description) body.append(make('p', 'dd-toast__text', description));
    el.append(body);

    const handle = { el, dismiss: () => leave() };
    if (action?.label) {
      const wrap = make('div', 'dd-toast__actions');
      const btn = make('button', 'dd-toast__action', action.label);
      btn.type = 'button';
      btn.addEventListener('click', () => { action.onClick?.(handle); leave(); });
      wrap.append(btn);
      el.append(wrap);
    }
    if (dismissible) {
      const x = make('button', 'dd-toast__dismiss');
      x.type = 'button';
      x.setAttribute('aria-label', 'Dismiss notification');
      x.append(icon('x'));
      x.addEventListener('click', () => leave());
      el.append(x);
    }

    let gone = false;
    function leave() {
      if (gone) return;
      gone = true;
      // Keep keyboard users in the stack: focus the neighbouring toast, or go back to where they came from.
      // (After a mouse click focus is simply dropped, so the other timers start again when the pointer leaves.)
      if (el.contains(document.activeElement) && !document.activeElement.matches(':focus-visible')) document.activeElement.blur();
      else if (el.contains(document.activeElement)) {
        const shown = [...(el.parentElement?.querySelectorAll(':scope > .dd-toast:not([data-leaving])') || [])];
        const k = shown.indexOf(el);
        const next = (shown[k + 1] || shown[k - 1])?.querySelector('button, a[href]');
        if (next) next.focus();
        else if (returnTo?.isConnected) returnTo.focus({ preventScroll: true });
        else document.activeElement.blur();
      }
      el.dataset.leaving = '';
      handle.timer?.cancel();
      live.delete(handle);
      if (still() || !el.animate || !el.isConnected) return el.remove();
      const h = `${el.offsetHeight}px`;
      const gap = `${-(parseFloat(getComputedStyle(el.parentElement).rowGap) || 0)}px`;
      // A swiped toast leaves from where the pointer let go, in the direction it was thrown.
      const cs = getComputedStyle(el);
      const at = parseFloat(cs.translate) || 0;
      const from = `${at}px 0`;
      const away = `${at + (at < 0 ? -32 : 32)}px 0`;
      el.classList.remove('is-swiping');
      el.style.pointerEvents = 'none';
      el.animate([
        { opacity: Number(cs.opacity), translate: from, height: h, marginBottom: '0px' },
        { opacity: 0, translate: away, height: h, marginBottom: '0px', offset: 0.5 },
        { opacity: 0, translate: away, height: '0px', marginBottom: gap, paddingTop: '0px', paddingBottom: '0px' },
      ], { duration: 320, easing: 'cubic-bezier(.45, 0, .55, 1)' }).finished.then(() => el.remove(), () => el.remove());
    }

    const region = toaster();
    // A brand-new live region needs a beat before content lands in it, or screen readers miss the first toast.
    const add = () => {
      if (gone) return; // dismissed before it was shown
      raise();
      glide(region, () => region.append(el));
      const shown = [...region.querySelectorAll(':scope > .dd-toast:not([data-leaving])')];
      shown.slice(0, Math.max(0, shown.length - MAX)).forEach((old) => old.ddToast?.dismiss());
      if (duration > 0) {
        const bar = make('span', 'dd-toast__progress');
        bar.setAttribute('aria-hidden', 'true');
        el.append(bar);
        handle.timer = bar.animate([{ transform: 'scaleX(1)' }, { transform: 'scaleX(0)' }], { duration, easing: 'linear', fill: 'forwards' });
        handle.timer.finished.then(() => leave(), () => {});
        live.add(handle);
        if (held) handle.timer.pause();
      }
    };
    el.ddToast = handle;
    if (region.childElementCount || region.dataset.ready) add();
    else { region.dataset.ready = ''; requestAnimationFrame(add); }
    return handle;
  };
  toast.clear = () => document.querySelectorAll('.dd-toaster > .dd-toast').forEach((t) => (t.ddToast ? t.ddToast.dismiss() : t.remove()));
  dd.toast = toast;

  // Swipe: drag a live toast sideways; past a third of its width (or a quick flick) it leaves, otherwise it springs back.
  let drag = null;
  document.addEventListener('pointerdown', (e) => {
    const el = e.target.closest?.('.dd-toaster > .dd-toast');
    if (!el || el.dataset.leaving || e.button !== 0 || e.target.closest('button, a, input, select, textarea')) return;
    drag = { el, id: e.pointerId, x: e.clientX, y: e.clientY, dx: 0, t: performance.now(), on: false };
  });
  document.addEventListener('pointermove', (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const dx = e.clientX - drag.x;
    const dy = e.clientY - drag.y;
    if (!drag.on) {
      if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) { drag = null; return; }
      if (Math.abs(dx) < 6) return;
      drag.on = true;
      drag.el.setPointerCapture?.(e.pointerId);
      drag.el.classList.add('is-swiping');
    }
    drag.dx = dx;
    drag.el.style.translate = `${dx}px 0`;
    drag.el.style.opacity = String(Math.max(0.15, 1 - Math.abs(dx) / (drag.el.offsetWidth * 0.8)));
  });
  const drop = (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const { el, dx, t, on } = drag;
    drag = null;
    if (!on) return;
    el.classList.remove('is-swiping');
    const fling = Math.abs(dx) / Math.max(1, performance.now() - t) > 0.6;
    if (e.type === 'pointerup' && (Math.abs(dx) > el.offsetWidth * 0.33 || (fling && Math.abs(dx) > 24)) && el.ddToast) {
      el.ddToast.dismiss(); // leaves from where it was let go
    } else {
      el.style.translate = '';
      el.style.opacity = '';
    }
  };
  document.addEventListener('pointerup', drop);
  document.addEventListener('pointercancel', drop);

  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-dd-toast]');
    if (!t) return;
    const d = t.dataset;
    toast({
      title: d.ddToast,
      description: d.ddToastDescription,
      intent: d.ddToastIntent || 'info',
      action: d.ddToastAction ? { label: d.ddToastAction } : undefined,
      duration: d.ddToastDuration != null ? Number(d.ddToastDuration) : undefined,
      from: t,
    });
  });
})();
