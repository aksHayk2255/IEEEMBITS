import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function ProtectedRoute() {
  const { session, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="grid min-h-screen place-items-center bg-bg text-muted">Checking session...</div>;
  if (!session) return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  if (!isAdmin) return <main className="grid min-h-screen place-items-center bg-bg px-5 text-ink"><div className="w-full max-w-xl rounded-sm border border-line bg-panel p-8"><p className="eyebrow text-accent">Admin access required</p><h1 className="mt-4 font-display text-4xl">This account is not authorized</h1><p className="mt-4 text-sm leading-relaxed text-muted">This signed-in user must be added to `public.admin_users` in Supabase before it can access the dashboard.</p></div></main>;
  return <Outlet />;
}
