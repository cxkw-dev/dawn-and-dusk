# skeleton — `skeleton`

The outline of what’s about to load — text lines, avatars, cards, table rows — in a flat tone with a slow shimmer. It holds the layout still so nothing jumps when the content lands.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/skeleton

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### Text

A title bar and lines as tall as lowercase letters, spaced like real text; the last line stops short.

```html
<div class="dd-skeleton-group" aria-busy="true" style="max-width: 560px">
  <span class="dd-visually-hidden">Loading release notes…</span>
  <span class="dd-skeleton dd-skeleton--title" aria-hidden="true"></span>
  <div class="dd-skeleton-lines" aria-hidden="true">
    <span class="dd-skeleton dd-skeleton--text"></span>
    <span class="dd-skeleton dd-skeleton--text"></span>
    <span class="dd-skeleton dd-skeleton--text"></span>
    <span class="dd-skeleton dd-skeleton--text"></span>
  </div>
</div>
```

## Avatar and list

```html
<div class="dd-skeleton-group" aria-busy="true">
  <span class="dd-visually-hidden">Loading members…</span>
  <div style="display: flex; align-items: center; gap: var(--dd-space-3)" aria-hidden="true">
    <span class="dd-skeleton dd-skeleton--circle"></span>
    <div class="dd-skeleton-lines" style="max-width: 280px">
      <span class="dd-skeleton dd-skeleton--text" style="width: 55%"></span>
      <span class="dd-skeleton dd-skeleton--text" style="width: 85%"></span>
    </div>
  </div>
  <div style="display: flex; align-items: center; gap: var(--dd-space-3)" aria-hidden="true">
    <span class="dd-skeleton dd-skeleton--circle"></span>
    <div class="dd-skeleton-lines" style="max-width: 280px">
      <span class="dd-skeleton dd-skeleton--text" style="width: 55%"></span>
      <span class="dd-skeleton dd-skeleton--text" style="width: 85%"></span>
    </div>
  </div>
  <div style="display: flex; align-items: center; gap: var(--dd-space-3)" aria-hidden="true">
    <span class="dd-skeleton dd-skeleton--circle"></span>
    <div class="dd-skeleton-lines" style="max-width: 280px">
      <span class="dd-skeleton dd-skeleton--text" style="width: 55%"></span>
      <span class="dd-skeleton dd-skeleton--text" style="width: 85%"></span>
    </div>
  </div>
</div>
```

## Card

Match the real card’s parts and sizes — media, eyebrow, title, two lines, a button.

```html
<div aria-busy="true" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr)); gap: var(--dd-space-4)">
  <span class="dd-visually-hidden">Loading projects…</span>
  <div class="dd-surface dd-skeleton-group" style="padding: var(--dd-space-4); --dd-gap: var(--dd-space-3)" aria-hidden="true">
    <span class="dd-skeleton dd-skeleton--block"></span>
    <span class="dd-skeleton dd-skeleton--text" style="width: 30%; font-size: var(--dd-fs-xs)"></span>
    <span class="dd-skeleton dd-skeleton--title" style="width: 70%; font-size: var(--dd-fs-lg)"></span>
    <div class="dd-skeleton-lines"><span class="dd-skeleton dd-skeleton--text"></span><span class="dd-skeleton dd-skeleton--text"></span></div>
    <span class="dd-skeleton dd-skeleton--button"></span>
  </div>
  <div class="dd-surface dd-skeleton-group" style="padding: var(--dd-space-4); --dd-gap: var(--dd-space-3)" aria-hidden="true">
    <span class="dd-skeleton dd-skeleton--block"></span>
    <span class="dd-skeleton dd-skeleton--text" style="width: 30%; font-size: var(--dd-fs-xs)"></span>
    <span class="dd-skeleton dd-skeleton--title" style="width: 55%; font-size: var(--dd-fs-lg)"></span>
    <div class="dd-skeleton-lines"><span class="dd-skeleton dd-skeleton--text"></span><span class="dd-skeleton dd-skeleton--text"></span></div>
    <span class="dd-skeleton dd-skeleton--button"></span>
  </div>
</div>
```

## Table rows

Keep the real header so the columns are already in place, and vary the bar widths so it doesn’t read as a pattern.

