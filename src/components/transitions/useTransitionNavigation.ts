import { useContext } from 'react';
import { TransitionContext } from './TransitionContext';

export const useTransitionNavigation = () => {
  const context = useContext(TransitionContext);

  if (!context) {
    throw new Error('useTransitionNavigation must be used inside a TransitionProvider.');
  }

  return context;
};
