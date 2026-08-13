import type {
  FooterColumn,
  ImageRegistry,
  Insight,
  NavigationItem,
  Office,
  PracticeArea,
  ResultItem,
  SeoEntry,
  ServicePage,
  Stat,
  Testimonial,
} from '../types';

export const brand = {
  name: 'Lummina',
  legalName: 'Lummina Law Firm',
  descriptor: 'Barristers and Solicitors',
  email: 'info@lumminalaw.com',
  alternateEmail: 'lumminalp@gmail.com',
  phone: '+234 201 330 7508',
  phones: ['+234 201 330 7508', '+234 706 047 9068'],
  phoneInternational: '+234 201 330 7508',
  whatsapp: 'https://wa.me/2347060479068',
  website: 'www.lumminalaw.com',
  siteUrl: 'https://www.lumminalaw.com',
  logoDark: '/assets/lummina-logo-dark-transparent.png',
  logoLight: '/assets/lummina-logo-light-transparent.png',
  loader: '/assets/lummina-loader.gif',
  copyright: '(c) 2026 Lummina Law Firm. All Rights Reserved.',
  statement:
    'Commercially intelligent legal advisory for businesses building toward scale.',
};

export const navigation: NavigationItem[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Practice Areas', to: '/practice-areas' },
  { label: 'Our Team', to: '/our-team' },
  { label: 'Results', to: '/results' },
  { label: 'Insights', to: '/insights' },
  { label: 'Contact', to: '/consultation' },
  { label: 'Schedule a Consultation', to: '/consultation', cta: true },
];

export const images: ImageRegistry = {
  columns: {
    src: '/assets/hero-columns.webp',
    alt: 'Classical courthouse columns lit warmly against a dark evening sky',
    position: 'center right',
    width: 1815,
    height: 867,
  },
  boardroom: {
    src: '/assets/boardroom.webp',
    alt: 'Premium executive boardroom with a polished walnut table and city skyline',
    position: 'center right',
    width: 1681,
    height: 935,
  },
  library: {
    src: '/assets/library-desk.webp',
    alt: 'Quiet legal library with an open book, brass lamp and leather-bound volumes',
    position: 'center right',
    width: 1774,
    height: 887,
  },
  conference: {
    src: '/assets/conference-room.webp',
    alt: 'Refined law firm conference room with leather chairs and organized folders',
    position: 'center center',
    width: 1774,
    height: 887,
  },
  scales: {
    src: '/assets/scales.webp',
    alt: 'Bronze scales of justice on a polished table in a legal library',
    position: 'center right',
    width: 1694,
    height: 929,
  },
  team: {
    src: '/assets/team-group.webp',
    alt: 'Diverse law firm leadership group in a premium office lobby',
    position: 'center center',
    width: 1774,
    height: 887,
  },
};

export const messagePillars = [
  {
    title: 'Legal Foundations for Growth',
    icon: 'building' as const,
    text: 'We help clients structure businesses correctly, establish scalable governance, protect ownership and control, and manage legal risk before it becomes expensive.',
    signature: 'Structure before speed.',
  },
  {
    title: 'Commercially Intelligent Advisory',
    icon: 'briefcase' as const,
    text: 'Our legal strategy accounts for commercial realities, operational impact, investor readiness, execution speed and long-term value creation.',
    signature: 'Commercial outcomes, not just legal output.',
  },
  {
    title: 'Long-Term Strategic Partnership',
    icon: 'handshake' as const,
    text: 'We provide proactive, clear and tailored guidance so clients feel informed, protected and supported through growth and complexity.',
    signature: 'Trusted guidance through complexity.',
  },
];

export const audienceSegments = [
  {
    title: 'Founders & Startups',
    text: 'Structure, governance, compliance, IP and growth protection for businesses taking shape.',
  },
  {
    title: 'Investors & Capital Deployers',
    text: 'Transaction support, due diligence, structuring and protection for capital at work.',
  },
  {
    title: 'Established Businesses',
    text: 'Governance, restructuring, compliance, transactions and risk management for evolving enterprises.',
  },
  {
    title: 'Private Clients & Families',
    text: 'Discreet asset protection, succession planning and continuity structures for the long term.',
  },
];

