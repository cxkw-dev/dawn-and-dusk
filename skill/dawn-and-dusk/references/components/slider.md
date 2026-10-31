# slider — `slider`

Sets a number, or a range, by dragging along a track. Native range inputs on a thin tonal rail that fills with the accent, with ticks and live value labels.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/slider

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### Single, with ticks

The heading output and the active tick follow the thumb. Hovering the thumb grows it with a soft halo, dragging grows it more, and keyboard focus rings it. Try it: drag the thumb or click the track; Tab to it and use the arrow keys, Page Up / Down to jump, Home / End for the ends.

```html
<div class="dd-slider" style="--_p: .3333; max-width: 420px">
  <div class="dd-slider__head">
    <label class="dd-slider__label" for="sl-1">Replicas</label>
    <span class="dd-slider__value"><output for="sl-1">4</output> of 10</span>
  </div>
  <div class="dd-slider__rail">
    <input class="dd-slider__input" type="range" id="sl-1" min="1" max="10" value="4">
  </div>
  <div class="dd-slider__ticks" aria-hidden="true"><span data-value="1">1</span><span data-value="2">2</span><span data-value="3">3</span><span data-value="4" class="is-active">4</span><span data-value="5">5</span><span data-value="6">6</span><span data-value="7">7</span><span data-value="8">8</span><span data-value="9">9</span><span data-value="10">10</span></div>
</div>
```

## Range

Two inputs share one rail; the fill sits between the thumbs and they can’t cross. Bubbles ride above each thumb.

Try it: drag either thumb, or Tab to one and use the arrow keys; push one into the other and it stops.

```html
<div class="dd-slider dd-slider--range" style="--_lo: .16; --_hi: .64; max-width: 420px">
  <div class="dd-slider__head">
    <span class="dd-slider__label" id="sl-2-label">Latency window</span>
    <span class="dd-slider__value"><output for="sl-2a">80</output> – <output for="sl-2b">320</output> ms</span>
  </div>
  <div class="dd-slider__rail">
    <span class="dd-slider__fill"></span>
    <input class="dd-slider__input" type="range" id="sl-2a" min="0" max="500" step="10" value="80" aria-label="Minimum latency">
    <input class="dd-slider__input" type="range" id="sl-2b" min="0" max="500" step="10" value="320" aria-label="Maximum latency">
    <span class="dd-slider__bubble" data-for="sl-2a" data-unit=" ms" style="--_p: .16">80 ms</span>
    <span class="dd-slider__bubble" data-for="sl-2b" data-unit=" ms" style="--_p: .64">320 ms</span>
  </div>
  <div class="dd-slider__ticks" aria-hidden="true"><span data-value="0">0</span><span data-value="100" class="is-active">100</span><span data-value="200" class="is-active">200</span><span data-value="300" class="is-active">300</span><span data-value="400">400</span><span data-value="500">500</span></div>
</div>
```

## Value bubble

A `.dd-slider__bubble` with `data-for` shows the value above its thumb — useful when there is no room for a heading.

Try it: drag the thumb; the bubble follows in steps of 5%.

```html
<div class="dd-slider" style="--_p: .25; max-width: 420px">
  <div class="dd-slider__head"><label class="dd-slider__label" for="sl-3">Trace sample rate</label></div>
  <div class="dd-slider__rail">
    <input class="dd-slider__input" type="range" id="sl-3" min="0" max="100" step="5" value="25">
    <span class="dd-slider__bubble" data-for="sl-3" data-unit="%" style="--_p: .25">25%</span>
  </div>
</div>
```

## Small and disabled

```html
<div class="dd-form__grid">
  <div class="dd-slider dd-slider--sm" style="--_p: .6">
    <div class="dd-slider__head">
      <label class="dd-slider__label" for="sl-4">Volume</label>
      <span class="dd-slider__value"><output for="sl-4" data-unit="%">60%</output></span>
    </div>
    <div class="dd-slider__rail"><input class="dd-slider__input" type="range" id="sl-4" min="0" max="100" value="60"></div>
  </div>
  <div class="dd-slider" style="--_p: .5">
    <div class="dd-slider__head">
      <label class="dd-slider__label" for="sl-5">Build cache size</label>
      <span class="dd-slider__value"><output for="sl-5" data-unit=" GB">8 GB</output></span>
    </div>
    <div class="dd-slider__rail"><input class="dd-slider__input" type="range" id="sl-5" min="0" max="16" value="8" disabled></div>
  </div>
</div>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-slider` | Wrapper. Holds the fill position: `--_p` (0–1), or `--_lo` / `--_hi` for ranges. Set them inline for the first paint. |
| `.dd-slider__head · __label · __value` | Label on the left, mono value on the right (put `<output for>` inside). |
| `.dd-slider__rail` | Positioning box for the inputs, fill and bubbles. |
| `.dd-slider__input` | The native `<input type="range">`. |
| `.dd-slider--range + .dd-slider__fill` | Two inputs on one rail; the fill spans between them. |
| `.dd-slider__bubble` | Value label above a thumb (`data-for`, optional `data-unit`). |
| `.dd-slider__ticks` | Evenly spaced tick marks with labels; children with `data-value` light up when in range. |
| `.dd-slider--sm` | Smaller thumb (14px) and track (3px). |

## Behaviour

`ds/behaviors/slider.js` keeps the fill, outputs, bubbles and ticks in step with the inputs.

| class / attribute | what it does |
|---|---|
| `output[for="id"]` | Shows the input’s value (grouped with commas). `data-unit` appends a unit. |
| `.dd-slider__bubble[data-for="id"]` | Moves above that input’s thumb and shows its value. |
| `.dd-slider__ticks > [data-value]` | Gets `.is-active` at the value (single) or inside the range. |
| `dd:change` | Bubbling event on the `.dd-slider` when a value is committed (thumb released, or a key step). `detail.value` is a number, or `[low, high]` for a range; `detail.input` is the input that moved. |
| `Keys` | Native range keys: ← ↓ / → ↑ step, Page Up / Down jump a tenth of the range, Home / End go to the ends. Range thumbs can’t pass each other. |

## Guidelines

Do:
- Use a slider when the exact number matters less than the feel — sample rates, ranges, volume.
- Always show the current value next to the label.
- Pair it with a number input when people need exact values.

Don't:
- Don’t use a slider for more than ~100 meaningful steps.
- Don’t hide the unit; put it in the value label.
- Don’t make the range thumbs pass through each other.

