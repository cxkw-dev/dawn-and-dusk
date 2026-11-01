---
name: dawn-and-dusk
description: Build UI in the dawn & dusk design system (cxkw.dev) — warm greige neutrals, golden-hour accents, heavy lowercase Outfit headings, light "dawn" and dark "dusk" themes, plain CSS classes (dd-*) plus a small JS layer. Use it only in projects that already use dawn & dusk (they load dawn-and-dusk.css or dawn-and-dusk/tailwind.css, or use dd- classes) or when the user asks for dawn & dusk by name — then use it for any page, app screen, dashboard, admin panel, data table, form, settings, landing or pricing page or single component, in static HTML, React, Next.js, Vue, Svelte or Astro, with Tailwind CSS v4 utilities, or when moving a Tailwind UI onto it. Never apply it to other projects (e.g. client work with its own design language), even if they need UI.
---

# dawn & dusk

dawn & dusk is plain CSS + a small JS layer: semantic HTML, `dd-` classes and `--dd-*` tokens. Two themes share
every name — **dawn** (light) and **dusk** (dark) — so anything built from the tokens works in both.

The system is complete: 59 components with tested markup. Your job is mostly to **compose** them. Copying the documented
markup is what makes the result look and behave right; invented structure is where things break.

## How to work

1. **Install** once (§1).
2. **Whole page?** Start from the closest recipe in `references/patterns.md` (dashboard, data explorer, settings, landing,
   pricing, board).
3. **Each component:** find it in `references/components-index.md`, open `references/components/<name>.md`, copy the
   closest example and change only text, data and variant classes. Keep the element structure exactly.
4. **Layout between components** goes in your own small stylesheet (§5), from tokens only.
5. **Check** your work (§6) before you finish.

## 1. Install

**An app with a package manager** (React, Next.js, Vite, Tailwind v4…): install the package from its GitHub release. It
is not on the npm registry, so `npm install dawn-and-dusk` fails; use this exact command:

```sh
npm install https://github.com/cxkw-dev/dawn-and-dusk/releases/download/v0.3.2/dawn-and-dusk-0.3.2.tgz
```

Then follow `references/frameworks.md` for the imports. If `package.json` already lists `dawn-and-dusk`, don't install
again.

**Static HTML, or no package manager:** copy three files from this skill's `assets/` into the project's static/public
folder: `dawn-and-dusk.css` (fonts, tokens, base, every component), `dawn-and-dusk.js` (all behaviours) and `icons.svg`
(the icon sprite). `tokens.css` is only for projects that want the tokens without the components. If the project already
has `dawn-and-dusk.css`, don't copy again.

```html
<html lang="en">                                   <!-- add data-theme="dawn" or "dusk" to force one; omit to follow the OS -->
<head>
  <script>try{var t=localStorage.getItem('dd-theme');if(t==='dawn'||t==='dusk')document.documentElement.dataset.theme=t}catch(e){}</script>
  <link rel="stylesheet" href="dawn-and-dusk.css">  <!-- path relative to the page, or /… from the site root -->
  <script src="dawn-and-dusk.js" defer></script>
</head>
<body>
  <!-- the contents of icons.svg, pasted once here, then: -->
  <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-bell"/></svg>
```

- The inline `<script>` applies a saved theme before the first paint, so dusk users never see a dawn flash.
- **Icons:** inlining the sprite works everywhere, including a page opened from disk. A site served over http can instead
  reference the file: `<use href="/icons.svg#dd-i-bell"/>`. Then also tell the script where the sprite is, because a few
  behaviours insert icons themselves (toasts, validation errors, chips):
  `<script>window.dd = Object.assign(window.dd || {}, { iconSprite: '/icons.svg' })</script>`. All icon names are listed in
  `references/tokens.md`; pick the closest, never invent one. Icon-only controls need `aria-label`.
- **Fonts** (Outfit, Figtree, DM Mono) load from Google Fonts through an `@import` at the top of `dawn-and-dusk.css`. Offline
  or under a strict Content-Security-Policy, self-host them and remove that line. The page then falls back to system fonts
  until they load.
- **Theme toggle:** any element with `data-dd-theme-toggle` flips dawn ↔ dusk and remembers it.
- **React, Next.js, Vue, Svelte, Astro, or Tailwind:** read `references/frameworks.md` first. Some behaviours must be
  owned by the framework. Tailwind v4 apps load `dawn-and-dusk/tailwind.css`, which turns the tokens into utilities
  (`bg-surface`, `text-muted`, `p-4` = 20px) and layers the components under them.

## 2. Rules that make it look right

