# dawn & dusk tokens (v0.1.0)

Generated from `ds/tokens.css` by `scripts/build-ds.mjs`. Use `var(--dd-NAME)`; never hard-code these values.

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
| `--dd-quiet` | `color-mix(in oklab, var(--dd-muted) 50%, var(--dd-faint))` | `color-mix(in oklab, var(--dd-muted) 50%, var(--dd-faint))` | secondary labels, hints, kbd: readable, quieter than muted |
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
| `--dd-ok-soft` | `#e0e1d0` | `#2c2c23` |  |
| `--dd-warn-soft` | `#ede1cc` | `#393023` |  |
| `--dd-bad-soft` | `#edd9ce` | `#342721` |  |
| `--dd-info-soft` | `#dededc` | `#2b2b2b` |  |
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
| `--dd-float-bg` | `#faf7f2` | `var(--dd-surface-2)` |  |
| `--dd-float-hover` | `var(--dd-surface)` | `var(--dd-surface-3)` |  |
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
