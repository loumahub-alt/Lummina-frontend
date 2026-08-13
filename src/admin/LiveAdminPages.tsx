import { useEffect, useMemo, useState, type ChangeEvent, type ReactNode } from 'react';
import { CalendarDays, Check, Clock3, Eye, FileCode2, Save, Send, ShieldCheck, Upload, Users, X } from 'lucide-react';
import { api, ApiError, type DashboardData } from '../services/api';

const surface = 'rounded-[3px] border border-[#5F021F]/10 bg-[#FFF9EF] shadow-[0_14px_45px_rgba(95,2,31,0.07)]';
const input = 'mt-2 min-h-11 w-full rounded-[2px] border border-[#5F021F]/15 bg-white/70 px-3 text-sm text-ink outline-none transition focus:border-gold';
const apiError = (reason: unknown, fallback: string) => reason instanceof ApiError ? reason.message : fallback;
const dateText = (value: unknown) => {
  if (!value) return '—';
  const date = new Date(String(value));
  return Number.isNaN(date.valueOf()) ? String(value) : date.toLocaleString('en-NG');
};
const dateOnlyText = (value: unknown) => {
  if (!value) return '—';
  const date = new Date(String(value));
  return Number.isNaN(date.valueOf()) ? String(value) : date.toLocaleDateString('en-NG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
};
const textValue = (value: unknown) => {
  if (value === null || value === undefined) return '—';
  const text = String(value).trim();
  return text || '—';
};
const recordValue = (value: unknown) => value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {};

const Header = ({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) => (
  <div className="mb-8">
    <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-gold-dark">{eyebrow}</p>
    <h1 className="mt-3 font-serif text-4xl leading-tight text-bordeaux md:text-5xl">{title}</h1>
    <p className="mt-3 max-w-2xl leading-7 text-ink/60">{description}</p>
  </div>
);

const ErrorNotice = ({ message }: { message: string }) => <div className="rounded-[3px] border border-red-300/35 bg-red-50 px-5 py-4 text-sm text-red-800">{message}</div>;
const LoadingNotice = () => <div className={surface + ' p-8 text-sm text-ink/55'}>Loading live data from the Node.js API…</div>;

export const LiveAnalyticsPage = ({ section = 'traffic' }: { section?: 'traffic' | 'pages' | 'interest' | 'sources' | 'search' | 'consent' }) => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState('');
  const [days, setDays] = useState(30);
  useEffect(() => {
    setData(null);
    setError('');
    api.admin.dashboard(days).then(setData).catch((reason) => setError(apiError(reason, 'Unable to load analytics.')));
  }, [days]);

  if (error) return <><Header eyebrow="Analytics" title="Analytics unavailable." description="The live analytics request could not be completed." /><ErrorNotice message={error} /></>;
  if (!data) return <><Header eyebrow="Analytics" title="Loading analytics…" description="Reading server-side traffic, interest and conversion data." /><LoadingNotice /></>;

  if (section === 'pages') return <><Header eyebrow="Analytics / Page Performance" title="Page performance" description="Published page attention calculated from consented server events." /><section className={surface + ' overflow-hidden'}><TableHead labels={['Page', 'Views', 'Share']} />{data.mostVisitedPages.map((item) => <div key={item.page} className="grid grid-cols-[1.4fr_.7fr_.8fr] gap-4 border-t border-[#5F021F]/8 px-5 py-4 text-sm"><span className="font-bold text-bordeaux">{item.page}</span><span>{item.views.toLocaleString()}</span><span>{((item.views / Math.max(data.metrics.pageViews, 1)) * 100).toFixed(1)}%</span></div>)}{!data.mostVisitedPages.length && <Empty text="No page views recorded for this period." />}</section></>;
  if (section === 'interest') return <><Header eyebrow="Analytics / Visitor Interest" title="Visitor interest" description="Practice-area engagement and consultation intent from the live event stream." /><section className={surface + ' overflow-hidden'}><TableHead labels={['Practice area', 'Views', 'Engagement', 'Consultations']} />{data.visitorInterest.map((item) => <div key={item.practiceAreaId} className="grid grid-cols-[1.4fr_.7fr_.9fr_.7fr] gap-4 border-t border-[#5F021F]/8 px-5 py-4 text-sm"><span className="font-bold text-bordeaux">{item.practiceAreaTitle ?? item.practiceAreaId}</span><span>{item.views}</span><span>{item.engagementSeconds}s</span><span>{item.consultations}</span></div>)}{!data.visitorInterest.length && <Empty text="Visitor interest will appear after consented practice-area events are collected." />}</section></>;
  if (section === 'sources') return <><Header eyebrow="Analytics / Traffic Sources" title="Traffic sources" description="Acquisition information supplied by the consented event stream." /><section className={surface + ' overflow-hidden'}><TableHead labels={['Source', 'Visitors']} />{data.trafficSources.map((item) => <div key={item.source} className="grid grid-cols-[1.4fr_.7fr] gap-4 border-t border-[#5F021F]/8 px-5 py-4 text-sm"><span className="font-bold text-bordeaux">{item.source}</span><span>{item.visitors}</span></div>)}{!data.trafficSources.length && <Empty text="No source data recorded for this period." />}</section></>;
  if (section === 'search') {
    const searchTotals = data.search.reduce((totals, item) => ({
      searches: totals.searches + item.searches,
      clicks: totals.clicks + item.clicks,
      noResults: totals.noResults + item.noResults,
    }), { searches: 0, clicks: 0, noResults: 0 });
    return <><Header eyebrow="Analytics / Search" title="Search analytics" description="Searches, result clicks and zero-result queries calculated from consented public search events." /><div className="mb-6 flex flex-wrap items-center justify-between gap-4"><div className="text-sm text-ink/55">Showing the last {days} days</div><label className="flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.1em] text-ink/50">Period<select value={days} onChange={(event) => setDays(Number(event.target.value))} className="h-10 rounded-[2px] border border-[#5F021F]/15 bg-white/70 px-3 text-sm font-normal normal-case tracking-normal text-ink outline-none focus:border-gold"><option value="7">7 days</option><option value="30">30 days</option><option value="90">90 days</option><option value="365">365 days</option></select></label></div><div className="mb-6 grid gap-4 sm:grid-cols-3"><article className={surface + ' p-5'}><p className="text-xs font-bold uppercase tracking-[0.1em] text-ink/50">Searches</p><p className="mt-4 font-serif text-4xl text-bordeaux">{searchTotals.searches}</p></article><article className={surface + ' p-5'}><p className="text-xs font-bold uppercase tracking-[0.1em] text-ink/50">Result clicks</p><p className="mt-4 font-serif text-4xl text-bordeaux">{searchTotals.clicks}</p></article><article className={surface + ' p-5'}><p className="text-xs font-bold uppercase tracking-[0.1em] text-ink/50">Zero-result searches</p><p className="mt-4 font-serif text-4xl text-bordeaux">{searchTotals.noResults}</p></article></div><section className={surface + ' overflow-hidden'}><TableHead labels={['Search term', 'Searches', 'Clicks', 'No results', 'Average results']} />{data.search.map((item) => <div key={item.query} className="grid grid-cols-[1.35fr_.7fr_.7fr_.8fr_1fr] gap-4 border-t border-[#5F021F]/8 px-5 py-4 text-sm"><span className="break-words font-bold text-bordeaux">{item.query}</span><span>{item.searches}</span><span>{item.clicks}</span><span className={item.noResults > 0 ? 'font-bold text-gold-dark' : ''}>{item.noResults}</span><span>{item.averageResults}</span></div>)}{!data.search.length && <Empty text="No site searches have been recorded for this period. Search analytics requires analytics consent." />}</section></>;
  }
  if (section === 'consent') return <><Header eyebrow="Analytics / Consent" title="Consent analytics" description="Privacy decisions stored by the public consent banner. Optional analytics events are accepted only after an analytics choice." /><div className="mb-6 flex flex-wrap items-center justify-between gap-4"><div className="text-sm text-ink/55">Showing the last {days} days</div><label className="flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.1em] text-ink/50">Period<select value={days} onChange={(event) => setDays(Number(event.target.value))} className="h-10 rounded-[2px] border border-[#5F021F]/15 bg-white/70 px-3 text-sm font-normal normal-case tracking-normal text-ink outline-none focus:border-gold"><option value="7">7 days</option><option value="30">30 days</option><option value="90">90 days</option><option value="365">365 days</option></select></label></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[['Total decisions', data.consent.total], ['Analytics accepted', data.consent.analyticsAccepted], ['Essential only', data.consent.essentialOnly], ['Acceptance rate', String(data.consent.acceptanceRate) + '%']].map((item) => <article key={String(item[0])} className={surface + ' p-5'}><p className="text-xs font-bold uppercase tracking-[0.1em] text-ink/50">{item[0]}</p><p className="mt-4 font-serif text-4xl text-bordeaux">{item[1]}</p></article>)}</div><div className={surface + ' mt-6 p-6 text-sm leading-7 text-ink/60'}><ShieldCheck className="mr-3 inline h-6 w-6 text-gold-dark" />Only visitors who explicitly allow analytics contribute to optional analytics totals. Visitors who continue without analytics are counted as essential-only decisions.</div></>;

  return <><Header eyebrow="Analytics / Traffic Overview" title="Traffic overview" description="Current server-side visitor, page-view and consultation signals." /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[['Visitors', String(data.metrics.websiteVisitors)], ['Page views', String(data.metrics.pageViews)], ['Consultations', String(data.metrics.consultationRequests)], ['Conversion rate', String(data.metrics.conversionRate) + '%']].map((item) => <article key={item[0]} className={surface + ' p-5'}><p className="text-xs font-bold uppercase tracking-[0.1em] text-ink/50">{item[0]}</p><p className="mt-4 font-serif text-4xl text-bordeaux">{item[1]}</p><p className="mt-2 text-xs text-ink/45">Last {data.period.days} days</p></article>)}</div><section className={surface + ' mt-6 overflow-hidden'}><TableHead labels={['Date', 'Visitors', 'Views', 'Consultations']} />{data.traffic.map((item) => <div key={item.date} className="grid grid-cols-[1fr_.8fr_.8fr_.8fr] gap-4 border-t border-[#5F021F]/8 px-5 py-4 text-sm"><span>{item.date}</span><span>{item.visitors}</span><span>{item.pageViews}</span><span>{item.consultations}</span></div>)}{!data.traffic.length && <Empty text="No daily traffic aggregates recorded for this period." />}</section></>;
};

