# form field — `form-field`

The wrapper around one control: its label, hint, error and counter. By default the label tucks into the tonal box; a label-above variant is there for long labels and dense settings.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/form-field

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### Anatomy

Label, box, then a foot with a hint and a counter. Hints and errors indent to the value’s left edge. Try it: type in the box and watch the counter.

```html
<div class="dd-field" style="max-width: 380px">
  <label class="dd-field__label" for="ff-1">Service name</label>
  <div class="dd-input">
    <input class="dd-input__control" id="ff-1" value="billing-worker" maxlength="40" aria-describedby="ff-1-hint">
  </div>
  <div class="dd-field__foot">
    <p class="dd-field__hint" id="ff-1-hint">Lowercase, numbers and dashes. Used in URLs.</p>
    <span class="dd-field__counter">14 / 40</span>
  </div>
</div>
```

## Label above

`.dd-field--above` puts a regular label over the box — better for long labels, an `optional` marker, or a description line (`.dd-field__desc`) between label and box.

```html
<div class="dd-stack" style="--dd-gap: 20px; max-width: 420px">
  <div class="dd-field dd-field--above">
    <label class="dd-field__label" for="ff-2">Workspace name</label>
    <div class="dd-input"><input class="dd-input__control" id="ff-2" value="cxkw.dev"></div>
    <p class="dd-field__hint">Shown on invoices and invites.</p>
  </div>
  <div class="dd-field dd-field--above">
    <label class="dd-field__label" for="ff-3">Support email <span class="dd-field__opt">· optional</span></label>
    <p class="dd-field__desc" id="ff-3-desc">Where customers reply to status emails.</p>
    <div class="dd-input"><input class="dd-input__control" id="ff-3" type="email" placeholder="help@cxkw.dev" aria-describedby="ff-3-desc"></div>
  </div>
</div>
```

## Hint, error and counter

Set `aria-invalid="true"` on the control and the label, box and status icon turn red; put the reason in `.dd-field__error` and link it with `aria-describedby`. The counter updates as you type.

```html
<div class="dd-form__grid">
  <div class="dd-field">
    <label class="dd-field__label" for="ff-4">Custom domain</label>
    <div class="dd-input">
      <input class="dd-input__control" id="ff-4" value="status.cxkw" aria-invalid="true" aria-describedby="ff-4-err">
      <span class="dd-input__affix dd-input__status"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-alert"/></svg></span>
    </div>
    <p class="dd-field__error" id="ff-4-err"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-error"/></svg>Add a top-level domain, like status.cxkw.dev.</p>
  </div>
  <div class="dd-field">
    <label class="dd-field__label" for="ff-5">Deploy hook name <span class="dd-field__opt">· optional</span></label>
    <div class="dd-input"><input class="dd-input__control" id="ff-5" maxlength="24" value="nightly-rebuild-leetnode" aria-describedby="ff-5-c"></div>
    <div class="dd-field__foot">
      <p class="dd-field__hint">Shown in the deploy log.</p>
      <span class="dd-field__counter is-near" id="ff-5-c">24 / 24</span>
    </div>
  </div>
</div>
```

`maxlength` is a hard limit: the browser stops the typing. `data-dd-counter` on the counter is a soft one: the draft can run over, but the counter and label turn red and the control is marked invalid until it is back under. Both re-count when the form is reset.

Try it: type past 40 characters in the status message, trim it back, then press Reset.

