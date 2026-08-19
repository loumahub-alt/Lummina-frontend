import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { brand, offices, practiceAreaGroups } from '../data/site';
import type { PracticeArea, Stat } from '../types';
import { iconMap } from '../utils/icons';
import { usePreloadedCollection } from '../context/PreloadedContentContext';

export type PublishedRecord = Record<string, unknown>;

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
        // The public site keeps its bundled content as a resilient fallback.
      });

    return () => {
      active = false;
    };
  }, [preloadedRecords, resource]);

  return records;
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
    services: servicesFromRecord(record.services),
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
): Stat[] => {
  if (records === null) return [];

  return records.map((record) => ({
    value: typeof record.value === 'string' ? record.value : '',
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
