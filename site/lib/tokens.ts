// Reads ds/tokens.css so the docs show the real values (no copy that can drift).
import css from '../../ds/tokens.css?raw';

const block = (selector: string) => {
  const start = css.indexOf(selector);
  const open = css.indexOf('{', start);
  return css.slice(open + 1, css.indexOf('\n}', open));
};
const parse = (body: string) =>
  Object.fromEntries([...body.matchAll(/--dd-([\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));

export const base = parse(block(':root {'));
export const dawn = parse(block(':root, [data-theme="dawn"] {'));
export const dusk = parse(block('[data-theme="dusk"] {'));
/** Names after `/* … *\/` on the color-set lines, e.g. set-1 → honey. */
export const setNames = Object.fromEntries([...css.matchAll(/--dd-(set-\d): [^;]+; \/\* (\w+) \*\//g)].map((m) => [m[1], m[2]]));
