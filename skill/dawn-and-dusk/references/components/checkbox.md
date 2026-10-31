# checkbox — `checkbox`

Turns an option on or off, alone or as one of many. A hairline box with tight corners that fills with the accent when checked.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/checkbox

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### States

On, off, mixed (indeterminate) and disabled. Hovering anywhere on the label lifts the box’s edge, or steps a checked box one tone. The native input is styled directly, so forms, keyboard and screen readers work as usual.

```html
<div class="dd-row" style="--dd-gap: 20px 30px">
  <label class="dd-checkbox"><input class="dd-checkbox__input" type="checkbox" checked> On</label>
  <label class="dd-checkbox"><input class="dd-checkbox__input" type="checkbox"> Off</label>
  <label class="dd-checkbox"><input class="dd-checkbox__input" type="checkbox" data-dd-indeterminate> Mixed</label>
  <label class="dd-checkbox"><input class="dd-checkbox__input" type="checkbox" checked disabled> Disabled on</label>
  <label class="dd-checkbox"><input class="dd-checkbox__input" type="checkbox" disabled> Disabled off</label>
</div>
```

## With a description

Wrap the label and description in `.dd-checkbox__text`; the box aligns to the first line.

```html
<fieldset class="dd-checkbox-group">
  <legend class="dd-checkbox-group__legend">Email me about</legend>
  <label class="dd-checkbox">
    <input class="dd-checkbox__input" type="checkbox" checked>
    <span class="dd-checkbox__text"><span class="dd-checkbox__label">Failed deploys</span><span class="dd-checkbox__desc">Right away, with the first 40 lines of the build log.</span></span>
  </label>
  <label class="dd-checkbox">
    <input class="dd-checkbox__input" type="checkbox" checked>
    <span class="dd-checkbox__text"><span class="dd-checkbox__label">Weekly digest</span><span class="dd-checkbox__desc">One email on Sundays: deploys, uptime and spend.</span></span>
  </label>
  <label class="dd-checkbox">
    <input class="dd-checkbox__input" type="checkbox">
    <span class="dd-checkbox__text"><span class="dd-checkbox__label">Product news</span><span class="dd-checkbox__desc">A few times a year. Leave any time.</span></span>
  </label>
  <label class="dd-checkbox">
    <input class="dd-checkbox__input" type="checkbox" checked disabled>
    <span class="dd-checkbox__text"><span class="dd-checkbox__label">Security alerts</span><span class="dd-checkbox__desc">Always on for workspace owners.</span></span>
  </label>
</fieldset>
```

## Select all

A parent with `data-dd-check-all="key"` checks every child with `data-dd-check-in="key"` and shows the mixed state when only some are on.

Try it: check “All regions” to select every region, clear one region to see the mixed state, then check them one by one.

```html
<fieldset class="dd-checkbox-group">
  <legend class="dd-checkbox-group__legend">Purge cache for</legend>
  <label class="dd-checkbox"><input class="dd-checkbox__input" type="checkbox" data-dd-check-all="purge"> <span class="dd-checkbox__label">All regions</span></label>
  <div class="dd-checkbox-group__nested">
    <label class="dd-checkbox"><input class="dd-checkbox__input" type="checkbox" data-dd-check-in="purge" checked> <span class="dd-mono">eu-west-1</span></label>
    <label class="dd-checkbox"><input class="dd-checkbox__input" type="checkbox" data-dd-check-in="purge" checked> <span class="dd-mono">eu-central-1</span></label>
    <label class="dd-checkbox"><input class="dd-checkbox__input" type="checkbox" data-dd-check-in="purge"> <span class="dd-mono">us-east-1</span></label>
    <label class="dd-checkbox"><input class="dd-checkbox__input" type="checkbox" data-dd-check-in="purge"> <span class="dd-mono">ap-southeast-1</span></label>
  </div>
</fieldset>
```

## Inline and small

