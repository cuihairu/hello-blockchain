// Regenerate the social-preview (Open Graph) image at docs/public/og-image.png.
// Fixed 1200x630 canvas (the size every major platform crops to), brand purple
// #6d28d9 taken from logo.svg. Chromium (via the already-installed playwright)
// renders the SVG logo and the Noto Sans CJK lines far more faithfully than
// ImageMagick's internal MSVG rasterizer.
// Usage: node scripts/make-og-image.mjs
import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'node:fs';

const OUT = 'docs/public/og-image.png';
const logo = readFileSync('docs/public/logo.svg', 'utf8');

const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; overflow: hidden; position: relative;
    background: #fbfaff;
    font-family: 'Noto Sans CJK SC', 'Noto Sans CJK JP', 'DejaVu Sans', sans-serif;
  }
  .rail { position: absolute; inset: 0 auto 0 0; width: 14px; background: #6d28d9; }
  .panel { position: absolute; top: 0; bottom: 0; left: 1040px; right: 0; background: #ede9fe; }
  .logo { position: absolute; left: 90px; top: 140px; width: 200px; height: 200px; }
  .logo svg { width: 100%; height: 100%; display: block; }
  .title {
    position: absolute; left: 340px; top: 158px;
    font-family: 'DejaVu Sans', sans-serif; font-weight: 700;
    font-size: 72px; color: #1b1533; letter-spacing: -1px;
  }
  .tagline { position: absolute; left: 342px; top: 276px; font-size: 46px; font-weight: 700; color: #6d28d9; }
  .topics { position: absolute; left: 342px; top: 352px; font-size: 30px; color: #4a4360; }
  .url { position: absolute; left: 342px; top: 436px; font-size: 26px; color: #8a83a3; font-family: 'DejaVu Sans', sans-serif; }
</style>
</head>
<body>
  <div class="rail"></div>
  <div class="panel"></div>
  <div class="logo">${logo}</div>
  <div class="title">Hello Blockchain</div>
  <div class="tagline">区块链知识体系</div>
  <div class="topics">记账模型 · 共识算法 · 隐私技术 · 攻防 · 公链生态</div>
  <div class="url">cuihairu.github.io/hello-blockchain</div>
</body>
</html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: 'load' });
const png = await page.screenshot({ type: 'png' });
await browser.close();

writeFileSync(OUT, png);
console.log(`${OUT} ${png.length} bytes, 1200x630`);
