import { useEffect, useState } from "react";
import { ArrowUpRight, FolderKanban, CircleCheckBig, Clock3, ListTodo, CalendarDays, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getDashboard } from "../services/dashboardService";
import useAuth from "../context/useAuth";

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    getDashboard()
      .then((result) => setData(result))
      .catch((err) => setError(err.response?.data?.message || "Failed to load dashboard"))
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { label: "Total Projects", value: data?.totalProjects ?? 0, icon: FolderKanban, tone: "text-violet-300", bg: "bg-violet-500/10" },
    { label: "Total Tasks", value: data?.totalTasks ?? 0, icon: ListTodo, tone: "text-blue-300", bg: "bg-blue-500/10" },
    { label: "Completed", value: data?.completedTasks ?? 0, icon: CircleCheckBig, tone: "text-emerald-300", bg: "bg-emerald-500/10" },
    { label: "In Progress", value: data?.inProgressTasks ?? 0, icon: Clock3, tone: "text-amber-300", bg: "bg-amber-500/10" },
  ];

  const recentProjects = data?.recentProjects || data?.projects || [];
  const upcoming = data?.upcomingDeadlines || [];

  return (
    <div className="mobile-content-padding min-h-full p-6 md:p-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-violet-400">Workspace</p>
          <h1 className="text-2xl font-bold tracking-tight md:text-[30px]">Good Morning, {user?.name?.split(" ")[0] || "Ashish"}!</h1>
          <p className="mt-2 text-sm text-gray-400">Here's what's happening with your workspace today.</p>
        </div>
        <Link to="/projects" className="primary-button flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-semibold"><span>New project</span><ArrowUpRight className="h-4 w-4" /></Link>
      </div>

      {error && <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div>}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ label, value, icon: Icon, tone, bg }) => (
          <div key={label} className="workspace-card p-5 transition duration-200">
            {loading ? <div className="skeleton h-24 rounded-xl" /> : <>
              <div className="flex items-start justify-between"><div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg} ${tone}`}><Icon className="h-[19px] w-[19px]" /></div><ArrowUpRight className="h-4 w-4 text-gray-600" /></div>
              <p className="mt-5 text-3xl font-bold tracking-tight">{value}</p>
              <p className="mt-1 text-sm text-gray-400">{label}</p>
            </>}
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(280px,.75fr)]">
        <section className="workspace-card p-5 md:p-6">
          <div className="mb-5 flex items-center justify-between"><div><h2 className="font-bold">Project Overview</h2><p className="mt-1 text-xs text-gray-500">Recently active projects</p></div><Link to="/projects" className="flex items-center gap-1 text-xs font-semibold text-violet-400 hover:text-violet-300">View all <ArrowRight className="h-3.5 w-3.5" /></Link></div>
          {loading ? <div className="space-y-3">{[1,2,3].map((item) => <div key={item} className="skeleton h-20 rounded-xl" />)}</div> : recentProjects.length ? (
            <div className="grid gap-3 md:grid-cols-2">
              {recentProjects.slice(0, 4).map((project, index) => (
                <Link key={project._id || project.id || index} to="/projects" className="rounded-xl border border-gray-700/70 bg-[#101729] p-4 hover:border-violet-500/30">
                  <div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="truncate font-semibold">{project.name || project.title || "Untitled project"}</p><p className="mt-1 line-clamp-1 text-xs text-gray-500">{project.description || "No description"}</p></div><span className="shrink-0 rounded-full bg-violet-500/10 px-2 py-1 text-[10px] font-semibold text-violet-300">{project.status || "Active"}</span></div>
                  <div className="mt-5 flex items-center gap-3"><div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-700"><div className="h-full rounded-full bg-violet-500" style={{ width: `${Math.min(project.progress || 0, 100)}%` }} /></div><span className="text-xs text-gray-400">{project.progress || 0}%</span></div>
                </Link>
              ))}
            </div>
          ) : <div className="flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed border-gray-700 text-center"><FolderKanban className="mb-3 h-7 w-7 text-gray-600" /><p className="text-sm text-gray-400">No projects yet</p><Link to="/projects" className="mt-2 text-xs font-semibold text-violet-400">Create your first project</Link></div>}
        </section>

        <section className="workspace-card p-5 md:p-6">
          <div className="mb-5 flex items-center justify-between"><div><h2 className="font-bold">Upcoming Deadlines</h2><p className="mt-1 text-xs text-gray-500">Next in line</p></div><CalendarDays className="h-5 w-5 text-gray-500" /></div>
          {loading ? <div className="space-y-3">{[1,2,3].map((item) => <div key={item} className="skeleton h-16 rounded-xl" />)}</div> : upcoming.length ? (
            <div className="space-y-2">
              {upcoming.slice(0, 5).map((task, index) => (
                <Link key={task.id || task._id || index} to="/tasks" className="flex items-center gap-3 rounded-xl p-2.5 hover:bg-white/[0.035]">
                  <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl border border-gray-700 bg-[#101729]"><span className="text-sm font-bold">{task.dueDate ? new Date(task.dueDate).getDate() : "—"}</span><span className="text-[9px] uppercase text-gray-500">{task.dueDate ? new Date(task.dueDate).toLocaleDateString("en-US", { month: "short" }) : "Due"}</span></div>
                  <div className="min-w-0"><p className="truncate text-sm font-semibold">{task.title || "Untitled task"}</p><p className="mt-1 text-xs text-gray-500">{task.status || "Pending"}</p></div>
                </Link>
              ))}
            </div>
          ) : <div className="flex min-h-40 flex-col items-center justify-center text-center"><CircleCheckBig className="mb-3 h-7 w-7 text-gray-600" /><p className="text-sm text-gray-400">No deadlines ahead</p></div>}
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
