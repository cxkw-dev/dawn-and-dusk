# stepper — `stepper`

Shows where someone is in an ordered flow — a setup wizard, a migration, a deploy. Steps are done, current, upcoming or in error; the pipeline flavour shows live stage status.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/stepper

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### Horizontal

Connectors fill the space between steps and turn green behind finished ones. Below about 520px only the current step (and any error) keeps its label.

```html
<ol class="dd-stepper" aria-label="New project">
  <li class="dd-stepper__step is-done">
    <span class="dd-stepper__marker"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-success"/></svg></span>
    <span class="dd-stepper__text"><span class="dd-stepper__label">Repository<span class="dd-visually-hidden"> (done)</span></span><span class="dd-stepper__desc">cxkw/insomnia</span></span>
  </li>
  <li class="dd-stepper__step is-done">
    <span class="dd-stepper__marker"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-success"/></svg></span>
    <span class="dd-stepper__text"><span class="dd-stepper__label">Build settings<span class="dd-visually-hidden"> (done)</span></span><span class="dd-stepper__desc">Node 22 · pnpm</span></span>
  </li>
  <li class="dd-stepper__step is-current" aria-current="step">
    <span class="dd-stepper__marker">3</span>
    <span class="dd-stepper__text"><span class="dd-stepper__label">Environment</span><span class="dd-stepper__desc">4 variables</span></span>
  </li>
  <li class="dd-stepper__step">
    <span class="dd-stepper__marker">4</span>
    <span class="dd-stepper__text"><span class="dd-stepper__label">Review</span></span>
  </li>
</ol>
```

## Moving through the steps

The stepper has no script of its own — the flow it sits in moves it. On each step change, set `is-done` on the finished steps (with the success mark), `is-current` and `aria-current="step"` on the new one, and announce the step in a polite live region.

Try it: Next and Back walk the flow; the markers ease between states and the status line is announced.

```html
<div class="dd-stack" style="--dd-gap: 22px" data-stepper-demo>
  <ol class="dd-stepper" aria-label="Launch leetnode" aria-describedby="stepper-demo-status">
  <li class="dd-stepper__step is-current" aria-current="step">
    <span class="dd-stepper__marker">1</span>
    <span class="dd-stepper__text"><span class="dd-stepper__label">Repository</span><span class="dd-stepper__desc">cxkw/leetnode</span></span>
  </li>
  <li class="dd-stepper__step">
    <span class="dd-stepper__marker">2</span>
    <span class="dd-stepper__text"><span class="dd-stepper__label">Build</span><span class="dd-stepper__desc">Go 1.23</span></span>
  </li>
  <li class="dd-stepper__step">
    <span class="dd-stepper__marker">3</span>
    <span class="dd-stepper__text"><span class="dd-stepper__label">Domains</span><span class="dd-stepper__desc">leetnode.dev</span></span>
  </li>
  <li class="dd-stepper__step">
    <span class="dd-stepper__marker">4</span>
    <span class="dd-stepper__text"><span class="dd-stepper__label">Review</span></span>
  </li>
  </ol>
  <div class="dd-row" style="--dd-gap: 10px">
    <button class="dd-btn dd-btn--secondary dd-btn--sm" type="button" data-stepper-go="back" disabled><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-left"/></svg><span>Back</span></button>
    <button class="dd-btn dd-btn--primary dd-btn--sm" type="button" data-stepper-go="next"><span>Next</span><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-right"/></svg></button>
    <span class="dd-small dd-muted" id="stepper-demo-status" aria-live="polite">Step 1 of 4</span>
  </div>
</div>
```

## States

Done steps get the success mark, the current one is filled with the accent and carries `aria-current="step"`, upcoming steps show their number, and an error replaces the number with the error mark and says what went wrong.

