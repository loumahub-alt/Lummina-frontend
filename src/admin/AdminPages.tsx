import { FormEvent, useEffect, useMemo, useState, type ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api, ApiError } from '../services/api';
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Check,
  ChevronRight,
  Clock3,
  Download,
  Eye,
  FilePlus2,
  Filter,
  LockKeyhole,
  Mail,
  MapPin,
  MessageSquare,
  MoreHorizontal,
  PenLine,
  Plus,
  Save,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserPlus,
  Users,
} from 'lucide-react';
import {
  activities,
  adminMetrics,
  adminStore,
  contactPreview,
  pageTraffic,
  seoRows,
  serviceInterest,
  trafficPoints,
} from './services/adminStore';
import type { AdminContentRow, AdminRange } from './types';

const surface = 'rounded-[3px] border border-[#5F021F]/10 bg-[#FFF9EF] shadow-[0_14px_45px_rgba(95,2,31,0.07)]';
const input = 'mt-2 min-h-11 w-full rounded-[2px] border border-[#5F021F]/15 bg-white/70 px-3 text-sm text-ink outline-none transition focus:border-gold';

export const AdminLogin = ({ onAuthenticated }: { onAuthenticated?: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      await adminStore.login(email, password, false);
      onAuthenticated?.();
      setLoading(false);
      navigate('/admin', { replace: true });
    } catch (error) {
      setLoading(false);
      setError(error instanceof ApiError ? error.message : 'Unable to verify access. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#3A0013] text-white">
      <div className="grid min-h-screen lg:grid-cols-[0.9fr_1.1fr]">
        <section className="relative hidden overflow-hidden border-r border-champagne/10 lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,189,61,0.16),transparent_34%),linear-gradient(145deg,#5F021F,#25000C)]" />
          <div className="relative flex h-full flex-col justify-between p-12 xl:p-20">
            <div><p className="text-xs font-extrabold uppercase tracking-[0.18em] text-gold-bright">Lummina Law Firm</p><div className="mt-10 h-px w-16 bg-gold-bright" /></div>
            <div className="max-w-lg"><p className="font-serif text-6xl leading-[0.98] text-white xl:text-7xl">Clarity for the decisions behind the business.</p><p className="mt-7 max-w-md text-base leading-8 text-champagne/70">A private operating view of Lummina’s digital presence, client interest and published legal thinking.</p></div>
            <p className="text-xs uppercase tracking-[0.15em] text-champagne/45">Administrative portal · 2026</p>
          </div>
        </section>
        <section className="flex items-center justify-center px-5 py-12 sm:px-10">
          <div className="w-full max-w-md">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-gold-bright">Administrative Portal</p>
            <h1 className="mt-5 font-serif text-5xl leading-tight text-white">Welcome back.</h1>
            <p className="mt-4 leading-7 text-champagne/65">Sign in to manage Lummina’s website and understand what clients are looking for.</p>
            <form onSubmit={submit} className="mt-10 space-y-5">
              <label className="block text-sm font-bold text-champagne">Email address<input required autoComplete="username" type="email" value={email} onChange={(event) => setEmail(event.target.value)} className={`${input} border-champagne/20 bg-champagne/5 text-white placeholder:text-champagne/35`} placeholder="name@lummina.com" /></label>
              <label className="block text-sm font-bold text-champagne">Password<div className="relative"><input required minLength={6} autoComplete="current-password" type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} className={`${input} border-champagne/20 bg-champagne/5 pr-20 text-white placeholder:text-champagne/35`} placeholder="Enter your password" /><button type="button" onClick={() => setShowPassword((current) => !current)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gold-bright">{showPassword ? 'Hide' : 'Show'}</button></div></label>
              {error && <p role="alert" className="rounded-[2px] border border-red-300/30 bg-red-300/10 px-4 py-3 text-sm text-red-100">{error}</p>}
              <label className="flex items-center gap-3 text-sm text-champagne/65"><input type="checkbox" className="h-4 w-4 accent-gold" /> Remember this device</label>
              <button disabled={loading} className="inline-flex min-h-12 w-full items-center justify-center gap-3 border border-orange/80 bg-gold px-6 py-3 text-xs font-extrabold uppercase tracking-[0.1em] text-bordeaux transition hover:bg-gold-bright disabled:opacity-60">{loading ? 'Verifying access…' : 'Sign in'}<ChevronRight className="h-4 w-4" /></button>
            </form>
            <div className="mt-8 flex items-center justify-between border-t border-champagne/10 pt-6 text-xs text-champagne/50"><span className="inline-flex items-center gap-2"><LockKeyhole className="h-3.5 w-3.5" /> Protected workspace</span><button type="button" className="text-gold-bright hover:text-white">Forgot password?</button></div>
            <p className="mt-8 text-center text-xs leading-5 text-champagne/35">Authentication is handled by the secure Node.js session API. Your access is never stored in the browser.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

const PageHeader = ({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: ReactNode }) => (
  <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
    <div><p className="text-xs font-extrabold uppercase tracking-[0.16em] text-gold-dark">{eyebrow}</p><h1 className="mt-3 font-serif text-4xl leading-tight text-bordeaux md:text-5xl">{title}</h1><p className="mt-3 max-w-2xl leading-7 text-ink/60">{description}</p></div>
    {action}
  </div>
);

const MetricCard = ({ label, value, change, description, trend }: (typeof adminMetrics)[number]) => (
  <article className={`${surface} p-5`}><div className="flex items-start justify-between gap-3"><p className="text-xs font-extrabold uppercase tracking-[0.11em] text-ink/50">{label}</p><span className={`inline-flex items-center gap-1 text-xs font-bold ${trend === 'down' ? 'text-red-700' : 'text-[#6B6A24]'}`}>{trend === 'down' ? <ArrowDownRight className="h-3.5 w-3.5" /> : <ArrowUpRight className="h-3.5 w-3.5" />}{change}</span></div><p className="mt-5 font-serif text-4xl text-bordeaux">{value}</p><p className="mt-2 text-xs text-ink/45">{description}</p></article>
);

const RangeSelector = ({ value, onChange }: { value: AdminRange; onChange: (value: AdminRange) => void }) => (
  <div className="inline-flex flex-wrap rounded-[2px] border border-[#5F021F]/12 bg-white/55 p-1">{(['7d', '30d', '90d', 'year', 'custom'] as AdminRange[]).map((range) => <button type="button" key={range} onClick={() => onChange(range)} className={`rounded-[2px] px-3 py-2 text-xs font-bold ${value === range ? 'bg-bordeaux text-gold-bright' : 'text-ink/55 hover:text-bordeaux'}`}>{range === 'year' ? '1Y' : range === 'custom' ? 'Custom' : range.toUpperCase()}</button>)}</div>
);

const LineChart = ({ metric = 'visitors' }: { metric?: 'visitors' | 'pageViews' | 'consultations' }) => {
  const max = Math.max(...trafficPoints.map((point) => point[metric]));
  const points = trafficPoints.map((point, index) => `${(index / (trafficPoints.length - 1)) * 100},${100 - (point[metric] / max) * 78 - 8}`).join(' ');
  return <div className="relative h-64 w-full"><div className="absolute inset-0 flex flex-col justify-between text-[0.62rem] text-ink/30"><span>High</span><span>Medium</span><span>Low</span></div><svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-x-8 inset-y-3 h-[calc(100%-1.5rem)] w-[calc(100%-2rem)] overflow-visible"><line x1="0" x2="100" y1="18" y2="18" stroke="#5F021F" strokeOpacity=".08" /><line x1="0" x2="100" y1="50" y2="50" stroke="#5F021F" strokeOpacity=".08" /><line x1="0" x2="100" y1="82" y2="82" stroke="#5F021F" strokeOpacity=".08" /><polyline points={points} fill="none" stroke="#8A5400" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />{trafficPoints.map((point, index) => <circle key={point.label} cx={(index / (trafficPoints.length - 1)) * 100} cy={100 - (point[metric] / max) * 78 - 8} r="1.8" fill="#FFA500" />)}</svg><div className="absolute inset-x-8 bottom-0 flex justify-between text-[0.62rem] text-ink/35">{trafficPoints.map((point) => <span key={point.label}>{point.label}</span>)}</div></div>;
};

export const PreviewDashboard = () => {
  const [range, setRange] = useState<AdminRange>('30d');
  const [metric, setMetric] = useState<'visitors' | 'pageViews' | 'consultations'>('visitors');
  return <><PageHeader eyebrow="Overview" title="Good afternoon, Faith." description="Here’s how Lummina’s website is performing. Review the signals that matter across content, client interest and consultation intent." action={<RangeSelector value={range} onChange={setRange} />} /><div className="mb-5 flex items-center gap-2 rounded-[2px] border border-gold/25 bg-gold/10 px-4 py-3 text-sm text-gold-dark"><Sparkles className="h-4 w-4" />Preview analytics adapter active — connect the production analytics API to replace sample metrics.</div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">{adminMetrics.map((metricItem) => <MetricCard key={metricItem.label} {...metricItem} />)}</div><div className="mt-6 grid gap-6 xl:grid-cols-[1.55fr_1fr]"><section className={`${surface} p-6`}><div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-extrabold uppercase tracking-[0.13em] text-gold-dark">Performance signal</p><h2 className="mt-2 font-serif text-3xl text-bordeaux">Website traffic</h2></div><div className="flex flex-wrap gap-2">{(['visitors', 'pageViews', 'consultations'] as const).map((key) => <button type="button" onClick={() => setMetric(key)} key={key} className={`rounded-[2px] border px-3 py-2 text-xs font-bold ${metric === key ? 'border-bordeaux bg-bordeaux text-gold-bright' : 'border-[#5F021F]/15 text-ink/55'}`}>{key === 'pageViews' ? 'Page views' : key[0].toUpperCase() + key.slice(1)}</button>)}</div></div><div className="mt-6"><LineChart metric={metric} /></div></section><section className={`${surface} p-6`}><div className="flex items-start justify-between"><div><p className="text-xs font-extrabold uppercase tracking-[0.13em] text-gold-dark">Content attention</p><h2 className="mt-2 font-serif text-3xl text-bordeaux">Most visited pages</h2></div><Link to="/admin/analytics/pages" className="text-xs font-bold text-gold-dark">View all</Link></div><div className="mt-6 space-y-5">{pageTraffic.slice(0, 5).map((page) => <div key={page.page}><div className="flex items-center justify-between text-sm"><span className="font-bold text-ink/75">{page.page}</span><span className="font-bold text-bordeaux">{page.share}%</span></div><div className="mt-2 h-2 rounded-full bg-[#5F021F]/8"><div className="h-2 rounded-full bg-gold" style={{ width: `${page.share * 2.4}%` }} /></div></div>)}</div></section></div><div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr_1.05fr]"><InterestCard /><Opportunities /><RecentActivity /></div></>;
};

const InterestCard = () => <section className={`${surface} p-6`}><p className="text-xs font-extrabold uppercase tracking-[0.13em] text-gold-dark">Visitor interest</p><h2 className="mt-2 font-serif text-3xl text-bordeaux">What clients explore</h2><div className="mt-6 space-y-4">{serviceInterest.map((item) => <div key={item.label}><div className="flex justify-between text-sm"><span className="text-ink/70">{item.label}</span><span className="font-bold text-bordeaux">{item.value}%</span></div><div className="mt-2 h-1.5 rounded-full bg-[#5F021F]/8"><div className={`h-1.5 rounded-full ${item.color}`} style={{ width: `${item.value * 2.35}%` }} /></div></div>)}</div></section>;

const Opportunities = () => <section className={`${surface} bg-bordeaux p-6 text-white`}><p className="text-xs font-extrabold uppercase tracking-[0.13em] text-gold-bright">Opportunities</p><h2 className="mt-2 font-serif text-3xl">Signals worth discussing.</h2><div className="mt-6 space-y-5"><div className="border-t border-champagne/15 pt-4"><p className="font-bold text-gold-bright">Business Law demand is increasing</p><p className="mt-2 text-sm leading-6 text-champagne/65">Business Law represents 31.8% of service-related engagement this period.</p></div><div className="border-t border-champagne/15 pt-4"><p className="font-bold text-gold-bright">Real Estate shows strong intent</p><p className="mt-2 text-sm leading-6 text-champagne/65">Property interest is converting into consultation activity at a higher rate than its traffic share.</p></div><div className="border-t border-champagne/15 pt-4"><p className="font-bold text-gold-bright">Insights are gaining reach</p><p className="mt-2 text-sm leading-6 text-champagne/65">Insights traffic is up 22.1% compared with the previous period.</p></div></div></section>;

const RecentActivity = () => <section className={`${surface} p-6`}><div className="flex items-start justify-between"><div><p className="text-xs font-extrabold uppercase tracking-[0.13em] text-gold-dark">Audit trail</p><h2 className="mt-2 font-serif text-3xl text-bordeaux">Recent activity</h2></div><Link to="/admin/activity" className="text-xs font-bold text-gold-dark">Open log</Link></div><div className="mt-5 space-y-4">{activities.map((activity) => <div key={activity.id} className="flex gap-3 border-t border-[#5F021F]/8 pt-4"><span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${activity.tone === 'gold' ? 'bg-gold' : activity.tone === 'cream' ? 'bg-gold-dark' : 'bg-[#CBB79A]'}`} /><div><p className="text-sm text-ink/75"><strong>{activity.action}</strong> {activity.resource}</p><p className="mt-1 text-xs text-ink/45">{activity.actor} · {activity.time}</p></div></div>)}</div></section>;

export const AnalyticsPage = ({ section = 'traffic' }: { section?: 'traffic' | 'pages' | 'interest' | 'sources' | 'search' | 'consent' }) => {
  const [range, setRange] = useState<AdminRange>('30d');
  if (section === 'pages') return <><PageHeader eyebrow="Analytics / Page Performance" title="Page performance" description="Understand which pages receive attention and how their share is changing." action={<RangeSelector value={range} onChange={setRange} />} /><section className={`${surface} overflow-hidden`}><TableHead labels={['Page', 'Views', 'Traffic share', 'Trend']} />{pageTraffic.map((page) => <div key={page.page} className="grid grid-cols-[1.2fr_.7fr_1fr_.6fr] items-center gap-4 border-t border-[#5F021F]/8 px-5 py-4 text-sm"><span className="font-bold text-bordeaux">{page.page}</span><span>{page.views}</span><span><span className="mr-3 inline-block h-2 w-28 rounded-full bg-[#5F021F]/8 align-middle"><span className="block h-2 rounded-full bg-gold" style={{ width: `${page.share * 2.4}%` }} /></span>{page.share}%</span><span className="font-bold text-[#6B6A24]">{page.trend}</span></div>)}</section></>;
  if (section === 'interest') return <><PageHeader eyebrow="Analytics / Visitor Interest" title="Visitor interest" description="A service-level view of what visitors explore across the public website." action={<RangeSelector value={range} onChange={setRange} />} /><div className="grid gap-6 lg:grid-cols-[1.25fr_.75fr]"><InterestCard /><section className={`${surface} p-6`}><p className="text-xs font-extrabold uppercase tracking-[0.13em] text-gold-dark">Measurement note</p><h2 className="mt-2 font-serif text-3xl text-bordeaux">How interest is calculated</h2><p className="mt-4 leading-7 text-ink/65">Interest combines practice-area views, service-detail engagement, related Insight views and consultation practice-area selections when those data sources are connected.</p><div className="mt-6 space-y-3 text-sm text-ink/70"><p className="flex gap-3"><Check className="h-4 w-4 shrink-0 text-gold-dark" /> Page visits and engagement</p><p className="flex gap-3"><Check className="h-4 w-4 shrink-0 text-gold-dark" /> Consultation intent</p><p className="flex gap-3"><Check className="h-4 w-4 shrink-0 text-gold-dark" /> Related content interest</p></div></section></div></>;
  if (section === 'sources') return <><PageHeader eyebrow="Analytics / Traffic Sources" title="How visitors found Lummina" description="Review acquisition channels and campaign context when the production analytics stream is connected." action={<RangeSelector value={range} onChange={setRange} />} /><section className={`${surface} overflow-hidden`}><div className="grid grid-cols-[1.3fr_.7fr_.7fr] gap-4 bg-[#5F021F]/[.035] px-5 py-3 text-[0.65rem] font-extrabold uppercase tracking-[0.12em] text-ink/45"><span>Source</span><span>Visitors</span><span>Share</span></div>{[['Google Search','5,428','43.5%'],['Direct','3,246','26.0%'],['LinkedIn','1,842','14.8%'],['Referral','1,104','8.8%'],['Instagram','610','4.9%'],['Other','255','2.0%']].map((item) => <div key={item[0]} className="grid grid-cols-[1.3fr_.7fr_.7fr] gap-4 border-t border-[#5F021F]/8 px-5 py-4 text-sm"><span className="font-bold text-bordeaux">{item[0]}</span><span>{item[1]}</span><span className="font-bold text-gold-dark">{item[2]}</span></div>)}</section><div className="mt-6 flex items-center gap-2 rounded-[2px] border border-gold/25 bg-gold/10 px-4 py-3 text-sm text-gold-dark"><Sparkles className="h-4 w-4" />Campaign and UTM fields will appear here once the production event stream is connected.</div></>;
  if (section === 'search') return <><PageHeader eyebrow="Analytics / Search" title="Search analytics" description="Use the live Search Analytics page to review consented search activity from the public website." action={<RangeSelector value={range} onChange={setRange} />} /><section className={`${surface} p-8 text-center`}><p className="text-sm leading-7 text-ink/60">Search Analytics is connected to the live Node.js API and is available from the active administrative analytics route.</p></section></>;
  if (section === 'consent') return <><PageHeader eyebrow="Analytics / Consent" title="Consent analytics" description="Use the active live analytics route to review privacy decisions from the public consent banner." action={<RangeSelector value={range} onChange={setRange} />} /><section className={`${surface} p-8 text-center`}><p className="text-sm leading-7 text-ink/60">Consent Analytics is connected to the live Node.js API and is available from the active administrative analytics route.</p></section></>;
  return <><PageHeader eyebrow="Analytics / Traffic Overview" title="Traffic overview" description="Review audience growth, content attention and consultation intent over time." action={<RangeSelector value={range} onChange={setRange} />} /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[['Nigeria','68.4%'],['United Kingdom','9.2%'],['United States','7.4%'],['Other markets','15.0%']].map((item) => <article key={item[0]} className={`${surface} p-5`}><p className="text-xs font-bold uppercase tracking-[0.1em] text-ink/50">{item[0]}</p><p className="mt-4 font-serif text-4xl text-bordeaux">{item[1]}</p><p className="mt-2 text-xs text-ink/45">Visitor geography</p></article>)}</div><section className={`${surface} mt-6 p-6`}><div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.1em] text-gold-dark">Visitors and views</p><h2 className="mt-2 font-serif text-3xl text-bordeaux">Website traffic</h2></div><div className="text-right text-xs text-ink/45"><p>Desktop 54%</p><p>Mobile 42% · Tablet 4%</p></div></div><div className="mt-5"><LineChart /></div></section></>;
};

const TableHead = ({ labels }: { labels: string[] }) => <div className="hidden grid-cols-[1.2fr_.7fr_.7fr_.7fr] gap-4 bg-[#5F021F]/[.035] px-5 py-3 text-[0.65rem] font-extrabold uppercase tracking-[0.12em] text-ink/45 md:grid">{labels.map((label) => <span key={label}>{label}</span>)}</div>;

const ContentEditor = ({ editor, setEditor, onSave }: { editor: AdminContentRow; setEditor: (value: AdminContentRow | null) => void; onSave: (status: AdminContentRow['status']) => void }) => <div className="fixed inset-0 z-[60] flex items-end justify-center bg-[#170009]/55 p-0 sm:items-center sm:p-6"><div role="dialog" aria-modal="true" aria-labelledby="content-editor-title" className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-[4px] bg-[#FFF9EF] p-6 shadow-[0_18px_70px_rgba(23,0,9,0.25)] sm:rounded-[4px] sm:p-8"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-extrabold uppercase tracking-[0.15em] text-gold-dark">Content editor</p><h2 id="content-editor-title" className="mt-2 font-serif text-3xl text-bordeaux">{editor.id.startsWith('new-') ? 'Create content' : 'Edit content'}</h2></div><button type="button" onClick={() => setEditor(null)} className="text-sm font-bold text-ink/50 hover:text-bordeaux">Close</button></div><div className="mt-7 grid gap-5 sm:grid-cols-2"><label className="block text-sm font-bold sm:col-span-2">Title<input required autoFocus className={input} value={editor.title} onChange={(event) => setEditor({ ...editor, title: event.target.value })} placeholder="Enter a clear public title" /></label><label className="block text-sm font-bold">URL slug<input className={input} value={editor.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')} readOnly /></label><label className="block text-sm font-bold">Content type<select className={input} value={editor.type} onChange={(event) => setEditor({ ...editor, type: event.target.value })}>{!["Practice Area", "Team Member", "Result", "Article", "Publication", "Event", "Testimonial", "Statistic"].includes(editor.type) && <option value={editor.type}>{editor.type}</option>}<option>Practice Area</option><option>Team Member</option><option>Result</option><option>Article</option><option>Publication</option><option>Event</option><option>Testimonial</option><option>Statistic</option></select></label><label className="block text-sm font-bold sm:col-span-2">Short description<textarea className={`${input} min-h-24 py-3`} placeholder="A concise summary for cards and search results" /></label><label className="block text-sm font-bold sm:col-span-2">Full description<textarea className={`${input} min-h-36 py-3`} placeholder="Write the full, semantic content here" /></label><label className="block text-sm font-bold">Publication status<select className={input} value={editor.status} onChange={(event) => setEditor({ ...editor, status: event.target.value as AdminContentRow['status'] })}><option>Draft</option><option>Review</option><option>Published</option></select></label><label className="block text-sm font-bold">Display order<input className={input} type="number" min="0" defaultValue="1" /></label><label className="block text-sm font-bold sm:col-span-2">SEO title<input className={input} placeholder="Search-optimized title" /></label><label className="block text-sm font-bold sm:col-span-2">Meta description<textarea className={`${input} min-h-24 py-3`} placeholder="A clear description for search and social sharing" /></label></div><div className="mt-6 rounded-[3px] border border-gold/25 bg-gold/10 p-4 text-sm text-gold-dark"><TrendingUp className="mr-2 inline h-4 w-4" />Performance panel: connect the production analytics API to show views, visitors, engagement and consultation conversion for this item.</div><div className="mt-7 flex flex-col-reverse gap-3 border-t border-[#5F021F]/10 pt-5 sm:flex-row sm:justify-end"><button type="button" onClick={() => setEditor(null)} className="min-h-11 border border-[#5F021F]/15 px-5 text-xs font-extrabold uppercase tracking-[0.1em] text-bordeaux">Cancel</button><button type="button" onClick={() => onSave('Draft')} className="inline-flex min-h-11 items-center justify-center gap-2 border border-bordeaux px-5 text-xs font-extrabold uppercase tracking-[0.1em] text-bordeaux"><Save className="h-4 w-4" />Save draft</button><button type="button" onClick={() => onSave('Published')} className="inline-flex min-h-11 items-center justify-center gap-2 border border-bordeaux bg-bordeaux px-5 text-xs font-extrabold uppercase tracking-[0.1em] text-gold-bright"><Send className="h-4 w-4" />Publish</button></div></div></div>;

export const ContentPage = ({ kind, title, description }: { kind: string; title: string; description: string }) => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'All' | AdminContentRow['status']>('All');
  const [saved, setSaved] = useState(false);
  const [rows, setRows] = useState<AdminContentRow[]>([]);
  const [editor, setEditor] = useState<AdminContentRow | null>(null);
  const [loadError, setLoadError] = useState('');
  const [saveError, setSaveError] = useState('');
  const resource = kind === 'practiceAreas' ? 'practice-areas' : kind === 'statistics' ? 'statistics' : kind;
  useEffect(() => {
    setLoadError('');
    api.admin.content(resource, '?perPage=100').then((items) => {
      setRows(items.map((item) => ({
        id: String(item._id ?? item.id),
        title: String(item.title ?? item.name ?? item.fullName ?? item.value ?? 'Untitled'),
        type: String(item.category ?? item.role ?? item.type ?? title),
        status: String(item.status ?? 'draft').replace(/^./, (value) => value.toUpperCase()) as AdminContentRow['status'],
        views: String(item.views ?? '—'),
        updated: String(item.updatedAt ?? '—'),
        editor: String(item.updatedBy ?? '—'),
      })));
    }).catch(() => setLoadError('Unable to load this content from the Node.js API.'));
  }, [resource, title]);
  const filtered = useMemo(() => rows.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()) && (status === 'All' || item.status === status)), [query, rows, status]);
  const startNew = () => setEditor({ id: `new-${Date.now()}`, title: '', type: title.replace(/s$/, ''), status: 'Draft', views: '—', updated: '12 Aug 2026', editor: 'Faith Zekeri' });
  const saveEditor = async (nextStatus: AdminContentRow['status']) => {
    if (!editor?.title.trim()) return;
    setSaveError('');
    try {
      const saved = await api.admin.saveContent(resource, { title: editor.title, name: editor.title, fullName: editor.title, slug: editor.title, status: nextStatus.toLowerCase(), displayOrder: 0 }, editor.id.startsWith('new-') ? undefined : editor.id);
      const next = { ...editor, id: String(saved._id ?? saved.id ?? editor.id), status: nextStatus };
      setRows((current) => current.some((item) => item.id === next.id) ? current.map((item) => item.id === next.id ? next : item) : [next, ...current]);
      setEditor(null);
      setSaved(true);
    } catch (error) {
      setSaveError(error instanceof ApiError ? error.message : 'Unable to save this content.');
    }
  };
  return <><PageHeader eyebrow={`Website Content / ${title}`} title={title} description={description} action={<button type="button" onClick={startNew} className="inline-flex min-h-11 items-center gap-2 border border-bordeaux bg-bordeaux px-4 text-xs font-extrabold uppercase tracking-[0.1em] text-gold-bright hover:bg-[#4B0019]"><Plus className="h-4 w-4" />Add {title.replace(/s$/, '')}</button>} />{saved && <div className="mb-5 flex items-center gap-2 rounded-[2px] border border-[#6B6A24]/30 bg-[#6B6A24]/10 px-4 py-3 text-sm text-[#53541B]"><Check className="h-4 w-4" />Changes are staged in this workspace. Connect the persistence API to publish them globally.</div>}<section className={`${surface} overflow-hidden`}><div className="flex flex-col gap-3 border-b border-[#5F021F]/8 p-4 sm:flex-row sm:items-center sm:justify-between"><label className="relative block max-w-md flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35" /><input value={query} onChange={(event) => setQuery(event.target.value)} className="h-10 w-full rounded-[2px] border border-[#5F021F]/12 bg-white/60 pl-10 pr-3 text-sm outline-none focus:border-gold" placeholder={`Search ${title.toLowerCase()}…`} /></label><div className="flex items-center gap-2"><Filter className="h-4 w-4 text-ink/35" />{(['All','Published','Draft','Review'] as const).map((item) => <button type="button" key={item} onClick={() => setStatus(item)} className={`rounded-[2px] px-3 py-2 text-xs font-bold ${status === item ? 'bg-bordeaux text-gold-bright' : 'bg-[#5F021F]/5 text-ink/55'}`}>{item}</button>)}</div></div><div className="hidden grid-cols-[1.5fr_.8fr_.55fr_.55fr_.8fr_.2fr] gap-4 bg-[#5F021F]/[.035] px-5 py-3 text-[0.65rem] font-extrabold uppercase tracking-[0.12em] text-ink/45 md:grid"><span>Title</span><span>Type</span><span>Status</span><span>Views</span><span>Updated</span><span /></div>{filtered.map((item) => <div key={item.id} className="grid gap-3 border-t border-[#5F021F]/8 px-5 py-4 md:grid-cols-[1.5fr_.8fr_.55fr_.55fr_.8fr_.2fr] md:items-center"><div><p className="font-bold text-bordeaux">{item.title}</p><p className="mt-1 text-xs text-ink/45 md:hidden">{item.type} · {item.updated}</p></div><span className="hidden text-sm text-ink/60 md:block">{item.type}</span><span><StatusBadge status={item.status} /></span><span className="text-sm text-ink/60">{item.views}</span><span className="hidden text-sm text-ink/55 md:block">{item.updated}<small className="block text-xs text-ink/35">{item.editor}</small></span><button type="button" onClick={() => setEditor(item)} aria-label={`Edit ${item.title}`} className="justify-self-start rounded border border-[#5F021F]/12 p-2 text-ink/45 hover:border-gold-dark hover:text-bordeaux"><PenLine className="h-4 w-4" /></button></div>)}{filtered.length === 0 && <div className="px-5 py-14 text-center text-sm text-ink/55">No content matches these filters.</div>}</section>{editor && <ContentEditor editor={editor} setEditor={setEditor} onSave={saveEditor} />}</>;
};

const StatusBadge = ({ status }: { status: AdminContentRow['status'] }) => <span className={`inline-flex rounded-full px-2.5 py-1 text-[0.65rem] font-extrabold uppercase tracking-[0.08em] ${status === 'Published' ? 'bg-[#6B6A24]/10 text-[#53541B]' : status === 'Draft' ? 'bg-[#5F021F]/8 text-ink/55' : 'bg-gold/15 text-gold-dark'}`}>{status}</span>;

export const Consultations = () => <><PageHeader eyebrow="Clients / Consultation Requests" title="Consultation requests" description="Review incoming enquiries, assign responsibility and track each request privately." action={<button type="button" className="inline-flex min-h-11 items-center gap-2 border border-bordeaux bg-bordeaux px-4 text-xs font-extrabold uppercase tracking-[0.1em] text-gold-bright"><Download className="h-4 w-4" />Export</button>} /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{[['Total','0'],['New','0'],['Reviewing','0'],['Scheduled','0'],['Closed','0']].map((item) => <article key={item[0]} className={`${surface} p-5`}><p className="text-xs font-bold uppercase tracking-[0.1em] text-ink/50">{item[0]}</p><p className="mt-4 font-serif text-4xl text-bordeaux">{item[1]}</p></article>)}</div><section className={`${surface} mt-6 p-10 text-center`}><div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-bordeaux/8 text-gold-dark"><MessageSquareIcon /></div><h2 className="mt-5 font-serif text-3xl text-bordeaux">No consultation requests yet</h2><p className="mx-auto mt-3 max-w-md leading-7 text-ink/55">When the consultation API is connected, private enquiries will appear here with status, assignment and internal notes.</p></section></>;

const MessageSquareIcon = () => <MessageSquare className="h-6 w-6" />;

export const SettingsPage = ({ type }: { type: 'seo' | 'contact' | 'general' }) => {
  const [saved, setSaved] = useState(false);

  if (type === 'seo') return <><PageHeader eyebrow="Website / SEO & Metadata" title="SEO & metadata" description="Review metadata coverage across the public site and service pages." /><section className={`${surface} overflow-hidden`}><div className="hidden grid-cols-[1.5fr_2fr_.6fr_.2fr] gap-4 bg-[#5F021F]/[.035] px-5 py-3 text-[0.65rem] font-extrabold uppercase tracking-[0.12em] text-ink/45 md:grid"><span>Route</span><span>SEO title</span><span>Health</span><span /></div>{seoRows.map((item) => <div key={item.path} className="grid gap-3 border-t border-[#5F021F]/8 px-5 py-4 md:grid-cols-[1.5fr_2fr_.6fr_.2fr] md:items-center"><span className="font-bold text-bordeaux">{item.path}</span><span className="text-sm text-ink/65">{item.title}</span><span className="font-bold text-[#6B6A24]">{item.health}%</span><button type="button" aria-label={`Edit SEO metadata for ${item.path}`} className="justify-self-start rounded border border-[#5F021F]/12 p-2 text-ink/45 hover:border-gold-dark hover:text-bordeaux"><PenLine className="h-4 w-4" /></button></div>)}</section></>;

  if (type === 'general') return <><PageHeader eyebrow="Website / General Settings" title="General settings" description="Review the operating defaults for the Lummina digital presence." action={<button type="button" onClick={() => setSaved(true)} className="inline-flex min-h-11 items-center gap-2 border border-bordeaux bg-bordeaux px-4 text-xs font-extrabold uppercase tracking-[0.1em] text-gold-bright"><Save className="h-4 w-4" />Save changes</button>} />{saved && <div className="mb-5 flex items-center gap-2 rounded-[2px] border border-[#6B6A24]/30 bg-[#6B6A24]/10 px-4 py-3 text-sm text-[#53541B]"><Check className="h-4 w-4" />Settings staged in the admin workspace. Connect the production API to persist them.</div>}<section className={`${surface} max-w-3xl p-6 sm:p-8`}><div className="grid gap-5 sm:grid-cols-2"><label className="block text-sm font-bold sm:col-span-2">Firm display name<input className={input} defaultValue="Lummina Law Firm" /></label><label className="block text-sm font-bold">Timezone<select className={input} defaultValue="Africa/Lagos"><option>Africa/Lagos</option><option>Europe/London</option><option>America/New_York</option></select></label><label className="block text-sm font-bold">Default content status<select className={input} defaultValue="Draft"><option>Draft</option><option>Published</option></select></label><label className="block text-sm font-bold sm:col-span-2">Default notification email<input className={input} defaultValue={contactPreview.email} /></label></div><p className="mt-6 flex items-center gap-2 text-xs text-ink/45"><ShieldCheck className="h-4 w-4 text-gold-dark" />Security, authentication and settings persistence require the production admin service.</p></section></>;

  return <><PageHeader eyebrow="Website / Contact Information" title="Contact information" description="Update global contact details once so the public website remains consistent." action={<button type="button" onClick={() => setSaved(true)} className="inline-flex min-h-11 items-center gap-2 border border-bordeaux bg-bordeaux px-4 text-xs font-extrabold uppercase tracking-[0.1em] text-gold-bright"><Save className="h-4 w-4" />Save changes</button>} />{saved && <div className="mb-5 flex items-center gap-2 rounded-[2px] border border-[#6B6A24]/30 bg-[#6B6A24]/10 px-4 py-3 text-sm text-[#53541B]"><Check className="h-4 w-4" />Contact changes staged in the admin workspace. Connect the production API to publish them globally.</div>}<section className={`${surface} max-w-3xl p-6 sm:p-8`}><div className="grid gap-5 sm:grid-cols-2"><label className="block text-sm font-bold">Primary phone<input className={input} defaultValue={contactPreview.phones[0]} /></label><label className="block text-sm font-bold">Secondary phone<input className={input} defaultValue={contactPreview.phones[1]} /></label><label className="block text-sm font-bold sm:col-span-2">Email<input className={input} defaultValue={contactPreview.email} /></label><label className="block text-sm font-bold sm:col-span-2">WhatsApp URL<input className={input} defaultValue={contactPreview.whatsapp} /></label><label className="block text-sm font-bold sm:col-span-2">Address<textarea className={`${input} min-h-24 py-3`} defaultValue={contactPreview.address} /></label><label className="block text-sm font-bold sm:col-span-2">Google Maps link<input className={input} defaultValue="https://maps.google.com/?q=Plot+5,+Block+94,+The+Providence+Street,+Lekki+Phase+1,+Lagos+State" /></label></div><p className="mt-6 flex items-center gap-2 text-xs text-ink/45"><ShieldCheck className="h-4 w-4 text-gold-dark" />Changes require the production content API before they can be published globally.</p></section></>;
};

export const ActivityPage = () => <><PageHeader eyebrow="Administration / Activity" title="Activity log" description="A clear record of important administrative actions and content changes." /><section className={`${surface} overflow-hidden`}>{activities.map((activity) => <div key={activity.id} className="flex flex-col gap-2 border-t border-[#5F021F]/8 px-5 py-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm text-ink/75"><strong>{activity.action}</strong> {activity.resource}</p><p className="mt-1 text-xs text-ink/45">{activity.actor}</p></div><span className="inline-flex items-center gap-2 text-xs text-ink/45"><Clock3 className="h-3.5 w-3.5" />{activity.time}</span></div>)}</section></>;

export const AdminUsers = () => <><PageHeader eyebrow="Administration / Admin Users" title="Admin users" description="Prepare role-based access for the people responsible for Lummina’s digital operations." action={<button type="button" className="inline-flex min-h-11 items-center gap-2 border border-bordeaux bg-bordeaux px-4 text-xs font-extrabold uppercase tracking-[0.1em] text-gold-bright"><UserPlus className="h-4 w-4" />Invite admin</button>} /><section className={`${surface} overflow-hidden`}><div className="flex items-center gap-4 border-b border-[#5F021F]/8 p-5"><div className="grid h-10 w-10 place-items-center rounded-full bg-bordeaux text-sm font-bold text-gold-bright">FZ</div><div className="flex-1"><p className="font-bold text-bordeaux">Faith Zekeri</p><p className="text-sm text-ink/50">admin@lummina.local</p></div><StatusBadge status="Published" /><span className="hidden text-sm text-ink/55 sm:block">Super Admin</span></div><div className="p-5 text-sm text-ink/50"><Users className="mr-2 inline h-4 w-4 text-gold-dark" />Role enforcement will be handled by the production authentication service.</div></section></>;

export const NewsletterPage = () => <><PageHeader eyebrow="Clients / Newsletter" title="Newsletter" description="Monitor subscriber growth and consent-aware newsletter activity." action={<button type="button" className="inline-flex min-h-11 items-center gap-2 border border-bordeaux bg-bordeaux px-4 text-xs font-extrabold uppercase tracking-[0.1em] text-gold-bright"><Download className="h-4 w-4" />Export subscribers</button>} /><div className="grid gap-4 sm:grid-cols-3"><MetricCard label="Subscribers" value="0" change="—" trend="neutral" description="Awaiting newsletter API" /><MetricCard label="This month" value="0" change="—" trend="neutral" description="New subscribers" /><MetricCard label="Consent rate" value="—" change="—" trend="neutral" description="Not connected" /></div><section className={`${surface} mt-6 p-10 text-center`}><Mail className="mx-auto h-8 w-8 text-gold-dark" /><h2 className="mt-4 font-serif text-3xl text-bordeaux">No subscribers loaded</h2><p className="mx-auto mt-3 max-w-md leading-7 text-ink/55">Connect the newsletter provider or backend endpoint to manage consent-aware subscribers here.</p></section></>;
