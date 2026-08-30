import { Clock, ExternalLink, ShieldCheck } from 'lucide-react';
import { ContactInformation } from '../components/common/ContactInformation';
import { ConsultationForm } from '../components/forms/ConsultationForm';
import { brand, images } from '../data/site';
import { trackEvent } from '../utils/analytics';

export const ConsultationPage = () => (
  <section className="cream-section text-ink">
    <div className="grid min-h-[calc(100vh-82px)] lg:grid-cols-[0.46fr_0.54fr]">
      <aside className="relative isolate overflow-hidden luxury-dark px-5 py-16 sm:px-8 lg:px-12">
        <img
          src={images.library.src}
          alt=""
          aria-hidden="true"
          width={images.library.width}
          height={images.library.height}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-22"
          style={{ objectPosition: images.library.position }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(95,2,31,0.94),rgba(37,0,12,0.98))]" />
        <div className="relative z-10 mx-auto max-w-xl">
          <p className="eyebrow text-gold-bright">Schedule a Consultation</p>
          <h1 className="mt-5 font-serif text-5xl font-medium leading-tight text-white md:text-7xl">
            Trusted guidance through complexity.
          </h1>
          <p className="mt-6 text-lg leading-8 text-white/80">
            Tell us about your business, transaction or legal challenge. We will discuss the
            decision in front of you and the practical path forward.
          </p>

          <div className="mt-10">
            <ContactInformation />
          </div>

          <div
            id="privacy-note"
            className="mt-10 space-y-5 border-t border-dark-line pt-8 text-sm leading-7 text-muted"
          >
            <p className="flex gap-3">
              <Clock aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-gold-bright" />
              Requests are reviewed during regular business hours. Urgent matters should
              also be directed to the appropriate office by phone.
            </p>
            <p className="flex gap-3">
              <ShieldCheck aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-gold-bright" />
              Information submitted through this form is used only to evaluate your
              request and coordinate a response.
            </p>
          </div>
        </div>
      </aside>

      <div className="px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-4xl rounded-[2px] border border-light-line bg-paper/95 p-6 shadow-soft sm:p-8 lg:p-10">
          <h2 className="font-serif text-4xl font-medium leading-tight text-ink">
            Start with clarity.
          </h2>
          <p className="mt-3 leading-7 text-ink/68">
            Required fields are marked with an asterisk.
          </p>
          <div className="mt-7 grid gap-4 lg:grid-cols-2">
            <div className="flex flex-col gap-4 border border-gold/35 bg-gold/10 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 lg:flex-col lg:items-start lg:justify-between">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-gold-dark">
                  Prefer to choose a time directly?
                </p>
                <p className="mt-2 text-sm leading-6 text-ink/70">
                  Book a consultation through our Outlook calendar and select an available time.
                </p>
              </div>
              <a
                href={brand.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('book_redirect_click', { destination: 'outlook_bookings' })}
                className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 border border-orange/80 bg-[linear-gradient(135deg,#FFBD3D_0%,#FFA500_48%,#D67F00_100%)] px-5 py-3 text-xs font-extrabold uppercase tracking-[0.1em] text-bordeaux transition duration-300 hover:-translate-y-0.5 hover:border-bordeaux/40 focus-visible:outline-gold-dark"
              >
                Book a time online
                <ExternalLink aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
            <div className="flex flex-col gap-4 border border-bordeaux/15 bg-bordeaux/[.035] p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 lg:flex-col lg:items-start lg:justify-between">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-gold-dark">
                  Already know what you need?
                </p>
                <p className="mt-2 text-sm leading-6 text-ink/70">
                  Complete our Request Services form and tell us how we can help.
                </p>
              </div>
              <a
                href={brand.requestServicesUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('services_request_click', { destination: 'microsoft_forms' })}
                className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 border border-bordeaux bg-bordeaux px-5 py-3 text-xs font-extrabold uppercase tracking-[0.1em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-wine focus-visible:outline-gold-dark"
              >
                Request services
                <ExternalLink aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="mt-8">
            <ConsultationForm />
          </div>
        </div>
      </div>
    </div>
  </section>
);
