# dawn & dusk

A warm design system in two lights. Plain HTML, or a small set of typed React components.

Install the versioned package directly—no npm account needed:

```sh
npm install https://github.com/cxkw-dev/dawn-and-dusk/releases/download/v0.3.2/dawn-and-dusk-0.3.2.tgz
```

## React

```jsx
import 'dawn-and-dusk/styles.css';
import { Button, Card, Input, Icon, Badge, ThemeToggle } from 'dawn-and-dusk/react';

<Card>
  <Input label="Project name" placeholder="My project" />
  <Button variant="primary"><Icon name="plus" />Create project</Button>
  <ThemeToggle />
</Card>
```

Native props, events, and refs pass through. Inputs support `value` / `onChange`, `defaultValue`, `hint`, and `error`.
Button supports `variant`, `size`, and `loading`. Use `type="submit"` in forms. Icon names are typed and render inline.

In Next.js, import the CSS in `app/layout.jsx`. For a saved theme without a flash, put `<ThemeScript />` from
`dawn-and-dusk/theme` in `<head>` and add `suppressHydrationWarning` to `<html>`. It accepts a CSP `nonce`.
The React entry does not load the vanilla behavior bundle. Select, date picker, table and other complex widgets
currently have HTML/CSS APIs; they are not React exports.

## HTML and other client-side apps

```js
import 'dawn-and-dusk/styles.css';
import 'dawn-and-dusk/auto'; // optional interactions and automatic inline icon sprite
```

```html
<button class="dd-btn dd-btn--primary">Create project</button>
<button class="dd-btn dd-btn--ghost" data-dd-theme-toggle>Switch theme</button>
```

The automatic runtime initializes once per page, when the DOM is ready. Use it for HTML-owned markup, not stateful
React subtrees. Tables added later need `dd.dataTable.refresh(root)`; render calendar markup before initialization.
Do not also load the legacy `dawn-and-dusk.js` bundle.

## Tailwind CSS v4

```css
/* your main stylesheet */
@import "dawn-and-dusk/fonts.css"; /* optional: Google Fonts, must come first */
@import "tailwindcss";
@import "dawn-and-dusk/tailwind.css";
```

```html
<div class="bg-surface rounded-box p-6">
  <h2 class="dd-h3">overview</h2>
  <p class="text-muted text-sm">Utilities read the tokens.</p>
  <button class="dd-btn dd-btn--primary w-full">Continue</button>
</div>
```

- Utilities read the tokens and follow dawn and dusk: `bg-surface`, `text-muted`, `border-border`, `bg-primary/20`,
  `rounded-box`, `shadow-float`, `font-display`. Tailwind's own palette, radii and shadows are removed.
- Spacing uses the system's 5px unit: `p-4` is 20px, the same as `--dd-space-4`.
- `dd-` components sit in Tailwind's components layer, so a utility on the same element wins (`dd-btn w-full`).
- `dusk:` and `dawn:` follow the nearest `data-theme` (so a dusk section in a dawn page gets `dusk:`), or the OS when none is set. `dark:` is an alias of `dusk:`.
- Requires Tailwind CSS v4. Use `tailwind.css` instead of `styles.css`, not with it.

## Entries

| Entry | Purpose |
|---|---|
| `styles.css` | All components, tokens, base styles and Google Fonts |
| `styles-no-fonts.css` | Same styles with no external font request |
| `tokens.css` | Design tokens alone |
| `tailwind.css` | Tailwind CSS v4 theme, variants and layered components; use instead of `styles.css` |
| `fonts.css` | The Google Fonts import alone, for Tailwind apps |
| `core.css` | Base and component styles with no tokens or fonts (loaded by `tailwind.css`) |
| `auto` / `auto.js` | Optional HTML interactions; includes the inline icon sprite |
| `react` | Button, Input, Card, Badge, Icon, ThemeToggle and setTheme |
| `theme` | Server-safe ThemeScript and themeScript string |
| `theme.js` | Tiny pre-paint script for plain HTML; load in head before CSS |
| `icons.svg` | Sprite for applications managing their own icons |

No React dependency is installed for CSS/HTML users. React consumers need React 18 or 19.
Styles include a page reset and a 17px root font size. Use the font-free entry for self-hosted fonts or restricted CSP.
With no saved choice, CSS follows the system theme; set `data-theme="dawn"` or `"dusk"` to choose explicitly.

[Getting started and downloadable starters](https://cxkw-dev.github.io/dawn-and-dusk/getting-started/)
· [Component catalogue](https://cxkw-dev.github.io/dawn-and-dusk/components/button/)

MIT. Solar icons retain CC BY 4.0 attribution; see THIRD_PARTY_NOTICES.md.
