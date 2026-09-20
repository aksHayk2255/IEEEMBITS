export interface TeamMember {
  name: string;
  role: string;
  linkedin?: string;
  github?: string;
  email?: string;
}

/**
 * Add the execom / core team here. Members render in the order listed,
 * so keep the chair and vice-chair at the top if you want them first.
 */
export const team: TeamMember[] = [
  { name: 'Eldhose P.SIM', role: 'Chapter Advisor' },
  { name: 'Syno Shaji Kurian', role: 'Chair' },
  { name: 'Neswin Easter', role: 'Vice Chair' },
  { name: 'Alen Basil', role: 'Secretary' },
  { name: 'Manna Elsa Thomas', role: 'Treasurer' },
  { name: 'Nadir K Muhammed Shafi', role: 'Web Master' },
  { name: 'Grace Mary Eldo', role: 'WICS' },
];
