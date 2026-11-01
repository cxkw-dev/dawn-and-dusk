// Consumer-only distribution. The repository's Astro dependencies never enter the published manifest.
// Writes the package to dist-package/ and the release downloads (the packed tarball and three starter ZIPs) to
// dist-package/downloads/, outside the docs' public folder: they are published as GitHub release assets, not on Pages.
// Needs `zip` on the PATH.
import { readFile, writeFile, mkdir, rm, copyFile, cp, readdir } from 'node:fs/promises';
import { basename, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync, execSync } from 'node:child_process';
import { build, transform } from 'esbuild';
import { themeScript } from '../library/theme-source.mjs';
import { tailwindEntry } from './tailwind-entry.mjs';
import { releaseAsset, stylesheetParts } from './ds-source.mjs';
const root = fileURLToPath(new URL('..', import.meta.url));
const at = (...parts) => join(root, ...parts);
const pkg = JSON.parse(await readFile(at('package.json'), 'utf8'));
const out = at('dist-package');
const downloads = join(out, 'downloads');
const version = pkg.version;
await rm(out, { recursive: true, force: true });
await mkdir(downloads, { recursive: true });
await mkdir(at('library/generated'), { recursive: true });
const sprite = await readFile(at('release/icons.svg'), 'utf8');
const icons = Object.fromEntries([...sprite.matchAll(/<symbol id="dd-i-([\w-]+)" viewBox="([^"]+)">([\s\S]*?)<\/symbol>/g)].map((m) => [m[1], { viewBox: m[2], body: m[3] }]));
if (!Object.keys(icons).length) throw new Error('No icons extracted');
await writeFile(at('library/generated/icons.ts'), `// Generated from ds/icons/icons.svg.\nexport type IconName = ${Object.keys(icons).map(JSON.stringify).join(' | ')};\nexport const icons: Record<IconName, { viewBox: string; body: string }> = ${JSON.stringify(icons)};\n`);
const css = await readFile(at('release/dawn-and-dusk.css'), 'utf8');
await writeFile(join(out, 'styles.css'), (await transform(css, { loader: 'css', minify: true })).code);
// The font URL contains semicolons, so match up to the closing parenthesis, not the first ';'.
const fontImport = /@import\s+url\([^)]*\)\s*;/g;
const fonts = css.match(fontImport)?.[0];
if (!fonts) throw new Error('No font @import found in the stylesheet');
await writeFile(join(out, 'styles-no-fonts.css'), (await transform(css.replace(fontImport, ''), { loader: 'css', minify: true })).code);
await copyFile(at('release/tokens.css'), join(out, 'tokens.css'));
// Tailwind CSS v4: tailwind.css layers tokens.css and core.css (base + components, no fonts or tokens: the same sources
// as the release stylesheet) and maps the tokens to Tailwind's theme. fonts.css is separate because an @import url()
// must stay first in the app's compiled CSS.
const { core, tokens } = await stylesheetParts();
await writeFile(join(out, 'core.css'), (await transform(core, { loader: 'css', minify: true })).code);
await writeFile(join(out, 'fonts.css'), `/* dawn & dusk webfonts. In a Tailwind app, import this before "tailwindcss". */\n${fonts}\n`);
await writeFile(join(out, 'tailwind.css'), tailwindEntry(tokens, { version }));
await copyFile(at('release/icons.svg'), join(out, 'icons.svg'));
const runtime = await readFile(at('release/dawn-and-dusk.js'), 'utf8');
const auto = `(() => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  const key = Symbol.for('dawn-and-dusk.runtime');
  if (window[key]) return;
  window[key] = true;
  function start() {
    if (!document.getElementById('dd-i-plus') && !window.dd?.iconSprite) {
      const host = document.createElement('div');
      host.hidden = true; host.dataset.ddIcons = ''; host.innerHTML = ${JSON.stringify(sprite)};
      document.body.prepend(host);
    }
    ${runtime}
    document.dispatchEvent(new Event('dd:ready'));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true }); else start();
})();`;
await writeFile(join(out, 'auto.js'), (await transform(auto, { minify: true, target: 'es2022', legalComments: 'none' })).code);
await writeFile(join(out, 'auto.d.ts'), 'export {};\n');
await writeFile(join(out, 'theme.js'), themeScript + '\n');
await build({ entryPoints: [at('library/react.tsx')], outfile: join(out, 'react.js'), bundle: true, format: 'esm', jsx: 'automatic', external: ['react', 'react/*'], minify: true, banner: { js: '"use client";' }, logLevel: 'error' });
await build({ entryPoints: [at('library/theme.tsx')], outfile: join(out, 'theme.js.mjs'), bundle: true, format: 'esm', jsx: 'automatic', external: ['react', 'react/*'], minify: true, logLevel: 'error' });
execFileSync(process.execPath, [at('node_modules/typescript/bin/tsc'), '-p', at('library/tsconfig.json')], { cwd: root, stdio: 'inherit' });
await copyFile(at('library/theme-source.d.mts'), join(out, 'theme-source.d.mts'));
await writeFile(join(out, 'package.json'), JSON.stringify({
  name: 'dawn-and-dusk', version, description: pkg.description, type: 'module', license: pkg.license,
  homepage: pkg.homepage, repository: pkg.repository,
  files: ['*.css', '*.js', '*.mjs', '*.d.ts', '*.d.mts', 'generated/*.d.ts', 'icons.svg', 'README.md', 'LICENSE', 'THIRD_PARTY_NOTICES.md'],
  exports: {
    './styles.css': './styles.css', './styles-no-fonts.css': './styles-no-fonts.css', './tokens.css': './tokens.css',
    './tailwind.css': './tailwind.css', './fonts.css': './fonts.css', './core.css': './core.css',
    './icons.svg': './icons.svg', './auto': { types: './auto.d.ts', default: './auto.js' }, './auto.js': './auto.js',
    './react': { types: './react.d.ts', default: './react.js' },
    './theme': { types: './theme.d.ts', default: './theme.js.mjs' }, './theme.js': './theme.js', './package.json': './package.json'
  },
  sideEffects: ['*.css', './auto.js', './theme.js'],
  peerDependencies: { react: '^18.0.0 || ^19.0.0' }, peerDependenciesMeta: { react: { optional: true } }
}, null, 2) + '\n');
for (const file of ['LICENSE', 'THIRD_PARTY_NOTICES.md']) await copyFile(at(file), join(out, file));
await copyFile(at('library/README.md'), join(out, 'README.md'));
// npm is npm.cmd on Windows, which Node only runs through a shell; quote the arguments there, as paths may hold spaces.
const npm = (args) => process.platform === 'win32'
  ? execSync(['npm', ...args].map((a) => `"${a}"`).join(' '), { cwd: root, encoding: 'utf8' })
  : execFileSync('npm', args, { cwd: root, encoding: 'utf8' });
