// Captures the hero of each live project site (1440x900, desktop) into
// assets/source/ for `npm run images`, and prints the page's own title,
// description and opening text so project copy can be checked against it.
// Usage: node scripts/capture-sites.mjs
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const outDir = path.join(root, 'assets', 'source');
await mkdir(outDir, { recursive: true });

const sites = [
  { name: 'bestlifevacations', url: 'https://blvagent.app/' },
  { name: 'rer', url: 'https://rerapp.ai/' },
  { name: 'smguru', url: 'https://smguru.ai/' },
];

const browser = await chromium.launch({ channel: existsSync('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe') ? 'msedge' : 'chrome' });
for (const site of sites) {
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })).newPage();
  try {
    await page.goto(site.url, { waitUntil: 'networkidle', timeout: 45000 });
  } catch (e) {
    console.log(`!! ${site.url}: ${String(e).split('\n')[0]}`);
  }
  await page.waitForTimeout(2500); // let hero animations settle
  // Close temporary notice banners (e.g. "We're migrating…") so they aren't in the capture.
  const closed = await page.evaluate(() => {
    const candidates = [...document.querySelectorAll('button, [role="button"]')].filter((el) => {
      const r = el.getBoundingClientRect();
      const label = `${el.getAttribute('aria-label') ?? ''} ${el.textContent ?? ''}`.trim();
      return r.top < 120 && r.width > 0 && r.width < 64 && /^(×|✕|x|close|dismiss)/i.test(label);
    });
    candidates.forEach((el) => el.click());
    return candidates.length;
  });
  if (closed) await page.waitForTimeout(800);
  const info = await page.evaluate(() => ({
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.content ?? '',
    ogDescription: document.querySelector('meta[property="og:description"]')?.content ?? '',
    text: document.body.innerText.replace(/\s+/g, ' ').slice(0, 1800),
  }));
  console.log(`\n== ${site.name} (${page.url()})\nTITLE: ${info.title}\nMETA: ${info.description}\nOG: ${info.ogDescription}\nTEXT: ${info.text}`);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: path.join(outDir, `${site.name}.png`), clip: { x: 0, y: 0, width: 1440, height: 900 } });
  await page.context().close();
}
await browser.close();
