import type { ReactNode, MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import { Magnetic } from './Magnetic';

type Tone = 'plum' | 'cream' | 'grape' | 'bubblegum' | 'apricot';

const bg: Record<Tone, string> = {
  plum: 'bg-plum text-cream',
  cream: 'bg-cream text-plum',
  grape: 'bg-grape text-cream',
  bubblegum: 'bg-bubblegum text-plum',
  apricot: 'bg-apricot text-plum',
};
const shadowBg: Record<Tone, string> = {
  plum: 'bg-plum',
  cream: 'bg-cream',
  grape: 'bg-grape',
  bubblegum: 'bg-bubblegum',
  apricot: 'bg-apricot',
};

interface Props {
  to: string;
  children: ReactNode;
  tone: Tone;
  shadow: Tone;
  /** Hard shadow offset in px (design: 4 for "Hire me", 5-6 for buttons). */
  offset?: number;
  magnetic?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  external?: boolean;
  /** Suggested file name for downloads (e.g. the résumé PDF). */
  download?: string;
}

/**
 * Flat button with a solid hard shadow. On hover the button lifts by (-4px, -4px)
 * while the shadow stays put, so the shadow appears to grow. Transforms only.
 */
export function HardButton({ to, children, tone, shadow, offset = 6, magnetic, className = '', onClick, external, download }: Props) {
  const inner = (
    <span className="group relative inline-flex">
      <span
        aria-hidden="true"
        className={`absolute inset-0 rounded-[4px] ${shadowBg[shadow]}`}
        style={{ transform: `translate(${offset}px, ${offset}px)` }}
      />
      {external || to.startsWith('mailto:') || to.startsWith('http') || to.endsWith('.pdf') ? (
        <a
          href={to}
          download={download}
          onClick={onClick}
          className={`relative inline-flex items-center rounded-[4px] font-semibold transition-transform duration-[250ms] ease-zine group-hover:-translate-x-1 group-hover:-translate-y-1 ${bg[tone]} ${className}`}
          {...(to.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
        </a>
      ) : (
        <Link
          to={to}
          onClick={onClick}
          className={`relative inline-flex items-center rounded-[4px] font-semibold transition-transform duration-[250ms] ease-zine group-hover:-translate-x-1 group-hover:-translate-y-1 ${bg[tone]} ${className}`}
        >
          {children}
        </Link>
      )}
    </span>
  );
  return magnetic ? <Magnetic>{inner}</Magnetic> : inner;
}
