# loader — `loader`

The ampersand from the logo, set moving — the brand’s own way to say “loading” wherever a page or a panel waits. Sunrise is the default (a sun rising behind the &, cut out like the logo’s second line), with nine alternatives, each the real Outfit 800 & from the wordmark.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/loader

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

## Variants

Every variant in dawn (left) and dusk (right), at `--lg`. They share one outer element and one set of sizes; only the inside differs. #4 Sunrise (`.dd-loader--sun`) is the default; reach for another only when a product needs a different mood, and use one per product.

## Markup, variant by variant

Open Code to copy a variant. The outer `.dd-loader` carries `role="status"` and the label; everything inside is `aria-hidden`. Sky, Sunrise, Horizon and Cut draw the glyph with a CSS mask and need no path data at all.

### #1 Ink

Written stroke by stroke with a broad pen — the main stroke, then the bowl — then lifted away the way it was written.

```html
<span class="dd-loader dd-loader--ink dd-loader--xl" role="status" aria-label="Loading"><span class="dd-loader__glyph" aria-hidden="true"></span><svg class="dd-loader__b" viewBox="-2 -755 740 800" aria-hidden="true" focusable="false"><path pathLength="1" d="M262 -372C253.5 -369 231.3 -366.3 211 -354C190.7 -341.7 156.2 -321.5 140 -298C123.8 -274.5 114.8 -239.7 114 -213C113.2 -186.3 120.7 -159.8 135 -138C149.3 -116.2 177 -93.7 200 -82C223 -70.3 248.8 -68 273 -68C297.2 -68 321 -70.8 345 -82C369 -93.2 399.2 -120 417 -135C434.8 -150 446.2 -165.8 452 -172"/></svg><svg class="dd-loader__a" viewBox="-2 -755 740 800" aria-hidden="true" focusable="false"><path pathLength="1" d="M520 -505C511.8 -515.7 491 -548.8 471 -569C451 -589.2 423.5 -614 400 -626C376.5 -638 354.7 -642 330 -641C305.3 -640 272.8 -631.5 252 -620C231.2 -608.5 215.3 -589.8 205 -572C194.7 -554.2 190.3 -532.3 190 -513C189.7 -480 205 -440 235 -403L650 55"/></svg></span>
```

### #2 Trace

An apricot line traces the outline, ink floods in behind it, then the glyph fades back to its track.

```html
<span class="dd-loader dd-loader--trace dd-loader--xl" role="status" aria-label="Loading"><span class="dd-loader__glyph" aria-hidden="true"></span><svg viewBox="-2 -755 740 800" aria-hidden="true" focusable="false"><path class="dd-loader__line" pathLength="1" d="M499 0L452.2 -51.7Q442.4 -43.8 430.5 -36Q400 -16 359.5 -2.5Q319 11 272 11Q200 11 146.5 -18Q93 -47 63.5 -96.5Q34 -146 34 -207Q34 -274 68.5 -326.5Q95.5 -367.5 145.4 -396.7Q133.2 -415.3 125.5 -433Q109 -471 109 -516Q109 -570 137 -616.5Q165 -663 214 -692Q263 -721 328 -721Q379 -721 418.5 -706.5Q458 -692 486 -670Q514 -648 528 -625L415 -514Q396 -540 376 -551Q356 -562 332 -562Q306 -562 289 -547Q272 -532 272 -511Q272 -494 280 -479.5Q288 -465 302 -448L702 0Z"/><path class="dd-loader__line" pathLength="1" d="M235.7 -290.5Q217.8 -281 208 -265.5Q195 -245 195 -220Q195 -200 204.5 -183Q214 -166 232 -156Q250 -146 275 -146Q300 -146 320.5 -157.5Q331.6 -163.7 341.4 -173.9Z"/></svg></span>
```

### #3 Sky

The Golden hour set drifts through the glyph along its leg, honey through wine and round to honey again.

