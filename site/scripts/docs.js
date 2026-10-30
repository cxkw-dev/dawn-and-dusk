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

// Mobile (≤ 900px): the menu button opens the sidebar as a drawer. Esc, the scrim or tabbing away closes it.
(() => {
  const btn = document.querySelector('.doc-menu');
  const side = document.getElementById('doc-side');
  const scrim = document.querySelector('.doc-scrim');
  if (!btn || !side) return;
  const isOpen = () => btn.getAttribute('aria-expanded') === 'true';
  const set = (open, returnFocus = false) => {
    btn.setAttribute('aria-expanded', String(open));
    side.classList.toggle('is-open', open);
    scrim?.classList.toggle('is-open', open);
    document.documentElement.classList.toggle('doc-nav-open', open);
    if (open) {
      const cur = side.querySelector('[aria-current="page"]') || side.querySelector('a');
      cur?.scrollIntoView({ block: 'center' });
      cur?.focus({ preventScroll: true });
    } else if (returnFocus) btn.focus();
  };
  btn.addEventListener('click', () => set(!isOpen()));
  scrim?.addEventListener('click', () => set(false, true));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && isOpen()) set(false, true); });
  side.addEventListener('focusout', (e) => {
    const to = e.relatedTarget;
    if (isOpen() && to && !side.contains(to) && to !== btn) set(false);
  });
  matchMedia('(max-width: 900px)').addEventListener('change', (e) => { if (!e.matches && isOpen()) set(false); });
})();

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
