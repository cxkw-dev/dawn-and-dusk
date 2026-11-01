# guide cue — `guide-cue`

An onboarding tip that points at one thing: what it is and why it matters, in a sentence. Steps link into a short tour with a count, Next and a way out.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/guide-cue

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### Anatomy

Step count with pips, a close ×, a title, one or two sentences and two actions — a quiet way out and Next. The arrow points at the target and an apricot beacon pulses on it. Ink in dawn, like a toast; a raised surface in dusk. This one is a still — the live tour is below.

```html
<div style="display: flex; flex-direction: column; align-items: center; gap: 18px">
  <span style="position: relative; display: inline-flex">
    <button class="dd-btn dd-btn--primary" type="button"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-plus"/></svg><span>New deploy</span></button>
    <span class="dd-guide-beacon dd-guide-beacon--static" style="left: calc(100% - 2px); top: 2px" aria-hidden="true"></span>
  </span>
  <div class="dd-guide-cue dd-guide-cue--static" data-placement="bottom" role="dialog" aria-labelledby="cue-static-title" style="--dd-arrow-x: 50%">
    <span class="dd-guide-cue__arrow"></span>
    <button class="dd-guide-cue__close" type="button" aria-label="End tour"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button>
    <p class="dd-guide-cue__step"><span class="dd-guide-cue__count">1 of 3</span><span class="dd-guide-cue__pips"><i class="is-current"></i><i></i><i></i></span></p>
    <h3 class="dd-guide-cue__title" id="cue-static-title">Ship from here</h3>
    <p class="dd-guide-cue__text">Every deploy builds once and goes out to fra1, sfo3 and sgp1. Press <kbd>N</kbd> from anywhere.</p>
    <div class="dd-guide-cue__actions">
      <button class="dd-btn dd-btn--ghost dd-btn--sm" type="button">Skip tour</button>
      <button class="dd-btn dd-btn--primary dd-btn--sm" type="button"><span>Next</span><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-right"/></svg></button>
    </div>
  </div>
</div>
```

## A tour

Each step is a `.dd-guide-cue` with `popover="manual"`, the tour name in `data-dd-guide` and its target in `data-dd-guide-target`. Steps run in document order; the script fills the count and pips, scrolls the target into view, rings it, drops the beacon and moves focus into the cue.

Try it: start the tour, then Next and Back to walk the three steps; × or Esc ends it, and focus goes back to where you started.

