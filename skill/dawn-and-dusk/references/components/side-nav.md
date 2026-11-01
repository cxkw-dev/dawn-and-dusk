# side nav — `side-nav`

The app’s main navigation: an icon rail for sections and a panel with that section’s pages. It runs the full height of the viewport and folds down to the rail with the chevron at its foot.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/side-nav

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### Two-level

Sections in the rail, pages in the panel. Try it: press another rail icon to switch the panel; press the active one, or the chevron, to fold it; follow a page link to make it current. Hover the rail for labels. Shown in a 560px frame — in an app it is 100dvh.

```html
<div class="sn-frame">
  <nav class="dd-side-nav dd-side-nav--fill" id="nav-demo" aria-label="Main">
  <div class="dd-side-nav__rail">
    <a class="dd-side-nav__logo dd-logo-tile" href="#" aria-label="dawn &amp; dusk — home">d&amp;</a>
    <button class="dd-side-nav__item is-active" type="button" aria-current="true" data-dd-nav-section="projects" data-label="Projects" aria-label="Projects"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-folder"/></svg></button>
    <button class="dd-side-nav__item" type="button" data-dd-nav-section="deploys" data-label="Deploys" aria-label="Deploys"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-cloud"/></svg></button>
    <button class="dd-side-nav__item" type="button" data-dd-nav-section="logs" data-label="Logs" aria-label="Logs"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-terminal"/></svg></button>
    <a class="dd-side-nav__item" href="#" data-label="Analytics" aria-label="Analytics"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chart"/></svg></a>
    <span class="dd-side-nav__spacer"></span>
    <a class="dd-side-nav__item" href="#" data-label="Inbox · 3 new" aria-label="Inbox · 3 new"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-bell"/></svg><span class="dd-side-nav__dot"></span></a>
    <a class="dd-side-nav__item" href="#" data-label="Settings" aria-label="Settings"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-settings"/></svg></a>
    <span class="dd-side-nav__sep"></span>
    <button class="dd-side-nav__item dd-side-nav__collapse" type="button" data-dd-nav-toggle aria-controls="nav-demo-panel" aria-expanded="true" aria-label="Collapse navigation" data-label="Collapse"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-left"/></svg></button>
  </div>
    <div class="dd-side-nav__panel" id="nav-demo-panel">
    <div class="dd-side-nav__pane" data-dd-nav-pane="projects">
      <div class="dd-side-nav__head"><span class="dd-side-nav__title">projects</span><span class="dd-side-nav__count">14</span></div>
      <p class="dd-side-nav__section">Pinned</p>
      <a class="dd-side-nav__link" href="#" aria-current="page"><span class="dd-side-nav__label">dawn-and-dusk</span><span class="dd-side-nav__count">24</span></a>
      <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__label">dockey-ui</span><span class="dd-side-nav__count">9</span></a>
      <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__label">insomnia</span><span class="dd-side-nav__badge dd-side-nav__badge--new">NEW</span></a>
      <p class="dd-side-nav__section">All projects</p>
      <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__label">ai-focus</span><span class="dd-side-nav__badge dd-side-nav__badge--solid">3</span></a>
      <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__label">leetnode</span><span class="dd-side-nav__count">41</span></a>
      <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__label">cxkw.dev</span><span class="dd-side-nav__count">118</span></a>
      <a class="dd-side-nav__link" href="#"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-archive"/></svg><span class="dd-side-nav__label">Archive</span></a>
      <div class="dd-side-nav__foot">
        <div class="dd-side-nav__note"><span><b>Hobby plan</b> · 7 of 10 projects</span><span class="dd-side-nav__meter"><i style="width:70%"></i></span></div>
      </div>
    </div>
    <div class="dd-side-nav__pane" data-dd-nav-pane="deploys" hidden>
      <div class="dd-side-nav__head"><span class="dd-side-nav__title">deploys</span><span class="dd-side-nav__count">312</span></div>
      <p class="dd-side-nav__section">Environments</p>
      <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__dot dd-side-nav__dot--ok"></span><span class="dd-side-nav__label">Production</span><span class="dd-side-nav__count">fra1</span></a>
      <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__dot dd-side-nav__dot--warn"></span><span class="dd-side-nav__label">Staging</span><span class="dd-side-nav__count">iad1</span></a>
      <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__dot dd-side-nav__dot--idle"></span><span class="dd-side-nav__label">Previews</span><span class="dd-side-nav__count">12</span></a>
      <p class="dd-side-nav__section">Recent</p>
      <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__label dd-mono">dpl_8f3a2c</span><span class="dd-side-nav__count">4m</span></a>
      <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__label dd-mono">dpl_71be09</span><span class="dd-side-nav__badge">failed</span></a>
      <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__label dd-mono">dpl_5c40d1</span><span class="dd-side-nav__count">2h</span></a>
    </div>
    <div class="dd-side-nav__pane" data-dd-nav-pane="logs" hidden>
      <div class="dd-side-nav__head"><span class="dd-side-nav__title">logs</span></div>
      <p class="dd-side-nav__section">Streams</p>
      <a class="dd-side-nav__link" href="#"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-server"/></svg><span class="dd-side-nav__label">auth-gateway</span></a>
      <a class="dd-side-nav__link" href="#"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-server"/></svg><span class="dd-side-nav__label">billing-worker</span><span class="dd-side-nav__badge dd-side-nav__badge--solid">12</span></a>
      <a class="dd-side-nav__link" href="#"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-globe"/></svg><span class="dd-side-nav__label">edge-cache</span></a>
      <p class="dd-side-nav__section">Saved queries</p>
      <a class="dd-side-nav__link" href="#"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-bookmark"/></svg><span class="dd-side-nav__label">5xx in the last hour</span></a>
      <a class="dd-side-nav__link" href="#"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-bookmark"/></svg><span class="dd-side-nav__label">Slow checkouts</span></a>
    </div>
    </div>
  </nav>
  <div class="sn-page">
    <p class="dd-eyebrow">projects</p>
    <h3 class="dd-h2">dawn-and-dusk</h3>
    <p class="dd-small dd-muted">Try the chevron at the foot of the rail, or press the folder icon again. Other rail icons switch the panel.</p>
    <div class="sn-ph"><i></i><i></i><i></i></div>
  </div>
</div>
```

