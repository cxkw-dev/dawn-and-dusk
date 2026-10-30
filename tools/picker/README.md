# picker

The tool dawn & dusk was designed with. It shows hundreds of options per category (palettes, dusk designs, fonts, type
scales, radius, density, depth, buttons, inputs, tables…) as live, themed previews. Clicking a card applies it everywhere;
a live preview of a full page updates as you go.

It's kept for reference and for future rounds of tuning. **It isn't part of the design system.** The decisions it
produced live in `ds/tokens.css` and `ds/components/`.

## Run it

It's a static page with no build step:

```bash
cd tools/picker && python3 -m http.server 8765
# open http://localhost:8765
```

A published copy runs as a claude.ai artifact, where picks sync to Claude through the artifact's database. When it's
opened locally, picks stay in `localStorage`, and **Export picks** copies them as text.

## How it's organised

- `index.html` loads `app.js` (the runtime: rendering, try-on, shortlist, tokens, the live preview) and then every
  `data/*.js` file.
- Each data file calls `DD.category({ id, group, title, options: [...] })`. An option's CSS is nested under
  `.spec[data-cat][data-v]`, and its markup uses the picker's token names (`--accent`, `--surface`, `--u`, …).
- Options are append-only, because picks are stored by index. Older rounds are archived in the UI, not deleted.

| file | categories |
|---|---|
| `foundations.js`, `r3-foundations.js` | palette, fonts, type scale, headings, radius, density, depth, texture, motion |
| `dusk.js`, `status.js`, `colors.js` | dark-mode designs, status colors, color sets, chips, label color |
| `button-color.js` | primary button fill |
| `components-forms.js` | buttons, inputs, dropdowns, controls |
| `components-data.js`, `tables.js`, `alerts-dusk.js` | cards, badges, tabs, alerts, tables |
| `components-chrome.js`, `nav-r4.js`, `chrome-r4.js` | nav, links, dialogs, logo usage |
| `icons.js` | icon sets |
