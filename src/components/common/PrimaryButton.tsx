import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { TransitionLink } from '../transitions';

type ButtonProps = {
  children: ReactNode;
  to?: string;
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

const baseClass =
  'group inline-flex min-h-12 items-center justify-center gap-3 border border-orange/80 bg-[linear-gradient(135deg,#FFBD3D_0%,#FFA500_48%,#D67F00_100%)] px-6 py-3 text-xs font-extrabold uppercase tracking-[0.1em] text-bordeaux transition duration-300 hover:-translate-y-0.5 hover:border-champagne/80 focus-visible:outline-gold-bright disabled:cursor-not-allowed disabled:opacity-60 sm:px-8';

export const PrimaryButton = ({
  children,
  to,
  href,
  target,
  rel,
  type = 'button',
  disabled = false,
  onClick,
  className = '',
}: ButtonProps) => {
  const buttonClass = `${baseClass} ${className}`;
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
    return <TransitionLink to={to} className={buttonClass}>{content}</TransitionLink>;
  }

  if (href) {
    return <a href={href} target={target} rel={rel} className={buttonClass}>{content}</a>;
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={buttonClass}
    >
      {content}
    </button>
  );
};
