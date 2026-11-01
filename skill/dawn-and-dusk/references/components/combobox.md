# combobox — `combobox`

A text input that filters a list as you type. Single select fills the field with the choice; multi select collects choices as chips in Color set hues.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/combobox

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### Searchable select

Shown open on the current choice: groups, a description and mono metadata per row, a check on the chosen one. Click outside to close it; click, type or press ↓ to open it again.

```html
<div class="dd-field" style="max-width: 380px">
  <label class="dd-field__label" id="cbx-1-label" for="cbx-1">Service</label>
  <div class="dd-combobox is-open" data-dd-combobox>
    <div class="dd-input">
      <span class="dd-input__affix"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-server"/></svg></span>
      <input class="dd-input__control" id="cbx-1" role="combobox" aria-autocomplete="list" aria-expanded="true" aria-controls="cbx-1-list" autocomplete="off" placeholder="Search services" value="billing-worker">
      <span class="dd-input__affix"><button class="dd-input__btn dd-combobox__toggle" type="button" tabindex="-1" data-dd-combobox-toggle aria-label="Show services"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></button></span>
    </div>
    <ul class="dd-listbox" role="listbox" id="cbx-1-list" aria-labelledby="cbx-1-label">
      <li class="dd-listbox__group" role="presentation">Edge</li>
      <li class="dd-listbox__option" role="option" data-value="auth-gateway" aria-selected="false">
        <span class="dd-listbox__text"><span class="dd-listbox__label">auth-gateway</span><span class="dd-listbox__desc">Sessions, tokens, SSO</span></span>
        <span class="dd-listbox__meta">eu-west-1</span>
        <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
      </li>
      <li class="dd-listbox__option" role="option" data-value="edge-cache" aria-selected="false">
        <span class="dd-listbox__text"><span class="dd-listbox__label">edge-cache</span><span class="dd-listbox__desc">CDN and image cache</span></span>
        <span class="dd-listbox__meta">global</span>
        <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
      </li>
      <li class="dd-listbox__group" role="presentation">Workers</li>
      <li class="dd-listbox__option is-active" role="option" data-value="billing-worker" aria-selected="true">
        <span class="dd-listbox__text"><span class="dd-listbox__label">billing-worker</span><span class="dd-listbox__desc">Invoices and usage</span></span>
        <span class="dd-listbox__meta">us-east-1</span>
        <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
      </li>
      <li class="dd-listbox__option" role="option" data-value="log-shipper" aria-selected="false">
        <span class="dd-listbox__text"><span class="dd-listbox__label">log-shipper</span><span class="dd-listbox__desc">Streams logs to storage</span></span>
        <span class="dd-listbox__meta">eu-west-1</span>
        <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
      </li>
      <li class="dd-listbox__option" role="option" data-value="image-resizer" aria-selected="false">
        <span class="dd-listbox__text"><span class="dd-listbox__label">image-resizer</span><span class="dd-listbox__desc">On-demand thumbnails</span></span>
        <span class="dd-listbox__meta">eu-central-1</span>
        <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
      </li>
      <li class="dd-listbox__group" role="presentation">Apps</li>
      <li class="dd-listbox__option" role="option" data-value="dockey-ui" aria-selected="false">
        <span class="dd-listbox__text"><span class="dd-listbox__label">dockey-ui</span><span class="dd-listbox__desc">Dashboard front end</span></span>
        <span class="dd-listbox__meta">global</span>
        <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
      </li>
      <li class="dd-listbox__option" role="option" data-value="ai-focus" aria-selected="false">
        <span class="dd-listbox__text"><span class="dd-listbox__label">ai-focus</span><span class="dd-listbox__desc">Focus timer and notes</span></span>
        <span class="dd-listbox__meta">us-west-2</span>
        <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
      </li>
      <li class="dd-listbox__empty" role="presentation" hidden>No services match.</li>
    </ul>
  </div>
</div>
```

## Filtering

The list narrows on every keystroke and the first match is active, so Enter picks it. The same markup, opened with “er” typed:

Try it: type more letters, press ↓ ↑ to move and Enter to choose; Esc closes, Esc again clears.

