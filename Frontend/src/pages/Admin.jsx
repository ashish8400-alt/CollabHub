import { useEffect, useState } from "react";
import { getAdminDashboard } from "../services/adminService";

function Admin() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getAdminDashboard()
      .then(setData)
      .catch((err) => setError(err.response?.data?.message || "Failed to load admin dashboard"));
  }, []);

  const cards = [
    ["Users", data?.totalUsers],
    ["Projects", data?.totalProjects],
    ["Tasks", data?.totalTasks],
    ["Completed Tasks", data?.completedTasks],
  ];

  return (
    <div className="mobile-content-padding min-h-full p-6 text-white md:p-8">
      <h1 className="mb-8 text-3xl font-bold">Admin Dashboard</h1>
      {error && <p className="mb-6 text-red-400">{error}</p>}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map(([label, value]) => (
          <div key={label} className="rounded-xl border border-gray-800 bg-gray-950 p-6">
            <p className="text-gray-400">{label}</p><h2 className="mt-3 text-3xl font-bold">{value ?? 0}</h2>
          </div>
        ))}
      </div>
      <div className="mt-8 rounded-xl border border-gray-800 bg-gray-950 p-6">
        <h2 className="mb-4 text-xl font-bold">Recent Users</h2>
        {(data?.recentUsers || []).map((item) => (
          <div key={item._id} className="flex justify-between border-b border-gray-800 py-3 last:border-0">
            <div><p>{item.name}</p><p className="text-sm text-gray-400">{item.email}</p></div><span className="text-violet-400">{item.role}</span>
          </div>
        ))}
        {(data?.recentUsers || []).length === 0 && <p className="text-gray-400">No recent users.</p>}
      </div>
    </div>
  );
}

export default Admin;
