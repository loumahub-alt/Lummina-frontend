export type AdminRange = '7d' | '30d' | '90d' | 'year' | 'custom';

export type AdminUser = {
  name: string;
  email: string;
  role: 'Super Admin' | 'Content Editor' | 'Consultation Manager';
};

export type Metric = {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  description: string;
};

export type AdminActivity = {
  id: string;
  action: string;
  resource: string;
  actor: string;
  time: string;
  tone: 'gold' | 'cream' | 'muted';
};

export type AdminContentRow = {
  id: string;
  title: string;
  type: string;
  status: 'Published' | 'Draft' | 'Review';
  views: string;
  updated: string;
  editor: string;
};

export type TrafficPoint = {
  label: string;
  visitors: number;
  pageViews: number;
  consultations: number;
};

export const defaultAdminUser: AdminUser = {
  name: 'Faith Zekeri',
  email: 'admin@lummina.local',
  role: 'Super Admin',
};