## Collapsed

Folded, only the rail remains: 60px of icons with ink tooltips. The choice is remembered per nav `id` in `localStorage`, so it survives reloads and page changes. Add `is-collapsed` in the markup to start folded. Try it: hover or tab through the rail for its labels, unfold it with the chevron, then reload the page.

Try the chevron at the foot of the rail, or press the folder icon again. Other rail icons switch the panel.

```html
<div class="sn-frame">
  <nav class="dd-side-nav dd-side-nav--fill is-collapsed" id="nav-demo-collapsed" aria-label="Main">
  <div class="dd-side-nav__rail">
    <a class="dd-side-nav__logo dd-logo-tile" href="#" aria-label="dawn &amp; dusk — home">d&amp;</a>
    <button class="dd-side-nav__item is-active" type="button" aria-current="true" data-dd-nav-section="projects" data-label="Projects" aria-label="Projects"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-folder"/></svg></button>
    <button class="dd-side-nav__item" type="button" data-dd-nav-section="deploys" data-label="Deploys" aria-label="Deploys"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-cloud"/></svg></button>
    <button class="dd-side-nav__item" type="button" data-dd-nav-section="logs" data-label="Logs" aria-label="Logs"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-terminal"/></svg></button>
    <a class="dd-side-nav__item" href="#" data-label="Analytics" aria-label="Analytics"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chart"/></svg></a>
    <span class="dd-side-nav__spacer"></span>
    <a class="dd-side-nav__item" href="#" data-label="Inbox · 3 new" aria-label="Inbox · 3 new"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-bell"/></svg><span class="dd-side-nav__dot"></span></a>
    <a class="dd-side-nav__item" href="#" data-label="Settings" aria-label="Settings"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-settings"/></svg></a>
    <span class="dd-side-nav__sep"></span>
    <button class="dd-side-nav__item dd-side-nav__collapse" type="button" data-dd-nav-toggle aria-controls="nav-demo-collapsed-panel" aria-expanded="false" aria-label="Expand navigation" data-label="Expand"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-left"/></svg></button>
  </div>
    <div class="dd-side-nav__panel" id="nav-demo-collapsed-panel">
    <div class="dd-side-nav__pane" data-dd-nav-pane="projects">
      <div class="dd-side-nav__head"><span class="dd-side-nav__title">projects</span><span class="dd-side-nav__count">14</span></div>
      <p class="dd-side-nav__section">Pinned</p>
      <a class="dd-side-nav__link" href="#" aria-current="page"><span class="dd-side-nav__label">dawn-and-dusk</span><span class="dd-side-nav__count">24</span></a>
      <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__label">dockey-ui</span><span class="dd-side-nav__count">9</span></a>
      <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__label">insomnia</span><span class="dd-side-nav__badge dd-side-nav__badge--new">NEW</span></a>
      <p class="dd-side-nav__section">All projects</p>
      <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__label">ai-focus</span><span class="dd-side-nav__badge dd-side-nav__badge--solid">3</span></a>
      <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__label">leetnode</span><span class="dd-side-nav__count">41</span></a>
      <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__label">cxkw.dev</span><span class="dd-side-nav__count">118</span></a>
      <a class="dd-side-nav__link" href="#"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-archive"/></svg><span class="dd-side-nav__label">Archive</span></a>
      <div class="dd-side-nav__foot">
        <div class="dd-side-nav__note"><span><b>Hobby plan</b> · 7 of 10 projects</span><span class="dd-side-nav__meter"><i style="width:70%"></i></span></div>
      </div>
    </div>
    <div class="dd-side-nav__pane" data-dd-nav-pane="deploys" hidden>
      <div class="dd-side-nav__head"><span class="dd-side-nav__title">deploys</span><span class="dd-side-nav__count">312</span></div>
      <p class="dd-side-nav__section">Environments</p>
      <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__dot dd-side-nav__dot--ok"></span><span class="dd-side-nav__label">Production</span><span class="dd-side-nav__count">fra1</span></a>
      <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__dot dd-side-nav__dot--warn"></span><span class="dd-side-nav__label">Staging</span><span class="dd-side-nav__count">iad1</span></a>
      <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__dot dd-side-nav__dot--idle"></span><span class="dd-side-nav__label">Previews</span><span class="dd-side-nav__count">12</span></a>
      <p class="dd-side-nav__section">Recent</p>
      <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__label dd-mono">dpl_8f3a2c</span><span class="dd-side-nav__count">4m</span></a>
      <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__label dd-mono">dpl_71be09</span><span class="dd-side-nav__badge">failed</span></a>
      <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__label dd-mono">dpl_5c40d1</span><span class="dd-side-nav__count">2h</span></a>
    </div>
    <div class="dd-side-nav__pane" data-dd-nav-pane="logs" hidden>
      <div class="dd-side-nav__head"><span class="dd-side-nav__title">logs</span></div>
      <p class="dd-side-nav__section">Streams</p>
      <a class="dd-side-nav__link" href="#"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-server"/></svg><span class="dd-side-nav__label">auth-gateway</span></a>
      <a class="dd-side-nav__link" href="#"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-server"/></svg><span class="dd-side-nav__label">billing-worker</span><span class="dd-side-nav__badge dd-side-nav__badge--solid">12</span></a>
      <a class="dd-side-nav__link" href="#"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-globe"/></svg><span class="dd-side-nav__label">edge-cache</span></a>
      <p class="dd-side-nav__section">Saved queries</p>
      <a class="dd-side-nav__link" href="#"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-bookmark"/></svg><span class="dd-side-nav__label">5xx in the last hour</span></a>
      <a class="dd-side-nav__link" href="#"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-bookmark"/></svg><span class="dd-side-nav__label">Slow checkouts</span></a>
    </div>
    </div>
  </nav>
  <div class="sn-page">
    <p class="dd-eyebrow">projects</p>
    <h3 class="dd-h2">dawn-and-dusk</h3>
    <p class="dd-small dd-muted">Try the chevron at the foot of the rail, or press the folder icon again. Other rail icons switch the panel.</p>
    <div class="sn-ph"><i></i><i></i><i></i></div>
  </div>
</div>
```

