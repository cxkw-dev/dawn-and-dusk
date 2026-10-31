# page header — `page-header`

The top of a view: where you are, what this is, what you can do here, and the views inside it. Title in the heading lockup, actions on the right, tabs underneath.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/page-header

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### Full

Breadcrumbs, title and actions on one row, then the description, meta facts and tabs. Actions wrap under the title when space runs out. Try it: press an action, or a tab — here a tab only moves aria-current; in an app it is a link to that view.

```html
<header class="dd-page-header">
  <nav class="dd-breadcrumbs dd-breadcrumbs--sm" aria-label="Breadcrumb">
    <ol class="dd-breadcrumbs__list">
      <li class="dd-breadcrumbs__item"><a class="dd-breadcrumbs__link" href="#"><span>cxkw</span></a></li>
      <li class="dd-breadcrumbs__item"><a class="dd-breadcrumbs__link" href="#"><span>services</span></a></li>
      <li class="dd-breadcrumbs__item"><a class="dd-breadcrumbs__link" aria-current="page"><span>auth-gateway</span></a></li>
    </ol>
  </nav>
  <div class="dd-page-header__row">
    <div class="dd-page-header__titles">
      <h1 class="dd-page-header__title">auth-gateway</h1>
    </div>
    <div class="dd-page-header__actions">
      <button class="dd-btn dd-btn--ghost" type="button"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-external"/></svg><span>Visit</span></button>
      <button class="dd-btn dd-btn--secondary" type="button"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-refresh"/></svg><span>Redeploy</span></button>
      <button class="dd-btn dd-btn--primary" type="button"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-upload"/></svg><span>Promote</span></button>
    </div>
  </div>
  <p class="dd-page-header__desc">Issues and verifies session tokens for every cxkw.dev app. Deployed from <code>main</code> on each merge.</p>
  <ul class="dd-page-header__meta">
    <li><span class="dd-page-header__status"></span>Healthy</li>
    <li><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-globe"/></svg><b>fra1 · iad1 · sin1</b></li>
    <li><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-clock"/></svg>Deployed <b>4m ago</b></li>
    <li><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-code"/></svg><b>a1c9e07</b></li>
  </ul>
  <nav aria-label="Service">
    <div class="dd-tabs__list">
      <a class="dd-tabs__tab" href="#" aria-current="page">Overview</a>
      <a class="dd-tabs__tab" href="#">Deploys <span class="dd-tabs__count">32</span></a>
      <a class="dd-tabs__tab" href="#">Logs</a>
      <a class="dd-tabs__tab" href="#">Metrics</a>
      <a class="dd-tabs__tab" href="#">Env vars <span class="dd-tabs__count">18</span></a>
      <a class="dd-tabs__tab" href="#">Settings</a>
    </div>
  </nav>
</header>
```

## Title and actions

Most index pages only need a title, one line of description and the main action.

```html
<header class="dd-page-header">
  <div class="dd-page-header__row">
    <div class="dd-page-header__titles">
      <h1 class="dd-page-header__title">projects</h1>
      <p class="dd-page-header__desc">Everything you have shipped from cxkw.dev, newest first.</p>
    </div>
    <div class="dd-page-header__actions">
      <button class="dd-btn dd-btn--secondary" type="button"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-download"/></svg><span>Import</span></button>
      <button class="dd-btn dd-btn--primary" type="button"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-plus"/></svg><span>New project</span></button>
    </div>
  </div>
</header>
```

## Detail page

For a single object: a back link instead of breadcrumbs, a mono eyebrow, the ID as the title and a status in the meta row. `--sm` steps the title down.

Try it: the copy button puts the deploy ID on the clipboard.

```html
<header class="dd-page-header dd-page-header--sm">
  <a class="dd-page-header__back" href="#"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-left"/></svg><span>All deploys</span></a>
  <div class="dd-page-header__row">
    <div class="dd-page-header__titles">
      <p class="dd-page-header__eyebrow">Deploy · production</p>
      <h1 class="dd-page-header__title dd-page-header__title--mono">dpl_71be09</h1>
      <ul class="dd-page-header__meta">
        <li><span class="dd-page-header__status dd-page-header__status--bad"></span>Failed at <b>build</b></li>
        <li><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-server"/></svg>billing-worker</li>
        <li><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-clock"/></svg><b>2m 14s</b></li>
      </ul>
    </div>
    <div class="dd-page-header__actions">
      <button class="dd-btn dd-btn--secondary dd-btn--icon" type="button" aria-label="Copy deploy ID" data-dd-copy="dpl_71be09" data-dd-toast="Copied dpl_71be09" data-dd-toast-intent="ok"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-copy"/></svg></button>
      <button class="dd-btn dd-btn--secondary" type="button"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-terminal"/></svg><span>Open logs</span></button>
      <button class="dd-btn dd-btn--primary" type="button"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-refresh"/></svg><span>Retry</span></button>
    </div>
  </div>
</header>
```

## Large, with a mark

For top-level areas: `--lg` title with a tonal icon mark, and pill tabs as filters underneath.

```html
<header class="dd-page-header dd-page-header--lg">
  <div class="dd-page-header__row">
    <div class="dd-page-header__titles">
      <h1 class="dd-page-header__title"><span class="dd-page-header__mark"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-globe"/></svg></span>edge-cache</h1>
      <p class="dd-page-header__desc">The CDN in front of every static asset. 97.2% hit rate today.</p>
    </div>
    <div class="dd-page-header__actions">
      <button class="dd-btn dd-btn--danger" type="button"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-trash"/></svg><span>Purge all</span></button>
    </div>
  </div>
  <div class="dd-tabs dd-tabs--pill">
    <div class="dd-tabs__list">
      <a class="dd-tabs__tab" href="#" aria-current="page">All regions</a>
      <a class="dd-tabs__tab" href="#">Europe</a>
      <a class="dd-tabs__tab" href="#">Americas</a>
      <a class="dd-tabs__tab" href="#">Asia–Pacific</a>
    </div>
  </div>
</header>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-page-header` | The `<header>`. Children stack: breadcrumbs or back link, the row, description and meta, then tabs. |
| `__row` | Titles on the left, actions on the right; wraps. |
| `__titles` | Column for eyebrow and title (and a short description). Long descriptions and meta can sit below the row instead. |
| `__eyebrow` | Mono caps label above the title. |
| `__back` | A “← All deploys” link in place of breadcrumbs. |
| `__title` | The heading lockup: Outfit 800, lowercase, tight. Holds an optional `__mark`. |
| `__title--mono` | For IDs and hashes: mono, normal case. |
| `__mark` | A tonal square with an icon, sized to the title. |
| `__desc` | One or two lines of muted description. |
| `__meta` | A list of small facts; `<b>` values are set in mono. |
| `__status (--warn, --bad)` | Status dot for the meta row; green by default. |
| `__actions` | Buttons. One primary at most. |
| `--sm / --lg` | Title at 2xl / 4xl (default 3xl); every size steps down one on screens under 600px. `--sm` also shrinks the description. |

## Guidelines

Do:
- Name the page what the side nav calls it.
- Put the most common action last and make it primary.
- Use tabs underneath for views of this object; use pills for filters.

Don't:
- Don’t repeat the title in the first line of the description.
- Don’t put more than three actions in the header; move the rest to a “more” menu.
- Don’t use the header for alerts — use a banner above it.

