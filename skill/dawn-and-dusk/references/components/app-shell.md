# app shell — `app-shell`

The page layout for apps: the side nav runs the full height on the left; the top bar and the content share the rest. The content scrolls inside a viewport-high shell, or the whole page scrolls under a sticky nav and bar; on phones the nav slides in over the page.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/app-shell

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### Full shell

Side nav, top bar, page header and content. Try it: the chevron at the foot of the rail folds the panel and the page reflows; the services and projects icons switch it; a service link becomes the page. Shown 700px tall — in an app the shell is the viewport (100dvh) and only the content scrolls; for a page that scrolls as a whole, see Page scroll.

```html
<div class="dd-app-shell" style="--dd-app-shell-h: 700px">
  <nav class="dd-side-nav" id="shell-demo-nav" aria-label="Main">
    <div class="dd-side-nav__rail">
      <a class="dd-side-nav__logo dd-logo-tile" href="#" aria-label="dawn &amp; dusk — home">d&amp;</a>
      <button class="dd-side-nav__item is-active" type="button" aria-current="true" data-dd-nav-section="services" data-label="Services" aria-label="Services"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-server"/></svg></button>
      <button class="dd-side-nav__item" type="button" data-dd-nav-section="projects" data-label="Projects" aria-label="Projects"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-folder"/></svg></button>
      <a class="dd-side-nav__item" href="#" data-label="Analytics" aria-label="Analytics"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chart"/></svg></a>
      <a class="dd-side-nav__item" href="#" data-label="Storage" aria-label="Storage"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-database"/></svg></a>
      <span class="dd-side-nav__spacer"></span>
      <a class="dd-side-nav__item" href="#" data-label="Inbox · 3 new" aria-label="Inbox · 3 new"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-bell"/></svg><span class="dd-side-nav__dot"></span></a>
      <a class="dd-side-nav__item" href="#" data-label="Settings" aria-label="Settings"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-settings"/></svg></a>
      <span class="dd-side-nav__sep"></span>
      <button class="dd-side-nav__item dd-side-nav__collapse" type="button" data-dd-nav-toggle aria-controls="shell-demo-panel" aria-expanded="true" aria-label="Collapse navigation" data-label="Collapse"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-left"/></svg></button>
    </div>
    <div class="dd-side-nav__panel" id="shell-demo-panel">
      <div class="dd-side-nav__pane" data-dd-nav-pane="services">
        <div class="dd-side-nav__head"><span class="dd-side-nav__title">services</span><span class="dd-side-nav__count">6</span></div>
        <p class="dd-side-nav__section">Production</p>
        <a class="dd-side-nav__link" href="#" aria-current="page"><span class="dd-side-nav__dot dd-side-nav__dot--ok"></span><span class="dd-side-nav__label">auth-gateway</span><span class="dd-side-nav__count">3</span></a>
        <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__dot dd-side-nav__dot--bad"></span><span class="dd-side-nav__label">billing-worker</span><span class="dd-side-nav__badge dd-side-nav__badge--solid">12</span></a>
        <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__dot dd-side-nav__dot--ok"></span><span class="dd-side-nav__label">edge-cache</span><span class="dd-side-nav__count">9</span></a>
        <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__dot dd-side-nav__dot--warn"></span><span class="dd-side-nav__label">search-indexer</span><span class="dd-side-nav__count">1</span></a>
        <p class="dd-side-nav__section">Staging</p>
        <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__dot dd-side-nav__dot--ok"></span><span class="dd-side-nav__label">auth-gateway</span></a>
        <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__dot dd-side-nav__dot--idle"></span><span class="dd-side-nav__label">payments-v2</span><span class="dd-side-nav__badge dd-side-nav__badge--new">NEW</span></a>
        <div class="dd-side-nav__foot">
          <div class="dd-side-nav__note"><span><b>Hobby plan</b> · 412k of 1M requests</span><span class="dd-side-nav__meter"><i style="width:41%"></i></span></div>
        </div>
      </div>
      <div class="dd-side-nav__pane" data-dd-nav-pane="projects" hidden>
        <div class="dd-side-nav__head"><span class="dd-side-nav__title">projects</span><span class="dd-side-nav__count">7</span></div>
        <p class="dd-side-nav__section">Pinned</p>
        <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__label">dawn-and-dusk</span><span class="dd-side-nav__count">24</span></a>
        <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__label">dockey-ui</span><span class="dd-side-nav__count">9</span></a>
        <p class="dd-side-nav__section">All</p>
        <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__label">ai-focus</span><span class="dd-side-nav__count">31</span></a>
        <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__label">insomnia</span><span class="dd-side-nav__count">6</span></a>
        <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__label">leetnode</span><span class="dd-side-nav__count">41</span></a>
      </div>
    </div>
  </nav>

  <div class="dd-app-shell__main">
    <header class="dd-top-bar">
      <button class="dd-btn dd-btn--ghost dd-btn--icon dd-top-bar__nav-btn" type="button" data-dd-nav-open="#shell-demo-nav" aria-controls="shell-demo-nav" aria-expanded="false" aria-label="Open navigation"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-menu"/></svg></button>
      <a class="dd-top-bar__brand dd-top-bar__narrow" href="#"><span class="dd-logo dd-logo--sm">dawn &amp; dusk</span></a>
      <div class="dd-top-bar__context">
        <button class="dd-top-bar__switch" type="button"><span class="dd-top-bar__mark">cx</span><span>cxkw</span></button>
        <span class="dd-faint">/</span>
        <button class="dd-top-bar__switch" type="button"><span>production</span><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-sort"/></svg></button>
      </div>
      <button class="dd-top-bar__search" type="button" aria-label="Search"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-search"/></svg><span>Search…</span><kbd class="dd-top-bar__kbd">⌘K</kbd></button>
      <div class="dd-top-bar__actions">
        <button class="dd-btn dd-btn--ghost dd-btn--icon dd-top-bar__icon-btn" type="button" aria-label="Notifications, 3 new"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-bell"/></svg><span class="dd-top-bar__dot"></span></button>
        <details class="dd-top-bar__user" data-dd-autoclose>
          <summary aria-label="Account menu"><span class="dd-top-bar__avatar">cx</span></summary>
          <div class="dd-top-bar__menu">
            <div class="dd-top-bar__menu-head"><b>cxkw</b><span>hello@cxkw.dev</span></div>
            <div class="dd-top-bar__menu-sep"></div>
            <a class="dd-top-bar__menu-item" href="#"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-settings"/></svg>Settings</a>
            <button class="dd-top-bar__menu-item" type="button" data-dd-theme-toggle><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-moon"/></svg>Toggle dusk</button>
            <a class="dd-top-bar__menu-item" href="#"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-logout"/></svg>Sign out</a>
          </div>
        </details>
      </div>
    </header>

    <main class="dd-app-shell__content">
      <div class="dd-app-shell__page">
        <header class="dd-page-header">
          <nav class="dd-breadcrumbs dd-breadcrumbs--sm" aria-label="Breadcrumb">
            <ol class="dd-breadcrumbs__list">
              <li class="dd-breadcrumbs__item"><a class="dd-breadcrumbs__link" href="#"><span>services</span></a></li>
              <li class="dd-breadcrumbs__item"><a class="dd-breadcrumbs__link" aria-current="page"><span>auth-gateway</span></a></li>
            </ol>
          </nav>
          <div class="dd-page-header__row">
            <div class="dd-page-header__titles"><h1 class="dd-page-header__title">auth-gateway</h1></div>
            <div class="dd-page-header__actions">
              <button class="dd-btn dd-btn--secondary" type="button"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-refresh"/></svg><span>Redeploy</span></button>
              <button class="dd-btn dd-btn--primary" type="button"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-upload"/></svg><span>Promote</span></button>
            </div>
          </div>
          <ul class="dd-page-header__meta">
            <li><span class="dd-page-header__status"></span>Healthy</li>
            <li><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-globe"/></svg><b>fra1 · iad1 · sin1</b></li>
            <li><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-clock"/></svg>Deployed <b>4m ago</b></li>
          </ul>
          <nav aria-label="Service">
            <div class="dd-tabs__list">
              <a class="dd-tabs__tab" href="#" aria-current="page">Overview</a>
              <a class="dd-tabs__tab" href="#">Deploys <span class="dd-tabs__count">32</span></a>
              <a class="dd-tabs__tab" href="#">Logs</a>
              <a class="dd-tabs__tab" href="#">Env vars <span class="dd-tabs__count">18</span></a>
              <a class="dd-tabs__tab" href="#">Settings</a>
            </div>
          </nav>
        </header>

        <div class="dd-card-grid">
          <article class="dd-card dd-card--stat"><div class="dd-card__body">
            <p class="dd-card__eyebrow"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-bolt"/></svg><span>Requests · 24h</span></p>
            <p class="dd-card__stat dd-num">1.82<small>M</small></p>
            <div class="dd-card__foot"><span class="dd-card__delta is-up"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-up"/></svg>+6.1%</span><span class="dd-card__meta">vs. yesterday</span></div>
          </div></article>
          <article class="dd-card dd-card--stat"><div class="dd-card__body">
            <p class="dd-card__eyebrow"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-clock"/></svg><span>p95 latency</span></p>
            <p class="dd-card__stat dd-num">142<small>ms</small></p>
            <div class="dd-card__foot"><span class="dd-card__delta"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-minus"/></svg>0ms</span><span class="dd-card__meta">within budget</span></div>
          </div></article>
          <article class="dd-card dd-card--stat"><div class="dd-card__body">
            <p class="dd-card__eyebrow"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-alert"/></svg><span>Error rate</span></p>
            <p class="dd-card__stat dd-num">0.04<small>%</small></p>
            <div class="dd-card__foot"><span class="dd-card__delta is-up"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-down"/></svg>−0.02%</span><span class="dd-card__meta">last hour</span></div>
          </div></article>
          <article class="dd-card dd-card--stat"><div class="dd-card__body">
            <p class="dd-card__eyebrow"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-shield"/></svg><span>Uptime · 30d</span></p>
            <p class="dd-card__stat dd-num">99.98<small>%</small></p>
            <div class="dd-card__foot"><span class="dd-card__delta"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-minus"/></svg>0.00%</span><span class="dd-card__meta">SLO 99.9%</span></div>
          </div></article>
        </div>

        <div class="dd-card-grid">
          <a class="dd-card dd-card--link dd-card--compact" href="#"><div class="dd-card__body">
            <p class="dd-card__eyebrow"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-cloud"/></svg><span class="dd-mono">dpl_8f3a2c</span></p>
            <h3 class="dd-card__title">Rotate signing keys</h3>
            <div class="dd-card__foot"><span class="dd-card__meta">production · 4m ago</span><span class="dd-card__link">Open <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-right"/></svg></span></div>
          </div></a>
          <a class="dd-card dd-card--link dd-card--compact" href="#"><div class="dd-card__body">
            <p class="dd-card__eyebrow"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-cloud"/></svg><span class="dd-mono">dpl_5c40d1</span></p>
            <h3 class="dd-card__title">Cache JWKS for 10 minutes</h3>
            <div class="dd-card__foot"><span class="dd-card__meta">production · 2h ago</span><span class="dd-card__link">Open <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-right"/></svg></span></div>
          </div></a>
          <a class="dd-card dd-card--link dd-card--compact" href="#"><div class="dd-card__body">
            <p class="dd-card__eyebrow"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-cloud"/></svg><span class="dd-mono">dpl_2e91aa</span></p>
            <h3 class="dd-card__title">Add sin1 region</h3>
            <div class="dd-card__foot"><span class="dd-card__meta">production · yesterday</span><span class="dd-card__link">Open <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-right"/></svg></span></div>
          </div></a>
          <a class="dd-card dd-card--link dd-card--compact" href="#"><div class="dd-card__body">
            <p class="dd-card__eyebrow"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-cloud"/></svg><span class="dd-mono">dpl_17c0be</span></p>
            <h3 class="dd-card__title">Move to Node 22</h3>
            <div class="dd-card__foot"><span class="dd-card__meta">production · 3 days ago</span><span class="dd-card__link">Open <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-right"/></svg></span></div>
          </div></a>
        </div>
      </div>
    </main>
  </div>
</div>
```

