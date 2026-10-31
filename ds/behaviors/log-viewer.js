/* Log viewer: [data-dd-log-viewer] wires up its bar.
   - input[data-dd-log-viewer-search]: filters lines by text and highlights matches (service and message) with <mark>. Esc clears.
   - button[data-dd-log-viewer-level="debug|info|warn|error"]: aria-pressed toggles that level.
   - button[data-dd-log-viewer-wrap]: aria-pressed toggles .is-wrapped (long messages wrap instead of scrolling).
   - [data-dd-log-viewer-count]: gets “18 of 24 lines”; [data-dd-log-viewer-empty] shows when nothing matches.
   - button[data-dd-log-viewer-clear]: clears the search and turns every level back on.
   - button[data-dd-log-viewer-follow]: aria-pressed keeps the stream pinned to the newest line as lines arrive.
     Scrolling up to read pauses it; scrolling back to the bottom (or pressing it) resumes.
   Lines are .dd-log-viewer__line[data-level]; matches are highlighted inside .dd-log-viewer__msg. Append new
   lines to the list at any time: they are filtered, highlighted and counted like the rest. */
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

  // only: just these (new) lines need filtering and highlighting; counts always cover every line.
  function apply(root, only) {
    const input = root.querySelector('[data-dd-log-viewer-search]');
    const query = (input?.value || '').trim();
    const q = query.toLowerCase();
    const levels = root.querySelectorAll('[data-dd-log-viewer-level]');
    const on = new Set([...levels].filter((b) => b.getAttribute('aria-pressed') !== 'false').map((b) => b.dataset.ddLogViewerLevel));
    const lines = root.querySelectorAll(`.${C}__line`);
    (only || lines).forEach((line) => {
      const levelOk = !levels.length || on.has(line.dataset.level);
      const textOk = !q || line.textContent.toLowerCase().includes(q);
      line.hidden = !(levelOk && textOk);
      line.querySelectorAll(`.${C}__src, .${C}__msg`).forEach((el) => {
        if (!only || q) highlight(el, line.hidden ? '' : query);
        else originals.set(el, el.innerHTML); // new line, no search: nothing to mark, just remember it as written
      });
    });
    let shown = 0;
    lines.forEach((line) => { if (!line.hidden) shown++; });
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
    stick(root);
  }

  // Follow: keep the scroll area at the bottom while the follow toggle is pressed.
  const scroller = (root) => root.querySelector(`.${C}__scroll`);
  const followBtn = (root) => root.querySelector('[data-dd-log-viewer-follow]');
  const following = (root) => followBtn(root)?.getAttribute('aria-pressed') === 'true';
  const atBottom = (el) => el.scrollHeight - el.scrollTop - el.clientHeight < 4;
  const programmatic = new WeakSet();
  function stick(root) {
    const el = scroller(root);
    if (!el || !following(root) || atBottom(el)) return;
    programmatic.add(el);
    el.scrollTop = el.scrollHeight;
  }
  function setFollow(root, on, why = '') {
    const btn = followBtn(root);
    if (!btn) return;
    btn.setAttribute('aria-pressed', String(on));
    // Paused by scrolling up (not by the button): reaching the bottom again resumes.
    if (why === 'scroll') btn.dataset.ddLogViewerPaused = ''; else delete btn.dataset.ddLogViewerPaused;
    stick(root);
  }
  document.addEventListener('scroll', (e) => {
    const el = e.target;
    if (!(el instanceof Element) || !el.classList.contains(`${C}__scroll`)) return;
    const root = el.closest('[data-dd-log-viewer]');
    const btn = root && followBtn(root);
    if (!btn) return;
    if (programmatic.has(el)) { programmatic.delete(el); if (atBottom(el)) return; }
    if (following(root) && !atBottom(el)) setFollow(root, false, 'scroll');
    else if (!following(root) && 'ddLogViewerPaused' in btn.dataset && atBottom(el)) setFollow(root, true);
  }, true);

  // Lines added later (a live tail): filter, highlight, count and follow them.
  new MutationObserver((records) => {
    const added = new Map();
    for (const r of records) {
      for (const n of r.addedNodes) {
        if (!(n instanceof Element) || !n.classList.contains(`${C}__line`)) continue;
        const root = n.closest('[data-dd-log-viewer]');
        if (root) added.set(root, [...(added.get(root) || []), n]);
      }
      if (r.removedNodes.length && r.target instanceof Element && r.target.classList.contains(`${C}__lines`)) {
        const root = r.target.closest('[data-dd-log-viewer]');
        if (root && !added.has(root)) added.set(root, []);
      }
    }
    added.forEach((lines, root) => apply(root, lines));
  }).observe(document.documentElement, { childList: true, subtree: true });

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
    const follow = e.target.closest('[data-dd-log-viewer-follow]');
    if (follow) {
      setFollow(root, follow.getAttribute('aria-pressed') !== 'true');
    } else if (level) {
      level.setAttribute('aria-pressed', String(level.getAttribute('aria-pressed') === 'false'));
      apply(root);
    } else if (wrap) {
      const next = wrap.getAttribute('aria-pressed') !== 'true';
      wrap.setAttribute('aria-pressed', String(next));
      root.classList.toggle('is-wrapped', next);
      stick(root);
    } else if (clear) {
      const input = root.querySelector('[data-dd-log-viewer-search]');
      if (input) input.value = '';
      root.querySelectorAll('[data-dd-log-viewer-level]').forEach((b) => b.setAttribute('aria-pressed', 'true'));
      apply(root);
    }
  });

  const init = () => document.querySelectorAll('[data-dd-log-viewer]').forEach((root) => {
    // Apply the initial search value and level toggles from the markup, sync wrap state, start at the newest line
    // when following.
    apply(root);
    const wrap = root.querySelector('[data-dd-log-viewer-wrap]');
    if (wrap) root.classList.toggle('is-wrapped', wrap.getAttribute('aria-pressed') === 'true');
    stick(root);
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
