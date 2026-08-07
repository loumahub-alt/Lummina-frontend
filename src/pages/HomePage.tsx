import {
  audienceSegments,
  homePracticeAreas,
  homeStats,
  images,
  messagePillars,
} from '../data/site';
import { StatCard } from '../components/cards/StatCard';
import { CallToAction } from '../components/common/CallToAction';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { SecondaryButton } from '../components/common/SecondaryButton';
import { SectionHeading } from '../components/common/SectionHeading';
import { iconMap } from '../utils/icons';

export const HomePage = () => (
  <>
    <section className="relative isolate overflow-hidden border-b border-dark-line luxury-dark">
      <img
        src={images.columns.src}
        alt={images.columns.alt}
        width={images.columns.width}
        height={images.columns.height}
        loading="eager"
        className="absolute inset-0 h-full w-full object-cover opacity-78 saturate-[0.88]"
        style={{ objectPosition: images.columns.position }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#5F021F_0%,rgba(95,2,31,0.96)_34%,rgba(95,2,31,0.48)_68%,rgba(37,0,12,0.88)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,transparent,rgba(37,0,12,0.92))]" />
      <div className="container-shell relative z-10 grid min-h-[540px] items-center py-10 sm:min-h-[600px] sm:py-12 lg:min-h-[660px] lg:py-16">
        <div className="max-w-3xl">
          <p className="eyebrow text-gold-bright">Commercially Intelligent Legal Advisory</p>
          <h1 className="serif-heading mt-5 max-w-4xl text-[2.9rem] leading-[0.94] sm:mt-6 sm:text-6xl md:text-7xl xl:text-[5.6rem]">
            Legal clarity
            <span className="block">for businesses building toward scale.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[0.98rem] leading-7 text-champagne/90 sm:mt-7 sm:text-base sm:leading-8 md:text-lg md:leading-9">
            Lummina helps emerging and evolving businesses build, protect and scale through
            commercially intelligent legal advisory. We advise founders, investors and private
            clients with clarity, structure and strategic foresight.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:items-center sm:gap-5">
            <PrimaryButton to="/consultation">Schedule a Consultation</PrimaryButton>
            <SecondaryButton to="/practice-areas">View Our Services</SecondaryButton>
          </div>
        </div>
      </div>
    </section>

    <section className="cream-section border-b border-light-line py-20">
      <div className="container-shell">
        <SectionHeading
          eyebrow="The Lummina Difference"
          title="Built on clarity. Structure. Strategic growth."
          align="center"
        >
          <p>
            We are the legal infrastructure partner for businesses building toward scale,
            combining legal expertise with commercial awareness and long-term perspective.
          </p>
        </SectionHeading>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {messagePillars.map((pillar) => {
            const Icon = iconMap[pillar.icon];
            return (
              <article key={pillar.title} className="luxury-card p-8">
                <Icon aria-hidden="true" className="h-11 w-11 text-gold-dark stroke-[1.35]" />
                <h2 className="mt-6 font-serif text-3xl font-medium leading-tight text-ink">
                  {pillar.title}
                </h2>
                <p className="mt-4 leading-7 text-ink/70">{pillar.text}</p>
                <p className="mt-6 border-t border-light-line pt-5 text-sm font-bold text-gold-dark">
                  {pillar.signature}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>

    <section className="cream-section border-y border-light-line">
      <div className="container-shell">
        <SectionHeading
          eyebrow="How We Help"
          title="Legal infrastructure for sustainable growth."
          align="center"
        >
          <p>
            From business foundations and governance to transactions, disputes and protection,
            our advice is designed around the decision in front of you.
          </p>
        </SectionHeading>
        <div className="grid divide-y divide-light-line md:grid-cols-2 md:divide-x md:divide-y-0 xl:grid-cols-6">
          {homePracticeAreas.map((area) => {
            const Icon = iconMap[area.icon];

            return (
              <article key={area.id} className="flex min-h-[230px] flex-col items-center px-5 py-8 text-center sm:min-h-[280px] sm:px-6 sm:py-10">
                <Icon aria-hidden="true" className="h-10 w-10 text-gold-dark stroke-[1.35] sm:h-11 sm:w-11" />
                <h2 className="mt-5 font-serif text-[1.45rem] font-medium leading-tight text-ink sm:mt-6 sm:text-2xl">
                  {area.title}
                </h2>
                <p className="mt-4 flex-1 text-sm leading-6 text-ink/68 sm:mt-5 sm:leading-7">
                  {area.shortDescription}
                </p>
                <SecondaryButton to={`/practice-areas#${area.id}`} dark className="mt-5 sm:mt-7">
                  Learn More
                </SecondaryButton>
              </article>
            );
          })}
        </div>
      </div>
    </section>

    <section className="relative isolate overflow-hidden border-b border-dark-line luxury-dark">
      <img
        src={images.boardroom.src}
        alt={images.boardroom.alt}
        width={images.boardroom.width}
        height={images.boardroom.height}
        loading="lazy"
        className="absolute inset-y-0 right-0 h-full w-full object-cover opacity-74 md:w-[68%]"
        style={{ objectPosition: images.boardroom.position }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#5F021F_0%,rgba(95,2,31,0.96)_43%,rgba(95,2,31,0.42)_76%,rgba(37,0,12,0.84)_100%)]" />
      <div className="container-shell relative z-10 grid min-h-[500px] items-center py-14 sm:min-h-[560px] sm:py-20">
        <div className="max-w-xl">
          <p className="eyebrow text-gold-bright">Commercially Minded Counsel</p>
          <h2 className="mt-5 font-serif text-[2.75rem] font-medium leading-[1.03] text-white sm:text-5xl md:text-6xl">
            Law that understands business.
            <span className="block">Strategy for what comes next.</span>
          </h2>
          <div className="gold-divider mt-7" />
          <p className="mt-6 leading-7 text-champagne/80 sm:mt-7 sm:leading-8">
            We combine legal expertise with commercial awareness, considering operational impact,
            investor readiness, execution speed and long-term value creation.
          </p>
          <SecondaryButton to="/about" className="mt-8 sm:mt-9">
            Why Lummina
          </SecondaryButton>
        </div>
      </div>
    </section>

    <section className="cream-section border-b border-light-line py-20">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Who We Advise"
          title="Guidance shaped around your stage and objectives."
          align="center"
        >
          <p>
            Whether you are building, investing, evolving or protecting what matters, our
            counsel is tailored to the realities behind the legal question.
          </p>
        </SectionHeading>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {audienceSegments.map((segment) => (
            <article key={segment.title} className="luxury-card p-7">
              <h2 className="font-serif text-2xl font-medium leading-tight text-ink">
                {segment.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-ink/70">{segment.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="border-b border-dark-line bg-wine">
      <div className="container-shell grid gap-y-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {homeStats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>
    </section>

    <CallToAction />
  </>
);
