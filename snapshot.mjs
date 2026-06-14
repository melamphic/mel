/**
 * Content pre-render (snapshot) — runs AFTER prerender.mjs.
 *
 * prerender.mjs bakes per-route <head> (title, description, canonical, OG,
 * JSON-LD schema, author). This step fills the <body>: it serves dist, renders
 * each prerendered route in headless Chromium (so React.lazy routes resolve),
 * and injects the rendered #root HTML into the static file. Result: crawlers
 * and AI bots that don't run JS (GPTBot, ClaudeBot, PerplexityBot) see the full
 * page, not an empty shell.
 *
 * SAFE BY DESIGN: if a browser can't launch (e.g. a CI image without Chromium),
 * it logs a warning and exits 0 — the build still succeeds with head-only
 * prerendering, exactly as before. It can never break a deploy.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { resolve, dirname, join, relative, extname } from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, 'dist');
const PORT = 4178;

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.webp': 'image/webp', '.ico': 'image/x-icon', '.woff2': 'font/woff2',
  '.txt': 'text/plain', '.xml': 'application/xml',
};

// collect every prerendered route from dist/**/index.html
function collectRoutes() {
  const routes = [];
  (function walk(d) {
    for (const f of readdirSync(d)) {
      const p = join(d, f);
      if (statSync(p).isDirectory()) walk(p);
      else if (f === 'index.html') {
        const rel = relative(distDir, dirname(p));
        routes.push(rel === '' ? '/' : '/' + rel.split('\\').join('/'));
      }
    }
  })(distDir);
  return routes;
}

function startServer() {
  return new Promise((res) => {
    const server = createServer((req, reqRes) => {
      try {
        let urlPath = decodeURIComponent(req.url.split('?')[0]);
        let filePath = join(distDir, urlPath);
        if (!extname(filePath)) filePath = join(filePath, 'index.html');
        let body;
        try { body = readFileSync(filePath); }
        catch { body = readFileSync(join(distDir, 'index.html')); filePath = 'index.html'; }
        reqRes.setHeader('Content-Type', MIME[extname(filePath)] || 'application/octet-stream');
        reqRes.end(body);
      } catch { reqRes.statusCode = 404; reqRes.end(); }
    });
    server.listen(PORT, () => res(server));
  });
}

const run = async () => {
  let puppeteer;
  try { puppeteer = (await import('puppeteer')).default; }
  catch { console.warn('⚠️  snapshot: puppeteer not available — skipping content prerender'); return; }

  const routes = collectRoutes();
  const server = await startServer();
  let browser;
  try {
    browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
  } catch (e) {
    console.warn(`⚠️  snapshot: could not launch browser (${e.message}) — skipping content prerender`);
    server.close();
    return;
  }

  let done = 0;
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  for (const route of routes) {
    try {
      await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0', timeout: 30000 });
      await page.waitForFunction('document.getElementById("root") && document.getElementById("root").childElementCount > 0', { timeout: 15000 });
      const inner = await page.$eval('#root', (el) => el.innerHTML);
      if (!inner || inner.length < 200) continue; // skip if render looks empty
      const file = route === '/' ? resolve(distDir, 'index.html') : resolve(distDir, route.slice(1), 'index.html');
      const html = readFileSync(file, 'utf-8');
      const filled = html.replace('<div id="root"></div>', `<div id="root">${inner}</div>`);
      if (filled !== html) { writeFileSync(file, filled, 'utf-8'); done++; }
    } catch (e) {
      console.warn(`   snapshot: ${route} skipped (${e.message.split('\n')[0]})`);
    }
  }

  await browser.close();
  server.close();
  console.log(`✓ Snapshotted ${done}/${routes.length} pages (full HTML in <div id="root">)`);
};

run().catch((e) => { console.warn('⚠️  snapshot skipped:', e.message); process.exit(0); });
