import { useState, type ReactNode } from 'react';
import { m } from 'motion/react';
import { ease } from '../../lib/motion';

interface Props {
  children: ReactNode;
  /** Start hidden and slide in. False renders in place (no animation). */
  play: boolean;
  /** When false the line waits (used for scroll-triggered reveals). */
  trigger?: boolean;
  delay?: number;
}

/**
 * One line of a heading that slides up from behind a mask. The real text stays
 * in the DOM. The mask is a clip-path that only cuts the bottom edge (so italic
 * overhangs aren't clipped) and is removed once the line has landed. No extra
 * padding or margins, so the heading keeps the design's exact line spacing.
 */
export function MaskLine({ children, play, trigger = true, delay = 0 }: Props) {
  const [done, setDone] = useState(!play);
  return (
    <span className="block" style={done ? undefined : { clipPath: 'inset(-0.3em -0.3em 0 -0.3em)' }}>
      <m.span
        className="block"
        initial={play ? { transform: 'translateY(110%)' } : false}
        animate={trigger ? { transform: 'translateY(0%)' } : undefined}
        transition={{ duration: 0.7, ease, delay }}
        onAnimationComplete={() => setDone(true)}
      >
        {children}
      </m.span>
    </span>
  );
}
