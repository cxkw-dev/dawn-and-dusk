import { test } from './lib/test.mjs';
import { BASE } from './lib/browser.mjs';

const choose = (page, selector, value) => page.get((s,v) => { const input = document.querySelector(s); input.value = v; input.dispatchEvent(new Event('change', {bubbles:true})); input.dispatchEvent(new Event('input', {bubbles:true})); }, selector, value);
const fill = (page, selector, value) => page.get((s,v) => { const input = document.querySelector(s); input.value = v; input.dispatchEvent(new Event('input', {bubbles:true})); }, selector, value);

for (const theme of ['dawn','dusk']) for (const width of [375,1440]) test(`catalog and recipe layouts work in ${theme} at ${width}px`, async ({open,assert}) => {
  const page = await open('components', {theme,width});
  assert.equal(await page.count('[data-catalog-item]'),59);
  assert.match(await page.text('[data-catalog-item][data-query^="select "] .dd-badge'), /next release/);
  assert.equal(await page.get(() => document.documentElement.scrollWidth <= innerWidth),true);
  await page.click('[data-catalog-react]'); assert.equal(await page.count('[data-catalog-item]:not([hidden])'),10);
  await fill(page, '[data-catalog-query]', 'select'); assert.equal(await page.count('[data-catalog-item]:not([hidden])'),1);
  await fill(page, '[data-catalog-query]', 'no-such-component'); assert.ok(await page.visible('[data-catalog-empty]'));
  for (const route of ['settings','projects','sign-in']) {
    const recipe = await open(`recipes/${route}`,{theme,width});
    assert.equal(await recipe.get(() => document.documentElement.scrollWidth <= innerWidth),true,route+' has no overflow');
    assert.ok(await recipe.attr('[data-recipe-download]','data-recipe-download'));
  }
});

test('playground keeps native preview, React source, clipboard, and reset in sync', async ({open,assert}) => {
  const page = await open('components/button');
  await choose(page,'[data-play-option="variant"]','danger');
  await page.click('[data-play-option="loading"]');
  assert.ok(await page.exists('[data-play-preview] button.dd-btn--danger[disabled][aria-busy="true"]'));
  await choose(page,'[data-play-format]','react');
  assert.match(await page.get(() => document.querySelector('[data-play-source]').textContent), /<Button variant="danger" size="md" loading>/);
  await page.get(() => Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async t => { window.__copied=t; }}}));
  await page.click('[data-play-copy]'); assert.equal(await page.get(() => window.__copied), await page.get(() => document.querySelector('[data-play-source]').textContent));
  await page.click('[data-play-reset]'); assert.ok(await page.exists('[data-play-preview] .dd-btn--primary:not([disabled])'));
  const input = await open('components/text-input'); await input.click('[data-play-option="invalid"]');
  assert.equal(await input.attr('[data-play-preview] input','aria-invalid'),'true');
  const desc = await input.attr('[data-play-preview] input','aria-describedby');
  assert.equal(await input.text(`#${desc}`),'Enter a project name.');
});

test('settings validate, persist, restore and recover from blocked storage', async ({open,assert}) => {
  const page = await open('recipes/settings');
  await fill(page,'#workspace-name',' '); await page.click('[data-settings] [type="submit"]');
  assert.equal(await page.attr('#workspace-name','aria-invalid'),'true');
  await fill(page,'#workspace-name','My workspace'); await page.click('[data-settings] [type="submit"]');
  await page.waitFor(() => document.querySelector('[data-settings-status]').textContent.includes('Changes saved'));
  assert.equal(await page.get(() => JSON.parse(localStorage.getItem('dd-recipe-settings')).workspace),'My workspace');
  await page.get(() => location.reload()); await page.waitFor(() => document.querySelector('#workspace-name')?.value === 'My workspace');
  await page.get(() => { Storage.prototype.setItem = () => { throw new Error('Blocked'); }; });
  await page.click('[data-settings] [type="submit"]'); await page.waitFor(() => document.querySelector('[data-settings-status]').textContent.includes('could not be saved'));
  assert.equal(await page.get(() => document.querySelector('[data-settings] [type="submit"]').disabled),false);
});

