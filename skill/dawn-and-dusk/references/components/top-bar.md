# top bar — `top-bar`

The app header: logo and context on the left, then a search trigger, actions and the avatar menu. It sits on the page tone with a hairline underneath and stays put while the page scrolls.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/top-bar

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### App header

Logo, workspace / project switcher, search, Docs, notifications, the primary action and the avatar menu. Try it: click the avatar, or focus it and press ↓; the other buttons say what they would do.

```html
<header class="dd-top-bar">
  <button class="dd-btn dd-btn--ghost dd-btn--icon dd-top-bar__nav-btn" type="button" aria-label="Open navigation"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-menu"/></svg></button>
  <a class="dd-top-bar__brand" href="#"><span class="dd-logo">dawn &amp; dusk</span></a>
  <div class="dd-top-bar__context">
    <span class="dd-top-bar__sep"></span>
    <button class="dd-top-bar__switch dd-top-bar__wide" type="button"><span class="dd-top-bar__mark">cx</span><span>cxkw</span></button>
    <span class="dd-faint dd-top-bar__wide">/</span>
    <button class="dd-top-bar__switch" type="button"><span>auth-gateway</span><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-sort"/></svg></button>
  </div>
  <button class="dd-top-bar__search" type="button" aria-label="Search"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-search"/></svg><span>Search…</span><kbd class="dd-top-bar__kbd">⌘K</kbd></button>
  <div class="dd-top-bar__actions">
    <a class="dd-btn dd-btn--ghost dd-btn--sm dd-top-bar__wide" href="#"><span>Docs</span></a>
    <button class="dd-btn dd-btn--ghost dd-btn--icon dd-top-bar__icon-btn" type="button" aria-label="Notifications, 3 new"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-bell"/></svg><span class="dd-top-bar__dot"></span></button>
    <button class="dd-btn dd-btn--primary dd-btn--sm dd-top-bar__wide" type="button"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-upload"/></svg><span>Deploy</span></button>
    <details class="dd-top-bar__user" data-dd-autoclose>
      <summary aria-label="Account menu"><span class="dd-top-bar__avatar">cx</span></summary>
      <div class="dd-top-bar__menu">
        <div class="dd-top-bar__menu-head"><b>cxkw</b><span>hello@cxkw.dev</span></div>
        <div class="dd-top-bar__menu-sep"></div>
        <a class="dd-top-bar__menu-item" href="#"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-user"/></svg>Profile</a>
        <a class="dd-top-bar__menu-item" href="#"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-settings"/></svg>Settings<span class="dd-top-bar__kbd">⌘,</span></a>
        <button class="dd-top-bar__menu-item" type="button" data-dd-theme-toggle><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-moon"/></svg>Toggle dusk</button>
        <a class="dd-top-bar__menu-item" href="#"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-key"/></svg>Access tokens</a>
        <div class="dd-top-bar__menu-sep"></div>
        <a class="dd-top-bar__menu-item" href="#"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-logout"/></svg>Sign out</a>
      </div>
    </details>
  </div>
</header>
```

## Avatar menu

A `<details data-dd-autoclose>`: it closes on a click outside, on Esc or after choosing an item, and ↓ ↑ move through the items. Your name and email sit at the top, the email in mono. Shown open; click anywhere else to close it, then the avatar to bring it back.

