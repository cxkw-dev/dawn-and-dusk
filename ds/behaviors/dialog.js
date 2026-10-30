/* Dialog, drawer and sheet: native <dialog class="dd-dialog | dd-drawer | dd-sheet"> opened modally.
   - [data-dd-dialog-open="#id"] on any element opens that dialog with showModal() and remembers the opener.
   - [data-dd-dialog-close] inside a dialog closes it; a value (data-dd-dialog-close="delete") becomes dialog.returnValue.
   - <form method="dialog"> inside closes it on submit (after native validation) with the submitter's value.
   - A click on the backdrop closes it, unless the dialog has data-dd-dialog-backdrop="static". Esc closes (native).
   - Closing plays the exit animation (.is-closing), then calls close(); focus returns to the opener.
   - Global: dd.dialog.open('#id'), dd.dialog.close('#id', value). Listen for the native "close" event for the result. */
(() => {
  const SEL = 'dialog.dd-dialog, dialog.dd-drawer, dialog.dd-sheet';
  const openers = new WeakMap();
  const pending = new WeakMap(); // dialog → cancels its in-flight exit animation
  const resolve = (target) => (typeof target === 'string' ? document.querySelector(target) : target);

  const open = (dlg, opener) => {
    if (!(dlg instanceof HTMLDialogElement) || dlg.open) return;
    pending.get(dlg)?.();
    dlg.classList.remove('is-closing');
    dlg.returnValue = '';
    openers.set(dlg, opener || document.activeElement);
    dlg.showModal();
  };

  const close = (dlg, value) => {
    if (!(dlg instanceof HTMLDialogElement) || !dlg.open || dlg.classList.contains('is-closing')) return;
    let timer;
    const stop = () => { clearTimeout(timer); dlg.removeEventListener('animationend', onEnd); pending.delete(dlg); };
    const finish = () => {
      stop();
      dlg.classList.remove('is-closing');
      if (value == null) dlg.close(); else dlg.close(String(value));
    };
    const onEnd = (e) => { if (e.target === dlg && !e.pseudoElement) finish(); };
    dlg.classList.add('is-closing');
    const name = getComputedStyle(dlg).animationName;
    if (!name || name === 'none') { finish(); return; }
    dlg.addEventListener('animationend', onEnd);
    pending.set(dlg, stop);
    timer = setTimeout(finish, 700); // fallback if the animation never ends
  };

  // Backdrop: only when the press both started and ended outside the dialog's box (so drag-selecting text is safe).
  const outside = (dlg, e) => {
    const r = dlg.getBoundingClientRect();
    return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
  };
  let pressedBackdrop = null;
  document.addEventListener('pointerdown', (e) => {
    const t = e.target;
    pressedBackdrop = t instanceof HTMLDialogElement && t.matches(SEL) && outside(t, e) ? t : null;
  });

  document.addEventListener('click', (e) => {
    const opener = e.target.closest('[data-dd-dialog-open]');
    if (opener) {
      const dlg = resolve(opener.getAttribute('data-dd-dialog-open'));
      if (dlg) { e.preventDefault(); open(dlg, opener); }
      return;
    }
    const closer = e.target.closest('[data-dd-dialog-close]');
    if (closer) {
      const dlg = closer.closest(SEL);
      if (dlg) { e.preventDefault(); close(dlg, closer.getAttribute('data-dd-dialog-close') || undefined); }
      return;
    }
    const t = e.target;
    if (t instanceof HTMLDialogElement && t.matches(SEL) && t.open && pressedBackdrop === t && outside(t, e)
      && t.getAttribute('data-dd-dialog-backdrop') !== 'static') close(t);
    pressedBackdrop = null;
  });

  // Esc: animate instead of the instant native close.
  document.addEventListener('cancel', (e) => {
    const dlg = e.target;
    if (!(dlg instanceof HTMLDialogElement) || !dlg.matches(SEL)) return;
    e.preventDefault();
    close(dlg);
  }, true);

  // <form method="dialog">: animate, keep the submitter's value.
  document.addEventListener('submit', (e) => {
    const form = e.target;
    if (!(form instanceof HTMLFormElement) || form.method !== 'dialog') return;
    const dlg = form.closest(SEL);
    if (!dlg) return;
    e.preventDefault();
    close(dlg, e.submitter && e.submitter.value ? e.submitter.value : undefined);
  });

  // Focus goes back to whatever opened the dialog.
  document.addEventListener('close', (e) => {
    const dlg = e.target;
    if (!(dlg instanceof HTMLDialogElement) || !dlg.matches(SEL)) return;
    const back = openers.get(dlg);
    openers.delete(dlg);
    if (back && back.isConnected && typeof back.focus === 'function') back.focus({ preventScroll: true });
  }, true);

  window.dd = window.dd || {};
  window.dd.dialog = { open: (target) => open(resolve(target)), close: (target, value) => close(resolve(target), value) };
})();
