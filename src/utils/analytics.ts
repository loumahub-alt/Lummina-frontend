const CONSENT_STORAGE_KEY = 'lummina_cookie_consent';
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

export const hasAnalyticsConsent = () => getConsent() === 'accepted';

export const setAnalyticsConsent = (consent: AnalyticsConsent) => {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, consent);
  } catch {
    // Analytics remains disabled when storage is unavailable.
  }
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
    return;
  }

  window.gtag?.('event', name, parameters);
};

export { CONSENT_STORAGE_KEY };
