import { useCallback, useEffect, useRef, useState, type FocusEvent, type PointerEvent, type ReactNode } from 'react';
import { AnimatePresence, m, useIsPresent, useMotionValue, type MotionValue, type Variants } from 'motion/react';
import { projects } from '../../data/projects';
import type { Project, SpotlightTone } from '../../data/types';
import { ease } from '../../lib/motion';
import { useMotionPrefs } from '../../providers/MotionPrefs';
import { HardButton } from '../ui/HardButton';
import { Picture } from '../ui/Picture';

/** How long each project stays in the spotlight before advancing. */
export const SPOTLIGHT_INTERVAL_MS = 3000;

/** Slide change duration (seconds), between the hover and reveal motion tokens. */
const SLIDE_DUR = 0.5;
const SWIPE_MIN_PX = 40;

type ButtonTone = 'plum' | 'cream' | 'grape' | 'bubblegum' | 'apricot';

/** Flat block colours with their AA-safe text pairs (no grape on plum/bubblegum). */
const tones: Record<
  SpotlightTone,
  { block: string; shadow: string; tag: string; chip: string; button: { tone: ButtonTone; shadow: ButtonTone }; frameShadow: string; focus: string }
> = {
  grape: {
    block: 'bg-grape text-cream',
    shadow: 'bg-plum',
    tag: 'bg-bubblegum text-plum',
    chip: 'bg-apricot text-plum',
    button: { tone: 'cream', shadow: 'plum' },
    frameShadow: 'shadow-[5px_5px_0_var(--color-plum)] sm:shadow-[7px_7px_0_var(--color-plum)]',
    focus: '[--focus:var(--color-apricot)]',
  },
  plum: {
    block: 'bg-plum text-cream',
    shadow: 'bg-bubblegum',
    tag: 'bg-bubblegum text-plum',
    chip: 'bg-apricot text-plum',
    button: { tone: 'cream', shadow: 'bubblegum' },
    frameShadow: 'shadow-[5px_5px_0_var(--color-bubblegum)] sm:shadow-[7px_7px_0_var(--color-bubblegum)]',
    focus: '[--focus:var(--color-apricot)]',
  },
  bubblegum: {
    block: 'bg-bubblegum text-plum',
    shadow: 'bg-plum',
    tag: 'bg-plum text-cream',
    chip: 'bg-cream text-plum',
    button: { tone: 'plum', shadow: 'grape' },
    frameShadow: 'shadow-[5px_5px_0_var(--color-plum)] sm:shadow-[7px_7px_0_var(--color-plum)]',
    focus: '[--focus:var(--color-plum)]',
  },
  apricot: {
    block: 'bg-apricot text-plum',
    shadow: 'bg-plum',
    tag: 'bg-plum text-cream',
    chip: 'bg-cream text-plum',
    button: { tone: 'plum', shadow: 'grape' },
    frameShadow: 'shadow-[5px_5px_0_var(--color-plum)] sm:shadow-[7px_7px_0_var(--color-plum)]',
    focus: '[--focus:var(--color-plum)]',
  },
};

/**
 * Frame widths, from container query units of the frame area (100cqw x 100cqh):
 * the browser frame is as wide as the area allows, or as wide as a 16:10 image that
 * still fits its height, whichever is smaller. --tb = title bar, --fs = frame shadow,
 * --pn = phone notch area; 4px = the 2px border on both sides.
 */
const browserWidth = 'min(calc(100cqw - var(--fs)), calc((100cqh - var(--tb) - 4px - var(--fs)) * 1.6 + 4px))';
const phoneWidth = 'calc((100cqh - var(--fs) - 4px - var(--pn)) * 9 / 19.5 + 4px)';
const browserWidthWithPhone = `min(calc(100cqw - var(--fs) - 16px - ${phoneWidth}), calc((100cqh - var(--tb) - 4px - var(--fs)) * 1.6 + 4px))`;

