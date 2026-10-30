import { test } from './lib/test.mjs';

// The four pattern pages, driven end to end like a visitor would.

const toasts = (page) => page.get(() => [...document.querySelectorAll('.dd-toast')].map((t) => t.querySelector('.dd-toast__title')?.textContent.trim()));
const waitToast = (page, title) => page.waitFor((t) => [...document.querySelectorAll('.dd-toast__title')].some((el) => el.textContent.trim().startsWith(t)), { args: [title] });
const stubClipboard = (page) => page.evaluate(() => {
  window.__clip = [];
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: (t) => { window.__clip.push(t); return Promise.resolve(); } } });
});
// Select a field's text and type over it, like a person would.
const retype = async (page, sel, text) => { await page.focus(sel); await page.evaluate((s) => document.querySelector(s).select(), sel); await page.press('Backspace'); if (text) await page.type(text); };

/* ---------------- dashboard ---------------- */
const D = '.ex-stage .dd-pattern-dash';
const dashRows = (page) => page.get((d) => [...document.querySelectorAll(`${d} tbody tr:not(.dd-data-table__empty-row)`)].filter((r) => !r.hidden).map((r) => r.querySelector('[data-col="service"]').textContent.trim()), D);

test('dashboard: text filter and status chips narrow the services; empty state; Clear filters resets', async ({ open, assert }) => {
  const page = await open('patterns/dashboard');
  const count = () => page.text(`${D} [data-dd-data-table-count]`);
  assert.equal(await count(), '10 services');
  await page.click(`${D} [data-dd-data-table-search]`);
  await page.type('cache');
  assert.deepEqual(await dashRows(page), ['edge-cache']);
  assert.equal(await count(), '1 of 10 services');
  await page.press('Backspace', 'Backspace', 'Backspace', 'Backspace', 'Backspace');
  await page.click(`${D} [data-dd-data-table-filter="status=warn"]`);
  assert.equal(await page.attr(`${D} [data-dd-data-table-filter="status=warn"]`, 'aria-pressed'), 'true');
  assert.deepEqual(await dashRows(page), ['search-indexer', 'metrics-agg']);
  await page.click(`${D} [data-dd-data-table-filter="status=bad"]`);
  assert.deepEqual(await dashRows(page), ['search-indexer', 'notify-fanout', 'metrics-agg'], 'chips on one column add up');
  await page.click(`${D} [data-dd-data-table-search]`);
  await page.type('zzz');
  assert.ok(await page.visible(`${D} .dd-data-table__empty-row`), 'empty state');
  assert.equal(await page.text(`${D} [data-dd-data-table-query]`), '“zzz”');
  await page.click(`${D} [data-dd-data-table-reset]`);
  assert.equal((await dashRows(page)).length, 10);
  assert.equal(await page.get((d) => document.querySelector(`${d} [data-dd-data-table-search]`).value, D), '');
  assert.equal(await page.count(`${D} [data-dd-data-table-filter][aria-pressed="true"]`), 0);
});

test('dashboard: sorting cycles ascending → descending → original, blanks last', async ({ open, assert }) => {
  const page = await open('patterns/dashboard', { theme: 'dusk' });
  const original = await dashRows(page);
  const req = `${D} th[data-col="req"]`;
  await page.click(`${req} .dd-data-table__sort`);
  assert.equal(await page.attr(req, 'aria-sort'), 'ascending');
  let rows = await dashRows(page);
  assert.equal(rows[0], 'notify-fanout'); assert.equal(rows[9], 'edge-cache');
  await page.click(`${req} .dd-data-table__sort`);
  assert.equal(await page.attr(req, 'aria-sort'), 'descending');
  assert.equal((await dashRows(page))[0], 'edge-cache');
  await page.click(`${req} .dd-data-table__sort`);
  assert.equal(await page.attr(req, 'aria-sort'), 'none');
  assert.deepEqual(await dashRows(page), original);
  await page.click(`${D} th[data-col="err"] .dd-data-table__sort`);
  rows = await dashRows(page);
  assert.equal(rows[0], 'edge-cache', '0.00% first'); assert.equal(rows[9], 'notify-fanout', 'no data sorts last');
  assert.equal(await page.attr(req, 'aria-sort'), 'none', 'only one column sorts at a time');
});

