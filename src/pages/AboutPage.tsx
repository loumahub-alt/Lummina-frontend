import { CallToAction } from '../components/common/CallToAction';
import { PageHero } from '../components/common/PageHero';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { SectionHeading } from '../components/common/SectionHeading';
import { foundationValues, globalPresence, images, milestones } from '../data/site';
import { iconMap } from '../utils/icons';

export const AboutPage = () => (
  <>
    <PageHero
      eyebrow="About Us"
      title="The Legal Infrastructure Partner for Businesses Building Toward Scale."
      description="Lummina Law Firm is a modern, commercially minded law firm helping emerging and evolving businesses navigate legal and regulatory complexity with clarity, structure and strategic foresight."
      image={images.columns}
      ctaLabel="Meet Our Team"
      ctaTo="/our-team"
    />

    <section id="foundation" className="cream-section py-20">
      <div className="container-shell">
        <SectionHeading
          align="center"
          title="Clarity. Structure. Strategic Growth."
        >
          <p>
            Lummina helps emerging and evolving businesses build, protect and scale through
            commercially intelligent legal advisory, while supporting investors and private
            clients through the decisions that matter.
          </p>
        </SectionHeading>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {foundationValues.map((value) => {
            const Icon = iconMap[value.icon];
            return (
              <article key={value.title} className="luxury-card p-8 text-center">
                <Icon aria-hidden="true" className="mx-auto h-12 w-12 text-gold-dark stroke-[1.4]" />
                <h2 className="mt-6 font-serif text-3xl font-medium text-ink">{value.title}</h2>
                <p className="mt-4 leading-7 text-ink/68">{value.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>

    <section className="luxury-dark py-20">
      <div className="container-shell grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="overflow-hidden rounded-[2px] border border-dark-line shadow-luxe">
          <img
            src={images.library.src}
            alt={images.library.alt}
            width={images.library.width}
            height={images.library.height}
            loading="lazy"
            className="h-full min-h-[420px] w-full object-cover"
            style={{ objectPosition: images.library.position }}
          />
        </div>
        <div>
          <p className="eyebrow text-gold-bright">Our Story</p>
          <h2 className="mt-5 font-serif text-5xl font-medium leading-tight text-white md:text-6xl">
            Built for businesses that are building.
          </h2>
          <div className="gold-divider mt-7" />
          <div className="mt-7 space-y-5 leading-8 text-muted">
            <p>
              Lummina was built to be more than a source of legal output. We are a legal
              infrastructure partner helping clients establish the structure, governance and
              protection required for sustainable growth.
            </p>
            <p>
              Our advice combines legal expertise with commercial awareness. We consider the
              operational impact, investor readiness, execution speed and long-term value behind
              every matter, from business foundations to transactions and complex disputes.
            </p>
          </div>
          <PrimaryButton to="/practice-areas" className="mt-9">
            Explore Our Services
          </PrimaryButton>
        </div>
      </div>
    </section>

    <section className="relative isolate overflow-hidden luxury-dark py-20">
      <img
        src={images.boardroom.src}
        alt=""
        aria-hidden="true"
        width={images.boardroom.width}
        height={images.boardroom.height}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-24"
        style={{ objectPosition: 'center right' }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(95,2,31,0.96),rgba(95,2,31,0.72))]" />
      <div className="container-shell relative z-10">
        <blockquote className="max-w-4xl font-serif text-4xl font-medium leading-tight text-white md:text-6xl">
          "Built on clarity, trust, and strategy."
        </blockquote>
        <p className="mt-7 text-lg font-bold text-gold-bright">
          The Lummina approach
        </p>
      </div>
    </section>

    <section className="cream-section py-20">
      <div className="container-shell grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading eyebrow="Milestones" title="A modern firm for businesses building toward scale.">
          <p>
            Our practice is designed around clarity, strategic foresight, lasting relationships
            and the practical realities of growth.
          </p>
        </SectionHeading>
        <div className="space-y-6">
          {milestones.map((milestone) => (
            <article
              key={milestone.year}
            className="luxury-card grid gap-4 border-l-4 border-l-gold p-6 sm:grid-cols-[6rem_1fr]"
            >
              <p className="font-serif text-3xl font-medium text-gold-dark">{milestone.year}</p>
              <div>
                <h3 className="font-serif text-2xl font-medium text-ink">{milestone.title}</h3>
                <p className="mt-2 leading-7 text-ink/70">{milestone.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="border-y border-dark-line luxury-dark py-20">
      <div className="container-shell py-16">
        <SectionHeading
          eyebrow="Global Presence"
          title="Commercially minded counsel from Lagos, Nigeria."
          dark
          align="center"
        >
          <p>
            We support founders, companies, investors, private clients and institutions across
            Nigeria and selected international touchpoints.
          </p>
        </SectionHeading>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {globalPresence.map((market) => (
            <div key={market} className="rounded-[2px] border border-champagne/15 bg-champagne/5 p-5 text-center font-bold text-champagne">
              {market}
            </div>
          ))}
        </div>
      </div>
    </section>

    <CallToAction />
  </>
);
