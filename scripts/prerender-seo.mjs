import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { createServer } from 'vite';

const siteUrl = 'https://www.lumminalaw.com';
const distRoot = join(process.cwd(), 'dist');
const template = readFileSync(join(distRoot, 'index.html'), 'utf8');

const baseRoutes = [
  {
    path: '/',
    title: 'Lummina Law Firm Lagos | Legal Clarity for Businesses',
    description:
      'Lummina Law Firm is a modern, commercially minded law firm helping founders, businesses, investors and private clients build, protect and scale with clarity, structure and strategic foresight.',
  },
  {
    path: '/about',
    title: 'About Lummina Law Firm | Commercial Legal Advisory Lagos',
    description:
      'Learn how Lummina helps emerging and evolving businesses navigate legal and regulatory complexity with clarity, structure and strategic foresight.',
  },
  {
    path: '/practice-areas',
    title: 'Commercial Law Firm Lagos | Practice Areas | Lummina Law Firm',
    description:
      'Explore commercially minded legal advisory across business foundations, governance, transactions, disputes, protection and private client needs.',
  },
  {
    path: '/our-team',
    title: 'Our Team | Lummina Law Firm Lagos',
    description:
      'Meet the Lummina team and search legal professionals by role, name and practice area.',
  },
  {
    path: '/results',
    title: 'Representative Matters | Lummina Law Firm Lagos',
    description: 'Representative matters and legal experience from Lummina Law Firm in Lagos, Nigeria.',
  },
  {
    path: '/insights',
    title: 'Legal Insights Nigeria | Lummina Law Firm',
    description: 'Legal insights, publications and events from Lummina Law Firm in Lagos, Nigeria.',
  },
  {
    path: '/consultation',
    title: 'Schedule a Consultation | Lummina Law Firm',
    description:
      'Speak with Lummina Law Firm about the legal structure, transaction, risk or growth decision in front of you.',
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy | Lummina Law Firm',
    description:
      'Learn how Lummina Law Firm handles information submitted through this website and consultation forms.',
  },
  {
    path: '/terms-of-use',
    title: 'Terms of Use | Lummina Law Firm',
    description:
      'Read the terms that apply when you use the Lummina Law Firm website and its published information.',
  },
  {
    path: '/professional-notice',
    title: 'Professional Notice | Lummina Law Firm',
    description:
      'Important information about website content, professional services, representative matters and lawyer-client relationships.',
  },
  {
    path: '/insights/business-law-nigeria',
    type: 'article',
    title: 'Building Stronger Legal Foundations for Nigerian Businesses | Lummina Law Firm',
    description: 'A practical guide to contracts, governance and compliance steps that help Nigerian companies grow with confidence.',
    image: `${siteUrl}/assets/conference-room.webp`,
    publishedTime: '2026-07-18T00:00:00.000Z',
  },
  {
    path: '/insights/debt-recovery-strategy',
    type: 'article',
    title: 'Debt Recovery Strategy: What Businesses Should Do Before Litigation | Lummina Law Firm',
    description: 'How evidence, negotiation posture and debtor analysis can shape better commercial debt recovery outcomes.',
    image: `${siteUrl}/assets/scales.webp`,
    publishedTime: '2026-07-09T00:00:00.000Z',
  },
  {
    path: '/insights/startup-readiness',
    type: 'article',
    title: 'Startup Legal Readiness Checklist | Lummina Law Firm',
    description: 'A founder-focused checklist covering incorporation, equity, contracts, intellectual property and investor preparedness.',
    image: `${siteUrl}/assets/boardroom.webp`,
    publishedTime: '2026-06-26T00:00:00.000Z',
  },
  {
    path: '/services/corporate-commercial-law-lagos',
    title: 'Corporate & Commercial Lawyers Lagos | Lummina Law Firm',
    description:
      'Commercial and corporate legal advisory in Lagos for contracts, governance, business structuring, company secretarial work and investment readiness.',
  },
  {
    path: '/services/real-estate-property-law-lagos',
    title: 'Real Estate Lawyers Lagos | Property Law | Lummina',
    description:
      'Lagos property lawyers advising on title review, land verification, acquisition, leases, perfection and real estate disputes.',
  },
  {
    path: '/services/debt-recovery-dispute-resolution-lagos',
    title: 'Debt Recovery Lawyers Lagos | Lummina Law Firm',
    description:
      'Debt recovery and dispute resolution lawyers in Lagos handling demand strategy, negotiation, litigation, enforcement and commercial settlements.',
  },
  {
    path: '/services/banking-lending-trade-finance-nigeria',
    title: 'Banking & Finance Lawyers Nigeria | Lummina Law Firm',
    description:
      'Banking and finance lawyers in Nigeria advising lenders, borrowers and businesses on loan documents, security, restructuring and finance transactions.',
  },
  {
    path: '/services/intellectual-property-law-nigeria',
    title: 'Intellectual Property Lawyers Nigeria | Lummina Law Firm',
    description:
      'Intellectual property lawyers in Nigeria advising on trademarks, copyright, licensing, brand protection and IP enforcement.',
  },
  {
    path: '/services/compliance-governance-law-nigeria',
    title: 'Compliance Lawyers Nigeria | Governance & NDPA | Lummina',
    description:
      'Compliance and governance lawyers advising Nigerian businesses on CAC filings, company secretarial work, data protection, regulatory readiness and risk.',
  },
  {
    path: '/services/private-client-estate-planning-law-lagos',
    title: 'Private Client Lawyers Lagos | Estate Planning | Lummina',
    description:
      'Private client lawyers in Lagos advising families and individuals on estate planning, succession, asset protection and sensitive personal matters.',
  },
];

