import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { LazyMotion, MotionConfig, domAnimation, useReducedMotion } from 'motion/react';

interface MotionPrefs {
  /** prefers-reduced-motion is set. */
  reduced: boolean;
  /** Visitor pressed "Pause motion" (marquees, sticker). */
  paused: boolean;
  togglePaused: () => void;
  /** Fine pointer with hover (mouse/trackpad): custom cursor and magnetic buttons. */
  finePointer: boolean;
}

const Ctx = createContext<MotionPrefs>({ reduced: false, paused: false, togglePaused: () => {}, finePointer: false });

const PAUSE_KEY = 'motion-paused';

export function MotionPrefsProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion() ?? false;
  const [paused, setPaused] = useState(() => {
    try {
      return sessionStorage.getItem(PAUSE_KEY) === '1';
    } catch {
      return false;
    }
  });
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine) and (hover: hover)');
    const update = () => setFinePointer(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.motion = paused ? 'paused' : 'running';
    try {
      sessionStorage.setItem(PAUSE_KEY, paused ? '1' : '0');
    } catch {
      /* private mode */
    }
  }, [paused]);

  const togglePaused = useCallback(() => setPaused((p) => !p), []);
  const value = useMemo(() => ({ reduced, paused, togglePaused, finePointer }), [reduced, paused, togglePaused, finePointer]);

  return (
    <Ctx.Provider value={value}>
      {/* Lazy feature bundle keeps motion small; `strict` forbids the heavier `motion.*` components.
          reducedMotion="user" makes every animation fall back to opacity-only for reduced motion. */}
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </LazyMotion>
    </Ctx.Provider>
  );
}

export const useMotionPrefs = () => useContext(Ctx);
