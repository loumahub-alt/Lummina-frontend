import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
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

type InsightFilter = (typeof categories)[number];

const categoryFromHash = (hash: string): InsightFilter | null => {
  if (hash === '#events') return 'Events';
  if (hash === '#publications') return 'Publications';
  return null;
};

const eventImageFor = (event: Insight) => {
  const fallbackImage = images[event.image];
  return {
    ...fallbackImage,
    src: event.imageUrl ?? event.thumbnailUrl ?? fallbackImage.src,
    alt: event.imageAlt ?? event.thumbnailAlt ?? event.title,
  };
};

const EventGallery = ({ events }: { events: Insight[] }) => {
  const [selectedEvent, setSelectedEvent] = useState<Insight | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!selectedEvent) return;

    document.body.classList.add('modal-open');
    closeButtonRef.current?.focus();
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedEvent(null);
    };
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', handleEscape);
    };
  }, [selectedEvent]);

  if (events.length === 0) {
    return (
      <section id="events" className="mt-10 border border-light-line bg-white/45 px-6 py-16 text-center sm:px-10">
        <p className="eyebrow">Events</p>
        <h2 className="mt-4 font-serif text-4xl font-medium text-ink">Events gallery coming soon.</h2>
        <p className="mx-auto mt-4 max-w-xl leading-7 text-ink/65">
          Published event photographs and invitations will appear here as Lummina adds them.
        </p>
      </section>
    );
  }

  return (
    <>
      <section id="events" className="mt-10" aria-labelledby="events-gallery-title">
      <div className="flex flex-col justify-between gap-5 border-b border-light-line pb-7 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow">Events</p>
          <h2 id="events-gallery-title" className="mt-3 font-serif text-4xl font-medium text-ink sm:text-5xl">
            Moments from the Lummina calendar.
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-ink/65">
            Browse photographs from Lummina events, conversations and gatherings.
          </p>
        </div>
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-gold-dark">
          {events.length} {events.length === 1 ? 'event' : 'events'}
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => {
          const image = eventImageFor(event);

          return (
            <article key={event.id} className="luxury-card group overflow-hidden">
              <button
                type="button"
                onClick={() => setSelectedEvent(event)}
                aria-label={`View larger image for ${event.title}`}
                className="block w-full cursor-zoom-in text-left focus-visible:outline-gold-dark"
              >
                <div className="aspect-[4/3] overflow-hidden bg-bordeaux/10">
                <img
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                </div>
              </button>
              <div className="p-6">
                <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-gold-dark">
                  Events <span aria-hidden="true">|</span> {event.date}
                </p>
                <h3 className="mt-3 font-serif text-2xl font-medium leading-tight text-ink">{event.title}</h3>
                {event.summary && <p className="mt-3 leading-7 text-ink/65">{event.summary}</p>}
              </div>
            </article>
          );
        })}
      </div>
      </section>
      {selectedEvent && createPortal(
        // The modal is rendered into document.body so it is not constrained by
        // the page transition wrapper's transform containing block.
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-image-modal-title"
      className="fixed inset-0 z-[70] overflow-y-auto bg-wine/90 p-4 backdrop-blur-md sm:p-8"
      onClick={() => setSelectedEvent(null)}
    >
      <div className="flex min-h-full items-center justify-center">
        <div
          className="relative w-full max-w-6xl rounded-[2px] border border-champagne/20 bg-[#170009]/90 p-3 shadow-luxe sm:p-5"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            ref={closeButtonRef}
            onClick={() => setSelectedEvent(null)}
            aria-label="Close enlarged event image"
            className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-[2px] border border-champagne/25 bg-wine/85 text-champagne transition hover:border-gold hover:text-gold-bright"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
          <img
            src={eventImageFor(selectedEvent).src}
            alt={eventImageFor(selectedEvent).alt}
            width={eventImageFor(selectedEvent).width}
            height={eventImageFor(selectedEvent).height}
            className="mx-auto max-h-[78vh] w-auto max-w-full object-contain"
          />
          <div className="px-2 pb-2 pt-4 text-champagne sm:px-4 sm:pb-3">
            <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-gold-bright">
              Events <span aria-hidden="true">|</span> {selectedEvent.date}
            </p>
            <h2 id="event-image-modal-title" className="mt-2 font-serif text-3xl font-medium text-white sm:text-4xl">
              {selectedEvent.title}
            </h2>
            {selectedEvent.summary && <p className="mt-2 leading-7 text-champagne/75">{selectedEvent.summary}</p>}
          </div>
        </div>
      </div>
    </div>,
        document.body,
      )}
    </>
  );
};

export const InsightsPage = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState<InsightFilter>(
    () => categoryFromHash(location.hash) ?? 'Latest Insights',
  );

  useEffect(() => {
    const category = categoryFromHash(location.hash);
    if (category) setActiveCategory(category);
  }, [location.hash]);

  const publishedRecords = usePublishedCollection('insights');
  const insightItems = useMemo<Insight[]>(() => {
    if (publishedRecords === null) return insights;

    return publishedRecords.map((record, index) => {
      const fallback = insights.find((item) => item.id === record.slug) ?? insights[index] ?? insights[0];
      const type = typeof record.type === 'string'
        ? record.type.trim().toLowerCase()
        : typeof record.category === 'string'
          ? record.category.trim().toLowerCase()
          : '';
      const category: InsightCategory = type === 'publication' || type === 'publications'
        ? 'Publications'
        : type === 'event' || type === 'events'
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
        summary: typeof record.excerpt === 'string' && record.excerpt.trim()
          ? record.excerpt
          : category === 'Events'
            ? ''
            : fallback.summary,
        image: fallbackImage ?? fallback.image,
        imageUrl: image.url || undefined,
        imageAlt: image.alt || undefined,
        thumbnailUrl: thumbnail.url || undefined,
        thumbnailAlt: thumbnail.alt || undefined,
        featured: record.isFeatured === true || fallback.featured,
      };
    });
  }, [publishedRecords]);

  const filteredInsights = useMemo(() => {
    if (activeCategory === 'Latest Insights') {
      return insightItems.filter((insight) => insight.category !== 'Events');
    }
    return insightItems.filter((insight) => insight.category === activeCategory);
  }, [activeCategory, insightItems]);
  const featuredInsight = activeCategory === 'Latest Insights'
    ? filteredInsights.find((insight) => insight.featured) ?? filteredInsights[0]
    : undefined;
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

          {activeCategory === 'Events' ? (
            <EventGallery events={filteredInsights} />
          ) : (
            <>
              <div className="mt-10">
                {featuredInsight && <InsightCard insight={featuredInsight} featured />}
              </div>

              <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {gridInsights.map((insight) => (
                  <InsightCard key={insight.id} insight={insight} />
                ))}
              </div>
            </>
          )}
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
