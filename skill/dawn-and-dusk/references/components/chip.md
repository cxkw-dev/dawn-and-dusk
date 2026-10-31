# chip — `chip`

Small, coloured and categorical: topics, tags, filters and people. A soft wash of a Color set hue with deep text in the same hue — eight colours that always look like they belong together.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/chip

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### The Color set

One chip per Golden hour colour, .dd-chip--set-1 to --set-8. In dusk the set lifts and the wash stays soft.

```html
<div class="dd-chip-group">
  <span class="dd-chip dd-chip--set-1">Design systems</span>
  <span class="dd-chip dd-chip--set-2">Swift</span>
  <span class="dd-chip dd-chip--set-3">Tooling</span>
  <span class="dd-chip dd-chip--set-4">Homelab</span>
  <span class="dd-chip dd-chip--set-5">Writing</span>
  <span class="dd-chip dd-chip--set-6">AI</span>
  <span class="dd-chip dd-chip--set-7">Typography</span>
  <span class="dd-chip dd-chip--set-8">Motion</span>
</div>
```

## Dot, icon and link

A neutral chip with a coloured dot names a category without colouring the whole row. Icons lead like they do in buttons. Chips that are links or buttons step toward the text colour on hover, so even the palest hue answers the pointer.

```html
<div class="dd-stack" style="--dd-gap: var(--dd-space-3)">
  <div class="dd-chip-group">
    <span class="dd-chip"><i class="dd-chip__dot" style="--dd-chip-dot: var(--dd-set-3)"></i>dawn-and-dusk</span>
    <span class="dd-chip"><i class="dd-chip__dot" style="--dd-chip-dot: var(--dd-set-1)"></i>dockey-ui</span>
    <span class="dd-chip"><i class="dd-chip__dot" style="--dd-chip-dot: var(--dd-set-6)"></i>insomnia</span>
    <span class="dd-chip"><i class="dd-chip__dot" style="--dd-chip-dot: var(--dd-set-4)"></i>leetnode</span>
  </div>
  <div class="dd-chip-group">
    <span class="dd-chip dd-chip--set-2"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-code"/></svg>TypeScript</span>
    <span class="dd-chip dd-chip--set-5"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-database"/></svg>Postgres</span>
    <span class="dd-chip dd-chip--set-7"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-cloud"/></svg>Edge</span>
    <a class="dd-chip dd-chip--set-8" href="#"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-tag"/></svg><span>writing</span></a>
  </div>
</div>
```

## Removable

A small × at the end removes the chip — applied filters, selected recipients. Focus moves to the next chip, so you can clear a row from the keyboard; Delete and Backspace work on the × too.

Try it: click an ×, or Tab to one and press Delete — focus moves on to the next chip. Reload the page to get them back.

```html
<div class="dd-chip-group">
  <span class="dd-chip dd-chip--set-1"><span>region: fra1</span><button class="dd-chip__remove" type="button" aria-label="Remove region: fra1"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button></span>
  <span class="dd-chip dd-chip--set-4"><span>status: failed</span><button class="dd-chip__remove" type="button" aria-label="Remove status: failed"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button></span>
  <span class="dd-chip dd-chip--set-6"><span>service: billing-worker</span><button class="dd-chip__remove" type="button" aria-label="Remove service: billing-worker"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button></span>
  <span class="dd-chip"><span>last 24h</span><button class="dd-chip__remove" type="button" aria-label="Remove last 24h"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button></span>
</div>
```

## Filter chips

Toggle buttons with `aria-pressed`. Off is a lighter wash; on deepens it and slides in a check. Hover is a quieter step on top of either, so you can always tell hover from on.

Try it: click a chip, or Tab to it and press Space, to turn it on and off.

```html
<div class="dd-stack" style="--dd-gap: var(--dd-space-3)">
  <div class="dd-chip-group" role="group" aria-label="Status">
    <button class="dd-chip dd-chip--filter" type="button" aria-pressed="true"><span class="dd-chip__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span><span>Healthy</span></button>
    <button class="dd-chip dd-chip--filter" type="button" aria-pressed="true"><span class="dd-chip__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span><span>Degraded</span></button>
    <button class="dd-chip dd-chip--filter" type="button" aria-pressed="false"><span class="dd-chip__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span><span>Down</span></button>
    <button class="dd-chip dd-chip--filter" type="button" aria-pressed="false"><span class="dd-chip__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span><span>Unknown</span></button>
  </div>
  <div class="dd-chip-group" role="group" aria-label="Topics">
    <button class="dd-chip dd-chip--filter dd-chip--set-1" type="button" aria-pressed="true"><span class="dd-chip__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span><span>Design systems</span></button>
    <button class="dd-chip dd-chip--filter dd-chip--set-3" type="button" aria-pressed="false"><span class="dd-chip__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span><span>Tooling</span></button>
    <button class="dd-chip dd-chip--filter dd-chip--set-5" type="button" aria-pressed="true"><span class="dd-chip__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span><span>Writing</span></button>
    <button class="dd-chip dd-chip--filter dd-chip--set-6" type="button" aria-pressed="false"><span class="dd-chip__check"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span><span>AI</span></button>
  </div>
</div>
```

