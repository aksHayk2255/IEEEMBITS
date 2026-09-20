import { ArrowUpRight, Bell } from 'lucide-react';
import { useContent } from '../hooks/useContent';

interface Announcement { title: string; description: string; link_url?: string; active?: boolean; }

export default function AnnouncementBanner() {
  const { data } = useContent<Announcement>('announcements');
  const announcement = data[0];
  if (!announcement) return null;
  return <aside className="border-b border-line bg-panel" aria-label="Announcement"><div className="shell flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-start gap-3"><Bell size={16} className="mt-1 shrink-0 text-accent" aria-hidden="true" /><div><p className="text-sm font-medium text-ink">{announcement.title}</p>{announcement.description && <p className="text-xs text-muted">{announcement.description}</p>}</div></div>{announcement.link_url && <a href={announcement.link_url} className="inline-flex items-center gap-1 text-xs text-accent">View details <ArrowUpRight size={13} aria-hidden="true" /></a>}</div></aside>;
}
