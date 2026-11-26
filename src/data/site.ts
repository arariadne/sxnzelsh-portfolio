/** Site-wide settings and contact links. */

export const site = {
  name: 'Elaisha Mae Arias',
  shortName: 'ela.',
  title: 'Full-Stack Software Engineer & AI Automation Specialist',
  location: 'Cebu, Philippines',
  intro: 'I build web and mobile products end to end, then automate the work around them with AI.',
  url: 'https://sxnzelsh-portfolio.vercel.app',
  email: 'elaishaarias@gmail.com',
  resumePdf: '/resume.pdf',

  /** Switch off to hide the spinning "Available for work" sticker. */
  availableForWork: true,

  /** Tags shown on the hero tape and the tilted sticker. */
  platforms: 'Web · iOS · Android',
  tapeStack: ['React', 'TypeScript', 'Node.js', 'Flutter', 'Laravel', 'Firebase', 'Capacitor'],
  tapeRoles: ['Full-stack engineer', 'AI automation', 'Mobile apps', 'Chatbots', 'Workflows'],

  social: {
    github: { label: 'github.com/arariadne', href: 'https://github.com/arariadne' },
    linkedin: { label: 'linkedin.com/in/elaisha-arias', href: 'https://linkedin.com/in/elaisha-arias' },
  },
} as const;

export const nav = [
  { label: 'About', href: '/#about', id: 'about' },
  { label: 'Work', href: '/#work', id: 'work' },
  { label: 'Skills', href: '/#skills', id: 'skills' },
  { label: 'Résumé', href: '/resume', id: null },
  { label: 'Contact', href: '/#contact', id: 'contact' },
] as const;
