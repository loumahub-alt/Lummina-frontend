import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { brand, offices, practiceAreaGroups } from '../data/site';
import type { Insight, InsightCategory, PracticeArea, Stat } from '../types';
import { iconMap } from '../utils/icons';
import { contentAssetFromRecord } from '../utils/contentAssets';
import { usePreloadedCollection } from '../context/PreloadedContentContext';

export type PublishedRecord = Record<string, unknown>;

const monetaryFigurePattern = /^\s*(?:[$€£]|(?:USD|NGN|GBP|EUR)\b)/i;

// Public matter summaries should not turn confidential or jurisdiction-specific
// figures into promotional claims. Keep non-monetary descriptors such as
// "Board-Level" or "Strategic" intact.
export const publicFigure = (value: unknown, fallback = 'Representative') => {
  const text = typeof value === 'string' ? value.trim() : '';
  return text && !monetaryFigurePattern.test(text) ? text : fallback;
};

export const usePublishedCollection = (resource: string) => {
  const preloadedRecords = usePreloadedCollection(resource);
  const [records, setRecords] = useState<PublishedRecord[] | null>(preloadedRecords);

  useEffect(() => {
    let active = true;

    api.public
      .collection(resource)
      .then((items) => {
        if (active) setRecords(items);
      })
      .catch(() => {
        // Keep preloaded records, when available, if the CMS request fails.
      });

    return () => {
      active = false;
    };
  }, [preloadedRecords, resource]);

  return records;
};

const insightCategoryFromType = (value: unknown): InsightCategory => {
  const type = typeof value === 'string' ? value.trim().toLowerCase() : '';
  if (type === 'insight' || type === 'insights') return 'Insights';
  if (type === 'newsletter' || type === 'newsletters') return 'Newsletters';
  if (type === 'resource' || type === 'resources' || type === 'publication' || type === 'publications') return 'Resources';
  if (type === 'event' || type === 'events') return 'Events';
  return 'Articles';
};

const insightDate = (value: unknown) => {
  if (typeof value !== 'string' || !value) return '';
  const date = new Date(value);
  return Number.isNaN(date.valueOf())
    ? ''
    : date.toLocaleDateString('en-NG', { year: 'numeric', month: 'short', day: 'numeric' });
};

export const mapPublishedInsightRecord = (record: PublishedRecord, index = 0): Insight => {
  const image = contentAssetFromRecord(record, 'image');
  const thumbnail = contentAssetFromRecord(record, 'thumbnail');
  const ebook = contentAssetFromRecord(record, 'ebook');
  const ebookRecord = record.ebook && typeof record.ebook === 'object' && !Array.isArray(record.ebook)
    ? record.ebook as Record<string, unknown>
    : {};
  const title = typeof record.title === 'string' && record.title.trim() ? record.title.trim() : 'Lummina Insight';
  const publishedAt = typeof record.publishedAt === 'string' ? record.publishedAt : '';

  return {
    id: typeof record.slug === 'string' && record.slug.trim()
      ? record.slug
      : String(record.id ?? record._id ?? `insight-${index + 1}`),
    category: insightCategoryFromType(record.type ?? record.category),
    date: insightDate(publishedAt),
    publishedAt: publishedAt || undefined,
    title,
    summary: typeof record.excerpt === 'string' ? record.excerpt : '',
    image: 'library',
    imageUrl: image.url || undefined,
    imageAlt: image.alt || undefined,
    thumbnailUrl: thumbnail.url || undefined,
    thumbnailAlt: thumbnail.alt || undefined,
    ebookUrl: ebook.url || undefined,
    ebookFileName: String(ebookRecord.fileName ?? ebookRecord.originalName ?? '') || undefined,
    featured: record.isFeatured === true,
  };
};

const servicesFromRecord = (value: unknown) => {
  if (!Array.isArray(value)) return [];
  return value
    .map((service) => {
      if (typeof service === 'string') return service;
      if (service && typeof service === 'object' && typeof (service as { name?: unknown }).name === 'string') {
        return (service as { name: string }).name;
      }
      return '';
    })
    .filter(Boolean);
};

