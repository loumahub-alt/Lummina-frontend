import { useEffect, useState } from 'react';
import {
  CONSENT_STORAGE_KEY,
  hasAnalyticsConsent,
  loadAnalytics,
  setAnalyticsConsent,
  trackEvent,
} from '../../utils/analytics';
import { api } from '../../services/api';

export const CookieConsentBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
      if (!stored) {
        setVisible(true);
      } else if (hasAnalyticsConsent()) {
        loadAnalytics();
      }
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) {
    return null;
  }

  const choose = (consent: 'accepted' | 'rejected') => {
    setAnalyticsConsent(consent);
    let anonymousId = '';
    try {
      anonymousId = window.localStorage.getItem('lummina_anonymous_id') ?? '';
      if (!anonymousId) {
        anonymousId = typeof crypto.randomUUID === 'function'
          ? crypto.randomUUID()
          : Date.now() + '-' + Math.random().toString(36).slice(2);
        window.localStorage.setItem('lummina_anonymous_id', anonymousId);
      }
    } catch {
      anonymousId = typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : Date.now() + '-' + Math.random().toString(36).slice(2);
    }
    void api.public.consent({
      anonymousId,
      necessary: true,
      analytics: consent === 'accepted',
      preferences: false,
      marketing: false,
      policyVersion: '2026-01',
    }).catch(() => undefined);
    if (consent === 'accepted') {
      loadAnalytics();
      trackEvent('page_view', { page_title: document.title });
    }
    setVisible(false);
  };

  return (
    <aside
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
      className="fixed inset-x-4 bottom-4 z-[80] max-w-xl rounded-[2px] border border-champagne/20 bg-wine p-5 text-white shadow-luxe sm:left-auto sm:right-6 sm:p-6"
    >
      <h2 id="cookie-consent-title" className="font-serif text-2xl font-medium">
        Privacy and analytics
      </h2>
      <p id="cookie-consent-description" className="mt-3 text-sm leading-6 text-muted">
        Lummina uses optional analytics to understand site visits and consultation enquiries.
        Analytics is disabled unless you choose to allow it.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => choose('accepted')}
          className="inline-flex min-h-11 items-center justify-center border border-orange/80 bg-gold px-5 py-3 text-xs font-extrabold uppercase tracking-[0.1em] text-bordeaux transition hover:bg-gold-bright focus-visible:outline-white"
        >
          Allow analytics
        </button>
        <button
          type="button"
          onClick={() => choose('rejected')}
          className="inline-flex min-h-11 items-center justify-center border border-champagne/30 px-5 py-3 text-xs font-extrabold uppercase tracking-[0.1em] text-champagne transition hover:border-champagne hover:text-white focus-visible:outline-white"
        >
          Continue without
        </button>
      </div>
    </aside>
  );
};