export const servicePages: ServicePage[] = [
  {
    slug: 'corporate-commercial-law-lagos',
    eyebrow: 'Corporate & Commercial Law',
    title: 'Corporate & Commercial Lawyers in Lagos',
    primaryKeyword: 'corporate and commercial law firm Lagos',
    seoTitle: 'Corporate & Commercial Lawyers Lagos | Lummina Law Firm',
    seoDescription:
      'Commercial and corporate legal advisory in Lagos for contracts, governance, business structuring, company secretarial work and investment readiness.',
    intro:
      'Lummina helps founders, companies and investors make sound commercial decisions with legal structure that supports sustainable growth. We advise across formation, governance, contracts, transactions and the practical issues that arise as a business evolves.',
    practiceAreaIds: ['business-law', 'company-secretarial-compliance', 'startup-law'],
    insightIds: ['business-law-nigeria', 'startup-readiness', 'company-secretarial'],
    highlights: [
      'Business formation and structuring',
      'Commercial contracts and negotiations',
      'Corporate governance and board support',
      'Shareholder and founder arrangements',
      'Investment readiness and transaction support',
      'Company secretarial and statutory compliance',
    ],
  },
  {
    slug: 'real-estate-property-law-lagos',
    eyebrow: 'Real Estate & Construction',
    title: 'Real Estate Lawyers in Lagos',
    primaryKeyword: 'real estate lawyer Lagos',
    seoTitle: 'Real Estate Lawyers Lagos | Property Law | Lummina',
    seoDescription:
      'Lagos property lawyers advising on title review, land verification, acquisition, leases, perfection and real estate disputes.',
    intro:
      'Property decisions require clarity before money changes hands. Lummina helps purchasers, developers, landlords and businesses assess title, structure transactions and manage property risk from due diligence through completion.',
    practiceAreaIds: ['real-estate-property-law'],
    insightIds: ['real-estate-title', 'business-law-nigeria', 'startup-readiness'],
    highlights: [
      'Title review and land verification',
      'Property acquisition and sale',
      'Leases and development agreements',
      'Perfection and registration support',
      'Real estate financing and security',
      'Property-related disputes',
    ],
  },
  {
    slug: 'debt-recovery-dispute-resolution-lagos',
    eyebrow: 'Dispute Resolution & Debt Recovery',
    title: 'Debt Recovery Lawyers in Lagos',
    primaryKeyword: 'debt recovery lawyer Lagos',
    seoTitle: 'Debt Recovery Lawyers Lagos | Lummina Law Firm',
    seoDescription:
      'Debt recovery and dispute resolution lawyers in Lagos handling demand strategy, negotiation, litigation, enforcement and commercial settlements.',
    intro:
      'Debt recovery is a commercial decision as well as a legal process. Lummina helps creditors assess recovery options, preserve leverage, negotiate where appropriate and pursue enforcement or litigation when it is the right route.',
    practiceAreaIds: ['debt-recovery', 'litigation', 'alternative-dispute-resolution'],
    insightIds: ['debt-recovery-strategy', 'adr-commercial-disputes', 'business-law-nigeria'],
    highlights: [
      'Recovery assessment and demand strategy',
      'Negotiated settlements',
      'Commercial litigation',
      'Mediation and arbitration',
      'Judgment enforcement planning',
      'Debt restructuring and recovery-linked advice',
    ],
  },
  {
    slug: 'banking-lending-trade-finance-nigeria',
    eyebrow: 'Banking, Lending & Trade Finance',
    title: 'Banking & Finance Lawyers in Nigeria',
    primaryKeyword: 'banking lawyer Nigeria',
    seoTitle: 'Banking & Finance Lawyers Nigeria | Lummina Law Firm',
    seoDescription:
      'Banking and finance lawyers in Nigeria advising lenders, borrowers and businesses on loan documents, security, restructuring and finance transactions.',
    intro:
      'Lummina supports lenders, borrowers and businesses with finance documentation that reflects the transaction, the security position and the commercial objective. Our advice is designed to help clients understand obligations, manage risk and execute with confidence.',
    practiceAreaIds: ['banking-finance', 'debt-recovery'],
    insightIds: ['debt-recovery-strategy', 'startup-readiness', 'business-law-nigeria'],
    highlights: [
      'Loan and facility documentation',
      'Security review and documentation',
      'Borrower and lender advisory',
      'Trade and structured finance support',
      'Debt restructuring',
      'Finance-linked recovery strategy',
    ],
  },
  {
    slug: 'intellectual-property-law-nigeria',
    eyebrow: 'Intellectual Property',
    title: 'Intellectual Property Lawyers in Nigeria',
    primaryKeyword: 'trademark lawyer Nigeria',
    seoTitle: 'Intellectual Property Lawyers Nigeria | Lummina Law Firm',
    seoDescription:
      'Intellectual property lawyers in Nigeria advising on trademarks, copyright, licensing, brand protection and IP enforcement.',
    intro:
      'Brands, content and ideas are business assets. Lummina helps companies and creators protect, use and commercialise intellectual property through practical advice on ownership, registration, licensing and enforcement.',
    practiceAreaIds: ['intellectual-property', 'entertainment-media-law'],
    insightIds: ['creative-sector-rights', 'tech-contracting', 'startup-readiness'],
    highlights: [
      'Trademark registration and strategy',
      'Copyright ownership and protection',
      'Licensing and commercialisation',
      'Brand and content agreements',
      'IP due diligence',
      'Infringement and enforcement strategy',
    ],
  },
  {
    slug: 'compliance-governance-law-nigeria',
    eyebrow: 'Compliance & Governance',
    title: 'Compliance Lawyers in Nigeria',
    primaryKeyword: 'compliance lawyer Nigeria',
    seoTitle: 'Compliance Lawyers Nigeria | Governance & NDPA | Lummina',
    seoDescription:
      'Compliance and governance lawyers advising Nigerian businesses on CAC filings, company secretarial work, data protection, regulatory readiness and risk.',
    intro:
      'Good compliance is operational infrastructure. Lummina helps businesses build governance systems, maintain accurate records and respond to regulatory obligations before they become disruptive or expensive.',
    practiceAreaIds: ['company-secretarial-compliance', 'technology-law', 'energy-natural-resources'],
    insightIds: ['company-secretarial', 'tech-contracting', 'startup-readiness'],
    highlights: [
      'Company secretarial services',
      'CAC filings and statutory records',
      'Corporate governance systems',
      'Data protection and privacy advisory',
      'Regulatory compliance reviews',
      'Risk management and remediation planning',
    ],
  },
  {
    slug: 'private-client-estate-planning-law-lagos',
    eyebrow: 'Private Client & Family Services',
    title: 'Private Client Lawyers in Lagos',
    primaryKeyword: 'private client lawyer Lagos',
    seoTitle: 'Private Client Lawyers Lagos | Estate Planning | Lummina',
    seoDescription:
      'Private client lawyers in Lagos advising families and individuals on estate planning, succession, asset protection and sensitive personal matters.',
    intro:
      'Private client advice should protect both today’s interests and tomorrow’s continuity. Lummina provides discreet counsel to individuals and families on succession, asset protection, estate planning and sensitive legal arrangements.',
    practiceAreaIds: ['family-private-client-services'],
    insightIds: ['adr-commercial-disputes', 'real-estate-title', 'business-law-nigeria'],
    highlights: [
      'Wills and estate planning',
      'Probate and succession support',
      'Asset protection structures',
      'Family arrangements',
      'Private client advisory',
      'Sensitive negotiations and dispute support',
    ],
  },
];

