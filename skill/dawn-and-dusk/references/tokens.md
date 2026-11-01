# dawn & dusk tokens (v0.3.1)

Generated from `ds/tokens.css`, `ds/base.css` and the icon sprite by `scripts/build-ds.mjs`. Use `var(--dd-NAME)`; never hard-code these values.

## Theme colours (dawn → dusk)

| token | dawn | dusk | note |
|---|---|---|---|
| `--dd-bg` | `#f4efe7` | `#1c1916` |  |
| `--dd-surface` | `#e8e3db` | `#24211e` |  |
| `--dd-surface-2` | `#dedad2` | `#2b2825` |  |
| `--dd-surface-3` | `#d2cec7` | `#34312d` |  |
| `--dd-border` | `#dcd2c3` | `#3f3832` |  |
| `--dd-border-strong` | `#a9a59f` | `#57534e` |  |
| `--dd-text` | `#1f1e1c` | `#ece7df` |  |
| `--dd-muted` | `#6e675e` | `#a59e94` |  |
| `--dd-faint` | `#a8a299` | `#635e57` |  |
| `--dd-quiet` | `color-mix(in oklab, var(--dd-muted) 75%, var(--dd-faint))` | `color-mix(in oklab, var(--dd-muted) 75%, var(--dd-faint))` | secondary labels, hints, kbd: readable, quieter than muted |
| `--dd-wash` | `color-mix(in oklab, var(--dd-text) 7%, transparent)` | `color-mix(in oklab, var(--dd-text) 7%, transparent)` |  |
| `--dd-wash-strong` | `color-mix(in oklab, var(--dd-text) 12%, transparent)` | `color-mix(in oklab, var(--dd-text) 12%, transparent)` |  |
| `--dd-syntax-keyword` | `color-mix(in oklab, var(--dd-set-6) 72%, var(--dd-text))` | `color-mix(in oklab, var(--dd-set-6) 72%, var(--dd-text))` |  |
| `--dd-syntax-tag` | `var(--dd-syntax-keyword)` | `var(--dd-syntax-keyword)` |  |
| `--dd-syntax-attr` | `color-mix(in oklab, var(--dd-set-7) 56%, var(--dd-text))` | `color-mix(in oklab, var(--dd-set-7) 68%, var(--dd-text))` |  |
| `--dd-syntax-string` | `color-mix(in oklab, var(--dd-ok) 64%, var(--dd-text))` | `color-mix(in oklab, var(--dd-ok) 78%, var(--dd-text))` |  |
| `--dd-syntax-number` | `color-mix(in oklab, var(--dd-set-4) 66%, var(--dd-text))` | `color-mix(in oklab, var(--dd-set-4) 78%, var(--dd-text))` |  |
| `--dd-syntax-function` | `color-mix(in oklab, var(--dd-info) 70%, var(--dd-text))` | `color-mix(in oklab, var(--dd-info) 80%, var(--dd-text))` |  |
| `--dd-syntax-variable` | `color-mix(in oklab, var(--dd-set-2) 50%, var(--dd-text))` | `color-mix(in oklab, var(--dd-set-2) 62%, var(--dd-text))` |  |
| `--dd-syntax-comment` | `var(--dd-muted)` | `var(--dd-muted)` |  |
| `--dd-syntax-punct` | `var(--dd-muted)` | `var(--dd-muted)` |  |
| `--dd-accent` | `#6a5c4e` | `#d9cdbd` |  |
| `--dd-accent-hover` | `#5d5146` | `#dcd1c2` |  |
| `--dd-accent-soft` | `#e0d9d0` | `#322e2a` |  |
| `--dd-on-accent` | `#f4efe7` | `#1c1916` |  |
| `--dd-primary` | `#e48f63` | `#f2a57f` |  |
| `--dd-primary-hover` | `#ca805a` | `#f2ad8b` |  |
| `--dd-primary-soft` | `#f3decf` | `#3d2f27` |  |
| `--dd-on-primary` | `#1f1916` | `#1f1916` |  |
| `--dd-ok` | `#6e8a4a` | `#a0bb80` |  |
| `--dd-warn` | `#c8962c` | `#f1c36c` |  |
| `--dd-bad` | `#b5523a` | `#e58770` |  |
| `--dd-info` | `#5f7d97` | `#91aec6` |  |
| `--dd-ok-soft` | `#e0e1d0` | `#35382a` |  |
| `--dd-warn-soft` | `#ede1cc` | `#393023` |  |
| `--dd-bad-soft` | `#edd9ce` | `#342721` |  |
| `--dd-info-soft` | `#dededc` | `#323537` |  |
| `--dd-tone-1` | `#d4cbbf` | `#d4cbbf` |  |
| `--dd-tone-2` | `#a39b8f` | `#8a8277` |  |
| `--dd-tone-3` | `#c8bfae` | `#5c554d` |  |
| `--dd-set-1` | `#e0b04f` | `#e8bd6c` | honey |
| `--dd-set-2` | `#d9913c` | `#e7a760` | amber |
| `--dd-set-3` | `#e48f63` | `#f2a57f` | apricot |
| `--dd-set-4` | `#c8694a` | `#d58064` | terracotta |
| `--dd-set-5` | `#cf7f86` | `#dd959b` | rose |
| `--dd-set-6` | `#9c4f5f` | `#b56e7b` | wine |
| `--dd-set-7` | `#b98a35` | `#c89e58` | ochre |
| `--dd-set-8` | `#d6bf94` | `#d6c29c` | sand |
| `--dd-ring` | `color-mix(in oklab, var(--dd-accent) 45%, transparent)` | `color-mix(in oklab, var(--dd-accent) 45%, transparent)` |  |
| `--dd-overlay` | `rgb(31 30 28 / 0.32)` | `rgb(0 0 0 / 0.55)` |  |
| `--dd-float-bg` | `#faf7f2` | `var(--dd-surface-3)` |  |
| `--dd-float-hover` | `var(--dd-surface-2)` | `#3e3a36` |  |
| `--dd-btn-secondary` | `var(--dd-surface-2)` | `var(--dd-surface-3)` |  |
| `--dd-btn-secondary-hover` | `var(--dd-surface-3)` | `color-mix(in oklab, var(--dd-text) 19%, var(--dd-bg))` |  |
| `--dd-shadow-float` | `0 12px 32px -12px rgb(60 45 30 / 0.22), 0 2px 6px rgb(60 …` | `0 18px 40px -14px rgb(0 0 0 / 0.65), 0 2px 6px rgb(0 0 0 …` |  |

