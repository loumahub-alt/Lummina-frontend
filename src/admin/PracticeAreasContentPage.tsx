import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Check, ChevronDown, Pencil, Plus, Search, Trash2, X } from 'lucide-react';
import { api, ApiError } from '../services/api';
import { iconMap } from '../utils/icons';
import type { IconKey } from '../types';

const surface = 'rounded-[3px] border border-[#5F021F]/10 bg-[#FFF9EF] shadow-[0_14px_45px_rgba(95,2,31,0.07)]';
const input = 'mt-2 min-h-11 w-full rounded-[2px] border border-[#5F021F]/15 bg-white/70 px-3 text-sm text-ink outline-none transition focus:border-gold';
const iconKeys = Object.keys(iconMap) as IconKey[];

type PracticeAreaRecord = Record<string, unknown>;

type PracticeAreaEditor = {
  id?: string;
  title: string;
  icon: IconKey;
  shortDescription: string;
  fullDescription: string;
  services: string;
  displayOrder: string;
  status: 'draft' | 'review' | 'published';
};

const servicesFromRecord = (value: unknown) => Array.isArray(value)
  ? value.map((service) => {
    if (typeof service === 'string') return service;
    if (service && typeof service === 'object') return String((service as Record<string, unknown>).name ?? '');
    return '';
  }).filter(Boolean).join('\n')
  : '';

const editorFromRecord = (record?: PracticeAreaRecord): PracticeAreaEditor => ({
  id: record ? String(record.id ?? record._id ?? '') : undefined,
  title: String(record?.title ?? ''),
  icon: (typeof record?.icon === 'string' && record.icon in iconMap ? record.icon : 'briefcase') as IconKey,
  shortDescription: String(record?.shortDescription ?? ''),
  fullDescription: String(record?.fullDescription ?? ''),
  services: servicesFromRecord(record?.services),
  displayOrder: String(record?.displayOrder ?? 0),
  status: (String(record?.status ?? 'draft') as PracticeAreaEditor['status']),
});

const splitLines = (value: string) => value.split(/\r?\n|,/).map((item) => item.trim()).filter(Boolean);
const displayStatus = (value: unknown) => String(value ?? 'draft').replace(/^./, (character) => character.toUpperCase());