export const mapPracticeAreaRecord = (record: PublishedRecord, fallback: PracticeArea): PracticeArea => {
  const slug = typeof record.slug === 'string' ? record.slug : fallback.id;
  const fullDescription = typeof record.fullDescription === 'string'
    ? record.fullDescription
    : fallback.summary;
  const publishedServices = servicesFromRecord(record.services);

  return {
    ...fallback,
    id: slug,
    title: typeof record.title === 'string' ? record.title : fallback.title,
    icon: typeof record.icon === 'string' && record.icon in iconMap
      ? record.icon as PracticeArea['icon']
      : fallback.icon,
    shortDescription: typeof record.shortDescription === 'string'
      ? record.shortDescription
      : fallback.shortDescription,
    summary: fullDescription,
    detail: fullDescription,
    // Keep the public card useful when older CMS records are incomplete, while
    // preserving any additional service labels maintained in the CMS.
    services: Array.from(new Set([...fallback.services, ...publishedServices])),
  };
};

export const mapPublishedPracticeAreas = (
  records: PublishedRecord[] | null,
  fallbackAreas: PracticeArea[] = practiceAreaGroups,
): PracticeArea[] => {
  if (records === null) return fallbackAreas;

  return records
    .map((record, index) => {
      const slug = typeof record.slug === 'string' ? record.slug : '';
      const fallback = fallbackAreas.find((area) => area.id === slug)
        ?? fallbackAreas[index]
        ?? fallbackAreas[0];
      return fallback ? mapPracticeAreaRecord(record, fallback) : null;
    })
    .filter((area): area is PracticeArea => Boolean(area));
};

export const mapPublishedStatistics = (
  records: PublishedRecord[] | null,
  fallback: Stat[] = [],
): Stat[] => {
  if (records === null) return fallback;

  return records.map((record) => ({
    value: typeof record.value === 'string' ? record.value : String(record.value ?? ''),
    label: typeof record.label === 'string' ? record.label : '',
    description: typeof record.supportingText === 'string' ? record.supportingText : undefined,
  }));
};

export const usePublicContact = () => {
  const [contact, setContact] = useState({
    email: brand.email,
    phones: offices[0].phones,
    whatsapp: brand.whatsapp,
    address: offices[0].address,
    mapUrl: offices[0].mapUrl,
    social: {
      facebook: '',
      x: '',
      linkedin: '',
      instagram: '',
    },
  });

  useEffect(() => {
    let active = true;

    apiFetchContact().then((remote) => {
      if (!active || !remote) return;
      setContact(remote);
    });

    return () => {
      active = false;
    };
  }, []);

  return contact;
};

const apiFetchContact = async () => {
  try {
    const settings = await api.public.settings();
    const value = settings.contact;
    if (!value || typeof value !== 'object') return null;

    const contact = value as Record<string, unknown>;
    const socialValue = settings.social && typeof settings.social === 'object'
      ? settings.social as Record<string, unknown>
      : contact.social && typeof contact.social === 'object'
        ? contact.social as Record<string, unknown>
        : {};
    const address = typeof contact.address === 'string'
      ? contact.address.split(/, (?=Lekki Phase 1)/)
      : [];
    const phones = [contact.primaryPhone, contact.secondaryPhone].filter(
      (phone): phone is string => typeof phone === 'string' && phone.length > 0,
    );

    return {
      email: typeof contact.email === 'string' ? contact.email : '',
      phones,
      whatsapp: typeof contact.whatsapp === 'string' ? contact.whatsapp : '',
      address,
      mapUrl: typeof contact.mapUrl === 'string' ? contact.mapUrl : '',
      social: {
        facebook: typeof socialValue.facebook === 'string' ? socialValue.facebook : '',
        x: typeof socialValue.x === 'string' ? socialValue.x : '',
        linkedin: typeof socialValue.linkedin === 'string' ? socialValue.linkedin : '',
        instagram: typeof socialValue.instagram === 'string' ? socialValue.instagram : '',
      },
    };
  } catch {
    return null;
  }
};
