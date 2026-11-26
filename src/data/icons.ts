/**
 * Monochrome tool logos from the `simple-icons` package (bundled SVG paths, no CDN).
 * Only the icons imported here end up in the build. To add a tool, import its
 * `si*` export and add it to the map; tools without an icon use a monogram.
 */
import {
  siAndroidstudio,
  siAngular,
  siCapacitor,
  siClaude,
  siCursor,
  siCypress,
  siDocker,
  siExpo,
  siExpress,
  siFigma,
  siFirebase,
  siFlutter,
  siGit,
  siGithub,
  siGraphql,
  siJavascript,
  siJest,
  siLangchain,
  siLaravel,
  siMake,
  siMongodb,
  siN8n,
  siNextdotjs,
  siNodedotjs,
  siPhp,
  siPuppeteer,
  siPython,
  siReact,
  siSass,
  siSelenium,
  siStripe,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVercel,
  siVite,
  siZapier,
} from 'simple-icons';

const list = [
  siAndroidstudio, siAngular, siCapacitor, siClaude, siCursor, siCypress, siDocker, siExpo, siExpress, siFigma,
  siFirebase, siFlutter, siGit, siGithub, siGraphql, siJavascript, siJest, siLangchain, siLaravel, siMake,
  siMongodb, siN8n, siNextdotjs, siNodedotjs, siPhp, siPuppeteer, siPython, siReact, siSass, siSelenium,
  siStripe, siSupabase, siTailwindcss, siTypescript, siVercel, siVite, siZapier,
];

export const iconPaths: Record<string, string> = Object.fromEntries(list.map((i) => [i.slug, i.path]));
