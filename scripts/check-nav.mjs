// Consistency gate for the doc site navigation (both locales).
// The site is bilingual: English pages at docs/, Chinese pages at docs/zh/.
// Each locale has its own hand-maintained sidebar (sidebar.en.json /
// sidebar.zh.json) that must stay aligned with the markdown files on disk.
// Fails the run on any drift:
//   - a sidebar link with no markdown file behind it (per locale)
//   - a markdown page missing from its locale's sidebar (home page excluded)
//   - an internal link inside any page that resolves to no page
//   - a content page that the locale's knowledge digest (/knowledge) never
//     cites (checked once that locale's digest page exists)
//   - a headline count in README / home page that drifted from the real data
//   - a README directory tree that misses a real docs/ or scripts/ entry, or
//     lists one that no longer exists
//   - an npm script that is undocumented in README, or documented but absent
// Usage: node scripts/check-nav.mjs
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, posix } from 'node:path';

const ROOT = 'docs';
const failures = [];
const norm = (r) => (r === '/' ? r : r.replace(/\/+$/, ''));

// --- collect pages per locale (case-sensitive, as the build server is) ---
// English pages live at the docs root, Chinese pages under docs/zh/; each
// locale's routes keep their URL prefix (/ for en, /zh for zh) so links can be
// resolved against the union while sidebar/digest coverage stays per locale.
const LOCALES = [
  { key: 'en', dir: ROOT, prefix: '', home: '/', skip: new Set(['.vitepress', 'public', 'img', 'zh']) },
  { key: 'zh', dir: join(ROOT, 'zh'), prefix: '/zh', home: '/zh', skip: new Set(['.vitepress', 'public', 'img']) }
];
const pages = new Set();          // union of every route, both locales
for (const loc of LOCALES) {
  loc.pages = new Set();
  (function walk(dir) {
    for (const f of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, f.name);
      if (f.isDirectory()) {
        if (loc.skip.has(f.name)) continue;
        walk(p);
      } else if (f.name.endsWith('.md') && f.name !== 'SUMMARY.md') {
        let route = norm(loc.prefix + '/' + p.slice(loc.dir.length + 1).replace(/\.md$/, ''));
        route = norm(route.replace(/\/index$/, '/'));
        loc.pages.add(route);
        pages.add(route);
      }
    }
  })(loc.dir);
}

const fileOf = (loc, page) =>
  join(loc.dir, page === '/' || page === '' ? 'index.md' : page.slice(1) + '.md');