```html
<div class="dd-field" style="max-width: 380px">
  <label class="dd-field__label" id="cbx-2-label" for="cbx-2">Service</label>
  <div class="dd-combobox is-open" data-dd-combobox>
    <div class="dd-input">
      <span class="dd-input__affix"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-server"/></svg></span>
      <input class="dd-input__control" id="cbx-2" role="combobox" aria-autocomplete="list" aria-expanded="true" aria-controls="cbx-2-list" autocomplete="off" placeholder="Search services" value="er">
      <span class="dd-input__affix"><button class="dd-input__btn dd-combobox__toggle" type="button" tabindex="-1" data-dd-combobox-toggle aria-label="Show services"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></button></span>
    </div>
    <ul class="dd-listbox" role="listbox" id="cbx-2-list" aria-labelledby="cbx-2-label">
      <li class="dd-listbox__group" role="presentation" hidden>Edge</li>
      <li class="dd-listbox__option" role="option" data-value="auth-gateway" aria-selected="false" hidden>
        <span class="dd-listbox__text"><span class="dd-listbox__label">auth-gateway</span><span class="dd-listbox__desc">Sessions, tokens, SSO</span></span>
        <span class="dd-listbox__meta">eu-west-1</span>
        <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
      </li>
      <li class="dd-listbox__option" role="option" data-value="edge-cache" aria-selected="false" hidden>
        <span class="dd-listbox__text"><span class="dd-listbox__label">edge-cache</span><span class="dd-listbox__desc">CDN and image cache</span></span>
        <span class="dd-listbox__meta">global</span>
        <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
      </li>
      <li class="dd-listbox__group" role="presentation">Workers</li>
      <li class="dd-listbox__option is-active" role="option" data-value="billing-worker" aria-selected="false">
        <span class="dd-listbox__text"><span class="dd-listbox__label">billing-work<mark class="dd-listbox__match">er</mark></span><span class="dd-listbox__desc">Invoices and usage</span></span>
        <span class="dd-listbox__meta">us-east-1</span>
        <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
      </li>
      <li class="dd-listbox__option" role="option" data-value="log-shipper" aria-selected="false">
        <span class="dd-listbox__text"><span class="dd-listbox__label">log-shipp<mark class="dd-listbox__match">er</mark></span><span class="dd-listbox__desc">Streams logs to storage</span></span>
        <span class="dd-listbox__meta">eu-west-1</span>
        <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
      </li>
      <li class="dd-listbox__option" role="option" data-value="image-resizer" aria-selected="false">
        <span class="dd-listbox__text"><span class="dd-listbox__label">image-resiz<mark class="dd-listbox__match">er</mark></span><span class="dd-listbox__desc">On-demand thumbnails</span></span>
        <span class="dd-listbox__meta">eu-central-1</span>
        <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
      </li>
      <li class="dd-listbox__group" role="presentation" hidden>Apps</li>
      <li class="dd-listbox__option" role="option" data-value="dockey-ui" aria-selected="false" hidden>
        <span class="dd-listbox__text"><span class="dd-listbox__label">dockey-ui</span><span class="dd-listbox__desc">Dashboard front end</span></span>
        <span class="dd-listbox__meta">global</span>
        <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
      </li>
      <li class="dd-listbox__option" role="option" data-value="ai-focus" aria-selected="false" hidden>
        <span class="dd-listbox__text"><span class="dd-listbox__label">ai-focus</span><span class="dd-listbox__desc">Focus timer and notes</span></span>
        <span class="dd-listbox__meta">us-west-2</span>
        <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
      </li>
      <li class="dd-listbox__empty" role="presentation" hidden>No services match.</li>
    </ul>
  </div>
</div>
```

Include a `.dd-listbox__empty` row; the script shows it when nothing is left.

Try it: delete a few letters and the matches come back.

