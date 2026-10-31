// Installs the dawn & dusk agent skill into ONE project (never globally — client projects keep their own design).
// usage: npm run skill:install -- <project-dir>   → <project-dir>/.claude/skills/dawn-and-dusk (replaced if present)
// The skill's evals/ stay behind: they are for developing the skill, not for using it.
import { cp, rm, mkdir, stat, realpath } from 'node:fs/promises';
import { join, relative, resolve, sep } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';

const target = process.argv[2];
if (!target) { console.error('usage: npm run skill:install -- <project-dir>'); process.exit(1); }
let project = resolve(target.replace(/^~(?=\/|$)/, homedir()));
const isDir = await stat(project).then((s) => s.isDirectory(), () => false);
if (!isDir) { console.error(`skill:install: no such folder: ${project}`); process.exit(1); }
project = await realpath(project);
if (project === await realpath(homedir())) {
  console.error('skill:install: choose a project folder, not your home directory; global installation is not supported.');
  process.exit(1);
}

const src = fileURLToPath(new URL('../skill/dawn-and-dusk/', import.meta.url));
const dest = join(project, '.claude', 'skills', 'dawn-and-dusk');
await rm(dest, { recursive: true, force: true });
await mkdir(join(project, '.claude', 'skills'), { recursive: true });
await cp(src, dest, { recursive: true, filter: (p) => relative(src, p).split(sep)[0] !== 'evals' });
console.log(`dawn & dusk skill → ${dest}`);
