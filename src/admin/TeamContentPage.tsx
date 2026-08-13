import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { Check, ImagePlus, Pencil, Plus, Search, Trash2, Upload, X } from 'lucide-react';
import { api, ApiError } from '../services/api';
import { contentAssetFromRecord } from '../utils/contentAssets';

const surface = 'rounded-[3px] border border-[#5F021F]/10 bg-[#FFF9EF] shadow-[0_14px_45px_rgba(95,2,31,0.07)]';
const input = 'mt-2 min-h-11 w-full rounded-[2px] border border-[#5F021F]/15 bg-white/70 px-3 text-sm text-ink outline-none transition focus:border-gold';
type TeamRecord = Record<string, unknown>;

type TeamEditor = {
  id?: string;
  fullName: string;
  role: string;
  location: string;
  shortBio: string;
  fullBio: string;
  practiceInterests: string;
  email: string;
  linkedin: string;
  education: string;
  admissions: string;
  displayOrder: string;
  status: 'draft' | 'review' | 'published';
  photoUrl: string;
  photoFile: File | null;
};

const lines = (value: unknown) => Array.isArray(value)
  ? value.filter((item): item is string => typeof item === 'string').join('\n')
  : '';

const nestedValue = (record: TeamRecord, key: string, child: string) => {
  const value = record[key];
  return value && typeof value === 'object' && !Array.isArray(value)
    ? String((value as Record<string, unknown>)[child] ?? '')
    : '';
};

const editorFromRecord = (record?: TeamRecord): TeamEditor => ({
  id: record ? String(record.id ?? record._id ?? '') : undefined,
  fullName: String(record?.fullName ?? ''),
  role: String(record?.role ?? ''),
  location: String(record?.location ?? ''),
  shortBio: String(record?.shortBio ?? ''),
  fullBio: String(record?.fullBio ?? ''),
  practiceInterests: lines(record?.practiceInterests),
  email: nestedValue(record ?? {}, 'contact', 'email'),
  linkedin: nestedValue(record ?? {}, 'contact', 'linkedin'),
  education: lines(record?.education),
  admissions: lines(record?.admissions),
  displayOrder: String(record?.displayOrder ?? 0),
  status: (String(record?.status ?? 'draft') as TeamEditor['status']),
  photoUrl: contentAssetFromRecord(record, 'photo').url,
  photoFile: null,
});

const displayStatus = (value: unknown) => String(value ?? 'draft').replace(/^./, (character) => character.toUpperCase());

const splitLines = (value: string) => value.split(/\r?\n|,/).map((item) => item.trim()).filter(Boolean);

const normalizeSocialUrl = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed || /^[a-z][a-z\d+.-]*:\/\//i.test(trimmed)) return trimmed;
  return 'https://' + trimmed;
};

