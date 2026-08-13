import { api } from '../services/api';

const CONSENT_STORAGE_KEY = 'lummina_cookie_consent';
const SESSION_STORAGE_KEY = 'lummina_analytics_session';
const VISITOR_STORAGE_KEY = 'lummina_analytics_visitor';
const ATTRIBUTION_STORAGE_KEY = 'lummina_analytics_attribution';
const VISITOR_LIFETIME_MS = 365 * 24 * 60 * 60 * 1000;
const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

type AnalyticsConsent = 'accepted' | 'rejected';
type EventParameters = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[][];
    gtag?: (...args: unknown[]) => void;
  }
}

const getConsent = (): AnalyticsConsent | null => {
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === 'accepted' || value === 'rejected' ? value : null;
  } catch {
    return null;
  }
};

const createIdentifier = () => typeof crypto.randomUUID === 'function'
  ? crypto.randomUUID()
  : Date.now() + '-' + Math.random().toString(36).slice(2);

const getVisitorId = () => {
  try {
    const stored = window.localStorage.getItem(VISITOR_STORAGE_KEY);
    if (stored) {
      try {
        const value = JSON.parse(stored) as { id?: unknown; expiresAt?: unknown };
        if (typeof value.id === 'string' && Number(value.expiresAt) > Date.now()) return value.id;
      } catch {
        if (stored.length <= 128) return stored;
      }
    }

    const id = createIdentifier();
    window.localStorage.setItem(VISITOR_STORAGE_KEY, JSON.stringify({
      id,
      expiresAt: Date.now() + VISITOR_LIFETIME_MS,
    }));
    return id;
  } catch {
    return createIdentifier();
  }
};

const trafficContext = () => {
  const currentUrl = new URL(window.location.href);
  const referrer = document.referrer;
  let referrerHost = '';
  try {
    const referrerUrl = referrer ? new URL(referrer) : null;
    referrerHost = referrerUrl && referrerUrl.origin !== currentUrl.origin
      ? referrerUrl.hostname.replace(/^www\./, '')
      : '';
  } catch {
    referrerHost = '';
  }

  const detected = {
    source: currentUrl.searchParams.get('utm_source') || referrerHost || 'direct',
    medium: currentUrl.searchParams.get('utm_medium')
    || (referrerHost ? (/google\.|bing\.|yahoo\.|duckduckgo\./i.test(referrerHost) ? 'organic' : 'referral') : 'direct'),
    campaign: currentUrl.searchParams.get('utm_campaign') || undefined,
  };
  let attribution = detected;
  try {
    const stored = window.localStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (stored) {
      const value = JSON.parse(stored) as { source?: unknown; medium?: unknown; campaign?: unknown };
      if (typeof value.source === 'string' && typeof value.medium === 'string') {
        attribution = {
          source: value.source,
          medium: value.medium,
          campaign: typeof value.campaign === 'string' ? value.campaign : undefined,
        };
      }
    } else {
      window.localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(detected));
    }
  } catch {
    // Source attribution remains available for this event even when storage is blocked.
  }

  const userAgent = navigator.userAgent.toLowerCase();
  const deviceType = /tablet|ipad/i.test(userAgent)
    ? 'tablet'
    : /mobile|android|iphone|ipod/i.test(userAgent)
      ? 'mobile'
      : 'desktop';

  return {
    source: {
      source: attribution.source,
      medium: attribution.medium,
      campaign: attribution.campaign,
    },
    device: { type: deviceType },
  };
};

export const hasAnalyticsConsent = () => getConsent() === 'accepted';

export const setAnalyticsConsent = (consent: AnalyticsConsent) => {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, consent);
  } catch {
    // Analytics remains disabled when storage is unavailable.
  }
  window.dispatchEvent(new CustomEvent('lummina:analytics-consent'));
};

export const loadAnalytics = () => {
  if (!measurementId || !hasAnalyticsConsent() || window.gtag) {
    return;
  }

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };

  window.gtag('js', new Date());
  window.gtag('config', measurementId, { anonymize_ip: true });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  script.onload = () => window.gtag?.('config', measurementId, { anonymize_ip: true });
  document.head.appendChild(script);
};

export const trackEvent = (name: string, parameters: EventParameters = {}) => {
  if (!hasAnalyticsConsent()) {
    return false;
  }

  window.gtag?.('event', name, parameters);

  let sessionId = '';
  try {
    sessionId = window.sessionStorage.getItem(SESSION_STORAGE_KEY) ?? '';
    if (!sessionId) {
      sessionId = typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : Date.now() + '-' + Math.random().toString(36).slice(2);
      window.sessionStorage.setItem(SESSION_STORAGE_KEY, sessionId);
    }
  } catch {
    sessionId = 'anonymous';
  }

  const context = trafficContext();

  void api.public.event({
    event: name,
    sessionId,
    visitorId: getVisitorId(),
    page: window.location.pathname,
    source: context.source,
    device: context.device,
    metadata: Object.fromEntries(
      Object.entries(parameters).filter(([, value]) => value !== undefined),
    ),
    consent: true,
  }).catch(() => {
    // Analytics must never interrupt a public interaction.
  });

  return true;
};

export { CONSENT_STORAGE_KEY };
