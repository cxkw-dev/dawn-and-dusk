# progress — `progress`

How far along something is, or how full. Bars for work in flight, meters for levels against a threshold, rings where space is square, steps for pipelines and quotas for usage.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/progress

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### Linear

Label and value above, optional hint below. The value is mono; the fill reads --dd-value (0–100).

```html
<div class="dd-stack" style="--dd-gap: var(--dd-space-6); max-width: 520px">
  <div class="dd-progress">
    <div class="dd-progress__head"><span class="dd-progress__label" id="up-1">Uploading build artefacts</span><span class="dd-progress__value"><b>62%</b></span></div>
    <div class="dd-progress__track" role="progressbar" aria-labelledby="up-1" aria-valuenow="62" aria-valuemin="0" aria-valuemax="100" style="--dd-value:62"><div class="dd-progress__fill"></div></div>
    <p class="dd-progress__hint">38 MB of 61 MB · about 12 s left</p>
  </div>
  <div class="dd-progress">
    <div class="dd-progress__head"><span class="dd-progress__label" id="mig-1">Migrating <span class="dd-mono">ledger-sync</span> to eu-west-2</span><span class="dd-progress__value"><b>1,840</b> / 10,212 rows</span></div>
    <div class="dd-progress__track" role="progressbar" aria-labelledby="mig-1" aria-valuenow="18" aria-valuemin="0" aria-valuemax="100" style="--dd-value:18"><div class="dd-progress__fill"></div></div>
  </div>
</div>
```

### Live

Try it: start the upload, pause it, reset it. The fill eases to each new value and aria-valuenow follows; the hint says what’s left.

```html
<div class="dd-stack" style="--dd-gap: var(--dd-space-4); max-width: 520px" data-progress-demo>
  <div class="dd-progress">
    <div class="dd-progress__head"><span class="dd-progress__label" id="live-1">Uploading <span class="dd-mono">dockey-ui</span> build artefacts</span><span class="dd-progress__value"><b data-progress-pct>0%</b></span></div>
    <div class="dd-progress__track" role="progressbar" aria-labelledby="live-1" aria-describedby="live-1-hint" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="--dd-value:0"><div class="dd-progress__fill"></div></div>
    <p class="dd-progress__hint" id="live-1-hint" data-progress-hint>61 MB queued.</p>
  </div>
  <div class="dd-row" style="--dd-gap: var(--dd-space-2)">
    <button class="dd-btn dd-btn--primary dd-btn--sm" type="button" data-progress-act="toggle"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-upload"/></svg><span>Start upload</span></button>
    <button class="dd-btn dd-btn--ghost dd-btn--sm" type="button" data-progress-act="reset" disabled><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-refresh"/></svg><span>Reset</span></button>
  </div>
</div>
```

## Sizes

Small (4px) for inline and dense rows, medium (6px) by default, large (10px) for meters and hero progress.

```html
<div class="dd-stack" style="--dd-gap: var(--dd-space-5); max-width: 520px">
  <div class="dd-progress dd-progress--sm">
    <div class="dd-progress__track" role="progressbar" aria-label="Small" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="--dd-value:40"><div class="dd-progress__fill"></div></div>
  </div>
  <div class="dd-progress">
    <div class="dd-progress__track" role="progressbar" aria-label="Medium" aria-valuenow="58" aria-valuemin="0" aria-valuemax="100" style="--dd-value:58"><div class="dd-progress__fill"></div></div>
  </div>
  <div class="dd-progress dd-progress--lg">
    <div class="dd-progress__track" role="progressbar" aria-label="Large" aria-valuenow="76" aria-valuemin="0" aria-valuemax="100" style="--dd-value:76"><div class="dd-progress__fill"></div></div>
  </div>
</div>
```

## Tones

The accent is the default. Use status tones only when the bar means a state; the track is always a lighter step of the same colour.

