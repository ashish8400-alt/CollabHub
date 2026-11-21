import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bell, Search, ChevronDown, LogOut } from "lucide-react";
import { useState } from "react";
import useAuth from "../context/useAuth";

const titles = {
  "/": ["Dashboard", "Your workspace overview"], "/projects": ["Projects", "Organize and track work"],
  "/tasks": ["My Tasks", "Your current assignments"], "/team": ["Team Members", "People in your workspace"],
  "/messages": ["Messages", "Team conversations"], "/calendar": ["Calendar", "Schedule and deadlines"],
  "/notifications": ["Notifications", "Updates and activity"], "/settings": ["Settings", "Account preferences"],
  "/profile": ["Profile", "Personal information"], "/help": ["Help & Support", "Guides and resources"],
  "/admin": ["Administration", "Workspace management"],
};

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [title, subtitle] = titles[location.pathname] || titles["/"];

  function handleLogout() {
    if (!window.confirm("Are you sure you want to log out?")) return;
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <header className="topbar-shell sticky top-0 z-30 flex h-20 items-center justify-between px-5 text-white md:px-8">
      <div className="ml-12 min-w-0 lg:ml-0">
        <h1 className="truncate text-lg font-bold tracking-tight md:text-xl">{title}</h1>
        <p className="hidden text-xs text-gray-500 sm:block">{subtitle}</p>
      </div>
      <div className="flex items-center gap-2 md:gap-3">
        <label className="hidden h-10 w-64 items-center gap-2 rounded-xl border border-gray-700 bg-[#101729] px-3 md:flex">
          <Search className="h-4 w-4 text-gray-500" />
          <input className="keep min-w-0 flex-1 border-0 bg-transparent text-sm outline-none placeholder:text-gray-500" placeholder="Search workspace..." />
          <kbd className="rounded border border-gray-700 px-1.5 py-0.5 text-[10px] text-gray-500">⌘K</kbd>
        </label>
        <Link to="/notifications" className="icon-button relative" aria-label="Notifications">
          <Bell className="h-[18px] w-[18px]" />
          <span className="status-dot absolute right-2 top-2 h-2 w-2 rounded-full bg-violet-500"></span>
        </Link>
        <div className="relative">
          <button type="button" onClick={() => setMenuOpen((value) => !value)} className="flex items-center gap-2 rounded-xl p-1.5 hover:bg-white/[0.04]">
            {user?.profileImage ? <img src={user.profileImage} alt="" className="h-9 w-9 rounded-full object-cover" /> : <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-600 text-sm font-bold">{(user?.name || "U").charAt(0).toUpperCase()}</div>}
            <div className="hidden text-left xl:block"><p className="max-w-28 truncate text-sm font-semibold">{user?.name || "User"}</p><p className="text-[11px] text-gray-500">{user?.role || "Member"}</p></div>
            <ChevronDown className="hidden h-4 w-4 text-gray-500 xl:block" />
          </button>
          {menuOpen && <div className="absolute right-0 mt-2 w-48 rounded-xl border border-gray-700 bg-[#151D30] p-2 shadow-2xl"><Link to="/profile" onClick={() => setMenuOpen(false)} className="block rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/[0.05]">View profile</Link><Link to="/settings" onClick={() => setMenuOpen(false)} className="block rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/[0.05]">Settings</Link><button type="button" onClick={handleLogout} className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-red-500/10"><LogOut className="h-4 w-4" /> Log out</button></div>}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
