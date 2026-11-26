import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { m, type Variants } from 'motion/react';
import { peekSharedSource } from '../../lib/sharedImage';
import { useMotionPrefs } from '../../providers/MotionPrefs';

const panels = ['bg-plum', 'bg-grape', 'bg-bubblegum'] as const;
const DUR = 0.32;
const GAP = 0.07;
const EASE = [0.65, 0, 0.35, 1] as const;

let firstLoad = true;

/** Data passed through AnimatePresence `custom` at navigation time. */
export interface TransitionInfo {
  shared: boolean;
  reduced: boolean;
}

const panel = (i: number): Variants => ({
  cover: { scaleY: 1, originY: 0 },
  open: { scaleY: 0, originY: 0, transition: { duration: DUR, ease: EASE, delay: (panels.length - 1 - i) * GAP } },
  // A shared-image navigation skips the curtain so the image visibly continues.
  exit: (info?: TransitionInfo) =>
    info?.shared
      ? { scaleY: 0, transition: { duration: 0 } }
      : { scaleY: 1, originY: 1, transition: { duration: DUR, ease: EASE, delay: i * GAP } },
});

/**
 * Route transition: three flat panels (plum, grape, bubblegum) sweep up over the
 * old page, then off the new one (about 0.9s in total). scaleY only.
 * Skipped on the very first page load, for shared-image hand-offs, and for reduced motion.
 */
export function Curtain() {
  const { reduced } = useMotionPrefs();
  const { pathname } = useLocation();
  const [skipEnter] = useState(() => firstLoad || !!peekSharedSource(pathname));
  useEffect(() => {
    firstLoad = false;
  }, []);
  if (reduced) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[80]">
      {panels.map((bg, i) => (
        <m.div
          key={bg}
          className={`absolute inset-0 ${bg}`}
          variants={panel(i)}
          initial={skipEnter ? 'open' : 'cover'}
          animate="open"
          exit="exit"
        />
      ))}
    </div>
  );
}
