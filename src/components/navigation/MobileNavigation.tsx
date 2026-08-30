import { useEffect, useRef, useState } from 'react';
import { Menu, Search as SearchIcon, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import { navigation } from '../../data/site';
import { Logo } from '../common/Logo';
import { TransitionLink } from '../transitions';

export const MobileNavigation = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => {
    setOpen(false);
    menuButtonRef.current?.focus();
  };

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.classList.remove('menu-open');
      window.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    closeButtonRef.current?.focus();

    const handleTab = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const focusable = Array.from(
        menuRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [location.hash, location.pathname, location.search]);

  return (
    <div className="xl:hidden">
      <button
      type="button"
        ref={menuButtonRef}
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
          onClick={closeMenu}
        >
          <div
            id="mobile-menu"
            ref={menuRef}
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
                ref={closeButtonRef}
                onClick={closeMenu}
                className="inline-flex h-11 w-11 items-center justify-center rounded-[2px] border border-champagne/20 bg-champagne/5 text-champagne transition hover:border-gold hover:text-gold-bright"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
            <nav aria-label="Mobile navigation" className="mt-8 flex flex-col gap-3">
              <TransitionLink
                to="/search"
                onClick={closeMenu}
                className="flex min-h-12 items-center justify-between rounded-[2px] border border-champagne/15 bg-black/10 px-5 py-3 text-sm font-extrabold uppercase tracking-[0.1em] text-champagne/80 hover:border-gold/55 hover:bg-champagne/10 hover:text-gold-bright"
              >
                <span>Search</span>
                <SearchIcon aria-hidden="true" className="h-4 w-4" />
              </TransitionLink>
              {navigation.map((item) => (
                item.external && item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                    className="mt-4 flex min-h-12 items-center justify-between rounded-[2px] border border-orange/80 bg-[linear-gradient(135deg,#FFBD3D,#FFA500)] px-5 py-3 text-sm font-extrabold uppercase tracking-[0.1em] text-bordeaux transition hover:border-champagne/80"
                  >
                    {item.label}
                  </a>
                ) : (
                  <TransitionLink
                    key={item.label}
                    to={item.to}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `flex min-h-12 items-center justify-between rounded-[2px] border px-5 py-3 text-sm font-extrabold uppercase tracking-[0.1em] transition ${
                        item.cta
                          ? 'mt-4 border-orange/80 bg-[linear-gradient(135deg,#FFBD3D,#FFA500)] text-bordeaux hover:border-champagne/80'
                          : isActive
                            ? 'border-gold/55 bg-champagne/10 text-gold-bright'
                            : 'border-champagne/15 bg-black/10 text-champagne/80 hover:border-gold/55 hover:bg-champagne/10 hover:text-gold-bright'
                      }`
                    }
                  >
                    {item.label}
                  </TransitionLink>
                )
              ))}
            </nav>
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
};
