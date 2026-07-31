import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { seo } from '../data/site';
import { applySeo } from '../utils/seo';

export const usePageSeo = () => {
  const location = useLocation();

  useEffect(() => {
    const entry = seo[location.pathname] ?? seo['/'];
    applySeo(entry, `${location.pathname}${location.hash}`);
  }, [location.hash, location.pathname]);
};
