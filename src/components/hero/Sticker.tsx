import { useId } from 'react';
import { m } from 'motion/react';
import { ease } from '../../lib/motion';

/** Apricot "AVAILABLE FOR WORK •" sticker. The text ring rotates slowly (18s);
 *  the arrow in the middle stays still. Decorative: the hero also has sr-only text. */
export function Sticker({ play, className }: { play: boolean; className: string }) {
  const id = useId().replace(/:/g, '');
  return (
    <m.div
      aria-hidden="true"
      className={className}
      initial={play ? { transform: 'scale(0) rotate(-140deg)' } : false}
      animate={{ transform: 'scale(1) rotate(0deg)' }}
      transition={{ duration: 0.6, ease, delay: 0.45 }}
    >
      <div className="spin h-full w-full">
        <svg viewBox="0 0 128 128" className="block h-full w-full">
          <circle cx="64" cy="64" r="64" fill="var(--color-apricot)" />
          <defs>
            <path id={`stk${id}`} d="M64 64m-47 0a47 47 0 1 1 94 0a47 47 0 1 1-94 0" />
          </defs>
          <text fontFamily="'Hanken Grotesk Variable', sans-serif" fontWeight="600" fontSize="10" fill="var(--color-plum)">
            <textPath href={`#stk${id}`} textLength="292" lengthAdjust="spacing">
              AVAILABLE FOR WORK • AVAILABLE FOR WORK •
            </textPath>
          </text>
        </svg>
      </div>
      <svg viewBox="0 0 128 128" className="absolute inset-0 block h-full w-full">
        <path d="M48 80L80 48M54 48H80V74" stroke="var(--color-plum)" strokeWidth="5" fill="none" strokeLinecap="square" />
      </svg>
    </m.div>
  );
}
