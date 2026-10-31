# banner — `banner`

A message for the whole page — announcements, maintenance, incidents. Full width above the app, the same soft fill as the alert, and gone with one click.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/banner

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### Announcement

Centred content: an icon, a bold lead-in and one action. Dismiss sits at the far right so it never crowds the message. Try it: press × — the banner fades, the page closes up under it, and keyboard focus moves to the banner’s parent instead of the top of the page.

```html
<div class="dd-banner dd-banner--info">
  <div class="dd-banner__inner">
    <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-sparkle"/></svg>
    <p class="dd-banner__text"><strong>Dusk mode is here.</strong>Flip it from the top bar, or let your system decide.</p>
    <div class="dd-banner__actions"><a class="dd-banner__action" href="#themes">Try it</a></div>
  </div>
  <button class="dd-banner__dismiss" type="button" data-dd-dismiss aria-label="Dismiss announcement"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button>
</div>
<div style="padding: var(--dd-space-6) var(--dd-space-6) var(--dd-space-8)">
    <p class="dd-eyebrow">cxkw.dev · deploys</p>
    <p class="dd-h3" style="margin-top: var(--dd-space-2)">ship at dusk</p>
  </div>
```

## Intents

Info for news, ok for a recovery, warn for something planned, bad for an incident, neutral for a mode the page is in (a snapshot, an impersonation, a preview). Leave dismiss off while the condition is still true.

Try it: only the maintenance banner has a ×; the incident can’t be dismissed while it’s open.

```html
<div class="dd-stack" style="--dd-gap: var(--dd-space-2)">
  <div class="dd-banner dd-banner--ok">
    <div class="dd-banner__inner">
      <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-success"/></svg>
      <p class="dd-banner__text"><strong>All systems normal.</strong>auth-gateway recovered at 09:58 UTC.</p>
      <div class="dd-banner__actions"><a class="dd-banner__action" href="#">Status page</a></div>
    </div>
  </div>
  <div class="dd-banner dd-banner--warn">
    <div class="dd-banner__inner">
      <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-alert"/></svg>
      <p class="dd-banner__text"><strong>Scheduled maintenance.</strong>billing-worker is read-only Sat 02:00–02:30 UTC.</p>
      <div class="dd-banner__actions"><a class="dd-banner__action" href="#">Details</a></div>
    </div>
    <button class="dd-banner__dismiss" type="button" data-dd-dismiss aria-label="Dismiss"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button>
  </div>
  <div class="dd-banner dd-banner--bad" role="alert">
    <div class="dd-banner__inner">
      <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-danger"/></svg>
      <p class="dd-banner__text"><strong>Incident.</strong>Sign-ins are failing in sfo3. We’re on it.</p>
      <div class="dd-banner__actions"><a class="dd-banner__action" href="#">Follow updates</a></div>
    </div>
  </div>
  <div class="dd-banner dd-banner--neutral">
    <div class="dd-banner__inner">
      <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-eye"/></svg>
      <p class="dd-banner__text">You’re viewing a read-only snapshot of <span class="dd-mono">ai-focus</span> from 12 Oct.</p>
      <div class="dd-banner__actions"><a class="dd-banner__action" href="#">Back to live</a></div>
    </div>
  </div>
</div>
```

## Narrow

Banners are size containers too. Under about 560px the content left-aligns, the icon sits on the first line, actions wrap underneath and dismiss moves to the top-right corner.

```html
<div style="max-width: 360px">
  <div class="dd-banner dd-banner--warn">
    <div class="dd-banner__inner">
      <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-alert"/></svg>
      <p class="dd-banner__text"><strong>Scheduled maintenance.</strong>billing-worker is read-only Sat 02:00–02:30 UTC.</p>
      <div class="dd-banner__actions"><a class="dd-banner__action" href="#">Details</a><a class="dd-banner__action" href="#">Add to calendar</a></div>
    </div>
    <button class="dd-banner__dismiss" type="button" data-dd-dismiss aria-label="Dismiss"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button>
  </div>
</div>
```

## Sticky

`--sticky` pins the banner to the top of its scrolling container — for things the reader must not lose, like a pending reload.

Try it: scroll the panel, then press Reload.

```html
<div style="height: 220px; overflow: auto; isolation: isolate">
  <div class="dd-banner dd-banner--info dd-banner--sticky">
    <div class="dd-banner__inner">
      <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-refresh"/></svg>
      <p class="dd-banner__text"><strong>A new version is ready.</strong>Reload to get dawn-and-dusk v0.4.</p>
      <div class="dd-banner__actions"><button class="dd-banner__action" type="button" data-dd-toast="Reloaded" data-dd-toast-description="You’re on dawn-and-dusk v0.4." data-dd-toast-intent="ok">Reload</button></div>
    </div>
  </div>
  <div class="dd-stack" style="padding: var(--dd-space-5) var(--dd-space-6)">
    <p class="dd-text">Scroll this panel — the banner stays pinned to the top.</p>
    <p class="dd-text dd-muted">fra1 · 14 deploys today · p95 84 ms</p>
    <p class="dd-text dd-muted">sfo3 · 9 deploys today · p95 112 ms</p>
    <p class="dd-text dd-muted">sgp1 · 6 deploys today · p95 141 ms</p>
    <p class="dd-text dd-muted">edge-cache · hit ratio 97.2%</p>
    <p class="dd-text dd-muted">billing-worker · queue depth 0</p>
  </div>
</div>
```

## Dawn and dusk

Dawn washes 14% of the status colour over the page. Dusk uses a solid 30% fill over `--dd-surface` with no border — try “View in dusk” on any example above.

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-banner` | Full-width block; a size container named `dd-banner`. |
| `.dd-banner--{intent}` | Intent: `info` (default) · `ok` · `warn` · `bad` · `neutral`. |
| `.dd-banner--sticky` | Sticks to the top of the scroll container (`--dd-z-sticky`). |
| `.dd-banner__inner` | The content row: icon, text, actions. Centred when wide, left-aligned when narrow. |
| `.dd-banner__text` | The message. Put a short lead-in in `<strong>`. |
| `.dd-banner__actions / __action` | Dotted text actions, `<a>` or `<button>`. |
| `.dd-banner__dismiss` | Icon button at the right edge. Add `data-dd-dismiss` and an `aria-label`. |
| `--dd-banner-wash / -base` | Theme-level knobs: 14% over `--dd-bg` in dawn, 30% over `--dd-surface` in dusk. |

## Behaviour

| class / attribute | what it does |
|---|---|
| `data-dd-dismiss` | Fades and collapses the banner, then removes it. Fires a cancelable `dd:dismiss` event first — listen for it to remember the choice. |
| `dd.dismiss(el)` | Dismiss from code, e.g. when the incident is resolved. The full dismiss API is on the alert page. |

Use `role="alert"` only for an incident banner inserted while the page is open; a banner present at load needs no role, or `role="region"` with an `aria-label` if it should be a landmark.

## Guidelines

Do:
- Show one banner at a time; queue the rest.
- Start with a two- or three-word lead-in in bold.
- Remember a dismissal so the same banner doesn’t come back on every page.

Don't:
- Don’t use a banner for something about one form or panel — that’s an alert.
- Don’t make an incident banner dismissible while the incident is open.
- Don’t stack a banner on top of a sticky toolbar without testing the scroll.

