export interface Event {
  title: string;
  date: string;
  category: string;
  description: string;
  /** Import an image from src/assets/images and pass it here. */
  image?: string;
  link?: string;
}

/**
 * Add chapter events here. The Events section renders cards automatically
 * and shows an empty state while this array is empty.
 *
 * Example:
 * {
 *   title: 'Intro to Open Source',
 *   date: '12 March 2026',
 *   category: 'Workshop',
 *   description: 'A hands-on session on making your first contribution.',
 * }
 */
export const events: Event[] = [];
