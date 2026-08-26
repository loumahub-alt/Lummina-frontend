import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Check, Pencil, Plus, Search, Trash2, X } from 'lucide-react';
import { api, ApiError } from '../services/api';

const surface = 'rounded-[3px] border border-[#5F021F]/10 bg-[#FFF9EF] shadow-[0_14px_45px_rgba(95,2,31,0.07)]';
const input = 'mt-2 min-h-11 w-full rounded-[2px] border border-[#5F021F]/15 bg-white/70 px-3 text-sm text-ink outline-none transition focus:border-gold';

type ResultRecord = Record<string, unknown>;

type ResultEditor = {
  id?: string;
  title: string;
  headlineFigure: string;
  category: string;
  shortDescription: string;
  matterDescription: string;
  jurisdiction: string;
  displayOrder: string;
  status: 'draft' | 'review' | 'published';
};

const editorFromRecord = (record?: ResultRecord): ResultEditor => ({
  id: record ? String(record.id ?? record._id ?? '') : undefined,
  title: String(record?.title ?? ''),
  headlineFigure: String(record?.headlineFigure ?? ''),
  category: String(record?.category ?? ''),
  shortDescription: String(record?.shortDescription ?? ''),
  matterDescription: String(record?.matterDescription ?? ''),
  jurisdiction: String(record?.jurisdiction ?? ''),
  displayOrder: String(record?.displayOrder ?? 0),
  status: (String(record?.status ?? 'draft') as ResultEditor['status']),
});

const displayStatus = (value: unknown) => String(value ?? 'draft').replace(/^./, (character) => character.toUpperCase());

