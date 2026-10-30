import { test } from './lib/test.mjs';

const read = () => {
  const s = document.querySelectorAll('.ex-stage');
  const m = (el) => { const cs = getComputedStyle(el); return { top: parseFloat(cs.marginTop), bottom: parseFloat(cs.marginBottom), line: cs.borderTopColor, w: parseFloat(cs.borderTopWidth) }; };
  const vert = [...s[1].querySelectorAll('.dd-divider--vertical')];
  const spacing = [...s[4].querySelectorAll('hr.dd-divider')].map(m);
  return {
    hr: m(s[0].querySelector('hr.dd-divider')),
    vertical: vert.map((v) => ({ h: v.getBoundingClientRect().height, rowH: v.parentElement.getBoundingClientRect().height, orient: v.getAttribute('aria-orientation'), left: getComputedStyle(v).borderLeftWidth })),
    labels: [...document.querySelectorAll('.ex-stage .dd-divider--label')].map((d) => ({ role: d.getAttribute('role'), text: d.textContent.trim(), lines: [getComputedStyle(d, '::before').borderTopWidth, getComputedStyle(d, '::after').borderTopWidth] })),
    spacing,
  };
};

test('horizontal, vertical and labelled dividers: roles, size and spacing as documented', async ({ open, assert }) => {
  const page = await open('components/divider');
  const r = await page.get(read);
  assert.deepEqual([r.hr.top, r.hr.bottom, r.hr.w], [20, 20, 1], 'default hr: 1px line, 20px above and below');
  assert.equal(r.vertical.length, 2);
  for (const v of r.vertical) {
    assert.equal(v.orient, 'vertical'); assert.equal(v.left, '1px');
    assert.ok(v.h >= v.rowH - 12 && v.h > 16, `vertical divider stretches with its row (${v.h} of ${v.rowH})`);
  }
  assert.deepEqual(r.labels.map((l) => [l.role, l.text]), [['separator', 'or'], ['separator', 'older deploys']]);
  assert.deepEqual(r.labels[0].lines, ['1px', '1px'], 'centred label: lines both sides');
  assert.deepEqual(r.labels[1].lines, ['0px', '1px'], 'start label: line after only');
  assert.deepEqual(r.spacing.map((x) => x.top), [10, 20, 40, 20], 'tight · default · loose · strong');
  assert.notEqual(r.spacing[3].line, r.spacing[1].line, '--strong is a firmer line');
});

test('dusk: lines follow the theme; at 375px nothing overflows', async ({ open, assert }) => {
  const dawn = await (await open('components/divider')).get(read);
  const page = await open('components/divider', { theme: 'dusk', width: 375 });
  const dusk = await page.get(read);
  assert.notEqual(dusk.hr.line, dawn.hr.line, 'the hairline is re-tinted in dusk');
  assert.ok(await page.get(() => document.documentElement.scrollWidth <= innerWidth), 'no sideways scroll');
  assert.ok(dusk.vertical.every((v) => v.h > 16), 'vertical dividers still stand at 375px');
});
