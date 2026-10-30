import { test } from './lib/test.mjs';

const tok = (v) => { const p = document.createElement('i'); document.body.append(p); p.style.color = `var(${v})`; const c = getComputedStyle(p).color; p.remove(); return c; };
const colourOf = (sel) => getComputedStyle(document.querySelector(sel)).color;

test('the wordmark is set in currentColor: ink in dawn, light in dusk', async ({ open, assert }) => {
  const dawn = await open('components/logo');
  const d1 = await dawn.get((s) => getComputedStyle(document.querySelector(s)).color, '.ex-stage .dd-logo');
  assert.equal(d1, await dawn.get(tok, '--dd-text'));
  const page = await open('components/logo', { theme: 'dusk' });
  const d2 = await page.get((s) => getComputedStyle(document.querySelector(s)).color, '.ex-stage .dd-logo');
  assert.equal(d2, await page.get(tok, '--dd-text'));
  assert.notEqual(d1, d2, 'the mark changes with the theme');
  const f = await page.get(() => { const cs = getComputedStyle(document.querySelector('.ex-stage .dd-logo')); return [cs.fontWeight, cs.textTransform, cs.letterSpacing]; });
  assert.equal(f[0], '800'); assert.equal(f[1], 'none');
  assert.ok(parseFloat(f[2]) < 0, 'tracked in');
});

test('“View in dusk” on an example re-colours its logo; flipping back restores it', async ({ open, assert }) => {
  const page = await open('components/logo');
  const before = await page.get(colourOf, '.ex-stage .dd-logo');
  await page.click('.ex-frame [data-ex-theme]');
  assert.equal(await page.attr('.ex-stage', 'data-theme'), 'dusk');
  await page.waitFor((s, b) => getComputedStyle(document.querySelector(s)).color !== b, { args: ['.ex-stage .dd-logo', before] });
  await page.click('.ex-frame [data-ex-theme]');
  await page.waitFor((s, b) => getComputedStyle(document.querySelector(s)).color === b, { args: ['.ex-stage .dd-logo', before] });
});

test('grounds: each block sets the colour and the stacked cut-out stroke matches the block', async ({ open, assert }) => {
  const page = await open('components/logo', { theme: 'dusk' });
  const g = await page.get(() => [...document.querySelectorAll('.logo-grounds > .dd-logo-block')].map((b) => {
    const logo = b.querySelector('.dd-logo');
    const second = b.querySelector('.dd-logo__line + .dd-logo__line');
    return { bg: getComputedStyle(b).backgroundColor, fg: getComputedStyle(logo).color, stroke: second ? getComputedStyle(second).webkitTextStrokeColor : null };
  }));
  assert.equal(g.length, 4);
  assert.notEqual(g[0].fg, g[1].fg, 'dawn block and dusk block colour the mark differently');
  assert.equal(new Set(g.map((x) => x.bg)).size, 4, 'four different grounds');
  for (const x of g) assert.notEqual(x.fg, x.bg, 'the mark reads on its ground');
  assert.equal(g[3].stroke, g[3].bg, 'the stacked cut-out stroke is the ground colour');
});

test('tiles and stacked lockups are labelled images; a linked logo shows a focus ring', async ({ open, assert }) => {
  const page = await open('components/logo', { width: 375 });
  assert.equal(await page.count('.ex-stage :is(.dd-logo--stack, .dd-logo-tile):not([role="img"][aria-label="dawn & dusk"], [aria-hidden="true"])'), 0, 'every tile is a labelled image or hidden decoration');
  assert.equal(await page.count('.ex-stage .dd-logo--stack .dd-logo__line:not([aria-hidden="true"])'), 0, 'lines are hidden from the accessibility tree');
  await page.focus('.ex-stage .logo-ctx a.dd-logo');
  await page.press({ key: 'Tab', shift: true });
  await page.press('Tab');
  assert.equal(await page.get(() => document.activeElement.className), 'dd-logo dd-logo--sm');
  assert.equal(await page.get(() => getComputedStyle(document.activeElement).outlineStyle), 'solid');
  assert.ok(await page.get(() => document.documentElement.scrollWidth <= innerWidth), 'no sideways scroll at 375px');
});
