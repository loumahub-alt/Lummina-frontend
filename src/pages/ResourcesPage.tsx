import { useMemo } from 'react';
import { InsightCard } from '../components/cards/InsightCard';
import { CallToAction } from '../components/common/CallToAction';
import { PageHero } from '../components/common/PageHero';
import { images, insights } from '../data/site';
import { usePublishedCollection } from '../hooks/usePublishedContent';
import { contentAssetFromRecord } from '../utils/contentAssets';
import { TransitionLink } from '../components/transitions';
import type { Insight } from '../types';

export const ResourcesPage = () => {
  const publishedRecords = usePublishedCollection('insights');
  const resources = useMemo<Insight[]>(() => {
    if (publishedRecords === null) return insights.filter((item) => item.id === 'startup-readiness');

    return publishedRecords
      .filter((record) => ['resource', 'resources', 'publication', 'publications'].includes(String(record.type ?? '').toLowerCase()))
      .map((record, index) => {
        const fallback = insights.find((item) => item.id === record.slug) ?? insights[index] ?? insights[0];
        const image = contentAssetFromRecord(record, 'image');
        return {
          ...fallback,
          id: typeof record.slug === 'string' ? record.slug : fallback.id,
          category: 'Resources',
          title: typeof record.title === 'string' ? record.title : fallback.title,
          summary: typeof record.excerpt === 'string' ? record.excerpt : fallback.summary,
          imageUrl: image.url || undefined,
          imageAlt: image.alt || undefined,
          ebookUrl: contentAssetFromRecord(record, 'ebook').url || undefined,
          ebookFileName: record.ebook && typeof record.ebook === 'object' && !Array.isArray(record.ebook)
            ? String((record.ebook as Record<string, unknown>).fileName ?? (record.ebook as Record<string, unknown>).originalName ?? '') || undefined
            : undefined,
        };
      });
  }, [publishedRecords]);

  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Practical materials for decisions that matter."
        description="Explore e-books and other practical materials prepared to help you frame legal and commercial questions before taking the next step."
        image={images.library}
      />

      <section className="cream-section py-20">
        <div className="container-shell">
          <div className="rounded-[2px] border border-gold/40 bg-gold/10 p-6 text-ink/78 sm:p-8">
            <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-gold-dark">Important disclaimer</p>
            <p className="mt-3 leading-7">
              These resources are provided for general informational purposes only. Using or
              downloading any resource does not create an attorney-client relationship with
              Lummina Law Firm, and you should obtain advice on the facts of your particular matter.
            </p>
            <p className="mt-3 text-sm leading-7 text-ink/65">
              Please also review our <TransitionLink to="/privacy-policy" className="font-bold text-gold-dark underline">Privacy Policy</TransitionLink> and <TransitionLink to="/terms-of-use" className="font-bold text-gold-dark underline">Terms of Use</TransitionLink>.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {resources.map((resource) => <InsightCard key={resource.id} insight={resource} />)}
          </div>
          {!resources.length && <p className="mt-12 rounded-[2px] border border-light-line bg-white/70 p-10 text-center text-ink/60">Resources will appear here as they are published.</p>}
        </div>
      </section>

      <CallToAction title="Need help applying a resource to your situation?" ctaLabel="Speak With Us" />
    </>
  );
};
