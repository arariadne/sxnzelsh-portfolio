import { m } from 'motion/react';
import { useScrollSignals } from '../../providers/ScrollSignals';

/** Thin flat bubblegum bar showing page progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScrollSignals();
  return (
    <m.div
      aria-hidden="true"
      data-progress
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-bubblegum"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