const packed = JSON.parse(npm(['pack', out, '--pack-destination', downloads, '--json']))[0];
if (packed.files.some((f) => f.path.startsWith('downloads/'))) throw new Error('build-package: the package must not contain downloads/');
const url = releaseAsset(version);
if (basename(url) !== packed.filename) throw new Error(`build-package: npm packed ${packed.filename}, but the release URL names ${basename(url)}`);
// Build three standalone starters. Source uses placeholders so every archive gets the exact release URL and the
// pre-paint theme script.
const staging = at('.astro/starter-build');
await rm(staging, { recursive: true, force: true });
await mkdir(staging, { recursive: true });
async function replaceTokens(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = join(dir, entry.name);
    if (entry.isDirectory()) await replaceTokens(file);
    else await writeFile(file, (await readFile(file, 'utf8')).replaceAll('__PACKAGE_URL__', url).replaceAll('__THEME_SCRIPT__', themeScript));
  }
}
for (const kind of ['html', 'react', 'next']) {
  const dir = join(staging, `dawn-and-dusk-${kind}`);
  await cp(at('starters', kind), dir, { recursive: true });
  await replaceTokens(dir);
  if (kind === 'html') {
    await mkdir(join(dir, 'dd'));
    for (const file of ['styles.css', 'auto.js', 'theme.js']) await copyFile(join(out, file), join(dir, 'dd', file));
  }
  for (const file of ['LICENSE', 'THIRD_PARTY_NOTICES.md']) await copyFile(at(file), join(dir, file));
  const zip = join(downloads, `dawn-and-dusk-${kind}-${version}.zip`);
  await rm(zip, { force: true });
  execFileSync('zip', ['-qr', zip, `dawn-and-dusk-${kind}`], { cwd: staging });
}
console.log(`consumer package: ${packed.filename} — ${packed.files.length} files, ${Math.round(packed.size / 1024)} KiB packed; three standalone starters`);
