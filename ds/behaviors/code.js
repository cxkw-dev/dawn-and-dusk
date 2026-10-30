/* Code field reveal: a button with [data-dd-code-reveal] inside .dd-code-field swaps the masked value of its
   [data-dd-code-secret] element for the secret and back. aria-pressed tracks the state; the copy button
   (data-dd-copy) always copies the real secret. Optional data-dd-code-reveal-label="Show key|Hide key". */
(() => {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-dd-code-reveal]');
    if (!btn) return;
    const field = btn.closest('.dd-code-field') || btn.parentElement;
    const value = field?.querySelector('[data-dd-code-secret]');
    if (!value) return;
    const show = btn.getAttribute('aria-pressed') !== 'true';
    if (!('ddCodeMasked' in value.dataset)) value.dataset.ddCodeMasked = value.textContent;
    value.textContent = show ? value.dataset.ddCodeSecret : value.dataset.ddCodeMasked;
    value.classList.toggle('is-revealed', show);
    btn.setAttribute('aria-pressed', String(show));
    const [showLabel, hideLabel] = (btn.dataset.ddCodeRevealLabel || 'Show value|Hide value').split('|');
    btn.setAttribute('aria-label', show ? hideLabel : showLabel);
  });
})();
