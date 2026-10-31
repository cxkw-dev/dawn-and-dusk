# stat — `stat`

One number, said clearly. Stat tiles lead a dashboard with a figure, its change and a quiet trend; the inline stat tucks the same facts into a header.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/stat

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### Tile

Label, value, delta and comparison. The sparkline is a de-emphasis tone so the figure stays the loudest thing on the tile; the end dot marks now.

```html
<div style="max-width: 320px">
  <div class="dd-stat">
    <p class="dd-stat__label"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-bolt"/></svg>Requests / min</p>
    <div class="dd-stat__main">
      <p class="dd-stat__value">41.3K</p>
      <svg class="dd-stat__spark" viewBox="0 0 100 32" aria-hidden="true"><path class="dd-stat__spark-area" d="M0 27.7 L9.1 25.4 L18.2 28 L27.3 22.3 L36.4 23.4 L45.5 17.9 L54.5 19.4 L63.6 15.6 L72.7 12.9 L81.8 14.3 L90.9 8.6 L100 5 L100 32 L0 32 Z"/><path class="dd-stat__spark-line" d="M0 27.7 L9.1 25.4 L18.2 28 L27.3 22.3 L36.4 23.4 L45.5 17.9 L54.5 19.4 L63.6 15.6 L72.7 12.9 L81.8 14.3 L90.9 8.6 L100 5"/><circle class="dd-stat__spark-dot" cx="100" cy="5" r="3"/></svg>
    </div>
    <div class="dd-stat__foot"><span class="dd-stat__delta dd-stat__delta--ok"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-up"/></svg><span class="dd-visually-hidden">Up</span>12.4%</span><span class="dd-stat__compare">vs <b>36.7K</b> last week</span></div>
  </div>
</div>
```

## Stat grid

Tiles flow into as many columns as fit, 210px minimum by default; set `--dd-stat-min` to change it (260px here). They stack on narrow screens. Tone, not lines, separates them.