```html
<div style="padding-bottom: 300px">
<header class="dd-top-bar">
  <button class="dd-btn dd-btn--ghost dd-btn--icon dd-top-bar__nav-btn" type="button" aria-label="Open navigation"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-menu"/></svg></button>
  <a class="dd-top-bar__brand" href="#"><span class="dd-logo">dawn &amp; dusk</span></a>
  <div class="dd-top-bar__context">
    <span class="dd-top-bar__sep"></span>
    <button class="dd-top-bar__switch dd-top-bar__wide" type="button"><span class="dd-top-bar__mark">cx</span><span>cxkw</span></button>
    <span class="dd-faint dd-top-bar__wide">/</span>
    <button class="dd-top-bar__switch" type="button"><span>auth-gateway</span><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-sort"/></svg></button>
  </div>
  <button class="dd-top-bar__search" type="button" aria-label="Search"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-search"/></svg><span>Search…</span><kbd class="dd-top-bar__kbd">⌘K</kbd></button>
  <div class="dd-top-bar__actions">
    <a class="dd-btn dd-btn--ghost dd-btn--sm dd-top-bar__wide" href="#"><span>Docs</span></a>
    <button class="dd-btn dd-btn--ghost dd-btn--icon dd-top-bar__icon-btn" type="button" aria-label="Notifications, 3 new"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-bell"/></svg><span class="dd-top-bar__dot"></span></button>
    <button class="dd-btn dd-btn--primary dd-btn--sm dd-top-bar__wide" type="button"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-upload"/></svg><span>Deploy</span></button>
    <details class="dd-top-bar__user" data-dd-autoclose open>
      <summary aria-label="Account menu"><span class="dd-top-bar__avatar">cx</span></summary>
      <div class="dd-top-bar__menu">
        <div class="dd-top-bar__menu-head"><b>cxkw</b><span>hello@cxkw.dev</span></div>
        <div class="dd-top-bar__menu-sep"></div>
        <a class="dd-top-bar__menu-item" href="#"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-user"/></svg>Profile</a>
        <a class="dd-top-bar__menu-item" href="#"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-settings"/></svg>Settings<span class="dd-top-bar__kbd">⌘,</span></a>
        <button class="dd-top-bar__menu-item" type="button" data-dd-theme-toggle><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-moon"/></svg>Toggle dusk</button>
        <a class="dd-top-bar__menu-item" href="#"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-key"/></svg>Access tokens</a>
        <div class="dd-top-bar__menu-sep"></div>
        <a class="dd-top-bar__menu-item" href="#"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-logout"/></svg>Sign out</a>
      </div>
    </details>
  </div>
</header></div>
```

## Narrow

Below 640px of its own width the menu button appears (wire it to the side nav with `data-dd-nav-open="#app-nav"`), the search collapses to an icon, and the context, the links and anything marked `dd-top-bar__wide` step out. In an app shell the shell decides instead: the menu button and `__narrow` show while its side nav is off-canvas, and the context stays while the nav is in view. Only the shell’s own top bar follows it — top bars inside its content, like these examples, keep their own width rules.

```html
<div class="tb-phone">
<header class="dd-top-bar">
  <button class="dd-btn dd-btn--ghost dd-btn--icon dd-top-bar__nav-btn" type="button" aria-label="Open navigation"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-menu"/></svg></button>
  <a class="dd-top-bar__brand" href="#"><span class="dd-logo">dawn &amp; dusk</span></a>
  <div class="dd-top-bar__context">
    <span class="dd-top-bar__sep"></span>
    <button class="dd-top-bar__switch dd-top-bar__wide" type="button"><span class="dd-top-bar__mark">cx</span><span>cxkw</span></button>
    <span class="dd-faint dd-top-bar__wide">/</span>
    <button class="dd-top-bar__switch" type="button"><span>auth-gateway</span><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-sort"/></svg></button>
  </div>
  <button class="dd-top-bar__search" type="button" aria-label="Search"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-search"/></svg><span>Search…</span><kbd class="dd-top-bar__kbd">⌘K</kbd></button>
  <div class="dd-top-bar__actions">
    <a class="dd-btn dd-btn--ghost dd-btn--sm dd-top-bar__wide" href="#"><span>Docs</span></a>
    <button class="dd-btn dd-btn--ghost dd-btn--icon dd-top-bar__icon-btn" type="button" aria-label="Notifications, 3 new"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-bell"/></svg><span class="dd-top-bar__dot"></span></button>
    <button class="dd-btn dd-btn--primary dd-btn--sm dd-top-bar__wide" type="button"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-upload"/></svg><span>Deploy</span></button>
    <details class="dd-top-bar__user" data-dd-autoclose>
      <summary aria-label="Account menu"><span class="dd-top-bar__avatar">cx</span></summary>
      <div class="dd-top-bar__menu">
        <div class="dd-top-bar__menu-head"><b>cxkw</b><span>hello@cxkw.dev</span></div>
        <div class="dd-top-bar__menu-sep"></div>
        <a class="dd-top-bar__menu-item" href="#"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-user"/></svg>Profile</a>
        <a class="dd-top-bar__menu-item" href="#"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-settings"/></svg>Settings<span class="dd-top-bar__kbd">⌘,</span></a>
        <button class="dd-top-bar__menu-item" type="button" data-dd-theme-toggle><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-moon"/></svg>Toggle dusk</button>
        <a class="dd-top-bar__menu-item" href="#"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-key"/></svg>Access tokens</a>
        <div class="dd-top-bar__menu-sep"></div>
        <a class="dd-top-bar__menu-item" href="#"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-logout"/></svg>Sign out</a>
      </div>
    </details>
  </div>
</header></div>
```

