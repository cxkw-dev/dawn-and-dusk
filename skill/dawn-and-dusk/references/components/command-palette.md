# command palette — `command-palette`

The ⌘K dialog: jump to any project, service or command by typing. A large search field, grouped results with shortcut hints, one selected row, and a calm empty state.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/command-palette

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### Open

Shown inline. The selected row takes the deeper tone and trades its shortcut for ↵. Try it: type “service” or “deploy” in the field, move with ↑ ↓, press Enter or click a row to run it.

```html
<div class="dd-command" aria-label="Command palette">
  <div class="dd-command__search">
    <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-search"/></svg>
    <input class="dd-command__input" type="text" role="combobox" aria-expanded="true" aria-autocomplete="list" aria-controls="cp-open-list" aria-activedescendant="cp-open-1" aria-label="Search" placeholder="Search projects, services and commands…" autocomplete="off" spellcheck="false">
    <kbd class="dd-kbd dd-kbd--sm">esc</kbd>
  </div>
  <div class="dd-command__list" role="listbox" id="cp-open-list" aria-label="Results">
    <div class="dd-command__group" role="group" aria-labelledby="cp-open-g0">
      <p class="dd-command__label" id="cp-open-g0">Projects</p>
      <div class="dd-command__item" role="option" id="cp-open-0" aria-selected="false"><svg class="dd-icon dd-command__icon" aria-hidden="true"><use href="#dd-i-folder"/></svg><span class="dd-command__body"><span>dawn-and-dusk</span><span class="dd-command__meta">Design system · cxkw.dev</span></span><span class="dd-command__hint"><kbd class="dd-kbd dd-kbd--sm dd-command__enter">↵</kbd></span></div>
      <div class="dd-command__item" role="option" id="cp-open-1" aria-selected="true"><svg class="dd-icon dd-command__icon" aria-hidden="true"><use href="#dd-i-folder"/></svg><span class="dd-command__body"><span>dockey-ui</span><span class="dd-command__meta">Keyboard-first dock for macOS</span></span><span class="dd-command__hint"><kbd class="dd-kbd dd-kbd--sm dd-command__enter">↵</kbd></span></div>
      <div class="dd-command__item" role="option" id="cp-open-2" aria-selected="false"><svg class="dd-icon dd-command__icon" aria-hidden="true"><use href="#dd-i-folder"/></svg><span class="dd-command__body"><span>ai-focus</span><span class="dd-command__meta">Todos, notes and focus sessions</span></span><span class="dd-command__hint"><kbd class="dd-kbd dd-kbd--sm dd-command__enter">↵</kbd></span></div>
    </div>
    <div class="dd-command__group" role="group" aria-labelledby="cp-open-g1">
      <p class="dd-command__label" id="cp-open-g1">Services</p>
      <div class="dd-command__item" role="option" id="cp-open-3" aria-selected="false" data-keywords="service"><svg class="dd-icon dd-command__icon" aria-hidden="true"><use href="#dd-i-server"/></svg><span class="dd-command__body"><span>auth-gateway</span><span class="dd-command__meta">iad1 · fra1 · healthy</span></span><span class="dd-command__hint"><kbd class="dd-kbd dd-kbd--sm dd-command__enter">↵</kbd></span></div>
      <div class="dd-command__item" role="option" id="cp-open-4" aria-selected="false" data-keywords="service"><svg class="dd-icon dd-command__icon" aria-hidden="true"><use href="#dd-i-server"/></svg><span class="dd-command__body"><span>billing-worker</span><span class="dd-command__meta">iad1 · 3 errors in the last hour</span></span><span class="dd-command__hint"><kbd class="dd-kbd dd-kbd--sm dd-command__enter">↵</kbd></span></div>
      <div class="dd-command__item" role="option" id="cp-open-5" aria-selected="false" data-keywords="service cdn"><svg class="dd-icon dd-command__icon" aria-hidden="true"><use href="#dd-i-cloud"/></svg><span class="dd-command__body"><span>edge-cache</span><span class="dd-command__meta">12 regions · 98.7% hit rate</span></span><span class="dd-command__hint"><kbd class="dd-kbd dd-kbd--sm dd-command__enter">↵</kbd></span></div>
    </div>
    <div class="dd-command__group" role="group" aria-labelledby="cp-open-g2">
      <p class="dd-command__label" id="cp-open-g2">Commands</p>
      <div class="dd-command__item" role="option" id="cp-open-6" aria-selected="false" data-keywords="deploy"><svg class="dd-icon dd-command__icon" aria-hidden="true"><use href="#dd-i-refresh"/></svg><span class="dd-command__body"><span>Redeploy auth-gateway</span></span><span class="dd-command__hint"><kbd class="dd-kbd dd-kbd--sm dd-command__enter">↵</kbd><kbd class="dd-kbd-combo"><kbd class="dd-kbd dd-kbd--sm">⌘</kbd><kbd class="dd-kbd dd-kbd--sm">⇧</kbd><kbd class="dd-kbd dd-kbd--sm">R</kbd></kbd></span></div>
      <div class="dd-command__item" role="option" id="cp-open-7" aria-selected="false"><svg class="dd-icon dd-command__icon" aria-hidden="true"><use href="#dd-i-terminal"/></svg><span class="dd-command__body"><span>Open logs</span></span><span class="dd-command__hint"><kbd class="dd-kbd dd-kbd--sm dd-command__enter">↵</kbd><kbd class="dd-kbd-combo"><kbd class="dd-kbd dd-kbd--sm">G</kbd><span class="dd-kbd-combo__sep">then</span><kbd class="dd-kbd dd-kbd--sm">L</kbd></kbd></span></div>
      <div class="dd-command__item" role="option" id="cp-open-8" aria-selected="false" data-keywords="theme dark"><svg class="dd-icon dd-command__icon" aria-hidden="true"><use href="#dd-i-moon"/></svg><span class="dd-command__body"><span>Switch to dusk</span></span><span class="dd-command__hint"><kbd class="dd-kbd dd-kbd--sm dd-command__enter">↵</kbd><kbd class="dd-kbd-combo"><kbd class="dd-kbd dd-kbd--sm">⌥</kbd><kbd class="dd-kbd dd-kbd--sm">T</kbd></kbd></span></div>
      <div class="dd-command__item" role="option" id="cp-open-9" aria-selected="false" data-keywords="team member"><svg class="dd-icon dd-command__icon" aria-hidden="true"><use href="#dd-i-users"/></svg><span class="dd-command__body"><span>Invite a teammate…</span></span><span class="dd-command__hint"><kbd class="dd-kbd dd-kbd--sm dd-command__enter">↵</kbd></span></div>
    </div>
  </div>
  <div class="dd-command__empty" hidden>
    <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-search"/></svg>
    <b>No results for “<span class="dd-command__query"></span>”</b>
    <p>Try a project, a service such as <span class="dd-mono">auth-gateway</span>, or a command like “redeploy”.</p>
  </div>
  <div class="dd-command__foot">
    <span class="dd-command__brand">cxkw.dev</span>
    <span><kbd class="dd-kbd dd-kbd--sm">↑</kbd><kbd class="dd-kbd dd-kbd--sm">↓</kbd> move</span>
    <span><kbd class="dd-kbd dd-kbd--sm">↵</kbd> run</span>
    <span><kbd class="dd-kbd dd-kbd--sm">esc</kbd> close</span>
  </div>
</div>
```

