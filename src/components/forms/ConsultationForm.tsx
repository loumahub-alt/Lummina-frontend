import { cloneElement, FormEvent, ReactElement, useMemo, useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { PrimaryButton } from '../common/PrimaryButton';
import { trackEvent } from '../../utils/analytics';
import { api, ApiError } from '../../services/api';
import { mapPublishedPracticeAreas, usePublishedCollection } from '../../hooks/usePublishedContent';

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  practiceArea: string;
  method: string;
  date: string;
  time: string;
  message: string;
  consent: boolean;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  practiceArea: '',
  method: '',
  date: '',
  time: '',
  message: '',
  consent: false,
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const minimumConsultationDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const ConsultationForm = () => {
  const practiceAreaRecords = usePublishedCollection('practice-areas');
  const practiceAreas = useMemo(() => mapPublishedPracticeAreas(practiceAreaRecords), [practiceAreaRecords]);
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const minimumDate = useMemo(minimumConsultationDate, []);

  const setValue = <Key extends keyof FormValues>(key: Key, value: FormValues[Key]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const validate = () => {
    const nextErrors: FormErrors = {};

    if (!values.firstName.trim()) nextErrors.firstName = 'First name is required.';
    if (!values.lastName.trim()) nextErrors.lastName = 'Last name is required.';
    if (!emailPattern.test(values.email)) nextErrors.email = 'Enter a valid email address.';
    if (!values.phone.trim()) nextErrors.phone = 'Phone number is required.';
    if (!values.practiceArea) nextErrors.practiceArea = 'Select a practice area.';
    if (!values.method) nextErrors.method = 'Select a consultation method.';
    if (!values.date) nextErrors.date = 'Preferred date is required.';
    else if (values.date < minimumDate) nextErrors.date = 'Choose a future date.';
    if (!values.time) nextErrors.time = 'Preferred time is required.';
    if (!values.message.trim()) nextErrors.message = 'Tell us briefly how we can help.';
    if (!values.consent) nextErrors.consent = 'Consent is required before submitting.';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccess(false);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await api.public.consultation({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        company: values.company,
        practiceAreaId: values.practiceArea,
        consultationMethod: values.method,
        preferredDate: values.date,
        preferredTime: values.time,
        message: values.message,
        consent: values.consent,
      });
      setIsSubmitting(false);
      setSuccess(true);
      trackEvent('form_submit', { form_name: 'consultation' });
      setValues(initialValues);
    } catch (error) {
      setIsSubmitting(false);
      setErrors({ message: error instanceof ApiError ? error.message : 'Unable to submit your request. Please try again.' });
    }
  };

  const inputClass =
    'mt-2 min-h-12 w-full rounded-[2px] border border-light-line bg-white/75 px-4 text-ink outline-none transition placeholder:text-ink/40 focus:border-gold focus:bg-white';
  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate aria-busy={isSubmitting}>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="First name" required error={errors.firstName}>
          <input
            id="firstName"
            value={values.firstName}
            onChange={(event) => setValue('firstName', event.target.value)}
            className={inputClass}
            autoComplete="given-name"
          />
        </Field>
        <Field label="Last name" required error={errors.lastName}>
          <input
            id="lastName"
            value={values.lastName}
            onChange={(event) => setValue('lastName', event.target.value)}
            className={inputClass}
            autoComplete="family-name"
          />
        </Field>
        <Field label="Email" required error={errors.email}>
          <input
            id="email"
            type="email"
            value={values.email}
            onChange={(event) => setValue('email', event.target.value)}
            className={inputClass}
            autoComplete="email"
          />
        </Field>
        <Field label="Telephone" required error={errors.phone}>
          <input
            id="phone"
            type="tel"
            value={values.phone}
            onChange={(event) => setValue('phone', event.target.value)}
            className={inputClass}
            autoComplete="tel"
          />
        </Field>
      </div>

      <Field label="Organisation">
        <input
          id="company"
          value={values.company}
          onChange={(event) => setValue('company', event.target.value)}
          className={inputClass}
          autoComplete="organization"
        />
      </Field>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Type of Matter" required error={errors.practiceArea}>
          <select
            id="practiceArea"
            value={values.practiceArea}
            onChange={(event) => setValue('practiceArea', event.target.value)}
            className={inputClass}
          >
            <option value="">Select a practice area</option>
            {practiceAreas.map((area) => (
              <option key={area.id} value={area.id}>
                {area.title}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Preferred consultation method" required error={errors.method}>
          <select
            id="method"
            value={values.method}
            onChange={(event) => setValue('method', event.target.value)}
            className={inputClass}
          >
            <option value="">Select a method</option>
            <option>Video call</option>
            <option>Phone call</option>
            <option>In-person meeting</option>
          </select>
        </Field>
        <Field label="Preferred date" required error={errors.date}>
          <input
            id="date"
            type="date"
            min={minimumDate}
            value={values.date}
            onChange={(event) => setValue('date', event.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Preferred time" required error={errors.time}>
          <input
            id="time"
            type="time"
            value={values.time}
            onChange={(event) => setValue('time', event.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Brief Description" required error={errors.message}>
        <textarea
          id="message"
          rows={6}
          value={values.message}
          onChange={(event) => setValue('message', event.target.value)}
          className={`${inputClass} resize-y py-4 leading-7`}
          placeholder="Briefly describe the matter and your goals."
        />
      </Field>

      <div>
        <label className="flex gap-3 text-sm leading-6 text-ink/76">
          <input
            type="checkbox"
            checked={values.consent}
            onChange={(event) => setValue('consent', event.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? 'consent-error' : undefined}
            className="mt-1 h-4 w-4 accent-gold"
          />
          <span>
            I agree to be contacted by Lummina Law Firm regarding this request and understand
            that submitting this form does not create an attorney-client relationship.
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" className="mt-2 flex items-center gap-2 text-sm font-semibold text-gold-dark">
            <AlertCircle aria-hidden="true" className="h-4 w-4" />
            {errors.consent}
          </p>
        )}
      </div>

      <div className="rounded-[2px] border border-gold/35 bg-gold/10 p-4 text-sm leading-6 text-ink/78">
        Do not submit confidential information until an attorney-client relationship has been
        established through a written engagement agreement.
      </div>

      <PrimaryButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting Enquiry' : 'Submit Enquiry'}
      </PrimaryButton>

      {success && (
        <p role="status" aria-live="polite" className="flex items-center gap-2 rounded-[2px] border border-gold/45 bg-gold/10 p-4 text-sm font-semibold text-ink">
          <CheckCircle2 aria-hidden="true" className="h-5 w-5 text-gold-dark" />
          Thank you. Your consultation request has been received and our team will respond shortly.
        </p>
      )}
    </form>
  );
};

type FieldProps = {
  label: string;
  required?: boolean;
  error?: string;
  children: ReactElement<{ id: string; 'aria-invalid'?: boolean; 'aria-describedby'?: string }>;
};

const Field = ({ label, required = false, error, children }: FieldProps) => {
  const id = children.props.id as string;
  const errorId = `${id}-error`;
  const control = cloneElement(children, {
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? errorId : undefined,
  });

  return (
    <div>
      <label htmlFor={id} className="text-sm font-bold text-ink">
        {label}
        {required && <span className="text-gold-dark"> *</span>}
      </label>
      {control}
      {error && (
        <p id={errorId} className="mt-2 flex items-center gap-2 text-sm font-semibold text-gold-dark">
          <AlertCircle aria-hidden="true" className="h-4 w-4" />
          {error}
        </p>
      )}
    </div>
  );
};
