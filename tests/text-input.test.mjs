import { test } from './lib/test.mjs';

const reveal = (id) => `.dd-input:has(#${id}) [data-dd-reveal]`;
const clearBtn = (sel) => `.dd-input:has(${sel}) [data-dd-clear]`;
const step = (id, dir) => `.dd-input:has(#${id}) [data-dd-step="${dir}"]`;
const iconShown = (page, sel, part) => page.get((s, p) => getComputedStyle(document.querySelector(s).querySelector(p)).display !== 'none', sel, part);
// Count input/change events a control fires from now on.
const listen = (page, sel) => page.get((s) => { const el = document.querySelector(s); el._ev = []; ['input', 'change'].forEach((t) => el.addEventListener(t, () => el._ev.push(t))); }, sel);
const events = (page, sel) => page.get((s) => document.querySelector(s)._ev, sel);

test('reveal toggles password ↔ text, keeps the value, syncs aria-pressed, label and icon', async ({ open, assert }) => {
  const page = await open('components/text-input');
  const btn = reveal('tp-1');
  assert.equal(await page.attr('#tp-1', 'type'), 'password');
  assert.ok(await iconShown(page, btn, '.dd-input__show'));
  await page.click(btn);
  assert.equal(await page.attr('#tp-1', 'type'), 'text');
  assert.equal(await page.attr(btn, 'aria-pressed'), 'true');
  assert.equal(await page.attr(btn, 'aria-label'), 'Hide password');
  assert.ok(await iconShown(page, btn, '.dd-input__hide'));
  assert.ok(!(await iconShown(page, btn, '.dd-input__show')));
  assert.equal(await page.get(() => document.querySelector('#tp-1').value), 'dd_live_51Hc0deX9');
  assert.equal(await page.attr('#tp-2', 'type'), 'password', 'the other password field is independent');
  await page.click(btn);
  assert.equal(await page.attr('#tp-1', 'type'), 'password');
  assert.equal(await page.attr(btn, 'aria-pressed'), 'false');
  assert.equal(await page.attr(btn, 'aria-label'), 'Show password');
});

test('reveal works from the keyboard and survives rapid clicks (dusk)', async ({ open, assert }) => {
  const page = await open('components/text-input', { theme: 'dusk' });
  await page.focus('#tp-2');
  await page.type('correct horse battery');
  await page.press('Tab');
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), reveal('tp-2')), 'Tab reaches the reveal button');
  await page.press('Space');
  assert.equal(await page.attr('#tp-2', 'type'), 'text');
  await page.press('Enter');
  assert.equal(await page.attr('#tp-2', 'type'), 'password');
  for (let n = 0; n < 5; n++) await page.click(reveal('tp-2'));
  assert.equal(await page.attr('#tp-2', 'type'), 'text');
  assert.equal(await page.attr(reveal('tp-2'), 'aria-pressed'), 'true');
  assert.equal(await page.get(() => document.querySelector('#tp-2').value), 'correct horse battery');
});

test('clear empties the field, fires input + change, returns focus and hides itself', async ({ open, assert }) => {
  const page = await open('components/text-input');
  const input = 'input[aria-label="Search deploys"]';
  await listen(page, input);
  assert.ok(await page.visible(clearBtn(input)), 'clear shows while there is text');
  await page.click(clearBtn(input));
  assert.equal(await page.get((s) => document.querySelector(s).value, input), '');
  assert.deepEqual(await events(page, input), ['input', 'change']);
  assert.ok(await page.get((s) => document.activeElement === document.querySelector(s), input), 'focus back in the field');
  assert.ok(!(await page.visible(clearBtn(input))), 'clear hides once empty');
  // The empty field starts without a clear button; typing brings it, and it works again.
  assert.ok(!(await page.visible(clearBtn('#tsr-1'))));
  await page.focus('#tsr-1');
  await page.type('edge');
  assert.ok(await page.visible(clearBtn('#tsr-1')));
  await page.click(clearBtn('#tsr-1'));
  assert.equal(await page.get(() => document.querySelector('#tsr-1').value), '');
  assert.equal(await page.active(), '#tsr-1');
});

