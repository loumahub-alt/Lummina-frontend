import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Check, Pencil, Plus, Search, ShieldCheck, Trash2, X } from 'lucide-react';
import { api, ApiError } from '../services/api';

const surface = 'rounded-[3px] border border-[#5F021F]/10 bg-[#FFF9EF] shadow-[0_14px_45px_rgba(95,2,31,0.07)]';
const input = 'mt-2 min-h-11 w-full rounded-[2px] border border-[#5F021F]/15 bg-white/70 px-3 text-sm text-ink outline-none transition focus:border-gold';

type TestimonialRecord = Record<string, unknown>;

type TestimonialEditor = {
  id?: string;
  clientDisplayName: string;
  company: string;
  position: string;
  testimonial: string;
  identityMode: 'anonymous' | 'named';
  consentConfirmed: boolean;
  isFeatured: boolean;
  displayOrder: string;
  status: 'draft' | 'review' | 'published';
};

const editorFromRecord = (record?: TestimonialRecord): TestimonialEditor => ({
  id: record ? String(record.id ?? record._id ?? '') : undefined,
  clientDisplayName: String(record?.clientDisplayName ?? ''),
  company: String(record?.company ?? ''),
  position: String(record?.position ?? ''),
  testimonial: String(record?.testimonial ?? ''),
  identityMode: record?.identityMode === 'named' ? 'named' : 'anonymous',
  consentConfirmed: record?.consentConfirmed === true,
  isFeatured: record?.isFeatured === true,
  displayOrder: String(record?.displayOrder ?? 0),
  status: (String(record?.status ?? 'draft') as TestimonialEditor['status']),
});

const displayStatus = (value: unknown) => String(value ?? 'draft').replace(/^./, (character) => character.toUpperCase());

