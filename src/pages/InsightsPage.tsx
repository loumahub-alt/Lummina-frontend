import { useMemo, useState } from 'react';
import { InsightCard } from '../components/cards/InsightCard';
import { NewsletterForm } from '../components/forms/NewsletterForm';
import { PageHero } from '../components/common/PageHero';
import { SectionHeading } from '../components/common/SectionHeading';
import { images, insights } from '../data/site';
import type { InsightCategory } from '../types';

const categories: Array<'Latest Insights' | InsightCategory> = [
  'Latest Insights',
  'Articles',
  'Publications',
  'Events',
];

export const InsightsPage = () => {
  const [activeCategory, setActiveCategory] =
    useState<(typeof categories)[number]>('Latest Insights');

  const featuredInsight = insights.find((insight) => insight.featured) ?? insights[0];
  const filteredInsights = useMemo(() => {
    if (activeCategory === 'Latest Insights') {
      return insights;
    }
    return insights.filter((insight) => insight.category === activeCategory);
  }, [activeCategory]);

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
                    ? 'border-gold bg-gold text-navy shadow-gold'
                    : 'border-light-line bg-white/70 text-ink/72 hover:border-gold-dark hover:bg-white hover:text-gold-dark'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-10">
            <InsightCard insight={featuredInsight} featured />
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredInsights.map((insight) => (
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
