import { test } from './lib/test.mjs';

const retype = async (page, sel, text) => {
  await page.focus(sel);
  await page.get((s) => document.querySelector(s).select(), sel);
  if (text) await page.type(text); else await page.press('Backspace');
};
// The error linked to a control through aria-describedby, if it is showing.
const errorOf = (page, sel) => page.get((s) => {
  const el = document.querySelector(s);
  const err = (el.getAttribute('aria-describedby') || '').split(/\s+/).map((id) => document.getElementById(id)).find((n) => n?.classList.contains('dd-field__error'));
  return err && !err.hidden && err.getClientRects().length ? err.textContent.trim() : null;
}, sel);
const toasts = (page) => page.get(() => [...document.querySelectorAll('.dd-toast')].map((t) => t.textContent.replace(/\s+/g, ' ').trim()));

test('invalid submit: flags each bad field, focuses the first, hides its hint, no submit handler runs', async ({ open, assert }) => {
  const page = await open('components/form-layout');
  await page.get(() => { window._submits = 0; document.addEventListener('submit', () => window._submits++); });
  await retype(page, '#fc-1', '');
  await retype(page, '#fc-4', '70000');
  await page.click('#fc-form button[type="submit"]');
  assert.equal(await page.attr('#fc-1', 'aria-invalid'), 'true');
  assert.equal(await page.attr('#fc-4', 'aria-invalid'), 'true');
  assert.equal(await page.attr('#fc-5', 'aria-invalid'), null, 'valid fields stay clean');
  assert.equal(await errorOf(page, '#fc-1'), 'Give the service a name.', 'data-dd-error-missing for an empty field');
  assert.equal(await errorOf(page, '#fc-4'), 'Ports run from 1 to 65535.', 'data-dd-error-range');
  assert.equal(await page.active(), '#fc-1', 'focus on the first problem');
  assert.ok(!(await page.visible('#fc-1 ~ .dd-field__hint, .dd-field:has(#fc-1) > .dd-field__hint')), 'the hint steps aside');
  assert.equal(await page.get(() => window._submits), 0, 'the page never saw the submit');
  assert.deepEqual(await toasts(page), []);
});

test('errors clear as soon as the value is fixed, without nagging mid-typing', async ({ open, assert }) => {
  const page = await open('components/form-layout');
  await retype(page, '#fc-1', '');
  await page.click('#fc-form button[type="submit"]');
  assert.equal(await page.attr('#fc-1', 'aria-invalid'), 'true');
  assert.equal(await errorOf(page, '#fc-1'), 'Give the service a name.');
  await page.type('Image');
  assert.equal(await errorOf(page, '#fc-1'), 'Use lowercase letters, numbers and single dashes.', 'still wrong: the error stays and now names the new problem');
  await retype(page, '#fc-1', 'image-cdn');
  assert.equal(await page.attr('#fc-1', 'aria-invalid'), null);
  assert.equal(await errorOf(page, '#fc-1'), null);
  assert.ok(await page.visible('.dd-field:has(#fc-1) > .dd-field__hint'), 'hint is back');
  assert.ok(!(await page.get(() => (document.querySelector('#fc-1').getAttribute('aria-describedby') || '').includes('dd-error'))), 'describedby cleaned up');
  // After a failed submit, a newly broken field is flagged when committed (change), not on each keystroke.
  await retype(page, '#fc-5', '');
  assert.equal(await page.attr('#fc-5', 'aria-invalid'), null, 'not while typing');
  await page.press('Tab');
  assert.equal(await page.attr('#fc-5', 'aria-invalid'), 'true', 'flagged on change');
  assert.equal(await errorOf(page, '#fc-5'), 'Add the repository to deploy from.');
});

test('valid submit (button or Enter in a field) reaches the page and confirms with a toast', async ({ open, assert }) => {
  const page = await open('components/form-layout', { theme: 'dusk' });
  await page.focus('#fc-1');
  await page.press('Enter');
  await page.waitFor(() => [...document.querySelectorAll('.dd-toast')].some((t) => t.textContent.includes('Service created')));
  assert.equal(await page.count('[aria-invalid="true"]'), 0);
});