```html
<form class="dd-form" onsubmit="return false" style="max-width: 460px">
  <div class="dd-field">
    <label class="dd-field__label" for="ff-9">Status message</label>
    <div class="dd-input"><input class="dd-input__control" id="ff-9" value="All systems normal" aria-describedby="ff-9-hint ff-9-c"></div>
    <div class="dd-field__foot">
      <p class="dd-field__hint" id="ff-9-hint">Shown on status.cxkw.dev. Aim for 40 characters or fewer.</p>
      <span class="dd-field__counter" id="ff-9-c" data-dd-counter="40">18 / 40</span>
    </div>
  </div>
  <div class="dd-field">
    <label class="dd-field__label" for="ff-10">Deploy note</label>
    <div class="dd-input dd-textarea"><textarea class="dd-input__control" id="ff-10" rows="2" maxlength="120" placeholder="Why this deploy?">Rolls edge-cache back to 2.3.1</textarea></div>
    <div class="dd-field__foot">
      <p class="dd-field__hint">Hard limit: typing stops at 120.</p>
      <span class="dd-field__counter">30 / 120</span>
    </div>
  </div>
  <div class="dd-form__footer dd-form__footer--plain">
    <button class="dd-btn dd-btn--ghost" type="reset">Reset</button>
  </div>
</form>
```

## Any control

The field works with every box-based control: text input, select, combobox, date picker and textarea. The tucked label finds the box directly inside the field or one wrapper deep.

```html
<div class="dd-form__grid">
  <div class="dd-field">
    <label class="dd-field__label" for="ff-6">Region</label>
    <div class="dd-input dd-select">
      <select class="dd-input__control" id="ff-6"><option>eu-west-1 · Dublin</option><option>us-east-1 · N. Virginia</option></select>
      <span class="dd-select__chevron"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></span>
    </div>
  </div>
  <div class="dd-field">
    <label class="dd-field__label" for="ff-7">Port</label>
    <div class="dd-input">
      <input class="dd-input__control dd-num" id="ff-7" type="number" value="8080">
      <span class="dd-input__unit">TCP</span>
    </div>
  </div>
  <div class="dd-field dd-form__span">
    <label class="dd-field__label" for="ff-8">Description</label>
    <div class="dd-input dd-textarea"><textarea class="dd-input__control" id="ff-8" rows="2" placeholder="What does this service do?"></textarea></div>
  </div>
</div>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-field` | Wrapper. Tucks the label into the box by default. |
| `.dd-field--above` | Label sits above the box; hints align with the label. |
| `.dd-field__label` | The `<label for>` (or a `<span id>` for button triggers). Turns accent on focus, red when invalid. |
| `.dd-field__opt` | Muted “optional” marker inside the label. |
| `.dd-field__desc` | Description between label and box (label-above only). |
| `.dd-field__hint` | Muted help text under the box. |
| `.dd-field__error` | Error message in red, with an optional leading icon. |
| `.dd-field__foot` | Row under the box: hint or error on the left, counter on the right. |
| `.dd-field__counter` | Mono character counter. `.is-near` (90%), `.is-over`. |
| `.is-invalid` | Forces the invalid look on the field (prefer `aria-invalid` on the control). |
| `[aria-invalid] · [disabled]` | Set on the control; the label follows (red when invalid, faded when disabled). |

## Behaviour

`ds/behaviors/form-field.js` keeps every counter in step with its control.

| class / attribute | what it does |
|---|---|
| `.dd-field__counter` | Counts the field’s input or textarea on every keystroke, and again after a form reset: `n / maxlength`, or just `n` without a limit. `.is-near` at 90%, `.is-over` past the limit. |
| `data-dd-counter="280"` | Soft limit instead of `maxlength`: typing past it is allowed but marks the control invalid until it is back under. It only clears an `aria-invalid` it set itself. |
| `data-dd-counter-error` | On a `.dd-field__error` in the same field: shown only while the soft limit is passed. |
| `data-dd-counter="manual"` | Leaves the counter alone, for one a framework renders. `data-dd-manual` on an ancestor does the same. |

## Guidelines

Do:
- Keep tucked labels to a few words — they sit in 11px type.
- Put format rules in the hint before people type, not only in the error after.
- Write errors as the fix: “Add a top-level domain”, not “Invalid domain”.

Don't:
- Don’t mix tucked and label-above fields in one form section.
- Don’t show an error while the person is still typing the first value.
- Don’t mark required fields with an asterisk; mark the optional ones.

