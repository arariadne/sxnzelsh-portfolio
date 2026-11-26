import { useCallback, useEffect, useRef, type ReactNode } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { AnimatePresence, m } from 'motion/react';
import { scrollToTarget, useLenis } from '../../providers/SmoothScroll';
import { useMotionPrefs } from '../../providers/MotionPrefs';
import { Curtain, type TransitionInfo } from './Curtain';
import { peekSharedSource } from '../../lib/sharedImage';
import { Cursor } from './Cursor';
import { ScrollProgress } from './ScrollProgress';
import { StickyBar } from './StickyBar';

const STORE = 'scroll-positions';

// Reduced motion: a plain cross-fade. Shared-image hand-off: the old page fades
// quickly. Otherwise the curtain's exit keeps the old page mounted until covered.
const pageVariants = {
  initial: (t: TransitionInfo) => ({ opacity: t.reduced ? 0 : 1 }),
  enter: { opacity: 1, transition: { duration: 0.3 } },
  exit: (t: TransitionInfo) => (t.reduced || t.shared ? { opacity: 0, transition: { duration: 0.3 } } : { opacity: 1 }),
};

function loadPositions(): Record<string, number> {
  try {
    return JSON.parse(sessionStorage.getItem(STORE) ?? '{}');
  } catch {
    return {};
  }
}

/**
 * App shell: skip link, progress bar, sticky bar, cursor, and route transitions.
 * Scroll position is set while the curtain covers the screen: restored on
 * back/forward, jumps to #hash targets, otherwise starts at the top.
 */
export function Layout({ children }: { children: (location: ReturnType<typeof useLocation>) => ReactNode }) {
  const location = useLocation();
  const navType = useNavigationType();
  const lenis = useLenis();
  const { reduced } = useMotionPrefs();
  const positions = useRef(loadPositions());
  const transition: TransitionInfo = { shared: !!peekSharedSource(location.pathname), reduced };
  const latest = useRef({ location, navType, lenis });
  latest.current = { location, navType, lenis };

  useEffect(() => {
    history.scrollRestoration = 'manual';
  }, []);

  // Remember where each history entry was scrolled to.
  useEffect(() => {
    let frame = 0;
    const save = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        positions.current[latest.current.location.key] = window.scrollY;
        try {
          sessionStorage.setItem(STORE, JSON.stringify(positions.current));
        } catch {
          /* private mode */
        }
      });
    };
    window.addEventListener('scroll', save, { passive: true });
    return () => window.removeEventListener('scroll', save);
  }, []);

  const placeScroll = useCallback(() => {
    const { location: loc, navType: type, lenis: l } = latest.current;
    const saved = positions.current[loc.key];
    // Plain navigations start at the top right away (before the new page lays out).
    if (!(type === 'POP' && saved !== undefined) && !loc.hash) scrollToTarget(l, 0, true);
    // Restoring a position or jumping to a hash needs exact section sizes.
    else document.documentElement.classList.add('cv-off');
    // Sections below the hero mount just after the route renders, so wait for
    // the target (or for the page to be tall enough) for up to ~2s.
    let tries = 0;
    const attempt = () => {
      const el = loc.hash ? document.getElementById(decodeURIComponent(loc.hash.slice(1))) : null;
      const ready = type === 'POP' && saved !== undefined ? document.documentElement.scrollHeight >= saved + window.innerHeight : !loc.hash || !!el;
      if (!ready && tries++ < 120) return void requestAnimationFrame(attempt);
      if (type === 'POP' && saved !== undefined) return scrollToTarget(l, saved, true);
      if (el) {
        scrollToTarget(l, el, true);
        if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
        el.focus({ preventScroll: true });
        return;
      }
      if (loc.hash) scrollToTarget(l, 0, true);
    };
    requestAnimationFrame(attempt);
  }, []);

  // First load (deep links with a hash, or a reload).
  useEffect(() => {
    placeScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only-focusable fixed left-4 top-4 z-[110] rounded-[4px] bg-apricot px-4 py-2 font-semibold text-plum"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <StickyBar />
      <Cursor />
      <AnimatePresence mode="wait" onExitComplete={placeScroll} custom={transition}>
        <m.div
          key={location.pathname}
          custom={transition}
          variants={pageVariants}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          {children(location)}
          <Curtain />
        </m.div>
      </AnimatePresence>
    </>
  );
}
