import React, { useState, useEffect } from 'react';
import './Home.css';
import InteractiveBackground from './InteractiveBackground';

const mainTechstacks = [
  { label: 'REACTJS', icon: 'https://icon.icepanel.io/Technology/svg/React.svg', glowColor: '97, 218, 251' },
  { label: 'VITEJS', icon: 'https://icon.icepanel.io/Technology/svg/Vite.js.svg', glowColor: '100, 108, 255' },
  { label: 'NODEJS', icon: 'https://icon.icepanel.io/Technology/svg/Node.js.svg', glowColor: '83, 163, 81' },
  { label: 'FIREBASE', icon: 'https://icon.icepanel.io/Technology/svg/Firebase.svg', glowColor: '255, 202, 40' },
  { label: 'SASS/SCSS', icon: 'https://icon.icepanel.io/Technology/svg/Sass.svg', glowColor: '207, 100, 154' },
  { label: 'HTML/CSS/JS', icon: null, glowColor: '227, 79, 38' },
  { label: 'NEXTJS', icon: 'https://icon.icepanel.io/Technology/png-shadow-512/Next.js.png', glowColor: '255, 255, 255' },
  { label: 'ANGULARJS', icon: 'https://icon.icepanel.io/Technology/svg/Angular.svg', glowColor: '221, 46, 16' },
  { label: 'LARAVEL PHP', icon: 'https://icon.icepanel.io/Technology/svg/Laravel.svg', glowColor: '255, 45, 85' },
  { label: 'TYPESCRIPT', icon: 'https://icon.icepanel.io/Technology/svg/TypeScript.svg', glowColor: '49, 120, 198' },
  { label: 'TAILWIND CSS', icon: 'https://icon.icepanel.io/Technology/svg/Tailwind-CSS.svg', glowColor: '56, 189, 248' },
];

const otherTechstacks = [
  { label: 'ARDUINO', icon: 'https://icon.icepanel.io/Technology/svg/Arduino.svg', glowColor: '0, 151, 156' },
  { label: 'C', icon: 'https://icon.icepanel.io/Technology/svg/C.svg', glowColor: '168, 176, 184' },
  { label: 'C#', icon: 'https://icon.icepanel.io/Technology/svg/C%23-%28CSharp%29.svg', glowColor: '35, 145, 52' },
  { label: 'C++', icon: 'https://icon.icepanel.io/Technology/svg/C%2B%2B-%28CPlusPlus%29.svg', glowColor: '0, 89, 156' },
  { label: 'JAVA', icon: 'https://icon.icepanel.io/Technology/svg/Java.svg', glowColor: '240, 152, 32' },
  { label: 'GRAPHQL', icon: 'https://icon.icepanel.io/Technology/svg/GraphQL.svg', glowColor: '229, 53, 153' },
  { label: 'THREE.JS', icon: 'https://icon.icepanel.io/Technology/svg/Three.js.svg', glowColor: '30, 41, 59' },
  { label: 'PYTHON', icon: 'https://icon.icepanel.io/Technology/svg/Python.svg', glowColor: '55, 118, 171' },
];

const projects = [
  {
    title: 'Gourmet Gamble',
    image: '/gourmetgamble.png',
    glowColor: '55, 114, 255',
    description: `A smart web platform built with React.js and Firebase that helps users turn
      everyday ingredients into practical, delicious meals. By entering what they have,
      users get tailored recipe suggestions that reduce food waste and promote sustainable cooking.`,
    tech: ['React', 'Firebase'],
    links: [
      { label: 'View Code', icon: 'fas fa-code', url: 'https://github.com/LoydAMT/gourmetgamble0' },
      { label: 'Live Demo', icon: 'fas fa-external-link-alt', url: 'https://gourmetgamble0.vercel.app' },
    ],
  },
  {
    title: 'Swiftsail',
    image: '/swiftsail.png',
    glowColor: '255, 66, 127',
    description: `A web-based ferry booking platform where operators list routes, schedules, and prices.
      Users can easily browse, compare, and book ferry trips in just a few clicks.
      The system streamlines booking, offers real-time availability, and ensures a smooth,
      hassle-free travel experience.`,
    tech: ['React', 'Node.js', 'Firebase'],
    links: [
      { label: 'View Code', icon: 'fas fa-code', url: 'https://github.com/LoydAMT/ferrybookingsystem-scamacs' },
      { label: 'Live Demo', icon: 'fas fa-external-link-alt', url: 'https://swiftsail-ferries.vercel.app' },
    ],
  },
  {
    title: 'Furwell',
    image: '/furwell.png',
    glowColor: '55, 255, 187',
    description: `A user-friendly platform connecting pet owners with nearby veterinary clinics.
      Users can quickly find clinics and book appointments online,
      while clinics can subscribe to increase their visibility and attract more clients.`,
    tech: ['React', 'NodeJS', 'Firebase'],
    links: [
      { label: 'View Code', icon: 'fas fa-code', url: 'https://github.com/laurenx122/marea-furwell' },
      { label: 'Live Demo', icon: 'fas fa-external-link-alt', url: 'https://furwell.vercel.app/Home' },
    ],
  },
  {
    title: 'Dismap',
    image: '/dismap.png',
    glowColor: '255, 185, 55',
    description: `A disease surveillance mapping system for Cebu City that visualizes outbreak data
      across barangays in real time, helping health authorities track, monitor, and
      respond to disease trends more effectively.`,
    tech: ['PHP Laravel', 'Dart','Flutter', 'MySQL', 'Maps API'],
    links: [
      { label: 'View Code', icon: 'fas fa-code', url: 'https://github.com/Mier03/DisMap' },
    ],
  },
  {
    title: 'Agribot',
    placeholder: { icon: 'fas fa-robot', className: 'placeholder-purple' },
    glowColor: '166, 55, 255',
    description: `An autonomous robot designed to identify and eliminate weeds and pests in corn fields.
      Powered by YOLOv11n object detection, Agribot navigates crop rows and targets
      threats in real time to support precision agriculture.`,
    tech: ['YOLOv11n', 'Python', 'Robotics'],
    links: [
      { label: 'View Code', icon: 'fas fa-code', url: 'https://github.com/Adrianne-John/agribot' },
    ],
  },
];

