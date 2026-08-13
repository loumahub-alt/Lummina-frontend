import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { seo } from '../data/site';
import { trackEvent } from '../utils/analytics';
import { applySeo } from '../utils/seo';

export const usePageSeo = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/admin')) {
      document.title = 'Lummina Administrative Portal';
      return;
    }

    const entry = seo[location.pathname]
      ?? (location.pathname.startsWith('/insights/') ? seo['/insights'] : seo['/404']);
    applySeo(entry, `${location.pathname}${location.hash}`);
    trackEvent('page_view', { page_title: entry.title });
  }, [location.hash, location.pathname]);
};
