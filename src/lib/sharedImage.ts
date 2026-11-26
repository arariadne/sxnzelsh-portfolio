/**
 * Shared-element hand-off between a work row's preview image and the case-study
 * hero image. The row records where its image was on screen; the case study
 * animates its hero from that rectangle (FLIP). The curtain is skipped for these
 * navigations so the image visibly continues.
 */

export interface SharedSource {
  slug: string;
  rect: { left: number; top: number; width: number; height: number };
  rotate: number;
  at: number;
}

const TTL = 2000;
let source: SharedSource | null = null;

export function setSharedSource(slug: string, el: Element | null | undefined, rotate = 0) {
  if (!el) return;
  const r = el.getBoundingClientRect();
  if (!r.width || !r.height) return;
  source = { slug, rect: { left: r.left, top: r.top, width: r.width, height: r.height }, rotate, at: performance.now() };
}

/** The pending hand-off for a path, if any (valid for a short time after the click). */
export function peekSharedSource(pathname: string) {
  if (!source || performance.now() - source.at > TTL) return null;
  return pathname === `/work/${source.slug}` ? source : null;
}
