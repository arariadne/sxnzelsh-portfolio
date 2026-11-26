import { startTransition, useEffect, useState } from 'react';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { Seo } from '../components/layout/Seo';
import { Hero } from '../components/hero/Hero';
import { About } from '../components/sections/About';
import { Contact } from '../components/sections/Contact';
import { Skills } from '../components/sections/Skills';
import { WhatIDo } from '../components/sections/WhatIDo';
import { Work } from '../components/sections/Work';

/**
 * The hero renders first; the sections below it mount right after first paint
 * in a transition, so React renders them in small time slices instead of one
 * long task. They always mount on their own (not on scroll), so keyboard and
 * screen-reader users get the full page within a moment.
 * (Loading them as a separate chunk was measured and scored worse.)
 */
export default function Home() {
  const [rest, setRest] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => startTransition(() => setRest(true)));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <>
      <Seo path="/" />
      <Header tone="plum" />
      <main id="main">
        <Hero />
        {rest && (
          <>
            <About />
            <WhatIDo />
            <Work />
            <Skills />
            <Contact />
          </>
        )}
      </main>
      {rest && <Footer />}
    </>
  );
}
