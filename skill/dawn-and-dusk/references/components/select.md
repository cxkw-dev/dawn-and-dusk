# select — `select`

Pick one option from a list. Use the native select for plain text options — it is the best picker on phones — and the custom select menu when options need icons, descriptions or metadata.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/select

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### Native select

A real <select> in the tonal box, with the label tucked in and a chevron. Option groups and placeholders work as usual.

```html
<div class="dd-form__grid">
  <div class="dd-field">
    <label class="dd-field__label" for="sn-1">Region</label>
    <div class="dd-input dd-select">
      <select class="dd-input__control" id="sn-1">
        <optgroup label="Europe">
          <option value="eu-west-1" selected>eu-west-1 · Dublin</option>
          <option value="eu-central-1">eu-central-1 · Frankfurt</option>
        </optgroup>
        <optgroup label="North America">
          <option value="us-east-1">us-east-1 · N. Virginia</option>
          <option value="us-west-2">us-west-2 · Oregon</option>
        </optgroup>
      </select>
      <span class="dd-select__chevron"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></span>
    </div>
  </div>
  <div class="dd-field">
    <label class="dd-field__label" for="sn-2">Runtime</label>
    <div class="dd-input dd-select">
      <select class="dd-input__control" id="sn-2">
        <option value="" disabled selected>Choose a runtime</option>
        <option>Node 22</option>
        <option>Deno 2</option>
        <option>Bun 1.2</option>
      </select>
      <span class="dd-select__chevron"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></span>
    </div>
    <p class="dd-field__hint">Used for build and preview.</p>
  </div>
</div>
```

## States

Set `aria-invalid="true"` or `disabled` on the `<select>`; the box and the tucked label follow. A custom trigger takes `disabled` the same way; for the error look give it both `aria-invalid="true"` and `.is-invalid`.

```html
<div class="dd-form__grid">
  <div class="dd-field">
    <label class="dd-field__label" for="ss-1">Log level</label>
    <div class="dd-input dd-select">
      <select class="dd-input__control" id="ss-1" aria-invalid="true" aria-describedby="ss-1-err">
        <option>trace</option><option selected>debug</option><option>info</option>
      </select>
      <span class="dd-select__chevron"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></span>
    </div>
    <p class="dd-field__error" id="ss-1-err">Debug logging is off in production.</p>
  </div>
  <div class="dd-field">
    <label class="dd-field__label" for="ss-2">Billing plan</label>
    <div class="dd-input dd-select">
      <select class="dd-input__control" id="ss-2" disabled><option>Studio</option></select>
      <span class="dd-select__chevron"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></span>
    </div>
    <p class="dd-field__hint">Only owners can change the plan.</p>
  </div>
</div>
```

## Custom select menu

A button that opens a `.dd-listbox`. Options can carry an icon, a colour swatch, a description and mono metadata; the chosen one shows a check and is copied into the trigger.

Try it: open Environment and pick with the mouse, or focus Owner and press ↓, type “j”, then Enter. Save shows what was chosen.

