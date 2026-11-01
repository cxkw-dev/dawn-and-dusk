# dialog — `dialog`

A modal moment: a centred card on a dim scrim that asks for one decision. Built on the native dialog element, so focus, Esc and the top layer come for free.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/dialog

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

Every example opens the real dialog; under each trigger is a still of it, so you can compare without clicking.

### Confirm

The classic: eyebrow, title, one sentence of consequence, actions bottom-right with the primary last. Try it: Esc, a click on the scrim or Cancel close it; Publish closes with a value.

```html
<button class="dd-btn dd-btn--primary" type="button" data-dd-dialog-open="#publish-dialog"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-sparkle"/></svg><span>Publish release</span></button>
<dialog class="dd-dialog" id="publish-dialog" aria-labelledby="publish-title">
  <header class="dd-dialog__head">
    <div class="dd-dialog__titles">
      <p class="dd-dialog__eyebrow">Release v0.4.0</p>
      <h2 class="dd-dialog__title" id="publish-title">Publish dawn &amp; dusk?</h2>
    </div>
    <button class="dd-dialog__close" type="button" data-dd-dialog-close aria-label="Close"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button>
  </header>
  <div class="dd-dialog__body">
    <p>The new tokens go live on cxkw.dev and in every app that pulls the release. You can roll back from the release history at any time.</p>
  </div>
  <footer class="dd-dialog__foot">
    <span class="dd-dialog__hint">esc to cancel</span>
    <button class="dd-btn dd-btn--ghost" type="button" data-dd-dialog-close>Cancel</button>
    <button class="dd-btn dd-btn--primary" type="button" data-dd-dialog-close="publish">Publish</button>
  </footer>
</dialog>
```

## Destructive

Add `dd-dialog--danger` and an icon tile; the confirm button becomes `dd-btn--danger`. Use `role="alertdialog"` and put `autofocus` on the safe choice.

Try it: focus starts on “Keep it”, so Enter is the safe answer.

```html
<button class="dd-btn dd-btn--danger" type="button" data-dd-dialog-open="#delete-dialog"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-trash"/></svg><span>Delete project</span></button>
<dialog class="dd-dialog dd-dialog--sm dd-dialog--danger" id="delete-dialog" role="alertdialog" aria-labelledby="delete-title" aria-describedby="delete-desc">
  <header class="dd-dialog__head">
    <span class="dd-dialog__icon"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-danger"/></svg></span>
    <div class="dd-dialog__titles">
      <p class="dd-dialog__eyebrow">Danger zone</p>
      <h2 class="dd-dialog__title" id="delete-title">Delete leetnode?</h2>
    </div>
  </header>
  <div class="dd-dialog__body" id="delete-desc">
    <p>This permanently removes the project, its <strong>24 deploys</strong> and 3 custom domains. It can’t be undone.</p>
  </div>
  <footer class="dd-dialog__foot">
    <button class="dd-btn dd-btn--ghost" type="button" data-dd-dialog-close autofocus>Keep it</button>
    <button class="dd-btn dd-btn--danger" type="button" data-dd-dialog-close="delete"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-trash"/></svg><span>Delete</span></button>
  </footer>
</dialog>
```

## Form

Wrap the parts in `<form method="dialog" class="dd-dialog__form">` and use the same fields as any form, with tucked labels. Native validation runs first; a valid submit closes the dialog with the button’s `value` as `returnValue`. A button with its own `formmethod` wins: `formmethod="post"` posts instead.

Try it: press “Add domain” with the field empty — validation holds the dialog open. Type a domain and press Enter.

