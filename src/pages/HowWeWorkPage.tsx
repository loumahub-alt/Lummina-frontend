import { CallToAction } from '../components/common/CallToAction';
import { PageHero } from '../components/common/PageHero';
import { SectionHeading } from '../components/common/SectionHeading';
import { howWeWorkSteps, images } from '../data/site';

export const HowWeWorkPage = () => (
  <>
    <PageHero
      eyebrow="How We Work"
      title="A Clear Process From First Conversation to Resolution."
      description="We bring structure to complex legal decisions, with clear communication and disciplined follow-through from the first conversation to the appropriate next step."
      image={images.conference}
    />

    <section className="cream-section py-20">
      <div className="container-shell">
        <SectionHeading eyebrow="Our Process" title="A practical path through the matter." align="center">
          <p>
            Our approach keeps the legal work connected to the objective, the surrounding context
            and the decisions that follow.
          </p>
        </SectionHeading>

        <div className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-5">
          {howWeWorkSteps.map((step, index) => (
            <article key={step.title} className="luxury-card flex h-full flex-col p-7">
              <span className="font-serif text-4xl font-medium text-gold-dark">0{index + 1}</span>
              <h2 className="mt-6 font-serif text-2xl font-medium leading-tight text-ink">
                {step.title}
              </h2>
              <p className="mt-4 flex-1 leading-7 text-ink/70">{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <CallToAction
      title="Tell us what you are trying to achieve."
      text="We will help you understand the legal considerations, identify the material risks and determine the appropriate next step."
      ctaLabel="Speak With Us"
    />
  </>
);
