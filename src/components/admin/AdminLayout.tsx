import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, LogOut, Settings, Table2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const links = [
  ['/admin', 'Overview'], ['/admin/events', 'Events'], ['/admin/projects', 'Projects'],
  ['/admin/achievements', 'Achievements'], ['/admin/team', 'Team'], ['/admin/gallery', 'Gallery'],
  ['/admin/announcements', 'Announcements'], ['/admin/settings', 'Settings'],
] as const;

export default function AdminLayout() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  return <div className="min-h-screen bg-bg text-ink lg:flex">
    <aside className="border-b border-line bg-panel lg:min-h-screen lg:w-64 lg:border-r lg:border-b-0">
      <div className="flex items-center justify-between gap-3 px-5 py-5 lg:block lg:px-6">
        <div><p className="eyebrow text-accent">IEEE CS MBITS</p><h1 className="mt-2 font-display text-2xl">Admin studio</h1></div>
        <button className="rounded-sm border border-line p-2 text-muted hover:text-accent lg:mt-8" title="Sign out" onClick={async () => { await signOut(); navigate('/admin/login'); }}><LogOut size={16} /></button>
      </div>
      <nav className="overflow-x-auto px-3 pb-3 lg:px-4 lg:pb-6" aria-label="Admin navigation"><ul className="flex gap-1 lg:block">
        {links.map(([to, label]) => <li key={to}><NavLink end={to === '/admin'} to={to} className={({ isActive }) => `flex items-center gap-3 whitespace-nowrap rounded-sm px-3 py-2.5 text-sm ${isActive ? 'bg-accent text-bg' : 'text-muted hover:bg-surface hover:text-ink'}`}>
          {to === '/admin' ? <LayoutDashboard size={16} /> : to === '/admin/settings' ? <Settings size={16} /> : <Table2 size={16} />}{label}
        </NavLink></li>)}
      </ul></nav>
    </aside>
    <main className="min-w-0 flex-1 p-5 sm:p-8 lg:p-12"><Outlet /></main>
  </div>;
}
