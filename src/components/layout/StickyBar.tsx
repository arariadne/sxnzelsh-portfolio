import { useState } from 'react';
import { Link } from 'react-router-dom';
import { m, useMotionValueEvent } from 'motion/react';
import { useScrollSignals } from '../../providers/ScrollSignals';
import { site } from '../../data/site';
import { ease } from '../../lib/motion';
import { MobileMenu } from './MobileMenu';
import { NavLinks, PauseButton } from './NavLinks';

/** Compact plum bar: hidden while scrolling down, slides back in on scroll up
 *  once the page header is out of view. */
export function StickyBar() {
  const { scrollY } = useScrollSignals();
  const [shown, setShown] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    if (y < 480) setShown(false);
    else if (y < prev - 4) setShown(true);
    else if (y > prev + 4) setShown(false);
  });

  return (
    <m.div
      data-sticky-bar
      className="on-plum fixed inset-x-0 top-0 z-40 border-b border-cream/10 px-gutter"
      initial={false}
      animate={{ y: shown ? 0 : '-101%' }}
      transition={{ duration: 0.45, ease }}
      inert={!shown}
      aria-hidden={!shown}
    >
      <div className="flex h-16 items-center justify-between gap-6">
        <Link to="/" className="font-heavy text-[30px] leading-none tracking-[-0.04em]">
          {site.shortName}
          <span className="sr-only"> {site.name}, home</span>
        </Link>
        <NavLinks tone="plum" compact />
        <div className="flex items-center gap-2 nav:hidden">
          <PauseButton tone="plum" />
          <MobileMenu tone="plum" />
        </div>
      </div>
    </m.div>
  );
}
