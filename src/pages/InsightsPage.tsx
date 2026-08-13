import { useMemo, useState } from 'react';
import { InsightCard } from '../components/cards/InsightCard';
import { NewsletterForm } from '../components/forms/NewsletterForm';
import { PageHero } from '../components/common/PageHero';
import { SectionHeading } from '../components/common/SectionHeading';
import { images, insights } from '../data/site';
import { usePublishedCollection } from '../hooks/usePublishedContent';
import { contentAssetFromRecord } from '../utils/contentAssets';
import type { InsightCategory } from '../types';
import type { Insight } from '../types';

const categories: Array<'Latest Insights' | InsightCategory> = [
  'Latest Insights',
  'Articles',
  'Publications',
  'Events',
];

export const InsightsPage = () => {
  const [activeCategory, setActiveCategory] =
    useState<(typeof categories)[number]>('Latest Insights');
  const publishedRecords = usePublishedCollection('insights');
  const insightItems = useMemo<Insight[]>(() => {
    if (publishedRecords === null) return insights;

    return publishedRecords.map((record, index) => {
      const fallback = insights.find((item) => item.id === record.slug) ?? insights[index] ?? insights[0];
      const type = typeof record.type === 'string' ? record.type.toLowerCase() : '';
      const category: InsightCategory = type === 'publication'
        ? 'Publications'
        : type === 'event'
          ? 'Events'
          : 'Articles';
      const fallbackImage = typeof record.slug === 'string'
        ? insights.find((item) => item.id === record.slug)?.image
        : undefined;
      const image = contentAssetFromRecord(record, 'image');
      const thumbnail = contentAssetFromRecord(record, 'thumbnail');
      const publishedAt = typeof record.publishedAt === 'string' ? record.publishedAt : '';

      return {
        ...fallback,
        id: typeof record.slug === 'string' ? record.slug : fallback.id,
        category,
        date: publishedAt ? new Date(publishedAt).toLocaleDateString('en-NG', { year: 'numeric', month: 'short', day: 'numeric' }) : fallback.date,
        title: typeof record.title === 'string' ? record.title : fallback.title,
        summary: typeof record.excerpt === 'string' ? record.excerpt : fallback.summary,
        image: fallbackImage ?? fallback.image,
        imageUrl: image.url || undefined,
        imageAlt: image.alt || undefined,
        thumbnailUrl: thumbnail.url || undefined,
        thumbnailAlt: thumbnail.alt || undefined,
        featured: record.isFeatured === true || fallback.featured,
      };
    });
  }, [publishedRecords]);

  const featuredInsight = activeCategory === 'Latest Insights'
    ? insightItems.find((insight) => insight.featured) ?? insightItems[0]
    : undefined;
  const filteredInsights = useMemo(() => {
    if (activeCategory === 'Latest Insights') {
      return insightItems;
    }
    return insightItems.filter((insight) => insight.category === activeCategory);
  }, [activeCategory, insightItems]);
  const gridInsights = filteredInsights.filter((insight) => insight.id !== featuredInsight?.id);

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Legal Insights for Businesses in Nigeria."
        description="Practical legal thinking for founders, operators, investors and businesses navigating growth and complexity."
        image={images.library}
      />

      <section className="cream-section py-20">
        <div className="container-shell">
          <div className="flex flex-wrap gap-3" role="tablist" aria-label="Insight filters">
            {categories.map((category) => (
              <button
                key={category}
                id={
                  category === 'Publications'
                    ? 'publications'
                    : category === 'Events'
                      ? 'events'
                      : undefined
                }
                type="button"
                role="tab"
                aria-selected={activeCategory === category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-[2px] border px-5 py-3 text-sm font-bold transition ${
                  activeCategory === category
                    ? 'border-gold bg-gold text-navy'
                    : 'border-light-line bg-white/70 text-ink/72 hover:border-gold-dark hover:bg-white hover:text-gold-dark'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-10">
            {featuredInsight && <InsightCard insight={featuredInsight} featured />}
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {gridInsights.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        </div>
      </section>

      <section className="luxury-dark py-20">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading
            eyebrow="Newsletter"
            title="Receive concise legal updates from Lummina."
            dark
          >
            <p>
              Get practical articles, publications and event invitations from our attorneys.
            </p>
          </SectionHeading>
          <div className="rounded-[2px] border border-champagne/15 bg-champagne/5 p-7 shadow-luxe luxury-inset">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  );
};
