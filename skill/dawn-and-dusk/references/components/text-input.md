# text input — `text-input`

A single line of text in the tonal, borderless box. Inside a form field the label tucks into the fill; on its own the box is exactly button height, so it lines up in toolbars.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/text-input

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### Tucked label

The default. Wrap the box in a .dd-field and give it a label; the box grows a top pad for it. Focus clears the fill and lifts the box.

```html
<div class="dd-form__grid">
  <div class="dd-field">
    <label class="dd-field__label" for="ti-name">Project name</label>
    <div class="dd-input"><input class="dd-input__control" id="ti-name" placeholder="dockey-ui"></div>
  </div>
  <div class="dd-field">
    <label class="dd-field__label" for="ti-email">Billing email</label>
    <div class="dd-input">
      <input class="dd-input__control" id="ti-email" type="email" value="hello@cxkw.dev">
      <span class="dd-input__affix dd-input__status"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
    </div>
  </div>
</div>
```

## States

Error, disabled and read-only come from the control itself: set `aria-invalid="true"`, `disabled` or `readonly` and the box and label follow. `.is-focus` forces the focused look for documentation. Hover deepens the fill; disabled keeps a fainter box with dimmed text; read-only drops the fill for a hairline frame that tints when focused. Browser autofill keeps the box and adds a faint accent tint instead of the browser’s colour.

```html
<div class="dd-form__grid dd-form__grid--3">
  <div class="dd-field">
    <label class="dd-field__label" for="ts-1">Default</label>
    <div class="dd-input"><input class="dd-input__control" id="ts-1" placeholder="auth-gateway"></div>
  </div>
  <div class="dd-field">
    <label class="dd-field__label" for="ts-2">Focused</label>
    <div class="dd-input is-focus"><input class="dd-input__control" id="ts-2" value="billing-wor"></div>
  </div>
  <div class="dd-field">
    <label class="dd-field__label" for="ts-3">Filled</label>
    <div class="dd-input"><input class="dd-input__control" id="ts-3" value="edge-cache"></div>
  </div>
  <div class="dd-field">
    <label class="dd-field__label" for="ts-4">Website</label>
    <div class="dd-input">
      <input class="dd-input__control" id="ts-4" value="cxkw" aria-invalid="true" aria-describedby="ts-4-err">
      <span class="dd-input__affix dd-input__status"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-alert"/></svg></span>
    </div>
    <p class="dd-field__error" id="ts-4-err">Use the full address, like https://cxkw.dev</p>
  </div>
  <div class="dd-field">
    <label class="dd-field__label" for="ts-5">Plan</label>
    <div class="dd-input"><input class="dd-input__control" id="ts-5" value="Studio" disabled></div>
    <p class="dd-field__hint">Change plans in Billing.</p>
  </div>
  <div class="dd-field">
    <label class="dd-field__label" for="ts-6">Project ID</label>
    <div class="dd-input">
      <input class="dd-input__control dd-mono" id="ts-6" value="prj_7f3a91c2" readonly>
      <span class="dd-input__affix"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-lock"/></svg></span>
    </div>
    <p class="dd-field__hint">Read-only. Select it to copy.</p>
  </div>
</div>
```

## Prefix, suffix and units

Fixed text that is not part of the value sits in `.dd-input__unit` (mono, muted). Add `.dd-input__prefix` to quiet a leading scheme like `https://`.

```html
<div class="dd-form__grid">
  <div class="dd-field">
    <label class="dd-field__label" for="ta-1">Homepage</label>
    <div class="dd-input">
      <span class="dd-input__unit dd-input__prefix">https://</span>
      <input class="dd-input__control" id="ta-1" value="cxkw.dev/leetnode">
    </div>
  </div>
  <div class="dd-field">
    <label class="dd-field__label" for="ta-2">Subdomain</label>
    <div class="dd-input">
      <input class="dd-input__control" id="ta-2" value="insomnia">
      <span class="dd-input__unit">.cxkw.dev</span>
    </div>
  </div>
  <div class="dd-field">
    <label class="dd-field__label" for="ta-3">Monthly budget</label>
    <div class="dd-input">
      <span class="dd-input__affix">$</span>
      <input class="dd-input__control dd-num" id="ta-3" inputmode="decimal" value="1,200">
      <span class="dd-input__unit">USD / mo</span>
    </div>
  </div>
  <div class="dd-field">
    <label class="dd-field__label" for="ta-4">Memory limit</label>
    <div class="dd-input">
      <input class="dd-input__control dd-num" id="ta-4" inputmode="numeric" value="512">
      <span class="dd-input__unit">MiB</span>
    </div>
  </div>
</div>
```

