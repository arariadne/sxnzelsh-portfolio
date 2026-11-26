import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { animate, m, useMotionValue } from 'motion/react';
import { Footer } from '../components/layout/Footer';
import { Header, HEADER_PAD } from '../components/layout/Header';
import { Seo } from '../components/layout/Seo';
import { HairlineGrid } from '../components/ui/HairlineGrid';
import { MaskLine } from '../components/ui/MaskLine';
import { Picture } from '../components/ui/Picture';
import { DrawRule, Reveal, RevealText } from '../components/ui/Reveal';
import { Numeral } from '../components/ui/SectionHead';
import { getProject, projects } from '../data/projects';
import type { Project } from '../data/types';
import { ease } from '../lib/motion';
import { peekSharedSource } from '../lib/sharedImage';
import { useMotionPrefs } from '../providers/MotionPrefs';
import NotFound from './NotFound';

/** Hero image. When opened from a work row, it grows out of that row's preview (FLIP). */
function HeroImage({ project }: { project: Project }) {
  const { pathname } = useLocation();
  const { reduced } = useMotionPrefs();
  const box = useRef<HTMLDivElement>(null);
  const [source] = useState(() => peekSharedSource(pathname));
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scaleX = useMotionValue(1);
  const scaleY = useMotionValue(1);
  const rotate = useMotionValue(0);

  useLayoutEffect(() => {
    if (!source || reduced || !box.current) return;
    const r = box.current.getBoundingClientRect();
    // Page coordinates, so it works whether or not the scroll reset has happened yet.
    const top = r.top + window.scrollY;
    x.set(source.rect.left - r.left);
    y.set(source.rect.top - top);
    scaleX.set(source.rect.width / r.width);
    scaleY.set(source.rect.height / r.height);
    rotate.set(source.rotate);
    const opts = { duration: 0.85, ease };
    const controls = [animate(x, 0, opts), animate(y, 0, opts), animate(scaleX, 1, opts), animate(scaleY, 1, opts), animate(rotate, 0, opts)];
    return () => controls.forEach((c) => c.stop());
  }, [source, reduced, x, y, scaleX, scaleY, rotate]);

  return (
    <m.div
      ref={box}
      className="relative z-[1] h-[clamp(240px,40vw,580px)] overflow-hidden bg-grape shadow-[6px_6px_0_var(--color-plum)] sm:shadow-[8px_8px_0_var(--color-plum)]"
      style={{ x, y, scaleX, scaleY, rotate, originX: 0, originY: 0 }}
    >
      {project.image ? (
        <Picture
          name={project.image.name}
          alt={project.image.alt}
          sizes="(min-width: 1440px) 1312px, calc(100vw - 2 * clamp(20px, 4.5vw, 64px))"
          className="block h-full w-full object-cover object-top"
          priority
        />
      ) : (
        // TODO(content): approved screenshot needed for this project.
        <div className="relative flex h-full items-center justify-center">
          <HairlineGrid tone="cream" opacity={0.14} />
          <p className="font-italic-serif relative m-0 px-6 text-center text-[clamp(40px,7vw,110px)] leading-none text-cream">{project.title}</p>
        </div>
      )}
    </m.div>
  );
}

