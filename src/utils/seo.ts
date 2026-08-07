import { brand, offices, seo } from '../data/site';
import type { SeoEntry } from '../types';

const siteUrl = brand.siteUrl;
const defaultImage = `${siteUrl}/assets/lummina-og.png`;

const ensureMeta = (selector: string, create: () => HTMLMetaElement) => {
  const existing = document.head.querySelector<HTMLMetaElement>(selector);
  if (existing) {
    return existing;
  }

  const meta = create();
  document.head.appendChild(meta);
  return meta;
};

const setMeta = (name: string, content: string) => {
  const meta = ensureMeta(`meta[name="${name}"]`, () => {
    const element = document.createElement('meta');
    element.name = name;
    return element;
  });
  meta.content = content;
};

const setProperty = (property: string, content: string) => {
  const meta = ensureMeta(`meta[property="${property}"]`, () => {
    const element = document.createElement('meta');
    element.setAttribute('property', property);
    return element;
  });
  meta.content = content;
};

const ensureLink = (rel: string) => {
  const existing = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (existing) {
    return existing;
  }

  const link = document.createElement('link');
  link.rel = rel;
  document.head.appendChild(link);
  return link;
};

const cleanPath = (path: string) => path.split('#')[0].split('?')[0] || '/';

const titleForBreadcrumb = (entry: SeoEntry) => entry.title.split('|')[0].trim();

const getBreadcrumbs = (path: string, entry: SeoEntry) => {
  const pathname = cleanPath(path);
  if (pathname === '/' || pathname === '/404') {
    return [];
  }

  const labels: Record<string, string> = {
    '/about': 'About',
    '/practice-areas': 'Practice Areas',
    '/attorneys': 'Attorneys',
    '/our-team': 'Our Team',
    '/results': 'Results',
    '/insights': 'Insights',
    '/consultation': 'Schedule a Consultation',
  };
  const serviceMatch = pathname.match(/^\/services\/([^/]+)$/);
  const currentLabel = labels[pathname] ??
    (serviceMatch ? titleForBreadcrumb(entry) : 'Page');

  const breadcrumbs = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
  ];

  if (serviceMatch) {
    breadcrumbs.push({
      '@type': 'ListItem',
      position: 2,
      name: 'Practice Areas',
      item: `${siteUrl}/practice-areas`,
    });
  }

  breadcrumbs.push({
    '@type': 'ListItem',
    position: serviceMatch ? 3 : 2,
    name: currentLabel,
    item: `${siteUrl}${pathname}`,
  });

  return breadcrumbs;
};

const writeStructuredData = (path: string, entry: SeoEntry) => {
  const office = offices[0];
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LegalService',
        '@id': `${siteUrl}/#legal-service`,
        name: brand.legalName,
        url: siteUrl,
        logo: `${siteUrl}${brand.logoDark}`,
        image: entry.image ?? defaultImage,
        description: brand.statement,
        telephone: brand.phoneInternational,
        email: brand.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: office.address[0],
          addressLocality: office.address[1],
          addressRegion: 'Lagos',
          addressCountry: 'NG',
        },
        areaServed: [
          { '@type': 'City', name: 'Lagos' },
          { '@type': 'Country', name: 'Nigeria' },
        ],
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'https://schema.org/Monday',
              'https://schema.org/Tuesday',
              'https://schema.org/Wednesday',
              'https://schema.org/Thursday',
              'https://schema.org/Friday',
            ],
            opens: '08:30',
            closes: '18:00',
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        name: brand.legalName,
        url: siteUrl,
        publisher: { '@id': `${siteUrl}/#legal-service` },
        inLanguage: 'en-NG',
      },
    ],
  } as {
    '@context': string;
    '@graph': Array<Record<string, unknown>>;
  };

  const breadcrumbs = getBreadcrumbs(path, entry);
  if (breadcrumbs.length > 0) {
    schema['@graph'].push({
      '@type': 'BreadcrumbList',
      '@id': `${siteUrl}${cleanPath(path)}#breadcrumb`,
      itemListElement: breadcrumbs,
    });
  }

  let script = document.head.querySelector<HTMLScriptElement>('#lummina-structured-data');
  if (!script) {
    script = document.createElement('script');
    script.id = 'lummina-structured-data';
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(schema);
};

export const applySeo = (entry: SeoEntry, path: string) => {
  const pathname = cleanPath(path);
  const canonicalUrl = `${siteUrl}${pathname === '/' ? '/' : pathname}`;
  const imageUrl = entry.image ?? defaultImage;

  document.title = entry.title;

  setMeta('description', entry.description);
  setMeta('robots', 'index,follow');
  setMeta('author', brand.legalName);

  setProperty('og:title', entry.title);
  setProperty('og:description', entry.description);
  setProperty('og:type', 'website');
  setProperty('og:url', canonicalUrl);
  setProperty('og:site_name', brand.legalName);
  setProperty('og:locale', 'en_NG');
  setProperty('og:image', imageUrl);
  setProperty('og:image:alt', `${brand.legalName} - ${entry.title}`);
  setProperty('og:image:width', '1200');
  setProperty('og:image:height', '630');

  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', entry.title);
  setMeta('twitter:description', entry.description);
  setMeta('twitter:image', imageUrl);

  const canonical = ensureLink('canonical');
  canonical.href = canonicalUrl;

  document.head.querySelector('meta[name="keywords"]')?.remove();
  writeStructuredData(path, entry);
};

export const defaultSeoEntry = seo['/'];
