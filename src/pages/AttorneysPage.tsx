import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { AttorneyCard } from '../components/cards/AttorneyCard';
import { AttorneyProfileModal } from '../components/common/AttorneyProfileModal';
import { PageHero } from '../components/common/PageHero';
import { attorneys, images, practiceAreas } from '../data/site';
import type { Attorney, AttorneyLevel } from '../types';

const roleFilters: Array<'All Attorneys' | AttorneyLevel> = [
  'All Attorneys',
  'Partner',
  'Counsel',
  'Associate',
];

export const AttorneysPage = () => {
  const [role, setRole] = useState<(typeof roleFilters)[number]>('All Attorneys');
  const [query, setQuery] = useState('');
  const [practice, setPractice] = useState('All Practice Areas');
  const [selectedAttorney, setSelectedAttorney] = useState<Attorney | null>(null);

  const filteredAttorneys = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return attorneys.filter((attorney) => {
      const roleMatch =
        role === 'All Attorneys' ||
        attorney.position === role ||
        (role === 'Partner' && attorney.position.includes('Partner'));
      const queryMatch = attorney.name.toLowerCase().includes(normalizedQuery);
      const practiceMatch =
        practice === 'All Practice Areas' ||
        attorney.practices.includes(practice) ||
        attorney.practiceArea === practice;

      return roleMatch && queryMatch && practiceMatch;
    });
  }, [practice, query, role]);

  return (
    <>
      <PageHero
        eyebrow="Attorneys"
        title="Lummina Lawyers in Lagos."
        description="Meet the Lummina lawyers combining legal knowledge, commercial awareness and practical judgment across business, disputes, transactions and private client matters."
        image={images.conference}
      />

      <section className="cream-section py-20">
        <div className="container-shell">
          <div className="border-b border-light-line pb-7">
            <div className="flex flex-wrap gap-3" role="tablist" aria-label="Attorney role filters">
              {roleFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  role="tab"
                  aria-selected={role === filter}
                  onClick={() => setRole(filter)}
                className={`rounded-[2px] border px-5 py-3 text-sm font-bold transition ${
                    role === filter
                      ? 'border-gold bg-gold text-navy shadow-gold'
                      : 'border-light-line bg-white/70 text-ink/72 hover:border-gold-dark hover:bg-white hover:text-gold-dark'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_20rem]">
            <label className="relative block">
              <span className="text-sm font-bold text-ink">Search by attorney name</span>
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute bottom-4 left-4 h-5 w-5 text-ink/40"
              />
              <input
                id="attorney-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="mt-2 min-h-[3.25rem] w-full rounded-[2px] border border-light-line bg-white/80 py-4 pl-12 pr-4 text-ink outline-none transition focus:border-gold"
                placeholder="Search attorneys"
              />
            </label>
            <label className="block">
              <span className="text-sm font-bold text-ink">Filter by practice area</span>
              <select
                id="practice-filter"
                value={practice}
                onChange={(event) => setPractice(event.target.value)}
                className="mt-2 min-h-[3.25rem] w-full rounded-[2px] border border-light-line bg-white/80 px-4 py-4 text-ink outline-none transition focus:border-gold"
              >
                <option>All Practice Areas</option>
                {practiceAreas.map((area) => (
                  <option key={area.id}>{area.title}</option>
                ))}
              </select>
            </label>
          </div>

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
              No attorneys match those filters.
            </p>
          )}
        </div>
      </section>

      <AttorneyProfileModal attorney={selectedAttorney} onClose={() => setSelectedAttorney(null)} />
    </>
  );
};