export const seo: Record<string, SeoEntry> = {
  '/': {
    title: 'Lummina Law Firm Lagos | Legal Clarity for Businesses',
    description:
      'Lummina Law Firm is a modern, commercially minded law firm helping founders, businesses, investors and private clients build, protect and scale with clarity, structure and strategic foresight.',
  },
  '/about': {
    title: 'About Lummina Law Firm | Commercial Legal Advisory Lagos',
    description:
      'Learn how Lummina helps emerging and evolving businesses navigate legal and regulatory complexity with clarity, structure and strategic foresight.',
  },
  '/practice-areas': {
    title: 'Commercial Law Firm Lagos | Practice Areas | Lummina Law Firm',
    description:
      'Explore commercially minded legal advisory across business foundations, governance, transactions, disputes, protection and private client needs.',
  },
  '/our-team': {
    title: 'Our Team | Lummina Law Firm Lagos',
    description:
      'Meet the Lummina team and search legal professionals by role, name and practice area.',
  },
  '/results': {
    title: 'Commercial Legal Results | Lummina Law Firm Lagos',
    description:
      'Representative Lummina outcomes and case highlights. Past results do not guarantee future outcomes.',
  },
  '/insights': {
    title: 'Legal Insights Nigeria | Lummina Law Firm',
    description:
      'Legal insights, publications and events from Lummina Law Firm in Lagos, Nigeria.',
  },
  '/consultation': {
    title: 'Schedule a Consultation | Lummina Law Firm',
    description:
      'Speak with Lummina Law Firm about the legal structure, transaction, risk or growth decision in front of you.',
  },
  '/search': {
    title: 'Search | Lummina Law Firm',
    description:
      'Search published practice areas, team profiles, representative results and legal insights from Lummina Law Firm.',
  },
  '/404': {
    title: 'Page Not Found | Lummina Law Firm',
    description:
      'The page you requested could not be found. Explore Lummina Law Firm services or schedule a consultation in Lagos.',
  },
};

