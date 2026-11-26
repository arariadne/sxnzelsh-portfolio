# sxnzelsh-portfolio

Portfolio of Elaisha Mae Arias, Full-Stack Software Engineer & AI Automation Specialist.
Live at <https://sxnzelsh-portfolio.vercel.app>.

## Stack

- **Vite + React 19 + TypeScript**, React Router 6 (client routing; `vercel.json` rewrites every path to `index.html`)
- **Tailwind CSS 4**: design tokens live in `src/styles/index.css` (`@theme`)
- **motion** (Framer Motion) for component animation, loaded through `LazyMotion` (use `m.div`, not `motion.div`)
- **Lenis** smooth scrolling on **GSAP**'s ticker, both loaded after first paint (`src/providers/SmoothScroll.tsx`)
- Fonts self-hosted with `@fontsource`: Bricolage Grotesque, Instrument Serif, Hanken Grotesk, Reenie Beanie
- Tool logos from the `simple-icons` package (bundled SVG paths, no CDN)

## Scripts

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies (Node 20+) |
| `npm run dev` | Dev server at <http://localhost:5173> |
| `npm run build` | Type-check and build to `dist/` |
| `npm run preview` | Serve the production build at <http://localhost:4173> |
| `npm run images` | Optimize images from `assets/source/` into `public/img/` (AVIF, WebP, JPEG) and update `src/data/images.json` |
| `node scripts/capture-sites.mjs` | Screenshot the hero of each live project site (1440×900) into `assets/source/`, then run `npm run images` |
| `npm run brand` | Re-render the Open Graph card and favicons from the site fonts and portrait |
| `npm run shots -- "#about"` | Screenshot a section at 375/390/768/1024/1440 next to the design reference (needs `npm run preview` running) |

`npm run shots` compares against `design-reference/source/*.dc.html`, which is kept out of git
(see `.git/info/exclude`). Output goes to `.shots/` (gitignored).

## Editing content

All copy lives in typed files under `src/data/`, so you rarely need to touch components.

| File | Contents |
| --- | --- |
| `site.ts` | Name, title, intro line, email, social links, résumé path, nav, **`availableForWork`** (turns the spinning sticker on or off), hero tape words |
| `home.ts` | About statement and facts, What I do panels, Skills blurb, Contact heading |
| `projects.ts` | The projects shown in the spotlight and the work index. Each has a slug (its `/work/:slug` URL), tagline, one-sentence `summary`, spotlight `tone`, type, tech, overview statement, links, image, optional `mobileImage` and gallery |
| `skills.ts` | Marquee bands and the skills panel groups. Each tool has a logo: `icon('slug')` from simple-icons or `mono('Ab')` for a monogram |
| `icons.ts` | The simple-icons imports. To add a tool logo, import its `si*` export here |
| `certificates.ts` | Certificate titles, issuers and links |
| `experience.ts` | Résumé page: summary, experience, education, skills |

Conventions:

- In statements, wrap the words to highlight in `[[double brackets]]` (they get the apricot marker).
- Overview paragraphs left as `''` are not shown; when a project has none, its original description is used.
- `role` and `year` set to `null` are hidden on the case study.
- The gallery appears once a project has two `gallery` images.
- Fields marked `TODO` in comments are placeholders to confirm.

### Adding or replacing an image

1. Put the original in `assets/source/` and add (or edit) a job in `scripts/optimize-images.mjs`.
2. Run `npm run images`. Outputs go to `public/img/<name>-<width>.(avif|webp)`.
3. Reference it by name in `src/data/projects.ts`, e.g. `image: { name: 'furwell', alt: '…' }`.

The portrait uses a fixed 4:5 crop (`extract` in the script). The photo itself is never edited.

## Project layout

```
src/
  components/
    hero/        Hero, sticker, crossing tapes
    sections/    About, What I do, Work (spotlight + index list), Skills, Contact
    layout/      Header, sticky bar, mobile menu, footer, route curtain, cursor, SEO
    ui/          Shared pieces: reveals, section heads, hard-shadow buttons and panels, marquee, picture
  data/          Content (see above)
  lib/           Motion tokens, section navigation, shared-image hand-off
  pages/         Home, CaseStudy, Resume, NotFound
  providers/     Reduced motion and pause, Lenis, intro, shared scroll signals
  styles/        Tailwind entry, tokens, utilities, print styles
scripts/         Image optimization, brand assets, screenshots
public/          Static files: résumé PDF, favicons, OG card, sitemap, robots, optimized images
```

## Accessibility and motion

- `prefers-reduced-motion` turns off Lenis, parallax, marquees, the cursor, magnetic buttons, the
  sticker spin, the intro and scrubbed effects; everything falls back to simple fades.
- A pause button in the header stops all marquees and the sticker.
- The intro plays once per browser session and any key, click or scroll skips it.
- `/resume` prints cleanly (`@media print` in `src/styles/index.css`).
