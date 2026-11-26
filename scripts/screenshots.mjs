// Screenshots of the built site next to renders of design-reference/source/*.dc.html.
// Usage: npm run build && npx vite preview --port 4173   (in another terminal)
//        npm run shots -- [selector] [url]     e.g.  npm run shots -- "#top"
// Output: .shots/  (gitignored). Uses the installed Microsoft Edge (or Chrome).
import { chromium } from 'playwright';
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { routeCdns } from './ref-cdn.mjs';

const root = path.resolve(import.meta.dirname, '..');
const out = path.join(root, '.shots');
await mkdir(out, { recursive: true });

const selector = process.argv[2] ?? '#top';
const site = process.argv[3] ?? 'http://localhost:4173/';
const tag = selector.replace(/[^a-z0-9]+/gi, '') || 'page';
const refDir = path.join(root, 'design-reference', 'source');

const browser = await chromium.launch({ channel: existsSync('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe') ? 'msedge' : 'chrome' });

async function shoot({ url, width, file, ref, height = 900 }) {
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  if (ref) await routeCdns(page);
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(ref ? 300 : 1800); // let the intro finish
  if (!ref) {
    // Scroll through the page so every scroll-triggered reveal has played.
    const total = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < total; y += 350) {
      await page.evaluate((top) => window.scrollTo(0, top), y);
      await page.waitForTimeout(90);
    }
    await page.waitForTimeout(1500);
  }
  // Keep the compact bar (it slides in on scroll-up) out of section captures.
  if (!ref) await page.addStyleTag({ content: '[data-sticky-bar],[data-progress]{display:none!important}' });
  const el = page.locator(selector).first();
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(ref ? 100 : 700);
  await el.screenshot({ path: file, animations: 'disabled' });
  await ctx.close();
  return file;
}

async function label(file, text) {
  const img = sharp(file);
  const { width } = await img.metadata();
  const bar = Buffer.from(
    `<svg width="${width}" height="44"><rect width="100%" height="100%" fill="#111"/><text x="14" y="29" font-family="Segoe UI, Arial" font-size="20" fill="#fff">${text.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</text></svg>`,
  );
  return sharp({ create: { width, height: 44, channels: 3, background: '#111' } })
    .composite([{ input: bar }])
    .png()
    .toBuffer()
    .then(async (head) => {
      const body = await img.png().toBuffer();
      const h = (await sharp(body).metadata()).height;
      return sharp({ create: { width, height: h + 44, channels: 3, background: '#fff' } })
        .composite([{ input: head, top: 0, left: 0 }, { input: body, top: 44, left: 0 }])
        .png()
        .toBuffer();
    });
}

async function pair(a, aLabel, b, bLabel, outFile, direction = 'row') {
  const [ia, ib] = await Promise.all([label(a, aLabel), label(b, bLabel)]);
  const [ma, mb] = await Promise.all([sharp(ia).metadata(), sharp(ib).metadata()]);
  const gap = 24;
  const width = direction === 'row' ? ma.width + mb.width + gap : Math.max(ma.width, mb.width);
  const height = direction === 'row' ? Math.max(ma.height, mb.height) : ma.height + mb.height + gap;
  await sharp({ create: { width, height, channels: 3, background: '#ddd' } })
    .composite([
      { input: ia, left: 0, top: 0 },
      direction === 'row' ? { input: ib, left: ma.width + gap, top: 0 } : { input: ib, left: 0, top: ma.height + gap },
    ])
    .png()
    .toFile(outFile);
  console.log('wrote', path.relative(root, outFile));
}

const ref = (f) => pathToFileURL(path.join(refDir, f)).href;
const p = (name) => path.join(out, name);

// Optional 4th argument: a reference page name (e.g. "CaseStudy") for non-home routes.
const refPage = process.argv[4];
if (refPage) {
  await shoot({ url: ref(`${refPage}.dc.html`), width: 1440, file: p(`ref-${refPage}-1440-${tag}.png`), ref: true });
  await shoot({ url: ref(`${refPage}.dc.html`), width: 768, file: p(`ref-${refPage}-768-${tag}.png`), ref: true });
  for (const w of [375, 768, 1024, 1440]) await shoot({ url: site, width: w, file: p(`site-${refPage}-${w}-${tag}.png`) });
  await pair(p(`ref-${refPage}-1440-${tag}.png`), `Design: ${refPage}.dc.html @1440`, p(`site-${refPage}-1440-${tag}.png`), 'Build @1440', p(`compare-${refPage}-1440-${tag}.png`), 'column');
  await pair(p(`ref-${refPage}-768-${tag}.png`), `Design: ${refPage}.dc.html @768`, p(`site-${refPage}-768-${tag}.png`), 'Build @768', p(`compare-${refPage}-768-${tag}.png`));
  await pair(p(`ref-${refPage}-768-${tag}.png`), `Design: ${refPage}.dc.html @768 (no mobile artboard)`, p(`site-${refPage}-375-${tag}.png`), 'Build @375', p(`compare-${refPage}-375-${tag}.png`));
  await browser.close();
  process.exit(0);
}

// Reference renders
await shoot({ url: ref('Mobile.dc.html'), width: 390, file: p(`ref-mobile-390-${tag}.png`), ref: true });
await shoot({ url: ref('Main.dc.html'), width: 768, file: p(`ref-main-768-${tag}.png`), ref: true });
await shoot({ url: ref('Main.dc.html'), width: 1024, file: p(`ref-main-1024-${tag}.png`), ref: true });
await shoot({ url: ref('Main.dc.html'), width: 1440, file: p(`ref-main-1440-${tag}.png`), ref: true });

// Our build
for (const w of [375, 390, 768, 1024, 1440]) await shoot({ url: site, width: w, file: p(`site-${w}-${tag}.png`) });

await pair(p(`ref-mobile-390-${tag}.png`), 'Design: Mobile.dc.html @390', p(`site-375-${tag}.png`), 'Build @375', p(`compare-375-${tag}.png`));
await pair(p(`ref-mobile-390-${tag}.png`), 'Design: Mobile.dc.html @390', p(`site-390-${tag}.png`), 'Build @390', p(`compare-390-${tag}.png`));
await pair(p(`ref-main-768-${tag}.png`), 'Design: Main.dc.html @768 (collapses <860)', p(`site-768-${tag}.png`), 'Build @768', p(`compare-768-${tag}.png`));
await pair(p(`ref-main-1024-${tag}.png`), 'Design: Main.dc.html @1024', p(`site-1024-${tag}.png`), 'Build @1024', p(`compare-1024-${tag}.png`), 'column');
await pair(p(`ref-main-1440-${tag}.png`), 'Design: Main.dc.html @1440', p(`site-1440-${tag}.png`), 'Build @1440', p(`compare-1440-${tag}.png`), 'column');

await browser.close();
