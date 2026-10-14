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

if (location.pathname === "/projects") {
page = <Projects />;
} else if (location.pathname === "/tasks") {
page = <Tasks />;
} else if (location.pathname === "/messages") {
page = <Messages />;
} else if (location.pathname === "/notifications") {
page = <Notifications />;
}
else {
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
