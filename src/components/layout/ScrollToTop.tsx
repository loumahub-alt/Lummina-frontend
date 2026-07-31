import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      window.setTimeout(() => {
        const target = document.getElementById(hash.replace('#', ''));
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [hash, pathname]);

  return null;
};
