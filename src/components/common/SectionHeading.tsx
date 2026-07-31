import type { ReactNode } from 'react';

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  align?: 'left' | 'center';
  dark?: boolean;
};

export const SectionHeading = ({
  eyebrow,
  title,
  children,
  align = 'left',
  dark = false,
}: SectionHeadingProps) => (
  <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
    {eyebrow && <p className="eyebrow">{eyebrow}</p>}
    <h2
      className={`mt-4 font-serif text-4xl font-medium leading-[1.03] md:text-5xl ${
        dark ? 'text-white' : 'text-ink'
      }`}
    >
      {title}
    </h2>
    {children && (
      <div className={`mt-5 text-base leading-8 ${dark ? 'text-muted' : 'text-ink/72'}`}>
        {children}
      </div>
    )}
  </div>
);