const escapeJson = (value) => JSON.stringify(value).replace(/</g, '\\u003c');

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

const monetaryFigurePattern = /^\s*(?:(?:US)?[$€£]|(?:USD|NGN|GBP|EUR)\b)/i;
const publicFigure = (value, fallback = 'Representative') => {
  const text = typeof value === 'string' ? value.trim() : '';
  return text && !monetaryFigurePattern.test(text) ? text : fallback;
};

const apiBaseUrl = (process.env.PRERENDER_API_URL ?? process.env.VITE_API_BASE_URL ?? `${siteUrl}/api`).replace(/\/$/, '');

const loadPreloadedContent = async () => {
  const resources = ['practice-areas', 'team', 'results', 'statistics', 'testimonials', 'insights'];
  const collections = {};

  await Promise.all(resources.map(async (resource) => {
    try {
      const response = await fetch(`${apiBaseUrl}/public/${resource}`, {
        headers: { accept: 'application/json' },
      });
      if (!response.ok) return;
      const payload = await response.json();
      if (Array.isArray(payload.data)) collections[resource] = payload.data;
    } catch {
      // The build remains usable with bundled fallback content when the CMS is unavailable.
    }
  }));

  // Do not expose monetary matter figures in the public prerender payload.
  // The visible React components apply the same policy at render time.
  const publicCollections = Object.fromEntries(Object.entries(collections).map(([resource, records]) => {
    if (resource === 'statistics') {
      return [resource, records.map((record) => ({ ...record, value: publicFigure(record.value, 'Experience') }))];
    }
    if (resource === 'results') {
      return [resource, records.map((record) => ({ ...record, headlineFigure: publicFigure(record.headlineFigure) }))];
    }
    return [resource, records];
  }));

  const items = {
    insights: Object.fromEntries(
      (publicCollections.insights ?? [])
        .filter((item) => typeof item.slug === 'string' && item.slug.trim())
        .map((item) => [item.slug, item]),
    ),
  };

  return { collections: publicCollections, items };
};

const articleRoutesFrom = (content) => {
  const knownRoutes = new Map(baseRoutes.filter((route) => route.type === 'article').map((route) => [route.path, route]));

  for (const record of content.collections?.insights ?? []) {
    if (typeof record.slug !== 'string' || !record.slug.trim()) continue;
    const path = `/insights/${encodeURIComponent(record.slug)}`;
    const seo = record.seo && typeof record.seo === 'object' && !Array.isArray(record.seo) ? record.seo : {};
    const knownRoute = knownRoutes.get(path);
    const imageValue = record.image && typeof record.image === 'object' && !Array.isArray(record.image)
      ? record.image.url ?? record.image.secure_url ?? record.image.secureUrl
      : undefined;
    knownRoutes.set(path, {
      ...(knownRoute ?? { path, type: 'article' }),
      title: typeof seo.title === 'string' && seo.title.trim()
        ? seo.title
        : knownRoute?.title ?? `${String(record.title ?? 'Lummina Insight')} | Lummina Law Firm`,
      description: typeof seo.description === 'string' && seo.description.trim()
        ? seo.description
        : knownRoute?.description ?? String(record.excerpt ?? ''),
      image: typeof imageValue === 'string' && imageValue.trim()
        ? imageValue
        : knownRoute?.image,
      publishedTime: typeof record.publishedAt === 'string'
        ? record.publishedAt
        : knownRoute?.publishedTime,
    });
  }

  return [...knownRoutes.values()];
};

