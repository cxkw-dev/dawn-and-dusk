# button group — `button-group`

Attached buttons that act as one control, and the split button: a main action with a chevron that opens the alternatives. Built from the same .dd-btn styles.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/button-group

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### Attached

Related actions that share a seam. The 1px gap lets the surface behind draw the line, so there are no borders.

```html
<div class="dd-stack" style="--dd-gap: 15px">
  <div class="dd-btn-group" role="group" aria-label="Deployment actions">
    <button class="dd-btn dd-btn--secondary"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-up"/></svg><span>Promote</span></button>
    <button class="dd-btn dd-btn--secondary"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-left"/></svg><span>Roll back</span></button>
  </div>
  <div class="dd-row" style="--dd-gap: 15px">
    <div class="dd-btn-group" role="group" aria-label="Log pages">
      <button class="dd-btn dd-btn--secondary"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-left"/></svg><span>Newer</span></button>
      <button class="dd-btn dd-btn--secondary"><span>Older</span><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-right"/></svg></button>
    </div>
    <div class="dd-btn-group" role="group" aria-label="Log file">
      <button class="dd-btn dd-btn--secondary dd-btn--icon" aria-label="Copy"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-copy"/></svg></button>
      <button class="dd-btn dd-btn--secondary dd-btn--icon" aria-label="Download"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-download"/></svg></button>
      <button class="dd-btn dd-btn--secondary dd-btn--icon" aria-label="Refresh"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-refresh"/></svg></button>
    </div>
  </div>
</div>
```

## Toggle buttons

For independent on/off options, such as which log levels to show, give each button `aria-pressed`. Pressed buttons take the deeper tone and full-strength text. For a single choice, use a segmented control instead.

Try it: click the levels and columns on and off; each button flips on its own. Enter and Space work too.

```html
<div class="dd-stack" style="--dd-gap: 15px">
  <div class="dd-btn-group" role="group" aria-label="Log levels" data-dd-btn-toggle>
    <button class="dd-btn dd-btn--secondary dd-btn--sm" aria-pressed="true"><span>Error</span><span class="dd-mono dd-num">3</span></button>
    <button class="dd-btn dd-btn--secondary dd-btn--sm" aria-pressed="true"><span>Warn</span><span class="dd-mono dd-num">12</span></button>
    <button class="dd-btn dd-btn--secondary dd-btn--sm" aria-pressed="false"><span>Info</span><span class="dd-mono dd-num">1.2k</span></button>
  </div>
  <div class="dd-btn-group" role="group" aria-label="Columns" data-dd-btn-toggle>
    <button class="dd-btn dd-btn--ghost dd-btn--icon" aria-pressed="true" aria-label="Timestamps"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-clock"/></svg></button>
    <button class="dd-btn dd-btn--ghost dd-btn--icon" aria-pressed="false" aria-label="Region"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-globe"/></svg></button>
    <button class="dd-btn dd-btn--ghost dd-btn--icon" aria-pressed="true" aria-label="Request ID"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-tag"/></svg></button>
  </div>
</div>
```

## Split button

A main action plus a narrow chevron (`.dd-btn-group__caret`) that opens a menu of variations. The seam is a soft line in the button’s own ink.

Try it: the main half runs the action; the chevron (or ↓ on it) opens the alternatives, Esc closes them.