## On a phone

Under 768px of shell width (or the breakpoint you pick) the side nav leaves the flow. The top bar shows its menu button and the logo (`dd-top-bar__narrow`); the button opens the nav over a scrim. Esc, the scrim or a link closes it and returns focus to the menu button; tabbing out closes it too. Try it: open the menu and pick a service.

```html
<div class="as-phone">
<div class="dd-app-shell" style="--dd-app-shell-h: 640px">
  <nav class="dd-side-nav" id="shell-demo-phone-nav" aria-label="Main">
    <div class="dd-side-nav__rail">
      <a class="dd-side-nav__logo dd-logo-tile" href="#" aria-label="dawn &amp; dusk — home">d&amp;</a>
      <button class="dd-side-nav__item is-active" type="button" aria-current="true" data-dd-nav-section="services" data-label="Services" aria-label="Services"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-server"/></svg></button>
      <button class="dd-side-nav__item" type="button" data-dd-nav-section="projects" data-label="Projects" aria-label="Projects"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-folder"/></svg></button>
      <a class="dd-side-nav__item" href="#" data-label="Analytics" aria-label="Analytics"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chart"/></svg></a>
      <a class="dd-side-nav__item" href="#" data-label="Storage" aria-label="Storage"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-database"/></svg></a>
      <span class="dd-side-nav__spacer"></span>
      <a class="dd-side-nav__item" href="#" data-label="Inbox · 3 new" aria-label="Inbox · 3 new"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-bell"/></svg><span class="dd-side-nav__dot"></span></a>
      <a class="dd-side-nav__item" href="#" data-label="Settings" aria-label="Settings"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-settings"/></svg></a>
      <span class="dd-side-nav__sep"></span>
      <button class="dd-side-nav__item dd-side-nav__collapse" type="button" data-dd-nav-toggle aria-controls="shell-demo-phone-panel" aria-expanded="true" aria-label="Collapse navigation" data-label="Collapse"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-left"/></svg></button>
    </div>
    <div class="dd-side-nav__panel" id="shell-demo-phone-panel">
      <div class="dd-side-nav__pane" data-dd-nav-pane="services">
        <div class="dd-side-nav__head"><span class="dd-side-nav__title">services</span><span class="dd-side-nav__count">6</span></div>
        <p class="dd-side-nav__section">Production</p>
        <a class="dd-side-nav__link" href="#" aria-current="page"><span class="dd-side-nav__dot dd-side-nav__dot--ok"></span><span class="dd-side-nav__label">auth-gateway</span><span class="dd-side-nav__count">3</span></a>
        <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__dot dd-side-nav__dot--bad"></span><span class="dd-side-nav__label">billing-worker</span><span class="dd-side-nav__badge dd-side-nav__badge--solid">12</span></a>
        <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__dot dd-side-nav__dot--ok"></span><span class="dd-side-nav__label">edge-cache</span><span class="dd-side-nav__count">9</span></a>
        <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__dot dd-side-nav__dot--warn"></span><span class="dd-side-nav__label">search-indexer</span><span class="dd-side-nav__count">1</span></a>
        <p class="dd-side-nav__section">Staging</p>
        <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__dot dd-side-nav__dot--ok"></span><span class="dd-side-nav__label">auth-gateway</span></a>
        <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__dot dd-side-nav__dot--idle"></span><span class="dd-side-nav__label">payments-v2</span><span class="dd-side-nav__badge dd-side-nav__badge--new">NEW</span></a>
        <div class="dd-side-nav__foot">
          <div class="dd-side-nav__note"><span><b>Hobby plan</b> · 412k of 1M requests</span><span class="dd-side-nav__meter"><i style="width:41%"></i></span></div>
        </div>
      </div>
      <div class="dd-side-nav__pane" data-dd-nav-pane="projects" hidden>
        <div class="dd-side-nav__head"><span class="dd-side-nav__title">projects</span><span class="dd-side-nav__count">7</span></div>
        <p class="dd-side-nav__section">Pinned</p>
        <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__label">dawn-and-dusk</span><span class="dd-side-nav__count">24</span></a>
        <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__label">dockey-ui</span><span class="dd-side-nav__count">9</span></a>
        <p class="dd-side-nav__section">All</p>
        <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__label">ai-focus</span><span class="dd-side-nav__count">31</span></a>
        <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__label">insomnia</span><span class="dd-side-nav__count">6</span></a>
        <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__label">leetnode</span><span class="dd-side-nav__count">41</span></a>
      </div>
    </div>
  </nav>

  <div class="dd-app-shell__main">
    <header class="dd-top-bar">
      <button class="dd-btn dd-btn--ghost dd-btn--icon dd-top-bar__nav-btn" type="button" data-dd-nav-open="#shell-demo-phone-nav" aria-controls="shell-demo-phone-nav" aria-expanded="false" aria-label="Open navigation"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-menu"/></svg></button>
      <a class="dd-top-bar__brand dd-top-bar__narrow" href="#"><span class="dd-logo dd-logo--sm">dawn &amp; dusk</span></a>
      <div class="dd-top-bar__context">
        <button class="dd-top-bar__switch" type="button"><span class="dd-top-bar__mark">cx</span><span>cxkw</span></button>
        <span class="dd-faint">/</span>
        <button class="dd-top-bar__switch" type="button"><span>production</span><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-sort"/></svg></button>
      </div>
      <button class="dd-top-bar__search" type="button" aria-label="Search"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-search"/></svg><span>Search…</span><kbd class="dd-top-bar__kbd">⌘K</kbd></button>
      <div class="dd-top-bar__actions">
        <button class="dd-btn dd-btn--ghost dd-btn--icon dd-top-bar__icon-btn" type="button" aria-label="Notifications, 3 new"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-bell"/></svg><span class="dd-top-bar__dot"></span></button>
        <details class="dd-top-bar__user" data-dd-autoclose>
          <summary aria-label="Account menu"><span class="dd-top-bar__avatar">cx</span></summary>
          <div class="dd-top-bar__menu">
            <div class="dd-top-bar__menu-head"><b>cxkw</b><span>hello@cxkw.dev</span></div>
            <div class="dd-top-bar__menu-sep"></div>
            <a class="dd-top-bar__menu-item" href="#"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-settings"/></svg>Settings</a>
            <button class="dd-top-bar__menu-item" type="button" data-dd-theme-toggle><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-moon"/></svg>Toggle dusk</button>
            <a class="dd-top-bar__menu-item" href="#"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-logout"/></svg>Sign out</a>
          </div>
        </details>
      </div>
    </header>

    <main class="dd-app-shell__content">
      <div class="dd-app-shell__page">
        <header class="dd-page-header">
          <nav class="dd-breadcrumbs dd-breadcrumbs--sm" aria-label="Breadcrumb">
            <ol class="dd-breadcrumbs__list">
              <li class="dd-breadcrumbs__item"><a class="dd-breadcrumbs__link" href="#"><span>services</span></a></li>
              <li class="dd-breadcrumbs__item"><a class="dd-breadcrumbs__link" aria-current="page"><span>auth-gateway</span></a></li>
            </ol>
          </nav>
          <div class="dd-page-header__row">
            <div class="dd-page-header__titles"><h1 class="dd-page-header__title">auth-gateway</h1></div>
            <div class="dd-page-header__actions">
              <button class="dd-btn dd-btn--secondary" type="button"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-refresh"/></svg><span>Redeploy</span></button>
              <button class="dd-btn dd-btn--primary" type="button"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-upload"/></svg><span>Promote</span></button>
            </div>
          </div>
          <ul class="dd-page-header__meta">
            <li><span class="dd-page-header__status"></span>Healthy</li>
            <li><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-globe"/></svg><b>fra1 · iad1 · sin1</b></li>
            <li><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-clock"/></svg>Deployed <b>4m ago</b></li>
          </ul>
          <nav aria-label="Service">
            <div class="dd-tabs__list">
              <a class="dd-tabs__tab" href="#" aria-current="page">Overview</a>
              <a class="dd-tabs__tab" href="#">Deploys <span class="dd-tabs__count">32</span></a>
              <a class="dd-tabs__tab" href="#">Logs</a>
              <a class="dd-tabs__tab" href="#">Env vars <span class="dd-tabs__count">18</span></a>
              <a class="dd-tabs__tab" href="#">Settings</a>
            </div>
          </nav>
        </header>

        <div class="dd-card-grid">
          <article class="dd-card dd-card--stat"><div class="dd-card__body">
            <p class="dd-card__eyebrow"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-bolt"/></svg><span>Requests · 24h</span></p>
            <p class="dd-card__stat dd-num">1.82<small>M</small></p>
            <div class="dd-card__foot"><span class="dd-card__delta is-up"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-up"/></svg>+6.1%</span><span class="dd-card__meta">vs. yesterday</span></div>
          </div></article>
          <article class="dd-card dd-card--stat"><div class="dd-card__body">
            <p class="dd-card__eyebrow"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-clock"/></svg><span>p95 latency</span></p>
            <p class="dd-card__stat dd-num">142<small>ms</small></p>
            <div class="dd-card__foot"><span class="dd-card__delta"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-minus"/></svg>0ms</span><span class="dd-card__meta">within budget</span></div>
          </div></article>
          <article class="dd-card dd-card--stat"><div class="dd-card__body">
            <p class="dd-card__eyebrow"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-alert"/></svg><span>Error rate</span></p>
            <p class="dd-card__stat dd-num">0.04<small>%</small></p>
            <div class="dd-card__foot"><span class="dd-card__delta is-up"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-down"/></svg>−0.02%</span><span class="dd-card__meta">last hour</span></div>
          </div></article>
          <article class="dd-card dd-card--stat"><div class="dd-card__body">
            <p class="dd-card__eyebrow"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-shield"/></svg><span>Uptime · 30d</span></p>
            <p class="dd-card__stat dd-num">99.98<small>%</small></p>
            <div class="dd-card__foot"><span class="dd-card__delta"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-minus"/></svg>0.00%</span><span class="dd-card__meta">SLO 99.9%</span></div>
          </div></article>
        </div>

        <div class="dd-card-grid">
          <a class="dd-card dd-card--link dd-card--compact" href="#"><div class="dd-card__body">
            <p class="dd-card__eyebrow"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-cloud"/></svg><span class="dd-mono">dpl_8f3a2c</span></p>
            <h3 class="dd-card__title">Rotate signing keys</h3>
            <div class="dd-card__foot"><span class="dd-card__meta">production · 4m ago</span><span class="dd-card__link">Open <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-right"/></svg></span></div>
          </div></a>
          <a class="dd-card dd-card--link dd-card--compact" href="#"><div class="dd-card__body">
            <p class="dd-card__eyebrow"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-cloud"/></svg><span class="dd-mono">dpl_5c40d1</span></p>
            <h3 class="dd-card__title">Cache JWKS for 10 minutes</h3>
            <div class="dd-card__foot"><span class="dd-card__meta">production · 2h ago</span><span class="dd-card__link">Open <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-right"/></svg></span></div>
          </div></a>
          <a class="dd-card dd-card--link dd-card--compact" href="#"><div class="dd-card__body">
            <p class="dd-card__eyebrow"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-cloud"/></svg><span class="dd-mono">dpl_2e91aa</span></p>
            <h3 class="dd-card__title">Add sin1 region</h3>
            <div class="dd-card__foot"><span class="dd-card__meta">production · yesterday</span><span class="dd-card__link">Open <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-right"/></svg></span></div>
          </div></a>
          <a class="dd-card dd-card--link dd-card--compact" href="#"><div class="dd-card__body">
            <p class="dd-card__eyebrow"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-cloud"/></svg><span class="dd-mono">dpl_17c0be</span></p>
            <h3 class="dd-card__title">Move to Node 22</h3>
            <div class="dd-card__foot"><span class="dd-card__meta">production · 3 days ago</span><span class="dd-card__link">Open <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-right"/></svg></span></div>
          </div></a>
        </div>
      </div>
    </main>
  </div>
</div></div>
```

