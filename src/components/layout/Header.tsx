import { Link } from 'react-router-dom';
import { site } from '../../data/site';
import { MobileMenu } from './MobileMenu';
import { NavLinks, PauseButton, type HeaderTone } from './NavLinks';

/** Page header, laid over the top of each page's first section (as in the design).
 *  Height: 88px below 640px, 102px above (as in the design). The first section reserves that space. */
export function Header({ tone }: { tone: HeaderTone }) {
  return (
    <header
      className={`absolute inset-x-0 top-0 z-30 px-gutter ${tone === 'plum' ? 'text-cream [--focus:var(--color-apricot)]' : 'text-plum [--focus:var(--color-plum)]'}`}
    >
      <div className="flex h-[88px] items-center justify-between gap-6 sm:h-[102px]">
        <Link to="/" className="font-heavy text-[36px] leading-none tracking-[-0.04em] sm:text-[44px]">
          {site.shortName}
          <span className="sr-only"> {site.name}, home</span>
        </Link>
        <NavLinks tone={tone} />
        <div className="flex items-center gap-2 nav:hidden">
          <PauseButton tone={tone} />
          <MobileMenu tone={tone} />
        </div>
      </div>
    </header>
  );
}

export const HEADER_PAD = 'pt-[88px] sm:pt-[102px]';
