import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { DaemonPill } from './DaemonPill';
import { useDaemon } from '../context/DaemonContext';
import { 
  FolderGit2, 
  Layers, 
  Users, 
  Cpu, 
  ShieldCheck, 
  Compass,
  Monitor
} from 'lucide-react';

export const Layout: React.FC = () => {
  const { currentAccount } = useDaemon();
  const location = useLocation();
  const isWorkbench = location.pathname.startsWith('/workbench');

  // If in immersive workbench mode, workbench renders its own chrome / full canvas host
  if (isWorkbench) {
    return <Outlet />;
  }

  const navItems = [
    { to: '/', label: 'Home', icon: Compass },
    { to: '/projects', label: 'Projects', icon: FolderGit2 },
    { to: '/workbench', label: 'Workbench', icon: Layers },
    { to: '/designers', label: 'Designers', icon: Users },
    { to: '/skills', label: 'Skills', icon: Cpu },
    { to: '/account', label: 'Account', icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-black text-neutral-200 flex flex-col font-sans selection:bg-rose-600 selection:text-white">
      {/* Top Header */}
      <header className="h-14 border-b border-neutral-800/80 px-4 sm:px-6 flex items-center justify-between bg-neutral-950/80 backdrop-blur sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <NavLink to="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded bg-rose-600/10 border border-rose-500/30 flex items-center justify-center text-rose-500 font-bold text-sm tracking-wider group-hover:border-rose-500 transition-colors">
              <Monitor className="w-4 h-4 text-rose-500" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight text-white flex items-center gap-2">
                AIOS Designer
                <span className="px-1.5 py-0.2 text-[10px] uppercase font-mono tracking-widest bg-neutral-800 text-neutral-400 rounded">
                  MVP
                </span>
              </span>
            </div>
          </NavLink>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-neutral-800 text-white shadow-inner font-semibold'
                        : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                    }`
                  }
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <DaemonPill />

          {currentAccount && (
            <NavLink
              to="/account"
              className="hidden sm:flex items-center gap-2 text-xs border border-neutral-800 hover:border-neutral-700 bg-neutral-900/60 px-2.5 py-1 rounded transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-neutral-300 font-mono text-[11px] truncate max-w-[120px]">
                {currentAccount.name}
              </span>
              <span className="text-[10px] uppercase font-mono px-1 rounded bg-neutral-800 text-neutral-400">
                {currentAccount.role}
              </span>
            </NavLink>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-900 py-4 px-6 text-xs text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span>AIOS Designer v0.1.0</span>
          <span>•</span>
          <span className="text-neutral-400">Monochrome Industrial UI</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span>Role Rule: Owner = Account | Designer ≠ Owner</span>
          <span>•</span>
          <span>Skills bind to Designers only</span>
        </div>
      </footer>
    </div>
  );
};