## Page scroll

By default the shell is the viewport and only its content area scrolls; the chrome never moves. Add `dd-app-shell--page` and the document scrolls instead: the shell grows with its content, the side nav and the top bar stick to the top of the window, and the off-canvas nav is fixed to the window. Anchors, find-in-page, the back button’s scroll position and `position: sticky` inside the content then behave as on any page — good for docs, settings and long reads.

This page is the live example. These docs run on `dd-app-shell dd-app-shell--page dd-app-shell--offcanvas-md`. Try it: scroll, and the side nav and the top bar stay. Narrow the window under 900px and open the menu: the nav slides in over the page, and the page behind it stays put until Esc, the scrim, a link or tabbing out closes it.

```html
<html>
  <body>
    <div class="dd-app-shell dd-app-shell--page dd-app-shell--offcanvas-md">
      <nav class="dd-side-nav" id="doc-nav" aria-label="Documentation">
        <div class="dd-side-nav__rail">…</div>
        <div class="dd-side-nav__panel" id="doc-nav-panel">…</div>
      </nav>
      <div class="dd-app-shell__main">
        <header class="dd-top-bar">
          <button class="dd-btn dd-btn--ghost dd-btn--icon dd-top-bar__nav-btn" type="button" data-dd-nav-open="#doc-nav" aria-controls="doc-nav" aria-expanded="false" aria-label="Open navigation">…</button>
          <a class="dd-top-bar__brand dd-top-bar__narrow" href="/">…</a>
          …
        </header>
        <main class="dd-app-shell__content">…</main>
      </div>
    </div>
  </body>
</html>
```

