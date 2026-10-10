// Consistency gate for the doc site navigation.
// The sidebar is hand-maintained but must stay aligned with docs/SUMMARY.md
// (the mdbook-era TOC draft kept as the mapping source) and with the actual
// markdown files on disk. Fails the run on any drift:
//   - a sidebar link with no markdown file behind it
//   - a markdown page missing from the sidebar (home page excluded)
//   - a SUMMARY.md entry whose path is missing, differs only by letter case,
//     or points at a page that is not in the sidebar
//   - an internal link inside any page that resolves to no page
// Usage: node scripts/check-nav.mjs
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, posix } from 'node:path';

const ROOT = 'docs';
const failures = [];

// --- collect pages on disk (case-sensitive, as the build server is) ---
const pages = new Set(); // route -> file
function walk(dir) {
  for (const f of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, f.name);
    if (f.isDirectory()) {
      if (f.name === '.vitepress' || f.name === 'public' || f.name === 'img') continue;
      walk(p);
    } else if (f.name.endsWith('.md') && f.name !== 'SUMMARY.md') {
      let route = '/' + p.slice(ROOT.length + 1).replace(/\.md$/, '');
      route = route.replace(/\/index$/, '');
      pages.add(route === '' ? '/' : route);
    }
  }
}
walk(ROOT);

// --- sidebar links ---
const sidebar = JSON.parse(readFileSync(join(ROOT, '.vitepress/sidebar.json'), 'utf8'));
const sidebarLinks = [];
(function collect(items) {
  for (const it of items) {
    if (it.link) sidebarLinks.push(it.link);
    if (it.items) collect(it.items);
  }
})(sidebar);

for (const link of sidebarLinks) {
  if (!pages.has(link)) failures.push(`sidebar link has no page: ${link}`);
}

// --- pages missing from sidebar (home page is the layout: home route) ---
for (const page of pages) {
  if (page === '/') continue;
  if (!sidebarLinks.includes(page)) failures.push(`page missing from sidebar: ${page}`);
}

// --- SUMMARY.md entries ---
const summary = readFileSync(join(ROOT, 'SUMMARY.md'), 'utf8');
const summaryPaths = [...summary.matchAll(/\]\(([^)]+)\)/g)]
  .map(m => m[1].split('#')[0])
  .filter(p => p && !/^https?:/.test(p));

const lowerIndex = new Map();
for (const page of pages) lowerIndex.set(page.toLowerCase(), page);

for (const raw of summaryPaths) {
  const route = '/' + raw.replace(/^\.\//, '').replace(/^\//, '').replace(/\.md$/, '').replace(/\/index$/, '');
  if (pages.has(route)) {
    if (!sidebarLinks.includes(route)) failures.push(`summary entry not in sidebar: ${route}`);
  } else if (lowerIndex.has(route.toLowerCase())) {
    failures.push(`summary path case mismatch: ${raw} (actual ${lowerIndex.get(route.toLowerCase())})`);
  } else {
    failures.push(`summary entry has no page: ${raw}`);
  }
}

// --- internal links inside pages must resolve ---
const linkRe = /\]\(([^)\s]+)\)/g;
for (const page of pages) {
  const file = join(ROOT, page === '/' ? 'index.md' : page.slice(1) + '.md');
  if (!existsSync(file)) continue;
  const text = readFileSync(file, 'utf8');
  for (const m of text.matchAll(linkRe)) {
    const href = m[1];
    if (/^(https?:|mailto:|#)/.test(href)) continue;
    const [path] = href.split('#');
    if (!path) continue;
    let target;
    if (path.startsWith('/')) target = path.replace(/\/$/, '');
    else {
      const base = posix.dirname(page === '/' ? '/index' : page);
      target = posix.normalize(posix.join(base === '.' ? '/' : base, path)).replace(/\/$/, '');
    }
    target = target.replace(/\.md$/, '');
    if (target === '') continue;
    if (pages.has(target)) continue;
    // Non-page targets (images, downloads) must exist as real files.
    const asset = join(ROOT, target.replace(/^\//, ''));
    if (/\.[a-z0-9]+$/i.test(target) && existsSync(asset)) continue;
    failures.push(`${page}: dead internal link ${href}`);
  }
}

if (failures.length) {
  console.error(`check-nav: ${failures.length} problem(s)`);
  for (const f of failures) console.error('  - ' + f);
  process.exit(1);
}
console.log(`check-nav: ok (${pages.size} pages, ${sidebarLinks.length} sidebar links)`);