```html
<div class="dd-field" style="max-width: 380px">
  <label class="dd-field__label" id="cbx-3-label" for="cbx-3">Service</label>
  <div class="dd-combobox is-open" data-dd-combobox>
    <div class="dd-input">
      <span class="dd-input__affix"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-server"/></svg></span>
      <input class="dd-input__control" id="cbx-3" role="combobox" aria-autocomplete="list" aria-expanded="true" aria-controls="cbx-3-list" autocomplete="off" placeholder="Search services" value="redis">
      <span class="dd-input__affix"><button class="dd-input__btn dd-combobox__toggle" type="button" tabindex="-1" data-dd-combobox-toggle aria-label="Show services"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></button></span>
    </div>
    <ul class="dd-listbox" role="listbox" id="cbx-3-list" aria-labelledby="cbx-3-label">
      <li class="dd-listbox__group" role="presentation" hidden>Edge</li>
      <li class="dd-listbox__option" role="option" data-value="auth-gateway" aria-selected="false" hidden>
        <span class="dd-listbox__text"><span class="dd-listbox__label">auth-gateway</span><span class="dd-listbox__desc">Sessions, tokens, SSO</span></span>
        <span class="dd-listbox__meta">eu-west-1</span>
        <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
      </li>
      <li class="dd-listbox__option" role="option" data-value="edge-cache" aria-selected="false" hidden>
        <span class="dd-listbox__text"><span class="dd-listbox__label">edge-cache</span><span class="dd-listbox__desc">CDN and image cache</span></span>
        <span class="dd-listbox__meta">global</span>
        <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
      </li>
      <li class="dd-listbox__group" role="presentation" hidden>Workers</li>
      <li class="dd-listbox__option" role="option" data-value="billing-worker" aria-selected="false" hidden>
        <span class="dd-listbox__text"><span class="dd-listbox__label">billing-worker</span><span class="dd-listbox__desc">Invoices and usage</span></span>
        <span class="dd-listbox__meta">us-east-1</span>
        <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
      </li>
      <li class="dd-listbox__option" role="option" data-value="log-shipper" aria-selected="false" hidden>
        <span class="dd-listbox__text"><span class="dd-listbox__label">log-shipper</span><span class="dd-listbox__desc">Streams logs to storage</span></span>
        <span class="dd-listbox__meta">eu-west-1</span>
        <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
      </li>
      <li class="dd-listbox__option" role="option" data-value="image-resizer" aria-selected="false" hidden>
        <span class="dd-listbox__text"><span class="dd-listbox__label">image-resizer</span><span class="dd-listbox__desc">On-demand thumbnails</span></span>
        <span class="dd-listbox__meta">eu-central-1</span>
        <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
      </li>
      <li class="dd-listbox__group" role="presentation" hidden>Apps</li>
      <li class="dd-listbox__option" role="option" data-value="dockey-ui" aria-selected="false" hidden>
        <span class="dd-listbox__text"><span class="dd-listbox__label">dockey-ui</span><span class="dd-listbox__desc">Dashboard front end</span></span>
        <span class="dd-listbox__meta">global</span>
        <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
      </li>
      <li class="dd-listbox__option" role="option" data-value="ai-focus" aria-selected="false" hidden>
        <span class="dd-listbox__text"><span class="dd-listbox__label">ai-focus</span><span class="dd-listbox__desc">Focus timer and notes</span></span>
        <span class="dd-listbox__meta">us-west-2</span>
        <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
      </li>
      <li class="dd-listbox__empty" role="presentation">No services match.</li>
    </ul>
  </div>
</div>
```

## Multi select with chips

Add `data-dd-combobox="multi"` and `.dd-combobox--multi`. Each choice becomes a chip coloured from the option’s `data-set` (1–8, the Color set), or by its position when it has none. Backspace in the empty input removes the last chip; the list stays open while you pick.

Try it: click labels to add or remove them, type to filter, or press Backspace in the empty field.

