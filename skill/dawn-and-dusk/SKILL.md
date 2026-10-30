---
name: dawn-and-dusk
description: Build UI in the dawn & dusk design system (cxkw.dev) — warm greige neutrals, golden-hour accents, heavy lowercase Outfit headings, light "dawn" and dark "dusk" themes. Use whenever building or restyling a web page, app screen, dashboard, data table, form, landing page or component for cxkw.dev or any project that uses dawn & dusk, or when the user mentions "dawn & dusk", "dawn and dusk", "dd- classes" or their design system.
---

# dawn & dusk

dawn & dusk is plain CSS + a tiny vanilla JS layer. You build with semantic HTML, `dd-` classes and `--dd-*` tokens.
It works in any stack (static HTML, Astro, React/JSX — use `className`, Vue, Svelte). Two themes share every name:
**dawn** (light) and **dusk** (dark).

## 1. Install into the project

Copy the files from this skill's `assets/` folder into the project's static/public folder, then:

```html
<link rel="stylesheet" href="/dawn-and-dusk.css">          <!-- fonts, tokens, base, every component -->
<script src="/dawn-and-dusk.js" defer></script>            <!-- theme toggle, menus, dialogs, tables, toasts… -->
```

Icons are an SVG sprite (`assets/icons.svg`). Inline its contents once right after `<body>` (or server-include it), then:
`<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-bell"/></svg>`. Icon-only controls need `aria-label`.

Theme: `<html data-theme="dawn">` or `"dusk"`; omit it to follow the OS. Any `[data-dd-theme-toggle]` element flips it
(persisted). If the project already has the files, don't copy them again — check for `dawn-and-dusk.css` first.

## 2. Rules that make it look right

1. **Tokens only.** Never hard-code a colour, radius, font or duration. Use `var(--dd-…)` — see `references/tokens.md`.
2. **Tone, not lines.** Group with surface steps: page `--dd-bg` → container `--dd-surface` → inset `--dd-surface-2`
   → pressed `--dd-surface-3`. For hover / pressed fills use `--dd-wash` / `--dd-wash-strong` (translucent, visible on
   any background — in dusk the grain lifts the page to about `--dd-surface-2`, so a surface-2 hover on the page vanishes).
   No borders on cards, alerts or panels. Hairlines only in dense tables and dividers.
3. **Shadows only for floating layers** (menus, popovers, toasts, dialogs, drawers): `--dd-shadow-float`.
4. **One primary action per view** — `.dd-btn--primary` (Golden hour apricot, `--dd-primary`). Everything else is
   secondary, ghost, ink or link. `--dd-accent` (taupe/ink) is for selection, focus and links — not for buttons.
5. **Headings are the logo lockup**: `.dd-display/.dd-h1/.dd-h2/.dd-h3` (Outfit 800, lowercase, tight). Use them for page
   and section titles only; UI titles use `.dd-h4/.dd-h5` (sentence case). Write headings in lowercase on purpose.
6. **Body is Figtree**; UI chrome runs at `--dd-fs-sm`. **Data is DM Mono**: IDs, timestamps, figures (`.dd-mono`,
   `.dd-num` for tabular numerals). Right-align numeric table columns. Text steps `--dd-text` → `--dd-muted` →
   `--dd-quiet` (hints, group labels, kbd); `--dd-faint` is for placeholders and decoration, never text people must read.
7. **Status = meaning, set = category.** `--dd-ok/warn/bad/info` (+`-soft`) for state, always paired with an icon or word.
   `--dd-set-1…8` (honey, amber, apricot, terracotta, rose, wine, ochre, sand) for chips, avatars, tags and chart series,
   used in order.
8. **Space in 5px units**: `calc(var(--dd-u) * N)` or `--dd-space-N`. Sections breathe (60–80px); panels don't.
9. **Dusk is first-class.** Don't special-case colours per theme — tokens already switch. In dusk, status-tinted blocks
   are solid (no border); the system handles it.
10. **Motion is gentle**: `--dd-dur` / `--dd-dur-fast` with `--dd-ease`. Move a few pixels, fade, never bounce.

## 3. Find the right component

`references/components.md` lists every component, its classes and its `data-dd-*` behaviours. Before writing custom CSS,
search it — the system covers app shells, side nav, top bar, tabs, breadcrumbs, steppers, buttons, menus, command palette,
every form control (tucked-label inputs, combobox, date picker, file upload), tables and dense data tables (sort, select,
expand, pagination), stats, charts, progress, code/JSON/log viewers, timelines, alerts, banners, toasts, tooltips,
popovers, badges, chips, avatars, empty states, skeletons, dialogs, drawers, cards and accordions.

Live examples with copyable HTML for each: `https://cxkw-dev.github.io/dawn-and-dusk/components/<name>`.
Page recipes (dashboard, data explorer, settings, landing): `references/patterns.md`.

## 4. Behaviour (dawn-and-dusk.js)

Behaviour is opt-in through `data-dd-*` attributes, so plain HTML works without extra code. Examples: `data-dd-menu`,
`data-dd-tabs`, `data-dd-dialog-open="#id"`, `data-dd-tooltip="…"`, `data-dd-dismiss`, `data-dd-copy`,
`data-dd-nav-toggle`, `data-dd-command` (⌘K), and the `data-dd-data-table-*` hooks for sort, select, expand and filter.
`references/components.md` lists every attribute per component. For imperative use there is a small global API:
`dd.toast({ title, description, intent, action })`, `dd.dialog`, `dd.tabs`, `dd.popover`, `dd.chip`, `dd.dismiss`,
`dd.guide`, `dd.jsonViewer(el, data)`. Components emit bubbling events such as `dd:change`, `dd:tabchange`,
`dd:command`, `dd-select`, `dd-date` and `dd:dismiss`.
In frameworks (React, Vue…), render the same markup and let the script's delegated listeners handle it. Don't
re-implement these behaviours.

## 5. Writing new UI

- Compose existing components first. If you must add CSS, put it in the project's own stylesheet, prefix classes with the
  project's name (not `dd-`), and build it from tokens following the rules above.
- Keep markup semantic: real `<button>`, `<a>`, `<table>`, `<dialog>`, labels tied to inputs.
- Check both themes before you finish (toggle `data-theme`), and a narrow (≈375px) width.
- Content voice: short lowercase headlines ("ship at dusk", "the lab"), plain verbs on buttons, no exclamation marks.