const TableHead = ({ labels }: { labels: string[] }) => <div className="grid gap-4 bg-[#5F021F]/[.035] px-5 py-3 text-[0.65rem] font-extrabold uppercase tracking-[0.12em] text-ink/45" style={{ gridTemplateColumns: 'repeat(' + labels.length + ', minmax(0, 1fr))' }}>{labels.map((label) => <span key={label}>{label}</span>)}</div>;
const Empty = ({ text }: { text: string }) => <p className="p-8 text-center text-sm text-ink/50">{text}</p>;
const DetailField = ({ label, value, wide = false }: { label: string; value: ReactNode; wide?: boolean }) => <div className={wide ? 'sm:col-span-2' : ''}><dt className="text-[0.65rem] font-extrabold uppercase tracking-[0.12em] text-ink/45">{label}</dt><dd className="mt-1 break-words text-sm leading-6 text-ink/80">{value}</dd></div>;

export const LiveConsultations = () => {
  const [items, setItems] = useState<Record<string, unknown>[] | null>(null);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<Record<string, unknown> | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const load = () => api.admin.consultations('?perPage=100').then(setItems).catch((reason) => setError(apiError(reason, 'Unable to load consultations.')));
  useEffect(() => { void load(); }, []);
  const updateStatus = async (id: string, status: string) => {
    try { await api.admin.updateConsultation(id, { status }); await load(); }
    catch (reason) { setError(apiError(reason, 'Unable to update consultation status.')); }
  };
  const openDetails = async (id: string) => {
    setDetailLoading(true);
    setError('');
    try {
      const payload = await api.admin.consultation(id);
      const consultation = payload.consultation;
      setSelected(recordValue(consultation) === consultation ? consultation as Record<string, unknown> : payload);
    } catch (reason) {
      setError(apiError(reason, 'Unable to load the consultation details.'));
    } finally {
      setDetailLoading(false);
    }
  };
  const counts = useMemo(() => (items ?? []).reduce<Record<string, number>>((result, item) => {
    const status = String(item.status ?? 'new');
    result.total = (result.total ?? 0) + 1;
    result[status] = (result[status] ?? 0) + 1;
    return result;
  }, {}), [items]);

  return <><Header eyebrow="Clients / Consultation Requests" title="Consultation requests" description="Review and progress private enquiries received through the public consultation form." />{error && <ErrorNotice message={error} />}{!items ? <LoadingNotice /> : <><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{[['Total', counts.total ?? 0], ['New', counts.new ?? 0], ['Reviewing', counts.reviewing ?? 0], ['Scheduled', counts.scheduled ?? 0], ['Closed', counts.closed ?? 0]].map((item) => <article key={String(item[0])} className={surface + ' p-5'}><p className="text-xs font-bold uppercase tracking-[0.1em] text-ink/50">{item[0]}</p><p className="mt-4 font-serif text-4xl text-bordeaux">{item[1]}</p></article>)}</div><section className={surface + ' mt-6 overflow-hidden'}><div className="hidden grid-cols-[1.35fr_1fr_.9fr_1fr_auto] gap-4 bg-[#5F021F]/[.035] px-5 py-3 text-[0.65rem] font-extrabold uppercase tracking-[0.12em] text-ink/45 lg:grid"><span>Client</span><span>Request</span><span>Status</span><span>Submitted</span><span>Details</span></div>{items.map((item) => { const client = recordValue(item.client); const enquiry = recordValue(item.enquiry); const id = String(item.id ?? item._id ?? item.reference); const status = String(item.status ?? 'new'); const clientName = [client.firstName, client.lastName].map(textValue).filter((value) => value !== '—').join(' ') || '—'; return <div key={id} className="grid gap-4 border-t border-[#5F021F]/8 px-5 py-5 lg:grid-cols-[1.35fr_1fr_.9fr_1fr_auto] lg:items-center"><div><p className="font-bold text-bordeaux">{textValue(item.reference)}</p><p className="mt-1 text-sm text-ink/75">{clientName}</p><p className="mt-1 break-all text-xs text-ink/50">{textValue(client.email)}</p></div><div className="text-sm text-ink/65"><p>{textValue(enquiry.practiceAreaId)}</p><p className="mt-1">{textValue(enquiry.consultationMethod)}</p></div><select aria-label={'Update status for ' + textValue(item.reference)} value={status} onChange={(event) => void updateStatus(id, event.target.value)} className="h-10 rounded-[2px] border border-[#5F021F]/15 bg-white/70 px-2 text-sm"><option value="new">New</option><option value="reviewing">Reviewing</option><option value="contacted">Contacted</option><option value="scheduled">Scheduled</option><option value="completed">Completed</option><option value="closed">Closed</option></select><div className="text-sm text-ink/55">{dateText(item.submittedAt)}</div><button type="button" onClick={() => void openDetails(id)} className="inline-flex h-10 items-center justify-center gap-2 border border-gold-dark px-3 text-xs font-extrabold uppercase tracking-[0.08em] text-gold-dark hover:bg-gold/10"><Eye className="h-4 w-4" />View</button></div>; })}{!items.length && <Empty text="No consultation requests have been submitted." />}</section></>}{selected && <ConsultationDetails consultation={selected} onClose={() => setSelected(null)} loading={detailLoading} />}{detailLoading && !selected && <div className="fixed inset-0 z-50 grid place-items-center bg-bordeaux/45 px-4"><div className="rounded-[3px] bg-[#FFF9EF] px-6 py-5 text-sm text-ink/70">Loading consultation details…</div></div>}</>;
};

