import type { ReactNode } from 'react';
import { m } from 'motion/react';
import { ease } from '../../lib/motion';
import { RevealLines } from './Reveal';

/** Giant italic numeral that scales in. Decorative: the heading carries the meaning. */
export function Numeral({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <m.p
      aria-hidden="true"
      className={`font-italic-serif m-0 origin-bottom-left leading-[0.85] tracking-[-0.03em] ${className}`}
      initial={{ scale: 0.6, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.9, ease }}
    >
      {children}
    </m.p>
  );
}

/**
 * Section heading for 02-04: numeral with an uppercase label beside it,
 * plus optional content on the right ("(06)", the Skills blurb).
 */
export function SectionHead({
  num,
  lines,
  id,
  numClassName = '',
  right,
  className = '',
}: {
  num: string;
  lines: string[];
  id: string;
  numClassName?: string;
  right?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative flex flex-wrap items-end justify-between gap-6 ${className}`}>
      <div className="flex items-end gap-3.5 sm:gap-6">
        <Numeral className={`text-[104px] sm:text-[clamp(100px,11vw,160px)] ${numClassName}`}>{num}</Numeral>
        <h2 id={id} className="font-heavy m-0 mb-1.5 text-[28px] uppercase leading-none sm:mb-2.5 sm:text-[clamp(30px,3.2vw,46px)]">
          <RevealLines lines={lines} />
        </h2>
      </div>
      {right}
    </div>
  );
}