## Groups, counts and status

Inside the panel, section headings in mono caps divide the list, native `<details>` make collapsible groups, and the right edge carries a count, a badge or a status dot. The active page is in ink on a deeper tone. Try it: open billing-worker and pick one of its pages.

```html
<div class="sn-frame">
  <nav class="dd-side-nav dd-side-nav--fill" id="nav-demo-groups" aria-label="Services">
  <div class="dd-side-nav__rail">
    <a class="dd-side-nav__logo dd-logo-tile" href="#" aria-label="dawn &amp; dusk — home">d&amp;</a>
    <a class="dd-side-nav__item" href="#" data-label="Projects" aria-label="Projects"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-folder"/></svg></a>
    <a class="dd-side-nav__item" href="#" data-label="Deploys" aria-label="Deploys"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-cloud"/></svg></a>
    <a class="dd-side-nav__item" href="#" data-label="Logs" aria-label="Logs"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-terminal"/></svg></a>
    <a class="dd-side-nav__item" href="#" data-label="Analytics" aria-label="Analytics"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chart"/></svg></a>
    <span class="dd-side-nav__spacer"></span>
    <a class="dd-side-nav__item" href="#" data-label="Inbox · 3 new" aria-label="Inbox · 3 new"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-bell"/></svg><span class="dd-side-nav__dot"></span></a>
    <a class="dd-side-nav__item" href="#" data-label="Settings" aria-label="Settings"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-settings"/></svg></a>
    <span class="dd-side-nav__sep"></span>
    <button class="dd-side-nav__item dd-side-nav__collapse" type="button" data-dd-nav-toggle aria-controls="nav-demo-groups-panel" aria-expanded="true" aria-label="Collapse navigation" data-label="Collapse"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-left"/></svg></button>
  </div>
    <div class="dd-side-nav__panel" id="nav-demo-groups-panel">
      <div class="dd-side-nav__pane">
        <div class="dd-side-nav__head"><span class="dd-side-nav__title">services</span><span class="dd-side-nav__count">6</span></div>
        <p class="dd-side-nav__section">Production</p>
        <details class="dd-side-nav__group" open>
          <summary class="dd-side-nav__link"><span class="dd-side-nav__dot dd-side-nav__dot--ok"></span><span class="dd-side-nav__label">auth-gateway</span><span class="dd-side-nav__chev"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></span></summary>
          <div class="dd-side-nav__sub">
            <a class="dd-side-nav__link" href="#">Overview</a>
            <a class="dd-side-nav__link" href="#" aria-current="page"><span class="dd-side-nav__label">Deploys</span><span class="dd-side-nav__count">32</span></a>
            <a class="dd-side-nav__link" href="#">Logs</a>
            <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__label">Env vars</span><span class="dd-side-nav__count">18</span></a>
          </div>
        </details>
        <details class="dd-side-nav__group">
          <summary class="dd-side-nav__link"><span class="dd-side-nav__dot dd-side-nav__dot--bad"></span><span class="dd-side-nav__label">billing-worker</span><span class="dd-side-nav__chev"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></span></summary>
          <div class="dd-side-nav__sub">
            <a class="dd-side-nav__link" href="#">Overview</a>
            <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__label">Jobs</span><span class="dd-side-nav__badge dd-side-nav__badge--solid">12</span></a>
            <a class="dd-side-nav__link" href="#">Logs</a>
          </div>
        </details>
        <details class="dd-side-nav__group">
          <summary class="dd-side-nav__link"><span class="dd-side-nav__dot dd-side-nav__dot--ok"></span><span class="dd-side-nav__label">edge-cache</span><span class="dd-side-nav__chev"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></span></summary>
          <div class="dd-side-nav__sub">
            <a class="dd-side-nav__link" href="#">Overview</a>
            <a class="dd-side-nav__link" href="#">Purge rules</a>
          </div>
        </details>
        <p class="dd-side-nav__section">Staging</p>
        <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__dot dd-side-nav__dot--warn"></span><span class="dd-side-nav__label">auth-gateway</span><span class="dd-side-nav__count">iad1</span></a>
        <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__dot dd-side-nav__dot--idle"></span><span class="dd-side-nav__label">search-indexer</span><span class="dd-side-nav__badge dd-side-nav__badge--new">NEW</span></a>
      </div>
    </div>
  </nav>
  <div class="sn-page"><p class="dd-eyebrow">auth-gateway</p><h3 class="dd-h2">deploys</h3><div class="sn-ph"><i></i><i></i><i></i></div></div>
</div>
```

