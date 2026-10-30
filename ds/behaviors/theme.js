/* Theme: dawn (light) / dusk (dark).
   - <html data-theme="dawn|dusk"> is the source of truth; the choice persists in localStorage ("dd-theme").
   - With nothing stored, the OS preference decides (tokens.css also handles that without JS).
   - Any element with [data-dd-theme-toggle] flips the theme on click. */
(() => {
  const KEY = 'dd-theme';
  const root = document.documentElement;
  const stored = (() => { try { return localStorage.getItem(KEY); } catch { return null; } })();
  if (stored === 'dawn' || stored === 'dusk') root.dataset.theme = stored;

  const current = () => root.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dusk' : 'dawn');
  const sync = () => document.querySelectorAll('[data-dd-theme-toggle]').forEach((b) => b.setAttribute('aria-pressed', String(current() === 'dusk')));

  document.addEventListener('click', (e) => {
    if (!e.target.closest('[data-dd-theme-toggle]')) return;
    const next = current() === 'dusk' ? 'dawn' : 'dusk';
    root.dataset.theme = next;
    try { localStorage.setItem(KEY, next); } catch { /* storage unavailable */ }
    sync();
  });
  document.addEventListener('DOMContentLoaded', sync);
})();
