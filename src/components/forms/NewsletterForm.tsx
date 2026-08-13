import { FormEvent, useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { PrimaryButton } from '../common/PrimaryButton';
import { trackEvent } from '../../utils/analytics';
import { api, ApiError } from '../../services/api';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccess(false);

    if (!emailPattern.test(email)) {
      setError('Enter a valid email address.');
      return;
    }

    if (!consent) {
      setError('Confirm that you agree to receive Lummina updates.');
      return;
    }

    setError('');
    try {
      await api.public.newsletter(email, 'website');
      setSuccess(true);
      trackEvent('newsletter_signup', { form_name: 'newsletter' });
      setEmail('');
      setConsent(false);
    } catch (reason) {
      setError(reason instanceof ApiError ? reason.message : 'Unable to subscribe right now. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 grid gap-4 sm:grid-cols-[1fr_auto]">
      <div>
        <label htmlFor="newsletter-email" className="text-sm font-bold text-white">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-2 min-h-12 w-full rounded-[2px] border border-champagne/15 bg-white px-4 text-ink outline-none transition placeholder:text-ink/45 focus:border-gold"
          placeholder="you@example.com"
          aria-describedby="newsletter-feedback"
        />
      </div>
      <PrimaryButton type="submit" className="self-end">
        Subscribe
      </PrimaryButton>
      <label className="flex gap-3 text-sm leading-6 text-muted sm:col-span-2">
        <input
          type="checkbox"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          className="mt-1 h-4 w-4 accent-gold"
        />
        <span>
          I agree to receive legal updates and understand I can unsubscribe at any time.
        </span>
      </label>
      <div id="newsletter-feedback" className="sm:col-span-2">
        {error && (
          <p className="flex items-center gap-2 text-sm font-semibold text-gold-bright">
            <AlertCircle aria-hidden="true" className="h-4 w-4" />
            {error}
          </p>
        )}
        {success && (
          <p className="flex items-center gap-2 text-sm font-semibold text-gold-bright">
            <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
            Thank you. You are subscribed to Lummina insights.
          </p>
        )}
      </div>
    </form>
  );
};
