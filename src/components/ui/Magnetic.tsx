import { useRef, type ReactNode, type PointerEvent } from 'react';
import { m, useMotionValue, useSpring } from 'motion/react';
import { useMotionPrefs } from '../../providers/MotionPrefs';

/** Pulls its child gently toward the pointer. Fine pointers only, off for reduced motion. */
export function Magnetic({ children, strength = 0.3, className }: { children: ReactNode; strength?: number; className?: string }) {
  const { reduced, finePointer } = useMotionPrefs();
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 240, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 240, damping: 18, mass: 0.4 });
  const active = finePointer && !reduced;

  const onMove = (e: PointerEvent) => {
    if (!active || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <m.span
      ref={ref}
      className={`inline-block ${className ?? ''}`}
      style={active ? { x, y } : undefined}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </m.span>
  );
}
