/**
 * Content pre-render (SSG) — runs AFTER prerender.mjs.
 *
 * prerender.mjs bakes per-route <head> (title, description, canonical, OG,
 * JSON-LD schema, author). This step fills the <body>: it imports the Node SSR
 * bundle (built from src/entry-server.tsx) and renders each prerendered route
 * to an HTML string — NO browser required — then injects it into the static
 * file's <div id="root">. Crawlers + AI bots that don't run JS see full content.
 *
 * Pure Node, so it runs in ANY build environment (Cloudflare Pages, CI, local)
 * — unlike a headless-browser snapshot. If the SSR bundle is missing or a route
 * throws, it logs and continues; the build still succeeds with head-only output.
 */
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'fs';
import { resolve, dirname, join, relative } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, 'dist');
const ssrEntry = resolve(__dirname, 'dist/server/entry-server.js');

function collectRoutes() {
  const routes = [];
  (function walk(d) {
    for (const f of readdirSync(d)) {
      if (d === resolve(distDir, 'server')) continue; // skip the SSR bundle dir
      const p = join(d, f);
      if (statSync(p).isDirectory()) { if (p !== resolve(distDir, 'server')) walk(p); }
      else if (f === 'index.html') {
        const rel = relative(distDir, dirname(p));
        routes.push(rel === '' ? '/' : '/' + rel.split('\\').join('/'));
      }
    }
  })(distDir);
  return routes;
}

const run = async () => {
  if (!existsSync(ssrEntry)) {
    console.warn('⚠️  snapshot: SSR bundle not found at dist/server/entry-server.js — skipping content prerender');
    return;
  }
  let render;
  try { ({ render } = await import(pathToFileURL(ssrEntry).href)); }
  catch (e) { console.warn(`⚠️  snapshot: could not load SSR bundle (${e.message}) — skipping`); return; }

  const routes = collectRoutes();
  let done = 0;
  for (const route of routes) {
    try {
      const inner = render(route);
      if (!inner || inner.length < 200) continue; // skip empty/redirect routes
      const file = route === '/' ? resolve(distDir, 'index.html') : resolve(distDir, route.slice(1), 'index.html');
      const html = readFileSync(file, 'utf-8');
      const filled = html.replace('<div id="root"></div>', `<div id="root">${inner}</div>`);
      if (filled !== html) { writeFileSync(file, filled, 'utf-8'); done++; }
    } catch (e) {
      console.warn(`   snapshot: ${route} skipped (${String(e.message).split('\n')[0]})`);
    }
  }
  console.log(`✓ Snapshotted ${done}/${routes.length} pages (server-rendered HTML in <div id="root">)`);
};

run().catch((e) => { console.warn('⚠️  snapshot skipped:', e.message); process.exit(0); });
