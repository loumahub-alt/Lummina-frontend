export type IconKey =
  | 'landmark'
  | 'handshake'
  | 'scale'
  | 'shield'
  | 'globe'
  | 'file'
  | 'target'
  | 'eye'
  | 'values'
  | 'compass'
  | 'users'
  | 'trophy'
  | 'lock'
  | 'badge'
  | 'briefcase'
  | 'building'
  | 'calendar'
  | 'book'
  | 'chart'
  | 'network'
  | 'heart'
  | 'check'
  | 'lightbulb'
  | 'mail'
  | 'phone'
  | 'map'
  | 'clock';

export type NavigationItem = {
  label: string;
  to: string;
  cta?: boolean;
  href?: string;
  external?: boolean;
};

export type SeoEntry = {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
};

export type ImageAsset = {
  src: string;
  alt: string;
  position?: string;
  width?: number;
  height?: number;
};

export type PracticeArea = {
  id: string;
  title: string;
  icon: IconKey;
  shortDescription: string;
  summary: string;
  services: string[];
  detail: string;
  image: keyof ImageRegistry;
};

export type ServicePage = {
  slug: string;
  title: string;
  eyebrow: string;
  primaryKeyword: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  practiceAreaIds: string[];
  highlights: string[];
  insightIds?: string[];
};

export type ImageRegistry = {
  columns: ImageAsset;
  boardroom: ImageAsset;
  library: ImageAsset;
  conference: ImageAsset;
  scales: ImageAsset;
  team: ImageAsset;
};

export type AttorneyLevel = 'Partner' | 'Counsel' | 'Associate' | 'Junior Associate';

export type Attorney = {
  id: string;
  name: string;
  position: AttorneyLevel | 'Managing Partner' | 'Executive Partner';
  shortBio: string;
  practiceArea: string;
  location: string;
  email: string;
  linkedin: string;
  portrait: string;
  bio: string;
  education: string[];
  admissions: string[];
  practices: string[];
};

export type Stat = {
  value: string;
  label: string;
  description?: string;
};

export type ResultItem = {
  id: string;
  category: string;
  value: string;
  title: string;
  description: string;
  industry: string;
  matterDescription?: string;
};

export type InsightCategory = 'Insights' | 'Articles' | 'Newsletters' | 'Events' | 'Resources';

export type Insight = {
  id: string;
  category: InsightCategory;
  date: string;
  title: string;
  summary: string;
  image: keyof ImageRegistry;
  imageUrl?: string;
  thumbnailUrl?: string;
  imageAlt?: string;
  thumbnailAlt?: string;
  featured?: boolean;
};

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  company?: string;
  isFeatured?: boolean;
};

export type Office = {
  city: string;
  name: string;
  address: string[];
  mapUrl: string;
  phones: string[];
};

export type FooterColumn = {
  title: string;
  links: NavigationItem[];
};
