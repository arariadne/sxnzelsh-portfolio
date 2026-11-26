import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useMotionValueEvent } from 'motion/react';
import { useMotionPrefs } from '../../providers/MotionPrefs';
import { useScrollSignals } from '../../providers/ScrollSignals';

interface Props {
  items: string[];
  /** 1 = moves left, -1 = moves right. */
  direction?: 1 | -1;
  /** Seconds per loop at rest (design: 40s desktop, 36s mobile). */
  duration?: number;
  /** Gap between items and bullets (px number or any CSS length, e.g. a variable). */
  gap: number | string;
  className?: string;
  /** Pause while hovered (Skills bands). */
  pauseOnHover?: boolean;
  separator?: ReactNode;
}

/**
 * Infinite marquee on the Web Animations API, so it runs off the main thread
 * (transform only). Scroll velocity speeds it up by changing the playback rate.
 * Stops for reduced motion, when the visitor pauses motion, and (optionally) on hover.
 */
export function Marquee({ items, direction = 1, duration = 40, gap, className = '', pauseOnHover, separator = '•' }: Props) {
  const { reduced, paused } = useMotionPrefs();
  const [hovered, setHovered] = useState(false);
  const track = useRef<HTMLDivElement>(null);
  const anim = useRef<Animation | null>(null);

  const { boost } = useScrollSignals();

  useEffect(() => {
    const el = track.current;
    if (!el || reduced) return;
    const frames = [{ transform: 'translate3d(0,0,0)' }, { transform: 'translate3d(-50%,0,0)' }];
    anim.current = el.animate(direction === 1 ? frames : [...frames].reverse(), {
      duration: duration * 1000,
      iterations: Infinity,
      easing: 'linear',
    });
    return () => {
      anim.current?.cancel();
      anim.current = null;
    };
  }, [reduced, direction, duration]);

  const stopped = paused || (pauseOnHover && hovered);
  useEffect(() => {
    if (!anim.current) return;
    if (stopped) anim.current.pause();
    else anim.current.play();
  }, [stopped, reduced]);

  useMotionValueEvent(boost, 'change', (b) => {
    anim.current?.updatePlaybackRate(1 + b);
  });

  const row = (hidden: boolean) => (
    <div aria-hidden={hidden || undefined} className="flex shrink-0" style={{ gap, paddingRight: gap }}>
      {items.map((item) => (
        <span key={item} className="contents">
          <span>{item}</span>
          <span aria-hidden="true">{separator}</span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className="overflow-hidden"
      onPointerEnter={pauseOnHover ? () => setHovered(true) : undefined}
      onPointerLeave={pauseOnHover ? () => setHovered(false) : undefined}
    >
      <div ref={track} className={`flex w-max whitespace-nowrap will-change-transform ${className}`}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
