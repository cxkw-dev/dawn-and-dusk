// What the build scripts read from ds/ and where releases live, in one place, so the release stylesheet, the package's
// core.css, the skill's tokens.md and the Tailwind entry can't disagree. Used by build-ds.mjs, build-package.mjs and
// tailwind-entry.mjs.
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ds = fileURLToPath(new URL('../ds/', import.meta.url));
/** A file under ds/, as text. */
export const readDs = (path) => readFile(join(ds, path), 'utf8');
/** The files in a ds/ folder with an extension, sorted. */
export const listDs = async (dir, ext) => (await readdir(join(ds, dir))).filter((f) => f.endsWith(ext)).sort();

/**
 * The stylesheet in load order: fonts.css, tokens.css, then `core` — base.css and every component, each component after
 * a marker comment. The release stylesheet is all three; the package's core.css (under Tailwind) is `core` alone.
 */
export async function stylesheetParts() {
  const components = await listDs('components', '.css');
  const core = [await readDs('base.css')];
  for (const f of components) core.push(`\n/* ===== components/${f} ===== */\n` + (await readDs(`components/${f}`)));
  return { components, fonts: await readDs('fonts.css'), tokens: await readDs('tokens.css'), core: core.join('\n') };
}

/** The body of the tokens.css rule that starts with `selector` (e.g. ':root {'), up to its closing brace. */
export function tokenBlock(src, selector) {
  const at = src.indexOf(selector);
  if (at < 0) throw new Error(`tokens.css: no rule starts with ${selector}`);
  const open = src.indexOf('{', at);
  return src.slice(open + 1, src.indexOf('\n}', open));
}

/** A release download: the package tarball, or a starter archive ('html' | 'react' | 'next'). */
export const releaseAsset = (version, starter) =>
  `https://github.com/cxkw-dev/dawn-and-dusk/releases/download/v${version}/dawn-and-dusk-${starter ? `${starter}-` : ''}${version}.${starter ? 'zip' : 'tgz'}`;
