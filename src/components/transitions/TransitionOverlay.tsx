import { memo } from 'react';
import { brand } from '../../data/site';
import type { TransitionPhase } from './TransitionContext';

type TransitionOverlayProps = {
  phase: TransitionPhase;
};

export const TransitionOverlay = memo(({ phase }: TransitionOverlayProps) => (
  <div className="route-transition-overlay" data-phase={phase} aria-hidden="true">
    <div className="route-transition-overlay__surface" />
    <div className="route-transition-overlay__content">
      <img
        src={brand.loader}
        alt=""
        width={750}
        height={434}
        className="route-transition-overlay__loader"
        aria-hidden="true"
        decoding="async"
      />
      <div className="route-transition-overlay__mark">
        <span className="route-transition-overlay__line" />
        <span className="route-transition-overlay__brand">{brand.descriptor}</span>
        <span className="route-transition-overlay__line" />
      </div>
    </div>
  </div>
));

TransitionOverlay.displayName = 'TransitionOverlay';