const ConsultationDetails = ({ consultation, onClose, loading }: { consultation: Record<string, unknown>; onClose: () => void; loading: boolean }) => {
  const client = recordValue(consultation.client);
  const enquiry = recordValue(consultation.enquiry);
  const consent = recordValue(consultation.consent);
  const reference = textValue(consultation.reference);
  const fullName = [client.firstName, client.lastName].map(textValue).filter((value) => value !== '—').join(' ') || '—';
  const email = textValue(client.email);
  const phone = textValue(client.phone);
  const message = textValue(enquiry.message);

  return <div className="fixed inset-0 z-50 overflow-y-auto bg-bordeaux/50 px-4 py-6 sm:px-6" role="presentation"><div className="mx-auto max-w-3xl" role="dialog" aria-modal="true" aria-labelledby="consultation-detail-title"><div className="overflow-hidden rounded-[3px] border border-[#5F021F]/10 bg-[#FFF9EF] shadow-[0_24px_80px_rgba(46,0,15,0.25)]"><div className="flex items-start justify-between border-b border-[#5F021F]/10 px-6 py-5 sm:px-8"><div><p className="text-xs font-extrabold uppercase tracking-[0.16em] text-gold-dark">Consultation request</p><h2 id="consultation-detail-title" className="mt-2 font-serif text-3xl text-bordeaux">{reference}</h2><p className="mt-1 text-sm text-ink/55">Received {dateText(consultation.submittedAt)}</p></div><button type="button" onClick={onClose} aria-label="Close consultation details" className="grid h-10 w-10 place-items-center border border-[#5F021F]/15 text-ink/65 hover:bg-bordeaux/5"><X className="h-5 w-5" /></button></div><div className="space-y-7 px-6 py-6 sm:px-8"><div className="flex flex-wrap items-center gap-3"><span className="rounded-full bg-gold/20 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.1em] text-gold-dark">{textValue(consultation.status)}</span>{loading && <span className="text-xs text-ink/45">Refreshing…</span>}</div><section><h3 className="font-serif text-2xl text-bordeaux">Client information</h3><dl className="mt-4 grid gap-5 border-t border-[#5F021F]/10 pt-5 sm:grid-cols-2"><DetailField label="Full name" value={fullName} /><DetailField label="Company" value={textValue(client.company)} /><DetailField label="Email" value={email === '—' ? email : <a className="text-gold-dark underline" href={'mailto:' + email}>{email}</a>} /><DetailField label="Phone" value={phone === '—' ? phone : <a className="text-gold-dark underline" href={'tel:' + phone}>{phone}</a>} /></dl></section><section><h3 className="font-serif text-2xl text-bordeaux">Consultation request</h3><dl className="mt-4 grid gap-5 border-t border-[#5F021F]/10 pt-5 sm:grid-cols-2"><DetailField label="Practice area" value={textValue(enquiry.practiceAreaId)} /><DetailField label="Consultation method" value={textValue(enquiry.consultationMethod)} /><DetailField label="Preferred date" value={<span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4 text-gold-dark" />{dateOnlyText(enquiry.preferredDate)}</span>} /><DetailField label="Preferred time" value={<span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4 text-gold-dark" />{textValue(enquiry.preferredTime)}</span>} /></dl></section><section><h3 className="font-serif text-2xl text-bordeaux">Message from the prospective client</h3><div className="mt-4 rounded-[3px] border border-[#5F021F]/10 bg-white/70 px-5 py-4 text-[0.98rem] leading-7 text-ink/85"><p className="whitespace-pre-wrap break-words">{message}</p></div></section><section className="border-t border-[#5F021F]/10 pt-5"><h3 className="text-xs font-extrabold uppercase tracking-[0.12em] text-ink/45">Consent record</h3><p className="mt-2 inline-flex items-center gap-2 text-sm text-ink/70"><Check className="h-4 w-4 text-gold-dark" />{consent.accepted ? 'Consent confirmed' : 'Consent status not recorded'}{consent.acceptedAt ? ' · ' + dateText(consent.acceptedAt) : ''}</p></section></div></div></div></div>;
};