```html
<span class="dd-loader dd-loader--sky dd-loader--xl" role="status" aria-label="Loading"><span class="dd-loader__glyph" aria-hidden="true"><i></i></span></span>
```

### #4 Sunrise

A big sun rises behind the & from the baseline and sets again. The & is cut out of it, like the logo’s second line.

```html
<span class="dd-loader dd-loader--sun dd-loader--xl" role="status" aria-label="Loading"><span class="dd-loader__sky" aria-hidden="true"><i></i></span><span class="dd-loader__glyph" aria-hidden="true"></span></span>
```

### #5 Horizon

Dawn light rises through the & from the baseline, then dusk ink rises over it, and again.

```html
<span class="dd-loader dd-loader--horizon dd-loader--xl" role="status" aria-label="Loading"><span class="dd-loader__glyph" aria-hidden="true"><i></i></span></span>
```

### #6 Breathe

The & breathes from Outfit Black down to Thin and back — the font’s own outlines, interpolated.

```html
<span class="dd-loader dd-loader--weight dd-loader--xl" role="status" aria-label="Loading"><svg viewBox="-2 -755 740 800" aria-hidden="true" focusable="false"><path class="dd-loader__morph" d="M486 0L170 -349Q132 -392 116.5 -430Q101 -468 101 -513Q101 -568 129.5 -616Q158 -664 208.5 -694Q259 -724 326 -724Q380 -724 420.5 -709.5Q461 -695 489 -673.5Q517 -652 530 -631L405 -506Q387 -531 369 -539.5Q351 -548 331 -548Q309 -548 295.5 -535.5Q282 -523 282 -506Q282 -495 287.5 -483Q293 -471 304 -458L712 0ZM262 12Q190 12 136.5 -17.5Q83 -47 53.5 -97Q24 -147 24 -208Q24 -276 59 -329.5Q94 -383 167 -416L247 -284Q224 -277 213.5 -260Q203 -243 203 -224Q203 -209 210 -195Q217 -181 231 -172Q245 -163 265 -163Q282 -163 298 -171.5Q314 -180 330 -203L465 -74Q451 -56 421.5 -36Q392 -16 351 -2Q310 12 262 12Z"><animate attributeName="d" dur="2.56s" repeatCount="indefinite" calcMode="spline" keyTimes="0;.5;1" keySplines=".45 0 .55 1;.45 0 .55 1" values="M486 0L170 -349Q132 -392 116.5 -430Q101 -468 101 -513Q101 -568 129.5 -616Q158 -664 208.5 -694Q259 -724 326 -724Q380 -724 420.5 -709.5Q461 -695 489 -673.5Q517 -652 530 -631L405 -506Q387 -531 369 -539.5Q351 -548 331 -548Q309 -548 295.5 -535.5Q282 -523 282 -506Q282 -495 287.5 -483Q293 -471 304 -458L712 0ZM262 12Q190 12 136.5 -17.5Q83 -47 53.5 -97Q24 -147 24 -208Q24 -276 59 -329.5Q94 -383 167 -416L247 -284Q224 -277 213.5 -260Q203 -243 203 -224Q203 -209 210 -195Q217 -181 231 -172Q245 -163 265 -163Q282 -163 298 -171.5Q314 -180 330 -203L465 -74Q451 -56 421.5 -36Q392 -16 351 -2Q310 12 262 12Z;M588 0L256 -335Q212 -379 191.5 -421Q171 -463 171 -509Q171 -562 193.5 -601.5Q216 -641 257 -663.5Q298 -686 351 -686Q386 -686 416 -676Q446 -666 470.5 -647.5Q495 -629 512 -601L489 -578Q464 -616 429.5 -635.5Q395 -655 352 -655Q285 -655 244 -614.5Q203 -574 203 -506Q203 -465 221 -430Q239 -395 284 -350L633 0ZM311 10Q251 10 204 -15.5Q157 -41 130 -85Q103 -129 103 -186Q103 -250 137 -304.5Q171 -359 227 -386L246 -364Q197 -342 166 -292.5Q135 -243 135 -186Q135 -138 158 -100.5Q181 -63 221 -41.5Q261 -20 312 -20Q368 -20 416 -46.5Q464 -73 489 -119L510 -98Q491 -65 460.5 -40.5Q430 -16 392 -3Q354 10 311 10Z;M486 0L170 -349Q132 -392 116.5 -430Q101 -468 101 -513Q101 -568 129.5 -616Q158 -664 208.5 -694Q259 -724 326 -724Q380 -724 420.5 -709.5Q461 -695 489 -673.5Q517 -652 530 -631L405 -506Q387 -531 369 -539.5Q351 -548 331 -548Q309 -548 295.5 -535.5Q282 -523 282 -506Q282 -495 287.5 -483Q293 -471 304 -458L712 0ZM262 12Q190 12 136.5 -17.5Q83 -47 53.5 -97Q24 -147 24 -208Q24 -276 59 -329.5Q94 -383 167 -416L247 -284Q224 -277 213.5 -260Q203 -243 203 -224Q203 -209 210 -195Q217 -181 231 -172Q245 -163 265 -163Q282 -163 298 -171.5Q314 -180 330 -203L465 -74Q451 -56 421.5 -36Q392 -16 351 -2Q310 12 262 12Z"/></path></svg><span class="dd-loader__glyph" aria-hidden="true"></span></span>
```

