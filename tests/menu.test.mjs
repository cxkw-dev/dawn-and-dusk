import { test } from './lib/test.mjs';

const trigger = '[data-dd-menu="mn-project"][aria-controls]';
const isOpen = (id) => (page) => page.get((i) => !document.getElementById(i).hidden, id);
const focused = (page) => page.get(() => (document.activeElement.querySelector('.dd-menu__body')?.firstChild?.textContent || document.activeElement.textContent).trim());
const rightClick = async (page, sel, dx = 30, dy = 30) => {
  const c = await page.get((s) => { const el = document.querySelector(s); el.scrollIntoView({ block: 'center' }); const r = el.getBoundingClientRect(); return { x: r.left, y: r.top }; }, sel);
  const at = { x: c.x + dx, y: c.y + dy };
  await page.send('Input.dispatchMouseEvent', { type: 'mouseMoved', ...at, button: 'none' });
  await page.send('Input.dispatchMouseEvent', { type: 'mousePressed', ...at, button: 'right', clickCount: 1 });
  await page.send('Input.dispatchMouseEvent', { type: 'mouseReleased', ...at, button: 'right', clickCount: 1 });
  await page.sleep(150);
  return at;
};

test('opens on click, moves focus in, closes on Esc and returns focus', async ({ open, assert }) => {
  const page = await open('components/menu');
  await page.click(trigger);
  assert.equal(await page.attr(trigger, 'aria-expanded'), 'true');
  assert.ok(await page.visible('#mn-project'), 'menu is visible');
  assert.ok(await page.get(() => document.getElementById('mn-project').contains(document.activeElement)), 'focus moved into the menu');
  await page.press('Escape');
  assert.equal(await page.attr(trigger, 'aria-expanded'), 'false');
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), trigger), 'focus returned to the trigger');
});

test('arrow keys move between items in dusk too', async ({ open, assert }) => {
  const page = await open('components/menu', { theme: 'dusk' });
  await page.click(trigger);
  const first = await page.text(':focus');
  await page.press('ArrowDown');
  assert.notEqual(await page.text(':focus'), first);
  // The highlighted row is one tone deeper than the panel.
  const [row, panel] = await page.get(() => [getComputedStyle(document.activeElement).backgroundColor, getComputedStyle(document.getElementById('mn-project')).backgroundColor]);
  assert.notEqual(row, panel, 'focused row has its own tone');
});

test('trigger keys: ↓ opens at the first item, ↑ at the last; Home/End, wrap and disabled items skipped', async ({ open, assert }) => {
  const page = await open('components/menu');
  await page.focus(trigger);
  await page.press('ArrowDown');
  assert.ok(await isOpen('mn-project')(page));
  assert.equal(await focused(page), 'Open');
  await page.press('Escape');
  await page.press('ArrowUp');
  assert.equal(await focused(page), 'Delete project');
  await page.press('ArrowDown');
  assert.equal(await focused(page), 'Open', 'wraps from the last item to the first');
  await page.press('ArrowUp');
  assert.equal(await focused(page), 'Delete project', 'wraps from the first item to the last');
  await page.press('ArrowUp');
  assert.equal(await focused(page), 'Show dates', 'skips the disabled “Present” item');
  await page.press('Home');
  assert.equal(await focused(page), 'Open');
  await page.press('End');
  assert.equal(await focused(page), 'Delete project');
  // Enter and Space on the trigger open at the first item too.
  await page.press('Escape');
  await page.press('Enter');
  assert.equal(await focused(page), 'Open');
  await page.press('Escape');
  await page.press(' ');
  assert.equal(await focused(page), 'Open');
});

test('typeahead jumps to the next item starting with the letter', async ({ open, assert }) => {
  const page = await open('components/menu');
  await page.click(trigger);
  await page.press('d');
  assert.equal(await focused(page), 'Duplicate');
  await page.sleep(650);
  await page.press('d');
  assert.equal(await focused(page), 'Delete project', 'the same letter again moves on to the next match');
  await page.sleep(650);
  await page.press('s', 'h', 'o');
  assert.equal(await focused(page), 'Show dates', 'several letters typed quickly match a prefix');
  await page.sleep(650);
  await page.press('p');
  assert.equal(await focused(page), 'Pin to sidebar', 'disabled “Present” is not a match');
});

