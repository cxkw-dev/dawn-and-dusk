# tabs — `tabs`

Switch between views of the same thing. A hairline baseline with an ink marker under the active tab; hover previews the marker in a softer tone.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/tabs

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### Underline

The default. Try it: click a tab, or Tab to the selected one and use ← → (Home, End); the panel follows focus. Tab again moves into the panel.

```html
<div class="dd-tabs" data-dd-tabs>
  <div class="dd-tabs__list" role="tablist" aria-label="Project">
    <button class="dd-tabs__tab" role="tab" type="button" aria-selected="true"><span>Overview</span></button>
    <button class="dd-tabs__tab" role="tab" type="button"><span>Deploys</span></button>
    <button class="dd-tabs__tab" role="tab" type="button"><span>Logs</span></button>
    <button class="dd-tabs__tab" role="tab" type="button"><span>Settings</span></button>
  </div>
  <div class="dd-tabs__panel" role="tabpanel"><p class="dd-small dd-muted">auth-gateway is healthy in 3 regions. The last deploy shipped 4 minutes ago from <code>main</code>.</p></div>
  <div class="dd-tabs__panel" role="tabpanel"><p class="dd-small dd-muted">312 deploys, 4 this week. The newest is <code>dpl_8f3a2c</code>.</p></div>
  <div class="dd-tabs__panel" role="tabpanel"><p class="dd-small dd-muted">Streaming logs from fra1, iad1 and sin1.</p></div>
  <div class="dd-tabs__panel" role="tabpanel"><p class="dd-small dd-muted">Build command, environment variables and domains.</p></div>
</div>
```

## With counts

Counts sit in a small mono pill and turn to ink on the active tab.

12 open alerts across billing-worker and edge-cache.

```html
<div class="dd-tabs" data-dd-tabs>
  <div class="dd-tabs__list" role="tablist" aria-label="Inbox">
    <button class="dd-tabs__tab" role="tab" type="button" aria-selected="true"><span>Open</span><span class="dd-tabs__count">12</span></button>
    <button class="dd-tabs__tab" role="tab" type="button"><span>Assigned to me</span><span class="dd-tabs__count">3</span></button>
    <button class="dd-tabs__tab" role="tab" type="button"><span>Resolved</span><span class="dd-tabs__count">248</span></button>
    <button class="dd-tabs__tab" role="tab" type="button"><span>Muted</span></button>
  </div>
  <div class="dd-tabs__panel" role="tabpanel"><p class="dd-small dd-muted">12 open alerts across billing-worker and edge-cache.</p></div>
  <div class="dd-tabs__panel" role="tabpanel"><p class="dd-small dd-muted">3 alerts are assigned to you.</p></div>
  <div class="dd-tabs__panel" role="tabpanel"><p class="dd-small dd-muted">248 resolved in the last 30 days.</p></div>
  <div class="dd-tabs__panel" role="tabpanel"><p class="dd-small dd-muted">Nothing muted.</p></div>
</div>
```

## With icons

Overview of edge-cache.

```html
<div class="dd-tabs" data-dd-tabs>
  <div class="dd-tabs__list" role="tablist" aria-label="Service">
    <button class="dd-tabs__tab" role="tab" type="button" aria-selected="true"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-home"/></svg><span>Overview</span></button>
    <button class="dd-tabs__tab" role="tab" type="button"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-cloud"/></svg><span>Deploys</span><span class="dd-tabs__count">32</span></button>
    <button class="dd-tabs__tab" role="tab" type="button"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-terminal"/></svg><span>Logs</span></button>
    <button class="dd-tabs__tab" role="tab" type="button"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chart"/></svg><span>Metrics</span></button>
    <button class="dd-tabs__tab" role="tab" type="button"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-settings"/></svg><span>Settings</span></button>
  </div>
  <div class="dd-tabs__panel" role="tabpanel"><p class="dd-small dd-muted">Overview of edge-cache.</p></div>
  <div class="dd-tabs__panel" role="tabpanel"><p class="dd-small dd-muted">32 deploys.</p></div>
  <div class="dd-tabs__panel" role="tabpanel"><p class="dd-small dd-muted">Logs.</p></div>
  <div class="dd-tabs__panel" role="tabpanel"><p class="dd-small dd-muted">Hit ratio 94.2% over 24h.</p></div>
  <div class="dd-tabs__panel" role="tabpanel"><p class="dd-small dd-muted">Settings.</p></div>
</div>
```