// --- sidebar links, per locale ---
for (const loc of LOCALES) {
  const sidebar = JSON.parse(
    readFileSync(join(ROOT, `.vitepress/sidebar.${loc.key}.json`), 'utf8')
  );
  const sidebarLinks = [];
  (function collect(items) {
    for (const it of items) {
      if (it.link) sidebarLinks.push(norm(it.link));
      if (it.items) collect(it.items);
    }
  })(sidebar);
  loc.sidebarLinks = sidebarLinks;

  for (const link of sidebarLinks) {
    if (!pages.has(link)) failures.push(`sidebar link has no page: ${link}`);
  }
  // home page is the layout: home route and stays out of the sidebar
  for (const page of loc.pages) {
    if (page === loc.home) continue;
    if (!sidebarLinks.includes(page)) failures.push(`page missing from sidebar: ${page}`);
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
for (const loc of LOCALES) {
  for (const page of loc.pages) {
    const file = fileOf(loc, page);
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
}

// --- internal links inside pages must resolve, anchors must exist ---
const linkRe = /\]\(([^)\s]+)\)/g;
for (const loc of LOCALES) {
  for (const page of loc.pages) {
    const file = fileOf(loc, page);
    if (!existsSync(file)) continue;
    const text = readFileSync(file, 'utf8');
    for (const m of text.matchAll(linkRe)) {
      const href = m[1];
      if (/^(https?:|mailto:)/.test(href)) continue;
      const [rawPath, frag] = href.split('#');
      let target;
      if (!rawPath) target = page;                       // same-page anchor
      else if (rawPath.startsWith('/')) target = norm(rawPath);
      else {
        const base = posix.dirname(page === '/' ? '/index' : page);
        target = norm(posix.normalize(posix.join(base === '.' ? '/' : base, rawPath)));
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
}

// --- every content page must be cited in its locale's knowledge digest ---
// The digest (/knowledge, /zh/knowledge) is the site's index of concepts; a
// page that no digest entry links to is invisible from the entry point.
// Structural pages are exempt: the home page, the intro, the digest itself and
// the timelines. The check arms per locale once that digest page exists, so
// the English locale can be grown batch by batch.
const digestExempt = {
  en: ['/', '/Introduction', '/knowledge', '/timeline', '/consensus-timeline'],
  zh: ['/zh', '/zh/Introduction', '/zh/knowledge', '/zh/timeline', '/zh/consensus-timeline']
};
for (const loc of LOCALES) {
  const digestFile = join(loc.dir, 'knowledge.md');
  if (!existsSync(digestFile)) continue;
  const digest = readFileSync(digestFile, 'utf8');
  for (const page of loc.pages) {
    if (digestExempt[loc.key].includes(page)) continue;
    if (!digest.includes(`(${page})`)) failures.push(`page missing from knowledge digest: ${page}`);
  }
}

// --- headline counts quoted in README / home page must match the real data ---
// Each site surface advertises totals (article counts, timeline sizes); they
// silently rot as content grows, so the numbers are derived here and checked
// against the sentences that quote them. The Chinese tree is the canonical
// corpus: totals are derived from it, then the English pages must quote the
// same numbers with the fixed English phrases listed further below.
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
const consensusArticles = readdirSync(join(ROOT, 'zh/consensus'))
  .filter((f) => f.endsWith('.md') && f !== 'Consensus.md').length;
const timelineData = readFileSync(join(ROOT, '.vitepress/theme/data/timeline.ts'), 'utf8');
const timelineNodes = [...timelineData.matchAll(/^ {4}year: /gm)].length;
const timelinePeriods = [...timelineData.matchAll(/^ {4}name: /gm)].length;
const timelineDoc = readFileSync(join(ROOT, 'zh/consensus-timeline.md'), 'utf8');
const timelineEntries = dataRows(timelineDoc, '## 时间线总表');
const chainRows = dataRows(timelineDoc, '## 主链与共识对照表');

const zhClaims = [
  ['README.md', /(\d+) consensus algorithms/, consensusArticles, 'consensus articles'],
  ['README.md', /# Consensus algorithms:[^\n]*?(\d+) articles/, consensusArticles, 'consensus articles'],
  ['README.md', /# Development history timeline \((\d+) nodes/, timelineNodes, 'timeline nodes'],
  ['README.md', /# Consensus algorithm evolution timeline \((\d+) entries\)/, timelineEntries, 'timeline entries'],
  ['README.zh.md', /(\d+) 种共识算法/, consensusArticles, 'consensus articles'],
  ['README.zh.md', /# 共识算法：[^\n]*?(\d+) 篇/, consensusArticles, 'consensus articles'],
  ['README.zh.md', /# 发展史时间线（(\d+) 个节点/, timelineNodes, 'timeline nodes'],
  ['README.zh.md', /# 共识算法演进时间线（(\d+) 条年表）/, timelineEntries, 'timeline entries'],
  ['docs/zh/index.md', /(\d+) 种共识的原理/, consensusArticles, 'consensus articles'],
  ['docs/zh/index.md', /(\d+) 个节点五段分期/, timelineNodes, 'timeline nodes'],
  ['docs/zh/index.md', /(\d+) 条年表从/, timelineEntries, 'timeline entries'],
  ['docs/zh/index.md', /(\d+) 行主链映射/, chainRows, 'chain rows'],
  ['docs/zh/Introduction.md', /(\d+) 种共识的原理与取舍/, consensusArticles, 'consensus articles'],
  ['docs/zh/Introduction.md', /(\d+) 个节点五段分期/, timelineNodes, 'timeline nodes'],
  ['docs/zh/Introduction.md', /（(\d+) 条年表、/, timelineEntries, 'timeline entries'],
  ['docs/zh/Introduction.md', /、(\d+) 行主链映射）/, chainRows, 'chain rows'],
  ['docs/zh/timeline.md', /排列 (\d+) 个节点/, timelineNodes, 'timeline nodes'],
  ['docs/zh/timeline.md', /(\d+) 条年表与此页/, timelineEntries, 'timeline entries'],
  ['docs/zh/timeline.md', /此页 (\d+) 节点/, timelineNodes, 'timeline nodes'],
  ['docs/zh/knowledge.md', /(\d+) 行主链映射见/, chainRows, 'chain rows'],
  ['docs/zh/consensus-timeline.md', /约四十年，(\d+) 个节点/, timelineEntries, 'timeline entries'],
  ['docs/zh/consensus-timeline.md', /^([0-9]+) 条链，/m, chainRows, 'chain rows'],
  ['docs/zh/consensus-timeline.md', /(\d+) 篇算法详解/, consensusArticles, 'consensus articles'],
  ['docs/zh/consensus-timeline.md', /(\d+) 个节点互为补充/, timelineNodes, 'timeline nodes'],
];
for (const [file, re, expect, label] of zhClaims) {
  const abs = join(ROOT, '..', file);
  if (!existsSync(abs)) { failures.push(`${file}: file missing for ${label} claim`); continue; }
  const m = re.exec(readFileSync(abs, 'utf8'));
  if (!m) failures.push(`${file}: no ${label} claim found`);
  else if (Number(m[1]) !== expect) failures.push(`${file}: claims ${m[1]} ${label}, actual ${expect}`);
}

// English hub pages quote the same totals with fixed phrases; each armed as
// soon as the page exists, so the growing locale is checked incrementally.
const enClaims = [
  ['docs/index.md', `${consensusArticles} consensus algorithms`],
  ['docs/index.md', `${timelineNodes} timeline nodes`],
  ['docs/index.md', `${timelineEntries} timeline entries`],
  ['docs/index.md', `${chainRows} main-chain mapping rows`],
  ['docs/Introduction.md', `${consensusArticles} consensus algorithms`],
  ['docs/Introduction.md', `${timelineNodes} timeline nodes`],
  ['docs/Introduction.md', `${timelineEntries} timeline entries`],
  ['docs/Introduction.md', `${chainRows} main-chain mapping rows`],
  ['docs/timeline.md', `${timelineNodes} timeline nodes`],
  ['docs/timeline.md', `${timelineEntries} timeline entries`],
  ['docs/knowledge.md', `${chainRows} main-chain mapping rows`],
  ['docs/consensus-timeline.md', `${timelineEntries} timeline entries`],
  ['docs/consensus-timeline.md', `${chainRows} chains`],
  ['docs/consensus-timeline.md', `${consensusArticles} algorithm deep dives`],
  ['docs/consensus-timeline.md', `${timelineNodes} timeline nodes`],
];
for (const [file, phrase] of enClaims) {
  const abs = join(ROOT, '..', file);
  if (!existsSync(abs)) continue;
  if (!readFileSync(abs, 'utf8').includes(phrase)) {
    failures.push(`${file}: missing English claim "${phrase}"`);
  }
}
if (timelinePeriods !== 5) failures.push(`timeline periods: ${timelinePeriods} (home page says five eras)`);

// --- README directory trees must match what is really on disk ---
// The tree is the map readers use to find the site sources and the checks; an
// entry that exists on disk but not in the map (or the other way round) is the
// same class of drift as a sidebar link with no page behind it.
const treeEntryRe = /^\s*(?:[│|]\s*)*[├└]──\s*(\S+)/;
// docs/ holds the English tree, docs/zh/ the Chinese one; the README tree is
// read flat, so both levels plus scripts/ count as real entries.
const realEntries = new Set([
  ...readdirSync(ROOT).map((n) => n),
  ...readdirSync(join(ROOT, 'zh')).map((n) => n),
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
const total = LOCALES.reduce((n, l) => n + l.pages.size, 0);
const links = LOCALES.reduce((n, l) => n + l.sidebarLinks.length, 0);
if (unique.length) {
  console.error(`check-nav: ${unique.length} problem(s)`);
  for (const f of unique) console.error('  - ' + f);
  process.exit(1);
}
console.log(`check-nav: ok (${LOCALES.map((l) => `${l.key}: ${l.pages.size} pages`).join(', ')}; ${links} sidebar links)`);