1. **Tokens only** for colour, type, radius, shadow, motion and spacing: `var(--dd-…)`, never a hex, rgb() or px font size.
   Tokens are what switch between dawn and dusk; one literal colour breaks the other theme. Widths and max-widths may use
   rem/ch.
2. **Tone, not lines.** Group with surface steps: page `--dd-bg` → container `--dd-surface` → inset `--dd-surface-2` →
   pressed `--dd-surface-3`. Hover and pressed fills you add yourself use `--dd-wash` / `--dd-wash-strong`. Those are
   translucent, so they show on any background; in dusk the grain lifts the page to about `--dd-surface-2`, so a
   surface-2 hover would vanish. No borders on cards, alerts or panels; hairlines only in dense tables and dividers.
   A container that holds cards (board lanes, trays, grouped lists) uses `--dd-well`, with the cards in `--dd-well-card`:
   the card is the reading surface, lighter than the page in dawn and darker in dusk. `--dd-surface-3` is a pressed
   tone, never a large fill.
3. **Shadows only on floating layers**: menus, popovers, toasts, dialogs, drawers (`--dd-shadow-float`).
4. **One primary action per view**, meaning per screenful. `.dd-btn--primary` (Golden-hour apricot) is what the screen is
   for; everything else is secondary, ghost, ink or link. In a set of choices (plans, options), the recommended one
   carries the primary. A long page may repeat the same primary in a closing call to action. Never primary inside table
   rows.
5. **Headings are the logo lockup.** `.dd-display/.dd-h1/.dd-h2/.dd-h3` and dialog, drawer and sheet titles are Outfit
   800, lowercase and tight. The CSS lowercases them, but write the copy in lowercase anyway. Titles inside panels
   (cards, form sections, popovers, menus) use `.dd-h4/.dd-h5` in sentence case.
6. **Body is Figtree**; UI chrome runs at `--dd-fs-sm`. **Data is DM Mono**: IDs, hashes, timestamps and the figures in
   tables (`.dd-mono`; `.dd-num` adds tabular digits). Right-align numeric columns. Big display figures (stat values,
   prices) keep the font their component gives them. Text steps `--dd-text` → `--dd-muted` → `--dd-quiet`; `--dd-faint` is
   decoration only, never text.
7. **Status = meaning, set = category.** `--dd-ok/warn/bad/info` (+`-soft`) are for state, always with an icon or a word,
   never colour alone. `--dd-set-1…8` (honey, amber, apricot, terracotta, rose, wine, ochre, sand) are for categories:
   chips, tags and chart series, used in order. People (avatars) skip set-3 apricot, because apricot means "do this".
   Common states: active / healthy → ok, pending / invited / building → info, degraded / expiring → warn,
   failed / down / overdue → bad, suspended / archived / off → muted.
8. **Space in 5px units**: `calc(var(--dd-u) * N)` or `--dd-space-N`. Page sections breathe (60–100px); panels and
   tables stay tight.
9. **Dusk is first-class.** Don't special-case colours per theme; the tokens already switch. In dusk, status blocks are
   solid fills with no border; the components handle it.
10. **Motion is gentle**: `--dd-dur` / `--dd-dur-fast` with `--dd-ease`. Move a few pixels, fade, never bounce. Respect
    `prefers-reduced-motion`.
11. **Icons lead their label** (`[icon] New deploy`). Trailing icons are only ones that belong to the control: an arrow on
    a link or action that moves you forward ("Read the docs →"), a chevron that opens a menu or select, a sort indicator.
12. **Switch vs checkbox:** a switch applies a setting at once; a checkbox is a choice saved with a form. A form with a
    Save button uses checkboxes.
13. **Voice:** short lowercase headlines ("ship at dusk"), plain verbs on buttons, sentence-case UI text, no exclamation
    marks.

## 3. Where to look

| file | read it when |
|---|---|
| `references/components-index.md` | finding which component fits; components grouped by category |
| `references/components/<name>.md` | **writing markup**: the exact HTML of every working docs example, the class table, behaviour and do/don't |
| `references/components.md` | searching all components at once: what each is, its classes, related components, `data-dd-*` hooks, every behaviour |
| `references/tokens.md` | colours and other tokens, **base classes** (`.dd-h1…`, `.dd-lead`, `.dd-eyebrow`, `.dd-stack`, `.dd-row`, `.dd-mono`, `.dd-visually-hidden`…) and **every icon name** |
| `references/patterns.md` | building a whole page: dashboard, data explorer, settings, landing, pricing, board (kanban); shared page rules |
| `references/frameworks.md` | React, Next.js, Vue, Svelte or Astro; Tailwind v4 setup and token utilities; migrating from Tailwind; theme without a flash in SSR |

