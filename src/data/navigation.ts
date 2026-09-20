export interface NavLink {
  label: string;
  /** Matches the id attribute on the corresponding <section>. */
  id: string;
}

export const navLinks: NavLink[] = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Events', id: 'events' },
  { label: 'Projects', id: 'projects' },
  { label: 'Team', id: 'team' },
  { label: 'Gallery', id: 'gallery' },
  { label: 'Contact', id: 'contact' },
];
