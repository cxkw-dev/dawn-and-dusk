/* Combobox — type to filter a listbox.
   Markup: [data-dd-combobox] (or ="multi") > .dd-input > input[role="combobox"] (+ optional [data-dd-combobox-toggle])
           and [role="listbox"] > [role="option"][data-value] (+ optional .dd-listbox__group / .dd-listbox__empty).
   Single: choosing fills the input. Multi: choosing toggles the option and adds / removes a chip
   (.dd-combobox__chip, coloured from the option's data-set="1…8" or by position). Matches are underlined.
   An optional <input type="hidden"> receives the value (comma-separated for multi).
   Fires a bubbling "dd-combobox" event with detail { value, values, option }.
   Keyboard: ↓ / ↑ open and move · Enter chooses · Esc closes, then clears · Backspace on empty removes the last chip. */
(() => {
  let uid = 0;
  const parts = (root) => ({
    input: root.querySelector('[role="combobox"]'),
    list: root.querySelector('[role="listbox"]'),
    box: root.querySelector('.dd-input'),
  });
  const multi = (root) => root.dataset.ddCombobox === 'multi';
  const options = (list) => [...list.querySelectorAll('[role="option"]')];
  const usable = (list) => options(list).filter((o) => !o.hidden && o.getAttribute('aria-disabled') !== 'true');
  const labelEl = (opt) => opt.querySelector('.dd-listbox__label') || opt;
  const labelOf = (opt) => (opt.dataset.label || labelEl(opt).dataset.text || labelEl(opt).textContent).trim();
  const valueOf = (opt) => opt.dataset.value ?? labelOf(opt);
  const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const icon = (name) => `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-${name}"/></svg>`;

  const setActive = (root, opt) => {
    const { input, list } = parts(root);
    list.querySelectorAll('[role="option"].is-active').forEach((o) => o.classList.remove('is-active'));
    if (!opt) { input.removeAttribute('aria-activedescendant'); return; }
    if (!opt.id) opt.id = `dd-cb-option-${++uid}`;
    opt.classList.add('is-active');
    input.setAttribute('aria-activedescendant', opt.id);
    opt.scrollIntoView({ block: 'nearest' });
  };

  const filter = (root, query) => {
    const { list } = parts(root);
    const q = query.trim().toLowerCase();
    let group = null; let groupHits = 0; let hits = 0;
    const closeGroup = () => { if (group) group.hidden = groupHits === 0; };
    for (const el of list.children) {
      if (el.classList.contains('dd-listbox__group')) { closeGroup(); group = el; groupHits = 0; continue; }
      if (el.getAttribute('role') !== 'option') continue;
      const lab = labelEl(el);
      if (lab.dataset.text === undefined) lab.dataset.text = lab.textContent;
      const text = lab.dataset.text;
      const at = q ? text.toLowerCase().indexOf(q) : -1;
      const show = !q || at >= 0 || (el.dataset.keywords || '').toLowerCase().includes(q);
      el.hidden = !show;
      lab.innerHTML = at >= 0
        ? `${esc(text.slice(0, at))}<mark class="dd-listbox__match">${esc(text.slice(at, at + q.length))}</mark>${esc(text.slice(at + q.length))}`
        : esc(text);
      if (show) { hits++; groupHits++; }
    }
    closeGroup();
    const empty = list.querySelector('.dd-listbox__empty');
    if (empty) empty.hidden = hits > 0;
    setActive(root, usable(list)[0]);
  };

  const open = (root, query) => {
    const { input, list } = parts(root);
    if (input.disabled || input.readOnly) return;
    document.querySelectorAll('[data-dd-combobox].is-open').forEach((r) => r !== root && close(r));
    if (!list.id) list.id = `dd-cb-list-${++uid}`;
    input.setAttribute('aria-controls', list.id);
    filter(root, query ?? '');
    if (!list.hidden) return;
    list.hidden = false;
    input.setAttribute('aria-expanded', 'true');
    root.classList.add('is-open');
    const selected = !multi(root) && query === undefined && list.querySelector('[role="option"][aria-selected="true"]');
    if (selected) setActive(root, selected);
  };

  const close = (root) => {
    const { input, list } = parts(root);
    if (!list || list.hidden) return;
    list.hidden = true;
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
    root.classList.remove('is-open');
  };

  const sync = (root, opt) => {
    const { list } = parts(root);
    const values = options(list).filter((o) => o.getAttribute('aria-selected') === 'true').map(valueOf);
    const hidden = root.querySelector('input[type="hidden"]');
    if (hidden) { hidden.value = values.join(','); hidden.dispatchEvent(new Event('change', { bubbles: true })); }
    root.dispatchEvent(new CustomEvent('dd-combobox', { bubbles: true, detail: { value: values[0] ?? '', values, option: opt } }));
  };

  const chipFor = (root, opt) => {
    const { list } = parts(root);
    const n = opt.dataset.set || (options(list).indexOf(opt) % 8) + 1;
    const label = labelOf(opt);
    const chip = document.createElement('span');
    chip.className = 'dd-combobox__chip';
    chip.dataset.value = valueOf(opt);
    chip.style.setProperty('--dd-chip', `var(--dd-set-${n})`);
    chip.innerHTML = `<span>${esc(label)}</span><button class="dd-combobox__remove" type="button" aria-label="Remove ${esc(label)}">${icon('x')}</button>`;
    return chip;
  };

  const choose = (root, opt) => {
    if (!opt || opt.getAttribute('aria-disabled') === 'true') return;
    const { input, list, box } = parts(root);
    if (multi(root)) {
      const on = opt.getAttribute('aria-selected') !== 'true';
      opt.setAttribute('aria-selected', String(on));
      const value = valueOf(opt);
      const existing = [...box.querySelectorAll('.dd-combobox__chip')].find((c) => c.dataset.value === value);
      if (on && !existing) box.insertBefore(chipFor(root, opt), input);
      if (!on && existing) existing.remove();
      input.value = '';
      filter(root, '');
      setActive(root, opt);
      input.focus();
    } else {
      options(list).forEach((o) => o.setAttribute('aria-selected', String(o === opt)));
      input.value = labelOf(opt);
      close(root);
    }
    sync(root, opt);
  };

  const removeChip = (root, chip) => {
    const { list } = parts(root);
    const opt = options(list).find((o) => valueOf(o) === chip.dataset.value);
    if (opt) opt.setAttribute('aria-selected', 'false');
    chip.remove();
    sync(root, opt);
  };

  const move = (root, step) => {
    const { list } = parts(root);
    const opts = usable(list);
    const cur = opts.indexOf(list.querySelector('[role="option"].is-active'));
    setActive(root, opts[Math.max(0, Math.min(opts.length - 1, cur + step))]);
  };

  document.addEventListener('mousedown', (e) => {
    // Keep focus in the input while clicking options or chips.
    if (e.target.closest('[data-dd-combobox] [role="listbox"]')) e.preventDefault();
  });

  document.addEventListener('click', (e) => {
    const root = e.target.closest('[data-dd-combobox]');
    document.querySelectorAll('[data-dd-combobox].is-open').forEach((r) => r !== root && close(r));
    if (!root) return;
    const { input, list } = parts(root);
    const remove = e.target.closest('.dd-combobox__remove');
    if (remove) { removeChip(root, remove.closest('.dd-combobox__chip')); input.focus(); return; }
    if (e.target.closest('[data-dd-combobox-toggle]')) {
      if (list.hidden) open(root); else close(root);
      input.focus();
      return;
    }
    const opt = e.target.closest('[role="option"]');
    if (opt && list.contains(opt)) { choose(root, opt); return; }
    if (e.target.closest('.dd-input') && !input.disabled) { input.focus(); if (list.hidden) open(root); }
  });

  // The pointer and the keyboard share one highlight: hovering an option makes it the active one.
  document.addEventListener('mousemove', (e) => {
    const opt = e.target.closest?.('[data-dd-combobox] [role="option"]');
    if (!opt || opt.classList.contains('is-active') || opt.getAttribute('aria-disabled') === 'true') return;
    const root = opt.closest('[data-dd-combobox]');
    if (parts(root).list.contains(opt)) { const y = opt.parentElement.scrollTop; setActive(root, opt); opt.parentElement.scrollTop = y; }
  });

  document.addEventListener('input', (e) => {
    const root = e.target.closest?.('[data-dd-combobox]');
    if (!root || e.target !== parts(root).input) return;
    open(root, e.target.value);
  });

  document.addEventListener('keydown', (e) => {
    const root = e.target.closest?.('[data-dd-combobox]');
    if (!root) return;
    const { input, list, box } = parts(root);
    if (e.target !== input) return;
    const isOpen = !list.hidden;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) open(root, multi(root) ? input.value : undefined); else move(root, 1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) move(root, -1);
        break;
      case 'Enter':
        if (isOpen) { e.preventDefault(); choose(root, list.querySelector('[role="option"].is-active')); }
        break;
      case 'Escape':
        if (isOpen) { e.preventDefault(); close(root); }
        else if (input.value && !multi(root)) {
          e.preventDefault();
          input.value = '';
          options(list).forEach((o) => o.setAttribute('aria-selected', 'false'));
          sync(root);
        }
        break;
      case 'Backspace':
        if (multi(root) && !input.value) {
          const chips = box.querySelectorAll('.dd-combobox__chip');
          if (chips.length) removeChip(root, chips[chips.length - 1]);
        }
        break;
      case 'Tab':
        close(root);
        break;
    }
  });

  // Single: leaving the field restores the chosen label if the typed text matches nothing.
  document.addEventListener('focusout', (e) => {
    const root = e.target.closest?.('[data-dd-combobox]');
    if (!root || (e.relatedTarget && root.contains(e.relatedTarget))) return;
    close(root);
    if (multi(root)) return;
    const { input, list } = parts(root);
    const chosen = list.querySelector('[role="option"][aria-selected="true"]');
    if (input.value && (!chosen || labelOf(chosen) !== input.value)) {
      const exact = options(list).find((o) => labelOf(o).toLowerCase() === input.value.trim().toLowerCase());
      if (exact) choose(root, exact); else input.value = chosen ? labelOf(chosen) : '';
    }
  });
})();
