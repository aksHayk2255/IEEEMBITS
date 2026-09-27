export interface SocialLink {
  id: 'instagram' | 'linkedin' | 'youtube' | 'github';
  label: string;
  href: string;
}

export const socialLinks: SocialLink[] = [
  { id: 'instagram', label: 'Instagram', href: '' },
  { id: 'linkedin', label: 'LinkedIn', href: '' },
  { id: 'youtube', label: 'YouTube', href: '' },
  { id: 'github', label: 'GitHub', href: '' },
];
