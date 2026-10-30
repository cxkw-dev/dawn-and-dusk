/* Slider: keeps a .dd-slider's fill and labels in step with its range inputs.
   - Single: sets --_p (0–1) on the slider. Range (.dd-slider--range, two inputs): sets --_lo / --_hi and stops
     the thumbs crossing.
   - <output for="inputId"> (anywhere) shows that input's value; data-unit on the output appends a unit.
   - .dd-slider__bubble[data-for="inputId"] rides above its thumb.
   - .dd-slider__ticks > [data-value] gets .is-active when it matches a value. */
(() => {
  const frac = (el) => {
    const min = Number(el.min || 0); const max = Number(el.max || 100);
    return max === min ? 0 : (Number(el.value) - min) / (max - min);
  };
  const fmt = (el, unit = '') => `${Number(el.value).toLocaleString('en-US')}${unit}`;

  const sync = (slider, moved) => {
    const inputs = [...slider.querySelectorAll('.dd-slider__input')];
    if (!inputs.length) return;
    if (inputs.length > 1) {
      const [lo, hi] = inputs;
      if (Number(lo.value) > Number(hi.value)) { if (moved === lo) lo.value = hi.value; else hi.value = lo.value; }
      slider.style.setProperty('--_lo', frac(lo).toFixed(4));
      slider.style.setProperty('--_hi', frac(hi).toFixed(4));
      // Keep the most recently moved thumb on top so it never gets stuck under the other.
      lo.style.zIndex = moved === lo || frac(lo) > 0.98 ? 2 : 1;
    } else {
      slider.style.setProperty('--_p', frac(inputs[0]).toFixed(4));
    }
    const values = inputs.map((el) => el.value);
    inputs.forEach((el) => {
      if (!el.id) return;
      document.querySelectorAll(`output[for~="${CSS.escape(el.id)}"]`).forEach((o) => { o.textContent = fmt(el, o.dataset.unit); });
      slider.querySelectorAll(`.dd-slider__bubble[data-for="${CSS.escape(el.id)}"]`).forEach((b) => {
        b.style.setProperty('--_p', frac(el).toFixed(4));
        b.textContent = fmt(el, b.dataset.unit);
      });
    });
    slider.querySelectorAll('.dd-slider__ticks > [data-value]').forEach((t) => {
      const v = Number(t.dataset.value);
      t.classList.toggle('is-active', inputs.length > 1 ? v >= Number(values[0]) && v <= Number(values[1]) : v === Number(values[0]));
    });
  };

  document.addEventListener('input', (e) => {
    const input = e.target.closest?.('.dd-slider__input');
    if (input) sync(input.closest('.dd-slider'), input);
  });
  const init = () => document.querySelectorAll('.dd-slider').forEach((s) => sync(s));
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