test('dashboard: selection drives the bulk bar (shift-range, select all, clear) and bulk actions answer', async ({ open, assert }) => {
  const page = await open('patterns/dashboard');
  const box = (n) => `${D} tbody tr:nth-child(${n}) .dd-data-table__check`;
  const all = `${D} thead .dd-data-table__check`;
  const selected = () => page.text(`${D} [data-dd-data-table-selected]`);
  assert.equal(await page.visible(`${D} .dd-data-table__bulk`), false);
  await page.click(box(1));
  await page.click(box(3));
  assert.ok(await page.visible(`${D} .dd-data-table__bulk`));
  assert.equal(await selected(), '2');
  assert.ok(await page.get((s) => document.querySelector(s).indeterminate, all), 'header is indeterminate');
  const p = await page.get((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; }, box(6));
  await page.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: p.x, y: p.y, button: 'left', clickCount: 1, modifiers: 8 });
  await page.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: p.x, y: p.y, button: 'left', clickCount: 1, modifiers: 8 });
  await page.sleep(120);
  assert.equal(await selected(), '5', 'shift-click selects the range 3–6');
  assert.equal(await page.count(`${D} tbody tr.is-selected`), 5);
  await page.click(`${D} .dd-data-table__bulk [data-action="restart"]`);
  await waitToast(page, 'Restarting 5 services');
  await page.click(`${D} [data-dd-data-table-clear]`);
  assert.equal(await page.visible(`${D} .dd-data-table__bulk`), false);
  await page.click(all);
  assert.equal(await selected(), '10');
  await page.click(all);
  assert.equal(await page.visible(`${D} .dd-data-table__bulk`), false, 'unchecking the header clears it');
  // select-all only takes the rows the filter shows
  await page.click(`${D} [data-dd-data-table-search]`);
  await page.type('auth');
  await page.click(all);
  assert.equal(await selected(), '1');
});

test('dashboard: each row’s actions menu opens, works from the keyboard and answers', async ({ open, assert }) => {
  const page = await open('patterns/dashboard');
  const trig = `${D} [aria-label="Actions for search-indexer"]`;
  await page.click(trig);
  assert.equal(await page.attr(trig, 'aria-expanded'), 'true');
  assert.ok(await page.visible('#dash-row-menu'));
  assert.equal(await page.text('#dash-row-menu :focus'), 'View logs');
  await page.press('ArrowDown');
  await page.press('Enter');
  await waitToast(page, 'Restarting search-indexer');
  assert.equal(await page.visible('#dash-row-menu'), false);
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), trig), 'focus back on the row button');
  await page.click(`${D} [aria-label="Actions for edge-cache"]`);
  await page.click('#dash-row-menu [data-action="pause"]');
  await waitToast(page, 'Paused edge-cache');
  await page.click(`${D} .dd-page-header__actions .dd-btn--primary`);
  await waitToast(page, 'Deploy queued');
});

test('dashboard at 375: nothing spills sideways, the table scrolls in its own box, the nav slides in', async ({ open, assert }) => {
  const page = await open('patterns/dashboard', { width: 375, height: 800, theme: 'dusk' });
  assert.ok(await page.get(() => document.documentElement.scrollWidth <= innerWidth), 'no page-level horizontal scroll');
  assert.ok(await page.get((d) => { const s = document.querySelector(`${d} .dd-data-table__scroll`); return s.scrollWidth > s.clientWidth; }, D), 'the table scrolls inside');
  await page.tap('.ex-stage [data-dd-nav-open="#dash-nav"]');
  await page.waitFor(() => document.getElementById('dash-nav').classList.contains('is-mobile-open'));
  await page.press('Escape');
  assert.equal(await page.get(() => document.getElementById('dash-nav').classList.contains('is-mobile-open')), false);
});

/* ---------------- data explorer ---------------- */
const X = '.ex-stage .dd-pattern-explorer';
const ids = (page) => page.get((x) => [...document.querySelectorAll(`${x} .dd-data-table tbody tr:not(.dd-data-table__empty-row)`)].filter((r) => !r.hidden).map((r) => r.querySelector('[data-col="id"]').textContent.trim()), X);
const query = `${X} input[aria-label="Query filter"]`;
const chipBtn = (label) => `${X} [aria-label="Status"] .dd-chip:nth-child(${['Ready', 'Building', 'Failed', 'Rolled back', 'Superseded'].indexOf(label) + 1})`;

