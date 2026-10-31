/* Dialog, drawer and sheet: native <dialog class="dd-dialog | dd-drawer | dd-sheet"> opened modally.
   - [data-dd-dialog-open="#id"] on any element opens that dialog with showModal() and remembers the opener.
   - [data-dd-dialog-close] inside a dialog closes it; a value (data-dd-dialog-close="delete") becomes dialog.returnValue.
   - <form method="dialog"> inside closes it on submit (after native validation) with the submitter's value.
   - A click on the backdrop closes it, unless the dialog has data-dd-dialog-backdrop="static". Esc closes (native).
   - Closing plays the exit animation (.is-closing), then calls close(); focus returns to the opener.
     An opener inside a floating menu (a .dd-menu__item with data-dd-dialog-open) has closed with its menu, so focus goes
     to the button that opened that menu instead (menu.ddTrigger; for a submenu, the root menu's trigger). If that
     element is gone by then — removed before the dialog closed, or by a "close" listener (the row the dialog deleted) —
     focus lands on the nearest focusable where it was: the first control of the next element after it, else the one
     before, else further up the page.
   - Tab / Shift+Tab wrap inside the open dialog instead of leaving for the browser's own UI.
   - Inside a role="menu" list (sheet actions / choices): ↑ ↓ move between rows, Home / End jump to the ends. Choosing a
     role="menuitemradio" row marks it aria-checked (and unmarks the others); a menuitemcheckbox row flips.
   - Reopening a dialog while it plays its exit animation cancels the exit.
   - Global: dd.dialog.open('#id'), dd.dialog.close('#id', value). Listen for the native "close" event for the result. */