## Small

For chart ranges and dense toolbars. Disabled tabs stay in place but are skipped by the keyboard — try End: it stops on 30d, not Custom.

Requests in the last hour: 81.4k, p95 128ms.

```html
<div class="dd-tabs dd-tabs--sm" data-dd-tabs>
  <div class="dd-tabs__list" role="tablist" aria-label="Range">
    <button class="dd-tabs__tab" role="tab" type="button"><span>1h</span></button>
    <button class="dd-tabs__tab" role="tab" type="button" aria-selected="true"><span>24h</span></button>
    <button class="dd-tabs__tab" role="tab" type="button"><span>7d</span></button>
    <button class="dd-tabs__tab" role="tab" type="button"><span>30d</span></button>
    <button class="dd-tabs__tab" role="tab" type="button" disabled><span>Custom</span></button>
  </div>
  <div class="dd-tabs__panel" role="tabpanel"><p class="dd-small dd-muted">Requests in the last hour: 81.4k, p95 128ms.</p></div>
  <div class="dd-tabs__panel" role="tabpanel"><p class="dd-small dd-muted">Requests over the last 24 hours: 1.82M, p95 142ms.</p></div>
  <div class="dd-tabs__panel" role="tabpanel"><p class="dd-small dd-muted">Requests over 7 days: 12.6M, p95 151ms.</p></div>
  <div class="dd-tabs__panel" role="tabpanel"><p class="dd-small dd-muted">Requests over 30 days: 53.9M, p95 149ms.</p></div>
  <div class="dd-tabs__panel" role="tabpanel"><p class="dd-small dd-muted">Pick a range.</p></div>
</div>
```

## Secondary · pill

When a view already sits under underline tabs, use pills for the second level — filters, sub-views, ranges. Here the top row is page navigation (links) and the pills are real tabs.

Every deploy, newest first.

```html
<div class="dd-stack" style="--dd-gap: 18px">
  <nav class="dd-tabs__list" aria-label="Section">
    <a class="dd-tabs__tab" href="#" aria-current="page">Deploys</a>
    <a class="dd-tabs__tab" href="#">Domains</a>
    <a class="dd-tabs__tab" href="#">Env vars</a>
  </nav>
  <div class="dd-tabs dd-tabs--pill" data-dd-tabs>
    <div class="dd-tabs__list" role="tablist" aria-label="Filter deploys">
    <button class="dd-tabs__tab" role="tab" type="button" aria-selected="true"><span>All</span><span class="dd-tabs__count">312</span></button>
    <button class="dd-tabs__tab" role="tab" type="button"><span>Production</span><span class="dd-tabs__count">41</span></button>
    <button class="dd-tabs__tab" role="tab" type="button"><span>Preview</span><span class="dd-tabs__count">266</span></button>
    <button class="dd-tabs__tab" role="tab" type="button"><span>Failed</span><span class="dd-tabs__count">5</span></button>
  </div>
    <div class="dd-tabs__panel" role="tabpanel"><p class="dd-small dd-muted">Every deploy, newest first.</p></div>
    <div class="dd-tabs__panel" role="tabpanel"><p class="dd-small dd-muted">Production deploys only.</p></div>
    <div class="dd-tabs__panel" role="tabpanel"><p class="dd-small dd-muted">Preview deploys from pull requests.</p></div>
    <div class="dd-tabs__panel" role="tabpanel"><p class="dd-small dd-muted">5 failed builds this month.</p></div>
  </div>
</div>
```

## Vertical

For settings. Set `aria-orientation="vertical"` on the list so ↑ ↓ move between tabs (← → are left alone). The list moves above the panel when the space runs out.

Workspace name, default region and the theme new members start in.

