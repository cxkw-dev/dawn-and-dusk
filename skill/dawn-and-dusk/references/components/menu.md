# menu — `menu`

A list of actions or options that floats over the page: dropdowns, overflow menus and context menus. Grouped, text first, with shortcut hints; icons are optional.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/menu

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### Anatomy

Group labels, descriptions, shortcut hints, a submenu chevron, checked and disabled items, a divider and a danger item. Shown inline here; “Duplicate” is the highlighted row.

```html
<div class="dd-menu" role="menu" aria-label="dawn-and-dusk">
  <div class="dd-menu__group" role="group" aria-labelledby="mn-a-project">
    <p class="dd-menu__label" id="mn-a-project">Project</p>
    <button class="dd-menu__item" role="menuitem"><span class="dd-menu__body">Open<span class="dd-menu__desc">In a new window</span></span><kbd class="dd-menu__kbd">⌘O</kbd></button>
    <button class="dd-menu__item is-active" role="menuitem"><span class="dd-menu__body">Duplicate<span class="dd-menu__desc">Keeps history and comments</span></span><kbd class="dd-menu__kbd">⌘D</kbd></button>
    <button class="dd-menu__item" role="menuitem" aria-haspopup="menu" aria-expanded="false"><span class="dd-menu__body">Share<span class="dd-menu__desc">Link, embed or export</span></span><svg class="dd-icon dd-menu__sub" aria-hidden="true"><use href="#dd-i-chevron-right"/></svg></button>
  </div>
  <hr class="dd-menu__sep">
  <div class="dd-menu__group" role="group" aria-labelledby="mn-a-view">
    <p class="dd-menu__label" id="mn-a-view">View</p>
    <button class="dd-menu__item" role="menuitemcheckbox" aria-checked="true"><span class="dd-menu__body">Pin to sidebar</span><svg class="dd-icon dd-menu__check" aria-hidden="true"><use href="#dd-i-check"/></svg></button>
    <button class="dd-menu__item" role="menuitemcheckbox" aria-checked="false"><span class="dd-menu__body">Show dates</span><svg class="dd-icon dd-menu__check" aria-hidden="true"><use href="#dd-i-check"/></svg></button>
    <button class="dd-menu__item" role="menuitem" aria-disabled="true"><span class="dd-menu__body">Present<span class="dd-menu__desc">Connect a second display</span></span><kbd class="dd-menu__kbd">⌘P</kbd></button>
  </div>
  <hr class="dd-menu__sep">
  <button class="dd-menu__item dd-menu__item--danger" role="menuitem"><span class="dd-menu__body">Delete project<span class="dd-menu__desc">This can’t be undone</span></span><kbd class="dd-menu__kbd">⌘⌫</kbd></button>
</div>
```

## Dropdown

Put `data-dd-menu="menu-id"` on any button and `hidden` on the menu. The behaviour floats the menu below the trigger, flips it up when there’s no room, and moves focus into it. “Share” opens a submenu; hovering opens it too, and a click on an open submenu’s item keeps it open. If an item’s own handler moves focus (say, to a rename field), it stays there when the menu closes.

Try it: click the button, or focus it and press ↓ / ↑. Type a letter to jump to an item; → on “Share” opens its submenu, ← closes it; Esc closes and returns focus.

