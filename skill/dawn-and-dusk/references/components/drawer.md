# drawer — `drawer`

A full-height panel from the right for looking closer or editing, while the page stays in view behind the scrim. Built on the native dialog element.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/drawer

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

Every example opens the real drawer. The first two also show a still of it under the trigger, framed as if it covered a page.

### Details

Eyebrow and title name the thing; meta, a key/value list and a log fill the body. The footer never scrolls away. Try it: Esc, the scrim or × close it; “Redeploy” and “Promote” close with a value.

```html
<button class="dd-btn dd-btn--secondary" type="button" data-dd-dialog-open="#deploy-drawer"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-eye"/></svg><span>View deploy</span></button>
<dialog class="dd-drawer" id="deploy-drawer" aria-labelledby="deploy-drawer-title">
  <header class="dd-drawer__head">
    <div class="dd-drawer__titles">
      <p class="dd-drawer__eyebrow">Deploy #4821</p>
      <h2 class="dd-drawer__title" id="deploy-drawer-title">auth-gateway</h2>
      <p class="dd-drawer__meta"><span class="is-ok"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-success"/></svg> Ready</span><span><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-globe"/></svg> fra1 · iad1</span><span><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-clock"/></svg> 4 min ago</span></p>
    </div>
    <button class="dd-drawer__close" type="button" data-dd-dialog-close aria-label="Close"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button>
  </header>
  <div class="dd-drawer__body">
    <div class="dd-drawer__section">
      <h3 class="dd-drawer__section-title">Details</h3>
      <dl class="dd-drawer__props">
        <dt>Environment</dt><dd>Production</dd>
        <dt>Branch</dt><dd class="dd-mono">main</dd>
        <dt>Commit</dt><dd><span class="dd-mono">9f3c2ab</span> · Rotate session keys on login</dd>
        <dt>Duration</dt><dd class="dd-mono">1m 42s</dd>
        <dt>Image</dt><dd class="dd-mono">auth-gateway:2026.10.30-1204</dd>
        <dt>Triggered by</dt><dd>cxkw · git push</dd>
      </dl>
    </div>
    <div class="dd-drawer__section">
      <h3 class="dd-drawer__section-title">Build log</h3>
      <pre class="dd-drawer__log">12:04:11  cloning cxkw-dev/auth-gateway@main
12:04:13  installing dependencies · pnpm 9.12
12:04:39  building … done in 41.2s
12:05:20  uploading image to fra1, iad1
12:05:47  health check /healthz → 200 (38ms)
12:05:53  ready · https://auth.cxkw.dev</pre>
    </div>
  </div>
  <footer class="dd-drawer__foot">
    <span class="dd-drawer__hint">esc to close</span>
    <button class="dd-btn dd-btn--secondary" type="button" data-dd-dialog-close="redeploy"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-refresh"/></svg><span>Redeploy</span></button>
    <button class="dd-btn dd-btn--primary" type="button" data-dd-dialog-close="promote"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-up"/></svg><span>Promote</span></button>
  </footer>
</dialog>
```

## Editing

Wrap the parts in `<form method="dialog" class="dd-drawer__form">`. A destructive action sits apart on the left with `dd-drawer__start`. With unsaved input, set `data-dd-dialog-backdrop="static"` so a stray click on the scrim doesn’t discard it.

Try it: a click on the scrim does nothing here (static backdrop) — use Cancel or Esc. Empty the value and press Save to see validation.

