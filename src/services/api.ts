const configuredApiBaseUrl = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, '');
// Keep production sessions first-party. The Vercel rewrite proxies /api to the
// backend, avoiding third-party cookie restrictions in Safari and similar browsers.
const API_BASE_URL = import.meta.env.PROD ? '/api' : configuredApiBaseUrl || 'http://localhost:8000/api';
let csrfToken = '';

export class ApiError extends Error {
  status: number;
  errors?: Record<string, string[]>;

  constructor(message: string, status: number, errors?: Record<string, string[]>) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
  }
}

export async function apiFetch<T>(path: string, options: RequestInit = {}, retryCsrf = true): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set('Accept', 'application/json');
  if (options.body && !(options.body instanceof FormData)) headers.set('Content-Type', 'application/json');
  const method = (options.method ?? 'GET').toUpperCase();
  const csrfRequired = !['GET', 'HEAD', 'OPTIONS'].includes(method)
    && path !== '/auth/login'
    && path !== '/auth/logout'
    && !path.startsWith('/public/');

  if (csrfRequired && !csrfToken) {
    const csrfResponse = await fetch(API_BASE_URL + '/auth/csrf', { credentials: 'include', headers: { Accept: 'application/json' } });
    const csrfPayload = await csrfResponse.json().catch(() => ({}));
    csrfToken = csrfPayload.data?.token ?? '';
  }
  if (csrfToken) headers.set('X-CSRF-TOKEN', csrfToken);

  const response = await fetch(API_BASE_URL + path, { ...options, headers, credentials: 'include' });
  const payload = await response.json().catch(() => ({}));
  if (response.status === 419 && csrfRequired && retryCsrf) {
    csrfToken = '';
    return apiFetch<T>(path, options, false);
  }
  if (!response.ok) throw new ApiError(payload.message || 'The request could not be completed.', response.status, payload.errors);
  return (payload.data ?? payload) as T;
}

export type AdminSessionUser = {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  permissions: string[];
  twoFactorEnabled: boolean;
};

export type DashboardData = {
  period: { from: string; to: string; days: number };
  metrics: {
    websiteVisitors: number;
    pageViews: number;
    consultationRequests: number;
    conversionRate: number;
    averageEngagementSeconds: number;
  };
  traffic: Array<{ date: string; visitors: number; pageViews: number; consultations: number }>;
  mostVisitedPages: Array<{ page: string; views: number; uniqueSessions: number; consultations: number }>;
  visitorInterest: Array<{ practiceAreaId: string; practiceAreaTitle?: string; views: number; engagementSeconds: number; consultations: number }>;
  trafficSources: Array<{ source: string; visitors: number }>;
  devices: Array<{ device: string; visitors: number }>;
  geography: Array<{ country: string; visitors: number }>;
  consent: { total: number; analyticsAccepted: number; essentialOnly: number; acceptanceRate: number };
  search: Array<{ query: string; searches: number; clicks: number; noResults: number; averageResults: number }>;
  opportunities: Array<{ title: string; description: string; evidence: unknown }>;
  recentConsultations: Array<{ reference: string; status: string; submittedAt: string }>;
};