## Site header

For docs and marketing pages: links instead of a context switcher. On narrow screens the links fold into the menu button — here a menu (`data-dd-menu`) with the same links; a sheet or the side nav work too.

```html
<header class="dd-top-bar">
  <button class="dd-btn dd-btn--ghost dd-btn--icon dd-top-bar__nav-btn" type="button" data-dd-menu="tb-site-menu" aria-haspopup="menu" aria-expanded="false" aria-controls="tb-site-menu" aria-label="Open menu"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-menu"/></svg></button>
  <div class="dd-menu" id="tb-site-menu" role="menu" aria-label="Sections" hidden>
    <a class="dd-menu__item" role="menuitem" href="#">Components</a>
    <a class="dd-menu__item" role="menuitem" href="#">Guides</a>
    <a class="dd-menu__item" role="menuitem" href="#">Changelog</a>
  </div>
  <a class="dd-top-bar__brand" href="#"><span class="dd-logo">dawn &amp; dusk</span></a>
  <nav aria-label="Sections">
    <ul class="dd-top-bar__links">
      <li><a class="dd-top-bar__link" href="#" aria-current="page">Components</a></li>
      <li><a class="dd-top-bar__link" href="#">Guides</a></li>
      <li><a class="dd-top-bar__link" href="#">Changelog</a></li>
    </ul>
  </nav>
  <div class="dd-top-bar__actions">
    <button class="dd-btn dd-btn--ghost dd-btn--icon" type="button" aria-label="Search"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-search"/></svg></button>
    <a class="dd-btn dd-btn--ghost dd-btn--icon dd-top-bar__wide" href="#" aria-label="GitHub"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-code"/></svg></a>
    <button class="dd-btn dd-btn--secondary dd-btn--sm dd-top-bar__wide" type="button" data-dd-theme-toggle><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-moon"/></svg><span>Dusk</span></button>
    <button class="dd-btn dd-btn--ghost dd-btn--icon dd-top-bar__narrow" type="button" data-dd-theme-toggle aria-label="Toggle dusk"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-moon"/></svg></button>
  </div>
</header>
```

Narrow. Try it: open the menu button and pick a section with ↓ ↑ and Enter, or flip dusk from the moon.

