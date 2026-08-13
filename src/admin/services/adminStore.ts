import { brand, seo } from '../../data/site';
import { api, type AdminSessionUser } from '../../services/api';
import type { AdminActivity, AdminUser, Metric, TrafficPoint } from '../types';
import { defaultAdminUser } from '../types';

let sessionUser: AdminSessionUser | null = null;

export const adminStore = {
  check: async () => {
    try {
      sessionUser = await api.auth.me();
      return sessionUser;
    } catch {
      sessionUser = null;
      return null;
    }
  },
  login: async (email: string, password: string, remember = false) => {
    sessionUser = await api.auth.login(email, password, remember);
    return sessionUser;
  },
  logout: async () => {
    try {
      await api.auth.logout();
    } finally {
      sessionUser = null;
    }
  },
  currentUser: (): AdminUser => sessionUser ? { name: sessionUser.name, email: sessionUser.email, role: sessionUser.role === 'super_admin' ? 'Super Admin' : sessionUser.role === 'consultation_manager' ? 'Consultation Manager' : 'Content Editor' } : defaultAdminUser,
};

export const adminMetrics: Metric[] = [
  { label: 'Website visitors', value: '12,485', change: '+18.4%', trend: 'up', description: 'vs previous period' },
  { label: 'Page views', value: '18,922', change: '+12.7%', trend: 'up', description: 'vs previous period' },
  { label: 'Consultation requests', value: '184', change: '+21.2%', trend: 'up', description: 'vs previous period' },
  { label: 'Conversion rate', value: '3.8%', change: '+4.1%', trend: 'up', description: 'request / visitor' },
  { label: 'Avg. engagement time', value: '3m 42s', change: '+9.6%', trend: 'up', description: 'vs previous period' },
];

export const trafficPoints: TrafficPoint[] = [
  { label: '01', visitors: 820, pageViews: 1280, consultations: 12 },
  { label: '05', visitors: 1140, pageViews: 1680, consultations: 18 },
  { label: '10', visitors: 980, pageViews: 1510, consultations: 14 },
  { label: '15', visitors: 1480, pageViews: 2290, consultations: 22 },
  { label: '20', visitors: 1310, pageViews: 1980, consultations: 19 },
  { label: '25', visitors: 1760, pageViews: 2650, consultations: 31 },
  { label: '30', visitors: 2140, pageViews: 3210, consultations: 38 },
];

export const pageTraffic = [
  { page: 'Practice Areas', views: '5,376', share: 28.4, trend: '+14.8%' },
  { page: 'Home', views: '4,390', share: 23.2, trend: '+9.3%' },
  { page: 'Insights', views: '3,463', share: 18.3, trend: '+22.1%' },
  { page: 'Our Team', views: '2,327', share: 12.3, trend: '+6.4%' },
  { page: 'Results', views: '1,930', share: 10.2, trend: '+3.8%' },
  { page: 'About', views: '1,436', share: 7.6, trend: '+1.9%' },
];

export const serviceInterest = [
  { label: 'Business Law', value: 31.8, color: 'bg-gold' },
  { label: 'Real Estate & Property', value: 21.4, color: 'bg-gold-dark' },
  { label: 'Transactions & Capital', value: 16.2, color: 'bg-bordeaux' },
  { label: 'Intellectual Property', value: 12.6, color: 'bg-[#B98027]' },
  { label: 'Cross-Border Transactions', value: 9.9, color: 'bg-[#6B1731]' },
  { label: 'Private Client Services', value: 8.1, color: 'bg-[#A95F31]' },
];

export const activities: AdminActivity[] = [
  { id: '1', action: 'Published', resource: 'Startup Legal Readiness Checklist', actor: 'Faith Zekeri', time: '18 minutes ago', tone: 'gold' },
  { id: '2', action: 'Updated', resource: 'Contact information', actor: 'Faith Zekeri', time: '2 hours ago', tone: 'cream' },
  { id: '3', action: 'Added', resource: 'Oluwatoyin Kowe · Our Team', actor: 'Faith Zekeri', time: 'Yesterday', tone: 'muted' },
  { id: '4', action: 'Reviewed', resource: 'Practice Areas service copy', actor: 'Faith Zekeri', time: 'Yesterday', tone: 'cream' },
];

export const contactPreview = {
  phones: brand.phones,
  email: brand.email,
  address: 'Plot 5, Block 94, The Providence Street, Lekki Phase 1, Lagos State.',
  whatsapp: brand.whatsapp,
};

export const seoRows = Object.entries(seo).map(([path, entry]) => ({
  path,
  title: entry.title,
  health: path === '/practice-areas' ? 92 : path === '/our-team' ? 88 : 96,
}));
