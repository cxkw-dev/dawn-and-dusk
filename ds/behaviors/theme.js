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

  // Swap in one frame: with every colour transition running at once the page repaints for --dd-dur and lags.
  const swap = (next) => {
    const off = document.createElement('style');
    off.textContent = '*,*::before,*::after{transition:none!important}';
    document.head.append(off);
    root.dataset.theme = next;
    void document.body.offsetHeight; // apply the new colours while transitions are off
    requestAnimationFrame(() => off.remove());
  };

  document.addEventListener('click', (e) => {
    if (!e.target.closest('[data-dd-theme-toggle]')) return;
    const next = current() === 'dusk' ? 'dawn' : 'dusk';
    swap(next);
    try { localStorage.setItem(KEY, next); } catch { /* storage unavailable */ }
    sync();
  });
  // The script may load deferred or late: sync now if the DOM is already there. Follow OS changes while nothing is stored.
  // A toggle rendered later gets aria-pressed the first time it takes focus.
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', sync); else sync();
  document.addEventListener('focusin', (e) => {
    const t = e.target.closest?.('[data-dd-theme-toggle]');
    if (t && !t.hasAttribute('aria-pressed')) t.setAttribute('aria-pressed', String(current() === 'dusk'));
  });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', sync);
})();