```html
<div class="tb-phone tb-phone--short">
<header class="dd-top-bar">
  <button class="dd-btn dd-btn--ghost dd-btn--icon dd-top-bar__nav-btn" type="button" data-dd-menu="tb-site-menu-narrow" aria-haspopup="menu" aria-expanded="false" aria-controls="tb-site-menu-narrow" aria-label="Open menu"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-menu"/></svg></button>
  <div class="dd-menu" id="tb-site-menu-narrow" role="menu" aria-label="Sections" hidden>
    <a class="dd-menu__item" role="menuitem" href="#">Components</a>
    <a class="dd-menu__item" role="menuitem" href="#">Guides</a>
    <a class="dd-menu__item" role="menuitem" href="#">Changelog</a>
  </div>
  <a class="dd-top-bar__brand" href="#"><span class="dd-logo">dawn &amp; dusk</span></a>
  <nav aria-label="Sections">
    <ul class="dd-top-bar__links">
      <li><a class="dd-top-bar__link" href="#" aria-current="page">Components</a></li>
      <li><a class="dd-top-bar__link" href="#">Guides</a></li>
      <li><a class="dd-top-bar__link" href="#">Changelog</a></li>
    </ul>
  </nav>
  <div class="dd-top-bar__actions">
    <button class="dd-btn dd-btn--ghost dd-btn--icon" type="button" aria-label="Search"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-search"/></svg></button>
    <a class="dd-btn dd-btn--ghost dd-btn--icon dd-top-bar__wide" href="#" aria-label="GitHub"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-code"/></svg></a>
    <button class="dd-btn dd-btn--secondary dd-btn--sm dd-top-bar__wide" type="button" data-dd-theme-toggle><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-moon"/></svg><span>Dusk</span></button>
    <button class="dd-btn dd-btn--ghost dd-btn--icon dd-top-bar__narrow" type="button" data-dd-theme-toggle aria-label="Toggle dusk"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-moon"/></svg></button>
  </div>
</header></div>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-top-bar` | The `<header>`. Sticky, 60px min height, translucent page tone with a hairline. A size container: it adapts to its own width. |
| `__inner` | Optional wrapper for the bar’s contents: a flex row with the bar’s gap that fills the bar. |
| `__nav-btn` | Mobile menu button (a ghost icon `.dd-btn`). Hidden until the bar is narrow. |
| `__brand` | Logo link. Holds a `.dd-logo` or a `.dd-logo-tile`. |
| `__context / __sep / __switch / __mark` | Workspace and project after the logo: a hairline, switch buttons, a small coloured mark. |
| `__links / __link` | Section links for site headers; active with `aria-current="page"`. |
| `__search / __kbd` | Search trigger styled like a field, with a shortcut hint. Pair it with the command palette. |
| `__actions` | Right-hand group: icon buttons, the primary action, the avatar. |
| `__icon-btn / __dot` | An icon button with an unread dot. |
| `__user / __avatar / __menu` | Avatar menu: `<details>`, the initials disc, the floating menu. |
| `__menu-head / __menu-item / __menu-sep` | Menu parts: who you are, items (links or buttons), hairline separators. |
| `__wide / __narrow` | `__wide` hides an element when the bar is narrow; `__narrow` shows one only then (a compact stand-in, such as an icon-only theme button). In an app shell, `__narrow` follows the side nav: shown while it is off-canvas. |

## Behaviour

| class / attribute | what it does |
|---|---|
| `data-dd-nav-open="#id"` | On `__nav-btn`: opens that side nav off-canvas (see Side nav). |
| `data-dd-menu="id"` | On `__nav-btn` in a site header: opens a menu of the section links. |
| `data-dd-autoclose` | On `__user`: outside click, Esc and choosing an item close the menu. |
| `data-dd-theme-toggle` | On a button or menu item: flips dawn / dusk and keeps `aria-pressed` in sync. |
| `↓ / ↑ · Esc` | Open and move through the avatar menu; Esc closes it and returns focus to the avatar. |

## Guidelines

Do:
- Keep one primary action in the bar, if any — usually the thing people do most (Deploy, New).
- Show where you are next to the logo: workspace / project.
- Use the same initials and colour for the avatar everywhere.

Don't:
- Don’t repeat the side nav’s sections as top bar links in an app.
- Don’t put more than three icon buttons before the avatar.
- Don’t hide search on mobile — collapse it to an icon.

