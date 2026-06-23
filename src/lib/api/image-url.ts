/**
 * Converts a backend image URL (https://api-host/uploads/...)
 * to a same-origin proxy path (/api/uploads/...).
 * Returns null for empty/null values.
 */
export function toUploadUrl(imageUrl: string | null | undefined): string | null {
  if (!imageUrl) return null;
  const match = imageUrl.match(/\/uploads\/(.+)$/);
  return match ? `/api/uploads/${match[1]}` : null;
}
