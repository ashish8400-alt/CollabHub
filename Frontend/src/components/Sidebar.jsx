import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, FolderKanban, CircleCheckBig, Users, MessageCircle,
  CalendarDays, Bell, Settings, CircleHelp, LogOut, Menu, X, ChevronLeft
} from "lucide-react";
import useAuth from "../context/useAuth";

const primaryItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/projects", label: "Projects", icon: FolderKanban },
  { to: "/tasks", label: "My Tasks", icon: CircleCheckBig },
  { to: "/team-members", label: "Team Members", icon: Users },
  { to: "/messages", label: "Messages", icon: MessageCircle },
  { to: "/calendar", label: "Calendar", icon: CalendarDays },
  { to: "/notifications", label: "Notifications", icon: Bell },
];

function Sidebar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  function handleLogout() {
    if (!window.confirm("Are you sure you want to log out?")) return;
    logout();
    navigate("/", { replace: true });
  }

  const width = collapsed ? "lg:w-20" : "lg:w-64";

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="icon-button fixed left-4 top-4 z-40 lg:hidden" aria-label="Open navigation">
        <Menu className="h-5 w-5" />
      </button>
      {open && <button type="button" aria-label="Close navigation" className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setOpen(false)} />}

      <aside className={`sidebar-shell fixed inset-y-0 left-0 z-50 flex ${width} flex-col overflow-hidden transition-all duration-300 ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="flex h-20 items-center justify-between px-5">
          <NavLink to="/dashboard" className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-sm font-extrabold shadow-lg shadow-violet-600/20">CH</div>
            {!collapsed && <div><p className="text-lg font-bold tracking-tight">CollabHub</p><p className="text-[10px] uppercase tracking-[0.18em] text-gray-500">Workspace</p></div>}
          </NavLink>
          <button type="button" onClick={() => setOpen(false)} className="text-gray-400 lg:hidden"><X className="h-5 w-5" /></button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-3">
          {!collapsed && <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-500">Workspace</p>}
          {primaryItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} onClick={() => setOpen(false)} title={collapsed ? label : undefined} className={({ isActive }) => `group flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium ${isActive ? "nav-active" : "text-gray-400 hover:bg-white/[0.045] hover:text-white"}`}>
              <Icon className="h-[18px] w-[18px] shrink-0" />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}

          {!collapsed && <p className="mb-2 mt-7 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-500">Support</p>}
          {[{ to: "/settings", label: "Settings", icon: Settings }, { to: "/help", label: "Help & Support", icon: CircleHelp }].map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} onClick={() => setOpen(false)} title={collapsed ? label : undefined} className={({ isActive }) => `group flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium ${isActive ? "nav-active" : "text-gray-400 hover:bg-white/[0.045] hover:text-white"}`}>
              <Icon className="h-[18px] w-[18px] shrink-0" />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-gray-800 p-3">
          <NavLink to="/profile" onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-xl p-2 hover:bg-white/[0.035]">
            {user?.profileImage ? <img src={user.profileImage} alt="" className="h-9 w-9 rounded-full object-cover" /> : <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-600/20 text-sm font-bold text-violet-300">{(user?.name || "U").charAt(0).toUpperCase()}</div>}
            {!collapsed && <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{user?.name || "User"}</p><p className="truncate text-xs text-gray-500">{user?.role || "Member"}</p></div>}
          </NavLink>
          <button type="button" onClick={handleLogout} title="Log out" className="mt-2 flex h-10 w-full items-center gap-3 rounded-xl px-3 text-sm text-gray-400 hover:bg-red-500/10 hover:text-red-400">
            <LogOut className="h-[18px] w-[18px]" /> {!collapsed && "Log out"}
          </button>
        </div>
        <button type="button" onClick={() => setCollapsed((value) => !value)} className="absolute -right-3 top-24 hidden h-7 w-7 items-center justify-center rounded-full border border-gray-700 bg-[#151D30] text-gray-400 lg:flex" aria-label="Collapse sidebar">
          <ChevronLeft className={`h-4 w-4 transition ${collapsed ? "rotate-180" : ""}`} />
        </button>
      </aside>
    </>
  );
}

export default Sidebar;