export const TestimonialsContentPage = () => {
  const [records, setRecords] = useState<TestimonialRecord[]>([]);
  const [editor, setEditor] = useState<TestimonialEditor | null>(null);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState('');
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [savedStatus, setSavedStatus] = useState<TestimonialEditor['status'] | null>(null);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      setRecords(await api.admin.content('testimonials', '?perPage=100'));
    } catch (reason) {
      setError(reason instanceof ApiError ? reason.message : 'Unable to load testimonials.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const filtered = useMemo(() => records.filter((record) => {
    const searchable = [record.clientDisplayName, record.company, record.position, record.testimonial]
      .map((value) => String(value ?? '').toLowerCase())
      .join(' ');
    const matchesQuery = !query.trim() || searchable.includes(query.trim().toLowerCase());
    const matchesStatus = statusFilter === 'all' || String(record.status ?? 'draft') === statusFilter;
    return matchesQuery && matchesStatus;
  }), [query, records, statusFilter]);

  const openEdit = async (record?: TestimonialRecord) => {
    setError('');
    setSaved(false);
    setSavedStatus(null);
    if (!record) {
      setEditor(editorFromRecord());
      return;
    }
    const id = String(record.id ?? record._id ?? '');
    try {
      setEditor(editorFromRecord(id ? await api.admin.contentItem('testimonials', id) : record));
    } catch (reason) {
      setError(reason instanceof ApiError ? reason.message : 'Unable to load this testimonial from the API.');
    }
  };

  const update = (key: keyof TestimonialEditor, value: string | boolean) => {
    setEditor((current) => current ? { ...current, [key]: value } : current);
  };

  const save = async (nextStatus: TestimonialEditor['status']) => {
    if (!editor) return;
    if (!editor.clientDisplayName.trim() || !editor.position.trim() || !editor.testimonial.trim()) {
      setError('Client display name, position and testimonial are required.');
      return;
    }
    if (nextStatus === 'published' && !editor.consentConfirmed) {
      setError('Consent confirmation is required before publishing a testimonial.');
      return;
    }

    setSaving(true);
    setError('');
    setSaved(false);
    setSavedStatus(null);
    try {
      const savedRecord = await api.admin.saveContent('testimonials', {
        clientDisplayName: editor.clientDisplayName.trim(),
        company: editor.company.trim() || null,
        position: editor.position.trim(),
        testimonial: editor.testimonial.trim(),
        identityMode: editor.identityMode,
        consentConfirmed: editor.consentConfirmed,
        isFeatured: editor.isFeatured,
        displayOrder: Number(editor.displayOrder) || 0,
        status: nextStatus,
      }, editor.id);
      if (savedRecord.identityMode !== editor.identityMode || savedRecord.consentConfirmed !== editor.consentConfirmed || savedRecord.isFeatured !== editor.isFeatured) {
        throw new Error('The current backend did not save the testimonial settings. Restart or redeploy the backend, then save this testimonial again.');
      }
      setEditor(null);
      setSaved(true);
      setSavedStatus(nextStatus);
      await load();
    } catch (reason) {
      setError(reason instanceof ApiError ? reason.message : 'Unable to save this testimonial.');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (record: TestimonialRecord) => {
    const id = String(record.id ?? record._id ?? '');
    if (!id || !window.confirm('Delete this testimonial permanently? This cannot be undone.')) return;
    setError('');
    setDeletingId(id);
    try {
      await api.admin.deleteContent('testimonials', id);
      await load();
    } catch (reason) {
      setError(reason instanceof ApiError ? reason.message : 'Unable to delete this testimonial.');
    } finally {
      setDeletingId('');
    }
  };

  return (
    <>
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-gold-dark">Website Content / Client Perspectives</p>
          <h1 className="mt-3 font-serif text-4xl leading-tight text-bordeaux md:text-5xl">Testimonials</h1>
          <p className="mt-3 max-w-2xl leading-7 text-ink/60">Manage consent-aware client perspectives, identity display, featured status, ordering and publication.</p>
        </div>
        <button type="button" onClick={() => void openEdit()} className="inline-flex min-h-11 items-center gap-2 border border-bordeaux bg-bordeaux px-4 text-xs font-extrabold uppercase tracking-[0.1em] text-gold-bright hover:bg-[#4B0019]">
          <Plus className="h-4 w-4" /> Add testimonial
        </button>
      </div>

      {error && <div role="alert" className="mb-5 rounded-[3px] border border-red-300/40 bg-red-50 px-5 py-4 text-sm text-red-800">{error}</div>}
      {saved && <div className="mb-5 flex items-center gap-2 rounded-[2px] border border-[#6B6A24]/30 bg-[#6B6A24]/10 px-4 py-3 text-sm text-[#53541B]"><Check className="h-4 w-4" />{savedStatus === 'published' ? 'Testimonial published and visible on the public website.' : savedStatus ? `Testimonial saved as ${displayStatus(savedStatus)}. Publish it to make it visible on the public website.` : 'Testimonial changes saved.'}</div>}

      <section className={surface + ' overflow-hidden'}>
        <div className="flex flex-col gap-3 border-b border-[#5F021F]/8 p-4 sm:flex-row sm:items-center sm:justify-between">
          <label className="relative block max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} className="h-10 w-full rounded-[2px] border border-[#5F021F]/12 bg-white/60 pl-10 pr-3 text-sm outline-none focus:border-gold" placeholder="Search testimonials…" />
          </label>
          <div className="flex items-center gap-2">
            {['all', 'published', 'draft', 'review'].map((value) => (
              <button type="button" key={value} onClick={() => setStatusFilter(value)} className={'rounded-[2px] px-3 py-2 text-xs font-bold ' + (statusFilter === value ? 'bg-bordeaux text-gold-bright' : 'bg-[#5F021F]/5 text-ink/55')}>
                {value === 'all' ? 'All' : displayStatus(value)}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <p className="p-10 text-center text-sm text-ink/55">Loading testimonials…</p>
        ) : filtered.length === 0 ? (
          <p className="p-12 text-center text-sm text-ink/55">No testimonials match these filters.</p>
        ) : (
          <div className="divide-y divide-[#5F021F]/8">
            {filtered.map((record) => {
              const id = String(record.id ?? record._id ?? record.clientDisplayName);
              return (
                <div key={id} className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-bordeaux font-serif text-2xl text-gold-bright">“</div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-bordeaux">{String(record.clientDisplayName ?? 'Unnamed client')}</p>
                    <p className="mt-1 line-clamp-2 text-sm text-ink/60">{String(record.testimonial ?? 'No testimonial text')}</p>
                    <p className="mt-1 text-xs text-ink/45">{String(record.position ?? 'No position')} · {displayStatus(record.status)}{record.consentConfirmed === true ? ' · Consent confirmed' : ' · Consent missing'}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => void openEdit(record)} className="inline-flex items-center gap-2 rounded border border-[#5F021F]/12 px-3 py-2 text-xs font-bold text-ink/60 hover:border-gold-dark hover:text-bordeaux"><Pencil className="h-3.5 w-3.5" /> Edit</button>
                    <button type="button" onClick={() => void remove(record)} disabled={deletingId === id} aria-label="Delete testimonial" className="rounded border border-red-200/70 p-2 text-red-700/60 hover:border-red-400 hover:text-red-700 disabled:cursor-wait disabled:opacity-50"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {editor && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-[#170009]/55 p-0 sm:items-center sm:p-6">
          <form onSubmit={(event: FormEvent) => { event.preventDefault(); void save(editor.status); }} className="max-h-[94vh] w-full max-w-3xl overflow-y-auto rounded-t-[4px] bg-[#FFF9EF] p-6 shadow-[0_18px_70px_rgba(23,0,9,0.25)] sm:rounded-[4px] sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-gold-dark">Client perspective</p>
                <h2 className="mt-2 font-serif text-3xl text-bordeaux">{editor.id ? 'Edit testimonial' : 'Add testimonial'}</h2>
              </div>
              <button type="button" onClick={() => { if (!saving) setEditor(null); }} aria-label="Close testimonial editor" className="rounded border border-[#5F021F]/12 p-2 text-ink/50 hover:text-bordeaux"><X className="h-5 w-5" /></button>
            </div>

            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <label className="block text-sm font-bold">Client display name *<input required className={input} value={editor.clientDisplayName} onChange={(event) => update('clientDisplayName', event.target.value)} placeholder="e.g. Business Client" /></label>
              <label className="block text-sm font-bold">Position / matter *<input required className={input} value={editor.position} onChange={(event) => update('position', event.target.value)} placeholder="e.g. Commercial Advisory Matter" /></label>
              <label className="block text-sm font-bold">Company<input className={input} value={editor.company} onChange={(event) => update('company', event.target.value)} placeholder="Optional" /></label>
              <label className="block text-sm font-bold">Identity display<select className={input} value={editor.identityMode} onChange={(event) => update('identityMode', event.target.value)}><option value="anonymous">Anonymous</option><option value="named">Named</option></select></label>
              <label className="block text-sm font-bold md:col-span-2">Testimonial *<textarea required className={input + ' min-h-36 py-3'} value={editor.testimonial} onChange={(event) => update('testimonial', event.target.value)} placeholder="Write the approved client perspective." /></label>
              <label className="block text-sm font-bold">Display order<input type="number" min="0" className={input} value={editor.displayOrder} onChange={(event) => update('displayOrder', event.target.value)} /></label>
              <label className="block text-sm font-bold">Publication status<select className={input} value={editor.status} onChange={(event) => update('status', event.target.value)}><option value="draft">Draft</option><option value="review">Review</option><option value="published">Published</option></select></label>
              <div className="space-y-3 md:col-span-2">
                <label className="flex cursor-pointer items-start gap-3 text-sm text-ink/75">
                  <input type="checkbox" checked={editor.consentConfirmed} onChange={(event) => update('consentConfirmed', event.target.checked)} className="mt-1 h-4 w-4 accent-gold" />
                  <span><strong className="text-bordeaux">Consent confirmed</strong><br /><span className="text-xs text-ink/55">Required before this testimonial can be published publicly.</span></span>
                </label>
                <label className="flex cursor-pointer items-start gap-3 text-sm text-ink/75">
                  <input type="checkbox" checked={editor.isFeatured} onChange={(event) => update('isFeatured', event.target.checked)} className="mt-1 h-4 w-4 accent-gold" />
                  <span><strong className="text-bordeaux">Featured testimonial</strong><br /><span className="text-xs text-ink/55">Mark this client perspective as a featured item for future layouts.</span></span>
                </label>
              </div>
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-[3px] border border-gold/25 bg-gold/10 p-4 text-sm leading-6 text-gold-dark">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
              <p>Do not publish identifying information unless the client has expressly approved the display mode and wording.</p>
            </div>

            <div className="mt-7 flex flex-col-reverse gap-3 border-t border-[#5F021F]/10 pt-5 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => { if (!saving) setEditor(null); }} disabled={saving} className="min-h-11 border border-[#5F021F]/15 px-5 text-xs font-extrabold uppercase tracking-[0.1em] text-bordeaux">Cancel</button>
              <button type="submit" disabled={saving} className="inline-flex min-h-11 items-center justify-center gap-2 border border-bordeaux px-5 text-xs font-extrabold uppercase tracking-[0.1em] text-bordeaux disabled:opacity-60">{saving ? 'Saving…' : 'Save ' + (editor.status === 'published' ? 'and publish' : 'draft')}</button>
              {editor.status !== 'published' && <button type="button" disabled={saving} onClick={() => void save('published')} className="inline-flex min-h-11 items-center justify-center gap-2 border border-bordeaux bg-bordeaux px-5 text-xs font-extrabold uppercase tracking-[0.1em] text-gold-bright disabled:opacity-60">{saving ? 'Publishing…' : 'Publish'}</button>}
            </div>
          </form>
        </div>
      )}
    </>
  );
};
