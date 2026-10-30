import { test } from './lib/test.mjs';

// The two overflow examples: [0] closed, [1] pinned open on load. Both are live <details data-dd-autoclose>.
const more = (n) => `[data-more="${n}"]`;
const tag = () => document.querySelectorAll('.ex-stage .dd-breadcrumbs__more').forEach((d, n) => d.setAttribute('data-more', n));
const isOpen = (s) => document.querySelector(s).open;
const focusIn = (s) => document.querySelector(s).contains(document.activeElement);
const focusText = () => document.activeElement?.textContent.trim();

test('every trail marks the current page with aria-current and no href; the rest are links', async ({ open, assert }) => {
  const page = await open('components/breadcrumbs');
  const trails = await page.get(() => [...document.querySelectorAll('.ex-stage nav.dd-breadcrumbs')].map((n) => {
    const links = [...n.querySelectorAll(':scope > ol > li > .dd-breadcrumbs__link')];
    const last = links[links.length - 1];
    return { label: n.getAttribute('aria-label'), lastCurrent: last.getAttribute('aria-current') === 'page' && !last.hasAttribute('href'), othersLinks: links.slice(0, -1).every((a) => a.hasAttribute('href') && !a.hasAttribute('aria-current')) };
  }));
  assert.ok(trails.length >= 6);
  for (const t of trails) assert.deepEqual(t, { label: 'Breadcrumb', lastCurrent: true, othersLinks: true });
});

test('“…” opens the hidden levels on click; a click outside closes it', async ({ open, assert }) => {
  const page = await open('components/breadcrumbs');
  await page.get(tag);
  assert.ok(await page.get(isOpen, more(1)), 'the pinned example starts open');
  await page.click(`${more(0)} > summary`);
  assert.ok(await page.get(isOpen, more(0)));
  assert.ok(!(await page.get(isOpen, more(1))), 'opening one closes the other');
  assert.ok(await page.visible(`${more(0)} .dd-breadcrumbs__menu`));
  assert.equal(await page.count(`${more(0)} .dd-breadcrumbs__menu-link`), 3);
  await page.click('.doc-head h1');
  assert.ok(!(await page.get(isOpen, more(0))), 'outside click closes');
  // and again — rapid toggles end in a sane state
  for (let k = 0; k < 4; k++) await page.click(`${more(0)} > summary`);
  assert.ok(!(await page.get(isOpen, more(0))), 'an even number of clicks leaves it closed');
});

test('keyboard: ↓ opens and focuses the first level, ↑ ↓ move, Esc closes and returns focus to “…”', async ({ open, assert }) => {
  const page = await open('components/breadcrumbs');
  await page.get(tag);
  await page.focus(`${more(0)} > summary`);
  await page.press('ArrowDown');
  assert.ok(await page.get(isOpen, more(0)));
  assert.equal(await page.get(focusText), 'infrastructure');
  await page.press('ArrowDown', 'ArrowDown');
  assert.equal(await page.get(focusText), 'eu-central');
  await page.press('ArrowDown');
  assert.equal(await page.get(focusText), 'infrastructure', 'wraps');
  await page.press('ArrowUp');
  assert.equal(await page.get(focusText), 'eu-central');
  await page.press('Escape');
  assert.ok(!(await page.get(isOpen, more(0))));
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(`${s} > summary`), more(0)), 'focus is back on “…”');
  await page.press('Enter');
  assert.ok(await page.get(isOpen, more(0)), 'Enter opens it too');
  await page.press('Enter');
  assert.ok(!(await page.get(isOpen, more(0))), 'and closes it');
});

test('choosing a level closes the menu; Tab moves through the levels', async ({ open, assert }) => {
  const page = await open('components/breadcrumbs');
  await page.get(tag);
  await page.click(`${more(0)} > summary`);
  await page.press('Tab');
  assert.ok(await page.get(focusIn, `${more(0)} .dd-breadcrumbs__menu`), 'Tab enters the open menu');
  await page.click(`${more(0)} .dd-breadcrumbs__menu li:nth-child(2) a`);
  assert.ok(!(await page.get(isOpen, more(0))), 'choosing closes');
  assert.equal(await page.get(() => location.hash), '', 'the docs page did not jump');
});

test('375px: long crumbs truncate with an ellipsis, nothing scrolls sideways, the menu stays on screen', async ({ open, assert }) => {
  const page = await open('components/breadcrumbs', { width: 375 });
  await page.get(tag);
  const long = await page.get(() => {
    const span = [...document.querySelectorAll('.ex-stage .dd-breadcrumbs__link > span')].find((s) => s.textContent.startsWith('reconcile-'));
    const cs = getComputedStyle(span);
    return { truncated: span.scrollWidth > span.clientWidth, ellipsis: cs.textOverflow, full: span.textContent };
  });
  assert.deepEqual(long, { truncated: true, ellipsis: 'ellipsis', full: 'reconcile-stripe-invoices-for-annual-plans-eu' });
  assert.ok(await page.get(() => document.documentElement.scrollWidth <= innerWidth), 'no sideways scroll');
  await page.tap(`${more(0)} > summary`);
  assert.ok(await page.get(isOpen, more(0)), 'tap opens');
  const r = await page.get((s) => { const m = document.querySelector(`${s} .dd-breadcrumbs__menu`).getBoundingClientRect(); return { l: m.left, r: m.right }; }, more(0));
  assert.ok(r.l >= 0 && r.r <= 375, `menu within the viewport (${r.l}–${r.r})`);
  await page.tap('.doc-head h1');
  assert.ok(!(await page.get(isOpen, more(0))), 'tap outside closes');
});

test('dusk: an open “…” sits on a wash and its menu floats', async ({ open, assert }) => {
  const page = await open('components/breadcrumbs', { theme: 'dusk' });
  await page.get(tag);
  await page.click(`${more(0)} > summary`);
  const s = await page.get((m) => ({
    wash: getComputedStyle(document.querySelector(`${m} > summary`)).backgroundColor,
    shadow: getComputedStyle(document.querySelector(`${m} .dd-breadcrumbs__menu`)).boxShadow,
  }), more(0));
  assert.notEqual(s.wash, 'rgba(0, 0, 0, 0)');
  assert.notEqual(s.shadow, 'none');
});