```html
<ol class="dd-stepper" aria-label="Domain setup">
  <li class="dd-stepper__step is-done">
    <span class="dd-stepper__marker"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-success"/></svg></span>
    <span class="dd-stepper__text"><span class="dd-stepper__label">Add domain<span class="dd-visually-hidden"> (done)</span></span><span class="dd-stepper__desc">cxkw.dev</span></span>
  </li>
  <li class="dd-stepper__step is-error">
    <span class="dd-stepper__marker"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-error"/></svg></span>
    <span class="dd-stepper__text"><span class="dd-stepper__label">Verify DNS<span class="dd-visually-hidden"> (error)</span></span><span class="dd-stepper__desc">TXT record not found</span></span>
  </li>
  <li class="dd-stepper__step">
    <span class="dd-stepper__marker">3</span>
    <span class="dd-stepper__text"><span class="dd-stepper__label">Issue certificate</span></span>
  </li>
  <li class="dd-stepper__step">
    <span class="dd-stepper__marker">4</span>
    <span class="dd-stepper__text"><span class="dd-stepper__label">Go live</span></span>
  </li>
</ol>
```

## Small

For tight spots: a dialog header, a checkout summary, the top of a settings panel.

```html
<ol class="dd-stepper dd-stepper--sm" aria-label="Checkout">
  <li class="dd-stepper__step is-done">
    <span class="dd-stepper__marker"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-success"/></svg></span>
    <span class="dd-stepper__text"><span class="dd-stepper__label">Plan<span class="dd-visually-hidden"> (done)</span></span></span>
  </li>
  <li class="dd-stepper__step is-current" aria-current="step">
    <span class="dd-stepper__marker">2</span>
    <span class="dd-stepper__text"><span class="dd-stepper__label">Billing</span></span>
  </li>
  <li class="dd-stepper__step">
    <span class="dd-stepper__marker">3</span>
    <span class="dd-stepper__text"><span class="dd-stepper__label">Confirm</span></span>
  </li>
</ol>
```

## Vertical

For flows with instructions at each step. Descriptions wrap; the connector runs down from each marker.

```html
<ol class="dd-stepper dd-stepper--vertical" aria-label="Connect billing-worker" style="max-width: 460px">
  <li class="dd-stepper__step is-done">
    <span class="dd-stepper__marker"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-success"/></svg></span>
    <span class="dd-stepper__text"><span class="dd-stepper__label">Create a Stripe restricted key<span class="dd-visually-hidden"> (done)</span></span><span class="dd-stepper__desc">Read-only access to invoices and customers is enough.</span></span>
  </li>
  <li class="dd-stepper__step is-done">
    <span class="dd-stepper__marker"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-success"/></svg></span>
    <span class="dd-stepper__text"><span class="dd-stepper__label">Add the key to billing-worker<span class="dd-visually-hidden"> (done)</span></span><span class="dd-stepper__desc">Stored as <span class="dd-mono">STRIPE_KEY</span> in the eu-west-1 vault.</span></span>
  </li>
  <li class="dd-stepper__step is-current" aria-current="step">
    <span class="dd-stepper__marker">3</span>
    <span class="dd-stepper__text"><span class="dd-stepper__label">Send a test webhook</span><span class="dd-stepper__desc">We’ll listen on /hooks/stripe for the next ten minutes.</span></span>
  </li>
  <li class="dd-stepper__step">
    <span class="dd-stepper__marker">4</span>
    <span class="dd-stepper__text"><span class="dd-stepper__label">Turn on hourly invoicing</span><span class="dd-stepper__desc">Runs at :05 past every hour once the webhook succeeds.</span></span>
  </li>
</ol>
```

