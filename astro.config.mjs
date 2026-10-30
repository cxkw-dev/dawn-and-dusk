// @ts-check
import { defineConfig } from 'astro/config';
import { utimesSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// In dev, an edit to a component stylesheet doesn't always refresh the @import entry the docs load; touch the entry
// so the change shows up straight away.
const entry = fileURLToPath(new URL('./ds/dawn-and-dusk.css', import.meta.url));
const refreshEntry = {
  name: 'dd-refresh-css-entry',
  handleHotUpdate({ file }) {
    if (/\/ds\/.+\.css$/.test(file) && file !== entry) { const now = new Date(); utimesSync(entry, now, now); }
  },
};

// Docs site for the design system. Deployed to GitHub Pages at cxkw-dev.github.io/dawn-and-dusk.
export default defineConfig({
  site: 'https://cxkw-dev.github.io',
  base: '/dawn-and-dusk',
  srcDir: './site',
  publicDir: './site/public',
  outDir: './dist',
  trailingSlash: 'ignore',
  devToolbar: { enabled: false },
  // Prefetch docs pages on hover so moving between components feels instant.
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  vite: { plugins: [refreshEntry] },
});
