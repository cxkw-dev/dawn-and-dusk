# badge — `badge`

A tiny label for status and metadata: live, beta, failed, private. Micro caps with room to breathe — tracked uppercase in a compact tile, optically centred.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/badge

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### The family

Five styles across six intents. Soft is the default and covers most cases; solid is for the one status that must jump out; outline and ghost sit quietly in dense rows; dot keeps the label neutral and lets a coloured dot carry the state.

```html
<div class="dd-stack" style="--dd-gap: var(--dd-space-2)">
<p class="dd-eyebrow" style="font-size: 10px">soft</p>
<div class="dd-row">
  <span class="dd-badge dd-badge--soft dd-badge--neutral">Draft</span>
  <span class="dd-badge dd-badge--soft dd-badge--accent">New</span>
  <span class="dd-badge dd-badge--soft dd-badge--ok">Live</span>
  <span class="dd-badge dd-badge--soft dd-badge--warn">Beta</span>
  <span class="dd-badge dd-badge--soft dd-badge--bad">Failed</span>
  <span class="dd-badge dd-badge--soft dd-badge--info">Info</span>
</div>
<p class="dd-eyebrow" style="font-size: 10px">solid</p>
<div class="dd-row">
  <span class="dd-badge dd-badge--solid dd-badge--neutral">Draft</span>
  <span class="dd-badge dd-badge--solid dd-badge--accent">New</span>
  <span class="dd-badge dd-badge--solid dd-badge--ok">Live</span>
  <span class="dd-badge dd-badge--solid dd-badge--warn">Beta</span>
  <span class="dd-badge dd-badge--solid dd-badge--bad">Failed</span>
  <span class="dd-badge dd-badge--solid dd-badge--info">Info</span>
</div>
<p class="dd-eyebrow" style="font-size: 10px">outline</p>
<div class="dd-row">
  <span class="dd-badge dd-badge--outline dd-badge--neutral">Draft</span>
  <span class="dd-badge dd-badge--outline dd-badge--accent">New</span>
  <span class="dd-badge dd-badge--outline dd-badge--ok">Live</span>
  <span class="dd-badge dd-badge--outline dd-badge--warn">Beta</span>
  <span class="dd-badge dd-badge--outline dd-badge--bad">Failed</span>
  <span class="dd-badge dd-badge--outline dd-badge--info">Info</span>
</div>
<p class="dd-eyebrow" style="font-size: 10px">dot</p>
<div class="dd-row">
  <span class="dd-badge dd-badge--dot dd-badge--neutral">Draft</span>
  <span class="dd-badge dd-badge--dot dd-badge--accent">New</span>
  <span class="dd-badge dd-badge--dot dd-badge--ok">Live</span>
  <span class="dd-badge dd-badge--dot dd-badge--warn">Beta</span>
  <span class="dd-badge dd-badge--dot dd-badge--bad">Failed</span>
  <span class="dd-badge dd-badge--dot dd-badge--info">Info</span>
</div>
<p class="dd-eyebrow" style="font-size: 10px">ghost</p>
<div class="dd-row">
  <span class="dd-badge dd-badge--ghost dd-badge--neutral">Draft</span>
  <span class="dd-badge dd-badge--ghost dd-badge--accent">New</span>
  <span class="dd-badge dd-badge--ghost dd-badge--ok">Live</span>
  <span class="dd-badge dd-badge--ghost dd-badge--warn">Beta</span>
  <span class="dd-badge dd-badge--ghost dd-badge--bad">Failed</span>
  <span class="dd-badge dd-badge--ghost dd-badge--info">Info</span>
</div>
</div>
```

## Sizes

Small is the default — for table cells, list rows and next to headings. `--md` is for cards and page headers.

```html
<div class="dd-row" style="--dd-gap: var(--dd-space-3)">
  <span class="dd-badge dd-badge--solid dd-badge--ok">Live</span>
  <span class="dd-badge dd-badge--solid dd-badge--ok dd-badge--md">Live</span>
  <span class="dd-badge dd-badge--accent">New</span>
  <span class="dd-badge dd-badge--accent dd-badge--md">New</span>
  <span class="dd-badge dd-badge--outline">Draft</span>
  <span class="dd-badge dd-badge--outline dd-badge--md">Draft</span>
  <span class="dd-badge dd-badge--dot dd-badge--warn">Degraded</span>
  <span class="dd-badge dd-badge--dot dd-badge--warn dd-badge--md">Degraded</span>
</div>
```

## Icon and count

A leading icon reinforces the state; a mono count after a hairline splits off a number.

```html
<div class="dd-row" style="--dd-gap: var(--dd-space-3)">
  <span class="dd-badge dd-badge--solid dd-badge--ok"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg>Live</span>
  <span class="dd-badge dd-badge--bad"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-alert"/></svg>Failed</span>
  <span class="dd-badge dd-badge--info"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-lock"/></svg>Private</span>
  <span class="dd-badge">Inbox<span class="dd-badge__count">12</span></span>
  <span class="dd-badge dd-badge--solid dd-badge--accent dd-badge--md">New<span class="dd-badge__count">3</span></span>
  <span class="dd-badge dd-badge--outline dd-badge--warn">Flaky<span class="dd-badge__count">2/14</span></span>
</div>
```

