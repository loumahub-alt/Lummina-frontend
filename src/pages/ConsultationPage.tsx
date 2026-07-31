import { Clock, ShieldCheck } from 'lucide-react';
import { ContactInformation } from '../components/common/ContactInformation';
import { ConsultationForm } from '../components/forms/ConsultationForm';
import { images } from '../data/site';

export const ConsultationPage = () => (
  <section className="cream-section text-ink">
    <div className="grid min-h-[calc(100vh-82px)] lg:grid-cols-[0.46fr_0.54fr]">
      <aside className="relative isolate overflow-hidden luxury-dark px-5 py-16 sm:px-8 lg:px-12">
        <img
          src={images.library.src}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-22"
          style={{ objectPosition: images.library.position }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(95,2,31,0.94),rgba(37,0,12,0.98))]" />
        <div className="relative z-10 mx-auto max-w-xl">
          <p className="eyebrow">Schedule a Consultation</p>
          <h1 className="mt-5 font-serif text-5xl font-medium leading-tight text-white md:text-7xl">
            Let's Solve What's Next. Together.
          </h1>
          <p className="mt-6 text-lg leading-8 text-white/80">
            Tell us about your business and one of our attorneys will be in touch to
            discuss how we can help.
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
            Request a Consultation
          </h2>
          <p className="mt-3 leading-7 text-ink/68">
            Required fields are marked with an asterisk.
          </p>
          <div className="mt-8">
            <ConsultationForm />
          </div>
        </div>
      </div>
    </div>
  </section>
);