## Input chips

A field that turns what you type into chips, in the same tonal box as a text input. The colour comes from the text, so a tag keeps its colour wherever it shows up. Typing a tag that is already there makes it flash instead of adding a twin.

Try it: type canary and press Enter (or a comma); type release again to see it flash; Backspace in the empty field removes the last tag.

```html
<div class="dd-stack" style="max-width: 460px; --dd-gap: var(--dd-space-2)">
  <label class="dd-small" for="tags-field" style="font-weight: 600">Tags</label>
  <div class="dd-chip-input">
    <span class="dd-chip dd-chip--set-3" data-value="release"><span>release</span><button class="dd-chip__remove" type="button" aria-label="Remove release"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button></span>
    <span class="dd-chip dd-chip--set-6" data-value="breaking"><span>breaking</span><button class="dd-chip__remove" type="button" aria-label="Remove breaking"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button></span>
    <input class="dd-chip-input__field" id="tags-field" placeholder="Add a tag…" autocomplete="off">
  </div>
  <p class="dd-caption" style="margin: 0">Enter or comma to add · Backspace to remove the last one</p>
</div>
```

## Avatar chips

A person (or a bot) with a tiny avatar. Pill-shaped to echo the avatar; neutral wash so the avatar’s colour leads.

```html
<div class="dd-chip-group">
  <span class="dd-chip dd-chip--avatar"><span class="dd-avatar dd-avatar--set-1" aria-hidden="true">AN</span><span>Andy Nguyen</span><button class="dd-chip__remove" type="button" aria-label="Remove Andy Nguyen"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button></span>
  <span class="dd-chip dd-chip--avatar"><span class="dd-avatar dd-avatar--set-5" aria-hidden="true">MK</span><span>Mai Kha</span><button class="dd-chip__remove" type="button" aria-label="Remove Mai Kha"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button></span>
  <span class="dd-chip dd-chip--avatar"><span class="dd-avatar dd-avatar--set-4" aria-hidden="true">JS</span><span>Jonas Sauer</span></span>
  <span class="dd-chip dd-chip--avatar"><span class="dd-avatar dd-avatar--set-7" aria-hidden="true"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-bolt"/></svg></span><span>deploy-bot</span></span>
</div>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-chip` | Soft wash chip. `<span>`, or `<a>` / `<button>` when interactive. Neutral greige by default. |
| `.dd-chip--set-{1…8}` | Colour from the Color set. Or set `--dd-chip` to any colour. |
| `.dd-chip__dot` | Leading colour dot (its own colour via `--dd-chip-dot`). |
| `> .dd-icon` | Leading icon. |
| `.dd-chip__remove` | × button. Give it an `aria-label` naming the chip. |
| `.dd-chip--filter[aria-pressed]` | Toggle chip. Put a `.dd-chip__check` with a check icon first. |
| `.dd-chip--avatar` | Pill chip that starts with a `.dd-avatar`. |
| `.dd-chip-input / __field` | Chips plus a text field in one control. |
| `.dd-chip-group` | A wrapping row of chips. |
| `.is-selected` | Selected look for chips that aren’t toggle buttons: a deeper tint than hover. |

## Behaviour

| class / attribute | what it does |
|---|---|
| `.dd-chip__remove` | Click, Enter, Space, Delete or Backspace removes the chip (a short fade, then the chips after it glide over; instant under reduced motion). Focus moves to the next chip’s ×, the previous one, the field, or the group. |
| `dd:chip-remove` | Cancelable event on the chip before it goes; `detail.value` is its `data-value` or text. |
| `button.dd-chip[aria-pressed]` | Click toggles `aria-pressed` and fires `dd:chip-toggle` (`detail.pressed`). |
| `.dd-chip-input__field` | Enter or comma adds a chip; a duplicate flashes the existing one instead. Backspace in the empty field removes the last one. The container fires `dd:chips-change` with `detail.values`. |
| `dd.chip.create(text) / remove(chip)` | From code: `create` returns a removable chip coloured by its text, ready to insert; `remove` takes one out the same way the × does. |
| `data-dd-manual` | On a container: the script leaves the chips inside alone — for chips a framework renders from state. Handle the clicks yourself. |

## Guidelines

Do:
- Use the same colour for the same tag everywhere.
- Write tags in lowercase and filters as “key: value”.
- Let a long row wrap; never truncate a filter without a tooltip.

Don't:
- Don’t use chips for status — that’s a badge.
- Don’t mix more than four colours in one row of filters.
- Don’t put a primary action in a chip.

