import { iconMap } from '../../utils/icons';
import type { PracticeArea } from '../../types';
import { SecondaryButton } from '../common/SecondaryButton';

type PracticeAreaCardProps = {
  area: PracticeArea;
  detailed?: boolean;
};

export const PracticeAreaCard = ({ area, detailed = false }: PracticeAreaCardProps) => {
  const Icon = iconMap[area.icon];

  return (
    <article
      id={detailed ? area.id : undefined}
      className={`luxury-card group h-full p-8 ${
        detailed ? '' : 'text-center'
      }`}
    >
      <div
        className={
          detailed
            ? 'flex flex-col gap-5 md:flex-row md:items-start'
            : 'flex h-full flex-col items-center'
        }
      >
        <Icon
          aria-hidden="true"
          className={`h-11 w-11 shrink-0 text-gold-dark stroke-[1.35] transition duration-300 group-hover:text-gold-dark ${
            detailed ? '' : 'mx-auto'
          }`}
        />
        <div>
          <h3
            className={`font-serif text-3xl font-medium leading-tight text-ink ${
              detailed ? 'mt-5 md:mt-0' : 'mt-5'
            }`}
          >
            {area.title}
          </h3>
          <p className="mt-4 leading-7 text-ink/72">
            {detailed ? area.summary : area.shortDescription}
          </p>
          {detailed && (
            <ul className="mt-6 space-y-2 text-sm leading-6 text-ink/72">
              {area.services.map((service) => (
                <li key={service} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-gold" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          )}
          <SecondaryButton to={`/practice-areas#${area.id}`} dark className="mt-7">
            Learn More
          </SecondaryButton>
        </div>
      </div>
    </article>
  );
};
