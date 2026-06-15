import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Separate config for the build-time SSR bundle (src/entry-server.tsx).
// Deliberately WITHOUT the Cloudflare plugin — that plugin rewrites SSR output
// into a Worker and strips our `render` export. This produces a plain Node ESM
// module (dist/server/entry-server.js) that snapshot.mjs imports to generate
// static HTML. No browser, runs in any CI.
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    ssr: true,
    outDir: 'dist/server',
    emptyOutDir: false,
    copyPublicDir: false,
    rollupOptions: {
      input: 'src/entry-server.tsx',
      output: { entryFileNames: 'entry-server.js', format: 'esm' },
    },
  },
})
