/* Textarea auto-grow: textarea[data-dd-autogrow] resizes to its content on every input, up to its CSS max-height,
   then scrolls. (Browsers with field-sizing: content do this natively; the script keeps the others in step.) */
(() => {
  const grow = (el) => {
    el.style.height = 'auto';
    const max = parseFloat(getComputedStyle(el).maxHeight) || Infinity;
    el.style.height = `${Math.min(el.scrollHeight, max)}px`;
    el.style.overflowY = el.scrollHeight > max ? 'auto' : 'hidden';
  };
  document.addEventListener('input', (e) => { if (e.target.matches?.('textarea[data-dd-autogrow]')) grow(e.target); });
  // A form reset restores the text without an input event: regrow after the browser has put it back.
  document.addEventListener('reset', (e) => {
    if (e.target instanceof HTMLFormElement) setTimeout(() => e.target.querySelectorAll('textarea[data-dd-autogrow]').forEach(grow));
  });
  const init = () => document.querySelectorAll('textarea[data-dd-autogrow]').forEach(grow);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