## Mobile · off-canvas

On small screens the whole nav slides in from the left over a scrim, opened by the top bar’s menu button (`data-dd-nav-open`). Esc, the scrim, the chevron, a link or tabbing out closes it; while it covers the window, the page behind doesn’t scroll. Inside an app shell this happens below the shell’s breakpoint (768px, or 900 / 1024px); on its own, or to keep it off-canvas at every width (also inside a shell), add `dd-side-nav--offcanvas`. It is fixed to the window, or, as here, to a frame that contains it. Shown open — try it: tap the scrim to close it, then the menu button to bring it back; press Esc or follow a link.

```html
<div class="sn-frame sn-frame--phone">
  <header class="dd-top-bar">
    <button class="dd-btn dd-btn--ghost dd-btn--icon dd-top-bar__nav-btn" type="button" data-dd-nav-open="#nav-demo-mobile" aria-controls="nav-demo-mobile" aria-expanded="true" aria-label="Open navigation"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-menu"/></svg></button>
    <a class="dd-top-bar__brand" href="#"><span class="dd-logo dd-logo--sm">dawn &amp; dusk</span></a>
  </header>
  <nav class="dd-side-nav dd-side-nav--offcanvas is-mobile-open" id="nav-demo-mobile" aria-label="Main">
  <div class="dd-side-nav__rail">
    <a class="dd-side-nav__logo dd-logo-tile" href="#" aria-label="dawn &amp; dusk — home">d&amp;</a>
    <button class="dd-side-nav__item is-active" type="button" aria-current="true" data-dd-nav-section="projects" data-label="Projects" aria-label="Projects"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-folder"/></svg></button>
    <button class="dd-side-nav__item" type="button" data-dd-nav-section="deploys" data-label="Deploys" aria-label="Deploys"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-cloud"/></svg></button>
    <button class="dd-side-nav__item" type="button" data-dd-nav-section="logs" data-label="Logs" aria-label="Logs"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-terminal"/></svg></button>
    <a class="dd-side-nav__item" href="#" data-label="Analytics" aria-label="Analytics"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chart"/></svg></a>
    <span class="dd-side-nav__spacer"></span>
    <a class="dd-side-nav__item" href="#" data-label="Inbox · 3 new" aria-label="Inbox · 3 new"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-bell"/></svg><span class="dd-side-nav__dot"></span></a>
    <a class="dd-side-nav__item" href="#" data-label="Settings" aria-label="Settings"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-settings"/></svg></a>
    <span class="dd-side-nav__sep"></span>
    <button class="dd-side-nav__item dd-side-nav__collapse" type="button" data-dd-nav-toggle aria-controls="nav-demo-mobile-panel" aria-expanded="true" aria-label="Collapse navigation" data-label="Collapse"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-left"/></svg></button>
  </div>
    <div class="dd-side-nav__panel" id="nav-demo-mobile-panel">
    <div class="dd-side-nav__pane" data-dd-nav-pane="projects">
      <div class="dd-side-nav__head"><span class="dd-side-nav__title">projects</span><span class="dd-side-nav__count">14</span></div>
      <p class="dd-side-nav__section">Pinned</p>
      <a class="dd-side-nav__link" href="#" aria-current="page"><span class="dd-side-nav__label">dawn-and-dusk</span><span class="dd-side-nav__count">24</span></a>
      <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__label">dockey-ui</span><span class="dd-side-nav__count">9</span></a>
      <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__label">insomnia</span><span class="dd-side-nav__badge dd-side-nav__badge--new">NEW</span></a>
      <p class="dd-side-nav__section">All projects</p>
      <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__label">ai-focus</span><span class="dd-side-nav__badge dd-side-nav__badge--solid">3</span></a>
      <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__label">leetnode</span><span class="dd-side-nav__count">41</span></a>
      <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__label">cxkw.dev</span><span class="dd-side-nav__count">118</span></a>
      <a class="dd-side-nav__link" href="#"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-archive"/></svg><span class="dd-side-nav__label">Archive</span></a>
      <div class="dd-side-nav__foot">
        <div class="dd-side-nav__note"><span><b>Hobby plan</b> · 7 of 10 projects</span><span class="dd-side-nav__meter"><i style="width:70%"></i></span></div>
      </div>
    </div>
    <div class="dd-side-nav__pane" data-dd-nav-pane="deploys" hidden>
      <div class="dd-side-nav__head"><span class="dd-side-nav__title">deploys</span><span class="dd-side-nav__count">312</span></div>
      <p class="dd-side-nav__section">Environments</p>
      <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__dot dd-side-nav__dot--ok"></span><span class="dd-side-nav__label">Production</span><span class="dd-side-nav__count">fra1</span></a>
      <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__dot dd-side-nav__dot--warn"></span><span class="dd-side-nav__label">Staging</span><span class="dd-side-nav__count">iad1</span></a>
      <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__dot dd-side-nav__dot--idle"></span><span class="dd-side-nav__label">Previews</span><span class="dd-side-nav__count">12</span></a>
      <p class="dd-side-nav__section">Recent</p>
      <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__label dd-mono">dpl_8f3a2c</span><span class="dd-side-nav__count">4m</span></a>
      <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__label dd-mono">dpl_71be09</span><span class="dd-side-nav__badge">failed</span></a>
      <a class="dd-side-nav__link" href="#"><span class="dd-side-nav__label dd-mono">dpl_5c40d1</span><span class="dd-side-nav__count">2h</span></a>
    </div>
    <div class="dd-side-nav__pane" data-dd-nav-pane="logs" hidden>
      <div class="dd-side-nav__head"><span class="dd-side-nav__title">logs</span></div>
      <p class="dd-side-nav__section">Streams</p>
      <a class="dd-side-nav__link" href="#"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-server"/></svg><span class="dd-side-nav__label">auth-gateway</span></a>
      <a class="dd-side-nav__link" href="#"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-server"/></svg><span class="dd-side-nav__label">billing-worker</span><span class="dd-side-nav__badge dd-side-nav__badge--solid">12</span></a>
      <a class="dd-side-nav__link" href="#"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-globe"/></svg><span class="dd-side-nav__label">edge-cache</span></a>
      <p class="dd-side-nav__section">Saved queries</p>
      <a class="dd-side-nav__link" href="#"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-bookmark"/></svg><span class="dd-side-nav__label">5xx in the last hour</span></a>
      <a class="dd-side-nav__link" href="#"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-bookmark"/></svg><span class="dd-side-nav__label">Slow checkouts</span></a>
    </div>
    </div>
  </nav>
  <div class="sn-page"><h3 class="dd-h3">dawn-and-dusk</h3><div class="sn-ph"><i></i><i></i></div></div>
</div>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-side-nav` | The nav. Sticky and `100dvh` tall on its own. Give it an `id` to persist the collapsed state. |
| `.dd-side-nav--fill` | Fill the parent’s height instead of the viewport (automatic inside `.dd-app-shell`). |
| `.dd-side-nav--offcanvas` | Always off-canvas, also inside an app shell (it wins over the shell’s breakpoint); opens with `.is-mobile-open`. |
| `.is-collapsed` | Panel folded away; only the rail shows. |
| `__rail` | Level one: `__logo` (a `.dd-logo-tile`), `__item` icon buttons or links, `__spacer`, `__sep`, `__collapse`. |
| `__item[data-label]` | Tooltip text for a rail icon. Also set `aria-label`. |
| `__panel / __pane` | Level two. One `__pane` per section, marked `data-dd-nav-pane`; inactive panes are `hidden`. |
| `__head / __title` | Pane heading in the lockup, with an optional `__count`. |
| `__section` | Mono caps heading inside a pane. |
| `__link` | A page link. Active with `aria-current="page"` or `.is-active` (ink on a 10% wash); hover is a lighter 4% wash, so it never reads as current. Wrap text in `__label` so it truncates. |
| `__count / __badge / __dot` | Right-edge meta: mono count; pill badge (`--new`, `--solid`); dot (`--ok / --warn / --bad / --idle`). A dot or badge inside a rail `__item` pins to its corner. |
| `__group / __sub / __chev` | A `<details>` group: the `<summary>` is a `__link`, the children sit in `__sub`. |
| `__foot / __note / __meter` | Bottom of a pane: a tonal note with a usage meter. |
| `--dd-side-nav-rail / -panel` | Column widths: 60px and 224px. |

