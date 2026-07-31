import { images } from '../../data/site';
import type { Insight } from '../../types';
import { SecondaryButton } from '../common/SecondaryButton';

type InsightCardProps = {
  insight: Insight;
  featured?: boolean;
};

export const InsightCard = ({ insight, featured = false }: InsightCardProps) => {
  const image = images[insight.image];

  return (
    <article
      id={insight.id}
      className={`luxury-card group overflow-hidden ${
        featured ? 'grid md:grid-cols-[1.05fr_0.95fr]' : ''
      }`}
    >
      <div className={featured ? 'min-h-72 overflow-hidden' : 'aspect-[16/7] overflow-hidden'}>
        <img
          src={image.src}
          alt={image.alt}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          style={{ objectPosition: image.position }}
        />
      </div>
      <div className={featured ? 'p-8 md:p-10' : 'p-6'}>
        <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-gold">
          {insight.category} <span aria-hidden="true">|</span> {insight.date}
        </p>
        <h3
          className={`mt-4 font-serif font-medium leading-tight text-ink ${
            featured ? 'text-4xl md:text-5xl' : 'text-2xl'
          }`}
        >
          {insight.title}
        </h3>
        <p className="mt-4 leading-7 text-ink/70">{insight.summary}</p>
        <SecondaryButton to={`/insights#${insight.id}`} dark className="mt-6">
          Read Article
        </SecondaryButton>
      </div>
    </article>
  );
};