```html
<div class="dd-stack" style="--dd-gap: var(--dd-space-5); max-width: 520px">
  <div class="dd-progress dd-progress--ok">
    <div class="dd-progress__head"><span class="dd-progress__label" id="t-1">Health checks passing</span><span class="dd-progress__value"><b>24</b> / 24</span></div>
    <div class="dd-progress__track" role="progressbar" aria-labelledby="t-1" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="--dd-value:100"><div class="dd-progress__fill"></div></div>
  </div>
  <div class="dd-progress dd-progress--warn">
    <div class="dd-progress__head"><span class="dd-progress__label" id="t-2">Replicas ready</span><span class="dd-progress__value"><b>4</b> / 6</span></div>
    <div class="dd-progress__track" role="progressbar" aria-labelledby="t-2" aria-valuenow="67" aria-valuemin="0" aria-valuemax="100" style="--dd-value:67"><div class="dd-progress__fill"></div></div>
  </div>
  <div class="dd-progress dd-progress--primary">
    <div class="dd-progress__head"><span class="dd-progress__label" id="t-3">Canary · billing-worker</span><span class="dd-progress__value"><b>35%</b> traffic</span></div>
    <div class="dd-progress__track" role="progressbar" aria-labelledby="t-3" aria-valuenow="35" aria-valuemin="0" aria-valuemax="100" style="--dd-value:35"><div class="dd-progress__fill"></div></div>
  </div>
  <div class="dd-progress dd-progress--bad">
    <div class="dd-progress__head"><span class="dd-progress__label" id="t-4">Rollback</span><span class="dd-progress__value"><b>80%</b></span></div>
    <div class="dd-progress__track" role="progressbar" aria-labelledby="t-4" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="--dd-value:80"><div class="dd-progress__fill"></div></div>
    <p class="dd-progress__hint">Restoring previous image after 3 failed health checks.</p>
  </div>
</div>
```

## Indeterminate

When the length of the work is unknown, add `is-indeterminate` to the track and leave out `aria-valuenow`. With reduced motion it holds still at half strength.

```html
<div class="dd-stack" style="--dd-gap: var(--dd-space-6); max-width: 520px">
  <div class="dd-progress">
    <div class="dd-progress__head"><span class="dd-progress__label" id="ind-1">Provisioning edge-cache in ap-south-1</span><span class="dd-progress__value">waiting</span></div>
    <div class="dd-progress__track is-indeterminate" role="progressbar" aria-labelledby="ind-1"><div class="dd-progress__fill"></div></div>
    <p class="dd-progress__hint">Usually takes under a minute.</p>
  </div>
  <div class="dd-progress dd-progress--sm">
    <div class="dd-progress__track is-indeterminate" role="progressbar" aria-label="Loading"><div class="dd-progress__fill"></div></div>
  </div>
</div>
```

## Meter with thresholds

A level, not a task: use `role="meter"`. Ticks mark the thresholds; give the bar the tone of the band its value is in (`--ok`, `--warn`, `--bad`), and let the hint say what happens next.

