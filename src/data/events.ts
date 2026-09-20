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
export const events: Event[] = [
  {
    title: 'Hack Demo Defend',
    date: '27 February 2026',
    category: 'Technical',
    description: 'A technical event focused on building, demonstrating, and defending innovative ideas.',
  },
  {
    title: 'Think Tank Ideathon',
    date: '27 February 2026',
    category: 'Technical',
    description: 'A collaborative ideathon for developing creative technology-driven solutions.',
  },
  {
    title: 'VIBE.EXE Workshop',
    date: '27 February 2026',
    category: 'Technical',
    description: 'A hands-on technical workshop for exploring practical tools and emerging ideas.',
  },
  {
    title: 'Skill Hunt',
    date: '13 June 2026',
    category: 'Non-Technical',
    description: 'A challenge designed to discover and celebrate the diverse skills of the chapter.',
  },
  {
    title: 'Blueprint to Breakthrough',
    date: '4 July 2026',
    category: 'Technical',
    description: 'A technical event that turns structured plans into meaningful breakthroughs.',
  },
  {
    title: 'Informatyka 6.O Object Quest',
    date: '28 June 2026',
    category: 'Technical',
    description: 'A technical quest built around problem-solving, exploration, and computing concepts.',
  },
  {
    title: 'Informatyka 6.O Prompt to Meme',
    date: '12-25 July 2026',
    category: 'Non-Technical',
    description: 'A creative challenge that transforms prompts into engaging memes.',
  },
  {
    title: 'MD Session, CS',
    date: '16 August 2026',
    category: 'MD',
    description: 'A chapter session focused on sharing knowledge and connecting the community.',
  },
];
