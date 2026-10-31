# accordion — `accordion`

Sections that fold away. Built on native details and summary, so it works with no JavaScript, opens with the keyboard and lets find-in-page reach text in closed sections.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/accordion

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### Default

Hairlines between sections; the chevron turns when a section opens, and the body eases open where the browser supports it. Several can be open at once. Try it: click a question, or Tab to one and press Enter or Space.

```html
<div class="dd-accordion" style="max-width: 640px">
  <details class="dd-accordion__item" open>
    <summary class="dd-accordion__summary"><span class="dd-accordion__title">Do I need a build step to use dawn &amp; dusk?</span><svg class="dd-icon dd-accordion__chevron" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></summary>
    <div class="dd-accordion__body"><p>No. Link <code>dawn-and-dusk.css</code> and, if you want the behaviours, <code>dawn-and-dusk.js</code> with <code>defer</code>. Everything is plain CSS and one vanilla script.</p></div>
  </details>
  <details class="dd-accordion__item">
    <summary class="dd-accordion__summary"><span class="dd-accordion__title">How do I switch between dawn and dusk?</span><svg class="dd-icon dd-accordion__chevron" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></summary>
    <div class="dd-accordion__body"><p>Set <code>data-theme="dawn"</code> or <code>"dusk"</code> on <code>&lt;html&gt;</code> — or on any element to theme only that part. With no attribute, the system follows the OS.</p></div>
  </details>
  <details class="dd-accordion__item">
    <summary class="dd-accordion__summary"><span class="dd-accordion__title">Can I change the accent colour?</span><svg class="dd-icon dd-accordion__chevron" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></summary>
    <div class="dd-accordion__body"><p>Override <code>--dd-accent</code> and its siblings on <code>:root</code>. Components read tokens only, so the change carries everywhere.</p></div>
  </details>
  <details class="dd-accordion__item">
    <summary class="dd-accordion__summary"><span class="dd-accordion__title">Does it work without JavaScript?</span><svg class="dd-icon dd-accordion__chevron" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></summary>
    <div class="dd-accordion__body"><p>Yes. Accordions, cards and dividers are pure CSS. Behaviours like dialogs and tabs enhance markup that already makes sense on its own.</p></div>
  </details>
</div>
```

## One open at a time

Give every `<details>` in the group the same `name` and the browser closes the others for you. Add `--icons` when summaries lead with an icon, so the body lines up with the text.

Try it: open Secrets and Environment closes.

```html
<div class="dd-accordion dd-accordion--icons" style="max-width: 640px">
  <details class="dd-accordion__item" name="svc" open>
    <summary class="dd-accordion__summary"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-globe"/></svg><span class="dd-accordion__title">Environment</span><span class="dd-accordion__meta">2 regions</span><svg class="dd-icon dd-accordion__chevron" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></summary>
    <div class="dd-accordion__body"><p>Production runs in <code>eu-west-1</code> and <code>us-east-1</code>; staging mirrors eu-west-1 only.</p></div>
  </details>
  <details class="dd-accordion__item" name="svc">
    <summary class="dd-accordion__summary"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-key"/></svg><span class="dd-accordion__title">Secrets</span><span class="dd-accordion__meta">3 keys</span><svg class="dd-icon dd-accordion__chevron" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></summary>
    <div class="dd-accordion__body"><p><code>JWT_SIGNING_KEY</code>, <code>SESSION_SECRET</code> and <code>OAUTH_CLIENT_SECRET</code> are pulled from the vault at boot and rotated every 30 days.</p></div>
  </details>
  <details class="dd-accordion__item" name="svc">
    <summary class="dd-accordion__summary"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-shield"/></svg><span class="dd-accordion__title">Health checks</span><span class="dd-accordion__meta">10s</span><svg class="dd-icon dd-accordion__chevron" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></summary>
    <div class="dd-accordion__body"><p><code>GET /healthz</code> every 10s; three misses in a row drain the instance.</p></div>
  </details>
  <details class="dd-accordion__item" name="svc">
    <summary class="dd-accordion__summary"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-users"/></svg><span class="dd-accordion__title">Owners</span><span class="dd-accordion__meta">@platform</span><svg class="dd-icon dd-accordion__chevron" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></summary>
    <div class="dd-accordion__body"><p>Platform team · on call this week: cxkw.</p></div>
  </details>
</div>
```

## Boxed

Each section on its own tonal fill instead of hairlines — for settings pages and lists that sit directly on the page.