test('Cancel (reset) restores values and clears every error', async ({ open, assert }) => {
  const page = await open('components/form-layout');
  await retype(page, '#fc-1', '');
  await retype(page, '#fc-4', '0');
  await page.click('#fc-form button[type="submit"]');
  assert.equal(await page.count('#fc-form [aria-invalid="true"]'), 2);
  await page.click('#fc-form button[type="reset"]');
  assert.equal(await page.count('#fc-form [aria-invalid="true"]'), 0);
  assert.equal(await page.count('#fc-form .dd-field__error'), 0);
  assert.equal(await page.get(() => document.querySelector('#fc-1').value), 'image-resizer');
  // A fresh start: typing a bad value after reset is not judged until the next submit.
  await retype(page, '#fc-4', '0');
  await page.press('Tab');
  assert.equal(await page.attr('#fc-4', 'aria-invalid'), null);
});

test('error colour follows the theme (dusk)', async ({ open, assert }) => {
  const page = await open('components/form-layout', { theme: 'dusk' });
  await retype(page, '#fc-1', '');
  await page.click('#fc-form button[type="submit"]');
  const [err, bad] = await page.get(() => {
    const e = document.querySelector('.dd-field:has(#fc-1) .dd-field__error');
    const p = document.createElement('span'); p.style.color = 'var(--dd-bad)'; e.append(p);
    const bad = getComputedStyle(p).color; p.remove();
    return [getComputedStyle(e).color, bad];
  });
  assert.equal(err, bad);
  // The tucked label eases to red (it is also focused, which would tint it accent).
  await page.waitFor((c) => getComputedStyle(document.querySelector('label[for="fc-1"]')).color === c, { args: [bad] });
  assert.ok(await page.exists('.dd-field:has(#fc-1) .dd-field__error svg use[href$="#dd-i-error"]'), 'leading error icon');
});

test('sticky footer stays pinned while the box scrolls and settles at the end', async ({ open, assert }) => {
  const page = await open('components/form-layout');
  const box = '[aria-label="Alert settings (scrolls)"]';
  const pos = () => page.get((s) => {
    const sc = document.querySelector(s); const f = sc.querySelector('.dd-form__footer--sticky');
    const a = sc.getBoundingClientRect(); const b = f.getBoundingClientRect(); const btn = f.querySelector('[type="submit"]').getBoundingClientRect();
    const hit = document.elementFromPoint(btn.left + btn.width / 2, btn.top + btn.height / 2);
    return { gap: Math.round(a.bottom - b.bottom), inside: b.top >= a.top, clickable: !!hit?.closest('[type="submit"]'), scrollable: sc.scrollHeight > sc.clientHeight + 50, bg: getComputedStyle(f).backgroundColor, blur: getComputedStyle(f).backdropFilter };
  }, box);
  await page.get((s) => document.querySelector(s).scrollIntoView({ block: 'center' }), box);
  const top = await pos();
  assert.ok(top.scrollable, 'the box really scrolls');
  assert.ok(Math.abs(top.gap) <= 1 && top.inside, `pinned to the bottom at the top of the box (gap ${top.gap})`);
  assert.ok(top.clickable, 'Save is not covered');
  assert.match(top.blur, /blur/);
  assert.notEqual(top.bg, 'rgba(0, 0, 0, 0)', 'has its own tone');
  await page.get((s) => { document.querySelector(s).scrollTop = 200; }, box);
  assert.ok(Math.abs((await pos()).gap) <= 1, 'still pinned mid-scroll');
  await page.get((s) => { const sc = document.querySelector(s); sc.scrollTop = sc.scrollHeight; }, box);
  const end = await pos();
  assert.ok(end.inside && end.gap >= 0, 'sits at the end of the form');
  // Keyboard: the scroll box is focusable so it can be scrolled without a mouse.
  assert.equal(await page.attr(box, 'tabindex'), '0');
});