## Filtered

Typing narrows every group at once; groups with no matches disappear and the first match is selected. Rows also match their `data-keywords`, so “service” finds auth-gateway.

Try it: add or delete letters in the search. “deploy” finds the recent deploys through their keywords.

```html
<div class="dd-command" aria-label="Command palette">
  <div class="dd-command__search">
    <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-search"/></svg>
    <input class="dd-command__input" type="text" role="combobox" aria-expanded="true" aria-autocomplete="list" aria-controls="cp-filter-list" aria-activedescendant="cp-filter-0" aria-label="Search" placeholder="Search projects, services and commands…" autocomplete="off" spellcheck="false" value="deploy">
    <kbd class="dd-kbd dd-kbd--sm">esc</kbd>
  </div>
  <div class="dd-command__list" role="listbox" id="cp-filter-list" aria-label="Results">
    <div class="dd-command__group" role="group" aria-labelledby="cp-filter-g0">
      <p class="dd-command__label" id="cp-filter-g0">Commands</p>
      <div class="dd-command__item" role="option" id="cp-filter-0" aria-selected="true"><svg class="dd-icon dd-command__icon" aria-hidden="true"><use href="#dd-i-refresh"/></svg><span class="dd-command__body"><span>Redeploy auth-gateway</span></span><span class="dd-command__hint"><kbd class="dd-kbd dd-kbd--sm dd-command__enter">↵</kbd><kbd class="dd-kbd-combo"><kbd class="dd-kbd dd-kbd--sm">⌘</kbd><kbd class="dd-kbd dd-kbd--sm">⇧</kbd><kbd class="dd-kbd dd-kbd--sm">R</kbd></kbd></span></div>
      <div class="dd-command__item" role="option" id="cp-filter-1" aria-selected="false"><svg class="dd-icon dd-command__icon" aria-hidden="true"><use href="#dd-i-play"/></svg><span class="dd-command__body"><span>Deploy dawn-and-dusk to preview</span></span><span class="dd-command__hint"><kbd class="dd-kbd dd-kbd--sm dd-command__enter">↵</kbd><kbd class="dd-kbd-combo"><kbd class="dd-kbd dd-kbd--sm">⌘</kbd><kbd class="dd-kbd dd-kbd--sm">↵</kbd></kbd></span></div>
      <div class="dd-command__item" role="option" id="cp-filter-2" aria-selected="false"><svg class="dd-icon dd-command__icon" aria-hidden="true"><use href="#dd-i-arrow-left"/></svg><span class="dd-command__body"><span>Roll back last deploy</span><span class="dd-command__meta">edge-cache · 2h ago</span></span><span class="dd-command__hint"><kbd class="dd-kbd dd-kbd--sm dd-command__enter">↵</kbd></span></div>
    </div>
    <div class="dd-command__group" role="group" aria-labelledby="cp-filter-g1">
      <p class="dd-command__label" id="cp-filter-g1">Recent deploys</p>
      <div class="dd-command__item" role="option" id="cp-filter-3" aria-selected="false" data-keywords="deploy"><svg class="dd-icon dd-command__icon" aria-hidden="true"><use href="#dd-i-clock"/></svg><span class="dd-command__body"><span><span class="dd-mono">dpl_a3f9c21</span></span><span class="dd-command__meta">auth-gateway · 4 min ago · ready</span></span><span class="dd-command__hint"><kbd class="dd-kbd dd-kbd--sm dd-command__enter">↵</kbd></span></div>
      <div class="dd-command__item" role="option" id="cp-filter-4" aria-selected="false" data-keywords="deploy"><svg class="dd-icon dd-command__icon" aria-hidden="true"><use href="#dd-i-clock"/></svg><span class="dd-command__body"><span><span class="dd-mono">dpl_7be04d2</span></span><span class="dd-command__meta">billing-worker · 1h ago · failed</span></span><span class="dd-command__hint"><kbd class="dd-kbd dd-kbd--sm dd-command__enter">↵</kbd></span></div>
    </div>
  </div>
  <div class="dd-command__empty" hidden>
    <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-search"/></svg>
    <b>No results for “<span class="dd-command__query">deploy</span>”</b>
    <p>Try a project, a service such as <span class="dd-mono">auth-gateway</span>, or a command like “redeploy”.</p>
  </div>
  <div class="dd-command__foot">
    <span class="dd-command__brand">cxkw.dev</span>
    <span><kbd class="dd-kbd dd-kbd--sm">↑</kbd><kbd class="dd-kbd dd-kbd--sm">↓</kbd> move</span>
    <span><kbd class="dd-kbd dd-kbd--sm">↵</kbd> run</span>
    <span><kbd class="dd-kbd dd-kbd--sm">esc</kbd> close</span>
  </div>
</div>
```

