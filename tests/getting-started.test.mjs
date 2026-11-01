import { readFileSync } from 'node:fs';
import { test } from './lib/test.mjs';
const { version } = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
for (const width of [375, 1440]) test(`installation choices work at ${width}px`, async ({ open, assert }) => {
  const page = await open('getting-started', { width });
  assert.match(await page.text('main'), /npm install https:\/\/github.com\/cxkw-dev/);
  for (const kind of ['next', 'html', 'react']) {
    await page.click(`#setup-${kind}`);
    assert.equal(await page.attr(`#setup-${kind}`, 'aria-selected'), 'true');
    assert.ok(await page.visible(`#panel-${kind}`));
    assert.match(await page.attr(`#panel-${kind} a`, 'href'), new RegExp(`releases/download/v${version}/dawn-and-dusk-${kind}-${version}\\.zip$`));
  }
  assert.ok(await page.get(() => document.documentElement.scrollWidth <= innerWidth), 'no horizontal page overflow');
});
test('Tailwind setup shows the layered entry and opens from a shared link', async ({ open, assert }) => {
  const page = await open('getting-started');
  await page.get(() => { location.hash = 'tailwind'; });
  await page.sleep(100);
  assert.ok(await page.visible('#panel-tailwind'));
  assert.match(await page.text('#panel-tailwind'), /@import "tailwindcss";\s*@import "dawn-and-dusk\/tailwind\.css";/);
});
test('Next.js setup opens from a shared link', async ({ open, assert }) => {
  const page = await open('getting-started');
  await page.get(() => { location.hash = 'next'; });
  await page.sleep(100);
  assert.ok(await page.visible('#panel-next'));
});