```html
<div class="dd-stat-grid" style="--dd-stat-min: 260px">
  <div class="dd-stat">
    <p class="dd-stat__label">Requests / min</p>
    <div class="dd-stat__main">
      <p class="dd-stat__value">41.3K</p>
      <svg class="dd-stat__spark" viewBox="0 0 100 32" aria-hidden="true"><path class="dd-stat__spark-area" d="M0 27.7 L9.1 25.4 L18.2 28 L27.3 22.3 L36.4 23.4 L45.5 17.9 L54.5 19.4 L63.6 15.6 L72.7 12.9 L81.8 14.3 L90.9 8.6 L100 5 L100 32 L0 32 Z"/><path class="dd-stat__spark-line" d="M0 27.7 L9.1 25.4 L18.2 28 L27.3 22.3 L36.4 23.4 L45.5 17.9 L54.5 19.4 L63.6 15.6 L72.7 12.9 L81.8 14.3 L90.9 8.6 L100 5"/><circle class="dd-stat__spark-dot" cx="100" cy="5" r="3"/></svg>
    </div>
    <div class="dd-stat__foot"><span class="dd-stat__delta dd-stat__delta--ok"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-up"/></svg><span class="dd-visually-hidden">Up</span>12.4%</span><span class="dd-stat__compare">vs <b>36.7K</b> last week</span></div>
  </div>
  <div class="dd-stat">
    <p class="dd-stat__label">p95 latency</p>
    <div class="dd-stat__main">
      <p class="dd-stat__value">142<span class="dd-stat__unit">ms</span></p>
      <svg class="dd-stat__spark" viewBox="0 0 100 32" aria-hidden="true"><path class="dd-stat__spark-area" d="M0 28 L9.1 25.1 L18.2 27 L27.3 20.3 L36.4 22.3 L45.5 15.5 L54.5 18.4 L63.6 10.8 L72.7 13.6 L81.8 7.9 L90.9 9.8 L100 5 L100 32 L0 32 Z"/><path class="dd-stat__spark-line" d="M0 28 L9.1 25.1 L18.2 27 L27.3 20.3 L36.4 22.3 L45.5 15.5 L54.5 18.4 L63.6 10.8 L72.7 13.6 L81.8 7.9 L90.9 9.8 L100 5"/><circle class="dd-stat__spark-dot" cx="100" cy="5" r="3"/></svg>
    </div>
    <div class="dd-stat__foot"><span class="dd-stat__delta dd-stat__delta--bad"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-up"/></svg><span class="dd-visually-hidden">Up</span>18 ms</span><span class="dd-stat__compare">vs <b>124 ms</b> yesterday</span></div>
  </div>
  <div class="dd-stat">
    <p class="dd-stat__label">Error rate</p>
    <div class="dd-stat__main">
      <p class="dd-stat__value">0.42<span class="dd-stat__unit">%</span></p>
      <svg class="dd-stat__spark" viewBox="0 0 100 32" aria-hidden="true"><path class="dd-stat__spark-area" d="M0 5 L9.1 8.6 L18.2 6.2 L27.3 12.3 L36.4 15.9 L45.5 13.5 L54.5 18.3 L63.6 19.5 L72.7 21.9 L81.8 23.2 L90.9 25.6 L100 28 L100 32 L0 32 Z"/><path class="dd-stat__spark-line" d="M0 5 L9.1 8.6 L18.2 6.2 L27.3 12.3 L36.4 15.9 L45.5 13.5 L54.5 18.3 L63.6 19.5 L72.7 21.9 L81.8 23.2 L90.9 25.6 L100 28"/><circle class="dd-stat__spark-dot" cx="100" cy="28" r="3"/></svg>
    </div>
    <div class="dd-stat__foot"><span class="dd-stat__delta dd-stat__delta--ok"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-down"/></svg><span class="dd-visually-hidden">Down</span>0.08 pts</span><span class="dd-stat__compare">vs <b>0.50%</b> last week</span></div>
  </div>
  <div class="dd-stat">
    <p class="dd-stat__label">Deploys today</p>
    <div class="dd-stat__main">
      <p class="dd-stat__value">12</p>
      <svg class="dd-stat__spark" viewBox="0 0 100 32" aria-hidden="true"><path class="dd-stat__spark-area" d="M0 24.2 L9.1 16.5 L18.2 28 L27.3 12.7 L36.4 20.3 L45.5 5 L54.5 12.7 L63.6 24.2 L72.7 8.8 L81.8 16.5 L90.9 12.7 L100 12.7 L100 32 L0 32 Z"/><path class="dd-stat__spark-line" d="M0 24.2 L9.1 16.5 L18.2 28 L27.3 12.7 L36.4 20.3 L45.5 5 L54.5 12.7 L63.6 24.2 L72.7 8.8 L81.8 16.5 L90.9 12.7 L100 12.7"/><circle class="dd-stat__spark-dot" cx="100" cy="12.7" r="3"/></svg>
    </div>
    <div class="dd-stat__foot"><span class="dd-stat__delta dd-stat__delta--flat"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-minus"/></svg><span class="dd-visually-hidden">No change</span>0</span><span class="dd-stat__compare">same as Tuesday</span></div>
  </div>
</div>
```

## Joined grid

One surface split by 2px gaps of the page colour — a single object for a related set. Tiles can be links; on hover they step one tone further from the page (toward ink in dawn, deeper in dusk), so the change reads in both themes and a tile never fades into the page.

```html
<div class="dd-stat-grid dd-stat-grid--joined" style="--dd-stat-min: 150px">
  <a class="dd-stat" href="#billing">
    <p class="dd-stat__label">Spend this month</p>
    <div class="dd-stat__main">
      <p class="dd-stat__value">$1,284</p>
    </div>
    <div class="dd-stat__foot"><span class="dd-stat__delta dd-stat__delta--ok"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-down"/></svg><span class="dd-visually-hidden">Down</span>6.1%</span><span class="dd-stat__compare">vs September</span></div>
  </a>
  <a class="dd-stat" href="#forecast">
    <p class="dd-stat__label">Forecast</p>
    <div class="dd-stat__main">
      <p class="dd-stat__value">$1,910</p>
    </div>
    <div class="dd-stat__foot"><span class="dd-stat__delta dd-stat__delta--warn"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-up"/></svg><span class="dd-visually-hidden">Up</span>4.0%</span><span class="dd-stat__compare">budget <b>$2,000</b></span></div>
  </a>
  <a class="dd-stat" href="#budget">
    <p class="dd-stat__label">Budget left</p>
    <div class="dd-stat__main">
      <p class="dd-stat__value">36<span class="dd-stat__unit">%</span></p>
    </div>
    <div class="dd-stat__foot"><span class="dd-stat__compare"><b>11</b> days to reset</span></div>
  </a>
  <a class="dd-stat" href="#invoices">
    <p class="dd-stat__label">Open invoices</p>
    <div class="dd-stat__main">
      <p class="dd-stat__value">3</p>
    </div>
    <div class="dd-stat__foot"><span class="dd-stat__compare"><b>$412</b> due Nov 4</span></div>
  </a>
</div>
```

