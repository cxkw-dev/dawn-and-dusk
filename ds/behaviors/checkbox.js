/* Checkbox helpers.
   - input[data-dd-indeterminate] starts in the mixed state (HTML has no attribute for it).
   - input[data-dd-check-all="key"] is a parent for every input[data-dd-check-in="key"]: checking it sets them all;
     changing a child updates the parent to checked, unchecked or mixed. */
(() => {
  const kids = (key) => [...document.querySelectorAll(`input[data-dd-check-in="${CSS.escape(key)}"]:not(:disabled)`)];
  const syncParent = (key) => {
    const parent = document.querySelector(`input[data-dd-check-all="${CSS.escape(key)}"]`);
    if (!parent) return;
    const list = kids(key);
    const on = list.filter((c) => c.checked).length;
    parent.checked = on > 0 && on === list.length;
    parent.indeterminate = on > 0 && on < list.length;
  };

  document.addEventListener('change', (e) => {
    const el = e.target;
    if (!(el instanceof HTMLInputElement) || el.type !== 'checkbox') return;
    if (el.dataset.ddCheckAll) {
      kids(el.dataset.ddCheckAll).forEach((c) => { c.checked = el.checked; });
      el.indeterminate = false;
    } else if (el.dataset.ddCheckIn) {
      syncParent(el.dataset.ddCheckIn);
    }
  });

  const init = () => {
    document.querySelectorAll('input[data-dd-indeterminate]').forEach((el) => { el.indeterminate = true; });
    document.querySelectorAll('input[data-dd-check-all]').forEach((el) => syncParent(el.dataset.ddCheckAll));
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