```html
<form class="dd-form" id="se-form" onsubmit="return false">
<div class="dd-form__grid">
  <div class="dd-field">
    <span class="dd-field__label" id="se-label">Environment</span>
    <div class="dd-select-menu" data-dd-select>
      <button class="dd-input dd-select" type="button" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="se-label se-value">
        <span class="dd-input__control" id="se-value" data-dd-select-value><span class="dd-listbox__icon"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-globe"/></svg></span>Production</span>
        <span class="dd-select__chevron"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></span>
      </button>
      <ul class="dd-listbox" role="listbox" tabindex="-1" aria-labelledby="se-label" hidden>
        <li class="dd-listbox__option" role="option" id="se-0" data-value="production" aria-selected="true">
          <span class="dd-listbox__icon"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-globe"/></svg></span>
          <span class="dd-listbox__text"><span class="dd-listbox__label">Production</span><span class="dd-listbox__desc">cxkw.dev · protected</span></span>
          <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
        </li>
        <li class="dd-listbox__option" role="option" id="se-1" data-value="preview" aria-selected="false">
          <span class="dd-listbox__icon"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-eye"/></svg></span>
          <span class="dd-listbox__text"><span class="dd-listbox__label">Preview</span><span class="dd-listbox__desc">Every pull request</span></span>
          <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
        </li>
        <li class="dd-listbox__option" role="option" id="se-2" data-value="development" aria-selected="false">
          <span class="dd-listbox__icon"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-code"/></svg></span>
          <span class="dd-listbox__text"><span class="dd-listbox__label">Development</span><span class="dd-listbox__desc">Local tunnels</span></span>
          <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
        </li>
      </ul>
    </div>
  </div>
  <div class="dd-field">
    <span class="dd-field__label" id="sp-label">Owner</span>
    <div class="dd-select-menu" data-dd-select>
      <button class="dd-input dd-select" type="button" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="sp-label sp-value">
        <span class="dd-input__control dd-select__placeholder" id="sp-value" data-dd-select-value>Unassigned</span>
        <span class="dd-select__chevron"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></span>
      </button>
      <ul class="dd-listbox" role="listbox" tabindex="-1" aria-labelledby="sp-label" hidden>
        <li class="dd-listbox__option" role="option" data-value="andy" aria-selected="false"><span class="dd-listbox__swatch" style="--dd-chip: var(--dd-set-7)"></span><span class="dd-listbox__text"><span class="dd-listbox__label">Andy Nguyen</span></span><span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span></li>
        <li class="dd-listbox__option" role="option" data-value="mika" aria-selected="false"><span class="dd-listbox__swatch" style="--dd-chip: var(--dd-set-5)"></span><span class="dd-listbox__text"><span class="dd-listbox__label">Mika Kato</span></span><span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span></li>
        <li class="dd-listbox__option" role="option" data-value="jules" aria-selected="false"><span class="dd-listbox__swatch" style="--dd-chip: var(--dd-set-1)"></span><span class="dd-listbox__text"><span class="dd-listbox__label">Jules Sato</span></span><span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span></li>
      </ul>
    </div>
  </div>
  <div class="dd-field dd-form__span">
    <label class="dd-field__label" for="se-note">Escalation</label>
    <div class="dd-input"><input class="dd-input__control" id="se-note" value="Page the owner if a deploy fails twice in an hour"></div>
  </div>
</div>
<div class="dd-form__footer">
  <button class="dd-btn dd-btn--ghost" type="button">Cancel</button>
  <button class="dd-btn dd-btn--primary" type="submit">Save alert rule</button>
</div>
</form>
```

Group labels use the menu’s small caps. Disabled options stay visible so people learn why they can’t pick them.

Rendered open to show the anatomy; it works like the others. Try it: End skips the disabled Singapore option; type “e” twice to step through the eu- regions.

```html
<div class="dd-field" style="max-width: 340px">
  <span class="dd-field__label" id="sc-label">Primary region</span>
  <div class="dd-select-menu is-open" data-dd-select>
    <button class="dd-input dd-select" type="button" aria-haspopup="listbox" aria-expanded="true" aria-controls="sc-list" aria-labelledby="sc-label sc-value">
      <span class="dd-input__control" id="sc-value" data-dd-select-value>eu-west-1</span>
      <span class="dd-select__chevron"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></span>
    </button>
      <ul class="dd-listbox" role="listbox" id="sc-list" tabindex="-1" aria-labelledby="sc-label">
        <li class="dd-listbox__group" role="presentation">Europe</li>
        <li class="dd-listbox__option" role="option" id="sc-00" data-value="eu-west-1" aria-selected="true">
          <span class="dd-listbox__text"><span class="dd-listbox__label">eu-west-1</span><span class="dd-listbox__desc">Dublin</span></span>
          <span class="dd-listbox__meta">18 ms</span>
          <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
        </li>
        <li class="dd-listbox__option" role="option" id="sc-01" data-value="eu-central-1" aria-selected="false">
          <span class="dd-listbox__text"><span class="dd-listbox__label">eu-central-1</span><span class="dd-listbox__desc">Frankfurt</span></span>
          <span class="dd-listbox__meta">24 ms</span>
          <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
        </li>
        <li class="dd-listbox__group" role="presentation">North America</li>
        <li class="dd-listbox__option" role="option" id="sc-10" data-value="us-east-1" aria-selected="false">
          <span class="dd-listbox__text"><span class="dd-listbox__label">us-east-1</span><span class="dd-listbox__desc">N. Virginia</span></span>
          <span class="dd-listbox__meta">82 ms</span>
          <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
        </li>
        <li class="dd-listbox__option" role="option" id="sc-11" data-value="us-west-2" aria-selected="false">
          <span class="dd-listbox__text"><span class="dd-listbox__label">us-west-2</span><span class="dd-listbox__desc">Oregon</span></span>
          <span class="dd-listbox__meta">141 ms</span>
          <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
        </li>
        <li class="dd-listbox__group" role="presentation">Asia Pacific</li>
        <li class="dd-listbox__option" role="option" id="sc-20" data-value="ap-southeast-1" aria-selected="false" aria-disabled="true">
          <span class="dd-listbox__text"><span class="dd-listbox__label">ap-southeast-1</span><span class="dd-listbox__desc">Singapore · at capacity</span></span>
          <span class="dd-listbox__meta">190 ms</span>
          <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
        </li>
      </ul>
    <input type="hidden" name="region" value="eu-west-1">
  </div>
</div>
```

