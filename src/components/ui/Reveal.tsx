import { Fragment, useRef, useState, type ElementType, type ReactNode } from 'react';
import { m, useInView } from 'motion/react';
import { dur, ease, stagger } from '../../lib/motion';
import { MaskLine } from './MaskLine';

const VIEW = { once: true, margin: '0px 0px -12% 0px' } as const;

/** Fade and rise into place when scrolled into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: 'div' | 'p' | 'li' | 'span';
}) {
  const Comp = m[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEW}
      transition={{ duration: dur.reveal, ease, delay }}
    >
      {children}
    </Comp>
  );
}

/** Heading lines that slide up from a mask when scrolled into view. */
export function RevealLines({ lines, delay = 0 }: { lines: ReactNode[]; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, VIEW);
  return (
    <span ref={ref} className="block">
      {lines.map((line, i) => (
        <MaskLine key={i} play trigger={inView} delay={delay + i * 0.08}>
          {line}
        </MaskLine>
      ))}
    </span>
  );
}

/**
 * Text whose words slide up from a mask, word by word (never per character).
 * Words inside [[double brackets]] get a marker highlight that draws in behind
 * them afterwards. Real text stays in the DOM for screen readers.
 */
export function RevealText({
  text,
  as: Tag = 'p',
  className,
  hlClassName = '',
  delay = 0,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  /** Classes for the highlighted group (font, size, padding). */
  hlClassName?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, VIEW);
  const [done, setDone] = useState(false);

  const parts = text.split(/(\[\[.*?\]\])/).filter(Boolean);
  const total = parts.reduce((n, p) => n + p.replace(/\[\[|\]\]/g, '').trim().split(/\s+/).length, 0);
  let index = 0;

  const word = (w: string) => {
    const i = index++;
    return (
      <span className="relative inline-block" style={done ? undefined : { clipPath: 'inset(-0.3em -0.3em 0 -0.3em)' }}>
        <m.span
          className="inline-block"
          initial={{ y: '110%' }}
          animate={inView ? { y: 0 } : undefined}
          transition={{ duration: 0.7, ease, delay: delay + i * stagger.base * 0.5 }}
          onAnimationComplete={i === total - 1 ? () => setDone(true) : undefined}
        >
          {w}
        </m.span>
      </span>
    );
  };

  const words = (chunk: string) =>
    chunk.split(/(\s+)/).map((piece, k) =>
      /^\s+$/.test(piece) ? ' ' : piece ? <Fragment key={k}>{word(piece)}</Fragment> : null,
    );

  return (
    <Tag ref={ref} className={className}>
      {parts.map((part, k) => {
        if (!part.startsWith('[[')) return <Fragment key={k}>{words(part)}</Fragment>;
        const inner = part.slice(2, -2);
        const markerDelay = delay + total * stagger.base * 0.5 + 0.25;
        return (
          <span key={k} className={`relative inline-block whitespace-nowrap ${hlClassName}`}>
            <m.span
              aria-hidden="true"
              className="absolute inset-0 origin-left bg-apricot"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : undefined}
              transition={{ duration: 0.6, ease, delay: markerDelay }}
            />
            <span className="relative">{words(inner)}</span>
          </span>
        );
      })}
    </Tag>
  );
}

/** A 2px rule that draws from left to right when it enters. */
export function DrawRule({ className = '' }: { className?: string }) {
  return (
    <m.span
      aria-hidden="true"
      className={`absolute left-0 right-0 top-0 block h-[2px] origin-left bg-current ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEW}
      transition={{ duration: 0.9, ease }}
    />
  );
}