## Leading icon

```html
<div class="dd-form__grid">
  <div class="dd-field">
    <label class="dd-field__label" for="tic-1">Invite by email</label>
    <div class="dd-input">
      <span class="dd-input__affix"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-mail"/></svg></span>
      <input class="dd-input__control" id="tic-1" type="email" placeholder="name@cxkw.dev">
    </div>
  </div>
  <div class="dd-field">
    <label class="dd-field__label" for="tic-2">Webhook URL</label>
    <div class="dd-input">
      <span class="dd-input__affix"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-link"/></svg></span>
      <input class="dd-input__control" id="tic-2" type="url" value="https://hooks.cxkw.dev/deploys">
    </div>
  </div>
</div>
```

## Password with reveal

A `data-dd-reveal` button flips the control between `password` and `text` and keeps `aria-pressed` and its label in sync. For other words, give it `data-dd-reveal-label="Show password|Hide password"`.

Try it: press the eye to show the secret, again to hide it. Each field toggles on its own.

```html
<div class="dd-form__grid">
  <div class="dd-field">
    <label class="dd-field__label" for="tp-1">API secret</label>
    <div class="dd-input">
      <span class="dd-input__affix"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-key"/></svg></span>
      <input class="dd-input__control dd-mono" id="tp-1" type="password" value="dd_live_51Hc0deX9" autocomplete="off">
      <span class="dd-input__affix">
        <button class="dd-input__btn" type="button" data-dd-reveal aria-pressed="false" aria-label="Show password">
          <span class="dd-input__show"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-eye"/></svg></span><span class="dd-input__hide"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-eye-off"/></svg></span>
        </button>
      </span>
    </div>
    <p class="dd-field__hint">Rotate it from the Keys page if it leaks.</p>
  </div>
  <div class="dd-field">
    <label class="dd-field__label" for="tp-2">New password</label>
    <div class="dd-input">
      <input class="dd-input__control" id="tp-2" type="password" placeholder="At least 12 characters" autocomplete="new-password">
      <span class="dd-input__affix">
        <button class="dd-input__btn" type="button" data-dd-reveal aria-pressed="false" aria-label="Show password">
          <span class="dd-input__show"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-eye"/></svg></span><span class="dd-input__hide"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-eye-off"/></svg></span>
        </button>
      </span>
    </div>
  </div>
</div>
```

## Search with clear

The clear button hides itself while the field is empty (the input needs a placeholder). Escape also clears a native search field.

Try it: press × to clear (focus stays in the field), or press Esc while typing.

```html
<div class="dd-stack">
  <div class="dd-input" style="max-width: 360px">
    <span class="dd-input__affix"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-search"/></svg></span>
    <input class="dd-input__control" type="search" aria-label="Search deploys" placeholder="Search deploys…" value="billing">
    <span class="dd-input__affix"><button class="dd-input__btn" type="button" data-dd-clear aria-label="Clear search"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button></span>
  </div>
  <div class="dd-field" style="max-width: 360px">
    <label class="dd-field__label" for="tsr-1">Find a service</label>
    <div class="dd-input">
      <span class="dd-input__affix"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-search"/></svg></span>
      <input class="dd-input__control" id="tsr-1" type="search" placeholder="auth-gateway, edge-cache…">
      <span class="dd-input__affix"><button class="dd-input__btn" type="button" data-dd-clear aria-label="Clear search"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button></span>
    </div>
  </div>
</div>
```

## Number with steppers

Native spinners are hidden; the minus and plus buttons call `stepDown()` / `stepUp()`, so `min`, `max` and `step` are honoured, and each dims at its end of the range. Arrow keys still work in the field.

Try it: step Retries up to 5 — plus dims at the end of the range — or use ↑ ↓ in the field.

```html
<div class="dd-form__grid dd-form__grid--3">
  <div class="dd-field">
    <label class="dd-field__label" for="tn-1">Replicas</label>
    <div class="dd-input">
      <input class="dd-input__control" id="tn-1" type="number" value="3" min="1" max="12" step="1">
      <span class="dd-input__affix dd-input__steppers">
        <button class="dd-input__btn" type="button" data-dd-step="-1" aria-label="Decrease"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-minus"/></svg></button>
        <button class="dd-input__btn" type="button" data-dd-step="1" aria-label="Increase"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-plus"/></svg></button>
      </span>
    </div>
  </div>
  <div class="dd-field">
    <label class="dd-field__label" for="tn-2">Timeout</label>
    <div class="dd-input">
      <input class="dd-input__control" id="tn-2" type="number" value="3000" min="500" max="30000" step="500">
      <span class="dd-input__unit">ms</span>
      <span class="dd-input__affix dd-input__steppers">
        <button class="dd-input__btn" type="button" data-dd-step="-1" aria-label="Decrease"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-minus"/></svg></button>
        <button class="dd-input__btn" type="button" data-dd-step="1" aria-label="Increase"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-plus"/></svg></button>
      </span>
    </div>
  </div>
  <div class="dd-field">
    <label class="dd-field__label" for="tn-3">Retries</label>
    <div class="dd-input">
      <input class="dd-input__control" id="tn-3" type="number" value="2" min="0" max="5" step="1">
      <span class="dd-input__affix dd-input__steppers">
        <button class="dd-input__btn" type="button" data-dd-step="-1" aria-label="Decrease"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-minus"/></svg></button>
        <button class="dd-input__btn" type="button" data-dd-step="1" aria-label="Increase"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-plus"/></svg></button>
      </span>
    </div>
  </div>
</div>
```

