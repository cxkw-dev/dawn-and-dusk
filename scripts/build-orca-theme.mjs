// Builds the Orca theme plugin in ports/orca/ from ds/tokens.css: dawn for Orca's light mode, dusk for dark, each with a
// terminal palette and the editor's code colours, so all of it follows the system when a token changes. Orca themes take plain colours, so
// every var() and color-mix(in oklab, …) is resolved here; translucent values become #rrggbbaa.
// Run: node scripts/build-orca-theme.mjs   (then reinstall: orca plugin install ./ports/orca)
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { readDs, tokenBlock } from './ds-source.mjs';

const out = fileURLToPath(new URL('../ports/orca/', import.meta.url));
const src = await readDs('tokens.css');

/* ---------- tokens ---------- */
const decls = (block) =>
  Object.fromEntries(
    [...block.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/(--dd-[\w-]+)\s*:\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]),
  );
const ROOT = decls(tokenBlock(src, ':root {'));
const MODES = {
  dawn: { ...ROOT, ...decls(tokenBlock(src, ':root, [data-theme="dawn"] {')) },
  dusk: { ...ROOT, ...decls(tokenBlock(src, '[data-theme="dusk"] {')) },
};
let T = MODES.dusk; // the mode every helper below reads; set by use()

/* ---------- colour maths (sRGB <-> OKLab, CSS color-mix with premultiplied alpha) ---------- */
const lin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const gam = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
function toLab({ r, g, b }) {
  const [R, G, B] = [r, g, b].map(lin);
  const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
  const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
  const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
  return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s];
}
function fromLab([L, A, B]) {
  const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3;
  const m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3;
  const s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3;
  const c = (v) => Math.min(1, Math.max(0, gam(v)));
  return { r: c(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s), g: c(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s), b: c(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s) };
}
/** color-mix(in oklab, a p, b 1-p) */
function mix(a, b, p) {
  const alpha = a.a * p + b.a * (1 - p);
  if (alpha === 0) return { r: 0, g: 0, b: 0, a: 0 };
  const [la, lb] = [toLab(a), toLab(b)];
  const lab = la.map((v, i) => (v * a.a * p + lb[i] * b.a * (1 - p)) / alpha);
  return { ...fromLab(lab), a: alpha };
}
/** A translucent colour painted over an opaque one (what the browser shows). */
const over = (fg, bg) => ({ r: fg.r * fg.a + bg.r * (1 - fg.a), g: fg.g * fg.a + bg.g * (1 - fg.a), b: fg.b * fg.a + bg.b * (1 - fg.a), a: 1 });
const hex = (c) =>
  '#' + [c.r, c.g, c.b, ...(c.a < 1 ? [c.a] : [])].map((v) => Math.round(v * 255).toString(16).padStart(2, '0')).join('');

