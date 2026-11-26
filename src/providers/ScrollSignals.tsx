import { createContext, useContext, type ReactNode } from 'react';
import { useScroll, useSpring, useTransform, useVelocity, type MotionValue } from 'motion/react';

interface ScrollSignals {
  scrollY: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
  /** 0 at rest, up to 5 while scrolling fast (marquee speed-up). */
  boost: MotionValue<number>;
}

const Ctx = createContext<ScrollSignals | null>(null);

/** One shared page-scroll tracker, so components don't each measure the page. */
export function ScrollSignalsProvider({ children }: { children: ReactNode }) {
  const { scrollY, scrollYProgress } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [-3000, 0, 3000], [5, 0, 5], { clamp: true });
  return <Ctx.Provider value={{ scrollY, scrollYProgress, boost }}>{children}</Ctx.Provider>;
}

export function useScrollSignals() {
  const value = useContext(Ctx);
  if (!value) throw new Error('useScrollSignals must be used inside ScrollSignalsProvider');
  return value;
}
