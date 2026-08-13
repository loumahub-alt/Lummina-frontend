import { navigation } from '../../data/site';
import { TransitionLink } from '../transitions';
import { Search } from 'lucide-react';

export const DesktopNavigation = () => {
  const links = navigation.filter((item) => !item.cta);
  const cta = navigation.find((item) => item.cta);

  return (
    <nav aria-label="Primary navigation" className="hidden items-center gap-6 xl:flex">
      <div className="flex items-center gap-6">
        {links.map((item) => (
          <TransitionLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              `relative whitespace-nowrap py-8 text-[0.66rem] font-extrabold uppercase tracking-[0.1em] transition after:absolute after:left-0 after:bottom-6 after:h-px after:bg-gold-bright after:transition-all ${
                isActive
                  ? 'text-gold-bright after:w-full'
                  : 'text-champagne/82 after:w-0 hover:text-gold-bright hover:after:w-full'
              }`
            }
          >
            {item.label}
          </TransitionLink>
        ))}
      </div>
      <TransitionLink
        to="/search"
        aria-label="Search the website"
        className="inline-flex h-10 w-10 items-center justify-center rounded-[2px] border border-champagne/20 text-champagne/82 transition hover:border-gold hover:text-gold-bright"
      >
        <Search aria-hidden="true" className="h-4 w-4" />
      </TransitionLink>
      {cta && (
        <TransitionLink
          to={cta.to}
          className="whitespace-nowrap border border-orange/80 bg-[linear-gradient(135deg,#FFBD3D,#FFA500)] px-5 py-3.5 text-[0.66rem] font-extrabold uppercase tracking-[0.1em] text-bordeaux transition duration-300 hover:-translate-y-0.5 hover:border-champagne/70"
        >
          {cta.label}
        </TransitionLink>
      )}
    </nav>
  );
};