export const ResultsContentPage = () => {
  const [records, setRecords] = useState<ResultRecord[]>([]);
  const [editor, setEditor] = useState<ResultEditor | null>(null);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState('');
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [savedStatus, setSavedStatus] = useState<ResultEditor['status'] | null>(null);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      setRecords(await api.admin.content('results', '?perPage=100'));
    } catch (reason) {
      setError(reason instanceof ApiError ? reason.message : 'Unable to load results.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const filtered = useMemo(() => records.filter((record) => {
    const searchable = [record.title, record.category, record.jurisdiction]
      .map((value) => String(value ?? '').toLowerCase())
      .join(' ');
    const matchesQuery = !query.trim() || searchable.includes(query.trim().toLowerCase());
    const matchesStatus = statusFilter === 'all' || String(record.status ?? 'draft') === statusFilter;
    return matchesQuery && matchesStatus;
  }), [query, records, statusFilter]);

  const openEdit = async (record?: ResultRecord) => {
    setError('');
    setSaved(false);
    setSavedStatus(null);
    if (!record) {
      setEditor(editorFromRecord());
      return;
    }
    const id = String(record.id ?? record._id ?? '');
    try {
      setEditor(editorFromRecord(id ? await api.admin.contentItem('results', id) : record));
    } catch (reason) {
      setError(reason instanceof ApiError ? reason.message : 'Unable to load this result from the API.');
    }
  };

  const update = (key: keyof ResultEditor, value: string) => {
    setEditor((current) => current ? { ...current, [key]: value } : current);
  };

  const save = async (nextStatus: ResultEditor['status']) => {
    if (!editor) return;
    if (!editor.title.trim() || !editor.headlineFigure.trim() || !editor.category.trim() || !editor.shortDescription.trim()) {
      setError('Title, headline figure, category and short description are required.');
      return;
    }

    setSaving(true);
    setError('');
    setSaved(false);
    setSavedStatus(null);
    try {
      const savedRecord = await api.admin.saveContent('results', {
        title: editor.title.trim(),
        slug: editor.title,
        headlineFigure: editor.headlineFigure.trim(),
        category: editor.category.trim(),
        shortDescription: editor.shortDescription.trim(),
        matterDescription: editor.matterDescription.trim(),
        jurisdiction: editor.jurisdiction.trim(),
        displayOrder: Number(editor.displayOrder) || 0,
        status: nextStatus,
      }, editor.id);
      if (editor.matterDescription.trim() && savedRecord.matterDescription !== editor.matterDescription.trim()) {
        throw new Error('The current backend did not save the matter description. Restart or redeploy the backend, then save this result again.');
      }
      setEditor(null);
      setSaved(true);
      setSavedStatus(nextStatus);
      await load();
    } catch (reason) {
      setError(reason instanceof ApiError ? reason.message : 'Unable to save this result.');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (record: ResultRecord) => {
    const id = String(record.id ?? record._id ?? '');
    if (!id || !window.confirm('Delete ' + String(record.title ?? 'this result') + ' permanently? This cannot be undone.')) return;
    setError('');
    setDeletingId(id);
    try {
      await api.admin.deleteContent('results', id);
      await load();
    } catch (reason) {
      setError(reason instanceof ApiError ? reason.message : 'Unable to delete this result.');
    } finally {
      setDeletingId('');
    }
  };

  return (
    <>
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-gold-dark">Website Content / Representative Matters</p>
          <h1 className="mt-3 font-serif text-4xl leading-tight text-bordeaux md:text-5xl">Results</h1>
          <p className="mt-3 max-w-2xl leading-7 text-ink/60">Manage representative outcomes, case highlights and the details shown on the public Results page.</p>
        </div>
        <button type="button" onClick={() => void openEdit()} className="inline-flex min-h-11 items-center gap-2 border border-bordeaux bg-bordeaux px-4 text-xs font-extrabold uppercase tracking-[0.1em] text-gold-bright hover:bg-[#4B0019]">
          <Plus className="h-4 w-4" /> Add result
        </button>
      </div>

      {error && <div role="alert" className="mb-5 rounded-[3px] border border-red-300/40 bg-red-50 px-5 py-4 text-sm text-red-800">{error}</div>}
      {saved && <div className="mb-5 flex items-center gap-2 rounded-[2px] border border-[#6B6A24]/30 bg-[#6B6A24]/10 px-4 py-3 text-sm text-[#53541B]"><Check className="h-4 w-4" />{savedStatus === 'published' ? 'Result published and visible on the public website.' : savedStatus ? `Result saved as ${displayStatus(savedStatus)}. Publish it to make it visible on the public website.` : 'Result changes saved.'}</div>}

      <section className={surface + ' overflow-hidden'}>
        <div className="flex flex-col gap-3 border-b border-[#5F021F]/8 p-4 sm:flex-row sm:items-center sm:justify-between">
          <label className="relative block max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} className="h-10 w-full rounded-[2px] border border-[#5F021F]/12 bg-white/60 pl-10 pr-3 text-sm outline-none focus:border-gold" placeholder="Search results, categories or jurisdictions…" />
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
          <p className="p-10 text-center text-sm text-ink/55">Loading results…</p>
        ) : filtered.length === 0 ? (
          <p className="p-12 text-center text-sm text-ink/55">No results match these filters.</p>
        ) : (
          <div className="divide-y divide-[#5F021F]/8">
            {filtered.map((record) => {
              const id = String(record.id ?? record._id ?? record.title);
              return (
                <div key={id} className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center">
                  <div className="grid h-16 w-20 shrink-0 place-items-center rounded-[2px] bg-bordeaux text-center text-gold-bright">
                    <span className="font-serif text-xl">{String(record.headlineFigure ?? '—')}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-bordeaux">{String(record.title ?? 'Untitled result')}</p>
                    {([record.category, record.jurisdiction].some((value) => typeof value === 'string' && value.trim())) && <p className="mt-1 text-sm text-ink/60">{[record.category, record.jurisdiction].filter((value) => typeof value === 'string' && value.trim()).join(' · ')}</p>}
                    <p className="mt-1 text-xs text-ink/45">{displayStatus(record.status)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => void openEdit(record)} className="inline-flex items-center gap-2 rounded border border-[#5F021F]/12 px-3 py-2 text-xs font-bold text-ink/60 hover:border-gold-dark hover:text-bordeaux"><Pencil className="h-3.5 w-3.5" /> Edit</button>
                    <button type="button" onClick={() => void remove(record)} disabled={deletingId === id} aria-label={'Delete ' + String(record.title ?? 'result')} className="rounded border border-red-200/70 p-2 text-red-700/60 hover:border-red-400 hover:text-red-700 disabled:cursor-wait disabled:opacity-50"><Trash2 className="h-4 w-4" /></button>
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
                <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-gold-dark">Representative matter</p>
                <h2 className="mt-2 font-serif text-3xl text-bordeaux">{editor.id ? 'Edit result' : 'Add result'}</h2>
              </div>
              <button type="button" onClick={() => { if (!saving) setEditor(null); }} aria-label="Close result editor" className="rounded border border-[#5F021F]/12 p-2 text-ink/50 hover:text-bordeaux"><X className="h-5 w-5" /></button>
            </div>

            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <label className="block text-sm font-bold md:col-span-2">Matter title *<input required className={input} value={editor.title} onChange={(event) => update('title', event.target.value)} placeholder="Describe the representative matter" /></label>
              <label className="block text-sm font-bold">Headline descriptor *<input required className={input} value={editor.headlineFigure} onChange={(event) => update('headlineFigure', event.target.value)} placeholder="e.g. Representative or Board-Level" /></label>
              <label className="block text-sm font-bold">Category *<input required className={input} value={editor.category} onChange={(event) => update('category', event.target.value)} placeholder="e.g. Debt Recovery" /></label>
              <label className="block text-sm font-bold">Jurisdiction<input className={input} value={editor.jurisdiction} onChange={(event) => update('jurisdiction', event.target.value)} placeholder="Nigeria" /></label>
              <label className="block text-sm font-bold">Display order<input type="number" min="0" className={input} value={editor.displayOrder} onChange={(event) => update('displayOrder', event.target.value)} /></label>
              <label className="block text-sm font-bold md:col-span-2">Short description *<textarea required className={input + ' min-h-28 py-3'} value={editor.shortDescription} onChange={(event) => update('shortDescription', event.target.value)} placeholder="The summary shown on the public result card." /></label>
              <label className="block text-sm font-bold md:col-span-2">Matter description<textarea className={input + ' min-h-32 py-3'} value={editor.matterDescription} onChange={(event) => update('matterDescription', event.target.value)} /></label>
              <label className="block text-sm font-bold">Publication status<select className={input} value={editor.status} onChange={(event) => update('status', event.target.value)}><option value="draft">Draft</option><option value="review">Review</option><option value="published">Published</option></select></label>
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
