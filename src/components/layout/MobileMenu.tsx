import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { AnimatePresence, m } from 'motion/react';
import { nav, site } from '../../data/site';
import { ease, stagger } from '../../lib/motion';
import { useLenis } from '../../providers/SmoothScroll';
import { useSectionNav } from '../../lib/useSectionNav';
import type { HeaderTone } from './NavLinks';

/** Menu button plus the full-screen grape menu (below 860px). */
export function MobileMenu({ tone }: { tone: HeaderTone }) {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const onSection = useSectionNav();
  const bar = tone === 'plum' ? 'bg-cream' : 'bg-plum';

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const first = panel.current?.querySelector<HTMLElement>('a, button');
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key !== 'Tab' || !panel.current) return;
      const items = Array.from(panel.current.querySelectorAll<HTMLElement>('a, button'));
      const [firstEl, lastEl] = [items[0], items[items.length - 1]];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      lenis?.start();
      button.current?.focus();
    };
  }, [open, lenis]);

  return (
    <>
      <button
        ref={button}
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
        className="flex h-12 w-12 cursor-pointer flex-col items-end justify-center gap-[7px] border-0 bg-transparent p-0"
      >
        <span className={`h-[3px] w-7 ${bar}`} />
        <span className={`h-[3px] w-5 ${bar}`} />
      </button>

      {createPortal(
        <AnimatePresence>
          {open && (
            <m.div
              ref={panel}
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="on-grape fixed inset-0 z-[90] flex flex-col px-5 pb-8"
              initial={{ clipPath: 'inset(0 0 100% 0)' }}
              animate={{ clipPath: 'inset(0 0 0% 0)' }}
              exit={{ clipPath: 'inset(0 0 100% 0)' }}
              transition={{ duration: 0.55, ease }}
            >
              <div className="flex h-[88px] items-center justify-between">
                <Link to="/" onClick={() => setOpen(false)} className="font-heavy text-[36px] leading-none tracking-[-0.04em]">
                  {site.shortName}
                  <span className="sr-only"> {site.name}, home</span>
                </Link>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="relative h-12 w-12 cursor-pointer border-0 bg-transparent p-0 text-cream"
                >
                  <span className="absolute left-2.5 top-1/2 h-[3px] w-7 -translate-y-1/2 rotate-45 bg-current" />
                  <span className="absolute left-2.5 top-1/2 h-[3px] w-7 -translate-y-1/2 -rotate-45 bg-current" />
                </button>
              </div>
              <nav aria-label="Menu" className="mt-10 flex-1">
                <ul className="m-0 list-none p-0">
                  {nav.map((item, i) => (
                    <li key={item.label} className="overflow-hidden border-t-2 border-cream/25">
                      <m.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.6, ease, delay: 0.15 + i * stagger.base }}
                      >
                        <Link
                          to={item.href}
                          onClick={(e) => {
                            // Blocks the jump now; scrolls once the menu has released scrolling.
                            onSection(e, item.href, true);
                            setOpen(false);
                          }}
                          className="font-heavy flex min-h-16 items-center justify-between py-3 text-[clamp(40px,12vw,64px)] leading-none"
                        >
                          {item.label}
                          <span aria-hidden="true" className="font-italic-serif pr-1 text-[0.6em] text-cream">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                        </Link>
                      </m.div>
                    </li>
                  ))}
                </ul>
              </nav>
              <a href={`mailto:${site.email}`} className="lnk self-start text-[18px] font-medium">
                {site.email}
              </a>
            </m.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}