/** Rendered image width at each breakpoint (frame width minus its border), for srcset selection. */
const imageSizes = '(min-width: 1440px) 550px, (min-width: 860px) 38vw, (min-width: 640px) 70vw, calc(100vw - 110px)';
const pad = (n: number) => String(n).padStart(2, '0');

/** Wipe in from the side you're moving towards; reduced motion gets a plain fade. */
const slideVariants = (reduced: boolean): Variants =>
  reduced
    ? {
        enter: { opacity: 0, zIndex: 2 },
        center: { opacity: 1, zIndex: 2, transition: { duration: SLIDE_DUR } },
        exit: { opacity: 0, zIndex: 1, transition: { duration: SLIDE_DUR } },
      }
    : {
        enter: (d: number) => ({ clipPath: d > 0 ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)', zIndex: 2 }),
        center: { clipPath: 'inset(0% 0% 0% 0%)', zIndex: 2, transition: { duration: SLIDE_DUR, ease } },
        // Stays underneath, untouched, until the new slide has covered it.
        exit: { zIndex: 1, opacity: 0.999, transition: { duration: SLIDE_DUR } },
      };

/** Placeholder inside the browser frame until a screenshot exists. */
function FramePlaceholder() {
  // Shown only while a project has no screenshot yet.
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 bg-cream text-plum">
      <svg viewBox="0 0 64 64" aria-hidden="true" className="h-14 w-14 sm:h-20 sm:w-20">
        <rect x="14" y="22" width="36" height="28" rx="5" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M32 22V12" stroke="currentColor" strokeWidth="3" />
        <circle cx="32" cy="9" r="3" fill="currentColor" />
        <circle cx="24" cy="35" r="3.5" fill="currentColor" />
        <circle cx="40" cy="35" r="3.5" fill="currentColor" />
        <path d="M24 43H40M8 32V40M56 32V40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <p className="m-0 text-[15px] font-semibold">Photo coming soon</p>
    </div>
  );
}

