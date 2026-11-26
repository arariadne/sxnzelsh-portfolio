import { useRef } from 'react';
import { m, useScroll, useTransform } from 'motion/react';
import { site } from '../../data/site';
import { ease, stagger } from '../../lib/motion';
import { useIntro } from '../../providers/Intro';
import { useMotionPrefs } from '../../providers/MotionPrefs';
import { useSectionNav } from '../../lib/useSectionNav';
import { HairlineGrid } from '../ui/HairlineGrid';
import { HardButton } from '../ui/HardButton';
import { MaskLine } from '../ui/MaskLine';
import { Picture } from '../ui/Picture';
import { HEADER_PAD } from '../layout/Header';
import { Sticker } from './Sticker';
import { Tapes } from './Tapes';

/**
 * Hero (plum, cream hairline grid). Left: name, role, intro, CTAs.
 * Right: halo, polaroid portrait, stickers and the hand-written note.
 * The left column sits above the right one so nothing ever covers the name.
 */
export function Hero() {
  const intro = useIntro();
  const { reduced } = useMotionPrefs();
  const onSection = useSectionNav();
  const section = useRef<HTMLElement>(null);
  const play = intro.play;

  // Parallax: the halo drifts faster than the frame.
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end start'] });
  const haloY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const frameY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  // Whole transform strings so the browser can run these on the compositor.
  const fadeUp = (i: number) => ({
    initial: play ? { opacity: 0, transform: 'translateY(18px)' } : false,
    animate: { opacity: 1, transform: 'translateY(0px)' },
    transition: { duration: 0.7, ease, delay: 0.35 + i * stagger.base },
  });

  return (
    <section
      ref={section}
      id="top"
      aria-labelledby="hero-name"
      className={`on-plum relative overflow-hidden px-gutter pb-[110px] sm:pb-[210px] ${HEADER_PAD}`}
    >
      <HairlineGrid tone="cream" opacity={0.09} />

      <div key={intro.key} className="relative grid md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:gap-x-6">
        {/* Left column */}
        <div className="relative z-10 flex flex-col justify-center sm:gap-[34px] sm:pt-7">
          <div>
            <m.span
              {...fadeUp(0)}
              className="mb-5 mt-3 inline-block rounded-[4px] bg-bubblegum px-3 py-[5px] text-[14px] font-semibold text-plum sm:mb-[26px] sm:mt-0 sm:px-3.5 sm:py-1.5 sm:text-[15px]"
            >
              {site.location}
            </m.span>
            <h1
              id="hero-name"
              className="font-heavy m-0 text-[clamp(60px,21.5vw,84px)] leading-[0.9] text-cream sm:text-[clamp(88px,11.2vw,166px)]"
            >
              <MaskLine play={play}>Elaisha</MaskLine>
              <MaskLine play={play} delay={0.08}>
                Mae{' '}
                <span className="font-italic-serif relative inline-block text-[1.04em] tracking-[-0.02em] text-bubblegum sm:text-[1.06em]">
                  Arias
                  <svg
                    viewBox="0 0 300 24"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    className="absolute bottom-[-0.08em] left-0 h-[0.12em] min-h-[9px] w-full sm:bottom-[-0.1em] sm:min-h-3"
                  >
                    <m.path
                      d="M2 12C30 0 60 22 90 10S150 2 180 12S240 20 298 8"
                      stroke="var(--color-apricot)"
                      strokeWidth="7"
                      fill="none"
                      strokeLinecap="round"
                      initial={play ? { pathLength: 0 } : false}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.45, ease, delay: 0.75 }}
                    />
                  </svg>
                </span>
              </MaskLine>
            </h1>
          </div>

          <div>
            <m.p
              {...fadeUp(1)}
              className="mb-3 mt-[30px] max-w-[16em] font-display text-[23px] font-bold leading-[1.2] tracking-[-0.02em] sm:mb-4 sm:mt-0 sm:text-[clamp(24px,2.3vw,32px)]"
            >
              {site.title}
            </m.p>
            <m.p {...fadeUp(2)} className="mb-[26px] mt-0 max-w-[29em] text-[17px] leading-[1.55] text-cream/85 sm:mb-[30px] sm:text-[19px]">
              {site.intro}
            </m.p>
            <m.div {...fadeUp(3)} className="mb-14 flex flex-wrap items-center gap-[22px] sm:mb-0 sm:gap-[30px]">
              <HardButton
                to="/#work"
                onClick={(e) => onSection(e, '/#work')}
                tone="grape"
                shadow="bubblegum"
                offset={6}
                magnetic
                className="min-h-[52px] px-[22px] text-[16px] sm:min-h-[50px] sm:px-[26px] sm:text-[17px]"
              >
                See my work
              </HardButton>
              <a href="/#contact" onClick={(e) => onSection(e, '/#contact')} className="lnk py-2 text-[17px] font-medium sm:text-[18px]">
                Say hello
              </a>
            </m.div>
            {site.availableForWork && <p className="sr-only">Available for work.</p>}
          </div>
        </div>

        {/* Right column: the stage. Mobile values below 640px, desktop above. */}
        <div className="relative h-[500px] w-full sm:mx-auto sm:h-[640px] sm:max-w-[537px] md:mx-0 md:h-auto md:min-h-[640px] md:max-w-none">
          {/* Halo */}
          <m.div
            aria-hidden="true"
            className="absolute left-[-10px] top-[96px] h-[270px] w-[270px] sm:left-[calc(50%-250px)] sm:top-[170px] sm:h-[400px] sm:w-[400px]"
            style={reduced ? undefined : { y: haloY }}
          >
            <m.div
              className="h-full w-full rounded-full bg-bubblegum"
              initial={play ? { transform: 'scale(0.6)', opacity: 0 } : false}
              animate={{ transform: 'scale(1)', opacity: 1 }}
              transition={{ duration: 0.7, ease, delay: 0.1 }}
            />
          </m.div>

          {/* Frame layer: polaroid, stickers, note */}
          <m.div className="absolute inset-0" style={reduced ? undefined : { y: frameY }}>
            <m.figure
              className="absolute left-[40px] top-[24px] m-0 w-[260px] bg-cream px-3 pb-12 pt-3 shadow-[6px_6px_0_var(--color-grape)] sm:left-[calc(50%-170px)] sm:top-12 sm:w-[350px] sm:px-4 sm:pb-[62px] sm:pt-4 sm:shadow-[8px_8px_0_var(--color-grape)]"
              initial={play ? { transform: 'translateY(-70px) rotate(-5deg)' } : false}
              animate={{ transform: 'translateY(0px) rotate(3deg)' }}
              transition={{ duration: 0.8, ease, delay: 0.15 }}
            >
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-[-16px] ml-[-52px] h-[26px] w-[84px] rotate-[-5deg] bg-apricot sm:top-[-20px] sm:ml-[-70px] sm:h-[34px] sm:w-[110px]"
              />
              <Picture
                name="portrait"
                alt="Portrait of Elaisha Mae Arias smiling, with dark wavy hair and a crimson lace dress"
                sizes="(min-width: 640px) 318px, 236px"
                className="block aspect-[4/5] h-auto w-full bg-plum object-cover"
                priority
              />
            </m.figure>

            {site.availableForWork && (
              <Sticker
                play={play}
                className="absolute right-[-6px] top-[276px] h-[104px] w-[104px] sm:top-[392px] sm:h-[132px] sm:w-[132px]"
              />
            )}

            <m.div
              aria-hidden="true"
              className="absolute left-0 top-[402px] origin-left sm:left-[calc(50%-250px)] sm:top-[532px]"
              initial={play ? { opacity: 0, transform: 'scale(0.6)' } : false}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              transition={{ duration: 0.5, ease, delay: 0.6 }}
            >
              <span className="block rotate-[-6deg] rounded-[4px] bg-grape px-3.5 py-[9px] text-[15px] font-semibold text-cream sm:rotate-[-7deg] sm:px-4 sm:py-2.5 sm:text-[16px]">
                {site.platforms}
              </span>
            </m.div>

            {/* Hand-written note with a self-drawing arrow (arrow on desktop only, as designed). */}
            <m.p
              aria-hidden="true"
              className="absolute left-[-4px] top-[-8px] m-0 rotate-[-6deg] font-hand text-[40px] leading-none text-cream sm:left-auto sm:right-[2%] sm:top-2.5 sm:text-[46px]"
              initial={play ? { clipPath: 'inset(0 100% 0 0)' } : false}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.6 }}
            >
              hello!
            </m.p>
            <svg
              viewBox="0 0 80 70"
              aria-hidden="true"
              className="absolute right-[18%] top-[62px] hidden h-[62px] w-[72px] sm:block"
            >
              <m.path
                d="M70 6C70 36 50 54 10 58M24 44L8 58L28 66"
                stroke="var(--color-cream)"
                strokeWidth="2.6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={play ? { pathLength: 0 } : false}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.35, ease: 'easeInOut', delay: 0.85 }}
              />
            </svg>
          </m.div>
        </div>
      </div>

      <Tapes />
    </section>
  );
}
