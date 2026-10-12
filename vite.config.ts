import { defineConfig } from 'vite';

export default defineConfig({
  // Use relative base so it works on both localhost and GitHub Pages (mordaft.github.io/anaxagoras-ia-tr/)
  base: './',
  server: {
    port: 8086,
    host: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true
  }
});
