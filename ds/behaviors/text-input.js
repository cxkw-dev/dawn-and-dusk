/* Text input helpers, all opt-in and delegated from document:
   - [data-dd-reveal]  on a button inside .dd-input toggles its control between password and text (aria-pressed).
   - [data-dd-clear]   empties the control, fires input/change and puts focus back.
   - [data-dd-step="1"|"-1"] steps a number control (stepUp / stepDown honour min, max and step). */
(() => {
  const controlOf = (el) => el.closest('.dd-input')?.querySelector('.dd-input__control');
  const fire = (el) => {
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  };

  document.addEventListener('click', (e) => {
    const reveal = e.target.closest('[data-dd-reveal]');
    if (reveal) {
      const input = controlOf(reveal);
      if (!input) return;
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      reveal.setAttribute('aria-pressed', String(show));
      reveal.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
      return;
    }
    const clear = e.target.closest('[data-dd-clear]');
    if (clear) {
      const input = controlOf(clear);
      if (!input) return;
      input.value = '';
      fire(input);
      input.focus();
      return;
    }
    const step = e.target.closest('[data-dd-step]');
    if (step) {
      const input = controlOf(step);
      if (!input || input.disabled || input.readOnly) return;
      try {
        if (Number(step.dataset.ddStep) < 0) input.stepDown(); else input.stepUp();
      } catch { return; }
      fire(input);
    }
  });
})();
