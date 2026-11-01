/* Dismiss: a [data-dd-dismiss] button closes the alert, banner, callout or [data-dd-dismissible] element it sits in,
   or the element its value names (data-dd-dismiss="#promo"). The target first gets a cancelable "dd:dismiss" event
   (call preventDefault() to keep it), then fades, collapses and is removed. Focus still inside it at that point moves
   to its parent; focus that went elsewhere meanwhile stays there. dd.dismiss(el) does the same from code. */
(() => {
  const TARGETS = '.dd-alert, .dd-banner, .dd-callout, [data-dd-dismissible]';
  const still = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

  const dismiss = (el) => {
    if (!el || el.hasAttribute('data-dd-leaving')) return;
    if (!el.dispatchEvent(new CustomEvent('dd:dismiss', { bubbles: true, cancelable: true }))) return;
    el.setAttribute('data-dd-leaving', '');
    // Keep keyboard users where they were: if focus is inside as it goes, hand it to the parent instead of dropping it
    // on <body>. Checked at the end, not the start: focus moved elsewhere during the exit stays where it went.
    const done = () => {
      const parent = el.parentElement;
      const hadFocus = el.contains(document.activeElement);
      el.remove();
      if (hadFocus && parent) {
        const temp = !parent.hasAttribute('tabindex');
        if (temp) {
          parent.setAttribute('tabindex', '-1');
          parent.addEventListener('blur', () => parent.removeAttribute('tabindex'), { once: true });
        }
        parent.focus({ preventScroll: true });
      }
    };
    if (still() || !el.animate) return done();
    const cs = getComputedStyle(el);
    const from = { height: `${el.offsetHeight}px`, paddingTop: cs.paddingTop, paddingBottom: cs.paddingBottom, marginTop: cs.marginTop, marginBottom: cs.marginBottom };
    // In a stacked flex/grid parent the gap next to the element goes too, or the rest would jump by one gap at the end.
    const end = { height: '0px', paddingTop: '0px', paddingBottom: '0px', marginTop: '0px', marginBottom: '0px', opacity: 0 };
    const pcs = el.parentElement ? getComputedStyle(el.parentElement) : null;
    const stacked = pcs && (pcs.display.includes('grid') || (pcs.display.includes('flex') && pcs.flexDirection.startsWith('column')));
    const gap = stacked ? parseFloat(pcs.rowGap) || 0 : 0;
    if (gap && el.nextElementSibling) end.marginBottom = `${-gap}px`;
    else if (gap && el.previousElementSibling) end.marginTop = `${-gap}px`;
    el.style.overflow = 'hidden';
    el.style.pointerEvents = 'none';
    el.animate([
      { ...from, opacity: 1 },
      { ...from, opacity: 0, offset: 0.45 },
      end,
    ], { duration: 320, easing: 'cubic-bezier(.45, 0, .55, 1)' }).finished.then(done, done);
  };

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-dd-dismiss]');
    if (!btn) return;
    const sel = btn.getAttribute('data-dd-dismiss');
    const target = sel ? document.querySelector(sel) : btn.closest(TARGETS);
    if (!target) return;
    e.preventDefault();
    dismiss(target);
  });

  window.dd = window.dd || {};
  window.dd.dismiss = dismiss;
})();