```html
<fieldset class="dd-checkbox-group dd-checkbox-group--inline">
  <legend class="dd-checkbox-group__legend">Log levels</legend>
  <label class="dd-checkbox dd-checkbox--sm"><input class="dd-checkbox__input" type="checkbox"> trace</label>
  <label class="dd-checkbox dd-checkbox--sm"><input class="dd-checkbox__input" type="checkbox"> debug</label>
  <label class="dd-checkbox dd-checkbox--sm"><input class="dd-checkbox__input" type="checkbox" checked> info</label>
  <label class="dd-checkbox dd-checkbox--sm"><input class="dd-checkbox__input" type="checkbox" checked> warn</label>
  <label class="dd-checkbox dd-checkbox--sm"><input class="dd-checkbox__input" type="checkbox" checked> error</label>
</fieldset>
```

## Checkbox card

For choices that need a sentence or a price. The whole card is the target; checked cards take a soft accent tint.

Try it: click anywhere on a card, or Tab to it and press Space. Audit export is disabled.

```html
<fieldset class="dd-checkbox-cards">
  <legend class="dd-checkbox-group__legend">Add-ons for auth-gateway</legend>
  <label class="dd-checkbox-card">
    <input class="dd-checkbox__input" type="checkbox" checked>
    <span class="dd-checkbox__text"><span class="dd-checkbox__label">Edge cache</span><span class="dd-checkbox__desc">Serve sessions from 30 regions.</span></span>
    <span class="dd-checkbox-card__aside">+$12/mo</span>
  </label>
  <label class="dd-checkbox-card">
    <input class="dd-checkbox__input" type="checkbox">
    <span class="dd-checkbox__text"><span class="dd-checkbox__label">Bot shield</span><span class="dd-checkbox__desc">Challenge suspicious sign-ins.</span></span>
    <span class="dd-checkbox-card__aside">+$8/mo</span>
  </label>
  <label class="dd-checkbox-card">
    <input class="dd-checkbox__input" type="checkbox" checked>
    <span class="dd-checkbox__text"><span class="dd-checkbox__label">Point-in-time restore</span><span class="dd-checkbox__desc">Seven days of recovery for the session store.</span></span>
    <span class="dd-checkbox-card__aside">+$20/mo</span>
  </label>
  <label class="dd-checkbox-card">
    <input class="dd-checkbox__input" type="checkbox" disabled>
    <span class="dd-checkbox__text"><span class="dd-checkbox__label">Audit export</span><span class="dd-checkbox__desc">Requires the Team plan.</span></span>
    <span class="dd-checkbox-card__aside">+$5/mo</span>
  </label>
</fieldset>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-checkbox` | The `<label>` wrapper: control + text, aligned to the first line. |
| `.dd-checkbox__input` | The native `<input type="checkbox">`. Uses `:checked`, `:indeterminate`, `:disabled`, `[aria-invalid]`. |
| `.dd-checkbox__text · __label · __desc` | Label stack with a muted description. |
| `.dd-checkbox--sm` | 16px box and xs text, for filters and dense lists. |
| `.dd-checkbox-group` | A `<fieldset>` of checkboxes; `--inline` lays them in a row. |
| `.dd-checkbox-group__legend · __nested` | Group legend; indented children under a select-all parent. |
| `.dd-checkbox-card` | Selectable card: a tonal row that takes an accent tint when checked. |
| `.dd-checkbox-card__icon` | Optional icon tile before the text. |
| `.dd-checkbox-card__aside` | Trailing mono detail (price, size, count). |
| `.dd-checkbox-cards` | Responsive grid of cards (fieldset). |

## Behaviour

`ds/behaviors/checkbox.js` adds the mixed state and select-all groups.

| class / attribute | what it does |
|---|---|
| `data-dd-indeterminate` | Sets `indeterminate = true` on load (HTML has no attribute for it). |
| `data-dd-check-all="key"` | Parent checkbox: checks or clears every `data-dd-check-in="key"`, and shows mixed when some are on. |
| `data-dd-check-in="key"` | Child checkbox of that parent. Disabled children are left as they are and don’t count. |

## Guidelines

Do:
- Use a checkbox when the choice takes effect on submit; use a switch for instant settings.
- Write labels as positive statements: “Email me about failed deploys”.
- Stack options vertically; go inline only for short, scannable sets.

Don't:
- Don’t use a single checkbox for mutually exclusive choices — use radios.
- Don’t make the label a question.
- Don’t rely on the mixed state as a value; it only summarises children.

