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
const before = (page, sel, prop) => page.get((s, p) => getComputedStyle(document.querySelector(s), '::before')[p], sel, prop);

test('every dot has a text alternative: a word beside it, or role="img" with a name', async ({ open, assert }) => {
  const page = await open('components/status-dot');
  const all = await page.get(() => [...document.querySelectorAll('.ex-stage .dd-status-dot')].map((d) => [d.textContent.trim(), d.getAttribute('role')]));
  assert.ok(all.length >= 20);
  const bare = all.filter(([t]) => !t);
  assert.ok(bare.length === 6 && bare.every(([, r]) => r === 'img'), 'dots without a word are images');
  const images = await ax(page, '.ex-stage .dd-status-dot[role="img"]');
  assert.deepEqual(images.map((n) => `${n.role}:${n.name}`), ['image:Online', 'image:Online', 'image:Online', 'image:Error', 'image:Error', 'image:Error']);
  // With a word, the word is the label (the dot itself is a pseudo-element, so nothing extra is read).
  assert.equal(await page.get(() => getComputedStyle(document.querySelector('.ex-stage .dd-status-dot--online'), '::before').content), '""');
  // Nothing here is interactive, and nothing pretends to be.
  assert.ok(await page.get(() => [...document.querySelectorAll('.ex-stage .dd-status-dot')].every((d) => d.tabIndex < 0 && getComputedStyle(d).cursor !== 'pointer')));
});

test('dusk: 6 / 8 / 10px dots; each state its own colour; unknown is a hollow ring', async ({ open, assert }) => {
  const page = await open('components/status-dot', { theme: 'dusk' });
  const sizes = await page.get(() => ['--sm', '', '--lg'].map((m) => {
    const el = document.querySelector(`.ex-stage .dd-status-dot--online${m ? `.dd-status-dot${m}` : ':not(.dd-status-dot--sm, .dd-status-dot--lg)'}[role="img"]`);
    return getComputedStyle(el, '::before').width;
  }));
  assert.deepEqual(sizes, ['6px', '8px', '10px']);
  const states = ['online', 'idle', 'error', 'info', 'offline'];
  const colours = [];
  for (const s of states) colours.push(await before(page, `.ex-stage .dd-status-dot--${s}`, 'backgroundColor'));
  assert.equal(new Set(colours).size, 5, `distinct colours: ${colours.join(' / ')}`);
  const unknown = '.ex-stage .dd-status-dot--unknown';
  assert.match(await before(page, unknown, 'backgroundColor'), /rgba\(0, 0, 0, 0\)|transparent/);
  assert.match(await before(page, unknown, 'boxShadow'), /inset/);
  // The label stays the text colour; --muted mutes it.
  const [plain, muted] = await page.get(() => [getComputedStyle(document.querySelector('.ex-stage .dd-status-dot--idle')).color, getComputedStyle(document.querySelector('.ex-stage .dd-status-dot--muted')).color]);
  assert.notEqual(plain, muted);
});

test('live: a ring pulses out of the dot, and only on --live; reduced motion drops it', async ({ open, assert }) => {
  const page = await open('components/status-dot');
  const live = '.ex-stage .dd-status-dot--live';
  const ring = () => page.get((s) => { const cs = getComputedStyle(document.querySelector(s), '::after'); return [cs.animationName, cs.animationIterationCount, cs.opacity]; }, live);
  const [anim, count] = await ring();
  assert.equal(anim, 'dd-status-dot-pulse');
  assert.equal(count, 'infinite');
  assert.equal(await page.count(live), 3);
  assert.ok(await page.get(() => [...document.querySelectorAll('.ex-stage .dd-status-dot:not(.dd-status-dot--live)')].every((d) => getComputedStyle(d, '::after').content === 'none')), 'no ring elsewhere');
  // The ring actually moves: its scale changes between two samples.
  const scale = () => page.get((s) => getComputedStyle(document.querySelector(s), '::after').transform, live);
  const a = await scale(); await page.sleep(250); const b = await scale();
  assert.notEqual(a, b, 'ring is animating');

  await page.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await page.waitFor((s) => getComputedStyle(document.querySelector(s), '::after').animationName === 'none', { args: [live] });
  assert.equal((await ring())[2], '0', 'the ring is gone, the dot stays');
  assert.notEqual(await before(page, live, 'width'), '0px');
});

test('375px: states and service rows wrap or fit; the page never scrolls sideways', async ({ open, assert }) => {
  const page = await open('components/status-dot', { width: 375 });
  assert.ok(await page.get(() => document.documentElement.scrollWidth <= innerWidth));
  assert.ok(await page.get(() => [...document.querySelectorAll('.ex-stage')].every((s) => s.scrollWidth <= s.clientWidth + 1)), 'nothing spills out of a stage');
  // Each service row keeps its status on the same line as the name, at the far edge.
  const rows = await page.get(() => [...document.querySelectorAll('.ex-stage .dd-status-dot--online, .ex-stage .dd-status-dot--error')]
    .filter((d) => d.textContent === 'Operational' || d.textContent === 'Down')
    .map((d) => { const r = d.getBoundingClientRect(); const p = d.parentElement.getBoundingClientRect(); return Math.abs(r.right - p.right) < 2; }));
  assert.deepEqual(rows, [true, true]);
});