```html
<button class="dd-btn dd-btn--secondary" data-dd-menu="mn-project" aria-haspopup="menu" aria-expanded="false" aria-controls="mn-project"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-folder"/></svg><span>dawn-and-dusk</span><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></button>
<div class="dd-menu" id="mn-project" role="menu" aria-label="dawn-and-dusk" hidden>
  <div class="dd-menu__group" role="group" aria-labelledby="mn-p-project">
    <p class="dd-menu__label" id="mn-p-project">Project</p>
    <button class="dd-menu__item" role="menuitem"><span class="dd-menu__body">Open<span class="dd-menu__desc">In a new window</span></span><kbd class="dd-menu__kbd">⌘O</kbd></button>
    <button class="dd-menu__item" role="menuitem" data-dd-toast="Duplicated as dawn-and-dusk-copy" data-dd-toast-intent="ok"><span class="dd-menu__body">Duplicate<span class="dd-menu__desc">Keeps history and comments</span></span><kbd class="dd-menu__kbd">⌘D</kbd></button>
    <button class="dd-menu__item" role="menuitem" data-dd-menu="mn-share"><span class="dd-menu__body">Share<span class="dd-menu__desc">Link, embed or export</span></span><svg class="dd-icon dd-menu__sub" aria-hidden="true"><use href="#dd-i-chevron-right"/></svg></button>
  </div>
  <hr class="dd-menu__sep">
  <div class="dd-menu__group" role="group" aria-labelledby="mn-p-view">
    <p class="dd-menu__label" id="mn-p-view">View</p>
    <button class="dd-menu__item" role="menuitemcheckbox" aria-checked="true"><span class="dd-menu__body">Pin to sidebar</span><svg class="dd-icon dd-menu__check" aria-hidden="true"><use href="#dd-i-check"/></svg></button>
    <button class="dd-menu__item" role="menuitemcheckbox" aria-checked="false"><span class="dd-menu__body">Show dates</span><svg class="dd-icon dd-menu__check" aria-hidden="true"><use href="#dd-i-check"/></svg></button>
    <button class="dd-menu__item" role="menuitem" aria-disabled="true"><span class="dd-menu__body">Present<span class="dd-menu__desc">Connect a second display</span></span><kbd class="dd-menu__kbd">⌘P</kbd></button>
  </div>
  <hr class="dd-menu__sep">
  <button class="dd-menu__item dd-menu__item--danger" role="menuitem"><span class="dd-menu__body">Delete project<span class="dd-menu__desc">This can’t be undone</span></span><kbd class="dd-menu__kbd">⌘⌫</kbd></button>
</div>
<div class="dd-menu" id="mn-share" role="menu" aria-label="Share" hidden>
  <button class="dd-menu__item" role="menuitem" data-dd-toast="Link copied" data-dd-toast-intent="ok"><span class="dd-menu__body">Copy link</span><kbd class="dd-menu__kbd">⌘⇧L</kbd></button>
  <button class="dd-menu__item" role="menuitem"><span class="dd-menu__body">Embed…</span></button>
  <button class="dd-menu__item" role="menuitem"><span class="dd-menu__body">Export as ZIP</span></button>
</div>
```

## Checked items

`role="menuitemradio"` checks one item per group; `role="menuitemcheckbox"` toggles. Both keep the menu open so you can set several options. The check sits at the end and the label turns semibold.

Try it: pick a region and toggle what to show. The menu stays open; Space toggles the focused item.

```html
<button class="dd-btn dd-btn--ghost" data-dd-menu="mn-logview" aria-haspopup="menu" aria-expanded="false" aria-controls="mn-logview"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-settings"/></svg><span>View options</span></button>
<div class="dd-menu" id="mn-logview" role="menu" aria-label="Log view options" hidden>
  <div class="dd-menu__group" role="group" aria-labelledby="mn-lv-region">
    <p class="dd-menu__label" id="mn-lv-region">Region</p>
    <button class="dd-menu__item" role="menuitemradio" aria-checked="true"><span class="dd-menu__body">All regions</span><svg class="dd-icon dd-menu__check" aria-hidden="true"><use href="#dd-i-check"/></svg></button>
    <button class="dd-menu__item" role="menuitemradio" aria-checked="false"><span class="dd-menu__body">iad1 · Washington</span><svg class="dd-icon dd-menu__check" aria-hidden="true"><use href="#dd-i-check"/></svg></button>
    <button class="dd-menu__item" role="menuitemradio" aria-checked="false"><span class="dd-menu__body">fra1 · Frankfurt</span><svg class="dd-icon dd-menu__check" aria-hidden="true"><use href="#dd-i-check"/></svg></button>
    <button class="dd-menu__item" role="menuitemradio" aria-checked="false"><span class="dd-menu__body">hnd1 · Tokyo</span><svg class="dd-icon dd-menu__check" aria-hidden="true"><use href="#dd-i-check"/></svg></button>
  </div>
  <hr class="dd-menu__sep">
  <div class="dd-menu__group" role="group" aria-labelledby="mn-lv-show">
    <p class="dd-menu__label" id="mn-lv-show">Show</p>
    <button class="dd-menu__item" role="menuitemcheckbox" aria-checked="true"><span class="dd-menu__body">Timestamps</span><kbd class="dd-menu__kbd">T</kbd><svg class="dd-icon dd-menu__check" aria-hidden="true"><use href="#dd-i-check"/></svg></button>
    <button class="dd-menu__item" role="menuitemcheckbox" aria-checked="false"><span class="dd-menu__body">Request IDs</span><kbd class="dd-menu__kbd">I</kbd><svg class="dd-icon dd-menu__check" aria-hidden="true"><use href="#dd-i-check"/></svg></button>
    <button class="dd-menu__item" role="menuitemcheckbox" aria-checked="true"><span class="dd-menu__body">Wrap long lines</span><kbd class="dd-menu__kbd">W</kbd><svg class="dd-icon dd-menu__check" aria-hidden="true"><use href="#dd-i-check"/></svg></button>
  </div>
</div>
```

