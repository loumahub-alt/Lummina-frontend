import { useEffect, useRef } from 'react';
import { Linkedin, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import type { Attorney } from '../../types';
import { detailIconMap } from '../../utils/icons';

type AttorneyProfileModalProps = {
  attorney: Attorney | null;
  onClose: () => void;
};

export const AttorneyProfileModal = ({ attorney, onClose }: AttorneyProfileModalProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!attorney) return;

    document.body.classList.add('modal-open');
    closeButtonRef.current?.focus();

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEscape);
    const handleTab = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const focusable = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleTab);
    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTab);
    };
  }, [attorney, onClose]);

  if (!attorney) {
    return null;
  }

  const EducationIcon = detailIconMap.education;
  const AdmissionsIcon = detailIconMap.admissions;
  const PracticesIcon = detailIconMap.practices;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="attorney-modal-title"
      className="fixed inset-0 z-[70] overflow-y-auto bg-wine/82 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div className="flex min-h-full items-start justify-center sm:items-center">
        <div
          ref={dialogRef}
          className="my-4 max-h-[calc(100vh-2rem)] w-full max-w-5xl overflow-y-auto rounded-[2px] border border-light-line bg-cream text-ink shadow-luxe sm:my-8 sm:max-h-[calc(100vh-4rem)]"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="grid lg:grid-cols-[0.42fr_0.58fr]">
            <div className="relative h-[360px] bg-navy sm:h-[440px] lg:h-[560px]">
              {attorney.portrait ? <img
                src={attorney.portrait}
                alt={`${attorney.name}, ${attorney.position}`}
                width={520}
                height={640}
                loading="lazy"
                className="h-full w-full object-contain object-top"
              /> : <div className="grid h-full place-items-center text-xs font-bold uppercase tracking-[0.12em] text-gold-dark">No photo</div>}
            </div>
            <div className="p-7 md:p-10">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-gold-dark">
                    {attorney.position}
                  </p>
                  <h2 id="attorney-modal-title" className="mt-3 font-serif text-5xl font-medium">
                    {attorney.name}
                  </h2>
                  {(attorney.practiceArea || attorney.location) && <p className="mt-3 font-semibold text-ink/70">{[attorney.practiceArea, attorney.location].filter(Boolean).join(' | ')}</p>}
                </div>
                <button
                  type="button"
                  aria-label="Close attorney profile"
                  ref={closeButtonRef}
                  onClick={onClose}
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[2px] border border-light-line bg-white/70 text-ink transition hover:border-gold-dark hover:text-gold-dark"
                >
                  <X aria-hidden="true" className="h-5 w-5" />
                </button>
              </div>

              {attorney.shortBio && <p className="mt-7 text-lg font-semibold leading-8 text-ink/80">{attorney.shortBio}</p>}
              <p className={attorney.shortBio ? 'mt-3 leading-8 text-ink/76' : 'mt-7 leading-8 text-ink/76'}>{attorney.bio}</p>

              {(attorney.education.length > 0 || attorney.admissions.length > 0 || attorney.practices.length > 0) && <div className="mt-8 grid gap-6 md:grid-cols-3">
                {attorney.education.length > 0 && <ProfileList icon={EducationIcon} title="Education" items={attorney.education} />}
                {attorney.admissions.length > 0 && <ProfileList icon={AdmissionsIcon} title="Admissions" items={attorney.admissions} />}
                {attorney.practices.length > 0 && <ProfileList icon={PracticesIcon} title="Practices" items={attorney.practices} />}
              </div>}

              {(attorney.email || attorney.linkedin) && <div className="mt-8 flex items-center gap-5 border-t border-light-line pt-6 text-sm leading-7 text-ink/76">
                {attorney.email && <a href={`mailto:${attorney.email}`} className="font-bold text-gold-dark hover:text-ink">{attorney.email}</a>}
                {attorney.linkedin && <a href={attorney.linkedin} target="_blank" rel="noreferrer" aria-label={`${attorney.name} on LinkedIn`} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-light-line bg-white/70 text-gold-dark transition hover:border-gold-dark hover:text-ink"><Linkedin aria-hidden="true" className="h-4 w-4" /></a>}
              </div>}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

type ProfileListProps = {
  icon: typeof detailIconMap.education;
  title: string;
  items: string[];
};

const ProfileList = ({ icon: Icon, title, items }: ProfileListProps) => (
  <div>
    <Icon aria-hidden="true" className="h-6 w-6 text-gold-dark" />
    <h3 className="mt-3 text-sm font-extrabold uppercase tracking-[0.12em]">{title}</h3>
    <ul className="mt-3 space-y-2 text-sm leading-6 text-ink/68">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
);