```html
<ol class="dd-stepper dd-stepper--vertical" aria-label="Migrate database" style="max-width: 460px">
  <li class="dd-stepper__step is-done">
    <span class="dd-stepper__marker"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-success"/></svg></span>
    <span class="dd-stepper__text"><span class="dd-stepper__label">Snapshot<span class="dd-visually-hidden"> (done)</span></span><span class="dd-stepper__desc">auth-db · 4.2 GB · 38s</span></span>
  </li>
  <li class="dd-stepper__step is-error">
    <span class="dd-stepper__marker"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-error"/></svg></span>
    <span class="dd-stepper__text"><span class="dd-stepper__label">Run migrations<span class="dd-visually-hidden"> (error)</span></span><span class="dd-stepper__desc">0042_invoice_currency timed out after 120s. Nothing was changed.</span></span>
  </li>
  <li class="dd-stepper__step">
    <span class="dd-stepper__marker">3</span>
    <span class="dd-stepper__text"><span class="dd-stepper__label">Swap traffic</span><span class="dd-stepper__desc">Waiting for migrations.</span></span>
  </li>
</ol>
```

## Pipeline

The status flavour, for builds and deploys. Each stage is a tonal chip with its status icon and a mono duration; the connector after a stage takes that stage’s colour — solid green when passed, dashed accent while running, red after a failure. Narrow containers stack the stages.

```html
<div class="dd-stack" style="--dd-gap: 10px">
  <p class="dd-eyebrow">Deploy #4821 · auth-gateway · a3f9c2e</p>
  <ol class="dd-stepper dd-stepper--pipeline" aria-label="Deploy pipeline">
  <li class="dd-stepper__step is-done">
    <span class="dd-stepper__marker"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-success"/></svg></span>
    <span class="dd-stepper__text"><span class="dd-stepper__label">Build<span class="dd-visually-hidden"> (passed)</span></span><span class="dd-stepper__desc">1m 12s</span></span>
  </li>
  <li class="dd-stepper__step is-done">
    <span class="dd-stepper__marker"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-success"/></svg></span>
    <span class="dd-stepper__text"><span class="dd-stepper__label">Test<span class="dd-visually-hidden"> (passed)</span></span><span class="dd-stepper__desc">2m 03s</span></span>
  </li>
  <li class="dd-stepper__step is-current" aria-current="step">
    <span class="dd-stepper__marker"><span class="dd-stepper__spinner"></span></span>
    <span class="dd-stepper__text"><span class="dd-stepper__label">Staging<span class="dd-visually-hidden"> (running)</span></span><span class="dd-stepper__desc">0m 41s</span></span>
  </li>
  <li class="dd-stepper__step">
    <span class="dd-stepper__marker"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-clock"/></svg></span>
    <span class="dd-stepper__text"><span class="dd-stepper__label">Canary<span class="dd-visually-hidden"> (queued)</span></span><span class="dd-stepper__desc">queued</span></span>
  </li>
  <li class="dd-stepper__step">
    <span class="dd-stepper__marker"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-clock"/></svg></span>
    <span class="dd-stepper__text"><span class="dd-stepper__label">Production<span class="dd-visually-hidden"> (queued)</span></span><span class="dd-stepper__desc">queued</span></span>
  </li>
  </ol>
</div>
```

### Failed and skipped

A failed stage tints its chip; stages after it never ran. A skipped stage fades to a ghost of a chip and its connector dashes.

