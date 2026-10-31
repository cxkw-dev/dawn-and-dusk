# alert — `alert`

An inline message about the thing in front of you: what happened, what it means, what to do next. A soft fill of the status colour, text actions on the right.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/alert

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### Intents

Info, ok, warn and bad. The icon and the fill carry the intent; the title says what happened in a few words and the description adds the one detail that matters.

```html
<div class="dd-stack">
  <div class="dd-alert dd-alert--info">
    <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-info"/></svg>
    <div class="dd-alert__body">
      <p class="dd-alert__title">Fonts are cached for 24 hours</p>
      <p class="dd-alert__text">Changes to <code>fonts.css</code> reach visitors after the next cache refresh on edge-cache.</p>
    </div>
  </div>
  <div class="dd-alert dd-alert--ok">
    <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-success"/></svg>
    <div class="dd-alert__body">
      <p class="dd-alert__title">Deployed to production</p>
      <p class="dd-alert__text">dawn-and-dusk v0.3 is live in fra1, sfo3 and sgp1. The build took 41s.</p>
    </div>
  </div>
  <div class="dd-alert dd-alert--warn">
    <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-alert"/></svg>
    <div class="dd-alert__body">
      <p class="dd-alert__title">Slow build</p>
      <p class="dd-alert__text">billing-worker took 2m 14s, about twice the usual. The dependency cache missed.</p>
    </div>
  </div>
  <div class="dd-alert dd-alert--bad">
    <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-danger"/></svg>
    <div class="dd-alert__body">
      <p class="dd-alert__title">Couldn’t reach auth-gateway</p>
      <p class="dd-alert__text">Sign-ins are failing in sfo3. We retry every 30 seconds.</p>
    </div>
  </div>
</div>
```

## Actions and dismiss

Actions are dotted text links on the right — the first is the way forward, `--secondary` steps back. A dismiss button with `data-dd-dismiss` fades the alert out and collapses the space it took.

Try it: press × (or Tab to it and press Enter) to dismiss an alert, or choose an action — each one answers with a toast and clears the alert, since the problem is dealt with.

```html
<div class="dd-stack">
  <div class="dd-alert dd-alert--warn">
    <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-alert"/></svg>
    <div class="dd-alert__body">
      <p class="dd-alert__title">cxkw.dev renews in 3 days</p>
      <p class="dd-alert__text">Auto-renew is off. If it lapses, every project on the domain goes dark.</p>
    </div>
    <div class="dd-alert__actions">
      <button class="dd-alert__action" type="button" data-dd-dismiss data-dd-toast="cxkw.dev renewed" data-dd-toast-description="Paid until 30 Oct 2027. Auto-renew is back on." data-dd-toast-intent="ok">Renew now</button>
      <button class="dd-alert__action dd-alert__action--secondary" type="button" data-dd-dismiss data-dd-toast="We’ll remind you tomorrow" data-dd-toast-intent="neutral" data-dd-toast-duration="3000">Remind me</button>
    </div>
    <button class="dd-alert__dismiss" type="button" data-dd-dismiss aria-label="Dismiss"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button>
  </div>
  <div class="dd-alert dd-alert--bad">
    <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-danger"/></svg>
    <div class="dd-alert__body">
      <p class="dd-alert__title">Deploy failed on step 4 of 6</p>
      <p class="dd-alert__text">leetnode · <span class="dd-mono">a91f3c2</span> · migrations exited with code 1.</p>
    </div>
    <div class="dd-alert__actions">
      <button class="dd-alert__action" type="button" data-dd-dismiss data-dd-toast="Retrying deploy" data-dd-toast-description="leetnode · a91f3c2 · from step 4 of 6">Retry</button>
      <a class="dd-alert__action dd-alert__action--secondary" href="#">View logs</a>
    </div>
    <button class="dd-alert__dismiss" type="button" data-dd-dismiss aria-label="Dismiss"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button>
  </div>
  <div class="dd-alert dd-alert--info">
    <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-info"/></svg>
    <div class="dd-alert__body">
      <p class="dd-alert__title">New sign-in from Hanoi</p>
      <p class="dd-alert__text">Safari on macOS, 2 minutes ago. If it wasn’t you, sign out everywhere.</p>
    </div>
    <button class="dd-alert__dismiss" type="button" data-dd-dismiss aria-label="Dismiss"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button>
  </div>
</div>
```

## Compact

One line, title and text running together. For forms, panels and table toolbars where a full alert would shout.

```html
<div class="dd-stack">
  <div class="dd-alert dd-alert--ok dd-alert--compact">
    <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-success"/></svg>
    <div class="dd-alert__body"><p class="dd-alert__title">Saved.</p><p class="dd-alert__text">Changes sync in a few seconds.</p></div>
  </div>
  <div class="dd-alert dd-alert--info dd-alert--compact">
    <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-info"/></svg>
    <div class="dd-alert__body"><p class="dd-alert__title">Read-only.</p><p class="dd-alert__text">This snapshot is from 12 Oct, 09:41 UTC.</p></div>
    <div class="dd-alert__actions"><a class="dd-alert__action" href="#">Open latest</a></div>
  </div>
  <div class="dd-alert dd-alert--warn dd-alert--compact">
    <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-alert"/></svg>
    <div class="dd-alert__body"><p class="dd-alert__text">2 of 14 checks are flaky on main.</p></div>
    <button class="dd-alert__dismiss" type="button" data-dd-dismiss aria-label="Dismiss"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button>
  </div>
</div>
```

