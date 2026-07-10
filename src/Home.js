import React, { useState, useEffect } from 'react';
import './Home.css';
import InteractiveBackground from './InteractiveBackground';
import useScrollReveal from './useScrollReveal';

const socialLinks = [
  {
    name: 'GitHub',
    label: 'github.com/arariadne',
    url: 'https://github.com/arariadne',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    label: 'linkedin.com/in/elaisha-arias',
    url: 'https://linkedin.com/in/elaisha-arias',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22.23 0H1.77C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.77 24h20.46c.978 0 1.77-.773 1.77-1.729V1.729C24 .774 23.208 0 22.23 0zM7.12 20.452H3.56V9h3.56v11.452zM5.34 7.433c-1.144 0-2.07-.926-2.07-2.07 0-1.143.926-2.07 2.07-2.07 1.143 0 2.07.927 2.07 2.07 0 1.144-.927 2.07-2.07 2.07zM20.452 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.85-3.037-1.851 0-2.134 1.446-2.134 2.94v5.666H9.36V9h3.413v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.602 0 4.267 2.372 4.267 5.457v6.284z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    label: 'facebook.com/elaisha.arias',
    url: 'https://facebook.com/elaisha.arias',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24h11.494v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24h-1.918c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.407 24 24 23.407 24 22.676V1.325C24 .593 23.407 0 22.675 0z" />
      </svg>
    ),
  },
];

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

const techCategories = [
  { key: 'development', label: 'Development' },
  { key: 'design', label: 'Design' },
  { key: 'environment', label: 'Environment' },
  { key: 'admin', label: 'Admin' },
  { key: 'communications', label: 'Communications' },
  { key: 'all', label: 'All' },
];