```html
<div aria-busy="true" style="overflow-x: auto">
  <span class="dd-visually-hidden">Loading deploys…</span>
  <div style="min-width: 420px; font-size: var(--dd-fs-sm); line-height: var(--dd-lh)" aria-hidden="true">
    <div style="display: grid; grid-template-columns: 28px minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1fr); gap: var(--dd-space-4); padding: var(--dd-space-2) var(--dd-space-4); font-size: var(--dd-fs-xs); color: var(--dd-muted); box-shadow: inset 0 -1px 0 var(--dd-border-strong)">
      <span></span><span>Deploy</span><span>Region</span><span style="text-align: right">Duration</span>
    </div>
    <div style="display: grid; grid-template-columns: 28px minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1fr); gap: var(--dd-space-4); align-items: center; padding: var(--dd-space-3) var(--dd-space-4); box-shadow: inset 0 -1px 0 color-mix(in oklab, var(--dd-text) 8%, transparent)">
      <span class="dd-skeleton dd-skeleton--circle" style="--dd-skeleton-size: 20px"></span>
      <span class="dd-skeleton dd-skeleton--text" style="width: 72%"></span>
      <span class="dd-skeleton dd-skeleton--text" style="width: 40%"></span>
      <span class="dd-skeleton dd-skeleton--text" style="width: 50%; justify-self: end"></span>
    </div>
    <div style="display: grid; grid-template-columns: 28px minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1fr); gap: var(--dd-space-4); align-items: center; padding: var(--dd-space-3) var(--dd-space-4); box-shadow: inset 0 -1px 0 color-mix(in oklab, var(--dd-text) 8%, transparent)">
      <span class="dd-skeleton dd-skeleton--circle" style="--dd-skeleton-size: 20px"></span>
      <span class="dd-skeleton dd-skeleton--text" style="width: 58%"></span>
      <span class="dd-skeleton dd-skeleton--text" style="width: 46%"></span>
      <span class="dd-skeleton dd-skeleton--text" style="width: 38%; justify-self: end"></span>
    </div>
    <div style="display: grid; grid-template-columns: 28px minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1fr); gap: var(--dd-space-4); align-items: center; padding: var(--dd-space-3) var(--dd-space-4); box-shadow: inset 0 -1px 0 color-mix(in oklab, var(--dd-text) 8%, transparent)">
      <span class="dd-skeleton dd-skeleton--circle" style="--dd-skeleton-size: 20px"></span>
      <span class="dd-skeleton dd-skeleton--text" style="width: 80%"></span>
      <span class="dd-skeleton dd-skeleton--text" style="width: 34%"></span>
      <span class="dd-skeleton dd-skeleton--text" style="width: 56%; justify-self: end"></span>
    </div>
    <div style="display: grid; grid-template-columns: 28px minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1fr); gap: var(--dd-space-4); align-items: center; padding: var(--dd-space-3) var(--dd-space-4); box-shadow: inset 0 -1px 0 color-mix(in oklab, var(--dd-text) 8%, transparent)">
      <span class="dd-skeleton dd-skeleton--circle" style="--dd-skeleton-size: 20px"></span>
      <span class="dd-skeleton dd-skeleton--text" style="width: 64%"></span>
      <span class="dd-skeleton dd-skeleton--text" style="width: 42%"></span>
      <span class="dd-skeleton dd-skeleton--text" style="width: 44%; justify-self: end"></span>
    </div>
  </div>
</div>
```

## Accessibility and motion

Put `aria-busy="true"` on the region that’s loading with a visually hidden “Loading …” inside, and hide the shapes with `aria-hidden`; swap the whole region when the data arrives. With reduced motion the shimmer stops and the shapes stay as flat tone.

Try it: press Reload. The list turns into skeleton rows while the region is aria-busy, and the real rows land in exactly the same place a moment later.

