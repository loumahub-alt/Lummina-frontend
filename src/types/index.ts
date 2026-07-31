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
};

export type SeoEntry = {
  title: string;
  description: string;
};

export type ImageAsset = {
  src: string;
  alt: string;
  position?: string;
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

export type ImageRegistry = {
  columns: ImageAsset;
  boardroom: ImageAsset;
  library: ImageAsset;
  conference: ImageAsset;
  scales: ImageAsset;
  team: ImageAsset;
};

export type AttorneyLevel = 'Partner' | 'Counsel' | 'Associate';

export type Attorney = {
  id: string;
  name: string;
  position: AttorneyLevel | 'Managing Partner' | 'Executive Partner';
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

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  portrait: string;
  focus: string;
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
};

export type InsightCategory = 'Articles' | 'Publications' | 'Events';

export type Insight = {
  id: string;
  category: InsightCategory;
  date: string;
  title: string;
  summary: string;
  image: keyof ImageRegistry;
  featured?: boolean;
};

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
};

export type Office = {
  city: string;
  name: string;
  address: string[];
  phone: string;
};

export type FooterColumn = {
  title: string;
  links: NavigationItem[];
};
