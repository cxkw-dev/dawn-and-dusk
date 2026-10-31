import { test } from './lib/test.mjs';

// Reading the clipboard back needs permission; writing works without it.
const grant = (page) => page.send('Browser.grantPermissions', { permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite'] });
const clip = (page) => page.get(() => navigator.clipboard.readText());
const shown = (page, sel, icon) => page.get((s, n) => {
  const use = document.querySelector(s).querySelector(`use[href$="#dd-i-${n}"]`);
  const svg = use.closest('svg');
  return getComputedStyle(svg).display !== 'none' && svg.getBoundingClientRect().width > 0;
}, sel, icon);

const block = '#code-astro';
const blockCopy = '[data-dd-copy-target="#code-astro"]';

test('code block: copy copies the exact code and the button confirms', async ({ open, assert }) => {
  const page = await open('components/code');
  await grant(page);
  assert.ok(await shown(page, blockCopy, 'copy'), 'copy icon before');
  await page.click(blockCopy);
  await page.waitFor((s) => document.querySelector(s).hasAttribute('data-copied'), { args: [blockCopy] });
  assert.ok(await shown(page, blockCopy, 'check'), 'check icon while copied');
  assert.ok(!(await shown(page, blockCopy, 'copy')), 'copy icon hidden while copied');
  const text = await clip(page);
  assert.equal(text, (await page.get((s) => document.querySelector(s).textContent, block)).trim());
  assert.equal(text.split('\n').length, 10, 'one line per source line, no blank extras');
  assert.match(text, /^import \{ defineConfig \} from 'astro\/config';/);
  // The confirmation goes away by itself.
  await page.waitFor((s) => !document.querySelector(s).hasAttribute('data-copied'), { args: [blockCopy], timeout: 2500 });
});

test('numbered and diff blocks copy the code without their gutters', async ({ open, assert }) => {
  const page = await open('components/code');
  await grant(page);
  await page.click('[data-dd-copy-target="#code-diff"]');
  await page.waitFor(() => document.querySelector('[data-dd-copy-target="#code-diff"]').hasAttribute('data-copied'));
  const diff = await clip(page);
  assert.equal(diff.split('\n').length, 7);
  assert.ok(diff.split('\n').every((l) => !/^[+−-]\s/.test(l)), 'no +/− markers in the copied text');
  await page.click('[data-dd-copy-target="#code-retry"]');
  await page.waitFor(() => document.querySelector('[data-dd-copy-target="#code-retry"]').hasAttribute('data-copied'));
  const retry = await clip(page);
  assert.match(retry, /^export async function withRetry/, 'no line numbers in the copied text');
  assert.equal(retry.split('\n').length, 10);
});

test('keyboard: the copy button is a real button; Enter copies, Tab moves on to the code', async ({ open, assert }) => {
  const page = await open('components/code');
  await grant(page);
  const bare = '[data-dd-copy-target="#code-bare"]';
  assert.equal(await page.get((s) => document.querySelector(s).tagName, bare), 'BUTTON');
  await page.focus(bare);
  await page.press('Enter');
  await page.waitFor((s) => document.querySelector(s).hasAttribute('data-copied'), { args: [bare] });
  assert.equal(await clip(page), 'npm install @cxkw/dawn-and-dusk');
  // The <pre> after it is the next tab stop, so long lines can be scrolled from the keyboard.
  await page.press('Tab');
  assert.ok(await page.get(() => document.activeElement.matches('.dd-code__pre') && document.activeElement.querySelector('#code-bare') !== null));
});

test('rapid repeat copies keep the confirmation until 1.6s after the last one', async ({ open, assert }) => {
  const page = await open('components/code');
  await grant(page);
  for (let k = 0; k < 4; k++) await page.click(blockCopy);
  assert.ok(await page.get((s) => document.querySelector(s).hasAttribute('data-copied'), blockCopy));
  assert.equal(page.errors.length, 0);
  await page.sleep(1000);
  await page.click(blockCopy);
  await page.sleep(800);
  assert.ok(await page.get((s) => document.querySelector(s).hasAttribute('data-copied'), blockCopy), 'still confirming the last click');
});

const field = '.dd-code-field:has([data-dd-code-secret])';
const reveal = `${field} [data-dd-code-reveal]`;
const value = `${field} [data-dd-code-secret]`;
const SECRET = 'dd_live_51Hc7aQ2xK9mV0dRb4Lp8TzY3f9a';

test('code field: reveal swaps masked ↔ secret with aria-pressed and label; copy always copies the secret', async ({ open, assert }) => {
  const page = await open('components/code');
  await grant(page);
  const masked = await page.text(value);
  assert.notEqual(masked, SECRET);
  assert.equal(await page.attr(reveal, 'aria-pressed'), 'false');
  assert.equal(await page.attr(reveal, 'aria-label'), 'Show key');
  // Copy while masked still copies the real value.
  await page.click(`${field} [data-dd-copy]`);
  await page.waitFor((s) => document.querySelector(s).hasAttribute('data-copied'), { args: [`${field} [data-dd-copy]`] });
  assert.equal(await clip(page), SECRET);

  await page.click(reveal);
  assert.equal(await page.attr(reveal, 'aria-pressed'), 'true');
  assert.equal(await page.attr(reveal, 'aria-label'), 'Hide key');
  assert.equal(await page.text(value), SECRET);
  assert.ok(await shown(page, reveal, 'eye-off'), 'eye-off icon while revealed');

  // Keyboard: Space on the focused button hides it again.
  await page.focus(reveal);
  await page.press('Space');
  assert.equal(await page.attr(reveal, 'aria-pressed'), 'false');
  assert.equal(await page.text(value), masked);
  // Rapid toggles land back where they started.
  for (let k = 0; k < 4; k++) await page.click(reveal);
  assert.equal(await page.text(value), masked);
  assert.equal(await page.attr(reveal, 'aria-label'), 'Show key');
});

test('375px: tap copies, and a long line scrolls inside its block from the keyboard', async ({ open, assert }) => {
  const page = await open('components/code', { width: 375 });
  await grant(page);
  const btn = '[data-dd-copy-target="#code-retry"]';
  await page.tap(btn);
  await page.waitFor((s) => document.querySelector(s).hasAttribute('data-copied'), { args: [btn] });
  assert.match(await clip(page), /^export async function withRetry/);
  const pre = '.dd-code--numbered .dd-code__pre';
  assert.ok(await page.get((s) => { const p = document.querySelector(s); return p.scrollWidth > p.clientWidth; }, pre), 'overflows at 375');
  assert.ok(await page.get(() => document.documentElement.scrollWidth <= innerWidth), 'the page itself does not scroll sideways');
  await page.focus(pre);
  await page.press('ArrowRight', 'ArrowRight', 'ArrowRight');
  assert.ok(await page.get((s) => document.querySelector(s).scrollLeft > 0, pre), 'arrow keys scroll the code');
});

// ---------- terminal ----------
const hero = '.dd-code--terminal[data-dd-terminal-line-copy]';
const player = '.dd-code--terminal[data-dd-terminal-play]';
const live = '.dd-code--terminal[data-dd-terminal-interactive]';
const liveField = `${live} .dd-code__field`;
const screen = (page, sel) => page.get((s) => document.querySelector(`${s} code`).textContent, sel);
const termState = (page, sel) => page.attr(sel, 'data-dd-terminal-state');
const DEPLOY = 'npm run deploy -- --region eu-west-2\ncurl -sI https://insomnia.cxkw.dev | head -1';
// Reload in place (e.g. after changing emulated media) and wait for the behaviours to be back.
const reload = async (page) => {
  await page.send('Page.reload');
  for (let k = 0; k < 80; k++) {
    await page.sleep(100);
    try { if (await page.get(() => document.readyState === 'complete' && !!window.dd?.terminal)) break; } catch { /* navigating */ }
  }
  await page.sleep(300);
};

test('terminal: copy takes only the commands; each command line copies itself on hover', async ({ open, assert }) => {
  const page = await open('components/code');
  await grant(page);
  const all = `${hero} [data-dd-terminal-copy]`;
  await page.click(all);
  await page.waitFor((s) => document.querySelector(s).hasAttribute('data-copied'), { args: [all] });
  assert.equal(await clip(page), 'npm test -- menu\nnpm run build\nnpm run dev', 'commands only — no prompts, no output');
  assert.ok(await shown(page, all, 'check'), 'the bar button confirms');
  // Prompts can't be picked up by a manual selection either.
  assert.equal(await page.get((s) => getComputedStyle(document.querySelector(`${s} .dd-code__prompt`)).userSelect, hero), 'none');

  // Per-command copy: one quiet button per command line, shown on hover.
  assert.equal(await page.count(`${hero} .dd-code__line-copy`), 3);
  await page.get((s) => { document.querySelectorAll(`${s} .dd-code__line-copy`)[1].id = 'line-copy-build'; }, hero);
  assert.ok(!(await page.visible('#line-copy-build')), 'hidden until the line is hovered');
  await page.hover(`${hero} .dd-code__line:has(#line-copy-build)`);
  await page.waitFor(() => getComputedStyle(document.querySelector('#line-copy-build')).opacity === '1');
  assert.equal(await page.attr('#line-copy-build', 'aria-label'), 'Copy command: npm run build');
  await page.click('#line-copy-build');
  await page.waitFor(() => document.querySelector('#line-copy-build').hasAttribute('data-copied'));
  assert.equal(await clip(page), 'npm run build');
  // The buttons add nothing to the text of the block.
  assert.ok(!(await screen(page, hero)).includes('Copy'), 'no button text in the code');
});

test('terminal playback: waits to be seen, types the commands, then rests on a prompt', async ({ open, assert }) => {
  const page = await open('components/code');
  await page.get(() => { window.__played = 0; document.addEventListener('dd:terminalplayed', () => window.__played++); });
  // Off screen: armed on the first prompt with a cursor, nothing typed yet.
  assert.equal(await termState(page, player), 'playing');
  await page.sleep(800);
  assert.equal((await screen(page, player)).trim(), '$');
  assert.equal(await page.count(`${player} .dd-code__cursor`), 1);
  const reserved = await page.get((s) => document.querySelector(`${s} .dd-code__pre`).style.minHeight, player);
  assert.match(reserved, /px$/, 'the finished height is held so the page does not shift');

  await page.get((s) => document.querySelector(s).scrollIntoView({ block: 'center' }), player);
  await page.waitFor((s) => document.querySelector(`${s} code`).textContent.includes('npm run'), { args: [player], timeout: 4000 });
  const mid = await screen(page, player);
  assert.ok(!mid.includes('deployed'), 'output waits for the command');
  assert.ok(await page.exists(`${player}.is-typing, ${player} .dd-code__cursor`), 'a cursor while typing');

  await page.waitFor((s) => document.querySelector(s).dataset.ddTerminalState === 'done', { args: [player], timeout: 15000 });
  const text = await screen(page, player);
  assert.equal(text.split('\n').length, 8, 'every line, once');
  assert.match(text, /^\$ npm run deploy -- --region eu-west-2\n› building insomnia@2\.4\.0 \(vite\)/);
  assert.match(text, /✓ deployed dpl_7Hq2 to eu-west-2 in 41s\n\$ curl -sI https:\/\/insomnia\.cxkw\.dev \| head -1\nHTTP\/2 200\n\$ $/);
  assert.equal(await page.count(`${player} .dd-code__cursor`), 1, 'rests on a blinking prompt');
  assert.equal(await page.get((s) => getComputedStyle(document.querySelector(`${s} .dd-code__cursor`)).animationName, player), 'dd-code-blink');
  assert.equal(await page.get((s) => document.querySelector(`${s} .dd-code__pre`).style.minHeight, player), '');
  assert.equal(await page.get(() => window.__played), 1);
  // Tokens survive typing: the command is still coloured span by span.
  assert.equal(await page.text(`${player} .dd-code__line:first-child .dd-code__cmd`), 'npm');
  assert.deepEqual(await page.get((s) => [...document.querySelectorAll(`${s} .dd-code__line:first-child .dd-code__flag`)].map((f) => f.textContent), player), ['--', '--region']);
});

test('terminal playback: replay plays it again, copy works mid-play, a click skips to the end', async ({ open, assert }) => {
  const page = await open('components/code');
  await grant(page);
  await page.get((s) => document.querySelector(s).scrollIntoView({ block: 'center' }), player);
  await page.waitFor((s) => document.querySelector(s).dataset.ddTerminalState === 'done', { args: [player], timeout: 15000 });
  const final = await screen(page, player);

  await page.click(`${player} [data-dd-terminal-replay]`);
  assert.equal(await termState(page, player), 'playing');
  assert.ok(!(await screen(page, player)).includes('deployed'), 'starts over');
  await page.waitFor((s) => document.querySelector(`${s} code`).textContent.includes('npm'), { args: [player] });
  // Copy mid-play still copies every command, in full.
  await page.click(`${player} [data-dd-terminal-copy]`);
  await page.waitFor((s) => document.querySelector(`${s} [data-dd-terminal-copy]`).hasAttribute('data-copied'), { args: [player] });
  assert.equal(await clip(page), DEPLOY);

  // Click to skip.
  await page.click(`${player} .dd-code__pre`);
  assert.equal(await termState(page, player), 'done');
  assert.equal(await screen(page, player), final);
  // Replay again from the keyboard and let it finish.
  await page.focus(`${player} [data-dd-terminal-replay]`);
  await page.press('Enter');
  assert.equal(await termState(page, player), 'playing');
  await page.waitFor((s) => document.querySelector(s).dataset.ddTerminalState === 'done', { args: [player], timeout: 15000 });
  assert.equal(await screen(page, player), final);
});

test('live terminal: help, Enter, Tab completion, history, unknown commands, clear', async ({ open, assert }) => {
  const page = await open('components/code');
  await page.get(() => { window.__runs = []; document.addEventListener('dd:terminalrun', (e) => window.__runs.push(e.detail)); });
  const value = () => page.get((s) => document.querySelector(s).value, liveField);
  assert.equal(await page.count(liveField), 1, 'the last prompt is live');
  assert.equal(await page.get((s) => document.querySelector(s).tagName, liveField), 'INPUT');
  assert.match(await page.attr(liveField, 'aria-label'), /help/);
  await page.click(`${live} .dd-code__pre`);
  assert.equal(await page.active(), 'input.dd-code__field', 'a click anywhere focuses the prompt');

  // help lists the script's commands and the built-ins.
  await page.type('help');
  assert.equal(await page.text(`${live} .dd-code__live .dd-code__input`), 'help', 'typed text mirrors into the line');
  await page.press('Enter');
  await page.waitFor((s) => document.querySelector(`${s} code`).textContent.includes('clear the screen'), { args: [live] });
  const helped = await screen(page, live);
  for (const c of ['ls', 'git status', 'npm test -- menu', 'npm run build', 'npm run dev', 'whoami', 'clear']) assert.ok(helped.includes(c), `help lists ${c}`);
  assert.match(helped, /❯ help\n/, 'the typed line stays above the output');
  await page.waitFor((s) => document.querySelector(`${s} [aria-live="polite"]`).textContent.includes('this terminal knows'), { args: [live] });
  assert.equal(await value(), '');

  // Tab completes to the single match; Enter runs it against its template.
  await page.type('npm te');
  await page.press('Tab');
  assert.equal(await value(), 'npm test -- menu');
  assert.equal(await page.active(), 'input.dd-code__field', 'Tab with a match stays in the prompt');
  await page.press('Enter');
  await page.waitFor((s) => document.querySelector(`${s} code`).textContent.includes('3 passed, 0 failed'), { args: [live] });
  assert.equal(await page.count(`${live} .dd-code__ok`), 3, 'template markup keeps its classes');
  assert.ok(await page.exists(`${live} .dd-code__line.dd-code__out`), 'plain template lines read as output');
  // A typed command is highlighted like a hand-written one.
  assert.equal(await page.get((s) => [...document.querySelectorAll(`${s} .dd-code__line:not(.dd-code__live) .dd-code__input`)].pop().innerHTML.replace(/ class="dd-code__(\w+)"/g, ':$1'), live),
    '<span:cmd>npm</span> <span:sub>test</span> <span:flag>--</span> <span:arg>menu</span>');

  // Tab with several matches and nothing left to add lists them, like zsh.
  await page.type('npm run ');
  await page.press('Tab');
  assert.equal(await value(), 'npm run ');
  assert.match(await screen(page, live), /npm run build {3}npm run dev/);
  await page.get((s) => { const f = document.querySelector(s); f.value = ''; f.dispatchEvent(new Event('input')); }, liveField);

  // Unknown command: friendly message, and the command turns red.
  await page.type('nmp i');
  assert.ok(await page.exists(`${live} .dd-code__live .dd-code__err`), 'unknown command is red while typing');
  await page.press('Enter');
  await page.waitFor((s) => document.querySelector(`${s} code`).textContent.includes('see what it can run'), { args: [live] });
  assert.match(await screen(page, live), /❯ nmp i\ncommand not found: nmp\nthis is a small demo shell — type help to see what it can run\n/);

  // History: ↑ walks back (including the commands already on screen), ↓ returns to what you were typing.
  await page.type('git');
  await page.press('ArrowUp');
  assert.equal(await value(), 'nmp i');
  await page.press('ArrowUp');
  assert.equal(await value(), 'npm test -- menu');
  await page.press('ArrowUp', 'ArrowUp', 'ArrowUp');
  assert.equal(await value(), 'help', 'stops at the oldest entry');
  await page.press('ArrowDown', 'ArrowDown', 'ArrowDown');
  assert.equal(await value(), 'git', 'back to the draft');
  await page.press('Tab');
  assert.equal(await value(), 'git status');
  await page.press('Enter');
  await page.waitFor((s) => document.querySelector(`${s} code`).textContent.includes('On branch main'), { args: [live] });

  // clear empties the screen and keeps focus in the prompt.
  await page.type('clear');
  await page.press('Enter');
  assert.equal(await page.count(`${live} code > .dd-code__line`), 1);
  assert.equal(await page.active(), 'input.dd-code__field');
  // Copy in the bar takes the commands on screen — here, just the one run since clear.
  await page.type('whoami');
  await page.press('Enter');
  await page.waitFor((s) => document.querySelector(`${s} code`).textContent.includes('mostly after dusk'), { args: [live] });
  await grant(page);
  const copyAll = `${live} [data-dd-terminal-copy]`;
  await page.click(copyAll);
  await page.waitFor((s) => document.querySelector(s).hasAttribute('data-copied'), { args: [copyAll] });
  assert.equal(await clip(page), 'whoami');
  // Ctrl+L clears too; with nothing on screen, copy has nothing to confirm.
  await page.focus(liveField);
  await page.press({ key: 'l', ctrl: true });
  assert.equal(await page.count(`${live} code > .dd-code__line`), 1);
  await page.waitFor((s) => !document.querySelector(s).hasAttribute('data-copied'), { args: [copyAll], timeout: 2500 });
  await page.click(copyAll);
  await page.sleep(200);
  assert.ok(!(await page.get((s) => document.querySelector(s).hasAttribute('data-copied'), copyAll)));

  // With nothing to complete, Tab leaves the terminal — no focus trap.
  await page.focus(liveField);
  await page.press('Tab');
  assert.notEqual(await page.active(), 'input.dd-code__field');
  const runs = await page.get(() => window.__runs);
  assert.deepEqual(runs.map((r) => [r.command, r.known]), [['help', true], ['npm test -- menu', true], ['nmp i', false], ['git status', true], ['clear', true], ['whoami', true]]);
});

test('reduced motion: playback shows the final state at once and replay hides; live output is instant', async ({ open, assert }) => {
  const page = await open('components/code');
  await page.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await reload(page);
  // Without scrolling it into view, and without waiting.
  assert.equal(await termState(page, player), 'done');
  const text = await screen(page, player);
  assert.match(text, /✓ deployed dpl_7Hq2 to eu-west-2 in 41s/);
  assert.equal(text.split('\n').length, 8);
  assert.ok(!(await page.visible(`${player} [data-dd-terminal-replay]`)), 'nothing to replay');
  assert.equal(await page.count(`${player} .is-entering`), 0);
  await page.click(`${live} .dd-code__pre`);
  await page.type('npm run build');
  await page.press('Enter');
  assert.match(await screen(page, live), /✓ 74 pages built in 3\.41s/, 'output lands at once');
});

test('dusk: the terminal stays dark and every shell token holds 4.5:1 on its block', async ({ open, assert }) => {
  for (const theme of ['dusk', 'dawn']) {
    const page = await open('components/code', { theme });
    const ratios = await page.get(() => {
      const cv = document.createElement('canvas'); cv.width = cv.height = 1;
      const ctx = cv.getContext('2d', { willReadFrequently: true });
      const rgb = (c) => { ctx.clearRect(0, 0, 1, 1); ctx.fillStyle = c; ctx.fillRect(0, 0, 1, 1); return [...ctx.getImageData(0, 0, 1, 1).data].slice(0, 3); };
      const lum = (c) => c.map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }).reduce((a, v, i) => a + v * [0.2126, 0.7152, 0.0722][i], 0);
      const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
      const blocks = {
        terminal: document.querySelector('.dd-code--terminal'),
        block: [...document.querySelectorAll('.dd-code:not(.dd-code--terminal)')].find((f) => f.textContent.includes('shell tokens')),
      };
      const out = {};
      for (const [name, blk] of Object.entries(blocks)) {
        const bg = rgb(getComputedStyle(blk).backgroundColor);
        for (const t of ['prompt', 'user', 'cwd', 'cmd', 'sub', 'flag', 'arg', 'var', 'path', 'op', 'out', 'ok', 'warn', 'err', 'dim']) {
          const el = document.createElement('span'); el.className = `dd-code__${t}`; el.textContent = 'x';
          blk.querySelector('code').append(el);
          out[`${name} ${t}`] = +ratio(rgb(getComputedStyle(el).color), bg).toFixed(2);
          el.remove();
        }
        out[`${name} bg`] = lum(bg);
      }
      return out;
    });
    assert.ok(ratios['terminal bg'] < 0.02, `${theme}: the terminal is dark`);
    for (const [k, v] of Object.entries(ratios)) if (!k.endsWith(' bg')) assert.ok(v >= 4.5, `${theme}: ${k} is ${v}:1`);
    if (theme === 'dusk') {
      // And the live prompt works in dusk.
      await page.click(`${live} .dd-code__pre`);
      await page.type('ls');
      await page.press('Enter');
      await page.waitFor((s) => document.querySelector(`${s} code`).textContent.includes('package.json'), { args: [live] });
      assert.ok(await page.get((s) => document.querySelector(s).matches(':has(.dd-code__field:focus)'), live), 'focused terminal');
      assert.notEqual(await page.get((s) => getComputedStyle(document.querySelector(s)).boxShadow, live), 'none', 'a soft focus ring');
    }
  }
});

test('375px: the live prompt keeps the cursor in view on a long line', async ({ open, assert }) => {
  const page = await open('components/code', { width: 375 });
  await page.tap(`${live} .dd-code__pre`);
  assert.equal(await page.active(), 'input.dd-code__field');
  await page.type('npm run deploy -- --region eu-west-2 --force');
  const inView = await page.get((s) => {
    const pre = document.querySelector(`${s} .dd-code__pre`).getBoundingClientRect();
    const c = document.querySelector(`${s} .dd-code__live .dd-code__cursor`).getBoundingClientRect();
    return c.left >= pre.left && c.right <= pre.right;
  }, live);
  assert.ok(inView, 'cursor visible after a long line');
  assert.ok(await page.get(() => document.documentElement.scrollWidth <= innerWidth), 'the page does not scroll sideways');
  assert.equal(await page.get((s) => getComputedStyle(document.querySelector(s)).fontSize, liveField), '16px', 'no iOS zoom on focus');
});
