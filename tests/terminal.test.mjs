import { test } from './lib/test.mjs';

// A small live terminal of our own at the top of the code page: "slow" prints one line after `delay` ms, "ls" at once.
const mount = (page, { play = false, delay = 3000 } = {}) => page.get((p, d) => {
  const fig = document.createElement('figure');
  fig.id = 'tt';
  fig.className = 'dd-code dd-code--terminal';
  if (p) fig.setAttribute('data-dd-terminal-play', '');
  fig.setAttribute('data-dd-terminal-interactive', '');
  fig.dataset.ddTerminalSpeed = '1';
  fig.innerHTML = `<figcaption class="dd-code__bar"><span class="dd-code__actions"><button class="dd-code__action" type="button" data-dd-terminal-replay aria-label="Replay">R</button></span></figcaption>
<pre class="dd-code__pre" tabindex="-1"><code><span class="dd-code__line"><span class="dd-code__prompt">$ </span><span class="dd-code__input">echo hi</span></span>
<span class="dd-code__line dd-code__out">hi</span>
<span class="dd-code__line"><span class="dd-code__prompt">$ </span></span></code></pre>
<template data-dd-terminal-command="slow"><span class="dd-code__line dd-code__out" data-dd-terminal-delay="${d}">done</span></template>
<template data-dd-terminal-command="ls">a b c</template>`;
  document.querySelector('.doc-main').prepend(fig);
  fig.scrollIntoView({ block: 'center' });
  window.dd.terminal(fig);
}, play, delay);
const lines = (page) => page.get(() => [...document.querySelectorAll('#tt code > .dd-code__line')].map((l) => l.textContent.trim()));
const FIELD = '#tt .dd-code__field';

test('a replay while output is printing leaves the new prompt idle: no swallowed Enter, no phantom prompt', async ({ open, assert }) => {
  const page = await open('components/code');
  await mount(page, { play: true });
  const done = () => page.waitFor(() => document.querySelector('#tt').dataset.ddTerminalState === 'done' && !!document.querySelector('#tt .dd-code__field')?.isConnected, { timeout: 8000 });
  await done();
  await page.focus(FIELD);
  await page.type('slow');
  await page.press('Enter');
  await page.press('Enter'); // type-ahead while "slow" is still printing
  const t0 = Date.now();
  await page.click('#tt [data-dd-terminal-replay]');
  await done();
  assert.ok(Date.now() - t0 < 2500, 'replayed before "slow" would have finished');
  // The new prompt runs at once, though the cut-off "slow" is still waiting in the background.
  await page.focus(FIELD);
  await page.type('ls');
  await page.press('Enter');
  await page.waitFor(() => document.querySelector('#tt code').textContent.includes('a b c'), { timeout: 1000 });
  // Once that old run wakes, it prints nothing, and the waiting Enter from before the replay is gone.
  await page.sleep(Math.max(0, 3400 - (Date.now() - t0)));
  await page.type('ls');
  await page.press('Enter');
  await page.sleep(400);
  assert.deepEqual(await lines(page), ['$ echo hi', 'hi', '$ ls', 'a b c', '$ ls', 'a b c', '$']);
  assert.equal(await page.get(() => document.querySelector('#tt .dd-code__live').classList.contains('is-busy')), false);
});

test('run() waits for a command still printing, keeps what the visitor is typing, and Enter queues behind it', async ({ open, assert }) => {
  const page = await open('components/code');
  await mount(page, { delay: 400 });
  await page.focus(FIELD);
  await page.type('draft');
  const order = await page.get(async () => {
    const api = window.dd.terminal(document.querySelector('#tt'));
    const seen = [];
    await Promise.all([api.run('slow').then(() => seen.push('slow')), api.run('ls').then(() => seen.push('ls'))]);
    return seen;
  });
  assert.deepEqual(order, ['slow', 'ls'], 'one after the other');
  assert.deepEqual(await lines(page), ['$ echo hi', 'hi', '$ slow', 'done', '$ ls', 'a b c', '$ draft'], 'output not interleaved');
  assert.equal(await page.get((s) => document.querySelector(s).value, FIELD), 'draft', 'the typed text survives');
  // Enter while a run() is printing runs the field once that output is done.
  await page.get(() => { window.dd.terminal(document.querySelector('#tt')).run('slow'); });
  await page.press('Enter');
  await page.waitFor(() => document.querySelector('#tt code').textContent.includes('command not found: draft'), { timeout: 2000 });
  const after = (await lines(page)).slice(6);
  assert.deepEqual(after.slice(0, 3), ['$ slow', 'done', '$ draft']);
  assert.equal(await page.get((s) => document.querySelector(s).value, FIELD), '');
});
