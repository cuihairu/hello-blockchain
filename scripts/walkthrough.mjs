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

// Two locales share one build: English routes at /, Chinese under /zh/. Each
// locale's sidebar is its own file; the "did the sidebar render at all" floor
// is its top-level entry count (a group label is itself a link, so every
// top-level item contributes at least one rendered anchor).
const sidebarFloor = {
  en: JSON.parse(readFileSync('docs/.vitepress/sidebar.en.json', 'utf8')).length,
  zh: JSON.parse(readFileSync('docs/.vitepress/sidebar.zh.json', 'utf8')).length
};
const localeOf = (route) => (route.startsWith('/zh') ? 'zh' : 'en');

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

// Routes whose markdown source contains math ($$…$$ or $…$, code fences
// stripped) must render MathJax output — a silent regression class where the
// build stays green but formulas end up as raw dollar text.
const mathRoutes = new Set();
(function scanMath(dir) {
  for (const f of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, f.name);
    if (f.isDirectory()) {
      if (f.name.startsWith('.') || f.name === 'public' || f.name === 'img') continue;
      scanMath(p);
    } else if (f.name.endsWith('.md') && f.name !== 'SUMMARY.md') {
      const src = readFileSync(p, 'utf8').replace(/```[^\n]*\n[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '');
      if (/\$\$[\s\S]+?\$\$|\$(?!\s)[^$\n]+?[^\s]\$(?!\.)/.test(src)) {
        mathRoutes.add('/' + p.slice(5).replace(/\.md$/, ''));
      }
    }
  }
})('docs');

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
let mathChecks = 0;
let switcherMissing = 0;
const sidebarFailures = [];

// The two locales are mirrors of one another. While the English tree is being
// translated page by page, the switcher's links to not-yet-translated pages
// are tolerated (counted as translation debt); once both trees hold the same
// number of pages the invariant becomes a hard failure.
const pageRoutes = routes.filter(r => !r.startsWith('/404'));
const enPages = pageRoutes.filter(r => !r.startsWith('/zh')).length;
const zhPages = pageRoutes.filter(r => r.startsWith('/zh')).length;
const localesMirrored = enPages === zhPages;

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
  // The 404 route is a deliberately short page (title + hint + two actions).
  const minLen = route === '/404' || route.startsWith('/404') ? 100 : 200;
  if (textLen < minLen) badLinks.push(`PAGE ${route} content too short (${textLen})`);

  const isHome = await page.locator('.VPHome').count() > 0;
  if (isHome) {
    // Every home feature card must be a real link, not a static div.
    const features = await page.locator('.VPFeature').count();
    const linked = await page.locator('a.VPFeature').count();
    if (features > 0 && linked < features) {
      badLinks.push(`HOME ${route} feature cards without link: ${features - linked}/${features}`);
    }
  }
  if (!isHome && !route.startsWith('/404')) {
    const sidebarLinks = await page.locator('.VPSidebar a').count();
    const floor = sidebarFloor[localeOf(route)];
    if (sidebarLinks < floor) sidebarFailures.push(`${route}: sidebar links=${sidebarLinks} (floor ${floor})`);
    else sidebarChecks++;
    const active = await page.locator('.VPSidebar a[aria-current="page"], .VPSidebar a.active').count();
    if (active === 0) sidebarFailures.push(`${route}: no active sidebar highlight`);
  }

  // Pages with math in the source must show rendered formulas, not raw $…$.
  if (mathRoutes.has(route.replace(/\/$/, ''))) {
    const mathCount = await page.locator('mjx-container').count();
    if (mathCount === 0) badLinks.push(`PAGE ${route} has math source but no rendered math`);
    else mathChecks++;
  }

  const hrefs = await page.$$eval('a[href]', as =>
    as.map(a => ({ h: a.getAttribute('href'), alt: a.getAttribute('rel') === 'alternate' }))
  );
  const hrefMap = new Map();
  for (const { h, alt } of hrefs) hrefMap.set(h, (hrefMap.get(h) || false) || alt);
  for (const [h, alt] of hrefMap) {
    if (!h || !h.startsWith('/')) continue;
    if (h.startsWith('/hello-blockchain/assets')) continue;
    const clean = h.replace(/^\/hello-blockchain/, '').split('#')[0].replace(/\/$/, '');
    if (clean === '') { if (!routeSet.has('')) badLinks.push(`${route} -> ${h}`); continue; }
    if (!routeSet.has(clean)) {
      // The official language switcher links every page to its counterpart in the
      // other locale. While the English locale is being translated page by page
      // those targets legitimately do not exist yet, so they are counted as
      // translation debt instead of failing the run.
      if (alt) {
        // the 404 route is synthetic (one html for both locales), its switcher
        // counterpart can never exist as a route
        if (!route.startsWith('/404')) switcherMissing++;
        continue;
      }
      badLinks.push(`${route} -> ${h}`);
    }
  }
}

// DevTimeline interactive check on the timeline pages of every locale that has
// one. Retry: the preview server can briefly refuse a connection right after
// the crawl, same class of flake as the per-page goto retries above.
const timelineResults = [];
let timelineOk = false;
for (const route of ['/timeline', '/zh/timeline']) {
  if (!routeSet.has(route)) continue;
  let navError = '';
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      await page.goto(BASE + '/hello-blockchain' + route, { waitUntil: 'domcontentloaded', timeout: 20000 });
      break;
    } catch (e) {
      navError = e.message.split('\n')[0];
      await page.waitForTimeout(500);
    }
  }
  if (navError) { badLinks.push(`PAGE ${route} goto failed: ${navError}`); continue; }
  await page.waitForTimeout(300);
  const chips = await page.locator('.dt-controls .chip').count();
  const periods = await page.locator('.dt .period').count();
  if (chips > 0) {
    await page.locator('.dt-controls .chip').first().click();
  }
  const filterClickWorks = chips > 0 && (await page.locator('.dt-controls .chip.is-active').count()) === 1;
  const ok = chips > 0 && periods > 0 && filterClickWorks;
  if (!ok) {
    badLinks.push(`PAGE ${route} DevTimeline chips=${chips} periods=${periods} filterClick=${filterClickWorks}`);
  } else {
    timelineOk = true;
  }
  timelineResults.push({ route, chips, periods, filterClickWorks, ok });
}

if (switcherMissing > 0 && localesMirrored) {
  badLinks.push(`${switcherMissing} language switcher links have no counterpart page`);
}

const report = {
  pagesVisited,
  sidebarChecks,
  mathChecks,
  enPages,
  zhPages,
  localesMirrored,
  switcherMissing,
  consoleErrors: consoleErrors.length,
  pageErrors: pageErrors.length,
  badLinks: badLinks.length,
  sidebarFailures: sidebarFailures.length,
  timeline: timelineResults,
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
process.exit(badLinks.length || consoleErrors.length || pageErrors.length || sidebarFailures.length || !timelineOk ? 1 : 0);
