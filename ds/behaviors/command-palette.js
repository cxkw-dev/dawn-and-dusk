/* Command palette: [data-dd-command="dialog-id"] opens that <dialog class="dd-command"> (empty value → the first one);
   ⌘K / Ctrl+K toggles the page's palette (the one marked [data-dd-hotkey], else the first). Typing filters
   .dd-command__item rows by their text and optional data-keywords; empty groups hide and .dd-command__empty shows
   (its .dd-command__query echoes the search). ↑ ↓ (or Ctrl+P / Ctrl+N) move the selected row, Enter runs it,
   Esc clears the search and then closes, a click on the backdrop closes. Running a row clicks it (links navigate),
   fires a bubbling `dd:command` event with detail { item, value } and closes the dialog. value = the row's data-value,
   else its name (the first part of .dd-command__body), else its text. Works on inline palettes too. */
(() => {
  const ITEM = '.dd-command__item';
  let uid = 0;
  let lastFocus = null;

  const parts = (root) => ({ input: root.querySelector('.dd-command__input'), list: root.querySelector('.dd-command__list'), empty: root.querySelector('.dd-command__empty') });
  const visible = (root) => [...root.querySelectorAll(ITEM)].filter((el) => !el.closest('[hidden]') && el.getAttribute('aria-disabled') !== 'true');
  const selected = (root) => root.querySelector(`${ITEM}[aria-selected="true"]`);
  // What a row is called: its text without the trailing shortcut hint (so "then" or "⌘" never match a search).
  const words = (el) => [...el.childNodes].filter((n) => !n.classList?.contains('dd-command__hint')).map((n) => n.textContent).join(' ');
  const valueOf = (item) => item.dataset.value ?? (item.querySelector('.dd-command__body > :first-child') || item).textContent.trim().replace(/\s+/g, ' ');

  function select(root, item, scroll) {
    root.querySelectorAll(`${ITEM}[aria-selected="true"]`).forEach((el) => el.setAttribute('aria-selected', 'false'));
    const { input } = parts(root);
    if (!item) { input?.removeAttribute('aria-activedescendant'); return; }
    if (!item.id) item.id = `dd-command-item-${++uid}`;
    item.setAttribute('aria-selected', 'true');
    input?.setAttribute('aria-activedescendant', item.id);
    if (scroll) item.scrollIntoView({ block: 'nearest' });
  }

  function filter(root) {
    const { input, list, empty } = parts(root);
    const query = (input?.value || '').trim().toLowerCase().split(/\s+/).filter(Boolean);
    root.querySelectorAll(ITEM).forEach((el) => {
      const hay = `${words(el)} ${el.dataset.keywords || ''}`.toLowerCase();
      el.hidden = !query.every((w) => hay.includes(w));
    });
    root.querySelectorAll('.dd-command__group').forEach((g) => { g.hidden = !g.querySelector(`${ITEM}:not([hidden])`); });
    if (list) list.hidden = false; // count matches with the list shown, or a list hidden by a miss never comes back
    const rows = visible(root);
    if (list) list.hidden = rows.length === 0;
    if (empty) {
      empty.hidden = rows.length > 0;
      empty.querySelectorAll('.dd-command__query').forEach((q) => { q.textContent = input?.value.trim() || ''; });
    }
    if (list) list.scrollTop = 0;
    select(root, rows[0], false);
  }

  function run(root, item) {
    if (!item || item.getAttribute('aria-disabled') === 'true') return;
    root.dispatchEvent(new CustomEvent('dd:command', { bubbles: true, detail: { item, value: valueOf(item) } }));
    if (root instanceof HTMLDialogElement && root.open) root.close();
  }

  function open(dialog) {
    if (!dialog || dialog.open) return;
    lastFocus = document.activeElement;
    const { input } = parts(dialog);
    if (input) { input.value = ''; input.setAttribute('role', input.getAttribute('role') || 'combobox'); input.setAttribute('aria-expanded', 'true'); }
    filter(dialog);
    dialog.showModal();
    input?.focus();
  }

  const palette = (id) => (id ? document.getElementById(id.replace(/^#/, '')) : null)
    || document.querySelector('dialog.dd-command[data-dd-hotkey]') || document.querySelector('dialog.dd-command');

  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-dd-command]');
    if (t) { e.preventDefault(); open(palette(t.getAttribute('data-dd-command'))); return; }
    // Backdrop: the click lands on the <dialog> itself, outside its content.
    if (e.target instanceof HTMLDialogElement && e.target.classList.contains('dd-command')) {
      const r = e.target.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) e.target.close();
      return;
    }
    const item = e.target.closest(ITEM);
    const root = item?.closest('.dd-command');
    if (root) { select(root, item, false); run(root, item); }
  });

  document.addEventListener('pointermove', (e) => {
    const item = e.target.closest?.(ITEM);
    const root = item?.closest('.dd-command');
    if (root && item !== selected(root) && item.getAttribute('aria-disabled') !== 'true') select(root, item, false);
  });

  document.addEventListener('input', (e) => {
    if (e.target.matches?.('.dd-command__input')) filter(e.target.closest('.dd-command'));
  });

  document.addEventListener('keydown', (e) => {
    // ⌘K / Ctrl+K
    if ((e.metaKey || e.ctrlKey) && !e.altKey && !e.shiftKey && e.key.toLowerCase() === 'k') {
      const d = palette();
      if (!d) return;
      e.preventDefault();
      if (d.open) d.close(); else open(d);
      return;
    }
    const root = e.target.closest?.('.dd-command');
    if (!root) return;
    const rows = visible(root);
    const i = rows.indexOf(selected(root));
    const key = e.ctrlKey && (e.key === 'n' || e.key === 'p') ? (e.key === 'n' ? 'ArrowDown' : 'ArrowUp') : e.key;
    if (key === 'ArrowDown' || key === 'ArrowUp') {
      e.preventDefault();
      if (!rows.length) return;
      const n = key === 'ArrowDown' ? (i + 1) % rows.length : (i <= 0 ? rows.length : i) - 1;
      select(root, rows[n], true);
    } else if (key === 'Enter' && e.target.matches('.dd-command__input')) {
      const item = selected(root);
      if (!item) return;
      e.preventDefault();
      item.click();
    } else if (key === 'Escape') {
      const { input } = parts(root);
      if (input?.value) { e.preventDefault(); input.value = ''; filter(root); }
    }
  });

  // Hand focus back to whatever opened the palette.
  document.addEventListener('close', (e) => {
    if (e.target.classList?.contains('dd-command') && lastFocus?.isConnected) lastFocus.focus({ preventScroll: true });
  }, true);
})();
