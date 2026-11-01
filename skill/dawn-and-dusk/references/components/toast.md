# toast — `toast`

A short confirmation that something happened, out of the way at the bottom-right. It leaves on its own, waits while you hover, and offers one action — usually undo.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/toast

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### Intents

Ok for done, info for news, warn for a heads-up, bad for a failure the person should know about. The intent tints the icon and the timer line; the toast itself stays an ink slab in dawn and a raised dark surface in dusk. These sit in the page so you can compare them (× still works); raise live ones under Try it.

```html
<div class="dd-stack" style="max-width: 400px; margin-inline: auto">
  <div class="dd-toast dd-toast--ok" data-dd-dismissible>
    <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-success"/></svg>
    <div class="dd-toast__body"><p class="dd-toast__title">Deployed to production</p><p class="dd-toast__text">insomnia v2.8 is live in 3 regions.</p></div>
    <button class="dd-toast__dismiss" type="button" aria-label="Dismiss notification" data-dd-dismiss><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button>
  </div>
  <div class="dd-toast dd-toast--info" data-dd-dismissible>
    <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-info"/></svg>
    <div class="dd-toast__body"><p class="dd-toast__title">Invite sent</p><p class="dd-toast__text">mai@cxkw.dev can join ai-focus until Friday.</p></div>
    <button class="dd-toast__dismiss" type="button" aria-label="Dismiss notification" data-dd-dismiss><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button>
  </div>
  <div class="dd-toast dd-toast--warn" data-dd-dismissible>
    <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-alert"/></svg>
    <div class="dd-toast__body"><p class="dd-toast__title">Running low on build minutes</p><p class="dd-toast__text">312 of 3,000 left this month.</p></div>
    <button class="dd-toast__dismiss" type="button" aria-label="Dismiss notification" data-dd-dismiss><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button>
  </div>
  <div class="dd-toast dd-toast--bad" role="alert" data-dd-dismissible>
    <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-danger"/></svg>
    <div class="dd-toast__body"><p class="dd-toast__title">Couldn’t save</p><p class="dd-toast__text">edge-cache answered 503. Your changes are still here.</p></div>
    <button class="dd-toast__dismiss" type="button" aria-label="Dismiss notification" data-dd-dismiss><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button>
  </div>
</div>
```

## Action and undo

One action, a verb the person might want right now — almost always Undo. The hairline along the bottom shows the time left before the toast leaves.

Try it: press Undo — the toast goes and a short confirmation takes its place.

```html
<div class="dd-stack" style="max-width: 400px; margin-inline: auto">
  <div class="dd-toast dd-toast--ok" data-dd-dismissible>
    <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-success"/></svg>
    <div class="dd-toast__body"><p class="dd-toast__title">Post archived</p></div>
    <div class="dd-toast__actions"><button class="dd-toast__action" type="button" data-dd-dismiss data-dd-toast="Post restored" data-dd-toast-intent="neutral" data-dd-toast-duration="3000">Undo</button></div>
    <button class="dd-toast__dismiss" type="button" aria-label="Dismiss notification" data-dd-dismiss><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button>
  </div>
  <div class="dd-toast dd-toast--neutral" data-dd-dismissible>
    <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-trash"/></svg>
    <div class="dd-toast__body"><p class="dd-toast__title">3 previews deleted</p><p class="dd-toast__text">dockey-ui · pr-41, pr-44, pr-45</p></div>
    <div class="dd-toast__actions"><button class="dd-toast__action" type="button" data-dd-dismiss data-dd-toast="3 previews restored" data-dd-toast-intent="neutral" data-dd-toast-duration="3000">Undo</button></div>
    <button class="dd-toast__dismiss" type="button" aria-label="Dismiss notification" data-dd-dismiss><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button>
    <span class="dd-toast__progress" aria-hidden="true" style="transform: scaleX(.62)"></span>
  </div>
</div>
```

## Try it

Toasts stack at the bottom-right, newest nearest the corner, at most four at a time. Hover or focus the stack to pause every timer; swipe one sideways to dismiss it. On small screens the stack spans the width.

Try it: raise a few (Archive post has an Undo), hover the stack to pause it, swipe one sideways, or Tab to a toast and press Esc. Sync invoices stays until you close it.