/* ---------- resolving token values ---------- */
function parse(v) {
  v = v.trim();
  if (v === 'transparent') return { r: 0, g: 0, b: 0, a: 0 };
  if (v === 'black') return { r: 0, g: 0, b: 0, a: 1 };
  let m;
  if ((m = v.match(/^#([0-9a-f]{6})$/i))) return { r: parseInt(m[1].slice(0, 2), 16) / 255, g: parseInt(m[1].slice(2, 4), 16) / 255, b: parseInt(m[1].slice(4), 16) / 255, a: 1 };
  if ((m = v.match(/^var\((--[\w-]+)(?:,\s*(.+))?\)$/))) return T[m[1]] ? parse(T[m[1]]) : parse(m[2]);
  if ((m = v.match(/^color-mix\(in oklab,\s*(.+)\)$/))) {
    const [a, b] = splitTop(m[1]).map((part) => {
      const pm = part.match(/^(.*?)\s+([\d.]+)%$/);
      return pm ? { c: parse(pm[1]), p: +pm[2] / 100 } : { c: parse(part), p: null };
    });
    const p = a.p ?? (b.p != null ? 1 - b.p : 0.5);
    return mix(a.c, b.c, p);
  }
  throw new Error(`can't resolve colour: ${v}`);
}
function splitTop(s) {
  const parts = [];
  let depth = 0, from = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') depth++;
    else if (s[i] === ')') depth--;
    else if (s[i] === ',' && depth === 0) parts.push(s.slice(from, i).trim()), (from = i + 1);
  }
  return [...parts, s.slice(from).trim()];
}
const t = (name) => parse(`var(--dd-${name})`);
const k = (a, p, b) => mix(typeof a === 'string' ? t(a) : a, typeof b === 'string' ? t(b) : b, p / 100);
const alpha = (c, a) => ({ ...c, a });
const wash = (pct, ground) => over(alpha(t('text'), pct / 100), ground);
const use = (mode) => (T = MODES[mode]);

/* Status hues. Dusk takes them as they are (the dd terminal's dark ground); dawn takes the .dd-code shell mixes, pulled
   toward the text so each holds 4.5:1 on the light page. */
const status = (mode) =>
  mode === 'dawn'
    ? { ok: k('ok', 68, 'text'), warn: k('warn', 54, 'text'), bad: k('bad', 82, 'text'), info: t('syntax-function') }
    : { ok: t('ok'), warn: t('warn'), bad: t('bad'), info: t('info') };

/* ---------- app theme ---------- */
// Options a variant can change; the defaults are the system as it is. (Variants aren't shipped: one theme per mode.)
function appTheme(mode, { lines = 8, tabs = 'underline' } = {}) {
  use(mode);
  const text = t('text');
  const bg = t('bg');
  const side = wash(6, bg); // the side-nav rail: text 6% into the page
  const [pri, onPri] = [t('primary'), t('on-primary')];
  // Links: apricot reads on the dusk ground; on dawn it takes the .dd-code prompt mix (half apricot, half text).
  const link = mode === 'dawn' ? k('primary', 50, 'text') : pri;
  const st = status(mode);
  const line = wash(lines, bg);
  const ring = (ground) => over(alpha(t('accent'), 0.45), ground); // --dd-ring
  const tabBar = tabs === 'underline' ? bg : side;
  const tok = {
    '--background': bg,
    '--editor-surface': bg,
    '--foreground': text,
    '--card': t('surface'),
    '--card-foreground': text,
    '--popover': t('float-bg'),
    '--popover-foreground': text,
    '--primary': pri,
    '--primary-foreground': onPri,
    '--secondary': t('btn-secondary'),
    '--secondary-foreground': text,
    '--muted': t('surface-2'),
    '--muted-foreground': t('muted'),
    '--accent': wash(10, bg), // side-nav "on"
    '--accent-foreground': text,
    '--border': line,
    '--input': wash(12, bg),
    '--ring': ring(bg),
    '--chart-1': pri,
    '--chart-2': t('set-1'),
    '--chart-3': t('ok'),
    '--chart-4': t('info'),
    '--chart-5': t('set-5'),
    '--sidebar': side,
    '--sidebar-foreground': text,
    '--sidebar-primary': pri,
    '--sidebar-primary-foreground': onPri,
    '--sidebar-accent': wash(10, side),
    '--sidebar-accent-foreground': text,
    '--sidebar-border': wash(lines, side),
    '--sidebar-ring': ring(side),
    '--worktree-sidebar': side,
    '--worktree-sidebar-foreground': text,
    '--worktree-sidebar-accent': wash(4, side), // side-nav hover: quieter than current
    '--worktree-sidebar-accent-foreground': text,
    '--worktree-sidebar-border': wash(lines, side),
    '--worktree-sidebar-ring': ring(side),
    '--worktree-sidebar-active': wash(10, side), // side-nav current, no border
    '--worktree-sidebar-active-border': wash(10, side),
    '--host-badge': wash(9, side),
    '--host-badge-foreground': t('muted'),
    '--tab-bar': tabBar,
    '--tab-active': bg,
    '--tab-active-foreground': text,
    // underline: the dd-tabs bar (a text-coloured line under the current tab); tone: no line, the active tab joins the editor
    '--tab-active-indicator': tabs === 'underline' ? text : bg,
    '--tab-inactive': tabBar,
    '--tab-inactive-foreground': t('muted'),
    '--split-divider': line,
    '--split-divider-hover': t('border-strong'),
    '--chat-user-message': alpha(text, 0.07), // --dd-wash
    '--chat-bold-foreground': text,
    '--chat-muted-foreground': t('muted'),
    '--chat-inline-code': alpha(text, 0.11), // .dd-code-inline
    '--chat-inline-code-foreground': text,
    '--chat-code-block': t('surface'), // .dd-code
    '--chat-selection': text, // ::selection is inverted
    '--chat-selection-foreground': bg,
    '--text-link': link,
    '--diff-added': st.ok,
    '--diff-removed': st.bad,
    '--git-decoration-added': st.ok,
    '--git-decoration-modified': st.warn,
    '--git-decoration-deleted': st.bad,
    '--git-decoration-renamed': st.info,
    '--git-decoration-untracked': k(st.ok, 60, text),
    '--git-decoration-copied': st.info,
    '--git-decoration-ignored': t('faint'),
  };
  return {
    schemaVersion: 1,
    base: mode === 'dawn' ? 'light' : 'dark',
    tokens: Object.fromEntries(Object.entries(tok).map(([key, c]) => [key, hex(c)])),
    tokenColors: tokenColors(st),
  };
}

/* Code colours: the docs' Shiki theme (site/lib/syntax.ts) with this mode's --dd-syntax-* values. */
function tokenColors(st) {
  const s = (name) => hex(t(`syntax-${name}`));
  const rule = (name, scope, settings) => ({ name, scope, settings });
  return [
    rule('Comments', ['comment', 'punctuation.definition.comment'], { foreground: s('comment'), fontStyle: 'italic' }),
    rule('Punctuation', ['punctuation', 'meta.brace', 'punctuation.definition.tag', 'punctuation.separator', 'punctuation.terminator', 'keyword.operator.assignment'], { foreground: s('punct') }),
    rule('Tags and headings', ['entity.name.tag', 'support.class.component', 'meta.tag.sgml', 'markup.heading', 'entity.name.section'], { foreground: s('tag') }),
    rule('Keywords', ['keyword', 'storage', 'storage.type', 'keyword.control', 'keyword.operator.new', 'keyword.operator.expression', 'variable.language', 'constant.language.boolean', 'keyword.other.important'], { foreground: s('keyword') }),
    rule('Attributes and properties', ['entity.other.attribute-name', 'support.type.property-name', 'meta.property-name', 'variable.other.property', 'meta.object-literal.key', 'entity.name.tag.yaml', 'support.type.vendored.property-name'], { foreground: s('attr') }),
    rule('Strings', ['string', 'string.quoted', 'string.template', 'meta.attribute-value', 'markup.inline.raw', 'markup.raw'], { foreground: s('string') }),
    rule('Numbers and constants', ['constant.numeric', 'constant.language', 'constant.other', 'support.constant', 'keyword.other.unit', 'constant.other.color'], { foreground: s('number') }),
    rule('Functions', ['entity.name.function', 'support.function', 'meta.function-call entity.name.function', 'entity.other.attribute-name.class.css', 'entity.other.attribute-name.id.css', 'entity.name.tag.css', 'markup.underline.link'], { foreground: s('function') }),
    rule('Variables', ['variable.parameter', 'support.variable', 'variable.other.env', 'variable.other.normal.shell', 'punctuation.definition.variable'], { foreground: s('variable') }),
    rule('Inserted', ['markup.inserted'], { foreground: hex(st.ok) }),
    rule('Deleted', ['markup.deleted'], { foreground: hex(st.bad) }),
    rule('Changed', ['markup.changed'], { foreground: hex(st.warn) }),
    rule('Invalid', ['invalid'], { foreground: hex(st.bad) }),
    rule('Headings', ['markup.heading'], { fontStyle: 'bold' }),
    rule('Bold', ['markup.bold'], { fontStyle: 'bold' }),
    rule('Italic', ['markup.italic'], { fontStyle: 'italic' }),
  ];
}

/* ---------- terminal palettes ---------- */
function terminalTheme(mode) {
  use(mode);
  const text = t('text');
  const bg = t('bg');
  const st = status(mode);
  const cyan = k(st.info, 50, st.ok); // the set has no teal: halfway between info and sage
  const base = {
    background: bg,
    foreground: text,
    cursor: text, // the dd terminal's block cursor
    cursorAccent: bg,
    selectionBackground: text, // ::selection is inverted
    selectionForeground: bg,
    bold: text,
    red: st.bad,
    green: st.ok,
    yellow: st.warn,
    blue: st.info,
    magenta: t('syntax-keyword'),
    cyan,
    brightBlack: t('quiet'),
  };
  const pal =
    mode === 'dawn'
      ? {
          ...base,
          black: text,
          white: t('surface-3'),
          brightRed: t('syntax-number'),
          brightGreen: t('syntax-string'),
          brightYellow: t('syntax-attr'),
          brightBlue: k('info', 85, 'text'),
          brightMagenta: k('set-5', 62, 'text'),
          brightCyan: k(cyan, 85, text),
          brightWhite: t('float-bg'),
        }
      : {
          ...base,
          black: t('surface-3'),
          white: t('tone-1'),
          brightRed: k(st.bad, 72, text),
          brightGreen: k(st.ok, 72, text),
          brightYellow: k(st.warn, 72, text),
          brightBlue: k(st.info, 72, text),
          brightMagenta: t('set-5'),
          brightCyan: k(cyan, 72, text),
          brightWhite: text,
        };
  return {
    schemaVersion: 1,
    mode: mode === 'dawn' ? 'light' : 'dark',
    terminal: Object.fromEntries(Object.entries(pal).map(([key, c]) => [key, hex(c)])),
  };
}

/* ---------- write ---------- */
// One app theme per mode under one name, so "dawn & dusk" is the pick in both Orca's Light and Dark theme slots.
const NAME = 'dawn & dusk';
const APP = [
  ['dawn', NAME],
  ['dusk', NAME],
];
const TERM = [
  ['dawn', `${NAME} · dawn`],
  ['dusk', `${NAME} · dusk`],
];

await rm(out + 'themes', { recursive: true, force: true });
await rm(out + 'terminal', { recursive: true, force: true });
await mkdir(out + 'themes', { recursive: true });
await mkdir(out + 'terminal', { recursive: true });
const json = (v) => JSON.stringify(v, null, 2) + '\n';
for (const [id] of APP) await writeFile(`${out}themes/${id}.json`, json(appTheme(id)));
for (const [id] of TERM) await writeFile(`${out}terminal/${id}.json`, json(terminalTheme(id)));

const pkg = JSON.parse(await readDs('../package.json'));
await writeFile(
  out + 'orca-plugin.json',
  json({
    manifestVersion: 2,
    id: 'dawn-and-dusk',
    name: NAME,
    version: pkg.version,
    description: 'The dawn & dusk design system for Orca: dawn in light mode, dusk in dark, with matching terminal and code colours.',
    license: 'MIT',
    repository: 'https://github.com/cxkw-dev/dawn-and-dusk/tree/main/ports/orca',
    engines: { orca: '>=1.4.246' },
    execution: 'data',
    contributes: {
      themes: APP.map(([id, title]) => ({ id, title, path: `themes/${id}.json` })),
      terminalThemes: TERM.map(([id, title]) => ({ id, title, path: `terminal/${id}.json` })),
    },
  }),
);
console.log(`ports/orca: ${APP.length} app themes, ${TERM.length} terminal palettes`);
