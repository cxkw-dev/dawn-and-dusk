/* Copy to clipboard: [data-dd-copy="text to copy"] or [data-dd-copy-target="#id"] (copies that element's text).
   The trigger gets [data-copied] for 1.6s so CSS can show a confirmation. */
(() => {
  const timers = new WeakMap();
  document.addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-dd-copy], [data-dd-copy-target]');
    if (!btn) return;
    const sel = btn.getAttribute('data-dd-copy-target');
    const text = sel ? document.querySelector(sel)?.textContent ?? '' : btn.getAttribute('data-dd-copy');
    try {
      await navigator.clipboard.writeText(text.trim());
      btn.setAttribute('data-copied', '');
      clearTimeout(timers.get(btn)); // a repeat click restarts the confirmation instead of cutting it short
      timers.set(btn, setTimeout(() => btn.removeAttribute('data-copied'), 1600));
    } catch { /* clipboard blocked — leave the text selectable */ }
  });
})();