```html
<div class="dd-row">
  <button class="dd-btn dd-btn--primary" type="button" data-dd-toast="Deployed to production" data-dd-toast-description="leetnode v1.4 is live in fra1, sfo3 and sgp1." data-dd-toast-intent="ok"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-upload"/></svg><span>Deploy</span></button>
  <button class="dd-btn" type="button" data-dd-toast="Invite sent" data-dd-toast-description="mai@cxkw.dev can join ai-focus until Friday." data-dd-toast-intent="info"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-mail"/></svg><span>Invite</span></button>
  <button class="dd-btn" type="button" data-dd-toast="Running low on build minutes" data-dd-toast-description="312 of 3,000 left this month." data-dd-toast-intent="warn"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-clock"/></svg><span>Check usage</span></button>
  <button class="dd-btn" type="button" data-dd-toast="Link copied" data-dd-toast-intent="neutral" data-dd-toast-duration="3000"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-link"/></svg><span>Copy link</span></button>
  <button class="dd-btn" type="button" data-dd-toast="Couldn’t reach billing-worker" data-dd-toast-description="The request timed out after 30s." data-dd-toast-intent="bad" data-dd-toast-duration="0"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-refresh"/></svg><span>Sync invoices</span></button>
  <button class="dd-btn dd-btn--ghost" type="button" onclick="dd.toast({ title: 'Post archived', intent: 'ok', action: { label: 'Undo', onClick: () => dd.toast({ title: 'Post restored', intent: 'neutral', duration: 3000 }) } })"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-archive"/></svg><span>Archive post</span></button>
</div>
```

## JavaScript

`dd.toast()` creates the stack on first use (a polite live region labelled “Notifications”), so there is nothing to put in your HTML. Text is set as text, never as HTML. The stack lives in the top layer, so a toast shows above a modal dialog’s scrim, whether it was raised before or after the dialog opened — and its action still works.

```js
// Anywhere after dawn-and-dusk.js has loaded:
dd.toast('Saved');                      // title only, info, 5s

const t = dd.toast({
  title: 'Post archived',
  description: 'Moved out of the feed on cxkw.dev.',
  intent: 'ok',                         // info · ok · warn · bad · neutral
  action: { label: 'Undo', onClick: () => restore(post) },
  duration: 8000,                       // ms; 0 stays until dismissed
});

t.dismiss();                            // close it early
dd.toast.clear();                       // close them all
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-toaster` | The fixed stack, bottom-right (`--dd-z-toast`). Created by the JS; add your own to control where it sits. |
| `.dd-toast` | One toast. Ink in dawn, `--dd-float-bg` + `--dd-shadow-float` in dusk. Inside a `.dd-toaster` it slides in and can be swiped away. |
| `.dd-toast--{intent}` | Intent: `info` · `ok` · `warn` · `bad` · `neutral`. Tints the icon and the timer line. |
| `> .dd-icon` | Leading icon. The JS picks `info`, `success`, `alert`, `danger` or `bell`. |
| `.dd-toast__body / __title / __text` | Title (600) and a muted description. |
| `.dd-toast__actions / __action` | The single dotted text action. |
| `.dd-toast__dismiss` | Close button. Needs an `aria-label`. |
| `.dd-toast__progress` | Hairline timer along the bottom; animated by the JS, hidden under reduced motion. |
| `--dd-toast-bg / -fg / -muted` | Theme-level colours: ink with page-coloured text in dawn, `--dd-float-bg` in dusk. |

## Behaviour

| class / attribute | what it does |
|---|---|
| `dd.toast(options | title)` | Shows a toast; returns `{ el, dismiss() }`. Options: `title`, `description`, `intent` (default `info`), `action: { label, onClick }` (runs, then closes the toast), `duration` (ms, default 5000, 0 = sticky), `icon` (any sprite name), `dismissible` (`false` drops the ×). |
| `dd.toast.clear()` | Dismisses every toast. |
| `data-dd-toast="Title"` | Click to show a toast. Add `data-dd-toast-description`, `-intent`, `-action` (a label; the button closes the toast) and `-duration`. |
| `Pause` | Hovering or focusing the stack, or switching tabs, pauses every timer. |
| `Stacking` | New toasts slide in at the bottom; the ones above glide up to make room. Past four, the oldest leaves. |
| `Swipe` | Drag a toast sideways (touch, pen or mouse) past a third of its width, or flick it, to dismiss it. A short drag springs back. |
| `Theme` | A toast takes the dawn/dusk theme of the element that raised it. |
| `Keyboard` | Tab reaches the action and the close button; focusing them pauses the timer. Esc dismisses the focused toast, and focus moves to the next toast, or back to where it was before the stack. |
| `Reduced motion` | No slide, glide or swipe-out: toasts appear and leave in place, and the timer line is hidden. |

## Guidelines

Do:
- Confirm what just happened in a few words: “Post archived”.
- Offer undo instead of asking “are you sure?” for reversible actions.
- Keep errors that need action on screen: `duration: 0`, or use an alert.

Don't:
- Don’t put the only copy of important information in a toast — it disappears.
- Don’t fire a toast for every background event; batch them.
- Don’t add more than one action.

