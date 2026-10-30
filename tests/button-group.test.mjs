import { test } from './lib/test.mjs';

const levels = '[data-dd-btn-toggle][aria-label="Log levels"]';
const columns = '[data-dd-btn-toggle][aria-label="Columns"]';
const pressed = (page, g) => page.get((s) => [...document.querySelectorAll(`${s} [aria-pressed]`)].map((b) => b.getAttribute('aria-pressed') === 'true' ? 1 : 0).join(''), g);
const caret = (id) => `[data-dd-menu="${id}"]`;
const isOpen = (page, id) => page.get((i) => !document.getElementById(i).hidden, id);

test('toggle buttons flip aria-pressed on click, Enter and Space; groups and buttons are independent', async ({ open, assert }) => {
  const page = await open('components/button-group');
  assert.equal(await pressed(page, levels), '110');
  await page.click(`${levels} .dd-btn:nth-child(3)`);
  assert.equal(await pressed(page, levels), '111');
  await page.click(`${levels} .dd-btn:nth-child(1)`);
  assert.equal(await pressed(page, levels), '011');
  assert.equal(await pressed(page, columns), '101', 'the other group did not change');
  await page.focus(`${columns} .dd-btn:nth-child(2)`);
  await page.press('Enter');
  assert.equal(await pressed(page, columns), '111');
  await page.press(' ');
  assert.equal(await pressed(page, columns), '101');
  // Rapid clicks: an even number leaves it where it started.
  for (let k = 0; k < 6; k++) await page.click(`${levels} .dd-btn:nth-child(2)`);
  assert.equal(await pressed(page, levels), '011');
});

test('pressed and unpressed read differently in dawn and dusk; a press in a group washes instead of nudging', async ({ open, assert }) => {
  for (const theme of ['dawn', 'dusk']) {
    const page = await open('components/button-group', { theme });
    for (const g of [levels, columns]) {
      const [on, off] = await page.get((s) => {
        const b = document.querySelectorAll(`${s} [aria-pressed]`);
        const on = [...b].find((x) => x.getAttribute('aria-pressed') === 'true'), off = [...b].find((x) => x.getAttribute('aria-pressed') === 'false');
        return [getComputedStyle(on).backgroundColor + getComputedStyle(on).color, getComputedStyle(off).backgroundColor + getComputedStyle(off).color];
      }, g);
      assert.notEqual(on, off, `${theme} ${g}: pressed differs from unpressed`);
    }
    const sel = '[aria-label="Deployment actions"] .dd-btn:first-child';
    const p = await page.get((s) => { const el = document.querySelector(s); el.scrollIntoView({ block: 'center' }); const r = el.getBoundingClientRect(); return { x: r.left + 8, y: r.top + 8 }; }, sel);
    await page.send('Input.dispatchMouseEvent', { type: 'mousePressed', ...p, button: 'left', clickCount: 1 });
    await page.sleep(200);
    const [tf, img] = await page.get((s) => [getComputedStyle(document.querySelector(s)).transform, getComputedStyle(document.querySelector(s)).backgroundImage], sel);
    await page.send('Input.dispatchMouseEvent', { type: 'mouseReleased', ...p, button: 'left', clickCount: 1 });
    assert.equal(tf, 'none', 'no nudge inside a group');
    assert.match(img, /gradient/, 'wash shows the press');
  }
});

test('split button: chevron opens its menu aligned to the end and flips; Esc returns focus; main half runs the action', async ({ open, assert }) => {
  const page = await open('components/button-group');
  const c = caret('bg-deploy-menu');
  await page.click(c);
  assert.ok(await isOpen(page, 'bg-deploy-menu'));
  assert.equal(await page.attr(c, 'aria-expanded'), 'true');
  assert.equal(await page.attr(c, 'aria-haspopup'), 'menu');
  await page.get(() => Promise.all(document.getElementById('bg-deploy-menu').getAnimations().map((a) => a.finished)).then(() => true));
  const [cr, mr, rot] = await page.get((s) => [document.querySelector(s).getBoundingClientRect().toJSON(), document.getElementById('bg-deploy-menu').getBoundingClientRect().toJSON(), getComputedStyle(document.querySelector(`${s} .dd-icon`)).transform], c);
  assert.ok(Math.abs(cr.right - mr.right) <= 1 && mr.top >= cr.bottom, 'menu below, right edges aligned');
  await page.waitFor((s) => getComputedStyle(document.querySelector(`${s} .dd-icon`)).transform.startsWith('matrix(-1'), { args: [c] });
  assert.ok(rot, 'chevron rotates');
  await page.press('Escape');
  assert.ok(!(await isOpen(page, 'bg-deploy-menu')));
  assert.equal(await page.attr(c, 'aria-expanded'), 'false');
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), c), 'focus back on the chevron');
  // ↓ on the chevron opens at the first item; Enter runs it, closes and confirms.
  await page.press('ArrowDown', 'Enter');
  assert.ok(!(await isOpen(page, 'bg-deploy-menu')));
  await page.waitFor(() => !!document.querySelector('.dd-toast'));
  assert.match(await page.text('.dd-toast'), /preview/);
  // The main half does not open the menu.
  await page.click('.dd-btn-group--split .dd-btn--primary:not(.dd-btn-group__caret)');
  assert.ok(!(await isOpen(page, 'bg-deploy-menu')));
  await page.waitFor(() => document.querySelectorAll('.dd-toast').length === 2);
});

test('several split buttons: opening one closes the other; outside click closes', async ({ open, assert }) => {
  const page = await open('components/button-group', { theme: 'dusk' });
  await page.click(caret('bg-redeploy-menu'));
  assert.ok(await isOpen(page, 'bg-redeploy-menu'));
  await page.focus(caret('bg-export-menu'));
  await page.press('Enter');
  assert.ok(await isOpen(page, 'bg-export-menu'));
  assert.ok(!(await isOpen(page, 'bg-redeploy-menu')), 'the first menu closed');
  assert.equal(await page.attr(caret('bg-redeploy-menu'), 'aria-expanded'), 'false');
  await page.click('.doc-head h1');
  assert.ok(!(await isOpen(page, 'bg-export-menu')));
});

test('375px: block group fills its row, split menus fit the viewport on tap', async ({ open, assert }) => {
  const page = await open('components/button-group', { width: 375 });
  const [g, box] = await page.get(() => { const el = document.querySelector('.dd-btn-group--block'); return [el.getBoundingClientRect().width, el.parentElement.getBoundingClientRect().width]; });
  assert.ok(Math.abs(g - box) < 1);
  assert.ok(await page.get(() => [...document.querySelectorAll('.ex-stage .dd-btn-group')].every((el) => el.getBoundingClientRect().right <= 376)), 'groups fit 375px');
  await page.tap(caret('bg-export-menu'));
  assert.ok(await isOpen(page, 'bg-export-menu'));
  const m = await page.get(() => document.getElementById('bg-export-menu').getBoundingClientRect().toJSON());
  assert.ok(m.left >= 0 && m.right <= 375);
  await page.tap('#bg-export-menu .dd-menu__item');
  assert.ok(!(await isOpen(page, 'bg-export-menu')));
});