### #7 Firefly

A small apricot light with a short tail runs round the outline of a faint &.

```html
<span class="dd-loader dd-loader--firefly dd-loader--xl" role="status" aria-label="Loading"><span class="dd-loader__glyph" aria-hidden="true"></span><svg viewBox="-2 -755 740 800" aria-hidden="true" focusable="false"><path class="dd-loader__tail" pathLength="1" d="M499 0L452.2 -51.7Q442.4 -43.8 430.5 -36Q400 -16 359.5 -2.5Q319 11 272 11Q200 11 146.5 -18Q93 -47 63.5 -96.5Q34 -146 34 -207Q34 -274 68.5 -326.5Q95.5 -367.5 145.4 -396.7Q133.2 -415.3 125.5 -433Q109 -471 109 -516Q109 -570 137 -616.5Q165 -663 214 -692Q263 -721 328 -721Q379 -721 418.5 -706.5Q458 -692 486 -670Q514 -648 528 -625L415 -514Q396 -540 376 -551Q356 -562 332 -562Q306 -562 289 -547Q272 -532 272 -511Q272 -494 280 -479.5Q288 -465 302 -448L702 0Z"/><path class="dd-loader__spark" pathLength="1" d="M499 0L452.2 -51.7Q442.4 -43.8 430.5 -36Q400 -16 359.5 -2.5Q319 11 272 11Q200 11 146.5 -18Q93 -47 63.5 -96.5Q34 -146 34 -207Q34 -274 68.5 -326.5Q95.5 -367.5 145.4 -396.7Q133.2 -415.3 125.5 -433Q109 -471 109 -516Q109 -570 137 -616.5Q165 -663 214 -692Q263 -721 328 -721Q379 -721 418.5 -706.5Q458 -692 486 -670Q514 -648 528 -625L415 -514Q396 -540 376 -551Q356 -562 332 -562Q306 -562 289 -547Q272 -532 272 -511Q272 -494 280 -479.5Q288 -465 302 -448L702 0Z"/></svg></span>
```

### #8 Tones

The & turns through all eight Golden hour colours; the bowl follows the main stroke half a beat behind.

