/* Data table — opt in with [data-dd-data-table] on .dd-data-table.
   - Sort: <th aria-sort="none"><button class="dd-data-table__sort">…</button></th> cycles none → ascending → descending → none.
     Rows sort within each group; expanded detail rows travel with their row. Mark numeric columns with .is-num;
     a cell's data-value (if set) is used instead of its text. Emits dd:sort { column, direction, index }.
   - Select: .dd-data-table__check in the header selects every visible row (with indeterminate state); Shift-click selects a
     range. Selected rows get .is-selected; .dd-data-table__bulk shows while anything is selected and
     [data-dd-data-table-selected] receives the count. [data-dd-data-table-clear] clears the selection (focus moves to the
     select-all box). Emits dd:selectionchange { count, rows }.
   - Expand: .dd-data-table__expand[aria-controls] toggles its detail row (hidden) and aria-expanded.
   - Filter: [data-dd-data-table-search] (text), toggle chips [data-dd-data-table-filter="col=value"] with aria-pressed, and
     checkboxes with the same attribute (e.g. in a .dd-data-table__menu). Cells carry data-col="col" and optionally
     data-value. Same column = OR, different columns = AND. [data-dd-data-table-filter-label="col"] shows "all", the one value,
     or "2 selected", and marks its chip .is-active. A chip with [data-dd-data-table-removable] disappears once cleared.
     [data-dd-data-table-count="noun"] shows "12 services" / "3 of 12 services"; .dd-data-table__empty-row shows when
     nothing matches and [data-dd-data-table-query] receives the query. [data-dd-data-table-reset] clears filters and
     returns focus to the search.
   - Pages: a [data-dd-pagination] element inside the root (see pagination.js) pages the filtered rows in the browser.
     Filtering returns to page 1; sorting keeps the page.
   - Columns: inputs [data-dd-data-table-column="col"] show/hide the column whose <th data-col="col">.
   - Menus (.dd-data-table__menu, a <details>) close on Esc (focus returns to the summary) and on any click outside.
   - Scroll: adds .is-scrolled-x / .is-scrolled-y to the root so the frozen column and sticky header cast an edge. */
