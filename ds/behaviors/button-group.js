/* Button group toggles: inside .dd-btn-group[data-dd-btn-toggle], a click on a button with aria-pressed flips it.
   Each button is independent (several can be pressed); for a single choice use the segmented control. */
(() => {
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-dd-btn-toggle] [aria-pressed]');
    if (!b || b.disabled || b.getAttribute('aria-disabled') === 'true') return;
    b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true'));
  });
})();