test('sticky form: an invalid field under the footer is scrolled into view and focused', async ({ open, assert }) => {
  const page = await open('components/form-layout');
  const box = '[aria-label="Alert settings (scrolls)"]';
  await retype(page, '#fs-2', '5');
  await retype(page, '#fs-9', 'Sign-in'); // move focus away to the bottom of the form
  await page.get((s) => { document.querySelector(s).scrollTop = 0; }, box);
  await page.click('#fs-form button[type="submit"]');
  assert.equal(await page.active(), '#fs-2');
  assert.match(await errorOf(page, '#fs-2'), /30/);
  await page.waitFor((s) => {
    const sc = document.querySelector(s).getBoundingClientRect(); const f = document.querySelector('#fs-form .dd-form__footer').getBoundingClientRect();
    const r = document.querySelector('#fs-2').getBoundingClientRect();
    return r.top >= sc.top && r.bottom <= f.top;
  }, { args: [box] });
  await retype(page, '#fs-2', '120');
  await page.click('#fs-form button[type="submit"]');
  await page.waitFor(() => [...document.querySelectorAll('.dd-toast')].some((t) => t.textContent.includes('Alert saved')));
});

test('footers: Save, Continue and Create key confirm; Discard resets the settings (and re-counts)', async ({ open, assert }) => {
  const page = await open('components/form-layout');
  await page.click('#ff-save button[type="submit"]');
  await page.click('#ff-next button[type="submit"]');
  await page.click('#fp-form button[type="submit"]');
  await page.waitFor(() => ['Changes saved', 'On to the next step', 'Key created'].every((t) => [...document.querySelectorAll('.dd-toast')].some((n) => n.textContent.includes(t))));
  await retype(page, '#st-3', 'Tools.');
  assert.equal(await page.text('.dd-field:has(#st-3) .dd-field__counter'), '6 / 160');
  await page.click('#st-form .dd-checkbox__input');
  assert.equal(await page.get(() => document.querySelector('#st-form .dd-checkbox__input').checked), false);
  await page.click('#st-form button[type="reset"]');
  await page.waitFor(() => document.querySelector('.dd-field:has(#st-3) .dd-field__counter').textContent === '73 / 160');
  assert.equal(await page.get(() => document.querySelector('#st-form .dd-checkbox__input').checked), true);
  assert.equal(await page.count('#st-form .dd-switch, #st-form [role="switch"]'), 0, 'a form saved with a button holds checkboxes, not switches');
});

test('at 375 the grid folds to one column and footer buttons share the width', async ({ open, assert }) => {
  const page = await open('components/form-layout', { width: 375 });
  const cols = await page.get(() => getComputedStyle(document.querySelector('#fc-form .dd-form__grid')).gridTemplateColumns.split(' ').length);
  assert.equal(cols, 1);
  const btns = await page.get(() => [...document.querySelectorAll('#fc-form .dd-form__footer .dd-btn')].map((b) => Math.round(b.getBoundingClientRect().width)));
  assert.ok(btns.every((w) => w > 100), `buttons stretch (${btns})`);
  await retype(page, '#fc-1', '');
  await page.tap('#fc-form button[type="submit"]');
  assert.equal(await page.active(), '#fc-1');
  assert.ok(await page.get(() => document.documentElement.scrollWidth <= innerWidth), 'no sideways scroll');
});

