import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, TrendingUp } from 'lucide-react';
import { api, ApiError, type DashboardData } from '../services/api';
import type { AdminRange } from './types';

const surface = 'rounded-[3px] border border-[#5F021F]/10 bg-[#FFF9EF] shadow-[0_14px_45px_rgba(95,2,31,0.07)]';

const rangeDays = (range: AdminRange) => range === '7d' ? 7 : range === '90d' ? 90 : range === 'year' ? 365 : 30;

const Metric = ({ label, value, note }: { label: string; value: string; note: string }) => (
  <article className={surface + ' p-5'}>
    <div className="flex items-start justify-between gap-3">
      <p className="text-xs font-extrabold uppercase tracking-[0.11em] text-ink/50">{label}</p>
      <span className="text-xs font-bold text-[#6B6A24]">Live API</span>
    </div>
    <p className="mt-5 font-serif text-4xl text-bordeaux">{value}</p>
    <p className="mt-2 text-xs text-ink/45">{note}</p>
  </article>
);

const TrafficChart = ({ data }: { data: DashboardData['traffic'] }) => {
  const max = Math.max(...data.map((item) => item.pageViews), 1);
  return (
    <div className="flex h-64 items-end gap-2 border-b border-[#5F021F]/10 px-2 pb-1">
      {data.length ? data.map((item) => (
        <div key={item.date} className="group flex min-w-0 flex-1 flex-col items-center justify-end gap-2">
          <span className="hidden rounded bg-bordeaux px-2 py-1 text-[0.6rem] text-gold-bright group-hover:block">{item.pageViews.toLocaleString()}</span>
          <div className="w-full max-w-8 rounded-t bg-gold transition-all group-hover:bg-gold-dark" style={{ height: ((item.pageViews / max) * 88) + '%' }} />
          <span className="truncate text-[0.58rem] text-ink/40">{item.date.slice(5)}</span>
        </div>
      )) : <p className="w-full pb-20 text-center text-sm text-ink/45">No analytics events have been aggregated for this period.</p>}
    </div>
  );
};