function useCarousel(items, intervalMs = 3000) {
  const base = items.length;
  const extended = [...items, ...items, ...items];

  const [trackIndex, setTrackIndex] = useState(base);
  const [paused, setPaused] = useState(false);
  const [noTransition, setNoTransition] = useState(false);

  const next = () => setTrackIndex((prev) => prev + 1);
  const prev = () => setTrackIndex((prev) => prev - 1);

  const goTo = (target) => {
    setTrackIndex((prevTrack) => {
      const current = ((prevTrack % base) + base) % base;
      let diff = target - current;
      if (diff > base / 2) diff -= base;
      if (diff < -base / 2) diff += base;
      return prevTrack + diff;
    });
  };

  useEffect(() => {
    if (trackIndex >= base * 2 || trackIndex < base) {
      const timeout = setTimeout(() => {
        setNoTransition(true);
        setTrackIndex((p) => (((p % base) + base) % base) + base);
      }, 500);
      return () => clearTimeout(timeout);
    }
    return undefined;
  }, [trackIndex, base]);

  useEffect(() => {
    if (!noTransition) return undefined;
    const raf = requestAnimationFrame(() => setNoTransition(false));
    return () => cancelAnimationFrame(raf);
  }, [noTransition]);

  useEffect(() => {
    if (paused) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const timer = setTimeout(() => {
      setTrackIndex((prev) => prev + 1);
    }, intervalMs);

    return () => clearTimeout(timer);
  }, [trackIndex, paused, intervalMs]);

  const activeIndex = ((trackIndex % base) + base) % base;

  return { extended, trackIndex, activeIndex, next, prev, goTo, setPaused, noTransition };
}

