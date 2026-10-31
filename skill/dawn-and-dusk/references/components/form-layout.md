# form layout — `form-layout`

How fields come together into a form: sections with a legend, a two-column grid that folds to one, an aside layout for settings pages, and a footer for the actions.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/form-layout

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### Section

A <fieldset> with a <legend> and a description. Fields sit in the grid below.

```html
<form class="dd-form" onsubmit="return false">
  <fieldset class="dd-form__section">
    <legend class="dd-form__legend">Build</legend>
    <p class="dd-form__desc">How dockey-ui is built before each deploy.</p>
    <div class="dd-form__grid">
    <div class="dd-field">
      <label class="dd-field__label" for="fl-1">Install command</label>
      <div class="dd-input"><input class="dd-input__control dd-mono" id="fl-1" value="npm ci"></div>
    </div>
    <div class="dd-field">
      <label class="dd-field__label" for="fl-2">Build command</label>
      <div class="dd-input"><input class="dd-input__control dd-mono" id="fl-2" value="npm run build"></div>
    </div>
    <div class="dd-field">
      <label class="dd-field__label" for="fl-3">Output directory</label>
      <div class="dd-input"><span class="dd-input__affix"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-folder"/></svg></span><input class="dd-input__control" id="fl-3" value="dist"></div>
    </div>
    <div class="dd-field">
      <label class="dd-field__label" for="fl-4">Node version</label>
      <div class="dd-input dd-select"><select class="dd-input__control" id="fl-4"><option selected>22.x</option><option>20.x</option></select><span class="dd-select__chevron"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></span></div>
    </div>
    </div>
  </fieldset>
</form>
```

## Two-column form

`.dd-form__grid` gives up to two equal columns and folds to one below about 30rem; `.dd-form__span` takes the full row. Tucked fields share one height, so rows line up.

Try it: clear the service name, or set the port above 65535, and press Create service. Errors clear as you fix them; Cancel resets.

```html
<form class="dd-form" id="fc-form" data-dd-validate novalidate onsubmit="return false">
  <div class="dd-form__grid">
    <div class="dd-field">
      <label class="dd-field__label" for="fc-1">Service name</label>
      <div class="dd-input"><input class="dd-input__control" id="fc-1" value="image-resizer" required pattern="[a-z0-9]+(-[a-z0-9]+)*" data-dd-error-missing="Give the service a name." data-dd-error="Use lowercase letters, numbers and single dashes."></div>
      <p class="dd-field__hint">Lowercase and dashes.</p>
    </div>
    <div class="dd-field">
      <label class="dd-field__label" for="fc-2">Region</label>
      <div class="dd-input dd-select"><select class="dd-input__control" id="fc-2"><option selected>eu-central-1 · Frankfurt</option><option>eu-west-1 · Dublin</option><option>us-east-1 · N. Virginia</option></select><span class="dd-select__chevron"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></span></div>
    </div>
    <div class="dd-field">
      <label class="dd-field__label" for="fc-3">Instance size</label>
      <div class="dd-input dd-select"><select class="dd-input__control" id="fc-3"><option>Small · 1 vCPU</option><option selected>Medium · 2 vCPU</option><option>Large · 4 vCPU</option></select><span class="dd-select__chevron"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></span></div>
    </div>
    <div class="dd-field">
      <label class="dd-field__label" for="fc-4">Port</label>
      <div class="dd-input"><input class="dd-input__control dd-num" id="fc-4" type="number" value="8080" required min="1" max="65535" data-dd-error-range="Ports run from 1 to 65535."><span class="dd-input__unit">TCP</span></div>
    </div>
    <div class="dd-field dd-form__span">
      <label class="dd-field__label" for="fc-5">Repository</label>
      <div class="dd-input"><span class="dd-input__unit dd-input__prefix">https://</span><input class="dd-input__control" id="fc-5" value="github.com/cxkw-dev/image-resizer" required data-dd-error="Add the repository to deploy from."></div>
    </div>
    <div class="dd-field dd-form__span">
      <label class="dd-field__label" for="fc-6">Description</label>
      <div class="dd-input dd-textarea"><textarea class="dd-input__control" id="fc-6" rows="2" placeholder="Resizes and caches images for edge-cache."></textarea></div>
    </div>
  </div>
  <div class="dd-form__footer">
    <button class="dd-btn dd-btn--ghost" type="reset">Cancel</button>
    <button class="dd-btn dd-btn--primary" type="submit"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-plus"/></svg><span>Create service</span></button>
  </div>
</form>
```

