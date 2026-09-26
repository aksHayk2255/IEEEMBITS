import { useEffect, useState } from 'react';
import { countContent, type ContentTable } from '../../services/content';

const resources: [ContentTable, string][] = [
  ['events', 'Events'], ['projects', 'Projects'], ['achievements', 'Achievements'],
  ['team_members', 'Team members'], ['gallery', 'Gallery'], ['announcements', 'Announcements'],
];

export default function AdminDashboard() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    void Promise.all(resources.map(async ([table]) => [table, await countContent(table)] as const)).then((results) => {
      if (!active) return;
      const failed = results.find(([, result]) => result.error);
      if (failed) setError(failed[1].error?.message ?? 'Could not load content counts.');
      setCounts(Object.fromEntries(results.map(([table, result]) => [table, result.count])));
    });
    return () => { active = false; };
  }, []);

  return <>
    <p className="eyebrow text-accent">Overview</p>
    <h1 className="mt-3 font-display text-5xl">Content dashboard</h1>
    <p className="mt-4 max-w-xl text-muted">Manage content shown across the public IEEE Computer Society MBITS website.</p>
    {error && <p role="alert" className="mt-6 border border-line px-4 py-3 text-sm text-muted">{error}</p>}
    <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {resources.map(([key, label]) => <div key={key} className="border border-line bg-panel p-6"><p className="text-sm text-muted">{label}</p><p className="mt-4 font-display text-5xl text-accent">{counts[key] ?? '—'}</p></div>)}
    </div>
  </>;
}