```html
<div class="dd-tabs dd-tabs--vertical" data-dd-tabs>
  <div class="dd-tabs__list" role="tablist" aria-label="Settings" aria-orientation="vertical">
    <button class="dd-tabs__tab" role="tab" type="button" aria-selected="true"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-settings"/></svg><span>General</span></button>
    <button class="dd-tabs__tab" role="tab" type="button"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-users"/></svg><span>Members</span><span class="dd-tabs__count">6</span></button>
    <button class="dd-tabs__tab" role="tab" type="button"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-bell"/></svg><span>Notifications</span><span class="dd-tabs__count">3</span></button>
    <button class="dd-tabs__tab" role="tab" type="button"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-key"/></svg><span>Tokens</span></button>
    <button class="dd-tabs__tab" role="tab" type="button"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-database"/></svg><span>Billing</span></button>
  </div>
  <div class="dd-tabs__panel" role="tabpanel"><h3 class="dd-h4">General</h3><p class="dd-small dd-muted">Workspace name, default region and the theme new members start in.</p></div>
  <div class="dd-tabs__panel" role="tabpanel"><h3 class="dd-h4">Members</h3><p class="dd-small dd-muted">6 people can deploy to cxkw.</p></div>
  <div class="dd-tabs__panel" role="tabpanel"><h3 class="dd-h4">Notifications</h3><p class="dd-small dd-muted">Failed deploys, usage alerts and weekly digests.</p></div>
  <div class="dd-tabs__panel" role="tabpanel"><h3 class="dd-h4">Tokens</h3><p class="dd-small dd-muted">Personal access tokens for the CLI.</p></div>
  <div class="dd-tabs__panel" role="tabpanel"><h3 class="dd-h4">Billing</h3><p class="dd-small dd-muted">Hobby plan, renews 1 Dec.</p></div>
</div>
```

## Overflow

When the tabs don’t fit, the list scrolls sideways and fades at the edge that has more. The selected tab is scrolled into view as you move — try End, then Home.

edge-cache in `fra1`: healthy.

```html
<div class="dd-tabs" data-dd-tabs style="max-width: 420px">
  <div class="dd-tabs__list" role="tablist" aria-label="Regions">
    <button class="dd-tabs__tab" role="tab" type="button" aria-selected="true"><span>fra1</span><span class="dd-tabs__count">41</span></button>
    <button class="dd-tabs__tab" role="tab" type="button"><span>iad1</span><span class="dd-tabs__count">38</span></button>
    <button class="dd-tabs__tab" role="tab" type="button"><span>sin1</span><span class="dd-tabs__count">22</span></button>
    <button class="dd-tabs__tab" role="tab" type="button"><span>syd1</span><span class="dd-tabs__count">9</span></button>
    <button class="dd-tabs__tab" role="tab" type="button"><span>gru1</span><span class="dd-tabs__count">6</span></button>
    <button class="dd-tabs__tab" role="tab" type="button"><span>hnd1</span><span class="dd-tabs__count">17</span></button>
    <button class="dd-tabs__tab" role="tab" type="button"><span>cdg1</span><span class="dd-tabs__count">12</span></button>
    <button class="dd-tabs__tab" role="tab" type="button"><span>lhr1</span><span class="dd-tabs__count">30</span></button>
    <button class="dd-tabs__tab" role="tab" type="button"><span>sfo1</span><span class="dd-tabs__count">25</span></button>
    <button class="dd-tabs__tab" role="tab" type="button"><span>bom1</span><span class="dd-tabs__count">4</span></button>
  </div>
  <div class="dd-tabs__panel" role="tabpanel"><p class="dd-small dd-muted">edge-cache in <code>fra1</code>: healthy.</p></div>
  <div class="dd-tabs__panel" role="tabpanel"><p class="dd-small dd-muted">edge-cache in <code>iad1</code>: healthy.</p></div>
  <div class="dd-tabs__panel" role="tabpanel"><p class="dd-small dd-muted">edge-cache in <code>sin1</code>: healthy.</p></div>
  <div class="dd-tabs__panel" role="tabpanel"><p class="dd-small dd-muted">edge-cache in <code>syd1</code>: healthy.</p></div>
  <div class="dd-tabs__panel" role="tabpanel"><p class="dd-small dd-muted">edge-cache in <code>gru1</code>: healthy.</p></div>
  <div class="dd-tabs__panel" role="tabpanel"><p class="dd-small dd-muted">edge-cache in <code>hnd1</code>: healthy.</p></div>
  <div class="dd-tabs__panel" role="tabpanel"><p class="dd-small dd-muted">edge-cache in <code>cdg1</code>: healthy.</p></div>
  <div class="dd-tabs__panel" role="tabpanel"><p class="dd-small dd-muted">edge-cache in <code>lhr1</code>: healthy.</p></div>
  <div class="dd-tabs__panel" role="tabpanel"><p class="dd-small dd-muted">edge-cache in <code>sfo1</code>: healthy.</p></div>
  <div class="dd-tabs__panel" role="tabpanel"><p class="dd-small dd-muted">edge-cache in <code>bom1</code>: healthy.</p></div>
</div>
```