export const api = {
  health: () => apiFetch<{ ok: boolean; runtime: string; build: string }>('/health'),
  auth: {
    login: async (email: string, password: string, remember: boolean) => {
      csrfToken = '';
      const result = await apiFetch<AdminSessionUser>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password, remember }) });
      csrfToken = '';
      return result;
    },
    logout: async () => {
      const result = await apiFetch<{ loggedOut: boolean }>('/auth/logout', { method: 'POST' });
      csrfToken = '';
      return result;
    },
    me: () => apiFetch<AdminSessionUser>('/auth/me'),
  },
  admin: {
    dashboard: (days: number) => apiFetch<DashboardData>('/admin/dashboard?days=' + days),
    content: (resource: string, params = '') => apiFetch<Array<Record<string, unknown>>>('/admin/' + resource + params),
    contentItem: (resource: string, id: string) => apiFetch<Record<string, unknown>>('/admin/' + resource + '/' + id),
    saveContent: (resource: string, data: Record<string, unknown>, id?: string) => apiFetch<Record<string, unknown>>('/admin/' + resource + (id ? '/' + id : ''), { method: id ? 'PATCH' : 'POST', body: JSON.stringify(data) }),
    archiveContent: (resource: string, id: string) => apiFetch<Record<string, unknown>>('/admin/' + resource + '/' + id, { method: 'DELETE' }),
    deleteContent: (resource: string, id: string) => apiFetch<{ deleted: boolean; id: string }>('/admin/' + resource + '/' + id + '/permanent', { method: 'DELETE' }),
    consultations: (params = '') => apiFetch<Array<Record<string, unknown>>>('/admin/consultations' + params),
    consultation: (id: string) => apiFetch<Record<string, unknown>>('/admin/consultations/' + id),
    updateConsultation: (id: string, data: Record<string, unknown>) => apiFetch<Record<string, unknown>>('/admin/consultations/' + id, { method: 'PATCH', body: JSON.stringify(data) }),
    addConsultationNote: (id: string, note: string) => apiFetch<Record<string, unknown>>('/admin/consultations/' + id + '/notes', { method: 'POST', body: JSON.stringify({ note }) }),
    newsletter: () => apiFetch<Array<Record<string, unknown>>>('/admin/newsletter'),
    newsletterTemplate: () => apiFetch<{ subject: string; html: string; updatedAt: string | null }>('/admin/newsletter/template'),
    saveNewsletterTemplate: (data: { subject: string; html: string }) => apiFetch<{ subject: string; html: string; updatedAt: string | null }>('/admin/newsletter/template', { method: 'PUT', body: JSON.stringify(data) }),
    sendNewsletter: () => apiFetch<{ sent: number; recipients: number; batches: number }>('/admin/newsletter/send', { method: 'POST', body: JSON.stringify({}) }),
    settings: (key: string) => apiFetch<Record<string, unknown>>('/admin/settings/' + key),
    saveSettings: (key: string, value: Record<string, unknown>) => apiFetch<Record<string, unknown>>('/admin/settings/' + key, { method: 'PUT', body: JSON.stringify({ value }) }),
    seo: () => apiFetch<Array<Record<string, unknown>>>('/admin/seo'),
    saveSeo: (key: string, data: Record<string, unknown>) => apiFetch<Record<string, unknown>>('/admin/seo/' + key, { method: 'PUT', body: JSON.stringify(data) }),
    activity: () => apiFetch<Array<Record<string, unknown>>>('/admin/activity'),
    users: () => apiFetch<Array<Record<string, unknown>>>('/admin/users'),
    createUser: (data: Record<string, unknown>) => apiFetch<Record<string, unknown>>('/admin/users', { method: 'POST', body: JSON.stringify(data) }),
    updateUser: (id: string, data: Record<string, unknown>) => apiFetch<Record<string, unknown>>('/admin/users/' + id, { method: 'PATCH', body: JSON.stringify(data) }),
    upload: (body: FormData) => apiFetch<Record<string, unknown>>('/admin/media', { method: 'POST', body }),
    deleteMedia: (id: string) => apiFetch<{ deleted: boolean }>('/admin/media/' + id, { method: 'DELETE' }),
  },
  public: {
    collection: (resource: string) => apiFetch<Array<Record<string, unknown>>>('/public/' + resource),
    item: (resource: string, slug: string) => apiFetch<Record<string, unknown>>('/public/' + resource + '/' + slug),
    consultation: (data: Record<string, unknown>) => apiFetch<{ reference: string; message: string }>('/public/consultations', { method: 'POST', body: JSON.stringify(data) }),
    newsletter: (email: string, source: string) => apiFetch<{ subscribed: boolean; message: string }>('/public/newsletter', { method: 'POST', body: JSON.stringify({ email, source, consent: true }) }),
    event: (data: Record<string, unknown>) => apiFetch<{ recorded: boolean }>('/public/analytics/events', { method: 'POST', body: JSON.stringify(data) }),
    consent: (data: Record<string, unknown>) => apiFetch<{ saved: boolean }>('/public/consent', { method: 'POST', body: JSON.stringify(data) }),
    settings: () => apiFetch<Record<string, Record<string, unknown>>>('/public/site-settings'),
    seo: (pageKey: string) => apiFetch<Record<string, unknown>>('/public/seo/' + (pageKey === '/' ? 'home' : pageKey.replace(/^\//, ''))),
  },
};

export { API_BASE_URL };
