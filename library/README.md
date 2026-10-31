# dawn & dusk

A warm design system in two lights. Plain HTML, or a small set of typed React components.

Install the versioned package directly—no npm account needed:

```sh
npm install https://github.com/cxkw-dev/dawn-and-dusk/releases/download/v0.2.0/dawn-and-dusk-0.2.0.tgz
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

## Entries

| Entry | Purpose |
|---|---|
| `styles.css` | All components, tokens, base styles and Google Fonts |
| `styles-no-fonts.css` | Same styles with no external font request |
| `tokens.css` | Design tokens alone |
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