test('Escape clears a search field', async ({ open, assert }) => {
  const page = await open('components/text-input');
  await page.focus('#tsr-1');
  await page.type('auth');
  await page.press('Escape');
  assert.equal(await page.get(() => document.querySelector('#tsr-1').value), '');
});

test('steppers honour step, min and max, dim at each end and fire input + change', async ({ open, assert }) => {
  const page = await open('components/text-input');
  await listen(page, '#tn-1');
  assert.deepEqual(await page.get(() => [...document.querySelectorAll('.dd-input__steppers .dd-input__btn')].map((b) => b.disabled)), [false, false, false, false, false, false], 'nothing dimmed mid-range');
  await page.click(step('tn-1', 1));
  assert.equal(await page.get(() => document.querySelector('#tn-1').value), '4');
  assert.deepEqual(await events(page, '#tn-1'), ['input', 'change']);
  await page.click(step('tn-2', 1));
  assert.equal(await page.get(() => document.querySelector('#tn-2').value), '3500', 'step 500');
  await page.click(step('tn-2', -1));
  await page.click(step('tn-2', -1));
  assert.equal(await page.get(() => document.querySelector('#tn-2').value), '2500');
  // Rapid clicks run into max and stop there.
  for (let n = 0; n < 6; n++) await page.click(step('tn-3', 1), {}).catch(() => {});
  assert.equal(await page.get(() => document.querySelector('#tn-3').value), '5');
  assert.equal(await page.get((s) => document.querySelector(s).disabled, step('tn-3', 1)), true, 'plus dims at max');
  assert.equal(await page.get((s) => document.querySelector(s).disabled, step('tn-3', -1)), false);
  await page.click(step('tn-3', -1));
  assert.equal(await page.get((s) => document.querySelector(s).disabled, step('tn-3', 1)), false, 'plus comes back off the end');
  for (let n = 0; n < 4; n++) await page.click(step('tn-3', -1));
  assert.equal(await page.get(() => document.querySelector('#tn-3').value), '0');
  assert.equal(await page.get((s) => document.querySelector(s).disabled, step('tn-3', -1)), true, 'minus dims at min');
});

test('keyboard: stepper focus never strands on a dimmed button; arrows and typing update the dimming', async ({ open, assert }) => {
  const page = await open('components/text-input');
  await page.focus(step('tn-1', 1));
  await page.press(...Array(9).fill('Enter'));
  assert.equal(await page.get(() => document.querySelector('#tn-1').value), '12');
  assert.equal(await page.get((s) => document.querySelector(s).disabled, step('tn-1', 1)), true);
  assert.equal(await page.active(), '#tn-1', 'focus moved back to the field when plus dimmed');
  await page.press('ArrowDown');
  assert.equal(await page.get(() => document.querySelector('#tn-1').value), '11');
  assert.equal(await page.get((s) => document.querySelector(s).disabled, step('tn-1', 1)), false, 'arrow key off the end re-enables plus');
  await page.get(() => document.querySelector('#tn-1').select());
  await page.type('1');
  assert.equal(await page.get((s) => document.querySelector(s).disabled, step('tn-1', -1)), true, 'typing the min dims minus');
});

test('disabled can’t be focused; read-only focuses but won’t change; focus tints the tucked label', async ({ open, assert }) => {
  const page = await open('components/text-input', { theme: 'dusk' });
  await page.click('#ts-5');
  assert.notEqual(await page.active(), '#ts-5');
  await page.click('#ts-6');
  assert.equal(await page.active(), '#ts-6');
  await page.type('zzz');
  assert.equal(await page.get(() => document.querySelector('#ts-6').value), 'prj_7f3a91c2');
  await page.click('#ts-1');
  const [label, accent] = await page.get(() => {
    const p = document.createElement('span'); p.style.color = 'var(--dd-accent)'; document.querySelector('#ts-1').closest('.dd-field').append(p);
    const a = getComputedStyle(p).color; p.remove();
    return [getComputedStyle(document.querySelector('label[for="ts-1"]')).color, a];
  });
  await page.waitFor((a) => getComputedStyle(document.querySelector('label[for="ts-1"]')).color === a, { args: [accent] });
  assert.ok(label);
});

