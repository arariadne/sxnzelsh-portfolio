import { useEffect } from 'react';
import { site } from '../../data/site';

interface Props {
  title?: string;
  description?: string;
  path: string;
  noindex?: boolean;
}

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = value;
}

/**
 * Per-route title, description, canonical and social tags. Updates the tags that
 * index.html already ships (the defaults link-preview scrapers read), so nothing
 * is duplicated.
 */
export function Seo({ title, description = `${site.name}, ${site.title} in ${site.location}. ${site.intro}`, path, noindex }: Props) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${site.name}` : `${site.name} | ${site.title}`;
    const url = `${site.url}${path}`;
    document.title = fullTitle;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'robots', noindex ? 'noindex' : 'index, follow');
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [title, description, path, noindex]);

  return null;
}