test('explorer: status chips and the query filter the results; bad queries are flagged', async ({ open, assert }) => {
  const page = await open('patterns/data-explorer');
  assert.equal((await ids(page)).length, 11, 'Superseded is off, so its row is out');
  await page.click(chipBtn('Failed'));
  assert.equal(await page.attr(chipBtn('Failed'), 'aria-pressed'), 'false');
  assert.equal((await ids(page)).length, 9);
  assert.equal(await page.text(`${X} .dd-pagination__range`), '1–9 of 9');
  await retype(page, query, '{ service: "auth-gateway" }');
  await page.press('Enter');
  assert.deepEqual(await ids(page), ['dpl_7Hq2xK9m']);
  await page.click(chipBtn('Superseded'));
  assert.deepEqual(await ids(page), ['dpl_7Hq2xK9m', 'dpl_9d04f7Hm']);
  await retype(page, query, '{ region: "mars-1" }');
  await page.click(`${X} .dd-pattern-explorer__query .dd-btn--primary`);
  assert.deepEqual(await ids(page), []);
  assert.ok(await page.visible(`${X} .dd-data-table__empty-row`));
  await retype(page, query, '{ service: "auth"');
  await page.press('Enter');
  assert.equal(await page.attr(query, 'aria-invalid'), 'true', 'unbalanced braces are flagged');
  await page.click(`${X} [data-dd-clear]`);
  assert.equal(await page.attr(query, 'aria-invalid'), null);
  assert.equal((await ids(page)).length, 10, 'clearing the query shows everything the chips allow');
  await retype(page, query, 'ledger');
  await page.press('Enter');
  assert.deepEqual(await ids(page), ['dpl_5e2c07Xo'], 'a bare word searches the documents');
});

test('explorer: sorting, and opening a row puts that document in the detail panel', async ({ open, assert }) => {
  const page = await open('patterns/data-explorer', { theme: 'dusk' });
  await page.click(`${X} th[data-col="at"] .dd-data-table__sort`);
  assert.equal((await ids(page))[0], 'dpl_5e2c07Xo', 'oldest first');
  await page.click(`${X} th[data-col="at"] .dd-data-table__sort`);
  assert.equal((await ids(page))[0], 'dpl_7Hq2xK9m', 'newest first');
  await page.click(`${X} tbody a[href="#"]:not([aria-current])`); // the first row that isn't open
  const opened = await page.get((x) => document.querySelector(`${x} tbody tr.is-selected [data-col="id"]`).textContent.trim(), X);
  assert.equal(opened, 'dpl_71be09Qa');
  assert.equal(await page.count(`${X} tbody tr.is-selected`), 1);
  assert.equal(await page.attr(`${X} tbody tr.is-selected a`, 'aria-current'), 'true');
  assert.equal(await page.text('#explorer-doc-title'), 'dpl_71be09Qa');
  assert.equal(await page.text(`${X} .dd-pattern-explorer__detail .dd-page-header__eyebrow`), 'Document · 2 of 48,214');
  assert.equal(await page.attr(`${X} [aria-label="Copy _id"]`, 'data-dd-copy'), 'dpl_71be09Qa');
  assert.ok((await page.text(`${X} .dd-description-list`)).includes('0 of 3 ready'));
  assert.ok((await page.text(`${X} .dd-pattern-explorer__detail .dd-json-viewer [data-path="$._id"]`)).includes('dpl_71be09Qa'), 'the JSON follows');
  assert.equal(await page.get(() => location.hash), '', 'the _id link doesn’t jump');
});

test('explorer: the JSON viewer expands by click and keyboard; View → JSON shows the results as JSON', async ({ open, assert }) => {
  const page = await open('patterns/data-explorer');
  const J = `${X} .dd-pattern-explorer__detail .dd-json-viewer`;
  const commit = `${J} [data-path="$.commit"]`;
  assert.equal(await page.attr(commit, 'aria-expanded'), 'false');
  await page.click(`${commit} > .dd-json-viewer__row .dd-json-viewer__toggle`);
  assert.equal(await page.attr(commit, 'aria-expanded'), 'true');
  assert.equal(await page.text(`${J} .dd-json-viewer__path-value`), '$.commit');
  await page.press('ArrowDown');
  assert.equal(await page.text(`${J} .dd-json-viewer__path-value`), '$.commit.sha');
  await page.press('ArrowLeft');
  assert.equal(await page.text(`${J} .dd-json-viewer__path-value`), '$.commit', '← goes to the parent');
  await page.press('ArrowLeft');
  assert.equal(await page.attr(commit, 'aria-expanded'), 'false', '← again collapses');
  await page.click(`${J} [data-dd-json-viewer-expand]`);
  assert.equal(await page.count(`${J} [aria-expanded="false"]`), 0);
  await page.click(`${J} [data-dd-json-viewer-collapse]`);
  assert.equal(await page.count(`${J} [aria-expanded="true"]`), 1, 'only the root stays open');
  // the result view
  const json = `${X} [aria-label="View"] [role="radio"]:nth-child(2)`;
  await page.click(json);
  assert.equal(await page.attr(json, 'aria-checked'), 'true');
  assert.equal(await page.visible(`${X} .dd-data-table`), false);
  assert.ok(await page.visible(`${X} .dd-pattern-explorer__split > .dd-json-viewer`));
  assert.equal(await page.text(`${X} .dd-pattern-explorer__split > .dd-json-viewer .dd-json-viewer__count`), '11 items');
  await page.click(chipBtn('Ready'));
  assert.equal(await page.text(`${X} .dd-pattern-explorer__split > .dd-json-viewer .dd-json-viewer__count`), '4 items', 'filters apply to the JSON view');
  await page.press('ArrowLeft');
  await page.click(`${X} [aria-label="View"] [role="radio"]:nth-child(1)`);
  assert.ok(await page.visible(`${X} .dd-data-table`));
  assert.equal(await page.visible(`${X} .dd-pattern-explorer__split > .dd-json-viewer`), false);
});