test('touch at 375: tap reveal, clear and steppers', async ({ open, assert }) => {
  const page = await open('components/text-input', { width: 375 });
  await page.tap(reveal('tp-1'));
  assert.equal(await page.attr('#tp-1', 'type'), 'text');
  await page.tap(step('tn-1', -1));
  assert.equal(await page.get(() => document.querySelector('#tn-1').value), '2');
  await page.tap(clearBtn('input[aria-label="Search deploys"]'));
  assert.equal(await page.get(() => document.querySelector('input[aria-label="Search deploys"]').value), '');
  assert.ok(await page.get(() => document.documentElement.scrollWidth <= innerWidth), 'no sideways scroll at 375');
});

test('form reset re-checks the steppers; clear leaves a disabled or read-only control alone; reveal labels can be translated', async ({ open, assert }) => {
  const page = await open('components/text-input');
  await page.get(() => document.querySelector('.doc-main').insertAdjacentHTML('afterbegin', `
    <form id="ti-form">
      <div class="dd-input"><input class="dd-input__control" id="ti-n" type="number" value="1" min="0" max="2">
        <span class="dd-input__affix dd-input__steppers">
          <button class="dd-input__btn" type="button" data-dd-step="-1" aria-label="Decrease">-</button>
          <button class="dd-input__btn" type="button" data-dd-step="1" aria-label="Increase">+</button></span></div>
      <div class="dd-input"><input class="dd-input__control" id="ti-off" value="locked" disabled>
        <span class="dd-input__affix"><button class="dd-input__btn" type="button" data-dd-clear aria-label="Clear">x</button></span></div>
      <div class="dd-input"><input class="dd-input__control" id="ti-ro" value="read only" readonly>
        <span class="dd-input__affix"><button class="dd-input__btn" type="button" data-dd-clear aria-label="Clear">x</button></span></div>
      <div class="dd-input"><input class="dd-input__control" id="ti-pw" type="password" value="hunter2">
        <span class="dd-input__affix"><button class="dd-input__btn" type="button" data-dd-reveal aria-pressed="false" aria-label="Passwort zeigen" data-dd-reveal-label="Passwort zeigen|Passwort verbergen">o</button></span></div>
    </form>`));
  await page.click(step('ti-n', 1));
  assert.equal(await page.get(() => document.querySelector('#ti-n').value), '2');
  assert.equal(await page.get((s) => document.querySelector(s).disabled, step('ti-n', 1)), true, 'plus dims at max');
  await page.get(() => document.getElementById('ti-form').reset());
  await page.sleep(50);
  assert.equal(await page.get(() => document.querySelector('#ti-n').value), '1');
  assert.equal(await page.get((s) => document.querySelector(s).disabled, step('ti-n', 1)), false, 'plus comes back after the reset');

  for (const id of ['#ti-off', '#ti-ro']) {
    await listen(page, id);
    await page.get((s) => document.querySelector(s).click(), clearBtn(id));
    assert.equal(await page.get((s) => document.querySelector(s).value, id), id === '#ti-off' ? 'locked' : 'read only', `${id} keeps its value`);
    assert.deepEqual(await events(page, id), [], `${id} fires nothing`);
  }

  await page.click(reveal('ti-pw'));
  assert.equal(await page.attr(reveal('ti-pw'), 'aria-label'), 'Passwort verbergen');
  await page.click(reveal('ti-pw'));
  assert.equal(await page.attr(reveal('ti-pw'), 'aria-label'), 'Passwort zeigen');
});
