import type { Project } from './types';

/**
 * Projects, in display order (spotlight and work index).
 * Text for the first three comes only from their live sites; the rest from the old Home.js.
 * Anything marked TODO is a placeholder for you to confirm or replace.
 * `summary` is the one sentence shown in the home spotlight.
 * `tone` is the spotlight block colour; neighbouring slides use different colours.
 * `liveUrl` makes the spotlight button "Visit site ↗" (new tab) instead of "View case study ↗".
 */

// TODO(approve): screenshots of the live sites (scripts/capture-sites.mjs) need your approval
// before the site goes public: bestlifevacations, rer, smguru.

export const projects: Project[] = [
  {
    slug: 'best-life-vacations',
    number: '01',
    title: 'Best Life Vacations',
    tagline: 'Vacation home rentals in Greater Palm Springs and Lake Arrowhead.',
    taglineTodo: true, // TODO: confirm tagline (from the live site).
    type: 'Web app',
    tech: ['React', 'TypeScript', 'Supabase'], // TODO: confirm the stack for this project (from your résumé, not the site).
    statement: 'Best Life Vacations offers vacation home rentals in [[Greater Palm Springs and Lake Arrowhead]], California, plus rental management.',
    description: 'Vacation home rentals in Greater Palm Springs and Lake Arrowhead, California, plus rental management.',
    summary: 'Vacation home rentals in Greater Palm Springs and Lake Arrowhead, California, plus rental management.',
    tone: 'grape',
    overview: [], // TODO: overview (what you built, your part in it).
    role: null, // TODO: your role.
    year: null, // TODO: year.
    liveUrl: 'https://blvagent.app/',
    links: [{ label: 'Visit site', href: 'https://blvagent.app/' }],
    image: { name: 'bestlifevacations', alt: 'Best Life Vacations website home page' }, // TODO(approve) screenshot
    gallery: [],
  },
  {
    slug: 'real-estate-rejuvenation',
    number: '02',
    title: 'Real Estate Rejuvenation',
    shortTitle: 'RER',
    tagline: 'Clear, modern real estate forms and e-signatures.',
    taglineTodo: true, // TODO: confirm tagline (from the live site).
    type: 'Web app',
    tech: ['React', 'TypeScript', 'Supabase'], // TODO: confirm the stack for this project (from your résumé, not the site).
    statement: 'Real Estate Rejuvenation gives California real estate professionals [[clear contracts]] and secure e-signatures.',
    description:
      'A forms platform for California real estate professionals with clear contracts, secure e-signatures, an audit trail, roles and permissions, reminders and a searchable contract vault.',
    summary:
      'A forms platform for California real estate professionals with clear contracts, secure e-signatures, an audit trail, roles and permissions, reminders and a searchable contract vault.',
    tone: 'plum',
    overview: [], // TODO: overview (what you built, your part in it).
    role: null, // TODO: your role.
    year: null, // TODO: year.
    liveUrl: 'https://rerapp.ai/',
    links: [{ label: 'Visit site', href: 'https://rerapp.ai/' }],
    image: { name: 'rer', alt: 'Real Estate Rejuvenation website home page' }, // TODO(approve) screenshot
    gallery: [],
  },
  {
    slug: 'sm-guru',
    number: '03',
    title: 'SM Guru',
    tagline: 'AI social media, CRM and email marketing.',
    taglineTodo: true, // TODO: confirm tagline (from the live site).
    type: 'Web app',
    tech: ['React', 'TypeScript', 'Supabase'], // TODO: confirm the stack for this project (from your résumé, not the site).
    statement: 'SM Guru brings content creation, post scheduling, email campaigns and [[CRM deal tracking]] into one AI-powered platform.',
    description:
      'An AI-powered social media platform from Best Life AI for creating content, scheduling posts, running email campaigns and tracking deals in a CRM.',
    summary:
      'An AI-powered social media platform from Best Life AI for creating content, scheduling posts, running email campaigns and tracking deals in a CRM.',
    tone: 'bubblegum',
    overview: [], // TODO: overview (what you built, your part in it).
    role: null, // TODO: your role.
    year: null, // TODO: year.
    liveUrl: 'https://smguru.ai/',
    links: [{ label: 'Visit site', href: 'https://smguru.ai/' }],
    image: { name: 'smguru', alt: 'SM Guru website home page' }, // TODO(approve) screenshot
    gallery: [],
  },
  {
    slug: 'gourmet-gamble',
    number: '04',
    title: 'Gourmet Gamble',
    tagline: 'Cook with what you have.',
    taglineTodo: true, // TODO: placeholder tagline from the design.
    type: 'Web app',
    tech: ['React', 'Firebase'],
    statement: 'Gourmet Gamble suggests recipes from the ingredients you [[already have]].',
    description:
      'A smart web platform built with React.js and Firebase that helps users turn everyday ingredients into practical, delicious meals. By entering what they have, users get tailored recipe suggestions that reduce food waste and promote sustainable cooking.',
    summary:
      'A smart web platform built with React.js and Firebase that helps users turn everyday ingredients into practical, delicious meals.',
    tone: 'apricot',
    overview: ['', ''],
    role: null,
    year: null,
    links: [
      { label: 'Live demo', href: 'https://gourmetgamble0.vercel.app' },
      { label: 'Code', href: 'https://github.com/LoydAMT/gourmetgamble0' },
    ],
    image: { name: 'gourmetgamble', alt: 'Gourmet Gamble web app screenshot' },
    gallery: [],
  },
  {
    slug: 'swiftsail',
    number: '05',
    title: 'Swiftsail',
    tagline: 'Browse, compare and book ferry trips in a few clicks.',
    taglineTodo: true, // TODO: drawn from the original description.
    type: 'Web app',
    tech: ['React', 'Node.js', 'Firebase'],
    statement: 'A ferry booking platform where operators list routes and travellers [[book in a few clicks]].',
    description:
      'A web-based ferry booking platform where operators list routes, schedules, and prices. Users can easily browse, compare, and book ferry trips in just a few clicks. The system streamlines booking, offers real-time availability, and ensures a smooth, hassle-free travel experience.',
    summary: 'A web-based ferry booking platform where operators list routes, schedules, and prices.',
    tone: 'grape',
    overview: ['', ''],
    role: null,
    year: null,
    links: [
      { label: 'Live demo', href: 'https://swiftsail-ferries.vercel.app' },
      { label: 'Code', href: 'https://github.com/LoydAMT/ferrybookingsystem-scamacs' },
    ],
    image: { name: 'swiftsail', alt: 'Swiftsail ferry booking web app screenshot' },
    gallery: [],
  },
  {
    slug: 'furwell',
    number: '06',
    title: 'Furwell',
    tagline: 'Find nearby vet clinics and book online.',
    taglineTodo: true, // TODO: drawn from the original description.
    type: 'Web app',
    tech: ['React', 'Node.js', 'Firebase'],
    statement: 'Furwell connects pet owners with [[nearby veterinary clinics]].',
    description:
      'A user-friendly platform connecting pet owners with nearby veterinary clinics. Users can quickly find clinics and book appointments online, while clinics can subscribe to increase their visibility and attract more clients.',
    summary: 'A user-friendly platform connecting pet owners with nearby veterinary clinics.',
    tone: 'plum',
    overview: ['', ''],
    role: null,
    year: null,
    links: [
      { label: 'Live demo', href: 'https://furwell.vercel.app/Home' },
      { label: 'Code', href: 'https://github.com/laurenx122/marea-furwell' },
    ],
    image: { name: 'furwell', alt: 'Furwell veterinary booking web app screenshot' }, // TODO: original is wider than 16:10, so its bottom was extended with a flat strip; replace with a 1440x900 screenshot.
    gallery: [],
  },
  {
    slug: 'dismap',
    number: '07',
    title: 'Dismap',
    tagline: 'Disease surveillance mapping for Cebu City.',
    taglineTodo: true, // TODO: drawn from the original description.
    type: 'Mobile app',
    tech: ['Laravel', 'Flutter'],
    statement: 'Dismap visualises outbreak data across Cebu City barangays [[in real time]].',
    description:
      'A disease surveillance mapping system for Cebu City that visualizes outbreak data across barangays in real time, helping health authorities track, monitor, and respond to disease trends more effectively.',
    summary:
      'A disease surveillance mapping system for Cebu City that visualizes outbreak data across barangays in real time, helping health authorities track, monitor, and respond to disease trends more effectively.',
    tone: 'bubblegum',
    overview: ['', ''],
    role: null,
    year: null,
    links: [{ label: 'Code', href: 'https://github.com/Mier03/DisMap' }],
    image: { name: 'dismap', alt: 'Dismap disease surveillance map screenshot' }, // TODO: original is wider than 16:10, so its bottom was extended with a flat strip; replace with a 1440x900 screenshot.
    gallery: [],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
