import { useState, type FormEvent } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function AdminLogin() {
  const { session, isAdmin, loading, configured, signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState(''); const [busy, setBusy] = useState(false);
  if (loading) return <div className="grid min-h-screen place-items-center bg-bg text-muted">Checking session...</div>;
  if (session && isAdmin) return <Navigate to={(location.state as { from?: string } | null)?.from ?? "/admin"} replace />;
  async function submit(event: FormEvent) { event.preventDefault(); setBusy(true); setError(''); const result = await signIn(email, password); if (result.error) setError(result.error); else navigate('/admin'); setBusy(false); }
  return <main className="grid min-h-screen place-items-center bg-bg px-5 text-ink"><div className="w-full max-w-md rounded-sm border border-line bg-panel p-7 sm:p-10">
    <Link to="/" className="eyebrow text-accent">IEEE Computer Society MBITS</Link><h1 className="mt-5 font-display text-4xl">Admin access</h1><p className="mt-3 text-sm text-muted">Sign in with an authorized administrator account.</p>
    {!configured && <p className="mt-6 border border-line px-4 py-3 text-sm text-muted">Supabase is not configured correctly. Set the complete Project URL and publishable key in `.env.local`, then restart the dev server.</p>}
    <form onSubmit={submit} className="mt-8 space-y-5"><label className="block text-sm text-muted">Email<input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-2 w-full rounded-sm border border-line bg-bg px-3 py-3 text-ink outline-none focus:border-accent" /></label><label className="block text-sm text-muted">Password<input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="mt-2 w-full rounded-sm border border-line bg-bg px-3 py-3 text-ink outline-none focus:border-accent" /></label>{error && <p className="text-sm text-red-300">{error}</p>}<button disabled={busy || !configured} className="w-full rounded-sm bg-accent px-4 py-3 text-sm font-medium text-bg disabled:cursor-not-allowed disabled:opacity-50">{busy ? 'Signing in...' : 'Sign in'}</button></form>
  </div></main>;
}
