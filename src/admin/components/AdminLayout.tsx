import { useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Activity,
  BarChart3,
  Bell,
  BookOpen,
  Building2,
  ChevronDown,
  FileText,
  Globe2,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from 'lucide-react';
import { brand } from '../../data/site';
import { adminStore } from '../services/adminStore';

const navGroups = [
  { label: 'Overview', items: [{ label: 'Dashboard', to: '/admin', icon: LayoutDashboard }] },
  {
    label: 'Analytics',
    items: [
      { label: 'Traffic Overview', to: '/admin/analytics', icon: BarChart3 },
      { label: 'Page Performance', to: '/admin/analytics/pages', icon: FileText },
      { label: 'Visitor Interest', to: '/admin/analytics/interest', icon: Sparkles },
      { label: 'Traffic Sources', to: '/admin/analytics/sources', icon: Globe2 },
      { label: 'Search Analytics', to: '/admin/analytics/search', icon: Search },
      { label: 'Consent Analytics', to: '/admin/analytics/consent', icon: ShieldCheck },
    ],
  },
  {
    label: 'Website Content',
    items: [
      { label: 'Practice Areas', to: '/admin/content/practice-areas', icon: Building2 },
      { label: 'Our Team', to: '/admin/content/team', icon: Users },
      { label: 'Results', to: '/admin/content/results', icon: Activity },
      { label: 'Insights', to: '/admin/content/insights', icon: BookOpen },
      { label: 'Testimonials', to: '/admin/content/testimonials', icon: MessageSquare },
      { label: 'Firm Statistics', to: '/admin/content/statistics', icon: Sparkles },
    ],
  },
  {
    label: 'Clients',
    items: [
      { label: 'Consultation Requests', to: '/admin/consultations', icon: MessageSquare },
      { label: 'Newsletter', to: '/admin/newsletter', icon: Mail },
    ],
  },
  {
    label: 'Website',
    items: [
      { label: 'SEO & Metadata', to: '/admin/settings/seo', icon: Globe2 },
      { label: 'Contact Information', to: '/admin/settings/contact', icon: Settings },
      { label: 'General Settings', to: '/admin/settings/general', icon: Settings },
    ],
  },
  {
    label: 'Administration',
    items: [
      { label: 'Admin Users', to: '/admin/users', icon: Users },
      { label: 'Activity Log', to: '/admin/activity', icon: Activity },
    ],
  },
];

export const AdminLayout = ({ onLogout }: { onLogout?: () => void }) => {
  const [open, setOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = adminStore.currentUser();

  const logout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await adminStore.logout();
    } catch {
      // The local session is cleared in adminStore even if the API is unavailable.
    } finally {
      onLogout?.();
      navigate('/admin/login', { replace: true });
      setLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4E7D6] text-ink">
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[17.5rem] flex-col bg-[#3A0013] px-5 py-6 text-white transition-transform duration-300 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between border-b border-champagne/15 pb-6">
          <Link to="/admin" onClick={() => setOpen(false)} className="[&_img]:max-w-[9rem]">
            <img src={brand.logoLight} alt="Lummina Law Firm" width={512} height={188} className="h-auto w-[9.8rem] object-contain" />
          </Link>
          <button type="button" aria-label="Close admin navigation" onClick={() => setOpen(false)} className="rounded border border-champagne/20 p-2 lg:hidden">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-6 flex-1 space-y-6 overflow-y-auto pr-1">
          {navGroups.map((group) => (
            <div key={group.label}>
              <p className="mb-2 px-3 text-[0.62rem] font-extrabold uppercase tracking-[0.16em] text-champagne/45">{group.label}</p>
              <nav className="space-y-1" aria-label={group.label}>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isDashboard = item.to === '/admin';
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={isDashboard}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) => `relative flex items-center gap-3 rounded-[2px] px-3 py-2.5 text-sm transition ${isActive ? 'bg-champagne/10 text-gold-bright' : 'text-champagne/70 hover:bg-champagne/5 hover:text-white'}`}
                    >
                      <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>{item.label}</span>
                      {location.pathname === item.to && <span className="absolute right-3 h-1.5 w-1.5 rounded-full bg-gold" />}
                    </NavLink>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
        <div className="mt-5 border-t border-champagne/15 pt-5">
          <div className="flex items-center gap-3 rounded-[2px] bg-champagne/5 p-3">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gold font-serif font-bold text-bordeaux">FZ</div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">{user.name}</p>
              <p className="text-xs text-champagne/55">{user.role}</p>
            </div>
            <ChevronDown className="h-4 w-4 text-champagne/50" aria-hidden="true" />
          </div>
          <button type="button" onClick={logout} disabled={loggingOut} className="mt-3 flex w-full items-center gap-3 rounded-[2px] px-3 py-2.5 text-sm text-champagne/65 transition hover:bg-champagne/5 hover:text-white disabled:cursor-wait disabled:opacity-60">
            <LogOut className="h-4 w-4" aria-hidden="true" />
            {loggingOut ? 'Logging out…' : 'Log out'}
          </button>
        </div>
      </aside>
      {open && <button type="button" aria-label="Close admin navigation overlay" onClick={() => setOpen(false)} className="fixed inset-0 z-40 bg-[#170009]/65 lg:hidden" />}
      <div className="min-h-screen lg:pl-[17.5rem]">
        <header className="sticky top-0 z-30 flex min-h-[4.75rem] items-center justify-between border-b border-[#5F021F]/10 bg-[#F7E7CE]/95 px-5 backdrop-blur-xl sm:px-8">
          <button type="button" aria-label="Open admin navigation" onClick={() => setOpen(true)} className="rounded border border-[#5F021F]/15 p-2 lg:hidden">
            <Menu className="h-5 w-5 text-bordeaux" />
          </button>
          <div className="hidden lg:block">
            <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.16em] text-gold-dark">Lummina administrative portal</p>
            <p className="mt-1 text-sm text-ink/60">Private executive intelligence and content management</p>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Link to="/" className="text-xs font-extrabold uppercase tracking-[0.12em] text-gold-dark hover:text-bordeaux">View website</Link>
            <div className="h-8 w-px bg-[#5F021F]/10" />
            <div className="relative">
              <button type="button" aria-label="Open notifications" aria-expanded={notificationsOpen} onClick={() => setNotificationsOpen((current) => !current)} className="relative rounded-[2px] border border-[#5F021F]/12 p-2 text-bordeaux hover:border-gold-dark">
                <Bell className="h-4 w-4" />
                <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[0.55rem] font-extrabold text-bordeaux">2</span>
              </button>
              {notificationsOpen && <div className="absolute right-0 top-12 z-50 w-80 rounded-[3px] border border-[#5F021F]/12 bg-[#FFF9EF] p-4 shadow-[0_14px_45px_rgba(95,2,31,0.14)]">
                <div className="flex items-center justify-between"><p className="font-serif text-xl text-bordeaux">Notifications</p><span className="text-[0.65rem] font-extrabold uppercase tracking-[0.1em] text-gold-dark">2 open</span></div>
                <div className="mt-4 space-y-3 text-sm"><p className="border-t border-[#5F021F]/8 pt-3 text-ink/70"><strong className="text-bordeaux">Analytics adapter</strong><br />Connect the production event stream before deployment.</p><p className="border-t border-[#5F021F]/8 pt-3 text-ink/70"><strong className="text-bordeaux">Content review</strong><br />Check draft Insights before publishing.</p></div>
              </div>}
            </div>
            <div className="hidden text-right sm:block"><p className="text-sm font-bold">{user.name}</p><p className="text-xs text-ink/55">{user.email}</p></div>
            <div className="grid h-9 w-9 place-items-center rounded-full bg-bordeaux text-sm font-bold text-gold-bright">FZ</div>
          </div>
        </header>
        <main className="mx-auto max-w-[1480px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10"><Outlet /></main>
      </div>
    </div>
  );
};