type NewsletterTemplate = { subject: string; html: string; updatedAt: string | null };

export const LiveNewsletterPage = () => {
  const [items, setItems] = useState<Record<string, unknown>[] | null>(null);
  const [template, setTemplate] = useState<NewsletterTemplate>({ subject: '', html: '', updatedAt: null });
  const [templateLoading, setTemplateLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);
  const [templateDirty, setTemplateDirty] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    let active = true;
    Promise.all([api.admin.newsletter(), api.admin.newsletterTemplate()])
      .then(([records, savedTemplate]) => {
        if (!active) return;
        setItems(records);
        setTemplate({ subject: savedTemplate.subject ?? '', html: savedTemplate.html ?? '', updatedAt: savedTemplate.updatedAt ?? null });
        setTemplateDirty(false);
      })
      .catch((reason) => {
        if (active) setError(apiError(reason, 'Unable to load the newsletter workspace.'));
      })
      .finally(() => {
        if (active) setTemplateLoading(false);
      });
    return () => { active = false; };
  }, []);

  const subscribed = (items ?? []).filter((item) => item.status === 'subscribed');
  const updateTemplate = (key: 'subject' | 'html', value: string) => {
    setTemplate((current) => ({ ...current, [key]: value }));
    setTemplateDirty(true);
    setMessage('');
  };
  const uploadTemplate = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.currentTarget.value = '';
    if (!file) return;
    if (!/\.(html?|txt)$/i.test(file.name)) {
      setError('Choose an HTML template file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => updateTemplate('html', String(reader.result ?? ''));
    reader.onerror = () => setError('The newsletter template could not be read.');
    reader.readAsText(file);
  };
  const saveTemplate = async () => {
    setSaving(true);
    setError('');
    setMessage('');
    try {
      const savedTemplate = await api.admin.saveNewsletterTemplate({ subject: template.subject.trim(), html: template.html.trim() });
      setTemplate({ subject: savedTemplate.subject, html: savedTemplate.html, updatedAt: savedTemplate.updatedAt });
      setTemplateDirty(false);
      setMessage('Newsletter template saved.');
    } catch (reason) {
      setError(apiError(reason, 'Unable to save the newsletter template.'));
    } finally {
      setSaving(false);
    }
  };
  const sendNewsletter = async () => {
    if (templateDirty) {
      setError('Save the newsletter template before sending it.');
      return;
    }
    if (!window.confirm('Send this newsletter to every subscribed email address?')) return;
    setSending(true);
    setError('');
    setMessage('');
    try {
      const result = await api.admin.sendNewsletter();
      setMessage('Newsletter queued for ' + result.sent + ' subscribed recipient' + (result.sent === 1 ? '' : 's') + '.');
    } catch (reason) {
      setError(apiError(reason, 'Unable to send the newsletter.'));
    } finally {
      setSending(false);
    }
  };

  return <><Header eyebrow="Clients / Newsletter" title="Newsletter" description="Upload and save an HTML template, then send it through Resend to subscribed recipients only." />{error && <ErrorNotice message={error} />}{message && <div className="mb-5 rounded-[3px] border border-[#6B6A24]/30 bg-[#6B6A24]/10 px-5 py-4 text-sm text-[#53541B]">{message}</div>}{!items || templateLoading ? <LoadingNotice /> : <><div className="grid gap-4 sm:grid-cols-3"><article className={surface + ' p-5'}><p className="text-xs font-bold uppercase tracking-[0.1em] text-ink/50">Subscribed records loaded</p><p className="mt-4 font-serif text-4xl text-bordeaux">{subscribed.length}</p></article><article className={surface + ' p-5'}><p className="text-xs font-bold uppercase tracking-[0.1em] text-ink/50">Total records loaded</p><p className="mt-4 font-serif text-4xl text-bordeaux">{items.length}</p></article><article className={surface + ' p-5'}><p className="text-xs font-bold uppercase tracking-[0.1em] text-ink/50">Template status</p><p className="mt-4 font-serif text-2xl text-bordeaux">{templateDirty ? 'Unsaved changes' : template.html.trim() ? 'Ready' : 'Not saved'}</p></article></div><section className={surface + ' mt-6 p-6 sm:p-8'}><div className="flex flex-col gap-4 border-b border-[#5F021F]/10 pb-6 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-xs font-extrabold uppercase tracking-[0.13em] text-gold-dark">Email template</p><h2 className="mt-2 font-serif text-3xl text-bordeaux">Prepare a newsletter</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-ink/60">Upload an HTML file or edit the template directly. The sender address is configured securely on the backend for Resend.</p></div><label className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 border border-gold-dark px-4 py-3 text-xs font-extrabold uppercase tracking-[0.08em] text-gold-dark hover:bg-gold/10"><Upload className="h-4 w-4" />Upload HTML<input type="file" accept=".html,.htm,.txt,text/html" onChange={uploadTemplate} className="sr-only" /></label></div><div className="mt-6 grid gap-6 lg:grid-cols-2"><div><label className="block text-sm font-bold">Email subject<input className={input} value={template.subject} onChange={(event) => updateTemplate('subject', event.target.value)} placeholder="Enter the newsletter subject" /></label><label className="mt-5 block text-sm font-bold">HTML template<textarea className={input + ' min-h-[22rem] py-3 font-mono text-xs leading-5'} value={template.html} onChange={(event) => updateTemplate('html', event.target.value)} placeholder="Paste or upload the newsletter HTML here" /></label><p className="mt-2 text-xs leading-5 text-ink/45">Use absolute URLs for images and links so email clients can load them.</p><div className="mt-5 flex flex-wrap items-center gap-3"><button type="button" onClick={() => void saveTemplate()} disabled={saving || sending} className="inline-flex min-h-11 items-center gap-2 border border-bordeaux bg-bordeaux px-5 py-3 text-xs font-extrabold uppercase tracking-[0.1em] text-gold-bright disabled:cursor-not-allowed disabled:opacity-50"><Save className="h-4 w-4" />{saving ? 'Saving…' : 'Save template'}</button><button type="button" onClick={() => void sendNewsletter()} disabled={saving || sending || templateDirty || !template.html.trim() || !template.subject.trim()} className="inline-flex min-h-11 items-center gap-2 border border-gold-dark px-5 py-3 text-xs font-extrabold uppercase tracking-[0.1em] text-gold-dark disabled:cursor-not-allowed disabled:opacity-50"><Send className="h-4 w-4" />{sending ? 'Sending…' : 'Send to subscribers'}</button></div>{templateDirty && <p className="mt-3 text-xs text-gold-dark">Save the template before sending.</p>}{template.updatedAt && <p className="mt-3 text-xs text-ink/45">Last saved {dateText(template.updatedAt)}</p>}</div><div><div className="flex items-center gap-2 text-sm font-bold text-bordeaux"><FileCode2 className="h-4 w-4 text-gold-dark" />Template preview</div><div className="mt-2 overflow-hidden rounded-[3px] border border-[#5F021F]/10 bg-white"><iframe title="Newsletter template preview" srcDoc={template.html || '<p style=&quot;font-family: sans-serif; padding: 24px; color: #666;&quot;>Upload or paste an HTML template to preview it.</p>'} sandbox="" className="h-[30rem] w-full" /></div></div></div></section><section className={surface + ' mt-6 overflow-hidden'}><div className="border-b border-[#5F021F]/10 px-5 py-4"><h2 className="font-serif text-2xl text-bordeaux">Subscriber records</h2><p className="mt-1 text-sm text-ink/55">Only records with subscribed status are included when sending.</p></div>{items.map((item) => <div key={String(item.id ?? item._id ?? item.email)} className="flex flex-col gap-2 border-t border-[#5F021F]/8 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"><span className="font-bold text-bordeaux">{String(item.email)}</span><span className="text-sm text-ink/55">{String(item.status)} · {dateText(item.consentedAt ?? item.createdAt)}</span></div>)}{!items.length && <Empty text="No subscribers have been recorded." />}</section></>}</>;
};

