import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import { navigation } from '../../data/site';
import { Logo } from '../common/Logo';
import { TransitionLink } from '../transitions';

export const MobileNavigation = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.classList.remove('menu-open');
      window.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [location.hash, location.pathname, location.search]);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-12 w-12 items-center justify-center rounded-[2px] border border-champagne/20 bg-champagne/5 text-champagne transition hover:border-gold hover:text-gold-bright"
      >
        {open ? <X aria-hidden="true" className="h-6 w-6" /> : <Menu aria-hidden="true" className="h-6 w-6" />}
      </button>

      {open && createPortal(
        <div
          className="fixed inset-0 z-50 overflow-hidden bg-wine/95 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            onClick={(event) => event.stopPropagation()}
            className="mobile-menu-surface ml-auto flex min-h-[100dvh] w-full max-w-md animate-menu-enter flex-col overflow-y-auto border-l border-champagne/15 px-6 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-[calc(1.25rem+env(safe-area-inset-top))] shadow-[0_28px_90px_rgba(0,0,0,0.38)] overscroll-contain"
          >
            <div className="flex items-center justify-between gap-4 border-b border-champagne/15 pb-5">
              <Logo compact />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-[2px] border border-champagne/20 bg-champagne/5 text-champagne transition hover:border-gold hover:text-gold-bright"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
            <nav aria-label="Mobile navigation" className="mt-8 flex flex-col gap-3">
              {navigation.map((item) => (
                <TransitionLink
                  key={item.label}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex min-h-12 items-center justify-between rounded-[2px] border px-5 py-3 text-sm font-extrabold uppercase tracking-[0.1em] transition ${
                      item.cta
                        ? 'mt-4 border-orange/80 bg-[linear-gradient(135deg,#FFBD3D,#FFA500)] text-bordeaux shadow-gold hover:border-champagne/80'
                        : isActive
                          ? 'border-gold/55 bg-champagne/10 text-gold-bright'
                          : 'border-champagne/15 bg-black/10 text-champagne/80 hover:border-gold/55 hover:bg-champagne/10 hover:text-gold-bright'
                    }`
                  }
                >
                  {item.label}
                </TransitionLink>
              ))}
            </nav>
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
};
