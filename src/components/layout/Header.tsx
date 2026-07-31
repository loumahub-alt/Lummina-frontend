import { DesktopNavigation } from '../navigation/DesktopNavigation';
import { MobileNavigation } from '../navigation/MobileNavigation';
import { Logo } from '../common/Logo';

export const Header = () => (
  <header className="sticky top-0 z-40 border-b border-champagne/10 bg-navy/95 shadow-[0_18px_60px_rgba(0,0,0,0.24)] backdrop-blur-xl">
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-gold focus:px-4 focus:py-3 focus:text-sm focus:font-bold focus:text-navy"
    >
      Skip to content
    </a>
    <div className="container-shell flex min-h-[82px] items-center justify-between gap-5">
      <Logo compact />
      <DesktopNavigation />
      <MobileNavigation />
    </div>
  </header>
);