test('submenu: → opens it, ← closes it, Esc closes one level, an item runs and closes everything; hover opens it', async ({ open, assert }) => {
  const page = await open('components/menu');
  await page.click(trigger);
  await page.press('s');
  assert.equal(await focused(page), 'Share');
  assert.equal(await page.attr('[data-dd-menu="mn-share"]', 'aria-expanded'), 'false');
  await page.press('ArrowRight');
  assert.ok(await isOpen('mn-share')(page), 'submenu opened');
  assert.equal(await page.attr('[data-dd-menu="mn-share"]', 'aria-expanded'), 'true');
  assert.equal(await focused(page), 'Copy link');
  // It sits beside its item, not over it.
  const [item, sub] = await page.get(() => [document.querySelector('[data-dd-menu="mn-share"]').getBoundingClientRect().toJSON(), document.getElementById('mn-share').getBoundingClientRect().toJSON()]);
  assert.ok(sub.left >= item.right - 4 || sub.right <= item.left + 4, 'submenu opens to the side');
  await page.press('ArrowLeft');
  assert.ok(!(await isOpen('mn-share')(page)), '← closes the submenu');
  assert.ok(await isOpen('mn-project')(page), 'parent stays open');
  assert.equal(await focused(page), 'Share', 'focus returns to the parent item');
  await page.press('Enter');
  assert.ok(await isOpen('mn-share')(page), 'Enter opens the submenu');
  await page.press('Escape');
  assert.ok(!(await isOpen('mn-share')(page)) && (await isOpen('mn-project')(page)), 'Esc closes only the submenu');
  assert.equal(await focused(page), 'Share');
  await page.press('ArrowRight', 'ArrowDown', 'Enter');
  assert.ok(!(await isOpen('mn-share')(page)) && !(await isOpen('mn-project')(page)), 'running an item closes every menu');
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), trigger), 'focus back on the root trigger');
  // Hover opens a submenu after a pause and hovering a sibling closes it.
  await page.click(trigger);
  await page.hover('[data-dd-menu="mn-share"]');
  await page.waitFor(() => !document.getElementById('mn-share').hidden);
  assert.equal(await focused(page), 'Share', 'hover moves focus to the item');
  await page.hover('#mn-project .dd-menu__item:first-of-type');
  await page.waitFor(() => document.getElementById('mn-share').hidden);
  await page.click('[data-dd-menu="mn-share"]');
  assert.ok(await isOpen('mn-share')(page), 'click opens the submenu too');
});

test('checked items: radios check one per group, checkboxes toggle, the menu stays open; account menu Theme submenu', async ({ open, assert }) => {
  const page = await open('components/menu');
  const t = '[data-dd-menu="mn-logview"]';
  const radios = '#mn-logview [role="menuitemradio"]';
  const checked = () => page.get((s) => [...document.querySelectorAll(s)].map((r) => r.getAttribute('aria-checked')).join(','), radios);
  await page.click(t);
  assert.equal(await checked(), 'true,false,false,false');
  await page.click(`${radios}:nth-of-type(3)`);
  assert.equal(await checked(), 'false,false,true,false', 'clicked radio checked, others cleared');
  assert.ok(await isOpen('mn-logview')(page), 'menu stays open after checking');
  const box = '#mn-logview [role="menuitemcheckbox"]:nth-of-type(2)';
  assert.equal(await page.attr(box, 'aria-checked'), 'false');
  await page.click(box);
  assert.equal(await page.attr(box, 'aria-checked'), 'true');
  // Keyboard: Space toggles the focused checkbox item, Enter checks a radio.
  await page.press(' ');
  assert.equal(await page.attr(box, 'aria-checked'), 'false');
  await page.press('Home', 'ArrowDown', 'Enter');
  assert.equal(await checked(), 'false,true,false,false');
  assert.ok(await isOpen('mn-logview')(page));
  // Checked items read semibold with a visible check; unchecked ones hide it.
  const [w, on, off] = await page.get(() => {
    const items = document.querySelectorAll('#mn-logview [role="menuitemradio"]');
    return [getComputedStyle(items[1].querySelector('.dd-menu__body')).fontWeight, getComputedStyle(items[1].querySelector('.dd-menu__check')).visibility + getComputedStyle(items[1].querySelector('.dd-menu__check')).opacity, getComputedStyle(items[0].querySelector('.dd-menu__check')).visibility + getComputedStyle(items[0].querySelector('.dd-menu__check')).opacity];
  });
  assert.ok(Number(w) >= 600, 'checked label is semibold');
  assert.notEqual(on, off, 'check shows only on the checked item');
  // The live account menu: icons, a header and a Theme submenu of radio items.
  const acct = '[data-dd-menu="mn-account"]';
  await page.press('Escape');
  await page.click(acct);
  assert.ok(await isOpen('mn-account')(page));
  assert.ok(await page.exists('#mn-account .dd-menu__header'));
  await page.press('t', 'h', 'ArrowRight');
  assert.ok(await isOpen('mn-theme')(page));
  const themeRadios = '#mn-theme [role="menuitemradio"]';
  await page.press('ArrowDown', ' ');
  assert.equal(await page.get((s) => [...document.querySelectorAll(s)].map((r) => r.getAttribute('aria-checked')).join(','), themeRadios), 'false,true,false');
});

