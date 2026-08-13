import type { Stat } from '../../types';

type StatCardProps = {
  stat: Stat;
  dark?: boolean;
};

export const StatCard = ({ stat, dark = true }: StatCardProps) => (
  <div
    className={`min-w-0 px-8 py-6 text-center lg:border-l lg:first:border-l-0 ${
      dark ? 'border-dark-line text-white' : 'border-light-line text-ink'
    }`}
  >
    <p className="font-serif text-4xl font-medium text-gold-bright md:text-5xl">{stat.value}</p>
    <p className={`mt-3 text-sm font-medium ${dark ? 'text-white/85' : 'text-ink/70'}`}>
      {stat.label}
    </p>
    {stat.description && (
      <p className={`mt-3 text-sm leading-6 ${dark ? 'text-muted' : 'text-ink/62'}`}>
        {stat.description}
      </p>
    )}
  </div>
);
