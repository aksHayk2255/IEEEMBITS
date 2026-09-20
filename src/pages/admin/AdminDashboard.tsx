import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

const resources = [['events', 'Events'], ['projects', 'Projects'], ['achievements', 'Achievements'], ['team_members', 'Team members'], ['gallery', 'Gallery'], ['announcements', 'Announcements']] as const;
export default function AdminDashboard() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  useEffect(() => { if (!supabase) return; void Promise.all(resources.map(async ([table]) => { const { count } = await supabase!.from(table).select('*', { count: 'exact', head: true }); return [table, count ?? 0] as const; })).then(rows => setCounts(Object.fromEntries(rows))); }, []);
  return <><p className="eyebrow text-accent">Overview</p><h1 className="mt-3 font-display text-5xl">Content dashboard</h1><p className="mt-4 max-w-xl text-muted">Manage the content that appears across the public IEEE Computer Society MBITS website.</p><div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{resources.map(([key, label]) => <div key={key} className="border border-line bg-panel p-6"><p className="text-sm text-muted">{label}</p><p className="mt-4 font-display text-5xl text-accent">{counts[key] ?? 0}</p></div>)}</div></>;
}