```html
<div class="dd-field" style="max-width: 420px">
  <label class="dd-field__label" id="cbm-1-label" for="cbm-1">Labels</label>
  <div class="dd-combobox dd-combobox--multi is-open" data-dd-combobox="multi">
    <div class="dd-input">
      <span class="dd-combobox__chip" style="--dd-chip: var(--dd-set-1)" data-value="frontend"><span>frontend</span><button class="dd-combobox__remove" type="button" aria-label="Remove frontend"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button></span>
      <span class="dd-combobox__chip" style="--dd-chip: var(--dd-set-3)" data-value="billing"><span>billing</span><button class="dd-combobox__remove" type="button" aria-label="Remove billing"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button></span>
      <span class="dd-combobox__chip" style="--dd-chip: var(--dd-set-5)" data-value="design-system"><span>design-system</span><button class="dd-combobox__remove" type="button" aria-label="Remove design-system"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button></span>
      <input class="dd-input__control" id="cbm-1" role="combobox" aria-autocomplete="list" aria-expanded="true" aria-controls="cbm-1-list" autocomplete="off" placeholder="Add a label">
      <span class="dd-input__affix"><button class="dd-input__btn dd-combobox__toggle" type="button" tabindex="-1" data-dd-combobox-toggle aria-label="Show labels"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></button></span>
    </div>
    <ul class="dd-listbox" role="listbox" id="cbm-1-list" aria-labelledby="cbm-1-label" aria-multiselectable="true">
      <li class="dd-listbox__option is-active" role="option" data-value="frontend" data-set="1" aria-selected="true">
        <span class="dd-listbox__swatch" style="--dd-chip: var(--dd-set-1)"></span>
        <span class="dd-listbox__text"><span class="dd-listbox__label">frontend</span></span>
        <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
      </li>
      <li class="dd-listbox__option" role="option" data-value="infra" data-set="2" aria-selected="false">
        <span class="dd-listbox__swatch" style="--dd-chip: var(--dd-set-2)"></span>
        <span class="dd-listbox__text"><span class="dd-listbox__label">infra</span></span>
        <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
      </li>
      <li class="dd-listbox__option" role="option" data-value="billing" data-set="3" aria-selected="true">
        <span class="dd-listbox__swatch" style="--dd-chip: var(--dd-set-3)"></span>
        <span class="dd-listbox__text"><span class="dd-listbox__label">billing</span></span>
        <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
      </li>
      <li class="dd-listbox__option" role="option" data-value="incident" data-set="4" aria-selected="false">
        <span class="dd-listbox__swatch" style="--dd-chip: var(--dd-set-4)"></span>
        <span class="dd-listbox__text"><span class="dd-listbox__label">incident</span></span>
        <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
      </li>
      <li class="dd-listbox__option" role="option" data-value="design-system" data-set="5" aria-selected="true">
        <span class="dd-listbox__swatch" style="--dd-chip: var(--dd-set-5)"></span>
        <span class="dd-listbox__text"><span class="dd-listbox__label">design-system</span></span>
        <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
      </li>
      <li class="dd-listbox__option" role="option" data-value="docs" data-set="6" aria-selected="false">
        <span class="dd-listbox__swatch" style="--dd-chip: var(--dd-set-6)"></span>
        <span class="dd-listbox__text"><span class="dd-listbox__label">docs</span></span>
        <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
      </li>
      <li class="dd-listbox__option" role="option" data-value="performance" data-set="7" aria-selected="false">
        <span class="dd-listbox__swatch" style="--dd-chip: var(--dd-set-7)"></span>
        <span class="dd-listbox__text"><span class="dd-listbox__label">performance</span></span>
        <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
      </li>
      <li class="dd-listbox__option" role="option" data-value="good first issue" data-set="8" aria-selected="false">
        <span class="dd-listbox__swatch" style="--dd-chip: var(--dd-set-8)"></span>
        <span class="dd-listbox__text"><span class="dd-listbox__label">good first issue</span></span>
        <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
      </li>
      <li class="dd-listbox__empty" role="presentation" hidden>No labels match.</li>
    </ul>
    <input type="hidden" name="labels" value="frontend,billing,design-system">
  </div>
</div>
```

Add `data-dd-combobox-create` when people may add values. Once the text matches no option exactly, a `.dd-combobox__create` row ends the list; choosing it adds the option and selects it, and the event’s detail carries `created: true`.

Try it: type a label that isn’t in the list, like “flaky-test”, and press Enter.