## Delta

The arrow says the direction; the colour says whether that direction is good. Latency going up is bad, errors going down is good — pick the tone from what the metric means, never from the sign. Each delta carries hidden text (“Up”, “Down”) so colour is never the only signal.

```html
<div class="dd-row">
  <span class="dd-stat__delta dd-stat__delta--ok"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-up"/></svg><span class="dd-visually-hidden">Up</span>12.4%</span>
  <span class="dd-stat__delta dd-stat__delta--ok"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-down"/></svg><span class="dd-visually-hidden">Down</span>0.08 pts</span>
  <span class="dd-stat__delta dd-stat__delta--bad"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-up"/></svg><span class="dd-visually-hidden">Up</span>18 ms</span>
  <span class="dd-stat__delta dd-stat__delta--bad"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-down"/></svg><span class="dd-visually-hidden">Down</span>3.2%</span>
  <span class="dd-stat__delta dd-stat__delta--warn"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-up"/></svg><span class="dd-visually-hidden">Up</span>4.0%</span>
  <span class="dd-stat__delta dd-stat__delta--flat"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-minus"/></svg><span class="dd-visually-hidden">No change</span>0</span>
</div>
```

## Inline stat

The compact form for page headers, table toolbars and cards: label, mono value and optional delta on one baseline. Group several with `.dd-stat-inline-group`; they wrap on small screens.

```html
<div class="dd-stat-inline-group">
  <p class="dd-stat dd-stat--inline"><span class="dd-stat__label">Uptime</span><span class="dd-stat__value">99.98<span class="dd-stat__unit">%</span></span></p>
  <p class="dd-stat dd-stat--inline"><span class="dd-stat__label">p95</span><span class="dd-stat__value">142<span class="dd-stat__unit">ms</span></span><span class="dd-stat__delta dd-stat__delta--bad"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-up"/></svg><span class="dd-visually-hidden">Up</span>18</span></p>
  <p class="dd-stat dd-stat--inline"><span class="dd-stat__label">Deploys today</span><span class="dd-stat__value">12</span></p>
  <p class="dd-stat dd-stat--inline"><span class="dd-stat__label">Spend</span><span class="dd-stat__value">$1,284</span><span class="dd-stat__delta dd-stat__delta--ok"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-down"/></svg><span class="dd-visually-hidden">Down</span>6.1%</span></p>
</div>
```

## Hero figure

The single number a view leads with — one per page, at least 48px, with a wider sparkline.

```html
<div class="dd-stat dd-stat--hero" style="max-width: 560px">
  <p class="dd-stat__label"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-globe"/></svg>Requests served · October</p>
  <div class="dd-stat__main">
    <p class="dd-stat__value">1.28<span class="dd-stat__unit">B</span></p>
    <svg class="dd-stat__spark" viewBox="0 0 100 32" aria-hidden="true"><path class="dd-stat__spark-area" d="M0 28 L3.4 26.3 L6.9 27.1 L10.3 24.6 L13.8 25.4 L17.2 23.7 L20.7 22 L24.1 22.9 L27.6 21.2 L31 19.5 L34.5 20.3 L37.9 18.6 L41.4 19.5 L44.8 17.8 L48.3 16.1 L51.7 16.9 L55.2 15.2 L58.6 16.1 L62.1 14.4 L65.5 12.7 L69 13.5 L72.4 11.8 L75.9 10.1 L79.3 11 L82.8 9.3 L86.2 10.1 L89.7 7.6 L93.1 8.4 L96.6 6.7 L100 5 L100 32 L0 32 Z"/><path class="dd-stat__spark-line" d="M0 28 L3.4 26.3 L6.9 27.1 L10.3 24.6 L13.8 25.4 L17.2 23.7 L20.7 22 L24.1 22.9 L27.6 21.2 L31 19.5 L34.5 20.3 L37.9 18.6 L41.4 19.5 L44.8 17.8 L48.3 16.1 L51.7 16.9 L55.2 15.2 L58.6 16.1 L62.1 14.4 L65.5 12.7 L69 13.5 L72.4 11.8 L75.9 10.1 L79.3 11 L82.8 9.3 L86.2 10.1 L89.7 7.6 L93.1 8.4 L96.6 6.7 L100 5"/><circle class="dd-stat__spark-dot" cx="100" cy="5" r="3"/></svg>
  </div>
  <div class="dd-stat__foot"><span class="dd-stat__delta dd-stat__delta--ok"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-up"/></svg><span class="dd-visually-hidden">Up</span>18.2%</span><span class="dd-stat__compare">vs <b>1.08B</b> in September · all regions</span></div>
</div>
```