test('explorer: tabs switch the view (click, arrows, Home/End) and the logs filter by level', async ({ open, assert }) => {
  const page = await open('patterns/data-explorer');
  const tab = (n) => `${X} [role="tab"]:nth-child(${n})`;
  await page.evaluate((x) => { window.__tabs = []; document.querySelector(x).addEventListener('dd:tabchange', (e) => window.__tabs.push(e.detail.panel?.id)); }, X);
  await page.click(tab(2));
  assert.equal(await page.attr(tab(2), 'aria-selected'), 'true');
  assert.ok(await page.visible('#explorer-indexes'));
  assert.equal(await page.visible('#explorer-docs'), false);
  await page.press('ArrowRight');
  assert.equal(await page.attr(tab(3), 'aria-selected'), 'true');
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), tab(3)));
  await page.press('Home');
  assert.equal(await page.attr(tab(1), 'aria-selected'), 'true');
  await page.press('End');
  assert.ok(await page.visible('#explorer-logs'));
  assert.deepEqual(await page.get(() => window.__tabs), ['explorer-indexes', 'explorer-logs', 'explorer-docs', 'explorer-logs']);
  const lines = () => page.get(() => [...document.querySelectorAll('#explorer-logs .dd-log-viewer__line')].filter((l) => l.getClientRects().length).length);
  assert.equal(await lines(), 10);
  await page.click('#explorer-logs [data-dd-log-viewer-level="debug"]');
  assert.equal(await page.attr('#explorer-logs [data-dd-log-viewer-level="debug"]', 'aria-pressed'), 'false');
  assert.equal(await lines(), 8);
  await page.click('#explorer-logs [data-dd-log-viewer-search]');
  await page.type('WriteConflict');
  assert.equal(await lines(), 1);
});

/* ---------------- settings ---------------- */
const S = '.ex-stage .dd-pattern-settings';
const stab = (n) => `${S} [role="tab"]:nth-child(${n})`;

test('settings: vertical tabs switch sections by click and ↑ ↓ Home End', async ({ open, assert }) => {
  const page = await open('patterns/settings');
  assert.ok(await page.visible('#set-profile'));
  await page.click(stab(2));
  assert.ok(await page.visible('#set-notifications'));
  assert.equal(await page.visible('#set-profile'), false);
  await page.press('ArrowDown');
  assert.equal(await page.attr(stab(3), 'aria-selected'), 'true');
  assert.ok(await page.visible('#set-keys'));
  await page.press('ArrowRight');
  assert.equal(await page.attr(stab(3), 'aria-selected'), 'true', '→ does nothing in a vertical list');
  await page.press('ArrowUp', 'ArrowUp');
  assert.equal(await page.attr(stab(1), 'aria-selected'), 'true');
  await page.press('ArrowUp');
  assert.equal(await page.attr(stab(4), 'aria-selected'), 'true', 'wraps to the end');
  await page.press('Home');
  assert.ok(await page.visible('#set-profile'));
  assert.equal(await page.count(`${S} [role="tab"][tabindex="0"]`), 1, 'roving tabindex');
});

