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
  { name: 'gourmetgamble', src: 'assets/source/gourmetgamble.png', widths: [480, 779] },
  { name: 'swiftsail', src: 'assets/source/swiftsail.png', widths: [480, 908] },
  { name: 'furwell', src: 'assets/source/furwell.png', widths: [480, 960, 1600] },
  { name: 'dismap', src: 'assets/source/dismap.png', widths: [480, 978] },
];

// Keep entries for images whose originals aren't present (already generated).
const manifestPath = path.join(root, 'src', 'data', 'images.json');
const manifest = existsSync(manifestPath) ? JSON.parse(await readFile(manifestPath, 'utf8')) : {};
for (const job of jobs) {
  if (!existsSync(path.join(root, job.src))) {
    console.log(`${job.name}: original not found at ${job.src}, keeping existing output`);
    continue;
  }
  let base = sharp(path.join(root, job.src)).rotate();
  if (job.extract) base = base.extract(job.extract);
  const meta = await sharp(await base.clone().toBuffer()).metadata();
  const entry = { width: meta.width, height: meta.height, widths: [], avif: true, webp: true, jpeg: null };

  for (const w of job.widths.filter((w) => w <= meta.width)) {
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
  console.log(`${job.name}: ${meta.width}x${meta.height} -> ${entry.widths.join(', ')}`);
}

await writeFile(path.join(root, 'src', 'data', 'images.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log('wrote src/data/images.json');
