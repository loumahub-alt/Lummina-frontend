import type { SeoEntry } from '../types';

const ensureMeta = (selector: string, create: () => HTMLMetaElement) => {
  const existing = document.head.querySelector<HTMLMetaElement>(selector);
  if (existing) {
    return existing;
  }

  const meta = create();
  document.head.appendChild(meta);
  return meta;
};

export const applySeo = (entry: SeoEntry, path: string) => {
  document.title = entry.title;

  const description = ensureMeta('meta[name="description"]', () => {
    const meta = document.createElement('meta');
    meta.name = 'description';
    return meta;
  });
  description.content = entry.description;

  const ogTitle = ensureMeta('meta[property="og:title"]', () => {
    const meta = document.createElement('meta');
    meta.setAttribute('property', 'og:title');
    return meta;
  });
  ogTitle.content = entry.title;

  const ogDescription = ensureMeta('meta[property="og:description"]', () => {
    const meta = document.createElement('meta');
    meta.setAttribute('property', 'og:description');
    return meta;
  });
  ogDescription.content = entry.description;

  const ogType = ensureMeta('meta[property="og:type"]', () => {
    const meta = document.createElement('meta');
    meta.setAttribute('property', 'og:type');
    return meta;
  });
  ogType.content = 'website';

  const canonical = ensureMeta('meta[property="og:url"]', () => {
    const meta = document.createElement('meta');
    meta.setAttribute('property', 'og:url');
    return meta;
  });
  canonical.content = `${window.location.origin}${path}`;
};
