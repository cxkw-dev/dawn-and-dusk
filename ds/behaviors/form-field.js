/* Form field counter: a .dd-field__counter inside a .dd-field counts the characters of the field's control.
   The limit comes from data-dd-counter="280" (a soft limit: typing past it marks the field invalid) or from the
   control's maxlength (a hard limit). The counter gets .is-near at 90% and .is-over past the limit, and re-counts
   when its form is reset. An error in the same field marked [data-dd-counter-error] shows only while a soft limit
   is passed. */
(() => {
  const update = (field) => {
    const counter = field.querySelector('.dd-field__counter');
    const control = field.querySelector('input, textarea');
    if (!counter || !control) return;
    const soft = Number(counter.dataset.ddCounter) || 0;
    const max = soft || Number(control.getAttribute('maxlength')) || 0;
    const n = control.value.length;
    counter.textContent = max ? `${n} / ${max}` : String(n);
    counter.classList.toggle('is-near', !!max && n >= max * 0.9 && n <= max);
    counter.classList.toggle('is-over', !!max && n > max);
    // A soft limit marks the control invalid while it is over, and only clears what it set itself.
    if (soft && n > max) { control.setAttribute('aria-invalid', 'true'); control.dataset.ddOver = ''; }
    else if ('ddOver' in control.dataset) { control.removeAttribute('aria-invalid'); delete control.dataset.ddOver; }
    if (soft) field.querySelectorAll('[data-dd-counter-error]').forEach((err) => { err.hidden = n <= max; });
  };

  document.addEventListener('input', (e) => {
    const field = e.target.closest?.('.dd-field');
    if (field && field.querySelector('.dd-field__counter')) update(field);
  });
  // A form reset restores values without firing input: re-count once the browser has put the defaults back.
  document.addEventListener('reset', (e) => {
    const form = e.target;
    if (!(form instanceof HTMLFormElement)) return;
    setTimeout(() => form.querySelectorAll('.dd-field__counter').forEach((c) => { const f = c.closest('.dd-field'); if (f) update(f); }));
  });
  const init = () => document.querySelectorAll('.dd-field__counter').forEach((c) => update(c.closest('.dd-field')));
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