test('project search, empty state, loading and failure retry work', async ({open,assert}) => {
  const page = await open('recipes/projects'); await page.waitFor(() => document.querySelector('tbody').children.length === 3);
  await fill(page,'#project-search','edge'); assert.equal(await page.count('tbody tr'),1);
  await fill(page,'#project-search','missing'); await page.waitFor(() => !document.querySelector('[data-project-empty]').hidden); assert.ok(await page.visible('[data-project-empty]'));
  await page.click('[data-project-clear]'); assert.equal(await page.count('tbody tr'),3);
  await choose(page,'[data-recipe-state]','loading'); assert.equal(await page.attr('[data-projects]','aria-busy'),'true');
  await choose(page,'[data-recipe-state]','error'); assert.ok(await page.visible('[data-project-error]'));
  await page.click('[data-project-retry]'); await page.waitFor(() => document.querySelector('[data-projects]').getAttribute('aria-busy') === 'false');
  assert.equal(await page.count('tbody tr'),3); assert.equal(await page.visible('[data-project-error]'),false);
});

test('sign-in validates, handles failure, enters a demo session and signs out', async ({open,assert}) => {
  const page = await open('recipes/sign-in');
  await page.click('[data-sign-in] [type="submit"]'); assert.equal(await page.visible('[data-session]'),false);
  await fill(page,'#sign-in-email','demo@example.com'); await fill(page,'#sign-in-password','test-password');
  await choose(page,'[data-recipe-state]','error'); await page.click('[data-sign-in] [type="submit"]');
  await page.waitFor(() => document.querySelector('[data-sign-in-status]').textContent.includes('could not be completed'));
  await choose(page,'[data-recipe-state]','ready'); await page.click('[data-sign-in] [type="submit"]');
  await page.waitFor(() => !document.querySelector('[data-session]').hidden);
  assert.equal(await page.visible('[data-sign-in] form'),false, 'the form leaves the screen after sign-in');
  assert.equal(await page.get(() => document.querySelector('#sign-in-password').value),'');
  await page.click('[data-sign-out]'); assert.equal(await page.visible('[data-session]'),false); assert.equal(await page.active(),'#sign-in-email');
});

test('section search finds validation and opens a real section anchor', async ({open,assert}) => {
  const page = await open('components/button'); await page.focus('#doc-find'); await page.type('validation');
  assert.ok(await page.count('[data-find-section]:not([hidden])') > 0);
  const target = await page.get(() => document.querySelector('[data-find-section]:not([hidden])').getAttribute('href'));
  assert.match(target,/#.+/);
  const dest = await open(new URL(target, BASE).href);
  assert.ok(await dest.get(() => !!document.getElementById(location.hash.slice(1))));
});

test('downloaded recipes run as standalone pages with their own JavaScript', async ({open,assert}) => {
  const { createServer } = await import('node:http');
  let html = '';
  const server = createServer((req,res) => { res.setHeader('Content-Type','text/html'); res.end(html); });
  await new Promise(resolve => server.listen(0,'127.0.0.1',resolve));
  try {
    for (const name of ['settings','projects','sign-in']) {
      const docs = await open(`recipes/${name}`);
      html = (await docs.attr('[data-recipe-download]','data-recipe-download')).replaceAll('https://cxkw-dev.github.io/dawn-and-dusk/release', `${BASE}release`);
      assert.match(html,/<!doctype html>/); assert.match(html,/<script>/);
      const page = await open(`http://127.0.0.1:${server.address().port}/${name}`);
      assert.equal(await page.exists('[data-recipe-state]'),false,'docs-only state control is absent');
      if (name === 'settings') {
        await fill(page,'#workspace-name','Downloaded workspace'); await page.click('[type="submit"]');
        await page.waitFor(() => document.querySelector('[data-settings-status]').textContent.includes('Changes saved'));
      } else if (name === 'projects') {
        await page.waitFor(() => document.querySelector('tbody').children.length === 3);
        await fill(page,'#project-search','nothing'); assert.equal(await page.count('tbody tr'),0);
      } else {
        await fill(page,'#sign-in-email','demo@example.com'); await fill(page,'#sign-in-password','test-password'); await page.click('[type="submit"]');
        await page.waitFor(() => !document.querySelector('[data-session]').hidden);
      }
    }
  } finally { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); }
});
