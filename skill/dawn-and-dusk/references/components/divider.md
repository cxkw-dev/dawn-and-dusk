# divider — `divider`

A hairline between things that belong apart. Use it sparingly — in dawn & dusk, space and tone separate most content before a line has to.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/divider

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### Horizontal

A plain hr that brings its own spacing: 20px above and below.

```html
<div style="max-width: 520px">
  <p class="dd-text dd-small">auth-gateway is healthy in both regions.</p>
  <hr class="dd-divider">
  <p class="dd-text dd-small dd-muted">Last deploy 4m ago · a3f9c2e</p>
</div>
```

## Vertical

Splits groups inside a toolbar or a meta line. It stretches to the height of the row.

```html
<div class="dd-row" style="--dd-gap: 0">
  <button class="dd-btn dd-btn--ghost dd-btn--sm"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-copy"/></svg><span>Copy</span></button>
  <button class="dd-btn dd-btn--ghost dd-btn--sm"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-download"/></svg><span>Export</span></button>
  <hr class="dd-divider dd-divider--vertical" aria-orientation="vertical">
  <button class="dd-btn dd-btn--ghost dd-btn--sm dd-btn--icon" aria-label="Filter"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-filter"/></svg></button>
  <button class="dd-btn dd-btn--ghost dd-btn--sm dd-btn--icon" aria-label="Sort"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-sort"/></svg></button>
  <hr class="dd-divider dd-divider--vertical" aria-orientation="vertical">
  <span class="dd-small dd-muted dd-mono">1,284 rows</span>
</div>
```

## With label

A `role="separator"` element with a short mono label. Centred for choices (“or”), start-aligned to name the section that follows.

```html
<div class="dd-stack" style="max-width: 420px">
  <button class="dd-btn dd-btn--secondary dd-btn--block"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-key"/></svg><span>Continue with passkey</span></button>
  <div class="dd-divider dd-divider--label" role="separator">or</div>
  <button class="dd-btn dd-btn--ghost dd-btn--block"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-mail"/></svg><span>Email me a link</span></button>
</div>
```

```html
<div style="max-width: 560px">
  <p class="dd-text dd-small">#4821 · auth-gateway · live</p>
  <p class="dd-text dd-small">#4820 · billing-worker · failed</p>
  <div class="dd-divider dd-divider--label dd-divider--start" role="separator">older deploys</div>
  <p class="dd-text dd-small dd-muted">#4819 · edge-cache · rolled back</p>
  <p class="dd-text dd-small dd-muted">#4818 · auth-gateway · live</p>
</div>
```

## Spacing

Three amounts of space around the line, and a firmer line for when the hairline is too quiet.

```html
<div style="max-width: 520px">
  <p class="dd-text dd-small dd-muted">tight · 10px</p>
  <hr class="dd-divider dd-divider--tight">
  <p class="dd-text dd-small dd-muted">default · 20px</p>
  <hr class="dd-divider">
  <p class="dd-text dd-small dd-muted">loose · 40px</p>
  <hr class="dd-divider dd-divider--loose">
  <p class="dd-text dd-small dd-muted">strong line</p>
  <hr class="dd-divider dd-divider--strong">
</div>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-divider` | Horizontal hairline (`--dd-text` at 10%) with 20px space above and below. Use on `<hr>`. |
| `.dd-divider--vertical` | Vertical line between inline items; add `aria-orientation="vertical"`. |
| `.dd-divider--label` | Labelled divider on a `role="separator"` element. Centred by default. |
| `.dd-divider--start` | With `--label`: text at the start, line after. |
| `.dd-divider--tight / --loose` | 10px or 40px of space instead of 20px. |
| `.dd-divider--strong` | Uses `--dd-border-strong` for a firmer line. |

## Guidelines

Do:
- Reach for space and tone first; add a divider only when two blocks would otherwise read as one.
- Keep labels to one or two words.

Don't:
- Don’t box content with dividers on all sides — use a card.
- Don’t stack a divider directly under a heading.

