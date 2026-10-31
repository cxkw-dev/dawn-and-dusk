# sheet — `sheet`

A bottom sheet for small screens: it rises from the bottom edge with a grab handle, keeps actions within thumb reach, and never covers more than 85% of the screen.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/sheet

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

Every example opens the real sheet; under the trigger is a still of it on a phone-sized frame. On wide screens a sheet stays a centred 560px column.

### Confirm

A title, one or two sentences, and full-width actions with the primary on the right. Try it: a click on the scrim or Esc slides it away.

```html
<button class="dd-btn dd-btn--primary" type="button" data-dd-dialog-open="#rollback-sheet"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-refresh"/></svg><span>Roll back</span></button>
<dialog class="dd-sheet" id="rollback-sheet" aria-labelledby="rollback-title">
  <span class="dd-sheet__handle" aria-hidden="true"></span>
  <header class="dd-sheet__head">
    <div class="dd-sheet__titles">
      <h2 class="dd-sheet__title" id="rollback-title">Roll back billing-worker?</h2>
      <p class="dd-sheet__desc">Production returns to deploy #4817 (a41d0e9) in fra1 and iad1. Invoices queued in the last 6 minutes are replayed.</p>
    </div>
  </header>
  <footer class="dd-sheet__foot">
    <button class="dd-btn dd-btn--secondary dd-btn--lg" type="button" data-dd-dialog-close>Cancel</button>
    <button class="dd-btn dd-btn--primary dd-btn--lg" type="button" data-dd-dialog-close="rollback">Roll back</button>
  </footer>
</dialog>
```

## List of actions

The mobile stand-in for a menu: big touch rows with a leading icon, an optional shortcut or count, and the destructive action last, apart.

Try it: Tab to the first row, then ↑ ↓ Home End move between rows and Enter picks one.

```html
<button class="dd-btn dd-btn--secondary dd-btn--icon" type="button" data-dd-dialog-open="#project-sheet" aria-label="Project actions"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-more"/></svg></button>
<dialog class="dd-sheet" id="project-sheet" aria-labelledby="project-sheet-title">
  <span class="dd-sheet__handle" aria-hidden="true"></span>
  <header class="dd-sheet__head">
    <div class="dd-sheet__titles">
      <h2 class="dd-sheet__title" id="project-sheet-title">dawn-and-dusk</h2>
      <p class="dd-sheet__desc">Design system · updated 2 hours ago</p>
    </div>
    <button class="dd-sheet__close" type="button" data-dd-dialog-close aria-label="Close"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button>
  </header>
  <div class="dd-sheet__body">
    <div class="dd-sheet__list" role="menu" aria-labelledby="project-sheet-title">
      <button class="dd-sheet__item" type="button" role="menuitem" data-dd-dialog-close="share"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-link"/></svg><span class="dd-sheet__item-label">Copy share link</span></button>
      <button class="dd-sheet__item" type="button" role="menuitem" data-dd-dialog-close="duplicate"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-copy"/></svg><span class="dd-sheet__item-label">Duplicate</span></button>
      <button class="dd-sheet__item" type="button" role="menuitem" data-dd-dialog-close="pin"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-pin"/></svg><span class="dd-sheet__item-label">Pin to sidebar</span><span class="dd-sheet__item-meta">P</span></button>
      <button class="dd-sheet__item" type="button" role="menuitem" data-dd-dialog-close="archive"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-archive"/></svg><span class="dd-sheet__item-label">Archive</span></button>
      <hr class="dd-sheet__sep" />
      <button class="dd-sheet__item dd-sheet__item--danger" type="button" role="menuitem" data-dd-dialog-close="delete"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-trash"/></svg><span class="dd-sheet__item-label">Delete project</span></button>
    </div>
  </div>
</dialog>
```

## Choices · long content

For picking one of many. Mark the current row with `aria-checked="true"`; past 85% of the screen the body scrolls and the footer stays.

Try it: pick a region — the check moves and the button shows your choice.