for (const page of servicePages) {
  seo[`/services/${page.slug}`] = {
    title: page.seoTitle,
    description: page.seoDescription,
  };
}

export const practiceAreas: PracticeArea[] = [
  {
    id: 'business-law',
    title: 'Business Law',
    icon: 'briefcase',
    shortDescription: 'Practical legal support for businesses at every stage of growth.',
    summary:
      'Commercial agreements, corporate governance and day-to-day business advisory for Nigerian enterprises.',
    services: ['Commercial contracts', 'Corporate governance', 'Business structuring', 'Risk advisory'],
    detail:
      'Lummina advises businesses with practical, cost-conscious legal strategy. We help clients structure operations, negotiate agreements and make informed decisions in a changing Nigerian business environment.',
    image: 'boardroom',
  },
  {
    id: 'debt-recovery',
    title: 'Debt Recovery',
    icon: 'chart',
    shortDescription: 'Disciplined recovery strategy for commercial and private debts.',
    summary:
      'Negotiation, demand strategy, enforcement planning and litigation support for recoveries.',
    services: ['Demand notices', 'Negotiated settlements', 'Recovery litigation', 'Enforcement strategy'],
    detail:
      'Our debt recovery work focuses on speed, leverage and commercial sense. We assess the debtor profile, preserve evidence and pursue practical routes to recovery while protecting client relationships where possible.',
    image: 'scales',
  },
  {
    id: 'company-secretarial-compliance',
    title: 'Company Secretarial & Compliance',
    icon: 'file',
    shortDescription: 'Company administration, filings and regulatory compliance made clear.',
    summary:
      'Governance records, statutory filings, board support and regulatory compliance for companies.',
    services: ['CAC filings', 'Board records', 'Regulatory compliance', 'Company restructuring'],
    detail:
      'We support businesses with the compliance systems and company secretarial discipline required to operate confidently. Our work covers statutory filings, governance documentation and regulatory readiness.',
    image: 'library',
  },
  {
    id: 'technology-law',
    title: 'Technology Law',
    icon: 'network',
    shortDescription: 'Legal strategy for technology products, platforms and data-driven businesses.',
    summary:
      'Contracts, product risk, data protection and advisory support for technology clients.',
    services: ['Technology contracts', 'Data protection', 'Platform policies', 'Product risk review'],
    detail:
      'Lummina helps technology companies build responsibly. We advise on platform contracts, privacy considerations, procurement, outsourcing and the legal issues that arise as digital products scale.',
    image: 'conference',
  },
  {
    id: 'startup-law',
    title: 'Startup Law',
    icon: 'lightbulb',
    shortDescription: 'Founder-friendly counsel for formation, fundraising and growth.',
    summary:
      'Entity setup, shareholder arrangements, investment readiness and commercial foundations for startups.',
    services: ['Founder agreements', 'Investment documents', 'Equity planning', 'Commercial policies'],
    detail:
      'We provide startups with tailored legal foundations from formation to financing. Our goal is to help founders avoid preventable legal friction and build companies that are investment-ready.',
    image: 'boardroom',
  },
  {
    id: 'entertainment-media-law',
    title: 'Entertainment & Media Law',
    icon: 'calendar',
    shortDescription: 'Contracts and rights protection for creators, media ventures and talent.',
    summary:
      'Advisory support for content, talent, production, distribution and creative-sector transactions.',
    services: ['Talent agreements', 'Content licensing', 'Production contracts', 'Rights protection'],
    detail:
      'Our entertainment and media practice supports creators and companies with clear contracts, IP protection and negotiation strategy across production, licensing, sponsorship and distribution arrangements.',
    image: 'library',
  },
  {
    id: 'litigation',
    title: 'Litigation',
    icon: 'scale',
    shortDescription: 'Focused advocacy for commercial and civil disputes.',
    summary:
      'Courtroom strategy, filings, evidence planning and settlement analysis for contentious matters.',
    services: ['Commercial disputes', 'Civil claims', 'Pre-action strategy', 'Trial preparation'],
    detail:
      'Lummina approaches litigation with preparation and precision. We help clients understand risk, preserve leverage and pursue outcomes that align with the broader commercial or personal objective.',
    image: 'scales',
  },
  {
    id: 'alternative-dispute-resolution',
    title: 'Alternative Dispute Resolution (ADR)',
    icon: 'handshake',
    shortDescription: 'Resolution-focused support for mediation, negotiation and arbitration.',
    summary:
      'A practical route for resolving disputes without unnecessary delay, cost or escalation.',
    services: ['Mediation', 'Arbitration', 'Settlement negotiation', 'Dispute strategy'],
    detail:
      'We help clients identify when negotiation, mediation or arbitration may deliver a stronger outcome than prolonged litigation. Our ADR work is strategic, confidential and commercially grounded.',
    image: 'conference',
  },
  {
    id: 'real-estate-property-law',
    title: 'Real Estate & Property Law',
    icon: 'building',
    shortDescription: 'Property transactions, title review and real estate dispute support.',
    summary:
      'Advisory support across acquisition, leasing, title perfection and property-related disputes.',
    services: ['Title review', 'Property acquisition', 'Lease agreements', 'Real estate disputes'],
    detail:
      'Our property work helps clients move from interest to ownership or occupation with clarity. We review title, draft transaction documents and advise on risks that may affect value or possession.',
    image: 'columns',
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property',
    icon: 'badge',
    shortDescription: 'Protection and commercialization of brands, works and ideas.',
    summary:
      'Trademark, copyright, licensing and enforcement support for businesses and creators.',
    services: ['Trademark support', 'Copyright advisory', 'Licensing agreements', 'IP enforcement'],
    detail:
      'Lummina helps clients protect and commercialize intellectual assets. We advise on brand protection, copyright ownership, licensing, infringement risk and enforcement strategy.',
    image: 'library',
  },
  {
    id: 'banking-finance',
    title: 'Banking & Finance',
    icon: 'landmark',
    shortDescription: 'Legal support for lending, finance documents and financial transactions.',
    summary:
      'Transaction review, security documentation and finance-related advisory for institutions and businesses.',
    services: ['Loan documentation', 'Security review', 'Finance transactions', 'Debt restructuring'],
    detail:
      'We support banks, businesses and borrowers with finance documents and transaction strategy. Our work includes lending structures, security arrangements, restructuring and recovery-linked advisory.',
    image: 'boardroom',
  },
  {
    id: 'employment-labour-law',
    title: 'Employment & Labour Law',
    icon: 'users',
    shortDescription: 'Workplace advisory for employers, executives and growing teams.',
    summary:
      'Employment contracts, policies, disputes and HR risk management for Nigerian workplaces.',
    services: ['Employment contracts', 'HR policies', 'Workplace disputes', 'Executive exits'],
    detail:
      'We advise on employment relationships from hiring to separation. Our work helps clients set expectations, reduce workplace risk and respond effectively when disputes arise.',
    image: 'conference',
  },
  {
    id: 'energy-natural-resources',
    title: 'Energy & Natural Resources',
    icon: 'globe',
    shortDescription: 'Commercial and regulatory support for energy-sector activity.',
    summary:
      'Contracting, compliance and transaction support for energy and natural resource projects.',
    services: ['Project contracts', 'Regulatory review', 'Joint ventures', 'Risk advisory'],
    detail:
      'Lummina supports clients operating in energy and natural resources with contract strategy, compliance review and transaction support that reflects the realities of regulated project environments.',
    image: 'columns',
  },
  {
    id: 'family-private-client-services',
    title: 'Family Law & Private Client Services',
    icon: 'shield',
    shortDescription: 'Discreet counsel for families, private clients and personal matters.',
    summary:
      'Private client planning, family arrangements and sensitive personal legal support.',
    services: ['Family arrangements', 'Private client advisory', 'Estate planning', 'Sensitive negotiations'],
    detail:
      'Our private client work is discreet, thoughtful and practical. We help individuals and families make legal decisions with clarity, privacy and long-term stability in mind.',
    image: 'library',
  },
];

