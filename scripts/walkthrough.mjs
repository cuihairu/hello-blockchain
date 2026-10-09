// Full-site interactive walkthrough for the built site.
// Starts its own preview server, visits every route found in dist, and checks:
//   - every page returns 200 with non-trivial content
//   - zero console errors / page errors
//   - sidebar renders with active highlight on all non-home pages
//   - every internal link resolves to a real route (runtime dead-link check)
//   - DevTimeline component mounts and its filter interaction works
// Usage: npm run docs:walkthrough   (requires npm run docs:build first)
import { chromium } from 'playwright';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { spawn } from 'node:child_process';
import { createServer } from 'node:net';

const DIST = 'docs/.vitepress/dist';

// Pick a free port to avoid colliding with preview servers from other
// sessions/repos (a fixed port once collided with a parallel vitepress run).
const PORT = process.env.WALKTHROUGH_PORT || String(await new Promise((resolve, reject) => {
  const srv = createServer();
  srv.on('error', reject);
  srv.listen(0, '127.0.0.1', () => {
    const port = srv.address().port;
    srv.close(() => resolve(port));   // release the port before preview binds it
  });
}));
const BASE = `http://localhost:${PORT}`;

// 1. Enumerate routes from dist html files
const routes = [];
function walk(dir) {
  for (const f of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, f.name);
    if (f.isDirectory()) walk(p);
    else if (f.name.endsWith('.html')) {
      let r = p.slice(DIST.length).replace(/index\.html$/, '').replace(/\.html$/, '');
      if (r === '') r = '/';
      routes.push(r);
    }
  }
}
walk(DIST);

// 2. Start preview server — spawn the node entry directly so server.kill()
// reaches the real process (an npx wrapper would leave it orphaned)
const server = spawn(process.execPath,
  [join('node_modules', 'vitepress', 'bin', 'vitepress.js'), 'preview', 'docs', '--port', PORT],
  { stdio: ['ignore', 'ignore', 'pipe'] });
let serverErr = '';
server.stderr.on('data', d => { serverErr += d; });
async function waitServer() {
  for (let i = 0; i < 120; i++) {
    try {
      const r = await fetch(BASE + '/hello-blockchain/', { signal: AbortSignal.timeout(2000) });
      if (r.ok) return;
    } catch {}
    await new Promise(r => setTimeout(r, 250));
  }
  server.kill();
  throw new Error('preview server did not start on port ' + PORT + ': ' + serverErr.slice(-500));
}
await waitServer();

const browser = await chromium.launch();
const page = await browser.newPage();
const consoleErrors = [];
const pageErrors = [];
page.on('console', m => { if (m.type() === 'error') consoleErrors.push(page.url() + ' :: ' + m.text()); });
page.on('pageerror', e => pageErrors.push(page.url() + ' :: ' + e.message));

const routeSet = new Set(routes.map(r => r.replace(/\/$/, '')));
const badLinks = [];
let pagesVisited = 0;
let sidebarChecks = 0;
const sidebarFailures = [];

for (const route of routes) {
  const url = BASE + '/hello-blockchain' + (route === '/' ? '/' : route);
  let resp = null;
  for (let attempt = 0; attempt < 3; attempt++) {
    try { resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 }); break; }
    catch (e) {
      if (attempt === 2) badLinks.push(`PAGE ${route} goto failed: ${e.message.split('\n')[0]}`);
      await page.waitForTimeout(500);
    }
  }
  if (!resp || resp.status() !== 200) { badLinks.push(`PAGE ${route} status=${resp ? resp.status() : 'none'}`); continue; }
  pagesVisited++;
  await page.waitForTimeout(150);

  const textLen = (await page.textContent('#app main, #app .VPContent, #app') || '').length;
  if (textLen < 200) badLinks.push(`PAGE ${route} content too short (${textLen})`);

  const isHome = await page.locator('.VPHome').count() > 0;
  if (route !== '/404' && !route.startsWith('/404') && !isHome) {
    const sidebarLinks = await page.locator('.VPSidebar a').count();
    if (sidebarLinks < 20) sidebarFailures.push(`${route}: sidebar links=${sidebarLinks}`);
    else sidebarChecks++;
    const active = await page.locator('.VPSidebar a[aria-current="page"], .VPSidebar a.active').count();
    if (active === 0) sidebarFailures.push(`${route}: no active sidebar highlight`);
  }

  const hrefs = await page.$$eval('a[href]', as => as.map(a => a.getAttribute('href')));
  for (const h of new Set(hrefs)) {
    if (!h || !h.startsWith('/')) continue;
    if (h.startsWith('/hello-blockchain/assets')) continue;
    const clean = h.replace(/^\/hello-blockchain/, '').split('#')[0].replace(/\/$/, '');
    if (clean === '') { if (!routeSet.has('')) badLinks.push(`${route} -> ${h}`); continue; }
    if (!routeSet.has(clean)) badLinks.push(`${route} -> ${h}`);
  }
}

// DevTimeline interactive check on /timeline
await page.goto(BASE + '/hello-blockchain/timeline', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(300);
const chips = await page.locator('.dt-controls .chip').count();
const periods = await page.locator('.dt .period').count();
await page.locator('.dt-controls .chip').first().click();
const filterClickWorks = (await page.locator('.dt-controls .chip.is-active').count()) === 1;

const report = {
  pagesVisited,
  sidebarChecks,
  consoleErrors: consoleErrors.length,
  pageErrors: pageErrors.length,
  badLinks: badLinks.length,
  sidebarFailures: sidebarFailures.length,
  timeline: { chips, periods, filterClickWorks },
  samples: {
    consoleErrors: consoleErrors.slice(0, 5),
    pageErrors: pageErrors.slice(0, 5),
    badLinks: badLinks.slice(0, 10),
    sidebarFailures: sidebarFailures.slice(0, 5)
  }
};
console.log(JSON.stringify(report, null, 2));

await browser.close();
server.kill();
process.exit(badLinks.length || consoleErrors.length || pageErrors.length || sidebarFailures.length ? 1 : 0);
