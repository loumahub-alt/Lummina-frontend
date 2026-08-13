import { useMemo } from 'react';
import { CallToAction } from '../components/common/CallToAction';
import { PageHero } from '../components/common/PageHero';
import { SectionHeading } from '../components/common/SectionHeading';
import { PracticeAreaCard } from '../components/cards/PracticeAreaCard';
import { images, lumminaApproach } from '../data/site';
import { mapPublishedPracticeAreas, usePublishedCollection } from '../hooks/usePublishedContent';
import { iconMap } from '../utils/icons';

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
          title="Commercially intelligent legal support for what comes next."
          align="center"
        >
          <p>
            From business foundations and property to capital, intellectual property, cross-border
            matters and private client structures, our advice is built for decisions that need to
            hold up over time.
          </p>
        </SectionHeading>
        <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {areas.map((area) => (
            <PracticeAreaCard key={area.id} area={area} detailed />
          ))}
        </div>
      </div>
    </section>

    <section className="luxury-dark py-20">
      <div className="container-shell">
        <SectionHeading
          eyebrow="The Lummina Approach"
          title="Structure before speed. Governance as a system. Intentional drafting."
          dark
          align="center"
        >
          <p>
            Durable legal work starts with architecture, alignment and documents that are designed
            to withstand scrutiny, time and dispute.
          </p>
        </SectionHeading>

        <div className="mx-auto mt-12 grid max-w-6xl gap-6 lg:grid-cols-3">
          {lumminaApproach.map((item) => {
            const Icon = iconMap[item.icon];

            return (
              <article
                key={item.title}
                className="rounded-[2px] border border-champagne/15 bg-champagne/5 p-8 shadow-luxe luxury-inset"
              >
                <Icon aria-hidden="true" className="h-11 w-11 text-gold-bright stroke-[1.4]" />
                <h2 className="mt-6 font-serif text-3xl font-medium leading-tight text-white">
                  {item.title}
                </h2>
                <p className="mt-4 leading-7 text-muted">{item.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>

    <CallToAction title="Need a tailored solution for your unique challenge?" />
  </>
  );
};