In page mode the shell paints no background of its own, so the page tone on `<html>` (with dusk’s grain) shows through, and cards keep their page hover. Give the document a `scroll-padding-top` a little taller than the top bar (these docs use 80px) so anchors land below it.

## Breakpoints

The shell is a size container named `dd-app-shell`: its side nav goes off-canvas when the shell is narrower than its breakpoint, whatever the window does. A custom property can’t drive a container query, so pick the width with a class.

| class / attribute | what it does |
|---|---|
| `.dd-app-shell` | Under 768px of shell width (the default). |
| `.dd-app-shell--offcanvas-md` | Under 900px. Tablets in portrait get the slide-in nav; these docs use it. |
| `.dd-app-shell--offcanvas-lg` | Under 1024px, for pages that need the room, such as wide data tables. |
| `.dd-side-nav--offcanvas` | On the nav: off-canvas at every width, also inside a shell. The top bar keeps its menu button. |

Your own rules can follow the same widths with `@container dd-app-shell (width < 900px) { … }` — these docs drop the nav’s view-transition name that way while it is off-canvas. The shell’s rules reach only its own side nav and top bar, so components in its content (examples, previews, a nested shell) keep theirs.

## Anatomy

The skeleton, without the contents. Wire the top bar’s menu button to the nav’s `id`; the nav’s collapsed state is remembered under that `id`.

