import { inflateSync } from 'node:zlib';
import { test } from './lib/test.mjs';

const VARIANTS = ['ink', 'trace', 'sky', 'sun', 'horizon', 'weight', 'firefly', 'tones', 'cut', 'join'];
const NAMES = ['Ink', 'Trace', 'Sky', 'Sunrise', 'Horizon', 'Breathe', 'Firefly', 'Tones', 'Cut', 'Join'];

// Minimal PNG decoder (8-bit RGB/RGBA, non-interlaced: what Chrome's screenshots are) so the test can compare frames.
function decodePng(buf) {
  let pos = 8; let width = 0; let height = 0; let channels = 4; const idat = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos); const type = buf.toString('ascii', pos + 4, pos + 8); const data = buf.subarray(pos + 8, pos + 8 + len);
    if (type === 'IHDR') { width = data.readUInt32BE(0); height = data.readUInt32BE(4); channels = data[9] === 6 ? 4 : 3; }
    if (type === 'IDAT') idat.push(data);
    pos += 12 + len;
  }
  const raw = inflateSync(Buffer.concat(idat)); const stride = width * channels; const px = Buffer.alloc(stride * height);
  for (let y = 0; y < height; y++) {
    const f = raw[y * (stride + 1)]; const row = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
    for (let x = 0; x < stride; x++) {
      const a = x >= channels ? px[y * stride + x - channels] : 0; const b = y ? px[(y - 1) * stride + x] : 0;
      const c = x >= channels && y ? px[(y - 1) * stride + x - channels] : 0;
      const p = a + b - c; const pa = Math.abs(p - a); const pb = Math.abs(p - b); const pc = Math.abs(p - c);
      const pred = [0, a, b, (a + b) >> 1, pa <= pb && pa <= pc ? a : pb <= pc ? b : c][f];
      px[y * stride + x] = (row[x] + pred) & 255;
    }
  }
  return { width, height, channels, px };
}
/** Share of pixels (0–1) that visibly differ between two same-size screenshots. */
const diff = (a, b) => {
  let n = 0; const c = a.channels;
  for (let i = 0; i < a.px.length; i += c) { let d = 0; for (let k = 0; k < Math.min(c, 3); k++) d = Math.max(d, Math.abs(a.px[i + k] - b.px[i + k])); if (d > 24) n++; }
  return n / (a.px.length / c);
};
const pct = (x) => `${(x * 100).toFixed(2)}%`;

/** Lay one xl copy of each gallery variant out at the top-left, then return a function that pauses one of them at a
    fraction of its own loop and screenshots it. f = 1 means "a hair before the loop restarts" (0.02ms), so the first
    and last frames of a seamless loop come out identical. */
async function stage(page, theme) {
  await page.evaluate((theme) => {
    const box = document.createElement('div'); box.id = 'ldr-probe'; box.dataset.theme = theme;
    box.style.cssText = 'position:fixed;left:0;top:0;z-index:9999;display:flex;gap:8px;padding:8px;background:var(--dd-bg);color:var(--dd-text)';
    for (const tile of document.querySelectorAll('.ldr-tile')) {
      const cell = document.createElement('div'); cell.dataset.v = tile.dataset.variant; cell.style.cssText = 'width:100px;height:104px;display:grid;place-items:center';
      cell.innerHTML = tile.querySelector('.dd-loader').outerHTML.replace('dd-loader--lg', 'dd-loader--xl');
      box.append(cell);
    }
    document.body.append(box); window.scrollTo(0, 0);
  }, theme);
  await page.sleep(200);
  return async (v, f) => {
    const r = await page.evaluate((v, f) => {
      const cell = document.querySelector(`#ldr-probe [data-v="${v}"]`);
      for (const a of cell.getAnimations({ subtree: true })) { a.pause(); a.currentTime = a.animationName === 'dd-loader-rest' ? 0 : Math.max(0, f * a.effect.getComputedTiming().duration - (f === 1 ? 0.02 : 0)); }
      for (const s of cell.querySelectorAll('svg')) if (s.querySelector('animate')) { s.pauseAnimations(); s.setCurrentTime(Math.max(0, f * 2.56 - (f === 1 ? 0.00002 : 0))); }
      const b = cell.getBoundingClientRect(); return { x: b.left, y: b.top, width: b.width, height: b.height };
    }, v, f);
    await page.sleep(60);
    const { data } = await page.send('Page.captureScreenshot', { format: 'png', clip: { ...r, scale: 1 } });
    return decodePng(Buffer.from(data, 'base64'));
  };
}

