import { Link, useLocation } from 'react-router-dom';
import { nav } from '../../data/site';
import { useActiveSection, useSectionNav } from '../../lib/useSectionNav';
import { useMotionPrefs } from '../../providers/MotionPrefs';
import { HardButton } from '../ui/HardButton';

export type HeaderTone = 'plum' | 'bubblegum';

const sectionIds = nav.map((n) => n.id).filter((id): id is NonNullable<typeof id> => !!id);

/** Desktop nav: plain text links, active indicator, pause control and "Hire me". */
export function NavLinks({ tone, compact }: { tone: HeaderTone; compact?: boolean }) {
  const { pathname } = useLocation();
  const active = useActiveSection(sectionIds);
  const onSection = useSectionNav();

  return (
    <nav aria-label="Main" className={`hidden items-center nav:flex ${compact ? 'gap-6 text-[16px]' : 'gap-[30px] text-[17px]'} font-medium`}>
      <ul className="m-0 flex list-none items-center gap-[inherit] p-0">
        {nav.map((item) => {
          const current = item.id ? active === item.id : pathname === item.href;
          return (
            <li key={item.label}>
              <Link
                to={item.href}
                onClick={(e) => onSection(e, item.href)}
                aria-current={current ? (item.id ? 'location' : 'page') : undefined}
                className={`relative inline-block py-1 transition-[color,background-color] duration-[250ms] ${
                  tone === 'plum' ? 'hover:text-bubblegum' : 'lnk-sweep'
                } ${current ? 'after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[3px] after:bg-current' : ''}`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <PauseButton tone={tone} />
      <HardButton
        to="/#contact"
        onClick={(e) => onSection(e, '/#contact')}
        tone={tone === 'plum' ? 'bubblegum' : 'plum'}
        shadow="grape"
        offset={4}
        magnetic
        className={compact ? 'px-[18px] py-2.5 text-[16px]' : 'px-[22px] py-3 text-[17px]'}
      >
        Hire me
      </HardButton>
    </nav>
  );
}

/** Stops every marquee and the rotating sticker (WCAG 2.2.2). Hidden when nothing moves. */
export function PauseButton({ tone }: { tone: HeaderTone }) {
  const { paused, togglePaused, reduced } = useMotionPrefs();
  if (reduced) return null;
  return (
    <button
      type="button"
      onClick={togglePaused}
      aria-pressed={paused}
      aria-label={paused ? 'Play motion' : 'Pause motion'}
      title={paused ? 'Play motion' : 'Pause motion'}
      className={`inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-[4px] border-[1.5px] border-current bg-transparent transition-[color,background-color] duration-[250ms] ${
        tone === 'plum' ? 'text-cream hover:bg-cream hover:text-plum' : 'text-plum hover:bg-plum hover:text-cream'
      }`}
    >
      {paused ? (
        <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
          <path d="M4 2.5v11l9-5.5z" fill="currentColor" />
        </svg>
      ) : (
        <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
          <path d="M4 2.5h3v11H4zM9 2.5h3v11H9z" fill="currentColor" />
        </svg>
      )}
    </button>
  );
}
