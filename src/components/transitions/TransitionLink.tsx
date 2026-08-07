import type {
  CSSProperties,
  MouseEvent,
  ReactNode,
} from 'react';
import { forwardRef, useMemo } from 'react';
import {
  useHref,
  useLocation,
  useNavigate,
  useResolvedPath,
} from 'react-router-dom';
import type {
  LinkProps,
  NavLinkRenderProps,
} from 'react-router-dom';
import { useTransitionNavigation } from './useTransitionNavigation';
import { trackEvent } from '../../utils/analytics';

type TransitionLinkProps = Omit<LinkProps, 'children' | 'className' | 'style'> & {
  caseSensitive?: boolean;
  children?: ReactNode | ((props: NavLinkRenderProps) => ReactNode);
  className?: string | ((props: NavLinkRenderProps) => string | undefined);
  end?: boolean;
  style?: CSSProperties | ((props: NavLinkRenderProps) => CSSProperties | undefined);
};

const isModifiedClick = (event: MouseEvent<HTMLAnchorElement>) =>
  event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;

export const TransitionLink = forwardRef<HTMLAnchorElement, TransitionLinkProps>(({
  'aria-current': ariaCurrent,
  caseSensitive = false,
  children,
  className,
  end,
  onClick,
  preventScrollReset,
  relative,
  reloadDocument,
  replace,
  state,
  style,
  target,
  to,
  viewTransition,
  ...anchorProps
}, ref) => {
  const href = useHref(to, { relative });
  const location = useLocation();
  const resolvedPath = useResolvedPath(to, { relative });
  const navigate = useNavigate();
  const { isTransitioning, navigateWithTransition } = useTransitionNavigation();

  const renderProps = useMemo<NavLinkRenderProps>(() => {
    const currentPathname = caseSensitive
      ? location.pathname
      : location.pathname.toLowerCase();
    const targetPathname = caseSensitive
      ? resolvedPath.pathname
      : resolvedPath.pathname.toLowerCase();
    const isRoot = targetPathname === '/';
    const shouldMatchEnd = end ?? isRoot;
    const isActive =
      currentPathname === targetPathname ||
      (!shouldMatchEnd &&
        !isRoot &&
        currentPathname.startsWith(targetPathname) &&
        currentPathname.charAt(targetPathname.length) === '/');

    return {
      isActive,
      isPending: false,
      isTransitioning: isTransitioning(),
    };
  }, [caseSensitive, end, isTransitioning, location.pathname, resolvedPath.pathname]);

  const resolvedClassName =
    typeof className === 'function' ? className(renderProps) : className;
  const resolvedStyle =
    typeof style === 'function' ? style(renderProps) : style;
  const resolvedChildren =
    typeof children === 'function' ? children(renderProps) : children;
  const targetLocation = `${resolvedPath.pathname}${resolvedPath.search}${resolvedPath.hash}`;
  const currentLocation = `${location.pathname}${location.search}${location.hash}`;
  const isHashOnlyNavigation =
    location.pathname === resolvedPath.pathname &&
    location.search === resolvedPath.search &&
    location.hash !== resolvedPath.hash;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (resolvedPath.pathname === '/consultation' || resolvedPath.pathname === '/book') {
      trackEvent('book_redirect_click', { destination: resolvedPath.pathname });
    }

    if (
      event.defaultPrevented ||
      reloadDocument ||
      event.button !== 0 ||
      (target && target !== '_self') ||
      isModifiedClick(event)
    ) {
      return;
    }

    event.preventDefault();

    if (currentLocation === targetLocation) {
      return;
    }

    const navigationOptions = {
      preventScrollReset,
      relative,
      replace,
      state,
      viewTransition,
    };

    if (isHashOnlyNavigation) {
      navigate(to, navigationOptions);
      return;
    }

    void navigateWithTransition(to, navigationOptions);
  };

  return (
    <a
      {...anchorProps}
      aria-current={renderProps.isActive ? ariaCurrent ?? 'page' : ariaCurrent}
      className={resolvedClassName}
      href={href}
      onClick={handleClick}
      ref={ref}
      style={resolvedStyle}
      target={target}
    >
      {resolvedChildren}
    </a>
  );
});

TransitionLink.displayName = 'TransitionLink';
