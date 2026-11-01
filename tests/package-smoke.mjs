// Tests the packed artifact in fresh consumer projects, not imports from repository source.
import { strict as assert } from 'node:assert';
import { mkdtemp, readFile, writeFile, mkdir, cp, rm, access } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync, spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { launch, open } from './lib/browser.mjs';
const root = fileURLToPath(new URL('..', import.meta.url));
const pkg = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));
const downloads = join(root, 'dist-package/downloads'); // written by npm run build:package
const tarball = join(downloads, `dawn-and-dusk-${pkg.version}.tgz`);
await access(tarball);
const temp = await mkdtemp(join(tmpdir(), 'dawn-consumer-'));
console.log(`Fresh consumer projects: ${temp}`);
const processes = [], servers = [];
let browser;
function run(cmd, args, cwd) {
  const result = spawnSync(cmd, args, { cwd, encoding: 'utf8', env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' }, timeout: 180000 });
  if (result.status !== 0) throw new Error(`${cmd} ${args.join(' ')} failed\n${result.error || ''}\n${result.stdout}\n${result.stderr}`);
  return result.stdout;
}
async function serve(folder) {
  const server = createServer(async (req, res) => {
    const path = decodeURIComponent(new URL(req.url, 'http://local').pathname);
    const file = join(folder, path.endsWith('/') ? path + 'index.html' : path);
    try {
      const body = await readFile(file);
      const ext = file.split('.').pop();
      res.setHeader('Content-Type', ({ html: 'text/html', js: 'text/javascript', css: 'text/css', svg: 'image/svg+xml' })[ext] || 'application/octet-stream');
      res.end(body);
    } catch { res.statusCode = 404; res.end('Not found'); }
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve)); servers.push(server);
  return `http://127.0.0.1:${server.address().port}/`;
}
async function checkApp(url, label) {
  const page = await open(browser, url, { width: 375 });
  try {
    assert.equal(await page.count('input'), 1);
    await page.focus('input'); await page.type('New workspace');
    await page.click('button[type="submit"]');
    assert.match(await page.text('[role="status"]'), /New workspace.*ready/);
    assert.ok(await page.exists('button svg path'), 'inline icon works without copying a sprite');
    const before = await page.attr('html', 'data-theme');
    const pressed = () => page.attr('button[type="button"]', 'aria-pressed');
    assert.equal(await pressed(), String((await page.get(() => document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dusk' : 'dawn'))) === 'dusk'), 'the theme toggle reports dusk with aria-pressed once mounted');
    await page.click('button[type="button"]');
    assert.notEqual(await page.attr('html', 'data-theme'), before);
    const chosenTheme = await page.attr('html', 'data-theme');
    assert.equal(await pressed(), String(chosenTheme === 'dusk'), 'aria-pressed follows the theme');
    await page.sleep(100);
    assert.ok(!(await page.get(() => [...document.querySelectorAll('style')].some((s) => s.textContent.includes('transition:none')))), 'the swap turns transitions back on after a frame');
    await page.evaluate(() => location.reload());
    await page.sleep(700);
    assert.equal(await page.attr('html', 'data-theme'), chosenTheme, 'the chosen theme survives reload');
    assert.ok(await page.get(() => document.documentElement.scrollWidth <= innerWidth));
    assert.deepEqual(page.errors, []);
    console.log(`${label}: controlled form, inline icons, theme persistence, hydration and mobile layout pass`);
  } finally { await page.close(); }
}
try {
  const plain = join(temp, 'plain'); await mkdir(plain);
  await writeFile(join(plain, 'package.json'), JSON.stringify({ private: true, type: 'module' }));
  run('npm', ['install', '--ignore-scripts', '--no-audit', '--no-fund', tarball], plain);
  const installed = join(plain, 'node_modules/dawn-and-dusk');
  await assert.rejects(access(join(plain, 'node_modules/react')), 'React must remain optional');
  const manifest = JSON.parse(await readFile(join(installed, 'package.json'), 'utf8'));
  assert.equal(manifest.license, 'MIT'); assert.equal(manifest.devDependencies, undefined);
  await assert.rejects(access(join(installed, 'site')));
  assert.ok(!(await readFile(join(installed, 'styles-no-fonts.css'), 'utf8')).includes('fonts.googleapis.com'));
  run(process.execPath, ['--input-type=module', '-e', "await import('dawn-and-dusk/auto'); console.log('safe without DOM')"], plain);
  console.log('Plain npm install: no React or maintainer tooling, explicit exports, SSR-safe optional runtime');

  const htmlDir = join(temp, 'html'); await mkdir(htmlDir);
  run('unzip', ['-q', join(downloads, `dawn-and-dusk-html-${pkg.version}.zip`), '-d', htmlDir], root);
  const htmlRoot = join(htmlDir, 'dawn-and-dusk-html');
  browser = await launch();
  const htmlUrl = await serve(htmlRoot);
  const page = await open(browser, htmlUrl);
  try {
    assert.equal(await page.count('[data-dd-icons]'), 1);
    await page.get(() => new Promise((resolve, reject) => { const s = document.createElement('script'); s.src = './dd/auto.js?again'; s.onload = resolve; s.onerror = reject; document.head.append(s); }));
    assert.equal(await page.count('[data-dd-icons]'), 1, 'loading the runtime twice does not duplicate icons');
    const initialTheme = await page.get(() => document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dusk' : 'dawn'));
    await page.click('[data-dd-theme-toggle]');
    assert.equal(await page.attr('html', 'data-theme'), initialTheme === 'dusk' ? 'dawn' : 'dusk', 'one click switches once even after duplicate script');
    await page.click('[data-dd-toast]');
    assert.equal(await page.count('.dd-toast'), 1, 'one click creates only one toast');
    assert.ok(await page.exists('.dd-toast svg use'));
    assert.deepEqual(page.errors, []);
  } finally { await page.close(); }
  const filePage = await open(browser, 'file://' + join(htmlRoot, 'index.html'));
  try { await filePage.click('[data-dd-toast]'); assert.equal(await filePage.count('.dd-toast'), 1); assert.deepEqual(filePage.errors, []); }
  finally { await filePage.close(); }
  console.log('HTML archive: works over HTTP and directly from disk; automatic icons and idempotent behaviors pass');

  // Tailwind CSS v4: tokens drive the utilities, components sit under utilities and above preflight, variants follow theme.
  const tw = join(temp, 'tailwind'); await mkdir(tw);
  await writeFile(join(tw, 'package.json'), JSON.stringify({ private: true, type: 'module' }));
  console.log('Installing Tailwind consumer…');
  run('npm', ['install', '--no-audit', '--no-fund', tarball, 'tailwindcss@4', '@tailwindcss/cli@4'], tw);
  await writeFile(join(tw, 'app.css'), '@import "dawn-and-dusk/fonts.css";\n@import "tailwindcss";\n@import "dawn-and-dusk/tailwind.css";\n');
  await writeFile(join(tw, 'index.html'), `<!doctype html><html data-theme="dawn"><head><link rel="stylesheet" href="./app.out.css"></head><body>
    <div id="surface" class="bg-surface text-muted p-4 rounded-box border">Surface</div>
    <div id="well" class="bg-well p-2"><div id="well-card" class="bg-well-card">Card</div></div>
    <button id="wide" class="dd-btn dd-btn--primary w-full" type="button">Wide</button>
    <h1 id="title" class="dd-h1">Title</h1>
    <p id="mode" class="dark:text-ok">Mode</p>
    <section data-theme="dusk"><p id="scoped" class="bg-surface dusk:text-bad">Scoped</p><p id="island" class="dawn:text-ok">Island</p></section>
    <section data-theme="dawn"><p id="day" class="dawn:text-ok dusk:text-bad">Day</p></section>
    <div id="offsystem" class="bg-blue-500 rounded-md shadow-lg">Off-system</div>
  </body></html>`);
  run('npx', ['@tailwindcss/cli', '-i', 'app.css', '-o', 'app.out.css'], tw);
  const twCss = await readFile(join(tw, 'app.out.css'), 'utf8');
  assert.match(twCss.replace(/^\/\*[^]*?\*\/\s*/, ''), /^@import url\('https:\/\/fonts\.googleapis\.com/, 'the font import stays first');
  assert.ok(!/\.bg-blue-500|\.rounded-md|\.shadow-lg/.test(twCss), 'Tailwind palette, radii and shadows are cleared');
  const twPage = await open(browser, await serve(tw));
  try {
    const style = (sel, prop) => twPage.get((s, p) => getComputedStyle(document.querySelector(s))[p], sel, prop);
    const setTheme = (t) => twPage.get((v) => { if (v) document.documentElement.dataset.theme = v; else delete document.documentElement.dataset.theme; }, t);
    assert.equal(await style('#surface', 'backgroundColor'), 'rgb(232, 227, 219)', 'bg-surface reads the dawn token');
    assert.equal(await style('#surface', 'paddingTop'), '20px', 'p-4 is the 5px unit × 4');
    assert.equal(await style('#surface', 'borderTopColor'), 'rgb(220, 210, 195)', 'bare border uses the hairline token');
    assert.deepEqual([await style('#well', 'backgroundColor'), await style('#well-card', 'backgroundColor')], ['rgb(226, 221, 213)', 'rgb(251, 248, 243)'], 'bg-well / bg-well-card read the dawn tokens: the card is lighter than the page');
    assert.equal(await style('#title', 'fontSize'), '41.5px', 'dd-h1 survives preflight');
    assert.match(await style('#title', 'fontFamily'), /Outfit/);
    assert.equal(await twPage.get(() => document.querySelector('#wide').offsetWidth === document.body.clientWidth), true, 'a utility overrides a dd- component');
    assert.equal(await style('#scoped', 'backgroundColor'), 'rgb(36, 33, 30)', 'a scoped data-theme section switches utilities');
    assert.equal(await style('#scoped', 'color'), 'rgb(229, 135, 112)', 'dusk: applies inside a dusk section');
    assert.notEqual(await style('#mode', 'color'), 'rgb(160, 187, 128)', 'dark: is off in dawn');
    assert.notEqual(await style('#island', 'color'), await style('#day', 'color'), 'dawn: is off inside a dusk section of a dawn page');
    await setTheme('dusk');
    assert.equal(await style('#scoped', 'color'), 'rgb(229, 135, 112)', 'dusk: still applies inside a dusk section of a dusk page');
    assert.notEqual(await style('#day', 'color'), 'rgb(229, 135, 112)', 'dusk: is off inside a dawn section of a dusk page');
    assert.equal(await style('#surface', 'backgroundColor'), 'rgb(36, 33, 30)', 'bg-surface follows dusk');
    assert.deepEqual([await style('#well', 'backgroundColor'), await style('#well-card', 'backgroundColor')], ['rgb(56, 53, 49)', 'rgb(31, 28, 25)'], 'dusk: a lighter well holds a darker card');
    assert.equal(await style('#mode', 'color'), 'rgb(160, 187, 128)', 'dark: follows data-theme="dusk"');
    await setTheme(null);
    await twPage.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: 'dark' }] });
    assert.equal(await style('#mode', 'color'), 'rgb(160, 187, 128)', 'dark: follows the OS when no theme is set');
    assert.equal(await style('#well-card', 'backgroundColor'), 'rgb(31, 28, 25)', 'the OS-dark tokens carry the well pair too');
    assert.notEqual(await style('#day', 'color'), 'rgb(229, 135, 112)', 'dusk: is off inside a dawn section of an OS-dark page');
    await twPage.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: 'light' }] });
    assert.notEqual(await style('#mode', 'color'), 'rgb(160, 187, 128)');
    assert.deepEqual(twPage.errors, []);
  } finally { await twPage.close(); }
  console.log('Tailwind v4: token utilities, layer order, preflight, scoped themes and dawn/dusk/dark variants pass');

  for (const kind of ['react', 'next']) {
    const parent = join(temp, kind); await mkdir(parent);
    run('unzip', ['-q', join(downloads, `dawn-and-dusk-${kind}-${pkg.version}.zip`), '-d', parent], root);
    const dir = join(parent, `dawn-and-dusk-${kind}`);
    const manifestPath = join(dir, 'package.json');
    const app = JSON.parse(await readFile(manifestPath, 'utf8'));
    app.dependencies['dawn-and-dusk'] = `file:${tarball}`;
    await writeFile(manifestPath, JSON.stringify(app, null, 2));
    console.log(`Installing and building ${kind} starter…`);
    run('npm', ['install', '--no-audit', '--no-fund'], dir);
    if (kind === 'react') {
      // Node SSR exercises the public React entry without a window/document and forwards native attributes.
      await writeFile(join(dir, 'ssr.mjs'), `import assert from 'node:assert/strict'; import React from 'react'; import {renderToString} from 'react-dom/server'; import {Input,Button,Icon,ThemeToggle} from 'dawn-and-dusk/react'; import {ThemeScript} from 'dawn-and-dusk/theme'; const html=renderToString(React.createElement(Input,{label:'Email',defaultValue:'a@example.com',error:'Required',name:'email'})); assert.match(html,/aria-invalid="true"/); assert.match(html,/aria-describedby=/); assert.match(html,/a@example.com/); assert.match(renderToString(React.createElement(Button,{loading:true},'Save')),/disabled/); assert.match(renderToString(React.createElement(Icon,{name:'plus',label:'Add'})),/aria-label="Add"/); const native=renderToString(React.createElement(Icon,{name:'plus','aria-label':'Add'})); assert.match(native,/aria-label="Add"/); assert.match(native,/role="img"/); assert.doesNotMatch(native,/aria-hidden/); assert.match(renderToString(React.createElement(Icon,{name:'plus',role:'presentation'})),/role="presentation"/); assert.doesNotMatch(renderToString(React.createElement(ThemeToggle)),/aria-pressed/); assert.match(renderToString(React.createElement(ThemeScript)),/localStorage/);`);
      run(process.execPath, ['ssr.mjs'], dir);
      run('npm', ['install', '--save-dev', '--no-audit', '--no-fund', 'typescript', '@types/react', '@types/react-dom'], dir);
      await writeFile(join(dir, 'consumer.tsx'), `import {createRef} from 'react'; import {Button,Input,Icon,ThemeToggle,setTheme} from 'dawn-and-dusk/react'; import {ThemeScript} from 'dawn-and-dusk/theme'; const input = createRef<HTMLInputElement>(); const button = createRef<HTMLButtonElement>(); const view = <><Input ref={input} label="Name" onChange={e => e.currentTarget.value} /><Button ref={button} variant="primary" onClick={e => e.currentTarget.focus()} /><Icon name="plus" /><ThemeToggle /><ThemeScript nonce="test" /></>; setTheme('system');`);
      run('npx', ['tsc', '--noEmit', '--strict', '--module', 'NodeNext', '--moduleResolution', 'NodeNext', '--jsx', 'react-jsx', 'consumer.tsx'], dir);
      console.log('React consumer: public TypeScript declarations and native refs compile');
      run('npm', ['run', 'build'], dir);
      const head = (await readFile(join(dir, 'dist/index.html'), 'utf8')).split('</head>')[0];
      const themeAt = head.indexOf("localStorage.getItem('dd-theme')"), cssAt = head.indexOf('rel="stylesheet"');
      assert.ok(themeAt > 0 && cssAt > themeAt, 'the React starter applies the saved theme in <head>, before the stylesheet');
      await checkApp(await serve(join(dir, 'dist')), 'React production build');
    } else {
      run('npm', ['run', 'build', '--', '--webpack'], dir);
      const server = spawn('npm', ['run', 'start', '--', '--hostname', '127.0.0.1', '--port', '4342'], { cwd: dir, stdio: 'ignore', detached: true }); processes.push(server);
      let ready = false;
      for (let i = 0; i < 100; i++) { try { const res = await fetch('http://127.0.0.1:4342'); if (res.ok) { ready = true; break; } } catch {} await new Promise((r) => setTimeout(r, 150)); }
      assert.ok(ready, 'Next production server started');
      await checkApp('http://127.0.0.1:4342/', 'Next.js production build');
    }
  }
  console.log('All packed-package consumer checks passed.');
} finally {
  if (browser) await browser.close();
  for (const server of servers) await new Promise((resolve) => server.close(resolve));
  for (const process of processes) { try { globalThis.process.kill(-process.pid, 'SIGTERM'); } catch {} }
  // Keep the fresh projects for inspection; they are outside the repository.
}
