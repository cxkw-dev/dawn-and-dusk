# callout — `callout`

An aside in docs and long-form writing: a note, a tip, something important, a warning. Quiet surface, coloured label — it should catch the eye without breaking the reading.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/callout

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### Kinds

Note, tip, important and warning, plus caution for the irreversible. Only the icon and the label carry colour; the block itself is a neutral surface.

```html
<div class="dd-stack">
  <aside class="dd-callout dd-callout--note">
    <p class="dd-callout__title"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-info"/></svg>Note</p>
    <p>Tokens are final. Components read them and nothing else, so a theme change never needs a component change.</p>
  </aside>
  <aside class="dd-callout dd-callout--tip">
    <p class="dd-callout__title"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-sparkle"/></svg>Tip</p>
    <p>Set <code>data-theme="dusk"</code> on any element to preview one panel in dusk without flipping the whole page.</p>
  </aside>
  <aside class="dd-callout dd-callout--important">
    <p class="dd-callout__title"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-flag"/></svg>Important</p>
    <p>Primary apricot is for primary actions only. Selection, focus and links use the taupe accent.</p>
  </aside>
  <aside class="dd-callout dd-callout--warning">
    <p class="dd-callout__title"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-alert"/></svg>Warning</p>
    <p>Rotating the signing key logs everyone out of auth-gateway. Do it outside working hours.</p>
  </aside>
  <aside class="dd-callout dd-callout--caution">
    <p class="dd-callout__title"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-danger"/></svg>Caution</p>
    <p><code>dd reset --hard</code> deletes every deploy preview in the project. It can’t be undone.</p>
  </aside>
</div>
```

## Rich content

The title can say anything. The body takes paragraphs, lists, code and links, all indented to line up with the title text.

```html
<aside class="dd-callout dd-callout--tip">
  <p class="dd-callout__title"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-terminal"/></svg>Run the docs locally</p>
  <p>The site and the design system build together. From the repo root:</p>
  <pre>npm install
npm run dev   # rebuilds ds/ and starts Astro on :4321</pre>
  <ul>
    <li>Edit files in <code>ds/</code>, never the generated <code>dawn-and-dusk.css</code>.</li>
    <li>Each section of the sidebar is one file in <code>site/nav/</code>.</li>
  </ul>
  <p>Stuck? Read the <a href="#">build notes</a>.</p>
</aside>
```

## Compact

One sentence, no title — for version notes and deprecations next to an API.

```html
<div class="dd-stack">
  <p class="dd-callout dd-callout--compact dd-callout--note"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-info"/></svg><span>Available since dawn-and-dusk v0.2.</span></p>
  <p class="dd-callout dd-callout--compact dd-callout--warning"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-alert"/></svg><span>Deprecated — use <code>.dd-btn--ink</code> instead.</span></p>
</div>
```

## In prose

Callouts sit in the flow of an article. Give them the same spacing as a paragraph.

```html
<article style="max-width: 62ch">
  <h3 class="dd-h4">Rolling back a deploy</h3>
  <p class="dd-text" style="margin: var(--dd-space-2) 0 var(--dd-space-4)">Every deploy keeps its build for 30 days. Rolling back points the region at an older build; nothing is rebuilt, so it takes seconds.</p>
  <aside class="dd-callout dd-callout--important">
    <p class="dd-callout__title"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-flag"/></svg>Important</p>
    <p>Database migrations don’t roll back with the code. Check the migration log for the build you’re returning to.</p>
  </aside>
  <p class="dd-text" style="margin-top: var(--dd-space-4)">Open the deploy, choose <b>Roll back to here</b> and confirm the region. Edge caches purge on their own within a minute.</p>
</article>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-callout` | The block. Use `<aside>` in articles. |
| `.dd-callout--{kind}` | Kind: `note` (info, the default) · `tip` (ok) · `important` (accent) · `warning` (warn) · `caution` (bad). |
| `.dd-callout__title` | Icon and label row. Icons: `info`, `sparkle`, `flag`, `alert`, `danger`. |
| `.dd-callout > *` | Any prose after the title: `p`, `ul`, `pre`, `code`, links. |
| `.dd-callout__dismiss` | Optional top-right button with `data-dd-dismiss` and an accessible label. |
| `.dd-callout--compact` | Icon + one line, no title. |

## Behaviour

A button with `data-dd-dismiss` inside a callout removes it with the same fade-and-collapse as an alert.

### Dismissible

```html
<aside class="dd-callout dd-callout--note">
  <p class="dd-callout__title"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-info"/></svg>Preview available</p>
  <p>You can try the new workspace before switching your team.</p>
  <button class="dd-callout__dismiss" type="button" data-dd-dismiss aria-label="Dismiss note"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button>
</aside>
```

## Guidelines

Do:
- Use the kind that matches the consequence: tip for shortcuts, warning for side effects, caution for data loss.
- Keep it to two or three sentences.
- Write the title as the label (“Note”) or as the point itself (“Migrations don’t roll back”).

Don't:
- Don’t put more than one callout in a row — merge them.
- Don’t use callouts for live status; that’s an alert.
- Don’t make everything important.

