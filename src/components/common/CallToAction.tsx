import { images } from '../../data/site';
import { PrimaryButton } from './PrimaryButton';

type CallToActionProps = {
  eyebrow?: string;
  title?: string;
  text?: string;
  ctaLabel?: string;
  ctaTo?: string;
  ctaHref?: string;
  ctaTarget?: string;
  ctaRel?: string;
};

export const CallToAction = ({
  eyebrow = 'Build with clarity',
  title = 'A legal partner for every stage of growth.',
  text = 'Whether you are building, investing, evolving or protecting what matters, Lummina provides clear, commercially intelligent guidance for what comes next.',
  ctaLabel = 'Schedule a Consultation',
  ctaTo,
  ctaHref,
  ctaTarget,
  ctaRel,
}: CallToActionProps) => (
  <section className="relative isolate overflow-hidden border-y border-dark-line luxury-dark py-16">
    <img
      src={images.columns.src}
      alt=""
      aria-hidden="true"
      width={images.columns.width}
      height={images.columns.height}
      loading="lazy"
      className="absolute inset-0 h-full w-full object-cover opacity-18"
      style={{ objectPosition: 'left center' }}
    />
    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(95,2,31,0.94),rgba(37,0,12,0.86))]" />
    <div className="container-shell relative z-10 py-2 text-center">
      <p className="eyebrow text-gold-bright">{eyebrow}</p>
      <h2 className="mt-4 font-serif text-4xl font-medium leading-tight text-white md:text-5xl">
        {title}
      </h2>
      <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/80">{text}</p>
      <PrimaryButton to={ctaHref ? undefined : ctaTo ?? '/consultation'} href={ctaHref} target={ctaTarget} rel={ctaRel} className="mt-8">
        {ctaLabel}
      </PrimaryButton>
    </div>
  </section>
);
