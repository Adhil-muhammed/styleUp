/**
 * Formats an ISO 8601 date string into a human-readable date.
 *
 * @param isoString  ISO 8601 date string (e.g., "2026-06-08T10:00:00Z").
 * @param locale     BCP 47 locale tag (default: 'en-GB').
 * @param options    Intl.DateTimeFormat options (default: medium date style).
 */
export function formatDate(
  isoString: string,
  locale: string = "en-GB",
  options: Intl.DateTimeFormatOptions = { dateStyle: "medium" },
): string {
  return new Intl.DateTimeFormat(locale, options).format(new Date(isoString));
}

/**
 * Converts a duration in minutes to a readable "Xh Ym" string.
 *
 * @param minutes  Total duration in minutes (must be a non-negative integer).
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
}

/**
 * Truncates a string to `maxLength` characters and appends an ellipsis if needed.
 *
 * @param text       The source string.
 * @param maxLength  Maximum number of characters before truncation.
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1)}\u2026`;
}