Add `data-dd-validate novalidate` to the form. On submit the browser’s own constraints (`required`, `type`, `pattern`, `min` / `max`) are checked and every failing control gets `aria-invalid` and an error under its box while a hint in that spot steps aside. Focus goes to the first problem and the submit stops before your own handler runs. Errors clear the moment the value is fixed, and change with the problem while they show; reset clears them all.

The message, first match wins: one you set from script with `setCustomValidity()` (a server check, a taken name); the control’s message for this problem — `data-dd-error-missing`, `-type`, `-pattern`, `-range` or `-length`; its `data-dd-error` for any problem; the browser’s own message. Above, an empty service name says “Give the service a name.” and a badly formed one falls back to `data-dd-error`; the port has its own range message, and an empty port gets the browser’s.

## Footer

Actions sit at the end of the form, primary last. A `.dd-form__meta` line on the left carries save state. `--sticky` pins it to the bottom of a long page; `--plain` drops the hairline. Keep it inside the `.dd-form`: when the form is 420px or narrower the meta line takes its own row and the buttons share the width evenly.

Try it: Save and Continue confirm with a toast; Discard resets the form.

```html
<div class="dd-stack" style="--dd-gap: 30px">
  <form class="dd-form" id="ff-save" onsubmit="return false">
    <div class="dd-form__footer">
      <span class="dd-form__meta"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-clock"/></svg>Last saved 2 minutes ago</span>
      <button class="dd-btn dd-btn--ghost" type="reset">Discard</button>
      <button class="dd-btn dd-btn--primary" type="submit">Save changes</button>
    </div>
  </form>
  <form class="dd-form" id="ff-next" onsubmit="return false">
    <div class="dd-form__footer dd-form__footer--plain" style="justify-content: space-between">
      <button class="dd-btn dd-btn--ghost" type="button"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-left"/></svg><span>Back</span></button>
      <button class="dd-btn dd-btn--primary" type="submit"><span>Continue</span><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-right"/></svg></button>
    </div>
  </form>
</div>
```

Add `.dd-form__footer--sticky` and the action row pins to the bottom of the nearest scrolling box (the page, or a panel like this one) until the end of the form scrolls into view. It takes the page’s tone and blurs what scrolls under it.

Try it: scroll the box — the footer stays put. Empty the email or set the interval to 5 and press Save alert: focus jumps to the problem.