```html
<div class="dd-row" style="--dd-gap: 15px">
  <div class="dd-btn-group dd-btn-group--split">
    <button class="dd-btn dd-btn--primary" data-dd-toast="Deploying a3f9c21 to production" data-dd-toast-description="auth-gateway · 3 regions"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-play"/></svg><span>Deploy to production</span></button>
    <button class="dd-btn dd-btn--primary dd-btn--icon dd-btn-group__caret" data-dd-menu="bg-deploy-menu" data-dd-placement="bottom-end" aria-label="More deploy options"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></button>
  </div>
  <div class="dd-btn-group dd-btn-group--split">
    <button class="dd-btn dd-btn--secondary"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-download"/></svg><span>Export CSV</span></button>
    <button class="dd-btn dd-btn--secondary dd-btn--icon dd-btn-group__caret" data-dd-menu="bg-export-menu" data-dd-placement="bottom-end" aria-label="Other formats"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></button>
  </div>
  <div class="dd-btn-group dd-btn-group--split">
    <button class="dd-btn dd-btn--ink dd-btn--sm"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-refresh"/></svg><span>Redeploy</span></button>
    <button class="dd-btn dd-btn--ink dd-btn--sm dd-btn--icon dd-btn-group__caret" data-dd-menu="bg-redeploy-menu" data-dd-placement="bottom-end" aria-label="Redeploy options"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></button>
  </div>
</div>
<div class="dd-menu" id="bg-deploy-menu" role="menu" aria-label="Deploy options" hidden>
  <button class="dd-menu__item" role="menuitem" data-dd-toast="Deploying a3f9c21 to preview" data-dd-toast-description="preview-a3f9c21.cxkw.dev"><span class="dd-menu__body">Deploy to preview<span class="dd-menu__desc">preview-a3f9c21.cxkw.dev</span></span><kbd class="dd-menu__kbd">⌘⇧↵</kbd></button>
  <button class="dd-menu__item" role="menuitem"><span class="dd-menu__body">Deploy without cache<span class="dd-menu__desc">Rebuilds every dependency</span></span></button>
  <button class="dd-menu__item" role="menuitem"><span class="dd-menu__body">Schedule…<span class="dd-menu__desc">Pick a quiet hour</span></span></button>
</div>
<div class="dd-menu" id="bg-export-menu" role="menu" aria-label="Export formats" hidden>
  <button class="dd-menu__item" role="menuitem"><span class="dd-menu__body">Export JSON</span></button>
  <button class="dd-menu__item" role="menuitem"><span class="dd-menu__body">Export Parquet</span></button>
  <hr class="dd-menu__sep">
  <button class="dd-menu__item" role="menuitem"><span class="dd-menu__body">Copy as Markdown table</span><kbd class="dd-menu__kbd">⌘⇧C</kbd></button>
</div>
<div class="dd-menu" id="bg-redeploy-menu" role="menu" aria-label="Redeploy options" hidden>
  <button class="dd-menu__item" role="menuitem"><span class="dd-menu__body">Redeploy iad1 only</span></button>
  <button class="dd-menu__item" role="menuitem"><span class="dd-menu__body">Redeploy all regions</span></button>
</div>
```

While the menu is open, the chevron flips and keeps its hover tone; the menu floats below, aligned to the end.

```html
<div class="dd-stack" style="--dd-gap: 5px; display: inline-flex; align-items: flex-end">
  <div class="dd-btn-group dd-btn-group--split">
    <button class="dd-btn dd-btn--primary"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-play"/></svg><span>Deploy to production</span></button>
    <button class="dd-btn dd-btn--primary dd-btn--icon dd-btn-group__caret" aria-expanded="true" aria-label="More deploy options"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></button>
  </div>
  <div class="dd-menu" role="menu" aria-label="Deploy options">
    <button class="dd-menu__item" role="menuitem"><span class="dd-menu__body">Deploy to preview<span class="dd-menu__desc">preview-a3f9c21.cxkw.dev</span></span><kbd class="dd-menu__kbd">⌘⇧↵</kbd></button>
    <button class="dd-menu__item" role="menuitem"><span class="dd-menu__body">Deploy without cache<span class="dd-menu__desc">Rebuilds every dependency</span></span></button>
    <button class="dd-menu__item" role="menuitem"><span class="dd-menu__body">Schedule…<span class="dd-menu__desc">Pick a quiet hour</span></span></button>
  </div>
</div>
```

## Sizes

Size the buttons, not the group: `.dd-btn--sm` and `.dd-btn--lg` work as usual.