## Type, space, shape, motion (shared)

| token | value |
|---|---|
| `--dd-font-display` | `'Outfit', ui-sans-serif, system-ui, sans-serif` |
| `--dd-font-body` | `'Figtree', ui-sans-serif, system-ui, sans-serif` |
| `--dd-font-mono` | `'DM Mono', ui-monospace, SFMono-Regular, Menlo, monospace` |
| `--dd-fs-xs` | `11px` |
| `--dd-fs-sm` | `13.6px` |
| `--dd-fs-base` | `17px` |
| `--dd-fs-lg` | `21.25px` |
| `--dd-fs-xl` | `26.56px` |
| `--dd-fs-2xl` | `33.2px` |
| `--dd-fs-3xl` | `41.5px` |
| `--dd-fs-4xl` | `51.88px` |
| `--dd-lh` | `1.55` |
| `--dd-lh-tight` | `1.25` |
| `--dd-h-weight` | `800` |
| `--dd-h-tracking` | `-0.05em` |
| `--dd-h-leading` | `0.92` |
| `--dd-h-case` | `lowercase` |
| `--dd-u` | `5px` |
| `--dd-space-1` | `5px` |
| `--dd-space-2` | `10px` |
| `--dd-space-3` | `15px` |
| `--dd-space-4` | `20px` |
| `--dd-space-5` | `25px` |
| `--dd-space-6` | `30px` |
| `--dd-space-8` | `40px` |
| `--dd-space-10` | `50px` |
| `--dd-space-12` | `60px` |
| `--dd-space-16` | `80px` |
| `--dd-r-ctl` | `5px` |
| `--dd-r-box` | `8px` |
| `--dd-r-lg` | `10px` |
| `--dd-r-pill` | `999px` |
| `--dd-bw` | `0px` |
| `--dd-shadow` | `none` |
| `--dd-dur` | `320ms` |
| `--dd-dur-fast` | `160ms` |
| `--dd-ease` | `cubic-bezier(.45, 0, .55, 1)` |
| `--dd-grain-size` | `180px 180px` |
| `--dd-z-sticky` | `20` |
| `--dd-z-overlay` | `60` |
| `--dd-z-toast` | `80` |
| `--dd-z-tooltip` | `90` |

## Base classes (ds/base.css)

Typography and layout helpers every page uses. Headings `.dd-display/.dd-h1/.dd-h2/.dd-h3` are the logo lockup (Outfit 800,
lowercase, tight) for page and section titles; `.dd-h4/.dd-h5` are UI titles in sentence case.