Live demos, every state: `https://cxkw-dev.github.io/dawn-and-dusk/components/<name>`. The reference files above already
hold their markup, so you don't need web access.

## 4. Behaviour (dawn-and-dusk.js)

Behaviour is opt-in through `data-dd-*` attributes on the documented markup. Most listeners are delegated from
`document`, but some widgets set themselves up when the script runs, so markup you insert later needs its init call:
`dd.jsonViewer.init()`, `dd.terminal.init(root)`, `dd.tabs.init()`, `dd.dataTable.refresh(table)`. Otherwise have the
markup in the page before the script runs (`defer` waits for the HTML); don't assume every widget picks up late markup.

Don't re-implement what it already does: menus (`data-dd-menu`), dialogs (`data-dd-dialog-open="#id"`), tabs
(`data-dd-tabs`), tooltips (`data-dd-tooltip="…"`), dismiss (`data-dd-dismiss`), copy (`data-dd-copy`), side-nav fold
(`data-dd-nav-toggle`), ⌘K palette (`data-dd-command`), form validation (`data-dd-validate`) and the
`data-dd-data-table` sort, select, expand and filter hooks. Character counters are automatic: every `.dd-field__counter`
in a `.dd-field` counts its control (limit from `maxlength`, or a soft one from `data-dd-counter="280"`); a counter your
own code renders needs `data-dd-counter="manual"`. Each component file lists its hooks.

**Loading:** the brand loader `.dd-loader dd-loader--sun` (the ampersand with a sun rising behind it) for a page or a
panel that waits; `.dd-spinner` for small inline busy states and buttons (`components/loader.md`, `spinner.md`).

Small global API: `dd.toast({ title, description, intent, action })`, `dd.dialog`, `dd.tabs.select(tab)` /
`dd.tabs.init()`, `dd.popover`, `dd.chip`, `dd.dismiss`, `dd.guide`, `dd.jsonViewer(el, data)` / `dd.jsonViewer.init()`,
`dd.dataTable.refresh(table)`, `dd.pagination(el, state)`, `dd.terminal(el)` / `dd.terminal.init(root)`,
`dd.menu.open(menu, trigger?, { focus })` / `dd.menu.close(menu?)` / `dd.menu.trigger(menu)`, and the
`dd.iconSprite` setting. Data tables refresh themselves when you add or remove rows (focus moves to the next row);
call `refresh` after editing a cell's value in place.
- **One menu shared by many rows** (one ⋯ menu for a whole table): listen for `dd:menuopen` on the menu;
  `event.detail.trigger` (also `menu.ddTrigger`) is the button that opened it, so `trigger.closest('tr')` is the row.
  A dialog opened from a menu item returns focus to that menu's trigger when it closes.
- **Validation messages per reason:** `data-dd-error-missing`, `-type`, `-pattern`, `-range`, `-length` on a control (then
  `data-dd-error`, then the browser's text); `setCustomValidity()` from your code wins.
- **Dense table height:** it caps at 70vh and scrolls inside by default. Set `--dd-data-table-height: none` to let the
  page scroll, or add `.dd-data-table--fill` to fill its parent (an app shell page).

Components emit bubbling events such as `dd:change`, `dd:tabchange`, `dd:command`, `dd:select`, `dd:date` and
`dd:dismiss`; listen for them instead of patching internals.

## 5. Your own CSS (page glue)

Compose existing components first. When you need layout between them (page width, grid columns, section rhythm, a
two-column split), write a small stylesheet:
- Prefix classes with the project's name (`tidepool-plans`, `app-grid`), never `dd-`.
- Glue may set `display`, grid/flex, `gap`, `padding`, `margin`, `max-width` and container queries, all from tokens. It may
  also size a page's hero heading with a type token and give a full-width page band a surface tone. That is page layout,
  not component styling.
- Don't restyle a component from glue (its colour, radius, font or states). If a component looks wrong, you probably
  have its markup wrong; re-check its file.
- A sticky top bar covers in-page anchor targets: give the targets `scroll-margin-top` (or `html { scroll-padding-top }`).
- Keep markup semantic: real `<button>`, `<a>`, `<table>`, `<dialog>`, labels tied to inputs.

## 6. Before you finish

- Every `dd-` class you used exists. Check it against `assets/dawn-and-dusk.css` (e.g. `grep -c "\.dd-name" …`), which
  includes the base classes listed in `tokens.md`.
- Every icon name is in the list in `tokens.md`.
- Your own CSS has no colour literals (hex, rgb(), hsl()).
- One primary action per screenful.
- It works in both themes (toggle `data-theme` on `<html>`), at about 375px wide, by keyboard, and with no console errors.