export const practiceAreaGroups: PracticeArea[] = [
  {
    id: 'business-law',
    title: 'Business Law',
    icon: 'briefcase',
    shortDescription:
      'Durable businesses are built on sound legal foundations. We design and implement the legal infrastructure that makes sustainable growth possible.',
    summary:
      'Durable businesses are built on sound legal foundations. We design and implement the legal infrastructure that makes sustainable growth possible.',
    services: [
      'Business Formation',
      'Corporate & Commercial Advisory',
      'Corporate Structuring & Governance',
      'Contract Drafting & Review',
      'Legal & Regulatory Compliance',
      'Commercial Documentation',
      'Company Secretarial Services',
      'Due Diligence',
    ],
    detail:
      'Clear ownership architecture and documented decision frameworks, contracts that allocate risk with precision, governance systems that scale as the business does, and regulatory compliance built into operations.',
    image: 'boardroom',
  },
  {
    id: 'real-estate-property-law',
    title: 'Real Estate & Property',
    icon: 'building',
    shortDescription:
      'Property is one of the most significant assets an individual or business will ever hold. We advise on acquisition, structuring, and long-term protection.',
    summary:
      'Property is one of the most significant assets an individual or business will ever hold. We advise on acquisition, structuring, and long-term protection.',
    services: ['Property Transactions', 'Title Due Diligence', 'Asset Structuring & Protection'],
    detail:
      'We help clients assess property risk early, structure acquisitions clearly, and protect the value and continuity of significant real estate assets.',
    image: 'columns',
  },
  {
    id: 'transactions-capital',
    title: 'Transactions & Capital',
    icon: 'landmark',
    shortDescription:
      'Capital deployment and corporate transactions require structured documentation and clear execution strategy. We support our clients through every stage of a transaction, from initial structuring to final execution.',
    summary:
      'Capital deployment and corporate transactions require structured documentation and clear execution strategy. We support our clients through every stage of a transaction, from initial structuring to final execution.',
    services: [
      'Investment Support & Documentation',
      'Mergers & Acquisitions',
      'Corporate Reorganisations & Restructuring',
    ],
    detail:
      'We align transaction documentation, commercial objectives, diligence and execution so capital can move with clarity and control.',
    image: 'boardroom',
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property',
    icon: 'badge',
    shortDescription:
      'We advise on the full spectrum of intellectual property protection and enforcement, from brand identity to proprietary technology.',
    summary:
      'We advise on the full spectrum of intellectual property protection and enforcement, from brand identity to proprietary technology.',
    services: [
      'Patent Registration & Protection',
      'Trademark Filings & Enforcement',
      'Copyright Advisory',
      'Trade Secret Protection',
    ],
    detail:
      'Our advice helps clients identify, protect, commercialise and enforce the intellectual property that gives their businesses value.',
    image: 'library',
  },
  {
    id: 'cross-border-transactions',
    title: 'Cross-Border Transactions',
    icon: 'globe',
    shortDescription:
      'Operating across jurisdictions introduces layers of legal complexity that require both local depth and international perspective. We advise clients on multi-jurisdiction structuring, compliance, and execution.',
    summary:
      'Operating across jurisdictions introduces layers of legal complexity that require both local depth and international perspective. We advise clients on multi-jurisdiction structuring, compliance, and execution.',
    services: [],
    detail:
      'We help clients coordinate local requirements, cross-border structures, regulatory obligations and transaction execution across jurisdictions.',
    image: 'conference',
  },
  {
    id: 'private-client-services',
    title: 'Private Client Services',
    icon: 'shield',
    shortDescription:
      'We work with founders and families to create durable legal structures that protect assets, plan for succession, and ensure continuity across generations.',
    summary:
      'We work with founders and families to create durable legal structures that protect assets, plan for succession, and ensure continuity across generations.',
    services: [
      'Trust Structures & Family Office Advisory',
      'Succession Planning',
      'Long-Term Asset Protection',
    ],
    detail:
      'Our private client counsel is discreet, practical and designed around long-term protection, continuity and family priorities.',
    image: 'library',
  },
];