(() => {
  const SEL = 'dialog.dd-dialog, dialog.dd-drawer, dialog.dd-sheet';
  const openers = new WeakMap();
  const pending = new WeakMap(); // dialog → cancels its in-flight exit animation
  const resolve = (target) => (typeof target === 'string' ? document.querySelector(target) : target);

  // Where focus goes back to. A menu item closes with its menu, so use the menu's trigger (up through submenus).
  const returnTarget = (el) => {
    let t = el;
    for (let k = 0; k < 10; k++) {
      const menu = t?.closest?.('.dd-menu');
      if (!menu || !menu.ddTrigger || !(menu.hidden || menu.classList.contains('is-floating'))) break;
      t = menu.ddTrigger;
    }
    return t;
  };
  // The element's place in the page (ancestors and their neighbours), to find the nearest focusable if it is removed.
  const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex]:not([tabindex="-1"])';
  const canFocus = (el) => el.matches(FOCUSABLE) && !el.closest('[inert], dialog:not([open])') && el.getClientRects().length > 0;
  const firstIn = (el) => (el.nodeType !== 1 ? null : canFocus(el) ? el : [...el.querySelectorAll(FOCUSABLE)].find(canFocus) || null);
  const placeOf = (el) => {
    const path = [];
    for (let n = el; n && n !== document.body && n !== document.documentElement; n = n.parentElement) path.push({ node: n, next: n.nextElementSibling, prev: n.previousElementSibling });
    return path;
  };
  const nearest = (path) => {
    const i = path.findIndex((p) => p.node.isConnected);
    if (i < 0) return null;
    if (i === 0) { const f = firstIn(path[0].node); if (f) return f; }
    for (let k = Math.max(0, i - 1); k < path.length; k++) {
      // The removed level uses the neighbours it had; the levels still in the page use their live ones.
      const live = path[k].node.isConnected;
      const next = live ? path[k].node.nextElementSibling : path[k].next;
      const prev = live ? path[k].node.previousElementSibling : path[k].prev;
      for (let n = next; n && n.isConnected; n = n.nextElementSibling) { const f = firstIn(n); if (f) return f; }
      for (let n = prev; n && n.isConnected; n = n.previousElementSibling) { const f = firstIn(n); if (f) return f; }
    }
    return null;
  };

  const open = (dlg, opener) => {
    if (!(dlg instanceof HTMLDialogElement)) return;
    // Reopened while its exit animation plays: cancel the exit and keep it open (and the original opener).
    if (dlg.open) {
      if (dlg.classList.contains('is-closing')) { pending.get(dlg)?.(); dlg.classList.remove('is-closing'); }
      return;
    }
    pending.get(dlg)?.();
    dlg.classList.remove('is-closing');
    dlg.returnValue = '';
    const back = returnTarget(opener || document.activeElement);
    openers.set(dlg, back ? { el: back, path: placeOf(back) } : null);
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
    // Choices in a sheet / dialog list: a menuitemradio becomes the checked one, a menuitemcheckbox flips.
    const choice = e.target.closest(`:is(${SEL}) :is([role="menuitemradio"], [role="menuitemcheckbox"])`);
    if (choice && !choice.disabled && choice.getAttribute('aria-disabled') !== 'true') {
      if (choice.getAttribute('role') === 'menuitemcheckbox') choice.setAttribute('aria-checked', String(choice.getAttribute('aria-checked') !== 'true'));
      else (choice.closest('[role="group"], [role="menu"]') || choice.parentElement).querySelectorAll('[role="menuitemradio"]')
        .forEach((r) => r.setAttribute('aria-checked', String(r === choice)));
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

  // Focus trap: Tab past the last control wraps to the first (and Shift+Tab back), so focus never leaves the modal.
  const TABBABLE = 'a[href], button, input:not([type="hidden"]), select, textarea, summary, [tabindex], [contenteditable="true"]';
  const tabbables = (dlg) => [...dlg.querySelectorAll(TABBABLE)].filter((el) => el.tabIndex >= 0 && !el.disabled
    && !el.closest('[inert], details:not([open]) > :not(summary)') && el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden');
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab' || e.altKey || e.ctrlKey || e.metaKey) return;
    const modal = (d) => { try { return d.matches(':modal'); } catch { return d.open; } };
    const dlg = [...document.querySelectorAll(SEL)].reverse().find((d) => d.open && modal(d));
    if (!dlg) return;
    const list = tabbables(dlg);
    if (!list.length) { e.preventDefault(); dlg.focus(); return; }
    const first = list[0], last = list[list.length - 1], at = document.activeElement;
    const outside = !dlg.contains(at) || at === dlg;
    if (e.shiftKey && (at === first || outside)) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && (at === last || outside)) { e.preventDefault(); first.focus(); }
  });

  // Arrow keys move through role="menu" rows inside an open dialog / sheet.
  document.addEventListener('keydown', (e) => {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) return;
    const item = e.target.closest?.('[role^="menuitem"]');
    const menu = item?.closest('[role="menu"]');
    if (!menu || !item.closest(SEL)) return;
    const rows = [...menu.querySelectorAll('[role^="menuitem"]')].filter((r) => !r.disabled && r.getAttribute('aria-disabled') !== 'true');
    let i = rows.indexOf(item);
    if (e.key === 'ArrowDown') i = (i + 1) % rows.length;
    else if (e.key === 'ArrowUp') i = (i - 1 + rows.length) % rows.length;
    else i = e.key === 'Home' ? 0 : rows.length - 1;
    e.preventDefault();
    rows[i]?.focus();
  });

  // Focus goes back to whatever opened the dialog.
  document.addEventListener('close', (e) => {
    const dlg = e.target;
    if (!(dlg instanceof HTMLDialogElement) || !dlg.matches(SEL)) return;
    const back = openers.get(dlg);
    openers.delete(dlg);
    if (!back) return;
    const land = () => {
      const shown = back.el.isConnected && back.el.getClientRects().length > 0;
      (shown ? back.el : nearest(back.path))?.focus({ preventScroll: true });
    };
    land();
    // The page's own close listener may remove the element focus just went to (the row this dialog deleted): once it
    // has run, land on the nearest focusable where that element was.
    setTimeout(() => {
      const a = document.activeElement;
      if (!dlg.open && (!a || a === document.body || !a.isConnected || !a.getClientRects().length)) land();
    }, 0);
  }, true);

  window.dd = window.dd || {};
  window.dd.dialog = { open: (target) => open(resolve(target)), close: (target, value) => close(resolve(target), value) };
})();
