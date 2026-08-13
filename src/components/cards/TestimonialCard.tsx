import type { Testimonial } from '../../types';

export const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
  <figure className="min-w-0 overflow-hidden rounded-[2px] border border-champagne/15 bg-champagne/5 p-8 shadow-luxe luxury-inset">
    <blockquote className="font-serif text-3xl font-medium leading-tight text-white">
      &ldquo;{testimonial.quote}&rdquo;
    </blockquote>
    <figcaption className="mt-7 border-t border-dark-line pt-5 text-sm leading-6 text-muted">
      {testimonial.isFeatured && <span className="mb-2 block text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-gold-bright">Featured</span>}
      <span className="block font-bold text-gold-bright">{testimonial.name}</span>
      <span>{testimonial.title}</span>
      {testimonial.company && <span className="block">{testimonial.company}</span>}
    </figcaption>
  </figure>
);
