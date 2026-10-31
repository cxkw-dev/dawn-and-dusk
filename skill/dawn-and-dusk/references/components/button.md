# button — `button`

Starts an action. Primary is filled with the Golden hour apricot; everything else steps down in emphasis. Icons lead the label.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/button

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### Variants

One primary per view. Secondary for the common alternatives, ghost for tertiary actions in toolbars, ink when the action needs weight but not colour.

```html
<div class="dd-row">
  <button class="dd-btn dd-btn--primary"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-plus"/></svg><span>New project</span></button>
  <button class="dd-btn dd-btn--secondary"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-external"/></svg><span>Open</span></button>
  <button class="dd-btn dd-btn--ink"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-download"/></svg><span>Export</span></button>
  <button class="dd-btn dd-btn--ghost"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-copy"/></svg><span>Copy</span></button>
  <button class="dd-btn dd-btn--danger"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-trash"/></svg><span>Delete</span></button>
  <a class="dd-btn dd-btn--link" href="#guidelines"><span>Read the docs</span><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-right"/></svg></a>
</div>
```

## Sizes

Medium is the default. Small for dense toolbars and table rows; large for hero calls to action.

```html
<div class="dd-row">
  <button class="dd-btn dd-btn--primary dd-btn--sm"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-plus"/></svg><span>Small</span></button>
  <button class="dd-btn dd-btn--primary"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-plus"/></svg><span>Medium</span></button>
  <button class="dd-btn dd-btn--primary dd-btn--lg"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-plus"/></svg><span>Large</span></button>
</div>
```

## Icon only

Square, same height as a text button. Always give it an `aria-label`.

```html
<div class="dd-row">
  <button class="dd-btn dd-btn--primary dd-btn--icon" aria-label="Add"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-plus"/></svg></button>
  <button class="dd-btn dd-btn--secondary dd-btn--icon" aria-label="Save"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-heart"/></svg></button>
  <button class="dd-btn dd-btn--ghost dd-btn--icon" aria-label="Settings"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-settings"/></svg></button>
  <button class="dd-btn dd-btn--ghost dd-btn--icon dd-btn--sm" aria-label="More"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-more"/></svg></button>
</div>
```

## States

Hover steps each fill one tone (ghost buttons take a translucent wash, so they show on the page, on cards and in menus alike); pressing nudges the button down a pixel; keyboard focus draws the ring. Use the native `disabled` attribute (or `aria-disabled="true"` on links) to fade a button and stop clicks. While work is in flight, add `is-loading` and swap the icon for a spinner.

Try it: the faded buttons ignore clicks and Tab skips them; the busy ones ignore clicks and Enter too. Press “Redeploy” in the next example to see the busy state live.

```html
<div class="dd-stack" style="--dd-gap: 15px">
  <div class="dd-row">
    <button class="dd-btn dd-btn--primary" disabled><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-plus"/></svg><span>New project</span></button>
    <button class="dd-btn dd-btn--secondary" disabled><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-external"/></svg><span>Open</span></button>
    <button class="dd-btn dd-btn--ink" disabled><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-download"/></svg><span>Export</span></button>
    <button class="dd-btn dd-btn--ghost" disabled><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-copy"/></svg><span>Copy</span></button>
    <button class="dd-btn dd-btn--danger" disabled><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-trash"/></svg><span>Delete</span></button>
    <a class="dd-btn dd-btn--link" aria-disabled="true"><span>Read the docs</span><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-right"/></svg></a>
  </div>
  <div class="dd-row">
    <button class="dd-btn dd-btn--primary is-loading" aria-busy="true"><span class="dd-btn__spinner"></span><span>Saving</span></button>
    <button class="dd-btn dd-btn--secondary is-loading" aria-busy="true"><span class="dd-btn__spinner"></span><span>Syncing</span></button>
    <button class="dd-btn dd-btn--ghost is-loading" aria-busy="true"><span class="dd-btn__spinner"></span><span>Retrying</span></button>
  </div>
</div>
```

## On a surface

Every variant works on a `.dd-surface` card as well as on the page. Hover the ghost buttons in dusk: the wash still reads.

Try it: “Redeploy” goes busy while it works, then confirms with a toast; clicking it again meanwhile does nothing. The copy button confirms too.

```html
<div class="dd-surface" style="display: flex; flex-wrap: wrap; align-items: center; gap: 10px; padding: 15px 15px 15px 20px">
  <span class="dd-stack" style="--dd-gap: 2px; flex: 1 1 200px; min-width: 0">
    <b style="font-weight: 600">billing-worker</b>
    <span class="dd-small dd-muted"><span class="dd-mono">7be04d2</span> · failed 1h ago · iad1</span>
  </span>
  <button class="dd-btn dd-btn--ghost dd-btn--icon dd-btn--sm" aria-label="Copy deployment ID" data-dd-toast="Deployment ID copied" data-dd-toast-description="7be04d2" data-dd-toast-intent="ok"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-copy"/></svg></button>
  <button class="dd-btn dd-btn--ghost dd-btn--sm"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-terminal"/></svg><span>Logs</span></button>
  <button class="dd-btn dd-btn--secondary dd-btn--sm"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-left"/></svg><span>Roll back</span></button>
  <button class="dd-btn dd-btn--primary dd-btn--sm" id="bt-redeploy"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-refresh"/></svg><span>Redeploy</span></button>
</div>
```

## Full width

`.dd-btn--block` stretches a button across its container, for stacked actions in narrow forms and on phones.

```html
<div class="dd-stack" style="max-width: 320px">
  <button class="dd-btn dd-btn--primary dd-btn--block dd-btn--lg">Continue</button>
  <button class="dd-btn dd-btn--ghost dd-btn--block">Back</button>
</div>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-btn` | Base button. Works on `<button>` and `<a>`. |
| `.dd-btn--primary` | Filled with `--dd-primary` (apricot). One per view. |
| `.dd-btn--secondary` | Tonal fill. The default look if no variant is given. |
| `.dd-btn--ink` | Filled with the text colour — heavy but colourless. |
| `.dd-btn--ghost` | No fill until hover, then a translucent wash (`--dd-wash-strong`). Toolbars, table rows, dismiss actions. |
| `.dd-btn--danger` | Destructive actions. Pair with a confirmation dialog. |
| `.dd-btn--link` | Reads as a link; wrap the label in a `<span>` for the dotted underline. |
| `.dd-btn--sm / --lg` | Sizes. Medium has no modifier. |
| `.dd-btn--icon` | Square icon-only button. |
| `.dd-btn--block` | Fills its container. |
| `.is-loading + .dd-btn__spinner` | Busy state: ignores clicks and the keyboard; also set `aria-busy="true"`. |
| `:disabled / [aria-disabled="true"]` | Faded to 45% and not clickable. Native `disabled` also leaves the tab order; `aria-disabled` keeps it focusable, so keyboard users still find it. |

## Behaviour

`ds/behaviors/button.js` makes a busy (`.is-loading`) or `aria-disabled="true"` button ignore activation from the keyboard too: Enter, Space, a form’s implicit submit and an `aria-disabled` link’s navigation are all stopped before your own click handlers run. Without it, CSS still blocks pointer clicks.

## Guidelines

Do:
- Lead with a verb: “New project”, “Export”, “Delete”.
- Keep one primary button per view or dialog.
- Put the icon first; it is part of the label’s rhythm.

Don't:
- Don’t use primary for navigation — use a link.
- Don’t stack two filled buttons side by side; make one secondary.
- Don’t disable without saying why nearby.