## With icons

Icons are optional; add them to every item of a menu or to none. A `.dd-menu__header` can say who or what the menu is about.

Try it: open the account menu and hover or → on “Theme” for a submenu of radio items.

```html
<button class="dd-btn dd-btn--ghost" data-dd-menu="mn-account" aria-haspopup="menu" aria-expanded="false" aria-controls="mn-account"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-user"/></svg><span>atn</span><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></button>
<div class="dd-menu" id="mn-account" role="menu" aria-label="Account" style="width: min(260px, 100%)" hidden>
  <div class="dd-menu__header"><span>atn</span><span>cxkw.dev · personal workspace</span></div>
  <hr class="dd-menu__sep" style="margin-top: 0">
  <button class="dd-menu__item" role="menuitem"><svg class="dd-icon dd-menu__icon" aria-hidden="true"><use href="#dd-i-user"/></svg><span class="dd-menu__body">Profile</span><kbd class="dd-menu__kbd">⌘,</kbd></button>
  <button class="dd-menu__item" role="menuitem"><svg class="dd-icon dd-menu__icon" aria-hidden="true"><use href="#dd-i-key"/></svg><span class="dd-menu__body">API tokens</span></button>
  <button class="dd-menu__item" role="menuitem"><svg class="dd-icon dd-menu__icon" aria-hidden="true"><use href="#dd-i-users"/></svg><span class="dd-menu__body">Team<span class="dd-menu__desc">4 members · cxkw</span></span></button>
  <button class="dd-menu__item" role="menuitem" data-dd-menu="mn-theme"><svg class="dd-icon dd-menu__icon" aria-hidden="true"><use href="#dd-i-moon"/></svg><span class="dd-menu__body">Theme</span><svg class="dd-icon dd-menu__sub" aria-hidden="true"><use href="#dd-i-chevron-right"/></svg></button>
  <hr class="dd-menu__sep">
  <button class="dd-menu__item" role="menuitem" data-dd-toast="Signed out" data-dd-toast-description="Not really — this is the docs."><svg class="dd-icon dd-menu__icon" aria-hidden="true"><use href="#dd-i-logout"/></svg><span class="dd-menu__body">Sign out</span></button>
</div>
<div class="dd-menu" id="mn-theme" role="menu" aria-label="Theme" hidden>
  <button class="dd-menu__item" role="menuitemradio" aria-checked="true"><span class="dd-menu__body">Match system</span><svg class="dd-icon dd-menu__check" aria-hidden="true"><use href="#dd-i-check"/></svg></button>
  <button class="dd-menu__item" role="menuitemradio" aria-checked="false"><span class="dd-menu__body">Dawn</span><svg class="dd-icon dd-menu__check" aria-hidden="true"><use href="#dd-i-check"/></svg></button>
  <button class="dd-menu__item" role="menuitemradio" aria-checked="false"><span class="dd-menu__body">Dusk</span><svg class="dd-icon dd-menu__check" aria-hidden="true"><use href="#dd-i-check"/></svg></button>
</div>
```