(() => {
  const ROOT = '[data-dd-data-table]';
  const SKIP = '.dd-data-table__group, .dd-data-table__detail, .dd-data-table__empty-row';
  const lastClicked = new WeakMap();

  const dataRows = (root) => [...root.querySelectorAll('tbody > tr')].filter((r) => !r.matches(SKIP));
  const rowBox = (tr) => tr.querySelector('.dd-data-table__select .dd-data-table__check');
  const detailOf = (tr) => {
    const btn = tr.querySelector('.dd-data-table__expand[aria-controls]');
    return btn ? document.getElementById(btn.getAttribute('aria-controls')) : null;
  };
  const pagerOf = (root) => root.querySelector('[data-dd-pagination]');
  const emit = (root, name, detail) => root.dispatchEvent(new CustomEvent(name, { bubbles: true, detail }));

  // ---------- selection ----------
  function syncSelection(root) {
    const boxes = dataRows(root).map(rowBox).filter(Boolean);
    const visible = boxes.filter((b) => !b.closest('tr').hidden);
    let n = 0;
    for (const b of boxes) {
      b.closest('tr').classList.toggle('is-selected', b.checked);
      if (b.checked) n++;
    }
    const vChecked = visible.filter((b) => b.checked).length;
    const all = root.querySelector('thead .dd-data-table__check');
    if (all) {
      all.checked = visible.length > 0 && vChecked === visible.length;
      all.indeterminate = vChecked > 0 && vChecked < visible.length;
    }
    root.querySelectorAll('.dd-data-table__bulk').forEach((bar) => { bar.hidden = n === 0; });
    root.querySelectorAll('[data-dd-data-table-selected]').forEach((el) => { el.textContent = n.toLocaleString(); });
    return n;
  }
  const selectionChanged = (root) => {
    const n = syncSelection(root);
    emit(root, 'dd:selectionchange', { count: n, rows: dataRows(root).filter((r) => rowBox(r)?.checked) });
  };

  // ---------- sorting ----------
  const keyOf = (tr, i, numeric) => {
    const cell = tr.cells[i];
    if (!cell) return null;
    const raw = (cell.dataset.value ?? cell.textContent).trim();
    if (!numeric) return raw || null;
    const n = parseFloat(raw.replace(/[^\d.\-]/g, ''));
    return Number.isNaN(n) ? null : n;
  };

  function sortTable(root, th, dir) {
    const table = th.closest('table');
    const index = [...th.parentElement.cells].indexOf(th);
    const numeric = th.classList.contains('is-num') || th.dataset.type === 'number';
    for (const tbody of table.tBodies) {
      const segments = [{ head: null, units: [] }];
      const tail = [];
      [...tbody.rows].forEach((r, i) => {
        if (!r.dataset.ddOrder) r.dataset.ddOrder = String(i);
        const seg = segments[segments.length - 1];
        if (r.classList.contains('dd-data-table__group')) segments.push({ head: r, units: [] });
        else if (r.classList.contains('dd-data-table__empty-row')) tail.push(r);
        else if (r.classList.contains('dd-data-table__detail') && seg.units.length) seg.units[seg.units.length - 1].push(r);
        else seg.units.push([r]);
      });
      const cmp = (a, b) => {
        if (dir === 'none') return +a[0].dataset.ddOrder - +b[0].dataset.ddOrder;
        const ka = keyOf(a[0], index, numeric);
        const kb = keyOf(b[0], index, numeric);
        if (ka === null && kb === null) return 0;
        if (ka === null) return 1; // blanks always last
        if (kb === null) return -1;
        const d = numeric ? ka - kb : String(ka).localeCompare(String(kb), undefined, { numeric: true, sensitivity: 'base' });
        return dir === 'descending' ? -d : d;
      };
      const frag = document.createDocumentFragment();
      for (const seg of segments) {
        if (seg.head) frag.append(seg.head);
        seg.units.sort(cmp).forEach((u) => frag.append(...u));
      }
      tail.forEach((r) => frag.append(r));
      tbody.append(frag);
    }
  }

  // ---------- filtering + paging ----------
  const filterOn = (el) => (el.matches('input') ? el.checked : el.getAttribute('aria-pressed') === 'true');

  function refresh(root, { firstPage = false } = {}) {
    const input = root.querySelector('[data-dd-data-table-search]');
    const q = (input?.value || '').trim().toLowerCase();
    const active = {};
    root.querySelectorAll('[data-dd-data-table-filter]').forEach((el) => {
      const on = filterOn(el);
      if (el.hasAttribute('data-dd-data-table-removable')) el.hidden = !on;
      if (!on) return;
      const [k, v] = el.dataset.ddDataTableFilter.split('=');
      (active[k] ||= []).push(v);
    });
    root.querySelectorAll('[data-dd-data-table-filter-label]').forEach((el) => {
      const vals = active[el.dataset.ddDataTableFilterLabel] || [];
      el.textContent = vals.length === 0 ? 'all' : vals.length === 1 ? vals[0] : `${vals.length} selected`;
      el.closest('.dd-data-table__chip')?.classList.toggle('is-active', vals.length > 0);
    });

    const rows = dataRows(root);
    const matched = rows.filter((tr) => {
      if (q && !tr.textContent.toLowerCase().includes(q)) return false;
      for (const [k, vals] of Object.entries(active)) {
        const cell = tr.querySelector(`[data-col="${k}"]`);
        const v = (cell?.dataset.value ?? cell?.textContent ?? '').trim();
        if (!vals.includes(v)) return false;
      }
      return true;
    });

    // Paging: only the current page of the matching rows shows.
    let shown = new Set(matched);
    const pager = pagerOf(root);
    if (pager) {
      const sel = pager.querySelector('.dd-pagination__size select');
      const size = Number(pager.dataset.pageSize) || Number(sel?.value) || matched.length || 1;
      const pages = Math.max(1, Math.ceil(matched.length / size));
      const page = firstPage ? 1 : Math.min(pages, Math.max(1, Number(pager.dataset.page) || 1));
      pager.dataset.total = String(matched.length);
      pager.dataset.page = String(page);
      shown = new Set(matched.slice((page - 1) * size, page * size));
      window.dd?.pagination?.(pager);
    }

    for (const tr of rows) {
      tr.hidden = !shown.has(tr);
      const det = detailOf(tr);
      if (det) det.hidden = tr.hidden || tr.querySelector('.dd-data-table__expand')?.getAttribute('aria-expanded') !== 'true';
    }
    // A group header hides when every row under it is hidden.
    for (const tbody of root.querySelectorAll('tbody')) {
      let group = null; let any = false;
      const close = () => { if (group) group.hidden = !any; };
      for (const r of tbody.rows) {
        if (r.classList.contains('dd-data-table__group')) { close(); group = r; any = false; }
        else if (!r.matches(SKIP) && !r.hidden) any = true;
      }
      close();
    }
    root.querySelectorAll('.dd-data-table__empty-row').forEach((r) => { r.hidden = matched.length > 0; });
    root.querySelectorAll('[data-dd-data-table-query]').forEach((el) => { el.textContent = q ? `“${input.value.trim()}”` : 'these filters'; });
    root.querySelectorAll('[data-dd-data-table-count]').forEach((el) => {
      const noun = el.dataset.ddDataTableCount || 'rows';
      el.textContent = matched.length === rows.length ? `${rows.length.toLocaleString()} ${noun}` : `${matched.length.toLocaleString()} of ${rows.length.toLocaleString()} ${noun}`;
    });
    syncSelection(root);
  }

  // ---------- column visibility ----------
  function setColumn(root, key, show) {
    const table = root.querySelector('table');
    const th = table?.querySelector(`thead th[data-col="${key}"]`);
    if (!th) return;
    const index = [...th.parentElement.cells].indexOf(th);
    for (const row of table.rows) {
      const cell = row.cells[index];
      if (cell && !cell.hasAttribute('colspan')) cell.hidden = !show;
    }
    const cols = th.parentElement.cells.length;
    const hidden = [...th.parentElement.cells].filter((c) => c.hidden).length;
    table.querySelectorAll('td[colspan], th[colspan]').forEach((c) => {
      if (!c.dataset.ddSpan) c.dataset.ddSpan = c.getAttribute('colspan');
      if (+c.dataset.ddSpan >= cols) c.setAttribute('colspan', String(cols - hidden));
    });
  }

  // ---------- events ----------
  document.addEventListener('click', (e) => {
    // Any click outside an open column / filter menu closes it, whichever table it belongs to.
    document.querySelectorAll(`${ROOT} .dd-data-table__menu[open]`).forEach((d) => { if (!d.contains(e.target)) d.open = false; });
    const root = e.target.closest(ROOT);
    if (!root) return;

    const sort = e.target.closest('.dd-data-table__sort');
    if (sort) {
      const th = sort.closest('th');
      const next = { none: 'ascending', ascending: 'descending', descending: 'none' }[th.getAttribute('aria-sort') || 'none'];
      th.closest('tr').querySelectorAll('th[aria-sort]').forEach((h) => h.setAttribute('aria-sort', 'none'));
      th.setAttribute('aria-sort', next);
      sortTable(root, th, next);
      if (pagerOf(root)) refresh(root);
      emit(root, 'dd:sort', { column: th.dataset.col ?? null, direction: next, index: [...th.parentElement.cells].indexOf(th) });
      return;
    }

    const expand = e.target.closest('.dd-data-table__expand');
    if (expand) {
      const open = expand.getAttribute('aria-expanded') !== 'true';
      expand.setAttribute('aria-expanded', String(open));
      const det = document.getElementById(expand.getAttribute('aria-controls'));
      if (det) det.hidden = !open;
      return;
    }

    const box = e.target.closest('tbody .dd-data-table__check');
    if (box) {
      const boxes = dataRows(root).filter((r) => !r.hidden).map(rowBox).filter(Boolean);
      const prev = lastClicked.get(root);
      if (e.shiftKey && prev && boxes.includes(prev)) {
        const [a, b] = [boxes.indexOf(prev), boxes.indexOf(box)].sort((x, y) => x - y);
        boxes.slice(a, b + 1).forEach((b2) => { b2.checked = box.checked; });
      }
      lastClicked.set(root, box);
      selectionChanged(root);
      return;
    }

    const chip = e.target.closest('[data-dd-data-table-filter]:not(input)');
    if (chip) {
      const on = chip.getAttribute('aria-pressed') !== 'true';
      chip.setAttribute('aria-pressed', String(on));
      // A removable chip vanishes once cleared; keep focus in the toolbar.
      if (!on && chip.hasAttribute('data-dd-data-table-removable')) root.querySelector('[data-dd-data-table-search]')?.focus();
      refresh(root, { firstPage: true });
      return;
    }

    if (e.target.closest('[data-dd-data-table-clear]')) {
      dataRows(root).map(rowBox).filter(Boolean).forEach((b) => { b.checked = false; });
      selectionChanged(root);
      root.querySelector('thead .dd-data-table__check')?.focus();
      return;
    }

    if (e.target.closest('[data-dd-data-table-reset]')) {
      const input = root.querySelector('[data-dd-data-table-search]');
      if (input) input.value = '';
      root.querySelectorAll('[data-dd-data-table-filter]').forEach((c) => {
        if (c.matches('input')) c.checked = false; else c.setAttribute('aria-pressed', 'false');
      });
      refresh(root, { firstPage: true });
      (input && !input.closest('[hidden]') ? input : root.querySelector('.dd-data-table__scroll'))?.focus();
    }
  });

  document.addEventListener('change', (e) => {
    const root = e.target.closest(ROOT);
    if (!root) return;
    if (e.target.matches('thead .dd-data-table__check')) {
      const on = e.target.checked;
      dataRows(root).filter((r) => !r.hidden).map(rowBox).filter(Boolean).forEach((b) => { b.checked = on; });
      selectionChanged(root);
    } else if (e.target.matches('[data-dd-data-table-column]')) {
      setColumn(root, e.target.dataset.ddDataTableColumn, e.target.checked);
    } else if (e.target.matches('input[data-dd-data-table-filter]')) {
      refresh(root, { firstPage: true });
    }
  });

  document.addEventListener('input', (e) => {
    if (!e.target.matches('[data-dd-data-table-search]')) return;
    const root = e.target.closest(ROOT);
    if (root) refresh(root, { firstPage: true });
  });

  // A page change from the footer pager: show that page and bring the first row into view.
  document.addEventListener('dd:pagechange', (e) => {
    const root = e.target.closest(ROOT);
    if (!root || !root.contains(e.target)) return;
    refresh(root);
    const scroller = root.querySelector('.dd-data-table__scroll');
    if (scroller) scroller.scrollTop = 0;
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const menu = e.target.closest?.(`${ROOT} .dd-data-table__menu[open]`);
    if (menu) { menu.open = false; menu.querySelector('summary')?.focus(); e.preventDefault(); }
  });

  document.addEventListener('scroll', (e) => {
    const el = e.target;
    if (!(el instanceof Element) || !el.classList.contains('dd-data-table__scroll')) return;
    const root = el.closest('.dd-data-table');
    root?.classList.toggle('is-scrolled-x', el.scrollLeft > 0);
    root?.classList.toggle('is-scrolled-y', el.scrollTop > 0);
  }, true);

  const init = () => document.querySelectorAll(ROOT).forEach((root) => {
    root.querySelectorAll('[data-dd-data-table-column]').forEach((inp) => { if (!inp.checked) setColumn(root, inp.dataset.ddDataTableColumn, false); });
    if (root.querySelector('[data-dd-data-table-search], [data-dd-data-table-filter], [data-dd-data-table-count], [data-dd-pagination]')) refresh(root);
    else syncSelection(root);
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