| class | what it does |
|---|---|
| `.dd-display` `.dd-h1` `.dd-h2` `.dd-h3` | Lockup headings: Outfit 800, lowercase, tight tracking. Page and section titles only. |
| `.dd-h4` `.dd-h5` | UI titles (cards, dialogs, form sections), sentence case, 650 weight. |
| `.dd-lead` | Intro paragraph under a page title: larger, muted. |
| `.dd-text` / `.dd-small` / `.dd-caption` | Body paragraph / small text / caption (xs, muted). |
| `.dd-eyebrow` | Small mono uppercase label above a heading. |
| `.dd-mono` / `.dd-num` | DM Mono / tabular numerals — IDs, timestamps, figures. |
| `.dd-muted` / `.dd-faint` | Secondary text / decoration only (faint is not for text people must read). |
| `.dd-stack` | Vertical flex stack; gap from `--dd-gap` (default `--dd-space-3`). |
| `.dd-row` | Wrapping horizontal row, centred; gap from `--dd-gap` (default `--dd-space-2`). |
| `.dd-surface` | A tonal container: `--dd-surface` fill + box radius. No border, no shadow. |
| `.dd-scroll` | Thin tonal scrollbar that appears on hover/focus. |
| `.dd-icon` | Sizes an inline SVG icon to the text (1.15em). |
| `.dd-visually-hidden` | Hidden on screen, read by screen readers. |

## Tailwind CSS v4 utilities (dawn-and-dusk/tailwind.css)

In a Tailwind app these theme keys replace Tailwind's palette, fonts, radii and shadows, so utilities read the tokens and
follow dawn / dusk on their own. Spacing is the 5px unit: `p-4` = `--dd-space-4` = 20px. Variants: `dusk:` (alias `dark:`)
and `dawn:`, following the nearest `data-theme`. Prefer token utilities to `dusk:` overrides. See `references/frameworks.md`.