test('per-reason messages: missing, type, pattern, range, length; data-dd-error, then the browser; setCustomValidity wins', async ({ open, assert }) => {
  const page = await open('components/form-layout');
  await page.get(() => {
    const f = (id, label, attrs) => `<div class="dd-field"><label class="dd-field__label" for="${id}">${label}</label><div class="dd-input"><input class="dd-input__control" id="${id}" ${attrs}></div></div>`;
    const form = document.createElement('form');
    form.id = 'fx'; form.className = 'dd-form'; form.noValidate = true; form.setAttribute('data-dd-validate', ''); form.setAttribute('onsubmit', 'return false');
    form.innerHTML = [
      f('fx-mail', 'Email', 'type="email" required data-dd-error-missing="Add an email." data-dd-error-type="That isn’t an email address."'),
      f('fx-slug', 'Slug', 'pattern="[a-z]+" minlength="3" maxlength="12" data-dd-error-pattern="Lowercase letters only." data-dd-error-length="3 to 12 letters." data-dd-error="Fix the slug."'),
      f('fx-port', 'Port', 'type="number" min="1" max="10" step="1" data-dd-error-range="1 to 10." data-dd-error-type="Digits only."'),
      f('fx-team', 'Team', 'required data-dd-error="Name the team."'),
      f('fx-site', 'Site', 'type="url"'),
    ].join('') + '<button type="submit" id="fx-save">Save</button>';
    document.querySelector('.doc-main').append(form);
  });
  const save = () => page.click('#fx-save');
  // Empty: missing → its own message; no missing message → data-dd-error. Optional empty fields are fine.
  await save();
  assert.equal(await errorOf(page, '#fx-mail'), 'Add an email.');
  assert.equal(await errorOf(page, '#fx-team'), 'Name the team.', 'falls back to data-dd-error');
  assert.equal(await page.attr('#fx-slug', 'aria-invalid'), null);
  // While an error shows, it follows the problem as you type.
  await retype(page, '#fx-mail', 'ana');
  assert.equal(await errorOf(page, '#fx-mail'), 'That isn’t an email address.', 'type');
  await retype(page, '#fx-mail', 'ana@cxkw.dev');
  assert.equal(await errorOf(page, '#fx-mail'), null);
  // Pattern before length; then length on its own; data-dd-error is only the fallback.
  await retype(page, '#fx-slug', 'AB');
  await retype(page, '#fx-port', '20');
  await retype(page, '#fx-site', 'not a url');
  await save();
  assert.equal(await errorOf(page, '#fx-slug'), 'Lowercase letters only.', 'pattern');
  await retype(page, '#fx-slug', 'ab');
  assert.equal(await errorOf(page, '#fx-slug'), '3 to 12 letters.', 'length (minlength)');
  assert.equal(await errorOf(page, '#fx-port'), '1 to 10.', 'range (max)');
  await retype(page, '#fx-port', '1.5');
  assert.equal(await errorOf(page, '#fx-port'), '1 to 10.', 'range covers step');
  await retype(page, '#fx-port', '1e');
  assert.equal(await errorOf(page, '#fx-port'), 'Digits only.', 'a number box holding text is a type problem');
  const browser = await page.get(() => document.getElementById('fx-site').validationMessage);
  assert.ok(browser.length > 0);
  assert.equal(await errorOf(page, '#fx-site'), browser, 'nothing set: the browser’s message');
  // A message from script wins over every attribute, and goes once it is cleared.
  // (Set from script, so no field commits on the way to Save and moves the button under the pointer.)
  await page.get(() => {
    const t = document.getElementById('fx-team'); t.value = 'core'; t.setCustomValidity('That team name is taken.');
    const m = document.getElementById('fx-mail'); m.value = 'x'; m.setCustomValidity('The server rejected this address.');
  });
  await save();
  assert.equal(await errorOf(page, '#fx-team'), 'That team name is taken.', 'over data-dd-error');
  assert.equal(await errorOf(page, '#fx-mail'), 'The server rejected this address.', 'over data-dd-error-type');
  await page.get(() => { const t = document.getElementById('fx-team'); t.setCustomValidity(''); t.dispatchEvent(new Event('input', { bubbles: true })); });
  assert.equal(await errorOf(page, '#fx-team'), null);
  assert.equal(await page.active(), '#fx-mail', 'focus on the first problem');
});
