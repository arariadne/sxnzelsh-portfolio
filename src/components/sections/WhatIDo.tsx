import { m } from 'motion/react';
import { services } from '../../data/home';
import { ease, stagger } from '../../lib/motion';
import { HairlineGrid } from '../ui/HairlineGrid';
import { HardPanel } from '../ui/HardPanel';
import { SectionHead } from '../ui/SectionHead';

type Icon = (typeof services)[number]['icon'];

function ServiceIcon({ icon, className }: { icon: Icon; className: string }) {
  const stroke = icon === 'robot' ? 'var(--color-bubblegum)' : 'var(--color-plum)';
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      {icon === 'database' && (
        <>
          <ellipse cx="32" cy="14" rx="20" ry="8" fill="none" stroke={stroke} strokeWidth="3" />
          <path d="M12 14v36c0 4.4 9 8 20 8s20-3.6 20-8V14M12 32c0 4.4 9 8 20 8s20-3.6 20-8" fill="none" stroke={stroke} strokeWidth="3" />
        </>
      )}
      {icon === 'robot' && (
        <>
          <rect x="14" y="22" width="36" height="28" rx="5" fill="none" stroke={stroke} strokeWidth="3" />
          <path d="M32 22V12" stroke={stroke} strokeWidth="3" />
          <circle cx="32" cy="9" r="3" fill={stroke} />
          <circle cx="24" cy="35" r="3.5" fill={stroke} />
          <circle cx="40" cy="35" r="3.5" fill={stroke} />
          <path d="M24 43H40M8 32V40M56 32V40" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
        </>
      )}
      {icon === 'phone' && (
        <>
          <rect x="19" y="6" width="26" height="52" rx="6" fill="none" stroke={stroke} strokeWidth="3" />
          <path d="M28 13H36" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
          <circle cx="32" cy="50" r="2.5" fill={stroke} />
        </>
      )}
    </svg>
  );
}

// Colours, shadows and staggered offsets from the design.
const look = [
  { panel: 'bg-apricot text-plum', shadow: 'bg-plum', outer: 'mr-1.5 md:mr-0 md:mt-0', min: 'md:min-h-[440px]' },
  { panel: 'on-plum', shadow: 'bg-bubblegum', outer: 'ml-1.5 md:ml-0 md:mt-14', min: 'md:min-h-[500px]' },
  { panel: 'bg-bubblegum text-plum', shadow: 'bg-plum', outer: 'mr-1.5 md:mr-0 md:mt-28', min: 'md:min-h-[440px]' },
];

/** 02 What I do: three staggered panels with hard shadows that rise into place. */
export function WhatIDo() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="cv-auto on-cream relative px-gutter pb-[72px] pt-2 sm:pb-[clamp(80px,9vw,140px)] sm:pt-0"
    >
      <HairlineGrid tone="plum" opacity={0.08} fromSm />
      <SectionHead num="02" lines={['What I do']} id="services-title" className="mb-8 sm:mb-14" />

      <ul className="relative m-0 grid list-none gap-9 p-0 [--po:6px] sm:[--po:7px] md:grid-cols-3 md:items-start md:gap-8">
        {services.map((s, i) => (
          <m.li
            key={s.title}
            className={look[i].outer}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.8, ease, delay: i * stagger.panels }}
          >
            <HardPanel
              shadow={look[i].shadow}
              offset="var(--po)"
              className={`${look[i].panel} ${look[i].min} flex items-end justify-between gap-4 p-6 md:flex-col md:items-stretch md:p-8`}
            >
              <div>
                <h3 className="font-heavy m-0 mb-2.5 text-[30px] leading-[1.02] md:mb-4 md:text-[38px]">{s.title}</h3>
                <p className="m-0 text-[17px] leading-[1.5] md:text-[19px] md:leading-[1.55]">{s.body}</p>
                {s.icon === 'robot' && <span aria-hidden="true" className="mt-[22px] hidden h-1 w-16 bg-bubblegum md:block" />}
              </div>
              <ServiceIcon
                icon={s.icon}
                className={`shrink-0 self-end md:mt-7 ${s.icon === 'robot' ? 'h-14 w-14 md:h-[92px] md:w-[92px]' : 'h-[52px] w-[52px] md:h-[84px] md:w-[84px]'}`}
              />
            </HardPanel>
          </m.li>
        ))}
      </ul>
    </section>
  );
}