test('outside click and Tab close; one root menu at a time; rapid clicks stay consistent', async ({ open, assert }) => {
  const page = await open('components/menu');
  await page.click(trigger);
  await page.click('.doc-head h1');
  assert.ok(!(await isOpen('mn-project')(page)), 'outside click closes');
  assert.equal(await page.attr(trigger, 'aria-expanded'), 'false');
  await page.click(trigger);
  // (Tab away then Enter on the next trigger; a pointer would land on the open menu that floats over it.)
  await page.focus('[data-dd-menu="mn-logview"]');
  await page.press('Enter');
  assert.ok(!(await isOpen('mn-project')(page)), 'opening another menu closes the first');
  assert.ok(await isOpen('mn-logview')(page));
  await page.press('Tab');
  assert.ok(!(await isOpen('mn-logview')(page)), 'Tab closes');
  assert.equal(await page.count('.dd-menu.is-floating'), 0, 'nothing left floating');
  // Rapid repeat clicks on a trigger leave it consistent.
  for (let k = 0; k < 5; k++) await page.click(trigger);
  assert.ok(await isOpen('mn-project')(page), 'odd number of clicks: open');
  assert.equal(await page.attr(trigger, 'aria-expanded'), 'true');
  await page.click(trigger);
  assert.ok(!(await isOpen('mn-project')(page)));
  assert.equal(await page.attr(trigger, 'aria-expanded'), 'false');
  assert.equal(await page.count('.dd-menu.is-floating'), 0);
});

test('one menu shared by every row: another row’s button moves it there instead of closing it', async ({ open, assert }) => {
  const page = await open('components/menu');
  const row = (n) => `[data-dd-menu="mn-row"][aria-label^="Actions for ${n}"]`;
  const settle = () => page.get(() => Promise.all(document.getElementById('mn-row').getAnimations().map((a) => a.finished)).then(() => true));
  await page.click(row('auth-gateway'));
  await settle();
  const top1 = await page.get(() => document.getElementById('mn-row').getBoundingClientRect().top);
  // (The open menu floats over the next row's button, so reach it by keyboard as well as by pointer.)
  await page.focus(row('billing-worker'));
  await page.press('Enter');
  assert.ok(await isOpen('mn-row')(page), 'still open after clicking another row’s button');
  assert.equal(await page.attr(row('auth-gateway'), 'aria-expanded'), 'false');
  assert.equal(await page.attr(row('billing-worker'), 'aria-expanded'), 'true');
  await settle();
  const [top2, tb] = await page.get((s) => [document.getElementById('mn-row').getBoundingClientRect().top, document.querySelector(s).getBoundingClientRect().bottom], row('billing-worker'));
  assert.ok(top2 > top1 && top2 >= tb, 'menu moved under the second row');
  // Pointer: open on the last row, then click the first row's button (above the menu, so not covered).
  await page.press('Escape');
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), row('billing-worker')), 'Esc returns focus to the row that opened it');
  await page.click(row('edge-cache'));
  await page.click(row('auth-gateway'));
  assert.ok(await isOpen('mn-row')(page), 'pointer clicks move it too');
  assert.equal(await page.attr(row('auth-gateway'), 'aria-expanded'), 'true');
  assert.equal(await page.attr(row('edge-cache'), 'aria-expanded'), 'false');
  // The same trigger again closes it; ↓ on another row's button also moves it.
  await page.click(row('auth-gateway'));
  assert.ok(!(await isOpen('mn-row')(page)));
  await page.click(row('auth-gateway'));
  await page.focus(row('edge-cache'));
  await page.press('ArrowDown');
  assert.equal(await page.attr(row('edge-cache'), 'aria-expanded'), 'true');
  assert.equal(await focused(page), 'View logs');
  // Placement bottom-end lines the right edges up; “Promote to” opens its submenu.
  const t = '[data-dd-menu="mn-row"]';
  await page.press('Escape');
  await page.click(t);
  await page.get(() => Promise.all(document.getElementById('mn-row').getAnimations().map((a) => a.finished)).then(() => true));
  const [tr, m] = await page.get((s) => [document.querySelector(s).getBoundingClientRect().toJSON(), document.getElementById('mn-row').getBoundingClientRect().toJSON()], t);
  assert.ok(Math.abs(tr.right - m.right) <= 1, `right edges line up (${tr.right} vs ${m.right})`);
  assert.ok(m.top >= tr.bottom, 'menu sits below the trigger');
  await page.press('p', 'ArrowRight');
  assert.ok(await isOpen('mn-row-promote')(page));
  assert.equal(await focused(page), 'staging');
});

