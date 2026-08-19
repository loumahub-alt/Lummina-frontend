import { createContext, useContext } from 'react';

export type PreloadedRecord = Record<string, unknown>;

export type PreloadedContent = {
  collections?: Record<string, PreloadedRecord[]>;
  items?: Record<string, Record<string, PreloadedRecord>>;
};

const PreloadedContentContext = createContext<PreloadedContent | null>(null);

export const PreloadedContentProvider = PreloadedContentContext.Provider;

export const usePreloadedCollection = (resource: string) => {
  const content = useContext(PreloadedContentContext);
  const records = content?.collections?.[resource];
  return Array.isArray(records) ? records : null;
};

export const usePreloadedItem = (resource: string, slug: string) => {
  const content = useContext(PreloadedContentContext);
  return content?.items?.[resource]?.[slug] ?? null;
};

export const getBrowserPreloadedContent = (): PreloadedContent | null => {
  if (typeof window === 'undefined') return null;
  return window.__LUMMINA_PRERENDER_DATA__ ?? null;
};

declare global {
  interface Window {
    __LUMMINA_PRERENDER_DATA__?: PreloadedContent;
  }
}