```html
<div class="dd-app-shell">
  <nav class="dd-side-nav" id="app-nav" aria-label="Main">
    <div class="dd-side-nav__rail">…</div>
    <div class="dd-side-nav__panel" id="app-nav-panel">…</div>
  </nav>
  <div class="dd-app-shell__main">
    <header class="dd-top-bar">
      <button class="dd-btn dd-btn--ghost dd-btn--icon dd-top-bar__nav-btn" data-dd-nav-open="#app-nav" aria-label="Open navigation">…</button>
      …
    </header>
    <main class="dd-app-shell__content">
      <div class="dd-app-shell__page">
        <header class="dd-page-header">…</header>
        …
      </div>
    </main>
  </div>
</div>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-app-shell` | Flex row at `--dd-app-shell-h` (default `100dvh`) on a plain `--dd-bg`; only `__content` scrolls. A size container named `dd-app-shell`: below 768px the side nav goes off-canvas. Because the page has no grain here, cards inside keep dawn’s gentler hover lift in both themes. |
| `.dd-app-shell--page` | Page-scroll mode: the document scrolls, the shell is at least `100dvh` and grows with its content; the side nav and top bar stick, the off-canvas nav is fixed to the window. No background of its own. |
| `--offcanvas-md / --offcanvas-lg` | Move the off-canvas breakpoint to 900px / 1024px of shell width. See Breakpoints. |
| `.dd-app-shell > .dd-side-nav` | Fills the height (sticks, in page mode); no extra class needed. Add `dd-side-nav--offcanvas` to keep it off-canvas at every width. See Side nav. |
| `__main` | The column beside the nav: top bar, then content. |
| `__content` | The scrolling area (the page scrolls instead in page mode), padded 40px / 50px (less on narrow shells). |
| `__page` | Centres the page at up to 1180px with a 40px rhythm between blocks. `--narrow` for forms and settings (760px). |
| `--dd-app-shell-h` | Shell height in the default mode. Set it to fit a frame; for a page that scrolls as a whole, use `--page`. |

## Behaviour

| class / attribute | what it does |
|---|---|
| `data-dd-nav-toggle` | On the rail’s chevron: folds the panel; remembered per nav `id`. |
| `data-dd-nav-section="name"` | On a rail item: shows that section’s pane in the panel (see Side nav). |
| `data-dd-nav-open="#id"` | On the top bar’s menu button: opens the nav off-canvas on narrow shells. Esc, the scrim, a link or the chevron close it and return focus to the button; tabbing out (onto the button too) closes it. While it covers the window the page behind doesn’t scroll (`dd-side-nav-lock` on `<html>`). If the shell widens past the breakpoint while it is open, it closes and stays in view. |
| `data-dd-autoclose` | On the avatar menu: closes on outside click, Esc or choosing an item. |

## Guidelines

Do:
- Use one shell per app and keep it on every page, so the nav never jumps.
- Put the page’s title and main action in the page header, not the top bar.
- Let the content scroll and the chrome stay still.

Don't:
- Don’t nest a second side nav inside the content; use vertical tabs.
- Don’t centre content narrower than 760px on desktop unless it is a form.
- Don’t hide the menu button on phones — it is the only way to the nav.