## As page navigation

For tabs that change the URL, use links with `aria-current="page"` inside a `<nav>` — no `data-dd-tabs`, no tab roles. The script leaves them alone: they navigate like any link and the next page marks its own tab. (On this page the links go nowhere, so a click only moves `aria-current` to show the marker.)

```html
<nav aria-label="Project">
  <div class="dd-tabs__list">
    <a class="dd-tabs__tab" href="#" aria-current="page">Overview</a>
    <a class="dd-tabs__tab" href="#">Deploys <span class="dd-tabs__count">312</span></a>
    <a class="dd-tabs__tab" href="#">Analytics</a>
    <a class="dd-tabs__tab" href="#">Settings</a>
  </div>
</nav>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-tabs` | Wrapper: the list, then the panels. |
| `.dd-tabs__list` | The row of tabs (`role="tablist"`). Scrolls sideways when it overflows. |
| `.dd-tabs__tab` | A tab. Active with `aria-selected="true"`, `aria-current="page"` or `.is-active`. |
| `.dd-tabs__count` | Mono count pill inside a tab. |
| `.dd-tabs__dot` | Small primary dot inside a tab, to flag something new. |
| `.dd-tabs__panel` | A panel (`role="tabpanel"`). Hidden with the `hidden` attribute. |
| `.dd-tabs--sm` | Smaller tabs. On the wrapper, or on a lone `__list` of links. |
| `.dd-tabs--pill` | Secondary pill tabs, no baseline. On the wrapper, or on a lone `__list` of links. |
| `.dd-tabs--vertical` | List beside the panels; the current tab sits on a deeper tone. Wraps above the panels when narrow. |

## Behaviour

| class / attribute | what it does |
|---|---|
| `data-dd-tabs` | Wires the tabs inside: ids, `aria-controls`, `aria-labelledby`, roving `tabindex`. Panels pair with tabs by `aria-controls` or by order. Only the selected tab is a Tab stop; Tab from it moves into its panel. |
| `← → / ↑ ↓` | Automatic activation: move focus to the previous / next tab and select it in one step (↑ ↓ with `aria-orientation="vertical"`). Wraps around; disabled tabs are skipped. |
| `Home / End` | First / last enabled tab. |
| `dd:tabchange` | Bubbling event on the wrapper when the selection changes (not on load, not when the current tab is pressed again): `detail.tab`, `detail.panel`, `detail.previous`. |
| `dd.tabs.select(tab)` | Select a tab from script — an element or a selector. Fires `dd:tabchange`. |
| `dd.tabs.init()` | Wire tabs added to the page after load (a click or key on them also wires them). |

## Guidelines

Do:
- Use tabs for peers — views of one object, not steps in a flow.
- Keep labels to one or two words; put numbers in a count.
- Use links with `aria-current` when a tab changes the URL.

Don't:
- Don’t stack two rows of underline tabs; make the second row pills.
- Don’t hide primary actions inside a tab panel.
- Don’t use tabs for a single view.

