/* JSON viewer: renders [data-dd-json-viewer] from its inline <script type="application/json"> into a collapsible tree.
   - data-depth="2" sets how many levels start expanded (root = level 0).
   - Click a row to select it: the bar shows its path ($.replicas[0].region) and the copy button copies it.
   - Keyboard (WAI-ARIA tree): ↑/↓ move, → expand / first child, ← collapse / parent, Enter/Space toggle, Home/End.
   - dd.jsonViewer(el, data, { depth, label }) renders any value programmatically. */
(() => {
  const dd = (window.dd = window.dd || {});
  const C = 'dd-json-viewer';
  const icon = (n) => `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-${n}"/></svg>`;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const ident = /^[A-Za-z_$][\w$]*$/;
  const childPath = (path, key, isArr) => (isArr ? `${path}[${key}]` : ident.test(key) ? `${path}.${key}` : `${path}[${JSON.stringify(key)}]`);
  const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;

  function node(key, value, path, depth, maxDepth, isIndex) {
    const li = document.createElement('li');
    li.className = `${C}__node`;
    li.setAttribute('role', 'treeitem');
    li.tabIndex = -1;
    li.dataset.path = path;
    const label = key === null ? ''
      : `<span class="${C}__${isIndex ? 'index' : 'key'}">${esc(key)}</span><span class="${C}__colon">:</span>`;
    const isObj = value !== null && typeof value === 'object';
    const entries = isObj ? (Array.isArray(value) ? value.map((v, i) => [i, v]) : Object.entries(value)) : [];

    if (!isObj || entries.length === 0) {
      const type = value === null ? 'null' : isObj ? 'empty' : typeof value;
      const text = isObj ? (Array.isArray(value) ? '[]' : '{}') : type === 'string' ? `"${esc(value)}"` : esc(String(value));
      li.innerHTML = `<div class="${C}__row"><span class="${C}__spacer"></span>${label}<span class="${C}__value ${C}__value--${type === 'empty' ? 'null' : type}">${text}</span></div>`;
      return li;
    }

    const arr = Array.isArray(value);
    const [open, close] = arr ? ['[', ']'] : ['{', '}'];
    li.setAttribute('aria-expanded', String(depth < maxDepth));
    li.innerHTML = `<div class="${C}__row"><span class="${C}__toggle" aria-hidden="true"></span>${label}`
      + `<span class="${C}__brace">${open}</span><span class="${C}__preview" aria-hidden="true">…${close}</span>`
      + `<span class="${C}__count">${arr ? plural(entries.length, 'item') : plural(entries.length, 'key')}</span></div>`;
    const group = document.createElement('ul');
    group.className = `${C}__group`;
    group.setAttribute('role', 'group');
    for (const [k, v] of entries) group.append(node(k, v, childPath(path, k, arr), depth + 1, maxDepth, arr));
    const end = document.createElement('div');
    end.className = `${C}__close`;
    end.setAttribute('aria-hidden', 'true');
    end.textContent = close;
    li.append(group, end);
    return li;
  }

  function select(root, item, focus = true) {
    if (!item) return;
    root.querySelectorAll('[role="treeitem"][aria-selected]').forEach((n) => n.removeAttribute('aria-selected'));
    root.querySelectorAll('[role="treeitem"][tabindex="0"]').forEach((n) => { n.tabIndex = -1; });
    item.tabIndex = 0;
    if (focus) item.setAttribute('aria-selected', 'true');
    const path = item.dataset.path;
    const out = root.querySelector(`.${C}__path-value`);
    if (out) out.textContent = path;
    root.querySelector(`.${C}__path [data-dd-copy]`)?.setAttribute('data-dd-copy', path);
    if (focus) item.focus();
  }

  const setExpanded = (item, open) => { if (item?.hasAttribute('aria-expanded')) item.setAttribute('aria-expanded', String(open)); };
  const visible = (tree) => [...tree.querySelectorAll('[role="treeitem"]')]
    .filter((n) => !n.parentElement.closest('[role="treeitem"][aria-expanded="false"]'));

  function render(el, data, { depth = 2, label } = {}) {
    el.classList.add(C);
    el.querySelectorAll(':scope > :not(script)').forEach((n) => n.remove());
    const bar = document.createElement('div');
    bar.className = `${C}__bar`;
    bar.innerHTML = `<div class="${C}__path"><span class="${C}__path-label">Path</span>`
      + `<code class="${C}__path-value">$</code>`
      + `<button class="${C}__btn ${C}__btn--icon" type="button" data-dd-copy="$" aria-label="Copy path">${icon('copy')}${icon('check')}</button></div>`
      + `<div class="${C}__actions"><button class="${C}__btn" type="button" data-dd-json-viewer-expand>Expand all</button>`
      + `<button class="${C}__btn" type="button" data-dd-json-viewer-collapse>Collapse all</button></div>`;
    const tree = document.createElement('ul');
    tree.className = `${C}__tree`;
    tree.setAttribute('role', 'tree');
    tree.setAttribute('aria-label', label || el.getAttribute('aria-label') || 'JSON');
    tree.append(node(null, data, '$', 0, depth));
    el.append(bar, tree);
    select(el, tree.querySelector('[role="treeitem"]'), false);
    el.setAttribute('data-dd-json-viewer-ready', '');
  }

  function init() {
    document.querySelectorAll('[data-dd-json-viewer]:not([data-dd-json-viewer-ready])').forEach((el) => {
      const src = el.querySelector(':scope > script[type="application/json"]');
      if (!src) return;
      try {
        render(el, JSON.parse(src.textContent), { depth: Number(el.dataset.depth ?? 2) });
      } catch {
        el.insertAdjacentHTML('beforeend', `<p class="${C}__error">This JSON could not be parsed.</p>`);
        el.setAttribute('data-dd-json-viewer-ready', '');
      }
    });
  }

  document.addEventListener('click', (e) => {
    const root = e.target.closest(`.${C}`);
    if (!root) return;
    if (e.target.closest('[data-dd-json-viewer-expand], [data-dd-json-viewer-collapse]')) {
      const open = !!e.target.closest('[data-dd-json-viewer-expand]');
      const items = root.querySelectorAll('[role="treeitem"][aria-expanded]');
      items.forEach((n, i) => setExpanded(n, open || i === 0));
      if (!open) select(root, items[0], false);
      return;
    }
    const item = e.target.closest('[role="treeitem"]');
    if (!item || !root.contains(item)) return;
    if (e.target.closest(`.${C}__toggle, .${C}__preview`)) setExpanded(item, item.getAttribute('aria-expanded') !== 'true');
    select(root, item);
  });

  document.addEventListener('keydown', (e) => {
    const item = e.target;
    if (!(item instanceof Element) || item.getAttribute('role') !== 'treeitem' || !item.closest(`.${C}`)) return;
    const root = item.closest(`.${C}`);
    const list = visible(item.closest('[role="tree"]'));
    const i = list.indexOf(item);
    const expandable = item.hasAttribute('aria-expanded');
    const open = item.getAttribute('aria-expanded') === 'true';
    let next = null;
    switch (e.key) {
      case 'ArrowDown': next = list[i + 1]; break;
      case 'ArrowUp': next = list[i - 1]; break;
      case 'Home': next = list[0]; break;
      case 'End': next = list[list.length - 1]; break;
      case 'ArrowRight':
        if (expandable && !open) setExpanded(item, true);
        else if (expandable) next = item.querySelector('[role="treeitem"]');
        break;
      case 'ArrowLeft':
        if (expandable && open) setExpanded(item, false);
        else next = item.parentElement.closest('[role="treeitem"]');
        break;
      case 'Enter': case ' ':
        if (expandable) setExpanded(item, !open);
        break;
      default: return;
    }
    e.preventDefault();
    if (next) select(root, next);
  });

  dd.jsonViewer = (el, data, opts) => render(el, data, opts);
  dd.jsonViewer.init = init;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
