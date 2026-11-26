// Serves the CDNs used by design-reference/source/*.dc.html from local packages,
// so reference renders work offline with the exact same font files.
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const root = path.resolve(import.meta.dirname, '..');
const fontFile = (pkg, file) => path.join(root, 'node_modules', pkg, 'files', file);

const fonts = {
  'bricolage.woff2': fontFile('@fontsource-variable/bricolage-grotesque', 'bricolage-grotesque-latin-opsz-normal.woff2'),
  'hanken.woff2': fontFile('@fontsource-variable/hanken-grotesk', 'hanken-grotesk-latin-wght-normal.woff2'),
  'serif-italic.woff2': fontFile('@fontsource/instrument-serif', 'instrument-serif-latin-400-italic.woff2'),
  'serif.woff2': fontFile('@fontsource/instrument-serif', 'instrument-serif-latin-400-normal.woff2'),
  'reenie.woff2': fontFile('@fontsource/reenie-beanie', 'reenie-beanie-latin-400-normal.woff2'),
};

const fontCss = `
@font-face{font-family:'Bricolage Grotesque';font-weight:200 800;src:url(https://fonts.gstatic.com/local/bricolage.woff2) format('woff2')}
@font-face{font-family:'Hanken Grotesk';font-weight:100 900;src:url(https://fonts.gstatic.com/local/hanken.woff2) format('woff2')}
@font-face{font-family:'Instrument Serif';font-style:italic;font-weight:400;src:url(https://fonts.gstatic.com/local/serif-italic.woff2) format('woff2')}
@font-face{font-family:'Instrument Serif';font-style:normal;font-weight:400;src:url(https://fonts.gstatic.com/local/serif.woff2) format('woff2')}
@font-face{font-family:'Reenie Beanie';font-weight:400;src:url(https://fonts.gstatic.com/local/reenie.woff2) format('woff2')}`;

const icons = require('simple-icons');
const iconBySlug = new Map(Object.values(icons).filter((i) => i && i.slug).map((i) => [i.slug, i]));

export async function routeCdns(page) {
  await page.route('https://fonts.googleapis.com/**', (r) => r.fulfill({ contentType: 'text/css', body: fontCss }));
  await page.route('https://fonts.gstatic.com/local/*', async (r) => {
    const file = fonts[r.request().url().split('/').pop()];
    r.fulfill({ contentType: 'font/woff2', headers: { 'access-control-allow-origin': '*' }, body: await readFile(file) });
  });
  await page.route('https://cdn.simpleicons.org/**', (r) => {
    const [slug, hex = '000000'] = new URL(r.request().url()).pathname.slice(1).split('/');
    const icon = iconBySlug.get(slug);
    if (!icon) return r.fulfill({ status: 404, body: '' });
    r.fulfill({ contentType: 'image/svg+xml', body: icon.svg.replace('<svg ', `<svg fill="#${hex}" `) });
  });
}