```html
<div class="dd-stack" style="--dd-gap: var(--dd-space-4)">
  <div class="dd-row" style="justify-content: space-between">
    <div class="dd-row">
      <button class="dd-btn dd-btn--primary" type="button" id="tour-new"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-plus"/></svg><span>New deploy</span></button>
      <button class="dd-btn" type="button" id="tour-filter"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-filter"/></svg><span>Filter</span></button>
    </div>
    <button class="dd-btn dd-btn--icon" type="button" id="tour-logs" aria-label="Logs"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-terminal"/></svg></button>
  </div>
  <div>
    <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: var(--dd-space-1) var(--dd-space-4); padding: var(--dd-space-3) 0; box-shadow: inset 0 -1px 0 color-mix(in oklab, var(--dd-text) 8%, transparent)">
      <span class="dd-small"><b>dockey-ui</b> <span class="dd-mono dd-muted">c41d9e0 · fra1</span></span>
      <span class="dd-status-dot dd-status-dot--online">Ready</span>
    </div>
    <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: var(--dd-space-1) var(--dd-space-4); padding: var(--dd-space-3) 0; box-shadow: inset 0 -1px 0 color-mix(in oklab, var(--dd-text) 8%, transparent)">
      <span class="dd-small"><b>billing-worker</b> <span class="dd-mono dd-muted">8be20f1 · sfo3</span></span>
      <span class="dd-status-dot dd-status-dot--idle">Building</span>
    </div>
    <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: var(--dd-space-1) var(--dd-space-4); padding: var(--dd-space-3) 0;">
      <span class="dd-small"><b>leetnode</b> <span class="dd-mono dd-muted">a91f3c2 · sgp1</span></span>
      <span class="dd-status-dot dd-status-dot--error">Failed</span>
    </div>
  </div>
  <button class="dd-btn dd-btn--ink" type="button" data-dd-guide-start="deploys" style="align-self: flex-start"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-sparkle"/></svg><span>Take the tour</span></button>
</div>

<div class="dd-guide-cue" popover="manual" role="dialog" aria-labelledby="cue-1-title" data-dd-guide="deploys" data-dd-guide-target="#tour-new" data-dd-placement="bottom-start">
  <span class="dd-guide-cue__arrow"></span>
  <button class="dd-guide-cue__close" type="button" data-dd-guide-dismiss aria-label="End tour"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button>
  <p class="dd-guide-cue__step"><span class="dd-guide-cue__count"></span><span class="dd-guide-cue__pips"></span></p>
  <h3 class="dd-guide-cue__title" id="cue-1-title">Ship from here</h3>
  <p class="dd-guide-cue__text">Every deploy builds once and goes out to fra1, sfo3 and sgp1. Press <kbd>N</kbd> from anywhere.</p>
  <div class="dd-guide-cue__actions">
    <button class="dd-btn dd-btn--ghost dd-btn--sm" type="button" data-dd-guide-dismiss>Skip tour</button>
    <button class="dd-btn dd-btn--primary dd-btn--sm" type="button" data-dd-guide-next><span>Next</span><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-right"/></svg></button>
  </div>
</div>
<div class="dd-guide-cue" popover="manual" role="dialog" aria-labelledby="cue-2-title" data-dd-guide="deploys" data-dd-guide-target="#tour-filter" data-dd-placement="bottom">
  <span class="dd-guide-cue__arrow"></span>
  <button class="dd-guide-cue__close" type="button" data-dd-guide-dismiss aria-label="End tour"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button>
  <p class="dd-guide-cue__step"><span class="dd-guide-cue__count"></span><span class="dd-guide-cue__pips"></span></p>
  <h3 class="dd-guide-cue__title" id="cue-2-title">Narrow it down</h3>
  <p class="dd-guide-cue__text">Filter by region, status or who pushed. Filters stay in the URL, so you can share a view.</p>
  <div class="dd-guide-cue__actions">
    <button class="dd-btn dd-btn--ghost dd-btn--sm" type="button" data-dd-guide-back>Back</button>
    <button class="dd-btn dd-btn--primary dd-btn--sm" type="button" data-dd-guide-next><span>Next</span><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-right"/></svg></button>
  </div>
</div>
<div class="dd-guide-cue" popover="manual" role="dialog" aria-labelledby="cue-3-title" data-dd-guide="deploys" data-dd-guide-target="#tour-logs" data-dd-placement="bottom-end">
  <span class="dd-guide-cue__arrow"></span>
  <button class="dd-guide-cue__close" type="button" data-dd-guide-dismiss aria-label="End tour"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button>
  <p class="dd-guide-cue__step"><span class="dd-guide-cue__count"></span><span class="dd-guide-cue__pips"></span></p>
  <h3 class="dd-guide-cue__title" id="cue-3-title">Logs, live</h3>
  <p class="dd-guide-cue__text">Tail every region at once while a deploy rolls out.</p>
  <div class="dd-guide-cue__actions">
    <button class="dd-btn dd-btn--ghost dd-btn--sm" type="button" data-dd-guide-back>Back</button>
    <button class="dd-btn dd-btn--primary dd-btn--sm" type="button" data-dd-guide-next><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg><span>Done</span></button>
  </div>
</div>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-guide-cue[popover="manual"]` | One step. 300px wide; `role="dialog"` labelled by its title. |
| `.dd-guide-cue__arrow` | Arrow toward the target (placed by the JS). |
| `.dd-guide-cue__step` | Mono step line. The JS writes “2 of 3” into an empty `__count` and one pip per step into `__pips`; in static markup, mark pips `.is-done` / `.is-current`. |
| `.dd-guide-cue__title / __text` | Title and one or two sentences. `<kbd>` works inside. |
| `.dd-guide-cue__actions` | Quiet action on the left (Skip on the first step, Back after), Next on the right. Focus rings inside use the cue’s own ink so they show on the dark dawn card. |
| `.dd-guide-cue__close` | Top-right × with `data-dd-guide-dismiss`: ends the tour from any step. Give it an `aria-label`. |
| `.dd-guide-beacon` | Pulsing apricot dot on the target. `--static` for mockups. |
| `[data-dd-guide-active]` | Set on the current target: a soft apricot ring. |
| `.dd-guide-cue--static` | In-flow cue for docs and mockups (set `data-placement`). |
| `--dd-cue-bg / --dd-cue-fg / --dd-cue-muted` | Colours: ink in dawn, surface-3 in dusk. |

## Behaviour

| class / attribute | what it does |
|---|---|
| `data-dd-guide-start="name"` | Starts the tour with that name. |
| `data-dd-guide="name"` | On each cue: which tour it belongs to. |
| `data-dd-guide-target="#selector"` | On each cue: what it points at. Steps whose target is missing are skipped, going forward or back, and left out of the “1 of 3” count. |
| `data-dd-placement` | On each cue: `bottom` (default), `top`, `left`, `right`, with `-start` / `-end`. Flips when it doesn’t fit. |
| `data-dd-guide-next / -back / -dismiss` | Buttons inside a cue. Next on the last step finishes the tour. |
| `Esc · ×` | End the tour from any step. Focus returns to the button that started it. |
| `Back` | `data-dd-guide-back` returns to the previous step; focus moves into that cue. |
| `dd:guide-step / dd:guide-end` | Events on `document`. A step carries `detail.name`, `index` and `cue`; the end carries `name` and `completed` — store it so the tour doesn’t come back. |
| `dd.guide.start(name, trigger)` | Start a tour from code, e.g. on first sign-in; focus returns to `trigger` (default: whatever had focus) at the end. Also `next()`, `back()` and `end()`. |

## Guidelines

Do:
- Keep tours to three steps, five at most.
- Point at the thing, then say why it helps — not what it is called.
- Always offer a way out on the first step.

Don't:
- Don’t start a tour on every visit; remember `dd:guide-end`.
- Don’t use a guide cue for errors or warnings.
- Don’t point at something off-screen or hidden in a menu.