test('context menu: right-click opens at the pointer, Esc returns focus to the area; Shift F10 and the Menu key open it', async ({ open, assert }) => {
  const page = await open('components/menu');
  const area = '[data-dd-contextmenu="mn-ctx"]';
  const at = await rightClick(page, area);
  assert.ok(await isOpen('mn-ctx')(page), 'right-click opens');
  await page.get(() => Promise.all(document.getElementById('mn-ctx').getAnimations().map((a) => a.finished)).then(() => true));
  const r = await page.get(() => document.getElementById('mn-ctx').getBoundingClientRect().toJSON());
  assert.ok(Math.abs(r.left - at.x) <= 2 && Math.abs(r.top - at.y) <= 2, 'opens at the pointer');
  assert.equal(await focused(page), 'Open in log viewer');
  await page.press('Escape');
  assert.ok(!(await isOpen('mn-ctx')(page)));
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), area), 'focus returned to the area');
  // Keyboard: Shift F10 (handled by the behaviour, macOS browsers don't send contextmenu for it) and the Menu key.
  await page.press({ key: 'F10', shift: true });
  assert.ok(await isOpen('mn-ctx')(page), 'Shift F10 opens');
  assert.equal(await focused(page), 'Open in log viewer');
  await page.press('Escape');
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), area));
  await page.send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: 'ContextMenu', code: 'ContextMenu', windowsVirtualKeyCode: 93 });
  await page.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'ContextMenu', code: 'ContextMenu', windowsVirtualKeyCode: 93 });
  await page.waitFor(() => !document.getElementById('mn-ctx').hidden);
  // A second right-click elsewhere moves it; Esc still returns focus to the area, not to a hidden item.
  await rightClick(page, area, 60, 50);
  assert.ok(await isOpen('mn-ctx')(page));
  await page.press('Escape');
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), area), 'focus returned to the area after re-opening');
  // Running an item closes it; the demo answers with a toast.
  await rightClick(page, area);
  await page.click('#mn-ctx .dd-menu__item:nth-of-type(2)');
  assert.ok(!(await isOpen('mn-ctx')(page)));
  await page.waitFor(() => !!document.querySelector('.dd-toast'));
});

test('touch at 375px: tap opens, a slow tap on a submenu item opens it (and keeps it open), tapping an item closes', async ({ open, assert }) => {
  const page = await open('components/menu', { width: 375 });
  await page.tap(trigger);
  assert.ok(await isOpen('mn-project')(page), 'tap opens');
  const m = await page.get(() => document.getElementById('mn-project').getBoundingClientRect().toJSON());
  assert.ok(m.left >= 0 && m.right <= 375, 'menu fits the viewport');
  // A finger held a little longer than the hover delay must not open then immediately close the submenu.
  const p = await page.get(() => { const r = document.querySelector('[data-dd-menu="mn-share"]').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
  await page.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [p] });
  await page.sleep(260);
  await page.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await page.sleep(250);
  assert.ok(await isOpen('mn-share')(page), 'submenu open after a slow tap');
  const [s, it] = await page.get(() => [document.getElementById('mn-share').getBoundingClientRect().toJSON(), document.querySelector('[data-dd-menu="mn-share"]').getBoundingClientRect().toJSON()]);
  assert.ok(s.left >= 0 && s.right <= 375, 'submenu fits the viewport');
  assert.ok(s.top >= it.bottom - 4 || s.bottom <= it.top + 4, 'submenu does not cover its item on a phone');
  await page.tap('#mn-share .dd-menu__item');
  assert.ok(!(await isOpen('mn-share')(page)) && !(await isOpen('mn-project')(page)), 'tapping an item closes the menus');
  await page.tap(trigger);
  await page.tap('.doc-head h1');
  assert.ok(!(await isOpen('mn-project')(page)), 'tapping outside closes');
});

