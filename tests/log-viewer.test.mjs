import { test } from './lib/test.mjs';

// Three viewers with a bar: the live one (streams lines while on screen), a pre-filtered one, an empty one.
const LIVE = '#logs-auth-gateway';
const FILT = '.ex-stage [data-dd-log-viewer]:has(.dd-log-viewer__search input[value="idp"])';
const EMPTY = '.ex-stage [data-dd-log-viewer]:has(.dd-log-viewer__search input[value="ledger-sync"])';

const state = (page, v) => page.get((s) => {
  const r = document.querySelector(s);
  const lines = [...r.querySelectorAll('.dd-log-viewer__line')];
  const shown = lines.filter((l) => !l.hidden && l.getClientRects().length);
  return {
    total: lines.length,
    shown: shown.length,
    levels: [...new Set(shown.map((l) => l.dataset.level))].sort(),
    texts: shown.map((l) => l.textContent.toLowerCase()),
    hiddenTexts: lines.filter((l) => l.hidden).map((l) => l.textContent.toLowerCase()),
    marks: [...r.querySelectorAll('mark.dd-log-viewer__mark')].map((m) => m.textContent.toLowerCase()),
    count: r.querySelector('[data-dd-log-viewer-count]').textContent,
    empty: !r.querySelector('[data-dd-log-viewer-empty]').hidden,
    levelSum: [...r.querySelectorAll('[data-dd-log-viewer-level] .dd-log-viewer__n')].reduce((a, e) => a + Number(e.textContent), 0),
  };
}, v);
const search = async (page, v, text) => { await page.click(`${v} [data-dd-log-viewer-search]`); await page.type(text); };
const scrollInfo = (page, v) => page.get((s) => { const el = document.querySelector(`${s} .dd-log-viewer__scroll`); return { top: el.scrollTop, gap: el.scrollHeight - el.scrollTop - el.clientHeight }; }, v);
const addLine = (page, v, level, msg) => page.get((s, l, m) => {
  const li = document.createElement('li');
  li.className = 'dd-log-viewer__line'; li.dataset.level = l;
  li.innerHTML = `<time class="dd-log-viewer__time">09:59:00.000</time><span class="dd-log-viewer__level">${l}</span><span class="dd-log-viewer__src">test</span><span class="dd-log-viewer__msg">${m}</span>`;
  document.querySelector(`${s} .dd-log-viewer__lines`).append(li);
}, v, level, msg);

test('search filters lines, highlights matches and counts; Esc clears', async ({ open, assert }) => {
  const page = await open('components/log-viewer');
  await search(page, LIVE, 'billing');
  const s = await state(page, LIVE);
  assert.ok(s.shown > 0 && s.shown < s.total);
  assert.ok(s.texts.every((t) => t.includes('billing')), 'every shown line matches');
  assert.ok(s.hiddenTexts.every((t) => !t.includes('billing')), 'every hidden line does not');
  assert.ok(s.marks.length >= s.shown && s.marks.every((m) => m === 'billing'), 'matches are marked');
  assert.equal(s.count, `${s.shown} of ${s.total} lines`);
  assert.equal(s.levelSum, s.shown, 'level counts follow the search');
  await page.press('Escape');
  const after = await state(page, LIVE);
  assert.equal(await page.get((v) => document.querySelector(`${v} [data-dd-log-viewer-search]`).value, LIVE), '');
  assert.equal(after.shown, after.total);
  assert.equal(after.marks.length, 0, 'marks removed');
  assert.equal(after.count, `${after.total} lines`);
  // Regex characters are matched literally.
  await search(page, LIVE, '(212');
  assert.ok((await state(page, LIVE)).shown >= 1);
});

test('level toggles hide and show a level; other viewers stay as they are', async ({ open, assert }) => {
  const page = await open('components/log-viewer');
  const btn = `${LIVE} [data-dd-log-viewer-level="debug"]`;
  const other = await state(page, FILT);
  await page.click(btn);
  assert.equal(await page.attr(btn, 'aria-pressed'), 'false');
  assert.ok(!(await state(page, LIVE)).levels.includes('debug'));
  // Keyboard: Space on the toggle turns it back on.
  await page.focus(btn);
  await page.press('Space');
  assert.equal(await page.attr(btn, 'aria-pressed'), 'true');
  assert.ok((await state(page, LIVE)).levels.includes('debug'));
  assert.deepEqual(await state(page, FILT), other, 'the filtered example did not change');
  // Rapid toggling ends where it started.
  for (let k = 0; k < 6; k++) await page.click(`${LIVE} [data-dd-log-viewer-level="info"]`);
  assert.equal(await page.attr(`${LIVE} [data-dd-log-viewer-level="info"]`, 'aria-pressed'), 'true');
});

