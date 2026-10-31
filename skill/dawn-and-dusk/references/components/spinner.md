# spinner — `spinner`

Something is working and we can’t say for how long. A thin taupe ring for most waits, three dots for conversational ones, a line of text when it’s inline, a loader when the whole page waits.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/spinner

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### Sizes

sm 14 · md 18 (default) · lg 28 · xl 40. The ring takes currentColor — the taupe accent by default, muted for quiet places.

```html
<div class="dd-row" style="--dd-gap: var(--dd-space-6)">
  <span class="dd-spinner dd-spinner--sm" role="status" aria-label="Loading"></span>
  <span class="dd-spinner" role="status" aria-label="Loading"></span>
  <span class="dd-spinner dd-spinner--lg" role="status" aria-label="Loading"></span>
  <span class="dd-spinner dd-spinner--xl" role="status" aria-label="Loading"></span>
  <span class="dd-spinner dd-spinner--lg dd-spinner--muted" role="status" aria-label="Loading"></span>
  <span class="dd-spinner dd-spinner--lg" style="color: var(--dd-primary)" role="status" aria-label="Loading"></span>
</div>
```

## Dots

Three dots that breathe in turn — for a reply that’s being written or a stream that’s about to start.

```html
<div class="dd-row" style="--dd-gap: var(--dd-space-6)">
  <span class="dd-spinner dd-spinner--dots dd-spinner--sm" role="status" aria-label="Loading"><i></i><i></i><i></i></span>
  <span class="dd-spinner dd-spinner--dots" role="status" aria-label="Loading"><i></i><i></i><i></i></span>
  <span class="dd-spinner dd-spinner--dots dd-spinner--lg dd-spinner--muted" role="status" aria-label="Loading"><i></i><i></i><i></i></span>
  <span class="dd-loading" role="status"><span class="dd-spinner dd-spinner--dots"><i></i><i></i><i></i></span>ai-focus is thinking</span>
</div>
```

## Inline loading

A spinner beside the thing that’s loading, in muted text. `--inline` sizes the ring to the surrounding type. Buttons have their own spinner — see Button.

```html
<div class="dd-stack" style="--dd-gap: var(--dd-space-4)">
  <span class="dd-loading" role="status"><span class="dd-spinner"></span>Loading deploys…</span>
  <span class="dd-loading" role="status"><span class="dd-spinner"></span><span>Fetching logs from <span class="dd-mono">edge-cache</span> · fra1</span></span>
  <p class="dd-text">Checking 14 domains <span class="dd-spinner dd-spinner--inline dd-spinner--muted" role="status" aria-label="in progress"></span> — this takes a few seconds.</p>
  <button class="dd-btn dd-btn--primary is-loading" type="button" aria-busy="true" style="align-self: flex-start"><span class="dd-btn__spinner"></span><span>Deploying</span></button>
</div>
```

## Page loader

Centred in the space the page will fill (at least 60% of the viewport tall, or 480px on tall screens — the example is shorter). `--overlay` lays it over content that’s being recalculated (its parent needs `position: relative`); `--fixed` covers the viewport.

```html
<div class="dd-page-loader" role="status" style="min-height: 240px">
  <span class="dd-spinner"></span>
  <p class="dd-page-loader__label">Loading dashboard</p>
  <p class="dd-page-loader__meta">cxkw.dev · 3 regions</p>
</div>
```

```html
<div style="position: relative; min-height: 220px; padding: var(--dd-space-6)">
  <p class="dd-eyebrow">billing-worker · invoices</p>
  <p class="dd-h3" style="margin: var(--dd-space-2) 0 var(--dd-space-4)">october</p>
  <p class="dd-text dd-muted">142 invoices · $18,420.00 · 3 overdue</p>
  <p class="dd-text dd-muted">Last sync 09:41 UTC</p>
  <div class="dd-page-loader dd-page-loader--overlay" role="status">
    <span class="dd-spinner"></span>
    <p class="dd-page-loader__label">Recalculating totals</p>
  </div>
</div>
```

Try it: press Recalculate. The overlay covers the panel while the totals are worked out (the button can’t be pressed twice meanwhile), then lifts and the sync time updates.

```html
<div id="sp-invoices" style="position: relative; min-height: 220px; padding: var(--dd-space-6)">
  <div class="dd-row" style="justify-content: space-between; align-items: flex-start; margin-bottom: var(--dd-space-4)">
    <div>
      <p class="dd-eyebrow">billing-worker · invoices</p>
      <p class="dd-h3" style="margin: var(--dd-space-2) 0 0">october</p>
    </div>
    <button class="dd-btn dd-btn--sm" type="button" data-sp-recalc aria-controls="sp-invoices"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-refresh"/></svg><span>Recalculate</span></button>
  </div>
  <p class="dd-text dd-muted">142 invoices · $18,420.00 · 3 overdue</p>
  <p class="dd-text dd-muted">Last sync <span data-sp-sync>09:41</span> UTC</p>
  <div class="dd-page-loader dd-page-loader--overlay" role="status" hidden>
    <span class="dd-spinner"></span>
    <p class="dd-page-loader__label">Recalculating totals</p>
  </div>
</div>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-spinner` | A ring spinner, 18px, in the accent colour (any `color` works). Give it `role="status"` and a label, or put it inside something that has one. |
| `.dd-spinner--sm / --lg / --xl` | 14 / 28 / 40px. |
| `.dd-spinner--inline` | Sized to the text around it. |
| `.dd-spinner--muted` | Muted colour. |
| `.dd-spinner--dots` | Three dots; needs three `<i>` children. |
| `.dd-loading` | Spinner + muted text in a row. |
| `.dd-page-loader` | Centred loader for a page or section, with `__label` and `__meta`. |
| `.dd-page-loader--overlay / --fixed` | Cover the parent / the viewport with a translucent wash. Show and hide it with the `hidden` attribute. |

## Motion

The ring turns once every 0.8s with the `dd-spin` keyframes it shares with the loading button. Under reduced motion a stopped ring would look finished, so spinners keep turning, three times slower.

## Guidelines

Do:
- Say what’s loading: “Loading deploys…”.
- Wait ~300ms before showing a spinner so fast loads don’t flash.
- Prefer a skeleton when you know the shape of what’s coming.

Don't:
- Don’t put more than one spinner in a view.
- Don’t block the whole page for something one panel needs.
- Don’t use a spinner for progress you can measure — use a progress bar.

