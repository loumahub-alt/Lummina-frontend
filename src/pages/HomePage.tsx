import { homePracticeAreas, homeStats, images } from '../data/site';
import { StatCard } from '../components/cards/StatCard';
import { CallToAction } from '../components/common/CallToAction';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { SecondaryButton } from '../components/common/SecondaryButton';
import { iconMap } from '../utils/icons';

export const HomePage = () => (
  <>
    <section className="relative isolate overflow-hidden border-b border-dark-line luxury-dark">
      <img
        src={images.columns.src}
        alt={images.columns.alt}
        className="absolute inset-0 h-full w-full object-cover opacity-78 saturate-[0.88]"
        style={{ objectPosition: images.columns.position }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#5F021F_0%,rgba(95,2,31,0.96)_34%,rgba(95,2,31,0.48)_68%,rgba(37,0,12,0.88)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,transparent,rgba(37,0,12,0.92))]" />
      <div className="container-shell relative z-10 grid min-h-[560px] items-center py-12 sm:min-h-[600px] lg:min-h-[660px] lg:py-16">
        <div className="max-w-3xl">
          <p className="eyebrow">Barristers. Solicitors. Trusted Advisors.</p>
          <h1 className="serif-heading mt-6 max-w-4xl text-5xl sm:text-6xl md:text-7xl xl:text-[5.6rem]">
            Legal Strategy.
            <span className="block">Business Advantage.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-champagne/90 md:text-lg md:leading-9">
            We deliver sophisticated legal solutions and exceptional representation to
            businesses, entrepreneurs and private clients across Nigeria and beyond.
          </p>
          <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
            <PrimaryButton to="/consultation">Schedule a Consultation</PrimaryButton>
            <SecondaryButton to="/practice-areas">View Our Services</SecondaryButton>
          </div>
        </div>
      </div>
    </section>

    <section className="cream-section border-y border-light-line">
      <div className="container-shell">
        <div className="grid divide-y divide-light-line md:grid-cols-2 md:divide-x md:divide-y-0 xl:grid-cols-6">
          {homePracticeAreas.map((area) => {
            const Icon = iconMap[area.icon];

            return (
              <article key={area.id} className="flex min-h-[280px] flex-col items-center px-6 py-10 text-center">
                <Icon aria-hidden="true" className="h-11 w-11 text-gold stroke-[1.35]" />
                <h2 className="mt-6 font-serif text-2xl font-medium leading-tight text-ink">
                  {area.title}
                </h2>
                <p className="mt-5 flex-1 text-sm leading-7 text-ink/68">
                  {area.shortDescription}
                </p>
                <SecondaryButton to={`/practice-areas#${area.id}`} dark className="mt-7">
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
        className="absolute inset-y-0 right-0 h-full w-full object-cover opacity-74 md:w-[68%]"
        style={{ objectPosition: images.boardroom.position }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#5F021F_0%,rgba(95,2,31,0.96)_43%,rgba(95,2,31,0.42)_76%,rgba(37,0,12,0.84)_100%)]" />
      <div className="container-shell relative z-10 grid min-h-[560px] items-center py-20">
        <div className="max-w-xl">
          <p className="eyebrow">A Tradition of Excellence</p>
          <h2 className="mt-5 font-serif text-5xl font-medium leading-tight text-white md:text-6xl">
            A Tradition of Excellence.
            <span className="block">A Commitment to You.</span>
          </h2>
          <div className="gold-divider mt-7" />
          <p className="mt-7 leading-8 text-champagne/80">
            Lummina is trusted for practical strategy, careful judgment and client service
            that protects business interests without losing sight of the people behind each
            matter.
          </p>
          <SecondaryButton to="/about" className="mt-9">
            Learn More About Us
          </SecondaryButton>
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
