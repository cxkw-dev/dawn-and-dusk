# description list — `description-list`

Key-value pairs: the facts about a deploy, a service’s settings, the metadata of a key. Inline when there is room, stacked when there isn’t, two columns for long sets.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/description-list

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### Inline

The default: a term column and a value, hairlines between rows. IDs and times are mono. Try it: hover a row (or Tab to its copy button) and copy its value — the icon turns to a check.

```html
<dl class="dd-description-list" style="max-width: 620px">
  <div class="dd-description-list__item">
    <dt class="dd-description-list__term">Deployment</dt>
    <dd class="dd-description-list__details"><span class="dd-description-list__mono">dpl_7Hq2xK9mW4</span><button class="dd-description-list__copy" type="button" data-dd-copy="dpl_7Hq2xK9mW4" aria-label="Copy deployment ID"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-copy"/></svg><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></button></dd>
  </div>
  <div class="dd-description-list__item">
    <dt class="dd-description-list__term">Status</dt>
    <dd class="dd-description-list__details"><span class="dd-description-list__status" data-status="ok">Ready</span></dd>
  </div>
  <div class="dd-description-list__item">
    <dt class="dd-description-list__term">Commit</dt>
    <dd class="dd-description-list__details"><span class="dd-description-list__mono">a41f9c2</span><span class="dd-description-list__muted">fix(table): sticky header in dusk</span><button class="dd-description-list__copy" type="button" data-dd-copy="a41f9c2" aria-label="Copy commit SHA"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-copy"/></svg><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></button></dd>
  </div>
  <div class="dd-description-list__item">
    <dt class="dd-description-list__term">Branch</dt>
    <dd class="dd-description-list__details"><span class="dd-description-list__mono">main</span></dd>
  </div>
  <div class="dd-description-list__item">
    <dt class="dd-description-list__term">Region</dt>
    <dd class="dd-description-list__details">us-east-1 · eu-west-2</dd>
  </div>
  <div class="dd-description-list__item">
    <dt class="dd-description-list__term">Created</dt>
    <dd class="dd-description-list__details"><span class="dd-description-list__mono">2026-10-30 09:41 UTC</span><span class="dd-description-list__muted">by Andy</span></dd>
  </div>
  <div class="dd-description-list__item">
    <dt class="dd-description-list__term">Duration</dt>
    <dd class="dd-description-list__details"><span class="dd-description-list__mono">2m 04s</span></dd>
  </div>
  <div class="dd-description-list__item">
    <dt class="dd-description-list__term">Domain</dt>
    <dd class="dd-description-list__details"><a href="#">dawn-and-dusk.cxkw.dev</a><button class="dd-description-list__copy" type="button" data-dd-copy="https://dawn-and-dusk.cxkw.dev" aria-label="Copy URL"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-copy"/></svg><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></button></dd>
  </div>
</dl>
```

## On a card

Add `--card` to sit the list on a tonal surface — the usual home for a details panel.

```html
<dl class="dd-description-list dd-description-list--card" style="max-width: 620px">
  <div class="dd-description-list__item">
    <dt class="dd-description-list__term">Service</dt>
    <dd class="dd-description-list__details"><b>auth-gateway</b></dd>
  </div>
  <div class="dd-description-list__item">
    <dt class="dd-description-list__term">Health</dt>
    <dd class="dd-description-list__details"><span class="dd-description-list__status" data-status="warn">Degraded · p95 611 ms</span></dd>
  </div>
  <div class="dd-description-list__item">
    <dt class="dd-description-list__term">Instances</dt>
    <dd class="dd-description-list__details"><span class="dd-description-list__mono">6</span><span class="dd-description-list__muted">min 2 · max 12</span></dd>
  </div>
  <div class="dd-description-list__item">
    <dt class="dd-description-list__term">Runtime</dt>
    <dd class="dd-description-list__details">Node 22 · 512 MB</dd>
  </div>
  <div class="dd-description-list__item">
    <dt class="dd-description-list__term">Health check</dt>
    <dd class="dd-description-list__details"><span class="dd-description-list__mono">GET /healthz</span><span class="dd-description-list__muted">every 10 s</span></dd>
  </div>
  <div class="dd-description-list__item">
    <dt class="dd-description-list__term">Internal URL</dt>
    <dd class="dd-description-list__details"><span class="dd-description-list__mono">auth-gateway.internal:8443</span><button class="dd-description-list__copy" type="button" data-dd-copy="auth-gateway.internal:8443" aria-label="Copy internal URL"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-copy"/></svg><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></button></dd>
  </div>
</dl>
```

## Stacked

Term above value, for sidebars, drawers and anywhere narrow. Inline lists switch to this on their own below 420px.

