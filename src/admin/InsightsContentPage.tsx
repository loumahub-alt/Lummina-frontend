import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { CalendarDays, Check, FileText, ImagePlus, Pencil, Plus, Search, Star, Trash2, Upload, X } from 'lucide-react';
import { api, ApiError } from '../services/api';
import { contentAssetFromRecord } from '../utils/contentAssets';

const surface = 'rounded-[3px] border border-[#5F021F]/10 bg-[#FFF9EF] shadow-[0_14px_45px_rgba(95,2,31,0.07)]';
const input = 'mt-2 min-h-11 w-full rounded-[2px] border border-[#5F021F]/15 bg-white/70 px-3 text-sm text-ink outline-none transition focus:border-gold';

type InsightRecord = Record<string, unknown>;
type InsightType = 'article' | 'publication' | 'resource' | 'event';
type InsightStatus = 'draft' | 'review' | 'published';

type InsightAsset = {
  url: string;
  mediaId: string;
  alt: string;
  fileName?: string;
  mimeType?: string;
  fileSize?: number;
};

type InsightEditor = {
  id?: string;
  title: string;
  type: InsightType;
  excerpt: string;
  content: string;
  author: string;
  readTime: string;
  publishedAt: string;
  displayOrder: string;
  isFeatured: boolean;
  status: InsightStatus;
  imageUrl: string;
  imageMediaId: string;
  imageAlt: string;
  imageFile: File | null;
  thumbnailUrl: string;
  thumbnailMediaId: string;
  thumbnailAlt: string;
  thumbnailFile: File | null;
  ebookUrl: string;
  ebookMediaId: string;
  ebookFileName: string;
  ebookMimeType: string;
  ebookFileSize: number;
  ebookFile: File | null;
  seoTitle: string;
  seoDescription: string;
};

const seoValue = (record: InsightRecord | undefined, key: string) => {
  const value = record?.seo;
  return value && typeof value === 'object' && !Array.isArray(value)
    ? String((value as Record<string, unknown>)[key] ?? '')
    : '';
};

const dateValue = (value: unknown) => {
  if (typeof value !== 'string' || !value) return '';
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? '' : date.toISOString().slice(0, 10);
};

const editorFromRecord = (record?: InsightRecord): InsightEditor => {
  const image = contentAssetFromRecord(record, 'image');
  const thumbnail = contentAssetFromRecord(record, 'thumbnail');
  const ebook = contentAssetFromRecord(record, 'ebook');
  const ebookRecord = record?.ebook && typeof record.ebook === 'object' && !Array.isArray(record.ebook)
    ? record.ebook as Record<string, unknown>
    : {};
  return {
    id: record ? String(record.id ?? record._id ?? '') : undefined,
    title: String(record?.title ?? ''),
    type: (String(record?.type ?? 'article') as InsightType),
    excerpt: String(record?.excerpt ?? ''),
    content: String(record?.content ?? ''),
    author: String(record?.author ?? 'Lummina Law Firm'),
    readTime: String(record?.readTime ?? ''),
    publishedAt: dateValue(record?.publishedAt),
    displayOrder: String(record?.displayOrder ?? 0),
    isFeatured: record?.isFeatured === true,
    status: (String(record?.status ?? 'draft') as InsightStatus),
    imageUrl: image.url,
    imageMediaId: image.mediaId,
    imageAlt: image.alt,
    imageFile: null,
    thumbnailUrl: thumbnail.url,
    thumbnailMediaId: thumbnail.mediaId,
    thumbnailAlt: thumbnail.alt,
    thumbnailFile: null,
    ebookUrl: ebook.url,
    ebookMediaId: ebook.mediaId,
    ebookFileName: String(ebookRecord.fileName ?? ebookRecord.originalName ?? ''),
    ebookMimeType: String(ebookRecord.mimeType ?? ''),
    ebookFileSize: Number(ebookRecord.fileSize ?? 0),
    ebookFile: null,
    seoTitle: seoValue(record, 'title'),
    seoDescription: seoValue(record, 'description'),
  };
};