test('the gallery numbers ten variants #1–#10, each live and named', async ({ open, assert }) => {
  const page = await open('components/loader');
  const tiles = await page.get(() => [...document.querySelectorAll('.ldr-tile')].map((t) => ({
    v: t.dataset.variant, num: t.querySelector('.ldr-tile__num').textContent.trim(), name: t.querySelector('.ldr-tile__name').textContent.trim(),
    loaders: t.querySelectorAll(`.dd-loader.dd-loader--${t.dataset.variant}`).length, example: !!document.getElementById(`v-${t.dataset.variant}`),
  })));
  assert.deepEqual(tiles.map((t) => t.v), VARIANTS);
  assert.deepEqual(tiles.map((t) => t.num), VARIANTS.map((_, i) => `#${i + 1}`));
  assert.deepEqual(tiles.map((t) => t.name), NAMES);
  for (const t of tiles) {
    assert.equal(t.loaders, 2, `${t.v}: shown in dawn and dusk`);
    assert.ok(t.example, `${t.v}: has a markup example`);
  }
});

test('every loader is a labelled status (or hidden inside one); its insides are hidden', async ({ open, assert }) => {
  const page = await open('components/loader');
  const bad = await page.get(() => [...document.querySelectorAll('.dd-loader')].flatMap((el) => {
    const out = []; const where = `${el.className} in ${el.closest('[id]')?.id}`;
    if (el.getAttribute('aria-hidden') === 'true') {
      const inStatus = el.parentElement.closest('[role="status"]');
      const galleryCopy = el.closest('.ldr-stage') && el.closest('.ldr-tile').querySelector('.dd-loader[role="status"]');
      if (!inStatus && !galleryCopy) out.push(`hidden loader outside a status: ${where}`);
      if (inStatus && !inStatus.textContent.trim()) out.push(`status around a hidden loader has no text: ${where}`);
    } else {
      if (el.getAttribute('role') !== 'status') out.push(`no role=status: ${where}`);
      if (!el.getAttribute('aria-label')?.trim()) out.push(`no aria-label: ${where}`);
    }
    for (const c of el.children) if (c.getAttribute('aria-hidden') !== 'true') out.push(`visible child <${c.tagName.toLowerCase()}>: ${where}`);
    return out;
  }));
  assert.deepEqual(bad, []);
  assert.equal(await page.attr('.ldr-tile[data-variant="sun"] .dd-loader[role="status"]', 'aria-label'), 'Loading (Sunrise)');
});

for (const theme of ['dawn', 'dusk']) {
  test(`${theme}: every variant moves, and each loop ends exactly where it began`, async ({ open, assert }) => {
    const page = await open('components/loader', { theme });
    const shot = await stage(page, theme);
    const problems = [];
    for (const v of VARIANTS) {
      const start = await shot(v, 0); const mid = await shot(v, 0.45); const end = await shot(v, 1);
      const seam = diff(start, end); const motion = diff(start, mid);
      if (process.env.DD_VERBOSE) console.log(`    ${theme} ${v}: seam ${pct(seam)} · motion ${pct(motion)}`);
      if (seam > 0.002) problems.push(`${v}: loop jumps (${pct(seam)} of pixels differ between start and end)`);
      if (motion < 0.01) problems.push(`${v}: barely moves (${pct(motion)} of pixels change mid-loop)`);
    }
    assert.deepEqual(problems, []);
  });
}

