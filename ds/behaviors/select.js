/* Select menu — a button that opens a listbox of options.
   Markup: [data-dd-select] > button[aria-haspopup="listbox"] (.dd-select) + [role="listbox"] (.dd-listbox, hidden)
           > [role="option"][data-value] (aria-selected on the chosen one, aria-disabled to skip).
   The trigger's [data-dd-select-value] (or its .dd-input__control) shows the chosen option's label; an optional
   <input type="hidden"> inside the root receives the value. Fires a bubbling "dd-select" event with
   detail { value, label, option }, and "change" on the hidden input.
   Keyboard: Enter / Space / ↓ / ↑ open; ↑ ↓ Home End move; type to jump; Enter / Space choose; Esc closes. */
(() => {
  let uid = 0;
  const parts = (root) => ({
    btn: root.querySelector('[aria-haspopup="listbox"]'),
    list: root.querySelector('[role="listbox"]'),
  });
  const options = (list) => [...list.querySelectorAll('[role="option"]:not([aria-disabled="true"]):not([hidden])')];
  // Open menus: by class, or rendered open in the markup (list not hidden).
  const openRoots = () => [...document.querySelectorAll('[data-dd-select]')].filter((r) => r.classList.contains('is-open') || r.querySelector('[role="listbox"]:not([hidden])'));
  const labelOf = (opt) => (opt.dataset.label || opt.querySelector('.dd-listbox__label')?.textContent || opt.textContent).trim();

  const setActive = (list, opt) => {
    list.querySelectorAll('[role="option"].is-active').forEach((o) => o.classList.remove('is-active'));
    if (!opt) { list.removeAttribute('aria-activedescendant'); return; }
    if (!opt.id) opt.id = `dd-option-${++uid}`;
    opt.classList.add('is-active');
    list.setAttribute('aria-activedescendant', opt.id);
    opt.scrollIntoView({ block: 'nearest' });
  };

  const close = (root, refocus = true) => {
    const { btn, list } = parts(root);
    if (!list || list.hidden) return;
    list.hidden = true;
    btn.setAttribute('aria-expanded', 'false');
    root.classList.remove('is-open');
    if (refocus) btn.focus();
  };

  const open = (root, which) => {
    const { btn, list } = parts(root);
    if (!btn || !list || btn.disabled) return;
    openRoots().forEach((r) => r !== root && close(r, false));
    if (!list.id) list.id = `dd-listbox-${++uid}`;
    btn.setAttribute('aria-controls', list.id);
    list.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    root.classList.add('is-open');
    const opts = options(list);
    const selected = list.querySelector('[role="option"][aria-selected="true"]');
    setActive(list, which === 'last' ? opts.at(-1) : which === 'first' ? opts[0] : selected || opts[0]);
    list.focus({ preventScroll: true });
  };

  const choose = (root, opt) => {
    const { btn, list } = parts(root);
    if (!opt || opt.getAttribute('aria-disabled') === 'true') return;
    list.querySelectorAll('[role="option"][aria-selected="true"]').forEach((o) => o.setAttribute('aria-selected', 'false'));
    opt.setAttribute('aria-selected', 'true');
    const value = opt.dataset.value ?? labelOf(opt);
    const label = labelOf(opt);
    const out = btn.querySelector('[data-dd-select-value]') || btn.querySelector('.dd-input__control');
    if (out) {
      const icon = opt.querySelector('.dd-listbox__icon, .dd-listbox__swatch');
      out.textContent = '';
      if (icon) out.append(icon.cloneNode(true));
      out.append(label);
      out.classList.remove('dd-select__placeholder');
    }
    const hidden = root.querySelector('input[type="hidden"]');
    if (hidden) { hidden.value = value; hidden.dispatchEvent(new Event('change', { bubbles: true })); }
    root.dispatchEvent(new CustomEvent('dd-select', { bubbles: true, detail: { value, label, option: opt } }));
    close(root);
  };

  // Typeahead: letters typed within 600ms build a prefix to jump to.
  const typeahead = new WeakMap();
  const jump = (root, list, key) => {
    const t = typeahead.get(root) || { q: '', at: 0 };
    const now = Date.now();
    t.q = (now - t.at > 600 ? '' : t.q) + key.toLowerCase();
    t.at = now;
    typeahead.set(root, t);
    const opts = options(list);
    const hit = opts.find((o) => labelOf(o).toLowerCase().startsWith(t.q));
    if (hit) setActive(list, hit);
  };

  document.addEventListener('click', (e) => {
    const root = e.target.closest('[data-dd-select]');
    openRoots().forEach((r) => r !== root && close(r, false));
    if (!root) return;
    const { btn, list } = parts(root);
    if (e.target.closest('[aria-haspopup="listbox"]') === btn) {
      if (list.hidden) open(root); else close(root);
      return;
    }
    const opt = e.target.closest('[role="option"]');
    if (opt && list.contains(opt)) choose(root, opt);
  });

  document.addEventListener('mousemove', (e) => {
    const opt = e.target.closest?.('[data-dd-select] [role="option"]');
    if (opt && !opt.classList.contains('is-active') && opt.getAttribute('aria-disabled') !== 'true') {
      const list = opt.closest('[role="listbox"]');
      list.querySelectorAll('.is-active').forEach((o) => o.classList.remove('is-active'));
      opt.classList.add('is-active');
      if (!opt.id) opt.id = `dd-option-${++uid}`;
      list.setAttribute('aria-activedescendant', opt.id);
    }
  });

  document.addEventListener('keydown', (e) => {
    const root = e.target.closest?.('[data-dd-select]');
    if (!root) return;
    const { btn, list } = parts(root);
    if (e.target === btn) {
      if (['ArrowDown', 'ArrowUp'].includes(e.key)) { e.preventDefault(); open(root, e.key === 'ArrowUp' ? 'last' : undefined); }
      return;
    }
    if (e.target !== list) return;
    const opts = options(list);
    const cur = opts.indexOf(list.querySelector('[role="option"].is-active'));
    switch (e.key) {
      case 'ArrowDown': e.preventDefault(); setActive(list, opts[Math.min(cur + 1, opts.length - 1)]); break;
      case 'ArrowUp': e.preventDefault(); setActive(list, opts[Math.max(cur - 1, 0)]); break;
      case 'Home': case 'PageUp': e.preventDefault(); setActive(list, opts[0]); break;
      case 'End': case 'PageDown': e.preventDefault(); setActive(list, opts.at(-1)); break;
      case 'Enter': case ' ': e.preventDefault(); choose(root, opts[cur]); break;
      case 'Escape': e.preventDefault(); close(root); break;
      case 'Tab': close(root, false); break;
      default: if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) jump(root, list, e.key);
    }
  });

  // Losing focus to somewhere outside the menu closes it.
  document.addEventListener('focusout', (e) => {
    const root = e.target.closest?.('[data-dd-select]');
    if (root && !parts(root).list?.hidden && e.relatedTarget && !root.contains(e.relatedTarget)) close(root, false);
  });
})();