```html
<div class="dd-stack" style="--dd-gap: 24px">
  <div class="dd-stack" style="--dd-gap: 10px">
    <p class="dd-eyebrow">Deploy #4820 · billing-worker · failed</p>
    <ol class="dd-stepper dd-stepper--pipeline" aria-label="Deploy pipeline">
  <li class="dd-stepper__step is-done">
    <span class="dd-stepper__marker"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-success"/></svg></span>
    <span class="dd-stepper__text"><span class="dd-stepper__label">Build<span class="dd-visually-hidden"> (passed)</span></span><span class="dd-stepper__desc">58s</span></span>
  </li>
  <li class="dd-stepper__step is-error">
    <span class="dd-stepper__marker"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-error"/></svg></span>
    <span class="dd-stepper__text"><span class="dd-stepper__label">Migrate<span class="dd-visually-hidden"> (failed)</span></span><span class="dd-stepper__desc">3m 02s</span></span>
  </li>
  <li class="dd-stepper__step">
    <span class="dd-stepper__marker"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-clock"/></svg></span>
    <span class="dd-stepper__text"><span class="dd-stepper__label">Canary<span class="dd-visually-hidden"> (queued)</span></span><span class="dd-stepper__desc">not run</span></span>
  </li>
  <li class="dd-stepper__step">
    <span class="dd-stepper__marker"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-clock"/></svg></span>
    <span class="dd-stepper__text"><span class="dd-stepper__label">Production<span class="dd-visually-hidden"> (queued)</span></span><span class="dd-stepper__desc">not run</span></span>
  </li>
    </ol>
  </div>
  <div class="dd-stack" style="--dd-gap: 10px">
    <p class="dd-eyebrow">Deploy #4819 · edge-cache · live</p>
    <ol class="dd-stepper dd-stepper--pipeline" aria-label="Deploy pipeline">
  <li class="dd-stepper__step is-done">
    <span class="dd-stepper__marker"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-success"/></svg></span>
    <span class="dd-stepper__text"><span class="dd-stepper__label">Build<span class="dd-visually-hidden"> (passed)</span></span><span class="dd-stepper__desc">1m 40s</span></span>
  </li>
  <li class="dd-stepper__step is-done">
    <span class="dd-stepper__marker"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-success"/></svg></span>
    <span class="dd-stepper__text"><span class="dd-stepper__label">Test<span class="dd-visually-hidden"> (passed)</span></span><span class="dd-stepper__desc">2m 18s</span></span>
  </li>
  <li class="dd-stepper__step is-skipped">
    <span class="dd-stepper__marker"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-minus"/></svg></span>
    <span class="dd-stepper__text"><span class="dd-stepper__label">Canary<span class="dd-visually-hidden"> (skipped)</span></span><span class="dd-stepper__desc">skipped</span></span>
  </li>
  <li class="dd-stepper__step is-done">
    <span class="dd-stepper__marker"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-success"/></svg></span>
    <span class="dd-stepper__text"><span class="dd-stepper__label">Production<span class="dd-visually-hidden"> (passed)</span></span><span class="dd-stepper__desc">1m 06s</span></span>
  </li>
    </ol>
  </div>
</div>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-stepper` | An `<ol>` of steps. Horizontal by default. |
| `.dd-stepper__step` | One `<li>`. With no state class it is upcoming (queued, in a pipeline). |
| `.is-done` | Finished step / passed stage. Put the `success` icon in the marker. |
| `.is-current` | The step in progress; also set `aria-current="step"`. In a pipeline, the running stage (use `.dd-stepper__spinner` as the marker). |
| `.is-error` | Failed step or stage. Put the `error` icon in the marker and say why in `__desc`. |
| `.is-skipped` | Pipeline only: a stage that was skipped. |
| `.dd-stepper__marker` | Circle with the step number or a status icon. |
| `.dd-stepper__text` | Wraps `__label` and an optional `__desc` (durations in a pipeline). |
| `.dd-stepper--vertical` | Stacked steps with wrapping descriptions. |
| `.dd-stepper--sm` | Smaller markers (22px) and type. |
| `.dd-stepper--pipeline` | Deploy-style stage chips with status-coloured connectors. |
| `.dd-stepper__spinner` | Running indicator for a pipeline marker (uses `dd-spin`). |

## Guidelines

Do:
- Keep labels to a word or two; put detail in the description.
- Tell people what failed and what to do next, right under the failed step.
- Use the pipeline for system progress, the wizard for human progress.

Don't:
- Don’t use a stepper for fewer than three steps.
- Don’t let people jump ahead to steps that depend on earlier ones.
- Don’t colour steps without the icon and label — colour alone isn’t a status.