```html
<span class="dd-loader dd-loader--tones dd-loader--xl" role="status" aria-label="Loading"><svg viewBox="-2 -755 740 800" aria-hidden="true" focusable="false"><path class="dd-loader__b" d="M272 11Q200 11 146.5 -18Q93 -47 63.5 -96.5Q34 -146 34 -207Q34 -274 68.5 -326.5Q103 -379 175 -412L248 -296Q221 -286 208 -265.5Q195 -245 195 -220Q195 -200 204.5 -183Q214 -166 232 -156Q250 -146 275 -146Q300 -146 320.5 -157.5Q341 -169 357 -194L477 -76Q461 -56 430.5 -36Q400 -16 359.5 -2.5Q319 11 272 11Z"/><path class="dd-loader__a" d="M499 0L179 -353Q142 -395 125.5 -433Q109 -471 109 -516Q109 -570 137 -616.5Q165 -663 214 -692Q263 -721 328 -721Q379 -721 418.5 -706.5Q458 -692 486 -670Q514 -648 528 -625L415 -514Q396 -540 376 -551Q356 -562 332 -562Q306 -562 289 -547Q272 -532 272 -511Q272 -494 280 -479.5Q288 -465 302 -448L702 0Z"/></svg></span>
```

### #9 Cut

The logo’s knocked-out gap slides through the ink &, parallel to its leg. A real cut: the page shows through.

```html
<span class="dd-loader dd-loader--cut dd-loader--xl" role="status" aria-label="Loading"><span class="dd-loader__glyph" aria-hidden="true"><i></i></span></span>
```

### #10 Join

The two strokes drift in from opposite corners, lock into the glyph, hold, then drift apart.

```html
<span class="dd-loader dd-loader--join dd-loader--xl" role="status" aria-label="Loading"><span class="dd-loader__glyph" aria-hidden="true"></span><svg viewBox="-2 -755 740 800" aria-hidden="true" focusable="false"><path class="dd-loader__b" d="M272 11Q200 11 146.5 -18Q93 -47 63.5 -96.5Q34 -146 34 -207Q34 -274 68.5 -326.5Q103 -379 175 -412L248 -296Q221 -286 208 -265.5Q195 -245 195 -220Q195 -200 204.5 -183Q214 -166 232 -156Q250 -146 275 -146Q300 -146 320.5 -157.5Q341 -169 357 -194L477 -76Q461 -56 430.5 -36Q400 -16 359.5 -2.5Q319 11 272 11Z"/><path class="dd-loader__a" d="M499 0L179 -353Q142 -395 125.5 -433Q109 -471 109 -516Q109 -570 137 -616.5Q165 -663 214 -692Q263 -721 328 -721Q379 -721 418.5 -706.5Q458 -692 486 -670Q514 -648 528 -625L415 -514Q396 -540 376 -551Q356 -562 332 -562Q306 -562 289 -547Q272 -532 272 -511Q272 -494 280 -479.5Q288 -465 302 -448L702 0Z"/></svg></span>
```

## Sizes

sm 20 · md 32 (default) · lg 56 · xl 96px tall; the box is 0.925 of the height wide. Every variant takes every size, and thin lines (Trace, Firefly) thicken a little as the glyph gets smaller so they stay legible. Inside `.dd-page-loader` the default is 64px; inside `.dd-loading` it follows the text.

```html
<div class="dd-row" style="--dd-gap: var(--dd-space-8); align-items: flex-end">
  <span class="dd-loader dd-loader--sun dd-loader--sm" role="status" aria-label="Loading"><span class="dd-loader__sky" aria-hidden="true"><i></i></span><span class="dd-loader__glyph" aria-hidden="true"></span></span>
  <span class="dd-loader dd-loader--sun" role="status" aria-label="Loading"><span class="dd-loader__sky" aria-hidden="true"><i></i></span><span class="dd-loader__glyph" aria-hidden="true"></span></span>
  <span class="dd-loader dd-loader--sun dd-loader--lg" role="status" aria-label="Loading"><span class="dd-loader__sky" aria-hidden="true"><i></i></span><span class="dd-loader__glyph" aria-hidden="true"></span></span>
  <span class="dd-loader dd-loader--sun dd-loader--xl" role="status" aria-label="Loading"><span class="dd-loader__sky" aria-hidden="true"><i></i></span><span class="dd-loader__glyph" aria-hidden="true"></span></span>
</div>
```

