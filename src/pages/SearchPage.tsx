import { FormEvent, useMemo, useState } from 'react';
import { ArrowRight, Search as SearchIcon } from 'lucide-react';
import { usePublishedCollection } from '../hooks/usePublishedContent';
import { hasAnalyticsConsent, trackEvent } from '../utils/analytics';
import { TransitionLink } from '../components/transitions';

type SearchResult = {
  id: string;
  type: string;
  title: string;
  excerpt: string;
  href: string;
  searchText: string;
};

const text = (value: unknown) => typeof value === 'string' ? value.trim() : '';
const firstText = (record: Record<string, unknown>, keys: string[]) => keys.map((key) => text(record[key])).find(Boolean) ?? '';
const listText = (value: unknown) => Array.isArray(value) ? value.map(text).filter(Boolean).join(' ') : '';
const dateText = (value: unknown) => {
  const date = new Date(String(value ?? ''));
  return Number.isNaN(date.valueOf()) ? '' : date.toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' });
};

const recordId = (record: Record<string, unknown>, fallback: string) => text(record.slug) || text(record.id) || text(record._id) || fallback;

const searchEntries = (
  practiceAreas: Record<string, unknown>[],
  team: Record<string, unknown>[],
  results: Record<string, unknown>[],
  insights: Record<string, unknown>[],
): SearchResult[] => [
  ...practiceAreas.map((record, index) => {
    const id = recordId(record, 'practice-area-' + index);
    const title = firstText(record, ['title', 'name']);
    const excerpt = firstText(record, ['shortDescription', 'fullDescription']);
    return { id, type: 'Practice Area', title, excerpt, href: '/practice-areas#' + id, searchText: [title, excerpt, listText(record.services)].join(' ') };
  }),
  ...team.map((record, index) => {
    const id = recordId(record, 'team-member-' + index);
    const title = firstText(record, ['fullName', 'name']);
    const excerpt = firstText(record, ['shortBio', 'fullBio']);
    return { id, type: 'Team Member', title, excerpt, href: '/our-team', searchText: [title, excerpt, record.role, record.location, listText(record.practiceInterests)].map(text).join(' ') };
  }),
  ...results.map((record, index) => {
    const id = recordId(record, 'result-' + index);
    const title = firstText(record, ['title', 'name']);
    const excerpt = firstText(record, ['shortDescription', 'matterDescription']);
    return { id, type: 'Result', title, excerpt, href: '/results#' + id, searchText: [title, excerpt, record.category, record.jurisdiction].map(text).join(' ') };
  }),
  ...insights.map((record, index) => {
    const id = recordId(record, 'insight-' + index);
    const title = firstText(record, ['title', 'name']);
    const excerpt = firstText(record, ['excerpt', 'content']);
    const isNewsletter = text(record.type).toLowerCase() === 'newsletter';
    return { id, type: isNewsletter ? 'Newsletter' : 'Insight', title, excerpt, href: '/insights/' + id, searchText: [title, excerpt, record.type, record.publishedAt, dateText(record.publishedAt)].map(text).join(' ') };
  }),
].filter((entry) => entry.title);

const createSearchId = () => typeof crypto.randomUUID === 'function'
  ? crypto.randomUUID()
  : Date.now() + '-' + Math.random().toString(36).slice(2);

