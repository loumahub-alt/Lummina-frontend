import { Check } from 'lucide-react';
import { CallToAction } from '../components/common/CallToAction';
import { PageHero } from '../components/common/PageHero';
import { SectionHeading } from '../components/common/SectionHeading';
import { brand, externalCounselServices, images } from '../data/site';

export const ExternalCounselPage = () => (
  <>
    <PageHero
      eyebrow="External Counsel"
      title="Your Legal Function, Without the Overhead."
      description="Not every business is ready for a full-time in-house Counsel. However, every serious business needs access to sound legal judgment."
      image={images.boardroom}
    />

    <section className="cream-section py-20">
      <div className="container-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <SectionHeading eyebrow="Ongoing Support" title="Reliable legal support for the decisions that keep business moving.">
          <p>
            We provide ongoing external counsel to businesses that need reliable legal support
            across contracts, governance, compliance, employment, transactions and day-to-day
            commercial matters without maintaining a full internal legal department.
          </p>
        </SectionHeading>

        <div className="luxury-card p-8 md:p-10">
          <h2 className="font-serif text-3xl font-medium text-ink">What We Can Handle</h2>
          <ul className="mt-7 grid gap-4 sm:grid-cols-2">
            {externalCounselServices.map((service) => (
              <li key={service} className="flex gap-3 leading-7 text-ink/72">
                <Check aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-gold-dark" />
                {service}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>

    <CallToAction
      title="Build the right legal support around your business."
      text="Tell us about your business and the support you need. We will help you understand the appropriate external counsel arrangement."
      ctaLabel="Request Your External Counsel"
      ctaHref={brand.requestServicesUrl}
      ctaTarget="_blank"
      ctaRel="noopener noreferrer"
    />
  </>
);