```html
<button class="dd-btn dd-btn--secondary" type="button" data-dd-dialog-open="#env-drawer"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-edit"/></svg><span>Edit variable</span></button>
<dialog class="dd-drawer" id="env-drawer" aria-labelledby="env-drawer-title" data-dd-dialog-backdrop="static">
  <form class="dd-drawer__form" method="dialog">
    <header class="dd-drawer__head">
      <div class="dd-drawer__titles">
        <p class="dd-drawer__eyebrow">billing-worker · Environment</p>
        <h2 class="dd-drawer__title" id="env-drawer-title">Edit variable</h2>
        <p class="dd-drawer__meta"><span>Last changed 3 days ago by cxkw</span></p>
      </div>
      <button class="dd-drawer__close" type="button" data-dd-dialog-close aria-label="Close"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button>
    </header>
    <div class="dd-drawer__body dd-form__body">
      <div class="dd-field">
        <label class="dd-field__label" for="env-key">Key</label>
        <div class="dd-input"><input class="dd-input__control dd-mono" id="env-key" name="key" value="STRIPE_WEBHOOK_SECRET" required></div>
      </div>
      <div class="dd-field">
        <label class="dd-field__label" for="env-value">Value</label>
        <div class="dd-input dd-textarea"><textarea class="dd-input__control dd-mono" id="env-value" name="value" rows="4" aria-describedby="env-value-hint" required>whsec_••••••••••••••••3f9a</textarea></div>
        <p class="dd-field__hint" id="env-value-hint">Encrypted at rest. Redeploy billing-worker to pick up the change.</p>
      </div>
      <div class="dd-field">
        <label class="dd-field__label" for="env-envs">Environments</label>
        <div class="dd-input"><input class="dd-input__control" id="env-envs" name="envs" value="Production, Preview"></div>
      </div>
    </div>
    <footer class="dd-drawer__foot">
      <button class="dd-btn dd-btn--ghost dd-drawer__start" type="button" data-dd-dialog-close="delete"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-trash"/></svg><span>Delete</span></button>
      <button class="dd-btn dd-btn--ghost" type="button" data-dd-dialog-close>Cancel</button>
      <button class="dd-btn dd-btn--primary" type="submit" value="save">Save</button>
    </footer>
  </form>
</dialog>
```

## Sizes

Small (360px) for a quick look, medium (480px) by default, large (720px) for wide content. On screens 480px wide or less every drawer fills the screen; once the drawer is 400px or narrower, the hint drops and the actions share the footer.

Try it: on a phone-width window every size fills the screen.

```html
<div class="dd-row">
  <button class="dd-btn dd-btn--secondary" type="button" data-dd-dialog-open="#drawer-sm">Small · 360</button>
  <button class="dd-btn dd-btn--secondary" type="button" data-dd-dialog-open="#drawer-md">Medium · 480</button>
  <button class="dd-btn dd-btn--secondary" type="button" data-dd-dialog-open="#drawer-lg">Large · 720</button>
</div>
<dialog class="dd-drawer dd-drawer--sm" id="drawer-sm" aria-labelledby="drawer-sm-title">
  <header class="dd-drawer__head"><div class="dd-drawer__titles"><p class="dd-drawer__eyebrow">Region</p><h2 class="dd-drawer__title" id="drawer-sm-title">fra1</h2></div><button class="dd-drawer__close" type="button" data-dd-dialog-close aria-label="Close"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button></header>
  <div class="dd-drawer__body"><dl class="dd-drawer__props"><dt>Services</dt><dd>6</dd><dt>p95</dt><dd class="dd-mono">84ms</dd><dt>Cache hit</dt><dd class="dd-mono">97.2%</dd></dl></div>
  <footer class="dd-drawer__foot"><button class="dd-btn dd-btn--secondary" type="button" data-dd-dialog-close>Close</button></footer>
</dialog>
<dialog class="dd-drawer" id="drawer-md" aria-labelledby="drawer-md-title">
  <header class="dd-drawer__head"><div class="dd-drawer__titles"><p class="dd-drawer__eyebrow">Service</p><h2 class="dd-drawer__title" id="drawer-md-title">edge-cache</h2></div><button class="dd-drawer__close" type="button" data-dd-dialog-close aria-label="Close"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button></header>
  <div class="dd-drawer__body"><p>Medium is the default: room for a details list, a short log and a footer with two actions.</p></div>
  <footer class="dd-drawer__foot"><button class="dd-btn dd-btn--secondary" type="button" data-dd-dialog-close>Close</button></footer>
</dialog>
<dialog class="dd-drawer dd-drawer--lg" id="drawer-lg" aria-labelledby="drawer-lg-title">
  <header class="dd-drawer__head"><div class="dd-drawer__titles"><p class="dd-drawer__eyebrow">Compare</p><h2 class="dd-drawer__title" id="drawer-lg-title">Deploy #4821 vs #4817</h2></div><button class="dd-drawer__close" type="button" data-dd-dialog-close aria-label="Close"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button></header>
  <div class="dd-drawer__body"><p>Large is for side-by-side content: diffs, a wide log, or a form with two columns.</p></div>
  <footer class="dd-drawer__foot"><button class="dd-btn dd-btn--secondary" type="button" data-dd-dialog-close>Close</button></footer>
</dialog>
```

