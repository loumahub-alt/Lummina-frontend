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
      title="Modern Counsel. Client-Centered Results."
      description="Lummina Law Firm is a modern, innovative and client-centered full-service law firm based in Lagos, Nigeria."
      image={images.columns}
      ctaLabel="Meet Our Team"
      ctaTo="/our-team"
    />

    <section id="foundation" className="cream-section py-20">
      <div className="container-shell">
        <SectionHeading
          align="center"
          title="Our Foundation"
        >
          <p>
            We are committed to redefining legal practice through innovation, excellence
            and a deep understanding of our clients' needs.
          </p>
        </SectionHeading>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {foundationValues.map((value) => {
            const Icon = iconMap[value.icon];
            return (
              <article key={value.title} className="luxury-card p-8 text-center">
                <Icon aria-hidden="true" className="mx-auto h-12 w-12 text-gold stroke-[1.4]" />
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
            className="h-full min-h-[420px] w-full object-cover"
            style={{ objectPosition: images.library.position }}
          />
        </div>
        <div>
          <p className="eyebrow">Our Story</p>
          <h2 className="mt-5 font-serif text-5xl font-medium leading-tight text-white md:text-6xl">
            Bespoke legal solutions for Nigerian businesses and private clients.
          </h2>
          <div className="gold-divider mt-7" />
          <div className="mt-7 space-y-5 leading-8 text-muted">
            <p>
              Lummina was built to provide innovative, practical and bespoke legal
              solutions tailored to each client's unique circumstances. Our work is grounded
              in trust, integrity and excellent service delivery.
            </p>
            <p>
              We advise individuals, businesses and institutions across disputes,
              corporate/commercial matters, regulatory compliance, debt recovery,
              technology, media, property and private client services.
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
        className="absolute inset-0 h-full w-full object-cover opacity-24"
        style={{ objectPosition: 'center right' }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(95,2,31,0.96),rgba(95,2,31,0.72))]" />
      <div className="container-shell relative z-10">
        <blockquote className="max-w-4xl font-serif text-4xl font-medium leading-tight text-white md:text-6xl">
          "We deliver tailored solutions, anticipate legal risks and use modern tools to
          provide efficient and effective legal services."
        </blockquote>
        <p className="mt-7 text-lg font-bold text-gold-bright">
          Faith Zekeri, Managing Partner
        </p>
      </div>
    </section>

    <section className="cream-section py-20">
      <div className="container-shell grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading eyebrow="Milestones" title="A firm built for trust, innovation and practical service.">
          <p>
            Lummina is designed around client-centered service, lasting relationships and
            a positive contribution to the Nigerian legal community.
          </p>
        </SectionHeading>
        <div className="space-y-6">
          {milestones.map((milestone) => (
            <article
              key={milestone.year}
            className="luxury-card grid gap-4 border-l-4 border-l-gold p-6 sm:grid-cols-[6rem_1fr]"
            >
              <p className="font-serif text-3xl font-medium text-gold">{milestone.year}</p>
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
          title="Lagos-based counsel for Nigeria and beyond."
          dark
          align="center"
        >
          <p>
            We support individuals, companies, startups and institutions with legal needs
            across Nigeria and selected international touchpoints.
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
