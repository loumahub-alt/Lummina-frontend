import { useEffect } from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import type { Attorney } from '../../types';
import { detailIconMap } from '../../utils/icons';
import { images } from '../../data/site';

type AttorneyProfileModalProps = {
  attorney: Attorney | null;
  onClose: () => void;
};

export const AttorneyProfileModal = ({ attorney, onClose }: AttorneyProfileModalProps) => {
  useEffect(() => {
    if (!attorney) return;

    document.body.classList.add('modal-open');

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', handleEscape);
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
          className="my-4 w-full max-w-5xl overflow-hidden rounded-[2px] border border-light-line bg-cream text-ink shadow-luxe sm:my-8"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="grid lg:grid-cols-[0.42fr_0.58fr]">
            <div className="relative min-h-[420px] bg-navy">
              <img
                src={attorney.portrait}
                alt={`${attorney.name}, ${attorney.position}`}
                onError={(event) => {
                  event.currentTarget.src = images.team.src;
                }}
                className="h-full w-full object-cover object-top"
              />
            </div>
            <div className="p-7 md:p-10">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-gold">
                    {attorney.position}
                  </p>
                  <h2 id="attorney-modal-title" className="mt-3 font-serif text-5xl font-medium">
                    {attorney.name}
                  </h2>
                  <p className="mt-3 font-semibold text-ink/70">
                    {attorney.practiceArea} | {attorney.location}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Close attorney profile"
                  onClick={onClose}
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[2px] border border-light-line bg-white/70 text-ink transition hover:border-gold hover:text-gold"
                >
                  <X aria-hidden="true" className="h-5 w-5" />
                </button>
              </div>

              <p className="mt-7 leading-8 text-ink/76">{attorney.bio}</p>

              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <ProfileList icon={EducationIcon} title="Education" items={attorney.education} />
                <ProfileList icon={AdmissionsIcon} title="Admissions" items={attorney.admissions} />
                <ProfileList icon={PracticesIcon} title="Practices" items={attorney.practices} />
              </div>

              <div className="mt-8 border-t border-light-line pt-6 text-sm leading-7 text-ink/76">
                <a href={`mailto:${attorney.email}`} className="font-bold text-gold hover:text-ink">
                  {attorney.email}
                </a>
              </div>
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
    <Icon aria-hidden="true" className="h-6 w-6 text-gold" />
    <h3 className="mt-3 text-sm font-extrabold uppercase tracking-[0.12em]">{title}</h3>
    <ul className="mt-3 space-y-2 text-sm leading-6 text-ink/68">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
);
