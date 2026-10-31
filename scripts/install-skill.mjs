// Installs the dawn & dusk agent skill into ONE project (never globally — client projects keep their own design).
// usage: npm run skill:install -- <project-dir>     → <project-dir>/.claude/skills/dawn-and-dusk (replaced if present)
import { cp, rm, mkdir, stat } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const target = process.argv[2];
if (!target) { console.error('usage: npm run skill:install -- <project-dir>'); process.exit(1); }
const project = resolve(target.replace(/^~(?=\/|$)/, process.env.HOME));
await stat(project).catch(() => { console.error(`no such folder: ${project}`); process.exit(1); });
const src = new URL('../skill/dawn-and-dusk/', import.meta.url).pathname;
const dest = join(project, '.claude', 'skills', 'dawn-and-dusk');
await rm(dest, { recursive: true, force: true });
await mkdir(join(project, '.claude', 'skills'), { recursive: true });
await cp(src, dest, { recursive: true, filter: (p) => !p.includes('/evals') });
console.log(`dawn & dusk skill → ${dest}`);