## Overflow menu

A “more” button at the end of a row. `data-dd-placement="bottom-end"` aligns the menu’s right edge with the trigger. Every row’s button can share one menu: open it on one row, then click another row’s ⋯ and the menu moves there.

To know which row the menu is for, listen for `dd:menuopen` on the menu: `event.detail.trigger` is the button that opened it, so `trigger.closest(…)` finds the row. The menu also keeps that button as `menu.ddTrigger` after it closes, which is what an item’s click handler needs: the menu closes as the item runs.

Try it: open a ⋯ menu — its header names the row — then click the next row’s ⋯; “View logs” and “Roll back” say which deployment they act on; “Promote to” has a submenu.

```html
<div class="dd-stack" style="--dd-gap: 5px; max-width: 520px">
  <div class="dd-surface" data-deploy="auth-gateway" style="display: flex; align-items: center; gap: 10px; padding: 10px 10px 10px 20px">
    <span class="dd-stack" style="--dd-gap: 2px; flex: 1; min-width: 0">
      <b style="font-weight: 600">auth-gateway</b>
      <span class="dd-small dd-muted"><span class="dd-mono">a3f9c21</span> · deployed 4 min ago · iad1</span>
    </span>
    <button class="dd-btn dd-btn--ghost dd-btn--icon dd-btn--sm" data-dd-menu="mn-row" data-dd-placement="bottom-end" aria-haspopup="menu" aria-expanded="false" aria-controls="mn-row" aria-label="Actions for auth-gateway"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-more"/></svg></button>
  </div>
  <div class="dd-surface" data-deploy="billing-worker" style="display: flex; align-items: center; gap: 10px; padding: 10px 10px 10px 20px">
    <span class="dd-stack" style="--dd-gap: 2px; flex: 1; min-width: 0">
      <b style="font-weight: 600">billing-worker</b>
      <span class="dd-small dd-muted"><span class="dd-mono">7be04d2</span> · deployed 1 h ago · fra1</span>
    </span>
    <button class="dd-btn dd-btn--ghost dd-btn--icon dd-btn--sm" data-dd-menu="mn-row" data-dd-placement="bottom-end" aria-haspopup="menu" aria-expanded="false" aria-controls="mn-row" aria-label="Actions for billing-worker"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-more"/></svg></button>
  </div>
  <div class="dd-surface" data-deploy="edge-cache" style="display: flex; align-items: center; gap: 10px; padding: 10px 10px 10px 20px">
    <span class="dd-stack" style="--dd-gap: 2px; flex: 1; min-width: 0">
      <b style="font-weight: 600">edge-cache</b>
      <span class="dd-small dd-muted"><span class="dd-mono">c41e9b0</span> · deployed yesterday · hnd1</span>
    </span>
    <button class="dd-btn dd-btn--ghost dd-btn--icon dd-btn--sm" data-dd-menu="mn-row" data-dd-placement="bottom-end" aria-haspopup="menu" aria-expanded="false" aria-controls="mn-row" aria-label="Actions for edge-cache"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-more"/></svg></button>
  </div>
</div>
<div class="dd-menu" id="mn-row" role="menu" aria-label="Deployment actions" hidden>
  <div class="dd-menu__header"><span data-row-name>Deployment</span></div>
  <hr class="dd-menu__sep" style="margin-top: 0">
  <button class="dd-menu__item" role="menuitem" data-action="Opening logs for"><span class="dd-menu__body">View logs</span><kbd class="dd-menu__kbd">L</kbd></button>
  <button class="dd-menu__item" role="menuitem" data-dd-toast="Deployment URL copied" data-dd-toast-intent="ok"><span class="dd-menu__body">Copy deployment URL</span><kbd class="dd-menu__kbd">⌘C</kbd></button>
  <button class="dd-menu__item" role="menuitem" data-dd-menu="mn-row-promote"><span class="dd-menu__body">Promote to</span><svg class="dd-icon dd-menu__sub" aria-hidden="true"><use href="#dd-i-chevron-right"/></svg></button>
  <hr class="dd-menu__sep">
  <button class="dd-menu__item dd-menu__item--danger" role="menuitem" data-action="Rolling back"><span class="dd-menu__body">Roll back</span></button>
</div>
<div class="dd-menu" id="mn-row-promote" role="menu" aria-label="Promote to" hidden>
  <button class="dd-menu__item" role="menuitem"><span class="dd-menu__body">staging</span></button>
  <button class="dd-menu__item" role="menuitem" data-dd-toast="Promoting to production" data-dd-toast-description="Checks run first; you can cancel for 30 s."><span class="dd-menu__body">production</span></button>
</div>
<script>
  {
    // One menu serves every row: the trigger that opened it says which row.
    const menu = document.getElementById('mn-row');
    menu.addEventListener('dd:menuopen', (e) => {
      const row = e.detail.trigger.closest('[data-deploy]');
      menu.querySelector('[data-row-name]').textContent = row.dataset.deploy;
    });
    // menu.ddTrigger names it too, and stays set once the menu closes (for handlers that run after it).
    menu.addEventListener('click', (e) => {
      const item = e.target.closest('[data-action]');
      if (item) dd.toast({ title: `${item.dataset.action} ${menu.ddTrigger.closest('[data-deploy]').dataset.deploy}` });
    });
  }
</script>
```

