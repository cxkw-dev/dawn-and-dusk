# Using dawn & dusk in React, Vue, Svelte, Next.js, Astro…

The system is plain CSS + a small delegated script, so it works in any framework: render the documented markup
(`components/<name>.md`) with your framework's syntax. This file covers what is different from static HTML.

## Contents
- [Load it once](#load-it-once)
- [Markup in JSX](#markup-in-jsx)
- [Which behaviours to keep, which to own](#which-behaviours-to-keep-which-to-own)
- [Theme without a flash (SSR)](#theme-without-a-flash-ssr)
- [Next to Tailwind (or during a migration off it)](#next-to-tailwind-or-during-a-migration-off-it)

## Load it once

Copy `assets/dawn-and-dusk.css`, `assets/dawn-and-dusk.js` and `assets/icons.svg` into the app's public/static folder, then
in the root layout (`app/layout.tsx`, `index.html`, `+layout.svelte`, `Layout.astro`…):

```html
<link rel="stylesheet" href="/dawn-and-dusk.css">
<script src="/dawn-and-dusk.js" defer></script>
```

Or import the CSS from your bundler (`import './dawn-and-dusk.css'`). Load the script once, at the root — its listeners are
delegated from `document`, so components rendered later (routes, portals, lists) work without re-initialising anything.

**Icons.** Served over http(s), reference the sprite file directly — no inlining needed:

```jsx
export const Icon = ({ name, label }) => (
  <svg className="dd-icon" aria-hidden={label ? undefined : true} role={label ? 'img' : undefined} aria-label={label}>
    <use href={`/icons.svg#dd-i-${name}`} />
  </svg>
);
```

(A page opened straight from disk — `file://` — can't reference an external sprite; there, inline the sprite once after
`<body>`.) Icon names: `tokens.md` → Icons. Never invent one.

## Markup in JSX

- `class` → `className`, `for` → `htmlFor`, `tabindex` → `tabIndex`, `aria-*` / `data-*` stay as they are.
- Self-close void elements (`<input />`). Boolean HTML attributes become props (`disabled`, `hidden`, `open`).
- Keep the docs' structure exactly (wrapper → part → part); only change text, values and which variant class you add.
- Drive state classes and ARIA from props/state: `className={`dd-btn dd-btn--primary${saving ? ' is-loading' : ''}`}`,
  `aria-invalid={!!errors.email}`, `aria-describedby={errors.email ? 'email-error' : undefined}`.
- Error messages are `.dd-field__error` with the `error` icon, rendered by you when there is an error.
- A switch (`.dd-switch`) is for a setting that **applies at once**; a checkbox (`.dd-checkbox`) is for a choice that is
  **saved with the form**. A form with a Save button uses checkboxes.

## Which behaviours to keep, which to own

`dawn-and-dusk.js` only touches elements that carry its `data-dd-*` hook. Some behaviours just open, close, focus or
announce things — keep those. Others rewrite content or values that React (or Vue…) renders — in a framework, own that
state yourself, render the same markup, and leave the hook off. The classes still style it.

| keep the `data-dd-*` behaviour | own it in your framework (leave the hook off) |
|---|---|
| theme toggle, dialog / drawer / sheet (`data-dd-dialog-open`, or call `el.showModal()`), menu (`data-dd-menu`), popover, tooltip (`data-dd-tooltip`), toast (`dd.toast()` from an effect or handler), copy, dismiss of static banners, side nav fold / off-canvas, tabs and segmented control when uncontrolled, autoclose dropdowns, guide cue, button busy guard | form validation (`data-dd-validate`), character counters (`data-dd-counter`), chips and chip inputs, combobox and select listboxes, date picker / calendar, data-table sort / select / filter / pagination, json viewer, log viewer, file list, `data-dd-check-all`, `data-dd-clear` / `data-dd-step` on controlled inputs |

Why: those behaviours write text, insert or reorder nodes, or set `.value` / `.checked` directly — React then holds a stale
virtual DOM and either fights the change or crashes on the next render. If you need one of them on a page React doesn't
re-render (a static island), it's fine.

If you keep tabs or a segmented control controlled from state, render `aria-selected` / `aria-checked` yourself and
listen to clicks; otherwise let the behaviour own them and listen for `dd:tabchange` / `dd:change`.

## Theme without a flash (SSR)

`<html data-theme>` decides the theme; with no attribute the OS decides. Put this inline in `<head>`, before the CSS
paints, so a saved choice never flashes the other theme:

```html
<script>try{var t=localStorage.getItem('dd-theme');if(t==='dawn'||t==='dusk')document.documentElement.dataset.theme=t}catch(e){}</script>
```

In Next.js add `suppressHydrationWarning` to `<html>` (the attribute is set before hydration). A toggle is any element with
`data-dd-theme-toggle`; it persists the choice to `localStorage['dd-theme']`.

## Next to Tailwind (or during a migration off it)

- **Preflight overrides the system's base.** The base styles use `:where()` (zero specificity) so apps can override them —
  which also means Tailwind's preflight wins (fonts, headings, buttons). Turn preflight off while both are loaded
  (v3: `corePlugins: { preflight: false }`; v4: import `tailwindcss/theme` and `tailwindcss/utilities`, not `preflight`), or
  load `dawn-and-dusk.css` after Tailwind's base layer.
- **Don't mix on one element.** A `dd-` component class and a Tailwind colour/spacing utility on the same element fight by
  load order. Use the system's classes for components; keep utilities for layout glue only, if at all.
- **Dark mode.** Tailwind's `dark:` should follow the system's attribute, not a `.dark` class —
  v3: `darkMode: ['selector', '[data-theme="dusk"]']`; v4: `@custom-variant dark (&:where([data-theme=dusk], [data-theme=dusk] *));`.
- **Colours and spacing.** Map any remaining utilities to tokens (`bg-[var(--dd-surface)]`, `p-[calc(var(--dd-u)*4)]`)
  rather than Tailwind's palette, so dawn / dusk keeps working.