```html
<div class="dd-stack" style="--dd-gap: var(--dd-space-6); max-width: 520px">
  <div class="dd-progress dd-progress--lg dd-progress--ok">
    <div class="dd-progress__head"><span class="dd-progress__label" id="m-1">CPU · auth-gateway</span><span class="dd-progress__value"><b>42%</b></span></div>
    <div class="dd-progress__track" role="meter" aria-labelledby="m-1" aria-valuenow="42" aria-valuemin="0" aria-valuemax="100" aria-valuetext="42%, healthy" style="--dd-value:42">
      <div class="dd-progress__fill"></div>
      <span class="dd-progress__mark" style="--at:70"></span>
      <span class="dd-progress__mark" style="--at:90"></span>
    </div>
    <div class="dd-progress__scale" aria-hidden="true"><span class="is-start">0</span><span style="--at:70">70</span><span style="--at:90">90</span><span class="is-end">100</span></div>
    <p class="dd-progress__hint">Healthy. Warns at 70%, pages on-call at 90%.</p>
  </div>
  <div class="dd-progress dd-progress--lg dd-progress--warn">
    <div class="dd-progress__head"><span class="dd-progress__label" id="m-2">Memory · search-indexer</span><span class="dd-progress__value"><b>78%</b> · 6.2 / 8 GB</span></div>
    <div class="dd-progress__track" role="meter" aria-labelledby="m-2" aria-valuenow="78" aria-valuemin="0" aria-valuemax="100" aria-valuetext="78%, above the warning threshold" style="--dd-value:78">
      <div class="dd-progress__fill"></div>
      <span class="dd-progress__mark" style="--at:70"></span>
      <span class="dd-progress__mark" style="--at:90"></span>
    </div>
    <div class="dd-progress__scale" aria-hidden="true"><span class="is-start">0</span><span style="--at:70">70</span><span style="--at:90">90</span><span class="is-end">100</span></div>
    <p class="dd-progress__hint"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-alert"/></svg> Above 70% for 12 minutes.</p>
  </div>
  <div class="dd-progress dd-progress--lg dd-progress--bad">
    <div class="dd-progress__head"><span class="dd-progress__label" id="m-3">Error budget burned · notify-fanout</span><span class="dd-progress__value"><b>94%</b> of 30 days</span></div>
    <div class="dd-progress__track" role="meter" aria-labelledby="m-3" aria-valuenow="94" aria-valuemin="0" aria-valuemax="100" aria-valuetext="94%, above the critical threshold" style="--dd-value:94">
      <div class="dd-progress__fill"></div>
      <span class="dd-progress__mark" style="--at:70"></span>
      <span class="dd-progress__mark" style="--at:90"></span>
    </div>
    <div class="dd-progress__scale" aria-hidden="true"><span class="is-start">0</span><span style="--at:70">70</span><span style="--at:90">90</span><span class="is-end">100</span></div>
    <p class="dd-progress__hint"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-danger"/></svg> Freeze deploys until the budget recovers.</p>
  </div>
</div>
```

## Ring

For square spots — table cells, tiles, avatars. Small hides the label; large adds a caption inside.

```html
<div class="dd-row" style="--dd-gap: var(--dd-space-8); align-items: center">
  <div class="dd-progress-ring dd-progress-ring--sm" role="progressbar" aria-valuenow="64" aria-valuemin="0" aria-valuemax="100" aria-label="Upload" style="--dd-value:64">
    <svg viewBox="0 0 36 36" aria-hidden="true"><circle class="dd-progress-ring__track" cx="18" cy="18" r="15.5" pathLength="100"/><circle class="dd-progress-ring__fill" cx="18" cy="18" r="15.5" pathLength="100"/></svg>
    <span class="dd-progress-ring__label">64%</span>
  </div>
  <div class="dd-progress-ring" role="progressbar" aria-valuenow="72" aria-valuemin="0" aria-valuemax="100" aria-label="Build cache hit rate" style="--dd-value:72">
    <svg viewBox="0 0 36 36" aria-hidden="true"><circle class="dd-progress-ring__track" cx="18" cy="18" r="15.5" pathLength="100"/><circle class="dd-progress-ring__fill" cx="18" cy="18" r="15.5" pathLength="100"/></svg>
    <span class="dd-progress-ring__label">72%</span>
  </div>
  <div class="dd-progress-ring dd-progress-ring--lg" role="progressbar" aria-valuenow="88" aria-valuemin="0" aria-valuemax="100" aria-label="Cache hit rate" style="--dd-value:88">
    <svg viewBox="0 0 36 36" aria-hidden="true"><circle class="dd-progress-ring__track" cx="18" cy="18" r="15.5" pathLength="100"/><circle class="dd-progress-ring__fill" cx="18" cy="18" r="15.5" pathLength="100"/></svg>
    <span class="dd-progress-ring__label">88%<span class="dd-progress-ring__sub">cache hits</span></span>
  </div>
  <div class="dd-progress-ring dd-progress-ring--sm is-indeterminate" role="progressbar" aria-label="Loading">
    <svg viewBox="0 0 36 36" aria-hidden="true"><circle class="dd-progress-ring__track" cx="18" cy="18" r="15.5" pathLength="100"/><circle class="dd-progress-ring__fill" cx="18" cy="18" r="15.5" pathLength="100"/></svg>
  </div>
</div>
```