## Context menu

`data-dd-contextmenu="menu-id"` on an area opens the menu at the pointer on right-click. Make the area focusable so keyboard users can open it with Shift F10 or the Menu key.

Try it: right-click the file, or Tab to it and press Shift F10 or the Menu key.

```html
<div tabindex="0" data-dd-contextmenu="mn-ctx" aria-describedby="mn-ctx-hint" class="dd-surface" style="display: grid; place-content: center; justify-items: center; gap: 5px; min-height: 150px; padding: 20px; text-align: center; outline-offset: 2px">
  <span class="dd-row" style="--dd-gap: 5px; justify-content: center"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-file"/></svg><span class="dd-mono">billing-worker.log</span></span>
  <span class="dd-small dd-muted" id="mn-ctx-hint">Right-click, or focus and press Shift F10</span>
</div>
<div class="dd-menu" id="mn-ctx" role="menu" aria-label="Log file" hidden>
  <button class="dd-menu__item" role="menuitem"><span class="dd-menu__body">Open in log viewer</span><kbd class="dd-menu__kbd">↵</kbd></button>
  <button class="dd-menu__item" role="menuitem" data-dd-toast="Path copied" data-dd-toast-description="/var/log/billing-worker.log" data-dd-toast-intent="ok"><span class="dd-menu__body">Copy path</span><kbd class="dd-menu__kbd">⌘⇧C</kbd></button>
  <button class="dd-menu__item" role="menuitem"><span class="dd-menu__body">Download</span></button>
  <hr class="dd-menu__sep">
  <button class="dd-menu__item dd-menu__item--danger" role="menuitem"><span class="dd-menu__body">Delete file</span><kbd class="dd-menu__kbd">⌫</kbd></button>
</div>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-menu` | The floating panel. Add `role="menu"`, an `aria-label` and `hidden` until opened. Without the behaviour it renders inline. |
| `.dd-menu.is-floating` | Set by the behaviour while open: fixed position, reveal motion, scrolls when taller than the viewport. |
| `.dd-menu__header` | Plain text above the items: first child bold, the rest small and muted. |
| `.dd-menu__group + .dd-menu__label` | A `role="group"` with a small-caps label (`aria-labelledby` it). |
| `.dd-menu__sep` | Full-bleed hairline divider. Use `<hr>`. |
| `.dd-menu__item` | A row. Use `<button>` or `<a>` with `role="menuitem"`, `menuitemcheckbox` or `menuitemradio`. |
| `.is-active` | The highlighted row: one tone deeper. The behaviour highlights the focused row (hover moves focus in a floating menu); add the class yourself only in static demos. An item whose submenu is open keeps the highlight. |
| `.dd-menu__body` | Holds the label and an optional `.dd-menu__desc` second line. Grows to push trailing parts to the end. |
| `.dd-menu__icon` | Optional leading icon (`svg.dd-icon`). |
| `.dd-menu__kbd` | Shortcut hint, mono and quiet. Use `<kbd>`. |
| `.dd-menu__check` | Check icon, visible when the item has `aria-checked="true"`. |
| `.dd-menu__sub` | Chevron for an item that opens a submenu. |
| `.dd-menu__item--danger` | Destructive item: red text, soft red highlight. |
| `[aria-disabled="true"]` | Disabled item (`disabled` works too): dimmed to `--dd-quiet` (still readable), no highlight, skipped by the arrow keys. |
| `.dd-btn[data-dd-menu][aria-expanded="true"]` | A button trigger keeps its variant’s hover tone while its menu is open. |
| `--dd-menu-bg / --dd-menu-hover` | Panel and highlight colours. Default to `--dd-float-bg` and `--dd-float-hover`; the command palette uses them too. |