export const lumminaApproach = [
  {
    title: 'Structure Before Speed',
    icon: 'building' as const,
    text: 'We design the legal architecture before executing documentation. A durable structure always precedes scale.',
  },
  {
    title: 'Governance as a System',
    icon: 'briefcase' as const,
    text: 'We treat governance as operational infrastructure, not a compliance formality. Ownership, control, and documentation must align.',
  },
  {
    title: 'Intentional Drafting',
    icon: 'file' as const,
    text: 'Contracts are not mere administrative paperwork. They are risk allocation instruments built to withstand scrutiny, time, and dispute.',
  },
];

export const homePracticeAreas = practiceAreaGroups;

export const homeStats: Stat[] = [
  { value: '14', label: 'Practice Areas' },
  { value: '$21M', label: 'Debt-to-Equity Transaction Experience' },
  { value: 'NGN 500M+', label: 'Debt Recoveries Referenced in Firm Experience' },
  { value: 'Lagos', label: 'Nigeria-Based Counsel' },
];

export const resultStats: Stat[] = [
  { value: '14', label: 'Practice Areas' },
  { value: '$21M', label: 'Debt-to-Equity Transaction Experience' },
  { value: 'NGN 500M+', label: 'Debt Recoveries Referenced in Firm Experience' },
  { value: '$2M+', label: 'International client recovery experience' },
];