## Sizes

Medium is the default. Small for dense filters and table toolbars; large for sign-in and onboarding.

```html
<div class="dd-form__grid dd-form__grid--3">
  <div class="dd-field">
    <label class="dd-field__label" for="tz-1">Small</label>
    <div class="dd-input dd-input--sm"><input class="dd-input__control" id="tz-1" value="eu-west-1"></div>
  </div>
  <div class="dd-field">
    <label class="dd-field__label" for="tz-2">Medium</label>
    <div class="dd-input"><input class="dd-input__control" id="tz-2" value="eu-west-1"></div>
  </div>
  <div class="dd-field">
    <label class="dd-field__label" for="tz-3">Large</label>
    <div class="dd-input dd-input--lg"><input class="dd-input__control" id="tz-3" value="eu-west-1"></div>
  </div>
</div>
```

## Without a field

On its own the box drops the tucked pad and matches button heights at every size. Give it an `aria-label`.

```html
<div class="dd-row">
  <div class="dd-input dd-input--sm" style="width: 200px">
    <span class="dd-input__affix"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-filter"/></svg></span>
    <input class="dd-input__control" aria-label="Filter logs" placeholder="Filter logs">
  </div>
  <div class="dd-input" style="width: 240px">
    <span class="dd-input__affix"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-search"/></svg></span>
    <input class="dd-input__control" aria-label="Search" placeholder="Search">
  </div>
  <button class="dd-btn dd-btn--primary"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-plus"/></svg><span>New deploy</span></button>
</div>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-input` | The tonal box. Holds one control plus any affixes. Tucks automatically inside a `.dd-field`. |
| `.dd-input__control` | The `<input>` itself: transparent, fills the box, carries the block padding. |
| `.dd-input__control.dd-mono · .dd-num` | Mono value at a slightly smaller size (IDs, keys); tabular figures for numbers. |
| `.dd-input__affix` | Icon or short text before/after the value. Not clickable unless it holds a button. |
| `.dd-input__unit` | Mono, muted unit or suffix: `MiB`, `USD / mo`, `.cxkw.dev`. |
| `.dd-input__prefix` | Quiets a leading unit, like a URL scheme. |
| `.dd-input__status` | Trailing check (ok). Turns red when the control is invalid. |
| `.dd-input__btn` | Small inline icon button inside an affix: reveal, clear, steppers. |
| `.dd-input__steppers` | Affix holding the minus / plus pair. |
| `.dd-input--sm / --lg` | Sizes. The tucked label follows. |
| `.is-focus · .is-invalid · .is-disabled` | Force a state on the box (docs, or custom controls). Native attributes are preferred. |
| `[aria-invalid] · [disabled] · [readonly]` | Set on the control; the box and the field label react. |

## Behaviour

`ds/behaviors/text-input.js` wires the inline buttons. Each is opt-in, by attribute.

| class / attribute | what it does |
|---|---|
| `data-dd-reveal` | On a button in the box: toggles the control’s `type` between password and text, sets `aria-pressed` and swaps `.dd-input__show` / `.dd-input__hide`. |
| `data-dd-clear` | On a button in the box: empties the control, fires `input` and `change`, returns focus. |
| `data-dd-step="1" / "-1"` | On a button in the box: steps a number control and fires `input` and `change`. The button disables itself while the value sits on that end of `min` / `max`, or while the control is disabled or read-only. |

## Guidelines

Do:
- Keep labels to one or two words; put the explanation in a hint below.
- Use a unit affix instead of writing the unit into the label.
- Size the box to the expected value when it is short (ports, codes, counts).

Don't:
- Don’t use the placeholder as the label — it disappears on the first keystroke.
- Don’t disable a field without a hint that says why.
- Don’t validate on every keystroke; validate on blur or submit.