## Behaviour

`ds/behaviors/menu.js` floats the menu next to its trigger, moves focus into it and closes it on a click outside. It fills in `aria-haspopup`, `aria-expanded` and `aria-controls` on triggers if you leave them out.

| class / attribute | what it does |
|---|---|
| `data-dd-menu="id"` | On a button: toggles the menu with that id. With an empty value, the next `.dd-menu` sibling. On an item inside a menu: opens a submenu to its side. |
| `data-dd-placement` | On the trigger or the menu: `bottom-start` (default), `bottom-end`, `top-start`, `top-end`. Menus flip when they would leave the viewport. |
| `data-dd-contextmenu="id"` | On an area: opens the menu at the pointer on right-click, Shift F10 or the Menu key. |
| `role="menuitemcheckbox"` | Click toggles `aria-checked`; the menu stays open. |
| `role="menuitemradio"` | Click checks this item and unchecks the others in its `role="group"` (or the whole menu); the menu stays open. |

| class / attribute | what it does |
|---|---|
| `dd:menuopen` | Fired on the menu as it opens, before it is measured (so a listener can relabel or disable items). `detail.trigger` is the button that opened it — or the area, for a context menu. Bubbles. |
| `dd:menuclose` | Fired on the menu as it closes, with the same `detail.trigger`. Moving a shared menu to another row fires `dd:menuclose` for the old trigger, then `dd:menuopen` for the new one. |
| `menu.ddTrigger` | The element that last opened the menu. Still set after it closes, so an item’s click handler can read it. |
| `dd.menu.open(menu, trigger, { focus })` | Opens `menu` (the element, its id or `"#id"`) under `trigger` (default: the first `[data-dd-menu]` pointing at it). `focus`: `"first"` (default), `"last"` or `"none"`. |
| `dd.menu.close(menu)` | Closes that menu and its submenus; with no argument, every open menu. If focus was inside, it goes back to the trigger. Does nothing when the menu isn’t open. |
| `dd.menu.trigger(menu)` | Same as `menu.ddTrigger`. |

| class / attribute | what it does |
|---|---|
| `↓ / ↑ on the trigger` | Opens the menu with the first / last item focused. Enter and Space open at the first item. |
| `↓ ↑ · Home End` | Move between items, wrapping at the ends; disabled items are skipped. Page Up / Page Down act as Home / End. |
| `A letter` | Jumps to the next item that starts with it; type several letters quickly to match more of a label. |
| `Enter / Space` | Runs the focused item, or opens its submenu. |
| `→ / ←` | Opens a submenu / closes it and returns to its parent item. |
| `Esc` | Closes the innermost menu and returns focus to its trigger. |
| `Tab` | Closes every menu and moves on from the trigger. |

## Guidelines

Do:
- Group related items and label the groups; put destructive items last, after a divider.
- Show the shortcut for anything that has one.
- Keep labels to a verb and an object: “Copy path”, “Roll back”.

Don't:
- Don’t nest submenus more than one level deep.
- Don’t put the only path to an action inside a context menu.
- Don’t mix items with and without icons in one menu.

