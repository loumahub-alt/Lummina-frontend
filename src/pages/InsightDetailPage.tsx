import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Check, Copy, Facebook, Linkedin, MessageCircle, Send, Twitter } from 'lucide-react';
import { useParams } from 'react-router-dom';

import { CallToAction } from '../components/common/CallToAction';
import { PageHero } from '../components/common/PageHero';
import { SecondaryButton } from '../components/common/SecondaryButton';
import { TransitionLink } from '../components/transitions';
import { brand, images } from '../data/site';
import { api, ApiError } from '../services/api';
import type { InsightCategory } from '../types';
import { applySeo } from '../utils/seo';
import { contentAssetFromRecord } from '../utils/contentAssets';
import { usePreloadedItem } from '../context/PreloadedContentContext';
import { NotFoundPage } from './NotFoundPage';

type RemoteInsight = Record<string, unknown>;

type InsightDetail = {
  category: InsightCategory;
  date: string;
  title: string;
  summary: string;
  content: string;
  image: keyof typeof images;
  imageUrl?: string;
  imageAlt?: string;
  ebookUrl?: string;
  ebookFileName?: string;
  seoTitle: string;
  seoDescription: string;
  author: string;
  publishedTime?: string;
  modifiedTime?: string;
};

type ArticleBlock =
  | { kind: 'heading'; text: string }
  | { kind: 'subheading'; text: string }
  | { kind: 'paragraph'; text: string }
  | { kind: 'citation'; text: string }
  | { kind: 'list'; items: string[]; ordered: boolean; citation?: boolean };

const citationSectionPattern = /^(?:key\s+)?(?:sources?|references?|footnotes?|authorities)$/i;

const looksLikeCitation = (text: string) => (
  /^\[\d+\]\s+/.test(text)
  || /^(?:s|ss|section|sections)\.?\s*\d+/i.test(text)
  || /^appeal\s+no\.?\s+/i.test(text)
);