test('settings: Save validates the profile, saves, and Discard returns to the saved values', async ({ open, assert }) => {
  const page = await open('patterns/settings', { theme: 'dusk' });
  await retype(page, '#set-name', '');
  await retype(page, '#set-email', 'andy@');
  await page.click(`${S} #set-profile [type="submit"]`);
  assert.equal(await page.attr('#set-name', 'aria-invalid'), 'true');
  assert.equal(await page.attr('#set-email', 'aria-invalid'), 'true');
  assert.equal(await page.count(`${S} #set-profile .dd-field__error`), 2);
  assert.ok((await page.text('#set-email-error')).includes('email address'));
  assert.equal(await page.attr('#set-name', 'aria-describedby'), 'set-name-error');
  assert.equal(await page.active(), '#set-name', 'focus goes to the first problem');
  assert.equal(await toasts(page).then((t) => t.length), 0, 'nothing saved');
  await page.type('Andy N.');
  assert.equal(await page.attr('#set-name', 'aria-invalid'), null, 'fixing it clears the error as you type');
  await retype(page, '#set-email', 'andy@cxkw.dev');
  assert.equal(await page.count(`${S} #set-profile .dd-field__error`), 0);
  await page.focus('#set-bio');
  await page.press('End');
  await page.type(' Also dawn & dusk.');
  assert.equal(await page.text(`${S} .dd-field__counter`), '98 / 160', 'the counter follows');
  await page.click(`${S} #set-profile [type="submit"]`);
  await waitToast(page, 'Profile saved');
  assert.ok((await page.text(`${S} .dd-form__meta`)).startsWith('Saved today'));
  await retype(page, '#set-name', 'Someone else');
  await page.click(`${S} #set-profile [type="reset"]`);
  await page.sleep(50);
  assert.equal(await page.get(() => document.getElementById('set-name').value), 'Andy N.', 'Discard goes back to what was saved');
  assert.equal(await page.text(`${S} .dd-field__counter`), '98 / 160');
});

test('settings: Delete account asks first — Esc and backdrop keep it, Delete confirms', async ({ open, assert }) => {
  const page = await open('patterns/settings');
  await page.click(stab(4));
  const btn = `${S} [data-dd-dialog-open="#set-delete-dialog"]`;
  const isOpen = () => page.get(() => document.getElementById('set-delete-dialog').open);
  await page.click(btn);
  assert.ok(await isOpen());
  assert.equal(await page.text(':focus'), 'Keep my account', 'the safe choice has focus');
  await page.press('Escape');
  await page.waitFor(() => !document.getElementById('set-delete-dialog').open);
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), btn), 'focus returns');
  await page.click(btn);
  const { w, h } = await page.get(() => ({ w: innerWidth, h: innerHeight }));
  await page.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: 20, y: h - 20, button: 'left', clickCount: 1 });
  await page.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: 20, y: h - 20, button: 'left', clickCount: 1 });
  await page.waitFor(() => !document.getElementById('set-delete-dialog').open);
  assert.ok(w > 0);
  assert.equal((await toasts(page)).length, 0, 'keeping the account says nothing');
  await page.click(btn);
  await page.click('#set-delete-dialog .dd-btn--danger');
  await page.waitFor(() => !document.getElementById('set-delete-dialog').open);
  assert.equal(await page.get(() => document.getElementById('set-delete-dialog').returnValue), 'delete');
  await waitToast(page, 'Account scheduled for deletion');
});

test('settings: reveal and copy the new key, revoke with undo, switches confirm', async ({ open, assert }) => {
  const page = await open('patterns/settings');
  await stubClipboard(page);
  await page.click(stab(3));
  const reveal = `${S} [data-dd-code-reveal]`;
  const value = `${S} [data-dd-code-secret]`;
  assert.ok((await page.text(value)).includes('••••'));
  await page.click(reveal);
  assert.equal(await page.attr(reveal, 'aria-pressed'), 'true');
  assert.equal(await page.attr(reveal, 'aria-label'), 'Hide key');
  assert.equal(await page.text(value), 'dd_live_51Hc7aQ2xK9mV0dRb4Lp8TzY3f9a');
  await page.click(reveal);
  assert.ok((await page.text(value)).includes('••••'), 'masked again');
  await page.click(`${S} [aria-label="Copy key"]`);
  assert.deepEqual(await page.get(() => window.__clip), ['dd_live_51Hc7aQ2xK9mV0dRb4Lp8TzY3f9a'], 'copy always copies the real key');
  const revoke = `${S} [aria-label="Revoke billing-worker"]`;
  await page.click(revoke);
  assert.equal(await page.get((s) => document.querySelector(s).closest('tr').querySelector('.dd-table__status').textContent, revoke), 'Revoked');
  assert.ok(await page.get((s) => document.querySelector(s).disabled, revoke));
  await waitToast(page, 'Revoked billing-worker');
  await page.click('.dd-toast .dd-toast__action');
  assert.equal(await page.get((s) => document.querySelector(s).closest('tr').querySelector('.dd-table__status').textContent, revoke), 'Expiring', 'undo puts it back');
  assert.equal(await page.get((s) => document.querySelector(s).disabled, revoke), false);
  await page.click(stab(2));
  const sw = `${S} .dd-switch:nth-of-type(3) .dd-switch__input`;
  assert.equal(await page.get((s) => document.querySelector(s).checked, sw), false);
  await page.click(`${S} .dd-switch:nth-of-type(3)`);
  assert.equal(await page.get((s) => document.querySelector(s).checked, sw), true);
  await waitToast(page, 'Spend alerts on');
});

