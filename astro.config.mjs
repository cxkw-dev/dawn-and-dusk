// @ts-check
import { defineConfig } from 'astro/config';

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
});
