import { useCallback, useEffect, useState, type MouseEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToTarget, useLenis } from '../providers/SmoothScroll';

/** Click handler for "/#section" links: smooth-scrolls on the home page and moves
 *  focus to the section; on other routes the link navigates and ScrollManager
 *  scrolls once the route transition has finished. */
export function useSectionNav() {
  const { pathname } = useLocation();
  const lenis = useLenis();

  return useCallback(
    /** `defer` waits for an overlay (the mobile menu) to close and release scrolling. */
    (e: MouseEvent, href: string, defer = false) => {
      if (!href.startsWith('/#') || pathname !== '/') return;
      e.preventDefault();
      const go = () => {
        // Render skipped sections first so the target position is exact.
        document.documentElement.classList.add('cv-off');
        const el = document.getElementById(href.slice(2));
        if (!el) return;
        requestAnimationFrame(() => {
          scrollToTarget(lenis, el);
          if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
          el.focus({ preventScroll: true });
        });
      };
      if (defer) window.setTimeout(go, 60);
      else go();
    },
    [pathname, lenis],
  );
}

/** Which home-page section is in the middle of the viewport. */
export function useActiveSection(ids: readonly string[]) {
  const { pathname } = useLocation();
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (pathname !== '/') {
      setActive(null);
      return;
    }
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids, pathname]);

  return active;
}
