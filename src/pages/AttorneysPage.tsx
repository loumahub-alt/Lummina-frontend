import { useMemo, useState } from 'react';
import { Filter, Search } from 'lucide-react';
import { AttorneyCard } from '../components/cards/AttorneyCard';
import { AttorneyProfileModal } from '../components/common/AttorneyProfileModal';
import { PageHero } from '../components/common/PageHero';
import { images } from '../data/site';
import { contentAssetFromRecord } from '../utils/contentAssets';
import { usePublishedCollection } from '../hooks/usePublishedContent';
import type { Attorney } from '../types';

export const AttorneysPage = () => {
  const [role, setRole] = useState('all');
  const [practiceArea, setPracticeArea] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedAttorney, setSelectedAttorney] = useState<Attorney | null>(null);
  const publishedRecords = usePublishedCollection('team');
  const team = useMemo(() => {
    // Team profiles are fully CMS-owned. Missing fields must stay empty
    // instead of being filled from bundled sample profiles.
    if (publishedRecords === null) return [];

    return publishedRecords.map((record, index) => {
      const slug = typeof record.slug === 'string' ? record.slug : String(record.id ?? record._id ?? record.fullName ?? index);
      const contact = record.contact && typeof record.contact === 'object'
        ? record.contact as Record<string, unknown>
        : {};
      const photo = contentAssetFromRecord(record, 'photo');
      const interests = Array.isArray(record.practiceInterests)
        ? record.practiceInterests.filter((item): item is string => typeof item === 'string')
        : [];
      const education = Array.isArray(record.education)
        ? record.education.filter((item): item is string => typeof item === 'string')
        : [];
      const admissions = Array.isArray(record.admissions)
        ? record.admissions.filter((item): item is string => typeof item === 'string')
        : [];

      return {
        id: slug,
        name: typeof record.fullName === 'string' ? record.fullName : '',
        position: (typeof record.role === 'string' ? record.role : '') as Attorney['position'],
        shortBio: typeof record.shortBio === 'string' ? record.shortBio : '',
        practiceArea: interests.join(', '),
        location: typeof record.location === 'string' ? record.location : '',
        bio: typeof record.fullBio === 'string' ? record.fullBio : '',
        education,
        admissions,
        practices: interests,
        email: typeof contact.email === 'string' ? contact.email : '',
        linkedin: typeof contact.linkedin === 'string' ? contact.linkedin : '',
        portrait: photo.url,
      };
    });
  }, [publishedRecords]);
  const roleFilters = useMemo(() => Array.from(new Set(team.map((attorney) => attorney.position.trim()).filter(Boolean))).sort(), [team]);
  const practiceAreaFilters = useMemo(
    () => Array.from(new Set(team.flatMap((attorney) => attorney.practices))).filter(Boolean).sort(),
    [team],
  );

  const filteredAttorneys = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return team.filter((attorney) => {
      const roleMatch =
        role === 'all' ||
        attorney.position === role;
      const practiceAreaMatch =
        practiceArea === 'all' ||
        attorney.practices.includes(practiceArea);
      const searchText = [attorney.name, attorney.position, ...attorney.practices].join(' ').toLowerCase();
      const queryMatch = searchText.includes(normalizedQuery);

      return roleMatch && practiceAreaMatch && queryMatch;
    });
  }, [practiceArea, query, role, team]);

  return (
    <>
      <PageHero
        eyebrow="Our Team"
        title="The People Behind the Work."
        description="Our lawyers bring together legal expertise, commercial awareness and experience across corporate, regulatory, transactional and contentious matters."
        image={images.conference}
      />

      <section className="cream-section py-20">
        <div className="container-shell">
          <div className="border-b border-light-line pb-7">
            <div className="flex flex-wrap gap-3" role="tablist" aria-label="Team role filters">
              {[{ value: 'all', label: 'All Team Members' }, ...roleFilters.map((filter) => ({ value: filter, label: filter }))].map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  role="tab"
                  aria-selected={role === filter.value}
                  onClick={() => setRole(filter.value)}
                  className={`rounded-[2px] border px-5 py-3 text-sm font-bold transition ${
                    role === filter.value
                      ? 'border-gold bg-gold text-navy'
                      : 'border-light-line bg-white/70 text-ink/72 hover:border-gold-dark hover:bg-white hover:text-gold-dark'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid max-w-4xl gap-5 md:grid-cols-[minmax(0,1.2fr)_minmax(15rem,0.8fr)]">
            <label className="relative block">
              <span className="text-sm font-bold text-ink">Search by name, role or practice area</span>
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute bottom-4 left-4 h-5 w-5 text-ink/40"
              />
              <input
                id="attorney-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="mt-2 min-h-[3.25rem] w-full rounded-[2px] border border-light-line bg-white/80 py-4 pl-12 pr-4 text-ink outline-none transition focus:border-gold"
                placeholder="Search the team directory"
              />
            </label>
            <label className="relative block">
              <span className="text-sm font-bold text-ink">Filter by practice area</span>
              <Filter aria-hidden="true" className="pointer-events-none absolute bottom-4 left-4 h-5 w-5 text-ink/40" />
              <select
                value={practiceArea}
                onChange={(event) => setPracticeArea(event.target.value)}
                className="mt-2 min-h-[3.25rem] w-full rounded-[2px] border border-light-line bg-white/80 py-4 pl-12 pr-4 text-ink outline-none transition focus:border-gold"
              >
                <option value="all">All practice areas</option>
                {practiceAreaFilters.map((filter) => <option key={filter} value={filter}>{filter}</option>)}
              </select>
            </label>
          </div>

          <p className="mt-5 text-sm text-ink/60" aria-live="polite">
            Showing {filteredAttorneys.length} {filteredAttorneys.length === 1 ? 'team member' : 'team members'}
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {filteredAttorneys.map((attorney) => (
              <AttorneyCard
                key={attorney.id}
                attorney={attorney}
                onViewProfile={setSelectedAttorney}
              />
            ))}
          </div>

          {filteredAttorneys.length === 0 && (
            <p className="mt-10 rounded-[2px] border border-light-line bg-white/80 p-8 text-center text-ink/72">
              No team members match those filters.
            </p>
          )}
        </div>
      </section>

      <AttorneyProfileModal attorney={selectedAttorney} onClose={() => setSelectedAttorney(null)} />
    </>
  );
};