export const TeamContentPage = () => {
  const [records, setRecords] = useState<TeamRecord[]>([]);
  const [editor, setEditor] = useState<TeamEditor | null>(null);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState('');
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [savedStatus, setSavedStatus] = useState<TeamEditor['status'] | null>(null);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      setRecords(await api.admin.content('team', '?perPage=100'));
    } catch (reason) {
      setError(reason instanceof ApiError ? reason.message : 'Unable to load team members.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const filtered = useMemo(() => records.filter((record) => {
    const name = String(record.fullName ?? '').toLowerCase();
    const role = String(record.role ?? '').toLowerCase();
    const matchesQuery = !query.trim() || name.includes(query.trim().toLowerCase()) || role.includes(query.trim().toLowerCase());
    const matchesStatus = statusFilter === 'all' || String(record.status ?? 'draft') === statusFilter;
    return matchesQuery && matchesStatus;
  }), [query, records, statusFilter]);

  const openNew = () => {
    setError('');
    setSaved(false);
    setSavedStatus(null);
    setEditor(editorFromRecord());
  };

  const openEdit = async (record: TeamRecord) => {
    setError('');
    setSaved(false);
    setSavedStatus(null);
    const id = String(record.id ?? record._id ?? '');
    if (!id) return setEditor(editorFromRecord(record));
    try {
      setEditor(editorFromRecord(await api.admin.contentItem('team', id)));
    } catch (reason) {
      setError(reason instanceof ApiError ? reason.message : 'Unable to load this team member from the API.');
    }
  };

  const closeEditor = () => {
    if (!saving) setEditor(null);
  };

  const update = (key: keyof TeamEditor, value: string | File | null) => {
    setEditor((current) => current ? { ...current, [key]: value } : current);
  };

  const selectPhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file.');
      return;
    }
    update('photoFile', file);
    update('photoUrl', URL.createObjectURL(file));
  };

  const save = async (event: FormEvent, nextStatus: TeamEditor['status']) => {
    event.preventDefault();
    if (!editor) return;
    if (!editor.fullName.trim() || !editor.role.trim() || !editor.fullBio.trim()) {
      setError('Full name, role and full biography are required.');
      return;
    }

    setSaving(true);
    setError('');
    setSaved(false);
    setSavedStatus(null);
    try {
      let photo: { url: string; mediaId?: string } | undefined = editor.photoUrl ? { url: editor.photoUrl } : undefined;
      if (editor.photoFile) {
        const body = new FormData();
        body.append('file', editor.photoFile);
        body.append('altText', editor.fullName + ', ' + editor.role);
        const media = await api.admin.upload(body);
        const uploadedUrl = String(media.url ?? media.secure_url ?? media.secureUrl ?? '').trim();
        if (!uploadedUrl) throw new Error('The image upload completed without a usable image URL.');
        photo = {
          url: uploadedUrl,
          mediaId: String(media.id ?? media._id ?? ''),
        };
      }

      const payload = {
        fullName: editor.fullName.trim(),
        slug: editor.fullName,
        role: editor.role,
        location: editor.location.trim(),
        shortBio: editor.shortBio.trim(),
        fullBio: editor.fullBio.trim(),
        practiceInterests: splitLines(editor.practiceInterests),
        contact: {
          email: editor.email.trim(),
          linkedin: normalizeSocialUrl(editor.linkedin),
        },
        education: splitLines(editor.education),
        admissions: splitLines(editor.admissions),
        displayOrder: Number(editor.displayOrder) || 0,
        status: nextStatus,
        ...(photo ? { photo } : {}),
      };
      const savedRecord = await api.admin.saveContent('team', payload, editor.id);
      if (!String(savedRecord.fullName ?? '').trim()) {
        throw new Error('The server returned an incomplete team profile. Restart the backend and try again.');
      }
      const expectedLists = [
        ['education', payload.education],
        ['admissions', payload.admissions],
        ['practiceInterests', payload.practiceInterests],
      ] as const;
      for (const [field, expected] of expectedLists) {
        if (expected.length > 0 && (!Array.isArray(savedRecord[field]) || savedRecord[field].length !== expected.length)) {
          throw new Error('The current backend did not save ' + field + '. Restart or redeploy the backend, then save this profile again.');
        }
      }
      setEditor(null);
      setSaved(true);
      setSavedStatus(nextStatus);
      await load();
    } catch (reason) {
      setError(reason instanceof ApiError ? reason.message : 'Unable to save this team member.');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (record: TeamRecord) => {
    const id = String(record.id ?? record._id ?? '');
    const name = String(record.fullName ?? 'this team member');
    if (!id || !window.confirm('Delete ' + name + ' permanently? This cannot be undone.')) return;
    setError('');
    setDeletingId(id);
    try {
      await api.admin.deleteContent('team', id);
      await load();
    } catch (reason) {
      setError(reason instanceof ApiError ? reason.message : 'Unable to delete this team member.');
    } finally {
      setDeletingId('');
    }
  };

  return (
    <>
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-gold-dark">Website Content / People</p>
          <h1 className="mt-3 font-serif text-4xl leading-tight text-bordeaux md:text-5xl">Our Team</h1>
          <p className="mt-3 max-w-2xl leading-7 text-ink/60">Add and publish lawyers or staff profiles, including their biography, practice interests and Cloudinary portrait.</p>
        </div>
        <button type="button" onClick={openNew} className="inline-flex min-h-11 items-center gap-2 border border-bordeaux bg-bordeaux px-4 text-xs font-extrabold uppercase tracking-[0.1em] text-gold-bright hover:bg-[#4B0019]">
          <Plus className="h-4 w-4" /> Add team member
        </button>
      </div>

      {error && <div role="alert" className="mb-5 rounded-[3px] border border-red-300/40 bg-red-50 px-5 py-4 text-sm text-red-800">{error}</div>}
      {saved && <div className="mb-5 flex items-center gap-2 rounded-[2px] border border-[#6B6A24]/30 bg-[#6B6A24]/10 px-4 py-3 text-sm text-[#53541B]"><Check className="h-4 w-4" />{savedStatus === 'published' ? 'Team member published and visible on the public website.' : savedStatus ? `Team member saved as ${displayStatus(savedStatus)}. Publish it to make it visible on the public website.` : 'Team member changes saved.'}</div>}

      <section className={surface + ' overflow-hidden'}>
        <div className="flex flex-col gap-3 border-b border-[#5F021F]/8 p-4 sm:flex-row sm:items-center sm:justify-between">
          <label className="relative block max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} className="h-10 w-full rounded-[2px] border border-[#5F021F]/12 bg-white/60 pl-10 pr-3 text-sm outline-none focus:border-gold" placeholder="Search people or roles…" />
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
          <p className="p-10 text-center text-sm text-ink/55">Loading team members…</p>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <ImagePlus className="mx-auto h-8 w-8 text-gold-dark" />
            <p className="mt-4 text-sm text-ink/55">No team members match these filters.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#5F021F]/8">
            {filtered.map((record) => {
              const id = String(record.id ?? record._id ?? record.fullName);
              const photo = nestedValue(record, 'photo', 'url');
              const role = typeof record.role === 'string' ? record.role : '';
              const location = typeof record.location === 'string' ? record.location : '';
              return (
                <div key={id} className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center">
                  {photo ? <img src={photo} alt="" className="h-16 w-16 rounded-[2px] object-cover" /> : <div className="grid h-16 w-16 shrink-0 place-items-center rounded-[2px] bg-bordeaux/10 text-gold-dark"><ImagePlus className="h-6 w-6" /></div>}
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-bordeaux">{String(record.fullName ?? 'Unnamed team member')}</p>
                    {(role || location) && <p className="mt-1 text-sm text-ink/60">{[role, location].filter(Boolean).join(' · ')}</p>}
                    <p className="mt-1 text-xs text-ink/45">{displayStatus(record.status)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => void openEdit(record)} className="inline-flex items-center gap-2 rounded border border-[#5F021F]/12 px-3 py-2 text-xs font-bold text-ink/60 hover:border-gold-dark hover:text-bordeaux"><Pencil className="h-3.5 w-3.5" /> Edit</button>
                    <button type="button" onClick={() => void remove(record)} disabled={deletingId === id} aria-label={'Delete ' + String(record.fullName ?? 'team member')} className="rounded border border-red-200/70 p-2 text-red-700/60 hover:border-red-400 hover:text-red-700 disabled:cursor-wait disabled:opacity-50"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {editor && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-[#170009]/55 p-0 sm:items-center sm:p-6">
          <form onSubmit={(event) => void save(event, editor.status)} className="max-h-[94vh] w-full max-w-4xl overflow-y-auto rounded-t-[4px] bg-[#FFF9EF] p-6 shadow-[0_18px_70px_rgba(23,0,9,0.25)] sm:rounded-[4px] sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-gold-dark">Team profile</p>
                <h2 className="mt-2 font-serif text-3xl text-bordeaux">{editor.id ? 'Edit team member' : 'Add team member'}</h2>
              </div>
              <button type="button" onClick={closeEditor} aria-label="Close team member editor" className="rounded border border-[#5F021F]/12 p-2 text-ink/50 hover:text-bordeaux"><X className="h-5 w-5" /></button>
            </div>

            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <label className="block text-sm font-bold">Full name *<input required className={input} value={editor.fullName} onChange={(event) => update('fullName', event.target.value)} /></label>
              <label className="block text-sm font-bold">Role *<input required className={input} value={editor.role} onChange={(event) => update('role', event.target.value)} /></label>
              <label className="block text-sm font-bold">Location<input className={input} value={editor.location} onChange={(event) => update('location', event.target.value)} /></label>
              <label className="block text-sm font-bold">Display order<input type="number" min="0" className={input} value={editor.displayOrder} onChange={(event) => update('displayOrder', event.target.value)} /></label>
              <label className="block text-sm font-bold md:col-span-2">Short biography<textarea className={input + ' min-h-24 py-3'} value={editor.shortBio} onChange={(event) => update('shortBio', event.target.value)} /></label>
              <label className="block text-sm font-bold md:col-span-2">Full biography *<textarea required className={input + ' min-h-36 py-3'} value={editor.fullBio} onChange={(event) => update('fullBio', event.target.value)} placeholder="Full profile biography." /></label>
              <label className="block text-sm font-bold">Practice interests<textarea className={input + ' min-h-28 py-3'} value={editor.practiceInterests} onChange={(event) => update('practiceInterests', event.target.value)} /></label>
              <label className="block text-sm font-bold">Education<textarea className={input + ' min-h-28 py-3'} value={editor.education} onChange={(event) => update('education', event.target.value)} /></label>
              <label className="block text-sm font-bold">Admissions / memberships<textarea className={input + ' min-h-28 py-3'} value={editor.admissions} onChange={(event) => update('admissions', event.target.value)} /></label>
              <div>
                <span className="block text-sm font-bold">Portrait photo</span>
                <label className="mt-2 flex min-h-28 cursor-pointer items-center gap-4 rounded-[2px] border border-dashed border-[#5F021F]/20 bg-white/60 p-4 hover:border-gold-dark">
                  {editor.photoUrl ? <img src={editor.photoUrl} alt="Selected portrait preview" className="h-20 w-16 rounded-[2px] object-cover" /> : <ImagePlus className="h-8 w-8 text-gold-dark" />}
                  <span className="text-sm text-ink/60"><Upload className="mr-2 inline h-4 w-4" />Choose an image</span>
                  <input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={selectPhoto} />
                </label>
                <p className="mt-2 text-xs text-ink/45">The image uploads to Cloudinary when you save.</p>
              </div>
              <label className="block text-sm font-bold">Email<input type="email" className={input} value={editor.email} onChange={(event) => update('email', event.target.value)} placeholder="person@lumminalaw.com" /></label>
              <label className="block text-sm font-bold">LinkedIn / social profile URL<input type="text" inputMode="url" className={input} value={editor.linkedin} onChange={(event) => update('linkedin', event.target.value)} placeholder="linkedin.com/in/your-name" /></label>
              <label className="block text-sm font-bold">Publication status<select className={input} value={editor.status} onChange={(event) => update('status', event.target.value)}><option value="draft">Draft</option><option value="review">Review</option><option value="published">Published</option></select></label>
            </div>

            <div className="mt-7 flex flex-col-reverse gap-3 border-t border-[#5F021F]/10 pt-5 sm:flex-row sm:justify-end">
              <button type="button" onClick={closeEditor} disabled={saving} className="min-h-11 border border-[#5F021F]/15 px-5 text-xs font-extrabold uppercase tracking-[0.1em] text-bordeaux">Cancel</button>
              <button type="submit" disabled={saving} className="inline-flex min-h-11 items-center justify-center gap-2 border border-bordeaux px-5 text-xs font-extrabold uppercase tracking-[0.1em] text-bordeaux disabled:opacity-60">{saving ? 'Saving…' : 'Save ' + (editor.status === 'published' ? 'and publish' : 'profile')}</button>
              {editor.status !== 'published' && <button type="button" disabled={saving} onClick={(event) => void save(event, 'published')} className="inline-flex min-h-11 items-center justify-center gap-2 border border-bordeaux bg-bordeaux px-5 text-xs font-extrabold uppercase tracking-[0.1em] text-gold-bright disabled:opacity-60">{saving ? 'Publishing…' : 'Publish profile'}</button>}
            </div>
          </form>
        </div>
      )}
    </>
  );
};