```html
<div class="dd-stack" style="--dd-gap: 15px; align-items: flex-start">
  <div class="dd-btn-group" role="group" aria-label="Day, small"><button class="dd-btn dd-btn--sm dd-btn--icon" aria-label="Previous day"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-left"/></svg></button><button class="dd-btn dd-btn--sm">Today</button><button class="dd-btn dd-btn--sm dd-btn--icon" aria-label="Next day"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-right"/></svg></button></div>
  <div class="dd-btn-group" role="group" aria-label="Day, medium"><button class="dd-btn dd-btn--icon" aria-label="Previous day"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-left"/></svg></button><button class="dd-btn">Today</button><button class="dd-btn dd-btn--icon" aria-label="Next day"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-right"/></svg></button></div>
  <div class="dd-btn-group" role="group" aria-label="Day, large"><button class="dd-btn dd-btn--lg dd-btn--icon" aria-label="Previous day"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-left"/></svg></button><button class="dd-btn dd-btn--lg">Today</button><button class="dd-btn dd-btn--lg dd-btn--icon" aria-label="Next day"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-right"/></svg></button></div>
</div>
```

## Vertical

`.dd-btn-group--vertical` stacks the buttons and aligns their labels to the start.

```html
<div class="dd-btn-group dd-btn-group--vertical" role="group" aria-label="Zoom" style="width: 180px">
  <button class="dd-btn dd-btn--secondary"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-plus"/></svg><span>Zoom in</span></button>
  <button class="dd-btn dd-btn--secondary"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-minus"/></svg><span>Zoom out</span></button>
  <button class="dd-btn dd-btn--secondary"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-grid"/></svg><span>Fit to screen</span></button>
</div>
```

## Full width

`.dd-btn-group--block` fills its container and shares the width equally between the buttons. Useful on narrow screens and in dialog footers.

```html
<div style="max-width: 360px">
  <div class="dd-btn-group dd-btn-group--block" role="group" aria-label="Dialog actions">
    <button class="dd-btn dd-btn--secondary">Cancel</button>
    <button class="dd-btn dd-btn--secondary">Save draft</button>
    <button class="dd-btn dd-btn--primary">Publish</button>
  </div>
</div>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-btn-group` | Attaches its `.dd-btn` children: inner corners square off, 1px seams. A press washes the button instead of nudging it, so the seams stay straight. Add `role="group"` and an `aria-label`. |
| `[aria-pressed]` | Toggle buttons. `true` takes the pressed tone (plus a wash when hovered); `false` mutes the label and goes only half way on hover. Ghost toggles use the translucent `--dd-wash` / `--dd-wash-strong`, so they read on any background. |
| `[data-dd-btn-toggle]` | On the group: clicking an `aria-pressed` button flips it (`ds/behaviors/button-group.js`). |
| `.dd-btn-group--split` | Main action + chevron. The seam is drawn in the button’s own ink. |
| `.dd-btn-group__caret` | The chevron half. Use with `.dd-btn--icon` and `data-dd-menu`; while `aria-expanded="true"` it flips and keeps its hover tone. |
| `.dd-btn-group--vertical` | Stacks the buttons; labels align to the start. |
| `.dd-btn-group--block` | Fills its container; buttons share the width. |

## Behaviour

Groups are plain CSS. The split button’s chevron uses the menu behaviour: `data-dd-menu="menu-id"` opens the menu, `data-dd-placement="bottom-end"` aligns it to the chevron, and Esc returns focus to the chevron. Add `data-dd-btn-toggle` to a group and each `aria-pressed` button in it flips on click (Enter and Space work too, as they are buttons).

## Guidelines

Do:
- Group two to four closely related actions.
- Make the split button’s main half the action people want most of the time.
- Label icon-only buttons with `aria-label`.

Don't:
- Don’t mix variants inside an attached group (except a primary at the end of a block group).
- Don’t use toggle buttons for a single choice; that is a segmented control.
- Don’t hide destructive actions behind a split chevron.

