import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

/**
 * First-visit intro (under 1.2s): once per session, skippable, off for reduced motion.
 * `play` is decided once at load. Skipping early changes `key`, which remounts the
 * animated hero parts straight into their final state.
 */

interface IntroState {
  play: boolean;
  key: string;
  skip: () => void;
}

const Ctx = createContext<IntroState>({ play: false, key: 'static', skip: () => {} });
const KEY = 'intro-seen';
export const INTRO_MS = 1200;

function shouldPlay() {
  try {
    if (sessionStorage.getItem(KEY)) return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    return window.location.pathname === '/';
  } catch {
    return false;
  }
}

export function IntroProvider({ children }: { children: ReactNode }) {
  const [play] = useState(shouldPlay);
  const [running, setRunning] = useState(play);
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    try {
      sessionStorage.setItem(KEY, '1');
    } catch {
      /* private mode */
    }
  }, []);

  useEffect(() => {
    if (!running) return;
    const done = window.setTimeout(() => setRunning(false), INTRO_MS);
    const onSkip = () => {
      setSkipped(true);
      setRunning(false);
    };
    const events = ['keydown', 'pointerdown', 'wheel', 'touchstart'] as const;
    events.forEach((e) => window.addEventListener(e, onSkip, { once: true, passive: true }));
    return () => {
      window.clearTimeout(done);
      events.forEach((e) => window.removeEventListener(e, onSkip));
    };
  }, [running]);

  const value = useMemo(
    () => ({
      play: play && !skipped,
      key: skipped ? 'skipped' : 'intro',
      skip: () => {
        setSkipped(true);
        setRunning(false);
      },
    }),
    [play, skipped],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useIntro = () => useContext(Ctx);
