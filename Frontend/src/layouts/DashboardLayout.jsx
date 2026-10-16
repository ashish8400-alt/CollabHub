// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
// import Dashboard from "../pages/Dashboard";

// function DashboardLayout() {
// return ( <div className="flex min-h-screen bg-gray-900">

//   {/* Left Side */}
//   <Sidebar />

//   {/* Right Side */}
//   <div className="flex-1">

//     {/* Top Navbar */}
//     <Navbar />

//     {/* Main Dashboard */}
//     <Dashboard />

//   </div>

// </div>


// );
// }

// export default DashboardLayout;




import { useLocation } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Dashboard from "../pages/Dashboard";
import Projects from "../pages/Projects";
import Tasks from "../pages/Tasks";
import Messages from "../pages/Messages";
import Notifications from "../pages/Notifications";
import Settings from "../pages/Settings";
import Profile from "../pages/Profile";
import TeamMembers from "../pages/TeamMembers";


function DashboardLayout() {
const location = useLocation();

// let page;

// if (location.pathname === "/projects") {
// page = <Projects />;
// } else if (location.pathname === "/tasks") {
// page = <Tasks />;
// } else {
// page = <Dashboard />;
// }


let page;

// if (location.pathname === "/projects") {
// page = <Projects />;
// } else if (location.pathname === "/tasks") {
// page = <Tasks />;
// } else if (location.pathname === "/messages") {
// page = <Messages />;
// } else if (location.pathname === "/notifications") {
// page = <Notifications />;
// } else if (location.pathname === "/settings") {
// page = <Settings />;
// } else if (location.pathname === "/profile") {
// page = <Profile />;
// } else if (location.pathname === "/team-members") {
// page = <TeamMembers />;
// }

// else {
// page = <Dashboard />;
// }



if (location.pathname === "/team") {
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
} else {
  page = <Dashboard />;
}


return ( <div className="flex min-h-screen bg-gray-900"> <Sidebar />


  <div className="flex-1">
    <Navbar />
    {page}
  </div>
</div>


);
}

export default DashboardLayout;
