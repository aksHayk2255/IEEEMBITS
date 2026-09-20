export interface Project {
  title: string;
  summary: string;
  /** Short tech/tool labels, e.g. ['React', 'Python']. */
  tags: string[];
  year?: string;
  image?: string;
  link?: string;
}

/**
 * Add chapter projects here. Leave the array empty and the Projects
 * section shows an empty state instead of cards.
 */
export const projects: Project[] = [];
