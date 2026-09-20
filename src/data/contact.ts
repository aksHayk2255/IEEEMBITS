/**
 * Chapter contact details.
 *
 * Replace every placeholder below with the real information. Any entry
 * whose `value` still starts with '[' is rendered as a muted placeholder
 * and is not turned into a clickable link.
 */
export interface ContactEntry {
  label: string;
  value: string;
  /** Optional href — add it once the real destination is known. */
  href?: string;
}

export const contactDetails: ContactEntry[] = [
  { label: 'Email', value: '[Official email]' },
  { label: 'Location', value: '[MBITS location]' },
  { label: 'Instagram', value: '[Instagram link]' },
  { label: 'LinkedIn', value: '[LinkedIn link]' },
  { label: 'YouTube', value: '[YouTube link]' },
  { label: 'GitHub', value: '[GitHub link]' },
];

/** True while the value is still an unfilled placeholder like "[Official email]". */
export function isPlaceholder(value: string): boolean {
  return value.trim().startsWith('[');
}
