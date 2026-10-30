/* Log viewer: [data-dd-log-viewer] wires up its bar.
   - input[data-dd-log-viewer-search]: filters lines by text and highlights matches with <mark>. Esc clears.
   - button[data-dd-log-viewer-level="debug|info|warn|error"]: aria-pressed toggles that level.
   - button[data-dd-log-viewer-wrap]: aria-pressed toggles .is-wrapped (long messages wrap instead of scrolling).
   - [data-dd-log-viewer-count]: gets “18 of 24 lines”; [data-dd-log-viewer-empty] shows when nothing matches.
   Lines are .dd-log-viewer__line[data-level]; matches are highlighted inside .dd-log-viewer__msg. */
(() => {
  const C = 'dd-log-viewer';
  const originals = new WeakMap();
  const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  function highlight(msg, query) {
    if (!originals.has(msg)) originals.set(msg, msg.innerHTML);
    msg.innerHTML = originals.get(msg);
    if (!query) return;
    const re = new RegExp(escRe(query), 'gi');
    const walker = document.createTreeWalker(msg, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes) {
      const text = node.nodeValue;
      if (!re.test(text)) continue;
      re.lastIndex = 0;
      const frag = document.createDocumentFragment();
      let last = 0;
      for (const m of text.matchAll(re)) {
        frag.append(text.slice(last, m.index));
        const mark = document.createElement('mark');
        mark.className = `${C}__mark`;
        mark.textContent = m[0];
        frag.append(mark);
        last = m.index + m[0].length;
      }
      frag.append(text.slice(last));
      node.replaceWith(frag);
    }
  }

  function apply(root) {
    const input = root.querySelector('[data-dd-log-viewer-search]');
    const query = (input?.value || '').trim();
    const q = query.toLowerCase();
    const levels = root.querySelectorAll('[data-dd-log-viewer-level]');
    const on = new Set([...levels].filter((b) => b.getAttribute('aria-pressed') !== 'false').map((b) => b.dataset.ddLogViewerLevel));
    const lines = root.querySelectorAll(`.${C}__line`);
    let shown = 0;
    lines.forEach((line) => {
      const levelOk = !levels.length || on.has(line.dataset.level);
      const textOk = !q || line.textContent.toLowerCase().includes(q);
      line.hidden = !(levelOk && textOk);
      if (!line.hidden) shown++;
      const msg = line.querySelector(`.${C}__msg`);
      if (msg) highlight(msg, line.hidden ? '' : query);
    });
    const count = root.querySelector('[data-dd-log-viewer-count]');
    if (count) count.textContent = shown === lines.length ? `${lines.length} lines` : `${shown} of ${lines.length} lines`;
    const empty = root.querySelector('[data-dd-log-viewer-empty]');
    if (empty) {
      empty.hidden = shown > 0;
      const what = empty.querySelector('[data-dd-log-viewer-query]');
      if (what) what.textContent = query ? `“${query}”` : 'the selected levels';
    }
    // Per-level counts on the toggles reflect the search.
    levels.forEach((b) => {
      const n = b.querySelector(`.${C}__n`);
      if (!n) return;
      const lvl = b.dataset.ddLogViewerLevel;
      n.textContent = [...lines].filter((l) => l.dataset.level === lvl && (!q || l.textContent.toLowerCase().includes(q))).length;
    });
  }

  document.addEventListener('input', (e) => {
    const input = e.target.closest?.('[data-dd-log-viewer-search]');
    const root = input?.closest('[data-dd-log-viewer]');
    if (root) apply(root);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const input = e.target.closest?.('[data-dd-log-viewer-search]');
    const root = input?.closest('[data-dd-log-viewer]');
    if (!root || !input.value) return;
    input.value = '';
    apply(root);
  });

  document.addEventListener('click', (e) => {
    const root = e.target.closest('[data-dd-log-viewer]');
    if (!root) return;
    const level = e.target.closest('[data-dd-log-viewer-level]');
    const wrap = e.target.closest('[data-dd-log-viewer-wrap]');
    const clear = e.target.closest('[data-dd-log-viewer-clear]');
    if (level) {
      level.setAttribute('aria-pressed', String(level.getAttribute('aria-pressed') === 'false'));
      apply(root);
    } else if (wrap) {
      const next = wrap.getAttribute('aria-pressed') !== 'true';
      wrap.setAttribute('aria-pressed', String(next));
      root.classList.toggle('is-wrapped', next);
    } else if (clear) {
      const input = root.querySelector('[data-dd-log-viewer-search]');
      if (input) input.value = '';
      root.querySelectorAll('[data-dd-log-viewer-level]').forEach((b) => b.setAttribute('aria-pressed', 'true'));
      apply(root);
    }
  });

  const init = () => document.querySelectorAll('[data-dd-log-viewer]').forEach((root) => {
    // Apply the initial search value and level toggles from the markup, and sync wrap state.
    apply(root);
    const wrap = root.querySelector('[data-dd-log-viewer-wrap]');
    if (wrap) root.classList.toggle('is-wrapped', wrap.getAttribute('aria-pressed') === 'true');
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
