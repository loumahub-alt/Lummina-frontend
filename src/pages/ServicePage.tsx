import { CallToAction } from '../components/common/CallToAction';
import { PageHero } from '../components/common/PageHero';
import { PracticeAreaCard } from '../components/cards/PracticeAreaCard';
import { SecondaryButton } from '../components/common/SecondaryButton';
import { SectionHeading } from '../components/common/SectionHeading';
import { images, insights, practiceAreas } from '../data/site';
import type { ServicePage as ServicePageData } from '../types';

type ServicePageProps = {
  page: ServicePageData;
};

export const ServicePage = ({ page }: ServicePageProps) => {
  const relatedPracticeAreas = page.practiceAreaIds
    .map((id) => practiceAreas.find((area) => area.id === id))
    .filter((area): area is (typeof practiceAreas)[number] => Boolean(area));
  const relatedInsights = (page.insightIds ?? [])
    .map((id) => insights.find((insight) => insight.id === id))
    .filter((insight): insight is (typeof insights)[number] => Boolean(insight));
  const heroImage = images[relatedPracticeAreas[0]?.image ?? 'boardroom'];

  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.intro}
        image={heroImage}
        ctaLabel="Schedule a Consultation"
        ctaTo="/consultation"
      />

      <section className="cream-section py-20">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading
            eyebrow="What We Advise On"
            title={`What does ${page.primaryKeyword} cover?`}
          >
            <p>
              The right legal advice depends on the business, transaction and objective. We
              begin with the commercial context, then build a practical legal plan around the
              risks and decisions that matter.
            </p>
          </SectionHeading>

          <div className="grid gap-4 sm:grid-cols-2">
            {page.highlights.map((highlight) => (
              <div key={highlight} className="luxury-card flex gap-3 p-6">
                <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 bg-gold" />
                <p className="font-semibold leading-7 text-ink">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="luxury-dark py-20">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Related Practice Areas"
            title="Advice connected to the decision in front of you."
            dark
          >
            <p>
              Explore the related areas of law that may support your matter, then speak with us
              about a tailored scope of work.
            </p>
          </SectionHeading>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {relatedPracticeAreas.map((area) => (
              <PracticeAreaCard key={area.id} area={area} detailed />
            ))}
          </div>
        </div>
      </section>

      {relatedInsights.length > 0 && (
        <section className="cream-section border-b border-light-line py-20">
          <div className="container-shell">
            <SectionHeading
              eyebrow="Related Insights"
              title="Practical guidance for the questions behind the matter."
              align="center"
            >
              <p>
                Continue exploring Lummina perspectives on the legal and commercial issues that
                often sit alongside this service area.
              </p>
            </SectionHeading>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {relatedInsights.map((insight) => (
                <article key={insight.id} className="luxury-card flex h-full flex-col p-7">
                  <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-gold-dark">
                    {insight.category} <span aria-hidden="true">|</span> {insight.date}
                  </p>
                  <h2 className="mt-4 flex-1 font-serif text-2xl font-medium leading-tight text-ink">
                    {insight.title}
                  </h2>
                  <p className="mt-4 leading-7 text-ink/70">{insight.summary}</p>
                  <SecondaryButton to={`/insights#${insight.id}`} dark className="mt-6">
                    Read {insight.title}
                  </SecondaryButton>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="cream-section py-16">
        <div className="container-shell flex flex-col gap-6 border-t border-light-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-gold-dark">
              Continue exploring
            </p>
            <h2 className="mt-3 font-serif text-3xl font-medium text-ink">
              View all Lummina practice areas.
            </h2>
          </div>
          <SecondaryButton to="/practice-areas" dark>
            Explore Practice Areas
          </SecondaryButton>
        </div>
      </section>

      <CallToAction title="Build with clarity. Move with confidence." />
    </>
  );
};
