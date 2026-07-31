import type {
  Attorney,
  FooterColumn,
  ImageRegistry,
  Insight,
  NavigationItem,
  Office,
  PracticeArea,
  ResultItem,
  SeoEntry,
  Stat,
  TeamMember,
  Testimonial,
} from '../types';

export const brand = {
  name: 'Lummina',
  legalName: 'Lummina Law Firm',
  descriptor: 'Barristers and Solicitors',
  email: 'info@lummina.com',
  alternateEmail: 'lumminalp@gmail.com',
  phone: '0706 046 9068',
  website: 'www.lumminalp.com',
  logoDark: '/assets/lummina-logo-dark-transparent.png',
  logoLight: '/assets/lummina-logo-light-transparent.png',
  loader: '/assets/lummina-loader.gif',
  copyright: '(c) 2026 Lummina Law Firm. All Rights Reserved.',
  statement:
    'Modern, innovative and client-centered legal counsel from Lagos, Nigeria.',
};

export const navigation: NavigationItem[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Practice Areas', to: '/practice-areas' },
  { label: 'Attorneys', to: '/attorneys' },
  { label: 'Our Team', to: '/our-team' },
  { label: 'Results', to: '/results' },
  { label: 'Insights', to: '/insights' },
  { label: 'Contact', to: '/consultation' },
  { label: 'Schedule a Consultation', to: '/consultation', cta: true },
];

export const images: ImageRegistry = {
  columns: {
    src: '/assets/hero-columns.png',
    alt: 'Classical courthouse columns lit warmly against a dark evening sky',
    position: 'center right',
  },
  boardroom: {
    src: '/assets/boardroom.png',
    alt: 'Premium executive boardroom with a polished walnut table and city skyline',
    position: 'center right',
  },
  library: {
    src: '/assets/library-desk.png',
    alt: 'Quiet legal library with an open book, brass lamp and leather-bound volumes',
    position: 'center right',
  },
  conference: {
    src: '/assets/conference-room.png',
    alt: 'Refined law firm conference room with leather chairs and organized folders',
    position: 'center center',
  },
  scales: {
    src: '/assets/scales.png',
    alt: 'Bronze scales of justice on a polished table in a legal library',
    position: 'center right',
  },
  team: {
    src: '/assets/team-group.png',
    alt: 'Diverse law firm leadership group in a premium office lobby',
    position: 'center center',
  },
};

export const seo: Record<string, SeoEntry> = {
  '/': {
    title: 'Lummina | Barristers and Solicitors',
    description:
      'Lummina Law Firm is a modern, innovative and client-centered full-service law firm based in Lagos, Nigeria.',
  },
  '/about': {
    title: 'About Lummina | Barristers and Solicitors',
    description:
      'Learn about Lummina Law Firm, our mission, values and commitment to practical bespoke legal solutions.',
  },
  '/practice-areas': {
    title: 'Practice Areas | Lummina Law Firm',
    description:
      'Explore Lummina legal services across business law, debt recovery, compliance, technology, litigation, ADR, real estate, IP and more.',
  },
  '/attorneys': {
    title: 'Attorneys | Lummina Law Firm',
    description:
      'Meet the Lummina team and search legal professionals by role, name and practice area.',
  },
  '/our-team': {
    title: 'Our Team | Lummina Law Firm',
    description:
      'Meet Lummina Law Firm leadership and the wider client-centered team behind our work.',
  },
  '/results': {
    title: 'Results | Lummina Law Firm',
    description:
      'Representative Lummina outcomes and case highlights. Past results do not guarantee future outcomes.',
  },
  '/insights': {
    title: 'Insights | Lummina Law Firm',
    description:
      'Legal insights, publications and events from Lummina Law Firm in Lagos, Nigeria.',
  },
  '/consultation': {
    title: 'Schedule a Consultation | Lummina Law Firm',
    description:
      'Request a consultation with Lummina Law Firm, Barristers and Solicitors in Lagos, Nigeria.',
  },
};

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

