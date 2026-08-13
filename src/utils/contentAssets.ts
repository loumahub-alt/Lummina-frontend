export type ContentAsset = {
  url: string;
  mediaId: string;
  alt: string;
};

export const contentAssetFromRecord = (
  record: Record<string, unknown> | undefined,
  key: string,
): ContentAsset => {
  const value = record?.[key];
  if (typeof value === 'string') return { url: value, mediaId: '', alt: '' };
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return { url: '', mediaId: '', alt: '' };
  }

  const asset = value as Record<string, unknown>;
  const storage = asset.storage && typeof asset.storage === 'object' && !Array.isArray(asset.storage)
    ? asset.storage as Record<string, unknown>
    : undefined;

  return {
    url: String(asset.url ?? asset.secure_url ?? asset.secureUrl ?? storage?.url ?? ''),
    mediaId: String(asset.mediaId ?? asset.id ?? ''),
    alt: String(asset.alt ?? asset.altText ?? storage?.alt ?? ''),
  };
};
