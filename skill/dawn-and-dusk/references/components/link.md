# link — `link`

Moves you somewhere. Fine dotted underlines in a soft grey sit close under the text; on hover the link takes the accent and the dots join into a line.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/link

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### Inline

Links inside running text inherit the text colour; the dots alone say “this goes somewhere”. Try it: hover a link, or Tab to it for the focus ring.

```html
<p class="dd-text" style="max-width: 60ch">I build calm software at cxkw.dev, write about <a class="dd-link" href="#">design systems</a>, and keep a <a class="dd-link" href="#">small lab</a> of experiments. The latest is <a class="dd-link" href="#">dockey-ui</a>, a keyboard-first dock for macOS.</p>
```

## Standalone

A link on its own line, at the end of a card or section. A little heavier, with a trailing arrow that nudges forward on hover. Wrap the label in a `<span>` so only the words are underlined.

```html
<div class="dd-row" style="--dd-gap: 10px 30px">
  <a class="dd-link dd-link--standalone" href="#"><span>Read the case study</span><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-right"/></svg></a>
  <a class="dd-link dd-link--standalone" href="#"><span>All deployments</span><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-right"/></svg></a>
  <a class="dd-link dd-link--standalone dd-small" href="#"><span>View logs for edge-cache</span><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-right"/></svg></a>
</div>
```

## External

Leaves the site. Use the `arrow-right` icon: `.dd-link--external` tilts it to ↗ and lifts it on hover. Any other icon (such as `external`) keeps its shape and still lifts. Open in a new tab only when leaving would lose work.

```html
<div class="dd-stack" style="--dd-gap: 15px">
  <div class="dd-row" style="--dd-gap: 10px 30px">
    <a class="dd-link dd-link--external" href="https://github.com" target="_blank" rel="noopener"><span>GitHub</span><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-right"/></svg></a>
    <a class="dd-link dd-link--external" href="https://fonts.google.com/specimen/Figtree" target="_blank" rel="noopener"><span>Figtree on Google Fonts</span><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-right"/></svg></a>
    <a class="dd-link dd-link--external" href="#" target="_blank" rel="noopener"><span>Status page</span><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-external"/></svg></a>
  </div>
  <p class="dd-text dd-small">The icons are <a class="dd-link dd-link--external" href="https://icon-sets.iconify.design/solar/" target="_blank" rel="noopener"><span>Solar by 480 Design</span><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-right"/></svg></a>, used under CC BY 4.0.</p>
</div>
```

## Muted

Meta lines, footers and secondary references: muted text with faint dots.

```html
<div class="dd-stack" style="--dd-gap: 10px">
  <p class="dd-text dd-small dd-muted">Last deployed 4 minutes ago by <a class="dd-link dd-link--muted" href="#">atn</a> · <a class="dd-link dd-link--muted" href="#">a3f9c21</a> · <a class="dd-link dd-link--muted" href="#">iad1</a></p>
  <p class="dd-text dd-small dd-muted">© 2026 cxkw.dev · <a class="dd-link dd-link--muted" href="#">Privacy</a> · <a class="dd-link dd-link--muted" href="#">Colophon</a> · <a class="dd-link dd-link--muted" href="#">RSS</a></p>
</div>
```

## Nav

Top-level navigation. Muted with no underline at rest, dotted on hover, solid when it is the current page (`aria-current="page"`). Lay a row out with `.dd-link-nav`.

Try it: click a link; it becomes the current page (a docs script moves aria-current here, as loading the page would).

```html
<nav class="dd-link-nav" aria-label="Site">
  <a class="dd-link dd-link--nav" href="#" aria-current="page">Work</a>
  <a class="dd-link dd-link--nav" href="#">Writing</a>
  <a class="dd-link dd-link--nav" href="#">Lab</a>
  <a class="dd-link dd-link--nav" href="#">About</a>
</nav>
```

## On ink

On a panel filled with `--dd-text`, `.dd-link--inverse` draws the dots and the focus ring in the page colour.

```html
<div style="background: var(--dd-text); color: var(--dd-bg); padding: 20px 25px; border-radius: var(--dd-r-box)">
  <p class="dd-text">Say hi by <a class="dd-link dd-link--inverse" href="#">email</a> or find me on <a class="dd-link dd-link--external dd-link--inverse" href="#"><span>GitHub</span><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-right"/></svg></a>.</p>
</div>
```

## States

Hover and focus forced on for reference. A link that can’t go anywhere yet gets `aria-disabled="true"` and no `href`.

```html
<div class="dd-row" style="--dd-gap: 10px 30px">
  <a class="dd-link" href="#">Rest</a>
  <a class="dd-link" href="#" style="color: var(--dd-accent); text-decoration-style: solid; text-decoration-color: var(--dd-accent)">Hover</a>
  <a class="dd-link" href="#" style="outline: 2px solid var(--dd-ring); outline-offset: 2px">Focus</a>
  <a class="dd-link" aria-disabled="true">Disabled</a>
</div>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-link` | Inline link: inherits colour, fine dotted underline in `--dd-border-strong`; accent and solid on hover. |
| `.dd-link--standalone` | Label + trailing arrow; the arrow nudges right on hover. Label goes in a `<span>`. |
| `.dd-link--external` | Label + ↗. Tilts an `arrow-right` icon by −45° and lifts it on hover. |
| `.dd-link--muted` | Muted text and faint dots, for meta lines and footers. |
| `.dd-link--nav` | Navigation: muted with no underline at rest, dotted on hover, solid when `aria-current` or `.is-active`. |
| `.dd-link-nav` | A wrapping row for nav links. |
| `.dd-link--inverse` | For links on ink (`--dd-text`) surfaces: dots and focus ring in the page colour. |
| `[aria-disabled="true"]` | Dimmed to `--dd-quiet` with faint dots, and inert. |

## Guidelines

Do:
- Use a link to go somewhere and a button to do something.
- Write the destination as the label: “All deployments”, not “click here”.
- Mark links that leave the site with ↗.

Don't:
- Don’t colour inline links; the dots are enough and keep paragraphs calm.
- Don’t use `.dd-link--nav` inside running text.
- Don’t underline non-links with dots; that pattern means “link”.

