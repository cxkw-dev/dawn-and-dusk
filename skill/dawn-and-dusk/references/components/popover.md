# popover — `popover`

A small panel that opens on click, next to the thing that opened it: a confirmation, a short explanation, a couple of settings. It closes on Esc, on a click outside, or from its own buttons.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/popover

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### Confirm in place

Header with an eyebrow and a close button, a sentence of body, and actions. Built on the native popover attribute: the browser handles opening, Esc and outside clicks, and the panel floats above everything. Try it: press Promote, Tab into the panel, then press Esc or click outside.

```html
<div style="display: flex; flex-wrap: wrap; align-items: center; gap: var(--dd-space-2) var(--dd-space-4); max-width: 520px; margin-inline: auto; padding: var(--dd-space-3) var(--dd-space-3) var(--dd-space-3) var(--dd-space-4); border-radius: var(--dd-r-box); background: var(--dd-surface)">
  <div style="flex: 1 1 220px; min-width: 0">
    <p class="dd-small" style="margin: 0; font-weight: 600">dockey-ui preview <span class="dd-mono dd-muted" style="font-weight: 400">c41d9e0</span></p>
    <p class="dd-caption" style="margin: 0">Ready 2 minutes ago · pushed by andy</p>
  </div>
  <button class="dd-btn dd-btn--primary dd-btn--sm" type="button" popovertarget="pop-promote"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-upload"/></svg><span>Promote</span></button>
</div>
<div class="dd-popover" id="pop-promote" popover role="dialog" aria-labelledby="pop-promote-title" data-dd-placement="bottom-end">
  <span class="dd-popover__arrow"></span>
  <div class="dd-popover__header">
    <div>
      <p class="dd-popover__eyebrow">dockey-ui · <span class="dd-mono">c41d9e0</span></p>
      <h3 class="dd-popover__title" id="pop-promote-title">Promote to production?</h3>
    </div>
    <button class="dd-popover__close" type="button" popovertarget="pop-promote" popovertargetaction="hide" aria-label="Close"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button>
  </div>
  <div class="dd-popover__body">
    <p>This preview replaces <strong>v0.9.3</strong> in fra1, sfo3 and sgp1. Traffic moves over in about a minute; you can roll back any time.</p>
  </div>
  <div class="dd-popover__actions">
    <button class="dd-btn dd-btn--ghost dd-btn--sm" type="button" popovertarget="pop-promote" popovertargetaction="hide">Cancel</button>
    <button class="dd-btn dd-btn--primary dd-btn--sm" type="button" popovertarget="pop-promote" popovertargetaction="hide" data-dd-toast="Promoting c41d9e0" data-dd-toast-description="dockey-ui moves to production in fra1, sfo3 and sgp1." data-dd-toast-intent="ok"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-upload"/></svg><span>Promote</span></button>
  </div>
</div>
```

## Anatomy

A floating layer on `--dd-float-bg` with `--dd-shadow-float`: a shade lighter than the page in dawn, so it reads as raised paper, and a clear step up in dusk. 8px radius, 20px padding, an arrow aimed at the trigger. `--static` shows one in the flow.

A static rendering, pinned open for reference — open the live ones above and below.

```html
<div class="dd-popover dd-popover--static" data-placement="bottom" role="dialog" aria-labelledby="pop-static-title" style="--dd-arrow-x: 40px">
  <span class="dd-popover__arrow"></span>
  <div class="dd-popover__header">
    <h3 class="dd-popover__title" id="pop-static-title">Rotate API key</h3>
    <button class="dd-popover__close" type="button" aria-label="Close"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button>
  </div>
  <div class="dd-popover__body"><p>The old key for <span class="dd-mono">auth-gateway</span> keeps working for 24 hours, then stops.</p></div>
  <div class="dd-popover__actions">
    <span class="dd-popover__meta">Last rotated 41 days ago</span>
    <button class="dd-btn dd-btn--sm" type="button">Rotate</button>
  </div>
</div>
```

## Explain a term

Body only, no header — for a “what’s this?” next to a label.

Try it: press the ? button.

