import { useMemo } from 'react';
import { CallToAction } from '../components/common/CallToAction';
import { PageHero } from '../components/common/PageHero';
import { SectionHeading } from '../components/common/SectionHeading';
import { PracticeAreaCard } from '../components/cards/PracticeAreaCard';
import { brand, images } from '../data/site';
import { mapPublishedPracticeAreas, usePublishedCollection } from '../hooks/usePublishedContent';

export const PracticeAreasPage = () => {
  const publishedRecords = usePublishedCollection('practice-areas');
  const areas = useMemo(() => mapPublishedPracticeAreas(publishedRecords), [publishedRecords]);

  return (
  <>
    <PageHero
      eyebrow="Practice Areas"
      title="Legal foundations for durable growth."
      description="We design and implement the legal infrastructure that helps businesses, founders, investors and families build, protect and scale with clarity."
      image={images.library}
    />

    <section className="cream-section py-20">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Our Services"
          title="What We Advise On"
          align="center"
        >
          <p>
            From establishing a business and formalising its governance to negotiating transactions,
            managing regulatory exposure and resolving disputes, we advise on the legal decisions
            that shape direction and protect value.
          </p>
        </SectionHeading>
        <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {areas.map((area) => (
            <PracticeAreaCard key={area.id} area={area} detailed />
          ))}
        </div>
      </div>
    </section>

    <CallToAction
      title="Need a tailored solution for your unique challenge?"
      ctaLabel="Request Our Services"
      ctaHref={brand.requestServicesUrl}
      ctaTarget="_blank"
      ctaRel="noopener noreferrer"
    />
  </>
  );
};
