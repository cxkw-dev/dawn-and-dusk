import { test } from './lib/test.mjs';
import { mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

// Real files on disk for "browse" (the native picker is replaced by DOM.setFileInputFiles, which fires input + change).
const dir = join(tmpdir(), 'dd-file-upload-test');
mkdirSync(dir, { recursive: true });
const disk = (name, bytes) => { const p = join(dir, name); writeFileSync(p, Buffer.alloc(bytes, 97)); return p; };
const usage = disk('billing-usage.csv', 2048);
const config = disk('edge-cache.json', 512);
const avatar1 = disk('avatar-a.png', 3000);
const avatar2 = disk('avatar-b.png', 4000);

const browse = async (page, sel, paths) => {
  const { result } = await page.send('Runtime.evaluate', { expression: `document.querySelector(${JSON.stringify(sel)})` });
  await page.send('DOM.setFileInputFiles', { files: paths, objectId: result.objectId });
  await page.sleep(150);
};
// A drag from the desktop, built in page JS: dragenter → dragover → drop with a DataTransfer of File objects.
const drop = (page, zoneSel, specs, { leave = false } = {}) => page.get((sel, list, leaveOnly) => {
  const zone = document.querySelector(sel);
  const target = zone.querySelector('.dd-dropzone__title') || zone;
  const dt = new DataTransfer();
  for (const f of list) dt.items.add(new File([new Uint8Array(f.size)], f.name, { type: f.type || '' }));
  const fire = (type, el = target) => el.dispatchEvent(new DragEvent(type, { bubbles: true, cancelable: true, dataTransfer: dt }));
  fire('dragenter');
  const hover = zone.classList.contains('is-dragover');
  const accepted = !fire('dragover'); // preventDefault() = the zone takes drops
  if (leaveOnly) { fire('dragleave'); return { hover, accepted, after: zone.classList.contains('is-dragover') }; }
  fire('drop');
  return { hover, accepted, after: zone.classList.contains('is-dragover') };
}, zoneSel, specs, leave);
const rows = (page, list) => page.get((s) => [...document.querySelectorAll(`${s} > .dd-file:not(.is-removing)`)].map((r) => ({
  name: r.querySelector('.dd-file__name').textContent, status: r.querySelector('.dd-file__status').textContent.trim(),
  error: r.classList.contains('is-error'), size: r.querySelector('.dd-file__meta > span').textContent,
})), list);
const inputFiles = (page, sel) => page.get((s) => [...document.querySelector(s).files].map((f) => f.name), sel);
const zone1 = '[data-dd-dropzone="#fu-list-1"]';
const input1 = `${zone1} input`;
const zone2 = '[data-dd-dropzone="#fu-list-2"]';
const input2 = `${zone2} input`;

test('drag state: hovering files tints the zone, moving over children keeps it, leaving clears it', async ({ open, assert }) => {
  const page = await open('components/file-upload');
  const r = await drop(page, zone1, [{ name: 'a.png', size: 10, type: 'image/png' }], { leave: true });
  assert.deepEqual(r, { hover: true, accepted: true, after: false });
  const nested = await page.get((sel) => {
    const zone = document.querySelector(sel); const dt = new DataTransfer();
    const fire = (type, el) => el.dispatchEvent(new DragEvent(type, { bubbles: true, cancelable: true, dataTransfer: dt }));
    fire('dragenter', zone); fire('dragenter', zone.querySelector('.dd-dropzone__icon')); fire('dragleave', zone);
    const still = zone.classList.contains('is-dragover');
    fire('dragleave', zone.querySelector('.dd-dropzone__icon'));
    return [still, zone.classList.contains('is-dragover')];
  }, zone1);
  assert.deepEqual(nested, [true, false], 'no flicker over children; cleared once the pointer is out');
});

test('drop: rows appear with name, size and Ready; the input holds the files and fires change', async ({ open, assert }) => {
  const page = await open('components/file-upload');
  await page.get((s) => { window.__changes = 0; document.querySelector(s).addEventListener('change', () => window.__changes++); }, input1);
  const r = await drop(page, zone1, [{ name: 'dockey-hero.png', size: 2048, type: 'image/png' }, { name: 'deploys.csv', size: 1536000, type: 'text/csv' }]);
  assert.equal(r.after, false, 'drag tint clears on drop');
  assert.deepEqual(await rows(page, '#fu-list-1'), [
    { name: 'dockey-hero.png', status: 'Ready', error: false, size: '2.0 KB' },
    { name: 'deploys.csv', status: 'Ready', error: false, size: '1.5 MB' },
  ]);
  assert.deepEqual(await inputFiles(page, input1), ['dockey-hero.png', 'deploys.csv']);
  assert.equal(await page.get(() => window.__changes), 1);
  assert.equal(await page.attr('#fu-list-1 > .dd-file:first-child [data-dd-file-remove]', 'aria-label'), 'Remove dockey-hero.png');
});

test('errors: wrong type and too large are listed with the reason and kept out of the input', async ({ open, assert }) => {
  const page = await open('components/file-upload');
  await drop(page, zone1, [
    { name: 'installer.exe', size: 4096, type: 'application/octet-stream' },
    { name: 'release-notes.pdf', size: 21 * 1048576, type: 'application/pdf' },
    { name: 'edge-cache.json', size: 300, type: 'application/json' },
  ]);
  assert.deepEqual(await rows(page, '#fu-list-1'), [
    { name: 'installer.exe', status: 'Type not accepted', error: true, size: '4.0 KB' },
    { name: 'release-notes.pdf', status: 'Too large — 20 MB max', error: true, size: '21.0 MB' },
    { name: 'edge-cache.json', status: 'Ready', error: false, size: '300 B' },
  ]);
  assert.deepEqual(await inputFiles(page, input1), ['edge-cache.json']);
  // A failed row can be removed like any other.
  await page.click('#fu-list-1 [aria-label="Remove installer.exe"]');
  await page.waitFor(() => document.querySelectorAll('#fu-list-1 > .dd-file').length === 2);
  assert.deepEqual(await inputFiles(page, input1), ['edge-cache.json']);
});

test('browse: picking files adds rows; a multiple zone keeps earlier files too', async ({ open, assert }) => {
  const page = await open('components/file-upload');
  await browse(page, input1, [usage]);
  await browse(page, input1, [config]);
  assert.deepEqual((await rows(page, '#fu-list-1')).map((r) => [r.name, r.status]), [['billing-usage.csv', 'Ready'], ['edge-cache.json', 'Ready']]);
  assert.deepEqual(await inputFiles(page, input1), ['billing-usage.csv', 'edge-cache.json'], 'input files match the list');
});

test('remove: row leaves, focus moves to the next remove button then back to the zone, dd-file-remove fires', async ({ open, assert }) => {
  const page = await open('components/file-upload');
  await page.get(() => { window.__removed = []; document.addEventListener('dd-file-remove', (e) => window.__removed.push([e.target.id, e.detail.name])); });
  await drop(page, zone1, [{ name: 'a.csv', size: 10 }, { name: 'b.csv', size: 20 }]);
  await page.click('#fu-list-1 [aria-label="Remove a.csv"]');
  await page.waitFor(() => document.querySelectorAll('#fu-list-1 > .dd-file').length === 1);
  assert.equal(await page.get(() => document.activeElement.getAttribute('aria-label')), 'Remove b.csv');
  assert.deepEqual(await inputFiles(page, input1), ['b.csv']);
  await page.press('Enter');
  await page.waitFor(() => document.querySelectorAll('#fu-list-1 > .dd-file').length === 0);
  assert.equal(await page.get((s) => document.activeElement === document.querySelector(s), input1), true, 'focus back on the dropzone');
  assert.deepEqual(await inputFiles(page, input1), []);
  assert.deepEqual(await page.get(() => window.__removed), [['fu-list-1', 'a.csv'], ['fu-list-1', 'b.csv']]);
});

test('rapid double click on remove removes one row once', async ({ open, assert }) => {
  const page = await open('components/file-upload');
  await page.get(() => { window.__n = 0; document.addEventListener('dd-file-remove', () => window.__n++); });
  await drop(page, zone1, [{ name: 'a.csv', size: 10 }, { name: 'b.csv', size: 20 }]);
  await page.get(() => { const b = document.querySelector('#fu-list-1 [aria-label="Remove a.csv"]'); b.click(); b.click(); });
  await page.waitFor(() => document.querySelectorAll('#fu-list-1 > .dd-file').length === 1);
  await page.sleep(700);
  assert.equal(await page.get(() => window.__n), 1);
  assert.deepEqual((await rows(page, '#fu-list-1')).map((r) => r.name), ['b.csv']);
});

test('compact single-file zone: a new choice replaces the row; a drop takes only the first file', async ({ open, assert }) => {
  const page = await open('components/file-upload');
  await browse(page, input2, [avatar1]);
  await browse(page, input2, [avatar2]);
  assert.deepEqual((await rows(page, '#fu-list-2')).map((r) => r.name), ['avatar-b.png']);
  await drop(page, zone2, [{ name: 'c.png', size: 10, type: 'image/png' }, { name: 'd.png', size: 10, type: 'image/png' }]);
  assert.deepEqual((await rows(page, '#fu-list-2')).map((r) => r.name), ['c.png']);
  assert.deepEqual(await inputFiles(page, input2), ['c.png']);
  await drop(page, zone2, [{ name: 'notes.txt', size: 10, type: 'text/plain' }]);
  assert.deepEqual(await rows(page, '#fu-list-2'), [{ name: 'notes.txt', status: 'Type not accepted', error: true, size: '10 B' }], 'image/* rejects text');
  assert.deepEqual(await inputFiles(page, input2), []);
  // The first zone is untouched.
  assert.equal(await page.count('#fu-list-1 > .dd-file'), 0);
});

test('static list: remove works without a dropzone, retry gives feedback', async ({ open, assert }) => {
  const page = await open('components/file-upload');
  const list = '#list ~ .ex .dd-file-list';
  assert.equal(await page.count(`${list} > .dd-file`), 4);
  await page.click(`${list} [aria-label="Remove billing-worker-usage-2026-10.csv"]`);
  await page.waitFor((s) => document.querySelectorAll(`${s} > .dd-file`).length === 3, { args: [list] });
  assert.equal(await page.get(() => document.activeElement.getAttribute('aria-label')), 'Remove auth-gateway-runbook.pdf');
  await page.click(`${list} .dd-file:last-child [aria-label="Retry upload"]`);
  await page.waitFor(() => [...document.querySelectorAll('.dd-toast')].some((t) => t.textContent.includes('Retrying upload')));
});

test('keyboard: Tab reaches the hidden input and the zone shows the focus ring (dusk)', async ({ open, assert }) => {
  const page = await open('components/file-upload', { theme: 'dusk' });
  await page.get(() => document.querySelector('.doc-head').setAttribute('tabindex', '-1'));
  await page.focus('.doc-head');
  await page.press('Tab');
  assert.equal(await page.get((s) => document.activeElement === document.querySelector(s), input1), true);
  assert.equal(await page.get((s) => getComputedStyle(document.querySelector(s)).outlineStyle, zone1), 'solid');
  // Drag tint reads in dusk too.
  const tint = await page.get((s) => {
    const z = document.querySelector(s); const rest = getComputedStyle(z).backgroundColor;
    z.dispatchEvent(new DragEvent('dragenter', { bubbles: true, cancelable: true, dataTransfer: new DataTransfer() }));
    return [rest, getComputedStyle(z).backgroundColor];
  }, zone1);
  await page.waitFor((s) => document.querySelector(s).classList.contains('is-dragover'), { args: [zone1] });
  assert.notEqual(tint[0], await page.get((s) => getComputedStyle(document.querySelector(s)).backgroundColor, zone1));
});

test('touch at 375: rows fit and tap removes', async ({ open, assert }) => {
  const page = await open('components/file-upload', { width: 375 });
  await drop(page, zone1, [{ name: 'billing-worker-usage-2026-10-with-a-very-long-name.csv', size: 4000 }]);
  const fits = await page.get(() => { const r = document.querySelector('#fu-list-1 > .dd-file').getBoundingClientRect(); return r.right <= innerWidth && r.left >= 0; });
  assert.ok(fits, 'row fits the viewport (long name truncates)');
  await page.tap('#fu-list-1 [data-dd-file-remove]');
  await page.waitFor(() => document.querySelectorAll('#fu-list-1 > .dd-file').length === 0);
});

test('removing rows in quick succession keeps focus in the list (on a row that stays)', async ({ open, assert }) => {
  const page = await open('components/file-upload');
  await drop(page, zone1, [{ name: 'a.csv', size: 10 }, { name: 'b.csv', size: 20 }, { name: 'c.csv', size: 30 }]);
  await page.press('Shift'); // keyboard modality, like a keyboard user's Enter
  await page.get(() => {
    const btn = (n) => document.querySelector(`#fu-list-1 [aria-label="Remove ${n}"]`);
    btn('b.csv').focus(); btn('b.csv').click();
    btn('c.csv').focus(); btn('c.csv').click(); // the last row, while b is still leaving
  });
  await page.waitFor(() => document.querySelectorAll('#fu-list-1 > .dd-file').length === 1);
  await page.sleep(100);
  assert.equal(await page.get(() => document.activeElement.getAttribute('aria-label')), 'Remove a.csv', 'not dropped on <body>');
  assert.deepEqual(await inputFiles(page, input1), ['a.csv']);
});

test('only dropzone inputs are managed: a plain file input elsewhere keeps what was picked; inserted icons follow dd.iconSprite', async ({ open, assert }) => {
  const page = await open('components/file-upload');
  await page.get(() => { const i = document.createElement('input'); i.type = 'file'; i.accept = '.png'; i.id = 'plain-file'; document.querySelector('.doc-main').append(i); });
  await browse(page, '#plain-file', [usage]); // a .csv the picker's "All files" let through
  assert.deepEqual(await inputFiles(page, '#plain-file'), ['billing-usage.csv'], 'the page’s own input is left alone');

  await page.get(() => { window.dd.iconSprite = '/assets/icons.svg'; });
  await drop(page, zone1, [{ name: 'a.csv', size: 10 }]);
  const hrefs = await page.get(() => [...document.querySelectorAll('#fu-list-1 > .dd-file use')].map((u) => u.getAttribute('href')));
  assert.deepEqual(hrefs, ['/assets/icons.svg#dd-i-file', '/assets/icons.svg#dd-i-check', '/assets/icons.svg#dd-i-x']);
});