## Colour

The ink is `currentColor` — `--dd-text`, like the logo — so a quieter colour on the loader or its parent works. `--dd-loader-accent` (apricot primary by default) colours Trace’s line, Horizon’s dawn and Firefly’s light; `--dd-loader-track` is the faint glyph behind Ink, Trace, Firefly and Join. Sky, Sunrise and Tones use the Golden hour set as it is.

```html
<div class="dd-row" style="--dd-gap: var(--dd-space-8); align-items: flex-end">
  <span class="dd-loader dd-loader--ink dd-loader--lg" role="status" aria-label="Loading"><span class="dd-loader__glyph" aria-hidden="true"></span><svg class="dd-loader__b" viewBox="-2 -755 740 800" aria-hidden="true" focusable="false"><path pathLength="1" d="M262 -372C253.5 -369 231.3 -366.3 211 -354C190.7 -341.7 156.2 -321.5 140 -298C123.8 -274.5 114.8 -239.7 114 -213C113.2 -186.3 120.7 -159.8 135 -138C149.3 -116.2 177 -93.7 200 -82C223 -70.3 248.8 -68 273 -68C297.2 -68 321 -70.8 345 -82C369 -93.2 399.2 -120 417 -135C434.8 -150 446.2 -165.8 452 -172"/></svg><svg class="dd-loader__a" viewBox="-2 -755 740 800" aria-hidden="true" focusable="false"><path pathLength="1" d="M520 -505C511.8 -515.7 491 -548.8 471 -569C451 -589.2 423.5 -614 400 -626C376.5 -638 354.7 -642 330 -641C305.3 -640 272.8 -631.5 252 -620C231.2 -608.5 215.3 -589.8 205 -572C194.7 -554.2 190.3 -532.3 190 -513C189.7 -480 205 -440 235 -403L650 55"/></svg></span>
  <span class="dd-loader dd-loader--ink dd-loader--lg" style="color: var(--dd-muted)" role="status" aria-label="Loading"><span class="dd-loader__glyph" aria-hidden="true"></span><svg class="dd-loader__b" viewBox="-2 -755 740 800" aria-hidden="true" focusable="false"><path pathLength="1" d="M262 -372C253.5 -369 231.3 -366.3 211 -354C190.7 -341.7 156.2 -321.5 140 -298C123.8 -274.5 114.8 -239.7 114 -213C113.2 -186.3 120.7 -159.8 135 -138C149.3 -116.2 177 -93.7 200 -82C223 -70.3 248.8 -68 273 -68C297.2 -68 321 -70.8 345 -82C369 -93.2 399.2 -120 417 -135C434.8 -150 446.2 -165.8 452 -172"/></svg><svg class="dd-loader__a" viewBox="-2 -755 740 800" aria-hidden="true" focusable="false"><path pathLength="1" d="M520 -505C511.8 -515.7 491 -548.8 471 -569C451 -589.2 423.5 -614 400 -626C376.5 -638 354.7 -642 330 -641C305.3 -640 272.8 -631.5 252 -620C231.2 -608.5 215.3 -589.8 205 -572C194.7 -554.2 190.3 -532.3 190 -513C189.7 -480 205 -440 235 -403L650 55"/></svg></span>
  <span class="dd-loader dd-loader--trace dd-loader--lg" style="--dd-loader-accent: var(--dd-set-5)" role="status" aria-label="Loading"><span class="dd-loader__glyph" aria-hidden="true"></span><svg viewBox="-2 -755 740 800" aria-hidden="true" focusable="false"><path class="dd-loader__line" pathLength="1" d="M499 0L452.2 -51.7Q442.4 -43.8 430.5 -36Q400 -16 359.5 -2.5Q319 11 272 11Q200 11 146.5 -18Q93 -47 63.5 -96.5Q34 -146 34 -207Q34 -274 68.5 -326.5Q95.5 -367.5 145.4 -396.7Q133.2 -415.3 125.5 -433Q109 -471 109 -516Q109 -570 137 -616.5Q165 -663 214 -692Q263 -721 328 -721Q379 -721 418.5 -706.5Q458 -692 486 -670Q514 -648 528 -625L415 -514Q396 -540 376 -551Q356 -562 332 -562Q306 -562 289 -547Q272 -532 272 -511Q272 -494 280 -479.5Q288 -465 302 -448L702 0Z"/><path class="dd-loader__line" pathLength="1" d="M235.7 -290.5Q217.8 -281 208 -265.5Q195 -245 195 -220Q195 -200 204.5 -183Q214 -166 232 -156Q250 -146 275 -146Q300 -146 320.5 -157.5Q331.6 -163.7 341.4 -173.9Z"/></svg></span>
  <span class="dd-loader dd-loader--horizon dd-loader--lg" style="--dd-loader-accent: var(--dd-set-6)" role="status" aria-label="Loading"><span class="dd-loader__glyph" aria-hidden="true"><i></i></span></span>
</div>
```

