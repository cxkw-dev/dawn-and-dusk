// Docs-only behavior: flip a single example between dawn and dusk, independent of the page theme.
const pageTheme = () => document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dusk' : 'dawn');

const label = (btn) => {
  const stage = btn.closest('.ex-frame')?.querySelector('.ex-stage');
  const now = stage?.dataset.theme || pageTheme();
  btn.textContent = now === 'dusk' ? '☀ View in dawn' : '☾ View in dusk';
};
const relabel = () => document.querySelectorAll('[data-ex-theme]').forEach(label);

document.addEventListener('click', (e) => {
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
    label(btn);
    return;
  }
  // The page theme toggle runs first (ds/behaviors/theme.js); refresh labels after it.
  if (e.target.closest('[data-dd-theme-toggle]')) requestAnimationFrame(relabel);
});
relabel();

// "On this page": built from the page's h2 sections, highlights the one you're reading.
(() => {
  const toc = document.querySelector('.doc-toc');
  const main = document.querySelector('.doc-main');
  if (!toc || !main) return;
  const slug = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const heads = [...main.querySelectorAll(':scope > h2, :scope > section > h2')];
  if (heads.length < 2) return;
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
  document.querySelector('.doc-shell')?.classList.add('has-toc');
  const links = new Map([...list.querySelectorAll('a')].map((a) => [a.hash.slice(1), a]));
  const mark = (id) => links.forEach((a, k) => a.toggleAttribute('aria-current', k === id));
  const io = new IntersectionObserver((entries) => {
    const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
    if (vis[0]) mark(vis[0].target.id);
  }, { rootMargin: '-70px 0px -65% 0px' });
  heads.forEach((h) => io.observe(h));
  toc.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    e.preventDefault();
    const target = document.getElementById(a.hash.slice(1));
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    target?.scrollIntoView({ behavior: still ? 'auto' : 'smooth', block: 'start' });
    history.replaceState(null, '', a.hash);
    mark(target?.id);
  });
})();
