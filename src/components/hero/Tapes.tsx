import { site } from '../../data/site';
import { Marquee } from '../ui/Marquee';

/** Two crossing tapes at the bottom edge of the hero, scrolling in opposite
 *  directions. Angles and sizes from the design (mobile / desktop). */
export function Tapes() {
  return (
    <div className="[--tape-gap:24px] sm:[--tape-gap:30px]">
      <div className="absolute bottom-[46px] left-[-6%] z-[2] w-[112%] rotate-[-3deg] bg-apricot text-plum sm:bottom-[78px] sm:left-[-5%] sm:w-[110%] sm:rotate-[-2.4deg]">
        <Marquee
          items={[...site.tapeStack]}
          gap={'var(--tape-gap)'}
          duration={40}
          className="py-[13px] font-display text-[20px] font-semibold sm:py-4 sm:text-[24px]"
        />
      </div>
      <div className="absolute bottom-2 left-[-6%] z-[3] w-[112%] rotate-[2deg] bg-bubblegum text-plum sm:bottom-[22px] sm:left-[-5%] sm:w-[110%] sm:rotate-[1.6deg]">
        <Marquee
          items={[...site.tapeRoles]}
          direction={-1}
          gap={'var(--tape-gap)'}
          duration={40}
          className="py-[11px] font-display text-[18px] font-semibold sm:py-[14px] sm:text-[22px]"
        />
      </div>
    </div>
  );
}
