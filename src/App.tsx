import { Route, Routes } from 'react-router-dom';

import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { PageTransition } from './components/layout/PageTransition';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { TransitionProvider } from './components/transitions';

import { usePageSeo } from './hooks/usePageSeo';

import { AboutPage } from './pages/AboutPage';
import { AttorneysPage } from './pages/AttorneysPage';
import { ConsultationPage } from './pages/ConsultationPage';
import { HomePage } from './pages/HomePage';
import { InsightsPage } from './pages/InsightsPage';
import { OurTeamPage } from './pages/OurTeamPage';
import { PracticeAreasPage } from './pages/PracticeAreasPage';
import { ResultsPage } from './pages/ResultsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ServicePage } from './pages/ServicePage';
import { servicePages } from './data/site';
import { CookieConsentBanner } from './components/common/CookieConsentBanner';

export const App = () => {
  usePageSeo();

  return (
    <TransitionProvider>
      <div className="min-h-screen overflow-x-hidden bg-navy">
        <ScrollToTop />

        <Header />

        <PageTransition>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/practice-areas" element={<PracticeAreasPage />} />
            <Route path="/attorneys" element={<AttorneysPage />} />
            <Route path="/our-team" element={<OurTeamPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/consultation" element={<ConsultationPage />} />
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
