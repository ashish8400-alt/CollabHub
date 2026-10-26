import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  let title;

  if (location.pathname === "/") {
    title = "Dashboard";
  } else if (location.pathname === "/projects") {
    title = "Projects";
  } else if (location.pathname === "/tasks") {
    title = "My Tasks";
  } else if (location.pathname === "/messages") {
    title = "Messages";
  } else if (location.pathname === "/notifications") {
    title = "Notifications";
  } else if (location.pathname === "/settings") {
    title = "Settings";
  } else if (location.pathname === "/profile") {
    title = "My Profile";
  } else if (location.pathname === "/team") {
    title = "Team Members";
  } else if (location.pathname === "/calendar") {
    title = "Calendar";
  } else if (location.pathname === "/help") {
    title = "Help & Support";
  } else {
    title = "Dashboard";
  }

  return (
    <div className="flex items-center justify-between border-b border-gray-800 bg-gray-950 px-8 py-4 text-white">

      {/* Left Side of Navbar */}
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>

        <p className="mt-1 text-sm text-gray-400">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5">

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search anything..."
          className="w-64 rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 outline-none focus:border-violet-500"
        />

        {/* Notification Button */}
        <Link
          to="/notifications"
          className="rounded-lg bg-gray-900 p-3 hover:bg-gray-800"
        >
          🔔
        </Link>

        {/* Clickable User Profile */}
        <Link
          to="/profile"
          className="flex items-center gap-3 rounded-lg p-2 hover:bg-gray-800"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 font-bold">
            A
          </div>

          <div>
            <p className="font-semibold">Ashish</p>
            <p className="text-sm text-gray-400">User</p>
          </div>
        </Link>

      </div>
    </div>
  );
}

export default Navbar;