## Page and section loading

Compose with the page loader from Spinner: the loader goes where the spinner would, the container keeps `role="status"` and the words, and the loader itself is `aria-hidden`. `--overlay` lays it over content that is being recalculated (its parent needs `position: relative`).

```html
<div class="dd-page-loader" role="status" style="min-height: 280px">
  <span class="dd-loader dd-loader--sun dd-loader--xl" aria-hidden="true"><span class="dd-loader__sky" aria-hidden="true"><i></i></span><span class="dd-loader__glyph" aria-hidden="true"></span></span>
  <p class="dd-page-loader__label">Loading dashboard</p>
  <p class="dd-page-loader__meta">cxkw.dev · 3 regions</p>
</div>
```

```html
<div style="position: relative; min-height: 240px; padding: var(--dd-space-6)">
  <p class="dd-eyebrow">billing-worker · invoices</p>
  <p class="dd-h3" style="margin: var(--dd-space-2) 0 var(--dd-space-4)">october</p>
  <p class="dd-text dd-muted">142 invoices · $18,420.00 · 3 overdue</p>
  <p class="dd-text dd-muted">Last sync 09:41 UTC</p>
  <div class="dd-page-loader dd-page-loader--overlay" role="status">
    <span class="dd-loader dd-loader--sun dd-loader--lg" aria-hidden="true"><span class="dd-loader__sky" aria-hidden="true"><i></i></span><span class="dd-loader__glyph" aria-hidden="true"></span></span>
    <p class="dd-page-loader__label">Recalculating totals</p>
  </div>
</div>
```

For a booting app, use the same markup with `dd-page-loader--fixed` instead of `--overlay` (it covers the viewport) and an `--xl` loader. Show the full-page loader

## In a card

When one panel waits, load that panel — not the page. Centre the loader in the space the content will fill, with a line of meta saying what’s coming.

```html
<div class="dd-card-grid">
  <article class="dd-card">
    <div class="dd-card__body">
      <p class="dd-card__eyebrow">edge-cache · fra1</p>
      <h3 class="dd-card__title">Hit rate</h3>
      <div class="dd-page-loader" role="status" style="min-height: 150px; padding: var(--dd-space-4)">
        <span class="dd-loader dd-loader--sun dd-loader--lg" aria-hidden="true"><span class="dd-loader__sky" aria-hidden="true"><i></i></span><span class="dd-loader__glyph" aria-hidden="true"></span></span>
        <p class="dd-page-loader__meta" style="margin: 0">Loading the last 24h…</p>
      </div>
    </div>
  </article>
  <article class="dd-card">
    <div class="dd-card__body">
      <p class="dd-card__eyebrow">insomnia · deploys</p>
      <h3 class="dd-card__title">Release notes</h3>
      <div class="dd-page-loader" role="status" style="min-height: 150px; padding: var(--dd-space-4)">
        <span class="dd-loader dd-loader--sun dd-loader--lg" aria-hidden="true"><span class="dd-loader__sky" aria-hidden="true"><i></i></span><span class="dd-loader__glyph" aria-hidden="true"></span></span>
        <p class="dd-page-loader__meta" style="margin: 0">Reading 12 commits…</p>
      </div>
    </div>
  </article>
</div>
```