```html
<div class="dd-scroll" role="region" aria-label="Alert settings (scrolls)" tabindex="0" style="max-height: 360px; overflow: auto">
<form class="dd-form" id="fs-form" data-dd-validate novalidate onsubmit="return false">
  <fieldset class="dd-form__section">
    <legend class="dd-form__legend">Uptime alert</legend>
    <p class="dd-form__desc">Checks auth-gateway every minute from three regions.</p>
    <div class="dd-form__grid">
    <div class="dd-field">
      <label class="dd-field__label" for="fs-1">Check URL</label>
      <div class="dd-input"><input class="dd-input__control" id="fs-1" type="url" value="https://auth.cxkw.dev/health" required></div>
    </div>
    <div class="dd-field">
      <label class="dd-field__label" for="fs-2">Interval</label>
      <div class="dd-input"><input class="dd-input__control dd-num" id="fs-2" type="number" value="60" min="30" max="3600" required><span class="dd-input__unit">s</span></div>
    </div>
    <div class="dd-field">
      <label class="dd-field__label" for="fs-3">Fail after</label>
      <div class="dd-input"><input class="dd-input__control dd-num" id="fs-3" type="number" value="3" min="1" max="10" required><span class="dd-input__unit">checks</span></div>
    </div>
    <div class="dd-field">
      <label class="dd-field__label" for="fs-4">Regions</label>
      <div class="dd-input dd-select"><select class="dd-input__control" id="fs-4"><option selected>All three</option><option>eu-west-1 only</option><option>us-east-1 only</option></select><span class="dd-select__chevron"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></span></div>
    </div>
    </div>
  </fieldset>
  <fieldset class="dd-form__section">
    <legend class="dd-form__legend">Who hears about it</legend>
    <div class="dd-form__grid">
    <div class="dd-field">
      <label class="dd-field__label" for="fs-5">Email</label>
      <div class="dd-input"><input class="dd-input__control" id="fs-5" type="email" value="oncall@cxkw.dev" required></div>
    </div>
    <div class="dd-field">
      <label class="dd-field__label" for="fs-6">Slack channel</label>
      <div class="dd-input"><input class="dd-input__control" id="fs-6" value="#incidents"></div>
    </div>
    <div class="dd-field">
      <label class="dd-field__label" for="fs-7">Escalate to</label>
      <div class="dd-input"><input class="dd-input__control" id="fs-7" value="Andy Nguyen"></div>
    </div>
    <div class="dd-field">
      <label class="dd-field__label" for="fs-8">After</label>
      <div class="dd-input"><input class="dd-input__control dd-num" id="fs-8" type="number" value="15" min="5" max="120"><span class="dd-input__unit">min</span></div>
    </div>
    </div>
  </fieldset>
  <fieldset class="dd-form__section">
    <legend class="dd-form__legend">Status page</legend>
    <div class="dd-form__grid">
    <div class="dd-field">
      <label class="dd-field__label" for="fs-9">Component name</label>
      <div class="dd-input"><input class="dd-input__control" id="fs-9" value="Sign-in"></div>
    </div>
    <div class="dd-field">
      <label class="dd-field__label" for="fs-10">Public message</label>
      <div class="dd-input"><input class="dd-input__control" id="fs-10" value="We are looking into it."></div>
    </div>
    </div>
  </fieldset>
  <div class="dd-form__footer dd-form__footer--sticky">
    <span class="dd-form__meta"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-clock"/></svg>Last saved Oct 30, 09:41</span>
    <button class="dd-btn dd-btn--ghost" type="reset">Discard</button>
    <button class="dd-btn dd-btn--primary" type="submit">Save alert</button>
  </div>
</form>
</div>
```

## Panel section

`.dd-form__section--panel` sets a section on a tonal panel — for a small form inside a bigger page.

Try it: Create key confirms with a toast.

```html
<form class="dd-form" id="fp-form" onsubmit="return false">
  <fieldset class="dd-form__section dd-form__section--panel">
    <legend class="dd-form__legend">API key</legend>
    <p class="dd-form__desc">For CI and the dd CLI. Shown once — store it somewhere safe.</p>
    <div class="dd-form__grid">
    <div class="dd-field">
      <label class="dd-field__label" for="fp-1">Name</label>
      <div class="dd-input"><input class="dd-input__control" id="fp-1" value="github-actions"></div>
    </div>
    <div class="dd-field">
      <label class="dd-field__label" for="fp-2">Expires</label>
      <div class="dd-input dd-select"><select class="dd-input__control" id="fp-2"><option>In 30 days</option><option selected>In 90 days</option><option>Never</option></select><span class="dd-select__chevron"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></span></div>
    </div>
    </div>
    <div class="dd-form__footer dd-form__footer--plain">
      <button class="dd-btn dd-btn--primary" type="submit"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-key"/></svg><span>Create key</span></button>
    </div>
  </fieldset>
</form>
```

## Settings page

A full example. `.dd-form--divided` draws a hairline between sections; `--aside` sections put their title and description on the left once the form is 640px wide (a container query, so it works in any column). Everything here waits for Save, so the on / off choices are checkboxes; a switch applies the moment it flips, so it belongs in a list that saves as you go.

Try it: change a few things, then Discard puts them all back (the counter re-counts).

