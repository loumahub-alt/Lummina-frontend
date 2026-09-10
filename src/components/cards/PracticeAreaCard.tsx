import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { iconMap } from '../../utils/icons';
import type { PracticeArea } from '../../types';
import { brand } from '../../data/site';
import { hasAnalyticsConsent, trackEvent } from '../../utils/analytics';

type PracticeAreaCardProps = {
  area: PracticeArea;
  detailed?: boolean;
};

export const PracticeAreaCard = ({ area, detailed = false }: PracticeAreaCardProps) => {
  const Icon = iconMap[area.icon];
  const cardRef = useRef<HTMLElement>(null);
  const trackedRef = useRef(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || typeof IntersectionObserver === 'undefined') return undefined;

    let isVisible = false;
    const recordViewIfAllowed = () => {
      if (!isVisible || trackedRef.current || !hasAnalyticsConsent()) return;
      if (trackEvent('practice_area_view', { practiceAreaId: area.id })) {
        trackedRef.current = true;
        observer.disconnect();
      }
    };
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries.some((entry) => entry.isIntersecting);
        recordViewIfAllowed();
      },
      { threshold: 0.35 },
    );
    const handleConsent = () => recordViewIfAllowed();

    observer.observe(card);
    window.addEventListener('lummina:analytics-consent', handleConsent);
    return () => {
      observer.disconnect();
      window.removeEventListener('lummina:analytics-consent', handleConsent);
    };
  }, [area.id]);

  return (
    <article
      ref={cardRef}
      id={detailed ? area.id : undefined}
      className={`luxury-card group h-full p-8 ${
        detailed ? '' : 'text-center'
      }`}
    >
      <div
        className={
          detailed
            ? 'flex min-w-0 flex-col gap-5 md:flex-row md:items-start'
            : 'flex h-full flex-col items-center'
        }
      >
        <Icon
          aria-hidden="true"
          className={`h-11 w-11 shrink-0 text-gold-dark stroke-[1.35] transition duration-300 group-hover:text-gold-dark ${
            detailed ? '' : 'mx-auto'
          }`}
        />
        <div className="min-w-0">
          <h3
            className={`min-w-0 font-serif text-3xl font-medium leading-tight text-ink ${
              detailed ? 'mt-5 md:mt-0' : 'mt-5'
            }`}
          >
            {area.title}
          </h3>
          <p className="mt-4 leading-7 text-ink/72">
            {detailed ? area.summary : area.shortDescription}
          </p>
          {detailed && area.services.length > 0 && (
            <>
              <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.12em] text-gold-dark">
                Our Services Include:
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-ink/72">
                {area.services.map((service) => (
                  <li key={service} className="flex min-w-0 gap-3">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-gold" />
                    <span className="min-w-0">{service}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
          <a
            href={brand.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/cta mt-7 inline-flex min-h-11 w-fit max-w-full items-center gap-2 border-b border-gold/70 px-0 py-2 text-xs font-extrabold uppercase tracking-[0.08em] text-gold-dark transition hover:border-bordeaux hover:text-bordeaux focus-visible:outline-gold-dark"
          >
            <span>Schedule a Consultation</span>
            <ArrowRight aria-hidden="true" className="h-4 w-4 text-gold-dark transition-transform group-hover/cta:translate-x-1" />
          </a>
        </div>
      </div>
    </article>
  );
};