## Empty state

When nothing matches, the list hides and `.dd-command__empty` echoes the query and suggests what to try.

Try it: type in the field and the query echoes in the message.

```html
<div class="dd-command" aria-label="Command palette">
  <div class="dd-command__search">
    <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-search"/></svg>
    <input class="dd-command__input" type="text" role="combobox" aria-expanded="true" aria-autocomplete="list" aria-controls="cp-empty-list" aria-label="Search" placeholder="Search projects, services and commands…" autocomplete="off" spellcheck="false" value="kubernetes">
    <kbd class="dd-kbd dd-kbd--sm">esc</kbd>
  </div>
  <div class="dd-command__list" role="listbox" id="cp-empty-list" aria-label="Results" hidden>

  </div>
  <div class="dd-command__empty">
    <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-search"/></svg>
    <b>No results for “<span class="dd-command__query">kubernetes</span>”</b>
    <p>Try a project, a service such as <span class="dd-mono">auth-gateway</span>, or a command like “redeploy”.</p>
  </div>
  <div class="dd-command__foot">
    <span class="dd-command__brand">cxkw.dev</span>
    <span><kbd class="dd-kbd dd-kbd--sm">↑</kbd><kbd class="dd-kbd dd-kbd--sm">↓</kbd> move</span>
    <span><kbd class="dd-kbd dd-kbd--sm">↵</kbd> run</span>
    <span><kbd class="dd-kbd dd-kbd--sm">esc</kbd> close</span>
  </div>
</div>
```

