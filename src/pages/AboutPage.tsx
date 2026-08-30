import { CallToAction } from '../components/common/CallToAction';
import { PageHero } from '../components/common/PageHero';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { SectionHeading } from '../components/common/SectionHeading';
import { coreValues, images, lumminaApproach, mission, practicePhilosophy, vision } from '../data/site';
import { iconMap } from '../utils/icons';

const MissionIcon = iconMap[mission.icon];
const VisionIcon = iconMap[vision.icon];
const PracticePhilosophyIcon = iconMap[practicePhilosophy.icon];

export const AboutPage = () => (
  <>
    <PageHero
      eyebrow="About Us"
      title="A Law Firm Built Around How You Actually Operate."
      description="We advise and support businesses, investors, asset owners and private clients on the legal structures, transactions and decisions that shape value. We combine legal expertise with commercial and financial awareness to advise on matters where law intersects with ownership, capital, governance, regulation and business strategy."
      image={images.columns}
      ctaLabel="Meet Our Team"
      ctaTo="/our-team"
    />

    <section id="foundation" className="cream-section py-20">
      <div className="container-shell">
        <SectionHeading align="center" eyebrow="Our Foundation" title="Clarity. Structure. Strategic Growth.">
          <p>
            We believe legal advice should help clients make better decisions. That means
            understanding the objective, identifying the material risks, considering the commercial
            consequences and designing a solution that can actually be implemented.
          </p>
        </SectionHeading>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <article className="luxury-card p-8 md:p-10">
            <div className="flex items-center gap-4">
              <VisionIcon aria-hidden="true" className="h-10 w-10 text-gold-dark stroke-[1.4]" />
              <h2 className="font-serif text-3xl font-medium text-ink">Our Vision</h2>
            </div>
            <p className="mt-7 text-lg leading-8 text-ink/68">{vision.text}</p>
          </article>

          <article className="luxury-card p-8 md:p-10">
            <div className="flex items-center gap-4">
              <MissionIcon aria-hidden="true" className="h-10 w-10 text-gold-dark stroke-[1.4]" />
              <h2 className="font-serif text-3xl font-medium text-ink">Our Mission</h2>
            </div>
            <ul className="mt-7 space-y-4 leading-7 text-ink/68">
              {mission.points.map((point) => <li key={point} className="flex gap-3"><span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-dark" />{point}</li>)}
            </ul>
          </article>

          <article className="luxury-card p-8 md:p-10 lg:col-span-2">
            <div className="flex items-center gap-4">
              <PracticePhilosophyIcon aria-hidden="true" className="h-10 w-10 text-gold-dark stroke-[1.4]" />
              <h2 className="font-serif text-3xl font-medium text-ink">Our Practice Philosophy</h2>
            </div>
            <p className="mt-7 max-w-4xl text-lg leading-8 text-ink/68">{practicePhilosophy.intro}</p>
            <ul className="mt-7 grid gap-4 md:grid-cols-2 leading-7 text-ink/68">
              {practicePhilosophy.principles.map((principle) => <li key={principle} className="flex gap-3"><span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-dark" />{principle}</li>)}
            </ul>
          </article>
        </div>

        <div className="mt-16">
          <SectionHeading align="center" eyebrow="What Guides Us" title="Our Core Values">
            <p>Our values shape how we think, advise, communicate, and serve every client.</p>
          </SectionHeading>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((value) => {
              const Icon = iconMap[value.icon];
              return <article key={value.title} className="luxury-card p-8 text-center"><Icon aria-hidden="true" className="mx-auto h-10 w-10 text-gold-dark stroke-[1.4]" /><h3 className="mt-5 font-serif text-2xl font-medium text-ink">{value.title}</h3><p className="mt-4 leading-7 text-ink/68">{value.text}</p></article>;
            })}
          </div>
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
            Built for people that are building.
          </h2>
          <div className="gold-divider mt-7" />
          <div className="mt-7 space-y-5 leading-8 text-muted">
            <p>
              Legal issues are not experienced in isolation. A contract affects operations. A
              financing decision affects ownership. A regulatory requirement affects processes. A
              governance failure can become a financial problem.
            </p>
            <p>Lummina was established around that reality.</p>
            <p>
              We advise with the understanding that legal decisions are value decisions. Our role
              is to bring sound legal acumen into those decisions early enough to protect value,
              reduce avoidable risk and create room for execution and growth, while providing
              hands-on support.
            </p>
          </div>
          <PrimaryButton to="/practice-areas" className="mt-9">
            Explore Our Services
          </PrimaryButton>
        </div>
      </div>
    </section>

    <section className="luxury-dark py-20">
      <div className="container-shell">
        <SectionHeading eyebrow="How We Work" title="The Lummina Approach" dark align="center" />

        <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-2">
          {lumminaApproach.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <article key={item.title} className="rounded-[2px] border border-champagne/15 bg-champagne/5 p-8 shadow-luxe luxury-inset">
                <Icon aria-hidden="true" className="h-10 w-10 text-gold-bright stroke-[1.4]" />
                <h2 className="mt-6 font-serif text-3xl font-medium leading-tight text-white">{item.title}</h2>
                <p className="mt-4 leading-7 text-muted">{item.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>

    <section className="cream-section py-20">
      <div className="container-shell">
        <SectionHeading align="center" eyebrow="Our Purpose" title="Legal judgment for decisions that matter.">
          <p>
            To provide legal judgment that helps businesses and individuals make consequential
            decisions with greater clarity, stronger protection and better outcomes.
          </p>
        </SectionHeading>
      </div>
    </section>

    <CallToAction />
  </>
);