const displayStatus = (value: unknown) => String(value ?? 'draft').replace(/^./, (character) => character.toUpperCase());

const uploadImage = async (file: File, altText: string): Promise<InsightAsset> => {
  const body = new FormData();
  body.append('file', file);
  body.append('altText', altText);
  const media = await api.admin.upload(body);
  return {
    url: String(media.url ?? ''),
    mediaId: String(media.id ?? media._id ?? ''),
    alt: altText,
  };
};

const uploadEbook = async (file: File): Promise<InsightAsset> => {
  const body = new FormData();
  body.append('file', file);
  const media = await api.admin.upload(body);
  return {
    url: String(media.url ?? ''),
    mediaId: String(media.id ?? media._id ?? ''),
    alt: '',
    fileName: String(media.originalName ?? file.name),
    mimeType: String(media.mimeType ?? file.type),
    fileSize: Number(media.fileSize ?? file.size),
  };
};

export const InsightsContentPage = () => {
  const [records, setRecords] = useState<InsightRecord[]>([]);
  const [editor, setEditor] = useState<InsightEditor | null>(null);
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | InsightType>('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [savedStatus, setSavedStatus] = useState<InsightStatus | null>(null);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      setRecords(await api.admin.content('insights', '?perPage=100'));
    } catch (reason) {
      setError(reason instanceof ApiError ? reason.message : 'Unable to load insights.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const filtered = useMemo(() => records.filter((record) => {
    if (String(record.type ?? 'article').trim().toLowerCase() === 'newsletter') return false;
    const searchable = [record.title, record.type, record.excerpt, record.author]
      .map((value) => String(value ?? '').toLowerCase())
      .join(' ');
    const matchesQuery = !query.trim() || searchable.includes(query.trim().toLowerCase());
    const recordType = String(record.type ?? 'article').trim().toLowerCase();
    const matchesType = typeFilter === 'all' || recordType === typeFilter;
    const matchesStatus = statusFilter === 'all' || String(record.status ?? 'draft') === statusFilter;
    return matchesQuery && matchesType && matchesStatus;
  }), [query, records, statusFilter, typeFilter]);

  const openNew = () => {
    setError('');
    setSaved(false);
    setSavedStatus(null);
    setEditor(editorFromRecord());
  };

  const openEdit = async (record: InsightRecord) => {
    setError('');
    setSaved(false);
    setSavedStatus(null);
    const id = String(record.id ?? record._id ?? '');
    try {
      setEditor(editorFromRecord(id ? await api.admin.contentItem('insights', id) : record));
    } catch (reason) {
      setError(reason instanceof ApiError ? reason.message : 'Unable to load this insight from the API.');
    }
  };

  const update = (key: keyof InsightEditor, value: string | boolean | number | File | null) => {
    setEditor((current) => current ? { ...current, [key]: value } : current);
  };

  const selectImage = (event: ChangeEvent<HTMLInputElement>, kind: 'image' | 'thumbnail') => {
    const file = event.target.files?.[0] ?? null;
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please choose a JPG, PNG or WebP image.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Each image must be 10MB or smaller.');
      return;
    }
    const url = URL.createObjectURL(file);
    if (kind === 'image') {
      update('imageFile', file);
      update('imageUrl', url);
    } else {
      update('thumbnailFile', file);
      update('thumbnailUrl', url);
    }
  };

  const selectEbook = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    event.currentTarget.value = '';
    if (!file) return;
    const supportedMimeTypes = ['application/pdf', 'application/epub+zip', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!supportedMimeTypes.includes(file.type) && !/\.(pdf|epub|docx?)$/i.test(file.name)) {
      setError('Please choose a PDF, EPUB, DOC or DOCX e-book.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('The e-book file must be 10MB or smaller.');
      return;
    }
    update('ebookFile', file);
    update('ebookFileName', file.name);
    update('ebookMimeType', file.type);
    update('ebookFileSize', file.size);
    setError('');
  };

  const save = async (event: FormEvent | undefined, nextStatus: InsightStatus) => {
    event?.preventDefault();
    if (!editor) return;
    if (!editor.title.trim()) {
      setError('Title is required.');
      return;
    }
    if (editor.type !== 'event' && !editor.excerpt.trim()) {
      setError('An excerpt or e-book summary is required.');
      return;
    }
    if (editor.type !== 'event' && editor.type !== 'resource' && !editor.content.trim()) {
      setError('Article content is required for written insight types.');
      return;
    }
    if (nextStatus === 'published' && editor.type === 'resource' && !editor.ebookUrl && !editor.ebookFile) {
      setError('Upload an e-book file before publishing this resource.');
      return;
    }
    if (nextStatus === 'published' && editor.type === 'event' && !editor.imageUrl && !editor.imageFile) {
      setError('Upload an event photo before publishing this event.');
      return;
    }

    setSaving(true);
    setError('');
    setSaved(false);
    setSavedStatus(null);
    try {
      let image: InsightAsset | undefined = editor.imageUrl ? {
        url: editor.imageUrl,
        mediaId: editor.imageMediaId,
        alt: editor.imageAlt.trim() || editor.title.trim(),
      } : undefined;
      let thumbnail: InsightAsset | undefined = editor.thumbnailUrl ? {
        url: editor.thumbnailUrl,
        mediaId: editor.thumbnailMediaId,
        alt: editor.thumbnailAlt.trim() || editor.title.trim(),
      } : undefined;
      let ebook: InsightAsset | undefined = editor.ebookUrl ? {
        url: editor.ebookUrl,
        mediaId: editor.ebookMediaId,
        alt: '',
        fileName: editor.ebookFileName,
        mimeType: editor.ebookMimeType,
        fileSize: editor.ebookFileSize,
      } : undefined;

      if (editor.imageFile) image = await uploadImage(editor.imageFile, editor.imageAlt.trim() || editor.title.trim());
      if (editor.thumbnailFile) thumbnail = await uploadImage(editor.thumbnailFile, editor.thumbnailAlt.trim() || editor.title.trim());
      if (editor.ebookFile) ebook = await uploadEbook(editor.ebookFile);

      await api.admin.saveContent('insights', {
        title: editor.title.trim(),
        slug: editor.title,
        type: editor.type,
        excerpt: editor.excerpt.trim(),
        content: editor.content.trim(),
        author: editor.author.trim() || 'Lummina Law Firm',
        readTime: editor.readTime.trim(),
        publishedAt: editor.publishedAt ? new Date(editor.publishedAt).toISOString() : null,
        displayOrder: Number(editor.displayOrder) || 0,
        isFeatured: editor.isFeatured,
        status: nextStatus,
        ...(image ? { image } : {}),
        ...(thumbnail ? { thumbnail } : {}),
        ...(ebook ? { ebook } : {}),
        seo: {
          title: editor.seoTitle.trim(),
          description: editor.seoDescription.trim(),
        },
      }, editor.id);
      setEditor(null);
      setSaved(true);
      setSavedStatus(nextStatus);
      await load();
    } catch (reason) {
      setError(reason instanceof ApiError ? reason.message : 'Unable to save this insight.');
    } finally {
      setSaving(false);
    }
  };

  const deleteInsight = async (record: InsightRecord) => {
    const id = String(record.id ?? record._id ?? '');
    const title = String(record.title ?? 'this insight');
    if (!id || !window.confirm('Permanently delete “' + title + '”? This cannot be undone.')) return;
    setError('');
    try {
      const assets = [contentAssetFromRecord(record, 'image'), contentAssetFromRecord(record, 'thumbnail'), contentAssetFromRecord(record, 'ebook')];
      await api.admin.deleteContent('insights', id);
      await Promise.allSettled(assets.filter((asset) => asset.mediaId).map((asset) => api.admin.deleteMedia(asset.mediaId)));
      setSaved(true);
      setSavedStatus(null);
      await load();
    } catch (reason) {
      setError(reason instanceof ApiError ? reason.message : 'Unable to delete this insight.');
    }
  };

  return (
    <>
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-gold-dark">Website Content / Editorial</p>
          <h1 className="mt-3 font-serif text-4xl leading-tight text-bordeaux md:text-5xl">Insights</h1>
          <p className="mt-3 max-w-2xl leading-7 text-ink/60">Create, edit, publish and delete insights, articles, e-books and events shown on the public website.</p>
        </div>
        <button type="button" onClick={openNew} className="inline-flex min-h-11 items-center gap-2 border border-bordeaux bg-bordeaux px-4 text-xs font-extrabold uppercase tracking-[0.1em] text-gold-bright hover:bg-[#4B0019]"><Plus className="h-4 w-4" /> Add insight</button>
      </div>

      {error && <div role="alert" className="mb-5 rounded-[3px] border border-red-300/40 bg-red-50 px-5 py-4 text-sm text-red-800">{error}</div>}
      {saved && <div className="mb-5 flex items-center gap-2 rounded-[2px] border border-[#6B6A24]/30 bg-[#6B6A24]/10 px-4 py-3 text-sm text-[#53541B]"><Check className="h-4 w-4" />{savedStatus === 'published' ? 'Insight published and visible on the public website.' : savedStatus ? `Insight saved as ${displayStatus(savedStatus)}. Publish it to make it visible on the public website.` : 'Insight deleted successfully.'}</div>}

      <section className={surface + ' overflow-hidden'}>
        <div className="flex flex-col gap-3 border-b border-[#5F021F]/8 p-4 sm:flex-row sm:items-center sm:justify-between">
          <label className="relative block max-w-md flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35" /><input value={query} onChange={(event) => setQuery(event.target.value)} className="h-10 w-full rounded-[2px] border border-[#5F021F]/12 bg-white/60 pl-10 pr-3 text-sm outline-none focus:border-gold" placeholder="Search insights, authors or types…" /></label>
          <div className="flex flex-wrap items-center gap-2">
            {(['all', 'article', 'publication', 'resource', 'event'] as const).map((value) => <button type="button" key={value} onClick={() => setTypeFilter(value)} className={'rounded-[2px] px-3 py-2 text-xs font-bold ' + (typeFilter === value ? 'bg-bordeaux text-gold-bright' : 'bg-[#5F021F]/5 text-ink/55')}>{value === 'all' ? 'All types' : value === 'resource' ? 'E-books' : displayStatus(value)}</button>)}
            <span className="mx-1 h-5 w-px bg-[#5F021F]/12" aria-hidden="true" />
            {['all', 'published', 'draft', 'review'].map((value) => <button type="button" key={value} onClick={() => setStatusFilter(value)} className={'rounded-[2px] px-3 py-2 text-xs font-bold ' + (statusFilter === value ? 'bg-bordeaux text-gold-bright' : 'bg-[#5F021F]/5 text-ink/55')}>{value === 'all' ? 'All statuses' : displayStatus(value)}</button>)}
          </div>
        </div>

        {typeFilter === 'event' && filtered.length > 0 && <div className="border-b border-[#5F021F]/8 bg-[#5F021F]/[.025] p-5 sm:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div><p className="text-xs font-extrabold uppercase tracking-[0.15em] text-gold-dark">Events gallery preview</p><h2 className="mt-2 font-serif text-3xl text-bordeaux">Published and draft event photos</h2><p className="mt-2 text-sm leading-6 text-ink/55">Select an event to edit its photo, caption, publication status or details.</p></div>
            <span className="text-xs font-bold uppercase tracking-[0.1em] text-ink/45">{filtered.length} {filtered.length === 1 ? 'event' : 'events'}</span>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((record) => {
              const id = String(record.id ?? record._id ?? record.title);
              const thumbnail = contentAssetFromRecord(record, 'thumbnail');
              const image = thumbnail.url || contentAssetFromRecord(record, 'image').url;
              return <button type="button" key={'gallery-' + id} onClick={() => void openEdit(record)} className="group overflow-hidden rounded-[3px] border border-[#5F021F]/10 bg-[#FFF9EF] text-left shadow-[0_8px_24px_rgba(95,2,31,0.06)] transition hover:-translate-y-0.5 hover:border-gold-dark">
                <div className="aspect-[4/3] overflow-hidden bg-bordeaux/10">{image ? <img src={image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /> : <div className="grid h-full place-items-center text-gold-dark"><ImagePlus className="h-8 w-8" /></div>}</div>
                <div className="p-4"><p className="truncate font-bold text-bordeaux">{String(record.title ?? 'Untitled event')}</p><p className="mt-1 text-xs text-ink/50">{displayStatus(record.status)} · Order {String(record.displayOrder ?? 0)}</p></div>
              </button>;
            })}
          </div>
        </div>}

        {loading ? <p className="p-10 text-center text-sm text-ink/55">Loading insights…</p> : filtered.length === 0 ? <div className="p-12 text-center"><FileText className="mx-auto h-8 w-8 text-gold-dark" /><p className="mt-4 text-sm text-ink/55">No insights match these filters.</p></div> : (
          <div className="divide-y divide-[#5F021F]/8">
            {filtered.map((record) => {
              const id = String(record.id ?? record._id ?? record.title);
              const thumbnail = contentAssetFromRecord(record, 'thumbnail');
              const image = thumbnail.url || contentAssetFromRecord(record, 'image').url;
              return <div key={id} className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center">
                {image ? <img src={image} alt="" className="h-16 w-24 rounded-[2px] object-cover" /> : <div className="grid h-16 w-24 shrink-0 place-items-center rounded-[2px] bg-bordeaux/10 text-gold-dark"><ImagePlus className="h-6 w-6" /></div>}
                <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><p className="font-bold text-bordeaux">{String(record.title ?? 'Untitled insight')}</p>{record.isFeatured === true && <Star className="h-3.5 w-3.5 fill-gold text-gold-dark" />}</div><p className="mt-1 text-sm text-ink/60">{String(record.type ?? 'article') === 'resource' ? 'E-book' : String(record.type ?? 'article')} · {String(record.author ?? 'Lummina Law Firm')}</p><p className="mt-1 text-xs text-ink/45">{displayStatus(record.status)} · Order {String(record.displayOrder ?? 0)}</p></div>
                <div className="flex items-center gap-2"><button type="button" onClick={() => void openEdit(record)} className="inline-flex items-center gap-2 rounded border border-[#5F021F]/12 px-3 py-2 text-xs font-bold text-ink/60 hover:border-gold-dark hover:text-bordeaux"><Pencil className="h-3.5 w-3.5" /> Edit</button><button type="button" onClick={() => void deleteInsight(record)} aria-label={'Delete ' + String(record.title ?? 'insight')} className="rounded border border-red-200/70 p-2 text-red-700/60 hover:border-red-400 hover:text-red-700"><Trash2 className="h-4 w-4" /></button></div>
              </div>;
            })}
          </div>
        )}
      </section>

      {editor && <div className="fixed inset-0 z-[60] flex items-end justify-center bg-[#170009]/55 p-0 sm:items-center sm:p-6">
        <form onSubmit={(event) => void save(event, editor.status)} className="max-h-[94vh] w-full max-w-5xl overflow-y-auto rounded-t-[4px] bg-[#FFF9EF] p-6 shadow-[0_18px_70px_rgba(23,0,9,0.25)] sm:rounded-[4px] sm:p-8">
          <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-extrabold uppercase tracking-[0.15em] text-gold-dark">Editorial record</p><h2 className="mt-2 font-serif text-3xl text-bordeaux">{editor.id ? 'Edit insight' : 'Add insight'}</h2></div><button type="button" onClick={() => { if (!saving) setEditor(null); }} aria-label="Close insight editor" className="rounded border border-[#5F021F]/12 p-2 text-ink/50 hover:text-bordeaux"><X className="h-5 w-5" /></button></div>

          <div className="mt-7 grid gap-5 md:grid-cols-2">
            <label className="block text-sm font-bold md:col-span-2">Title *<input required className={input} value={editor.title} onChange={(event) => update('title', event.target.value)} placeholder="e.g. Building Stronger Legal Foundations for Nigerian Businesses" /></label>
            <label className="block text-sm font-bold">Content type<select className={input} value={editor.type} onChange={(event) => update('type', event.target.value)}><option value="article">Article</option><option value="publication">Publication</option><option value="resource">E-book / Resource</option><option value="event">Event</option></select>{editor.type === 'resource' && <span className="mt-2 block text-xs font-normal leading-5 text-gold-dark">Resources are published as e-books. Upload the e-book file below before publishing.</span>}{editor.type === 'event' && <span className="mt-2 block text-xs font-normal leading-5 text-gold-dark">Events appear in the public gallery. Upload an event photo below before publishing.</span>}</label>
            <label className="block text-sm font-bold">Author / byline<input className={input} value={editor.author} onChange={(event) => update('author', event.target.value)} placeholder="Lummina Law Firm" /></label>
            <label className="block text-sm font-bold">Publication date<input type="date" className={input} value={editor.publishedAt} onChange={(event) => update('publishedAt', event.target.value)} /></label>
            <label className="block text-sm font-bold">Read time<input className={input} value={editor.readTime} onChange={(event) => update('readTime', event.target.value)} placeholder="5 min read" /></label>
            <label className="block text-sm font-bold">Display order<input type="number" min="0" className={input} value={editor.displayOrder} onChange={(event) => update('displayOrder', event.target.value)} /></label>
            <label className="flex items-center gap-3 self-end pb-2 text-sm font-bold"><input type="checkbox" className="h-4 w-4 accent-[#5F021F]" checked={editor.isFeatured} onChange={(event) => update('isFeatured', event.target.checked)} /> Feature this insight</label>
            <label className="block text-sm font-bold md:col-span-2">{editor.type === 'event' ? 'Event caption (optional)' : editor.type === 'resource' ? 'E-book summary *' : 'Excerpt / summary *'}<textarea required={editor.type !== 'event'} className={input + ' min-h-24 py-3'} value={editor.excerpt} onChange={(event) => update('excerpt', event.target.value)} placeholder={editor.type === 'event' ? 'Optional caption shown below the event photo.' : editor.type === 'resource' ? 'Short description shown with the e-book.' : 'Short summary shown on the public Insights card and used for search previews.'} /></label>
            {editor.type !== 'event' && editor.type !== 'resource' && <label className="block text-sm font-bold md:col-span-2">Article content *<textarea required className={input + ' min-h-64 py-3'} value={editor.content} onChange={(event) => update('content', event.target.value)} placeholder="Write the full article. Use a blank line between paragraphs." /></label>}

            {editor.type === 'resource' && <div className="md:col-span-2"><span className="block text-sm font-bold">E-book file *</span><label className="mt-2 flex min-h-28 cursor-pointer items-center gap-4 rounded-[2px] border border-dashed border-[#5F021F]/20 bg-white/60 p-4 hover:border-gold-dark"><FileText className="h-8 w-8 shrink-0 text-gold-dark" /><span className="text-sm text-ink/65"><Upload className="mr-2 inline h-4 w-4" />{editor.ebookFileName || 'Choose e-book file'}<input type="file" accept=".pdf,.epub,.doc,.docx,application/pdf,application/epub+zip,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="sr-only" onChange={selectEbook} /></span></label>{editor.ebookFileName && <p className="mt-2 text-sm font-bold text-bordeaux">{editor.ebookFileName}{editor.ebookFileSize ? ' · ' + (editor.ebookFileSize / (1024 * 1024)).toFixed(1) + ' MB' : ''}</p>}<p className="mt-2 text-xs leading-5 text-ink/45">Upload a PDF, EPUB, DOC or DOCX file up to 10MB. Visitors will be able to open or download it from the public Resources page.</p></div>}

            <div><span className="block text-sm font-bold">{editor.type === 'event' ? 'Event photo *' : 'Cover image'}</span><label className="mt-2 flex min-h-36 cursor-pointer items-center gap-4 rounded-[2px] border border-dashed border-[#5F021F]/20 bg-white/60 p-4 hover:border-gold-dark">{editor.imageUrl ? <img src={editor.imageUrl} alt="Event or cover image preview" className="h-24 w-36 rounded-[2px] object-cover" /> : <ImagePlus className="h-8 w-8 text-gold-dark" />}<span className="text-sm text-ink/60"><Upload className="mr-2 inline h-4 w-4" />{editor.type === 'event' ? 'Choose event photo' : 'Choose cover image'}<input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(event) => selectImage(event, 'image')} /></span></label><input className={input} value={editor.imageAlt} onChange={(event) => update('imageAlt', event.target.value)} placeholder={editor.type === 'event' ? 'Event photo alt text' : 'Cover image alt text'} /><p className="mt-2 text-xs text-ink/45">{editor.type === 'event' ? 'Displayed in the public Events gallery. Uploads to Cloudinary when saved.' : 'Used on the article detail page. Uploads to Cloudinary when saved.'}</p></div>
            <div><span className="block text-sm font-bold">{editor.type === 'event' ? 'Gallery thumbnail (optional)' : 'Thumbnail'}</span><label className="mt-2 flex min-h-36 cursor-pointer items-center gap-4 rounded-[2px] border border-dashed border-[#5F021F]/20 bg-white/60 p-4 hover:border-gold-dark">{editor.thumbnailUrl ? <img src={editor.thumbnailUrl} alt="Thumbnail preview" className="h-24 w-36 rounded-[2px] object-cover" /> : <ImagePlus className="h-8 w-8 text-gold-dark" />}<span className="text-sm text-ink/60"><Upload className="mr-2 inline h-4 w-4" />Choose thumbnail<input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(event) => selectImage(event, 'thumbnail')} /></span></label><input className={input} value={editor.thumbnailAlt} onChange={(event) => update('thumbnailAlt', event.target.value)} placeholder="Thumbnail alt text" /><p className="mt-2 text-xs text-ink/45">{editor.type === 'event' ? 'Optional alternate crop for the gallery. The event photo above is the required public image.' : 'Used for the Insights listing cards. A separate crop is recommended.'}</p></div>

            <label className="block text-sm font-bold">Publication status<select className={input} value={editor.status} onChange={(event) => update('status', event.target.value)}><option value="draft">Draft</option><option value="review">Review</option><option value="published">Published</option></select></label>
            <div className="flex items-end gap-2 pb-2 text-xs text-ink/50"><CalendarDays className="h-4 w-4 text-gold-dark" /> Published records appear on the public website.</div>
            <label className="block text-sm font-bold md:col-span-2">SEO title<input className={input} value={editor.seoTitle} onChange={(event) => update('seoTitle', event.target.value)} placeholder="Optional search-engine title" /></label>
            <label className="block text-sm font-bold md:col-span-2">SEO description<textarea className={input + ' min-h-24 py-3'} value={editor.seoDescription} onChange={(event) => update('seoDescription', event.target.value)} placeholder="Optional search-engine description" /></label>
          </div>

          <div className="mt-7 flex flex-col-reverse gap-3 border-t border-[#5F021F]/10 pt-5 sm:flex-row sm:justify-end"><button type="button" onClick={() => { if (!saving) setEditor(null); }} disabled={saving} className="min-h-11 border border-[#5F021F]/15 px-5 text-xs font-extrabold uppercase tracking-[0.1em] text-bordeaux">Cancel</button><button type="submit" disabled={saving} className="inline-flex min-h-11 items-center justify-center gap-2 border border-bordeaux px-5 text-xs font-extrabold uppercase tracking-[0.1em] text-bordeaux disabled:opacity-60">{saving ? 'Saving…' : 'Save ' + (editor.status === 'published' ? 'and publish' : 'draft')}</button>{editor.status !== 'published' && <button type="button" disabled={saving} onClick={(event) => void save(event, 'published')} className="inline-flex min-h-11 items-center justify-center gap-2 border border-bordeaux bg-bordeaux px-5 text-xs font-extrabold uppercase tracking-[0.1em] text-gold-bright disabled:opacity-60">{saving ? 'Publishing…' : 'Publish insight'}</button>}</div>
        </form>
      </div>}
    </>
  );
};
