/* Dropdowns built on <details data-dd-autoclose> (the top-bar avatar menu, the breadcrumb overflow).
   - Closes on a click outside, on Esc (focus returns to the <summary>), after choosing an item inside, and when another
     autoclose dropdown opens.
   - ↓ on the summary opens it and focuses the first item; ↑/↓ move between items while it is open. */
(() => {
  const SEL = 'details[data-dd-autoclose]';
  const items = (d) => [...d.querySelectorAll(':scope > :not(summary) :is(a[href], button:not(:disabled), [role="menuitem"])')];

  document.addEventListener('click', (e) => {
    document.querySelectorAll(`${SEL}[open]`).forEach((d) => { if (!d.contains(e.target)) d.open = false; });
    const chosen = e.target.closest(`${SEL}[open] > :not(summary) :is(a[href], button, [role="menuitem"])`);
    if (chosen) chosen.closest(SEL).open = false;
  });

  document.addEventListener('toggle', (e) => {
    const d = e.target;
    if (!(d instanceof HTMLDetailsElement) || !d.open || !d.matches(SEL)) return;
    document.querySelectorAll(`${SEL}[open]`).forEach((o) => { if (o !== d && !o.contains(d)) o.open = false; });
  }, true);

  document.addEventListener('keydown', (e) => {
    const d = e.target.closest?.(SEL);
    if (e.key === 'Escape') {
      const open = d?.open ? d : document.querySelector(`${SEL}[open]`);
      if (!open) return;
      open.open = false;
      open.querySelector('summary')?.focus();
      return;
    }
    if (!d || (e.key !== 'ArrowDown' && e.key !== 'ArrowUp')) return;
    const list = items(d);
    if (!list.length) return;
    e.preventDefault();
    if (!d.open) d.open = true;
    const i = list.indexOf(document.activeElement);
    const next = i < 0 ? (e.key === 'ArrowDown' ? 0 : list.length - 1) : (i + (e.key === 'ArrowDown' ? 1 : -1) + list.length) % list.length;
    list[next].focus();
  });
})();