## Behaviour

| class / attribute | what it does |
|---|---|
| `data-dd-nav-toggle` | Folds / unfolds the panel of its nav (or of the nav in its value, e.g. `"#app-nav"`). Keeps `aria-expanded` in sync, and swaps the default English label and tooltip (a label of your own is left as written); persists to `localStorage` under `dd-side-nav:<id>`. |
| `data-dd-nav-section="name"` | On a rail item: shows `[data-dd-nav-pane="name"]` and unfolds the panel. Pressing the active item again folds or unfolds it. |
| `data-dd-nav-open="#id"` | Opens an off-canvas nav (the top bar’s menu button). Focus moves to the current page link (or the first rail item). |
| `data-dd-nav-close` | Closes the off-canvas nav it sits in. |
| `Esc · scrim · link · Tab out` | Close the off-canvas nav. After Esc, the scrim (mouse or touch), a link or the chevron, focus returns to the menu button. Tabbing out — past its last link, before its first, or onto the menu button — closes it and focus stays where it went. |
| `html.dd-side-nav-lock` | Set while an open off-canvas nav covers the window: the page behind doesn’t scroll (the page’s scrollbar gutter stays reserved, so nothing shifts). A nav fixed to a frame (a demo, a frame-mode shell) doesn’t lock the page. |
| `Resize` | If an open nav stops being off-canvas (the window widens past the breakpoint), it closes and stays in view. |

## Guidelines

Do:
- Keep the rail to five or six sections; settings and inbox go to the foot.
- Give every rail icon a `data-label` and an `aria-label`.
- Use counts for quantities, a solid badge only when something needs attention.

Don't:
- Don’t nest more than one level of groups inside the panel.
- Don’t put primary actions in the nav — they belong in the page header.
- Don’t colour active items with primary; active is ink on a deeper tone.