export const LiveSettingsPage = ({ type }: { type: 'seo' | 'contact' | 'general' }) => {
  const [value, setValue] = useState<Record<string, unknown>>({});
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    if (type === 'seo') api.admin.seo().then(setRows).catch((reason) => setError(apiError(reason, 'Unable to load SEO metadata.')));
    else if (type === 'contact') Promise.all([api.admin.settings('contact'), api.admin.settings('social')]).then(([contactItem, socialItem]) => {
      const contactValue = contactItem?.value && typeof contactItem.value === 'object' ? contactItem.value as Record<string, unknown> : {};
      const socialValue = socialItem?.value && typeof socialItem.value === 'object' ? socialItem.value as Record<string, unknown> : {};
      setValue({
        ...contactValue,
        socialFacebook: typeof socialValue.facebook === 'string' ? socialValue.facebook : '',
        socialX: typeof socialValue.x === 'string' ? socialValue.x : '',
        socialLinkedin: typeof socialValue.linkedin === 'string' ? socialValue.linkedin : '',
        socialInstagram: typeof socialValue.instagram === 'string' ? socialValue.instagram : '',
      });
    }).catch((reason) => setError(apiError(reason, 'Unable to load contact settings.')));
    else api.admin.settings(type).then((item) => setValue((item.value as Record<string, unknown>) ?? {})).catch((reason) => setError(apiError(reason, 'Unable to load settings.')));
  }, [type]);
  const isContact = type === 'contact';
  const save = async () => {
    try {
      if (isContact) {
        const { socialFacebook, socialX, socialLinkedin, socialInstagram, ...contactValue } = value;
        await Promise.all([
          api.admin.saveSettings('contact', contactValue),
          api.admin.saveSettings('social', { facebook: socialFacebook, x: socialX, linkedin: socialLinkedin, instagram: socialInstagram }),
        ]);
      } else await api.admin.saveSettings(type, value);
      setSaved(true);
    } catch (reason) { setError(apiError(reason, 'Unable to save settings.')); }
  };
  if (type === 'seo') return <><Header eyebrow="Website / SEO & Metadata" title="SEO & metadata" description="Health scores and metadata coverage calculated by the backend." />{error && <ErrorNotice message={error} />}{!rows.length && !error ? <LoadingNotice /> : <section className={surface + ' overflow-hidden'}>{rows.map((item) => <div key={String(item.pageKey)} className="grid gap-2 border-t border-[#5F021F]/8 px-5 py-4 md:grid-cols-[1fr_2fr_.5fr]"><span className="font-bold text-bordeaux">{String(item.pageKey)}</span><span className="text-sm text-ink/65">{String(item.seoTitle ?? 'No title')}</span><span className="font-bold text-gold-dark">{String((item.health as Record<string, unknown> | undefined)?.score ?? '—')}%</span></div>)}</section>}</>;
  const update = (key: string, next: string) => setValue({ ...value, [key]: next });
  return <><Header eyebrow={'Website / ' + (isContact ? 'Contact Information' : 'General Settings')} title={isContact ? 'Contact information' : 'General settings'} />{error && <ErrorNotice message={error} />}{saved && <div className="mb-5 flex items-center gap-2 rounded-[2px] border border-[#6B6A24]/30 bg-[#6B6A24]/10 px-4 py-3 text-sm text-[#53541B]"><Check className="h-4 w-4" />Settings saved to the Node.js API.</div>}<section className={surface + ' max-w-3xl p-6 sm:p-8'}>{isContact ? <div className="grid gap-5 sm:grid-cols-2"><SettingField label="Primary phone" value={value.primaryPhone} onChange={(next) => update('primaryPhone', next)} /><SettingField label="Secondary phone" value={value.secondaryPhone} onChange={(next) => update('secondaryPhone', next)} /><SettingField label="Email" value={value.email} onChange={(next) => update('email', next)} wide /><SettingField label="WhatsApp URL" value={value.whatsapp} onChange={(next) => update('whatsapp', next)} wide /><SettingField label="Address" value={value.address} onChange={(next) => update('address', next)} wide area /><SettingField label="Google Maps link" value={value.mapUrl} onChange={(next) => update('mapUrl', next)} wide /><div className="sm:col-span-2 border-t border-[#5F021F]/10 pt-5"><p className="text-xs font-extrabold uppercase tracking-[0.13em] text-gold-dark">Social media</p><p className="mt-2 text-sm text-ink/55">These links are used in the public website footer.</p></div><SettingField label="Facebook URL" value={value.socialFacebook} onChange={(next) => update('socialFacebook', next)} wide /><SettingField label="X URL" value={value.socialX} onChange={(next) => update('socialX', next)} wide /><SettingField label="LinkedIn URL" value={value.socialLinkedin} onChange={(next) => update('socialLinkedin', next)} wide /><SettingField label="Instagram URL" value={value.socialInstagram} onChange={(next) => update('socialInstagram', next)} wide /></div> : <div className="grid gap-5 sm:grid-cols-2"><SettingField label="Firm display name" value={value.firmName} onChange={(next) => update('firmName', next)} wide /><SettingField label="Timezone" value={value.timezone ?? 'Africa/Lagos'} onChange={(next) => update('timezone', next)} /><SettingField label="Notification email" value={value.notificationEmail} onChange={(next) => update('notificationEmail', next)} /></div>}<button type="button" onClick={() => void save()} className="mt-7 inline-flex min-h-11 items-center gap-2 border border-bordeaux bg-bordeaux px-5 py-3 text-xs font-extrabold uppercase tracking-[0.1em] text-gold-bright"><Save className="h-4 w-4" />Save changes</button></section></>;
};

