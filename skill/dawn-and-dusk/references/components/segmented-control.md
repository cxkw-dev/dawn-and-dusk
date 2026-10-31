# segmented control — `segmented-control`

One choice from a small set, all visible at once. A tonal track; the chosen segment takes the deeper selected tone.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/segmented-control

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### Default

Two to five short options that switch a view or a filter. Try it: click a segment, or Tab in and use the arrow keys.

```html
<div class="dd-stack" style="--dd-gap: 15px; align-items: flex-start">
  <div class="dd-segmented" data-dd-segmented role="radiogroup" aria-label="Time range">
  <button class="dd-segmented__item" role="radio" aria-checked="false">1h</button>
  <button class="dd-segmented__item" role="radio" aria-checked="true">24h</button>
  <button class="dd-segmented__item" role="radio" aria-checked="false">7d</button>
  <button class="dd-segmented__item" role="radio" aria-checked="false">30d</button>
</div>
  <div class="dd-segmented" data-dd-segmented role="radiogroup" aria-label="Signal">
  <button class="dd-segmented__item" role="radio" aria-checked="true">Logs</button>
  <button class="dd-segmented__item" role="radio" aria-checked="false">Metrics</button>
  <button class="dd-segmented__item" role="radio" aria-checked="false">Traces</button>
</div>
</div>
```

## Sizes

Small for toolbars and dense headers, medium by default, large for settings and onboarding.

```html
<div class="dd-stack" style="--dd-gap: 15px; align-items: flex-start">
  <div class="dd-segmented dd-segmented--sm" data-dd-segmented role="radiogroup" aria-label="Editor mode, small">
  <button class="dd-segmented__item" role="radio" aria-checked="true">Write</button>
  <button class="dd-segmented__item" role="radio" aria-checked="false">Preview</button>
</div>
  <div class="dd-segmented" data-dd-segmented role="radiogroup" aria-label="Editor mode, medium">
  <button class="dd-segmented__item" role="radio" aria-checked="true">Write</button>
  <button class="dd-segmented__item" role="radio" aria-checked="false">Preview</button>
</div>
  <div class="dd-segmented dd-segmented--lg" data-dd-segmented role="radiogroup" aria-label="Editor mode, large">
  <button class="dd-segmented__item" role="radio" aria-checked="true">Write</button>
  <button class="dd-segmented__item" role="radio" aria-checked="false">Preview</button>
</div>
</div>
```

## Icons

Icon-only segments (`.dd-segmented__item--icon`) are square; give each an `aria-label`. Icons can also lead a label.

```html
<div class="dd-row" style="--dd-gap: 15px">
  <div class="dd-segmented" data-dd-segmented role="radiogroup" aria-label="Layout">
    <button class="dd-segmented__item dd-segmented__item--icon" role="radio" aria-checked="true" aria-label="List"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-list"/></svg></button>
    <button class="dd-segmented__item dd-segmented__item--icon" role="radio" aria-checked="false" aria-label="Grid"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-grid"/></svg></button>
    <button class="dd-segmented__item dd-segmented__item--icon" role="radio" aria-checked="false" aria-label="Chart"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chart"/></svg></button>
  </div>
  <div class="dd-segmented dd-segmented--sm" data-dd-segmented role="radiogroup" aria-label="Theme">
    <button class="dd-segmented__item dd-segmented__item--icon" role="radio" aria-checked="false" aria-label="Dawn"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-sun"/></svg></button>
    <button class="dd-segmented__item dd-segmented__item--icon" role="radio" aria-checked="true" aria-label="Dusk"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-moon"/></svg></button>
    <button class="dd-segmented__item dd-segmented__item--icon" role="radio" aria-checked="false" aria-label="System"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-settings"/></svg></button>
  </div>
  <div class="dd-segmented" data-dd-segmented role="radiogroup" aria-label="View">
    <button class="dd-segmented__item" role="radio" aria-checked="true"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-list"/></svg><span>Table</span></button>
    <button class="dd-segmented__item" role="radio" aria-checked="false"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-code"/></svg><span>JSON</span></button>
  </div>
</div>
```

## Counts and disabled

A `.dd-segmented__count` sits beside the label in mono. Disabled segments fade and are skipped by the arrow keys. The control fires `dd:change` when the choice changes.

Try it: click or use ← → to change the level; the arrows skip the disabled “Debug” segment, and the line below updates from dd:change.

