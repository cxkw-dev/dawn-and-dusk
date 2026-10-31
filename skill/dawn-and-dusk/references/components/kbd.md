# kbd — `kbd`

Keyboard keys and combos. Tonal keycaps in DM Mono with a soft lower edge, no outline, so they sit quietly on any surface.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/kbd

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### Keys

One key per element. Use the Mac glyphs (⌘ ⇧ ⌥ ⌃ ↵) where your audience is on a Mac, and words (Ctrl, Shift) elsewhere.

```html
<div class="dd-row">
  <kbd class="dd-kbd">⌘</kbd> <kbd class="dd-kbd">⇧</kbd> <kbd class="dd-kbd">⌥</kbd> <kbd class="dd-kbd">⌃</kbd> <kbd class="dd-kbd">↵</kbd> <kbd class="dd-kbd">⇥</kbd> <kbd class="dd-kbd">⌫</kbd> <kbd class="dd-kbd">esc</kbd>
  <kbd class="dd-kbd">↑</kbd> <kbd class="dd-kbd">↓</kbd> <kbd class="dd-kbd">←</kbd> <kbd class="dd-kbd">→</kbd> <kbd class="dd-kbd">K</kbd> <kbd class="dd-kbd">/</kbd> <kbd class="dd-kbd">?</kbd> <kbd class="dd-kbd">Space</kbd>
</div>
```

## Combos and sequences

Wrap keys pressed together in `.dd-kbd-combo`. Glyph combos need no separator; word keys read better with a `+`. Sequences (press G, release, press D) put `then` between keys.

```html
<div class="dd-stack" style="--dd-gap: 15px">
  <div class="dd-row" style="--dd-gap: 25px">
    <kbd class="dd-kbd-combo" title="Command K"><kbd class="dd-kbd">⌘</kbd><kbd class="dd-kbd">K</kbd></kbd>
    <kbd class="dd-kbd-combo" title="Command Shift P"><kbd class="dd-kbd">⌘</kbd><kbd class="dd-kbd">⇧</kbd><kbd class="dd-kbd">P</kbd></kbd>
    <kbd class="dd-kbd-combo" title="Command Return"><kbd class="dd-kbd">⌘</kbd><kbd class="dd-kbd">↵</kbd></kbd>
  </div>
  <div class="dd-row" style="--dd-gap: 25px">
    <kbd class="dd-kbd-combo"><kbd class="dd-kbd">Ctrl</kbd><span class="dd-kbd-combo__sep">+</span><kbd class="dd-kbd">Shift</kbd><span class="dd-kbd-combo__sep">+</span><kbd class="dd-kbd">L</kbd></kbd>
    <kbd class="dd-kbd-combo"><kbd class="dd-kbd">G</kbd><span class="dd-kbd-combo__sep">then</span><kbd class="dd-kbd">D</kbd></kbd>
    <kbd class="dd-kbd-combo"><kbd class="dd-kbd">↑</kbd><kbd class="dd-kbd">↓</kbd><span class="dd-kbd-combo__sep">to move</span></kbd>
  </div>
</div>
```

## Sizes and variants

Small for buttons and dense rows, medium (default) for running text, large for shortcut help and onboarding. `.dd-kbd--quiet` drops the keycap for hints in menus and lists. `.is-active` shows a held key.

```html
<div class="dd-row" style="--dd-gap: 25px">
  <kbd class="dd-kbd-combo"><kbd class="dd-kbd dd-kbd--sm">⌘</kbd><kbd class="dd-kbd dd-kbd--sm">K</kbd></kbd>
  <kbd class="dd-kbd-combo"><kbd class="dd-kbd">⌘</kbd><kbd class="dd-kbd">K</kbd></kbd>
  <kbd class="dd-kbd-combo"><kbd class="dd-kbd dd-kbd--lg">⌘</kbd><kbd class="dd-kbd dd-kbd--lg">K</kbd></kbd>
  <kbd class="dd-kbd-combo"><kbd class="dd-kbd dd-kbd--quiet">⌘⇧D</kbd></kbd>
  <kbd class="dd-kbd-combo"><kbd class="dd-kbd dd-kbd--lg is-active">⌘</kbd><kbd class="dd-kbd dd-kbd--lg">K</kbd></kbd>
</div>
```

### Held keys, live

Try it: press and hold ⌘, ⇧, ⌥, ⌃, K, /, Return or Esc on your keyboard. Each key lights with is-active while it is down (a few lines of page script; the class does the look).

