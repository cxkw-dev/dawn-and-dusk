import { test } from './lib/test.mjs';

// Cards on the docs page, addressed by their title text.
const card = (title) => `[data-card="${title}"]`;
const tag = () => document.querySelectorAll('.ex-stage .dd-card').forEach((c) => {
  const t = c.querySelector('.dd-card__title')?.textContent.trim();
  if (t && !c.hasAttribute('data-card')) c.setAttribute('data-card', t);
});
const toastTitles = () => [...document.querySelectorAll('.dd-toast__title')].map((t) => t.textContent);
const hash = () => location.hash;

test('a link card follows its href from a click anywhere on it', async ({ open, assert }) => {
  const page = await open('components/card');
  await page.get(tag);
  assert.equal(await page.get((s) => document.querySelector(s).tagName, card('dockey-ui')), 'A', 'the card is the link');
  await page.get((s) => document.querySelector(s).setAttribute('href', '#to-dockey'), card('dockey-ui'));
  await page.click(`${card('dockey-ui')} .dd-card__text`);
  assert.equal(await page.get(hash), '#to-dockey');
  await page.click(`${card('dockey-ui')} .dd-card__eyebrow`, { dx: 60 }); // empty space in the card
  assert.equal(await page.get(hash), '#to-dockey');
});

test('a stretched title link covers the whole card', async ({ open, assert }) => {
  const page = await open('components/card');
  await page.get(tag);
  const hit = (s, part) => { const r = document.querySelector(`${s} ${part}`).getBoundingClientRect(); return document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2)?.closest('a')?.className; };
  for (const part of ['.dd-card__text', '.dd-card__meta', '.dd-card__eyebrow']) {
    await page.get((s) => document.querySelector(s).scrollIntoView({ block: 'center' }), card('ai-focus'));
    assert.equal(await page.get(hit, card('ai-focus'), part), 'dd-card__stretch', `${part} hits the stretched link`);
  }
  await page.get((s) => document.querySelector(`${s} .dd-card__stretch`).setAttribute('href', '#to-ai-focus'), card('ai-focus'));
  await page.click(`${card('ai-focus')} .dd-card__foot`);
  assert.equal(await page.get(hash), '#to-ai-focus');
});

test('placeholder card links give feedback instead of doing nothing', async ({ open, assert }) => {
  const page = await open('components/card');
  await page.get(tag);
  await page.click(`${card('insomnia')} .dd-card__text`);
  await page.waitFor(() => document.querySelector('.dd-toast__title')?.textContent === 'Opening insomnia');
  assert.equal(await page.get(hash), '', 'the docs page did not jump');
});

test('a button inside a stretched-link card keeps its own click and does not follow the card link', async ({ open, assert }) => {
  const page = await open('components/card');
  await page.get(tag);
  const c = card('Replay failed invoices');
  await page.get((s) => document.querySelector(`${s} .dd-card__stretch`).setAttribute('href', '#to-replay'), c);
  const btn = `${c} button[aria-label="Save runbook"]`;
  assert.ok(await page.get((s) => { const b = document.querySelector(s); b.scrollIntoView({ block: 'center' }); const r = b.getBoundingClientRect(); return b.contains(document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2)); }, btn), 'the button is on top of the stretched link');
  await page.click(btn);
  await page.waitFor(() => [...document.querySelectorAll('.dd-toast__title')].some((t) => t.textContent === 'Runbook saved'));
  assert.equal(await page.get(hash), '', 'the card link was not followed');
  assert.ok(!(await page.get(toastTitles)).some((t) => t.startsWith('Opening')), 'no card-open feedback');
  await page.click(`${c} .dd-card__text`);
  assert.equal(await page.get(hash), '#to-replay', 'the rest of the card still follows the link');
});

test('keyboard: each link card is one tab stop with a visible focus ring', async ({ open, assert }) => {
  const page = await open('components/card');
  await page.get(tag);
  await page.focus(card('dockey-ui'));
  await page.press('Tab');
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), card('insomnia')), 'Tab goes card to card');
  await page.press('Tab');
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(`${s} .dd-card__stretch`), card('ai-focus')), 'then to the stretched link (one stop for the card)');
  assert.equal(await page.get((s) => getComputedStyle(document.querySelector(s)).outlineStyle, card('ai-focus')), 'solid', 'the card draws the ring');
  await page.press('Tab');
  assert.ok(await page.get((s) => !document.querySelector(s).contains(document.activeElement), card('ai-focus')), 'the next Tab leaves the card');
  await page.focus(`${card('Replay failed invoices')} .dd-card__stretch`);
  await page.press('Tab');
  assert.equal(await page.get(() => document.activeElement.getAttribute('aria-label')), 'Save runbook', 'the inner button is its own stop');
  await page.focus(card('Two moods, one system') + ' a.dd-card__link'); // a static card's own link
  await page.focus(`${card('ai-focus')} .dd-card__stretch`);
  assert.equal(await page.get((s) => getComputedStyle(document.querySelector(s)).outlineStyle, card('ai-focus')), 'solid');
  await page.press('Enter');
  await page.waitFor(() => document.querySelector('.dd-toast__title')?.textContent === 'Opening ai-focus');
});

test('hover lifts a link card and nudges its arrow; static cards stay put', async ({ open, assert }) => {
  const page = await open('components/card');
  await page.get(tag);
  const bg = (s) => getComputedStyle(document.querySelector(s)).backgroundColor;
  const rest = await page.get(bg, card('dockey-ui'));
  await page.hover(`${card('dockey-ui')} .dd-card__title`);
  await page.waitFor((s, r) => getComputedStyle(document.querySelector(s)).backgroundColor !== r, { args: [card('dockey-ui'), rest] });
  await page.waitFor((s) => getComputedStyle(document.querySelector(`${s} .dd-card__link .dd-icon`)).transform !== 'none', { args: [card('dockey-ui')] });
  const still = card('Two moods, one system');
  const r2 = await page.get(bg, still);
  await page.hover(`${still} .dd-card__text`);
  await page.sleep(250);
  assert.equal(await page.get(bg, still), r2, 'a static card does not lift');
});

test('375px: the grid is one column, a tap follows the card', async ({ open, assert }) => {
  const page = await open('components/card', { width: 375 });
  await page.get(tag);
  const cols = await page.get(() => getComputedStyle(document.querySelector('.ex-stage .dd-card-grid')).gridTemplateColumns.split(' ').length);
  assert.equal(cols, 1);
  assert.ok(await page.get(() => document.documentElement.scrollWidth <= innerWidth), 'no sideways scroll');
  await page.tap(`${card('leetnode')} .dd-card__text`);
  await page.waitFor(() => document.querySelector('.dd-toast__title')?.textContent === 'Opening leetnode');
});

test('dusk: hover lifts the card clear of the page', async ({ open, assert }) => {
  const page = await open('components/card', { theme: 'dusk' });
  await page.get(tag);
  const rest = await page.get((s) => getComputedStyle(document.querySelector(s)).backgroundColor, card('Purge a region'));
  await page.hover(card('Purge a region'));
  await page.waitFor((s, r) => getComputedStyle(document.querySelector(s)).backgroundColor !== r, { args: [card('Purge a region'), rest] });
});
