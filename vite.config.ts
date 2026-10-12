import { defineConfig, type Plugin } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

function pwaVersionPlugin(): Plugin {
  return {
    name: 'pwa-version-plugin',
    closeBundle() {
      const now = new Date();
      const timestamp = now.toISOString().replace(/[-:T.]/g, '').slice(0, 14);
      const buildTime = now.toISOString();
      const versionStr = `v1.1.0-${timestamp}`;

      const distSw = path.resolve(__dirname, 'dist', 'sw.js');
      if (fs.existsSync(distSw)) {
        let content = fs.readFileSync(distSw, 'utf-8');
        content = content.replace(
          /const CACHE_VERSION = '.*?';/,
          `const CACHE_VERSION = '${versionStr}'; // Build: ${buildTime}`
        );
        fs.writeFileSync(distSw, content, 'utf-8');
        console.log(`[PWA Plugin] sw.js actualizado con versión de caché única: ${versionStr}`);
      }

      const versionJsonPath = path.resolve(__dirname, 'dist', 'version.json');
      fs.writeFileSync(
        versionJsonPath,
        JSON.stringify({ version: versionStr, buildTime, app: 'Anaxagoras AI' }, null, 2),
        'utf-8'
      );
    }
  };
}

export default defineConfig({
  // Use relative base so it works on both localhost and GitHub Pages (mordaft.github.io/anaxagoras-ia-tr/)
  base: './',
  plugins: [pwaVersionPlugin()],
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
