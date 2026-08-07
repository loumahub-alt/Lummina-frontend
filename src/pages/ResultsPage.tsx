import { ResultCard } from '../components/cards/ResultCard';
import { StatCard } from '../components/cards/StatCard';
import { TestimonialCard } from '../components/cards/TestimonialCard';
import { CallToAction } from '../components/common/CallToAction';
import { PageHero } from '../components/common/PageHero';
import { SectionHeading } from '../components/common/SectionHeading';
import { images, resultItems, resultStats, testimonials } from '../data/site';

export const ResultsPage = () => (
  <>
    <PageHero
      eyebrow="Results"
      title="Commercial Outcomes. Strategic Impact."
      description="Our representative matters show how preparation, commercial awareness and sound judgment can support stronger business outcomes."
      image={images.scales}
    />

    <section className="border-b border-dark-line bg-wine">
      <div className="container-shell grid gap-y-4 py-10 md:grid-cols-2 lg:grid-cols-4">
        {resultStats.map((stat) => (
          <StatCard key={stat.value} stat={stat} />
        ))}
      </div>
    </section>

    <section className="cream-section py-20">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Representative Matters"
          title="Case outcomes shaped by preparation, strategy and judgment."
        >
          <p>
            These matters reflect representative experience and outcomes in specific
            circumstances. They are not promises, guarantees or predictions.
          </p>
        </SectionHeading>
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {resultItems.map((result) => (
            <ResultCard key={result.id} result={result} />
          ))}
        </div>
        <div
          id="results-disclaimer"
          className="mt-10 rounded-lg border border-light-line bg-paper/80 p-6 text-sm leading-7 text-ink/70 shadow-soft"
        >
          Past results do not guarantee, warrant or predict a similar outcome in any future
          matter. Each matter depends on its facts, applicable law, forum, opposing parties
          and many other variables.
        </div>
      </div>
    </section>

    <section className="luxury-dark py-20">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Client Perspectives"
          title="Trusted in moments that matter."
          dark
          align="center"
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>

    <CallToAction />
  </>
);
