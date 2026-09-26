import { useAuth } from '../../hooks/useAuth';

export default function AdminSettings() {
  const { session } = useAuth();
  return <>
    <p className="eyebrow text-accent">Admin / Settings</p>
    <h1 className="mt-3 font-display text-5xl">Settings</h1>
    <div className="mt-10 max-w-2xl border border-line bg-panel p-6">
      <p className="text-sm text-muted">Signed in as</p>
      <p className="mt-2 break-all text-lg text-ink">{session?.user.email}</p>
      <p className="mt-6 text-sm leading-relaxed text-muted">Admin access is controlled by the Supabase `admin_users` table and row-level security policies.</p>
    </div>
  </>;
}
