# dawn & dusk for Orca

The design system as an Orca theme: **dawn** in light mode and **dusk** in dark, both named "dawn & dusk", each with a
matching terminal palette and the docs' code colours. Generated from `ds/tokens.css`: edit the tokens or
`scripts/build-orca-theme.mjs`, never the JSON here.

```sh
npm run build:orca                  # regenerate from the tokens
orca plugin install ./ports/orca    # install or update in Orca
```

## Turn it on

Orca holds one theme for light mode and one for dark, so pick "dawn & dusk" in both:

1. Settings → Appearance: set Theme mode to **System** (follows macOS), Light or Dark.
2. **Light theme** → dawn & dusk, then click **Use its terminal colors**.
3. **Dark theme** → dawn & dusk, then click **Use its terminal colors**.
4. Light and dark **editor theme** → **Same as app theme**, so code uses the system's syntax colours.