Add `aria-multiselectable="true"` to the listbox. Choosing toggles an option and keeps the list open; the trigger lists what is chosen (or its `data-dd-placeholder` when nothing is), and a hidden input gets the values joined by commas. Past a handful of options, or when people type to find them, use a multi-select combobox instead.

Try it: open the list, toggle a few with Space or a click, then Esc.

```html
<div class="dd-field" style="max-width: 340px">
  <span class="dd-field__label" id="sm-label">Notify me about</span>
  <div class="dd-select-menu" data-dd-select>
    <button class="dd-input dd-select" type="button" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="sm-label sm-value">
      <span class="dd-input__control" id="sm-value" data-dd-select-value data-dd-placeholder="Nothing">Failed deploys, Rollbacks</span>
      <span class="dd-select__chevron"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></span>
    </button>
    <ul class="dd-listbox" role="listbox" tabindex="-1" aria-labelledby="sm-label" aria-multiselectable="true" hidden>
        <li class="dd-listbox__option" role="option" id="sm-0" data-value="deploy-failed" aria-selected="true">
          <span class="dd-listbox__icon"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-error"/></svg></span>
          <span class="dd-listbox__text"><span class="dd-listbox__label">Failed deploys</span></span>
          <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
        </li>
        <li class="dd-listbox__option" role="option" id="sm-1" data-value="rollback" aria-selected="true">
          <span class="dd-listbox__icon"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-refresh"/></svg></span>
          <span class="dd-listbox__text"><span class="dd-listbox__label">Rollbacks</span></span>
          <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
        </li>
        <li class="dd-listbox__option" role="option" id="sm-2" data-value="deploy-ok" aria-selected="false">
          <span class="dd-listbox__icon"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-success"/></svg></span>
          <span class="dd-listbox__text"><span class="dd-listbox__label">Successful deploys</span></span>
          <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
        </li>
        <li class="dd-listbox__option" role="option" id="sm-3" data-value="spend" aria-selected="false">
          <span class="dd-listbox__icon"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chart"/></svg></span>
          <span class="dd-listbox__text"><span class="dd-listbox__label">Spend alerts</span></span>
          <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
        </li>
        <li class="dd-listbox__option" role="option" id="sm-4" data-value="incident" aria-selected="false" aria-disabled="true">
          <span class="dd-listbox__icon"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-alert"/></svg></span>
          <span class="dd-listbox__text"><span class="dd-listbox__label">Incidents</span><span class="dd-listbox__desc">Always on for owners</span></span>
          <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
        </li>
    </ul>
    <input type="hidden" name="notify" value="deploy-failed,rollback">
  </div>
</div>
```

## In a toolbar

Without a field the trigger is button height; size it to its content with `width: auto`. The list floats over the content below.

Try it: pick a sort order; the list floats over the table.