const SettingField = ({ label, value, onChange, wide = false, area = false }: { label: string; value: unknown; onChange: (value: string) => void; wide?: boolean; area?: boolean }) => <label className={'block text-sm font-bold ' + (wide ? 'sm:col-span-2' : '')}>{label}{area ? <textarea className={input + ' min-h-24 py-3'} value={String(value ?? '')} onChange={(event) => onChange(event.target.value)} /> : <input className={input} value={String(value ?? '')} onChange={(event) => onChange(event.target.value)} />}</label>;

export const LiveActivityPage = () => {
  const [items, setItems] = useState<Record<string, unknown>[] | null>(null);
  const [error, setError] = useState('');
  useEffect(() => { api.admin.activity().then(setItems).catch((reason) => setError(apiError(reason, 'Unable to load activity logs.'))); }, []);
  return <><Header eyebrow="Administration / Activity" title="Activity log" description="Auditable administrative actions and content revisions." />{error && <ErrorNotice message={error} />}{!items ? <LoadingNotice /> : <section className={surface + ' overflow-hidden'}>{items.map((item, index) => <div key={String(item._id ?? item.id ?? index)} className="flex flex-col gap-2 border-t border-[#5F021F]/8 px-5 py-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm text-ink/75"><strong>{String(item.action ?? 'Action')}</strong> {String(item.description ?? item.entityType ?? '')}</p><p className="mt-1 text-xs text-ink/45">{String(item.adminId ?? 'System')}</p></div><span className="text-xs text-ink/45">{dateText(item.createdAt)}</span></div>)}{!items.length && <Empty text="No activity has been recorded." />}</section>}</>;
};

export const LiveAdminUsers = () => {
  const [items, setItems] = useState<Record<string, unknown>[] | null>(null);
  const [error, setError] = useState('');
  useEffect(() => { api.admin.users().then(setItems).catch((reason) => setError(apiError(reason, 'Unable to load admin users.'))); }, []);
  return <><Header eyebrow="Administration / Admin Users" title="Admin users"  />{error && <ErrorNotice message={error} />}{!items ? <LoadingNotice /> : <section className={surface + ' overflow-hidden'}>{items.map((item) => <div key={String(item._id ?? item.id ?? item.email)} className="flex flex-col gap-2 border-t border-[#5F021F]/8 px-5 py-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-bold text-bordeaux">{String(item.firstName ?? '')} {String(item.lastName ?? '')}</p><p className="text-sm text-ink/50">{String(item.email)}</p></div><span className="inline-flex items-center gap-2 text-sm text-ink/60"><Users className="h-4 w-4 text-gold-dark" />{String(item.role ?? 'content_editor')}</span></div>)}{!items.length && <Empty text="No admin users found." />}</section>}</>;
};