test('a shared menu says which trigger opened it: dd:menuopen / dd:menuclose, menu.ddTrigger, dd.menu.open / close', async ({ open, assert }) => {
  const page = await open('components/menu');
  const row = (n) => `[data-dd-menu="mn-row"][aria-label^="Actions for ${n}"]`;
  await page.get(() => {
    window.__mev = [];
    for (const t of ['dd:menuopen', 'dd:menuclose']) document.addEventListener(t, (e) => window.__mev.push(`${t.slice(3)} ${e.target.id} ${e.detail.trigger?.getAttribute('aria-label') ?? e.detail.trigger?.tagName ?? '-'}`));
  });
  const events = () => page.get(() => window.__mev.splice(0));
  const trig = () => page.get(() => document.getElementById('mn-row').ddTrigger?.getAttribute('aria-label') ?? null);
  await page.click(row('auth-gateway'));
  assert.deepEqual(await events(), ['menuopen mn-row Actions for auth-gateway']);
  assert.equal(await trig(), 'Actions for auth-gateway');
  assert.equal(await page.text('#mn-row [data-row-name]'), 'auth-gateway', 'the docs example reads the row from the event');
  // Moving to another row: close for the old trigger, then open for the new one.
  await page.focus(row('billing-worker'));
  await page.press('Enter');
  assert.deepEqual(await events(), ['menuclose mn-row Actions for auth-gateway', 'menuopen mn-row Actions for billing-worker']);
  assert.equal(await page.text('#mn-row [data-row-name]'), 'billing-worker');
  // An item runs, the menu closes, and the trigger is still known.
  await page.click('#mn-row [data-action="Rolling back"]');
  assert.ok(!(await isOpen('mn-row')(page)));
  assert.deepEqual(await events(), ['menuclose mn-row Actions for billing-worker']);
  assert.equal(await trig(), 'Actions for billing-worker', 'ddTrigger survives the close');
  await page.waitFor(() => [...document.querySelectorAll('.dd-toast__title')].some((t) => t.textContent === 'Rolling back billing-worker'));

  // From script: open under a given trigger (by id), close by '#id'; focus goes in, then back to the trigger.
  assert.equal(await page.get(() => [typeof dd.menu.open, typeof dd.menu.close, typeof dd.menu.trigger].join()), 'function,function,function');
  await page.get(() => dd.menu.open('mn-row', document.querySelector('[aria-label="Actions for edge-cache"]')));
  assert.ok(await isOpen('mn-row')(page));
  assert.equal(await page.attr(row('edge-cache'), 'aria-expanded'), 'true');
  assert.equal(await focused(page), 'View logs');
  assert.equal(await page.get(() => dd.menu.trigger('#mn-row')?.getAttribute('aria-label')), 'Actions for edge-cache');
  await page.get(() => dd.menu.close('#mn-row'));
  assert.ok(!(await isOpen('mn-row')(page)));
  assert.equal(await page.attr(row('edge-cache'), 'aria-expanded'), 'false');
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), row('edge-cache')), 'focus back on the trigger');
  assert.deepEqual(await events(), ['menuopen mn-row Actions for edge-cache', 'menuclose mn-row Actions for edge-cache']);
  // Closing a closed menu is a no-op; with no argument, every open menu (submenu included) closes.
  await page.get(() => dd.menu.close(document.getElementById('mn-row')));
  assert.deepEqual(await events(), []);
  await page.get(() => dd.menu.open(document.getElementById('mn-row'), document.querySelector('[aria-label="Actions for auth-gateway"]'), { focus: 'none' }));
  assert.equal(await page.get(() => document.getElementById('mn-row').contains(document.activeElement)), false, "focus: 'none' leaves focus alone");
  await page.focus('#mn-row [data-dd-menu="mn-row-promote"]');
  await page.press('ArrowRight');
  assert.ok(await isOpen('mn-row-promote')(page));
  await events();
  await page.get(() => dd.menu.close());
  assert.ok(!(await isOpen('mn-row')(page)) && !(await isOpen('mn-row-promote')(page)), 'both levels closed');
  const closed = await events();
  assert.equal(closed.length, 2);
  assert.match(closed[0], /^menuclose mn-row-promote/);
  assert.equal(closed[1], 'menuclose mn-row Actions for auth-gateway');
  // Without a trigger, dd.menu.open anchors to the first trigger pointing at the menu.
  await page.get(() => dd.menu.open('#mn-project'));
  assert.ok(await isOpen('mn-project')(page));
  assert.equal(await page.attr(trigger, 'aria-expanded'), 'true');
  await page.press('Escape');
});

