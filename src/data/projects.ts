import type { Project } from './types';

/**
 * Projects. Text comes from the old Home.js and the résumé.
 * Anything marked TODO is a placeholder for you to confirm or replace.
 */
export const projects: Project[] = [
  {
    slug: 'best-life-foundry',
    number: '00',
    featured: true,
    title: 'Best Life Foundry AI suite',
    tagline: 'A family of connected apps with AI chatbots, automation and mobile releases.',
    type: 'Product suite',
    tech: ['React', 'Node.js', 'Capacitor', 'Claude'],
    statement:
      'Full-stack development across a suite of [[interconnected client applications]].',
    description:
      'A family of connected apps with AI chatbots, automation and mobile releases.',
    // Facts from the résumé only, client apps anonymised.
    overview: [
      'Contracted to lead full-stack development across a suite of interconnected client applications using React, TypeScript, Vite, Supabase (Postgres, Auth, Storage, Edge Functions) and Node.js.',
      'Delivered native Android and iOS builds by integrating Capacitor into an existing React/Vite web app, resolving CI/CD pipeline failures on Codemagic and validating releases on physical devices.',
      'Ran full-scale security audits across production applications, finding and fixing critical issues including unauthenticated edge functions, exposed storage buckets and overly permissive database access policies.',
      'Diagnosed and resolved cross-system data sync issues (bidirectional contact sync, third-party CRM/PMS integrations, document export pipelines), improving data reliability across the product suite.',
    ],
    role: null, // TODO: confirm role label for the case study strip.
    year: null, // TODO: confirm year.
    links: [],
    image: null, // TODO: anonymised or approved screenshots only.
    gallery: [],
  },
  {
    slug: 'gourmet-gamble',
    number: '01',
    title: 'Gourmet Gamble',
    tagline: 'Cook with what you have.',
    taglineTodo: true, // TODO: placeholder tagline from the design.
    type: 'Web app',
    tech: ['React', 'Firebase'],
    statement: 'Gourmet Gamble suggests recipes from the ingredients you [[already have]].',
    description:
      'A smart web platform built with React.js and Firebase that helps users turn everyday ingredients into practical, delicious meals. By entering what they have, users get tailored recipe suggestions that reduce food waste and promote sustainable cooking.',
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
    number: '02',
    title: 'Swiftsail',
    tagline: 'Browse, compare and book ferry trips in a few clicks.',
    taglineTodo: true, // TODO: drawn from the original description.
    type: 'Web app',
    tech: ['React', 'Node.js', 'Firebase'],
    statement: 'A ferry booking platform where operators list routes and travellers [[book in a few clicks]].',
    description:
      'A web-based ferry booking platform where operators list routes, schedules, and prices. Users can easily browse, compare, and book ferry trips in just a few clicks. The system streamlines booking, offers real-time availability, and ensures a smooth, hassle-free travel experience.',
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
    number: '03',
    title: 'Furwell',
    tagline: 'Find nearby vet clinics and book online.',
    taglineTodo: true, // TODO: drawn from the original description.
    type: 'Web app',
    tech: ['React', 'Node.js', 'Firebase'],
    statement: 'Furwell connects pet owners with [[nearby veterinary clinics]].',
    description:
      'A user-friendly platform connecting pet owners with nearby veterinary clinics. Users can quickly find clinics and book appointments online, while clinics can subscribe to increase their visibility and attract more clients.',
    overview: ['', ''],
    role: null,
    year: null,
    links: [
      { label: 'Live demo', href: 'https://furwell.vercel.app/Home' },
      { label: 'Code', href: 'https://github.com/laurenx122/marea-furwell' },
    ],
    image: { name: 'furwell', alt: 'Furwell veterinary booking web app screenshot' },
    gallery: [],
  },
  {
    slug: 'dismap',
    number: '04',
    title: 'Dismap',
    tagline: 'Disease surveillance mapping for Cebu City.',
    taglineTodo: true, // TODO: drawn from the original description.
    type: 'Mobile app',
    tech: ['Laravel', 'Flutter'],
    statement: 'Dismap visualises outbreak data across Cebu City barangays [[in real time]].',
    description:
      'A disease surveillance mapping system for Cebu City that visualizes outbreak data across barangays in real time, helping health authorities track, monitor, and respond to disease trends more effectively.',
    overview: ['', ''],
    role: null,
    year: null,
    links: [{ label: 'Code', href: 'https://github.com/Mier03/DisMap' }],
    image: { name: 'dismap', alt: 'Dismap disease surveillance map screenshot' },
    gallery: [],
  },
  {
    slug: 'agribot',
    number: '05',
    title: 'Agribot',
    tagline: 'An autonomous robot for weeds and pests in corn fields.',
    taglineTodo: true, // TODO: drawn from the original description.
    type: 'Embedded',
    tech: ['Python', 'YOLOv11n'],
    statement: 'Agribot finds and targets weeds and pests in corn fields [[in real time]].',
    description:
      'An autonomous robot designed to identify and eliminate weeds and pests in corn fields. Powered by YOLOv11n object detection, Agribot navigates crop rows and targets threats in real time to support precision agriculture.',
    overview: ['', ''],
    role: null,
    year: null,
    links: [{ label: 'Code', href: 'https://github.com/Adrianne-John/agribot' }],
    image: null, // TODO: no screenshot or photo yet.
    gallery: [],
  },
];

export const featuredProject = projects.find((p) => p.featured)!;
export const indexProjects = projects.filter((p) => !p.featured);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