```html
<button class="dd-btn dd-btn--secondary" type="button" data-dd-dialog-open="#domain-dialog"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-globe"/></svg><span>Add domain</span></button>
<dialog class="dd-dialog" id="domain-dialog" aria-labelledby="domain-title">
  <form class="dd-dialog__form" method="dialog">
    <header class="dd-dialog__head">
      <span class="dd-dialog__icon"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-globe"/></svg></span>
      <div class="dd-dialog__titles">
        <p class="dd-dialog__eyebrow">edge-cache</p>
        <h2 class="dd-dialog__title" id="domain-title">Add a custom domain</h2>
      </div>
      <button class="dd-dialog__close" type="button" data-dd-dialog-close aria-label="Close"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button>
    </header>
    <div class="dd-dialog__body dd-form__body">
      <div class="dd-field">
        <label class="dd-field__label" for="domain-name">Domain</label>
        <div class="dd-input"><input class="dd-input__control" id="domain-name" name="domain" placeholder="status.cxkw.dev" aria-describedby="domain-name-hint" required autofocus></div>
        <p class="dd-field__hint" id="domain-name-hint">Point a CNAME at edge-cache.cxkw.dev, then verify.</p>
      </div>
      <div class="dd-field">
        <label class="dd-field__label" for="domain-branch">Branch</label>
        <div class="dd-input"><input class="dd-input__control dd-mono" id="domain-branch" name="branch" value="main"></div>
      </div>
    </div>
    <footer class="dd-dialog__foot">
      <button class="dd-btn dd-btn--ghost" type="button" data-dd-dialog-close>Cancel</button>
      <button class="dd-btn dd-btn--primary" type="submit" value="add"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-plus"/></svg><span>Add domain</span></button>
    </footer>
  </form>
</dialog>
```

## Long content

The dialog stops at 85% of the viewport height (760px at most). Only the body scrolls; a hairline appears at the edge where content is hidden.

Try it: scroll inside — the head and the foot stay put, and the page behind doesn’t move.

```html
<button class="dd-btn dd-btn--secondary" type="button" data-dd-dialog-open="#changelog-dialog"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-info"/></svg><span>What’s new</span></button>
<dialog class="dd-dialog" id="changelog-dialog" aria-labelledby="changelog-title">
  <header class="dd-dialog__head">
    <span class="dd-dialog__icon"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-sparkle"/></svg></span>
    <div class="dd-dialog__titles">
      <p class="dd-dialog__eyebrow">Changelog</p>
      <h2 class="dd-dialog__title" id="changelog-title">What’s new in v0.4</h2>
    </div>
    <button class="dd-dialog__close" type="button" data-dd-dialog-close aria-label="Close"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button>
  </header>
  <div class="dd-dialog__body">
    <p>Dusk is now its own layer: every component was checked in the dark, and status containers use a solid fill instead of a wash.</p>
    <h3>Components</h3>
    <ul>
      <li>Tables split into simple and dense families, both on a hairline rhythm.</li>
      <li>Inputs moved to borderless fills with tucked labels.</li>
      <li>Buttons gained a colour role: primary is the Golden hour apricot.</li>
    </ul>
    <h3>Infrastructure</h3>
    <ul>
      <li>auth-gateway and billing-worker deploy to fra1 and iad1 in parallel.</li>
      <li>edge-cache purges by tag in under two seconds.</li>
      <li>Release bundles ship as one stylesheet and one plain script.</li>
    </ul>
    <h3>Fixes</h3>
    <p>Focus rings no longer clip inside scroll containers, and the theme toggle remembers your choice across tabs.</p>
  </div>
  <footer class="dd-dialog__foot">
    <span class="dd-dialog__hint">body scrolls · head and foot stay</span>
    <button class="dd-btn dd-btn--primary" type="button" data-dd-dialog-close>Got it</button>
  </footer>
</dialog>
```

## Sizes

Small (380px) for one-line confirms, medium (460px) by default, large (680px) when the body needs room. On a phone every size fills the screen width (less a 15px margin), and once the dialog is 360px or narrower the hint drops and the actions split the footer.

Try it: Tab and Shift+Tab — focus cycles inside the dialog and never reaches the page.