export const homePracticeAreas = practiceAreas.slice(0, 6);

export const homeStats: Stat[] = [
  { value: '14', label: 'Practice Areas' },
  { value: '$21M', label: 'Debt-to-Equity Transaction Experience' },
  { value: 'NGN 500M+', label: 'Debt Recoveries Referenced in Firm Experience' },
  { value: 'Lagos', label: 'Nigeria-Based Counsel' },
];

export const resultStats: Stat[] = [
  { value: '$21M', label: 'Debt-to-equity conversion transaction experience' },
  { value: 'NGN 500M+', label: 'Debt recoveries referenced in managing partner experience' },
  { value: '$2M+', label: 'International client recovery experience' },
  { value: '14', label: 'Practice areas supporting client needs' },
];

export const foundationValues = [
  {
    title: 'Our Mission',
    icon: 'target' as const,
    text: 'To provide innovative, practical and bespoke legal solutions tailored to each client.',
  },
  {
    title: 'Our Vision',
    icon: 'eye' as const,
    text: 'To be the premier legal partner for individuals, businesses and institutions in Nigeria and beyond.',
  },
  {
    title: 'Our Values',
    icon: 'values' as const,
    text: 'Excellence, client-centered service, integrity and innovation guide our work.',
  },
  {
    title: 'Our Approach',
    icon: 'compass' as const,
    text: 'We design tailored solutions, anticipate legal risks and use modern tools effectively.',
  },
];

export const cultureValues = [
  {
    title: 'Excellence',
    icon: 'trophy' as const,
    text: 'We deliver superior results with precision, professionalism and attention to detail.',
  },
  {
    title: 'Client-Centered',
    icon: 'heart' as const,
    text: "Our clients' needs and interests guide every decision we make.",
  },
  {
    title: 'Integrity',
    icon: 'lock' as const,
    text: 'We maintain high ethical standards in all our dealings.',
  },
  {
    title: 'Innovation',
    icon: 'lightbulb' as const,
    text: 'We use modern technologies and creative approaches to solve complex legal challenges.',
  },
];

