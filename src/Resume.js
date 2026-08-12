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
    role: 'Full Stack Developer',
    org: 'Best Life Foundry AI',
    date: 'July 2026 - Present',
    bullets: [
      'Contracted to lead full-stack development across a suite of interconnected client applications using React, TypeScript, Vite, Supabase (Postgres, Auth, Storage, Edge Functions), and Node.js.',
      'Delivered native Android/iOS builds by integrating Capacitor into an existing React/Vite web app, resolving CI/CD pipeline failures on Codemagic and validating releases on physical devices.',
      'Conducted full-scale security audits across production applications, identifying and remediating critical vulnerabilities including unauthenticated edge functions, exposed storage buckets, and overly permissive database access policies.',
      'Diagnosed and resolved complex cross-system data sync issues (bidirectional contact sync, third-party CRM/PMS integrations, document export pipelines), improving data reliability across the product suite.',
    ],
  },
  {
    role: 'Freelance Full Stack Developer',
    date: 'December 2025 - April 2026',
    bullets: [
      'Engineered a production-grade e-commerce marketplace using React.js for a dynamic frontend and Node.js/Express for a robust, scalable API.',
      'Deployed a fully containerized architecture using Docker and AWS ECS, utilizing PostgreSQL with optimized indexing to handle high-frequency concurrent transaction data.',
      'Integrated Stripe API for secure, multi-currency payment processing and implemented automated webhooks to streamline order fulfillment and real-time shipping tracking.',
      'Implemented JWT-based authentication and role-based access control (RBAC) to secure customer, vendor, and admin-facing endpoints across the platform.',
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

const skillCategories = [
  {
    label: 'Languages & Libraries',
    value: 'C, C++, C#, JavaScript, TypeScript, Python, Java, PHP, HTML5, CSS3, SQL, React.js, Next.js, Angular, Node.js, Express.js, Laravel, Tailwind CSS, Sass, Flutter',
  },
  {
    label: 'Databases & Tools',
    value: 'SQL, Firebase, Microsoft Access, MongoDB, Supabase, Git, GitHub, SourceTree, Visual Studio 2022, Visual Studio Code, AWS, Docker, Figma, WordPress, Flutter, Android Studio, Lovable, Claude AI, ChatGPT, Cursor AI',
  },
  {
    label: 'Certificates',
    value: 'React Foundations for Next.js, Next.js App Router Fundamentals, Next.js SEO Fundamentals, Yoast SEO for WordPress',
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
          <p className="resume-title">Full-Stack Software Developer</p>
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
            Full-stack developer with a Computer Engineering foundation, specializing in React, TypeScript,
            Next.js, and Supabase to build and ship production-grade web and mobile applications. Experienced
            across the full lifecycle, from architecting scalable APIs and cloud infrastructure to native mobile
            deployment via Capacitor, with a track record of resolving complex system integrations and conducting
            security audits on live applications. Combines strong software engineering fundamentals with
            systems-level thinking from a hardware and embedded background, delivering reliable, end-to-end
            technical solutions.
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