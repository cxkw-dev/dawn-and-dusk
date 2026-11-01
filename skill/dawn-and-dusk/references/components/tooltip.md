# tooltip — `tooltip`

A few words about a control, on hover or keyboard focus. Add one attribute; the tooltip finds its own place and points back at what it describes.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/tooltip

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### On hover and focus

Hover any button, or Tab to it. Icon-only buttons need a tooltip and an aria-label with the same words. A short delay stops tooltips flashing as the pointer passes; once one is open, the next appears instantly.

```html
<div class="dd-row">
  <button class="dd-btn dd-btn--ghost dd-btn--icon" type="button" aria-label="Copy link" data-dd-tooltip="Copy link"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-link"/></svg></button>
  <button class="dd-btn dd-btn--ghost dd-btn--icon" type="button" aria-label="Download logs" data-dd-tooltip="Download logs"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-download"/></svg></button>
  <button class="dd-btn dd-btn--ghost dd-btn--icon" type="button" aria-label="Redeploy" data-dd-tooltip="Redeploy the last build to every region"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-refresh"/></svg></button>
  <button class="dd-btn dd-btn--ghost dd-btn--icon" type="button" aria-label="Settings" data-dd-tooltip="Settings"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-settings"/></svg></button>
  <span class="dd-muted dd-small" data-dd-tooltip="12 Oct 2026, 09:41:07 UTC" tabindex="0">3 minutes ago</span>
</div>
```

## Placement

Top by default. `data-dd-tooltip-placement` asks for another side or an edge alignment; if it doesn’t fit, the tooltip flips to the opposite side and slides to stay on screen, and the arrow keeps pointing at the trigger.

Try it: hover each button, or Tab along the row. Scroll so a button sits at the very edge of the window and its tooltip flips to the side that has room.

```html
<div class="dd-row" style="--dd-gap: var(--dd-space-3)">
  <button class="dd-btn" type="button" data-dd-tooltip="Placed on top" data-dd-tooltip-placement="top"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-up"/></svg><span>Top</span></button>
  <button class="dd-btn" type="button" data-dd-tooltip="Placed below" data-dd-tooltip-placement="bottom"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-down"/></svg><span>Bottom</span></button>
  <button class="dd-btn" type="button" data-dd-tooltip="Placed to the left" data-dd-tooltip-placement="left"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-left"/></svg><span>Left</span></button>
  <button class="dd-btn" type="button" data-dd-tooltip="Placed to the right" data-dd-tooltip-placement="right"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-right"/></svg><span>Right</span></button>
  <button class="dd-btn" type="button" data-dd-tooltip="Aligned to the start edge" data-dd-tooltip-placement="bottom-start"><span>Bottom start</span></button>
</div>
```

## Shortcut hint

`data-dd-tooltip-kbd` adds the keyboard shortcut after the label — one `<kbd>` per space-separated key.

Try it: hover or Tab to a button to see its shortcut.

```html
<div class="dd-row">
  <button class="dd-btn" type="button" data-dd-tooltip="Search" data-dd-tooltip-kbd="⌘ K"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-search"/></svg><span>Search</span></button>
  <button class="dd-btn dd-btn--primary" type="button" data-dd-tooltip="New deploy" data-dd-tooltip-kbd="N"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-plus"/></svg><span>New deploy</span></button>
  <button class="dd-btn dd-btn--ghost dd-btn--icon" type="button" aria-label="Toggle sidebar" data-dd-tooltip="Toggle sidebar" data-dd-tooltip-kbd="⌘ \"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-sidebar"/></svg></button>
  <button class="dd-btn dd-btn--ghost dd-btn--icon" type="button" aria-label="Archive" data-dd-tooltip="Archive" data-dd-tooltip-kbd="E" data-dd-tooltip-placement="bottom"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-archive"/></svg></button>
</div>
```

## Anatomy

An ink chip in dawn, a raised `--dd-surface-3` chip in dusk; 11px medium type, an 8px arrow. `--static` renders one in the flow for mockups and docs.

Static renderings, pinned open for reference — the live ones are in the examples above.

```html
<div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: var(--dd-space-8)">
  <div class="dd-tooltip dd-tooltip--static" data-placement="top" role="tooltip"><span>Copy link</span></div>
  <div class="dd-tooltip dd-tooltip--static" data-placement="bottom" role="tooltip"><span>Download logs</span></div>
  <div class="dd-tooltip dd-tooltip--static" data-placement="left" role="tooltip"><span>Previous deploy</span></div>
  <div class="dd-tooltip dd-tooltip--static" data-placement="right" role="tooltip"><span>Next deploy</span></div>
  <div class="dd-tooltip dd-tooltip--static" data-placement="top" role="tooltip"><span>Search</span><span class="dd-tooltip__keys"><kbd>⌘</kbd><kbd>K</kbd></span></div>
</div>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-tooltip` | The tooltip. The JS creates one, `role="tooltip"`, at the end of `<body>`. |
| `.is-open` | Visible: fades in and slides 3px out from its trigger. |
| `[data-placement]` | The side it ended up on: `top`, `bottom`, `left`, `right` (+ `-start` / `-end`). Moves the arrow. |
| `.dd-tooltip__keys > kbd` | Shortcut keys. |
| `.dd-tooltip--static` | In-flow rendering for docs and mockups. |
| `--dd-tooltip-bg / --dd-tooltip-fg` | Colours: ink in dawn, surface-3 in dusk. |

## Behaviour

| class / attribute | what it does |
|---|---|
| `data-dd-tooltip="text"` | Shows the text on mouse hover (450ms delay, instant while moving between tooltips) and on keyboard focus. |
| `data-dd-tooltip-placement` | `top` (default) · `bottom` · `left` · `right`, optionally `-start` / `-end`. |
| `data-dd-tooltip-kbd` | Shortcut hint, keys separated by spaces: `"⌘ K"`. |
| `aria-describedby` | Added to the trigger while the tooltip is open (unless its `aria-label` already says the same thing). |
| `Esc · click · scroll` | Hide the tooltip, as do resizing the window and moving the pointer away. The pointer can move onto the tooltip without it closing. Touch taps don’t open tooltips. Inside a dialog, Esc closes the tooltip first and the dialog on the next press. |
| `Theme` | The tooltip takes the dawn/dusk theme of its trigger. |
| `Top layer` | The tooltip is a manual popover, so it shows above open dialogs, drawers and popovers — buttons inside them can have tooltips too. It fades in from the side it lands on, after any flip. |

## Guidelines

Do:
- Name the action in two or three words: “Copy link”.
- Give every icon-only button a tooltip.
- Use the shortcut hint to teach the keyboard.

Don't:
- Don’t put anything interactive or essential in a tooltip — use a popover.
- Don’t add tooltips to things that already have a visible label.
- Don’t use tooltips on disabled buttons to explain why; say it next to them.