export const PracticeAreasContentPage = () => {
  const [records, setRecords] = useState<PracticeAreaRecord[]>([]);
  const [editor, setEditor] = useState<PracticeAreaEditor | null>(null);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState('');
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [savedStatus, setSavedStatus] = useState<PracticeAreaEditor['status'] | null>(null);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      setRecords(await api.admin.content('practice-areas', '?perPage=100'));
    } catch (reason) {
      setError(reason instanceof ApiError ? reason.message : 'Unable to load practice areas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const filtered = useMemo(() => records.filter((record) => {
    const title = String(record.title ?? '').toLowerCase();
    const matchesQuery = !query.trim() || title.includes(query.trim().toLowerCase());
    const matchesStatus = statusFilter === 'all' || String(record.status ?? 'draft') === statusFilter;
    return matchesQuery && matchesStatus;
  }), [query, records, statusFilter]);

  const update = (key: keyof PracticeAreaEditor, value: string) => {
    setEditor((current) => current ? { ...current, [key]: value } : current);
  };

  const openEdit = async (record: PracticeAreaRecord) => {
    setError('');
    setSaved(false);
    setSavedStatus(null);
    const id = String(record.id ?? record._id ?? '');
    try {
      setEditor(editorFromRecord(id ? await api.admin.contentItem('practice-areas', id) : record));
    } catch (reason) {
      setError(reason instanceof ApiError ? reason.message : 'Unable to load this practice area from the API.');
    }
  };

  const save = async (nextStatus: PracticeAreaEditor['status']) => {
    if (!editor) return;
    if (!editor.title.trim() || !editor.shortDescription.trim() || !editor.fullDescription.trim()) {
      setError('Title, short description and full description are required.');
      return;
    }

    setSaving(true);
    setError('');
    setSaved(false);
    setSavedStatus(null);
    try {
      await api.admin.saveContent('practice-areas', {
        title: editor.title.trim(),
        slug: editor.title,
        icon: editor.icon,
        shortDescription: editor.shortDescription.trim(),
        fullDescription: editor.fullDescription.trim(),
        services: splitLines(editor.services).map((name, displayOrder) => ({ name, displayOrder })),
        displayOrder: Number(editor.displayOrder) || 0,
        status: nextStatus,
      }, editor.id);
      setEditor(null);
      setSaved(true);
      setSavedStatus(nextStatus);
      await load();
    } catch (reason) {
      setError(reason instanceof ApiError ? reason.message : 'Unable to save this practice area.');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (record: PracticeAreaRecord) => {
    const id = String(record.id ?? record._id ?? '');
    if (!id || !window.confirm('Delete ' + String(record.title ?? 'this practice area') + ' permanently? This cannot be undone.')) return;
    setError('');
    setDeletingId(id);
    try {
      await api.admin.deleteContent('practice-areas', id);
      await load();
    } catch (reason) {
      setError(reason instanceof ApiError ? reason.message : 'Unable to delete this practice area.');
    } finally {
      setDeletingId('');
    }
  };

  return (
    <>
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-gold-dark">Website Content / Services</p>
          <h1 className="mt-3 font-serif text-4xl leading-tight text-bordeaux md:text-5xl">Practice Areas</h1>
          <p className="mt-3 max-w-2xl leading-7 text-ink/60">Manage the areas of law shown publicly, including their descriptions, service lists, icons and publishing status.</p>
        </div>
        <button type="button" onClick={() => { setSaved(false); setSavedStatus(null); setError(''); setEditor(editorFromRecord()); }} className="inline-flex min-h-11 items-center gap-2 border border-bordeaux bg-bordeaux px-4 text-xs font-extrabold uppercase tracking-[0.1em] text-gold-bright hover:bg-[#4B0019]">
          <Plus className="h-4 w-4" /> Add practice area
        </button>
      </div>

      {error && <div role="alert" className="mb-5 rounded-[3px] border border-red-300/40 bg-red-50 px-5 py-4 text-sm text-red-800">{error}</div>}
      {saved && <div className="mb-5 flex items-center gap-2 rounded-[2px] border border-[#6B6A24]/30 bg-[#6B6A24]/10 px-4 py-3 text-sm text-[#53541B]"><Check className="h-4 w-4" />{savedStatus === 'published' ? 'Practice area published and visible on the public website.' : savedStatus ? `Practice area saved as ${displayStatus(savedStatus)}. Publish it to make it visible on the public website.` : 'Practice area changes saved.'}</div>}

      <section className={surface + ' overflow-hidden'}>
        <div className="flex flex-col gap-3 border-b border-[#5F021F]/8 p-4 sm:flex-row sm:items-center sm:justify-between">
          <label className="relative block max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} className="h-10 w-full rounded-[2px] border border-[#5F021F]/12 bg-white/60 pl-10 pr-3 text-sm outline-none focus:border-gold" placeholder="Search practice areas…" />
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
          <p className="p-10 text-center text-sm text-ink/55">Loading practice areas…</p>
        ) : filtered.length === 0 ? (
          <p className="p-12 text-center text-sm text-ink/55">No practice areas match these filters.</p>
        ) : (
          <div className="divide-y divide-[#5F021F]/8">
            {filtered.map((record) => {
              const id = String(record.id ?? record._id ?? record.title);
              const Icon = typeof record.icon === 'string' && record.icon in iconMap ? iconMap[record.icon as IconKey] : iconMap.briefcase;
              return (
                <div key={id} className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-[2px] bg-bordeaux/10"><Icon className="h-7 w-7 text-gold-dark" /></div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-bordeaux">{String(record.title ?? 'Untitled practice area')}</p>
                    <p className="mt-1 line-clamp-2 text-sm text-ink/60">{String(record.shortDescription ?? 'No short description')}</p>
                    <p className="mt-1 text-xs text-ink/45">{displayStatus(record.status)} · {Array.isArray(record.services) ? record.services.length : 0} services</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => void openEdit(record)} className="inline-flex items-center gap-2 rounded border border-[#5F021F]/12 px-3 py-2 text-xs font-bold text-ink/60 hover:border-gold-dark hover:text-bordeaux"><Pencil className="h-3.5 w-3.5" /> Edit</button>
                    <button type="button" onClick={() => void remove(record)} disabled={deletingId === id} aria-label={'Delete ' + String(record.title ?? 'practice area')} className="rounded border border-red-200/70 p-2 text-red-700/60 hover:border-red-400 hover:text-red-700 disabled:cursor-wait disabled:opacity-50"><Trash2 className="h-4 w-4" /></button>
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
                <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-gold-dark">Practice area profile</p>
                <h2 className="mt-2 font-serif text-3xl text-bordeaux">{editor.id ? 'Edit practice area' : 'Add practice area'}</h2>
              </div>
              <button type="button" onClick={() => { if (!saving) setEditor(null); }} aria-label="Close practice area editor" className="rounded border border-[#5F021F]/12 p-2 text-ink/50 hover:text-bordeaux"><X className="h-5 w-5" /></button>
            </div>

            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <label className="block text-sm font-bold">Title *<input required className={input} value={editor.title} onChange={(event) => update('title', event.target.value)} placeholder="e.g. Business Law" /></label>
              <label className="block text-sm font-bold">Icon<div className="relative"><select className={input} value={editor.icon} onChange={(event) => update('icon', event.target.value)}>{iconKeys.map((key) => <option key={key} value={key}>{key}</option>)}</select><ChevronDown aria-hidden="true" className="pointer-events-none relative float-right -mt-8 mr-3 h-4 w-4 text-ink/45" /></div><span className="mt-3 inline-flex items-center gap-2 text-xs font-normal text-ink/55">{(() => { const PreviewIcon = iconMap[editor.icon]; return <PreviewIcon className="h-5 w-5 text-gold-dark" />; })()} Selected icon preview</span></label>
              <label className="block text-sm font-bold md:col-span-2">Short description *<textarea required className={input + ' min-h-24 py-3'} value={editor.shortDescription} onChange={(event) => update('shortDescription', event.target.value)} placeholder="The concise description shown on cards and previews." /></label>
              <label className="block text-sm font-bold md:col-span-2">Full description *<textarea required className={input + ' min-h-36 py-3'} value={editor.fullDescription} onChange={(event) => update('fullDescription', event.target.value)} placeholder="The complete description shown on the Practice Areas page." /></label>
              <label className="block text-sm font-bold">Services included<textarea className={input + ' min-h-36 py-3'} value={editor.services} onChange={(event) => update('services', event.target.value)} placeholder="One service per line or comma-separated" /></label>
              <div className="grid gap-5">
                <label className="block text-sm font-bold">Display order<input type="number" min="0" className={input} value={editor.displayOrder} onChange={(event) => update('displayOrder', event.target.value)} /></label>
                <label className="block text-sm font-bold">Publication status<select className={input} value={editor.status} onChange={(event) => update('status', event.target.value)}><option value="draft">Draft</option><option value="review">Review</option><option value="published">Published</option></select></label>
              </div>
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
