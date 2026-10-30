/* Toast: dd.toast({ title, description, intent, action, duration }) adds a toast to the stack at the bottom-right.
     intent    'info' (default) · 'ok' · 'warn' · 'bad' · 'neutral'
     action    { label: 'Undo', onClick(toast) {} } — clicking it runs onClick, then dismisses the toast
     duration  ms before it leaves on its own (default 5000; 0 keeps it until dismissed). A hairline shows the time
               left; hovering or focusing the stack pauses every timer, and so does hiding the tab.
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
  let stack;
  let held = false;
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
    stack.addEventListener('pointerenter', () => hold(true));
    stack.addEventListener('pointerleave', () => { if (!stack.contains(document.activeElement)) hold(false); });
    stack.addEventListener('focusin', () => hold(true));
    stack.addEventListener('focusout', (e) => { if (!stack.contains(e.relatedTarget) && !stack.matches(':hover')) hold(false); });
    return stack;
  };
  document.addEventListener('visibilitychange', () => hold(document.hidden || !!stack?.matches(':hover')));

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
      el.dataset.leaving = '';
      handle.timer?.cancel();
      live.delete(handle);
      if (stack?.contains(document.activeElement) && el.contains(document.activeElement)) document.activeElement.blur();
      if (still() || !el.animate || !el.isConnected) return el.remove();
      const h = `${el.offsetHeight}px`;
      const gap = `${-(parseFloat(getComputedStyle(el.parentElement).rowGap) || 0)}px`;
      el.style.pointerEvents = 'none';
      el.animate([
        { opacity: 1, transform: 'none', height: h, marginBottom: '0px' },
        { opacity: 0, transform: 'translateX(24px)', height: h, marginBottom: '0px', offset: 0.5 },
        { opacity: 0, transform: 'translateX(24px)', height: '0px', marginBottom: gap, paddingTop: '0px', paddingBottom: '0px' },
      ], { duration: 320, easing: 'cubic-bezier(.45, 0, .55, 1)' }).finished.then(() => el.remove(), () => el.remove());
    }

    const region = toaster();
    // A brand-new live region needs a beat before content lands in it, or screen readers miss the first toast.
    const add = () => {
      region.append(el);
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
