import { useId } from 'react';

interface Props {
  /** Line colour: cream lines on plum, plum lines on cream/bubblegum. */
  tone: 'cream' | 'plum';
  /** Stroke opacity (design: cream .09 on plum, plum .08 on cream, plum .12 on bubblegum). */
  opacity: number;
  /** Hide below 640px (the mobile design has no grid in the cream sections). */
  fromSm?: boolean;
}

/** Flat SVG hairline grid: 96px cells, 64px below 640px wide. */
export function HairlineGrid({ tone, opacity, fromSm }: Props) {
  const id = useId().replace(/:/g, '');
  const stroke = tone === 'cream' ? 'var(--color-cream)' : 'var(--color-plum)';
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full">
      <defs>
        <pattern id={`g64${id}`} width="64" height="64" patternUnits="userSpaceOnUse">
          <path d="M64 0H0V64" fill="none" stroke={stroke} strokeOpacity={opacity} strokeWidth="1" />
        </pattern>
        <pattern id={`g96${id}`} width="96" height="96" patternUnits="userSpaceOnUse">
          <path d="M96 0H0V96" fill="none" stroke={stroke} strokeOpacity={opacity} strokeWidth="1" />
        </pattern>
      </defs>
      {!fromSm && <rect width="100%" height="100%" fill={`url(#g64${id})`} className="sm:hidden" />}
      <rect width="100%" height="100%" fill={`url(#g96${id})`} className="hidden sm:block" />
    </svg>
  );
}
