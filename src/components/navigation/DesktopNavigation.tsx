import { navigation } from '../../data/site';
import { TransitionLink } from '../transitions';

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
      {cta && (
        <TransitionLink
          to={cta.to}
          className="whitespace-nowrap border border-orange/80 bg-[linear-gradient(135deg,#FFBD3D,#FFA500)] px-5 py-3.5 text-[0.66rem] font-extrabold uppercase tracking-[0.1em] text-bordeaux shadow-gold transition duration-300 hover:-translate-y-0.5 hover:border-champagne/70 hover:shadow-[0_22px_46px_rgba(255,165,0,0.28)]"
        >
          {cta.label}
        </TransitionLink>
      )}
    </nav>
  );
};