### Ring tones

Pair a ring with a short label; the number never leans on colour alone.

```html
<div class="dd-row" style="--dd-gap: var(--dd-space-6)">
  <div class="dd-row" style="--dd-gap: var(--dd-space-3)">
  <div class="dd-progress-ring dd-progress-ring--ok" role="progressbar" aria-valuenow="99" aria-valuemin="0" aria-valuemax="100" aria-label="Uptime · us-east-1" style="--dd-value:99">
    <svg viewBox="0 0 36 36" aria-hidden="true"><circle class="dd-progress-ring__track" cx="18" cy="18" r="15.5" pathLength="100"/><circle class="dd-progress-ring__fill" cx="18" cy="18" r="15.5" pathLength="100"/></svg>
    <span class="dd-progress-ring__label">99%</span>
  </div><div><div class="dd-small">us-east-1</div><div class="dd-caption">uptime, 30 d</div></div></div>
  <div class="dd-row" style="--dd-gap: var(--dd-space-3)">
  <div class="dd-progress-ring dd-progress-ring--warn" role="progressbar" aria-valuenow="81" aria-valuemin="0" aria-valuemax="100" aria-label="Disk · eu-west-2" style="--dd-value:81">
    <svg viewBox="0 0 36 36" aria-hidden="true"><circle class="dd-progress-ring__track" cx="18" cy="18" r="15.5" pathLength="100"/><circle class="dd-progress-ring__fill" cx="18" cy="18" r="15.5" pathLength="100"/></svg>
    <span class="dd-progress-ring__label">81%</span>
  </div><div><div class="dd-small">eu-west-2</div><div class="dd-caption">disk used</div></div></div>
  <div class="dd-row" style="--dd-gap: var(--dd-space-3)">
  <div class="dd-progress-ring dd-progress-ring--bad" role="progressbar" aria-valuenow="96" aria-valuemin="0" aria-valuemax="100" aria-label="Error budget · ap-south-1" style="--dd-value:96">
    <svg viewBox="0 0 36 36" aria-hidden="true"><circle class="dd-progress-ring__track" cx="18" cy="18" r="15.5" pathLength="100"/><circle class="dd-progress-ring__fill" cx="18" cy="18" r="15.5" pathLength="100"/></svg>
    <span class="dd-progress-ring__label">96%</span>
  </div><div><div class="dd-small">ap-south-1</div><div class="dd-caption">budget burned</div></div></div>
</div>
```

## Segmented steps

Discrete stages of a pipeline. Done steps fill, the current one breathes, a failed step turns `--dd-bad` and the rest stay as track.

