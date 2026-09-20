import chapterAdvisorImage from '../assets/images/chapter_advisor.png';
import chairImage from '../assets/images/chair.png';
import viceChairImage from '../assets/images/vice_chair.png';
import secretaryImage from '../assets/images/secretary.png';
import treasurerImage from '../assets/images/treasurer.png';
import webMasterImage from '../assets/images/web_master.png';
import wicsImage from '../assets/images/wics.png';

export interface TeamMember {
  name: string;
  role: string;
  photo?: string;
  linkedin?: string;
  github?: string;
  email?: string;
}

/**
 * Add the execom / core team here. Members render in the order listed,
 * so keep the chair and vice-chair at the top if you want them first.
 */
export const team: TeamMember[] = [
  { name: 'Eldhose P.SIM', role: 'Chapter Advisor', photo: chapterAdvisorImage },
  { name: 'Syno Shaji Kurian', role: 'Chair', photo: chairImage },
  { name: 'Neswin Easter', role: 'Vice Chair', photo: viceChairImage },
  { name: 'Alen Basil', role: 'Secretary', photo: secretaryImage },
  { name: 'Manna Elsa Thomas', role: 'Treasurer', photo: treasurerImage },
  { name: 'Nadir K Muhammed Shafi', role: 'Web Master', photo: webMasterImage },
  { name: 'Grace Mary Eldo', role: 'WICS', photo: wicsImage },
];
