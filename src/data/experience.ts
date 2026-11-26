import type { EducationItem, ExperienceItem } from './types';

/** Used on /resume only. Copied from the old Resume.js. */

export const summary =
  'Full-stack developer with a Computer Engineering foundation, specializing in React, TypeScript, Next.js, and Supabase to build and ship production-grade web and mobile applications. Experienced across the full lifecycle, from architecting scalable APIs and cloud infrastructure to native mobile deployment via Capacitor, with a track record of resolving complex system integrations and conducting security audits on live applications. Combines strong software engineering fundamentals with systems-level thinking from a hardware and embedded background, delivering reliable, end-to-end technical solutions.';

export const experience: ExperienceItem[] = [
  {
    role: 'Full Stack Developer',
    org: 'Best Life Foundry AI',
    start: 'July 2026',
    end: null, // TODO: set an end date if this contract has ended (null shows "Present").
    bullets: [
      'Contracted to lead full-stack development across a suite of interconnected client applications using React, TypeScript, Vite, Supabase (Postgres, Auth, Storage, Edge Functions), and Node.js.',
      'Delivered native Android/iOS builds by integrating Capacitor into an existing React/Vite web app, resolving CI/CD pipeline failures on Codemagic and validating releases on physical devices.',
      'Conducted full-scale security audits across production applications, identifying and remediating critical vulnerabilities including unauthenticated edge functions, exposed storage buckets, and overly permissive database access policies.',
      'Diagnosed and resolved complex cross-system data sync issues (bidirectional contact sync, third-party CRM/PMS integrations, document export pipelines), improving data reliability across the product suite.',
    ],
  },
  {
    role: 'Freelance Full Stack Developer',
    org: null,
    start: 'December 2025',
    end: 'April 2026',
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
    start: 'June 2025',
    end: 'July 2025',
    bullets: [
      'Assisted the R&D team in hardware prototyping and electronic system development.',
      'Uploaded and configured firmware on microcontrollers and embedded chips to enable device operation.',
      'Tested and validated electronic components to ensure proper integration between hardware and embedded software.',
    ],
  },
];

export const education: EducationItem[] = [
  {
    school: 'Cebu Institute of Technology - University',
    degree: 'Bachelor of Science in Computer Engineering - Cum Laude',
    date: 'May 2026',
    bullets: ['Former Vice President-External and Head of External Affairs (ICpEP.SE CIT-U)'],
  },
];

export const resumeSkills = [
  {
    label: 'Languages & Libraries',
    value:
      'C, C++, C#, JavaScript, TypeScript, Python, Java, PHP, HTML5, CSS3, SQL, React.js, Next.js, Angular, Node.js, Express.js, Laravel, Tailwind CSS, Sass, Flutter',
  },
  {
    label: 'Databases & Tools',
    value:
      'SQL, Firebase, Microsoft Access, MongoDB, Supabase, Git, GitHub, SourceTree, Visual Studio 2022, Visual Studio Code, AWS, Docker, Figma, WordPress, Flutter, Android Studio, Lovable, Claude AI, ChatGPT, Cursor AI',
  },
  {
    label: 'Soft Skills',
    value:
      'Critical Thinking, Adaptability, Collaborative Communication, Team Player, Organizational Skills, Problem Solver, Attention to Detail, Strategic Planning',
  },
];