test('context menus report their area as the trigger', async ({ open, assert }) => {
  const page = await open('components/menu');
  await page.get(() => { window.__ctx = null; document.getElementById('mn-ctx').addEventListener('dd:menuopen', (e) => { window.__ctx = e.detail.trigger.getAttribute('data-dd-contextmenu'); }); });
  await rightClick(page, '[data-dd-contextmenu="mn-ctx"]');
  assert.ok(await isOpen('mn-ctx')(page));
  assert.equal(await page.get(() => window.__ctx), 'mn-ctx');
  assert.equal(await page.get(() => document.getElementById('mn-ctx').ddTrigger.getAttribute('data-dd-contextmenu')), 'mn-ctx');
  await page.press('Escape');
});

test('a row re-rendered while its menu is open closes the menu instead of pinning it to the corner', async ({ open, assert }) => {
  const page = await open('components/menu');
  const row = '[data-dd-menu="mn-row"][aria-label^="Actions for auth-gateway"]';
  await page.click(row);
  assert.ok(await isOpen('mn-row')(page));
  await page.get(() => { window.__closes = 0; document.getElementById('mn-row').addEventListener('dd:menuclose', () => window.__closes++); });
  // A framework swaps the row's button for a fresh node, then the page scrolls.
  await page.get((s) => { const t = document.querySelector(s); t.replaceWith(t.cloneNode(true)); }, row);
  await page.get(() => window.scrollBy(0, 40));
  await page.waitFor(() => document.getElementById('mn-row').hidden);
  assert.equal(await page.get(() => window.__closes), 1, 'closed once, with dd:menuclose');
  assert.equal(await page.get(() => document.getElementById('mn-row').classList.contains('is-floating')), false);
  // The fresh button opens it again, anchored to it.
  await page.click(row);
  assert.ok(await isOpen('mn-row')(page));
  const [t, m] = await page.get((s) => [document.querySelector(s).getBoundingClientRect().toJSON(), document.getElementById('mn-row').getBoundingClientRect().toJSON()], row);
  assert.ok(m.top >= t.bottom - 1 && m.top < t.bottom + 20, 'anchored under the new button');
});

test('a trigger rendered after load gets aria-haspopup / -expanded / -controls when it takes focus, and works', async ({ open, assert }) => {
  const page = await open('components/menu');
  await page.click('.doc-head h1'); // the page has focus, as it would for a user
  await page.get(() => {
    const box = document.createElement('div');
    box.innerHTML = '<button class="dd-btn" type="button" id="late-trigger" data-dd-menu="late-menu">Later</button>'
      + '<div class="dd-menu" id="late-menu" hidden><button class="dd-menu__item" role="menuitem" type="button">Rename</button></div>';
    document.querySelector('.doc-head').append(box);
  });
  await page.focus('#late-trigger');
  assert.deepEqual(await page.get(() => ['aria-haspopup', 'aria-expanded', 'aria-controls'].map((a) => document.getElementById('late-trigger').getAttribute(a))), ['menu', 'false', 'late-menu']);
  await page.press('ArrowDown');
  assert.ok(await isOpen('late-menu')(page));
  assert.equal(await page.attr('#late-trigger', 'aria-expanded'), 'true');
  assert.equal(await focused(page), 'Rename');
});

test('opening under a stationary pointer preserves first-item focus until the pointer moves', async ({ open, assert }) => {
  const page = await open('components/menu');
  const trigger = '[aria-label="Actions for edge-cache"]';
  await page.click(trigger);
  await page.hover('#mn-row [data-dd-toast="Deployment URL copied"]');
  assert.equal(await focused(page), 'Copy deployment URL');
  await page.get(() => dd.menu.close('mn-row'));
  await page.sleep(180);
  await page.get((s) => dd.menu.open('mn-row', document.querySelector(s)), trigger);
  await page.sleep(250);
  // Browsers can emit a boundary event when a floating layer moves under a stationary pointer.
  await page.get(() => document.querySelector('#mn-row [data-dd-toast]').dispatchEvent(new PointerEvent('pointerover', { bubbles: true, pointerType: 'mouse' })));
  assert.equal(await focused(page), 'View logs', 'layout changes under the cursor do not change focus');
  await page.hover('#mn-row [data-action="Rolling back"]');
  assert.equal(await focused(page), 'Roll back', 'moving the pointer still focuses an item');
});