const technologies = [
  // Development
  { label: 'React', category: 'development', icon: 'https://icon.icepanel.io/Technology/svg/React.svg', glowColor: '97, 218, 251' },
  { label: 'Next.js', category: 'development', icon: 'https://icon.icepanel.io/Technology/png-shadow-512/Next.js.png', glowColor: '30, 41, 59' },
  { label: 'Vite', category: 'development', icon: 'https://icon.icepanel.io/Technology/svg/Vite.js.svg', glowColor: '100, 108, 255' },
  { label: 'Node.js', category: 'development', icon: 'https://icon.icepanel.io/Technology/svg/Node.js.svg', glowColor: '83, 163, 81' },
  { label: 'Express.js', category: 'development', icon: 'https://icon.icepanel.io/Technology/svg/Express.svg', glowColor: '55, 255, 187' },
  { label: 'Firebase', category: 'development', icon: 'https://icon.icepanel.io/Technology/svg/Firebase.svg', glowColor: '255, 202, 40' },
  { label: 'Supabase', category: 'development', icon: 'https://icon.icepanel.io/custom/svg/supabase.svg', glowColor: '62, 207, 142' },
  { label: 'JavaScript', category: 'development', icon: 'https://icon.icepanel.io/Technology/svg/JavaScript.svg', glowColor: '240, 219, 79' },
  { label: 'TypeScript', category: 'development', icon: 'https://icon.icepanel.io/Technology/svg/TypeScript.svg', glowColor: '49, 120, 198' },
  { label: 'HTML5 / CSS3', category: 'development', icon: 'https://icon.icepanel.io/Technology/svg/HTML5.svg', glowColor: '227, 79, 38' },
  { label: 'Sass/SCSS', category: 'development', icon: 'https://icon.icepanel.io/Technology/svg/Sass.svg', glowColor: '207, 100, 154' },
  { label: 'Tailwind CSS', category: 'development', icon: 'https://icon.icepanel.io/Technology/svg/Tailwind-CSS.svg', glowColor: '56, 189, 248' },
  { label: 'Angular', category: 'development', icon: 'https://icon.icepanel.io/Technology/svg/Angular.svg', glowColor: '221, 46, 16' },
  { label: 'Laravel (PHP)', category: 'development', icon: 'https://icon.icepanel.io/Technology/svg/Laravel.svg', glowColor: '255, 45, 85' },
  { label: 'SQL', category: 'development', iconClass: 'fas fa-database', glowColor: '0, 89, 156' },
  { label: 'C', category: 'development', icon: 'https://icon.icepanel.io/Technology/svg/C.svg', glowColor: '168, 176, 184' },
  { label: 'C#', category: 'development', icon: 'https://icon.icepanel.io/Technology/svg/C%23-%28CSharp%29.svg', glowColor: '35, 145, 52' },
  { label: 'C++', category: 'development', icon: 'https://icon.icepanel.io/Technology/svg/C%2B%2B-%28CPlusPlus%29.svg', glowColor: '0, 89, 156' },
  { label: 'Java', category: 'development', icon: 'https://icon.icepanel.io/Technology/svg/Java.svg', glowColor: '240, 152, 32' },
  { label: 'Python', category: 'development', icon: 'https://icon.icepanel.io/Technology/svg/Python.svg', glowColor: '55, 118, 171' },
  { label: 'GraphQL', category: 'development', icon: 'https://icon.icepanel.io/Technology/svg/GraphQL.svg', glowColor: '229, 53, 153' },
  { label: 'Three.js', category: 'development', icon: 'https://icon.icepanel.io/Technology/svg/Three.js.svg', glowColor: '100, 100, 255' },
  { label: 'Arduino', category: 'development', icon: 'https://icon.icepanel.io/Technology/svg/Arduino.svg', glowColor: '0, 151, 156' },
  { label: 'Flutter', category: 'development', icon: 'https://icon.icepanel.io/Technology/svg/Flutter.svg', glowColor: '2, 161, 241' },
  { label: 'Expo', category: 'development', iconClass: 'fas fa-rocket', glowColor: '30, 41, 59' },
  { label: 'GitHub', category: 'development', icon: 'https://icon.icepanel.io/Technology/svg/GitHub.svg', glowColor: '88, 96, 105' },
  { label: 'Git', category: 'development', icon: 'https://icon.icepanel.io/Technology/svg/Git.svg', glowColor: '240, 80, 51' },
  { label: 'Vercel', category: 'development', icon: 'https://icon.icepanel.io/Technology/svg/Vercel.svg', glowColor: '30, 41, 59' },
  { label: 'Docker', category: 'development', icon: 'https://icon.icepanel.io/Technology/svg/Docker.svg', glowColor: '13, 146, 244' },
  { label: 'AWS', category: 'development', icon: 'https://icon.icepanel.io/Technology/svg/AWS.svg', glowColor: '255, 153, 0' },
  { label: 'MongoDB', category: 'development', icon: 'https://icon.icepanel.io/Technology/svg/MongoDB.svg', glowColor: '71, 162, 72' },
  { label: 'Stripe', category: 'development', icon: 'https://icon.icepanel.io/custom/svg/stripe.svg', glowColor: '99, 91, 255' },
  { label: 'OpenAI API', category: 'development', icon: 'https://icon.icepanel.io/custom/svg/openai-chatgpt.svg', glowColor: '16, 163, 127' },
  { label: 'Claude API', category: 'development', iconClass: 'fas fa-robot', glowColor: '217, 119, 87' },
  { label: 'ChatGPT', category: 'development', icon: 'https://icon.icepanel.io/custom/svg/openai-chatgpt.svg', glowColor: '16, 163, 127' },

  // Design
  { label: 'Figma', category: 'design', icon: 'https://icon.icepanel.io/Technology/svg/Figma.svg', glowColor: '242, 78, 30' },
  { label: 'Adobe Illustrator', category: 'design', icon: 'https://icon.icepanel.io/Technology/svg/Adobe-Illustrator.svg', glowColor: '255, 124, 0' },
  { label: 'Photoshop', category: 'design', icon: 'https://icon.icepanel.io/Technology/svg/Adobe-Photoshop.svg', glowColor: '49, 125, 229' },
  { label: 'UI/UX', category: 'design', iconClass: 'fas fa-pen-nib', glowColor: '166, 55, 255' },

  // Environment
  { label: 'VS Code', category: 'environment', icon: 'https://icon.icepanel.io/Technology/svg/Visual-Studio-Code-%28VS-Code%29.svg', glowColor: '0, 122, 204' },
  { label: 'Visual Studio 2022', category: 'environment', icon: 'https://icon.icepanel.io/Technology/svg/Visual-Studio.svg', glowColor: '92, 45, 145' },
  { label: 'Lovable', category: 'environment', iconClass: 'fas fa-heart', glowColor: '255, 66, 127' },
  { label: 'Cursor', category: 'environment', iconClass: 'fas fa-i-cursor', glowColor: '30, 41, 59' },
  { label: 'Android Studio', category: 'environment', icon: 'https://icon.icepanel.io/Technology/svg/Android-Studio.svg', glowColor: '61, 220, 132' },
  { label: 'SourceTree', category: 'environment', icon: 'https://icon.icepanel.io/Technology/svg/Sourcetree.svg', glowColor: '15, 106, 181' },
  { label: 'WordPress', category: 'environment', icon: 'https://icon.icepanel.io/Technology/svg/WordPress.svg', glowColor: '33, 117, 155' },

  // Admin
  { label: 'GoHighLevel', category: 'admin', iconClass: 'fas fa-bullseye', glowColor: '255, 185, 55' },
  { label: 'Team Leadership', category: 'admin', iconClass: 'fas fa-users', glowColor: '55, 114, 255' },
  { label: 'Recruitment', category: 'admin', iconClass: 'fas fa-user-plus', glowColor: '55, 255, 187' },
  { label: 'Project Management', category: 'admin', iconClass: 'fas fa-tasks', glowColor: '166, 55, 255' },
  { label: 'SEO', category: 'admin', iconClass: 'fas fa-search', glowColor: '227, 79, 38' },
  { label: 'Google Ads', category: 'admin', icon: 'https://icon.icepanel.io/custom/svg/google-ads.svg', glowColor: '66, 133, 244' },
  { label: 'Google Analytics', category: 'admin', icon: 'https://icon.icepanel.io/custom/svg/google-analytics.svg', glowColor: '244, 180, 0' },

  // Communications
  { label: 'Slack', category: 'communications', icon: 'https://icon.icepanel.io/Technology/svg/Slack.svg', glowColor: '74, 21, 75' },
  { label: 'Microsoft Teams', category: 'communications', icon: 'https://icon.icepanel.io/custom/svg/microsoft-teams.svg', glowColor: '91, 86, 212' },
  { label: 'Telegram', category: 'communications', icon: 'https://icon.icepanel.io/custom/svg/telegram.svg', glowColor: '0, 136, 204' },
  { label: 'Gmail', category: 'communications', icon: 'https://icon.icepanel.io/custom/svg/gmail.svg', glowColor: '234, 67, 53' },
  { label: 'Discord', category: 'communications', icon: 'https://icon.icepanel.io/custom/svg/discord.svg', glowColor: '88, 101, 242' },
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

const certificates = [
  {
    title: 'React Foundations for Next.js',
    issuer: 'Next.js by Vercel',
    url: 'https://nextjs.org/learn/certificate?course=react-foundations&user=162038&certId=react-foundations-162038-1782847047677',
  },
  {
    title: 'Next.js App Router Fundamentals',
    issuer: 'Next.js by Vercel',
    url: 'https://nextjs.org/learn/certificate?course=dashboard-app&user=162038&certId=dashboard-app-162038-1782846640929',
  },
  {
    title: 'Next.js SEO Fundamentals',
    issuer: 'Next.js by Vercel',
    url: 'https://nextjs.org/learn/certificate?course=seo&user=162038&certId=seo-162038-1782845828834',
  },
];

function useCarousel(items, intervalMs = 3000, enabled = true) {
  const base = items.length;
  const extended = enabled ? [...items, ...items, ...items] : items;

  const [trackIndex, setTrackIndex] = useState(enabled ? base : 0);
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
    if (!enabled) return undefined;
    if (trackIndex >= base * 2 || trackIndex < base) {
      const timeout = setTimeout(() => {
        setNoTransition(true);
        setTrackIndex((p) => (((p % base) + base) % base) + base);
      }, 500);
      return () => clearTimeout(timeout);
    }
    return undefined;
  }, [trackIndex, base, enabled]);

  useEffect(() => {
    if (!noTransition) return undefined;
    const raf = requestAnimationFrame(() => setNoTransition(false));
    return () => cancelAnimationFrame(raf);
  }, [noTransition]);

  useEffect(() => {
    if (!enabled) return undefined;
    if (paused) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const timer = setTimeout(() => {
      setTrackIndex((prev) => prev + 1);
    }, intervalMs);

    return () => clearTimeout(timer);
  }, [trackIndex, paused, intervalMs, enabled]);

  const activeIndex = ((trackIndex % base) + base) % base;

  return { extended, trackIndex, activeIndex, next, prev, goTo, setPaused, noTransition };
}

