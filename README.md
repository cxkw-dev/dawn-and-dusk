<p align="center">
  <a href="https://cxkw-dev.github.io/dawn-and-dusk/"><img src="site/public/og.png" width="100%"
    alt="dawn & dusk: warm neutrals, golden-hour colour and a heavy lowercase voice, with an agent skill so AI builds it right"></a>
</p>

# dawn & dusk

**One warm, quiet design system in two moods: dawn for the day, dusk for after sunset.**

dawn & dusk is the design system behind [cxkw.dev](https://cxkw-dev.github.io/ai-nhi/): warm greige neutrals,
golden-hour colour and heavy lowercase headlines, in a light theme (**dawn**) and a dark one (**dusk**). It's plain CSS
and a small vanilla JS layer with no dependencies and no build step, and it ships an **agent skill** so AI assistants
build with it correctly.

**Docs:** [cxkw-dev.github.io/dawn-and-dusk](https://cxkw-dev.github.io/dawn-and-dusk/) — every component live, in both
themes, with copyable markup.

## Contents

- [What's inside](#whats-inside)
- [Quick start](#quick-start)
- [The agent skill](#the-agent-skill)
- [Repository layout](#repository-layout)
- [Developing](#developing)
- [Design principles](#design-principles)
- [Credits](#credits)

## What's inside

| | |
|---|---|
| **Tokens** | Colours for dawn and dusk under one set of names, type, a 5px spacing unit, radius, tonal depth and motion, all as `--dd-*` custom properties |
| **59 components** | Actions, forms, data display, feedback, navigation, overlays and layout, including the data-heavy pieces: data table, charts, stats, code, JSON and log viewers, timeline, command palette, date picker |
| **Behaviours** | Opt-in scripts for menus, dialogs, tabs, form validation, sortable and filterable tables, toasts, tooltips and more. You switch them on with `data-dd-*` attributes; they're keyboard accessible and covered by headless browser tests |
| **Icons** | Solar Bold Duotone as one SVG sprite |
| **Agent skill** | `skill/dawn-and-dusk/`: a Claude skill with the rules, generated component and token references, page recipes and the release files |

Everything you need to use the system is in `release/`: `dawn-and-dusk.css`, `dawn-and-dusk.js`, `tokens.css`
(the tokens alone) and `icons.svg`.

## Quick start

1. Copy the files in `release/` into your site's static folder, by hand or with
   `npx degit cxkw-dev/dawn-and-dusk/release public/dd`.
2. Load them, and add the one-line theme script to `<head>` so a saved dusk choice never flashes dawn on load:

```html
<!doctype html>
<html lang="en">  <!-- data-theme="dawn" or "dusk" forces a theme; without it the OS decides -->
<head>
  <script>try{var t=localStorage.getItem('dd-theme');if(t==='dawn'||t==='dusk')document.documentElement.dataset.theme=t}catch(e){}</script>
  <link rel="stylesheet" href="/dd/dawn-and-dusk.css">
  <script src="/dd/dawn-and-dusk.js" defer></script>
</head>
<body>
  <!-- paste the contents of icons.svg here, once -->
  <h1 class="dd-h1">ship at dusk</h1>
  <button class="dd-btn dd-btn--primary" type="button">
    <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-plus"/></svg><span>New project</span>
  </button>
  <button class="dd-btn dd-btn--ghost" type="button" data-dd-theme-toggle>Switch theme</button>
</body>
</html>
```

3. Build with `dd-` classes. Every [component page](https://cxkw-dev.github.io/dawn-and-dusk/components/button) has live
   examples with a Copy HTML button.

- Any element with `data-dd-theme-toggle` flips dawn and dusk and remembers the choice.
- The fonts (Outfit, Figtree, DM Mono) load from Google Fonts through an `@import` at the top of the stylesheet. Offline
  or under a strict Content-Security-Policy, self-host them and remove that line.
- Served over http, you can reference the sprite instead of inlining it: `<use href="/dd/icons.svg#dd-i-bell"/>`. Then
  also set `window.dd = { iconSprite: '/dd/icons.svg' }` before the script, because a few behaviours insert icons
  themselves.
- React, Next.js, Vue, Svelte, Astro or Tailwind: read
  [`references/frameworks.md`](skill/dawn-and-dusk/references/frameworks.md) first.

## The agent skill

`skill/dawn-and-dusk/` is a [Claude skill](https://code.claude.com/docs/en/skills). Installed in a project,
it makes Claude build that project's UI from the system's components and tokens, following its rules, in both themes.

Install it **per project**, never in your global `~/.claude/skills`: projects with their own design language, such as
client work, shouldn't pick it up.

```bash
# from a clone of this repository
npm run skill:install -- ~/code/my-app     # → ~/code/my-app/.claude/skills/dawn-and-dusk

# or, without a clone, from inside the project
npx degit cxkw-dev/dawn-and-dusk/skill/dawn-and-dusk .claude/skills/dawn-and-dusk
```

Commit the folder so teammates get it too, and run the install again to update it.

| file | what it is |
|---|---|
| `SKILL.md` | When to use the system, how to install it in a project, and the rules that make it look right |
| `references/components/<name>.md` | The exact markup of every docs example, per component, **generated** from the built docs |
| `references/components.md` | Every component's classes, `data-dd-*` hooks and behaviours, **generated** from `ds/` |
| `references/tokens.md` | Every token with its dawn and dusk value, the base classes and every icon name, **generated** from `ds/` |
| `references/patterns.md` | Page recipes: dashboard, data explorer, settings, landing, pricing |
| `references/frameworks.md` | React, Next.js, Vue, Svelte and Astro; theming without a flash; living next to Tailwind |
| `assets/` | The release files, copied in at build time |

Agents without skill support (Cursor, Copilot, Codex…) can use a short `AGENTS.md` block instead: see the
[Agent skill](https://cxkw-dev.github.io/dawn-and-dusk/skill) page.

## Repository layout

```
ds/                        the design system source: the only place to edit styles and behaviour
  tokens.css               every --dd-* token, dawn and dusk
  fonts.css, base.css      webfonts; page, typography and helper classes
  components/*.css         one file per component (.dd-<name>, __part, --variant)
  behaviors/*.js           opt-in behaviour via data-dd-* attributes (plain scripts, no dependencies)
  icons/icons.svg          the icon sprite (generated by scripts/fetch-icons.mjs)
  dawn-and-dusk.css|js     generated entry points
release/                   generated bundles, committed so they can be copied straight from GitHub
skill/dawn-and-dusk/       the agent skill: SKILL.md, references/ (partly generated), assets/ (generated), evals/
site/                      the docs site (Astro): layouts, pages, docs-only components, styles and scripts
  nav/*.mjs                side-nav groups, one file per group
scripts/
  build-ds.mjs             builds release/, the entry points and the skill's assets and references
  build-skill-examples.mjs writes the skill's per-component markup from the built docs
  fetch-icons.mjs          regenerates the icon sprite from Iconify
  install-skill.mjs        installs the skill into one project
tests/                     behaviour tests in headless Chrome, one file per component (runner and harness in lib/)
tools/picker/              the option picker the system was designed with (not part of the system)
.github/workflows/         builds the docs and deploys them to GitHub Pages
```

## Developing

Requires Node 22.12+ and Google Chrome (for the tests).

```bash
npm install
npm run dev          # builds the system, then serves the docs at http://localhost:4321/dawn-and-dusk/
npm run build        # builds the system, the static docs (dist/) and the skill's markup references
npm run build:ds     # rebuilds release/, the entry points and the skill's assets and references only
npm run preview      # serves the built docs from dist/
npm test             # every behaviour test, in headless Chrome, against the running dev server
npm test -- menu tabs    # only the test files whose names contain "menu" or "tabs"
```

The tests look for Chrome at its macOS path; set `CHROME=/path/to/chrome` elsewhere, and `DD_BASE` to test another URL.

**Adding a component**

1. Write `ds/components/<name>.css`. Use `.dd-<name>` classes and only `var(--dd-*)` tokens, and open the file with a short
   comment describing the component. That comment becomes its entry in the skill.
2. If it needs behaviour, add `ds/behaviors/<name>.js`: a plain script (no imports) that is opt-in via `data-dd-*`
   attributes, delegates its listeners from `document` and works from the keyboard.
3. Document it in `site/pages/components/<name>.astro` with the `Example`, `ClassTable` and `Guides` helpers (examples,
   then Classes, Behaviour and Guidelines), add it to the matching `site/nav/*.mjs`, and cover its behaviour in
   `tests/<name>.test.mjs`.
4. Run `npm run build` and commit the regenerated `release/` and `skill/` files with your change.

**Changing a token:** edit `ds/tokens.css`. The foundations pages and `references/tokens.md` read it directly.

## Design principles

- **Tone, not lines.** Surfaces separate by tone: page, surface, inset, pressed. Hairlines only where dense data needs
  rows; shadows only on layers that float.
- **One primary per view.** Golden-hour apricot marks the one thing the screen is for; everything else steps down.
- **Loud headlines, calm everything else.** Headings are the logo lockup (Outfit 800, lowercase, tight), Figtree does
  the reading and DM Mono carries the data.
- **Colour has a job.** Status colours mean state and always come with an icon or a word; the Color set marks
  categories.
- **Dusk is first-class.** Every component is designed and tested in both themes. Components only read tokens, so
  nothing special-cases a theme.
- **Gentle motion.** One symmetric ease at 160 or 320ms; with reduced motion, state changes without travel.
- **Built for agents too.** Plain classes and tokens an assistant can apply, and a skill that teaches it the rules.

| | |
|---|---|
| Neutrals | Warm greige: cream `#f4efe7` and ink `#1f1e1c` at dawn, `#1c1916` and `#ece7df` at dusk, with a taupe accent |
| Primary | Golden-hour apricot `#e48f63` (dusk `#f2a57f`) |
| Status | Olive, honey, terracotta and slate |
| Color set | Honey, amber, apricot, terracotta, rose, wine, ochre, sand |
| Type | Outfit 800 lowercase headings · Figtree body · DM Mono data · a major-third scale on 17px |
| Space and shape | 5px unit · radius 5 / 8 / 10px |
| Depth | Borderless tonal surfaces, a film grain on the page, shadows only on floating layers |
| Motion | 160ms / 320ms on `cubic-bezier(.45, 0, .55, 1)` |
| Icons | Solar Bold Duotone, with thin strokes for tiny glyphs |

## Credits

- Icons: [Solar](https://icon-sets.iconify.design/solar/) by 480 Design, licensed CC BY 4.0. The `ai` icons are drawn
  for dawn & dusk in the same style.
- Fonts: Outfit, Figtree and DM Mono, licensed under the SIL Open Font License and served by Google Fonts.

© 2026 cxkw-dev. All rights reserved.