export const SearchPage = () => {
  const practiceAreas = usePublishedCollection('practice-areas');
  const team = usePublishedCollection('team');
  const results = usePublishedCollection('results');
  const insights = usePublishedCollection('insights');
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [searchId, setSearchId] = useState('');

  const ready = practiceAreas !== null && team !== null && results !== null && insights !== null;
  const entries = useMemo(() => ready ? searchEntries(practiceAreas, team, results, insights) : [], [insights, practiceAreas, ready, results, team]);
  const matches = useMemo(() => {
    const normalized = submittedQuery.toLowerCase();
    if (!normalized) return [];
    return entries
      .filter((entry) => entry.searchText.toLowerCase().includes(normalized))
      .sort((a, b) => {
        const aTitle = a.title.toLowerCase().startsWith(normalized) ? 1 : 0;
        const bTitle = b.title.toLowerCase().startsWith(normalized) ? 1 : 0;
        return bTitle - aTitle;
      });
  }, [entries, submittedQuery]);

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextQuery = query.trim();
    if (!nextQuery) {
      setSubmittedQuery('');
      setSearchId('');
      return;
    }
    const nextSearchId = createSearchId();
    const nextMatches = entries.filter((entry) => entry.searchText.toLowerCase().includes(nextQuery.toLowerCase()));
    setSubmittedQuery(nextQuery);
    setSearchId(nextSearchId);
    trackEvent('site_search', { query: nextQuery, resultCount: nextMatches.length, searchId: nextSearchId });
  };

  return (
    <>
      <section className="luxury-dark border-b border-dark-line py-20 md:py-28">
        <div className="container-shell">
          <p className="eyebrow text-gold-bright">Search Lummina</p>
          <h1 className="serif-heading mt-5 max-w-3xl text-5xl md:text-7xl">Find legal insight with clarity.</h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 md:text-lg">Search published practice areas, team profiles, representative results and insights from Lummina Law Firm.</p>
          <form onSubmit={submitSearch} className="mt-10 flex max-w-3xl flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="site-search">Search published content</label>
            <div className="relative flex-1">
              <SearchIcon aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink/45" />
              <input id="site-search" value={query} onChange={(event) => setQuery(event.target.value)} disabled={!ready} placeholder={ready ? 'Search legal services, people or insights' : 'Loading published content…'} className="min-h-14 w-full rounded-[2px] border border-white/15 bg-white px-12 py-4 text-ink outline-none focus:border-gold" />
            </div>
            <button type="submit" disabled={!ready || !query.trim()} className="inline-flex min-h-14 items-center justify-center gap-3 border border-orange/80 bg-gold px-6 py-4 text-xs font-extrabold uppercase tracking-[0.1em] text-bordeaux disabled:cursor-not-allowed disabled:opacity-50"><SearchIcon className="h-4 w-4" />Search</button>
          </form>
          {!hasAnalyticsConsent() && <p className="mt-4 text-xs text-white/55">Search results work normally.</p>}
        </div>
      </section>

      <section className="cream-section min-h-[28rem] py-16 md:py-20">
        <div className="container-shell max-w-5xl">
          {!submittedQuery && <div className="rounded-[2px] border border-light-line bg-white/65 p-8 text-center text-ink/60">Enter a search term to explore.</div>}
          {submittedQuery && <div className="flex flex-col gap-3 border-b border-light-line pb-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow text-gold-dark">Search results</p><h2 className="mt-2 font-serif text-4xl text-ink">Results for “{submittedQuery}”</h2></div><p className="text-sm text-ink/55">{matches.length} {matches.length === 1 ? 'result' : 'results'}</p></div>}
          {submittedQuery && matches.length > 0 && <div className="mt-8 grid gap-5 md:grid-cols-2">{matches.map((result, index) => <article key={result.type + '-' + result.id} className="luxury-card flex min-w-0 flex-col p-7"><p className="text-xs font-extrabold uppercase tracking-[0.13em] text-gold-dark">{result.type}</p><h3 className="mt-4 font-serif text-3xl leading-tight text-ink">{result.title}</h3>{result.excerpt && <p className="mt-4 line-clamp-4 leading-7 text-ink/70">{result.excerpt}</p>}<TransitionLink to={result.href} onClick={() => trackEvent('search_result_click', { query: submittedQuery, searchId, resultId: result.id, resultType: result.type, resultPosition: index + 1, resultTitle: result.title })} className="group mt-6 inline-flex items-center gap-3 self-start border-b border-gold/70 py-3 text-xs font-extrabold uppercase tracking-[0.1em] text-gold-dark">View result<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></TransitionLink></article>)}</div>}
          {submittedQuery && matches.length === 0 && <div className="mt-8 rounded-[2px] border border-light-line bg-white/65 p-8"><h2 className="font-serif text-3xl text-ink">No published content matched that search.</h2><p className="mt-3 max-w-2xl leading-7 text-ink/65">Try a practice area, legal service, team member, business topic or insight title.</p></div>}
        </div>
      </section>
    </>
  );
};
