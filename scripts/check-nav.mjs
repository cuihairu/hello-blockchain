// Consistency gate for the doc site navigation.
// The sidebar is hand-maintained but must stay aligned with docs/SUMMARY.md
// (the mdbook-era TOC draft kept as the mapping source) and with the actual
// markdown files on disk. Fails the run on any drift:
//   - a sidebar link with no markdown file behind it
//   - a markdown page missing from the sidebar (home page excluded)
//   - a SUMMARY.md entry whose path is missing, differs only by letter case,
//     or points at a page that is not in the sidebar
//   - an internal link inside any page that resolves to no page
//   - a content page that the knowledge digest (/knowledge) never cites
//   - a headline count in README / home page that drifted from the real data
//   - a README directory tree that misses a real docs/ or scripts/ entry, or
//     lists one that no longer exists
//   - an npm script that is undocumented in README, or documented but absent
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

// --- heading anchors per page (same slugify as vitepress/markdown-it-anchor) ---
const rControl = new RegExp('[' + String.fromCharCode(0) + '-' + String.fromCharCode(31) + ']', 'g');
const rCombining = new RegExp('[' + String.fromCharCode(0x300) + '-' + String.fromCharCode(0x36f) + ']', 'g');
const rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'“”‘’<>,.?/]+/g;
function slugify(str) {
  return str.normalize('NFKD')
    .replace(rCombining, '')
    .replace(rControl, '')
    .replace(rSpecial, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/^(\d)/, '_$1')
    .toLowerCase();
}
const inlineText = (s) => s
  .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')   // images -> alt text
  .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')    // links -> link text
  .replace(/[*~`]/g, '')                     // emphasis / code markers
  .replace(/<[^>]+>/g, '')                    // inline html
  .trim();

const anchors = new Map(); // route -> Set(slug)
for (const page of pages) {
  const file = join(ROOT, page === '/' ? 'index.md' : page.slice(1) + '.md');
  if (!existsSync(file)) continue;
  const slugs = new Set();
  const dup = new Map();
  let inFence = false;
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) { inFence = !inFence; continue; }
    if (inFence) continue;
    const m = /^(#{1,6})\s+(.*?)\s*#*\s*$/.exec(line);
    if (!m) continue;
    const base = slugify(inlineText(m[2]));
    let slug = base;
    if (dup.has(base)) { dup.set(base, dup.get(base) + 1); slug = `${base}-${dup.get(base)}`; }
    else dup.set(base, 0);
    slugs.add(slug);
  }
  anchors.set(page, slugs);
}

// --- internal links inside pages must resolve, anchors must exist ---
const linkRe = /\]\(([^)\s]+)\)/g;
for (const page of pages) {
  const file = join(ROOT, page === '/' ? 'index.md' : page.slice(1) + '.md');
  if (!existsSync(file)) continue;
  const text = readFileSync(file, 'utf8');
  for (const m of text.matchAll(linkRe)) {
    const href = m[1];
    if (/^(https?:|mailto:)/.test(href)) continue;
    const [rawPath, frag] = href.split('#');
    let target;
    if (!rawPath) target = page;                       // same-page anchor
    else if (rawPath.startsWith('/')) target = rawPath.replace(/\/$/, '');
    else {
      const base = posix.dirname(page === '/' ? '/index' : page);
      target = posix.normalize(posix.join(base === '.' ? '/' : base, rawPath)).replace(/\/$/, '');
    }
    target = target.replace(/\.md$/, '');
    if (target === '') target = '/';
    if (!pages.has(target)) {
      // Non-page targets (images, downloads) must exist as real files.
      const asset = join(ROOT, target.replace(/^\//, ''));
      if (/\.[a-z0-9]+$/i.test(target) && existsSync(asset)) continue;
      failures.push(`${page}: dead internal link ${href}`);
      continue;
    }
    if (frag) {
      let decoded = frag;
      try { decoded = decodeURIComponent(frag); } catch { /* keep raw */ }
      const slugs = anchors.get(target);
      if (slugs && !slugs.has(decoded)) failures.push(`${page}: dead anchor ${href}`);
    }
  }
}

// --- every content page must be cited in the knowledge digest ---
// The digest (/knowledge) is the site's index of concepts; a page that no
// digest entry links to is invisible from the entry point. Structural pages
// are exempt: the home page, the intro, the digest itself and the timelines.
const digest = readFileSync(join(ROOT, 'knowledge.md'), 'utf8');
const digestExempt = new Set(['/', '/Introduction', '/knowledge', '/timeline', '/consensus-timeline']);
for (const page of pages) {
  if (digestExempt.has(page)) continue;
  if (!digest.includes(`(${page})`)) failures.push(`page missing from knowledge digest: ${page}`);
}

// --- headline counts quoted in README / home page must match the real data ---
// Each site surface advertises totals (article counts, timeline sizes); they
// silently rot as content grows, so the numbers are derived here and checked
// against the sentences that quote them.
function dataRows(md, heading) {
  const lines = md.split('\n');
  const start = lines.findIndex((l) => l.trim() === heading);
  if (start === -1) return -1;
  let rows = 0;
  for (let i = start + 1; i < lines.length; i++) {
    if (/^#{1,6}\s/.test(lines[i])) break;
    if (/^\|\s*[^-\s]/.test(lines[i])) rows++;   // pipe rows, separator excluded
  }
  return rows - 1;                                // drop the header row
}
const consensusArticles = readdirSync(join(ROOT, 'consensus'))
  .filter((f) => f.endsWith('.md') && f !== 'Consensus.md').length;
const timelineData = readFileSync(join(ROOT, '.vitepress/theme/data/timeline.ts'), 'utf8');
const timelineNodes = [...timelineData.matchAll(/^ {4}year: /gm)].length;
const timelinePeriods = [...timelineData.matchAll(/^ {4}name: /gm)].length;
const timelineDoc = readFileSync(join(ROOT, 'consensus-timeline.md'), 'utf8');
const timelineEntries = dataRows(timelineDoc, '## 时间线总表');
const chainRows = dataRows(timelineDoc, '## 主链与共识对照表');

const claims = [
  ['README.md', /(\d+) consensus algorithms/, consensusArticles, 'consensus articles'],
  ['README.md', /# Consensus algorithms:[^\n]*?(\d+) articles/, consensusArticles, 'consensus articles'],
  ['README.md', /# Development history timeline \((\d+) nodes/, timelineNodes, 'timeline nodes'],
  ['README.md', /# Consensus algorithm evolution timeline \((\d+) entries\)/, timelineEntries, 'timeline entries'],
  ['README.zh.md', /(\d+) 种共识算法/, consensusArticles, 'consensus articles'],
  ['README.zh.md', /# 共识算法：[^\n]*?(\d+) 篇/, consensusArticles, 'consensus articles'],
  ['README.zh.md', /# 发展史时间线（(\d+) 个节点/, timelineNodes, 'timeline nodes'],
  ['README.zh.md', /# 共识算法演进时间线（(\d+) 条年表）/, timelineEntries, 'timeline entries'],
  ['docs/index.md', /(\d+) 种共识的原理/, consensusArticles, 'consensus articles'],
  ['docs/index.md', /(\d+) 个节点五段分期/, timelineNodes, 'timeline nodes'],
  ['docs/index.md', /(\d+) 条年表从/, timelineEntries, 'timeline entries'],
  ['docs/index.md', /(\d+) 行主链映射/, chainRows, 'chain rows'],
  ['docs/Introduction.md', /(\d+) 种共识的原理与取舍/, consensusArticles, 'consensus articles'],
  ['docs/Introduction.md', /(\d+) 个节点五段分期/, timelineNodes, 'timeline nodes'],
  ['docs/Introduction.md', /（(\d+) 条年表、/, timelineEntries, 'timeline entries'],
  ['docs/Introduction.md', /、(\d+) 行主链映射）/, chainRows, 'chain rows'],
  ['docs/timeline.md', /排列 (\d+) 个节点/, timelineNodes, 'timeline nodes'],
  ['docs/timeline.md', /(\d+) 条年表与此页/, timelineEntries, 'timeline entries'],
  ['docs/timeline.md', /此页 (\d+) 节点/, timelineNodes, 'timeline nodes'],
  ['docs/knowledge.md', /(\d+) 行主链映射见/, chainRows, 'chain rows'],
  ['docs/consensus-timeline.md', /约四十年，(\d+) 个节点/, timelineEntries, 'timeline entries'],
  ['docs/consensus-timeline.md', /^([0-9]+) 条链，/m, chainRows, 'chain rows'],
  ['docs/consensus-timeline.md', /(\d+) 篇算法详解/, consensusArticles, 'consensus articles'],
  ['docs/consensus-timeline.md', /(\d+) 个节点互为补充/, timelineNodes, 'timeline nodes'],
];
for (const [file, re, expect, label] of claims) {
  const abs = join(ROOT, '..', file);
  if (!existsSync(abs)) { failures.push(`${file}: file missing for ${label} claim`); continue; }
  const m = re.exec(readFileSync(abs, 'utf8'));
  if (!m) failures.push(`${file}: no ${label} claim found`);
  else if (Number(m[1]) !== expect) failures.push(`${file}: claims ${m[1]} ${label}, actual ${expect}`);
}
if (timelinePeriods !== 5) failures.push(`timeline periods: ${timelinePeriods} (home page says five eras)`);

// --- README directory trees must match what is really on disk ---
// The tree is the map readers use to find the site sources and the checks; an
// entry that exists on disk but not in the map (or the other way round) is the
// same class of drift as a sidebar link with no page behind it.
const treeEntryRe = /^\s*(?:[│|]\s*)*[├└]──\s*(\S+)/;
const realEntries = new Set([
  ...readdirSync(ROOT).map((n) => n),
  ...readdirSync('scripts').map((n) => n)
]);
for (const file of ['README.md', 'README.zh.md']) {
  const abs = join(ROOT, '..', file);
  if (!existsSync(abs)) { failures.push(`${file}: file missing for directory tree check`); continue; }
  const listed = new Set();
  for (const line of readFileSync(abs, 'utf8').split('\n')) {
    const m = treeEntryRe.exec(line);
    if (!m) continue;
    const name = m[1].replace(/\/$/, '');
    listed.add(name);
    if (!realEntries.has(name)) failures.push(`${file}: tree lists unknown entry ${m[1]}`);
  }
  for (const name of realEntries) {
    if (!listed.has(name)) failures.push(`${file}: directory tree misses ${name}`);
  }
}

// --- README command list must match package.json scripts ---
// Every npm script the repo ships has to be documented (that is how readers
// find the gates), and every `npm run …` the READMEs advertise must exist.
const pkgScripts = new Set(Object.keys(JSON.parse(readFileSync('package.json', 'utf8')).scripts || {}));
for (const file of ['README.md', 'README.zh.md']) {
  const abs = join(ROOT, '..', file);
  if (!existsSync(abs)) continue;
  const documented = new Set(
    [...readFileSync(abs, 'utf8').matchAll(/npm run ([a-z:]+)/g)].map((m) => m[1])
  );
  for (const name of documented) {
    if (!pkgScripts.has(name)) failures.push(`${file}: documents missing script npm run ${name}`);
  }
  for (const name of pkgScripts) {
    if (!documented.has(name)) failures.push(`${file}: script not documented: ${name}`);
  }
}


const unique = [...new Set(failures)];
if (unique.length) {
  console.error(`check-nav: ${unique.length} problem(s)`);
  for (const f of unique) console.error('  - ' + f);
  process.exit(1);
}
console.log(`check-nav: ok (${pages.size} pages, ${sidebarLinks.length} sidebar links)`);