| Tailwind theme key | token | e.g. |
|---|---|---|
| `--spacing` | `var(--dd-u)` | `p-4` `gap-2` `w-64` |
| `--font-sans` | `var(--dd-font-body)` | `font-sans` |
| `--font-body` | `var(--dd-font-body)` | `font-body` |
| `--font-display` | `var(--dd-font-display)` | `font-display` |
| `--font-mono` | `var(--dd-font-mono)` | `font-mono` |
| `--text-xs` | `var(--dd-fs-xs)` | `text-xs` |
| `--text-sm` | `var(--dd-fs-sm)` | `text-sm` |
| `--text-base` | `var(--dd-fs-base)` | `text-base` |
| `--text-lg` | `var(--dd-fs-lg)` | `text-lg` |
| `--text-xl` | `var(--dd-fs-xl)` | `text-xl` |
| `--text-2xl` | `var(--dd-fs-2xl)` | `text-2xl` |
| `--text-3xl` | `var(--dd-fs-3xl)` | `text-3xl` |
| `--text-4xl` | `var(--dd-fs-4xl)` | `text-4xl` |
| `--leading-normal` | `var(--dd-lh)` | `leading-normal` |
| `--leading-tight` | `var(--dd-lh-tight)` | `leading-tight` |
| `--leading-heading` | `var(--dd-h-leading)` | `leading-heading` |
| `--tracking-heading` | `var(--dd-h-tracking)` | `tracking-heading` |
| `--radius-ctl` | `var(--dd-r-ctl)` | `rounded-ctl` |
| `--radius-box` | `var(--dd-r-box)` | `rounded-box` |
| `--radius-lg` | `var(--dd-r-lg)` | `rounded-lg` |
| `--radius-pill` | `var(--dd-r-pill)` | `rounded-pill` |
| `--shadow-float` | `var(--dd-shadow-float)` | `shadow-float` |
| `--ease-gentle` | `var(--dd-ease)` | `ease-gentle` |
| `--color-bg` | `var(--dd-bg)` | `bg-bg` `text-bg` `border-bg` |
| `--color-surface` | `var(--dd-surface)` | `bg-surface` `text-surface` `border-surface` |
| `--color-surface-2` | `var(--dd-surface-2)` | `bg-surface-2` `text-surface-2` `border-surface-2` |
| `--color-surface-3` | `var(--dd-surface-3)` | `bg-surface-3` `text-surface-3` `border-surface-3` |
| `--color-border` | `var(--dd-border)` | `bg-border` `text-border` `border-border` |
| `--color-border-strong` | `var(--dd-border-strong)` | `bg-border-strong` `text-border-strong` `border-border-strong` |
| `--color-text` | `var(--dd-text)` | `bg-text` `text-text` `border-text` |
| `--color-muted` | `var(--dd-muted)` | `bg-muted` `text-muted` `border-muted` |
| `--color-faint` | `var(--dd-faint)` | `bg-faint` `text-faint` `border-faint` |
| `--color-quiet` | `var(--dd-quiet)` | `bg-quiet` `text-quiet` `border-quiet` |
| `--color-wash` | `var(--dd-wash)` | `bg-wash` `text-wash` `border-wash` |
| `--color-wash-strong` | `var(--dd-wash-strong)` | `bg-wash-strong` `text-wash-strong` `border-wash-strong` |
| `--color-accent` | `var(--dd-accent)` | `bg-accent` `text-accent` `border-accent` |
| `--color-accent-hover` | `var(--dd-accent-hover)` | `bg-accent-hover` `text-accent-hover` `border-accent-hover` |
| `--color-accent-soft` | `var(--dd-accent-soft)` | `bg-accent-soft` `text-accent-soft` `border-accent-soft` |
| `--color-on-accent` | `var(--dd-on-accent)` | `bg-on-accent` `text-on-accent` `border-on-accent` |
| `--color-primary` | `var(--dd-primary)` | `bg-primary` `text-primary` `border-primary` |
| `--color-primary-hover` | `var(--dd-primary-hover)` | `bg-primary-hover` `text-primary-hover` `border-primary-hover` |
| `--color-primary-soft` | `var(--dd-primary-soft)` | `bg-primary-soft` `text-primary-soft` `border-primary-soft` |
| `--color-on-primary` | `var(--dd-on-primary)` | `bg-on-primary` `text-on-primary` `border-on-primary` |
| `--color-ok` | `var(--dd-ok)` | `bg-ok` `text-ok` `border-ok` |
| `--color-warn` | `var(--dd-warn)` | `bg-warn` `text-warn` `border-warn` |
| `--color-bad` | `var(--dd-bad)` | `bg-bad` `text-bad` `border-bad` |
| `--color-info` | `var(--dd-info)` | `bg-info` `text-info` `border-info` |
| `--color-ok-soft` | `var(--dd-ok-soft)` | `bg-ok-soft` `text-ok-soft` `border-ok-soft` |
| `--color-warn-soft` | `var(--dd-warn-soft)` | `bg-warn-soft` `text-warn-soft` `border-warn-soft` |
| `--color-bad-soft` | `var(--dd-bad-soft)` | `bg-bad-soft` `text-bad-soft` `border-bad-soft` |
| `--color-info-soft` | `var(--dd-info-soft)` | `bg-info-soft` `text-info-soft` `border-info-soft` |
| `--color-tone-1` | `var(--dd-tone-1)` | `bg-tone-1` `text-tone-1` `border-tone-1` |
| `--color-tone-2` | `var(--dd-tone-2)` | `bg-tone-2` `text-tone-2` `border-tone-2` |
| `--color-tone-3` | `var(--dd-tone-3)` | `bg-tone-3` `text-tone-3` `border-tone-3` |
| `--color-set-1` | `var(--dd-set-1)` | `bg-set-1` `text-set-1` `border-set-1` |
| `--color-set-2` | `var(--dd-set-2)` | `bg-set-2` `text-set-2` `border-set-2` |
| `--color-set-3` | `var(--dd-set-3)` | `bg-set-3` `text-set-3` `border-set-3` |
| `--color-set-4` | `var(--dd-set-4)` | `bg-set-4` `text-set-4` `border-set-4` |
| `--color-set-5` | `var(--dd-set-5)` | `bg-set-5` `text-set-5` `border-set-5` |
| `--color-set-6` | `var(--dd-set-6)` | `bg-set-6` `text-set-6` `border-set-6` |
| `--color-set-7` | `var(--dd-set-7)` | `bg-set-7` `text-set-7` `border-set-7` |
| `--color-set-8` | `var(--dd-set-8)` | `bg-set-8` `text-set-8` `border-set-8` |
| `--color-ring` | `var(--dd-ring)` | `bg-ring` `text-ring` `border-ring` |
| `--color-overlay` | `var(--dd-overlay)` | `bg-overlay` `text-overlay` `border-overlay` |
| `--color-float` | `var(--dd-float-bg)` | `bg-float` `text-float` `border-float` |
| `--color-float-hover` | `var(--dd-float-hover)` | `bg-float-hover` `text-float-hover` `border-float-hover` |

## Icons

Solar Bold Duotone, as an SVG sprite (`assets/icons.svg`): inline the sprite once after `<body>`, then
`<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>`. These are ALL the names — pick the closest; never invent one:

`ai` `ai-agent` `ai-chat` `ai-doc` `ai-model` `ai-wand` `alert` `archive` `arrow-down` `arrow-left` `arrow-right` `arrow-up` `bell` `bolt` `bookmark` `box` `calendar` `chart` `chat` `check` `chevron-down` `chevron-left` `chevron-right` `chevron-up` `clock` `cloud` `code` `copy` `danger` `database` `download` `edit` `error` `expand` `external` `eye` `eye-off` `file` `filter` `flag` `folder` `globe` `graph` `grid` `heart` `home` `inbox` `info` `key` `layers` `link` `list` `lock` `logout` `mail` `menu` `minus` `moon` `more` `pause` `pin` `play` `plus` `question` `refresh` `search` `send` `server` `settings` `shield` `sidebar` `sort` `sparkle` `star` `success` `sun` `tag` `terminal` `trash` `unlock` `upload` `user` `users` `x`