```html
<div class="dd-surface" style="max-width: 560px; padding: var(--dd-space-4) var(--dd-space-5)">
  <div class="dd-row" style="justify-content: space-between; margin-bottom: var(--dd-space-4)">
    <span class="dd-small dd-muted">cxkw.dev · members</span>
    <button class="dd-btn dd-btn--sm" type="button" data-sk-reload aria-controls="sk-members"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-refresh"/></svg><span>Reload</span></button>
  </div>
  <div id="sk-members" aria-busy="false">
    <div data-sk-loading hidden>
      <div class="dd-skeleton-group">
        <span class="dd-visually-hidden">Loading members…</span>
        <div style="display: flex; align-items: center; gap: var(--dd-space-3)" aria-hidden="true">
    <span class="dd-skeleton dd-skeleton--circle"></span>
    <div class="dd-skeleton-lines" style="max-width: 280px">
      <span class="dd-skeleton dd-skeleton--text" style="width: 55%"></span>
      <span class="dd-skeleton dd-skeleton--text" style="width: 85%"></span>
    </div>
  </div>
        <div style="display: flex; align-items: center; gap: var(--dd-space-3)" aria-hidden="true">
    <span class="dd-skeleton dd-skeleton--circle"></span>
    <div class="dd-skeleton-lines" style="max-width: 280px">
      <span class="dd-skeleton dd-skeleton--text" style="width: 55%"></span>
      <span class="dd-skeleton dd-skeleton--text" style="width: 85%"></span>
    </div>
  </div>
        <div style="display: flex; align-items: center; gap: var(--dd-space-3)" aria-hidden="true">
    <span class="dd-skeleton dd-skeleton--circle"></span>
    <div class="dd-skeleton-lines" style="max-width: 280px">
      <span class="dd-skeleton dd-skeleton--text" style="width: 55%"></span>
      <span class="dd-skeleton dd-skeleton--text" style="width: 85%"></span>
    </div>
  </div>
      </div>
    </div>
    <div data-sk-loaded>
      <ul class="dd-stack" style="--dd-gap: calc(var(--dd-u) * 3); margin: 0; padding: 0; list-style: none">
        <li style="display: flex; align-items: center; gap: var(--dd-space-3)">
          <span class="dd-avatar dd-avatar--set-3" aria-hidden="true">AN</span>
          <span style="font-size: var(--dd-fs-sm); line-height: var(--dd-lh)"><b>Andy Nguyen</b><br><span class="dd-muted">Owner · andy@cxkw.dev</span></span>
        </li>
        <li style="display: flex; align-items: center; gap: var(--dd-space-3)">
          <span class="dd-avatar dd-avatar--set-6" aria-hidden="true">MK</span>
          <span style="font-size: var(--dd-fs-sm); line-height: var(--dd-lh)"><b>Mira K.</b><br><span class="dd-muted">Maintainer · mira@cxkw.dev</span></span>
        </li>
        <li style="display: flex; align-items: center; gap: var(--dd-space-3)">
          <span class="dd-avatar dd-avatar--set-1" aria-hidden="true">RL</span>
          <span style="font-size: var(--dd-fs-sm); line-height: var(--dd-lh)"><b>Ravi L.</b><br><span class="dd-muted">Admin · ravi@cxkw.dev</span></span>
        </li>
      </ul>
    </div>
  </div>
</div>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-skeleton` | A shimmering block, full width, 20px tall. Size it with `width` / `height`. |
| `.dd-skeleton--text` | A text line: x-height tall, centred in one line of the surrounding type. |
| `.dd-skeleton--title` | A heading bar (45% wide). |
| `.dd-skeleton--circle` | Avatar circle, 36px; set `--dd-skeleton-size`. |
| `.dd-skeleton--block` | 16:9 media block. |
| `.dd-skeleton--button` | A button-sized bar. |
| `.dd-skeleton-lines` | A paragraph of lines; the last is 62% wide. |
| `.dd-skeleton-group` | A loading region (stack). Add `aria-busy="true"`. |
| `--dd-skeleton / --dd-skeleton-shine` | Tone (9% of the text colour, so it works on any surface) and the shimmer highlight. |

## Guidelines

Do:
- Mirror the real layout closely so the swap is calm.
- Use skeletons for loads you expect to take over ~300ms.
- Load the frame (headers, filters) for real and skeleton only the data.

Don't:
- Don’t show a skeleton and a spinner for the same thing.
- Don’t keep skeletons up after an error — show the empty or error state.
- Don’t skeleton things that load instantly.