test('state from the markup applies on load; wrap toggles .is-wrapped', async ({ open, assert }) => {
  const page = await open('components/log-viewer');
  const s = await state(page, FILT);
  assert.deepEqual(s.levels, ['error', 'warn']);
  assert.ok(s.texts.every((t) => t.includes('idp')));
  assert.equal(s.count, `${s.shown} of 24 lines`);
  const wrap = `${FILT} [data-dd-log-viewer-wrap]`;
  const ws = () => page.get((v) => getComputedStyle(document.querySelector(`${v} .dd-log-viewer__line:not([hidden]) .dd-log-viewer__msg`)).whiteSpace, FILT);
  assert.equal(await page.attr(wrap, 'aria-pressed'), 'true');
  assert.equal(await ws(), 'pre-wrap');
  await page.click(wrap);
  assert.equal(await page.attr(wrap, 'aria-pressed'), 'false');
  assert.ok(!(await page.get((v) => document.querySelector(v).classList.contains('is-wrapped'), FILT)));
  assert.equal(await ws(), 'pre');
});

test('nothing matches: the empty message names the query; clear filters resets everything', async ({ open, assert }) => {
  const page = await open('components/log-viewer');
  let s = await state(page, EMPTY);
  assert.equal(s.shown, 0);
  assert.ok(s.empty);
  assert.equal(await page.text(`${EMPTY} [data-dd-log-viewer-query]`), '“ledger-sync”');
  await page.click(`${EMPTY} [data-dd-log-viewer-clear]`);
  s = await state(page, EMPTY);
  assert.equal(s.shown, 24);
  assert.ok(!s.empty);
  assert.equal(await page.get((v) => document.querySelector(`${v} [data-dd-log-viewer-search]`).value, EMPTY), '');
  // Turning every level off names the levels instead.
  for (const l of ['debug', 'info', 'warn', 'error']) await page.click(`${EMPTY} [data-dd-log-viewer-level="${l}"]`);
  s = await state(page, EMPTY);
  assert.ok(s.empty);
  assert.equal(await page.text(`${EMPTY} [data-dd-log-viewer-query]`), 'the selected levels');
});

test('follow: starts on the newest line, pauses when you scroll up, resumes at the bottom or on the button', async ({ open, assert }) => {
  const page = await open('components/log-viewer');
  const follow = `${LIVE} [data-dd-log-viewer-follow]`;
  assert.equal(await page.attr(follow, 'aria-pressed'), 'true');
  assert.ok((await scrollInfo(page, LIVE)).gap < 4, 'starts at the bottom');
  await addLine(page, LIVE, 'info', 'follow-one');
  await page.waitFor((v) => { const el = document.querySelector(`${v} .dd-log-viewer__scroll`); return el.scrollHeight - el.scrollTop - el.clientHeight < 4; }, { args: [LIVE] });
  // Reading higher up pauses following; new lines don't drag the view down.
  await page.focus(`${LIVE} .dd-log-viewer__scroll`);
  await page.press('Home');
  await page.waitFor((v) => document.querySelector(`${v} [data-dd-log-viewer-follow]`).getAttribute('aria-pressed') === 'false', { args: [LIVE] });
  const top = (await scrollInfo(page, LIVE)).top;
  await addLine(page, LIVE, 'warn', 'follow-two');
  await page.sleep(150);
  assert.equal((await scrollInfo(page, LIVE)).top, top, 'view stays put while paused');
  // Back to the bottom resumes.
  await page.press('End');
  await page.waitFor((v) => document.querySelector(`${v} [data-dd-log-viewer-follow]`).getAttribute('aria-pressed') === 'true', { args: [LIVE] });
  // Turned off with the button, it stays off even at the bottom; on again jumps to the newest line.
  await page.click(follow);
  assert.equal(await page.attr(follow, 'aria-pressed'), 'false');
  await addLine(page, LIVE, 'info', 'follow-three');
  await page.sleep(150);
  assert.ok((await scrollInfo(page, LIVE)).gap > 4, 'not followed while off');
  await page.evaluate(`document.querySelector('${LIVE} .dd-log-viewer__scroll').scrollTop = 0`);
  await page.click(follow);
  assert.equal(await page.attr(follow, 'aria-pressed'), 'true');
  await page.waitFor((v) => { const el = document.querySelector(`${v} .dd-log-viewer__scroll`); return el.scrollHeight - el.scrollTop - el.clientHeight < 4; }, { args: [LIVE] });
});

