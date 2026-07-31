import type { PropsWithChildren } from 'react';

export const PageTransition = ({ children }: PropsWithChildren) => (
  <main id="main-content">
    {children}
  </main>
);
