import { createContext } from 'react';
import type { NavigateOptions, To } from 'react-router-dom';

export type TransitionPhase = 'idle' | 'covering' | 'covered' | 'revealing';

export type TransitionContextValue = {
  navigateWithTransition: (to: To, options?: NavigateOptions) => Promise<void>;
  isTransitioning: () => boolean;
};

export const TransitionContext = createContext<TransitionContextValue | null>(null);
