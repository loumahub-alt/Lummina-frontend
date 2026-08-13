import { SecondaryButton } from '../common/SecondaryButton';
import type { ResultItem } from '../../types';

export const ResultCard = ({ result }: { result: ResultItem }) => (
  <article
    id={result.id}
    className="luxury-card flex h-full min-w-0 flex-col p-7"
  >
    <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-gold-dark">{result.category}</p>
    <p className="mt-5 font-serif text-4xl font-medium text-ink">{result.value}</p>
    <h3 className="mt-5 font-serif text-2xl font-medium leading-tight text-ink">
      {result.title}
    </h3>
    <p className="mt-4 flex-1 leading-7 text-ink/70">{result.description}</p>
    {result.matterDescription && (
      <p className="mt-5 border-l-2 border-gold/60 pl-3 text-sm leading-6 text-ink/60">
        {result.matterDescription}
      </p>
    )}
    {result.industry && <p className="mt-6 text-sm font-bold text-ink/72">Industry: {result.industry}</p>}
    <SecondaryButton to={`/results#${result.id}`} dark className="mt-6">
      Read Case Study
    </SecondaryButton>
  </article>
);