## Classes

| class / attribute | what it does |
|---|---|
| `dialog.dd-drawer` | The panel, pinned to the right edge at full height. Open with `showModal()` or `data-dd-dialog-open`. |
| `.dd-drawer__head` | Top: the `__titles` column and a `__close` button. |
| `.dd-drawer__titles` | Stacks the eyebrow, title and meta; takes the free width in the head. |
| `.dd-drawer__eyebrow` | Mono caps context (deploy number, service, section). |
| `.dd-drawer__title` | What the drawer is about, in the heading lockup. Point `aria-labelledby` at it. |
| `.dd-drawer__meta` | A wrapping row of small facts; each child can lead with an icon. `is-ok` / `is-warn` / `is-bad` on a child tints its icon. |
| `.dd-drawer__close` | Icon-only close button (`aria-label="Close"`, `data-dd-dialog-close`). |
| `.dd-drawer__body` | Scrolls. A hairline appears at an edge while content is hidden there. |
| `.dd-drawer__section / __section-title` | Groups inside the body, each with a mono caps title. |
| `.dd-drawer__props` | A `<dl>` of key / value rows on hairlines. |
| `.dd-drawer__log` | A mono excerpt (logs, payloads) that scrolls sideways. |
| `.dd-drawer__form` | A `<form method="dialog">` wrapping head, body and foot; it doesn’t affect layout. Inside, use the regular `.dd-field` and `.dd-input` (`.dd-textarea` for long values); add `dd-form__body` to the body to space them and `dd-mono` on the control for keys and secrets. |
| `.dd-drawer__foot` | Actions, right-aligned. Outside the scroller, so always in view. |
| `.dd-drawer__start / __hint` | Pushed to the left of the footer: a kept-apart action, or a mono hint. |
| `.dd-drawer--sm / --lg` | Sizes: 360px and 720px. Medium (480px) has no modifier. |
| `.is-closing` | Set by the script while the slide-out plays. |

## Behaviour

The drawer shares `ds/behaviors/dialog.js` with Dialog: `data-dd-dialog-open="#id"` opens it, `data-dd-dialog-close` (with an optional value) closes it, a click on the scrim or Esc closes it with the slide-out, and focus returns to the opener. `data-dd-dialog-backdrop="static"` keeps a scrim click from closing it. From script: `dd.dialog.open('#id')` and `dd.dialog.close('#id', value)`.

| class / attribute | what it does |
|---|---|
| `Esc` | Closes the drawer. |
| `Tab / Shift+Tab` | Stays inside the drawer, wrapping at the ends; the page behind is inert. |
| `On open / close` | Focus moves to `[autofocus]` or the first control; on close it returns to the opener. |

## Guidelines

Do:
- Use a drawer when people need the page for context: a row’s details, editing one item.
- Keep the primary action in the footer so it never scrolls away.
- Make the drawer’s URL-worthy content linkable from a full page as well.

Don't:
- Don’t stack drawers on drawers; replace the content instead.
- Don’t use a drawer for a yes/no question — that’s a dialog.
- Don’t hide primary navigation in a right-hand drawer.

