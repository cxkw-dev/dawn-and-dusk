# Using dawn & dusk in React, Vue, Svelte, Next.js, Astro…

The system is plain CSS + a small delegated script, so it works in any framework: render the documented markup
(`components/<name>.md`) with your framework's syntax. This file covers what is different from static HTML.

## Recommended: the consumer package

Start at https://cxkw-dev.github.io/dawn-and-dusk/getting-started for the versioned install command and HTML, React, and Next.js starters. No repository clone or npm account is needed.

Import `dawn-and-dusk/styles.css` once. React apps can import `Button`, `Input`, `Card`, `Badge`, `Icon`, and `ThemeToggle` from `dawn-and-dusk/react`; these support native props and refs and need no DOM runtime. For server-rendered layouts, `ThemeScript` from `dawn-and-dusk/theme` restores the saved theme before hydration.

For HTML-owned markup, optionally import `dawn-and-dusk/auto` for interactions and automatic icons. Do not apply DOM-mutating widgets to React-owned markup. Complex widgets still use their documented HTML APIs.

The manual asset setup below is available when a package does not fit your project.

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

Or import the CSS from your bundler (`import './dawn-and-dusk.css'`). Load the script once, at the root — some listeners are
delegated from `document`, but widgets with initialization-time setup require their markup to be present when the script runs. Do not assume every widget supports dynamically inserted markup.

**Icons.** Served over http(s), reference the sprite file directly — no inlining needed:

```jsx
export const Icon = ({ name, label }) => (
  <svg className="dd-icon" aria-hidden={label ? undefined : true} role={label ? 'img' : undefined} aria-label={label}>
    <use href={`/icons.svg#dd-i-${name}`} />
  </svg>
);
```

Also tell the script where the sprite is, once, because a few behaviours insert icons themselves (toasts, validation
errors, chips): `window.dd = Object.assign(window.dd || {}, { iconSprite: '/icons.svg' })`. A page opened straight from
disk (`file://`) can't reference an external sprite; there, inline the sprite once after `<body>`. Icon names: `tokens.md`
→ Icons. Never invent one.

**Side effects to know about:** the stylesheet sets the root font size (17px) and loads its fonts from Google Fonts with
an `@import`. During a migration, rem-based sizes on screens you haven't moved yet grow slightly. Under a strict
Content-Security-Policy or offline, self-host the fonts and drop the `@import`.

## Markup in JSX

- `class` → `className`, `for` → `htmlFor`, `tabindex` → `tabIndex`, `aria-*` / `data-*` stay as they are.
- Self-close void elements (`<input />`). Boolean HTML attributes become props (`disabled`, `hidden`, `open`).
- Keep the docs' structure exactly (wrapper → part → part); only change text, values and which variant class you add.
- Drive state classes and ARIA from props/state: `className={`dd-btn dd-btn--primary${saving ? ' is-loading' : ''}`}`,
  `aria-invalid={!!errors.email}`, `aria-describedby={errors.email ? 'email-error' : undefined}`.
- Error messages are `.dd-field__error` with the `error` icon, rendered by you when there is an error. When your code
  validates, put `noValidate` on the form (so the browser doesn't show its own bubbles first) and keep `required` for
  assistive tech.
- Busy submit: add `is-loading` and `aria-busy="true"` to the button and render a `.dd-btn__spinner` (see
  `components/button.md`). The script then blocks repeat clicks and Enter; keep `disabled` too if you want the guard
  without the script.
- A form is not a card: forms sit on the page in `.dd-form` sections (see `components/form-layout.md`). A form that is the
  page uses a `.dd-page-header`; a form inside a larger page titles its sections with `.dd-form__title`.
- A switch (`.dd-switch`) is for a setting that **applies at once**; a checkbox (`.dd-checkbox`) is for a choice that is
  **saved with the form**. A form with a Save button uses checkboxes.

## Which behaviours to keep, which to own

Most of `dawn-and-dusk.js` only acts on elements that carry its `data-dd-*` hook. Some behaviours just open, close,
focus or announce things; keep those. Others rewrite content or values that React (or Vue…) renders. In a framework,
own that state yourself, render the same markup and leave the hook off; the classes still style it.

Two behaviours run on class names alone, so leaving a hook off isn't enough:
- the character counter updates every `.dd-field__counter`. For a counter you render, add `data-dd-counter="manual"`.
- chip remove and the chip input act on `.dd-chip__remove` / `.dd-chip-input`. Chips you render from state go inside an
  element with `data-dd-manual`, and you handle their clicks.

`data-dd-manual` on any ancestor keeps those behaviours away from everything inside it.

| keep the `data-dd-*` behaviour | own it in your framework (leave the hook off) |
|---|---|
| theme toggle, dialog / drawer / sheet (`data-dd-dialog-open`, or call `el.showModal()`), menu (`data-dd-menu`), popover, tooltip (`data-dd-tooltip`), toast (`dd.toast()` from an effect or handler), copy, dismiss of static banners, side nav fold / off-canvas, tabs and segmented control when uncontrolled, autoclose dropdowns, guide cue, button busy guard | form validation (`data-dd-validate`), character counters (render the text, `data-dd-counter="manual"`), chips and chip inputs (inside `data-dd-manual`), combobox and select listboxes, date picker / calendar, data-table sort / select / filter / pagination, json viewer, log viewer, file list, `data-dd-check-all`, `data-dd-clear` / `data-dd-step` on controlled inputs |

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

- **Preflight vs the system's base.** The base styles use `:where()` (zero specificity) so apps can override them.
  - **Tailwind v3** outputs preflight as ordinary CSS, so it beats the base (fonts, headings, buttons) whatever the load
    order. Turn it off while both are loaded: `corePlugins: { preflight: false }`.
  - **Tailwind v4** puts preflight in a native `@layer base`. Unlayered CSS like `dawn-and-dusk.css` beats any layer, so
    the system's base already wins. The same rule means Tailwind utilities can't override a `dd-` component, which is
    what you want. If you'd rather drop preflight entirely, import `tailwindcss/theme` and `tailwindcss/utilities`.
- **Don't mix on one element.** A `dd-` component class and a Tailwind colour/spacing utility on the same element fight by
  load order. Use the system's classes for components; keep utilities for layout glue only, if at all.
- **Dark mode.** Tailwind's `dark:` should follow the system's attribute, not a `.dark` class:
  v3: `darkMode: ['selector', '[data-theme="dusk"]']`; v4: `@custom-variant dark (&:where([data-theme=dusk], [data-theme=dusk] *));`.
  With no saved choice the system follows the OS without setting the attribute, so Tailwind wouldn't know. While both
  live side by side, have the head script always set it:
  `var t=localStorage.getItem('dd-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dusk':'dawn');document.documentElement.dataset.theme=t`.
- **Colours and spacing.** Map any remaining utilities to tokens (`bg-[var(--dd-surface)]`, `p-[calc(var(--dd-u)*4)]`)
  rather than Tailwind's palette, so dawn / dusk keeps working.
