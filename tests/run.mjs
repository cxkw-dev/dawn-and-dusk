// Runs every tests/*.test.mjs in headless Chrome against the docs site (DD_BASE, default: the local dev server).
// usage: npm test                 all tests
//        npm test -- menu tabs    only files whose name contains "menu" or "tabs"
import { readdirSync } from 'node:fs';
import { strict as assert } from 'node:assert';
import { launch, open as openPage, BASE } from './lib/browser.mjs';
import { tests, setFile } from './lib/test.mjs';

const filters = process.argv.slice(2);
const dir = new URL('.', import.meta.url);
const files = readdirSync(dir).filter((f) => f.endsWith('.test.mjs') && (!filters.length || filters.some((x) => f.includes(x)))).sort();
for (const f of files) { setFile(f); await import(new URL(f, dir)); }
const run = tests.some((t) => t.only) ? tests.filter((t) => t.only) : tests;

try { await fetch(BASE); } catch { console.error(`Docs site not reachable at ${BASE} — start it with \`npm run dev\` (or set DD_BASE).`); process.exit(2); }
const browser = await launch();
let failed = 0; const t0 = Date.now();
for (const t of run) {
  const pages = [];
  const open = async (path, opts) => { const p = await openPage(browser, path, opts); pages.push(p); return p; };
  try {
    await t.fn({ open, assert });
    const errs = pages.flatMap((p) => p.errors);
    if (errs.length) throw new Error(`page errors:\n    ${errs.join('\n    ')}`);
    console.log(`  ✓ ${t.file.replace('.test.mjs', '')} › ${t.name}`);
  } catch (e) {
    failed++; console.log(`  ✕ ${t.file.replace('.test.mjs', '')} › ${t.name}\n    ${String(e.message || e).split('\n').join('\n    ')}`);
  } finally { for (const p of pages) await p.close(); }
}
await browser.close();
console.log(`\n${run.length - failed} passed, ${failed} failed (${((Date.now() - t0) / 1000).toFixed(1)}s)`);
process.exit(failed ? 1 : 0);
