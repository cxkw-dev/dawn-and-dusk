/* Tabs: [data-dd-tabs] wraps a [role="tablist"] of [role="tab"] buttons and their [role="tabpanel"]s.
   - A tab finds its panel through aria-controls, or by order when aria-controls is missing (ids are filled in).
   - Roving focus: only the selected tab is in the tab order; Tab from it moves into its panel.
   - Automatic activation: ←/→ (↑/↓ when the list has aria-orientation="vertical"), Home and End move focus and select
     the tab in one step, wrapping at the ends; disabled tabs are skipped.
   - Fires "dd:tabchange" on the [data-dd-tabs] element when the selection changes (not on load, not when the current
     tab is pressed again) with { detail: { tab, panel, previous } }.
   - Global: dd.tabs.select(tabOrSelector) · dd.tabs.init() wires tabs added to the page later (left alone, they wire
     themselves the first time focus, a click or a key reaches them). */
(() => {
  let uid = 0;
  const own = (root, sel) => [...root.querySelectorAll(sel)].filter((el) => el.closest('[data-dd-tabs]') === root);
  const tabsOf = (root) => own(root, '[role="tab"]');
  const panelOf = (root, tab) => {
    const id = tab.getAttribute('aria-controls');
    if (id) return document.getElementById(id);
    return own(root, '[role="tabpanel"]')[tabsOf(root).indexOf(tab)] || null;
  };
  const enabled = (t) => !t.disabled && t.getAttribute('aria-disabled') !== 'true';
  const smooth = () => (matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth');

  const select = (root, tab, { focus = false, scroll = true, silent = false } = {}) => {
    let panel = null;
    const previous = tabsOf(root).find((t) => t.getAttribute('aria-selected') === 'true') || null;
    tabsOf(root).forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      const p = panelOf(root, t);
      if (p) p.hidden = !on;
      if (on) panel = p;
    });
    if (focus) tab.focus();
    if (scroll) {
      const list = tab.closest('[role="tablist"]');
      if (list && list.scrollWidth > list.clientWidth) {
        const lr = list.getBoundingClientRect(), tr = tab.getBoundingClientRect(), pad = 32;
        if (tr.left < lr.left + pad) list.scrollBy({ left: tr.left - lr.left - pad, behavior: smooth() });
        else if (tr.right > lr.right - pad) list.scrollBy({ left: tr.right - lr.right + pad, behavior: smooth() });
      }
    }
    if (!silent && previous !== tab) root.dispatchEvent(new CustomEvent('dd:tabchange', { bubbles: true, detail: { tab, panel, previous } }));
  };

  const init = (root) => {
    if (root.ddTabs) return;
    root.ddTabs = true;
    const tabs = tabsOf(root);
    if (!tabs.length) return;
    tabs.forEach((t) => {
      if (!t.id) t.id = `dd-tab-${++uid}`;
      const p = panelOf(root, t);
      if (p) {
        if (!p.id) p.id = `${t.id}-panel`;
        t.setAttribute('aria-controls', p.id);
        p.setAttribute('aria-labelledby', t.id);
        if (!p.hasAttribute('tabindex')) p.tabIndex = 0;
      }
    });
    const current = tabs.find((t) => t.getAttribute('aria-selected') === 'true') || tabs.find(enabled) || tabs[0];
    select(root, current, { scroll: false, silent: true });
  };
  const initAll = () => document.querySelectorAll('[data-dd-tabs]').forEach(init);

  document.addEventListener('click', (e) => {
    const tab = e.target.closest('[data-dd-tabs] [role="tab"]');
    if (!tab || !enabled(tab)) return;
    const root = tab.closest('[data-dd-tabs]');
    init(root);
    select(root, tab);
  });

  document.addEventListener('keydown', (e) => {
    const tab = e.target.closest?.('[data-dd-tabs] [role="tab"]');
    if (!tab || e.altKey || e.ctrlKey || e.metaKey) return;
    const root = tab.closest('[data-dd-tabs]');
    init(root);
    const vertical = tab.closest('[role="tablist"]')?.getAttribute('aria-orientation') === 'vertical';
    const keys = vertical ? { ArrowUp: -1, ArrowDown: 1 } : { ArrowLeft: -1, ArrowRight: 1 };
    const list = tabsOf(root).filter(enabled);
    let i = list.indexOf(tab);
    if (e.key in keys) i = (i + keys[e.key] + list.length) % list.length;
    else if (e.key === 'Home') i = 0;
    else if (e.key === 'End') i = list.length - 1;
    else return;
    e.preventDefault();
    select(root, list[i], { focus: true });
  });

  // Tabs rendered after load are wired the first time focus reaches them (or on the first click / key, above).
  document.addEventListener('focusin', (e) => {
    const root = e.target.closest?.('[data-dd-tabs]');
    if (root && e.target.matches('[role="tab"]')) init(root);
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initAll); else initAll();
  window.dd = window.dd || {};
  window.dd.tabs = {
    init: initAll,
    select: (target) => {
      const tab = typeof target === 'string' ? document.querySelector(target) : target;
      const root = tab?.closest?.('[data-dd-tabs]');
      if (root && enabled(tab)) { init(root); select(root, tab); }
    },
  };
})();
