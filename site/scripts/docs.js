// Docs-only behavior: flip a single example between dawn and dusk, independent of the page theme.
// The button label ("View in dusk / dawn") is pure CSS in docs.css, so it is right before this script runs.
const pageTheme = () => document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dusk' : 'dawn');

document.addEventListener('click', (e) => {
  // Placeholder links in examples (href="#") would otherwise jump the docs page to the top.
  if (e.target.closest('.ex-stage a[href="#"]')) e.preventDefault();
  // A theme toggle inside an example flips the page; drop the stage's own override so the example follows it.
  const innerToggle = e.target.closest('.ex-stage [data-dd-theme-toggle]');
  if (innerToggle) delete innerToggle.closest('.ex-stage').dataset.theme;
  const codeBtn = e.target.closest('[data-ex-code]');
  if (codeBtn) {
    const panel = codeBtn.closest('.ex-frame')?.querySelector('.ex-code');
    if (!panel) return;
    panel.hidden = !panel.hidden;
    codeBtn.setAttribute('aria-expanded', String(!panel.hidden));
    return;
  }
  const btn = e.target.closest('[data-ex-theme]');
  if (btn) {
    const stage = btn.closest('.ex-frame')?.querySelector('.ex-stage');
    if (!stage) return;
    const next = (stage.dataset.theme || pageTheme()) === 'dusk' ? 'dawn' : 'dusk';
    if (next === pageTheme()) delete stage.dataset.theme; else stage.dataset.theme = next;
  }
});

// "On this page": built from the page's h2 sections, highlights the one you're reading.
(() => {
  const toc = document.querySelector('.doc-toc');
  const main = document.querySelector('.doc-main');
  if (!toc || !main) return;
  const slug = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const heads = [...main.querySelectorAll(':scope > h2, :scope > section > h2')];
  if (heads.length < 2) { document.querySelector('.doc-body')?.classList.remove('has-toc'); return; }
  const list = toc.querySelector('ul');
  for (const h of heads) {
    if (!h.id) h.id = slug(h.textContent);
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#${h.id}`;
    a.textContent = h.textContent;
    li.append(a);
    list.append(li);
  }
  toc.hidden = false;
  
  const links = new Map([...list.querySelectorAll('a')].map((a) => [a.hash.slice(1), a]));
  const mark = (id) => links.forEach((a, k) => a.toggleAttribute('aria-current', k === id));
  // Current = the last heading that has scrolled above the top third; at the very bottom, the last one.
  let locked = false;
  const update = () => {
    if (locked) return;
    const line = Math.min(innerHeight * 0.35, 320);
    let cur = heads[0];
    for (const h of heads) { if (h.getBoundingClientRect().top <= line) cur = h; else break; }
    if (scrollY > 0 && innerHeight + scrollY >= document.documentElement.scrollHeight - 2) cur = heads[heads.length - 1];
    mark(cur.id);
  };
  let raf = 0;
  addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; update(); }); }, { passive: true });
  addEventListener('resize', update, { passive: true });
  update();
  toc.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    e.preventDefault();
    const target = document.getElementById(a.hash.slice(1));
    if (!target) return;
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Hold the clicked item while the page glides there, so the marker doesn't flicker through the sections between.
    locked = true;
    const release = () => { locked = false; removeEventListener('scrollend', release); };
    addEventListener('scrollend', release);
    setTimeout(release, 1200);
    target.scrollIntoView({ behavior: still ? 'auto' : 'smooth', block: 'start' });
    history.replaceState(null, '', a.hash);
    mark(target.id);
  });
})();

// Side nav (the docs' .dd-side-nav, #doc-nav): the panel's list keeps its scroll position per section, between pages
// (restored before paint by the layout) and when the rail switches sections.
const nav = document.getElementById('doc-nav');
const list = document.getElementById('doc-nav-list');
const activePane = () => nav?.querySelector('.dd-side-nav__pane:not([hidden])')?.dataset.ddNavPane;
if (nav && list) {
  let memo = {};
  try { memo = JSON.parse(sessionStorage.getItem('dd-docs-nav') || '{}') || {}; } catch { memo = {}; }
  let shown = activePane();
  memo[shown] = list.scrollTop;
  list.addEventListener('scroll', () => { if (!list.classList.contains('is-filtered') && activePane() === shown) memo[shown] = list.scrollTop; }, { passive: true });
  // side-nav.js switches the pane on the rail click (its listener runs first); bring back where that section was left.
  document.addEventListener('click', (e) => {
    if (!e.target.closest?.('#doc-nav [data-dd-nav-section]')) return;
    const next = activePane();
    if (next === shown || list.classList.contains('is-filtered')) return;
    shown = next;
    list.scrollTop = memo[shown] ?? 0;
  });
  list.addEventListener('dd-docs-restore', () => { shown = activePane(); list.scrollTop = memo[shown] ?? 0; });
  addEventListener('pagehide', () => { try { sessionStorage.setItem('dd-docs-nav', JSON.stringify(memo)); } catch { /* storage unavailable */ } });
}

