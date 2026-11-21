import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskDetails from "../components/TaskDetails";
import { getMyProjects, getProject } from "../services/projectService";
import {
  createTask,
  getProjectTasks,
  updateTaskStatus,
  deleteTask,
} from "../services/taskService";
import { useNavigate } from "react-router-dom";

function Tasks() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [members, setMembers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [error, setError] = useState("");

  useEffect(() => {
    getMyProjects()
      .then((data) => {
        setProjects(data.projects || []);
        if (data.projects?.length) setProjectId(data.projects[0]._id);
      })
      .catch((err) => setError(err.response?.data?.message || "Failed to load projects"));
  }, []);

  useEffect(() => {
    if (!projectId) return;
    getProject(projectId)
      .then((data) => setMembers(data.project?.members || []))
      .catch(() => setMembers([]));
    getProjectTasks(projectId)
      .then((data) => setTasks(data.tasks || []))
      .catch((err) => setError(err.response?.data?.message || "Failed to load tasks"));
  }, [projectId]);

  async function handleCreateTask(data) {
    try {
      const result = await createTask(projectId, data);
      setTasks((previous) => [...previous, result.task]);
      setShowForm(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create task");
    }
  }

  async function handleDeleteTask(taskId) {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteTask(taskId);
      setTasks((previous) => previous.filter((task) => task._id !== taskId));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete task");
    }
  }

  async function handleEditTask(task) {
    navigate(`/tasks/${task._id}/edit`);
  }

  async function handleChangeStatus(taskId, status) {
    try {
      const data = await updateTaskStatus(taskId, status);
      setTasks((previous) => previous.map((task) => task._id === taskId ? data.task : task));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update task status");
    }
  }

  const normalizedTasks = tasks.map((task) => ({
    ...task,
    id: task._id,
    name: task.title,
    dueDate: task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 10) : "",
  })).filter((task) => {
    const matchesSearch = task.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Pending" && task.status === "TODO") ||
      (statusFilter === "In Progress" && task.status === "IN PROGRESS") ||
      (statusFilter === "Completed" && task.status === "DONE");
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="mobile-content-padding min-h-full p-6 text-white md:p-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Tasks</h1>
          <p className="mt-2 text-gray-400">Manage your work and track progress.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="rounded-lg bg-violet-600 px-5 py-3 font-semibold">
          {showForm ? "Cancel" : "+ Add Task"}
        </button>
      </div>
      {error && <p className="mb-4 text-red-400">{error}</p>}
      {projects.length > 0 && (
        <select value={projectId} onChange={(e) => setProjectId(e.target.value)} className="mb-6 w-full rounded-lg border border-gray-700 bg-gray-800 p-3">
          {projects.map((project) => <option key={project._id} value={project._id}>{project.name}</option>)}
        </select>
      )}
      {showForm && <TaskForm members={members} onCreateTask={handleCreateTask} onCancel={() => setShowForm(false)} />}
      <div className="mb-6 flex gap-3">
        <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search tasks..." className="flex-1 rounded-lg border border-gray-700 bg-gray-800 p-3" />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-lg border border-gray-700 bg-gray-800 p-3">
          <option>All</option><option>Pending</option><option>In Progress</option><option>Completed</option>
        </select>
      </div>
      {normalizedTasks.length > 0 ? (
        <div className="grid gap-5 xl:grid-cols-3">
          {[
            ["To Do", "TODO", "bg-slate-400"],
            ["In Progress", "IN PROGRESS", "bg-blue-400"],
            ["Completed", "DONE", "bg-emerald-400"],
          ].map(([title, status, dot]) => (
            <section key={status} className="rounded-2xl border border-gray-700/70 bg-[#101729]/70 p-3">
              <div className="mb-3 flex items-center justify-between px-2 py-1">
                <div className="flex items-center gap-2 text-sm font-bold"><span className={`h-2 w-2 rounded-full ${dot}`} />{title}</div>
                <span className="rounded-md bg-white/[0.05] px-2 py-1 text-xs text-gray-400">{normalizedTasks.filter((task) => task.status === status).length}</span>
              </div>
              <div className="space-y-3">
                {normalizedTasks.filter((task) => task.status === status).map((task) => (
                  <article key={task._id} className="rounded-xl border border-gray-700/70 bg-[#151D30] p-4 transition hover:border-violet-500/30">
                    <div className="flex items-start justify-between gap-3"><h2 className="font-semibold">{task.title}</h2><select value={task.status} onChange={(e) => handleChangeStatus(task._id, e.target.value)} className="w-28 rounded-lg border border-gray-700 bg-[#101729] px-2 py-1 text-xs"><option value="TODO">To Do</option><option value="IN PROGRESS">In Progress</option><option value="DONE">Completed</option></select></div>
                    {task.description && <p className="mt-2 line-clamp-2 text-sm leading-5 text-gray-400">{task.description}</p>}
                    <div className="mt-4 flex items-center justify-between border-t border-gray-700/60 pt-3"><p className="text-xs text-gray-500">Due {task.dueDate || "—"}</p><div className="flex gap-1"><button onClick={() => handleEditTask(task)} className="rounded-lg px-2 py-1.5 text-xs text-gray-400 hover:bg-white/[0.05] hover:text-white">Edit</button><button onClick={() => setSelectedTask(task)} className="rounded-lg px-2 py-1.5 text-xs text-violet-400 hover:bg-violet-500/10">Details</button><button onClick={() => handleDeleteTask(task._id)} className="rounded-lg px-2 py-1.5 text-xs text-red-400 hover:bg-red-500/10">Delete</button></div></div>
                  </article>
                ))}
                {normalizedTasks.filter((task) => task.status === status).length === 0 && <div className="rounded-xl border border-dashed border-gray-700 p-6 text-center text-xs text-gray-500">No tasks</div>}
              </div>
            </section>
          ))}
        </div>
      ) : <div className="rounded-2xl border border-dashed border-gray-700 p-12 text-center text-sm text-gray-400">No tasks found.</div>}
      {selectedTask && <TaskDetails task={selectedTask} onClose={() => setSelectedTask(null)} />}
    </div>
  );
}

export default Tasks;
