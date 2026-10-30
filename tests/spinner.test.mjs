import { test } from './lib/test.mjs';

const ax = async (page, sel) => {
  const { root } = await page.send('DOM.getDocument', { depth: 0 });
  const { nodeIds } = await page.send('DOM.querySelectorAll', { nodeId: root.nodeId, selector: sel });
  const out = [];
  for (const nodeId of nodeIds) {
    const { nodes } = await page.send('Accessibility.getPartialAXTree', { nodeId, fetchRelatives: false });
    out.push({ role: nodes[0].role?.value, name: nodes[0].name?.value ?? '' });
  }
  return out;
};
const panel = '#sp-invoices';
const recalc = '[data-sp-recalc]';
const loader = `${panel} .dd-page-loader`;
const titles = (page) => page.get(() => [...document.querySelectorAll('.dd-toast__title')].map((t) => t.textContent));

test('every spinner is announced: a status with a name, or inside one that says what is loading', async ({ open, assert }) => {
  const page = await open('components/spinner');
  const report = await page.get(() => [...document.querySelectorAll('.ex-stage :is(.dd-spinner, .dd-btn__spinner)')].map((s) => {
    const host = s.closest('[role="status"], [aria-busy="true"]');
    return host ? (host.getAttribute('aria-label') || host.textContent.trim()) : null;
  }));
  assert.ok(report.length >= 15);
  assert.ok(report.every(Boolean), `a spinner with nothing to say: ${JSON.stringify(report)}`);
  const statuses = await ax(page, '.ex-stage [role="status"]:not([hidden])');
  assert.ok(statuses.every((s) => s.role === 'status'));
  // Bare rings are named by their label; loaders with words are not double-labelled.
  const bare = await ax(page, '.ex-stage .dd-spinner[role="status"]');
  assert.ok(bare.length >= 10 && bare.every((s) => s.name), 'each bare spinner has a name');
  assert.ok(await page.get(() => [...document.querySelectorAll('.ex-stage [role="status"] [role="status"]')].length === 0), 'no status nested in another');
  // The live demo's overlay starts hidden — [hidden] really hides a page loader.
  assert.equal(await page.visible(loader), false);
});

test('the ring turns and the dots breathe in turn; reduced motion slows them down instead of stopping them', async ({ open, assert }) => {
  const page = await open('components/spinner');
  const ring = '.ex-stage .dd-spinner--lg:not(.dd-spinner--dots)';
  const dots = '.ex-stage .dd-spinner--dots > i';
  const anim = (sel) => page.get((s) => { const cs = getComputedStyle(document.querySelector(s)); return [cs.animationName, cs.animationDuration, cs.animationIterationCount]; }, sel);
  const turns = async () => { const a = await page.get((s) => getComputedStyle(document.querySelector(s)).transform, ring); await page.sleep(150); return a !== (await page.get((s) => getComputedStyle(document.querySelector(s)).transform, ring)); };
  assert.deepEqual(await anim(ring), ['dd-spin', '0.8s', 'infinite']);
  assert.deepEqual(await anim(dots), ['dd-spinner-dots', '1.2s', 'infinite']);
  assert.deepEqual(await page.get((s) => [...document.querySelectorAll(s)].slice(0, 3).map((i) => getComputedStyle(i).animationDelay), dots), ['0s', '0.16s', '0.32s']);
  assert.ok(await turns(), 'the ring is turning');

  await page.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await page.waitFor((s) => getComputedStyle(document.querySelector(s)).animationDuration === '2.4s', { args: [ring] });
  assert.deepEqual(await anim(ring), ['dd-spin', '2.4s', 'infinite']);
  assert.deepEqual(await anim(dots), ['dd-spinner-dots', '2.4s', 'infinite']);
  assert.ok(await turns(), 'still turning, just slower — a stopped ring would read as done');
  assert.deepEqual(await anim('.ex-stage .dd-btn__spinner'), ['dd-spin', '2.4s', 'infinite']);
});

