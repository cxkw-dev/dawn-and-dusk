/* Pagination — opt in with [data-dd-pagination] on a .dd-pagination, or on a wrapper that also holds the page-size select.
   State lives in attributes: data-page (1-based) and either data-pages, or data-total + data-page-size (a
   .dd-pagination__size select inside sets the size when data-page-size is absent). The behaviour keeps the markup in step:
   numbered pages (first, last, the current page and its neighbours, a gap for the rest: never more than seven slots),
   aria-current="page", "Page 4 of 50", the range ("<b>151–200</b> of 2,481") and aria-disabled on the arrows at either end
   (they stay focusable, so keyboard focus never drops). The first .dd-pagination__step goes back, the last goes forward,
   counted within each list of pages (or pager): one root can hold the same pagination above and below a table.
   Clicking a page or an arrow, or changing the size, emits a bubbling dd:pagechange with
   { page, pages, pageSize, total, from, to }. dd.pagination(el, { page, pages, total, pageSize }) sets state from script
   (no event) and returns it. Without the attribute the markup is static: render links with real hrefs on the server. */
(() => {
  window.dd = window.dd || {};
  const ROOT = '[data-dd-pagination]';
  const num = (v) => (v == null || v === '' ? NaN : Number(v));
  const fmt = (n) => n.toLocaleString('en-US');
  const sizeSelect = (root) => root.querySelector('.dd-pagination__size select');
  const shown = new WeakMap(); // root → the state last rendered (a size change must start from the old size)
  // The arrows that belong together: those in the same list of pages, else the same pager. One root can hold several
  // pagers (above and below a table), so the first / last arrow is counted within its own.
  const groupOf = (step, root) => { const g = step.closest('.dd-pagination__pages, .dd-pagination'); return g && root.contains(g) ? g : root; };
  const stepsBeside = (step, root) => { const g = groupOf(step, root); return [...root.querySelectorAll('.dd-pagination__step')].filter((s) => groupOf(s, root) === g); };

  function state(root) {
    let size = num(root.dataset.pageSize);
    const sel = sizeSelect(root);
    if (!(size > 0) && sel) size = num(sel.value);
    const total = num(root.dataset.total);
    const known = total >= 0 && size > 0;
    let pages = known ? Math.max(1, Math.ceil(total / size)) : num(root.dataset.pages);
    if (!(pages >= 1)) pages = 1;
    const page = Math.min(pages, Math.max(1, Math.round(num(root.dataset.page)) || 1));
    return {
      page, pages,
      pageSize: size > 0 ? size : null,
      total: total >= 0 ? total : null,
      from: known ? Math.min(total, (page - 1) * size + 1) : null,
      to: known ? Math.min(total, page * size) : null,
    };
  }

  // First and last page, the current one and its neighbours; a gap stands for anything skipped.
  const slots = (p, n) => {
    if (n <= 7) return Array.from({ length: n }, (_, k) => k + 1);
    if (p <= 4) return [1, 2, 3, 4, 5, '…', n];
    if (p >= n - 3) return [1, '…', n - 4, n - 3, n - 2, n - 1, n];
    return [1, '…', p - 1, p, p + 1, '…', n];
  };

  function renderPages(list, s) {
    const old = [...list.children].filter((li) => li.matches('.dd-pagination__gap, .dd-pagination__status') || li.querySelector('.dd-pagination__page'));
    if (!old.length) return;
    const sample = list.querySelector('.dd-pagination__page');
    const tag = sample?.tagName === 'A' ? 'a' : 'button';
    const hadStatus = old.some((li) => li.matches('.dd-pagination__status'));
    const hadFocus = old.some((li) => li.contains(document.activeElement));
    const frag = document.createDocumentFragment();
    for (const v of slots(s.page, s.pages)) {
      const li = document.createElement('li');
      if (v === '…') {
        li.className = 'dd-pagination__gap';
        li.setAttribute('aria-hidden', 'true');
        li.textContent = '…';
      } else {
        const b = document.createElement(tag);
        b.className = 'dd-pagination__page';
        if (tag === 'a') b.href = '#'; else b.type = 'button';
        b.setAttribute('aria-label', `Page ${v}`);
        if (v === s.page) b.setAttribute('aria-current', 'page');
        b.textContent = String(v);
        li.append(b);
      }
      frag.append(li);
    }
    if (hadStatus) {
      const li = document.createElement('li');
      li.className = 'dd-pagination__status';
      li.textContent = `Page ${s.page} of ${s.pages}`;
      frag.append(li);
    }
    const steps = list.querySelectorAll('.dd-pagination__step');
    const before = steps.length > 1 ? steps[steps.length - 1].closest('li') : null;
    old.forEach((li) => li.remove());
    list.insertBefore(frag, before && before.parentElement === list ? before : null);
    if (hadFocus) list.querySelector('.dd-pagination__page[aria-current="page"]')?.focus();
  }

  function render(root) {
    const s = state(root);
    root.dataset.page = String(s.page);
    root.querySelectorAll('.dd-pagination__pages').forEach((list) => renderPages(list, s));
    if (s.total !== null) {
      const range = s.total === 0 ? '0' : s.from === s.to ? fmt(s.from) : `${fmt(s.from)}–${fmt(s.to)}`;
      root.querySelectorAll('.dd-pagination__range').forEach((el) => { el.innerHTML = `<b>${range}</b> of ${fmt(s.total)}`; });
    }
    root.querySelectorAll('.dd-pagination__status').forEach((el) => { el.textContent = `Page ${s.page} of ${s.pages}`; });
    root.querySelectorAll('.dd-pagination__step').forEach((el) => {
      const steps = stepsBeside(el, root);
      const k = steps.indexOf(el);
      const off = k === 0 ? s.page <= 1 : k === steps.length - 1 ? s.page >= s.pages : false;
      el.removeAttribute('disabled');
      if (off) el.setAttribute('aria-disabled', 'true'); else el.removeAttribute('aria-disabled');
    });
    const sel = sizeSelect(root);
    if (sel && s.pageSize && [...sel.options].some((o) => +o.value === s.pageSize)) sel.value = String(s.pageSize);
    shown.set(root, s);
    return s;
  }

  const emit = (root) => root.dispatchEvent(new CustomEvent('dd:pagechange', { bubbles: true, detail: state(root) }));

  document.addEventListener('click', (e) => {
    const el = e.target.closest('.dd-pagination__page, .dd-pagination__step');
    const root = el?.closest(ROOT);
    if (!root) return;
    e.preventDefault();
    if (el.getAttribute('aria-disabled') === 'true' || el.disabled) return;
    const s = state(root);
    let page = s.page;
    if (el.classList.contains('dd-pagination__page')) page = Number(el.textContent.trim()) || s.page;
    else page += el === stepsBeside(el, root)[0] ? -1 : 1;
    if (page === s.page) return;
    root.dataset.page = String(page);
    render(root);
    emit(root);
  });

  document.addEventListener('change', (e) => {
    const sel = e.target;
    if (!(sel instanceof HTMLSelectElement) || !sel.closest('.dd-pagination__size')) return;
    const root = sel.closest(ROOT);
    if (!root) return;
    // By now the select already shows the new size, so take the first row from what was on screen before.
    const s = shown.get(root) || state(root);
    const size = num(sel.value);
    if (!(size > 0)) return;
    root.dataset.pageSize = String(size);
    // Keep the first row on screen in view: it lands on whichever page now holds it.
    root.dataset.page = String(s.from ? Math.floor((s.from - 1) / size) + 1 : 1);
    render(root);
    emit(root);
  });

  window.dd.pagination = (el, opts = {}) => {
    const root = typeof el === 'string' ? document.querySelector(el) : el;
    if (!root) return null;
    root.setAttribute('data-dd-pagination', root.getAttribute('data-dd-pagination') || '');
    const keys = { page: 'page', pages: 'pages', total: 'total', pageSize: 'pageSize' };
    for (const [k, attr] of Object.entries(keys)) if (opts[k] != null) root.dataset[attr] = String(opts[k]);
    return render(root);
  };

  const init = () => document.querySelectorAll(ROOT).forEach(render);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
