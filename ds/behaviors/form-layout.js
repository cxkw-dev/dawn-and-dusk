/* Form validation: <form data-dd-validate novalidate> checks its controls when it is submitted, using the browser's
   own constraints (required, type, pattern, min / max, minlength…) but showing the result in the form's own style.
   - Each invalid control gets aria-invalid="true" and a .dd-field__error under its box, linked with aria-describedby.
     A hint in the same spot steps aside while the error shows. The text, first match wins:
       a message set from script with setCustomValidity();
       the control's message for this reason: data-dd-error-missing (required), data-dd-error-type (type="email" / url,
       or a number box holding text), data-dd-error-pattern, data-dd-error-range (min / max / step),
       data-dd-error-length (minlength / maxlength);
       the control's data-dd-error (any reason);
       the browser's own message.
   - Focus moves to the first invalid control, and the submit stops there: no other submit listener sees it.
   - After a failed submit, an error clears as soon as its control is valid again (on input) and follows the reason
     while it is still showing (an emptied name that now breaks the pattern says so); a control is re-checked when it is
     committed (on change) — never while someone is typing a first value.
   - Resetting the form clears every error.
   A valid form submits as usual: handle "submit" yourself. A submit button with formnovalidate skips the check. */
(() => {
  let uid = 0;
  const sprite = () => (window.dd && window.dd.iconSprite) || '';
  const controls = (form) => [...form.elements].filter((el) => el.willValidate && el.matches('input, select, textarea'));
  const fieldOf = (el) => el.closest('.dd-field');
  const hintOf = (field) => field.querySelector(':scope > .dd-field__hint, :scope > .dd-field__foot > .dd-field__hint');

  const clear = (el) => {
    if (!('ddValid' in el.dataset)) return;
    const err = el.dataset.ddValid && document.getElementById(el.dataset.ddValid);
    if (err) {
      const ids = (el.getAttribute('aria-describedby') || '').split(/\s+/).filter((id) => id && id !== err.id);
      if (ids.length) el.setAttribute('aria-describedby', ids.join(' ')); else el.removeAttribute('aria-describedby');
      err.remove();
    }
    const field = fieldOf(el);
    const hint = field && hintOf(field);
    if (hint && 'ddValidHid' in hint.dataset) { hint.hidden = false; delete hint.dataset.ddValidHid; }
    el.removeAttribute('aria-invalid');
    delete el.dataset.ddValid;
  };

  // The message for the control's current problem (see the header for the order).
  const messageFor = (el) => {
    const v = el.validity, d = el.dataset;
    if (v.customError) return el.validationMessage;
    const reason = v.valueMissing ? d.ddErrorMissing
      : v.typeMismatch || v.badInput ? d.ddErrorType
      : v.patternMismatch ? d.ddErrorPattern
      : v.rangeUnderflow || v.rangeOverflow || v.stepMismatch ? d.ddErrorRange
      : v.tooShort || v.tooLong ? d.ddErrorLength
      : undefined;
    return reason || d.ddError || el.validationMessage;
  };

  const flag = (el) => {
    const text = messageFor(el);
    el.setAttribute('aria-invalid', 'true');
    const field = fieldOf(el);
    if (!field) { el.dataset.ddValid = ''; return; }
    let err = el.dataset.ddValid && document.getElementById(el.dataset.ddValid);
    if (!err) {
      err = document.createElement('p');
      err.className = 'dd-field__error';
      err.id = `dd-error-${++uid}`;
      const hint = hintOf(field);
      if (hint) { hint.after(err); if (!hint.hidden) { hint.hidden = true; hint.dataset.ddValidHid = ''; } }
      else {
        const box = [...field.children].find((c) => c.contains(el)) || el;
        const foot = field.querySelector(':scope > .dd-field__foot');
        if (foot) foot.prepend(err); else box.after(err);
      }
      el.setAttribute('aria-describedby', [err.id, el.getAttribute('aria-describedby')].filter(Boolean).join(' '));
      el.dataset.ddValid = err.id;
    }
    if (err.dataset.ddText === text) return; // unchanged: don't rewrite (screen readers would re-read it)
    err.dataset.ddText = text;
    err.innerHTML = `<svg class="dd-icon" aria-hidden="true"><use href="${sprite()}#dd-i-error"/></svg>`;
    err.append(text);
  };

  const check = (el) => { if (el.validity.valid) clear(el); else flag(el); return el.validity.valid; };

  // Capture phase, so an invalid submit never reaches the page's own submit handlers.
  document.addEventListener('submit', (e) => {
    const form = e.target;
    if (!(form instanceof HTMLFormElement) || !form.matches('[data-dd-validate]')) return;
    if (e.submitter && e.submitter.hasAttribute('formnovalidate')) return;
    form.dataset.ddChecked = '';
    const bad = controls(form).filter((el) => !check(el));
    if (!bad.length) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    const first = bad[0];
    first.focus({ preventScroll: true });
    first.scrollIntoView({ block: 'center' }); // instant, like the browser's own validation: nothing moves under the next click
  }, true);

  // Reward fixes right away; only re-judge a control once it is committed.
  document.addEventListener('input', (e) => {
    const el = e.target;
    if (!('ddValid' in (el.dataset || {})) || !el.validity) return;
    if (el.validity.valid) clear(el); else flag(el);
  });
  document.addEventListener('change', (e) => {
    const el = e.target;
    const form = el.form;
    if (form && form.matches('[data-dd-validate]') && 'ddChecked' in form.dataset && el.willValidate) check(el);
  });

  document.addEventListener('reset', (e) => {
    const form = e.target;
    if (!(form instanceof HTMLFormElement) || !form.matches('[data-dd-validate]')) return;
    delete form.dataset.ddChecked;
    [...form.elements].forEach(clear);
  });
})();
