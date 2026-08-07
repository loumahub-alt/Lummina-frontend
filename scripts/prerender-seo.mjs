import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const siteUrl = 'https://www.lumminalaw.com';
const distRoot = join(process.cwd(), 'dist');
const template = readFileSync(join(distRoot, 'index.html'), 'utf8');

const routes = [
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
    path: '/attorneys',
    title: 'Lummina Lawyers Lagos | Attorneys | Lummina Law Firm',
    description:
      'Meet the Lummina team and search legal professionals by role, name and practice area.',
  },
  {
    path: '/our-team',
    title: 'Our Legal Team | Lummina Law Firm Lagos',
    description:
      'Meet the Lummina team providing clear, strategic and commercially aware guidance through growth and complexity.',
  },
  {
    path: '/results',
    title: 'Commercial Legal Results | Lummina Law Firm Lagos',
    description:
      'Representative Lummina outcomes and case highlights. Past results do not guarantee future outcomes.',
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
      telephone: '+234 706 046 9068',
      email: 'info@lummina.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '12 Oluseyi Aweda Street',
        addressLocality: 'Magodo Phase 1',
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

  return { '@context': 'https://schema.org', '@graph': graph };
};

const replace = (html, pattern, value) => html.replace(pattern, value);

for (const route of routes) {
  const canonical = `${siteUrl}${route.path}`;
  const image = `${siteUrl}/assets/lummina-og.png`;
  let html = template;

  html = replace(html, /<title>[\s\S]*?<\/title>/, `<title>${route.title}</title>`);
  html = replace(html, /<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${route.description}" />`);
  html = replace(html, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonical}" />`);
  html = replace(html, /<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${route.title}" />`);
  html = replace(html, /<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${route.description}" />`);
  html = replace(html, /<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${canonical}" />`);
  html = replace(html, /<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${image}" />`);
  html = replace(html, /<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${route.title}" />`);
  html = replace(html, /<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${route.description}" />`);
  html = replace(html, /<meta name="twitter:image" content="[^"]*" \/>/, `<meta name="twitter:image" content="${image}" />`);
  html = replace(html, /<script id="lummina-structured-data" type="application\/ld\+json">[\s\S]*?<\/script>/, `<script id="lummina-structured-data" type="application/ld+json">${escapeJson(schemaFor(route))}</script>`);

  const outputPath = join(distRoot, route.path.slice(1), 'index.html');
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, html);
}

console.log(`Prerendered SEO metadata for ${routes.length} routes.`);
