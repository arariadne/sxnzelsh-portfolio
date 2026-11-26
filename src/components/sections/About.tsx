import { about } from '../../data/home';
import { HairlineGrid } from '../ui/HairlineGrid';
import { DrawRule, Reveal, RevealText } from '../ui/Reveal';
import { Numeral } from '../ui/SectionHead';

/** 01 About (cream). Statement with a marker highlight, then three facts. */
export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="cv-auto on-cream relative px-gutter pb-14 pt-16 sm:pb-[clamp(56px,6vw,90px)] sm:pt-[clamp(72px,8vw,120px)]"
    >
      <HairlineGrid tone="plum" opacity={0.08} fromSm />

      <div className="relative grid gap-7 sm:gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)]">
        {/* Mobile: numeral then label side by side. Desktop: label over numeral. */}
        <div className="flex items-end gap-3.5 sm:block">
          <h2 id="about-title" className="font-heavy m-0 mb-1.5 text-[32px] leading-none sm:mb-0 sm:text-[56px]">
            About
          </h2>
          <Numeral className="order-first text-[104px] sm:order-none sm:text-[clamp(130px,14vw,200px)]">01</Numeral>
        </div>

        <div>
          <RevealText
            text={about.statement}
            className="font-heavy m-0 text-[32px] leading-[1.1] tracking-[-0.025em] sm:text-[clamp(36px,4.2vw,62px)] sm:leading-[1.08]"
            hlClassName="font-italic-serif px-[0.1em] text-[1.06em] sm:px-[0.12em] sm:text-[1.08em]"
          />
          <Reveal as="p" delay={0.2} className="mb-0 mt-[22px] max-w-[38em] text-[17px] leading-[1.6] text-muted sm:mt-[34px] sm:text-[19px]">
            {about.body}
          </Reveal>
        </div>
      </div>

      <dl className="relative m-0 mt-9 grid sm:mt-[72px] sm:grid-cols-3">
        <DrawRule className="text-plum" />
        {about.facts.map((fact, i) => (
          <Reveal
            key={fact.value}
            delay={0.1 + i * 0.08}
            className={`border-b-2 border-plum py-4 sm:border-b-0 sm:pb-0 sm:pt-[22px] ${
              i === 0 ? 'sm:pr-6' : i === 1 ? 'sm:border-l-2 sm:px-6' : 'sm:border-l-2 sm:pl-6'
            }`}
          >
            <dt className="font-heavy text-[38px] leading-none text-grape sm:text-[clamp(40px,4.4vw,64px)]">{fact.value}</dt>
            <dd className="m-0 mt-1.5 text-[16px] sm:mt-2.5 sm:text-[17px]">{fact.label}</dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
