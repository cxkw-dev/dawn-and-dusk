# status dot — `status-dot`

A small coloured dot for presence and health — is it up, is someone there. With a word beside it, it’s a status; on its own, it’s a hint that needs a label for screen readers.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/status-dot

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### States

Online, idle, error and unknown, plus offline and maintenance. Unknown is hollow: no signal is not a colour.

```html
<div class="dd-row" style="--dd-gap: var(--dd-space-6)">
  <span class="dd-status-dot dd-status-dot--online">Online</span>
  <span class="dd-status-dot dd-status-dot--idle">Idle</span>
  <span class="dd-status-dot dd-status-dot--error">Error</span>
  <span class="dd-status-dot dd-status-dot--unknown">Unknown</span>
  <span class="dd-status-dot dd-status-dot--offline">Offline</span>
  <span class="dd-status-dot dd-status-dot--info">Maintenance</span>
</div>
```

## Sizes and dots alone

6, 8 (default) and 10px. A dot without text needs `role="img"` and an `aria-label`.

```html
<div class="dd-stack" style="--dd-gap: var(--dd-space-4)">
  <div class="dd-row" style="--dd-gap: var(--dd-space-4)">
    <span class="dd-status-dot dd-status-dot--online dd-status-dot--sm" role="img" aria-label="Online"></span>
    <span class="dd-status-dot dd-status-dot--online" role="img" aria-label="Online"></span>
    <span class="dd-status-dot dd-status-dot--online dd-status-dot--lg" role="img" aria-label="Online"></span>
    <span class="dd-status-dot dd-status-dot--error dd-status-dot--sm" role="img" aria-label="Error"></span>
    <span class="dd-status-dot dd-status-dot--error" role="img" aria-label="Error"></span>
    <span class="dd-status-dot dd-status-dot--error dd-status-dot--lg" role="img" aria-label="Error"></span>
  </div>
  <div class="dd-row" style="--dd-gap: var(--dd-space-6)">
    <span class="dd-status-dot dd-status-dot--online dd-status-dot--sm dd-status-dot--muted">3 online</span>
    <span class="dd-status-dot dd-status-dot--idle">Away until 14:00</span>
    <span class="dd-status-dot dd-status-dot--error dd-status-dot--lg">Build failing</span>
  </div>
</div>
```

## Live

`--live` sends a soft ring out from the dot — for things happening right now: a deploy in progress, a live log tail. Use one at a time. Under reduced motion the ring is dropped.

```html
<div class="dd-row" style="--dd-gap: var(--dd-space-6)">
  <span class="dd-status-dot dd-status-dot--online dd-status-dot--live">Live tail</span>
  <span class="dd-status-dot dd-status-dot--info dd-status-dot--live">Deploying to sgp1</span>
  <span class="dd-status-dot dd-status-dot--error dd-status-dot--live">Recording incident</span>
</div>
```

## Service health

```html
<div style="max-width: 520px">
  <div style="display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: var(--dd-space-1) var(--dd-space-4); align-items: center; padding: var(--dd-space-3) 0; box-shadow: inset 0 -1px 0 color-mix(in oklab, var(--dd-text) 8%, transparent)">
    <span><b>auth-gateway</b> <span class="dd-mono dd-muted dd-small">fra1 · sfo3 · sgp1</span></span>
    <span class="dd-status-dot dd-status-dot--online">Operational</span>
  </div>
  <div style="display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: var(--dd-space-1) var(--dd-space-4); align-items: center; padding: var(--dd-space-3) 0; box-shadow: inset 0 -1px 0 color-mix(in oklab, var(--dd-text) 8%, transparent)">
    <span><b>billing-worker</b> <span class="dd-mono dd-muted dd-small">p95 611 ms</span></span>
    <span class="dd-status-dot dd-status-dot--idle">Degraded</span>
  </div>
  <div style="display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: var(--dd-space-1) var(--dd-space-4); align-items: center; padding: var(--dd-space-3) 0; box-shadow: inset 0 -1px 0 color-mix(in oklab, var(--dd-text) 8%, transparent)">
    <span><b>edge-cache</b> <span class="dd-mono dd-muted dd-small">since 09:41</span></span>
    <span class="dd-status-dot dd-status-dot--error">Down</span>
  </div>
  <div style="display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: var(--dd-space-1) var(--dd-space-4); align-items: center; padding: var(--dd-space-3) 0; box-shadow: inset 0 -1px 0 color-mix(in oklab, var(--dd-text) 8%, transparent)">
    <span><b>search-indexer</b> <span class="dd-mono dd-muted dd-small">last seen 2h ago</span></span>
    <span class="dd-status-dot dd-status-dot--unknown">No data</span>
  </div>
  <div style="display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: var(--dd-space-1) var(--dd-space-4); align-items: center; padding: var(--dd-space-3) 0;">
    <span><b>notify-fanout</b> <span class="dd-mono dd-muted dd-small">until 02:30</span></span>
    <span class="dd-status-dot dd-status-dot--info">Maintenance</span>
  </div>
</div>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-status-dot` | The dot (its `::before`) plus any text inside as the label. |
| `.dd-status-dot--{state}` | State: `online` (ok) · `idle` (warn) · `error` (bad) · `unknown` (hollow ring) · `offline` (greige) · `info` (maintenance). |
| `.dd-status-dot--sm / --lg` | 6px and 10px dots (default 8px); `--sm` also takes smaller text. Or set `--dd-status-size`. |
| `.dd-status-dot--live` | A soft ring pulsing out from the dot; dropped under reduced motion. |
| `.dd-status-dot--muted` | Muted label colour. |

## Guidelines

Do:
- Pair the dot with a word wherever there’s room.
- Use the same words across the product: Operational, Degraded, Down.
- Reserve `--live` for one thing on screen.

Don't:
- Don’t use status dots as bullets or decoration.
- Don’t use green for “selected” or “new” — it means healthy.
- Don’t pulse things that aren’t changing.

