import { TeamMemberCard } from '../components/cards/TeamMemberCard';
import { CallToAction } from '../components/common/CallToAction';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { SectionHeading } from '../components/common/SectionHeading';
import { cultureValues, images, leadership, widerTeam } from '../data/site';
import { iconMap } from '../utils/icons';

export const OurTeamPage = () => (
  <>
    <section className="luxury-dark">
      <div className="container-shell py-16 text-center">
        <p className="eyebrow">Our Team</p>
        <h1 className="serif-heading mx-auto mt-5 max-w-5xl text-6xl md:text-8xl">
          People. Purpose. Performance.
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/80">
          Our team brings together exceptional legal talent and diverse experiences to
          provide innovative solutions and outstanding client service.
        </p>
      </div>
      <div className="relative min-h-[380px] overflow-hidden border-y border-dark-line md:min-h-[460px]">
        <img
          src={images.team.src}
          alt={images.team.alt}
          className="h-full min-h-[380px] w-full object-cover"
          style={{ objectPosition: images.team.position }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(95,2,31,0.08),rgba(95,2,31,0.62))]" />
      </div>
    </section>

    <section className="border-b border-dark-line bg-wine">
      <div className="container-shell grid gap-5 py-8 md:grid-cols-2 lg:grid-cols-4">
        {cultureValues.map((value) => {
          const Icon = iconMap[value.icon];
          return (
            <article key={value.title} className="rounded-[2px] border border-champagne/15 bg-champagne/5 p-8 shadow-luxe luxury-inset">
              <Icon aria-hidden="true" className="h-12 w-12 text-gold-bright stroke-[1.4]" />
              <h2 className="mt-5 font-serif text-3xl font-medium text-white">{value.title}</h2>
              <p className="mt-3 leading-7 text-muted">{value.text}</p>
            </article>
          );
        })}
      </div>
    </section>

    <section id="leadership" className="cream-section py-20">
      <div className="container-shell">
        <SectionHeading title="Leadership" align="center">
          <p>
            Selected managing partners, executive partners and department leaders guide
            the firm with clarity, service and accountability.
          </p>
        </SectionHeading>
        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {leadership.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>

    <section className="luxury-dark py-20">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Wider Organisation"
          title="The people and systems behind excellent client work."
          dark
        >
          <p>
            Our attorneys are supported by focused teams across research, operations,
            technology and client service.
          </p>
        </SectionHeading>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {widerTeam.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <article key={item.title} className="rounded-[2px] border border-champagne/15 bg-champagne/5 p-7 shadow-luxe luxury-inset">
                <Icon aria-hidden="true" className="h-10 w-10 text-gold-bright stroke-[1.4]" />
                <h2 className="mt-5 font-serif text-3xl font-medium text-white">
                  {item.title}
                </h2>
                <p className="mt-3 leading-7 text-muted">{item.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>

    <section id="careers" className="cream-section py-20">
      <div className="container-shell grid gap-10 py-2 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="eyebrow">Careers</p>
          <h2 className="mt-4 font-serif text-4xl font-medium leading-tight text-ink md:text-5xl">
            Build serious work with people who take service seriously.
          </h2>
          <p className="mt-5 max-w-3xl leading-8 text-ink/72">
            We welcome lawyers and business professionals who value judgment,
            collaboration, discretion and the discipline required for premium client work.
          </p>
        </div>
        <PrimaryButton to="/our-team#careers">View Opportunities</PrimaryButton>
      </div>
    </section>

    <CallToAction />
  </>
);
