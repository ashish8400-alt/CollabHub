import { useLocation } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Dashboard from "../pages/Dashboard";
import Projects from "../pages/Projects";
import Tasks from "../pages/Tasks";
import Messages from "../pages/Messages";
import Notifications from "../pages/Notifications";
import Settings from "../pages/Settings";
import Profile from "../pages/Profile";
import TeamMembers from "../pages/TeamMembers";
import Calendar from "../pages/Calendar";
import Help from "../pages/Help";
import Admin from "../pages/Admin";

function DashboardLayout() {
  const location = useLocation();

  let page;

  if (location.pathname === "/help") {
    page = <Help />;
  } else if (location.pathname === "/admin") {
    page = <Admin />;
  } else if (location.pathname === "/team") {
    page = <TeamMembers />;
  } else if (location.pathname === "/projects") {
    page = <Projects />;
  } else if (location.pathname === "/tasks") {
    page = <Tasks />;
  } else if (location.pathname === "/messages") {
    page = <Messages />;
  } else if (location.pathname === "/notifications") {
    page = <Notifications />;
  } else if (location.pathname === "/settings") {
    page = <Settings />;
  } else if (location.pathname === "/profile") {
    page = <Profile />;
  } else if (location.pathname === "/calendar") {
    page = <Calendar />;
  } else {
    page = <Dashboard />;
  }

  return (
    <div className="app-shell flex min-h-screen bg-gray-900">
      <Sidebar />

      <div className="app-main flex min-w-0 flex-1 flex-col lg:ml-64">
        <Navbar />

        <main className="app-content page-enter flex-1">
          {page}
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default DashboardLayout;