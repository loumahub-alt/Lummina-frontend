import { brand } from '../../data/site';
import { TransitionLink } from '../transitions';

type LogoProps = {
  compact?: boolean;
  variant?: 'light' | 'dark';
};

export const Logo = ({ compact = false, variant = 'light' }: LogoProps) => (
  <TransitionLink
    to="/"
    className="group inline-flex min-w-0 shrink-0 items-center gap-3"
    aria-label={`${brand.name} home`}
  >
    <img
      src={variant === 'dark' ? brand.logoDark : brand.logoLight}
      alt=""
      aria-hidden="true"
      className="h-auto w-[9.8rem] object-contain sm:w-[11.2rem]"
    />
    {!compact && (
      <span className="flex min-w-0 flex-col leading-none">
        <span className="sr-only">
          {brand.name}
        </span>
        <span
          className={`mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.24em] ${
            variant === 'dark' ? 'text-ink/70' : 'text-champagne/88'
          }`}
        >
          {brand.descriptor}
        </span>
      </span>
    )}
  </TransitionLink>
);