export const foundationValues = [
  {
    title: 'Our Mission',
    icon: 'target' as const,
    text: 'To help emerging and evolving businesses build, protect and scale through commercially intelligent legal advisory.',
  },
  {
    title: 'Our Vision',
    icon: 'eye' as const,
    text: 'To be the law firm that businesses building toward scale trust for clarity, structure and strategic foresight.',
  },
  {
    title: 'Our Values',
    icon: 'values' as const,
    text: 'Clarity, structure, trust, excellence and strategic foresight guide our work.',
  },
  {
    title: 'Our Approach',
    icon: 'compass' as const,
    text: 'We align legal strategy with commercial realities, operational impact and long-term value.',
  },
];

export const milestones = [
  {
    year: 'Founded',
    title: 'Modern Nigerian Practice',
    text: 'Lummina was created as a modern, commercially minded law firm based in Lagos, Nigeria.',
  },
  {
    year: 'Built',
    title: 'Legal Infrastructure for Growth',
    text: 'The firm developed a practical advisory model around structure, commercial intelligence and trusted relationships.',
  },
  {
    year: 'Growing',
    title: 'Innovation in Practice',
    text: 'Lummina continues to combine legal expertise with modern tools and creative problem-solving.',
  },
  {
    year: 'Today',
    title: 'Counsel for Sustainable Growth',
    text: 'The firm supports founders, businesses, investors and private clients through growth and complexity.',
  },
];

export const offices: Office[] = [
  {
    city: 'Lagos',
    name: 'Lagos Office',
    address: ['Plot 5, Block 94, The Providence Street,', 'Lekki Phase 1, Lagos State.'],
    mapUrl:
      'https://maps.google.com/?q=Plot+5,+Block+94,+The+Providence+Street,+Lekki+Phase+1,+Lagos+State',
    phones: brand.phones,
  },
];

export const globalPresence = [
  'Lagos',
  'Nigeria',
  'West Africa',
  'Corporate Clients',
  'Private Clients',
  'Institutions',
  'Startups',
  'Creative Sector',
];

export const industries = [
  'Financial Services',
  'Technology',
  'Real Estate',
  'Energy',
  'Entertainment and Media',
  'Startups and SMEs',
];

