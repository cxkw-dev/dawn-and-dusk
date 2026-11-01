// Builds the Tailwind CSS v4 entry (dawn-and-dusk/tailwind.css) from ds/tokens.css, so the utility names can never drift
// from the tokens. Used by build-package.mjs (the package file) and build-ds.mjs (the skill's mapping table).
//
// The entry does three things:
//   1. Loads the tokens into Tailwind's `theme` layer and every dd- class into its `components` layer. Utilities sit in
//      a later layer, so `<button class="dd-btn w-full">` works, and dd- styles beat preflight whatever its specificity.
//   2. Points Tailwind's theme at the tokens with `@theme inline`, so utilities read var(--dd-*) where they are used and
//      follow dawn / dusk (including a data-theme set on one section). Tailwind's own palette, radii and shadows are
//      cleared and its sans / mono fonts point at the system's, so only on-system values exist; the spacing unit becomes
//      the system's 5px, and a bare `border` draws the --dd-border hairline.
//   3. Adds dawn: / dusk: variants (dark: is an alias of dusk:) that follow the nearest data-theme, or the OS when none is set.

import { tokenBlock } from './ds-source.mjs';

const names = (body) => [...body.matchAll(/--dd-([\w-]+):/g)].map((m) => m[1]);

/** Theme colour tokens that are not general-purpose utilities: component internals and code highlighting. */
const notUtilities = (n) => /^(syntax-|btn-secondary|shadow-float$)/.test(n);
/** Utility name for a colour token, where it differs from the token. */
const colorRename = { 'float-bg': 'float' };

/** [utility namespace variable, token] pairs, in the order they are written. */
export function tailwindTheme(tokensSrc) {
  const shared = names(tokenBlock(tokensSrc, ':root {'));
  const colors = names(tokenBlock(tokensSrc, ':root, [data-theme="dawn"] {')).filter((n) => !notUtilities(n));
  const has = (n) => { if (!shared.includes(n)) throw new Error(`tailwind entry: --dd-${n} is not a shared token`); return `var(--dd-${n})`; };
  const sizes = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl'];
  return [
    ['--spacing', has('u')],
    ['--font-sans', has('font-body')], ['--font-body', has('font-body')], ['--font-display', has('font-display')], ['--font-mono', has('font-mono')],
    // Body sizes keep the system's reading line height; headline sizes take the tight one.
    ...sizes.flatMap((s) => [[`--text-${s}`, has(`fs-${s}`)], [`--text-${s}--line-height`, has(['xs', 'sm', 'base', 'lg'].includes(s) ? 'lh' : 'lh-tight')]]),
    ['--leading-normal', has('lh')], ['--leading-tight', has('lh-tight')], ['--leading-heading', has('h-leading')],
    ['--tracking-heading', has('h-tracking')],
    ['--radius-ctl', has('r-ctl')], ['--radius-box', has('r-box')], ['--radius-lg', has('r-lg')], ['--radius-pill', has('r-pill')],
    ['--shadow-float', 'var(--dd-shadow-float)'],
    ['--ease-gentle', has('ease')],
    ['--default-transition-duration', has('dur-fast')], ['--default-transition-timing-function', has('ease')],
    ...colors.map((n) => [`--color-${colorRename[n] ?? n}`, `var(--dd-${n})`]),
  ];
}

// The nearest data-theme wins, as it does for the tokens: inside a dusk section of a dawn page, dawn: is off. Islands one
// level deep in either direction are exact; deeper nesting (a dawn card in a dusk section of a dawn page) gets neither.
const variant = (name, theme, scheme) => {
  const other = `[data-theme]:not([data-theme=${theme}])`;
  return `@custom-variant ${name} {
  &:where([data-theme=${theme}], [data-theme=${theme}] :not([data-theme]):not([data-theme=${theme}] ${other} *)) { @slot; }
  @media (prefers-color-scheme: ${scheme}) {
    &:where(:root:not([data-theme]), :root:not([data-theme]) :not([data-theme], [data-theme] *)) { @slot; }
  }
}`;
};

/** The complete tailwind.css. */
export function tailwindEntry(tokensSrc, { version }) {
  const theme = tailwindTheme(tokensSrc);
  return `/* dawn & dusk v${version} for Tailwind CSS v4. In your main stylesheet:
     @import "dawn-and-dusk/fonts.css";      (optional — Google Fonts; must come first)
     @import "tailwindcss";
     @import "dawn-and-dusk/tailwind.css";
   Utilities read the tokens (bg-surface, text-muted, rounded-box, shadow-float, p-4 = 20px) and follow dawn / dusk.
   dd- components live in the components layer, so a utility on the same element wins. */
@import './tokens.css' layer(theme);
@import './core.css' layer(components);

/* Bare border utilities draw the system's hairline colour instead of currentColor. */
@layer base {
  *, ::after, ::before, ::backdrop, ::file-selector-button { border-color: var(--dd-border, currentColor); }
}

@theme inline {
  /* Only on-system values: clear Tailwind's palette, radii and shadows, and its unused font and size steps. */
  --color-*: initial;
  --radius-*: initial;
  --shadow-*: initial;
  --font-serif: initial;
${['5xl', '6xl', '7xl', '8xl', '9xl'].map((s) => `  --text-${s}: initial;\n  --text-${s}--line-height: initial;`).join('\n')}

${theme.map(([k, v]) => `  ${k}: ${v};`).join('\n')}
}

/* dusk: / dawn: follow the nearest data-theme (the element's own or an ancestor's); with none on <html>, the OS setting.
   dark: is the same as dusk:, so existing dark: classes keep working. */
${variant('dusk', 'dusk', 'dark')}
${variant('dark', 'dusk', 'dark')}
${variant('dawn', 'dawn', 'light')}
`;
}
