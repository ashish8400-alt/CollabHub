import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Dashboard from "../pages/Dashboard";

function DashboardLayout() {
return ( <div className="flex min-h-screen bg-gray-900">

  {/* Left Side */}
  <Sidebar />

  {/* Right Side */}
  <div className="flex-1">

    {/* Top Navbar */}
    <Navbar />

    {/* Main Dashboard */}
    <Dashboard />

  </div>

</div>


);
}

export default DashboardLayout;
