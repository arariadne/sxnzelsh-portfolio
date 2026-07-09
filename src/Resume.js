import React from 'react';
import './Resume.css';

const contactLinks = [
  { icon: 'fas fa-envelope', label: 'elaishaarias@gmail.com', href: 'mailto:elaishaarias@gmail.com' },
  { icon: 'fas fa-phone', label: '+63 956 765 5825', href: 'tel:+639567655825' },
  { icon: 'fab fa-linkedin', label: 'linkedin.com/in/elaisha-arias', href: 'https://linkedin.com/in/elaisha-arias' },
  { icon: 'fas fa-globe', label: 'sxnzelsh-portfolio.vercel.app', href: 'https://sxnzelsh-portfolio.vercel.app' },
];

const experience = [
  {
    role: 'Freelance Full Stack Developer',
    date: 'December 2025 - April 2026',
    bullets: [
      'Engineered a production-grade e-commerce marketplace using React.js for a dynamic frontend and Node.js/Express for a robust, scalable API.',
      'Deployed a fully containerized architecture using Docker and AWS ECS, utilizing PostgreSQL with optimized indexing to handle high-frequency concurrent transaction data.',
      'Integrated Stripe API for secure, multi-currency payment processing and implemented automated webhooks to streamline order fulfillment and real-time shipping tracking.',
    ],
  },
  {
    role: 'Research and Development Intern',
    org: 'Xeleqt Technology Innovations Inc.',
    date: 'June 2025 - July 2025',
    bullets: [
      'Assisted the R&D team in hardware prototyping and electronic system development.',
      'Uploaded and configured firmware on microcontrollers and embedded chips to enable device operation.',
      'Tested and validated electronic components to ensure proper integration between hardware and embedded software.',
    ],
  },
];

const education = {
  school: 'Cebu Institute of Technology - University',
  degree: 'Bachelor of Science in Computer Engineering - Cum Laude',
  date: 'May 2026',
  bullets: ['Former Vice President-External and Head of External Affairs (ICpEP.SE CIT-U)'],
};

const projectExperience = [
  {
    title: 'Dismap',
    bullets: [
      'Developed a disease monitoring system with a Laravel (PHP) web backend and Flutter mobile application.',
      'Built APIs and database logic for managing and tracking disease reports.',
      'Implemented responsive web interfaces using Blade templating.',
      'Integrated the mobile app with backend services for real-time data synchronization.',
    ],
  },
  {
    title: 'Furwell',
    bullets: [
      'Designed and developed UI/UX layouts focused on user-friendly interaction and accessibility.',
      'Built and maintained responsive front-end features using React and Firebase.',
      'Designed, developed, and trained an AI-powered chatbot to respond intelligently to user inquiries, improving engagement and support.',
      'Contributed to backend logic for stability, security, and performance optimization.',
    ],
  },
  {
    title: 'Swiftsail Ferries',
    bullets: [
      'Designed a responsive, ferry booking platform focused on streamlined user journeys and real-time updates.',
      'Developed full stack systems with React for the front-end and Firebase for back-end services.',
      'Built an intelligent AI chatbot to guide users through ferry schedules, fare queries, and FAQs.',
      'Created interactive UI components optimized for both mobile and desktop devices.',
    ],
  },
];

const skillCategories = [
  {
    label: 'Languages & Libraries',
    value: 'C, C++, C#, JavaScript, TypeScript, Python, Java, PHP, HTML5, CSS3, SQL, React.js, Next.js, Angular, Node.js, Express.js, Laravel, Tailwind CSS, Sass, Flutter',
  },
  {
    label: 'Databases & Tools',
    value: 'SQL, Firebase, Microsoft Access, MongoDB, Supabase, Git, GitHub, SourceTree, Visual Studio 2022, Visual Studio Code, AWS, Docker, Figma, WordPress, Android Studio, Lovable, Claude AI, ChatGPT, Cursor AI',
  },
  {
    label: 'Certificates',
    value: 'React Foundations for Next.js, Next.js App Router Fundamentals, Next.js SEO Fundamentals',
  },
  {
    label: 'Soft Skills',
    value: 'Critical Thinking, Adaptability, Collaborative Communication, Team Player, Organizational Skills, Problem Solver, Attention to Detail, Strategic Planning',
  },
];

function Resume() {
  return (
    <section id="resume" className="resume-page">
      <div className="resume-toolbar">
        <div className="resume-toolbar-inner">
          <a href="/resume.pdf" download="Elaisha_Mae_Arias_Resume.pdf" className="resume-btn-download">
            <i className="fas fa-download"></i> Download PDF
          </a>
          <button
            type="button"
            className="resume-btn-print"
            onClick={() => window.print()}
            aria-label="Print Resume"
            title="Print Resume"
          >
            <i className="fas fa-print"></i>
          </button>
        </div>
      </div>

      <div className="resume-sheet">
        <header className="resume-header">
          <h1 className="resume-name">Elaisha Mae M. Arias</h1>
          <div className="resume-contact">
            {contactLinks.map((item, index) => (
              <React.Fragment key={item.label}>
                <a
                  href={item.href}
                  className="resume-contact-link"
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <i className={item.icon}></i>
                  <span>{item.label}</span>
                </a>
                {index < contactLinks.length - 1 && <span className="resume-contact-divider">|</span>}
              </React.Fragment>
            ))}
          </div>
        </header>

        <section className="resume-section">
          <h2 className="resume-section-title">Summary</h2>
          <p className="resume-summary">
            A Computer Engineer with a strong foundation in full-stack web development, cloud computing, and
            hardware-software systems. Proficient in building scalable, user-friendly applications using
            JavaScript, React.js, Next.js, and Laravel. Experienced in leveraging cloud infrastructure, while
            demonstrating technical proficiency in embedded systems and networking roles. Passionate about
            bridging software development and systems engineering to deliver innovative, end-to-end technical
            solutions.
          </p>
        </section>

        <section className="resume-section">
          <h2 className="resume-section-title">Professional Experience</h2>
          {experience.map((item) => (
            <div className="resume-entry" key={item.role}>
              <div className="resume-entry-head">
                <div>
                  <h3 className="resume-entry-title">{item.role}</h3>
                  {item.org && <p className="resume-entry-org">{item.org}</p>}
                </div>
                <span className="resume-entry-date">{item.date}</span>
              </div>
              <ul className="resume-bullets">
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="resume-section">
          <h2 className="resume-section-title">Education</h2>
          <div className="resume-entry">
            <div className="resume-entry-head">
              <div>
                <h3 className="resume-entry-title">{education.school}</h3>
                <p className="resume-entry-org">{education.degree}</p>
              </div>
              <span className="resume-entry-date">{education.date}</span>
            </div>
            <ul className="resume-bullets">
              {education.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="resume-section">
          <h2 className="resume-section-title">Project Experience</h2>
          {projectExperience.map((project) => (
            <div className="resume-entry" key={project.title}>
              <h3 className="resume-entry-title">{project.title}</h3>
              <ul className="resume-bullets">
                {project.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="resume-section resume-skills-section">
          <h2 className="resume-section-title">Technical Skills</h2>
          <div className="resume-skills-grid">
            {skillCategories.map((category) => (
              <div className="resume-skill-category" key={category.label}>
                <p><strong>{category.label}:</strong> {category.value}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

export default Resume;