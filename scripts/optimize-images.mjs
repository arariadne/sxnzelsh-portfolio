// Generates optimized AVIF/WebP (and a JPEG fallback for the portrait) into
// public/img, plus src/data/images.json describing every output.
// Put original images in assets/source/ (not deployed) and run: npm run images
// The originals used for the first run were removed after their optimized
// versions were checked; they are in the git history before the redesign.
import sharp from 'sharp';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const out = path.join(root, 'public', 'img');
await mkdir(out, { recursive: true });

const jobs = [
  {
    name: 'portrait',
    src: 'assets/source/elai.jpg',
    // Approved 4:5 crop: hair crown to brooch. Scale and crop only.
    extract: { left: 133, top: 110, width: 1100, height: 1375 },
    widths: [320, 480, 640, 880],
    jpeg: 640,
  },
  // Project screenshots for the 16:10 browser frame (see toFrameRatio below).
  // Live-site hero captures (scripts/capture-sites.mjs) are already 1440x900.
  { name: 'bestlifevacations', src: 'assets/source/bestlifevacations.png', frame: true },
  { name: 'rer', src: 'assets/source/rer.png', frame: true },
  { name: 'smguru', src: 'assets/source/smguru.png', frame: true },
  { name: 'gourmetgamble', src: 'assets/source/gourmetgamble.png', frame: true },
  { name: 'swiftsail', src: 'assets/source/swiftsail.png', frame: true },
  { name: 'furwell', src: 'assets/source/furwell.png', frame: true },
  { name: 'dismap', src: 'assets/source/dismap.png', frame: true },
];

const FRAME_RATIO = 16 / 10;
const FRAME_MAX_WIDTH = 1440;

/**
 * Makes a screenshot exactly 16:10 without stretching or squashing:
 * - wider than 1440px: scaled down evenly to 1440 wide (never scaled up);
 * - taller than 16:10: cropped from the top-left (the bottom is trimmed, full width kept);
 * - wider than 16:10: the full width is kept and the bottom is extended with a flat
 *   strip in the image's own bottom-edge colour, so nothing is cut off horizontally.
 */
async function toFrameRatio(file) {
  let buf = await sharp(file).rotate().png().toBuffer();
  let { width: w, height: h } = await sharp(buf).metadata();
  if (w > FRAME_MAX_WIDTH) {
    buf = await sharp(buf).resize({ width: FRAME_MAX_WIDTH }).png().toBuffer();
    ({ width: w, height: h } = await sharp(buf).metadata());
  }
  const target = Math.round(w / FRAME_RATIO);
  let note = 'already 16:10';
  if (h > target) {
    buf = await sharp(buf).extract({ left: 0, top: 0, width: w, height: target }).png().toBuffer();
    note = `cropped from the top (${h}px -> ${target}px tall)`;
  } else if (h < target) {
    const { channels } = await sharp(buf).extract({ left: 0, top: h - 4, width: w, height: 4 }).stats();
    const [r, g, b] = channels.map((c) => Math.round(c.mean));
    buf = await sharp(buf).extend({ bottom: target - h, background: { r, g, b, alpha: 1 } }).png().toBuffer();
    note = `bottom extended by ${target - h}px in rgb(${r},${g},${b})`;
  }
  return { image: sharp(buf), note };
}

// Keep entries for images whose originals aren't present (already generated).
const manifestPath = path.join(root, 'src', 'data', 'images.json');
const manifest = existsSync(manifestPath) ? JSON.parse(await readFile(manifestPath, 'utf8')) : {};
for (const job of jobs) {
  if (!existsSync(path.join(root, job.src))) {
    console.log(`${job.name}: original not found at ${job.src}, keeping existing output`);
    continue;
  }
  let base;
  let note = '';
  if (job.frame) ({ image: base, note } = await toFrameRatio(path.join(root, job.src)));
  else {
    base = sharp(path.join(root, job.src)).rotate();
    if (job.extract) base = base.extract(job.extract);
  }
  const meta = await sharp(await base.clone().toBuffer()).metadata();
  const entry = { width: meta.width, height: meta.height, widths: [], avif: true, webp: true, jpeg: null };
  // Frame images: 480/960/1440 plus the native width when it's smaller (never upscaled).
  const widths = job.frame ? [...new Set([480, 960, 1440].filter((w) => w < meta.width).concat(meta.width))].sort((a, b) => a - b) : job.widths;

  for (const w of widths.filter((w) => w <= meta.width)) {
    const resized = base.clone().resize({ width: w, withoutEnlargement: true });
    await resized.clone().avif({ quality: 55, effort: 6 }).toFile(path.join(out, `${job.name}-${w}.avif`));
    await resized.clone().webp({ quality: 78, effort: 6 }).toFile(path.join(out, `${job.name}-${w}.webp`));
    entry.widths.push(w);
  }
  if (job.jpeg) {
    await base
      .clone()
      .resize({ width: job.jpeg })
      .jpeg({ quality: 78, mozjpeg: true, progressive: true })
      .toFile(path.join(out, `${job.name}-${job.jpeg}.jpg`));
    entry.jpeg = job.jpeg;
  }
  manifest[job.name] = entry;
  console.log(`${job.name}: ${meta.width}x${meta.height} -> ${entry.widths.join(', ')}${note ? ` (${note})` : ''}`);
}

await writeFile(path.join(root, 'src', 'data', 'images.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log('wrote src/data/images.json');
