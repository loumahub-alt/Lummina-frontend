import { CallToAction } from '../components/common/CallToAction';
import { PageHero } from '../components/common/PageHero';
import { SectionHeading } from '../components/common/SectionHeading';
import { SecondaryButton } from '../components/common/SecondaryButton';
import { PracticeAreaCard } from '../components/cards/PracticeAreaCard';
import { images, industries, practiceAreas, servicePages } from '../data/site';
import { iconMap } from '../utils/icons';

export const PracticeAreasPage = () => (
  <>
    <PageHero
      eyebrow="Practice Areas"
      title="Commercial Legal Services in Lagos and Beyond."
      description="From foundations and governance to transactions, disputes and protection, Lummina provides commercially minded legal advisory for businesses, investors and private clients."
      image={images.library}
    />

    <section className="cream-section py-20">
      <div className="container-shell">
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {practiceAreas.map((area) => (
            <PracticeAreaCard key={area.id} area={area} detailed />
          ))}
        </div>
      </div>
    </section>

    <section className="luxury-dark py-20">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Service Depth"
          title="Commercially aligned strategy for the decision in front of you."
          dark
        >
          <p>
            Every matter receives a disciplined strategy, a clear operating plan and direct
            attorney accountability, with legal advice aligned to commercial goals and long-term
            value.
          </p>
        </SectionHeading>

        <div className="mt-14 space-y-12">
          {practiceAreas.map((area, index) => {
            const image = images[area.image];
            const Icon = iconMap[area.icon];
            const reverse = index % 2 === 1;

            return (
              <article
                key={area.id}
                id={`${area.id}-detail`}
                className={`grid overflow-hidden rounded-[2px] border border-dark-line bg-champagne/5 shadow-luxe luxury-inset lg:grid-cols-2 ${
                  reverse ? 'lg:[&>div:first-child]:order-2' : ''
                }`}
              >
                <div className="min-h-[340px] overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    style={{ objectPosition: image.position }}
                  />
                </div>
                <div className="p-8 lg:p-10">
                  <Icon aria-hidden="true" className="h-12 w-12 text-gold-bright stroke-[1.4]" />
                  <h2 className="mt-6 font-serif text-4xl font-medium leading-tight text-white">
                    {area.title}
                  </h2>
                  <p className="mt-5 leading-8 text-muted">{area.detail}</p>
                  <ul className="mt-7 grid gap-3 text-sm text-white/82 sm:grid-cols-2">
                    {area.services.map((service) => (
                      <li key={service} className="flex gap-3">
                        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-gold" />
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>

    <section className="cream-section border-y border-light-line py-20">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Commercial Service Pages"
          title="Focused legal support for high-stakes business decisions."
          align="center"
        >
          <p>
            Start with the service area closest to your objective, then speak with us about a
            scope tailored to your business, transaction or personal priorities.
          </p>
        </SectionHeading>
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {servicePages.map((page) => (
            <article key={page.slug} className="luxury-card flex h-full flex-col p-7">
              <p className="eyebrow">{page.eyebrow}</p>
              <h2 className="mt-4 font-serif text-3xl font-medium leading-tight text-ink">
                {page.title}
              </h2>
              <p className="mt-4 flex-1 leading-7 text-ink/70">{page.seoDescription}</p>
              <SecondaryButton to={`/services/${page.slug}`} dark className="mt-7">
                Explore {page.eyebrow}
              </SecondaryButton>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="cream-section py-20">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Industry Expertise"
          title="Sector-aware guidance for modern businesses."
          align="center"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <div key={industry} className="luxury-card p-8 text-center">
              <p className="font-serif text-3xl font-medium text-ink">{industry}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <CallToAction title="Need a tailored solution for your unique challenge?" />
  </>
);
