import type { ReactNode } from 'react';
import { Footer } from '../components/layout/Footer';
import { Header, HEADER_PAD } from '../components/layout/Header';
import { Seo } from '../components/layout/Seo';
import { HairlineGrid } from '../components/ui/HairlineGrid';
import { HardButton } from '../components/ui/HardButton';
import { MaskLine } from '../components/ui/MaskLine';
import { Reveal } from '../components/ui/Reveal';
import { certificates } from '../data/certificates';
import { education, experience, resumeSkills, summary } from '../data/experience';
import { site } from '../data/site';

/** One numbered résumé section: numeral + label on the left, content on the right. */
function Block({ num, title, children }: { num: string; title: string; children: ReactNode }) {
  const id = `resume-${title.toLowerCase().replace(/\W+/g, '-')}`;
  return (
    <section aria-labelledby={id} className="resume-block relative grid gap-4 border-t-2 border-plum py-8 sm:py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2.6fr)] md:gap-8">
      <div className="flex items-baseline gap-3 md:block">
        <p aria-hidden="true" className="font-italic-serif m-0 text-[44px] leading-none text-grape md:text-[64px] print:hidden">
          {num}
        </p>
        <h2 id={id} className="font-heavy m-0 text-[24px] uppercase leading-none md:mt-2 md:text-[28px]">
          {title}
        </h2>
      </div>
      <div>{children}</div>
    </section>
  );
}

function Entry({ title, org, date, bullets }: { title: string; org?: string | null; date: string; bullets: string[] }) {
  return (
    <Reveal className="resume-entry mb-8 last:mb-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <div>
          <h3 className="font-heavy m-0 text-[24px] leading-[1.1] tracking-[-0.02em] sm:text-[28px]">{title}</h3>
          {org && <p className="m-0 mt-1 text-[17px] text-muted sm:text-[18px]">{org}</p>}
        </div>
        <p className="m-0 font-display text-[16px] font-bold text-grape sm:text-[18px]">{date}</p>
      </div>
      <ul className="m-0 mt-4 list-none p-0">
        {bullets.map((b) => (
          <li key={b} className="relative mb-2 pl-6 text-[16px] leading-[1.6] last:mb-0 sm:text-[17px]">
            <span aria-hidden="true" className="absolute left-0 top-[0.62em] h-2 w-2 bg-apricot print:bg-black" />
            {b}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

const contacts = [
  { label: site.email, href: `mailto:${site.email}` },
  { label: site.social.linkedin.label, href: site.social.linkedin.href },
  { label: site.social.github.label, href: site.social.github.href },
  { label: 'sxnzelsh-portfolio.vercel.app', href: site.url },
];

/** Résumé, restyled in the site's system. Print-friendly via @media print (see index.css). */
export default function Resume() {
  return (
    <>
      <Seo path="/resume" title="Résumé" description={`Résumé of ${site.name}, ${site.title}. Experience, education, skills and certificates.`} />
      <Header tone="plum" />
      <main id="main" className="resume">
        <section aria-labelledby="resume-title" className={`resume-top on-plum relative overflow-hidden px-gutter pb-14 sm:pb-20 ${HEADER_PAD}`}>
          <HairlineGrid tone="cream" opacity={0.09} />
          <div className="relative">
            <p aria-hidden="true" className="font-italic-serif m-0 mt-8 text-[clamp(56px,9vw,120px)] leading-[0.9] text-bubblegum print:hidden">
              Résumé
            </p>
            <h1 id="resume-title" className="font-heavy m-0 mt-4 text-[clamp(44px,8vw,112px)] leading-[0.92]">
              <MaskLine play>Elaisha Mae M. Arias</MaskLine>
            </h1>
            <p className="m-0 mt-4 max-w-[24em] font-display text-[22px] font-bold leading-[1.2] tracking-[-0.02em] sm:text-[clamp(24px,2.3vw,32px)]">
              {site.title}
            </p>
            <ul className="m-0 mt-6 flex list-none flex-wrap gap-x-6 gap-y-2 p-0 text-[16px] sm:text-[18px]">
              {contacts.map((c) => (
                <li key={c.href}>
                  <a href={c.href} className="lnk" {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap items-center gap-6 print:hidden">
              <HardButton
                to={site.resumePdf}
                download="Elaisha_Mae_Arias_Resume.pdf"
                tone="bubblegum"
                shadow="grape"
                offset={6}
                magnetic
                className="min-h-[52px] px-6 text-[17px]"
              >
                Download PDF
              </HardButton>
              <button
                type="button"
                onClick={() => window.print()}
                className="lnk cursor-pointer border-0 bg-transparent p-0 py-1 font-body text-[18px] font-medium text-cream"
              >
                Print this page
              </button>
            </div>
          </div>
        </section>

        <div className="resume-sheet on-cream px-gutter pb-[clamp(72px,9vw,128px)] pt-[clamp(48px,6vw,96px)]">
          <Block num="01" title="Summary">
            <Reveal as="p" className="m-0 max-w-[44em] text-[17px] leading-[1.65] sm:text-[19px]">
              {summary}
            </Reveal>
          </Block>
          <Block num="02" title="Experience">
            {experience.map((e) => (
              <Entry key={e.role} title={e.role} org={e.org} date={`${e.start} – ${e.end ?? 'Present'}`} bullets={e.bullets} />
            ))}
          </Block>
          <Block num="03" title="Education">
            {education.map((e) => (
              <Entry key={e.school} title={e.school} org={e.degree} date={e.date} bullets={e.bullets} />
            ))}
          </Block>
          <Block num="04" title="Skills">
            <dl className="m-0">
              {resumeSkills.map((s) => (
                <Reveal key={s.label} className="mb-5 last:mb-0">
                  <dt className="font-heavy text-[19px] tracking-[-0.02em] sm:text-[20px]">{s.label}</dt>
                  <dd className="m-0 mt-1 text-[16px] leading-[1.65] sm:text-[17px]">{s.value}</dd>
                </Reveal>
              ))}
            </dl>
          </Block>
          <Block num="05" title="Certificates">
            <ul className="m-0 list-none p-0">
              {certificates.map((c) => (
                <li key={c.title} className="mb-2 text-[16px] leading-[1.6] last:mb-0 sm:text-[17px]">
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="lnk font-semibold">
                    {c.title}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                  <span className="text-muted"> · {c.issuer}</span>
                </li>
              ))}
            </ul>
          </Block>
        </div>
      </main>
      <Footer />
    </>
  );
}