```html
<div class="dd-row">
  <button class="dd-btn dd-btn--secondary" type="button" data-dd-dialog-open="#size-sm">Small</button>
  <button class="dd-btn dd-btn--secondary" type="button" data-dd-dialog-open="#size-md">Medium</button>
  <button class="dd-btn dd-btn--secondary" type="button" data-dd-dialog-open="#size-lg">Large</button>
</div>
<dialog class="dd-dialog dd-dialog--sm" id="size-sm" aria-labelledby="size-sm-title">
  <header class="dd-dialog__head"><div class="dd-dialog__titles"><h2 class="dd-dialog__title" id="size-sm-title">Restart billing-worker?</h2></div></header>
  <div class="dd-dialog__body"><p>Queued invoices wait about 20 seconds.</p></div>
  <footer class="dd-dialog__foot">
    <button class="dd-btn dd-btn--ghost" type="button" data-dd-dialog-close>Cancel</button>
    <button class="dd-btn dd-btn--primary" type="button" data-dd-dialog-close="restart">Restart</button>
  </footer>
</dialog>
<dialog class="dd-dialog" id="size-md" aria-labelledby="size-md-title">
  <header class="dd-dialog__head"><div class="dd-dialog__titles"><p class="dd-dialog__eyebrow">Deploy #4821</p><h2 class="dd-dialog__title" id="size-md-title">Promote to production?</h2></div><button class="dd-dialog__close" type="button" data-dd-dialog-close aria-label="Close"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button></header>
  <div class="dd-dialog__body"><p>auth-gateway 9f3c2ab replaces the current production deploy in fra1 and iad1. Traffic shifts over two minutes.</p></div>
  <footer class="dd-dialog__foot">
    <span class="dd-dialog__hint">esc to cancel</span>
    <button class="dd-btn dd-btn--ghost" type="button" data-dd-dialog-close>Cancel</button>
    <button class="dd-btn dd-btn--primary" type="button" data-dd-dialog-close="promote">Promote</button>
  </footer>
</dialog>
<dialog class="dd-dialog dd-dialog--lg" id="size-lg" aria-labelledby="size-lg-title">
  <header class="dd-dialog__head"><div class="dd-dialog__titles"><p class="dd-dialog__eyebrow">Security</p><h2 class="dd-dialog__title" id="size-lg-title">Rotate API keys</h2></div><button class="dd-dialog__close" type="button" data-dd-dialog-close aria-label="Close"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button></header>
  <div class="dd-dialog__body">
    <p>New keys are issued for auth-gateway, billing-worker and edge-cache. The old keys keep working for <strong>24 hours</strong> so running deploys can pick up the change, then they are revoked everywhere.</p>
    <p>Services that read keys at start-up need a restart within that window.</p>
  </div>
  <footer class="dd-dialog__foot">
    <span class="dd-dialog__hint">esc to cancel</span>
    <button class="dd-btn dd-btn--ghost" type="button" data-dd-dialog-close>Cancel</button>
    <button class="dd-btn dd-btn--primary" type="button" data-dd-dialog-close="rotate"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-key"/></svg><span>Rotate keys</span></button>
  </footer>
</dialog>
```

## From a menu

A menu item can open a dialog: put `data-dd-dialog-open` on the `.dd-menu__item`. The menu closes as the dialog opens, so when the dialog closes focus goes to the button that opened the menu, not the hidden item. If that button is gone — the dialog removed its row — focus lands on the nearest control where it was: the next row’s button, else the one before.

Try it: open a member’s ⋯ menu and choose “Remove from team…”. “Keep” returns focus to that ⋯ button; “Remove” deletes the row and focus moves to the next member’s ⋯.