export const LiveDashboard = () => {
  const [range, setRange] = useState<AdminRange>('30d');
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
    setData(null);
    api.admin.dashboard(rangeDays(range)).then(setData).catch((reason) => {
      setError(reason instanceof ApiError ? reason.message : 'Unable to load dashboard analytics.');
    });
  }, [range]);

  if (error) return (
    <div>
      <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-gold-dark">Overview</p>
      <h1 className="mt-3 font-serif text-5xl text-bordeaux">Dashboard unavailable.</h1>
      <p className="mt-3 max-w-2xl leading-7 text-ink/60">The dashboard is connected to the Node.js API, but the current request failed.</p>
      <div className="mt-6 rounded-[3px] border border-red-300/35 bg-red-50 px-5 py-4 text-sm text-red-800">{error}</div>
    </div>
  );

  if (!data) return (
    <div>
      <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-gold-dark">Overview</p>
      <h1 className="mt-3 font-serif text-5xl text-bordeaux">Loading dashboard…</h1>
      <p className="mt-3 leading-7 text-ink/60">Fetching current website intelligence from the Node.js analytics API.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">{Array.from({ length: 5 }).map((_, index) => <div key={index} className={surface + ' h-36 animate-pulse bg-white/40'} />)}</div>
    </div>
  );

  const metrics = data.metrics;
  const percentage = (value: number, total: number) => total ? ((value / total) * 100).toFixed(1) : '0.0';
  const formatDuration = (seconds: number) => Math.floor(seconds / 60) + 'm ' + (seconds % 60) + 's';

  return (
    <div>
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-gold-dark">Overview</p>
          <h1 className="mt-3 font-serif text-4xl leading-tight text-bordeaux md:text-5xl">Good afternoon, Faith.</h1>
          <p className="mt-3 max-w-2xl leading-7 text-ink/60">Here’s how Lummina’s website is performing from current server-side analytics.</p>
        </div>
        <div className="inline-flex flex-wrap rounded-[2px] border border-[#5F021F]/12 bg-white/55 p-1">
          {(['7d', '30d', '90d', 'year'] as AdminRange[]).map((item) => <button type="button" key={item} onClick={() => setRange(item)} className={'rounded-[2px] px-3 py-2 text-xs font-bold ' + (range === item ? 'bg-bordeaux text-gold-bright' : 'text-ink/55')}>{item === 'year' ? '1Y' : item.toUpperCase()}</button>)}
        </div>
      </div>
      <div className="mb-5 flex items-center gap-2 rounded-[2px] border border-[#6B6A24]/25 bg-[#6B6A24]/10 px-4 py-3 text-sm text-[#53541B]"><Check className="h-4 w-4" />Live data from Node.js · {data.period.days} days</div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <Metric label="Website visitors" value={metrics.websiteVisitors.toLocaleString()} note="unique visitor IDs" />
        <Metric label="Page views" value={metrics.pageViews.toLocaleString()} note="recorded views" />
        <Metric label="Consultation requests" value={metrics.consultationRequests.toLocaleString()} note="submitted enquiries" />
        <Metric label="Conversion rate" value={metrics.conversionRate + '%'} note="requests / visitors" />
        <Metric label="Avg. engagement time" value={formatDuration(metrics.averageEngagementSeconds)} note="per page view" />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.55fr_1fr]">
        <section className={surface + ' p-6'}>
          <div className="flex items-start justify-between"><div><p className="text-xs font-extrabold uppercase tracking-[0.13em] text-gold-dark">Performance signal</p><h2 className="mt-2 font-serif text-3xl text-bordeaux">Website traffic</h2></div><TrendingUp className="h-5 w-5 text-gold-dark" /></div>
          <div className="mt-6"><TrafficChart data={data.traffic} /></div>
        </section>
        <section className={surface + ' p-6'}>
          <div className="flex items-start justify-between"><div><p className="text-xs font-extrabold uppercase tracking-[0.13em] text-gold-dark">Content attention</p><h2 className="mt-2 font-serif text-3xl text-bordeaux">Most visited pages</h2></div><Link to="/admin/analytics/pages" className="text-xs font-bold text-gold-dark">View all</Link></div>
          <div className="mt-6 space-y-5">{data.mostVisitedPages.slice(0, 5).map((page) => <div key={page.page}><div className="flex items-center justify-between text-sm"><span className="font-bold text-ink/75">{page.page}</span><span className="font-bold text-bordeaux">{percentage(page.views, metrics.pageViews)}%</span></div><div className="mt-2 h-2 rounded-full bg-[#5F021F]/8"><div className="h-2 rounded-full bg-gold" style={{ width: percentage(page.views, Math.max(...data.mostVisitedPages.map((item) => item.views), 1)) + '%' }} /></div></div>)}</div>
        </section>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr_1.05fr]">
        <section className={surface + ' p-6'}><p className="text-xs font-extrabold uppercase tracking-[0.13em] text-gold-dark">Visitor interest</p><h2 className="mt-2 font-serif text-3xl text-bordeaux">What clients explore</h2><div className="mt-6 space-y-4">{data.visitorInterest.length ? data.visitorInterest.slice(0, 6).map((item) => <div key={item.practiceAreaId}><div className="flex justify-between gap-3 text-sm"><span className="truncate text-ink/70">{item.practiceAreaTitle ?? item.practiceAreaId}</span><span className="shrink-0 font-bold text-bordeaux">{item.views.toLocaleString()}</span></div><div className="mt-2 h-1.5 rounded-full bg-[#5F021F]/8"><div className="h-1.5 rounded-full bg-gold" style={{ width: percentage(item.views, Math.max(...data.visitorInterest.map((entry) => entry.views), 1)) + '%' }} /></div></div>) : <p className="mt-6 text-sm text-ink/45">Visitor interest will appear after consented practice-area events are collected.</p>}</div></section>
        <section className={surface + ' bg-bordeaux p-6 text-white'}><p className="text-xs font-extrabold uppercase tracking-[0.13em] text-gold-bright">Opportunities</p><h2 className="mt-2 font-serif text-3xl">Signals worth discussing.</h2><div className="mt-6 space-y-5">{data.opportunities.length ? data.opportunities.map((item) => <div key={item.title} className="border-t border-champagne/15 pt-4"><p className="font-bold text-gold-bright">{item.title}</p><p className="mt-2 text-sm leading-6 text-champagne/65">{item.description}</p></div>) : <p className="border-t border-champagne/15 pt-4 text-sm leading-6 text-champagne/65">More data is required before measurable opportunities can be calculated.</p>}</div></section>
        <section className={surface + ' p-6'}><div className="flex items-start justify-between"><div><p className="text-xs font-extrabold uppercase tracking-[0.13em] text-gold-dark">Audit trail</p><h2 className="mt-2 font-serif text-3xl text-bordeaux">Recent consultations</h2></div><Link to="/admin/consultations" className="text-xs font-bold text-gold-dark">Open list</Link></div><div className="mt-5 space-y-4">{data.recentConsultations.length ? data.recentConsultations.map((item) => <div key={item.reference} className="border-t border-[#5F021F]/8 pt-4"><p className="text-sm font-bold text-bordeaux">{item.reference}</p><p className="mt-1 text-xs uppercase tracking-[0.08em] text-ink/45">{item.status}</p></div>) : <p className="mt-5 text-sm text-ink/45">No consultation requests have been recorded.</p>}</div></section>
      </div>
    </div>
  );
};
