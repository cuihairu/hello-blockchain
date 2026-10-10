// External link health check for the doc site.
// Collects every external URL referenced with markdown link / image syntax or
// autolink syntax (code blocks are ignored: JSON samples legitimately use
// placeholder hosts like example.com), fetches each one with a bounded
// concurrency pool and reports the dead ones.
// Transient failures are retried; redirects are followed. A link counts as
// dead on DNS failure, timeout, or a 4xx/5xx status after retries.
// Usage: node scripts/check-links.mjs [--timeout 15000] [--concurrency 8]
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = 'docs';
const args = process.argv.slice(2);
const opt = (name, dflt) => {
  const i = args.indexOf(name);
  return i !== -1 && args[i + 1] ? Number(args[i + 1]) : dflt;
};
const TIMEOUT = opt('--timeout', 15000);
const CONCURRENCY = opt('--concurrency', 8);
const RETRIES = 3;

// --- collect external URLs from markdown link/image/autolink syntax ---
const urls = new Map(); // url -> Set(pages)
function walk(dir) {
  for (const f of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, f.name);
    if (f.isDirectory()) {
      if (f.name.startsWith('.') || f.name === 'public' || f.name === 'img') continue;
      walk(p);
    } else if (f.name.endsWith('.md') && f.name !== 'SUMMARY.md') {
      const route = '/' + p.slice(ROOT.length + 1).replace(/\.md$/, '');
      let text = readFileSync(p, 'utf8');
      // strip fenced code blocks and inline code so samples never get fetched
      text = text.replace(/```[^\n]*\n[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '');
      for (const m of text.matchAll(/\]\((https?:\/\/[^)\s]+)\)|<(https?:\/\/[^>\s]+)>/g)) {
        const url = (m[1] || m[2]).replace(/[.,;]+$/, '');
        if (!urls.has(url)) urls.set(url, new Set());
        urls.get(url).add(route);
      }
    }
  }
}
walk(ROOT);

const list = [...urls.keys()].sort();
console.log(`check-links: ${list.length} unique external URLs from ${ROOT}/`);

// --- fetch with a small pool and retries ---
const results = [];
let cursor = 0;

async function probe(url) {
  let lastErr = 'unknown error';
  for (let attempt = 0; attempt <= RETRIES; attempt++) {
    try {
      const resp = await fetch(url, {
        redirect: 'follow',
        signal: AbortSignal.timeout(TIMEOUT),
        headers: {
          // some hosts 403 bare fetchers; a browser-ish UA is the polite minimum
          'user-agent': 'Mozilla/5.0 (compatible; hello-blockchain link check)',
          accept: 'text/html,application/xhtml+xml,application/pdf,*/*'
        }
      });
      if (resp.ok) return { ok: true, status: resp.status };
      // 429/5xx may be transient, retry; 404/410 is a verdict
      lastErr = `HTTP ${resp.status}`;
      if (resp.status !== 429 && resp.status < 500) return { ok: false, status: resp.status, err: lastErr };
      if (resp.body) await resp.body.cancel().catch(() => {});
    } catch (e) {
      lastErr = (e && e.message ? e.message : String(e)).split('\n')[0];
    }
    if (attempt < RETRIES) await new Promise(r => setTimeout(r, 800 * (attempt + 1)));
  }
  return { ok: false, status: null, err: lastErr };
}

async function worker() {
  while (cursor < list.length) {
    const url = list[cursor++];
    const r = await probe(url);
    results.push({ url, ...r, pages: [...urls.get(url)] });
    if (!r.ok) console.log(`  DEAD ${url} (${r.err})`);
  }
}
await Promise.all(Array.from({ length: Math.min(CONCURRENCY, list.length) }, worker));

const dead = results.filter(r => !r.ok).sort((a, b) => a.url.localeCompare(b.url));
if (dead.length) {
  console.error(`check-links: ${dead.length} of ${list.length} external URLs dead`);
  for (const d of dead) {
    console.error(`  - ${d.url} (${d.err}) used by ${d.pages.slice(0, 5).join(', ')}${d.pages.length > 5 ? ', …' : ''}`);
  }
  process.exit(1);
}
console.log(`check-links: ok (${list.length} external URLs reachable)`);
