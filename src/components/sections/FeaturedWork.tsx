import { m } from 'motion/react';
import { featuredProject as p } from '../../data/projects';
import { ease } from '../../lib/motion';
import { HardButton } from '../ui/HardButton';
import { HardPanel } from '../ui/HardPanel';

export function Chip({ children }: { children: string }) {
  return (
    <li className="inline-block rounded-[4px] bg-apricot px-2.5 py-[5px] text-[14px] font-semibold text-plum transition-transform duration-[250ms] ease-zine hover:-rotate-2 sm:px-3 sm:py-1.5 sm:text-[15px]">
      {children}
    </li>
  );
}

/**
 * Abstract, flat UI blocks standing in for screenshots.
 * TODO(content): replace with anonymised or approved Best Life Foundry screenshots.
 */
function BrowserSkeleton() {
  return (
    <div aria-hidden="true" className="grid h-full grid-cols-[28%_1fr] gap-3 p-3 sm:gap-4 sm:p-4">
      <div className="flex flex-col gap-2">
        <span className="h-3 w-3/4 bg-plum/80" />
        <span className="h-2 w-full bg-plum/15" />
        <span className="h-2 w-5/6 bg-plum/15" />
        <span className="h-2 w-2/3 bg-plum/15" />
        <span className="mt-auto h-6 w-full rounded-[4px] bg-grape" />
      </div>
      <div className="flex flex-col gap-2 sm:gap-3">
        <span className="h-4 w-1/2 bg-plum/80" />
        <div className="grid flex-1 grid-cols-3 gap-2 sm:gap-3">
          <span className="bg-bubblegum" />
          <span className="bg-apricot" />
          <span className="bg-plum/10" />
        </div>
        <span className="h-2 w-full bg-plum/15" />
        <span className="h-2 w-4/5 bg-plum/15" />
      </div>
    </div>
  );
}

function PhoneSkeleton() {
  return (
    <div aria-hidden="true" className="mt-4 flex w-full flex-col gap-2 px-3 sm:mt-6 sm:gap-3 sm:px-4">
      <span className="h-3 w-2/3 bg-plum/80" />
      <span className="h-14 w-full rounded-[4px] bg-bubblegum sm:h-20" />
      <span className="h-2 w-full bg-plum/15" />
      <span className="h-2 w-4/5 bg-plum/15" />
      <span className="h-10 w-full rounded-[4px] bg-plum/10 sm:h-14" />
    </div>
  );
}

/** Featured grape block for the Best Life Foundry AI suite. */
export function FeaturedWork() {
  return (
    <m.div
      className="mb-9 mr-1.5 sm:mb-[72px] md:mr-0"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.8, ease }}
    >
      <HardPanel shadow="bg-plum" offset="var(--fo)" outerClassName="[--fo:6px] sm:[--fo:8px]" className="on-grape">
        <article
          aria-labelledby="featured-title"
          className="grid px-[22px] pb-7 pt-6 [grid-template-areas:'text'_'chips'_'frames'_'cta'] sm:p-[clamp(28px,3.5vw,52px)] md:grid-cols-2 md:grid-rows-[1fr_auto_auto] md:gap-x-[clamp(32px,4vw,64px)] md:[grid-template-areas:'text_frames'_'chips_frames'_'cta_frames']"
        >
          <div className="[grid-area:text] md:pb-9">
            <span className="inline-block rotate-[-2deg] rounded-[4px] bg-bubblegum px-3 py-[5px] text-[14px] font-semibold text-plum sm:px-3.5 sm:py-1.5 sm:text-[15px]">
              Featured
            </span>
            <h3 id="featured-title" className="font-heavy mb-3 mt-5 text-[36px] leading-none sm:mb-[18px] sm:mt-[26px] sm:text-[clamp(40px,4.6vw,66px)]">
              {p.title}
            </h3>
            <p className="m-0 max-w-[28em] text-[17px] leading-[1.5] sm:text-[20px] sm:leading-[1.55]">{p.tagline}</p>
          </div>

          <ul aria-label="Stack" className="m-0 my-5 flex list-none flex-wrap gap-2 p-0 [grid-area:chips] sm:gap-2.5 md:mb-7 md:mt-0">
            {p.tech.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </ul>

          <div className="relative mb-[26px] h-[224px] [grid-area:frames] sm:h-[380px] md:mb-0 md:h-auto md:min-h-[380px]">
            <div className="absolute left-0 right-[52px] top-0 h-[184px] border-2 border-plum bg-cream text-plum shadow-[5px_5px_0_var(--color-plum)] sm:right-20 sm:h-[290px] sm:shadow-[7px_7px_0_var(--color-plum)]">
              <div className="flex h-[26px] items-center gap-2 border-b-2 border-plum bg-apricot px-3 sm:h-[34px]">
                {[0, 1, 2].map((d) => (
                  <span key={d} className="hidden h-2.5 w-2.5 rounded-full border-2 border-plum sm:block" />
                ))}
              </div>
              <div className="h-[calc(100%-26px)] sm:h-[calc(100%-34px)]">
                <BrowserSkeleton />
              </div>
            </div>
            <div className="absolute bottom-0 right-0 flex h-[196px] w-[104px] flex-col items-center rounded-[18px] border-2 border-plum bg-cream pt-2.5 shadow-[4px_4px_0_var(--color-plum)] sm:bottom-1.5 sm:h-[300px] sm:w-[158px] sm:rounded-[24px] sm:pt-3.5 sm:shadow-[6px_6px_0_var(--color-plum)]">
              <span className="h-[5px] w-[34px] rounded-[3px] bg-apricot sm:h-1.5 sm:w-12" />
              <PhoneSkeleton />
            </div>
            <m.div
              aria-hidden="true"
              className="font-heavy absolute -bottom-2 -left-2.5 flex h-[78px] w-[78px] items-center justify-center rounded-full bg-bubblegum text-center text-[15px] leading-[1.05] tracking-normal text-plum sm:-bottom-3.5 sm:-left-[26px] sm:h-[104px] sm:w-[104px] sm:text-[19px]"
              initial={{ rotate: -40, scale: 0.4 }}
              whileInView={{ rotate: -12, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease, delay: 0.35 }}
            >
              AI
              <br />
              inside
            </m.div>
          </div>

          <div className="[grid-area:cta]">
            <HardButton
              to={`/work/${p.slug}`}
              tone="cream"
              shadow="plum"
              offset={5}
              magnetic
              className="min-h-[52px] px-5 text-[16px] sm:min-h-0 sm:px-[22px] sm:py-3.5 sm:text-[17px]"
            >
              View case study ↗
            </HardButton>
          </div>
        </article>
      </HardPanel>
    </m.div>
  );
}
