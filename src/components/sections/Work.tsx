import { useState } from 'react';
import { projects } from '../../data/projects';
import { HairlineGrid } from '../ui/HairlineGrid';
import { SectionHead } from '../ui/SectionHead';
import { Spotlight } from './Spotlight';
import { WorkList } from './WorkList';

/** 03 Selected work: the rotating spotlight, then the index list (which highlights the spotlit project). */
export function Work() {
  const [spotlight, setSpotlight] = useState(0);
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="cv-auto on-cream relative px-gutter pb-[72px] pt-2 sm:pb-[clamp(72px,9vw,140px)] sm:pt-[clamp(40px,5vw,80px)]"
    >
      <HairlineGrid tone="plum" opacity={0.08} fromSm />
      <div className="relative">
        <SectionHead
          num="03"
          lines={['Selected', 'work']}
          id="work-title"
          className="mb-7 sm:mb-12"
          right={
            <p className="m-0 mb-3.5 hidden text-[18px] font-medium sm:block">
              <span className="sr-only">Projects: </span>({String(projects.length).padStart(2, '0')})
            </p>
          }
        />
        <Spotlight index={spotlight} onIndex={setSpotlight} />
        <WorkList spotlight={spotlight} />
      </div>
    </section>
  );
}