## Inline

Beside text in a `.dd-loading` row the glyph sizes itself to the type. For loading buttons and very small waits, the ring Spinner is still the better fit.

```html
<div class="dd-stack" style="--dd-gap: var(--dd-space-4)">
  <span class="dd-loading" role="status"><span class="dd-loader dd-loader--sun" aria-hidden="true"><span class="dd-loader__sky" aria-hidden="true"><i></i></span><span class="dd-loader__glyph" aria-hidden="true"></span></span>Loading deploys…</span>
  <span class="dd-loading" role="status"><span class="dd-loader dd-loader--sun" aria-hidden="true"><span class="dd-loader__sky" aria-hidden="true"><i></i></span><span class="dd-loader__glyph" aria-hidden="true"></span></span><span>Fetching logs from <span class="dd-mono">auth-gateway</span> · iad1</span></span>
</div>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-loader` | The loader, 32px tall, ink in `currentColor` (`--dd-text`). Give it `role="status"` and an `aria-label` — or `aria-hidden="true"` when it sits inside something that already has them. |
| `.dd-loader--ink / --trace / --sky / --sun / --horizon / --weight / --firefly / --tones / --cut / --join` | The ten variants, #1 to #10. Each has its own inner markup — copy it from the examples above. |
| `.dd-loader--sm / --lg / --xl` | 20 / 56 / 96px. 64px by default in `.dd-page-loader`; 1.5em in `.dd-loading`. |
| `.dd-loader__glyph` | The ampersand as a window (a CSS mask): its background and children show only inside the glyph. |
| `.dd-loader__a / __b` | The glyph’s two strokes — the main stroke with its leg, and the bowl — or the pen paths that write them (Ink). |
| `.dd-loader__line / __tail / __spark / __morph / __sky` | Variant parts: Trace’s outline, Firefly’s tail and light, Breathe’s morphing path, Sunrise’s sky. |
| `--dd-loader-accent` | Accent for Trace, Horizon and Firefly. Defaults to `--dd-primary`. |
| `--dd-loader-track` | The faint glyph behind Ink, Trace, Firefly and Join. Defaults to 14% of the ink. |

## Motion

Every loop is a multiple of `--dd-dur` (2.2–3.8s) eased with `--dd-ease`, and each one ends exactly where it began, so the loop never jumps. Variants move only `transform`, `opacity`, `stroke-dashoffset` and masks, except Breathe, which morphs the path with SVG `<animate>` (2.56s) because CSS can’t interpolate path data in every browser. Tones animates `fill`.

Under `prefers-reduced-motion` nothing travels: each variant rests on the whole glyph (Horizon in dawn light, Tones in apricot, Sunrise with the sun up behind it, Firefly with its light parked) and the loader fades slowly between full and 40% instead, so it still reads as working, never as done.

## Guidelines

Do:
- Choose one variant for the product and use it everywhere a page or panel waits.
- Say what’s loading beside it: “Loading dashboard”.
- Wait ~300ms before showing it so fast loads don’t flash.
- Use `--xl` for a booting app, `--lg` for a panel.

Don't:
- Don’t mix variants in one product, or show more than one loader in a view.
- Don’t use it inside buttons or for progress you can measure — use Spinner or Progress.
- Don’t recolour it with status colours; it’s the brand, not a state.
- Don’t redraw or restyle the ampersand — it’s the logo’s.