const schemaFor = (route) => {
  const graph = [
    {
      '@type': 'LegalService',
      '@id': `${siteUrl}/#legal-service`,
      name: 'Lummina Law Firm',
      url: siteUrl,
      logo: `${siteUrl}/assets/lummina-logo-dark.png`,
      image: `${siteUrl}/assets/lummina-og.png`,
      description: 'Commercially intelligent legal advisory for businesses building toward scale.',
      telephone: ['+234 201 330 7508', '+234 706 047 9068'],
      email: 'info@lumminalaw.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Plot 5, Block 94, The Providence Street,',
        addressLocality: 'Lekki Phase 1',
        addressRegion: 'Lagos',
        addressCountry: 'NG',
      },
      areaServed: [
        { '@type': 'City', name: 'Lagos' },
        { '@type': 'Country', name: 'Nigeria' },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      name: 'Lummina Law Firm',
      url: siteUrl,
      publisher: { '@id': `${siteUrl}/#legal-service` },
      inLanguage: 'en-NG',
    },
  ];

  graph.push({
    '@type': 'BreadcrumbList',
    '@id': `${siteUrl}${route.path}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
      ...(route.path.startsWith('/services/')
        ? [{ '@type': 'ListItem', position: 2, name: 'Practice Areas', item: `${siteUrl}/practice-areas` }]
        : []),
      {
        '@type': 'ListItem',
        position: route.path.startsWith('/services/') ? 3 : 2,
        name: route.title.split('|')[0].trim(),
        item: `${siteUrl}${route.path}`,
      },
    ],
  });

  if (route.type === 'article') {
    graph.push({
      '@type': 'Article',
      '@id': `${siteUrl}${route.path}#article`,
      headline: route.title,
      description: route.description,
      image: [route.image ?? `${siteUrl}/assets/lummina-og.png`],
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}${route.path}` },
      datePublished: route.publishedTime,
      dateModified: route.publishedTime,
      author: { '@type': 'Organization', name: 'Lummina Law Firm', url: siteUrl },
      publisher: {
        '@type': 'Organization',
        name: 'Lummina Law Firm',
        logo: { '@type': 'ImageObject', url: `${siteUrl}/assets/lummina-logo-dark.png` },
      },
      articleSection: 'Legal Insights',
      inLanguage: 'en-NG',
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
};

const replace = (html, pattern, value) => html.replace(pattern, value);

const vite = await createServer({
  server: { middlewareMode: true, hmr: false, ws: false },
  appType: 'custom',
  logLevel: 'error',
});

try {
  const { App } = await vite.ssrLoadModule('/src/App.tsx');
  const { PreloadedContentProvider } = await vite.ssrLoadModule('/src/context/PreloadedContentContext.tsx');
  const preloadedContent = await loadPreloadedContent();
  const routes = [
    ...baseRoutes.filter((route) => route.type !== 'article'),
    ...articleRoutesFrom(preloadedContent),
  ];

  for (const route of routes) {
    const canonicalUrl = `${siteUrl}${route.path}`;
    const canonical = escapeHtml(canonicalUrl);
    const title = escapeHtml(route.title);
    const description = escapeHtml(route.description);
    const image = escapeHtml(route.image ?? `${siteUrl}/assets/lummina-og.png`);
    let html = template;

    const router = createMemoryRouter([
      { path: '*', element: React.createElement(App) },
    ], { initialEntries: [route.path] });
    const renderedPage = renderToStaticMarkup(
      React.createElement(
        PreloadedContentProvider,
        { value: preloadedContent },
        React.createElement(RouterProvider, { router }),
      ),
    );
    router.dispose();
    html = html.replace('<div id="root"></div>', `<div id="root">${renderedPage}</div>`);

    html = replace(html, /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
    html = replace(html, /<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${description}" />`);
    html = replace(html, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonical}" />`);
    html = replace(html, /<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${title}" />`);
    html = replace(html, /<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${description}" />`);
    html = replace(html, /<meta property="og:type" content="[^"]*" \/>/, `<meta property="og:type" content="${route.type === 'article' ? 'article' : 'website'}" />`);
    html = replace(html, /<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${canonical}" />`);
    html = replace(html, /<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${image}" />`);
    html = replace(html, /<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${title}" />`);
    html = replace(html, /<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${description}" />`);
  html = replace(html, /<meta name="twitter:image" content="[^"]*" \/>/, `<meta name="twitter:image" content="${image}" />`);
  if (route.type === 'article') {
    const publishedTime = escapeHtml(route.publishedTime ?? '');
    const articleMeta = `<meta property="article:published_time" content="${publishedTime}" /><meta property="article:modified_time" content="${publishedTime}" /><meta property="article:author" content="Lummina Law Firm" /><meta property="article:section" content="Legal Insights" />`;
    html = html.replace('</head>', articleMeta + '</head>');
  }
  html = replace(html, /<script id="lummina-structured-data" type="application\/ld\+json">[\s\S]*?<\/script>/, `<script id="lummina-structured-data" type="application/ld+json">${escapeJson(schemaFor(route))}</script>`);
  html = html.replace('</head>', `<script>window.__LUMMINA_PRERENDER_DATA__=${escapeJson(preloadedContent)};</script></head>`);

  const outputPath = join(distRoot, route.path.slice(1), 'index.html');
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, html);
  }

  console.log(`Prerendered route HTML and SEO metadata for ${routes.length} routes.`);
} finally {
  await vite.close();
}
