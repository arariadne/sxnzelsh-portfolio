/** Home page copy. Wrap highlighted words in [[double brackets]]. */

export const about = {
  statement: 'I turn ideas into products people [[actually use]], from the database to the app store.',
  body: 'Computer Engineering graduate, Cum Laude, based in Cebu. I work across web, mobile and AI, and I like owning a product from first sketch to store release.',
  facts: [
    { value: 'Cum Laude', label: 'B.S. Computer Engineering, 2026' },
    { value: '7 projects', label: 'Web, mobile and embedded builds' }, // TODO: confirm this fact.
    { value: '3 platforms', label: 'Web, iOS and Android' },
  ],
};

export const services = [
  {
    title: 'Full-stack engineering',
    body: 'React, TypeScript, Node.js and Laravel apps with clean APIs.',
    icon: 'database',
  },
  {
    title: 'AI automation',
    body: 'Agents, chatbots and workflows that remove repetitive work.',
    icon: 'robot',
  },
  {
    title: 'Mobile and product',
    body: 'iOS and Android apps built with Capacitor and Flutter.',
    icon: 'phone',
  },
] as const;

export const skillsBlurb = 'The tools I reach for most, and the ones I use to automate with AI.';

export const contactHeading = ['Let’s build', 'something', 'useful.'] as const;
