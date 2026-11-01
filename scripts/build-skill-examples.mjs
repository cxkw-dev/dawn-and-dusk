// Copy-ready markup for the agent skill, taken from the built docs (dist/), so every snippet is one that renders and is
// covered by the behaviour tests. Writes skill/dawn-and-dusk/references/components/<name>.md and an index.
// Runs after `astro build` (npm run build does both): node scripts/build-skill-examples.mjs
import { readdir, readFile, writeFile, mkdir, rm, access } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist', 'components');
const outDir = join(root, 'skill', 'dawn-and-dusk', 'references', 'components');
const navDir = join(root, 'site', 'nav');
const nav = await Promise.all((await readdir(navDir)).filter((f) => f.endsWith('.mjs')).sort().map(async (f) => (await import(pathToFileURL(join(navDir, f)).href)).default));

// Every component page in the nav must be built; check before touching the skill, so a missing build can't empty it.
const pages = nav.flatMap((group) => group.items.filter((it) => it.href.startsWith('components/')).map((it) => it.href.split('/')[1]));
const missing = [];
for (const name of pages) await access(join(dist, name, 'index.html')).catch(() => missing.push(name));
if (missing.length) {
  console.error(`build-skill-examples: no built page for ${missing.length === pages.length ? 'any component' : missing.join(', ')} in dist/components/ — run \`npm run build\` (astro build) first.`);
  process.exit(1);
}

// Named entities Astro and Shiki emit, and any numeric one (Shiki writes `<` as &#x3C;); &amp; last, so it can't double-decode.
const decode = (s) => s.replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16))).replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
  .replace(/&amp;/g, '&');
const text = (s) => decode(s.replace(/<code>(.*?)<\/code>/g, '`$1`').replace(/<a [^>]*>(.*?)<\/a>/g, '$1').replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();

/** Index of the </figure> that closes the <figure> opening at `from`. */
const closeOf = (html, from) => {
  const tag = /<figure[\s>]|<\/figure>/g;
  tag.lastIndex = from;
  for (let depth = 0, m; (m = tag.exec(html));) {
    depth += m[0][1] === '/' ? -1 : 1;
    if (!depth) return m.index;
  }
  throw new Error('build-skill-examples: unclosed <figure class="ex">');
};

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });
const index = [];
for (const group of nav) {
  const items = group.items.filter((it) => it.href.startsWith('components/'));
  if (!items.length) continue;
  index.push(`**${group.group}:** ${items.map((it) => `[${it.title}](components/${it.href.split('/')[1]}.md)`).join(' · ')}`);
  for (const it of items) {
    const name = it.href.split('/')[1];
    const html = await readFile(join(dist, name, 'index.html'), 'utf8');
    const lead = text((html.match(/<p class="dd-lead">([\s\S]*?)<\/p>/) ?? [, ''])[1]);
    const md = [`# ${it.title.toLowerCase()} — \`${name}\``, '', lead, '', `Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/${name}`, '',
      'Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.', ''];
    const main = html.slice(html.indexOf('<main'), html.lastIndexOf('</main>'));
    // An example's own markup can hold figures (charts, code blocks), so an example runs to its matching </figure>.
    const tokens = /<figure class="ex">|<h2[^>]*>([\s\S]*?)<\/h2>|<p>([\s\S]*?)<\/p>|<ul>([\s\S]*?)<\/ul>|<pre[^>]*>([\s\S]*?)<\/pre>|<table class="doc-table">([\s\S]*?)<\/table>|<div class="doc-guides">([\s\S]*?)<\/div>\s*<\/div>\s*(?=<|$)/g;
    let section = '';
    for (let t; (t = tokens.exec(main));) {
      let fig;
      if (t[0] === '<figure class="ex">') {
        const end = closeOf(main, t.index);
        fig = main.slice(t.index + t[0].length, end);
        tokens.lastIndex = end + '</figure>'.length;
      }
      const [, h2, para, list, pre, table, guides] = t;
      if (h2 !== undefined) { section = text(h2); if (!/^guidelines$/i.test(section)) md.push(`## ${section.charAt(0).toUpperCase()}${section.slice(1)}`, ''); continue; }
      if (fig !== undefined) {
        const title = text((fig.match(/<h3 class="dd-h5">([\s\S]*?)<\/h3>/) ?? [, ''])[1]);
        const cap = text((fig.match(/<p class="dd-small dd-muted">([\s\S]*?)<\/p>/) ?? [, ''])[1]);
        const code = (fig.match(/<button class="ex-btn" type="button" data-dd-copy="([^"]*)"/) ?? [])[1];
        if (!code) continue;
        if (title) md.push(`### ${title}`, '');
        if (cap) md.push(cap, '');
        md.push('```html', decode(code).trim(), '```', '');
        continue;
      }
      if (para !== undefined) { const x = text(para); if (x) md.push(x, ''); continue; }
      if (list !== undefined) { md.push(...[...list.matchAll(/<li>([\s\S]*?)<\/li>/g)].map((m) => `- ${text(m[1])}`), ''); continue; }
      if (pre !== undefined) { const lang = /language-(\w+)|data-language="(\w+)"/.exec(t[0]); md.push('```' + (lang?.[1] || lang?.[2] || ''), decode(pre.replace(/<[^>]+>/g, '')).replace(/\n+$/, ''), '```', ''); continue; }
      if (table !== undefined) {
        const rows = [...table.matchAll(/<tr><td>([\s\S]*?)<\/td><td>([\s\S]*?)<\/td><\/tr>/g)].map((m) => `| ${text(m[1])} | ${text(m[2]).replace(/\|/g, '\\|')} |`);
        if (rows.length) md.push('| class / attribute | what it does |', '|---|---|', ...rows, '');
        continue;
      }
      if (guides !== undefined) {
        const part = (cls) => [...((guides.match(new RegExp(`<div class="doc-guide ${cls}">([\\s\\S]*?)</ul>`)) ?? [, ''])[1].matchAll(/<li>([\s\S]*?)<\/li>/g))].map((m) => `- ${text(m[1])}`);
        const dos = part('is-do'), donts = part('is-dont');
        md.push('## Guidelines', '', ...(dos.length ? ['Do:', ...dos, ''] : []), ...(donts.length ? ["Don't:", ...donts, ''] : []));
      }
    }
    await writeFile(join(outDir, `${name}.md`), md.join('\n'));
  }
}
await writeFile(join(outDir, '..', 'components-index.md'), ['# Component index', '', 'Copy-ready markup per component (read the one you need):', '', ...index.map((l) => `- ${l}`), ''].join('\n'));
console.log(`skill examples: ${(await readdir(outDir)).length} component files → skill/dawn-and-dusk/references/components/`);