/* ---------------- landing ---------------- */
const L = '.ex-stage .dd-pattern-landing';

test('landing at 375: the links fold into a menu that opens, moves by keys, navigates and closes', async ({ open, assert }) => {
  const page = await open('patterns/landing', { width: 375, height: 760 });
  assert.equal(await page.visible(`${L} .dd-top-bar__links`), false);
  const btn = `${L} [data-dd-menu="landing-menu"]`;
  assert.ok(await page.visible(btn));
  await page.tap(btn);
  assert.equal(await page.attr(btn, 'aria-expanded'), 'true');
  assert.ok(await page.visible('#landing-menu'));
  assert.equal(await page.text(':focus'), 'Work');
  await page.press('ArrowDown');
  assert.equal(await page.text(':focus'), 'Notes');
  await page.press('Escape');
  assert.equal(await page.visible('#landing-menu'), false);
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), btn), 'focus back on the button');
  await page.tap(btn);
  await page.tap('#landing-menu a[href="#landing-contact"]');
  assert.equal(await page.visible('#landing-menu'), false);
  assert.equal(await page.attr(btn, 'aria-expanded'), 'false');
  await page.waitFor(() => location.hash === '#landing-contact' && Math.abs(document.getElementById('landing-contact').getBoundingClientRect().top) < 120);
  assert.ok(await page.get(() => document.documentElement.scrollWidth <= innerWidth), 'nothing spills sideways at 375');
});

test('landing: the contact form shows what is missing, clears as you fix it, then sends', async ({ open, assert }) => {
  const page = await open('patterns/landing', { theme: 'dusk' });
  const send = `${L} form [type="submit"]`;
  await page.click(send);
  assert.deepEqual(await page.get((l) => [...document.querySelectorAll(`${l} form [aria-invalid="true"]`)].map((c) => c.id), L), ['landing-name', 'landing-email', 'landing-msg']);
  assert.equal(await page.count(`${L} form .dd-field__error`), 3);
  assert.equal(await page.active(), '#landing-name');
  assert.equal(await page.get(() => getComputedStyle(document.querySelector('#landing-name-error')).color) !== '', true);
  await page.type('Mira Kh.');
  assert.equal(await page.attr('#landing-name', 'aria-invalid'), null);
  await page.focus('#landing-email');
  await page.type('mira@');
  assert.ok((await page.text('#landing-email-error')).includes('doesn’t look like an email'), 'the email message changes as you type');
  await page.type('studio.dev');
  assert.equal(await page.attr('#landing-email', 'aria-invalid'), null);
  await page.focus('#landing-msg');
  await page.type('A design system for a small studio, shipping in March.');
  await page.click(send);
  await waitToast(page, 'Message sent');
  assert.ok((await page.text('.dd-toast .dd-toast__text')).includes('Thanks, Mira'));
  assert.equal(await page.get(() => document.getElementById('landing-name').value), '', 'the form resets after sending');
  assert.equal(await page.count(`${L} form .dd-field__error`), 0);
});

test('landing: copy the email, and a whole project card is its link', async ({ open, assert }) => {
  const page = await open('patterns/landing');
  await stubClipboard(page);
  await page.click(`${L} [aria-label="Copy email"]`);
  assert.deepEqual(await page.get(() => window.__clip), ['hello@cxkw.dev']);
  const hit = await page.get((l) => {
    const text = document.querySelector(`${l} .dd-card .dd-card__text`);
    text.scrollIntoView({ block: 'center' });
    const r = text.getBoundingClientRect();
    return document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2)?.className;
  }, L);
  assert.equal(hit, 'dd-card__stretch', 'a click on the card body lands on its link');
});
