# logo — `logo`

The dawn & dusk wordmark: Outfit 800, tracked in to -0.055em, always lowercase. One line is the default; the stacked lockup and the “d&” tile come from the same letters.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/logo

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### One line

The default mark. It is set in currentColor, so it follows dawn and dusk and whatever block it sits on.

```html
<span class="dd-logo dd-logo--xl">dawn &amp; dusk</span>
```

## Sizes

Six steps from 64px down to 15px. The top bar uses the default (22px); the docs header and email footers use `--sm`. Below 15px, switch to the tile.

```html
<div class="dd-stack" style="--dd-gap: 22px">
  <span class="dd-logo dd-logo--2xl">dawn &amp; dusk</span>
  <span class="dd-logo dd-logo--xl">dawn &amp; dusk</span>
  <span class="dd-logo dd-logo--lg">dawn &amp; dusk</span>
  <span class="dd-logo">dawn &amp; dusk</span>
  <span class="dd-logo dd-logo--sm">dawn &amp; dusk</span>
  <span class="dd-logo dd-logo--xs">dawn &amp; dusk</span>
</div>
```

## Stacked lockup

“dawn” over “& dusk”, with the second line cut out of the first by a stroke in the colour behind it. Use it where there is height to spare: covers, splash screens, the about page. On anything but the page background, set `--dd-logo-bg` (the colour blocks below do it for you).

```html
<div class="dd-row" style="--dd-gap: 48px; align-items: flex-end">
  <span class="dd-logo dd-logo--stack dd-logo--2xl" role="img" aria-label="dawn &amp; dusk">
    <span class="dd-logo__line" aria-hidden="true">dawn</span>
    <span class="dd-logo__line" aria-hidden="true"><span class="dd-logo__amp">&amp;</span>dusk</span>
  </span>
  <span class="dd-logo dd-logo--stack dd-logo--lg" role="img" aria-label="dawn &amp; dusk">
    <span class="dd-logo__line" aria-hidden="true">dawn</span>
    <span class="dd-logo__line" aria-hidden="true"><span class="dd-logo__amp">&amp;</span>dusk</span>
  </span>
</div>
```

## On dawn, dusk and primary

The mark never changes colour on its own — only the ground does. Scope a theme with `data-theme`, or use a colour block.

```html
<div class="logo-grounds logo-tray">
  <div class="dd-logo-block" data-theme="dawn"><span class="dd-logo dd-logo--lg">dawn &amp; dusk</span></div>
  <div class="dd-logo-block" data-theme="dusk"><span class="dd-logo dd-logo--lg">dawn &amp; dusk</span></div>
  <div class="dd-logo-block dd-logo-block--primary"><span class="dd-logo dd-logo--lg">dawn &amp; dusk</span></div>
  <div class="dd-logo-block dd-logo-block--ink">
    <span class="dd-logo dd-logo--stack dd-logo--lg" role="img" aria-label="dawn &amp; dusk">
      <span class="dd-logo__line" aria-hidden="true">dawn</span>
      <span class="dd-logo__line" aria-hidden="true"><span class="dd-logo__amp">&amp;</span>dusk</span>
    </span>
  </div>
</div>
```

## Favicon tile

“d&” in the page colour on an ink square, corners at 22%. It is the favicon, the app icon and the logo at the top of the side nav. Primary and paper versions are for social cards and light chrome.

```html
<div class="dd-row logo-tray" style="--dd-gap: 20px; align-items: flex-end">
  <span class="dd-logo-tile dd-logo-tile--96" role="img" aria-label="dawn &amp; dusk">d&amp;</span>
  <span class="dd-logo-tile dd-logo-tile--64" role="img" aria-label="dawn &amp; dusk">d&amp;</span>
  <span class="dd-logo-tile" role="img" aria-label="dawn &amp; dusk">d&amp;</span>
  <span class="dd-logo-tile dd-logo-tile--32" role="img" aria-label="dawn &amp; dusk">d&amp;</span>
  <span class="dd-logo-tile dd-logo-tile--24" role="img" aria-label="dawn &amp; dusk">d&amp;</span>
  <span class="dd-logo-tile dd-logo-tile--16" role="img" aria-label="dawn &amp; dusk">d&amp;</span>
  <span class="dd-logo-tile dd-logo-tile--64 dd-logo-tile--primary" role="img" aria-label="dawn &amp; dusk">d&amp;</span>
  <span class="dd-logo-tile dd-logo-tile--64 dd-logo-tile--paper" role="img" aria-label="dawn &amp; dusk">d&amp;</span>
</div>
```

## Clear space

Leave at least one x — the height of the lowercase “a” — on every side. At 22px that is about 11px.

```html
<div class="logo-cs-wrap">
  <div class="logo-cs">
    <span class="dd-logo dd-logo--xl">dawn &amp; dusk</span>
    <span class="logo-cs-x logo-cs-t">x</span><span class="logo-cs-x logo-cs-b">x</span>
    <span class="logo-cs-x logo-cs-l">x</span><span class="logo-cs-x logo-cs-r">x</span>
  </div>
  <p class="dd-caption dd-mono">x = the height of the “a”. Keep text, edges and other marks outside the dashed line.</p>
</div>
```

## In context

The one-line mark in a site header, and the tile beside a project name.

```html
<div class="dd-stack" style="--dd-gap: 16px">
  <div class="logo-ctx">
    <a class="dd-logo dd-logo--sm" href="#">dawn &amp; dusk</a>
    <span class="dd-small dd-muted" style="margin-left:auto">Docs · Changelog · GitHub</span>
  </div>
  <div class="logo-ctx">
    <span class="dd-logo-tile dd-logo-tile--32" aria-hidden="true">d&amp;</span>
    <span class="dd-small"><b>dawn-and-dusk</b> <span class="dd-muted">· deployed 4m ago</span></span>
  </div>
</div>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-logo` | The one-line wordmark. Inherits colour; works on `<span>` and `<a>`. |
| `.dd-logo--xs / --sm / --lg / --xl / --2xl` | 15 · 18 · 32 · 46 · 64px. Default is 22px. Or set `--dd-logo-size`. |
| `.dd-logo--stack` | Stacked lockup. Two `.dd-logo__line` children; wrap the ampersand in `.dd-logo__amp`. Give it `role="img"` and an `aria-label`. |
| `--dd-logo-bg` | The colour of the cut-out stroke on the second line. Defaults to `--dd-bg`. |
| `.dd-logo--muted / --accent` | Muted or accent colourway, for footers and credits. |
| `.dd-logo-block` | A padded block that sets the ground. `--surface`, `--ink`, `--primary`. |
| `.dd-logo-tile` | “d&” tile, 40px. `--16 / --24 / --32 / --64 / --96`, or set `--dd-tile`; `--primary`, `--paper`. |

## Guidelines

Do:
- Write it lowercase with the ampersand: “dawn & dusk”.
- Use one line in bars and headers; save the stack for big, quiet moments.
- Switch to the tile below 15px or when space is square.

Don't:
- Don’t recolour the mark with status or categorical colours.
- Don’t stretch, outline, or add effects to the letters.
- Don’t set the wordmark in another font or open up the tracking.