```html
<div class="dd-field" style="max-width: 420px">
  <label class="dd-field__label" id="cbm-2-label" for="cbm-2">Labels</label>
  <div class="dd-combobox dd-combobox--multi" data-dd-combobox="multi" data-dd-combobox-create>
    <div class="dd-input">
      <span class="dd-combobox__chip" style="--dd-chip: var(--dd-set-2)" data-value="infra"><span>infra</span><button class="dd-combobox__remove" type="button" aria-label="Remove infra"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button></span>
      <span class="dd-combobox__chip" style="--dd-chip: var(--dd-set-4)" data-value="incident"><span>incident</span><button class="dd-combobox__remove" type="button" aria-label="Remove incident"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button></span>
      <input class="dd-input__control" id="cbm-2" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="cbm-2-list" autocomplete="off" placeholder="Add a label">
      <span class="dd-input__affix"><button class="dd-input__btn dd-combobox__toggle" type="button" tabindex="-1" data-dd-combobox-toggle aria-label="Show labels"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></button></span>
    </div>
    <ul class="dd-listbox" role="listbox" id="cbm-2-list" aria-labelledby="cbm-2-label" aria-multiselectable="true" hidden>
      <li class="dd-listbox__option" role="option" data-value="frontend" data-set="1" aria-selected="false">
        <span class="dd-listbox__swatch" style="--dd-chip: var(--dd-set-1)"></span>
        <span class="dd-listbox__text"><span class="dd-listbox__label">frontend</span></span>
        <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
      </li>
      <li class="dd-listbox__option" role="option" data-value="infra" data-set="2" aria-selected="true">
        <span class="dd-listbox__swatch" style="--dd-chip: var(--dd-set-2)"></span>
        <span class="dd-listbox__text"><span class="dd-listbox__label">infra</span></span>
        <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
      </li>
      <li class="dd-listbox__option" role="option" data-value="billing" data-set="3" aria-selected="false">
        <span class="dd-listbox__swatch" style="--dd-chip: var(--dd-set-3)"></span>
        <span class="dd-listbox__text"><span class="dd-listbox__label">billing</span></span>
        <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
      </li>
      <li class="dd-listbox__option" role="option" data-value="incident" data-set="4" aria-selected="true">
        <span class="dd-listbox__swatch" style="--dd-chip: var(--dd-set-4)"></span>
        <span class="dd-listbox__text"><span class="dd-listbox__label">incident</span></span>
        <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
      </li>
      <li class="dd-listbox__option" role="option" data-value="design-system" data-set="5" aria-selected="false">
        <span class="dd-listbox__swatch" style="--dd-chip: var(--dd-set-5)"></span>
        <span class="dd-listbox__text"><span class="dd-listbox__label">design-system</span></span>
        <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
      </li>
      <li class="dd-listbox__option" role="option" data-value="docs" data-set="6" aria-selected="false">
        <span class="dd-listbox__swatch" style="--dd-chip: var(--dd-set-6)"></span>
        <span class="dd-listbox__text"><span class="dd-listbox__label">docs</span></span>
        <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
      </li>
      <li class="dd-listbox__option" role="option" data-value="performance" data-set="7" aria-selected="false">
        <span class="dd-listbox__swatch" style="--dd-chip: var(--dd-set-7)"></span>
        <span class="dd-listbox__text"><span class="dd-listbox__label">performance</span></span>
        <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
      </li>
      <li class="dd-listbox__option" role="option" data-value="good first issue" data-set="8" aria-selected="false">
        <span class="dd-listbox__swatch" style="--dd-chip: var(--dd-set-8)"></span>
        <span class="dd-listbox__text"><span class="dd-listbox__label">good first issue</span></span>
        <span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
      </li>
      <li class="dd-listbox__empty" role="presentation" hidden>No labels match.</li>
    </ul>
    <input type="hidden" name="labels" value="infra,incident">
  </div>
</div>
```

## Chips

A 22% wash of a Color set hue with deep text in the same hue (34% on hover). Set `--dd-chip` to any `--dd-set-N`.

Outside a combobox a chip can still go: give it data-dd-dismissible and its remove button data-dd-dismiss. Try removing one.

```html
<div class="dd-row">
  <span class="dd-combobox__chip" style="--dd-chip: var(--dd-set-1)" data-dd-dismissible><span>frontend</span><button class="dd-combobox__remove" type="button" aria-label="Remove frontend" data-dd-dismiss><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button></span>
  <span class="dd-combobox__chip" style="--dd-chip: var(--dd-set-2)" data-dd-dismissible><span>infra</span><button class="dd-combobox__remove" type="button" aria-label="Remove infra" data-dd-dismiss><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button></span>
  <span class="dd-combobox__chip" style="--dd-chip: var(--dd-set-3)" data-dd-dismissible><span>billing</span><button class="dd-combobox__remove" type="button" aria-label="Remove billing" data-dd-dismiss><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button></span>
  <span class="dd-combobox__chip" style="--dd-chip: var(--dd-set-4)" data-dd-dismissible><span>incident</span><button class="dd-combobox__remove" type="button" aria-label="Remove incident" data-dd-dismiss><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button></span>
  <span class="dd-combobox__chip" style="--dd-chip: var(--dd-set-5)" data-dd-dismissible><span>design-system</span><button class="dd-combobox__remove" type="button" aria-label="Remove design-system" data-dd-dismiss><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button></span>
  <span class="dd-combobox__chip" style="--dd-chip: var(--dd-set-6)" data-dd-dismissible><span>docs</span><button class="dd-combobox__remove" type="button" aria-label="Remove docs" data-dd-dismiss><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button></span>
  <span class="dd-combobox__chip" style="--dd-chip: var(--dd-set-7)" data-dd-dismissible><span>performance</span><button class="dd-combobox__remove" type="button" aria-label="Remove performance" data-dd-dismiss><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button></span>
  <span class="dd-combobox__chip" style="--dd-chip: var(--dd-set-8)" data-dd-dismissible><span>good first issue</span><button class="dd-combobox__remove" type="button" aria-label="Remove good first issue" data-dd-dismiss><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button></span>
</div>
```

