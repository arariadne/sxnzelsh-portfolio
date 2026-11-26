import { Link } from 'react-router-dom';
import { certificates } from '../../data/certificates';
import { skillsBlurb } from '../../data/home';
import { iconPaths } from '../../data/icons';
import { aiBand, skillGroups, stackBand } from '../../data/skills';
import type { Skill, SkillGroup } from '../../data/types';
import { HairlineGrid } from '../ui/HairlineGrid';
import { Marquee } from '../ui/Marquee';
import { Reveal } from '../ui/Reveal';
import { SectionHead } from '../ui/SectionHead';

/** 20px monochrome logo, or a monogram square when the brand has no icon. */
function Logo({ skill, inverted }: { skill: Skill; inverted?: boolean }) {
  const { logo } = skill;
  return (
    <span aria-hidden="true" className="inline-flex h-[22px] w-[22px] flex-none items-center justify-center">
      {logo.kind === 'icon' && iconPaths[logo.slug] ? (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="block">
          <path d={iconPaths[logo.slug]} />
        </svg>
      ) : (
        <b
          className={`font-heavy inline-block h-[22px] min-w-[22px] rounded-[3px] px-[3px] text-center text-[10px] leading-[22px] tracking-[-0.02em] ${
            inverted ? 'bg-cream text-plum' : 'bg-plum text-cream'
          }`}
        >
          {logo.kind === 'mono' ? logo.text : skill.name.slice(0, 2)}
        </b>
      )}
    </span>
  );
}

function SkillList({ group, inverted, className = '' }: { group: SkillGroup; inverted?: boolean; className?: string }) {
  return (
    <ul className={`m-0 list-none p-0 text-[16px] leading-[1.8] sm:text-[17px] ${className}`}>
      {group.skills.map((s) => (
        <li key={s.name} className="flex items-center gap-2.5">
          <Logo skill={s} inverted={inverted} />
          {s.name}
        </li>
      ))}
    </ul>
  );
}

const colHead = 'font-heavy m-0 mb-2 border-t-2 border-plum pt-3 text-[20px] tracking-[-0.02em] sm:mb-3 sm:pt-3.5 sm:text-[22px]';

function Group({ group, index }: { group: SkillGroup; index: number }) {
  if (group.variant === 'specialty') {
    return (
      <Reveal
        delay={index * 0.05}
        className="on-plum relative col-span-2 mt-1.5 border-4 border-bubblegum px-[18px] pb-5 pt-[18px] sm:mt-2 sm:border-[5px] sm:px-6 sm:pb-[22px] sm:pt-5"
      >
        <span className="absolute -right-2 -top-4 rotate-[5deg] rounded-[4px] bg-apricot px-2.5 py-1 text-[13px] font-semibold text-plum sm:-right-3.5 sm:-top-[18px] sm:px-3 sm:py-[5px] sm:text-[14px]">
          Specialty
        </span>
        <h3 className="font-heavy m-0 mb-2 text-[24px] tracking-[-0.02em] sm:text-[26px]">{group.title}</h3>
        <p className="m-0 mb-3.5 text-[15px] font-semibold text-apricot sm:text-[16px]">{group.subline}</p>
        <SkillList group={group} inverted className="sm:columns-2 sm:gap-x-6" />
      </Reveal>
    );
  }
  if (group.variant === 'row') {
    return (
      <Reveal
        delay={index * 0.05}
        className="col-span-2 md:col-span-4 md:flex md:flex-wrap md:items-center md:gap-x-9 md:gap-y-3 md:border-t-2 md:border-plum md:pt-3.5"
      >
        <h3 className={`${colHead} md:m-0 md:border-0 md:p-0`}>{group.title}</h3>
        <SkillList group={group} className="md:flex md:flex-wrap md:gap-x-8 md:gap-y-1.5" />
      </Reveal>
    );
  }
  return (
    <Reveal delay={index * 0.05} className={index > 4 ? 'md:mt-2' : ''}>
      <h3 className={colHead}>{group.title}</h3>
      <SkillList group={group} />
    </Reveal>
  );
}

