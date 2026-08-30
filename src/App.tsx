import { Route, Routes, useLocation } from 'react-router-dom';

import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { PageTransition } from './components/layout/PageTransition';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { TransitionProvider } from './components/transitions';

import { usePageSeo } from './hooks/usePageSeo';

import { AboutPage } from './pages/AboutPage';
import { AttorneysPage } from './pages/AttorneysPage';
import { ConsultationPage } from './pages/ConsultationPage';
import { ExternalCounselPage } from './pages/ExternalCounselPage';
import { HomePage } from './pages/HomePage';
import { HowWeWorkPage } from './pages/HowWeWorkPage';
import { InsightsPage } from './pages/InsightsPage';
import { InsightDetailPage } from './pages/InsightDetailPage';
import { PracticeAreasPage } from './pages/PracticeAreasPage';
import { ResultsPage } from './pages/ResultsPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { SearchPage } from './pages/SearchPage';
import { ServicePage } from './pages/ServicePage';
import { PrivacyPolicyPage, ProfessionalNoticePage, TermsOfUsePage } from './pages/LegalPages';
import { servicePages } from './data/site';
import { CookieConsentBanner } from './components/common/CookieConsentBanner';
import { AdminApp } from './admin/AdminApp';

export const App = () => {
  usePageSeo();
  const location = useLocation();

  if (location.pathname.startsWith('/admin')) {
    return <AdminApp />;
  }

  return (
    <TransitionProvider fixedChildren={<Header />}>
      <div className="min-h-screen overflow-x-hidden bg-navy">
        <ScrollToTop />

        <PageTransition>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/practice-areas" element={<PracticeAreasPage />} />
            <Route path="/our-team" element={<AttorneysPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/insights/:slug" element={<InsightDetailPage />} />
            <Route path="/consultation" element={<ConsultationPage />} />
            <Route path="/how-we-work" element={<HowWeWorkPage />} />
            <Route path="/external-counsel" element={<ExternalCounselPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-use" element={<TermsOfUsePage />} />
            <Route path="/professional-notice" element={<ProfessionalNoticePage />} />
            <Route path="/search" element={<SearchPage />} />
            {servicePages.map((page) => (
              <Route
                key={page.slug}
                path={`/services/${page.slug}`}
                element={<ServicePage page={page} />}
              />
            ))}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </PageTransition>

        <Footer />
        <CookieConsentBanner />
      </div>
    </TransitionProvider>
  );
};
