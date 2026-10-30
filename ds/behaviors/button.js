/* Button: a busy (.is-loading) or aria-disabled .dd-btn ignores activation. CSS already stops pointer clicks;
   this also stops the keyboard (Enter / Space), a form's implicit submit and an aria-disabled link's navigation,
   so a busy Save can't be sent twice. Runs in the capture phase, before any other click handler. */
(() => {
  document.addEventListener('click', (e) => {
    const b = e.target.closest?.('.dd-btn.is-loading, .dd-btn[aria-disabled="true"]');
    if (!b) return;
    e.preventDefault();
    e.stopImmediatePropagation();
  }, true);
})();