## Bare

Drop the surface when the stats already sit inside a card or panel.

```html
<div class="dd-surface" style="padding: 25px; max-width: 460px">
  <div class="dd-row" style="--dd-gap: 40px; align-items: flex-start">
    <div class="dd-stat dd-stat--bare">
    <p class="dd-stat__label">Builds</p>
    <div class="dd-stat__main">
      <p class="dd-stat__value">284</p>
    </div>
    <div class="dd-stat__foot"><span class="dd-stat__delta dd-stat__delta--ok"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-up"/></svg><span class="dd-visually-hidden">Up</span>9%</span></div>
  </div>
    <div class="dd-stat dd-stat--bare">
    <p class="dd-stat__label">Avg. build</p>
    <div class="dd-stat__main">
      <p class="dd-stat__value">1:42<span class="dd-stat__unit">min</span></p>
    </div>
    <div class="dd-stat__foot"><span class="dd-stat__delta dd-stat__delta--ok"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-down"/></svg><span class="dd-visually-hidden">Down</span>11 s</span></div>
  </div>
    <div class="dd-stat dd-stat--bare">
    <p class="dd-stat__label">Cache hits</p>
    <div class="dd-stat__main">
      <p class="dd-stat__value">87<span class="dd-stat__unit">%</span></p>
    </div>
    <div class="dd-stat__foot"><span class="dd-stat__delta dd-stat__delta--bad"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-down"/></svg><span class="dd-visually-hidden">Down</span>2 pts</span></div>
  </div>
  </div>
</div>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-stat` | A tile on `--dd-surface`. Works on `<div>`, `<a>` and `<button>` (links and buttons step a tone on hover and press). |
| `.dd-stat__label` | Sentence-case label, no trailing colon. An icon may lead. |
| `.dd-stat__main` | Row holding the value and the sparkline; the spark shrinks (to 48px) before anything wraps. |
| `.dd-stat__value / __unit` | The figure in the display face (700, proportional figures). The unit is half size and muted. |
| `.dd-stat__foot` | Row for delta and comparison text. |
| `.dd-stat__delta` | Signed change in mono with an arrow icon. Tone: `--ok`, `--bad`, `--warn`, `--flat`. |
| `.dd-stat__compare` | Comparison text — always name the period (“vs last week”). Wrap figures in `<b>` for mono. |
| `.dd-stat__spark` | A 100×32 SVG (`viewBox="0 0 100 32"`) with `__spark-area`, `__spark-line` and `__spark-dot`. |
| `.dd-stat--hero` | The one lead figure of a view: 4xl value, wider spark. |
| `.dd-stat--bare` | No surface or padding, for use inside another container. |
| `.dd-stat--inline` | Label · value · delta on one baseline. Group with `.dd-stat-inline-group`. |
| `.dd-stat-grid` | Auto-fit grid of tiles. `--dd-stat-min` sets the minimum tile width. |
| `.dd-stat-grid--joined` | One surface split by 2px page-coloured gaps; outer corners only. |
| `--dd-stat-hover / --dd-stat-press` | Fill of a linked tile on hover and press, set per theme. |

## Guidelines

Do:
- Compact large values: 1,284 · 41.3K · $4.2M · 1.28B. Keep the full figure in a tooltip or table.
- Name the comparison period in the compare text: “vs 36.7K last week”.
- Colour a delta by whether the change is good for that metric, not by its sign.
- Keep sparklines to ~12 points in the de-emphasis tone; they show shape, not values.

Don't:
- Don’t put more than one hero figure on a view.
- Don’t colour the value itself red or green — the delta carries the tone.
- Don’t add axes or labels to a sparkline; if the values matter, use a chart.
- Don’t show a delta without saying what it is compared against.