```html
<button class="dd-btn dd-btn--secondary" type="button" data-dd-dialog-open="#region-sheet" id="region-trigger"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-globe"/></svg><span>fra1 · Frankfurt</span><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></button>
<dialog class="dd-sheet" id="region-sheet" aria-labelledby="region-title">
  <span class="dd-sheet__handle" aria-hidden="true"></span>
  <header class="dd-sheet__head">
    <div class="dd-sheet__titles">
      <h2 class="dd-sheet__title" id="region-title">Primary region</h2>
      <p class="dd-sheet__desc">Where auth-gateway runs its writes. Reads follow the edge.</p>
    </div>
    <button class="dd-sheet__close" type="button" data-dd-dialog-close aria-label="Close"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button>
  </header>
  <div class="dd-sheet__body">
    <div class="dd-sheet__list" role="menu" aria-labelledby="region-title">
      <button class="dd-sheet__item" type="button" role="menuitemradio" aria-checked="true" data-dd-dialog-close="fra1"><span class="dd-sheet__item-label">Frankfurt</span><span class="dd-sheet__item-meta">fra1</span><svg class="dd-icon dd-sheet__check" aria-hidden="true"><use href="#dd-i-check"/></svg></button>
      <button class="dd-sheet__item" type="button" role="menuitemradio" aria-checked="false" data-dd-dialog-close="iad1"><span class="dd-sheet__item-label">Washington, D.C.</span><span class="dd-sheet__item-meta">iad1</span><svg class="dd-icon dd-sheet__check" aria-hidden="true"><use href="#dd-i-check"/></svg></button>
      <button class="dd-sheet__item" type="button" role="menuitemradio" aria-checked="false" data-dd-dialog-close="sfo1"><span class="dd-sheet__item-label">San Francisco</span><span class="dd-sheet__item-meta">sfo1</span><svg class="dd-icon dd-sheet__check" aria-hidden="true"><use href="#dd-i-check"/></svg></button>
      <button class="dd-sheet__item" type="button" role="menuitemradio" aria-checked="false" data-dd-dialog-close="lhr1"><span class="dd-sheet__item-label">London</span><span class="dd-sheet__item-meta">lhr1</span><svg class="dd-icon dd-sheet__check" aria-hidden="true"><use href="#dd-i-check"/></svg></button>
      <button class="dd-sheet__item" type="button" role="menuitemradio" aria-checked="false" data-dd-dialog-close="cdg1"><span class="dd-sheet__item-label">Paris</span><span class="dd-sheet__item-meta">cdg1</span><svg class="dd-icon dd-sheet__check" aria-hidden="true"><use href="#dd-i-check"/></svg></button>
      <button class="dd-sheet__item" type="button" role="menuitemradio" aria-checked="false" data-dd-dialog-close="hnd1"><span class="dd-sheet__item-label">Tokyo</span><span class="dd-sheet__item-meta">hnd1</span><svg class="dd-icon dd-sheet__check" aria-hidden="true"><use href="#dd-i-check"/></svg></button>
      <button class="dd-sheet__item" type="button" role="menuitemradio" aria-checked="false" data-dd-dialog-close="sin1"><span class="dd-sheet__item-label">Singapore</span><span class="dd-sheet__item-meta">sin1</span><svg class="dd-icon dd-sheet__check" aria-hidden="true"><use href="#dd-i-check"/></svg></button>
      <button class="dd-sheet__item" type="button" role="menuitemradio" aria-checked="false" data-dd-dialog-close="syd1"><span class="dd-sheet__item-label">Sydney</span><span class="dd-sheet__item-meta">syd1</span><svg class="dd-icon dd-sheet__check" aria-hidden="true"><use href="#dd-i-check"/></svg></button>
      <button class="dd-sheet__item" type="button" role="menuitemradio" aria-checked="false" data-dd-dialog-close="gru1"><span class="dd-sheet__item-label">São Paulo</span><span class="dd-sheet__item-meta">gru1</span><svg class="dd-icon dd-sheet__check" aria-hidden="true"><use href="#dd-i-check"/></svg></button>
      <button class="dd-sheet__item" type="button" role="menuitemradio" aria-checked="false" data-dd-dialog-close="bom1"><span class="dd-sheet__item-label">Mumbai</span><span class="dd-sheet__item-meta">bom1</span><svg class="dd-icon dd-sheet__check" aria-hidden="true"><use href="#dd-i-check"/></svg></button>
    </div>
  </div>
  <footer class="dd-sheet__foot">
    <button class="dd-btn dd-btn--secondary dd-btn--lg" type="button" data-dd-dialog-close>Done</button>
  </footer>
</dialog>
```

## Classes

| class / attribute | what it does |
|---|---|
| `dialog.dd-sheet` | The sheet, pinned to the bottom edge. Open with `showModal()` or `data-dd-dialog-open`. |
| `.dd-sheet__handle` | The grab handle. Decorative: `aria-hidden="true"`. |
| `.dd-sheet__head / __titles` | Title row with an optional `__close` button. |
| `.dd-sheet__title` | The title, in the heading lockup. Point `aria-labelledby` at it. |
| `.dd-sheet__desc` | A muted line or two under the title. |
| `.dd-sheet__close` | Icon-only close button (`aria-label="Close"`, `data-dd-dialog-close`). |
| `.dd-sheet__body` | Scrolls once the sheet reaches 85% of the screen height. |
| `.dd-sheet__list` | A column of touch rows; bleeds slightly into the padding so hovers line up with the edges. Give it `role="menu"` for arrow-key movement. |
| `.dd-sheet__item` | 50px touch row: icon, `__item-label`, optional `__item-meta` (mono shortcut, code, count). |
| `.dd-sheet__item--danger` | Destructive row, in `--dd-bad`. Put it last, after a `__sep`. |
| `[aria-checked="true"] / .is-selected` | The current choice: a stronger wash than hover and a visible `.dd-sheet__check` icon. |
| `.dd-sheet__sep` | A hairline between groups of rows (`<hr>`). |
| `.dd-sheet__foot` | Full-width actions sharing the row. |
| `.dd-sheet__foot--stack` | Stacks the actions in reverse order, so the primary (last in the markup) sits on top. |
| `.is-closing` | Set by the script while the slide-down plays. |

## Behaviour

The sheet shares `ds/behaviors/dialog.js` with Dialog: `data-dd-dialog-open="#id"` opens it, `data-dd-dialog-close="value"` on a row or button closes it and sets `returnValue`, a tap on the scrim or Esc slides it away, and focus returns to the opener. Choosing a `role="menuitemradio"` row checks it and unchecks the others; a `menuitemcheckbox` row flips.

| class / attribute | what it does |
|---|---|
| `Esc` | Closes the sheet. |
| `Tab / Shift+Tab` | Stays inside the sheet, wrapping at the ends; the page behind is inert. |
| `↑ ↓ · Home / End` | Move between the rows of a `role="menu"` list. |
| `Enter / Space` | Activates the focused row. |

## Guidelines

Do:
- Use a sheet on phones where a desktop would use a menu, popover or small dialog.
- Keep it short: one task, or up to about seven actions.
- Put the destructive action last and separate it.

Don't:
- Don’t nest sheets or open a dialog from a sheet.
- Don’t rely on the handle to close the sheet; it’s decorative. Keep a close button, Cancel or the scrim.
- Don’t use a sheet on wide screens for long forms; use a drawer.