const looksLikeSubheading = (text: string) => {
  if (text.length > 110) return false;
  if (/^[A-Z0-9][A-Z0-9\s.,'’“”‘’—–:&()/-]{9,}$/.test(text)) return true;
  return /^(?:for|what|why|how|who|when|where|key|important|before|after|understanding)\b/i.test(text)
    && (text.length <= 80 || /:\s*$/.test(text));
};

const parseArticleContent = (content: string): ArticleBlock[] => {
  const blocks: ArticleBlock[] = [];
  let inCitationSection = false;

  content
    .replace(/\r\n?/g, '\n')
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .forEach((block) => {
      const lines = block.split('\n').map((line) => line.trim()).filter(Boolean);
      if (lines.length === 0) return;

      if (lines.length === 1 && /^#{1,3}\s+/.test(lines[0])) {
        const text = lines[0].replace(/^#{1,3}\s+/, '');
        inCitationSection = citationSectionPattern.test(text);
        blocks.push({ kind: 'heading', text });
        return;
      }

      const unorderedItems = lines.map((line) => line.match(/^[-*•]\s+(.+)$/)?.[1]);
      const orderedItems = lines.map((line) => line.match(/^\d+[.)]\s+(.+)$/)?.[1]);
      if (unorderedItems.every(Boolean)) {
        blocks.push({ kind: 'list', items: unorderedItems as string[], ordered: false, citation: inCitationSection });
        return;
      }
      if (orderedItems.every(Boolean)) {
        blocks.push({ kind: 'list', items: orderedItems as string[], ordered: true, citation: inCitationSection });
        return;
      }

      const text = lines.join(' ');
      if (citationSectionPattern.test(text)) {
        inCitationSection = true;
        blocks.push({ kind: 'heading', text });
      } else if (inCitationSection || looksLikeCitation(text)) {
        blocks.push({ kind: 'citation', text });
      } else if (lines.length === 1 && looksLikeSubheading(text)) {
        blocks.push({ kind: 'subheading', text });
      } else {
        blocks.push({ kind: 'paragraph', text });
      }
    });

  return blocks;
};

const seoValue = (record: RemoteInsight, key: string) => {
  const value = record.seo;
  return value && typeof value === 'object' && !Array.isArray(value)
    ? String((value as Record<string, unknown>)[key] ?? '')
    : '';
};

const categoryFor = (recordType: unknown, fallback: InsightCategory): InsightCategory => {
  const type = typeof recordType === 'string' ? recordType.toLowerCase() : '';
  if (type === 'newsletter' || type === 'newsletters') return 'Newsletters';
  if (type === 'resource' || type === 'resources' || type === 'publication' || type === 'publications') return 'Resources';
  if (type === 'insight' || type === 'insights') return 'Insights';
  if (type === 'event' || type === 'events') return 'Events';
  return fallback;
};

const formatDate = (value: unknown, fallback: string) => {
  if (typeof value !== 'string' || !value) return fallback;
  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) return fallback;
  return date.toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const InsightDetailPage = () => {
  const { slug = '' } = useParams();
  const preloadedInsight = usePreloadedItem('insights', slug);
  const [remoteInsight, setRemoteInsight] = useState<RemoteInsight | null>(preloadedInsight);
  const [remoteStatus, setRemoteStatus] = useState<'idle' | 'loaded' | 'not-found' | 'error'>(preloadedInsight ? 'loaded' : 'idle');
  const [loading, setLoading] = useState(!preloadedInsight);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!slug) return undefined;
    let active = true;
    setRemoteInsight(preloadedInsight);
    setRemoteStatus(preloadedInsight ? 'loaded' : 'idle');
    setLoading(!preloadedInsight);

    api.public
      .item('insights', slug)
      .then((record) => {
        if (active) {
          setRemoteInsight(record);
          setRemoteStatus('loaded');
        }
      })
      .catch((reason) => {
        if (active) {
          setRemoteStatus(reason instanceof ApiError && reason.status === 404 ? 'not-found' : 'error');
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [preloadedInsight, slug]);

  const insight = useMemo<InsightDetail | null>(() => {
    if (!remoteInsight || remoteStatus === 'not-found') return null;

    const record = remoteInsight;
    const image = contentAssetFromRecord(record, 'image');
    const ebook = contentAssetFromRecord(record, 'ebook');
    const ebookRecord = record.ebook && typeof record.ebook === 'object' && !Array.isArray(record.ebook)
      ? record.ebook as Record<string, unknown>
      : {};
    const summary = typeof record.excerpt === 'string'
      ? record.excerpt
      : '';
    const content = typeof record.content === 'string' && record.content.trim()
      ? record.content
      : summary;
    const title = typeof record.title === 'string' ? record.title : 'Lummina Insight';
    const description = seoValue(record, 'description') || summary;
    const publishedTime = typeof record.publishedAt === 'string' ? record.publishedAt : undefined;
    const modifiedTime = typeof record.updatedAt === 'string' ? record.updatedAt : publishedTime;

    return {
      category: categoryFor(record.type, 'Articles'),
      date: formatDate(publishedTime, ''),
      title,
      summary,
      content,
      image: 'library',
      imageUrl: image.url || undefined,
      imageAlt: image.alt || undefined,
      ebookUrl: ebook.url || undefined,
      ebookFileName: String(ebookRecord.fileName ?? ebookRecord.originalName ?? '') || undefined,
      seoTitle: seoValue(record, 'title') || title + ' | Lummina Law Firm',
      seoDescription: description,
      author: typeof record.author === 'string' && record.author.trim() ? record.author : 'Lummina Law Firm',
      publishedTime,
      modifiedTime,
    };
  }, [remoteInsight, remoteStatus]);

  const heroImage = insight?.imageUrl
    ? { ...images[insight.image], src: insight.imageUrl, alt: insight.imageAlt ?? insight.title }
    : insight ? images[insight.image] : images.library;

  useEffect(() => {
    if (!insight || !slug) return;

    applySeo(
      {
        title: insight.seoTitle,
        description: insight.seoDescription,
        image: heroImage.src,
        type: 'article',
        publishedTime: insight.publishedTime,
        modifiedTime: insight.modifiedTime,
        author: insight.author,
        section: insight.category,
      },
      '/insights/' + slug,
    );
  }, [insight, slug]);

  if (!insight) {
    if (loading) {
      return (
        <section className="cream-section flex min-h-[55vh] items-center justify-center py-24">
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-gold-dark">
            Loading insight...
          </p>
        </section>
      );
    }
    return <NotFoundPage />;
  }

  const articleBlocks = parseArticleContent(insight.content);

  const shareUrl = typeof window !== 'undefined'
    ? window.location.href.split('#')[0]
    : `${brand.siteUrl}/insights/${slug}`;
  const shareTitle = insight.title;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(shareTitle + ' — Lummina Law Firm');
  const shareLinks = [
    { label: 'WhatsApp', href: `https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`, icon: MessageCircle },
    { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, icon: Facebook },
    { label: 'X', href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`, icon: Twitter },
    { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, icon: Linkedin },
    { label: 'Telegram', href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`, icon: Send },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow={insight.category + ' | ' + insight.date}
        title={insight.title}
        description={insight.summary}
        image={heroImage}
        ctaLabel="Schedule a Consultation"
        ctaTo="/consultation"
      />

      <section className="cream-section py-14 sm:py-16">
        <div className="container-shell grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-start lg:gap-10">
          <article className="max-w-4xl rounded-[2px] border border-light-line bg-paper/75 p-6 shadow-soft sm:p-9 lg:p-10">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-light-line pb-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-gold-dark">
                By {insight.author}
              </p>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink/50">
                {insight.date}
              </p>
            </div>
            <h2 className="mt-7 max-w-[34ch] font-serif text-3xl font-medium leading-tight text-ink md:text-4xl">
              Practical perspective for the decisions ahead.
            </h2>
            <div className="mt-7 max-w-[68ch] space-y-5 text-base leading-8 text-ink/75 sm:text-[1.0625rem] sm:leading-[1.85]">
              {articleBlocks.map((block, index) => {
                if (block.kind === 'heading') {
                  return (
                    <h3 key={`${block.kind}-${index}`} className="pt-3 font-serif text-2xl font-bold leading-tight text-bordeaux sm:text-3xl">
                      {block.text}
                    </h3>
                  );
                }
                if (block.kind === 'subheading') {
                  return <p key={`${block.kind}-${index}`} className="pt-2 font-bold leading-7 text-bordeaux">{block.text}</p>;
                }
                if (block.kind === 'list') {
                  const List = block.ordered ? 'ol' : 'ul';
                  return (
                    <List key={`${block.kind}-${index}`} className={`${block.ordered ? 'list-decimal' : 'list-disc'} space-y-2 pl-6 ${block.citation ? 'italic text-ink/65' : ''}`}>
                      {block.items.map((item, itemIndex) => <li key={`${item}-${itemIndex}`}>{item}</li>)}
                    </List>
                  );
                }
                if (block.kind === 'citation') {
                  return <p key={`${block.kind}-${index}`} className="italic text-ink/65">{block.text}</p>;
                }
                return <p key={`${block.kind}-${index}`}>{block.text}</p>;
              })}
            </div>
            {insight.category === 'Resources' && insight.ebookUrl && (
              <div className="mt-10 border border-gold/40 bg-gold/10 p-6 sm:p-7">
                <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-gold-dark">E-book</p>
                <h2 className="mt-3 font-serif text-3xl font-medium text-ink">Read or download this resource.</h2>
                {insight.ebookFileName && <p className="mt-2 text-sm text-ink/60">{insight.ebookFileName}</p>}
                <a href={insight.ebookUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex min-h-11 items-center justify-center border border-bordeaux bg-bordeaux px-5 py-3 text-xs font-extrabold uppercase tracking-[0.1em] text-gold-bright transition hover:bg-[#4B0019]">
                  Open e-book
                </a>
              </div>
            )}
          </article>

          <aside className="luxury-card p-6 lg:sticky lg:top-28">
            <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-gold-dark">
              Continue reading
            </p>
            <h2 className="mt-3 font-serif text-2xl font-medium text-ink">
              Explore more insights.
            </h2>
            <p className="mt-3 text-sm leading-7 text-ink/70">
              Read more practical legal thinking from the Lummina team.
            </p>
            <SecondaryButton to="/insights" dark className="mt-5">
              View all insights
            </SecondaryButton>
            <div className="mt-7 border-t border-light-line pt-6">
              <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-gold-dark">Share this insight</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {shareLinks.map((item) => {
                  const Icon = item.icon;
                  return <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-[2px] border border-light-line px-3 text-xs font-bold text-ink/70 transition hover:border-gold-dark hover:text-bordeaux"><Icon aria-hidden="true" className="h-4 w-4 text-gold-dark" />{item.label}</a>;
                })}
                <button type="button" onClick={() => void copyLink()} className="inline-flex min-h-10 items-center gap-2 rounded-[2px] border border-light-line px-3 text-left text-xs font-bold text-ink/70 transition hover:border-gold-dark hover:text-bordeaux"><span aria-hidden="true">{copied ? <Check className="h-4 w-4 text-[#6B6A24]" /> : <Copy className="h-4 w-4 text-gold-dark" />}</span>{copied ? 'Copied' : 'Copy link'}</button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="cream-section border-t border-light-line py-10">
        <div className="container-shell">
          <TransitionLink
            to="/insights"
            className="inline-flex items-center gap-2 text-sm font-bold text-gold-dark transition hover:text-bordeaux"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Back to Insights
          </TransitionLink>
        </div>
      </section>

      <CallToAction />
    </>
  );
};
