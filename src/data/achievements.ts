export interface Achievement {
  title: string;
  /** Free-form: a year, a month, or a full date. Shown as the timeline marker. */
  date: string;
  description: string;
  /** Optional context line, e.g. the event or organiser. */
  context?: string;
}

/**
 * Add milestones here, oldest first. The timeline runs horizontally on
 * desktop and vertically on mobile, and stays in an empty state until
 * at least one entry exists.
 */
export const achievements: Achievement[] = [];