## States

Invalid: the text matches no team; open the list and pick one. Disabled: the field takes no input.

```html
<div class="dd-form__grid">
  <div class="dd-field">
    <label class="dd-field__label" id="cbs-1-label" for="cbs-1">Owner team</label>
    <div class="dd-combobox" data-dd-combobox>
      <div class="dd-input">
        <input class="dd-input__control" id="cbs-1" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="cbs-1-list" aria-invalid="true" aria-describedby="cbs-1-err" autocomplete="off" value="platfrom">
        <span class="dd-input__affix"><button class="dd-input__btn dd-combobox__toggle" type="button" tabindex="-1" data-dd-combobox-toggle aria-label="Show services"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></button></span>
      </div>
      <ul class="dd-listbox" role="listbox" id="cbs-1-list" aria-labelledby="cbs-1-label" hidden>
        <li class="dd-listbox__option" role="option" aria-selected="false"><span class="dd-listbox__text"><span class="dd-listbox__label">platform</span></span><span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span></li>
        <li class="dd-listbox__option" role="option" aria-selected="false"><span class="dd-listbox__text"><span class="dd-listbox__label">product</span></span><span class="dd-listbox__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span></li>
      </ul>
    </div>
    <p class="dd-field__error" id="cbs-1-err">Pick a team from the list.</p>
  </div>
  <div class="dd-field">
    <label class="dd-field__label" for="cbs-2">Service</label>
    <div class="dd-combobox" data-dd-combobox>
      <div class="dd-input">
        <input class="dd-input__control" id="cbs-2" role="combobox" aria-expanded="false" value="auth-gateway" disabled>
        <span class="dd-input__affix"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-lock"/></svg></span>
      </div>
    </div>
    <p class="dd-field__hint">Locked while a deploy is running.</p>
  </div>
</div>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-combobox` | Wrapper: anchors the listbox under the box. Holds a `.dd-input` and a `.dd-listbox`. `.is-open` while the list shows. |
| `.dd-combobox--multi` | Chips and the input wrap together inside the box. |
| `.dd-combobox__toggle` | Chevron button in an affix (`.dd-input__btn`); flips while open. |
| `.dd-combobox__chip` | Soft wash chip. Colour from `--dd-chip` (default `var(--dd-set-1)`). |
| `.dd-combobox__remove` | The chip’s remove button. Give it an `aria-label`. |
| `.dd-combobox__create` | The “Create …” row the script adds with `data-dd-combobox-create`. |
| `.dd-listbox · __option · __group · __empty` | The option list, shared with the custom select (see Select). |
| `.dd-listbox__match` | The underlined part of a label that matches the query (added by the script). |

## Behaviour

Add `data-dd-combobox` (or `="multi"`) to the wrapper and `role="combobox"` to the input. The script keeps `aria-expanded` and `aria-activedescendant` on the input, writes the values into an optional hidden input (comma-separated) and fires `change` on it, and fires a bubbling `dd-combobox` event with `{ value, values, option }` (plus `created: true` for a new value). Options may carry `data-keywords` to match on more than their label; `data-dd-combobox-create` on the wrapper allows new values.

| class / attribute | what it does |
|---|---|
| `Typing` | Filters and opens; the first match becomes active. |
| `↓ · ↑` | ↓ opens the list (filtered by the typed text, if any); then both move through the matches. |
| `Enter` | Choose the active option (multi: toggle it), or create the typed value. |
| `Esc` | Close; pressed again in single mode, clear the field. |
| `Backspace` | Multi, empty input: remove the last chip. |
| `Tab · blur` | Close. Single mode picks an option whose label matches the text exactly; otherwise it puts back the chosen label (an emptied field included), or empties the field when nothing is chosen. Esc twice clears the choice. |

## Guidelines

Do:
- Use a combobox once a list passes about 15 options, or when people know what they’re looking for.
- Show a description or metadata when labels alone are ambiguous.
- Keep chip colours stable per value, so “incident” is always the same hue.

Don't:
- Don’t use free-text entry here; if new values are allowed, add an explicit “Create …” option.
- Don’t colour chips by status — the Color set is categorical.
- Don’t let a multi select grow past three rows; summarise (“+4 more”) instead.