const portrait = (photoId: string) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=520&h=640&q=85`;

export const attorneys: Attorney[] = [
  {
    id: 'faith-zekeri',
    name: 'Faith Zekeri',
    position: 'Managing Partner',
    practiceArea: 'Litigation',
    location: 'Lagos',
    email: brand.email,
    linkedin: 'https://www.linkedin.com/',
    portrait: '/assets/faith-zekeri.png',
    bio: 'Faith Zekeri is a resourceful lawyer with a proven track record in litigation, alternative dispute resolution and corporate/commercial law. She advises on contracts, corporate governance, regulatory compliance and company secretarial services.',
    education: ['LL.B., Kogi State University', 'B.L., Nigerian Law School, Kano Branch'],
    admissions: ['Nigerian Bar', 'Associate, Institute of Chartered Secretaries and Administrators of Nigeria'],
    practices: ['Litigation', 'Alternative Dispute Resolution (ADR)', 'Business Law', 'Company Secretarial & Compliance'],
  },
  {
    id: 'adaeze-okafor',
    name: 'Adaeze Okafor',
    position: 'Partner',
    practiceArea: 'Business Law',
    location: 'Lagos',
    email: 'adaeze.okafor@lummina.com',
    linkedin: 'https://www.linkedin.com/',
    portrait: portrait('photo-1580489944761-15a19d654956'),
    bio: 'Adaeze advises businesses on commercial agreements, governance and transaction readiness.',
    education: ['LL.B., University of Lagos', 'B.L., Nigerian Law School'],
    admissions: ['Nigerian Bar'],
    practices: ['Business Law', 'Startup Law', 'Company Secretarial & Compliance'],
  },
  {
    id: 'tunde-balogun',
    name: 'Tunde Balogun',
    position: 'Partner',
    practiceArea: 'Banking & Finance',
    location: 'Lagos',
    email: 'tunde.balogun@lummina.com',
    linkedin: 'https://www.linkedin.com/',
    portrait: portrait('photo-1560250097-0b93528c311a'),
    bio: 'Tunde supports finance transactions, debt restructuring and banking-sector advisory.',
    education: ['LL.B., Obafemi Awolowo University', 'B.L., Nigerian Law School'],
    admissions: ['Nigerian Bar'],
    practices: ['Banking & Finance', 'Debt Recovery', 'Business Law'],
  },
  {
    id: 'amina-yusuf',
    name: 'Amina Yusuf',
    position: 'Counsel',
    practiceArea: 'Technology Law',
    location: 'Lagos',
    email: 'amina.yusuf@lummina.com',
    linkedin: 'https://www.linkedin.com/',
    portrait: portrait('photo-1607746882042-944635dfe10e'),
    bio: 'Amina advises technology companies, startups and media clients on digital products and contracts.',
    education: ['LL.B., Ahmadu Bello University', 'B.L., Nigerian Law School'],
    admissions: ['Nigerian Bar'],
    practices: ['Technology Law', 'Startup Law', 'Entertainment & Media Law'],
  },
  {
    id: 'chinedu-nwosu',
    name: 'Chinedu Nwosu',
    position: 'Counsel',
    practiceArea: 'Real Estate & Property Law',
    location: 'Lagos',
    email: 'chinedu.nwosu@lummina.com',
    linkedin: 'https://www.linkedin.com/',
    portrait: portrait('photo-1507003211169-0a1dd7228f2d'),
    bio: 'Chinedu works on property transactions, title review and real estate dispute strategy.',
    education: ['LL.B., University of Nigeria', 'B.L., Nigerian Law School'],
    admissions: ['Nigerian Bar'],
    practices: ['Real Estate & Property Law', 'Litigation'],
  },
  {
    id: 'nkechi-adebayo',
    name: 'Nkechi Adebayo',
    position: 'Associate',
    practiceArea: 'Intellectual Property',
    location: 'Lagos',
    email: 'nkechi.adebayo@lummina.com',
    linkedin: 'https://www.linkedin.com/',
    portrait: portrait('photo-1494790108377-be9c29b29330'),
    bio: 'Nkechi supports brand owners, creators and companies on IP protection and commercial use.',
    education: ['LL.B., Babcock University', 'B.L., Nigerian Law School'],
    admissions: ['Nigerian Bar'],
    practices: ['Intellectual Property', 'Entertainment & Media Law'],
  },
  {
    id: 'david-eko',
    name: 'David Eko',
    position: 'Associate',
    practiceArea: 'Employment & Labour Law',
    location: 'Lagos',
    email: 'david.eko@lummina.com',
    linkedin: 'https://www.linkedin.com/',
    portrait: portrait('photo-1519085360753-af0119f7cbe7'),
    bio: 'David assists employers and executives with workplace documentation and dispute response.',
    education: ['LL.B., University of Benin', 'B.L., Nigerian Law School'],
    admissions: ['Nigerian Bar'],
    practices: ['Employment & Labour Law', 'Business Law'],
  },
  {
    id: 'mariam-lawal',
    name: 'Mariam Lawal',
    position: 'Associate',
    practiceArea: 'Family Law & Private Client Services',
    location: 'Lagos',
    email: 'mariam.lawal@lummina.com',
    linkedin: 'https://www.linkedin.com/',
    portrait: portrait('photo-1534528741775-53994a69daeb'),
    bio: 'Mariam supports private clients and families with discreet, practical legal advice.',
    education: ['LL.B., Lagos State University', 'B.L., Nigerian Law School'],
    admissions: ['Nigerian Bar'],
    practices: ['Family Law & Private Client Services', 'Alternative Dispute Resolution (ADR)'],
  },
  {
    id: 'oluwaseun-ibrahim',
    name: 'Oluwaseun Ibrahim',
    position: 'Associate',
    practiceArea: 'Energy & Natural Resources',
    location: 'Lagos',
    email: 'oluwaseun.ibrahim@lummina.com',
    linkedin: 'https://www.linkedin.com/',
    portrait: portrait('photo-1568602471122-7832951cc4c5'),
    bio: 'Oluwaseun works on energy contracts, compliance review and regulated project support.',
    education: ['LL.B., University of Ibadan', 'B.L., Nigerian Law School'],
    admissions: ['Nigerian Bar'],
    practices: ['Energy & Natural Resources', 'Company Secretarial & Compliance'],
  },
  {
    id: 'ifeoma-eze',
    name: 'Ifeoma Eze',
    position: 'Associate',
    practiceArea: 'Debt Recovery',
    location: 'Lagos',
    email: 'ifeoma.eze@lummina.com',
    linkedin: 'https://www.linkedin.com/',
    portrait: portrait('photo-1573496359142-b8d87734a5a2'),
    bio: 'Ifeoma assists clients with recovery strategy, settlement negotiation and enforcement preparation.',
    education: ['LL.B., University of Abuja', 'B.L., Nigerian Law School'],
    admissions: ['Nigerian Bar'],
    practices: ['Debt Recovery', 'Litigation'],
  },
  {
    id: 'kene-obasi',
    name: 'Kene Obasi',
    position: 'Associate',
    practiceArea: 'Alternative Dispute Resolution (ADR)',
    location: 'Lagos',
    email: 'kene.obasi@lummina.com',
    linkedin: 'https://www.linkedin.com/',
    portrait: portrait('photo-1544723795-3fb6469f5b39'),
    bio: 'Kene supports mediation, arbitration and pre-action dispute strategy.',
    education: ['LL.B., Afe Babalola University', 'B.L., Nigerian Law School'],
    admissions: ['Nigerian Bar'],
    practices: ['Alternative Dispute Resolution (ADR)', 'Litigation'],
  },
  {
    id: 'zainab-musa',
    name: 'Zainab Musa',
    position: 'Associate',
    practiceArea: 'Company Secretarial & Compliance',
    location: 'Lagos',
    email: 'zainab.musa@lummina.com',
    linkedin: 'https://www.linkedin.com/',
    portrait: portrait('photo-1524504388940-b1c1722653e1'),
    bio: 'Zainab supports company records, compliance tracking and regulatory filings.',
    education: ['LL.B., Nile University', 'B.L., Nigerian Law School'],
    admissions: ['Nigerian Bar'],
    practices: ['Company Secretarial & Compliance', 'Business Law'],
  },
];

export const leadership: TeamMember[] = [
  {
    id: 'faith-zekeri',
    name: 'Faith Zekeri',
    role: 'Managing Partner',
    portrait: '/assets/faith-zekeri.png',
    focus: 'Litigation, ADR, corporate/commercial law and company secretarial services.',
  },
  {
    id: 'adaeze-okafor',
    name: 'Adaeze Okafor',
    role: 'Business Law Lead',
    portrait: attorneys[1].portrait,
    focus: 'Commercial agreements, governance and startup advisory.',
  },
  {
    id: 'tunde-balogun',
    name: 'Tunde Balogun',
    role: 'Finance and Recovery Lead',
    portrait: attorneys[2].portrait,
    focus: 'Banking, finance, restructuring and debt recovery strategy.',
  },
  {
    id: 'amina-yusuf',
    name: 'Amina Yusuf',
    role: 'Technology and Media Counsel',
    portrait: attorneys[3].portrait,
    focus: 'Technology, startup, entertainment and media-sector advisory.',
  },
];

export const widerTeam = [
  {
    title: 'Legal Professionals',
    icon: 'briefcase' as const,
    text: 'Experienced lawyers with diverse expertise across Lummina practice areas.',
  },
  {
    title: 'Client Services',
    icon: 'heart' as const,
    text: 'A responsive service culture built around clarity, trust and practical guidance.',
  },
  {
    title: 'Compliance Support',
    icon: 'file' as const,
    text: 'Systems and documentation that help clients meet statutory obligations.',
  },
  {
    title: 'Research',
    icon: 'book' as const,
    text: 'Thoughtful legal research that strengthens strategy and advocacy.',
  },
  {
    title: 'Technology',
    icon: 'network' as const,
    text: 'Modern tools that support efficient, secure and effective legal service.',
  },
  {
    title: 'Community Impact',
    icon: 'users' as const,
    text: 'A commitment to professional development, advocacy and social responsibility.',
  },
];

export const milestones = [
  {
    year: 'Founded',
    title: 'Modern Nigerian Practice',
    text: 'Lummina was created as a client-centered full-service law firm based in Lagos, Nigeria.',
  },
  {
    year: 'Built',
    title: 'Bespoke Legal Service',
    text: 'The firm developed a practical advisory model around tailored solutions and trusted relationships.',
  },
  {
    year: 'Growing',
    title: 'Innovation in Practice',
    text: 'Lummina continues to combine legal expertise with modern tools and creative problem-solving.',
  },
  {
    year: 'Today',
    title: 'Counsel for Sustainable Success',
    text: 'The firm supports individuals, businesses and institutions in Nigeria and beyond.',
  },
];

export const offices: Office[] = [
  {
    city: 'Lagos',
    name: 'Lagos Office',
    address: ['12 Oluseyi Aweda Street', 'Magodo Phase 1, Lagos'],
    phone: brand.phone,
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
  {
    id: 'company-secretarial',
    category: 'Articles',
    date: 'June 14, 2026',
    title: 'Company Secretarial Compliance for Growing Teams',
    summary:
      'Why governance records, filings and board discipline matter before a company faces scrutiny.',
    image: 'library',
  },
  {
    id: 'adr-commercial-disputes',
    category: 'Publications',
    date: 'May 29, 2026',
    title: 'Using ADR to Resolve Commercial Disputes Efficiently',
    summary:
      'When mediation, arbitration and structured negotiation may protect time, cost and commercial relationships.',
    image: 'scales',
  },
  {
    id: 'creative-sector-rights',
    category: 'Events',
    date: 'May 21, 2026',
    title: 'Creative Sector Briefing: Contracts, Rights and Revenue',
    summary:
      'A private session for creators and media founders on licensing, ownership and negotiation basics.',
    image: 'conference',
  },
  {
    id: 'tech-contracting',
    category: 'Articles',
    date: 'April 30, 2026',
    title: 'Technology Contracts and Data Risk for Digital Products',
    summary:
      'Key contract and privacy considerations for companies building or procuring digital tools.',
    image: 'library',
  },
  {
    id: 'real-estate-title',
    category: 'Publications',
    date: 'April 11, 2026',
    title: 'Real Estate Due Diligence Before You Commit',
    summary:
      'A concise overview of title, possession, authority and documentation issues in property transactions.',
    image: 'columns',
  },
  {
    id: 'employment-policies',
    category: 'Events',
    date: 'March 24, 2026',
    title: 'Employment Policy Clinic for SMEs',
    summary:
      'A practical event on employment contracts, workplace policies and managing people-related risk.',
    image: 'boardroom',
  },
];

export const footerColumns: FooterColumn[] = [
  {
    title: 'About',
    links: [
      { label: 'Our Firm', to: '/about' },
      { label: 'Our Values', to: '/about#foundation' },
      { label: 'Leadership', to: '/our-team#leadership' },
      { label: 'Careers', to: '/our-team#careers' },
      { label: 'Insights', to: '/insights' },
    ],
  },
  {
    title: 'Practice Areas',
    links: practiceAreas.slice(0, 8).map((area) => ({
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
