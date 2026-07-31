import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { TransitionLink } from '../transitions';

type SecondaryButtonProps = {
  children: ReactNode;
  to?: string;
  onClick?: () => void;
  className?: string;
  dark?: boolean;
};

export const SecondaryButton = ({
  children,
  to,
  onClick,
  className = '',
  dark = false,
}: SecondaryButtonProps) => {
  const classes = `group relative inline-flex min-h-11 items-center justify-center gap-3 border-b px-0 py-3 text-xs font-extrabold uppercase tracking-[0.1em] transition duration-300 ${
    dark
      ? 'border-gold/60 text-navy hover:border-navy hover:text-ink'
      : 'border-gold/70 text-champagne hover:border-champagne hover:text-white'
  } ${className}`;
  const content = (
    <>
      <span>{children}</span>
      <ArrowRight
        aria-hidden="true"
        className="h-4 w-4 text-gold-bright transition-transform group-hover:translate-x-1"
      />
    </>
  );

  if (to) {
    return (
      <TransitionLink to={to} className={classes}>
        {content}
      </TransitionLink>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {content}
    </button>
  );
};