## Counts

`--count` is a bare mono number in a pill — totals in navigation and tabs. `--corner` pins a count, or an empty dot, to the corner of an icon button (the button already has `position: relative`). Say the number in the button’s `aria-label`.

Try it: click the bell or the chat button to mark them read — the badge goes and the button’s label follows it; click again to bring them back.

```html
<div class="dd-row" style="--dd-gap: var(--dd-space-6)">
  <button class="dd-btn dd-btn--ghost dd-btn--icon" type="button" id="bd-notifications" aria-label="Notifications, 3 unread"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-bell"/></svg><span class="dd-badge dd-badge--count dd-badge--solid dd-badge--bad dd-badge--corner" aria-hidden="true">3</span></button>
  <button class="dd-btn dd-btn--ghost dd-btn--icon" type="button" id="bd-messages" aria-label="Messages, new"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chat"/></svg><span class="dd-badge dd-badge--solid dd-badge--accent dd-badge--corner" aria-hidden="true"></span></button>
  <span class="dd-row" style="--dd-gap: var(--dd-space-2)">Deploys <span class="dd-badge dd-badge--count">128</span></span>
  <span class="dd-row" style="--dd-gap: var(--dd-space-2)">Open issues <span class="dd-badge dd-badge--count dd-badge--warn">7</span></span>
  <span class="dd-row" style="--dd-gap: var(--dd-space-2)">Failing <span class="dd-badge dd-badge--count dd-badge--solid dd-badge--bad">2</span></span>
</div>
```

## In context

```html
<div class="dd-stack" style="--dd-gap: 0; max-width: 560px">
  <div class="dd-row" style="--dd-gap: var(--dd-space-2); justify-content: space-between; padding: var(--dd-space-3) 0; box-shadow: inset 0 -1px 0 color-mix(in oklab, var(--dd-text) 8%, transparent)">
    <span class="dd-row" style="--dd-gap: var(--dd-space-2)"><b>auth-gateway</b><span class="dd-mono dd-muted dd-small">v3.2.0</span></span>
    <span class="dd-badge dd-badge--dot dd-badge--ok">Live</span>
  </div>
  <div class="dd-row" style="--dd-gap: var(--dd-space-2); justify-content: space-between; padding: var(--dd-space-3) 0; box-shadow: inset 0 -1px 0 color-mix(in oklab, var(--dd-text) 8%, transparent)">
    <span class="dd-row" style="--dd-gap: var(--dd-space-2)"><b>billing-worker</b><span class="dd-mono dd-muted dd-small">v1.9.4</span><span class="dd-badge dd-badge--accent">Canary</span></span>
    <span class="dd-badge dd-badge--dot dd-badge--warn">Building</span>
  </div>
  <div class="dd-row" style="--dd-gap: var(--dd-space-2); justify-content: space-between; padding: var(--dd-space-3) 0">
    <span class="dd-row" style="--dd-gap: var(--dd-space-2)"><b>edge-cache</b><span class="dd-mono dd-muted dd-small">v0.7.1</span></span>
    <span class="dd-badge dd-badge--dot dd-badge--bad">Failed</span>
  </div>
</div>
```

## Optical centring

Figtree’s capitals sit exactly in the middle of a `line-height: 1` box (0.15em above the cap height, 0.15em below the baseline), so the badge trims that much off its vertical padding — the caps look centred and the tile stays as small as a trimmed one. The trailing letter-spacing is taken off the end padding so the word sits in the middle horizontally too. It works with a bare text node; no inner span needed.

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-badge` | Base: micro caps, soft neutral. Works on `<span>`, `<a>` and `<button>`; as a link or button (a filter) it gets a hover step, a pressed dim and a focus ring. |
| `.dd-badge--{style}` | Style: `soft` (default) · `solid` · `outline` · `dot` · `ghost`. |
| `.dd-badge--{intent}` | Intent: `neutral` (default) · `accent` · `ok` · `warn` · `bad` · `info`. |
| `.dd-badge--md` | Medium size. Small has no modifier. |
| `> .dd-icon` | Leading icon, sized to the caps. |
| `.dd-badge__count` | Mono number after a hairline. |
| `.dd-badge--count` | Bare number pill (no caps, no tracking). |
| `.dd-badge--corner` | Pinned to the top-right of a positioned parent, ringed in `--dd-badge-ring` (default `--dd-bg`). Empty = dot. Hide it with `hidden` when the count reaches zero, and update the host’s label with it. |

## Guidelines

Do:
- Keep labels to one word, two at most.
- Use the same word for the same state everywhere: Live, Building, Failed.
- Use solid sparingly — one per row at most.

Don't:
- Don’t make badges clickable unless they filter; use a chip.
- Don’t rely on colour alone — the word carries the meaning.
- Don’t use badges for categories and tags; chips in the Color set do that.