```html
<div class="dd-stack" style="--dd-gap: 5px; max-width: 520px">
  <div class="dd-surface" data-member="Mara Okafor" style="display: flex; align-items: center; gap: 10px; padding: 10px 10px 10px 20px">
    <span class="dd-stack" style="--dd-gap: 2px; flex: 1; min-width: 0">
      <b style="font-weight: 600">Mara Okafor</b>
      <span class="dd-small dd-muted"><span class="dd-mono">mara@cxkw.dev</span> · Admin</span>
    </span>
    <button class="dd-btn dd-btn--ghost dd-btn--icon dd-btn--sm" type="button" data-dd-menu="dlg-member-menu" data-dd-placement="bottom-end" aria-label="Actions for Mara Okafor"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-more"/></svg></button>
  </div>
  <div class="dd-surface" data-member="Jun Park" style="display: flex; align-items: center; gap: 10px; padding: 10px 10px 10px 20px">
    <span class="dd-stack" style="--dd-gap: 2px; flex: 1; min-width: 0">
      <b style="font-weight: 600">Jun Park</b>
      <span class="dd-small dd-muted"><span class="dd-mono">jun@cxkw.dev</span> · Developer</span>
    </span>
    <button class="dd-btn dd-btn--ghost dd-btn--icon dd-btn--sm" type="button" data-dd-menu="dlg-member-menu" data-dd-placement="bottom-end" aria-label="Actions for Jun Park"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-more"/></svg></button>
  </div>
  <div class="dd-surface" data-member="Sam Rivera" style="display: flex; align-items: center; gap: 10px; padding: 10px 10px 10px 20px">
    <span class="dd-stack" style="--dd-gap: 2px; flex: 1; min-width: 0">
      <b style="font-weight: 600">Sam Rivera</b>
      <span class="dd-small dd-muted"><span class="dd-mono">sam@cxkw.dev</span> · Developer</span>
    </span>
    <button class="dd-btn dd-btn--ghost dd-btn--icon dd-btn--sm" type="button" data-dd-menu="dlg-member-menu" data-dd-placement="bottom-end" aria-label="Actions for Sam Rivera"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-more"/></svg></button>
  </div>
  <div class="dd-surface" data-member="Ines Duarte" style="display: flex; align-items: center; gap: 10px; padding: 10px 10px 10px 20px">
    <span class="dd-stack" style="--dd-gap: 2px; flex: 1; min-width: 0">
      <b style="font-weight: 600">Ines Duarte</b>
      <span class="dd-small dd-muted"><span class="dd-mono">ines@cxkw.dev</span> · Viewer</span>
    </span>
    <button class="dd-btn dd-btn--ghost dd-btn--icon dd-btn--sm" type="button" data-dd-menu="dlg-member-menu" data-dd-placement="bottom-end" aria-label="Actions for Ines Duarte"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-more"/></svg></button>
  </div>
</div>
<div class="dd-menu" id="dlg-member-menu" role="menu" aria-label="Member actions" hidden>
  <button class="dd-menu__item" role="menuitem" type="button" data-dd-toast="Invite sent again" data-dd-toast-intent="ok"><span class="dd-menu__body">Resend invite</span></button>
  <hr class="dd-menu__sep">
  <button class="dd-menu__item dd-menu__item--danger" role="menuitem" type="button" data-dd-dialog-open="#remove-member-dialog"><span class="dd-menu__body">Remove from team…</span></button>
</div>
<dialog class="dd-dialog dd-dialog--sm dd-dialog--danger" id="remove-member-dialog" role="alertdialog" aria-labelledby="remove-member-title" aria-describedby="remove-member-desc">
  <header class="dd-dialog__head">
    <span class="dd-dialog__icon"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-users"/></svg></span>
    <div class="dd-dialog__titles"><p class="dd-dialog__eyebrow">Team · cxkw</p><h2 class="dd-dialog__title" id="remove-member-title">Remove <span data-member-name>this member</span>?</h2></div>
  </header>
  <div class="dd-dialog__body" id="remove-member-desc"><p>They lose access to every cxkw project right away. You can invite them again later.</p></div>
  <footer class="dd-dialog__foot">
    <button class="dd-btn dd-btn--ghost" type="button" data-dd-dialog-close autofocus>Keep</button>
    <button class="dd-btn dd-btn--danger" type="button" data-dd-dialog-close="remove">Remove</button>
  </footer>
</dialog>
<script>
  {
    const menu = document.getElementById('dlg-member-menu');
    const dialog = document.getElementById('remove-member-dialog');
    const member = () => menu.ddTrigger.closest('[data-member]');
    // The menu's trigger names the row; the dialog asks about that member.
    menu.addEventListener('dd:menuopen', () => { dialog.querySelector('[data-member-name]').textContent = member().dataset.member; });
    dialog.addEventListener('close', () => {
      if (dialog.returnValue !== 'remove') return; // Keep: focus goes back to the row's ⋯ button
      const row = member();
      row.remove(); // focus moves to the next row's ⋯ button
      dd.toast({ title: `${row.dataset.member} removed`, intent: 'ok' });
    });
  }
</script>
```

