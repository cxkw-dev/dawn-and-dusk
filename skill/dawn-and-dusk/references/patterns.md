# dawn & dusk page patterns

Whole pages composed **only** from existing components: dashboard, data explorer, settings, landing, pricing. Use them
as recipes. For a component's exact markup and variants, read `components/<name>.md`.

Reading the skeletons:
- `[i:NAME]` = `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>`.
- `…` = more of the same, with real data. Skeletons show every part once; repeat rows, tiles and items.
- `app-*` classes are **page glue** (layout only). Name them after your project, never `dd-`. Glue may set `display`,
  grid columns, `gap`, `padding`, `max-width` and container queries — with tokens only (`calc(var(--dd-u) * N)`,
  `var(--dd-space-N)`, `var(--dd-surface)`). Never restyle a component from glue.

## Contents

- [Rules for every pattern](#rules-for-every-pattern) — one primary per view, tone not lines, mono numerals, status columns
- [The app shell](#the-app-shell-dashboard-explorer-settings) — side nav + top bar + content, shared by the app pages
- [1. Dashboard](#1-dashboard) · [2. Data explorer](#2-data-explorer-compass-style) · [3. Settings](#3-settings) · [4. Landing page](#4-landing-page-cxkwdev)
- [5. Pricing](#5-pricing) — plans, billing switch, comparison table, FAQ
- [Before you finish](#before-you-finish) — the checklist

## Rules for every pattern

1. **One primary action per view.** Exactly one `.dd-btn--primary` on screen: what the page is for (New deploy, Find,
   Save profile, Start a project). Everything else is `--secondary`, `--ghost` or `--link`. Row actions are ghost
   (`[i:more]` icon or a short word); never primary inside a table. Destructive = `.dd-btn--danger` behind a
   `.dd-dialog--danger`.
2. **Tonal hierarchy, not lines.** Page `--dd-bg` → surfaces `--dd-surface` → inset `--dd-surface-2` → pressed
   `--dd-surface-3`; hover and pressed fills you add yourself use `--dd-wash` / `--dd-wash-strong`. These components
   already are surfaces — **don't wrap them in a card**: `.dd-stat`, `.dd-chart`, `.dd-card`, `.dd-json-viewer`,
   `.dd-description-list--card`, `.dd-table`, `.dd-form__section--panel`.
   Dense tables and timelines sit on the page. No borders or card shadows; hairlines only in tables, form rows, dividers.
3. **Mono numerals.** Figures, IDs, hashes, timestamps, queries and sizes are DM Mono with tabular digits:
   `td.is-num` (right-aligned), `td.is-mono`, `.dd-mono`, `.dd-description-list__mono`, `.dd-page-header__title--mono`
   (an ID as a title), and `<b>` inside `.dd-stat__compare` / `.dd-page-header__meta`. Units go in `.dd-stat__unit` /
   `.dd-data-table__unit`, not in the figure.
4. **A status column.** Lists of things that can be healthy get a status column: `.dd-data-table__status` or
   `.dd-table__status` with `data-status="ok|warn|bad|info|muted"` — a dot **and** a word. In a `.dd-data-table`, mark a
   figure past its threshold with `td.is-warn` / `td.is-bad` (data table only; `.dd-table` has no such cell states);
   never colour a row. Summarise once in the page header
   (`.dd-page-header__status--warn|--bad`).
5. **Density by job.** Many rows → `.dd-data-table` (default) or `--compact` (explorers, split panels). ≤ 10 rows, no
   sorting → `.dd-table` (`--compact` in narrow columns). Forms are roomy. Marketing sections breathe (60–100px,
   `calc(var(--dd-u) * 12…20)`); cards and stat grids stay tight.
6. **Mobile is designed.** Under 768px of shell width `.dd-app-shell` sends the side nav off-canvas and shows the top
   bar's menu button. `.dd-stat-grid`, `.dd-card-grid`, `.dd-form__grid` reflow on their own; glue splits stack via
   container queries; wide tables scroll inside their own container with the first column frozen (`.is-frozen`);
   vertical tabs move above their panel; the top bar drops `__links`, `__context`, `__wide` under 640px. Check ~375px.
7. **Headings.** One lockup title per view (`.dd-page-header__title`, or `.dd-display` on a landing hero); section
   titles in the lockup too (`.dd-table-header__title`, `.dd-h2`); UI titles in sentence case (`.dd-form__title`,
   `.dd-chart__title`). Write headings lowercase on purpose.

## The app shell (dashboard, explorer, settings)

```html
<div class="dd-app-shell">                       <!-- 100dvh: chrome stays, only __content scrolls -->
  <nav class="dd-side-nav" id="app-nav" aria-label="Main">
    <div class="dd-side-nav__rail">
      <a class="dd-side-nav__logo dd-logo-tile" href="/" aria-label="Home">d&amp;</a>
      <button class="dd-side-nav__item is-active" type="button" aria-current="true" data-dd-nav-section="monitor" data-label="Monitor" aria-label="Monitor">[i:home]</button>
      <button class="dd-side-nav__item" type="button" data-dd-nav-section="projects" data-label="Projects" aria-label="Projects">[i:folder]</button>
      <span class="dd-side-nav__spacer"></span>
      <a class="dd-side-nav__item" href="/settings" data-label="Settings" aria-label="Settings">[i:settings]</a>
      <span class="dd-side-nav__sep"></span>
      <button class="dd-side-nav__item dd-side-nav__collapse" type="button" data-dd-nav-toggle aria-controls="app-nav-panel" aria-expanded="true" aria-label="Collapse navigation" data-label="Collapse">[i:chevron-left]</button>
    </div>
    <div class="dd-side-nav__panel" id="app-nav-panel">
      <div class="dd-side-nav__pane" data-dd-nav-pane="monitor">
        <div class="dd-side-nav__head"><span class="dd-side-nav__title">monitor</span><span class="dd-side-nav__count">5</span></div>
        <p class="dd-side-nav__section">Monitor</p>
        <a class="dd-side-nav__link" href="/" aria-current="page">[i:grid]<span class="dd-side-nav__label">Overview</span></a>
        <a class="dd-side-nav__link" href="/alerts">[i:bell]<span class="dd-side-nav__label">Alerts</span><span class="dd-side-nav__badge dd-side-nav__badge--solid">2</span></a>
        <p class="dd-side-nav__section">Regions</p>
        <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__dot dd-side-nav__dot--warn"></span><span class="dd-side-nav__label">us-east-1</span><span class="dd-side-nav__count">4</span></a>
      </div>
      <div class="dd-side-nav__pane" data-dd-nav-pane="projects" hidden>…</div>
    </div>
  </nav>
  <div class="dd-app-shell__main">
    <header class="dd-top-bar">
      <button class="dd-btn dd-btn--ghost dd-btn--icon dd-top-bar__nav-btn" type="button" data-dd-nav-open="#app-nav" aria-controls="app-nav" aria-expanded="false" aria-label="Open navigation">[i:menu]</button>
      <a class="dd-top-bar__brand dd-top-bar__narrow" href="/"><span class="dd-logo dd-logo--sm">dawn &amp; dusk</span></a>
      <div class="dd-top-bar__context">
        <button class="dd-top-bar__switch" type="button"><span class="dd-top-bar__mark">cx</span><span>cxkw</span></button>
        <span class="dd-faint">/</span>
        <button class="dd-top-bar__switch" type="button"><span>production</span>[i:sort]</button>
      </div>
      <button class="dd-top-bar__search" type="button" aria-label="Search">[i:search]<span>Search or jump to…</span><kbd class="dd-top-bar__kbd">⌘K</kbd></button>
      <div class="dd-top-bar__actions">
        <button class="dd-btn dd-btn--ghost dd-btn--icon dd-top-bar__icon-btn" type="button" aria-label="Notifications, 3 new">[i:bell]<span class="dd-top-bar__dot"></span></button>
        <details class="dd-top-bar__user" data-dd-autoclose>
          <summary aria-label="Account menu"><span class="dd-top-bar__avatar">cx</span></summary>
          <div class="dd-top-bar__menu">
            <div class="dd-top-bar__menu-head"><b>cxkw</b><span>hello@cxkw.dev</span></div>
            <div class="dd-top-bar__menu-sep"></div>
            <button class="dd-top-bar__menu-item" type="button" data-dd-theme-toggle>[i:moon]Toggle dusk</button>
            <a class="dd-top-bar__menu-item" href="/logout">[i:logout]Sign out</a>
          </div>
        </details>
      </div>
    </header>
    <main class="dd-app-shell__content">
      <div class="dd-app-shell__page"><!-- the pattern's page --></div>
    </main>
  </div>
</div>
```

- Rail = sections; panel = the section's pages. `data-dd-nav-section` buttons switch panes; plain rail links navigate.
- A small app with only a handful of pages and no sections can use the rail alone, with every page a rail link
  (`aria-current="page"` on the current one, its label in a tooltip), as the Settings pattern does. Or use one rail
  section whose panel lists the pages. Don't invent a third shape.
  `.is-collapsed` on the nav (+ `aria-expanded="false"` on the chevron) starts it folded; a nav with an `id`
  remembers the reader's choice. The top-bar logo is `__narrow`: it shows only while the nav is off-canvas.

## 1. Dashboard


**Structure** — inside `.dd-app-shell__page`, most urgent first:
1. `.dd-page-header`: mono eyebrow (the environment), lockup title, a ghost link + the one **primary**, a meta row
   whose status dot summarises the services (`--bad` if anything is down, `--warn` if only degraded).
2. `.dd-alert--bad` / `--warn` only while something needs a person. Nothing wrong → nothing here.
3. `.dd-stat-grid--joined`: four KPI tiles (label, value, sparkline, delta + named comparison).
4. Glue split: **traffic** (`.dd-table-header` with a `.dd-segmented--sm` range, then a `.dd-chart` line chart by
   region with a "View as table" `<details>`) beside **activity** (`.dd-table-header` + `.dd-timeline`). Side by side
   from 760px of page width (2 : 1), stacked below.
5. **services**: `.dd-table-header` + `.dd-data-table` — search, Region menu, status chips, count, Export, bulk bar,
   sortable figures, status column, a ghost ⋯ per row opening one shared `.dd-menu`.
6. Floating layers after the shell (never inside the top bar): the environment `.dd-menu`, the alerts `.dd-menu`, and
   the ⌘K `<dialog class="dd-command">` the top bar's search opens.

```html
<div class="dd-app-shell__page app-dash">
  <header class="dd-page-header">
    <div class="dd-page-header__row">
      <div class="dd-page-header__titles">
        <p class="dd-page-header__eyebrow">production</p>
        <h1 class="dd-page-header__title">overview</h1>
      </div>
      <div class="dd-page-header__actions">
        <a class="dd-btn dd-btn--ghost" href="https://status.example.com">[i:external]<span>Status page</span></a>
        <button class="dd-btn dd-btn--primary" type="button">[i:upload]<span>New deploy</span></button>
      </div>
    </div>
    <ul class="dd-page-header__meta">
      <li><span class="dd-page-header__status dd-page-header__status--bad"></span>1 down · 2 degraded</li>
      <li>[i:globe]<b>3 regions</b></li>
      <li>[i:clock]Last deploy <b>4m ago</b></li>
    </ul>
  </header>

  <div class="dd-alert dd-alert--bad">
    [i:danger]
    <div class="dd-alert__body">
      <p class="dd-alert__title">notify-fanout is down in eu-west-2</p>
      <p class="dd-alert__text">Health checks have failed since 09:39 with <code>ECONNREFUSED</code>. Deploy emails are queued, not lost.</p>
    </div>
    <div class="dd-alert__actions">
      <button class="dd-alert__action" type="button">Open incident</button>
      <button class="dd-alert__action dd-alert__action--secondary" type="button">View logs</button>
    </div>
  </div>

  <div class="dd-stat-grid dd-stat-grid--joined app-dash__kpis">
    <div class="dd-stat">
      <p class="dd-stat__label">Requests / min</p>
      <div class="dd-stat__main">
        <p class="dd-stat__value">115.5K</p>
        <svg class="dd-stat__spark" viewBox="0 0 100 32" aria-hidden="true"><path class="dd-stat__spark-area" d="M0 … L100 32 L0 32 Z"/><path class="dd-stat__spark-line" d="M0 …"/><circle class="dd-stat__spark-dot" cx="100" cy="5" r="3"/></svg>
      </div>
      <div class="dd-stat__foot"><span class="dd-stat__delta dd-stat__delta--ok">[i:arrow-up]<span class="dd-visually-hidden">Up</span>8.2%</span><span class="dd-stat__compare">vs <b>106.7K</b> last week</span></div>
    </div>
    …  <!-- p95 latency (142<span class="dd-stat__unit">ms</span>, up = --bad), error rate, deploys today (--flat, [i:minus]) -->
  </div>

  <div class="app-dash__split">
    <section aria-labelledby="dash-traffic">
      <header class="dd-table-header">
        <h2 class="dd-table-header__title" id="dash-traffic">traffic</h2>
        <div class="dd-segmented dd-segmented--sm app-dash__range" data-dd-segmented role="radiogroup" aria-label="Time range">
          <button class="dd-segmented__item" type="button" role="radio" aria-checked="true" data-value="12h">12h</button>
          <button class="dd-segmented__item" type="button" role="radio" aria-checked="false" tabindex="-1" data-value="24h">24h</button>
          <button class="dd-segmented__item" type="button" role="radio" aria-checked="false" tabindex="-1" data-value="7d">7d</button>
        </div>
      </header>
      <figure class="dd-chart" data-dd-chart>
        <figcaption class="dd-chart__head">
          <div><p class="dd-chart__title">Requests / min by region</p><p class="dd-chart__sub">Last 12 hours · hourly</p></div>
          <ul class="dd-chart__legend"><li class="dd-chart__key dd-chart__key--line dd-chart-s1">us-east-1</li>…</ul>
        </figcaption>
        <div class="dd-chart__frame">
          <div class="dd-chart__y" aria-hidden="true"><span>80K</span><span>60K</span><span>40K</span><span>20K</span><span>0</span></div>
          <div class="dd-chart__plot" style="--dd-chart-ticks:4" role="group" aria-label="Requests per minute by region over the last 12 hours">
            <svg class="dd-chart__svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <path class="dd-chart__line dd-chart-s1" d="M0 34.5 L9.1 40.1 …"/>…
            </svg>
            <span class="dd-chart__marker dd-chart-s1" style="--x:100; --y:17.6"></span>…
            <div class="dd-chart__hits" style="--dd-chart-points:12">
              <div class="dd-chart__hit" style="--x:0" tabindex="0" role="img" aria-label="Thu 22:00: us-east-1 52.4K, eu-west-2 9.8K, ap-south-1 22.1K">
                <span class="dd-chart__dot dd-chart-s1" style="--y:34.5"></span>…
                <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">Thu 22:00</p><p class="dd-chart__tip-row dd-chart-s1">us-east-1<b>52.4K</b></p>…</div>
              </div>
              …  <!-- one hit per point; add .is-flip to the last ~40% -->
            </div>
          </div>
          <div class="dd-chart__x dd-chart__x--points" aria-hidden="true"><span>22:00</span><span class="is-minor">23:00</span>…</div>
        </div>
        <details class="dd-chart__data"><summary>View as table</summary><div class="dd-chart__data-scroll"><table>…</table></div></details>
      </figure>
    </section>
    <section aria-labelledby="dash-activity">
      <header class="dd-table-header">
        <h2 class="dd-table-header__title" id="dash-activity">activity</h2>
        <a class="dd-table-header__action" href="/audit">Audit log [i:arrow-right]</a>
      </header>
      <div class="dd-timeline">
        <section class="dd-timeline__group">
          <h3 class="dd-timeline__day">Today <time class="dd-timeline__date" datetime="2026-10-30">Oct 30</time></h3>
          <ol class="dd-timeline__list">
            <li class="dd-timeline__item">
              <span class="dd-timeline__marker dd-timeline__marker--avatar" style="--dd-color: var(--dd-set-1)" role="img" aria-label="Andy">AN</span>
              <div class="dd-timeline__body"><p class="dd-timeline__text"><b>Andy</b> deployed <a href="#">auth-gateway</a></p><time class="dd-timeline__time" datetime="2026-10-30T09:41">09:41</time></div>
            </li>
            <li class="dd-timeline__item">
              <span class="dd-timeline__marker dd-timeline__marker--bad">[i:danger]</span>
              <div class="dd-timeline__body"><p class="dd-timeline__text"><b>notify-fanout</b> went down in eu-west-2</p><time class="dd-timeline__time" datetime="2026-10-30T09:39">09:39</time></div>
            </li>
            …
          </ol>
        </section>
      </div>
    </section>
  </div>

  <section aria-labelledby="dash-services">
    <header class="dd-table-header">
      <h2 class="dd-table-header__title" id="dash-services">services</h2>
      <a class="dd-table-header__action" href="/services">All services [i:arrow-right]</a>
    </header>
    <div class="dd-data-table" data-dd-data-table>
      <div class="dd-data-table__toolbar">
        <label class="dd-data-table__search">[i:search]<input type="search" placeholder="Filter services…" aria-label="Filter services" data-dd-data-table-search></label>
        <details class="dd-data-table__menu dd-data-table__menu--start">
          <summary class="dd-data-table__chip"><span>Region</span> <b data-dd-data-table-filter-label="region">all</b>[i:chevron-down]</summary>
          <div class="dd-data-table__menu-panel">
            <p class="dd-data-table__menu-title">Region</p>
            <label><input class="dd-data-table__check" type="checkbox" data-dd-data-table-filter="region=us-east-1"> us-east-1</label>…
          </div>
        </details>
        <button class="dd-data-table__chip" type="button" aria-pressed="false" data-dd-data-table-filter="status=warn"><span class="dd-data-table__chip-dot" style="--_c: var(--dd-warn)"></span>Degraded</button>
        <button class="dd-data-table__chip" type="button" aria-pressed="false" data-dd-data-table-filter="status=bad"><span class="dd-data-table__chip-dot" style="--_c: var(--dd-bad)"></span>Down</button>
        <div class="dd-data-table__tools">
          <span class="dd-data-table__count" data-dd-data-table-count="services">10 services</span>
          <button class="dd-btn dd-btn--ghost dd-btn--sm" type="button">[i:download]<span>Export</span></button>
        </div>
      </div>
      <div class="dd-data-table__bulk" role="region" aria-label="Bulk actions" hidden>
        <span class="dd-data-table__bulk-count"><span data-dd-data-table-selected>0</span> selected</span>
        <button class="dd-btn dd-btn--sm" type="button">[i:refresh]<span>Restart</span></button>
        <button class="dd-btn dd-btn--sm dd-data-table__bulk-end" type="button" data-dd-data-table-clear>Clear</button>
      </div>
      <div class="dd-data-table__scroll" tabindex="0" role="region" aria-label="Services">
        <table class="dd-data-table__table">
          <thead><tr>
            <th class="dd-data-table__select"><input class="dd-data-table__check" type="checkbox" aria-label="Select all services"></th>
            <th class="is-frozen" data-col="service" aria-sort="none"><button class="dd-data-table__sort" type="button">Service[i:chevron-down]</button></th>
            <th data-col="status" aria-sort="none">…</th><th data-col="region" aria-sort="none">…</th><th data-col="version">Version</th>
            <th class="is-num" data-col="req" aria-sort="none"><button class="dd-data-table__sort" type="button">Req / min[i:chevron-down]</button></th>
            …  <!-- Errors, p95, CPU, Updated: all .is-num -->
            <th class="is-actions"><span class="dd-visually-hidden">Actions</span></th>
          </tr></thead>
          <tbody>
            <tr>
              <td class="dd-data-table__select"><input class="dd-data-table__check" type="checkbox" aria-label="Select search-indexer"></td>
              <td class="is-frozen" data-col="service"><a href="#">search-indexer</a></td>
              <td data-col="status" data-value="warn"><span class="dd-data-table__status" data-status="warn">Degraded</span></td>
              <td data-col="region">us-east-1</td>
              <td class="is-mono is-muted" data-col="version">v0.9.12</td>
              <td class="is-num">8,904</td>
              <td class="is-num is-warn">1.84%</td>
              <td class="is-num is-warn" data-value="611">611<span class="dd-data-table__unit">ms</span></td>
              …
              <td class="is-actions"><button class="dd-btn dd-btn--ghost dd-btn--sm dd-btn--icon" type="button" aria-label="Actions for search-indexer" data-dd-menu="dash-row-menu" data-dd-placement="bottom-end" aria-haspopup="menu" aria-controls="dash-row-menu" aria-expanded="false">[i:more]</button></td>
            </tr>
            …
            <tr class="dd-data-table__empty-row" hidden><td colspan="11">…</td></tr>   <!-- copy from data-table.md -->
          </tbody>
        </table>
      </div>
      <div class="dd-menu" id="dash-row-menu" role="menu" aria-label="Service actions" hidden>
        <button class="dd-menu__item" role="menuitem" type="button"><svg class="dd-icon dd-menu__icon" aria-hidden="true"><use href="#dd-i-terminal"/></svg><span class="dd-menu__body">View logs</span></button>…
      </div>
    </div>
  </section>
</div>
```

The top bar wiring and the layers that sit **after** `</div><!-- .dd-app-shell -->`:

```html
<!-- in .dd-top-bar -->
<button class="dd-top-bar__switch" type="button" data-dd-menu="dash-env-menu" aria-haspopup="menu" aria-expanded="false" aria-controls="dash-env-menu"><span>production</span>[i:sort]</button>
<button class="dd-top-bar__search" type="button" aria-label="Search" data-dd-command="dash-cmd">[i:search]<span>Search or jump to…</span><kbd class="dd-top-bar__kbd">⌘K</kbd></button>
<button class="dd-btn dd-btn--ghost dd-btn--icon dd-top-bar__icon-btn" type="button" aria-label="Alerts, 3 open" data-dd-menu="dash-alerts-menu" data-dd-placement="bottom-end" aria-haspopup="menu" aria-expanded="false" aria-controls="dash-alerts-menu">[i:bell]<span class="dd-top-bar__dot"></span></button>

<!-- after the shell -->
<div class="dd-menu" id="dash-env-menu" role="menu" aria-label="Environment" hidden>
  <div class="dd-menu__group" role="group" aria-labelledby="dash-env-label">
    <p class="dd-menu__label" id="dash-env-label">Environment</p>
    <button class="dd-menu__item" role="menuitemradio" type="button" aria-checked="true"><span class="dd-menu__body">production<span class="dd-menu__desc">10 services · 3 regions</span></span><svg class="dd-icon dd-menu__check" aria-hidden="true"><use href="#dd-i-check"/></svg></button>
    …
  </div>
</div>
<div class="dd-menu" id="dash-alerts-menu" role="menu" aria-label="Open alerts" hidden>
  <div class="dd-menu__header"><span>3 open alerts</span><span>production · oldest 09:22</span></div>
  <button class="dd-menu__item" role="menuitem" type="button" data-service="notify-fanout"><svg class="dd-icon dd-menu__icon" aria-hidden="true"><use href="#dd-i-danger"/></svg><span class="dd-menu__body">notify-fanout is down<span class="dd-menu__desc">eu-west-2 · since 09:39</span></span></button>
  …
</div>
<dialog class="dd-command" id="dash-cmd" aria-label="Command palette" data-dd-hotkey>…</dialog>   <!-- groups: Needs attention, Services, Commands; copy from command-palette.md -->
```

```css
html:has(.app-dash) { scrollbar-gutter: auto; }          /* the shell is the viewport; nothing else scrolls */
.app-dash { container: app-dash / inline-size; }
.app-dash__kpis { --dd-stat-min: 40%; }                     /* 2 × 2 … */
@container app-dash (min-width: 720px) { .app-dash__kpis { --dd-stat-min: 20%; } }            /* … then 4; never 3 + 1 */
@container app-dash (max-width: 479px) { .app-dash__kpis .dd-stat__spark { display: none; } }  /* phones: figures only */
.app-dash__split { display: grid; gap: calc(var(--dd-u) * 10); align-items: start; }
.app-dash__split .dd-chart { --dd-chart-height: 240px; }
.app-dash__split .dd-table-header { min-height: calc(var(--dd-u) * 6); align-items: center; }  /* both columns start level */
.app-dash__range { margin-left: auto; }
@container app-dash (min-width: 760px) {
  .app-dash__split { grid-template-columns: minmax(0, 2fr) minmax(0, 1fr); gap: calc(var(--dd-u) * 8); }
}
```

**Key rules**
- One primary (New deploy) in the header. The alert's actions are its own dotted links; table rows get a ghost ⋯ that
  opens one shared row menu — remember which row opened it to know what an item acts on. Bulk actions are plain buttons.
- No breadcrumbs: the top bar's context already says `cxkw / production`. The eyebrow repeats the environment so it
  survives on phones, where the context steps out.
- Four KPIs at most, joined into one surface; 2 × 2 then 4, never 3 + 1. Colour a delta by what the change means
  (latency up = `--bad`), never by its sign; always name the period ("vs 106.7K last week").
- Make the numbers agree: the KPI's figure, the chart's last point and the table should add up (115.5K = the three
  regions = the sum of the services' req / min).
- Chart: ≤ 3 series in `dd-chart-s1…` order, a range control in the section header (apply at once, no Save), and a
  table view. The chart's last point and the KPI agree.
- The two split columns start on the same line (both have a `.dd-table-header`) and end close together: size the chart
  (`--dd-chart-height`) and keep feed items to one line at desktop widths.
- Status: a dot and a word in the table; `td.is-warn` on the figure past its threshold; never colour a row.
- Search opens the ⌘K palette (`data-dd-command` + `data-dd-hotkey` on the dialog); the bell lists open alerts as a
  menu; both jump to a service. Listen for `dd:command` / item clicks — don't re-implement the palette or menus.
- Put floating menus and the palette after the shell, not inside the top bar (its backdrop-filter would trap
  `position: fixed`).
- Mobile: nav off-canvas, KPIs 2 × 2 without sparklines, chart and activity stack, the table scrolls in its own box
  with Service frozen.

**In the app shell:** the pane head is the section's name (`monitor`), short enough never to truncate. When the top bar
has a notifications bell, don't repeat it in the rail.

## 2. Data explorer (Compass-style)

**Structure:**
1. App shell with the nav **folded** (`.dd-side-nav.is-collapsed`) so the data gets the room. Its panel is the
   collections tree: databases as `<details class="dd-side-nav__group">`, collections as `__sub` links with counts.
2. `.dd-page-header`: breadcrumbs (cluster / db / collection), the collection as title, size facts in mono meta, and
   a **real tab list** (Documents · Indexes · Logs). `data-dd-tabs` goes on the page wrapper so header tabs and
   panels share one root; tabs point at panels with `aria-controls`.
3. Documents: query bar (glue row) — mono `.dd-input` filter + **primary Find**; then neutral `.dd-chip--filter`
   status chips and a `.dd-segmented` view switch pushed right.
4. Glue split: `.dd-data-table--compact` (frozen `_id`, open row `.is-selected`, footer with page size + compact
   pagination) | `<aside>`: `.dd-page-header--sm` (eyebrow, mono ID title, ghost icon actions, meta),
   `.dd-description-list--card --compact` and `.dd-json-viewer`. Side by side from ~680px, stacked below.
5. Indexes: `.dd-table.dd-table--mono`. Logs: `.dd-log-viewer` (search, level toggles, count; add `__live` and the `--wrap` toggle as needed).

```html
<!-- in the nav pane (nav: class="dd-side-nav is-collapsed", chevron aria-expanded="false") -->
<p class="dd-side-nav__section">Databases</p>
<details class="dd-side-nav__group" open>
  <summary class="dd-side-nav__link">[i:database]<span class="dd-side-nav__label">deploys</span><span class="dd-side-nav__chev">[i:chevron-down]</span></summary>
  <div class="dd-side-nav__sub">
    <a class="dd-side-nav__link" href="#" aria-current="page"><span class="dd-side-nav__label">deployments</span><span class="dd-side-nav__count">48.2K</span></a>
    …
  </div>
</details>
<div class="dd-app-shell__page app-explorer" data-dd-tabs>
  <header class="dd-page-header">
    <nav class="dd-breadcrumbs dd-breadcrumbs--sm" aria-label="Breadcrumb"><ol class="dd-breadcrumbs__list">… cxkw-prod / deploys / deployments …</ol></nav>
    <div class="dd-page-header__row">
      <div class="dd-page-header__titles"><h1 class="dd-page-header__title">deployments</h1></div>
      <div class="dd-page-header__actions">
        <button class="dd-btn dd-btn--ghost" type="button">[i:download]<span>Export</span></button>
        <button class="dd-btn dd-btn--secondary" type="button">[i:plus]<span>Insert document</span></button>
      </div>
    </div>
    <ul class="dd-page-header__meta"><li>[i:file]<b>48,214</b> documents</li><li>[i:database]<b>61.2 MB</b></li><li>[i:layers]<b>4</b> indexes</li></ul>
    <div class="dd-tabs__list" role="tablist" aria-label="Collection">
      <button class="dd-tabs__tab" role="tab" type="button" aria-selected="true" aria-controls="docs"><span>Documents</span><span class="dd-tabs__count">48.2K</span></button>
      <button class="dd-tabs__tab" role="tab" type="button" aria-controls="indexes"><span>Indexes</span><span class="dd-tabs__count">4</span></button>
      <button class="dd-tabs__tab" role="tab" type="button" aria-controls="logs"><span>Logs</span></button>
    </div>
  </header>
  <div class="dd-tabs__panel dd-stack" role="tabpanel" id="docs" style="--dd-gap: calc(var(--dd-u) * 4)">
    <div class="app-query">
      <div class="dd-input">
        <span class="dd-input__affix">[i:filter]</span>
        <input class="dd-input__control dd-mono" type="search" aria-label="Query filter" value='{ env: "production" }'>
        <span class="dd-input__affix"><button class="dd-input__btn" type="button" data-dd-clear aria-label="Clear filter">[i:x]</button></span>
      </div>
      <button class="dd-btn dd-btn--primary" type="button">[i:search]<span>Find</span></button>
    </div>
    <div class="app-query">
      <div class="dd-chip-group" role="group" aria-label="Status">
        <button class="dd-chip dd-chip--filter" type="button" aria-pressed="true"><span class="dd-chip__check">[i:check]</span><span>Ready</span></button>
        …
      </div>
      <div class="dd-segmented dd-segmented--sm" data-dd-segmented role="radiogroup" aria-label="View">
        <button class="dd-segmented__item" role="radio" aria-checked="true">[i:list]<span>Table</span></button>
        <button class="dd-segmented__item" role="radio" aria-checked="false">[i:code]<span>JSON</span></button>
      </div>
    </div>
    <div class="app-split">
      <div class="dd-data-table dd-data-table--compact" data-dd-data-table style="--dd-data-table-height: 560px">
        <div class="dd-data-table__scroll" tabindex="0" role="region" aria-label="Documents">
          <table class="dd-data-table__table">
            <thead><tr>
              <th class="is-frozen">_id</th>
              <th data-col="service" aria-sort="none"><button class="dd-data-table__sort" type="button">service[i:chevron-down]</button></th>
              <th data-col="status" aria-sort="none"><button class="dd-data-table__sort" type="button">status[i:chevron-down]</button></th>
              <th class="is-num" data-col="at" aria-sort="none"><button class="dd-data-table__sort" type="button">createdAt[i:chevron-down]</button></th>
            </tr></thead>
            <tbody>
              <tr class="is-selected">
                <td class="is-frozen is-mono"><a href="#" aria-current="true">dpl_7Hq2xK9m</a></td><td>auth-gateway</td>
                <td data-col="status" data-value="ok"><span class="dd-data-table__status" data-status="ok">Ready</span></td><td class="is-num is-muted">09:41:07</td>
              </tr>
              …
            </tbody>
          </table>
        </div>
        <div class="dd-data-table__footer">
          <label class="dd-pagination__size">Per page <span class="dd-pagination__select"><select aria-label="Per page"><option>20</option><option>50</option></select>[i:chevron-down]</span></label>
          <nav class="dd-pagination dd-pagination--compact" aria-label="Pagination">
            <span class="dd-pagination__range"><b>1–20</b> of 48,214</span>
            <button class="dd-pagination__step" type="button" aria-label="Previous page" disabled>[i:chevron-left]</button>
            <button class="dd-pagination__step" type="button" aria-label="Next page">[i:chevron-right]</button>
          </nav>
        </div>
      </div>
      <aside class="app-detail" aria-labelledby="doc-title">
        <header class="dd-page-header dd-page-header--sm">
          <div class="dd-page-header__row">
            <div class="dd-page-header__titles"><p class="dd-page-header__eyebrow">Document · 1 of 48,214</p><h2 class="dd-page-header__title dd-page-header__title--mono" id="doc-title">dpl_7Hq2xK9m</h2></div>
            <div class="dd-page-header__actions">
              <button class="dd-btn dd-btn--ghost dd-btn--icon dd-btn--sm" type="button" data-dd-copy="dpl_7Hq2xK9m" data-dd-tooltip="Copy _id" aria-label="Copy _id">[i:copy]</button>
              <button class="dd-btn dd-btn--ghost dd-btn--icon dd-btn--sm" type="button" aria-label="Close document">[i:x]</button>
            </div>
          </div>
          <ul class="dd-page-header__meta"><li><span class="dd-page-header__status"></span>Ready</li><li>[i:clock]Updated <b>09:41:07</b></li></ul>
        </header>
        <dl class="dd-description-list dd-description-list--card dd-description-list--compact">
          <div class="dd-description-list__item"><dt class="dd-description-list__term">Commit</dt>
            <dd class="dd-description-list__details"><span class="dd-description-list__mono">9f2c41e</span><span class="dd-description-list__muted">Cache JWKS</span><button class="dd-description-list__copy" type="button" data-dd-copy="9f2c41e" aria-label="Copy SHA">[i:copy][i:check]</button></dd></div>
          …
        </dl>
        <div class="dd-json-viewer" data-dd-json-viewer data-depth="1" aria-label="Document dpl_7Hq2xK9m" style="--dd-json-viewer-height: 360px">
          <script type="application/json">{ "_id": "dpl_7Hq2xK9m", "service": "auth-gateway", … }</script>
        </div>
      </aside>
    </div>
  </div>
  <div class="dd-tabs__panel" role="tabpanel" id="indexes" hidden><div class="dd-table dd-table--mono"><table>… Name · Keys · Type · Size · Ops / day …</table></div></div>
  <div class="dd-tabs__panel" role="tabpanel" id="logs" hidden>
    <div class="dd-log-viewer" data-dd-log-viewer style="--dd-log-viewer-height: 420px">
      <div class="dd-log-viewer__bar">
        <label class="dd-log-viewer__search">[i:search]<input type="search" placeholder="Search logs" aria-label="Search logs" data-dd-log-viewer-search></label>
        <div class="dd-log-viewer__levels" role="group" aria-label="Levels"><button class="dd-log-viewer__toggle" type="button" data-dd-log-viewer-level="warn" aria-pressed="true">Warn <span class="dd-log-viewer__n">2</span></button>…</div>
        <span class="dd-log-viewer__count" data-dd-log-viewer-count aria-live="polite">10 lines</span>
      </div>
      <div class="dd-log-viewer__scroll" tabindex="0" role="region" aria-label="Logs">
        <ol class="dd-log-viewer__lines" role="log">
          <li class="dd-log-viewer__line" data-level="warn"><time class="dd-log-viewer__time">09:40:55.640</time><span class="dd-log-viewer__level">warn</span><span class="dd-log-viewer__src">mongod</span><span class="dd-log-viewer__msg">slow query <span class="dd-log-viewer__dim">COLLSCAN 412ms</span></span></li>
          …
        </ol>
      </div>
    </div>
  </div>
</div>
```
```css
.app-explorer { container: app-explorer / inline-size; }
.app-query { display: flex; flex-wrap: wrap; align-items: center; gap: calc(var(--dd-u) * 2); }
.app-query > .dd-input { flex: 1 1 10rem; min-width: 0; }   /* Find stays beside the query on a phone */
.app-query > .dd-segmented { margin-left: auto; }
.app-split { display: grid; grid-template-columns: minmax(0, 1fr); gap: calc(var(--dd-u) * 6); align-items: start; }
.app-detail { display: flex; flex-direction: column; gap: calc(var(--dd-u) * 4); min-width: 0; }
@container app-explorer (min-width: 680px) { .app-split { grid-template-columns: minmax(0, 3fr) minmax(280px, 2fr); } }
```

**Key rules**
- Find is the one primary; Export is ghost, Insert document secondary; detail actions are ghost icons with tooltips.
- Keep the table to 4–6 columns that identify a row (`_id`, name, **status**, a timestamp); the rest lives in the
  detail. `_id` frozen and mono; times right-aligned and mono.
- The open row is `.is-selected` (+ `aria-current` on its link) so table and panel read as one. Show details in the
  side panel, not a modal — the table is the context. Use a `.dd-drawer` only where the page is too narrow to split.
- Lead the detail with 4–6 facts, then the raw JSON. Both are surfaces already; cap the JSON with
  `--dd-json-viewer-height` so the facts stay in view.
- Pagination always says the range and the total ("1–20 of 48,214"). Status chips are neutral (status ≠ category).
- Mobile: the query input takes its own line, chips and view switch wrap under it, the split stacks (table, then
  document), the tab list scrolls sideways.

## 3. Settings


**Structure:**
1. App shell; the side nav is just its rail (no panel) with Settings `aria-current="page"`. The page carries its own
   section nav (vertical tabs), so there is never a second side nav in the content.
2. Top bar: workspace switch, a `.dd-top-bar__search` "Search settings…" that opens a `dialog.dd-command`
   (`data-dd-command`, ⌘K via `data-dd-hotkey`) listing the sections and a few actions, and the avatar menu.
3. `.dd-page-header`: title + one-line description, **no actions** (each section owns its own).
4. `.dd-tabs.dd-tabs--vertical[data-dd-tabs]`: a `role="tablist"` with `aria-orientation="vertical"`; one
   `.dd-tabs__panel` per section. Real tabs keep the selected state right and give ↑ ↓ / Home / End. Give the tabs ids
   so search and deep links can call `dd.tabs.select('#id')`.
5. **Profile** — the only form: `<form class="dd-form" data-dd-validate novalidate>`: avatar + compact dropzone, tucked
   fields in `.dd-form__grid` (`required` + `data-dd-error-*` messages), a textarea with a counter, and a footer
   (`.dd-form__meta` save state, ghost Discard, **the page's only primary: Save profile**).
6. **Notifications** — switches only (`.dd-switch--end` with descriptions in `.dd-form__choices--rows`), each applying at
   once. No checkboxes, no footer, no Save. Two sections in a `.dd-form--divided`: what (events) and where (channels).
7. **API keys** — head with its one action beside it (secondary Create key → a form dialog, `method="dialog"` +
   `data-dd-validate`), the just-created key in a masked `.dd-code-field` (reveal + copy, "shown once"), then a
   `.dd-table--compact` of keys: name, last four, scope, last used, status, ghost Revoke.
8. **Danger zone** — a `.dd-form__section--panel` with the explanation on the left and ghost Export + `.dd-btn--danger`
   on the right; Delete opens a `.dd-dialog--danger` alertdialog with the safe choice autofocused.

```html
<div class="dd-app-shell">
  <nav class="dd-side-nav" id="app-nav" aria-label="Main">
    <div class="dd-side-nav__rail">
      <a class="dd-side-nav__logo dd-logo-tile" href="/" aria-label="Home">d&amp;</a>
      <a class="dd-side-nav__item" href="/" data-label="Overview" aria-label="Overview">[i:home]</a>
      …
      <span class="dd-side-nav__spacer"></span>
      <a class="dd-side-nav__item" href="/settings" data-label="Settings" aria-label="Settings" aria-current="page">[i:settings]</a>
    </div>
  </nav>
  <div class="dd-app-shell__main">
    <header class="dd-top-bar">
      <!-- nav button, narrow logo, context: as in The app shell -->
      <button class="dd-top-bar__search" type="button" data-dd-command="app-search" aria-label="Search settings">[i:search]<span>Search settings…</span><kbd class="dd-top-bar__kbd">⌘K</kbd></button>
      <div class="dd-top-bar__actions"><!-- avatar menu --></div>
    </header>
    <main class="dd-app-shell__content">
      <div class="dd-app-shell__page app-settings">
        <header class="dd-page-header"><div class="dd-page-header__row"><div class="dd-page-header__titles">
          <h1 class="dd-page-header__title">settings</h1>
          <p class="dd-page-header__desc">Your profile, how cxkw.dev reaches you, and the keys that act on your behalf.</p>
        </div></div></header>

        <div class="dd-tabs dd-tabs--vertical" data-dd-tabs>
          <div class="dd-tabs__list" role="tablist" aria-label="Settings" aria-orientation="vertical">
            <button class="dd-tabs__tab" id="tab-profile" role="tab" type="button" aria-selected="true" aria-controls="profile">[i:user]<span>Profile</span></button>
            <button class="dd-tabs__tab" id="tab-notifications" role="tab" type="button" aria-controls="notifications">[i:bell]<span>Notifications</span></button>
            <button class="dd-tabs__tab" id="tab-keys" role="tab" type="button" aria-controls="keys">[i:key]<span>API keys</span><span class="dd-tabs__count">4</span></button>
            <button class="dd-tabs__tab" id="tab-danger" role="tab" type="button" aria-controls="danger">[i:danger]<span>Danger zone</span></button>
          </div>

          <div class="dd-tabs__panel" role="tabpanel" id="profile">
            <form class="dd-form" data-dd-validate novalidate aria-labelledby="profile-title">
              <section class="dd-form__section">
                <div class="dd-form__head"><h2 class="dd-form__title" id="profile-title">Profile</h2><p class="dd-form__desc">Shown on deploys, comments and the audit log.</p></div>
                <div class="app-settings__avatar">
                  <span class="dd-avatar dd-avatar--xl dd-avatar--set-1" role="img" aria-label="Andy Nguyen">AN</span>
                  <label class="dd-dropzone dd-dropzone--compact" data-dd-dropzone>
                    <input type="file" name="avatar" accept="image/png, image/jpeg" aria-label="Upload a new photo"><span class="dd-dropzone__icon">[i:upload]</span>
                    <span class="dd-dropzone__text"><span class="dd-dropzone__title">Drop a photo or <span class="dd-dropzone__browse">browse</span></span><span class="dd-dropzone__meta">Square PNG or JPG, 256 px or larger</span></span>
                  </label>
                </div>
                <div class="dd-form__grid">
                  <div class="dd-field"><label class="dd-field__label" for="name">Name</label><div class="dd-input"><input class="dd-input__control" id="name" name="name" value="Andy Nguyen" required data-dd-error-missing="Add the name people see on your deploys."></div></div>
                  <div class="dd-field"><label class="dd-field__label" for="user">Username</label><div class="dd-input"><span class="dd-input__unit dd-input__prefix">cxkw.dev/</span><input class="dd-input__control" id="user" name="username" value="andy" required pattern="[a-z0-9](-?[a-z0-9])*" data-dd-error="Use lowercase letters, numbers and single dashes."></div></div>
                  <div class="dd-field"><label class="dd-field__label" for="email">Email</label><div class="dd-input"><input class="dd-input__control" id="email" name="email" type="email" value="andy@cxkw.dev" required data-dd-error-type="That doesn’t look like an email address."></div><p class="dd-field__hint">Verified · used for sign-in and alerts.</p></div>
                  <div class="dd-field"><label class="dd-field__label" for="tz">Time zone</label><div class="dd-input dd-select"><select class="dd-input__control" id="tz" name="timezone"><option selected>Europe/Berlin · UTC+1</option>…</select><span class="dd-select__chevron">[i:chevron-down]</span></div></div>
                  <div class="dd-field dd-form__span">
                    <label class="dd-field__label" for="bio">Bio <span class="dd-field__opt">optional</span></label>
                    <div class="dd-input dd-textarea"><textarea class="dd-input__control" id="bio" name="bio" rows="2" maxlength="160">…</textarea></div>
                    <div class="dd-field__foot"><p class="dd-field__hint">Shown on your public profile.</p><span class="dd-field__counter">80 / 160</span></div>
                  </div>
                </div>
              </section>
              <div class="dd-form__footer">
                <span class="dd-form__meta">[i:clock]<span>Last saved Oct 30, 09:41</span></span>
                <button class="dd-btn dd-btn--ghost" type="reset">Discard</button>
                <button class="dd-btn dd-btn--primary" type="submit">Save profile</button>
              </div>
            </form>
          </div>

          <div class="dd-tabs__panel" role="tabpanel" id="notifications" hidden>
            <div class="dd-form dd-form--divided">
              <section class="dd-form__section" aria-labelledby="notify-title">
                <div class="dd-form__head"><h2 class="dd-form__title" id="notify-title">Notifications</h2><p class="dd-form__desc">Each switch applies right away.</p></div>
                <div class="dd-form__choices dd-form__choices--rows">
                  <label class="dd-switch dd-switch--end"><input class="dd-switch__input" type="checkbox" role="switch" name="failed-deploys" checked>
                    <span class="dd-switch__text"><span class="dd-switch__label">Failed deploys</span><span class="dd-switch__desc">Right away, with the build log attached.</span></span></label>
                  …
                </div>
              </section>
              <section class="dd-form__section" aria-labelledby="channels-title">
                <div class="dd-form__head"><h3 class="dd-form__title" id="channels-title">Where they go</h3></div>
                <div class="dd-form__choices dd-form__choices--rows"><!-- Email · Slack · Browser push, same switch rows --></div>
              </section>
            </div>
          </div>

          <div class="dd-tabs__panel" role="tabpanel" id="keys" hidden>
            <div class="dd-form"><section class="dd-form__section" aria-labelledby="keys-title">
              <div class="app-settings__head">
                <div class="dd-form__head"><h2 class="dd-form__title" id="keys-title">API keys</h2><p class="dd-form__desc">For CI and the dd CLI. Keep keys out of code.</p></div>
                <button class="dd-btn dd-btn--secondary" type="button" data-dd-dialog-open="#key-dialog">[i:plus]<span>Create key</span></button>
              </div>
              <div class="dd-code-field">
                <span class="dd-code-field__label" id="newkey">New key · github-actions</span>
                <div class="dd-code-field__box" role="group" aria-labelledby="newkey">
                  <code class="dd-code-field__value" data-dd-code-secret="dd_live_51Hc…3f9a">dd_live_••••••••••••••••••••3f9a</code>
                  <button class="dd-code-field__btn" type="button" data-dd-code-reveal data-dd-code-reveal-label="Show key|Hide key" aria-pressed="false" aria-label="Show key">[i:eye][i:eye-off]</button>
                  <button class="dd-code-field__btn" type="button" data-dd-copy="dd_live_51Hc…3f9a" aria-label="Copy key">[i:copy][i:check]</button>
                </div>
                <p class="dd-code-field__hint">Copy it now — it won’t be shown again. Expires Jan 28, 2027.</p>
              </div>
              <div class="dd-table dd-table--compact" tabindex="0" role="region" aria-labelledby="keys-title"><table>
                <thead><tr><th scope="col">Name</th><th scope="col">Key</th><th scope="col">Scope</th><th scope="col" class="is-num">Last used</th><th scope="col">Status</th><th scope="col" class="is-shrink"><span class="dd-visually-hidden">Actions</span></th></tr></thead>
                <tbody>
                  <tr><td class="is-strong">billing-worker</td><td class="is-mono is-muted">…77e0</td><td class="is-mono">invoices:write</td><td class="is-num is-muted">1 h ago</td>
                    <td><span class="dd-table__status" data-status="warn">Expires in 5 days</span></td>
                    <td><button class="dd-btn dd-btn--ghost dd-btn--sm" type="button" aria-label="Revoke billing-worker">Revoke</button></td></tr>
                  …
                </tbody>
              </table></div>
            </section></div>
          </div>

          <div class="dd-tabs__panel" role="tabpanel" id="danger" hidden>
            <div class="dd-form"><section class="dd-form__section" aria-labelledby="danger-title">
              <div class="dd-form__head"><h2 class="dd-form__title" id="danger-title">Danger zone</h2><p class="dd-form__desc">These can’t be undone. Export first if you might want your data back.</p></div>
              <div class="dd-form__section dd-form__section--panel"><div class="app-settings__row">
                <div class="dd-form__head"><h3 class="dd-form__title">Delete account</h3><p class="dd-form__desc">Removes your profile, <b>5 projects</b>, <b>1,284 deploys</b> and every API key.</p></div>
                <div class="dd-form__footer dd-form__footer--plain">
                  <button class="dd-btn dd-btn--ghost" type="button">[i:download]<span>Export data</span></button>
                  <button class="dd-btn dd-btn--danger" type="button" data-dd-dialog-open="#delete-dialog">[i:trash]<span>Delete account</span></button>
                </div>
              </div></div>
            </section></div>
          </div>
        </div>
      </div>
    </main>
  </div>
</div>

<dialog class="dd-dialog" id="key-dialog" aria-labelledby="key-title">
  <form class="dd-dialog__form" method="dialog" data-dd-validate novalidate>
    <header class="dd-dialog__head"><span class="dd-dialog__icon">[i:key]</span>
      <div class="dd-dialog__titles"><p class="dd-dialog__eyebrow">API keys</p><h2 class="dd-dialog__title" id="key-title">Create a key</h2></div>
      <button class="dd-dialog__close" type="button" data-dd-dialog-close aria-label="Close">[i:x]</button></header>
    <div class="dd-dialog__body dd-form__body">
      <div class="dd-field"><label class="dd-field__label" for="key-name">Name</label><div class="dd-input"><input class="dd-input__control" id="key-name" name="name" placeholder="leetnode-ci" required autofocus></div></div>
      <div class="dd-form__grid"><!-- Scope and Expires selects --></div>
    </div>
    <footer class="dd-dialog__foot">
      <button class="dd-btn dd-btn--ghost" type="button" data-dd-dialog-close>Cancel</button>
      <button class="dd-btn dd-btn--primary" type="submit" value="create">[i:key]<span>Create key</span></button>
    </footer>
  </form>
</dialog>
<dialog class="dd-dialog dd-dialog--sm dd-dialog--danger" id="delete-dialog" role="alertdialog" aria-labelledby="delete-title" aria-describedby="delete-desc">
  <header class="dd-dialog__head"><span class="dd-dialog__icon">[i:danger]</span>
    <div class="dd-dialog__titles"><p class="dd-dialog__eyebrow">Danger zone</p><h2 class="dd-dialog__title" id="delete-title">Delete your account?</h2></div></header>
  <div class="dd-dialog__body" id="delete-desc"><p>This permanently removes <strong>5 projects</strong>, <strong>1,284 deploys</strong> and <strong>every API key</strong>. It can’t be undone.</p></div>
  <footer class="dd-dialog__foot">
    <button class="dd-btn dd-btn--ghost" type="button" data-dd-dialog-close autofocus>Keep my account</button>
    <button class="dd-btn dd-btn--danger" type="button" data-dd-dialog-close="delete">[i:trash]<span>Delete</span></button>
  </footer>
</dialog>
<dialog class="dd-command" id="app-search" aria-label="Search settings" data-dd-hotkey>
  <!-- Command palette markup: groups "Settings" (one row per tab, data-value="tab:tab-keys", data-keywords for the fields
       inside) and "Actions" (Create an API key…, Change email address, Switch theme with data-dd-theme-toggle). -->
</dialog>
```
```css
.app-settings { container: app-settings / inline-size; max-width: 66rem; }
.app-settings .dd-tabs__panel { max-width: 46rem; }
.app-settings__head, .app-settings__row { display: flex; flex-flow: row wrap; align-items: flex-start; justify-content: space-between; gap: calc(var(--dd-u) * 4) calc(var(--dd-u) * 8); }
.app-settings__head > .dd-form__head, .app-settings__row > .dd-form__head { flex: 1 1 20rem; }
.app-settings__row { align-items: center; }
.app-settings__avatar { display: flex; flex-wrap: wrap; align-items: center; gap: calc(var(--dd-u) * 4); }
.app-settings__avatar > .dd-dropzone { flex: 1 1 12rem; }
@container app-settings (min-width: 860px) {
  .app-settings .dd-tabs--vertical > .dd-tabs__list { position: sticky; top: calc(var(--dd-u) * 6); }
}
@container app-settings (max-width: 859px) { /* the panels need the full width: list above, spanning it */
  .app-settings .dd-tabs--vertical > .dd-tabs__list { max-width: none; }
  .app-settings .dd-tabs--vertical > .dd-tabs__panel { flex-basis: 100%; max-width: none; }
}
```

The app answers the page in script: `submit` on the profile form (after `data-dd-validate` passes) saves and updates the
`.dd-form__meta` line ("Unsaved changes" on input, "Saved today, 09:52" after); `change` on a switch saves that one
setting; the key dialog's `close` event with `returnValue === 'create'` fills the code field and prepends a row;
`dd:command` from the palette calls `dd.tabs.select('#tab-…')`.

**Key rules**
- **Switch vs checkbox:** a switch applies at once, a checkbox is saved with a form. So Notifications is all switches
  with no Save, and the Profile form (which has Save) has no switches. Never mix them in one section.
- One primary on screen: Save profile, only in the Profile panel. Create key is secondary (its dialog has its own
  primary), Revoke is ghost per row, Delete is `--danger` behind a dialog.
- A section gets a footer only if it needs saving. A section with one action puts it beside its head
  (`app-settings__head`), not in a footer under the content.
- Section titles are `.dd-form__title` (sentence case). Don't add a lockup `.dd-table-header__title` inside a panel;
  it out-shouts the panel's own title. Label the table by the panel title (`aria-labelledby`).
- Validation: `data-dd-validate novalidate` on the form, `required` on what can't be empty, the error text in
  `data-dd-error-missing` / `-type`. Mark optional fields with `.dd-field__opt`, never required ones with an asterisk.
- Secrets: masked in `.dd-code-field` with reveal + copy, shown once, with a hint that says so. Key lists show the last
  four (mono), the scope, last use and a status (Active / Expires in 5 days / Revoked). Keep the table to six columns
  so it fits beside the tabs from ~1024px.
- Destructive = two steps: `.dd-btn--danger` → `.dd-dialog--danger` (`role="alertdialog"`, `autofocus` on the safe
  choice). The danger zone is a neutral tonal panel; don't tint it red.
- Responsive: tabs beside the panels from 860px of page (sticky), above them and full width below; the profile grid
  folds to one column; footer buttons share the width under ~420px; the key table scrolls sideways only on phones.

## 4. Landing page (cxkw.dev)

**Structure** — no app shell; one wrapper with glue for the section rhythm:
1. `.dd-top-bar` site variant: wordmark (`.dd-logo` with the site name), `.dd-top-bar__links`, ghost icon buttons
   (GitHub, theme). Under 640px the links hide; the nav button opens a `.dd-menu` with the same links. The links are
   in-page anchors, so none carries `aria-current` (on a multi-page site, the link to the page you're on does).
2. Hero: `.dd-eyebrow`, `h1.dd-display` (the only display headline), `.dd-lead`, **primary** + secondary
   `.dd-btn--lg`, a `.dd-status-dot--online --live` availability line.
3. `.dd-stat-grid--joined`: four figures, each naming its period.
4. Work: eyebrow + `h2.dd-h2`, `.dd-card-grid` of `.dd-card--link` (`__media`, `--warm` alternating; eyebrow with icon;
   stretched title link; text; meta + "Case study →"). Use a count that fills the rows (3 or 6).
5. `.dd-callout--tip`: one "now" note.
6. Contact (glue: pitch | form from ~900px): eyebrow + `h2.dd-h2`, muted text, the email (a link, or a
   `.dd-description-list--stacked` row with a copy button) | `.dd-form` with tucked fields; its submit repeats the
   hero's primary action.
7. Footer (glue band on `--dd-surface`): `.dd-logo--xl` wordmark, `.dd-caption` credit, `.dd-link--muted` links.

```html
<div class="app-landing">
  <header class="dd-top-bar">
    <button class="dd-btn dd-btn--ghost dd-btn--icon dd-top-bar__nav-btn" type="button" data-dd-menu="site-menu" aria-haspopup="menu" aria-expanded="false" aria-controls="site-menu" aria-label="Open menu">[i:menu]</button>
    <div class="dd-menu" id="site-menu" role="menu" aria-label="Sections" hidden><a class="dd-menu__item" role="menuitem" href="#work">Work</a><a class="dd-menu__item" role="menuitem" href="#contact">Contact</a></div>
    <a class="dd-top-bar__brand" href="/"><span class="dd-logo">cxkw</span></a>
    <nav aria-label="Sections"><ul class="dd-top-bar__links">
      <li><a class="dd-top-bar__link" href="#work">Work</a></li><li><a class="dd-top-bar__link" href="#contact">Contact</a></li>
    </ul></nav>
    <div class="dd-top-bar__actions">
      <a class="dd-btn dd-btn--ghost dd-btn--icon" href="https://github.com/cxkw-dev" aria-label="GitHub">[i:code]</a>
      <button class="dd-btn dd-btn--ghost dd-btn--icon" type="button" data-dd-theme-toggle aria-label="Toggle dawn / dusk">[i:moon]</button>
    </div>
  </header>
  <main class="app-wrap">
    <section class="app-hero" aria-labelledby="hero-title">
      <p class="dd-eyebrow">cxkw.dev · Andy Nguyen</p>
      <h1 class="dd-display" id="hero-title">small tools for focused work</h1>
      <p class="dd-lead">I design and build quiet software — and the design system it all shares.</p>
      <div class="dd-row" style="--dd-gap: calc(var(--dd-u) * 2)">
        <a class="dd-btn dd-btn--primary dd-btn--lg" href="#contact"><span>Start a project</span>[i:arrow-right]</a>
        <a class="dd-btn dd-btn--secondary dd-btn--lg" href="#work"><span>See the work</span></a>
      </div>
      <span class="dd-status-dot dd-status-dot--online dd-status-dot--live">Booking projects from January 2027</span>
    </section>
    <div class="dd-stat-grid dd-stat-grid--joined" style="--dd-stat-min: 180px">
      <div class="dd-stat"><p class="dd-stat__label">Deploys this year</p><div class="dd-stat__main"><p class="dd-stat__value">1,284</p></div>
        <div class="dd-stat__foot"><span class="dd-stat__compare"><b>4.1</b> a working day</span></div></div>
      …
    </div>
    <section class="app-section" id="work" aria-labelledby="work-title">
      <header class="dd-stack" style="--dd-gap: calc(var(--dd-u) * 2)"><p class="dd-eyebrow">Selected work</p><h2 class="dd-h2" id="work-title">the lab</h2></header>
      <div class="dd-card-grid">
        <article class="dd-card dd-card--link">
          <div class="dd-card__media dd-card__media--warm" role="img" aria-label="dawn-and-dusk cover"></div>
          <div class="dd-card__body">
            <p class="dd-card__eyebrow">[i:layers]<span>Design system</span></p>
            <h3 class="dd-card__title"><a class="dd-card__stretch" href="/work/dawn-and-dusk">dawn-and-dusk</a></h3>
            <p class="dd-card__text">Tokens, 58 components and an agent skill for dawn and dusk.</p>
            <div class="dd-card__foot"><span class="dd-card__meta">CSS · v0.1</span><span class="dd-card__link">Case study [i:arrow-right]</span></div>
          </div>
        </article>
        …
      </div>
    </section>
    <aside class="dd-callout dd-callout--tip"><p class="dd-callout__title">[i:sparkle]Now</p><p>Building <strong>ai-focus</strong> in the open — <a class="dd-link" href="/notes">read the latest</a>.</p></aside>
    <section class="app-section" id="contact" aria-labelledby="contact-title"><div class="app-contact">
      <div class="dd-stack" style="--dd-gap: calc(var(--dd-u) * 4)">
        <p class="dd-eyebrow">Contact</p><h2 class="dd-h2" id="contact-title">say hello</h2>
        <p class="dd-text dd-muted">Tell me what you’re making and when it needs to ship.</p>
        <p class="dd-text"><a class="dd-link" href="mailto:hello@cxkw.dev">hello@cxkw.dev</a></p>
      </div>
      <form class="dd-form">
        <div class="dd-form__grid">
          <div class="dd-field"><label class="dd-field__label" for="c-name">Name</label><div class="dd-input"><input class="dd-input__control" id="c-name" autocomplete="name" required></div></div>
          <div class="dd-field"><label class="dd-field__label" for="c-email">Email</label><div class="dd-input"><input class="dd-input__control" id="c-email" type="email" autocomplete="email" required></div></div>
          <div class="dd-field dd-form__span"><label class="dd-field__label" for="c-msg">Message</label><div class="dd-input dd-textarea"><textarea class="dd-input__control" id="c-msg" rows="4" required></textarea></div></div>
        </div>
        <div class="dd-form__footer"><span class="dd-form__meta">[i:lock]Only used to reply to you.</span><button class="dd-btn dd-btn--primary" type="submit">[i:send]<span>Send message</span></button></div>
      </form>
    </div></section>
  </main>
  <footer class="app-footer"><div class="app-wrap">
    <div class="dd-stack" style="--dd-gap: calc(var(--dd-u) * 3)"><span class="dd-logo dd-logo--xl">cxkw</span>
      <p class="dd-caption">© 2026 Andy Nguyen · set in <span class="dd-logo dd-logo--xs">dawn &amp; dusk</span></p></div>
    <nav class="dd-row" style="--dd-gap: calc(var(--dd-u) * 5)" aria-label="Elsewhere">
      <a class="dd-link dd-link--muted" href="https://github.com/cxkw-dev">GitHub</a><a class="dd-link dd-link--muted" href="mailto:hello@cxkw.dev">hello@cxkw.dev</a>
    </nav>
  </div></footer>
</div>
```
```css
.app-landing { container: app-landing / inline-size; }
.app-wrap { max-width: 1080px; margin-inline: auto; padding-inline: calc(var(--dd-u) * 10); }
.app-hero { display: flex; flex-direction: column; align-items: flex-start; gap: calc(var(--dd-u) * 5); max-width: 46rem; padding-block: calc(var(--dd-u) * 20) calc(var(--dd-u) * 12); }
.app-section { display: flex; flex-direction: column; gap: calc(var(--dd-u) * 6); padding-block: calc(var(--dd-u) * 12); }
.app-contact { display: grid; gap: calc(var(--dd-u) * 8); }
.app-footer { margin-top: calc(var(--dd-u) * 12); padding-block: calc(var(--dd-u) * 10); background: var(--dd-surface); }
.app-footer .app-wrap { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: calc(var(--dd-u) * 6); }
@container app-landing (min-width: 900px) { .app-contact { grid-template-columns: minmax(0, 2fr) minmax(0, 3fr); gap: calc(var(--dd-u) * 12); } }
@container app-landing (max-width: 560px) {
  .app-wrap { padding-inline: calc(var(--dd-u) * 4); }
  .app-hero { padding-block: calc(var(--dd-u) * 12) calc(var(--dd-u) * 6); }
  .app-hero .dd-display { font-size: var(--dd-fs-3xl); }
  .app-section { padding-block: calc(var(--dd-u) * 8); }
}
```

**Key rules**
- One action, one colour: the hero's primary ("Start a project") and the form's submit are the same action, so both
  are `--primary`; "See the work" is secondary; the top bar is all ghost.
- Only the hero is `.dd-display`; sections step down to `.dd-h2` under a mono `.dd-eyebrow`. All lowercase.
- Proof in mono: stat values and `<b>` figures in the compare line; card meta (versions, stars) stays small.
- Cards lift by tone, never shadow or border; media is tonal (`__media`, `--warm`), so the page works without
  images. Stretch the title link so each card is one tab stop.
- The footer is a quiet `--dd-surface` band: wordmark, credit, muted links — no second CTA.
- Mobile: links fold into the menu, the headline drops to `--dd-fs-3xl`, buttons wrap, stats go 2 × 2, cards stack,
  the contact block stacks with its fields in one column.

## 5. Pricing

A landing-page section (or page) built from Card, Segmented control, Badge, Table and Accordion. Live markup for each part
is in `components/<name>.md`.

**Structure:** lockup headline + lead → billing switch → plan cards → comparison table → FAQ → closing call to action.

```html
<!-- billing switch: the radio flavour of the segmented control, so arrow keys work with no script -->
<fieldset class="dd-segmented" id="billing">
  <legend class="dd-visually-hidden">Billing period</legend>
  <label class="dd-segmented__item"><input type="radio" name="period" value="monthly" checked><span>Monthly</span></label>
  <label class="dd-segmented__item"><input type="radio" name="period" value="yearly"><span>Yearly</span> <span class="dd-segmented__count">2 months free</span></label>
</fieldset>

<div class="dd-card-grid app-plans">              <!-- glue: grid-template-columns: repeat(3, minmax(0, 1fr)) when it fits -->
  <article class="dd-card" aria-labelledby="plan-pro">
    <div class="dd-card__body">
      <p class="dd-card__eyebrow">[i:bolt]<span>For solo operators</span><span class="dd-badge dd-badge--accent">Popular</span></p>
      <h3 class="dd-card__title" id="plan-pro">pro</h3>
      <p class="dd-card__text">One sentence on who the plan is for.</p>
      <p class="dd-card__stat"><span data-app-price="pro">$12</span><small>/mo</small></p>   <!-- your own hook; your script swaps it -->
      <p class="dd-card__label">Billed monthly · cancel any time</p>
      <ul class="app-plan-list"><li>[i:check]<span>100 monitors</span></li>…</ul>   <!-- glue: a stack of icon + text rows -->
      <div class="dd-card__foot"><a class="dd-btn dd-btn--primary dd-btn--block" href="#signup">Start with Pro</a></div>
    </div>
  </article>
  …
</div>
```

**Key rules**
- **The recommended plan carries the only primary button** in the cards; the other plans use `.dd-btn--secondary`. Mark it
  with an accent badge ("Popular"), not a border or a coloured card.
- Prices are `.dd-card__stat` (the display font, like stat values); units go in `<small>`. Changing the period swaps the
  numbers in place from your own script (the system has no pricing behaviour). Announce the change in a polite live
  region (`<p class="dd-visually-hidden" aria-live="polite"></p>`) and keep the card heights stable.
- Three plans sit in one row once they fit and stack below that — set the columns with glue, never leave 2 + 1.
- Comparison: a `.dd-table` (fine at 15–25 rows when the table is the section's main content) with one `<tbody>` per feature
  group. Give each group a header row whose cell holds an eyebrow, `<th scope="rowgroup" colspan="4"><span
  class="dd-eyebrow">Alerts</span></th>`, so it reads apart from the feature names. Use `[i:check]` / an em dash for
  yes / no, each with visually hidden text ("Included" / "Not included"). On phones the plan columns scroll inside the
  table. If the feature column must stay put, use the data table's frozen first column instead (`components/data-table.md`).
- FAQ: a `.dd-accordion` of native `<details>`, grouped with `name="faq"` so one opens at a time. Copy the markup from
  `components/accordion.md`.
- A long page may end with a closing call to action that repeats the same primary action (it's a new view).

## Before you finish

Use the checklist in SKILL.md §6. For pages, also:
- Count primary buttons per screenful: one. Every status has a word; table figures are mono and right-aligned; every
  icon-only button has an `aria-label`.
- Anchored sections clear the sticky top bar (`scroll-margin-top`).
