/* Menu: a trigger with [data-dd-menu="menu-id"] toggles that .dd-menu (an empty value means the next .dd-menu sibling).
   [data-dd-contextmenu="menu-id"] on an area opens the menu at the pointer on right-click, Shift+F10 or the Menu key.
   An item inside a menu with [data-dd-menu] opens a submenu to its side. Optional [data-dd-placement] on the trigger:
   bottom-start (default) · bottom-end · top-start · top-end. Menus flip when they would leave the viewport.
   Several triggers may share one menu (a ⋯ button per row): clicking another one moves the open menu to it.
   Which trigger: the menu fires dd:menuopen and dd:menuclose (they bubble) with detail { trigger } — the button that
   opened it, or the area for a context menu — and keeps menu.ddTrigger set to that element after it closes, so an
   item's click handler can read the row it was opened from (moving to another trigger fires close, then open).
   Global: dd.menu.open(menu, trigger, { focus: 'first' | 'last' | 'none' }), dd.menu.close(menu) (or no argument for every
   open menu; focus inside it goes back to its trigger), dd.menu.trigger(menu). `menu` is the element, its id or '#id'.
   Keyboard: ↓ / ↑ on the trigger open at the first / last item; in the menu ↑ ↓ Home End move, a letter jumps,
   → opens a submenu, ← closes it, Esc closes and returns focus, Tab closes. Clicking outside closes.
   role=menuitemcheckbox toggles aria-checked; role=menuitemradio checks one per group — both keep the menu open. */
