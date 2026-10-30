import { test } from './lib/test.mjs';

// Examples: [0] full (crumbs, actions, meta, link tabs) · [1] title + actions · [2] detail (back link, copy) · [3] large + pill tabs
const hdr = (n) => `[data-ph="${n}"]`;
const tag = () => document.querySelectorAll('.ex-stage .dd-page-header').forEach((h, n) => h.setAttribute('data-ph', n));
const toasts = () => [...document.querySelectorAll('.dd-toast__title')].map((t) => t.textContent);

test('header actions are real buttons that respond', async ({ open, assert }) => {
  const page = await open('components/page-header');
  await page.get(tag);
  assert.equal(await page.count(`.ex-stage .dd-page-header__actions > :not(button[type="button"])`), 0, 'actions are type=button buttons');
  await page.click(`${hdr(0)} .dd-page-header__actions .dd-btn--primary`);
  await page.waitFor(() => [...document.querySelectorAll('.dd-toast__title')].some((t) => t.textContent === 'Promote'));
  await page.click(`${hdr(1)} .dd-page-header__actions .dd-btn--primary`);
  await page.click(`${hdr(3)} .dd-page-header__actions .dd-btn--danger`);
  await page.waitFor(() => ['New project', 'Purge all'].every((x) => [...document.querySelectorAll('.dd-toast__title')].some((t) => t.textContent === x)));
  // keyboard
  await page.focus(`${hdr(0)} .dd-page-header__actions .dd-btn--secondary`);
  await page.press('Enter');
  await page.waitFor(() => [...document.querySelectorAll('.dd-toast__title')].some((t) => t.textContent === 'Redeploy'));
});

test('the copy button puts the deploy ID on the clipboard and says so', async ({ open, assert }) => {
  const page = await open('components/page-header');
  await page.get(tag);
  await page.get(() => { window.__copied = []; Object.defineProperty(navigator, 'clipboard', { value: { writeText: async (t) => { window.__copied.push(t); } }, configurable: true }); });
  await page.click(`${hdr(2)} [aria-label="Copy deploy ID"]`);
  assert.deepEqual(await page.get(() => window.__copied), ['dpl_71be09']);
  await page.waitFor(() => [...document.querySelectorAll('.dd-toast__title')].some((t) => t.textContent === 'Copied dpl_71be09'));
  assert.ok(!(await page.get(toasts)).includes('Copy deploy ID'), 'no generic action toast on top');
});

test('tabs under the header: link tabs move aria-current; they are links, not tab widgets', async ({ open, assert }) => {
  const page = await open('components/page-header');
  await page.get(tag);
  const cur = (n) => [...document.querySelectorAll(`[data-ph="${n}"] .dd-tabs__list > [aria-current="page"]`)].map((a) => a.textContent.trim());
  assert.equal(await page.count('.ex-stage .dd-page-header [role="tab"]'), 0);
  assert.deepEqual(await page.get(cur, 0), ['Overview']);
  await page.click(`${hdr(0)} .dd-tabs__list > a:nth-child(3)`);
  assert.deepEqual(await page.get(cur, 0), ['Logs']);
  await page.click(`${hdr(3)} .dd-tabs__list > a:nth-child(2)`);
  assert.deepEqual(await page.get(cur, 3), ['Europe']);
  assert.deepEqual(await page.get(cur, 0), ['Logs'], 'headers are independent');
  assert.equal(await page.get(() => location.hash), '', 'the docs page did not jump');
  // a real href navigates
  await page.get((s) => document.querySelector(`${s} .dd-tabs__list > a:nth-child(4)`).setAttribute('href', '#metrics-view'), hdr(0));
  await page.click(`${hdr(0)} .dd-tabs__list > a:nth-child(4)`);
  assert.equal(await page.get(() => location.hash), '#metrics-view');
});

test('breadcrumbs and back link: current crumb is not a link, back link is', async ({ open, assert }) => {
  const page = await open('components/page-header');
  await page.get(tag);
  assert.equal(await page.get((s) => { const a = document.querySelector(`${s} [aria-current="page"].dd-breadcrumbs__link`); return a.textContent.trim() + (a.hasAttribute('href') ? ' (link)' : ''); }, hdr(0)), 'auth-gateway');
  assert.ok(await page.get((s) => !!document.querySelector(`${s} a.dd-page-header__back[href]`), hdr(2)));
});

test('375px: actions wrap under the title, the tabs scroll inside their row, the page does not scroll sideways', async ({ open, assert }) => {
  const page = await open('components/page-header', { width: 375 });
  await page.get(tag);
  for (const n of [0, 1, 2, 3]) {
    const r = await page.get((s) => {
      const t = document.querySelector(`${s} .dd-page-header__titles`).getBoundingClientRect();
      const a = document.querySelector(`${s} .dd-page-header__actions`).getBoundingClientRect();
      const h = document.querySelector(s).getBoundingClientRect();
      return { below: a.top >= t.bottom - 1, inside: a.right <= h.right + 1 };
    }, hdr(n));
    assert.deepEqual(r, { below: true, inside: true }, `header ${n}`);
  }
  assert.ok(await page.get(() => document.documentElement.scrollWidth <= innerWidth), 'no sideways scroll');
  assert.ok(await page.get((s) => { const l = document.querySelector(`${s} .dd-tabs__list`); return l.scrollWidth > l.clientWidth && getComputedStyle(l).overflowX === 'auto'; }, hdr(0)), 'the tab row scrolls');
  await page.tap(`${hdr(1)} .dd-page-header__actions .dd-btn--secondary`);
  await page.waitFor(() => [...document.querySelectorAll('.dd-toast__title')].some((t) => t.textContent === 'Import'));
});

test('dusk: the title is ink, meta values mono, the status dot keeps its colour', async ({ open, assert }) => {
  const page = await open('components/page-header', { theme: 'dusk' });
  await page.get(tag);
  const c = await page.get((s) => {
    const probe = document.createElement('i'); document.body.append(probe);
    const tok = (v) => { probe.style.color = `var(${v})`; return getComputedStyle(probe).color; };
    return {
      title: getComputedStyle(document.querySelector(`${s} .dd-page-header__title`)).color === tok('--dd-text'),
      mono: getComputedStyle(document.querySelector(`${s} .dd-page-header__meta b`)).fontFamily.includes('DM Mono'),
      dot: getComputedStyle(document.querySelector(`${s} .dd-page-header__status`)).backgroundColor === tok('--dd-ok'),
    };
  }, hdr(0));
  assert.deepEqual(c, { title: true, mono: true, dot: true });
});