```html
<form class="dd-form dd-form--divided" id="st-form" onsubmit="return false">
  <section class="dd-form__section dd-form__section--aside" aria-labelledby="st-general">
    <div class="dd-form__head">
      <h3 class="dd-form__title" id="st-general">General</h3>
      <p class="dd-form__desc">How the workspace appears on invoices, invites and status pages.</p>
    </div>
    <div class="dd-form__body">
      <div class="dd-form__grid">
    <div class="dd-field">
      <label class="dd-field__label" for="st-1">Workspace name</label>
      <div class="dd-input"><input class="dd-input__control" id="st-1" value="cxkw.dev"></div>
    </div>
    <div class="dd-field">
      <label class="dd-field__label" for="st-2">URL</label>
      <div class="dd-input"><span class="dd-input__unit dd-input__prefix">dash.cxkw.dev/</span><input class="dd-input__control" id="st-2" value="cxkw"></div>
    </div>
      </div>
      <div class="dd-field">
        <label class="dd-field__label" for="st-3">About</label>
        <div class="dd-input dd-textarea"><textarea class="dd-input__control" id="st-3" rows="2" maxlength="160">Small tools for focused work: dockey-ui, insomnia, ai-focus and leetnode.</textarea></div>
        <div class="dd-field__foot"><p class="dd-field__hint">Shown on the public status page.</p><span class="dd-field__counter">73 / 160</span></div>
      </div>
    </div>
  </section>

  <section class="dd-form__section dd-form__section--aside" aria-labelledby="st-deploys">
    <div class="dd-form__head">
      <h3 class="dd-form__title" id="st-deploys">Deploys</h3>
      <p class="dd-form__desc">Defaults for new services. Each service can override them.</p>
    </div>
    <div class="dd-form__body">
      <div class="dd-form__grid">
    <div class="dd-field">
      <label class="dd-field__label" for="st-4">Default region</label>
      <div class="dd-input dd-select"><select class="dd-input__control" id="st-4"><option selected>eu-west-1 · Dublin</option><option>eu-central-1 · Frankfurt</option><option>us-east-1 · N. Virginia</option></select><span class="dd-select__chevron"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></span></div>
    </div>
    <div class="dd-field">
      <label class="dd-field__label" for="st-5">Production branch</label>
      <div class="dd-input"><span class="dd-input__affix"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-code"/></svg></span><input class="dd-input__control" id="st-5" value="main"></div>
    </div>
      </div>
      <fieldset class="dd-radio-cards" style="--_min: 10rem">
        <legend class="dd-radio-group__legend">Strategy</legend>
        <label class="dd-radio-card dd-radio-card--row"><input class="dd-radio__input" type="radio" name="st-strategy" checked><span class="dd-radio__text"><span class="dd-radio-card__title">Rolling</span><span class="dd-radio-card__desc">No extra capacity</span></span><span class="dd-radio-card__mark"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span></label>
        <label class="dd-radio-card dd-radio-card--row"><input class="dd-radio__input" type="radio" name="st-strategy"><span class="dd-radio__text"><span class="dd-radio-card__title">Blue / green</span><span class="dd-radio-card__desc">Instant switch-over</span></span><span class="dd-radio-card__mark"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span></label>
      </fieldset>
      <label class="dd-checkbox">
        <input class="dd-checkbox__input" type="checkbox" checked>
        <span class="dd-checkbox__text"><span class="dd-checkbox__label">Preview deploys</span><span class="dd-checkbox__desc">Build every pull request to its own URL.</span></span>
      </label>
    </div>
  </section>

  <section class="dd-form__section dd-form__section--aside" aria-labelledby="st-notify">
    <div class="dd-form__head">
      <h3 class="dd-form__title" id="st-notify">Notifications</h3>
      <p class="dd-form__desc">Sent to every owner. Members choose their own.</p>
    </div>
    <div class="dd-form__body">
      <div class="dd-form__choices dd-form__choices--rows">
        <label class="dd-checkbox"><input class="dd-checkbox__input" type="checkbox" checked><span class="dd-checkbox__text"><span class="dd-checkbox__label">Failed deploys</span><span class="dd-checkbox__desc">Right away, with the build log.</span></span></label>
        <label class="dd-checkbox"><input class="dd-checkbox__input" type="checkbox"><span class="dd-checkbox__text"><span class="dd-checkbox__label">Spend alerts</span><span class="dd-checkbox__desc">When billing passes 80% of the budget.</span></span></label>
        <label class="dd-checkbox"><input class="dd-checkbox__input" type="checkbox" checked><span class="dd-checkbox__text"><span class="dd-checkbox__label">Weekly digest</span><span class="dd-checkbox__desc">Sundays: deploys, uptime and spend.</span></span></label>
      </div>
      <fieldset class="dd-checkbox-group dd-checkbox-group--inline">
        <legend class="dd-checkbox-group__legend">Channels</legend>
        <label class="dd-checkbox"><input class="dd-checkbox__input" type="checkbox" checked> Email</label>
        <label class="dd-checkbox"><input class="dd-checkbox__input" type="checkbox" checked> Slack</label>
        <label class="dd-checkbox"><input class="dd-checkbox__input" type="checkbox"> Webhook</label>
      </fieldset>
    </div>
  </section>

  <div class="dd-form__footer">
    <span class="dd-form__meta"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-clock"/></svg>Last saved Oct 30, 09:41</span>
    <button class="dd-btn dd-btn--ghost" type="reset">Discard</button>
    <button class="dd-btn dd-btn--primary" type="submit">Save changes</button>
  </div>
</form>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-form` | Vertical stack of sections; also the container for its layout queries. |
| `.dd-form--divided` | Hairline and extra space between sections. |
| `.dd-form__section` | A `<fieldset>` (with `__legend`) or `<section>` (with `__title`). |
| `.dd-form__section--aside` | Title column beside the fields from 640px of form width. |
| `.dd-form__section--panel` | Section on a tonal panel. |
| `.dd-form__head · __legend · __title · __desc` | Section heading and its muted description. |
| `.dd-form__body` | Field column of an aside section. |
| `.dd-form__grid · --3` | Responsive grid: up to two (or three) columns, folding to one. |
| `.dd-form__span` | Grid item that takes the full row. |
| `.dd-form__row` | Wrapping row of fields, each at least 12rem wide. |
| `.dd-form__choices · --rows` | Even stack of checkboxes (or of switches, in a list that applies each change at once); `--rows` adds hairlines. |
| `.dd-form__footer · --sticky · --plain` | Action row. `.dd-form__meta` holds status on the left. |

