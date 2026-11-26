import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type Lenis from 'lenis';
import { useMotionPrefs } from './MotionPrefs';

const Ctx = createContext<Lenis | null>(null);

/**
 * Lenis smooth scrolling, driven by GSAP's ticker. Both load after first paint
 * (they aren't needed to show the page). Disabled for reduced motion, where
 * native scrolling is used. ScrollTrigger isn't loaded: the approved design has
 * no pinned or horizontal sequence. If one is added, import it here and call
 * `instance.on('scroll', ScrollTrigger.update)`.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const { reduced } = useMotionPrefs();
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (reduced) return;
    let cancelled = false;
    let cleanup = () => {};
    const start = async () => {
      const [{ default: LenisCtor }, { gsap }] = await Promise.all([import('lenis'), import('gsap')]);
      if (cancelled) return;
      const instance = new LenisCtor({
        duration: 1.1,
        easing: (t) => 1 - Math.pow(1 - t, 4),
        // Touch keeps native momentum scrolling (no jank on phones).
        syncTouch: false,
      });
      const tick = (time: number) => instance.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      setLenis(instance);
      cleanup = () => {
        gsap.ticker.remove(tick);
        instance.destroy();
      };
    };
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
    const handle = idle(() => void start());
    return () => {
      cancelled = true;
      if (window.cancelIdleCallback && typeof handle === 'number') window.cancelIdleCallback(handle);
      cleanup();
      setLenis(null);
    };
  }, [reduced]);

  return <Ctx.Provider value={lenis}>{children}</Ctx.Provider>;
}

export const useLenis = () => useContext(Ctx);

/** Scroll to an element or position, through Lenis when it is active. */
export function scrollToTarget(lenis: Lenis | null, target: HTMLElement | number, immediate = false) {
  if (lenis) {
    // Re-measure first: the page may have just grown (sections mount after first
    // paint), and Lenis would otherwise clamp to its old scroll limit.
    lenis.resize();
    lenis.scrollTo(target, { immediate, force: true });
    return;
  }
  const top = typeof target === 'number' ? target : target.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top, behavior: immediate ? 'instant' : 'smooth' });
}
