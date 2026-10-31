# radio — `radio`

Picks exactly one option from a short set. A radio group lists options with descriptions; a radio box group turns each option into a selectable card.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/radio

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### Radio group

A fieldset with a legend. The 8px accent dot and accent edge mark the choice; hovering anywhere on an option lifts its edge; disabled options stay readable. Try it: click an option, or Tab in and use the arrow keys (Shadow is skipped).

```html
<fieldset class="dd-radio-group">
  <legend class="dd-radio-group__legend">Deploy strategy</legend>
  <label class="dd-radio">
    <input class="dd-radio__input" type="radio" name="strategy" checked>
    <span class="dd-radio__text"><span class="dd-radio__label">Rolling</span><span class="dd-radio__desc">Replace instances one at a time. No extra capacity.</span></span>
  </label>
  <label class="dd-radio">
    <input class="dd-radio__input" type="radio" name="strategy">
    <span class="dd-radio__text"><span class="dd-radio__label">Blue / green</span><span class="dd-radio__desc">Boot a full copy, then switch traffic at once.</span></span>
  </label>
  <label class="dd-radio">
    <input class="dd-radio__input" type="radio" name="strategy">
    <span class="dd-radio__text"><span class="dd-radio__label">Canary</span><span class="dd-radio__desc">Send 5% of traffic first and watch error rates.</span></span>
  </label>
  <label class="dd-radio">
    <input class="dd-radio__input" type="radio" name="strategy" disabled>
    <span class="dd-radio__text"><span class="dd-radio__label">Shadow</span><span class="dd-radio__desc">Mirror traffic without serving it. Team plan only.</span></span>
  </label>
</fieldset>
```

## Inline

```html
<fieldset class="dd-radio-group dd-radio-group--inline">
  <legend class="dd-radio-group__legend">Billing cycle</legend>
  <label class="dd-radio"><input class="dd-radio__input" type="radio" name="cycle"> Monthly</label>
  <label class="dd-radio"><input class="dd-radio__input" type="radio" name="cycle" checked> Yearly <span class="dd-muted">· two months free</span></label>
</fieldset>
```

## Radio box group

Selectable cards for choices that deserve weight — plans, regions, templates. The native radio is visually hidden but keeps focus, arrow keys and form submission; the chosen card tints with the accent and shows a check badge.

Try it: click a plan, or Tab to the group and use ← →; one Tab leaves it.

```html
<fieldset class="dd-radio-cards">
  <legend class="dd-radio-group__legend">Plan</legend>
  <label class="dd-radio-card">
    <input class="dd-radio__input" type="radio" name="plan">
    <span class="dd-radio-card__icon"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-user"/></svg></span>
    <span class="dd-radio-card__title">Hobby</span>
    <span class="dd-radio-card__desc">One project, community support.</span>
    <span class="dd-radio-card__meta"><b>$0</b> / mo</span>
    <span class="dd-radio-card__mark"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
  </label>
  <label class="dd-radio-card">
    <input class="dd-radio__input" type="radio" name="plan" checked>
    <span class="dd-radio-card__icon"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-bolt"/></svg></span>
    <span class="dd-radio-card__title">Studio</span>
    <span class="dd-radio-card__desc">Unlimited projects, preview deploys, 3 regions.</span>
    <span class="dd-radio-card__meta"><b>$24</b> / mo</span>
    <span class="dd-radio-card__mark"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
  </label>
  <label class="dd-radio-card">
    <input class="dd-radio__input" type="radio" name="plan">
    <span class="dd-radio-card__icon"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-users"/></svg></span>
    <span class="dd-radio-card__title">Team</span>
    <span class="dd-radio-card__desc">Seats, audit log, SSO and every region.</span>
    <span class="dd-radio-card__meta"><b>$18</b> / seat / mo</span>
    <span class="dd-radio-card__mark"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
  </label>
</fieldset>
```

`.dd-radio-card--row` puts each option on one line. Set `--_min: 100%` on the group to stack them.

```html
<fieldset class="dd-radio-cards" style="--_min: 100%">
  <legend class="dd-radio-group__legend">Instance size for billing-worker</legend>
  <label class="dd-radio-card dd-radio-card--row">
    <input class="dd-radio__input" type="radio" name="size">
    <span class="dd-radio__text"><span class="dd-radio-card__title">Small</span><span class="dd-radio-card__desc">1 vCPU · 512 MiB</span></span>
    <span class="dd-radio-card__meta">$7/mo</span>
    <span class="dd-radio-card__mark"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
  </label>
  <label class="dd-radio-card dd-radio-card--row">
    <input class="dd-radio__input" type="radio" name="size" checked>
    <span class="dd-radio__text"><span class="dd-radio-card__title">Medium</span><span class="dd-radio-card__desc">2 vCPU · 2 GiB</span></span>
    <span class="dd-radio-card__meta">$25/mo</span>
    <span class="dd-radio-card__mark"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
  </label>
  <label class="dd-radio-card dd-radio-card--row">
    <input class="dd-radio__input" type="radio" name="size">
    <span class="dd-radio__text"><span class="dd-radio-card__title">Large</span><span class="dd-radio-card__desc">4 vCPU · 8 GiB</span></span>
    <span class="dd-radio-card__meta">$85/mo</span>
    <span class="dd-radio-card__mark"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
  </label>
</fieldset>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-radio` | The `<label>` wrapper: control + text. |
| `.dd-radio__input` | The native `<input type="radio">`. Uses `:checked`, `:disabled`, `[aria-invalid]`. |
| `.dd-radio__text · __label · __desc` | Label stack with a muted description. |
| `.dd-radio-group` | A `<fieldset>` of radios; `--inline` lays them in a row. |
| `.dd-radio-group__legend · __hint` | Group legend and an optional hint under it. |
| `.dd-radio-cards` | Radio box group: a responsive grid (min column `--_min`, default 11rem). |
| `.dd-radio-card` | One selectable card. Holds a visually hidden `.dd-radio__input`. |
| `.dd-radio-card__icon · __title · __desc · __meta` | Card content: icon tile (accent when chosen), title, description, mono meta (wrap a price in `<b>`). |
| `.dd-radio-card__mark` | Check badge, shown when chosen. |
| `.dd-radio-card--row` | One-line card with the mark at the end. |

## Guidelines

Do:
- Use radios for 2–6 mutually exclusive options that people should compare.
- Pre-select the safest or most common option.
- Use cards when each option needs an explanation or a price.

Don't:
- Don’t use radios for a single on/off choice — use a checkbox or switch.
- Don’t mix cards and plain radios in one group.
- Don’t hide which option is chosen behind colour alone; the check badge carries it too.