test('live: Recalculate covers the panel and ignores a second press, then lifts with a new sync time', async ({ open, assert }) => {
  const page = await open('components/spinner');
  await page.click(recalc);
  assert.ok(await page.visible(loader), 'overlay up');
  assert.deepEqual(await ax(page, loader), [{ role: 'status', name: '' }]);
  assert.equal(await page.text(loader), 'Recalculating totals');
  assert.equal(await page.attr(panel, 'aria-busy'), 'true');
  assert.equal(await page.attr(recalc, 'aria-disabled'), 'true');
  // The wash covers the whole panel, so what's under it can't be clicked.
  assert.ok(await page.get((p, l, b) => {
    const a = document.querySelector(p).getBoundingClientRect(); const o = document.querySelector(l).getBoundingClientRect();
    const r = document.querySelector(b).getBoundingClientRect();
    return Math.abs(a.width - o.width) < 1 && Math.abs(a.height - o.height) < 1 && document.querySelector(l).contains(document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2));
  }, panel, loader, recalc), 'overlay covers the panel and its button');
  // Keyboard: the focused button is busy, so Enter and Space do nothing.
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), recalc));
  await page.press('Enter', 'Space');
  await page.waitFor((s) => document.querySelector(s).hidden, { args: [loader], timeout: 4000 });
  assert.equal(await page.attr(panel, 'aria-busy'), null);
  assert.equal(await page.attr(recalc, 'aria-disabled'), null);
  assert.match(await page.text(`${panel} [data-sp-sync]`), /^\d\d:\d\d$/);
  await page.waitFor(() => [...document.querySelectorAll('.dd-toast__title')].some((t) => t.textContent === 'Totals recalculated'));
  await page.sleep(300);
  assert.deepEqual(await titles(page), ['Totals recalculated'], 'one run, one toast');

  // It can run again, from the keyboard this time.
  await page.press('Enter');
  assert.ok(await page.visible(loader));
  await page.waitFor((s) => document.querySelector(s).hidden, { args: [loader], timeout: 4000 });
});

test('dusk: the ring takes the accent, --muted is muted; the overlay is a translucent, blurred wash', async ({ open, assert }) => {
  const page = await open('components/spinner', { theme: 'dusk' });
  const [ring, track, accent, muted, text] = await page.get(() => {
    const p = document.createElement('span'); p.style.color = 'var(--dd-accent)'; document.querySelector('.ex-stage').append(p);
    const m = document.createElement('span'); m.style.color = 'var(--dd-muted)'; document.querySelector('.ex-stage').append(m);
    const s = getComputedStyle(document.querySelector('.ex-stage .dd-spinner:not([class*="--"])'));
    return [s.borderTopColor, s.borderRightColor, getComputedStyle(p).color, getComputedStyle(m).color, getComputedStyle(document.querySelector('.ex-stage .dd-spinner--muted')).borderTopColor];
  });
  assert.equal(ring, accent);
  assert.notEqual(track, ring, 'the track is a faint version of the ring');
  assert.equal(text, muted);
  const wash = await page.get(() => { const cs = getComputedStyle(document.querySelector('.ex-stage .dd-page-loader--overlay')); return [cs.backgroundColor, cs.backdropFilter, cs.position]; });
  assert.match(wash[0], /\/ 0\.\d+\)|rgba\(.*0\.\d+\)/, `translucent: ${wash[0]}`);
  assert.match(wash[1], /blur/);
  assert.equal(wash[2], 'absolute');
});

test('375px: nothing spills sideways; a tap on Recalculate works', async ({ open, assert }) => {
  const page = await open('components/spinner', { width: 375 });
  assert.ok(await page.get(() => document.documentElement.scrollWidth <= innerWidth));
  assert.ok(await page.get(() => [...document.querySelectorAll('.ex-stage')].every((s) => s.scrollWidth <= s.clientWidth + 1)));
  await page.tap(recalc);
  assert.ok(await page.visible(loader));
  await page.waitFor((s) => document.querySelector(s).hidden, { args: [loader], timeout: 4000 });
});
