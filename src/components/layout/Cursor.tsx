import { useEffect, useState } from 'react';
import { m, useMotionValue, useSpring } from 'motion/react';
import { useMotionPrefs } from '../../providers/MotionPrefs';
import { ease } from '../../lib/motion';

type Mode = 'default' | 'view' | 'hidden';

/** Small bubblegum cursor (fine pointers only). Grows with "View" over
 *  [data-cursor="view"], hides over [data-cursor="hide"]. */
export function Cursor() {
  const { finePointer, reduced } = useMotionPrefs();
  const enabled = finePointer && !reduced;
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 40, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 600, damping: 40, mass: 0.3 });
  const [mode, setMode] = useState<Mode>('default');
  const [inside, setInside] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.dataset.cursor = 'on';
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setInside(true);
    };
    const over = (e: PointerEvent) => {
      const target = (e.target as Element | null)?.closest<HTMLElement>('[data-cursor]');
      setMode((target?.dataset.cursor as Mode) ?? 'default');
    };
    const leave = () => setInside(false);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerover', over, { passive: true });
    document.addEventListener('pointerleave', leave);
    return () => {
      delete root.dataset.cursor;
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
      document.removeEventListener('pointerleave', leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;
  const size = mode === 'view' ? 84 : 14;

  return (
    <m.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100]"
      style={{ x: sx, y: sy }}
    >
      <m.div
        className="font-heavy flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[1.5px] border-plum bg-bubblegum text-[16px] tracking-normal text-plum"
        style={{ width: 84, height: 84 }}
        initial={false}
        animate={{ scale: size / 84, opacity: inside && mode !== 'hidden' ? 1 : 0 }}
        transition={{ duration: 0.3, ease }}
      >
        <m.span initial={false} animate={{ opacity: mode === 'view' ? 1 : 0 }} transition={{ duration: 0.2 }}>
          View
        </m.span>
      </m.div>
    </m.div>
  );
}