test('reduced motion: nothing travels; each variant rests on the whole glyph and fades slowly', async ({ open, assert }) => {
  const page = await open('components/loader');
  await page.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await page.sleep(300);
  const report = await page.get(() => [...document.querySelectorAll('.ldr-tile .dd-loader[role="status"]')].map((el) => {
    const inner = el.getAnimations({ subtree: true }).filter((a) => a.effect.target !== el || a.effect.pseudoElement);
    const own = el.getAnimations().map((a) => ({ name: a.animationName, dur: a.effect.getComputedTiming().duration, endless: !Number.isFinite(a.effect.getComputedTiming().iterations), state: a.playState }));
    const morph = el.querySelector('svg:has(animate)');
    return { v: [...el.classList].find((c) => /^dd-loader--(?!lg)/.test(c)), inner: inner.length, own, morphShown: morph ? getComputedStyle(morph).display !== 'none' : null,
      still: el.classList.contains('dd-loader--weight') ? getComputedStyle(el.querySelector('.dd-loader__glyph')).display : null };
  }));
  for (const r of report) {
    assert.equal(r.inner, 0, `${r.v}: nothing inside animates`);
    assert.equal(r.own.length, 1, `${r.v}: the loader itself fades`);
    assert.equal(r.own[0].name, 'dd-loader-rest');
    assert.ok(r.own[0].dur >= 1000 && r.own[0].endless && r.own[0].state === 'running', `${r.v}: slow, endless fade (${JSON.stringify(r.own[0])})`);
    if (r.morphShown !== null) assert.equal(r.morphShown, false, `${r.v}: the SMIL morph is hidden`);
    if (r.still !== null) assert.notEqual(r.still, 'none', `${r.v}: the still glyph shows`);
  }
  assert.equal(report.length, 10);
  // The fade really changes opacity over time.
  const sel = '.ldr-tile[data-variant="ink"] .dd-loader[role="status"]';
  const a = await page.get((s) => Number(getComputedStyle(document.querySelector(s)).opacity), sel);
  await page.sleep(700);
  const b = await page.get((s) => Number(getComputedStyle(document.querySelector(s)).opacity), sel);
  assert.ok(Math.abs(a - b) > 0.05, `opacity moves (${a} → ${b})`);
});

test('reduced motion: a still frame of each variant is the whole glyph, not a half-drawn one', async ({ open, assert }) => {
  const page = await open('components/loader');
  await page.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await page.sleep(300);
  const shot = await stage(page, 'dawn');
  // The rest frame must not change with time (only the root fades, which the probe pauses at 0).
  const problems = [];
  for (const v of VARIANTS) { const d = diff(await shot(v, 0), await shot(v, 0.5)); if (d > 0.002) problems.push(`${v}: rest frame changes (${pct(d)})`); }
  assert.deepEqual(problems, []);
});

test('the loader follows the theme: ink and track switch between dawn and dusk', async ({ open, assert }) => {
  const page = await open('components/loader');
  const [dawn, dusk] = await page.get(() => [...document.querySelectorAll('.ldr-tile[data-variant="ink"] .dd-loader')].map((el) => ({
    ink: getComputedStyle(el).color, track: getComputedStyle(el.querySelector('.dd-loader__glyph')).backgroundColor,
  })));
  assert.notEqual(dawn.ink, dusk.ink);
  assert.notEqual(dawn.track, dusk.track);
});

test('the full-page demo covers the viewport, then goes away', async ({ open, assert }) => {
  const page = await open('components/loader');
  await page.click('[data-ldr-fullpage]');
  assert.ok(await page.visible('body > .dd-page-loader--fixed'), 'fixed loader is shown');
  assert.equal(await page.get(() => { const r = document.querySelector('body > .dd-page-loader--fixed').getBoundingClientRect(); return r.width === innerWidth && r.height === innerHeight; }), true);
  await page.waitFor(() => !document.querySelector('body > .dd-page-loader--fixed'), { timeout: 4000 });
});