```html
<div class="dd-accordion dd-accordion--boxed dd-accordion--icons" style="max-width: 640px">
  <details class="dd-accordion__item" name="boxed" open>
    <summary class="dd-accordion__summary"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-shield"/></svg><span class="dd-accordion__title">auth-gateway</span><span class="dd-accordion__meta">v2.8.1</span><svg class="dd-icon dd-accordion__chevron" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></summary>
    <div class="dd-accordion__body"><p>Issues and verifies session tokens for every cxkw.dev app. 14 instances, p95 182ms.</p></div>
  </details>
  <details class="dd-accordion__item" name="boxed">
    <summary class="dd-accordion__summary"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-box"/></svg><span class="dd-accordion__title">billing-worker</span><span class="dd-accordion__meta">v1.4.0</span><svg class="dd-icon dd-accordion__chevron" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></summary>
    <div class="dd-accordion__body"><p>Turns usage events into invoices once an hour. Retries failed charges three times.</p></div>
  </details>
  <details class="dd-accordion__item" name="boxed">
    <summary class="dd-accordion__summary"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-cloud"/></svg><span class="dd-accordion__title">edge-cache</span><span class="dd-accordion__meta">v3.0.2</span><svg class="dd-icon dd-accordion__chevron" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></summary>
    <div class="dd-accordion__body"><p>Caches static assets and API GETs at the edge; purges on deploy.</p></div>
  </details>
</div>
```

## Expandable card

`.dd-expand` is a card whose summary is a full row — title, mono meta and a status — and whose body holds the detail. Use it for deploys, jobs and log entries.

```html
<div style="max-width: 680px">
  <details class="dd-expand" open>
    <summary class="dd-expand__summary">
      <span class="dd-expand__lead"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-cloud"/></svg></span>
      <span class="dd-expand__titles">
        <span class="dd-expand__title">Deploy #4821 · auth-gateway</span>
        <span class="dd-expand__meta">a3f9c2e · main · 4m ago</span>
      </span>
      <span class="dd-expand__side">
        <span class="dd-expand__status is-ok">Live</span>
        <svg class="dd-icon dd-expand__chevron" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg>
      </span>
    </summary>
    <div class="dd-expand__body">
      <dl class="dd-expand__dl">
        <dt>Commit</dt><dd>a3f9c2e — Rotate JWT keys on a schedule</dd>
        <dt>Regions</dt><dd>eu-west-1, us-east-1</dd>
        <dt>Duration</dt><dd>2m 41s</dd>
        <dt>Triggered by</dt><dd>cxkw</dd>
      </dl>
    </div>
  </details>
  <details class="dd-expand">
    <summary class="dd-expand__summary">
      <span class="dd-expand__lead"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-cloud"/></svg></span>
      <span class="dd-expand__titles">
        <span class="dd-expand__title">Deploy #4820 · billing-worker</span>
        <span class="dd-expand__meta">71be04d · main · 1h ago</span>
      </span>
      <span class="dd-expand__side">
        <span class="dd-expand__status is-bad">Failed</span>
        <svg class="dd-icon dd-expand__chevron" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg>
      </span>
    </summary>
    <div class="dd-expand__body">
      <p>Migration <code>0042_invoice_currency</code> timed out after 120s. The previous release is still serving traffic.</p>
      <dl class="dd-expand__dl">
        <dt>Failed step</dt><dd>migrate</dd>
        <dt>Duration</dt><dd>3m 02s</dd>
      </dl>
    </div>
  </details>
  <details class="dd-expand">
    <summary class="dd-expand__summary">
      <span class="dd-expand__lead"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-cloud"/></svg></span>
      <span class="dd-expand__titles">
        <span class="dd-expand__title">Deploy #4819 · edge-cache</span>
        <span class="dd-expand__meta">9d02aa1 · release/3.0 · yesterday</span>
      </span>
      <span class="dd-expand__side">
        <span class="dd-expand__status is-warn">Rolled back</span>
        <svg class="dd-icon dd-expand__chevron" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg>
      </span>
    </summary>
    <div class="dd-expand__body"><p>Hit rate dropped below 90% in ap-south-1 during the canary; rolled back automatically.</p></div>
  </details>
</div>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-accordion` | Wrapper for a stack of sections. |
| `.dd-accordion__item` | A `<details>`. Add `open` to start expanded and `name="…"` to make the group exclusive. |
| `.dd-accordion__summary` | The `<summary>` row. Holds an optional leading icon, `__title`, `__meta` and `__chevron`. |
| `.dd-accordion__body` | The content under the summary. |
| `.dd-accordion--boxed` | Tonal fill per item instead of hairlines. A closed item lifts a tone on hover (further in dusk, so it clears the grain page); an open one washes its summary row. |
| `--dd-accordion-hover` | The hover tone of boxed items and expand cards: `--dd-surface-2` in dawn, 14% toward ink on dusk’s grain page. `.dd-app-shell` (a plain page, no grain) uses `--dd-surface-2` in both. |
| `.dd-accordion--icons` | Indents the body to line up with titles that follow an icon. |
| `.dd-expand` | Expandable card (`<details>`). Parts: `__summary`, `__lead`, `__titles`, `__title`, `__meta`, `__side`, `__status`, `__chevron`, `__body`, `__dl`. |
| `.dd-expand__status` | Status with a coloured dot: add `is-ok`, `is-warn`, `is-bad` or `is-info`. |

## Guidelines

Do:
- Write summaries that make sense on their own — people skim the closed list.
- Use `name` groups when sections are alternatives (one service, one plan).
- Keep primary actions outside the accordion so they never hide.

Don't:
- Don’t hide content everyone needs; accordions are for the optional.
- Don’t nest accordions more than one level.
- Don’t put a link or button inside a summary — the whole row is already a toggle.

