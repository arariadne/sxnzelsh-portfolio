import type { SkillGroup } from './types';

/**
 * Skills. Logos come from the `simple-icons` package (slug) or a monogram when
 * the brand has no icon there. `todo: true` marks tools added in the redesign
 * brief, or monograms added by the design, for you to confirm or delete.
 */

const icon = (slug: string) => ({ kind: 'icon', slug }) as const;
const mono = (text: string) => ({ kind: 'mono', text }) as const;

/** Big marquee bands in the Skills section. */
export const stackBand = ['React', 'TypeScript', 'Next.js', 'Node.js', 'Laravel', 'Firebase', 'Flutter', 'Capacitor'];
export const aiBand = [
  'Claude',
  'OpenAI API',
  'n8n', // TODO: added in brief
  'Zapier', // TODO: added in brief
  'Make', // TODO: added in brief
  'Agents',
  'Chatbots',
  'Workflows',
  'Playwright', // TODO: added in brief
  'Automated testing',
];

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    skills: [
      { name: 'React', logo: icon('react') },
      { name: 'Next.js', logo: icon('nextdotjs') },
      { name: 'Vite', logo: icon('vite') },
      { name: 'Angular', logo: icon('angular') },
      { name: 'TypeScript', logo: icon('typescript') },
      { name: 'Tailwind CSS', logo: icon('tailwindcss') },
      { name: 'Sass/SCSS', logo: icon('sass') },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & data',
    skills: [
      { name: 'Node.js', logo: icon('nodedotjs') },
      { name: 'Express.js', logo: icon('express') },
      { name: 'Laravel (PHP)', logo: icon('laravel') },
      { name: 'Firebase', logo: icon('firebase') },
      { name: 'Supabase', logo: icon('supabase') },
      { name: 'MongoDB', logo: icon('mongodb') },
      { name: 'GraphQL, SQL', logo: icon('graphql') },
    ],
  },
  {
    id: 'mobile',
    title: 'Mobile',
    skills: [
      { name: 'Flutter', logo: icon('flutter') },
      { name: 'Capacitor', logo: icon('capacitor') },
      { name: 'Expo', logo: icon('expo') },
      { name: 'Android Studio', logo: icon('androidstudio') },
    ],
  },
  {
    id: 'design',
    title: 'Design',
    skills: [
      { name: 'Figma', logo: icon('figma') },
      { name: 'Illustrator', logo: mono('Ai') },
      { name: 'Photoshop', logo: mono('Ps') },
      { name: 'UI/UX', logo: mono('UX'), todo: true },
    ],
  },
  {
    id: 'ai',
    title: 'AI & automation',
    variant: 'specialty',
    subline: 'AI agents · Chatbots · Workflow automation · Webhooks & APIs', // TODO: "Webhooks & APIs" added in brief
    skills: [
      { name: 'n8n', logo: icon('n8n'), todo: true },
      { name: 'Zapier', logo: icon('zapier'), todo: true },
      { name: 'Make', logo: icon('make'), todo: true },
      { name: 'GoHighLevel', logo: mono('GH'), todo: true },
      { name: 'Lovable', logo: mono('Lv'), todo: true },
      { name: 'Claude API', logo: icon('claude') },
      { name: 'OpenAI API', logo: mono('OA'), todo: true },
      { name: 'LangChain', logo: icon('langchain'), todo: true },
      { name: 'Cursor', logo: icon('cursor') },
    ],
  },
  {
    id: 'testing',
    title: 'Testing & QA',
    skills: [
      { name: 'Playwright', logo: mono('Pw'), todo: true },
      { name: 'Cypress', logo: icon('cypress'), todo: true },
      { name: 'Selenium', logo: icon('selenium'), todo: true },
      { name: 'Jest', logo: icon('jest'), todo: true },
      { name: 'Puppeteer', logo: icon('puppeteer'), todo: true },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & cloud',
    skills: [
      { name: 'Git', logo: icon('git') },
      { name: 'GitHub', logo: icon('github') },
      { name: 'Docker', logo: icon('docker') },
      { name: 'AWS', logo: mono('AWS') },
      { name: 'Vercel', logo: icon('vercel') },
      { name: 'Stripe', logo: icon('stripe') },
      { name: 'VS Code', logo: mono('VS'), todo: true },
    ],
  },
  {
    id: 'languages',
    title: 'Languages',
    variant: 'row',
    skills: [
      { name: 'JavaScript', logo: icon('javascript') },
      { name: 'Python', logo: icon('python') },
      { name: 'PHP', logo: icon('php') },
      { name: 'Java', logo: mono('Jv'), todo: true },
      { name: 'C, C++, C#', logo: mono('C'), todo: true },
    ],
  },
];