```html
<div class="dd-stack" style="--dd-gap: 10px">
<div class="dd-row">
  <div class="dd-select-menu" data-dd-select>
    <button class="dd-input dd-input--sm dd-select" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="Sort deploys" style="width: auto">
      <span class="dd-input__control" data-dd-select-value><span class="dd-listbox__icon"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-sort"/></svg></span>Newest first</span>
      <span class="dd-select__chevron"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></span>
    </button>
    <ul class="dd-listbox" role="listbox" tabindex="-1" aria-label="Sort deploys" hidden>
      <li class="dd-listbox__option" role="option" aria-selected="true"><span class="dd-listbox__icon"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-sort"/></svg></span><span class="dd-listbox__text"><span class="dd-listbox__label">Newest first</span></span><span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span></li>
      <li class="dd-listbox__option" role="option" aria-selected="false"><span class="dd-listbox__icon"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-clock"/></svg></span><span class="dd-listbox__text"><span class="dd-listbox__label">Longest build</span></span><span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span></li>
      <li class="dd-listbox__option" role="option" aria-selected="false"><span class="dd-listbox__icon"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-error"/></svg></span><span class="dd-listbox__text"><span class="dd-listbox__label">Failures first</span></span><span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span></li>
    </ul>
  </div>
  <div class="dd-input dd-input--sm dd-select" style="width: auto">
    <select class="dd-input__control" aria-label="Branch"><option>main</option><option>release/2.4</option></select>
    <span class="dd-select__chevron"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></span>
  </div>
</div>
<div class="dd-table">
  <table>
    <thead><tr><th>Service</th><th>Commit</th><th class="is-num">Build</th><th class="is-num">Started</th></tr></thead>
    <tbody>
      <tr><td>billing-worker</td><td class="dd-mono">a41f9c2</td><td class="is-num">1m 12s</td><td class="is-num is-muted">4 min ago</td></tr>
      <tr><td>edge-cache</td><td class="dd-mono">9be03d7</td><td class="is-num">48s</td><td class="is-num is-muted">22 min ago</td></tr>
      <tr><td>auth-gateway</td><td class="dd-mono">17c5e80</td><td class="is-num">2m 03s</td><td class="is-num is-muted">1 h ago</td></tr>
      <tr><td>dockey-ui</td><td class="dd-mono">e2d6b11</td><td class="is-num">1m 37s</td><td class="is-num is-muted">3 h ago</td></tr>
    </tbody>
  </table>
</div>
</div>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-input.dd-select` | Select box: native `<select class="dd-input__control">` inside, or the custom trigger `<button>` itself. |
| `.dd-select__chevron` | Trailing chevron (wrap the icon). Flips while the custom menu is open. |
| `.dd-select__placeholder` | Quiet text in the trigger before anything is chosen. |
| `.dd-select-menu` | Wrapper for the custom select: anchors the listbox under the trigger. `.is-open` while the list shows. |
| `.dd-listbox` | Floating option list (`role="listbox"`). `--up` opens above, `--end` aligns right, `--static` renders in flow. |
| `.dd-listbox__option` | An option (`role="option"`). `aria-selected` (check), `aria-disabled` (quiet, never highlights), `.is-active` (the one highlighted row — keyboard and pointer share it). |
| `.dd-listbox__group · __sep` | Small-caps group label (`role="presentation"`) and hairline divider. |
| `.dd-listbox__icon · __swatch` | Leading icon, or a colour dot from `--dd-chip` (e.g. `var(--dd-set-3)`). |
| `.dd-listbox__text · __label · __desc` | Label stack with an optional muted description. |
| `.dd-listbox__meta · __check` | Mono metadata (latency, counts) and the selected check. |
| `.dd-listbox__empty` | Shown when filtering leaves nothing (combobox). |

## Behaviour

Add `data-dd-select` to the `.dd-select-menu`. The script wires `aria-expanded`, `aria-controls` and `aria-activedescendant`, writes the chosen label into `[data-dd-select-value]`, puts the option’s `data-value` (or its label) into an optional hidden input and fires `change` on it, and fires a bubbling `dd:select` event (and the legacy `dd-select` event) with `{ value, label, option, values, selected }` — `values` is every chosen value (one, unless the list is multiple) and `selected` says whether the option was turned on or off.

| class / attribute | what it does |
|---|---|
| `Enter · Space · ↓ · ↑` | On the trigger: open the list on the selected option (↑ opens on the last). |
| `Home · End` | On the trigger: open on the first or last option. |
| `↑ ↓ · Home · End` | Move through enabled options; disabled ones are skipped. Page Up / Page Down jump like Home / End. |
| `a–z` | Type to jump to the option that starts with the letters; the same letter again moves to the next one. Typing on the closed trigger opens it there. |
| `Enter · Space` | Choose the active option and close. In a multiple list: toggle it and stay open. |
| `Esc · Tab` | Close (Esc returns focus to the trigger). Clicking outside, or focus leaving the menu, also closes it. |

## Guidelines

Do:
- Use the native select for short, plain lists — especially on mobile.
- Order options by likelihood, or alphabetically when there is no obvious order.
- Switch to a combobox once the list passes about 15 options.

Don't:
- Don’t use a select for two options — use a switch or a radio group.
- Don’t hide disabled options people expect to see; explain them in the description.
- Don’t put actions (“Add new…”) inside a select — use a menu.