## As a dialog

Make it a `<dialog class="dd-command">` and open it from any `[data-dd-command]` button, or press ⌘K (Ctrl K on Windows and Linux) anywhere on this page. It opens near the top of the screen over a dimmed page.

Try it: click the button or press ⌘K / Ctrl K, type to filter, Enter runs the selected row. Esc clears the search, a second Esc closes.

```html
<button class="dd-btn dd-btn--secondary" data-dd-command="cp-live"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-search"/></svg><span>Search or run a command</span><kbd class="dd-kbd-combo"><kbd class="dd-kbd dd-kbd--sm">⌘</kbd><kbd class="dd-kbd dd-kbd--sm">K</kbd></kbd></button>
<dialog class="dd-command" id="cp-live" aria-label="Command palette" data-dd-hotkey>
  <div class="dd-command__search">
    <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-search"/></svg>
    <input class="dd-command__input" type="text" role="combobox" aria-expanded="true" aria-autocomplete="list" aria-controls="cp-live-list" aria-activedescendant="cp-live-0" aria-label="Search" placeholder="Search projects, services and commands…" autocomplete="off" spellcheck="false">
    <kbd class="dd-kbd dd-kbd--sm">esc</kbd>
  </div>
  <div class="dd-command__list" role="listbox" id="cp-live-list" aria-label="Results">
    <div class="dd-command__group" role="group" aria-labelledby="cp-live-g0">
      <p class="dd-command__label" id="cp-live-g0">Projects</p>
      <div class="dd-command__item" role="option" id="cp-live-0" aria-selected="true"><svg class="dd-icon dd-command__icon" aria-hidden="true"><use href="#dd-i-folder"/></svg><span class="dd-command__body"><span>dawn-and-dusk</span><span class="dd-command__meta">Design system · cxkw.dev</span></span><span class="dd-command__hint"><kbd class="dd-kbd dd-kbd--sm dd-command__enter">↵</kbd></span></div>
      <div class="dd-command__item" role="option" id="cp-live-1" aria-selected="false"><svg class="dd-icon dd-command__icon" aria-hidden="true"><use href="#dd-i-folder"/></svg><span class="dd-command__body"><span>dockey-ui</span><span class="dd-command__meta">Keyboard-first dock for macOS</span></span><span class="dd-command__hint"><kbd class="dd-kbd dd-kbd--sm dd-command__enter">↵</kbd></span></div>
      <div class="dd-command__item" role="option" id="cp-live-2" aria-selected="false"><svg class="dd-icon dd-command__icon" aria-hidden="true"><use href="#dd-i-folder"/></svg><span class="dd-command__body"><span>ai-focus</span><span class="dd-command__meta">Todos, notes and focus sessions</span></span><span class="dd-command__hint"><kbd class="dd-kbd dd-kbd--sm dd-command__enter">↵</kbd></span></div>
    </div>
    <div class="dd-command__group" role="group" aria-labelledby="cp-live-g1">
      <p class="dd-command__label" id="cp-live-g1">Services</p>
      <div class="dd-command__item" role="option" id="cp-live-3" aria-selected="false" data-keywords="service"><svg class="dd-icon dd-command__icon" aria-hidden="true"><use href="#dd-i-server"/></svg><span class="dd-command__body"><span>auth-gateway</span><span class="dd-command__meta">iad1 · fra1 · healthy</span></span><span class="dd-command__hint"><kbd class="dd-kbd dd-kbd--sm dd-command__enter">↵</kbd></span></div>
      <div class="dd-command__item" role="option" id="cp-live-4" aria-selected="false" data-keywords="service"><svg class="dd-icon dd-command__icon" aria-hidden="true"><use href="#dd-i-server"/></svg><span class="dd-command__body"><span>billing-worker</span><span class="dd-command__meta">iad1 · 3 errors in the last hour</span></span><span class="dd-command__hint"><kbd class="dd-kbd dd-kbd--sm dd-command__enter">↵</kbd></span></div>
      <div class="dd-command__item" role="option" id="cp-live-5" aria-selected="false" data-keywords="service cdn"><svg class="dd-icon dd-command__icon" aria-hidden="true"><use href="#dd-i-cloud"/></svg><span class="dd-command__body"><span>edge-cache</span><span class="dd-command__meta">12 regions · 98.7% hit rate</span></span><span class="dd-command__hint"><kbd class="dd-kbd dd-kbd--sm dd-command__enter">↵</kbd></span></div>
    </div>
    <div class="dd-command__group" role="group" aria-labelledby="cp-live-g2">
      <p class="dd-command__label" id="cp-live-g2">Commands</p>
      <div class="dd-command__item" role="option" id="cp-live-6" aria-selected="false" data-keywords="deploy"><svg class="dd-icon dd-command__icon" aria-hidden="true"><use href="#dd-i-refresh"/></svg><span class="dd-command__body"><span>Redeploy auth-gateway</span></span><span class="dd-command__hint"><kbd class="dd-kbd dd-kbd--sm dd-command__enter">↵</kbd><kbd class="dd-kbd-combo"><kbd class="dd-kbd dd-kbd--sm">⌘</kbd><kbd class="dd-kbd dd-kbd--sm">⇧</kbd><kbd class="dd-kbd dd-kbd--sm">R</kbd></kbd></span></div>
      <div class="dd-command__item" role="option" id="cp-live-7" aria-selected="false"><svg class="dd-icon dd-command__icon" aria-hidden="true"><use href="#dd-i-terminal"/></svg><span class="dd-command__body"><span>Open logs</span></span><span class="dd-command__hint"><kbd class="dd-kbd dd-kbd--sm dd-command__enter">↵</kbd><kbd class="dd-kbd-combo"><kbd class="dd-kbd dd-kbd--sm">G</kbd><span class="dd-kbd-combo__sep">then</span><kbd class="dd-kbd dd-kbd--sm">L</kbd></kbd></span></div>
      <div class="dd-command__item" role="option" id="cp-live-8" aria-selected="false" data-keywords="theme dark"><svg class="dd-icon dd-command__icon" aria-hidden="true"><use href="#dd-i-moon"/></svg><span class="dd-command__body"><span>Switch to dusk</span></span><span class="dd-command__hint"><kbd class="dd-kbd dd-kbd--sm dd-command__enter">↵</kbd><kbd class="dd-kbd-combo"><kbd class="dd-kbd dd-kbd--sm">⌥</kbd><kbd class="dd-kbd dd-kbd--sm">T</kbd></kbd></span></div>
      <div class="dd-command__item" role="option" id="cp-live-9" aria-selected="false" data-keywords="team member"><svg class="dd-icon dd-command__icon" aria-hidden="true"><use href="#dd-i-users"/></svg><span class="dd-command__body"><span>Invite a teammate…</span></span><span class="dd-command__hint"><kbd class="dd-kbd dd-kbd--sm dd-command__enter">↵</kbd></span></div>
    </div>
  </div>
  <div class="dd-command__empty" hidden>
    <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-search"/></svg>
    <b>No results for “<span class="dd-command__query"></span>”</b>
    <p>Try a project, a service such as <span class="dd-mono">auth-gateway</span>, or a command like “redeploy”.</p>
  </div>
  <div class="dd-command__foot">
    <span class="dd-command__brand">cxkw.dev</span>
    <span><kbd class="dd-kbd dd-kbd--sm">↑</kbd><kbd class="dd-kbd dd-kbd--sm">↓</kbd> move</span>
    <span><kbd class="dd-kbd dd-kbd--sm">↵</kbd> run</span>
    <span><kbd class="dd-kbd dd-kbd--sm">esc</kbd> close</span>
  </div>
</dialog>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-command` | The panel. A `<dialog>` for the real thing, a `<div>` to show it inline. |
| `.dd-command__search` | The search row: a search icon, the input and an `esc` hint. |
| `.dd-command__input` | The field. `role="combobox"` with `aria-controls` → the list and `aria-activedescendant` → the selected row. |
| `.dd-command__list` | Scrolling results, `role="listbox"`. |
| `.dd-command__group + __label` | A `role="group"` of results with a small-caps label. |
| `.dd-command__item` | A result, `role="option"`. `aria-selected="true"` marks the selected row. Optional `data-keywords` and `data-value`. |
| `[aria-disabled="true"]` | Disabled row: dimmed to `--dd-quiet`, skipped by ↑ ↓ and never runs. |
| `.dd-command__icon` | Leading icon; turns full-strength on the selected row. |
| `.dd-command__body + __meta` | The name, then muted detail that truncates first (hidden on screens 560px wide or less). |
| `.dd-command__hint` | Trailing shortcut keys (`.dd-kbd`). |
| `.dd-command__enter` | A ↵ key inside the hint, shown only on the selected row (and hiding the shortcut after it). |
| `.dd-command__empty` | Empty state; any `.dd-command__query` inside it echoes the search. |
| `.dd-command__foot + __brand` | Footer with keyboard hints on a deeper tone; the brand sits at the start. Hidden on screens 560px wide or less. |