```html
<div class="dd-stack" style="--dd-gap: 10px">
  <div class="dd-row" id="kbd-live" style="--dd-gap: 6px">
    <kbd class="dd-kbd dd-kbd--lg">⌃</kbd><kbd class="dd-kbd dd-kbd--lg">⌥</kbd><kbd class="dd-kbd dd-kbd--lg">⇧</kbd><kbd class="dd-kbd dd-kbd--lg">⌘</kbd>
    <kbd class="dd-kbd dd-kbd--lg">K</kbd><kbd class="dd-kbd dd-kbd--lg">/</kbd><kbd class="dd-kbd dd-kbd--lg">↵</kbd><kbd class="dd-kbd dd-kbd--lg">esc</kbd>
  </div>
  <p class="dd-small dd-muted" style="margin: 0">Held: <span class="dd-mono" id="kbd-live-out">nothing yet</span></p>
</div>
```

## In text and buttons

Keys set at the text’s baseline. Inside a `.dd-btn` they take the button’s own ink, so they work on primary, ink and tonal fills.

```html
<div class="dd-stack" style="--dd-gap: 20px">
  <p class="dd-text dd-small">Press <kbd class="dd-kbd-combo"><kbd class="dd-kbd">⌘</kbd><kbd class="dd-kbd">K</kbd></kbd> anywhere to jump to a project, or <kbd class="dd-kbd">/</kbd> to search the logs of <span class="dd-mono">billing-worker</span>.</p>
  <div class="dd-row">
    <button class="dd-btn dd-btn--primary"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-play"/></svg><span>Deploy</span><kbd class="dd-kbd-combo"><kbd class="dd-kbd dd-kbd--sm">⌘</kbd><kbd class="dd-kbd dd-kbd--sm">↵</kbd></kbd></button>
    <button class="dd-btn dd-btn--secondary"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-search"/></svg><span>Search</span><kbd class="dd-kbd dd-kbd--sm">⌘K</kbd></button>
    <button class="dd-btn dd-btn--ink"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-terminal"/></svg><span>Console</span><kbd class="dd-kbd dd-kbd--sm">⌃`</kbd></button>
    <button class="dd-btn dd-btn--ghost"><span>Cancel</span><kbd class="dd-kbd dd-kbd--sm">esc</kbd></button>
  </div>
</div>
```

## Shortcut list

A `<dl class="dd-kbd-list">` lines actions up against their keys, with hairline rows.

```html
<div class="dd-surface" style="max-width: 420px; padding: 20px 25px">
  <p class="dd-eyebrow" style="margin-bottom: 5px">Keyboard shortcuts</p>
  <dl class="dd-kbd-list">
    <dt>Open command palette</dt><dd><kbd class="dd-kbd-combo"><kbd class="dd-kbd">⌘</kbd><kbd class="dd-kbd">K</kbd></kbd></dd>
    <dt>Go to deployments</dt><dd><kbd class="dd-kbd-combo"><kbd class="dd-kbd">G</kbd><span class="dd-kbd-combo__sep">then</span><kbd class="dd-kbd">D</kbd></kbd></dd>
    <dt>Search logs</dt><dd><kbd class="dd-kbd">/</kbd></dd>
    <dt>Redeploy auth-gateway</dt><dd><kbd class="dd-kbd-combo"><kbd class="dd-kbd">⌘</kbd><kbd class="dd-kbd">⇧</kbd><kbd class="dd-kbd">R</kbd></kbd></dd>
    <dt>Toggle dawn / dusk</dt><dd><kbd class="dd-kbd-combo"><kbd class="dd-kbd">⌥</kbd><kbd class="dd-kbd">T</kbd></kbd></dd>
    <dt>Show this list</dt><dd><kbd class="dd-kbd">?</kbd></dd>
  </dl>
</div>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-kbd` | One key. Use it on `<kbd>`. |
| `.dd-kbd--sm / --lg` | Sizes. Medium has no modifier. |
| `.dd-kbd--quiet` | No keycap, only the glyphs in `--dd-quiet`. For hints inside menus and lists. |
| `.dd-kbd.is-active` | A held key: filled with the accent and pressed down a pixel. |
| `.dd-kbd-combo` | Groups keys pressed together. Use an outer `<kbd>`, as HTML recommends for combos. |
| `.dd-kbd-combo__sep` | A `+`, `then` or short note between keys. |
| `.dd-kbd-list` | A `<dl>` of shortcuts: `<dt>` action, `<dd>` keys. |
| `--dd-font-kbd` | The key font: DM Mono, with the system UI font filling in the ⌘ ⇧ ⌥ ⌃ ↵ glyphs DM Mono lacks. Menu shortcut hints use it too. |

## Guidelines

Do:
- Show the shortcut where the action lives: in its button, menu item or tooltip.
- Give glyph-only combos a `title` (“Command K”) so they read aloud and on hover.
- Match the platform: ⌘ on macOS, Ctrl on Windows and Linux.

Don't:
- Don’t put a keycap around whole words in prose; use one key per `.dd-kbd`.
- Don’t advertise shortcuts that aren’t wired up yet.
- Don’t use keys as decoration; they always mean “press this”.