## With a list

Validation summaries and multi-part warnings can hold a short list in the body.

```html
<div class="dd-alert dd-alert--bad" role="alert">
  <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-danger"/></svg>
  <div class="dd-alert__body">
    <p class="dd-alert__title">3 fields need attention</p>
    <ul>
      <li>Project name is already used by <code>dockey-ui</code>.</li>
      <li>Region must be one of fra1, sfo3 or sgp1.</li>
      <li>Build command can’t be empty.</li>
    </ul>
  </div>
</div>
```

## Narrow

The alert is its own size container. Below about 460px the actions drop under the text and line up with the title, and dismiss stays top-right — no breakpoints needed in your layout.

```html
<div style="max-width: 360px">
  <div class="dd-alert dd-alert--warn">
    <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-alert"/></svg>
    <div class="dd-alert__body">
      <p class="dd-alert__title">cxkw.dev renews in 3 days</p>
      <p class="dd-alert__text">Auto-renew is off for this domain.</p>
    </div>
    <div class="dd-alert__actions">
      <button class="dd-alert__action" type="button" data-dd-dismiss data-dd-toast="cxkw.dev renewed" data-dd-toast-description="Paid until 30 Oct 2027. Auto-renew is back on." data-dd-toast-intent="ok">Renew now</button>
      <button class="dd-alert__action dd-alert__action--secondary" type="button" data-dd-dismiss data-dd-toast="We’ll remind you tomorrow" data-dd-toast-intent="neutral" data-dd-toast-duration="3000">Remind me</button>
    </div>
    <button class="dd-alert__dismiss" type="button" data-dd-dismiss aria-label="Dismiss"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button>
  </div>
</div>
```

## Dawn and dusk

In dawn the status colour washes 14% over the page. In dusk a wash over a dark page goes muddy, so the alert becomes a solid fill — 30% status over `--dd-surface` — with no border, and the description tints toward the text colour to stay readable.

```html
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: var(--dd-space-3)">
  <div data-theme="dawn" style="background: var(--dd-bg); color: var(--dd-text); padding: var(--dd-space-4); border-radius: var(--dd-r-box)" class="dd-stack">
    <div class="dd-alert dd-alert--ok dd-alert--compact"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-success"/></svg><div class="dd-alert__body"><p class="dd-alert__title">Deployed</p></div></div>
    <div class="dd-alert dd-alert--bad dd-alert--compact"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-danger"/></svg><div class="dd-alert__body"><p class="dd-alert__title">Build failed</p></div></div>
  </div>
  <div data-theme="dusk" style="background: var(--dd-bg); color: var(--dd-text); padding: var(--dd-space-4); border-radius: var(--dd-r-box)" class="dd-stack">
    <div class="dd-alert dd-alert--ok dd-alert--compact"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-success"/></svg><div class="dd-alert__body"><p class="dd-alert__title">Deployed</p></div></div>
    <div class="dd-alert dd-alert--bad dd-alert--compact"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-danger"/></svg><div class="dd-alert__body"><p class="dd-alert__title">Build failed</p></div></div>
  </div>
</div>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-alert` | The container. Flex row; a size container named `dd-alert`. |
| `.dd-alert--{intent}` | Intent: `info` (default) · `ok` · `warn` · `bad`. |
| `.dd-alert--compact` | One line: tighter padding, title and text inline. |
| `> .dd-icon (or .dd-alert__icon)` | Leading icon, centred on the first line. Info → `info`, ok → `success`, warn → `alert`, bad → `danger`. |
| `.dd-alert__body` | Title and text column. Can hold a `<ul>`. |
| `.dd-alert__title / __text` | Title (600) and description (text tinted toward the intent). |
| `.dd-alert__actions` | Right-aligned actions; wrap under the text when narrow. |
| `.dd-alert__action` | Dotted text action — a `<button>` or `<a>`. `--secondary` for the quieter one. |
| `.dd-alert__dismiss` | Square icon button, top-right. Add `data-dd-dismiss` and an `aria-label`. |
| `--dd-alert-wash / -base / -desc` | Theme-level knobs: 14% over `--dd-bg` in dawn, 30% over `--dd-surface` in dusk; `-desc` is how much text colour the description keeps (72% / 80%). |

## Behaviour

| class / attribute | what it does |
|---|---|
| `data-dd-dismiss` | On a button inside an alert, banner, callout or `data-dd-dismissible` element: removes it with a short fade-and-collapse (instant under reduced motion). Focus moves to the parent so keyboard users aren’t dropped at the top of the page. |
| `data-dd-dismiss="#id"` | Dismisses the element the selector names instead of the enclosing one. |
| `data-dd-dismissible` | Makes any other element a target for a `data-dd-dismiss` button inside it. |
| `dd:dismiss` | Cancelable event fired on the alert before it goes. Call `preventDefault()` to keep it (e.g. to store the choice first). |
| `dd.dismiss(el)` | Dismiss from code. |

Alerts that appear while someone works should be announced: `role="status"` for info and ok, `role="alert"` for errors that need attention now. Alerts already on the page when it loads need no role.

## Guidelines

Do:
- Put the alert next to what it is about — above the form, at the top of the panel.
- Lead with what happened (“Deploy failed”), then what to do (“Retry”).
- Keep it to one alert per area; merge related problems into a list.

Don't:
- Don’t use an alert for success that’s already visible — a toast is enough.
- Don’t add borders or a coloured edge; the fill is the signal.
- Don’t hide the only way to fix a problem behind dismiss.

