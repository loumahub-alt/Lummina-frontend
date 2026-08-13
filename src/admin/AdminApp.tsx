import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AdminLayout } from './components/AdminLayout';
import {
  AdminLogin,
} from './AdminPages';
import { TeamContentPage } from './TeamContentPage';
import { PracticeAreasContentPage } from './PracticeAreasContentPage';
import { ResultsContentPage } from './ResultsContentPage';
import { InsightsContentPage } from './InsightsContentPage';
import { TestimonialsContentPage } from './TestimonialsContentPage';
import { StatisticsContentPage } from './StatisticsContentPage';
import { LiveDashboard as Dashboard } from './LiveDashboard';
import { api } from '../services/api';
import {
  LiveActivityPage,
  LiveAdminUsers,
  LiveAnalyticsPage,
  LiveConsultations,
  LiveNewsletterPage,
  LiveSettingsPage,
} from './LiveAdminPages';
import { adminStore } from './services/adminStore';

export const AdminApp = () => {
  const location = useLocation();
  const [status, setStatus] = useState<'checking' | 'authenticated' | 'guest' | 'backend-error'>('checking');
  const [backendError, setBackendError] = useState('');

  useEffect(() => {
    let active = true;
    const checkRuntime = async () => {
      try {
        const health = await api.health();
        if (health.runtime !== 'node-express' || health.build !== 'node-express-cms-v2') {
          throw new Error('The API at ' + (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api') + ' is not the current Node.js/Express CMS build.');
        }
        const user = await adminStore.check();
        if (active) setStatus(user ? 'authenticated' : 'guest');
      } catch (reason) {
        if (!active) return;
        setBackendError(reason instanceof Error ? reason.message : 'The Node.js/Express API could not be verified.');
        setStatus('backend-error');
      }
    };
    void checkRuntime();
    return () => {
      active = false;
    };
  }, []);

  if (status === 'backend-error') {
    return <div className="grid min-h-screen place-items-center bg-[#3A0013] px-6 text-champagne"><div className="max-w-xl rounded-[3px] border border-champagne/15 bg-champagne/5 p-8"><p className="text-xs font-extrabold uppercase tracking-[0.15em] text-gold-bright">Admin API unavailable</p><h1 className="mt-3 font-serif text-4xl text-white">The current CMS backend is not connected.</h1><p className="mt-4 leading-7 text-champagne/75">{backendError}</p></div></div>;
  }

  if (status === 'checking') {
    return <div className="grid min-h-screen place-items-center bg-[#3A0013] text-sm text-champagne">Checking administrative access…</div>;
  }

  if (status === 'guest') {
    return location.pathname === '/admin' || location.pathname === '/admin/login'
      ? <AdminLogin onAuthenticated={() => setStatus('authenticated')} />
      : <Navigate to="/admin/login" replace />;
  }

  return (
    <Routes>
      <Route path="/admin/login" element={<Navigate to="/admin" replace />} />
      <Route path="/admin" element={<AdminLayout onLogout={() => setStatus('guest')} />}>
        <Route index element={<Dashboard />} />
        <Route path="analytics" element={<LiveAnalyticsPage />} />
        <Route path="analytics/pages" element={<LiveAnalyticsPage section="pages" />} />
        <Route path="analytics/interest" element={<LiveAnalyticsPage section="interest" />} />
        <Route path="analytics/sources" element={<LiveAnalyticsPage section="sources" />} />
        <Route path="analytics/search" element={<LiveAnalyticsPage section="search" />} />
        <Route path="analytics/consent" element={<LiveAnalyticsPage section="consent" />} />
        <Route path="content/practice-areas" element={<PracticeAreasContentPage />} />
        <Route path="content/team" element={<TeamContentPage />} />
        <Route path="content/results" element={<ResultsContentPage />} />
        <Route path="content/insights" element={<InsightsContentPage />} />
        <Route path="content/testimonials" element={<TestimonialsContentPage />} />
        <Route path="content/statistics" element={<StatisticsContentPage />} />
        <Route path="consultations" element={<LiveConsultations />} />
        <Route path="newsletter" element={<LiveNewsletterPage />} />
        <Route path="settings/seo" element={<LiveSettingsPage type="seo" />} />
        <Route path="settings/contact" element={<LiveSettingsPage type="contact" />} />
        <Route path="settings/general" element={<LiveSettingsPage type="general" />} />
        <Route path="users" element={<LiveAdminUsers />} />
        <Route path="activity" element={<LiveActivityPage />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  );
};
