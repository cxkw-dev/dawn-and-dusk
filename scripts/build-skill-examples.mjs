// Copy-ready markup for the agent skill, taken from the built docs (dist/), so every snippet is one that renders and is
// covered by the behaviour tests. Writes skill/dawn-and-dusk/references/components/<name>.md and an index.
// Runs after `astro build` (npm run build does both).
import { readdir, readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const dist = join(root, 'dist', 'components');
const outDir = join(root, 'skill', 'dawn-and-dusk', 'references', 'components');
const nav = await Promise.all((await readdir(join(root, 'site', 'nav'))).sort().map(async (f) => (await import(join(root, 'site', 'nav', f))).default));

const decode = (s) => s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#x27;/g, "'").replace(/&amp;/g, '&');
const text = (s) => decode(s.replace(/<code>(.*?)<\/code>/g, '`$1`').replace(/<a [^>]*>(.*?)<\/a>/g, '$1').replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });
const index = [];
for (const group of nav) {
  const items = group.items.filter((it) => it.href.startsWith('components/'));
  if (!items.length) continue;
  index.push(`**${group.group}:** ${items.map((it) => `[${it.title}](components/${it.href.split('/')[1]}.md)`).join(' · ')}`);
  for (const it of items) {
    const name = it.href.split('/')[1];
    const html = await readFile(join(dist, name, 'index.html'), 'utf8').catch(() => null);
    if (!html) continue;
    const lead = text((html.match(/<p class="dd-lead">([\s\S]*?)<\/p>/) ?? [, ''])[1]);
    const md = [`# ${it.title.toLowerCase()} — \`${name}\``, '', lead, '', `Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/${name}`, '',
      'Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.', ''];
    const main = html.slice(html.indexOf('<main'), html.lastIndexOf('</main>'));
    const tokens = /<figure class="ex">([\s\S]*?)<\/figure>|<h2[^>]*>([\s\S]*?)<\/h2>|<p>([\s\S]*?)<\/p>|<ul>([\s\S]*?)<\/ul>|<pre[^>]*>([\s\S]*?)<\/pre>|<table class="doc-table">([\s\S]*?)<\/table>|<div class="doc-guides">([\s\S]*?)<\/div>\s*<\/div>\s*(?=<|$)/g;
    let section = '';
    for (const t of main.matchAll(tokens)) {
      const [, fig, h2, para, list, pre, table, guides] = t;
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
