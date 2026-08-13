import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Check, Copy, Facebook, Linkedin, MessageCircle, Send, Twitter } from 'lucide-react';
import { useParams } from 'react-router-dom';

import { CallToAction } from '../components/common/CallToAction';
import { PageHero } from '../components/common/PageHero';
import { SecondaryButton } from '../components/common/SecondaryButton';
import { TransitionLink } from '../components/transitions';
import { brand, images, insights } from '../data/site';
import { api, ApiError } from '../services/api';
import type { InsightCategory } from '../types';
import { applySeo } from '../utils/seo';
import { contentAssetFromRecord } from '../utils/contentAssets';
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
  seoTitle: string;
  seoDescription: string;
  author: string;
  publishedTime?: string;
  modifiedTime?: string;
};

const seoValue = (record: RemoteInsight, key: string) => {
  const value = record.seo;
  return value && typeof value === 'object' && !Array.isArray(value)
    ? String((value as Record<string, unknown>)[key] ?? '')
    : '';
};

const categoryFor = (recordType: unknown, fallback: InsightCategory): InsightCategory => {
  const type = typeof recordType === 'string' ? recordType.toLowerCase() : '';
  if (type === 'publication') return 'Publications';
  if (type === 'event') return 'Events';
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
  const fallback = insights.find((item) => item.id === slug);
  const [remoteInsight, setRemoteInsight] = useState<RemoteInsight | null>(null);
  const [remoteStatus, setRemoteStatus] = useState<'idle' | 'loaded' | 'not-found' | 'error'>('idle');
  const [loading, setLoading] = useState(!fallback);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!slug) return undefined;
    let active = true;

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
  }, [slug]);

  const insight = useMemo<InsightDetail | null>(() => {
    if ((!fallback && !remoteInsight) || remoteStatus === 'not-found') return null;

    const record = remoteInsight ?? {};
    const fallbackImage = fallback?.image ?? 'library';
    const image = contentAssetFromRecord(record, 'image');
    const summary = typeof record.excerpt === 'string'
      ? record.excerpt
      : fallback?.summary ?? '';
    const content = typeof record.content === 'string' && record.content.trim()
      ? record.content
      : summary;
    const title = typeof record.title === 'string' ? record.title : fallback?.title ?? 'Lummina Insight';
    const description = seoValue(record, 'description') || summary;
    const publishedTime = typeof record.publishedAt === 'string' ? record.publishedAt : undefined;
    const modifiedTime = typeof record.updatedAt === 'string' ? record.updatedAt : publishedTime;

    return {
      category: categoryFor(record.type, fallback?.category ?? 'Articles'),
      date: formatDate(publishedTime, fallback?.date ?? ''),
      title,
      summary,
      content,
      image: fallbackImage,
      imageUrl: image.url || fallback?.imageUrl,
      imageAlt: image.alt || fallback?.imageAlt,
      seoTitle: seoValue(record, 'title') || title + ' | Lummina Law Firm',
      seoDescription: description,
      author: typeof record.author === 'string' && record.author.trim() ? record.author : 'Lummina Law Firm',
      publishedTime,
      modifiedTime,
    };
  }, [fallback, remoteInsight, remoteStatus]);

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

  const paragraphs = insight.content
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

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

      <section className="cream-section py-20">
        <div className="container-shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
          <article className="max-w-3xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-gold-dark">
              Lummina Law Firm
            </p>
            <h2 className="mt-4 font-serif text-4xl font-medium leading-tight text-ink md:text-5xl">
              Practical perspective for the decisions ahead.
            </h2>
            <div className="mt-8 space-y-6 text-lg leading-9 text-ink/75">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
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
