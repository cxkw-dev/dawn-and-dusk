# switch — `switch`

Turns a setting on or off right away. The pill track fills with the accent when on, and the knob slides across.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/switch

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### States

On, off, and both disabled. Hovering anywhere on the row steps the track one tone; pressing stretches the knob toward where it is going. A native checkbox with role="switch", so the state is announced as on / off. Try it: click a switch or its label, or Tab to one and press Space.

```html
<div class="dd-row" style="--dd-gap: 20px 30px">
  <label class="dd-switch"><input class="dd-switch__input" type="checkbox" role="switch" checked> Auto-deploy</label>
  <label class="dd-switch"><input class="dd-switch__input" type="checkbox" role="switch"> Maintenance mode</label>
  <label class="dd-switch"><input class="dd-switch__input" type="checkbox" role="switch" checked disabled> Audit log</label>
  <label class="dd-switch"><input class="dd-switch__input" type="checkbox" role="switch" disabled> Single sign-on</label>
</div>
```

## Sizes

Medium is the default. Small for dense tables and filters, large for touch-first settings. Switches without visible text need an `aria-label`.

```html
<div class="dd-row" style="--dd-gap: 20px 30px">
  <label class="dd-switch dd-switch--sm"><input class="dd-switch__input" type="checkbox" role="switch" checked> Small</label>
  <label class="dd-switch"><input class="dd-switch__input" type="checkbox" role="switch" checked> Medium</label>
  <label class="dd-switch dd-switch--lg"><input class="dd-switch__input" type="checkbox" role="switch" checked> Large</label>
  <label class="dd-switch dd-switch--sm"><input class="dd-switch__input" type="checkbox" role="switch" aria-label="Small, off"></label>
  <label class="dd-switch"><input class="dd-switch__input" type="checkbox" role="switch" aria-label="Medium, off"></label>
  <label class="dd-switch dd-switch--lg"><input class="dd-switch__input" type="checkbox" role="switch" aria-label="Large, off"></label>
</div>
```

## With label and description

The track aligns to the first line of the label.

```html
<div class="dd-stack" style="--dd-gap: 20px; max-width: 460px">
  <label class="dd-switch">
    <input class="dd-switch__input" type="checkbox" role="switch" checked>
    <span class="dd-switch__text"><span class="dd-switch__label">Dusk at sunset</span><span class="dd-switch__desc">Switch themes with your local time.</span></span>
  </label>
  <label class="dd-switch">
    <input class="dd-switch__input" type="checkbox" role="switch">
    <span class="dd-switch__text"><span class="dd-switch__label">Preview deploys</span><span class="dd-switch__desc">Build every pull request to its own URL.</span></span>
  </label>
  <label class="dd-switch">
    <input class="dd-switch__input" type="checkbox" role="switch" checked disabled>
    <span class="dd-switch__text"><span class="dd-switch__label">Two-factor sign-in</span><span class="dd-switch__desc">Required by your workspace owner.</span></span>
  </label>
</div>
```

## Settings rows

`.dd-switch--end` puts the control after the text and stretches the row; stack rows in `.dd-form__choices--rows` for hairlines between them.

Try it: click anywhere on a row. A switch applies at once, so each change confirms with a toast here.

```html
<div class="dd-form__choices dd-form__choices--rows" style="max-width: 520px">
  <label class="dd-switch dd-switch--end">
    <input class="dd-switch__input" type="checkbox" role="switch" checked>
    <span class="dd-switch__text"><span class="dd-switch__label">Auto-deploy main</span><span class="dd-switch__desc">Every push to main ships to production.</span></span>
  </label>
  <label class="dd-switch dd-switch--end">
    <input class="dd-switch__input" type="checkbox" role="switch">
    <span class="dd-switch__text"><span class="dd-switch__label">Maintenance mode</span><span class="dd-switch__desc">Serve a static page from edge-cache while you work.</span></span>
  </label>
  <label class="dd-switch dd-switch--end">
    <input class="dd-switch__input" type="checkbox" role="switch" checked>
    <span class="dd-switch__text"><span class="dd-switch__label">Ship logs to log-shipper</span><span class="dd-switch__desc">Keeps 30 days; costs about $4 a month.</span></span>
  </label>
</div>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-switch` | The `<label>` wrapper: control + text. |
| `.dd-switch__input` | The native checkbox with `role="switch"`; the knob is its `::before`. |
| `.dd-switch__text · __label · __desc` | Label stack with a muted description. |
| `.dd-switch--sm / --lg` | Sizes (32 × 18, 48 × 28). Medium is 40 × 24. |
| `.dd-switch--end` | Control after the text, full width — for settings lists. |

## Guidelines

Do:
- Use a switch when the change applies immediately, with no save button.
- Label the setting, not the state: “Preview deploys”, not “Enable preview deploys”.
- Explain the consequence in the description when it costs money or affects others.

Don't:
- Don’t put switches in a form that needs submitting — use checkboxes.
- Don’t add “On / Off” text beside the switch.
- Don’t use a switch for choices between two named options — use a segmented control or radios.