test('lines added later are filtered, highlighted and counted', async ({ open, assert }) => {
  const page = await open('components/log-viewer');
  const before = await state(page, FILT);
  await addLine(page, FILT, 'error', 'idp token refresh failed');
  await addLine(page, FILT, 'info', 'idp healthy again');
  await addLine(page, FILT, 'error', 'disk almost full');
  await page.waitFor((v, n) => document.querySelector(`${v} [data-dd-log-viewer-count]`).textContent === `${n + 1} of 27 lines`, { args: [FILT, before.shown] });
  const s = await state(page, FILT);
  assert.ok(s.texts.some((t) => t.includes('idp token refresh failed')), 'matching error line shown');
  assert.ok(!s.texts.some((t) => t.includes('idp healthy again')), 'info is off');
  assert.ok(!s.texts.some((t) => t.includes('disk almost full')), 'does not match the search');
  assert.equal(s.marks.length, before.marks.length + 1, 'the new match is marked');
  assert.equal(await page.text(`${FILT} [data-dd-log-viewer-level="error"] .dd-log-viewer__n`), String(Number(await page.get((v) => [...document.querySelectorAll(`${v} .dd-log-viewer__line[data-level="error"]`)].filter((l) => l.textContent.toLowerCase().includes('idp')).length, FILT))));
  // Removing lines updates the count too.
  await page.evaluate(`document.querySelector('${FILT} .dd-log-viewer__lines').firstElementChild.remove()`);
  await page.waitFor((v) => / of 26 lines$/.test(document.querySelector(`${v} [data-dd-log-viewer-count]`).textContent), { args: [FILT] });
});

test('the live example tails new lines on its own', async ({ open, assert }) => {
  const page = await open('components/log-viewer');
  await page.evaluate(`document.querySelector('${LIVE}').scrollIntoView({ block: 'center' })`);
  await page.waitFor((v) => document.querySelectorAll(`${v} .dd-log-viewer__line`).length > 24, { args: [LIVE], timeout: 4000 });
  assert.ok((await scrollInfo(page, LIVE)).gap < 4, 'and follows them');
});

test('dusk: error lines are tinted, marks and pressed toggles are visible', async ({ open, assert }) => {
  const page = await open('components/log-viewer', { theme: 'dusk' });
  const bg = (sel) => page.get((s) => getComputedStyle(document.querySelector(s)).backgroundColor, sel);
  assert.notEqual(await bg(`${FILT} .dd-log-viewer__line[data-level="error"]`), 'rgba(0, 0, 0, 0)');
  assert.notEqual(await bg(`${FILT} mark.dd-log-viewer__mark`), 'rgba(0, 0, 0, 0)');
  const wrapOn = await bg(`${FILT} [data-dd-log-viewer-wrap]`);
  await page.click(`${FILT} [data-dd-log-viewer-wrap]`);
  await page.sleep(250); // past the 160ms colour transition
  assert.notEqual(await bg(`${FILT} [data-dd-log-viewer-wrap]`), wrapOn, 'pressed and unpressed differ');
});

test('375px: tap a level and wrap; the bar fits', async ({ open, assert }) => {
  const page = await open('components/log-viewer', { width: 375 });
  await page.tap(`${EMPTY} [data-dd-log-viewer-clear]`);
  await page.tap(`${EMPTY} [data-dd-log-viewer-level="error"]`);
  assert.equal(await page.attr(`${EMPTY} [data-dd-log-viewer-level="error"]`, 'aria-pressed'), 'false');
  await page.tap(`${EMPTY} [data-dd-log-viewer-wrap]`);
  assert.equal(await page.attr(`${EMPTY} [data-dd-log-viewer-wrap]`, 'aria-pressed'), 'true');
  assert.ok(await page.get(() => document.documentElement.scrollWidth <= innerWidth), 'no sideways page scroll');
  assert.ok(await page.get((v) => { const r = document.querySelector(v); const b = r.getBoundingClientRect(); return [...r.querySelectorAll('.dd-log-viewer__bar > *')].every((c) => { const x = c.getBoundingClientRect(); return x.right <= b.right + 1 && x.left >= b.left - 1; }); }, LIVE), 'bar controls stay inside the viewer');
});

test('in a dialog, Esc in the search clears it and leaves the dialog open; Esc in an empty search closes the dialog', async ({ open, assert }) => {
  const page = await open('components/log-viewer');
  await page.get((s) => {
    const dlg = document.createElement('dialog');
    dlg.className = 'dd-dialog dd-dialog--lg'; dlg.id = 'lv-dlg'; dlg.setAttribute('aria-label', 'Logs');
    dlg.append(document.querySelector(s));
    document.body.append(dlg);
    dd.dialog.open(dlg);
  }, FILT);
  await page.sleep(300);
  const input = '#lv-dlg [data-dd-log-viewer-search]';
  assert.equal(await page.get((s) => document.querySelector(s).value, input), 'idp');
  await page.focus(input);
  await page.press('Escape');
  await page.sleep(300);
  assert.equal(await page.get((s) => document.querySelector(s).value, input), '', 'Esc clears the search');
  assert.ok(await page.get(() => document.getElementById('lv-dlg').open), 'and only the search');
  await page.press('Escape');
  await page.waitFor(() => !document.getElementById('lv-dlg').open);
});