/** 04 Skills (plum): marquee bands, the tool panel, certificates and the résumé link. */
export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="cv-auto on-plum relative overflow-hidden">
      <HairlineGrid tone="cream" opacity={0.09} />

      <div className="relative px-gutter pb-9 pt-16 sm:pb-14 sm:pt-[clamp(72px,8vw,120px)]">
        <SectionHead
          num="04"
          lines={['Skills']}
          id="skills-title"
          numClassName="text-bubblegum"
          right={<p className="m-0 mb-3 hidden max-w-[22em] text-[19px] leading-[1.5] text-cream/85 sm:block">{skillsBlurb}</p>}
        />
      </div>

      <div className="[--band-gap:28px] sm:[--band-gap:36px]">
        <div className="relative -mx-[4%] rotate-[-1.5deg] bg-grape sm:-mx-[2%] sm:rotate-[-1.2deg]">
          <Marquee
            items={stackBand}
            gap="var(--band-gap)"
            duration={40}
            pauseOnHover
            className="py-3.5 font-display text-[38px] font-extrabold leading-[1.3] tracking-[-0.02em] text-cream sm:py-[18px] sm:text-[clamp(40px,5vw,72px)]"
          />
        </div>
        <div className="relative -mx-[4%] mt-1 rotate-[1deg] sm:-mx-[2%] sm:mt-1.5 sm:rotate-[0.8deg]">
          <Marquee
            items={aiBand}
            direction={-1}
            gap="var(--band-gap)"
            duration={40}
            pauseOnHover
            className="py-3.5 font-display text-[38px] font-extrabold leading-[1.3] tracking-[-0.02em] text-plum [-webkit-text-stroke:1.2px_var(--color-cream)] sm:py-[18px] sm:text-[clamp(40px,5vw,72px)] sm:[-webkit-text-stroke-width:1.5px]"
          />
        </div>
      </div>

      <div className="relative px-gutter pt-11 sm:pt-[72px]">
        <div className="mr-1.5 bg-cream px-[22px] pb-7 pt-6 text-plum shadow-[6px_6px_0_var(--color-bubblegum)] [--focus:var(--color-grape)] sm:mr-0 sm:p-[clamp(28px,3.5vw,52px)] sm:shadow-[8px_8px_0_var(--color-bubblegum)]">
          <div className="grid grid-cols-2 gap-x-5 gap-y-7 md:grid-cols-4 md:gap-x-8 md:gap-y-10">
            {skillGroups.map((g, i) => (
              <Group key={g.id} group={g} index={i} />
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-start justify-between gap-8 pb-16 pt-11 sm:pb-[clamp(72px,8vw,120px)] sm:pt-16">
          <div className="max-w-[40em]">
            <h3 className="font-heavy m-0 mb-2.5 text-[24px] tracking-[-0.02em] text-apricot sm:mb-3.5 sm:text-[26px]">Certificates</h3>
            <ul className="m-0 list-none p-0 text-[16px] leading-[1.7] text-cream/90 sm:text-[18px]">
              {certificates.map((c, i) => (
                <li key={c.title} className="inline">
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-cream/35 decoration-1 underline-offset-4 transition-[text-decoration-color] duration-[250ms] hover:decoration-cream"
                  >
                    {c.title}
                    <span className="sr-only"> ({c.issuer}, opens in a new tab)</span>
                  </a>
                  {i < certificates.length - 1 && <span aria-hidden="true"> · </span>}
                </li>
              ))}
            </ul>
          </div>
          <Link to="/resume" className="lnk font-heavy text-[24px] tracking-[-0.02em] text-bubblegum sm:text-[clamp(24px,2.4vw,34px)]">
            See my full résumé ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
