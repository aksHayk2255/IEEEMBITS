export interface TeamMember {
  name: string;
  role: string;
  /** Import a photo from src/assets/images and pass it here. */
  photo?: string;
  linkedin?: string;
  github?: string;
  email?: string;
}

/**
 * Add the execom / core team here. Members render in the order listed,
 * so keep the chair and vice-chair at the top if you want them first.
 */
export const team: TeamMember[] = [];
