import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export const SiteDisclaimerBanner = () => {
  const [visible, setVisible] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  if (!visible) return null;

  const acknowledge = () => {
    setVisible(false);
  };

  return createPortal((
    <div className="fixed inset-y-0 left-0 right-auto z-[90] grid h-screen w-screen place-items-center bg-bordeaux/70 px-4 py-6" role="presentation">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="site-disclaimer-title"
        aria-describedby="site-disclaimer-description"
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[3px] border border-gold/30 bg-[#FFF9EF] p-6 text-ink shadow-luxe sm:p-9"
      >
        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-gold-dark">Disclaimer</p>
        <h2 id="site-disclaimer-title" className="mt-3 font-serif text-3xl font-medium text-bordeaux sm:text-4xl">
          Important information for website visitors.
        </h2>
        <p id="site-disclaimer-description" className="mt-5 leading-7 text-ink/72">
          The information on this website is provided for general purposes only. It is not legal advice, and using this website or submitting an enquiry does not create an attorney-client relationship with Lummina Law Firm. Please do not submit confidential information until an engagement has been confirmed in writing.
        </p>
        <p className="mt-5 leading-7 text-ink/72">
          Please read our{' '}
          <a className="font-bold text-gold-dark underline" href="/privacy-policy">
            Privacy Policy
          </a>{' '}
          and{' '}
          <a className="font-bold text-gold-dark underline" href="/terms-of-use">
            Terms of Use
          </a>{' '}
          before continuing.
        </p>
        <label className="mt-6 flex items-start gap-3 text-sm leading-6 text-ink/72">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(event) => setConfirmed(event.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 accent-gold"
          />
          <span>I confirm that I have read and understood this disclaimer and agree to the Terms of Use.</span>
        </label>
        <button
          type="button"
          onClick={acknowledge}
          disabled={!confirmed}
          className="mt-7 inline-flex min-h-12 items-center justify-center border border-orange/80 bg-gold px-5 py-3 text-xs font-extrabold uppercase tracking-[0.1em] text-bordeaux transition hover:bg-gold-bright disabled:cursor-not-allowed disabled:opacity-45"
        >
          I Understand and Agree
        </button>
      </section>
    </div>
  ), document.body);
};