// Renders technologies as a single row, matching the Main Techstacks carousel.
// Categories that fit within one row render as a plain static row; larger
// categories become a looping carousel with arrows and autoplay.
function TechnologiesCarousel({ items }) {
  const isCarousel = items.length > 8;
  const carousel = useCarousel(items, 3000, isCarousel);

  if (!isCarousel) {
    return (
      <div className="tech-row-static">
        {items.map((tech) => (
          <div
            className="techstack-item tech-grid-item"
            key={tech.label}
            style={{ '--glow-color': tech.glowColor }}
          >
            <div className="tech-icon">
              {tech.icon ? (
                <img src={tech.icon} alt={tech.label} className="tech-logo" />
              ) : (
                <i className={tech.iconClass}></i>
              )}
            </div>
            <span>{tech.label}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="techstack-carousel"
      onMouseEnter={() => carousel.setPaused(true)}
      onMouseLeave={() => carousel.setPaused(false)}
    >
      <button
        type="button"
        className="carousel-arrow carousel-arrow-left"
        onClick={carousel.prev}
        aria-label="Previous technologies"
      >
        <i className="fas fa-chevron-left"></i>
      </button>
      <div className="techstack-track-viewport">
        <div
          className={`techstack-track${carousel.noTransition ? ' no-transition' : ''}`}
          style={{ '--active-index': carousel.trackIndex }}
        >
          {carousel.extended.map((tech, index) => (
            <div
              className="techstack-item tech-grid-item"
              key={`${tech.label}-${index}`}
              style={{ '--glow-color': tech.glowColor }}
            >
              <div className="tech-icon">
                {tech.icon ? (
                  <img src={tech.icon} alt={tech.label} className="tech-logo" />
                ) : (
                  <i className={tech.iconClass}></i>
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
        onClick={carousel.next}
        aria-label="Next technologies"
      >
        <i className="fas fa-chevron-right"></i>
      </button>
    </div>
  );
}

function Home() {
  const mainTech = useCarousel(mainTechstacks);
  const [activeCategory, setActiveCategory] = useState('all');
  const projectsCarousel = useCarousel(projects, 5000);

  const [techstacksRef, techstacksVisible] = useScrollReveal();
  const [technologiesRef, technologiesVisible] = useScrollReveal();
  const [projectsRef, projectsVisible] = useScrollReveal();
  const [certificatesRef, certificatesVisible] = useScrollReveal();

  const filteredTechnologies = activeCategory === 'all'
    ? technologies
    : technologies.filter((tech) => tech.category === activeCategory);

  return (
    <>
      {/* Main Home Section */}
      <header id="home" className="home-container">
      <div className="home-background"></div>
      <InteractiveBackground />
      <div className="home-content">
          {/* Profile Image */}
          <div className="profile-section">
            <div className="profile-visual">
              <div className="profile-blob" aria-hidden="true"></div>
              <div className="profile-frame">
                <img
                  src="/elai.jpg"
                  alt="Elaisha Mae Arias"
                  className="profile-image"
                />
              </div>
              <div className="profile-badge">
                <i className="fas fa-code" aria-hidden="true"></i>
                <span>Full-Stack Dev</span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="content-section">
            <p className="greeting">Hi! I'm</p>
            <h1 className="name">ELAISHA MAE M. ARIAS</h1>
            <h2 className="title">UI/UX Designer and Fullstack Developer</h2>

            <p className="bio">
              A full-stack developer and UI/UX designer specializing in engineering AI-powered platforms and seamless digital products. I bridge the gap between design and development by integrating advanced LLM APIs into robust system architectures while maintaining a strict focus on intuitive user experiences. I deliver clean code, scalable backends, and elegant interfaces that work flawlessly together.
            </p>

            {/* Call to Action */}
            <div className="hero-actions">
              <a href="#projects" className="cta-button primary">
                View Work
                <i className="fas fa-arrow-right" aria-hidden="true"></i>
              </a>
              <a
                href="/resume.pdf"
                download="Elaisha_Mae_Arias_Resume.pdf"
                className="cta-button secondary"
              >
                <i className="fas fa-download" aria-hidden="true"></i>
                Download Resume
              </a>
            </div>

            {/* Social Links */}
            <div className="social-links">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={social.label}
                >
                  {social.icon}
                  <span className="visually-hidden">{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <a href="#main-techstacks" className="scroll-cue" aria-label="Scroll to explore">
          <i className="fas fa-chevron-down" aria-hidden="true"></i>
        </a>
      </header>

      {/* Main Techstacks Section */}
      <section
        id="main-techstacks"
        ref={techstacksRef}
        className={`techstacks-section reveal-section${techstacksVisible ? ' in-view' : ''}`}
      >
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

      {/* Technologies Section (replaces the former "Other Techstacks" section) */}
      <section
        id="technologies"
        ref={technologiesRef}
        className={`other-techstacks-section reveal-section${technologiesVisible ? ' in-view' : ''}`}
      >
        <div className="container">
          <h2 className="section-title">TECHNOLOGIES</h2>
          <div className="tech-filter-pills" role="tablist" aria-label="Technology categories">
            {techCategories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat.key}
                className={`tech-filter-pill${activeCategory === cat.key ? ' active' : ''}`}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <TechnologiesCarousel key={activeCategory} items={filteredTechnologies} />
        </div>
      </section>

      <section
        id="projects"
        ref={projectsRef}
        className={`projects-section reveal-section${projectsVisible ? ' in-view' : ''}`}
      >
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

      {/* Certificates Section */}
      <section
        id="certificates"
        ref={certificatesRef}
        className={`certificates-section reveal-section${certificatesVisible ? ' in-view' : ''}`}
      >
        <div className="container">
          <h2 className="section-title">CERTIFICATES</h2>
          <div className="certificates-grid">
            {certificates.map((cert) => (
              <a
                key={cert.title}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="certificate-card"
              >
                <div className="certificate-icon">
                  <i className="fas fa-award" aria-hidden="true"></i>
                </div>
                <h3 className="certificate-title">{cert.title}</h3>
                <p className="certificate-issuer">{cert.issuer}</p>
                <span className="certificate-link">
                  View Certificate
                  <i className="fas fa-external-link-alt" aria-hidden="true"></i>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;