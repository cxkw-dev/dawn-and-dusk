// Tiny headless-Chrome driver over the DevTools protocol, no dependencies.
// Each test file opens pages with `open(path, { theme, width })` and drives them like a user: click, type, keys, hover.
import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

export const BASE = (process.env.DD_BASE || 'http://127.0.0.1:4321/dawn-and-dusk/').replace(/\/?$/, '/');
const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function launch() {
  const dir = mkdtempSync(join(tmpdir(), 'dd-test-'));
  const proc = spawn(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--remote-debugging-port=0', `--user-data-dir=${dir}`, 'about:blank'], { stdio: 'ignore' });
  let port;
  for (let k = 0; k < 100 && !port; k++) { try { port = readFileSync(join(dir, 'DevToolsActivePort'), 'utf8').split('\n')[0]; } catch { await sleep(100); } }
  if (!port) throw new Error('Chrome did not start (set CHROME=/path/to/chrome)');
  return { port, close: async () => { proc.kill(); await sleep(200); rmSync(dir, { recursive: true, force: true }); } };
}

export async function open(browser, path, { theme = 'dawn', width = 1280, height = 900, mobile = width < 600 } = {}) {
  const target = await (await fetch(`http://127.0.0.1:${browser.port}/json/new?about:blank`, { method: 'PUT' })).json();
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r, j) => { ws.addEventListener('open', r); ws.addEventListener('error', j); });
  let id = 0; const pending = new Map(); const errors = []; const logs = [];
  ws.addEventListener('message', (m) => {
    const d = JSON.parse(m.data);
    if (d.id && pending.has(d.id)) { const [res, rej] = pending.get(d.id); pending.delete(d.id); d.error ? rej(new Error(d.error.message)) : res(d.result); }
    if (d.method === 'Runtime.exceptionThrown') errors.push(d.params.exceptionDetails.exception?.description || d.params.exceptionDetails.text);
    if (d.method === 'Runtime.consoleAPICalled' && d.params.type === 'error') errors.push(d.params.args.map((a) => a.value ?? a.description).join(' '));
    if (d.method === 'Runtime.consoleAPICalled') logs.push(d.params.args.map((a) => a.value ?? a.description).join(' '));
  });
  const send = (method, params = {}) => new Promise((res, rej) => { const i = ++id; pending.set(i, [res, rej]); ws.send(JSON.stringify({ id: i, method, params })); });
  await send('Runtime.enable'); await send('Page.enable'); await send('DOM.enable'); await send('Network.enable');
  // Keep the dev server's hot reload from refreshing the page mid-test when files change.
  await send('Network.setBlockedURLs', { urls: ['*@vite/client*'] });
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile });
  if (mobile) await send('Emulation.setTouchEmulationEnabled', { enabled: true });
  const url = /^(https?|file):/.test(path) ? path : `${BASE}${path.replace(/^\//, '')}${path.includes('?') ? '&' : '?'}theme=${theme}`;
  const loaded = new Promise((r) => ws.addEventListener('message', (m) => { if (JSON.parse(m.data).method === 'Page.loadEventFired') r(); }));
  await send('Page.navigate', { url });
  await loaded; await sleep(300);

  const evaluate = async (fnOrExpr, ...args) => {
    const expression = typeof fnOrExpr === 'function' ? `(${fnOrExpr})(...${JSON.stringify(args)})` : fnOrExpr;
    const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true, userGesture: true });
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
    return r.result.value;
  };
  const center = async (sel) => {
    // Scroll the target into view and let the scroll event fire before any pointer input (a late scroll event would
    // otherwise land after the hover and close things that hide on scroll, like tooltips).
    const b = await evaluate(async (s) => {
      const el = document.querySelector(s); if (!el) return null;
      const before = scrollY + scrollX; el.scrollIntoView({ block: 'center', inline: 'center' });
      if (scrollY + scrollX !== before) await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width, h: r.height };
    }, sel);
    if (!b) throw new Error(`no element for ${sel}`);
    if (!b.w || !b.h) throw new Error(`element not visible: ${sel}`);
    return b;
  };
  const mouse = (type, x, y, extra = {}) => send('Input.dispatchMouseEvent', { type, x, y, button: 'left', clickCount: 1, ...extra });
  const KEYS = { Enter: [13, '\r'], Escape: [27], Tab: [9], ' ': [32, ' '], Space: [32, ' '], ArrowDown: [40], ArrowUp: [38], ArrowLeft: [37], ArrowRight: [39], Home: [36], End: [35], Backspace: [8], Delete: [46], PageUp: [33], PageDown: [34] };

  const page = {
    send, evaluate, errors, logs,
    sleep,
    /** Real pointer click at the element's centre (or at an offset {dx, dy} from it). */
    async click(sel, { dx = 0, dy = 0 } = {}) { const p = await center(sel); await mouse('mouseMoved', p.x + dx, p.y + dy); await mouse('mousePressed', p.x + dx, p.y + dy); await mouse('mouseReleased', p.x + dx, p.y + dy); await sleep(120); },
    async hover(sel) { const p = await center(sel); await mouse('mouseMoved', p.x, p.y, { button: 'none' }); await sleep(120); },
    async tap(sel) { const p = await center(sel); await send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: p.x, y: p.y }] }); await send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] }); await sleep(150); },
    async drag(sel, dx, dy, steps = 8) { const p = await center(sel); await mouse('mouseMoved', p.x, p.y, { button: 'none' }); await mouse('mousePressed', p.x, p.y); for (let i = 1; i <= steps; i++) await mouse('mouseMoved', p.x + (dx * i) / steps, p.y + (dy * i) / steps, { buttons: 1 }); await mouse('mouseReleased', p.x + dx, p.y + dy); await sleep(150); },
    /** Press keys in order: press('ArrowDown', 'Enter'). Modifiers: press({ key: 'k', meta: true }). */
    async press(...keys) {
      for (const k of keys) {
        const key = typeof k === 'string' ? k : k.key; const mods = typeof k === 'string' ? 0 : (k.alt ? 1 : 0) | (k.ctrl ? 2 : 0) | (k.meta ? 4 : 0) | (k.shift ? 8 : 0);
        const [code, text] = KEYS[key] || [key.length === 1 ? key.toUpperCase().charCodeAt(0) : 0, key.length === 1 && !(mods & 6) ? key : undefined];
        await send('Input.dispatchKeyEvent', { type: text ? 'keyDown' : 'rawKeyDown', key: key === 'Space' ? ' ' : key, code: key.length === 1 ? `Key${key.toUpperCase()}` : key, windowsVirtualKeyCode: code, text, modifiers: mods });
        await send('Input.dispatchKeyEvent', { type: 'keyUp', key: key === 'Space' ? ' ' : key, windowsVirtualKeyCode: code, modifiers: mods });
        await sleep(60);
      }
      await sleep(100);
    },
    async type(text) { await send('Input.insertText', { text }); await sleep(120); },
    async focus(sel) { await evaluate((s) => document.querySelector(s).focus(), sel); await sleep(60); },
    /** Read anything from the page: page.get(s => document.querySelector(s).hidden, '#menu') */
    get: (fn, ...args) => evaluate(fn, ...args),
    exists: (sel) => evaluate((s) => !!document.querySelector(s), sel),
    visible: (sel) => evaluate((s) => { const el = document.querySelector(s); if (!el) return false; const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none' && Number(cs.opacity) > 0.05; }, sel),
    attr: (sel, name) => evaluate((s, n) => document.querySelector(s)?.getAttribute(n), sel, name),
    text: (sel) => evaluate((s) => document.querySelector(s)?.textContent.trim().replace(/\s+/g, ' '), sel),
    active: () => evaluate(() => { const a = document.activeElement; return a ? (a.id ? `#${a.id}` : a.tagName.toLowerCase() + (a.className ? `.${String(a.className).split(' ').join('.')}` : '')) : null; }),
    count: (sel) => evaluate((s) => document.querySelectorAll(s).length, sel),
    async waitFor(fn, { timeout = 3000, args = [] } = {}) { const end = Date.now() + timeout; while (Date.now() < end) { if (await evaluate(fn, ...args)) return true; await sleep(50); } throw new Error(`timed out waiting for ${fn}`); },
    async screenshot(path) { const { data } = await send('Page.captureScreenshot', { format: 'png' }); (await import('node:fs')).writeFileSync(path, Buffer.from(data, 'base64')); },
    close: async () => { try { await send('Page.close'); } catch {} ws.close(); },
  };
  return page;
}