```html
<p class="dd-text">
  Deploys run in three regions
  <button class="dd-btn dd-btn--ghost dd-btn--icon dd-btn--sm" type="button" popovertarget="pop-regions" aria-label="About regions" style="font-size: var(--dd-fs-sm); margin-block: -0.5em; vertical-align: middle"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-question"/></svg></button>
</p>
<div class="dd-popover" id="pop-regions" popover role="dialog" aria-label="About regions" data-dd-placement="right">
  <span class="dd-popover__arrow"></span>
  <div class="dd-popover__body">
    <p><strong>fra1</strong> Frankfurt · <strong>sfo3</strong> San Francisco · <strong>sgp1</strong> Singapore.</p>
    <p>Each region builds once and serves from edge-cache; a failed region never blocks the others.</p>
  </div>
</div>
```

## Placement

Below the trigger by default. `data-dd-placement` on the popover asks for `top`, `left` or `right`, with `-start` / `-end` to align to an edge. It flips when there isn’t room and follows the trigger as the page scrolls.

Try it: open each one. Opening a second closes the first; scroll the page while one is open and it follows its button.

```html
<div class="dd-row" style="--dd-gap: var(--dd-space-3)">
  <button class="dd-btn" type="button" popovertarget="pop-top"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-up"/></svg><span>Top</span></button>
  <button class="dd-btn" type="button" popovertarget="pop-bottom-start"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-down"/></svg><span>Bottom start</span></button>
  <button class="dd-btn" type="button" popovertarget="pop-left"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-left"/></svg><span>Left</span></button>
</div>
<div class="dd-popover" id="pop-top" popover role="dialog" aria-label="Top" data-dd-placement="top"><span class="dd-popover__arrow"></span><p class="dd-popover__body">Above the button, flipping below if there’s no room.</p></div>
<div class="dd-popover" id="pop-bottom-start" popover role="dialog" aria-label="Bottom start" data-dd-placement="bottom-start"><span class="dd-popover__arrow"></span><p class="dd-popover__body">Below, aligned to the button’s left edge.</p></div>
<div class="dd-popover" id="pop-left" popover role="dialog" aria-label="Left" data-dd-placement="left"><span class="dd-popover__arrow"></span><p class="dd-popover__body">To the left; on small screens it falls back to below.</p></div>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-popover[popover]` | The panel. Give it an `id`, `role="dialog"` and a label. |
| `.dd-popover__arrow` | Optional arrow; the JS aims it at the trigger. |
| `.dd-popover__header` | Header row: optional `__eyebrow` (mono), `__title`, and a `__close` button. |
| `.dd-popover__body` | Muted text; `strong` and `code` step up to the text colour. |
| `.dd-popover__actions` | Buttons, right-aligned. A `.dd-popover__meta` span sits on the left. |
| `.dd-popover--wide` | 400px instead of up to 340px. |
| `.dd-popover--static` | In-flow rendering for docs and mockups (set `data-placement`). |
| `--dd-popover-bg` | Panel fill. Defaults to `--dd-float-bg`. |

## Behaviour

| class / attribute | what it does |
|---|---|
| `popovertarget="id"` | On the trigger button: opens and closes the popover (native). `popovertargetaction="hide"` on buttons inside closes it. |
| `data-dd-placement` | On the popover: `bottom` (default) · `top` · `left` · `right`, optionally `-start` / `-end`. Flips when it doesn’t fit. |
| `aria-expanded` | Kept in sync on the trigger by the JS. |
| `Esc · outside click` | Close the popover (native light dismiss). Focus returns to the trigger when it was inside. |
| `Tab` | From the trigger, Tab moves into the open popover. |
| `dd.popover.open(el, anchor)` | Open from code, anchored to any element. Also `close(el)` and `toggle(el, anchor)`. |

```js
const panel = document.getElementById('pop-promote');
dd.popover.open(panel, someButton);   // place beside someButton
dd.popover.close(panel);
panel.addEventListener('toggle', (e) => console.log(e.newState)); // 'open' | 'closed'
```

## Guidelines

Do:
- Use a popover for a quick decision that belongs to one control.
- Keep it short: a title, a sentence, two buttons.
- Make the safe choice the ghost button and put it first.

Don't:
- Don’t put a form longer than two fields in a popover — use a dialog or drawer.
- Don’t open popovers on hover; that’s a tooltip.
- Don’t nest popovers.