function Home() {
  const mainTech = useCarousel(mainTechstacks);
  const otherTech = useCarousel(otherTechstacks);
  const projectsCarousel = useCarousel(projects, 5000);

  return (
    <>
      {/* Main Home Section */}
      <section id="home" className="home-container">
      <div className="home-background"></div>
      <InteractiveBackground />
      <div className="home-content">
          {/* Profile Image */}
          <div className="profile-section">
            <div className="profile-image-container">
              <img
                src="/elai.jpg"
                alt="Elaisha Mae Arias"
                className="profile-image"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="content-section">
            <p className="greeting">Hi! I'm</p>
            <h1 className="name">ELAISHA MAE M. ARIAS</h1>
            <h2 className="title">an aspiring UI/UX Designer and Fullstack Developer</h2>
            
            <p className="bio">
              A full-stack developer and UI/UX designer specializing in engineering AI-powered platforms and seamless digital products. I bridge the gap between design and development by integrating advanced LLM APIs into robust system architectures while maintaining a strict focus on intuitive user experiences. I deliver clean code, scalable backends, and elegant interfaces that work flawlessly together.
            </p>

            {/* Social Links */}
            <div className="social-links">
              <a href="https://github.com/arariadne" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-github"></i>
                <span>github.com/arariadne</span>
              </a>
              <a href="https://linkedin.com/in/elaisha-arias" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-linkedin"></i>
                <span>linkedin.com/in/elaisha-arias</span>
              </a>
              <a href="https://facebook.com/elaisha.arias" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-facebook"></i>
                <span>facebook.com/elaisha.arias</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Techstacks Section */}
      <section id="main-techstacks" className="techstacks-section">
        <div className="container">
          <h2 className="section-title">MY MAIN TECHSTACKS</h2>
          <div
            className="techstack-carousel"
            onMouseEnter={() => mainTech.setPaused(true)}
            onMouseLeave={() => mainTech.setPaused(false)}
          >
            <button
              type="button"
              className="carousel-arrow carousel-arrow-left"
              onClick={mainTech.prev}
              aria-label="Previous techstack"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <div className="techstack-track-viewport">
              <div
                className={`techstack-track${mainTech.noTransition ? ' no-transition' : ''}`}
                style={{ '--active-index': mainTech.trackIndex }}
              >
                {mainTech.extended.map((tech, index) => (
                  <div
                    className={`techstack-item${index % mainTechstacks.length === mainTech.activeIndex ? ' active' : ''}`}
                    key={`${tech.label}-${index}`}
                    style={{ '--glow-color': tech.glowColor }}
                  >
                    <div className="tech-icon">
                      {tech.icon ? (
                        <img src={tech.icon} alt={tech.label} className="tech-logo" />
                      ) : (
                        <i className="fas fa-code"></i>
                      )}
                    </div>
                    <span>{tech.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <button
              type="button"
              className="carousel-arrow carousel-arrow-right"
              onClick={mainTech.next}
              aria-label="Next techstack"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Other Techstacks Section */}
      <section id="other-techstacks" className="other-techstacks-section">
        <div className="container">
          <h2 className="section-title">OTHER TECHSTACKS</h2>
          <div
            className="techstack-carousel"
            onMouseEnter={() => otherTech.setPaused(true)}
            onMouseLeave={() => otherTech.setPaused(false)}
          >
            <button
              type="button"
              className="carousel-arrow carousel-arrow-left"
              onClick={otherTech.prev}
              aria-label="Previous techstack"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <div className="techstack-track-viewport">
              <div
                className={`other-techstack-track${otherTech.noTransition ? ' no-transition' : ''}`}
                style={{ '--active-index': otherTech.trackIndex }}
              >
                {otherTech.extended.map((tech, index) => (
                  <div
                    className={`techstack-item${index % otherTechstacks.length === otherTech.activeIndex ? ' active' : ''}`}
                    key={`${tech.label}-${index}`}
                    style={{ '--glow-color': tech.glowColor }}
                  >
                    <div className="tech-icon">
                      <img src={tech.icon} alt={tech.label} className="tech-logo" />
                    </div>
                    <span>{tech.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <button
              type="button"
              className="carousel-arrow carousel-arrow-right"
              onClick={otherTech.next}
              aria-label="Next techstack"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </section>

      <section id="projects" className="projects-section">
        <div className="container">
          <h2 className="section-title">MY PROJECTS</h2>

          <div
            className="projects-carousel"
            onMouseEnter={() => projectsCarousel.setPaused(true)}
            onMouseLeave={() => projectsCarousel.setPaused(false)}
          >
            <button
              type="button"
              className="carousel-arrow carousel-arrow-left"
              onClick={projectsCarousel.prev}
              aria-label="Previous project"
            >
              <i className="fas fa-chevron-left"></i>
            </button>

            <div className="projects-track-viewport">
              <div
                className={`projects-track${projectsCarousel.noTransition ? ' no-transition' : ''}`}
                style={{ '--active-index': projectsCarousel.trackIndex }}
              >
                {projectsCarousel.extended.map((project, index) => (
                  <div
                    key={`${project.title}-${index}`}
                    className={`project-card${index % projects.length === projectsCarousel.activeIndex ? ' active' : ''}`}
                    style={{ '--glow-color': project.glowColor }}
                  >
                    {project.placeholder ? (
                      <div className={`project-image project-image-placeholder ${project.placeholder.className}`}>
                        <i className={project.placeholder.icon}></i>
                      </div>
                    ) : (
                      <div className="project-image">
                        <img src={project.image} alt={project.title} className="project-img-icon" />
                      </div>
                    )}
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    <div className="project-tech">
                      {project.tech.map((tech) => (
                        <span className="tech-tag" key={tech}>{tech}</span>
                      ))}
                    </div>
                    <div className="project-links">
                      {project.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`project-link${project.links.length === 1 ? ' project-link-full' : ''}`}
                        >
                          <i className={link.icon}></i> {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="carousel-arrow carousel-arrow-right"
              onClick={projectsCarousel.next}
              aria-label="Next project"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>

          <div className="carousel-dots">
            {projects.map((project, index) => (
              <button
                key={project.title}
                type="button"
                className={`carousel-dot${index === projectsCarousel.activeIndex ? ' active' : ''}`}
                onClick={() => projectsCarousel.goTo(index)}
                aria-label={`Go to ${project.title}`}
              ></button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;