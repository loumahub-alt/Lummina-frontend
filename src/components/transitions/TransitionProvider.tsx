import type { PropsWithChildren } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  useBlocker,
  useNavigate,
} from 'react-router-dom';
import type {
  Location,
  NavigateOptions,
  To,
} from 'react-router-dom';
import {
  TransitionContext,
  type TransitionPhase,
} from './TransitionContext';
import { TransitionOverlay } from './TransitionOverlay';

const DEFAULT_TIMINGS = {
  coverMs: 500,
  holdMs: 2000,
  revealMs: 500,
};

const INITIAL_LOAD_MS = 3000;

const REDUCED_MOTION_TIMINGS = {
  coverMs: 0,
  holdMs: 0,
  revealMs: 0,
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const shouldAnimateRouteChange = (currentLocation: Location, nextLocation: Location) =>
  currentLocation.pathname !== nextLocation.pathname ||
  currentLocation.search !== nextLocation.search;

export const TransitionProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<TransitionPhase>('covered');

  const phaseRef = useRef<TransitionPhase>('covered');
  const transitioningRef = useRef(false);
  const allowNavigationRef = useRef(false);
  const handlingBlockedNavigationRef = useRef(false);
  const reducedMotionRef = useRef(prefersReducedMotion());
  const timersRef = useRef<number[]>([]);
  const framesRef = useRef<number[]>([]);

  const setTransitionPhase = useCallback((nextPhase: TransitionPhase) => {
    phaseRef.current = nextPhase;
    setPhase(nextPhase);
  }, []);

  const wait = useCallback((duration: number) => {
    if (duration <= 0) {
      return Promise.resolve();
    }

    return new Promise<void>((resolve) => {
      const timer = window.setTimeout(() => {
        timersRef.current = timersRef.current.filter((item) => item !== timer);
        resolve();
      }, duration);

      timersRef.current.push(timer);
    });
  }, []);

  const waitForFrame = useCallback(() => (
    new Promise<void>((resolve) => {
      const frame = window.requestAnimationFrame(() => {
        framesRef.current = framesRef.current.filter((item) => item !== frame);
        resolve();
      });

      framesRef.current.push(frame);
    })
  ), []);

  const waitForPaint = useCallback(async () => {
    await waitForFrame();
    await waitForFrame();
  }, [waitForFrame]);

  const runTransition = useCallback(async (performNavigation: () => void) => {
    if (transitioningRef.current) {
      return;
    }

    const timings = reducedMotionRef.current
      ? REDUCED_MOTION_TIMINGS
      : DEFAULT_TIMINGS;

    transitioningRef.current = true;

    try {
      setTransitionPhase('covering');
      await waitForFrame();
      await wait(timings.coverMs);

      setTransitionPhase('covered');
      await wait(timings.holdMs);

      performNavigation();
      await waitForPaint();

      setTransitionPhase('revealing');
      await wait(timings.revealMs);
    } finally {
      setTransitionPhase('idle');
      transitioningRef.current = false;
    }
  }, [setTransitionPhase, wait, waitForFrame, waitForPaint]);

  const navigateWithTransition = useCallback(
    async (to: To, options?: NavigateOptions) => {
      await runTransition(() => {
        allowNavigationRef.current = true;
        navigate(to, options);

        window.setTimeout(() => {
          allowNavigationRef.current = false;
        }, 0);
      });
    },
    [navigate, runTransition],
  );

  useEffect(() => {
    let cancelled = false;
    const revealMs = reducedMotionRef.current ? 0 : DEFAULT_TIMINGS.revealMs;

    transitioningRef.current = true;

    void wait(INITIAL_LOAD_MS).then(async () => {
      if (cancelled) {
        return;
      }

      setTransitionPhase('revealing');
      await wait(revealMs);

      if (cancelled) {
        return;
      }

      setTransitionPhase('idle');
      transitioningRef.current = false;
    });

    return () => {
      cancelled = true;
      transitioningRef.current = false;
    };
  }, [setTransitionPhase, wait]);

  const blocker = useBlocker(({ currentLocation, historyAction, nextLocation }) => {
    if (allowNavigationRef.current || phaseRef.current !== 'idle') {
      return false;
    }

    if (historyAction === 'REPLACE') {
      return false;
    }

    return shouldAnimateRouteChange(currentLocation, nextLocation);
  });

  useEffect(() => {
    if (blocker.state !== 'blocked' || handlingBlockedNavigationRef.current) {
      return;
    }

    handlingBlockedNavigationRef.current = true;

    void runTransition(() => {
      allowNavigationRef.current = true;
      blocker.proceed();

      window.setTimeout(() => {
        allowNavigationRef.current = false;
      }, 0);
    }).finally(() => {
      handlingBlockedNavigationRef.current = false;
    });
  }, [blocker, runTransition]);

  useEffect(() => {
    reducedMotionRef.current = prefersReducedMotion();

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionPreferenceChange = () => {
      reducedMotionRef.current = mediaQuery.matches;
    };

    mediaQuery.addEventListener('change', handleMotionPreferenceChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMotionPreferenceChange);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('route-transition-active', phase !== 'idle');

    return () => {
      document.body.classList.remove('route-transition-active');
    };
  }, [phase]);

  useEffect(() => () => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    framesRef.current.forEach((frame) => window.cancelAnimationFrame(frame));
  }, []);

  const value = useMemo(() => ({
    navigateWithTransition,
    isTransitioning: () => transitioningRef.current,
  }), [navigateWithTransition]);

  return (
    <TransitionContext.Provider value={value}>
      <div className="route-transition-shell" data-transition-phase={phase}>
        {children}
      </div>
      <TransitionOverlay phase={phase} />
    </TransitionContext.Provider>
  );
};
