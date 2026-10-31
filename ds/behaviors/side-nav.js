/* Side nav (.dd-side-nav): collapse, sections and the mobile off-canvas mode.
   - [data-dd-nav-toggle] folds / unfolds the page panel of its nav (or of the nav named by its value, e.g. "#app-nav").
     A nav with an id remembers the choice in localStorage ("dd-side-nav:<id>").
   - [data-dd-nav-section="name"] on a rail item shows the pane [data-dd-nav-pane="name"]; pressing the active one again
     folds the panel, like the chevron.
   - [data-dd-nav-open="#id"] opens a nav that is off-canvas (mobile); [data-dd-nav-close] closes it. Esc, a click on the
     scrim, the chevron or following a link inside also close it, and focus returns to the opener. Tabbing out of it, onto
     anything outside (the menu button too), closes it and focus stays where it went. While it covers the viewport the
     page behind doesn't scroll (.dd-side-nav-lock on <html>). If it stops being off-canvas while open (the window
     widens past the breakpoint) it is simply in view, and closes. */
(() => {
  const KEY = (id) => `dd-side-nav:${id}`;
  const store = {
    get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch { /* storage unavailable */ } },
  };
  const navFor = (el, attr) => {
    const sel = el.getAttribute(attr);
    return (sel && sel.startsWith('#') ? document.querySelector(sel) : null) || el.closest('.dd-side-nav');
  };
  const offcanvas = (nav) => getComputedStyle(nav).position === 'fixed';
  const toggles = (nav) => [...document.querySelectorAll('[data-dd-nav-toggle]')].filter((t) => navFor(t, 'data-dd-nav-toggle') === nav);
  const openers = (nav) => [...document.querySelectorAll('[data-dd-nav-open]')].filter((t) => navFor(t, 'data-dd-nav-open') === nav);
  const openerOf = new WeakMap(); // nav → the element that opened it, where focus goes back on close
  let pressed = null; // a menu button under the pointer: its own click closes the nav, so focus landing on it isn't a tab-out

  // Scroll lock: only for a nav that covers the viewport. An off-canvas nav inside a frame (a frame-mode shell, a demo) is
  // fixed to that frame, and its offsetParent is the frame; fixed to the viewport, it has none.
  const LOCK = 'dd-side-nav-lock';
  const syncLock = () => {
    const lock = [...document.querySelectorAll('.dd-side-nav.is-mobile-open')].some((n) => offcanvas(n) && !n.offsetParent);
    document.documentElement.classList.toggle(LOCK, lock);
  };
  // An open nav whose shell (or page) resizes past the breakpoint is in view again: drop the open state and the lock.
  const resized = new ResizeObserver((entries) => entries.forEach(({ target }) => {
    target.querySelectorAll(':scope > .dd-side-nav.is-mobile-open').forEach((nav) => { if (!offcanvas(nav)) setMobile(nav, false, { restore: false }); });
  }));

  const syncAria = (nav) => {
    const open = !nav.classList.contains('is-collapsed');
    toggles(nav).forEach((t) => {
      t.setAttribute('aria-expanded', String(open));
      if (t.hasAttribute('data-label')) t.setAttribute('data-label', open ? 'Collapse' : 'Expand');
      if (t.hasAttribute('aria-label')) t.setAttribute('aria-label', open ? 'Collapse navigation' : 'Expand navigation');
    });
    const active = nav.querySelector('[data-dd-nav-section].is-active');
    if (active) active.setAttribute('aria-expanded', String(open));
  };

  const setCollapsed = (nav, collapsed, persist = true) => {
    nav.classList.toggle('is-collapsed', collapsed);
    syncAria(nav);
    if (persist && nav.id) store.set(KEY(nav.id), collapsed ? 'collapsed' : 'open');
  };

  const setMobile = (nav, open, { trigger = null, restore = true } = {}) => {
    nav.classList.toggle('is-mobile-open', open);
    openers(nav).forEach((b) => b.setAttribute('aria-expanded', String(open)));
    if (open) {
      const from = trigger || document.activeElement;
      openerOf.set(nav, from && from !== document.body && !nav.contains(from) ? from : null);
      if (nav.parentElement) resized.observe(nav.parentElement);
      const first = nav.querySelector('.dd-side-nav__pane:not([hidden]) :is([aria-current="page"], .is-active)') || nav.querySelector('.dd-side-nav__item');
      requestAnimationFrame(() => first?.focus({ preventScroll: true }));
    } else {
      if (nav.parentElement) resized.unobserve(nav.parentElement);
      // Every close puts focus back on the opener, unless it already moved on (tabbing out): from inside the nav, or from
      // nowhere — a press on the scrim blurs the focused link before its click closes the nav.
      const at = document.activeElement;
      if (restore && (!at || at === document.body || nav.contains(at))) {
        const to = openerOf.get(nav) || openers(nav).find((b) => b.getClientRects().length);
        to?.focus({ preventScroll: true });
      }
      openerOf.delete(nav);
    }
    syncLock();
  };

  const showSection = (nav, item) => {
    const name = item.getAttribute('data-dd-nav-section');
    const pane = nav.querySelector(`[data-dd-nav-pane="${name}"]`);
    if (!pane) return;
    const wasActive = item.classList.contains('is-active') && !pane.hidden;
    if (wasActive && !offcanvas(nav)) { setCollapsed(nav, !nav.classList.contains('is-collapsed')); return; }
    nav.querySelectorAll('[data-dd-nav-section]').forEach((it) => {
      const on = it === item;
      it.classList.toggle('is-active', on);
      if (on) it.setAttribute('aria-current', 'true'); else { it.removeAttribute('aria-current'); it.removeAttribute('aria-expanded'); }
    });
    nav.querySelectorAll('[data-dd-nav-pane]').forEach((p) => { p.hidden = p !== pane; });
    if (nav.classList.contains('is-collapsed') && !offcanvas(nav)) setCollapsed(nav, false);
    else syncAria(nav);
  };

  document.addEventListener('click', (e) => {
    const t = e.target;
    const toggle = t.closest('[data-dd-nav-toggle]');
    if (toggle) {
      const nav = navFor(toggle, 'data-dd-nav-toggle');
      if (!nav) return;
      if (nav.classList.contains('is-mobile-open')) setMobile(nav, false);
      else setCollapsed(nav, !nav.classList.contains('is-collapsed'));
      return;
    }
    const open = t.closest('[data-dd-nav-open]');
    if (open) {
      const nav = navFor(open, 'data-dd-nav-open');
      if (nav) setMobile(nav, !nav.classList.contains('is-mobile-open'), { trigger: open });
      return;
    }
    const close = t.closest('[data-dd-nav-close]');
    if (close) { const nav = close.closest('.dd-side-nav'); if (nav) setMobile(nav, false); return; }
    const section = t.closest('[data-dd-nav-section]');
    if (section) { const nav = section.closest('.dd-side-nav'); if (nav) { e.preventDefault(); showSection(nav, section); } return; }
    // A click on the scrim (the nav's own ::before) or on a link inside an open off-canvas nav closes it.
    if (t.matches?.('.dd-side-nav.is-mobile-open')) { setMobile(t, false); return; }
    const link = t.closest('.dd-side-nav.is-mobile-open a[href]');
    if (link) setMobile(link.closest('.dd-side-nav'), false);
  });

  // Tabbing out of an open off-canvas nav closes it, so focus never sits on the page hidden behind the scrim — whatever it
  // lands on, the menu button included (in an app shell it is the next stop after the nav). Focus stays where it went.
  // Only focus that leaves the nav counts: focus elsewhere that never was inside it (another demo on the same page),
  // or focus that goes nowhere (a press on the scrim, whose click closes it), leaves it open.
  document.addEventListener('pointerdown', (e) => { pressed = e.target.closest?.('[data-dd-nav-open]') || null; }, true);
  document.addEventListener('keydown', () => { pressed = null; }, true);
  document.addEventListener('focusout', (e) => {
    const nav = e.target.closest?.('.dd-side-nav.is-mobile-open');
    const to = e.relatedTarget;
    if (nav && to && !nav.contains(to) && to !== pressed) setMobile(nav, false, { restore: false });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const nav = document.querySelector('.dd-side-nav.is-mobile-open');
    if (nav) { e.preventDefault(); setMobile(nav, false); }
  });

  // Restore persisted collapse state without animating it.
  const restore = () => {
    document.querySelectorAll('.dd-side-nav').forEach((nav) => {
      const saved = nav.id ? store.get(KEY(nav.id)) : null;
      if (saved === 'collapsed' || saved === 'open') {
        nav.classList.add('is-restoring');
        nav.classList.toggle('is-collapsed', saved === 'collapsed');
        requestAnimationFrame(() => requestAnimationFrame(() => nav.classList.remove('is-restoring')));
      }
      syncAria(nav);
    });
    syncLock();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', restore); else restore();
})();