export default function CaseStudy() {
  const { slug = '' } = useParams();
  const project = getProject(slug);
  if (!project) return <NotFound />;

  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const paragraphs = project.overview.filter(Boolean);
  const body = paragraphs.length ? paragraphs : [project.description];

  const info = [
    project.role && { label: 'Role', value: project.role },
    { label: 'Stack', value: project.tech.join(', ') },
    project.year && { label: 'Year', value: project.year },
    project.links.length > 0 && {
      label: 'Links',
      value: (
        <span className="flex flex-wrap gap-x-5 gap-y-1">
          {project.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="lnk">
              {l.label} ↗<span className="sr-only"> (opens in a new tab)</span>
            </a>
          ))}
        </span>
      ),
    },
  ].filter(Boolean) as { label: string; value: ReactNode }[];

  return (
    <>
      <Seo path={`/work/${project.slug}`} title={project.title} description={`${project.title}: ${project.description}`} />
      <Header tone="bubblegum" />
      <main id="main">
        {/* Title */}
        <section aria-labelledby="cs-title" className={`on-bubblegum relative overflow-hidden px-gutter pb-[clamp(56px,7vw,104px)] ${HEADER_PAD}`}>
          <HairlineGrid tone="plum" opacity={0.12} />
          <div className="relative">
            <Link to="/#work" className="lnk mt-6 text-[17px] font-medium">
              ← All work
            </Link>
            <h1 id="cs-title" className="font-heavy mb-0 mt-11 text-[clamp(52px,11vw,168px)] leading-[0.92]">
              <MaskLine play>{project.title}</MaskLine>
            </h1>
            <m.p
              className="font-italic-serif m-0 mt-[18px] max-w-[22em] text-[clamp(30px,4vw,60px)] leading-[1.05] tracking-[-0.01em]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.2 }}
            >
              {project.tagline}
            </m.p>
            <m.span
              className="mt-6 inline-block rotate-[5deg] rounded-[4px] bg-apricot px-4 py-2.5 text-[16px] font-semibold shadow-[4px_4px_0_var(--color-plum)] sm:absolute sm:right-[2%] sm:top-[150px] sm:mt-0"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease, delay: 0.35 }}
            >
              {project.type}
            </m.span>
          </div>
        </section>

        {/* Hero image + info strip */}
        <section aria-label="Project details" className="on-cream relative px-gutter pt-[clamp(40px,5vw,72px)]">
          <span aria-hidden="true" className="absolute left-1/2 top-[-18px] z-[2] -ml-[60px] h-9 w-[120px] rotate-[-3deg] bg-apricot" />
          <HeroImage project={project} />
          <dl className="relative m-0 mt-16 grid grid-cols-2 gap-y-6 sm:grid-cols-4 sm:gap-y-0">
            <DrawRule className="text-plum" />
            {info.map((item, i) => (
              <Reveal key={item.label} delay={0.05 * i} className={`pt-5 pr-6 ${i > 0 ? 'sm:border-l-2 sm:border-plum sm:pl-6' : ''}`}>
                <dt className="mb-2 text-[16px] text-muted">{item.label}</dt>
                <dd className="m-0 font-display text-[22px] font-bold tracking-[-0.02em] sm:text-[24px]">{item.value}</dd>
              </Reveal>
            ))}
          </dl>
        </section>

        {/* Overview */}
        <section aria-labelledby="overview-title" className="on-cream px-gutter py-[clamp(72px,9vw,128px)]">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)]">
            <div className="flex items-end gap-3.5 md:block">
              <Numeral className="text-[104px] sm:text-[clamp(100px,11vw,160px)]">01</Numeral>
              <h2 id="overview-title" className="font-heavy m-0 mb-1.5 text-[28px] uppercase leading-none md:mb-0 md:mt-2 md:text-[32px]">
                Overview
              </h2>
            </div>
            <div className="max-w-[40em]">
              <RevealText
                text={project.statement}
                className="font-heavy m-0 text-[30px] leading-[1.1] tracking-[-0.025em] sm:text-[clamp(30px,3.4vw,48px)]"
                hlClassName="font-italic-serif px-[0.1em] text-[1.06em]"
              />
              {body.map((para, i) => (
                <Reveal key={i} as="p" delay={0.1 + i * 0.05} className={`mb-0 text-[18px] leading-[1.6] sm:text-[20px] ${i === 0 ? 'mt-8' : 'mt-5'}`}>
                  {para}
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery: hidden until two more screenshots are added to the project data. */}
        {project.gallery.length >= 2 && (
          <section aria-label="Screenshots" className="on-cream px-gutter pb-[clamp(72px,9vw,128px)]">
            <div className="grid gap-8 md:grid-cols-2">
              {project.gallery.slice(0, 2).map((img, i) => (
                <div key={img.name} className={`h-[clamp(280px,32vw,460px)] overflow-hidden shadow-[7px_7px_0_var(--color-plum)] ${i ? 'bg-bubblegum' : 'bg-apricot'}`}>
                  <Picture name={img.name} alt={img.alt} sizes="(min-width: 860px) 50vw, 100vw" className="block h-full w-full object-cover object-top" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Next project */}
        <Link
          to={`/work/${next.slug}`}
          className="on-grape group block px-gutter py-[clamp(64px,8vw,120px)] transition-[background-color] duration-[250ms] hover:bg-grape-deep focus-visible:bg-grape-deep"
        >
          <p className="m-0 mb-4 text-[18px] sm:text-[20px]">Next project</p>
          <p className="font-heavy m-0 text-[clamp(52px,11vw,176px)] leading-[0.92]">
            {next.title}{' '}
            <span aria-hidden="true" className="font-italic-serif inline-block text-bubblegum transition-transform duration-[250ms] ease-zine group-hover:translate-x-4">
              →
            </span>
          </p>
        </Link>
      </main>
      <Footer />
    </>
  );
}