function Slide({ project, position, total, dir, reduced }: { project: Project; position: number; total: number; dir: number; reduced: boolean }) {
  const present = useIsPresent();
  const t = tones[project.tone];
  const hasPhone = !!project.mobileImage;

  return (
    <m.article
      custom={dir}
      variants={slideVariants(reduced)}
      initial="enter"
      animate="center"
      exit="exit"
      // The outgoing slide is only visual while it's covered.
      aria-hidden={!present || undefined}
      inert={!present}
      aria-roledescription="slide"
      aria-label={`${position} of ${total}: ${project.title}`}
      className={`absolute inset-0 ${t.focus}`}
    >
      <div aria-hidden="true" className={`absolute bottom-0 left-[var(--so)] right-0 top-[var(--so)] ${t.shadow}`} />
      <div
        className={`absolute bottom-[var(--so)] left-0 right-[var(--so)] top-0 flex flex-col overflow-hidden px-[22px] pb-7 pt-6 sm:p-[clamp(28px,3.5vw,52px)] md:grid md:grid-cols-2 md:gap-x-[clamp(32px,4vw,64px)] ${t.block}`}
      >
        <m.div
          className="flex flex-col md:min-h-0 md:justify-between"
          initial={reduced ? false : { opacity: 0, transform: `translateX(${dir * 28}px)` }}
          animate={{ opacity: 1, transform: 'translateX(0px)' }}
          transition={{ duration: SLIDE_DUR, ease, delay: reduced ? 0 : 0.08 }}
        >
          <div>
            <span className={`inline-block rotate-[-2deg] rounded-[4px] px-3 py-[5px] text-[14px] font-semibold sm:px-3.5 sm:py-1.5 sm:text-[15px] ${t.tag}`}>
              Spotlight {pad(position)} / {pad(total)}
            </span>
            <h3 className="font-heavy mb-3 mt-5 line-clamp-2 min-h-[2em] text-[36px] leading-none sm:mb-[18px] sm:mt-[26px] sm:text-[clamp(40px,4.6vw,66px)] md:min-h-0">
              {project.title}
            </h3>
            {/* Below 860px the title and description reserve 2 and 3 lines, so the frame is the same size on every slide. */}
            <p className="m-0 line-clamp-3 min-h-[4.5em] max-w-[28em] text-[17px] leading-[1.5] sm:min-h-[4.65em] sm:text-[20px] sm:leading-[1.55] md:min-h-0">{project.summary}</p>
          </div>
          <div className="md:mt-6">
            <ul aria-label="Stack" className="m-0 mt-5 flex list-none flex-wrap gap-2 p-0 sm:gap-2.5 md:mb-7 md:mt-0">
              {project.tech.map((tech) => (
                <li key={tech} className={`inline-block rounded-[4px] px-2.5 py-[5px] text-[14px] font-semibold sm:px-3 sm:py-1.5 sm:text-[15px] ${t.chip}`}>
                  {tech}
                </li>
              ))}
            </ul>
            <div className="hidden md:block">
              <CaseStudyButton project={project} />
            </div>
          </div>
        </m.div>

        {/* Screenshot frames. The phone frame only appears with a real mobile screenshot.
            The frame is sized from the space it has (container query units): its 16:10
            image area always fits whole, so it's never cropped sideways or overflowing,
            and every slide gets the same frame size. */}
        <div className="relative mt-6 min-h-0 flex-1 [--fs:5px] [--pn:23px] [--tb:26px] [container-type:size] sm:[--fs:7px] sm:[--pn:28px] sm:[--tb:34px] md:mt-0 md:h-full">
          <div className="flex h-full items-start gap-4">
            <div
              className={`flex shrink-0 flex-col border-2 border-plum bg-cream ${t.frameShadow}`}
              style={{ width: hasPhone ? browserWidthWithPhone : browserWidth }}
            >
              <div className="flex h-[var(--tb)] shrink-0 items-center gap-2 border-b-2 border-plum bg-apricot px-3">
                {[0, 1, 2].map((d) => (
                  <span key={d} className="hidden h-2.5 w-2.5 rounded-full border-2 border-plum sm:block" />
                ))}
              </div>
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                {project.image ? (
                  <Picture
                    name={project.image.name}
                    alt={project.image.alt}
                    sizes={imageSizes}
                    eager
                    className="absolute inset-0 block h-full w-full max-w-full object-cover object-[center_top]"
                  />
                ) : (
                  <FramePlaceholder />
                )}
              </div>
            </div>
            {hasPhone && project.mobileImage && (
              <div
                className="flex shrink-0 flex-col items-center rounded-[18px] border-2 border-plum bg-cream pt-2.5 shadow-[4px_4px_0_var(--color-plum)] sm:rounded-[24px] sm:pt-3.5"
                style={{ width: phoneWidth }}
              >
                <span className="h-[5px] w-[34px] shrink-0 rounded-[3px] bg-apricot sm:h-1.5 sm:w-12" />
                <div className="relative mt-2 aspect-[9/19.5] w-full overflow-hidden rounded-b-[16px] sm:rounded-b-[22px]">
                  <Picture
                    name={project.mobileImage.name}
                    alt={project.mobileImage.alt}
                    sizes="(min-width: 640px) 160px, 110px"
                    eager
                    className="absolute inset-0 block h-full w-full max-w-full object-cover object-top"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 md:hidden">
          <CaseStudyButton project={project} />
        </div>
      </div>
    </m.article>
  );
}

/** Live products link out ("Visit site ↗", new tab); the others open their case study. */
function CaseStudyButton({ project }: { project: Project }) {
  const t = tones[project.tone];
  const live = project.liveUrl;
  return (
    <HardButton
      to={live ?? `/work/${project.slug}`}
      external={!!live}
      tone={t.button.tone}
      shadow={t.button.shadow}
      offset={5}
      className="min-h-[52px] px-5 text-[16px] sm:min-h-0 sm:px-[22px] sm:py-3.5 sm:text-[17px]"
    >
      {live ? 'Visit site ↗' : 'View case study ↗'}
      <span className="sr-only">{live ? `: ${project.title} (opens in a new tab)` : `: ${project.title}`}</span>
    </HardButton>
  );
}

function ControlButton({ label, onClick, children, disabled }: { label: string; onClick: () => void; children: ReactNode; disabled?: boolean }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      aria-disabled={disabled || undefined}
      onClick={disabled ? undefined : onClick}
      className="inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-[4px] border-2 border-plum bg-cream text-plum transition-[background-color,color] duration-[250ms] hover:bg-plum hover:text-cream aria-disabled:cursor-not-allowed aria-disabled:opacity-50 aria-disabled:hover:bg-cream aria-disabled:hover:text-plum"
    >
      {children}
    </button>
  );
}

function Segment({
  project,
  i,
  index,
  total,
  autoplay,
  progress,
  onSelect,
}: {
  project: Project;
  i: number;
  index: number;
  total: number;
  autoplay: boolean;
  progress: MotionValue<number>;
  onSelect: (i: number) => void;
}) {
  const current = i === index;
  // Before the current slide: full. Current: fills over the interval (full when not auto-playing). After: empty.
  const fill = current ? (autoplay ? progress : 1) : i < index ? 1 : 0;
  return (
    <li className="min-w-0">
      <button
        type="button"
        onClick={() => onSelect(i)}
        aria-label={`Show ${project.title} (${i + 1} of ${total})`}
        aria-current={current ? 'true' : undefined}
        className="group flex min-h-11 w-full cursor-pointer flex-col justify-center gap-1.5 border-0 bg-transparent p-0 text-left text-plum"
      >
        <span className="relative block h-1.5 w-full overflow-hidden bg-plum/15">
          <m.span className="absolute inset-0 block origin-left bg-plum" style={{ scaleX: fill }} />
        </span>
        <span
          aria-hidden="true"
          className={`hidden truncate text-[13px] font-semibold transition-opacity duration-[250ms] sm:block ${current ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`}
        >
          {pad(i + 1)} {project.shortTitle ?? project.title}
        </span>
      </button>
    </li>
  );
}

/**
 * Auto-rotating spotlight of the projects in the index list.
 * Advances every SPOTLIGHT_INTERVAL_MS and loops. Pauses on hover, on keyboard
 * focus inside it, when the tab is hidden and when it's off-screen; never
 * auto-advances with reduced motion. Previous/Next/Pause, progress segments
 * (each a button) and touch swipes give manual control.
 */
export function Spotlight({ index, onIndex }: { index: number; onIndex: (i: number) => void }) {
  const total = projects.length;
  const project = projects[index];
  const next = projects[(index + 1) % total];
  const { reduced, paused: globalPaused } = useMotionPrefs();

  // null = follow the header's "Pause motion"; otherwise the visitor's choice here.
  const [choice, setChoice] = useState<'playing' | 'paused' | null>(null);
  const [hover, setHover] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const [inView, setInView] = useState(false);
  const [tabVisible, setTabVisible] = useState(() => typeof document === 'undefined' || document.visibilityState === 'visible');
  const [live, setLive] = useState<'off' | 'polite'>('off');
  const [dir, setDir] = useState(1);
  const region = useRef<HTMLDivElement>(null);
  const elapsed = useRef(0);
  const progress = useMotionValue(0);
  const swipe = useRef<{ x: number; y: number } | null>(null);

  const autoplay = !reduced && (choice === 'playing' || (choice === null && !globalPaused));
  const running = autoplay && !hover && !keyboardFocus && inView && tabVisible;

  const go = useCallback(
    (target: number, direction: number, manual: boolean) => {
      elapsed.current = 0;
      progress.set(0);
      setDir(direction);
      if (manual) setLive('polite');
      onIndex(((target % total) + total) % total);
    },
    [onIndex, progress, total],
  );

  // Timer: a frame loop that only runs while the spotlight may auto-advance.
  useEffect(() => {
    if (!running) return;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      elapsed.current += now - last;
      last = now;
      if (elapsed.current >= SPOTLIGHT_INTERVAL_MS) {
        go(index + 1, 1, false);
        return;
      }
      progress.set(elapsed.current / SPOTLIGHT_INTERVAL_MS);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running, index, go, progress]);

  // Off-screen and hidden-tab pauses.
  useEffect(() => {
    const el = region.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    const onVisibility = () => setTabVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  const onFocus = (e: FocusEvent) => {
    // Keyboard focus pauses; a mouse click on a control doesn't.
    if ((e.target as HTMLElement).matches(':focus-visible')) setKeyboardFocus(true);
  };
  const onBlur = (e: FocusEvent) => {
    if (!region.current?.contains(e.relatedTarget as Node | null)) setKeyboardFocus(false);
  };

  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType === 'touch') swipe.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: PointerEvent) => {
    const start = swipe.current;
    swipe.current = null;
    if (!start || e.pointerType !== 'touch') return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) < SWIPE_MIN_PX || Math.abs(dx) < Math.abs(dy) * 1.2) return;
    if (dx < 0) go(index + 1, 1, true);
    else go(index - 1, -1, true);
  };

  const togglePlay = () => {
    if (autoplay) {
      setChoice('paused');
      setLive('polite');
    } else {
      setChoice('playing');
      setLive('off');
    }
  };

  return (
    <div
      ref={region}
      role="region"
      aria-roledescription="carousel"
      aria-label="Project spotlight"
      // State for tests and debugging (no styling depends on these).
      data-autoplay={autoplay}
      data-running={running}
      data-hover={hover}
      data-focus={keyboardFocus}
      data-in-view={inView}
      data-tab-visible={tabVisible}
      className="mb-9 sm:mb-[72px]"
      onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(true)}
      onPointerLeave={() => setHover(false)}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {/* Fixed height at every breakpoint, so changing slides never shifts the page. */}
      <div
        aria-live={live}
        aria-atomic="false"
        className="relative h-[612px] touch-pan-y [--so:6px] sm:h-[860px] sm:[--so:8px] md:h-[500px]"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (swipe.current = null)}
      >
        <AnimatePresence initial={false} custom={dir}>
          <Slide key={project.slug} project={project} position={index + 1} total={total} dir={dir} reduced={reduced} />
        </AnimatePresence>

        {/* Next slide's screenshot, loaded ahead so changes never flash empty. */}
        {next.image && (
          <div aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-px w-px overflow-hidden opacity-0">
            <Picture name={next.image.name} alt="" sizes={imageSizes} eager />
          </div>
        )}
      </div>

      {/* Phones: controls on one row, the segments full width below (wide enough to tap). */}
      <div className="mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex shrink-0 gap-2">
          <ControlButton label="Previous project" onClick={() => go(index - 1, -1, true)}>
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
              <path d="M10.5 2.5L5 8l5.5 5.5" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="square" />
            </svg>
          </ControlButton>
          <ControlButton
            label={reduced ? 'Auto-rotate is off because reduced motion is on' : autoplay ? 'Pause spotlight' : 'Play spotlight'}
            onClick={togglePlay}
            disabled={reduced}
          >
            {autoplay ? (
              <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
                <path d="M4 2.5h3v11H4zM9 2.5h3v11H9z" fill="currentColor" />
              </svg>
            ) : (
              <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
                <path d="M4 2.5v11l9-5.5z" fill="currentColor" />
              </svg>
            )}
          </ControlButton>
          <ControlButton label="Next project" onClick={() => go(index + 1, 1, true)}>
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
              <path d="M5.5 2.5L11 8l-5.5 5.5" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="square" />
            </svg>
          </ControlButton>
        </div>
        <ol
          aria-label="Choose a project"
          className="m-0 grid min-w-0 flex-1 list-none gap-1.5 p-0 sm:gap-2"
          style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}
        >
          {projects.map((p, i) => (
            <Segment
              key={p.slug}
              project={p}
              i={i}
              index={index}
              total={total}
              autoplay={autoplay}
              progress={progress}
              onSelect={(target) => target !== index && go(target, target > index ? 1 : -1, true)}
            />
          ))}
        </ol>
      </div>
    </div>
  );
}

