import { Linkedin, Mail } from 'lucide-react';
import type { Attorney } from '../../types';
import { images } from '../../data/site';

type AttorneyCardProps = {
  attorney: Attorney;
  onViewProfile: (attorney: Attorney) => void;
};

export const AttorneyCard = ({ attorney, onViewProfile }: AttorneyCardProps) => (
  <article className="luxury-card group grid grid-cols-[6.75rem_1fr] overflow-hidden">
    <img
      src={attorney.portrait}
      alt={`${attorney.name}, ${attorney.position}`}
      width={520}
      height={640}
      loading="lazy"
      onError={(event) => {
        event.currentTarget.src = images.team.src;
      }}
      className="h-full min-h-36 w-full object-cover grayscale-[15%] transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
    />
    <div className="min-w-0 p-5">
      <h3 className="font-serif text-2xl font-medium leading-tight text-ink">{attorney.name}</h3>
      <p className="mt-1 text-sm font-semibold text-ink/72">{attorney.position}</p>
      <p className="mt-3 text-sm leading-6 text-ink/68">
        {attorney.practiceArea}
        <span aria-hidden="true"> | </span>
        {attorney.location}
      </p>
      <div className="mt-4 flex items-center gap-3">
        <a
          href={`mailto:${attorney.email}`}
          aria-label={`Email ${attorney.name}`}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-light-line bg-white/70 text-ink/70 transition hover:border-gold-dark hover:text-gold-dark"
        >
          <Mail aria-hidden="true" className="h-4 w-4" />
        </a>
        <a
          href={attorney.linkedin}
          aria-label={`${attorney.name} on LinkedIn`}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-light-line bg-white/70 text-ink/70 transition hover:border-gold-dark hover:text-gold-dark"
        >
          <Linkedin aria-hidden="true" className="h-4 w-4" />
        </a>
        <button
          type="button"
          onClick={() => onViewProfile(attorney)}
          className="ml-auto rounded-[2px] border border-gold-dark/35 px-3 py-2 text-[0.66rem] font-extrabold uppercase tracking-[0.1em] text-gold-dark transition hover:border-gold-dark/60 hover:text-ink"
        >
          View Profile
        </button>
      </div>
    </div>
  </article>
);