## Behaviour

`ds/behaviors/form-layout.js` adds validation on submit, in the form’s own style.

| class / attribute | what it does |
|---|---|
| `form[data-dd-validate][novalidate]` | Checks the form’s controls on submit with the browser’s constraints. Invalid ones get `aria-invalid="true"` and a `.dd-field__error` linked by `aria-describedby`; focus moves to the first, and the submit event stops before other listeners. Errors clear on input once valid, re-check on change, and all clear on reset. |
| `data-dd-error-missing="…"` | On a control: the error when it is `required` and empty. |
| `data-dd-error-type="…"` | The error when the value isn’t of its `type` (an email, a URL) or a number box holds text. |
| `data-dd-error-pattern="…"` | The error when the value doesn’t match `pattern`. |
| `data-dd-error-range="…"` | The error when a number or date is under `min`, over `max` or off its `step`. |
| `data-dd-error-length="…"` | The error when the text is shorter than `minlength` or longer than `maxlength`. |
| `data-dd-error="…"` | On a control: the error for any problem without its own message above, instead of the browser’s. |
| `setCustomValidity("…")` | From script: wins over every attribute. Clear it with `setCustomValidity("")` once the problem is gone. |
| `formnovalidate` | On a submit button: submit without checking (e.g. “Save draft”). |

## Guidelines

Do:
- Group related fields under a section title; five to seven fields per section is plenty.
- Put the primary action last in the footer, and only one.
- Use two columns only for short, related pairs (city / postcode, region / size).

Don't:
- Don’t split one question across columns.
- Don’t mix tucked and label-above fields in a section.
- Don’t put Save at the top and the bottom of the same form.
- Don’t put switches in a form with a Save button: a switch applies at once, a checkbox waits for Save.

