import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/** Preloads the font files the first screen needs (latin subsets). */
function preloadFonts(): Plugin {
  const wanted = [
    /bricolage-grotesque-latin-opsz-normal-[\w-]+\.woff2$/,
    /hanken-grotesk-latin-wght-normal-[\w-]+\.woff2$/,
    // "Arias" in the hero name: without it the second line can grow late and shift the page.
    /instrument-serif-latin-400-italic-[\w-]+\.woff2$/,
  ];
  return {
    name: 'preload-fonts',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(_html, ctx) {
        const files = Object.keys(ctx.bundle ?? {}).filter((f) => wanted.some((re) => re.test(f)));
        return files.map((f) => ({
          tag: 'link',
          attrs: { rel: 'preload', as: 'font', type: 'font/woff2', href: `/${f}`, crossorigin: '' },
          injectTo: 'head' as const,
        }));
      },
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), preloadFonts()],
  server: { port: 5173 },
});