```html
<div class="dd-stack" style="--dd-gap: var(--dd-space-8); max-width: 560px">
  <div class="dd-progress-steps" role="group" aria-label="Deploy dawn-and-dusk · step 3 of 4">
    <div class="dd-progress-steps__summary"><span>Deploying <b>dawn-and-dusk</b> to production</span><span>step 3 of 4</span></div>
    <ol class="dd-progress-steps__list">
      <li class="dd-progress-steps__step is-done"><span class="dd-progress-steps__label">Build</span><span class="dd-progress-steps__meta">1m 12s</span></li>
      <li class="dd-progress-steps__step is-done"><span class="dd-progress-steps__label">Test</span><span class="dd-progress-steps__meta">48s</span></li>
      <li class="dd-progress-steps__step is-current" aria-current="step"><span class="dd-progress-steps__label">Deploy</span><span class="dd-progress-steps__meta">running…</span></li>
      <li class="dd-progress-steps__step"><span class="dd-progress-steps__label">Verify</span><span class="dd-progress-steps__meta">queued</span></li>
    </ol>
  </div>
  <div class="dd-progress-steps" role="group" aria-label="Deploy dockey-ui · failed at step 2 of 4">
    <div class="dd-progress-steps__summary"><span>Deploying <b>dockey-ui</b> to staging</span><span>failed</span></div>
    <ol class="dd-progress-steps__list">
      <li class="dd-progress-steps__step is-done"><span class="dd-progress-steps__label">Build</span><span class="dd-progress-steps__meta">58s</span></li>
      <li class="dd-progress-steps__step is-failed"><span class="dd-progress-steps__label">Test</span><span class="dd-progress-steps__meta">3 failed</span></li>
      <li class="dd-progress-steps__step"><span class="dd-progress-steps__label">Deploy</span><span class="dd-progress-steps__meta">skipped</span></li>
      <li class="dd-progress-steps__step"><span class="dd-progress-steps__label">Verify</span><span class="dd-progress-steps__meta">skipped</span></li>
    </ol>
  </div>
</div>
```

### Compact

Segments only; labels stay available to assistive tech.

```html
<div class="dd-progress-steps dd-progress-steps--compact" role="group" aria-label="Onboarding · 2 of 5 done" style="max-width: 280px">
  <div class="dd-progress-steps__summary"><span>Set up your workspace</span><span>2 / 5</span></div>
  <ol class="dd-progress-steps__list">
      <li class="dd-progress-steps__step is-done"><span class="dd-progress-steps__label">Create a project</span><span class="dd-progress-steps__meta"></span></li>
      <li class="dd-progress-steps__step is-done"><span class="dd-progress-steps__label">Connect a repo</span><span class="dd-progress-steps__meta"></span></li>
      <li class="dd-progress-steps__step is-current" aria-current="step"><span class="dd-progress-steps__label">Add a domain</span><span class="dd-progress-steps__meta"></span></li>
      <li class="dd-progress-steps__step"><span class="dd-progress-steps__label">Invite your team</span><span class="dd-progress-steps__meta"></span></li>
      <li class="dd-progress-steps__step"><span class="dd-progress-steps__label">First deploy</span><span class="dd-progress-steps__meta"></span></li>
  </ol>
</div>
```

## Usage quota

A whole split into parts. Segments use the colour set in chart order with 2px gaps; the legend names every part and its amount. Past 80%, switch to `is-warn` and say what happens at the limit.