## Behaviour

`ds/behaviors/command-palette.js` opens the dialog, filters and selects rows, and runs them. Everything but opening also works on inline palettes.

| class / attribute | what it does |
|---|---|
| `data-dd-command="id"` | On a button: opens that `<dialog class="dd-command">` (empty value → the `data-dd-hotkey` palette, else the first on the page), clears the search and focuses it. |
| `data-dd-hotkey` | On the dialog: the one ⌘K / Ctrl K toggles. Without it, ⌘K toggles the first dialog palette on the page. |
| `Typing` | Filters rows by their text and `data-keywords` (every word must match); selects the first match. |
| `↑ ↓ · Ctrl P / Ctrl N` | Move the selected row, wrapping at the ends; the list scrolls to keep it in view. Hovering a row selects it too. |
| `Enter / click` | Runs the row: clicks it (links navigate), fires a bubbling `dd:command` event with `detail.item` and `detail.value` (the row’s `data-value`, else its name), and closes the dialog. |
| `Esc` | Clears the search; a second Esc closes. Clicking the backdrop closes too (a press that starts in the search and ends outside doesn’t), and focus returns to the opener. When a command opens a dialog, closing that dialog returns focus there too. |

## Guidelines

Do:
- Lead with what people jump to most: recent projects, then services, then commands.
- Show the shortcut beside each command so the palette teaches the keyboard.
- Keep result names short and put detail in the muted meta.

Don't:
- Don’t put destructive commands in the palette without a confirmation step.
- Don’t show more than about eight rows per group; let people type.
- Don’t bind ⌘K to anything else on a page that has a palette.

