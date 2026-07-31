import type { ImageAsset } from '../../types';
import { PrimaryButton } from './PrimaryButton';

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: ImageAsset;
  ctaLabel?: string;
  ctaTo?: string;
  centered?: boolean;
};

export const PageHero = ({
  eyebrow,
  title,
  description,
  image,
  ctaLabel,
  ctaTo,
  centered = false,
}: PageHeroProps) => (
  <section className="relative isolate overflow-hidden border-b border-dark-line luxury-dark">
    <div className="absolute inset-y-0 right-0 w-full md:w-[64%]">
      <img
        src={image.src}
        alt={image.alt}
        className="h-full min-h-[440px] w-full object-cover opacity-70 saturate-[0.9]"
        style={{ objectPosition: image.position }}
      />
    </div>
    <div className="absolute inset-0 bg-[linear-gradient(90deg,#5F021F_0%,rgba(95,2,31,0.94)_38%,rgba(95,2,31,0.46)_74%,rgba(37,0,12,0.88)_100%)]" />
    <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,transparent,rgba(37,0,12,0.76))]" />
    <div className="container-shell relative z-10 grid min-h-[420px] items-center py-20 md:min-h-[480px] lg:py-24">
      <div className={centered ? 'mx-auto max-w-4xl text-center' : 'max-w-2xl'}>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="serif-heading mt-5 text-5xl md:text-7xl">{title}</h1>
        <p className="mt-6 max-w-xl text-base leading-8 text-white/84 md:text-lg">
          {description}
        </p>
        {ctaLabel && ctaTo && (
          <PrimaryButton to={ctaTo} className="mt-9">
            {ctaLabel}
          </PrimaryButton>
        )}
      </div>
    </div>
  </section>
);