// Search, at the head of the side nav's panel. While a query is typed it searches every section (titles, section
// names and other names, e.g. "modal" finds Dialog) and shows the matches under each section's heading; clearing it
// brings back the section the rail is on. "/" focuses it from anywhere (opening the off-canvas nav or unfolding the
// rail first), Esc clears, ↓ / ↑ walk the results, Enter opens the first match.
(() => {
  const input = document.getElementById('doc-find');
  const status = document.getElementById('doc-find-status');
  if (!input || !nav || !list) return;
  const links = [...list.querySelectorAll('a[data-find]')];
  const groups = [...list.querySelectorAll('.doc-nav-group')];
  const panes = [...list.querySelectorAll('.dd-side-nav__pane')];
  const label = (a) => a.querySelector('.dd-side-nav__label');
  const titles = new Map(links.map((a) => [a, label(a).textContent]));
  const esc = (t) => t.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]);
  const shown = () => links.filter((a) => a.getClientRects().length > 0);
  let filtering = false;
  const run = () => {
    const raw = input.value.trim();
    const words = raw.toLowerCase().split(/\s+/).filter(Boolean);
    const on = words.length > 0;
    for (const a of links) {
      const title = titles.get(a);
      const tokens = a.dataset.find.split(/[\s&/-]+/);
      // a word matches anywhere in the title, or at the start of a section name or another name for the page
      a.hidden = on && !words.every((w) => title.toLowerCase().includes(w) || tokens.some((t) => t.startsWith(w)));
      const w = on && words.find((x) => title.toLowerCase().includes(x));
      const i = w ? title.toLowerCase().indexOf(w) : -1;
      label(a).innerHTML = i >= 0 ? `${esc(title.slice(0, i))}<mark>${esc(title.slice(i, i + w.length))}</mark>${esc(title.slice(i + w.length))}` : esc(title);
    }
    for (const g of groups) g.hidden = !g.querySelector('a[data-find]:not([hidden])');
    let total = 0;
    for (const p of panes) {
      const n = p.querySelectorAll('a[data-find]:not([hidden])').length;
      total += n;
      p.classList.toggle('is-empty', !n);
      const count = p.querySelector('.dd-side-nav__head .dd-side-nav__count');
      if (count) count.textContent = on ? String(n) : count.dataset.total;
    }
    list.classList.toggle('is-filtered', on);
    if (on) list.scrollTop = 0;
    else if (filtering) list.dispatchEvent(new Event('dd-docs-restore'));
    filtering = on;
    status.classList.toggle('is-none', on && !total);
    status.textContent = !on ? '' : total ? `${total} ${total === 1 ? 'page' : 'pages'}` : `Nothing matches “${raw}”.`;
  };
  input.addEventListener('input', run);
  input.addEventListener('keydown', (e) => {
    // Esc with a query clears it and stops there, so it doesn't also close the off-canvas nav around the field.
    if (e.key === 'Escape') { if (input.value) { e.preventDefault(); e.stopPropagation(); input.value = ''; run(); } else input.blur(); }
    else if (e.key === 'ArrowDown') { const v = shown(); if (v.length) { e.preventDefault(); v[0].focus(); } }
    else if (e.key === 'Enter' && input.value.trim()) { const v = shown(); if (v.length) { e.preventDefault(); v[0].click(); } }
  });
  list.addEventListener('keydown', (e) => {
    if ((e.key !== 'ArrowDown' && e.key !== 'ArrowUp') || !list.classList.contains('is-filtered')) return;
    const v = shown(); const i = v.indexOf(document.activeElement);
    if (i < 0) return;
    e.preventDefault();
    if (e.key === 'ArrowUp' && i === 0) input.focus();
    else v[Math.max(0, Math.min(v.length - 1, i + (e.key === 'ArrowDown' ? 1 : -1)))].focus();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey || e.defaultPrevented) return;
    if (e.target.closest?.('input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="textbox"]')) return;
    e.preventDefault();
    const focus = () => { input.focus(); input.select(); };
    if (getComputedStyle(nav).position === 'fixed') {
      // Off-canvas: open it with the top bar's menu button (side-nav.js then focuses the current page; take it after).
      if (!nav.classList.contains('is-mobile-open')) {
        document.querySelector('[data-dd-nav-open="#doc-nav"]')?.click();
        requestAnimationFrame(() => requestAnimationFrame(focus));
        return;
      }
    } else if (nav.classList.contains('is-collapsed')) {
      nav.querySelector('[data-dd-nav-toggle]')?.click();
    }
    focus();
  });
})();