(() => {
  const ITEM = '[role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"]';
  const GAP = 5;
  const stack = []; // open floating menus, root first: { menu, trigger, side, align, at, ret }
  let hoverTimer = 0;
  let hoverItem = null;
  let typed = '';
  let typedAt = 0;

  const byId = (v) => (v ? document.getElementById(v.replace(/^#/, '')) : null);
  const emit = (menu, type, trigger) => menu.dispatchEvent(new CustomEvent(type, { bubbles: true, detail: { trigger } }));
  const menuFor = (trigger) => {
    const v = trigger.getAttribute('data-dd-menu');
    if (v) return byId(v);
    let n = trigger.nextElementSibling;
    while (n && !n.classList.contains('dd-menu')) n = n.nextElementSibling;
    return n;
  };
  const disabled = (el) => el.disabled || el.getAttribute('aria-disabled') === 'true';
  const itemsOf = (menu) => [...menu.querySelectorAll(ITEM)]
    .filter((el) => el.closest('.dd-menu') === menu && !disabled(el) && el.getClientRects().length);
  const entryOf = (menu) => stack.find((s) => s.menu === menu);
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(v, hi));

  function place(s, first) {
    const { menu } = s;
    if (first) menu.style.animation = 'none';
    menu.style.left = '0px';
    menu.style.top = '0px';
    menu.style.maxHeight = '';
    // Where (0, 0) actually lands — non-zero only inside a transformed ancestor.
    const zero = menu.getBoundingClientRect();
    const w = zero.width;
    let h = zero.height;
    const vw = document.documentElement.clientWidth, vh = window.innerHeight, pad = 8;
    const a = s.at ? { left: s.at.x, right: s.at.x, top: s.at.y, bottom: s.at.y } : s.trigger.getBoundingClientRect();
    const gap = s.at ? 0 : GAP;
    let x, y, side = s.side;
    if (side === 'right') {
      x = a.right - 2; y = a.top - GAP * 1.5;
      if (x + w > vw - pad) {
        if (a.left - w + 2 >= pad) { x = a.left - w + 2; side = 'left'; }
        else {
          // No room on either side (phones): drop the submenu just under its item, nudged in, so the item that
          // opened it stays visible instead of being covered.
          x = a.left + GAP * 4; y = a.bottom - 2; side = 'bottom';
          if (y + h > vh - pad && a.top - h + 2 >= pad) { y = a.top - h + 2; side = 'top'; }
        }
      }
    } else {
      x = s.align === 'end' ? a.right - w : a.left;
      const roomBelow = vh - pad - (a.bottom + gap), roomAbove = a.top - gap - pad;
      // Preferred side if it fits, else the other side if it fits, else the roomier side with a scrolling menu.
      const fits = (sd) => h <= (sd === 'top' ? roomAbove : roomBelow);
      side = fits(side) ? side : fits(side === 'top' ? 'bottom' : 'top') ? (side === 'top' ? 'bottom' : 'top') : roomAbove > roomBelow ? 'top' : 'bottom';
      const room = side === 'top' ? roomAbove : roomBelow;
      if (h > room) { h = Math.max(room, 120); menu.style.maxHeight = `${h}px`; }
      y = side === 'top' ? a.top - gap - h : a.bottom + gap;
    }
    x = clamp(x, pad, Math.max(pad, vw - pad - w));
    y = clamp(y, pad, Math.max(pad, vh - pad - h));
    menu.style.left = `${Math.round(x - zero.left)}px`;
    menu.style.top = `${Math.round(y - zero.top)}px`;
    menu.dataset.side = side;
    if (first) menu.style.animation = ''; // restarts the reveal from the final position
  }

  function closeAbove(menu) { // close every open menu stacked above `menu` (null → all)
    clearTimeout(hoverTimer);
    hoverItem = null;
    while (stack.length && stack[stack.length - 1].menu !== menu) {
      const s = stack.pop();
      s.menu.hidden = true;
      s.menu.classList.remove('is-floating');
      s.trigger?.setAttribute('aria-expanded', 'false');
      emit(s.menu, 'dd:menuclose', s.source);
    }
  }
  function closeAll(refocus) {
    const root = stack[0];
    closeAbove(null);
    if (refocus && root) (root.trigger || root.ret)?.focus?.({ preventScroll: true });
  }

  function open(menu, trigger, { focus = 'first', at = null, ret = null } = {}) {
    const parent = trigger?.closest('.dd-menu.is-floating') || null;
    closeAbove(parent);
    const [side0, align] = (trigger?.getAttribute('data-dd-placement') || menu.getAttribute('data-dd-placement') || 'bottom-start').split('-');
    const s = { menu, trigger: at ? null : trigger, source: trigger || null, side: parent ? 'right' : side0, align, at, ret: ret || document.activeElement };
    if (!menu.getAttribute('role')) menu.setAttribute('role', 'menu');
    if (!menu.hasAttribute('tabindex')) menu.tabIndex = -1;
    menu.ddTrigger = s.source;
    menu.hidden = false;
    menu.classList.add('is-floating');
    stack.push(s);
    s.trigger?.setAttribute('aria-expanded', 'true');
    // Before measuring: a listener may relabel or disable items for this trigger's row.
    emit(menu, 'dd:menuopen', s.source);
    if (entryOf(menu) !== s) return; // a listener closed it again
    itemsOf(menu).forEach((el) => { el.tabIndex = -1; });
    place(s, true);
    if (focus === 'none') return;
    const list = itemsOf(menu);
    const target = focus === 'last' ? list[list.length - 1] : focus === 'first' ? list[0] : null;
    (target || menu).focus({ preventScroll: true });
  }

  const toggleFromTrigger = (t, focus) => {
    const menu = menuFor(t);
    if (!menu) return;
    // Open from this trigger: close it. Open from another trigger sharing the menu (one menu for every row's
    // ⋯ button): move it here instead.
    if (entryOf(menu)?.trigger === t) { closeAbove(t.closest('.dd-menu.is-floating') || null); t.focus({ preventScroll: true }); }
    else open(menu, t, { focus });
  };

  const activate = (item) => {
    if (disabled(item)) return;
    const role = item.getAttribute('role');
    if (role === 'menuitemcheckbox') { item.setAttribute('aria-checked', String(item.getAttribute('aria-checked') !== 'true')); return; }
    if (role === 'menuitemradio') {
      const scope = item.closest('[role="group"]') || item.closest('.dd-menu');
      scope.querySelectorAll('[role="menuitemradio"]').forEach((r) => {
        if (r.closest('.dd-menu') === item.closest('.dd-menu')) r.setAttribute('aria-checked', String(r === item));
      });
      return;
    }
    if (item.matches('[data-dd-menu]')) return;
    if (item.closest('.dd-menu.is-floating')) closeAll(true);
  };

  // Close on a press anywhere outside the open menus and their triggers.
  document.addEventListener('pointerdown', (e) => {
    if (!stack.length || e.target.closest('.dd-menu.is-floating, [data-dd-menu]')) return;
    closeAll(false);
  }, true);

  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-dd-menu]');
    if (t && !disabled(t)) {
      e.preventDefault();
      toggleFromTrigger(t, 'first');
      return;
    }
    const item = e.target.closest(ITEM);
    if (item && item.closest('.dd-menu')) {
      if (disabled(item)) { e.preventDefault(); return; }
      activate(item);
    }
  });

  // Context menus: right-click opens at the pointer; from the keyboard (Menu key, Shift F10) under the focused element.
  const openContext = (area, menu, x, y) => {
    // Re-opening keeps the original return target, not an item of the menu that is about to close.
    const prev = entryOf(menu);
    const ret = prev ? prev.ret : document.activeElement;
    if (!x && !y) {
      const from = ret && area.contains(ret) ? ret : area;
      const r = from.getBoundingClientRect(); x = r.left + 12; y = r.bottom;
    }
    closeAll(false);
    open(menu, area, { at: { x, y }, ret });
  };
  const contextOf = (el) => {
    const area = el?.closest?.('[data-dd-contextmenu]');
    const menu = area && byId(area.getAttribute('data-dd-contextmenu'));
    return menu && !menu.contains(el) ? { area, menu } : null;
  };
  document.addEventListener('contextmenu', (e) => {
    const c = contextOf(e.target);
    if (!c) return;
    e.preventDefault();
    openContext(c.area, c.menu, e.clientX, e.clientY);
  });

  // Real pointer movement moves focus; opening a menu beneath a stationary pointer must not steal keyboard focus.
  // Moving onto another item opens / closes its submenu after a short pause.
  document.addEventListener('pointermove', (e) => {
    // Touch has no hover: a finger held past the delay would open a submenu that the tap's click then closes.
    if (e.pointerType === 'touch') return;
    const item = e.target.closest(ITEM);
    const menu = item?.closest('.dd-menu.is-floating');
    if (!menu) { hoverItem = null; return; }
    if (item === hoverItem) return;
    hoverItem = item;
    clearTimeout(hoverTimer);
    if (!disabled(item)) item.focus({ preventScroll: true });
    hoverTimer = setTimeout(() => {
      if (!entryOf(menu)) return;
      const sub = item.matches('[data-dd-menu]') && !disabled(item) ? menuFor(item) : null;
      if (sub && entryOf(sub)?.trigger === item) { closeAbove(sub); return; }
      closeAbove(menu);
      if (sub) open(sub, item, { focus: 'none' });
    }, 140);
  });

  document.addEventListener('keydown', (e) => {
    const t = e.target;
    // Shift F10 opens a context menu; macOS browsers don't turn it into a contextmenu event themselves.
    if (e.key === 'F10' && e.shiftKey && !e.ctrlKey && !e.metaKey && !e.altKey) {
      const c = contextOf(t);
      if (c) { e.preventDefault(); openContext(c.area, c.menu, 0, 0); return; }
    }
    // Root trigger: ↓ / ↑ open at the first / last item.
    if (t.matches?.('[data-dd-menu]') && !t.closest('.dd-menu') && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      e.preventDefault();
      const menu = menuFor(t);
      if (menu && entryOf(menu)?.trigger !== t) open(menu, t, { focus: e.key === 'ArrowUp' ? 'last' : 'first' });
      else if (menu) { const l = itemsOf(menu); (e.key === 'ArrowUp' ? l[l.length - 1] : l[0])?.focus(); }
      return;
    }
    const menu = t.closest?.('.dd-menu');
    if (!menu) return;
    const list = itemsOf(menu);
    const i = list.indexOf(t.closest(ITEM));
    const floating = menu.classList.contains('is-floating');
    const go = (n) => { e.preventDefault(); list[(n + list.length) % list.length]?.focus(); };
    switch (e.key) {
      case 'ArrowDown': return go(i < 0 ? 0 : i + 1);
      case 'ArrowUp': return go(i < 0 ? list.length - 1 : i - 1);
      case 'Home': case 'PageUp': return go(0);
      case 'End': case 'PageDown': return go(list.length - 1);
      case 'ArrowRight': {
        const it = list[i];
        if (it?.matches('[data-dd-menu]')) { e.preventDefault(); const sub = menuFor(it); if (sub) open(sub, it, { focus: 'first' }); }
        return;
      }
      case 'ArrowLeft': {
        const s = entryOf(menu);
        if (s && s.trigger?.closest('.dd-menu')) { e.preventDefault(); closeAbove(s.trigger.closest('.dd-menu')); s.trigger.focus(); }
        return;
      }
      case 'Escape': {
        if (!floating) return;
        e.preventDefault(); e.stopPropagation();
        const s = entryOf(menu);
        const parent = s?.trigger?.closest('.dd-menu.is-floating');
        if (parent) { closeAbove(parent); s.trigger.focus(); } else closeAll(true);
        return;
      }
      case 'Tab': if (floating) closeAll(true); return;
      case 'Enter': case ' ': {
        const it = t.closest(ITEM);
        if (!it) return;
        if (it.matches('[data-dd-menu]')) { e.preventDefault(); const sub = menuFor(it); if (sub) open(sub, it, { focus: 'first' }); return; }
        if (it.tagName !== 'BUTTON') { e.preventDefault(); it.click(); }
        return;
      }
      default: {
        if (e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey) return;
        const now = Date.now();
        typed = now - typedAt > 600 ? e.key.toLowerCase() : typed + e.key.toLowerCase();
        typedAt = now;
        const label = (el) => (el.querySelector('.dd-menu__body')?.firstChild?.textContent || el.textContent).trim().toLowerCase();
        const order = [...list.slice(i + 1), ...list.slice(0, i + 1)];
        const hit = order.find((el) => label(el).startsWith(typed)) || order.find((el) => label(el).startsWith(typed[0]));
        if (hit) { e.preventDefault(); hit.focus(); }
      }
    }
  });

  // Keep anchored menus attached while the page scrolls or resizes. A menu whose trigger has left the page (its row was
  // re-rendered) closes, with its submenus, instead of jumping to the corner.
  let raf = 0;
  const follow = () => {
    if (!stack.length || raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      const gone = stack.findIndex((s) => s.trigger && !s.trigger.isConnected);
      if (gone >= 0) closeAbove(gone > 0 ? stack[gone - 1].menu : null);
      stack.forEach((s) => { if (!s.at) place(s); });
    });
  };
  window.addEventListener('resize', follow);
  window.addEventListener('scroll', (e) => { if (!e.target?.closest?.('.dd-menu')) follow(); }, true);

  // ---------- from script ----------
  const resolveMenu = (m) => (typeof m === 'string' ? byId(m) : m) || null;
  const firstTrigger = (menu) => [...document.querySelectorAll('[data-dd-menu]')].find((t) => menuFor(t) === menu) || null;
  window.dd = window.dd || {};
  window.dd.menu = {
    open(m, trigger, { focus = 'first' } = {}) {
      const menu = resolveMenu(m);
      const t = (typeof trigger === 'string' ? document.querySelector(trigger) : trigger) || (menu && firstTrigger(menu));
      if (!menu || !t) return;
      open(menu, t, { focus });
    },
    close(m) {
      const s = m == null ? stack[0] : entryOf(resolveMenu(m));
      if (!s) return; // not open
      const i = stack.indexOf(s);
      const hadFocus = stack.slice(i).some((x) => x.menu.contains(document.activeElement));
      closeAbove(i > 0 ? stack[i - 1].menu : null);
      if (hadFocus) (s.trigger || s.ret)?.focus?.({ preventScroll: true });
    },
    trigger: (m) => resolveMenu(m)?.ddTrigger || null,
  };

  // Fill in ARIA the markup left out: on load, and for a trigger rendered later the first time it takes focus.
  const fill = (t) => {
    if (!t.hasAttribute('aria-haspopup')) t.setAttribute('aria-haspopup', 'menu');
    if (!t.hasAttribute('aria-expanded')) t.setAttribute('aria-expanded', 'false');
    const m = menuFor(t);
    if (m?.id && !t.hasAttribute('aria-controls')) t.setAttribute('aria-controls', m.id);
  };
  document.addEventListener('focusin', (e) => { const t = e.target.closest?.('[data-dd-menu]'); if (t) fill(t); });
  const init = () => document.querySelectorAll('[data-dd-menu]').forEach(fill);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
