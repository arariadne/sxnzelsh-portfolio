import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { contactHeading } from '../../data/home';
import { site } from '../../data/site';
import { ease } from '../../lib/motion';
import { useMotionPrefs } from '../../providers/MotionPrefs';
import { HairlineGrid } from '../ui/HairlineGrid';
import { Magnetic } from '../ui/Magnetic';
import { RevealLines } from '../ui/Reveal';

const VIEW = { once: true, margin: '0px 0px -10% 0px' } as const;

function Sparkle({ className, size }: { className: string; size: 'lg' | 'sm' }) {
  const { paused } = useMotionPrefs();
  return (
    <m.svg
      viewBox={size === 'lg' ? '0 0 60 60' : '0 0 40 40'}
      aria-hidden="true"
      className={className}
      animate={paused ? undefined : { scale: [1, 1.18, 1], rotate: [0, 12, 0] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
    >
      <path
        d={size === 'lg' ? 'M30 4C32 22 38 28 56 30C38 32 32 38 30 56C28 38 22 32 4 30C22 28 28 22 30 4Z' : 'M20 3C21 14 26 19 37 20C26 21 21 26 20 37C19 26 14 21 3 20C14 19 19 14 20 3Z'}
        fill="none"
        stroke="var(--color-plum)"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
    </m.svg>
  );
}

const rows = [
  { label: 'Email', value: site.email, href: `mailto:${site.email}`, copy: true },
  { label: 'GitHub', value: site.social.github.label, href: site.social.github.href },
  { label: 'LinkedIn', value: site.social.linkedin.label, href: site.social.linkedin.href },
];

/** Contact (bubblegum): big heading, the "Say hello" disc and the link rows. */
export function Contact() {
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<number>(0);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    let message = 'Email copied';
    try {
      await navigator.clipboard.writeText(site.email);
    } catch {
      message = `Couldn’t copy. The address is ${site.email}`;
    }
    setToast(message);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(null), 2600);
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="cv-auto on-bubblegum relative">
      <HairlineGrid tone="plum" opacity={0.12} />
      <div className="relative px-gutter pb-10 pt-16 sm:pb-14 sm:pt-[clamp(72px,8vw,120px)]">
        <div className="sm:flex sm:flex-wrap sm:items-start sm:justify-between sm:gap-10">
          <h2 id="contact-title" className="font-heavy m-0 text-[68px] leading-[0.92] sm:text-[clamp(76px,10.5vw,156px)]">
            <RevealLines
              lines={[
                contactHeading[0],
                contactHeading[1],
                <span key="u" className="font-italic-serif text-[1.06em] tracking-[-0.02em]">
                  {contactHeading[2]}
                </span>,
              ]}
            />
          </h2>

          <div className="relative mt-5 h-[200px] sm:mt-0 sm:h-[290px] sm:w-[300px]">
            <m.div
              className="absolute left-2 top-0 sm:left-[30px]"
              initial={{ scale: 0.5, rotate: -40, opacity: 0 }}
              whileInView={{ scale: 1, rotate: -6, opacity: 1 }}
              viewport={VIEW}
              transition={{ duration: 0.8, ease }}
            >
              <Magnetic strength={0.2}>
                <a href={`mailto:${site.email}`} className="group relative block h-[156px] w-[156px] rounded-full sm:h-[200px] sm:w-[200px]">
                  <span aria-hidden="true" className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-full bg-plum sm:translate-x-[7px] sm:translate-y-[7px]" />
                  <span className="font-heavy relative flex h-full w-full items-center justify-center rounded-full bg-grape text-center text-[27px] leading-[1.05] text-cream transition-transform duration-[250ms] ease-zine group-hover:-translate-x-1 group-hover:-translate-y-1 sm:text-[34px]">
                    Say
                    <br />
                    hello ↗
                  </span>
                </a>
              </Magnetic>
            </m.div>

            <Sparkle size="lg" className="absolute left-[190px] top-5 h-[34px] w-[34px] sm:left-0 sm:top-[206px] sm:h-11 sm:w-11" />
            <Sparkle size="sm" className="absolute left-[250px] top-2.5 hidden h-7 w-7 sm:block" />

            <m.p
              aria-hidden="true"
              className="absolute left-[190px] top-[92px] m-0 w-[130px] rotate-[-5deg] text-center font-hand text-[30px] leading-[0.95] sm:left-[150px] sm:top-[214px] sm:text-[36px]"
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
              viewport={VIEW}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
            >
              thanks for scrolling!
            </m.p>
            <svg viewBox="0 0 50 40" aria-hidden="true" className="absolute left-[108px] top-[236px] hidden h-[38px] w-[46px] sm:block">
              <m.path
                d="M44 6C40 22 26 30 8 32M18 22L6 33L22 38"
                stroke="var(--color-plum)"
                strokeWidth="2.4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={VIEW}
                transition={{ duration: 0.45, ease: 'easeInOut', delay: 1 }}
              />
            </svg>
          </div>
        </div>

        <ul className="m-0 mt-4 list-none border-b border-plum p-0 sm:mt-16">
          {rows.map((row) => (
            <li
              key={row.label}
              className="group relative border-t border-plum transition-[background-color,color] duration-[250ms] [--focus:var(--color-cream)] hover:bg-plum hover:text-cream focus-within:bg-plum focus-within:text-cream"
            >
              <a
                href={row.href}
                {...(row.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="flex min-h-14 items-center justify-between py-4 font-display text-[21px] font-bold tracking-[-0.02em] outline-offset-[-3px] sm:px-3 sm:py-5 sm:text-[clamp(30px,3.6vw,52px)]"
              >
                <span className="transition-transform duration-[250ms] ease-zine group-hover:translate-x-4 group-focus-within:translate-x-4">
                  <span className="font-extrabold">{row.label}</span>
                  <span className="hidden sm:inline"> / {row.value}</span>
                  {row.href.startsWith('http') && <span className="sr-only"> (opens in a new tab)</span>}
                </span>
                <span aria-hidden="true" className="font-[Arial,sans-serif] leading-none transition-transform duration-[250ms] ease-zine group-hover:-translate-x-4 group-focus-within:-translate-x-4">
                  →
                </span>
              </a>
              {row.copy && (
                <button
                  type="button"
                  onClick={copy}
                  aria-label={`Copy email address ${site.email}`}
                  className="absolute right-12 top-1/2 -translate-y-1/2 cursor-pointer rounded-[4px] border-[1.5px] border-current bg-transparent px-2.5 py-1 font-body text-[14px] font-semibold text-current transition-[background-color,color] duration-[250ms] hover:bg-cream hover:text-plum sm:right-[clamp(72px,7vw,104px)] sm:text-[15px]"
                >
                  Copy
                </button>
              )}
            </li>
          ))}
        </ul>
        <p className="m-0 mt-5 text-[16px] sm:hidden">{site.email}</p>
      </div>

      {/* Screen-reader announcement for the copy button. */}
      <p className="sr-only" role="status" aria-live="polite">
        {toast ?? ''}
      </p>
      <AnimatePresence>
        {toast && (
          <m.div
            aria-hidden="true"
            className="fixed bottom-6 left-1/2 z-[95] -translate-x-1/2 rounded-[4px] bg-plum px-5 py-3 text-[16px] font-semibold text-cream shadow-[4px_4px_0_var(--color-apricot)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.3, ease }}
          >
            {toast}
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
}
