import { useRef, useState, type PointerEvent } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, m, useMotionValue, useSpring } from 'motion/react';
import { indexProjects } from '../../data/projects';
import type { Project } from '../../data/types';
import { ease } from '../../lib/motion';
import { setSharedSource } from '../../lib/sharedImage';
import { useMotionPrefs } from '../../providers/MotionPrefs';
import { Picture } from '../ui/Picture';

const meta = (p: Project) => `${p.type} · ${p.tech.join(', ')}`;

/** Card contents: real screenshot, or a flat placeholder when there is none yet. */
function Thumb({ project, sizes }: { project: Project; sizes: string }) {
  if (!project.image) {
    // TODO(content): no screenshot yet (Agribot).
    return (
      <span className="font-heavy flex h-full w-full items-center justify-center bg-apricot text-[22px] tracking-tight text-plum">
        {project.title}
      </span>
    );
  }
  return <Picture name={project.image.name} alt="" sizes={sizes} className="block h-full w-full object-cover object-top" />;
}

/**
 * The printed-contents index of projects. On fine pointers, a tilted preview of
 * the hovered project follows the cursor with a slight lag; on touch devices a
 * small thumbnail sits in each row instead.
 */
export function WorkList() {
  const { finePointer, reduced } = useMotionPrefs();
  const showCard = finePointer && !reduced;
  const list = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 170, damping: 22, mass: 0.6 });
  const y = useSpring(useMotionValue(0), { stiffness: 170, damping: 22, mass: 0.6 });

  const onMove = (e: PointerEvent) => {
    if (!list.current) return;
    const r = list.current.getBoundingClientRect();
    const nx = e.clientX - r.left;
    const ny = e.clientY - r.top;
    // Jump into place on entry instead of flying in from the corner.
    if (active === null) {
      x.jump(nx);
      y.jump(ny);
    }
    x.set(nx);
    y.set(ny);
  };

  return (
    <div ref={list} className="relative border-b border-plum" onPointerMove={showCard ? onMove : undefined} onPointerLeave={() => setActive(null)}>
      <ul className="m-0 list-none p-0">
        {indexProjects.map((p, i) => (
          <li key={p.slug}>
            <Link
              to={`/work/${p.slug}`}
              data-cursor={showCard ? 'hide' : undefined}
              onPointerEnter={() => setActive(i)}
              // Keyboard focus hides the cursor preview; a mouse click (which also focuses) keeps it.
              onFocus={(e) => e.currentTarget.matches(':focus-visible') && setActive(null)}
              onClick={(e) => {
                const thumb = e.currentTarget.querySelector('[data-thumb]');
                const visibleThumb = thumb && (thumb as HTMLElement).offsetParent ? thumb : null;
                if (p.image) setSharedSource(p.slug, showCard && active === i ? card.current?.querySelector('[data-card-img]') ?? null : visibleThumb, showCard ? -6 : -3);
              }}
              className="group relative grid grid-cols-[44px_minmax(0,1fr)_auto_28px] items-center gap-2 border-t border-plum py-5 transition-[background-color] duration-[250ms] hover:bg-bubblegum focus-visible:bg-bubblegum sm:grid-cols-[96px_minmax(0,1fr)_auto_40px] sm:gap-4 sm:px-6 sm:py-[26px] md:grid-cols-[96px_minmax(0,1fr)_auto_auto_40px]"
            >
              <span aria-hidden="true" className="font-italic-serif text-[32px] leading-none sm:text-[44px]">
                {p.number}
              </span>
              <span className="transition-transform duration-[250ms] ease-zine group-hover:translate-x-4 group-focus-visible:translate-x-4">
                <span className="font-display block text-[28px] font-bold leading-[1.05] tracking-[-0.03em] sm:text-[clamp(34px,4.8vw,70px)] sm:leading-none">
                  {p.title}
                </span>
                <span className="mt-1 block text-[15px] sm:text-[18px] md:hidden">{meta(p)}</span>
              </span>
              {/* Touch: inline thumbnail (no hover on these devices). */}
              {/* The wrapper always holds its grid column; only the thumbnail is touch-only. */}
              <span>
                {p.image && (
                  <span data-thumb className="hidden h-11 w-16 rotate-[-3deg] overflow-hidden border-2 border-plum bg-cream pointer-coarse:block">
                    <Thumb project={p} sizes="64px" />
                  </span>
                )}
              </span>
              <span className="hidden text-[18px] md:block">{meta(p)}</span>
              <span
                aria-hidden="true"
                className="text-[24px] transition-transform duration-[250ms] ease-zine group-hover:rotate-45 group-focus-visible:rotate-45 sm:text-[30px]"
              >
                ↗
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {showCard && (
        <m.div ref={card} aria-hidden="true" className="pointer-events-none absolute left-0 top-0 z-10" style={{ x, y }}>
          <AnimatePresence>
            {active !== null && (
              <m.div
                key="card"
                className="relative -translate-x-[70%] -translate-y-[85%]"
                initial={{ opacity: 0, scale: 0.6, rotate: -14 }}
                animate={{ opacity: 1, scale: 1, rotate: -6 }}
                exit={{ opacity: 0, scale: 0.7, rotate: -10 }}
                transition={{ duration: 0.35, ease }}
              >
                <div data-card-img className="relative h-[140px] w-[220px] overflow-hidden border-2 border-plum bg-apricot shadow-[5px_5px_0_var(--color-plum)]">
                  {indexProjects.map((p, i) => (
                    <div key={p.slug} className="absolute inset-0 transition-opacity duration-200" style={{ opacity: active === i ? 1 : 0 }}>
                      <Thumb project={p} sizes="220px" />
                    </div>
                  ))}
                </div>
                <span className="absolute -right-[26px] -top-[26px] flex h-[68px] w-[68px] rotate-[12deg] items-center justify-center rounded-full bg-grape text-[15px] font-semibold text-cream">
                  View ↗
                </span>
              </m.div>
            )}
          </AnimatePresence>
        </m.div>
      )}
    </div>
  );
}
