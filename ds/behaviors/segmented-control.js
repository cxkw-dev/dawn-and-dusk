/* Segmented control (button flavour): [data-dd-segmented] holds role="radio" buttons with aria-checked.
   Click or ← → ↑ ↓ Home End choose a segment; only the chosen one is in the tab order (roving tabindex).
   On change the control fires a bubbling `dd:change` event with detail { value, item }
   (value = the item's value / data-value attribute, or its label). The radio flavour needs no script. */
(() => {
  const ITEM = '[role="radio"]';
  const off = (el) => el.disabled || el.getAttribute('aria-disabled') === 'true';
  const itemsOf = (group) => [...group.querySelectorAll(ITEM)].filter((el) => el.closest('[data-dd-segmented]') === group);

  const sync = (group) => {
    const items = itemsOf(group);
    const current = items.find((el) => el.getAttribute('aria-checked') === 'true') || items.find((el) => !off(el));
    items.forEach((el) => { el.tabIndex = el === current ? 0 : -1; if (!el.hasAttribute('aria-checked')) el.setAttribute('aria-checked', 'false'); });
    if (!group.getAttribute('role')) group.setAttribute('role', 'radiogroup');
  };

  const choose = (group, item, focus) => {
    if (!item || off(item)) return;
    const was = item.getAttribute('aria-checked') === 'true';
    itemsOf(group).forEach((el) => el.setAttribute('aria-checked', String(el === item)));
    sync(group);
    if (focus) item.focus();
    if (!was) {
      const value = item.getAttribute('value') ?? item.dataset.value ?? item.textContent.trim();
      group.dispatchEvent(new CustomEvent('dd:change', { bubbles: true, detail: { value, item } }));
    }
  };

  document.addEventListener('click', (e) => {
    const item = e.target.closest(ITEM);
    const group = item?.closest('[data-dd-segmented]');
    if (group) choose(group, item, false);
  });

  document.addEventListener('keydown', (e) => {
    const item = e.target.closest?.(ITEM);
    const group = item?.closest('[data-dd-segmented]');
    if (!group) return;
    const items = itemsOf(group).filter((el) => !off(el));
    const i = items.indexOf(item);
    const rtl = getComputedStyle(group).direction === 'rtl';
    const step = { ArrowRight: rtl ? -1 : 1, ArrowDown: 1, ArrowLeft: rtl ? 1 : -1, ArrowUp: -1 }[e.key];
    let next = null;
    if (step) next = items[(i + step + items.length) % items.length];
    else if (e.key === 'Home') next = items[0];
    else if (e.key === 'End') next = items[items.length - 1];
    if (!next) return;
    e.preventDefault();
    choose(group, next, true);
    next.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  });

  // A control rendered after load gets its roving tabindex (and role) the first time focus reaches it.
  document.addEventListener('focusin', (e) => {
    const group = e.target.closest?.(ITEM)?.closest('[data-dd-segmented]');
    if (group) sync(group);
  });

  const init = () => document.querySelectorAll('[data-dd-segmented]').forEach(sync);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
