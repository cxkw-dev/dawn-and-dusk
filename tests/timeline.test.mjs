import { test } from './lib/test.mjs';

const ax = async (page, sel) => {
  const { root } = await page.send('DOM.getDocument', { depth: 0 });
  const { nodeIds } = await page.send('DOM.querySelectorAll', { nodeId: root.nodeId, selector: sel });
  const out = [];
  for (const nodeId of nodeIds) {
    const { nodes } = await page.send('Accessibility.getPartialAXTree', { nodeId, fetchRelatives: false });
    out.push({ role: nodes[0].role?.value, name: nodes[0].name?.value ?? '', ignored: nodes[0].ignored });
  }
  return out;
};
const feed = '.ex-stage .dd-timeline:not(.dd-timeline--audit):has(.dd-timeline__group)';
const audit = '.ex-stage .dd-timeline--audit';

test('semantics: day headings, ordered lists, machine-readable times, named avatars, silent icons', async ({ open, assert }) => {
  const page = await open('components/timeline');
  assert.ok(await page.get(() => [...document.querySelectorAll('.ex-stage .dd-timeline__list')].every((l) => l.tagName === 'OL')));
  // Every <time> carries a datetime that parses; a time that isn't known yet (“—”) isn't a <time> and is not read out.
  const times = await page.get(() => [...document.querySelectorAll('.ex-stage time')].map((t) => t.getAttribute('datetime')));
  assert.ok(times.length >= 20);
  assert.ok(times.every((d) => d && !Number.isNaN(Date.parse(d))), `bad datetime in ${JSON.stringify(times)}`);
  assert.deepEqual(await page.get(() => [...document.querySelectorAll('.ex-stage span.dd-timeline__time')].map((t) => [t.textContent, t.getAttribute('aria-hidden')])), [['—', 'true']]);

  const days = await ax(page, '.ex-stage .dd-timeline__day');
  assert.deepEqual(days.map((d) => d.role), Array(5).fill('heading'));
  assert.equal(days[0].name, 'Today Oct 30');

  const avatars = await ax(page, `${feed} .dd-timeline__marker--avatar`);
  assert.deepEqual(avatars.map((a) => `${a.role}:${a.name}`), ['image:Andy', 'image:Mira K.', 'image:Ravi L.', 'image:Andy']);
  const icons = await ax(page, '.ex-stage .dd-timeline__marker:not(.dd-timeline__marker--avatar) svg');
  assert.ok(icons.length >= 10 && icons.every((n) => n.ignored), 'icon markers are decoration');
});

test('links in the feed: Tab reaches each one, Enter keeps the page where it is', async ({ open, assert }) => {
  const page = await open('components/timeline');
  const names = await page.get((s) => [...document.querySelectorAll(`${s} a`)].map((a) => a.textContent), feed);
  assert.deepEqual(names, ['dawn-and-dusk', '#214 Data table density', 'dockey-ui v2.4.0', 'cxkw.dev', 'leetnode']);
  await page.focus(`${feed} a`);
  const seen = [await page.get(() => document.activeElement.textContent)];
  for (let k = 1; k < names.length; k++) { await page.press('Tab'); seen.push(await page.get(() => document.activeElement.textContent)); }
  assert.deepEqual(seen, names, 'every link is a tab stop, in reading order');
  const y = await page.get(() => scrollY);
  await page.press('Enter');
  assert.equal(await page.get(() => location.hash), '');
  assert.equal(await page.get(() => scrollY), y);
  // Hover deepens the dotted underline.
  const before = await page.get(() => getComputedStyle(document.activeElement).textDecorationColor);
  await page.hover(`${feed} a`);
  assert.notEqual(await page.get((s) => getComputedStyle(document.querySelector(`${s} a`)).textDecorationColor, feed), before);
});

test('dusk: connectors join markers but stop at the last one; tonal markers stand apart from neutral ones', async ({ open, assert }) => {
  const page = await open('components/timeline', { theme: 'dusk' });
  const lines = await page.get((s) => [...document.querySelectorAll(`${s} .dd-timeline__list`)].map((l) => [...l.children].map((li) => {
    const cs = getComputedStyle(li, '::before');
    return cs.content !== 'none' && parseFloat(cs.height) > 4;
  })), feed);
  assert.deepEqual(lines, [[true, true, true, false], [true, true, false], [true, false]]);
  assert.ok(await page.get((s) => [...document.querySelectorAll(`${s} .dd-timeline__item`)].every((li) => { const cs = getComputedStyle(li, '::before'); return cs.content === 'none' || cs.display === 'none'; }), audit), 'audit rows have no connector');

  const bg = (sel) => page.get((s) => getComputedStyle(document.querySelector(s)).backgroundColor, sel);
  const neutral = await bg(`${feed} .dd-timeline__marker:not([class*="--"])`);
  const ok = await bg(`${feed} .dd-timeline__marker--ok`);
  const bad = await bg(`${feed} .dd-timeline__marker--bad`);
  assert.ok(new Set([neutral, ok, bad]).size === 3, 'neutral, ok and bad markers each have their own tone');
  // The sentence is muted; the actor stands out.
  const [text, actor] = await page.get((s) => { const p = document.querySelector(`${s} .dd-timeline__text`); return [getComputedStyle(p).color, getComputedStyle(p.querySelector('b') || p).color]; }, `${feed} .dd-timeline__item:nth-child(2)`);
  assert.notEqual(text, actor);
});

test('audit log: one line per event when wide; at 375 the time drops under the sentence and rows wrap, never the page', async ({ open, assert }) => {
  const layout = (page) => page.get((s) => [...document.querySelectorAll(`${s} .dd-timeline__item`)].map((li) => {
    const t = li.querySelector('.dd-timeline__time').getBoundingClientRect();
    const p = li.querySelector('.dd-timeline__text');
    const b = p.getBoundingClientRect();
    return { sameLine: Math.abs(t.top + t.height / 2 - (b.top + b.height / 2)) < 4, below: t.top >= b.bottom - 1, wraps: getComputedStyle(p).whiteSpace !== 'nowrap', lines: Math.round(p.getBoundingClientRect().height / parseFloat(getComputedStyle(p).lineHeight)), clipped: p.scrollWidth > p.clientWidth + 1 };
  }), audit);

  const wide = await open('components/timeline', { width: 1280 });
  const w = await layout(wide);
  assert.equal(w.length, 7);
  assert.ok(w.every((r) => r.sameLine && r.lines === 1 && !r.clipped), JSON.stringify(w)); // wide: one line each, never cut off

  const narrow = await open('components/timeline', { width: 375 });
  assert.ok(await narrow.get(() => document.documentElement.scrollWidth <= innerWidth), 'no sideways page scroll');
  const n = await layout(narrow);
  assert.ok(n.every((r) => r.below && r.wraps && !r.clipped), JSON.stringify(n));
  // The feed's times drop under their sentence too.
  assert.ok(await narrow.get((s) => [...document.querySelectorAll(`${s} .dd-timeline__body`)].every((b) => {
    const t = b.querySelector('.dd-timeline__time').getBoundingClientRect();
    return t.top >= b.querySelector('.dd-timeline__text').getBoundingClientRect().bottom - 1;
  }), feed));
  // A long detail line wraps inside its block.
  assert.ok(await narrow.get((s) => [...document.querySelectorAll(`${s} .dd-timeline__detail`)].every((d) => d.scrollWidth <= d.clientWidth + 1), feed));
});
