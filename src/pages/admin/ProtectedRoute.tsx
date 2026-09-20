import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function ProtectedRoute() {
  const { session, isAdmin, loading } = useAuth();
  const location = useLocation();
  if (loading) return <div className="grid min-h-screen place-items-center bg-bg text-muted">Checking session...</div>;
  return session && isAdmin ? <Outlet /> : <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
}