```html
<div class="dd-stack" style="--dd-gap: var(--dd-space-8); max-width: 560px">
  <div class="dd-progress-quota">
    <div class="dd-progress-quota__head"><span class="dd-progress-quota__title" id="q-1">Storage</span><span class="dd-progress-quota__amount"><b>7.4 GB</b> of 10 GB</span></div>
    <div class="dd-progress-quota__track" role="meter" aria-labelledby="q-1" aria-valuenow="74" aria-valuemin="0" aria-valuemax="100" aria-valuetext="7.4 GB of 10 GB used">
      <span class="dd-progress-quota__seg" style="--dd-value:31; --dd-color: var(--dd-set-4)"></span>
      <span class="dd-progress-quota__seg" style="--dd-value:22; --dd-color: var(--dd-set-1)"></span>
      <span class="dd-progress-quota__seg" style="--dd-value:13; --dd-color: var(--dd-set-6)"></span>
      <span class="dd-progress-quota__seg" style="--dd-value:8; --dd-color: var(--dd-set-5)"></span>
    </div>
    <ul class="dd-progress-quota__legend">
      <li style="--dd-color: var(--dd-set-4)">dawn-and-dusk <b>3.1 GB</b></li>
      <li style="--dd-color: var(--dd-set-1)">dockey-ui <b>2.2 GB</b></li>
      <li style="--dd-color: var(--dd-set-6)">insomnia <b>1.3 GB</b></li>
      <li style="--dd-color: var(--dd-set-5)">ai-focus <b>0.8 GB</b></li>
      <li class="is-free">Free <b>2.6 GB</b></li>
    </ul>
  </div>
  <div class="dd-progress-quota is-warn">
    <div class="dd-progress-quota__head"><span class="dd-progress-quota__title" id="q-2">Build minutes · October</span><span class="dd-progress-quota__amount"><b>2,580</b> of 3,000 min</span></div>
    <div class="dd-progress-quota__track" role="meter" aria-labelledby="q-2" aria-valuenow="86" aria-valuemin="0" aria-valuemax="100" aria-valuetext="2,580 of 3,000 minutes used, 86%">
      <span class="dd-progress-quota__seg" style="--dd-value:86; --dd-color: var(--dd-warn)"></span>
    </div>
    <p class="dd-progress-quota__hint"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-alert"/></svg><span>86% used with 2 days left. Builds queue once you hit 3,000 minutes — <a href="#">raise the limit</a>.</span></p>
  </div>
</div>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-progress` | Wrapper: head, track, hint. Sets the tone and height for its track. |
| `.dd-progress__head / __label / __value` | Label left, mono value right. Wrap emphasised numbers in `<b>`. |
| `.dd-progress__track` | The bar. `role="progressbar"` (or `meter`), `aria-value*` and `style="--dd-value:62"`. |
| `.dd-progress__fill` | The filled part; width comes from `--dd-value`. |
| `.dd-progress__hint` | Small muted line under the bar. An icon inside takes the tone. |
| `.is-indeterminate` | On the track (or ring): unknown length. The bar’s fill slides; the ring’s arc spins. |
| `.dd-progress--sm / --lg` | Heights 4px / 10px (default 6px). |
| `.dd-progress--ok / --warn / --bad / --info / --primary` | Tones. Default is `--dd-accent`. |
| `.dd-progress__mark` | Threshold tick at `style="--at:70"`. |
| `.dd-progress__scale` | Labels under the ticks, each a `<span style="--at:70">`; `.is-start` / `.is-end` pin the ends. The end label drops on tracks under 360px. |
| `.dd-progress-ring` | Circular progress. Two circles with `pathLength="100"`; `__track`, `__fill`, `__label`, `__sub`. |
| `.dd-progress-ring--sm / --lg` | 24px (no label) / 104px with a caption. Default 56px. |
| `.dd-progress-ring--ok / --warn / --bad / --info / --primary` | Ring tones. |
| `.dd-progress-steps` | Segmented steps: `__summary`, `__list`, `__step` with `__label` and `__meta`. |
| `.is-done / .is-current / .is-failed` | Step states. Put `aria-current="step"` on the current one. |
| `.dd-progress-steps--compact` | Thin segments, labels visually hidden. |
| `.dd-progress-quota` | Usage against a limit: `__head`, `__title`, `__amount`, `__track`, `__seg`, `__legend`, `__hint`. |
| `.dd-progress-quota__seg` | One part: `style="--dd-value:31; --dd-color: var(--dd-set-4)"`. |
| `.dd-progress-quota.is-warn / .is-bad` | Near or over the limit: the hint icon takes the status colour. |

## Guidelines

Do:
- Show the number next to the bar — a bar alone is a guess.
- Use `role="meter"` for levels (CPU, disk) and `progressbar` for work that finishes.
- Say what crossing a threshold means in the hint.
- Prefer indeterminate over a fake percentage.

Don't:
- Don’t colour progress by status unless it is a status.
- Don’t animate determinate bars backwards; start a new bar instead.
- Don’t use more than four or five quota segments — fold the rest into “Other”.