export const resultItems: ResultItem[] = [
  {
    id: 'debt-equity-conversion',
    category: 'Debt Recovery',
    value: '$21M',
    title: 'Debt-to-equity conversion support for a high-value commercial matter',
    description:
      'Experience includes facilitating a major debt-to-equity conversion while balancing business continuity, governance and recovery strategy.',
    industry: 'Commercial',
  },
  {
    id: 'local-debt-recoveries',
    category: 'Recovery Strategy',
    value: 'NGN 500M+',
    title: 'Debt recoveries for local clients across commercial matters',
    description:
      'Representative experience includes structured recovery strategy, negotiation and dispute planning for significant local client debts.',
    industry: 'Financial Services',
  },
  {
    id: 'international-recovery',
    category: 'Cross-Border Recovery',
    value: '$2M+',
    title: 'Recovery support for international client interests',
    description:
      'Experience includes advising on recovery considerations for international clients with Nigerian commercial touchpoints.',
    industry: 'International Business',
  },
  {
    id: 'corporate-governance',
    category: 'Corporate Governance',
    value: 'Board-Level',
    title: 'Governance and compliance support for regulated business environments',
    description:
      'Advised on company restructuring, corporate governance and regulatory compliance for businesses operating in sensitive sectors.',
    industry: 'Telecommunications and Energy',
  },
  {
    id: 'creative-sector-advisory',
    category: 'Media and Creative Sector',
    value: 'Strategic',
    title: 'Creative-sector thought leadership and policy engagement',
    description:
      'Supported initiatives and strategic conversations within the media and creative sector through professional community involvement.',
    industry: 'Entertainment and Media',
  },
  {
    id: 'business-advisory',
    category: 'Business Law',
    value: 'Practical',
    title: 'Tailored legal solutions for business growth and risk management',
    description:
      'Guided clients through contracts, compliance and commercial decisions with practical advice aligned to their goals.',
    industry: 'SMEs and Startups',
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      'Lummina brings thoughtful legal strategy and a practical understanding of the Nigerian business environment.',
    name: 'Business Client',
    title: 'Commercial Advisory Matter',
  },
  {
    quote:
      'The team is responsive, precise and focused on solutions that fit the circumstances of the client.',
    name: 'Private Client',
    title: 'Dispute Resolution Matter',
  },
  {
    quote:
      'Their guidance helped us move with greater confidence on compliance, governance and contract decisions.',
    name: 'Company Director',
    title: 'Corporate Governance Matter',
  },
];

export const insights: Insight[] = [
  {
    id: 'business-law-nigeria',
    category: 'Articles',
    date: 'July 18, 2026',
    title: 'Building Stronger Legal Foundations for Nigerian Businesses',
    summary:
      'A practical guide to contracts, governance and compliance steps that help companies grow with confidence.',
    image: 'conference',
    featured: true,
  },
  {
    id: 'debt-recovery-strategy',
    category: 'Articles',
    date: 'July 9, 2026',
    title: 'Debt Recovery Strategy: What Businesses Should Do Before Litigation',
    summary:
      'How evidence, negotiation posture and debtor analysis can shape better recovery outcomes.',
    image: 'scales',
  },
  {
    id: 'startup-readiness',
    category: 'Publications',
    date: 'June 26, 2026',
    title: 'Startup Legal Readiness Checklist',
    summary:
      'A founder-focused checklist covering incorporation, equity, contracts, IP and investor preparedness.',
    image: 'boardroom',
  },
];

export const footerColumns: FooterColumn[] = [
  {
    title: 'About',
    links: [
      { label: 'Our Firm', to: '/about' },
      { label: 'Our Values', to: '/about#foundation' },
      { label: 'Our Team', to: '/our-team' },
      { label: 'Insights', to: '/insights' },
    ],
  },
  {
    title: 'Practice Areas',
    links: practiceAreaGroups.map((area) => ({
      label: area.title,
      to: `/practice-areas#${area.id}`,
    })),
  },
  {
    title: 'Resources',
    links: [
      { label: 'Insights', to: '/insights' },
      { label: 'Publications', to: '/insights#publications' },
      { label: 'Events', to: '/insights#events' },
      { label: 'Results', to: '/results' },
    ],
  },
];

export const legalLinks: NavigationItem[] = [
  { label: 'Privacy Policy', to: '/consultation#privacy-note' },
  { label: 'Terms of Use', to: '/consultation#privacy-note' },
  { label: 'Attorney Advertising', to: '/results#results-disclaimer' },
];