## Classes

| class / attribute | what it does |
|---|---|
| `dialog.dd-dialog` | The modal card. Open it with `showModal()` (or `data-dd-dialog-open`). The scrim is its `::backdrop`. |
| `.dd-dialog__head` | Top row: optional `__icon`, the `__titles` column and an optional `__close` button. |
| `.dd-dialog__icon` | Square tonal icon tile. Turns red-tinted inside `--danger`. |
| `.dd-dialog__titles` | Stacks the eyebrow and the title; takes the free width in the head. |
| `.dd-dialog__eyebrow` | Mono caps context line above the title (project, release, section). |
| `.dd-dialog__title` | The question or task, set in the heading lockup. Point `aria-labelledby` at it. |
| `.dd-dialog__close` | Icon-only close button. Give it `aria-label="Close"` and `data-dd-dialog-close`. |
| `.dd-dialog__body` | Content. Scrolls when long; muted text with `strong` in ink. |
| `.dd-dialog__foot` | Actions, right-aligned, primary last. Split evenly when the dialog is 360px or narrower. |
| `.dd-dialog__hint` | Mono note pushed to the left of the footer (“esc to cancel”). Hidden when the dialog is 360px or narrower. |
| `.dd-dialog__form` | A `<form method="dialog">` wrapping head, body and foot; it doesn’t affect layout. Inside, use the regular `.dd-field` and `.dd-input`; add `dd-form__body` to the body to space them. |
| `.dd-dialog--danger` | Destructive: tints the icon tile with `--dd-bad`. |
| `.dd-dialog--sm / --lg` | Sizes: 380px and 680px. Medium (460px) has no modifier. |
| `.is-closing` | Set by the script while the exit animation plays. |

## Behaviour

`ds/behaviors/dialog.js` (loaded by `dawn-and-dusk.js`) wires openers, close buttons, the scrim and the exit motion; the same script drives Drawer and Sheet. A click on the scrim closes the dialog only when the press starts and ends outside it, so drag-selecting text never closes it.

| class / attribute | what it does |
|---|---|
| `data-dd-dialog-open="#id"` | On any element: opens that dialog modally and remembers the element so focus returns to it on close. On an item of a floating menu, it remembers the button that opened the menu instead (the item closes with its menu). |
| `data-dd-dialog-close` | On any element inside the dialog: closes it with the exit animation. |
| `data-dd-dialog-close="value"` | Closes and sets `dialog.returnValue` to `value`; read it in the native `close` event. |
| `form[method="dialog"]` | A valid submit closes with the submit button’s `value`, unless the button’s `formmethod` says otherwise. |
| `data-dd-dialog-backdrop="static"` | On the dialog: clicking the scrim does nothing (for forms with unsaved input). Esc still closes. |
| `dd.dialog.open(sel) / dd.dialog.close(sel, value)` | The same from script. `sel` is a selector or the element. |

| class / attribute | what it does |
|---|---|
| `Esc` | Closes the dialog (animated). |
| `Tab / Shift+Tab` | Moves through the dialog only and wraps from the last control to the first; the page behind is inert while it is open. |
| `On open` | Focus moves to the element with `autofocus`, else the first focusable control. |
| `On close` | Focus returns to the opener (for a menu item, the menu’s trigger). If the opener is gone by then — removed before the dialog closed or by your own `close` listener — focus goes to the nearest control where it was: the first one in the next element, else the previous one, else further up. |

## Guidelines

Do:
- Title the dialog with the question: “Delete leetnode?”, not “Warning”.
- Name the action on the button: “Delete”, “Publish”, never “OK”.
- Say what happens and whether it can be undone in one or two sentences.
- Autofocus the safe choice in destructive dialogs.

Don't:
- Don’t open a dialog from a dialog; use a step inside it or a drawer.
- Don’t use a dialog for content people need to compare with the page — use a drawer.
- Don’t put more than two actions in the footer.

