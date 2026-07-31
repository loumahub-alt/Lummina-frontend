import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { TransitionLink } from '../transitions';

type ButtonProps = {
  children: ReactNode;
  to?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

const baseClass =
  'group inline-flex min-h-12 items-center justify-center gap-3 border border-orange/80 bg-[linear-gradient(135deg,#FFBD3D_0%,#FFA500_48%,#D67F00_100%)] px-6 py-3 text-xs font-extrabold uppercase tracking-[0.1em] text-bordeaux shadow-gold transition duration-300 hover:-translate-y-0.5 hover:border-champagne/80 hover:shadow-[0_22px_46px_rgba(255,165,0,0.28)] focus-visible:outline-gold-bright disabled:cursor-not-allowed disabled:opacity-60 sm:px-8';

export const PrimaryButton = ({
  children,
  to,
  type = 'button',
  disabled = false,
  onClick,
  className = '',
}: ButtonProps) => {
  const content = (
    <>
      <span>{children}</span>
      <ArrowRight
        aria-hidden="true"
        className="h-4 w-4 transition-transform group-hover:translate-x-1"
      />
    </>
  );

  if (to) {
    return (
      <TransitionLink to={to} className={`${baseClass} ${className}`}>
        {content}
      </TransitionLink>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseClass} ${className}`}
    >
      {content}
    </button>
  );
};