```html
<dl class="dd-description-list dd-description-list--stacked" style="max-width: 360px">
  <div class="dd-description-list__item">
    <dt class="dd-description-list__term">Key ID</dt>
    <dd class="dd-description-list__details"><span class="dd-description-list__mono">key_live_8f2c41</span><button class="dd-description-list__copy" type="button" data-dd-copy="key_live_8f2c41" aria-label="Copy key ID"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-copy"/></svg><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></button></dd>
  </div>
  <div class="dd-description-list__item">
    <dt class="dd-description-list__term">Name</dt>
    <dd class="dd-description-list__details">billing-worker · production</dd>
  </div>
  <div class="dd-description-list__item">
    <dt class="dd-description-list__term">Scopes</dt>
    <dd class="dd-description-list__details"><span class="dd-description-list__mono">invoices:write, customers:read</span></dd>
  </div>
  <div class="dd-description-list__item">
    <dt class="dd-description-list__term">Last used</dt>
    <dd class="dd-description-list__details"><span class="dd-description-list__mono">2 min ago</span><span class="dd-description-list__muted">from 203.0.113.24</span></dd>
  </div>
  <div class="dd-description-list__item">
    <dt class="dd-description-list__term">Expires</dt>
    <dd class="dd-description-list__details"><span class="dd-description-list__status" data-status="warn">in 6 days</span></dd>
  </div>
</dl>
```

## Two columns

Long sets of short facts. Falls back to one column when the container gets narrow.

```html
<dl class="dd-description-list dd-description-list--columns dd-description-list--card">
  <div class="dd-description-list__item">
    <dt class="dd-description-list__term">Project</dt>
    <dd class="dd-description-list__details"><b>leetnode</b></dd>
  </div>
  <div class="dd-description-list__item">
    <dt class="dd-description-list__term">Owner</dt>
    <dd class="dd-description-list__details">Andy · cxkw.dev</dd>
  </div>
  <div class="dd-description-list__item">
    <dt class="dd-description-list__term">Framework</dt>
    <dd class="dd-description-list__details">Astro 6</dd>
  </div>
  <div class="dd-description-list__item">
    <dt class="dd-description-list__term">Node version</dt>
    <dd class="dd-description-list__details"><span class="dd-description-list__mono">22.12.0</span></dd>
  </div>
  <div class="dd-description-list__item">
    <dt class="dd-description-list__term">Build command</dt>
    <dd class="dd-description-list__details"><span class="dd-description-list__mono">npm run build</span><button class="dd-description-list__copy" type="button" data-dd-copy="npm run build" aria-label="Copy build command"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-copy"/></svg><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></button></dd>
  </div>
  <div class="dd-description-list__item">
    <dt class="dd-description-list__term">Output</dt>
    <dd class="dd-description-list__details"><span class="dd-description-list__mono">dist/</span></dd>
  </div>
  <div class="dd-description-list__item">
    <dt class="dd-description-list__term">Created</dt>
    <dd class="dd-description-list__details"><span class="dd-description-list__mono">2025-03-14</span></dd>
  </div>
  <div class="dd-description-list__item">
    <dt class="dd-description-list__term">Deploys</dt>
    <dd class="dd-description-list__details"><span class="dd-description-list__mono">1,284</span><span class="dd-description-list__muted">last 2h ago</span></dd>
  </div>
</dl>
```

## Compact

```html
<dl class="dd-description-list dd-description-list--compact" style="max-width: 340px">
  <div class="dd-description-list__item">
    <dt class="dd-description-list__term">Region</dt>
    <dd class="dd-description-list__details">ap-south-1</dd>
  </div>
  <div class="dd-description-list__item">
    <dt class="dd-description-list__term">Requests</dt>
    <dd class="dd-description-list__details"><span class="dd-description-list__mono">6,502 / min</span></dd>
  </div>
  <div class="dd-description-list__item">
    <dt class="dd-description-list__term">p95</dt>
    <dd class="dd-description-list__details"><span class="dd-description-list__mono">188 ms</span></dd>
  </div>
  <div class="dd-description-list__item">
    <dt class="dd-description-list__term">Errors</dt>
    <dd class="dd-description-list__details"><span class="dd-description-list__mono">0.02%</span></dd>
  </div>
</dl>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-description-list` | On the `<dl>`. Inline rows by default; a size container, so it adapts to its own width. |
| `.dd-description-list__item` | A `<div>` wrapping one `<dt>` + `<dd>`. |
| `.dd-description-list__term` | The key (`<dt>`), muted. |
| `.dd-description-list__details` | The value (`<dd>`). Lays out inline pieces with a small gap. |
| `.dd-description-list__mono` | Mono, tabular figures — IDs, SHAs, times, amounts. |
| `.dd-description-list__muted` | Secondary text next to a value. |
| `.dd-description-list__status` | Value with a status dot: `data-status="ok \| warn \| bad \| info \| muted"`. |
| `.dd-description-list__copy` | Icon button with `data-dd-copy`; holds the `copy` and `check` icons and swaps on `[data-copied]`. |
| `.dd-description-list--stacked` | Term above value. |
| `.dd-description-list--columns` | Two columns of stacked items; one column when narrow. |
| `.dd-description-list--card` | On `--dd-surface` with padding. |
| `.dd-description-list--compact` | Tighter rows. |

## Behaviour

Copy buttons use the shared `data-dd-copy` behaviour. They appear on row hover or keyboard focus, and are always visible on touch screens. Give each one an `aria-label` that names what it copies.

## Guidelines

Do:
- Keep terms short nouns: “Region”, “Created”, “Commit”.
- Put the most identifying facts first — ID, status, owner.
- Offer copy for values people paste elsewhere: IDs, URLs, commands.

Don't:
- Don’t end terms with a colon.
- Don’t use a description list for tabular data with repeated keys — use a table.
- Don’t make every value copyable; it turns the list into a row of buttons.