```html
<div class="dd-segmented" data-dd-segmented role="radiogroup" aria-label="Log level">
  <button class="dd-segmented__item" role="radio" aria-checked="true" value="all">All <span class="dd-segmented__count">1,219</span></button>
  <button class="dd-segmented__item" role="radio" aria-checked="false" value="error">Errors <span class="dd-segmented__count">3</span></button>
  <button class="dd-segmented__item" role="radio" aria-checked="false" value="warn">Warnings <span class="dd-segmented__count">12</span></button>
  <button class="dd-segmented__item" role="radio" aria-checked="false" value="debug" disabled>Debug <span class="dd-segmented__count">off</span></button>
</div>
<p class="dd-small dd-muted" style="margin: 10px 0 0">Showing <b class="dd-mono" data-seg-out>all</b> · listens for <code>dd:change</code></p>
<script>
  document.addEventListener('dd:change', (e) => {
    const out = e.target.parentElement?.querySelector('[data-seg-out]');
    if (out) out.textContent = e.detail.value;
  });
</script>
```

## Without JavaScript

The same look from a `<fieldset>` of native radios: each `<label class="dd-segmented__item">` wraps an `<input type="radio">`. Arrow keys, form submission and focus come from the browser.

```html
<form class="dd-stack" style="--dd-gap: 15px; align-items: flex-start" onsubmit="return false">
  <fieldset class="dd-segmented">
    <legend class="dd-visually-hidden">Billing period</legend>
    <label class="dd-segmented__item"><input type="radio" name="period" value="monthly"><span>Monthly</span></label>
    <label class="dd-segmented__item"><input type="radio" name="period" value="yearly" checked><span>Yearly</span> <span class="dd-segmented__count">−17%</span></label>
  </fieldset>
  <fieldset class="dd-segmented dd-segmented--sm">
    <legend class="dd-visually-hidden">Region</legend>
    <label class="dd-segmented__item"><input type="radio" name="region" value="iad1" checked><span class="dd-mono">iad1</span></label>
    <label class="dd-segmented__item"><input type="radio" name="region" value="sfo1"><span class="dd-mono">sfo1</span></label>
    <label class="dd-segmented__item"><input type="radio" name="region" value="fra1"><span class="dd-mono">fra1</span></label>
    <label class="dd-segmented__item"><input type="radio" name="region" value="hnd1" disabled><span class="dd-mono">hnd1</span></label>
  </fieldset>
</form>
```

## Full width, on a surface

`.dd-segmented--block` shares the width equally. On a `.dd-surface` card, add `.dd-segmented--inset` so the track steps one tone deeper.

```html
<div class="dd-surface" style="max-width: 380px; padding: 20px">
  <p class="dd-eyebrow" style="margin-bottom: 10px">Deploy edge-cache to</p>
  <div class="dd-segmented dd-segmented--block dd-segmented--inset" data-dd-segmented role="radiogroup" aria-label="Deploy target">
    <button class="dd-segmented__item" role="radio" aria-checked="true">Preview</button>
    <button class="dd-segmented__item" role="radio" aria-checked="false">Production</button>
  </div>
</div>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-segmented` | The track. A `div[role="radiogroup"][data-dd-segmented]`, or a `<fieldset>` for the radio version. Scrolls sideways if it runs out of room, with soft fades at the hidden edges where the browser supports them. |
| `.dd-segmented__item` | A segment: `<button role="radio" aria-checked>`, or `<label>` wrapping an `<input type="radio">`. |
| `[aria-checked="true"] / :checked` | The chosen segment: deeper tone, full-strength text. `.is-selected` also works for static markup. |
| `.dd-segmented__item--icon` | Square, icon-only segment. Needs `aria-label`. |
| `.dd-segmented__count` | A mono count or note beside the label. |
| `.dd-segmented--sm / --lg` | Sizes. Medium has no modifier. |
| `.dd-segmented--block` | Fills its container; segments share the width but never squeeze below their labels (the track scrolls instead). |
| `.dd-segmented--inset` | Track one tone deeper, for use on a `.dd-surface` card. |
| `:disabled / [aria-disabled="true"]` | Faded to 45% and skipped by the keyboard. |

## Behaviour

`ds/behaviors/segmented-control.js` handles the button version. The radio version needs nothing.

| class / attribute | what it does |
|---|---|
| `data-dd-segmented` | On the track: clicks choose a segment; only the chosen segment is in the tab order (roving tabindex). Fills in `role="radiogroup"` and `aria-checked="false"` if you leave them out. |
| `← → ↑ ↓` | Move to and choose the previous / next segment, wrapping at the ends. |
| `Home / End` | Choose the first / last segment. |
| `dd:change` | Bubbling event on the track, fired only when the choice changes. `detail.value` is the item’s `value` or `data-value` (else its label); `detail.item` is the button. |

## Guidelines

Do:
- Use it for two to five options with short labels.
- Apply the choice straight away; there is no “Save” for a segmented control.
- Keep segment labels the same kind of thing: all ranges, all views.

Don't:
- Don’t use it for actions; that is a button group.
- Don’t use it to switch whole page sections with their own content; use tabs.
- Don’t mix icon-only and labelled segments in one control.

