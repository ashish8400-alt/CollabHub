import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, CircleCheckBig } from "lucide-react";
import { getTask, updateTask, updateTaskStatus } from "../services/taskService";

function TaskEdit() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("TODO");
  const [originalStatus, setOriginalStatus] = useState("TODO");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    getTask(taskId)
      .then((data) => {
        const task = data.task || data.data || data;
        setTitle(task.title || "");
        setDescription(task.description || "");
        setDueDate(task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 10) : "");
        setStatus(task.status || "TODO");
        setOriginalStatus(task.status || "TODO");
      })
      .catch((err) => setError(err.response?.data?.message || "Failed to load task"))
      .finally(() => setLoading(false));
  }, [taskId]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return setError("Task title is required.");
    setSaving(true);
    setError("");
    try {
      await updateTask(taskId, { title: title.trim(), description: description.trim(), dueDate: dueDate || undefined });
      if (status !== originalStatus) await updateTaskStatus(taskId, status);
      setSuccess("Task updated successfully.");
      setTimeout(() => navigate("/tasks", { replace: true }), 650);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update task");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mobile-content-padding min-h-full p-6 text-white md:p-8">
      <button type="button" onClick={() => navigate("/tasks")} className="mb-6 flex items-center gap-2 text-sm text-gray-400 hover:text-white"><ArrowLeft className="h-4 w-4" />Back to tasks</button>
      <div className="mx-auto max-w-3xl">
        <div className="mb-6"><p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-400">Task settings</p><h1 className="mt-2 text-3xl font-bold">Edit task</h1></div>
        {loading ? <div className="workspace-card p-8"><div className="skeleton h-12 w-full rounded-xl" /><div className="mt-4 skeleton h-32 w-full rounded-xl" /></div> : (
          <form onSubmit={handleSubmit} className="workspace-card p-6 md:p-8">
            {error && <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div>}
            {success && <div className="mb-5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">{success}</div>}
            <div className="mb-6 flex items-center gap-4 border-b border-gray-700/60 pb-6"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300"><CircleCheckBig className="h-5 w-5" /></div><div><p className="font-semibold">Task details</p><p className="mt-1 text-xs text-gray-500">Keep the work clear and easy to prioritize.</p></div></div>
            <label className="block text-sm font-semibold text-gray-300">Task title</label><input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-2 w-full rounded-xl border border-gray-700 bg-[#101729] px-4 py-3 outline-none" required />
            <label className="mt-5 block text-sm font-semibold text-gray-300">Description</label><textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="5" className="mt-2 w-full resize-none rounded-xl border border-gray-700 bg-[#101729] px-4 py-3 outline-none" />
            <div className="mt-5 grid gap-5 sm:grid-cols-2"><div><label className="block text-sm font-semibold text-gray-300">Due date</label><input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="mt-2 w-full rounded-xl border border-gray-700 bg-[#101729] px-4 py-3 outline-none" /></div><div><label className="block text-sm font-semibold text-gray-300">Status</label><select value={status} onChange={(e) => setStatus(e.target.value)} className="mt-2 w-full rounded-xl border border-gray-700 bg-[#101729] px-4 py-3 outline-none"><option value="TODO">To Do</option><option value="IN PROGRESS">In Progress</option><option value="DONE">Completed</option></select></div></div>
            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-700/60 pt-6 sm:flex-row sm:justify-end"><button type="button" onClick={() => navigate("/tasks")} className="rounded-xl border border-gray-700 px-5 py-3 text-sm font-semibold hover:bg-white/[0.04]">Cancel</button><button type="submit" disabled={saving} className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold disabled:opacity-60"><Save className="h-4 w-4" />{saving ? "Saving..." : "Save changes"}</button></div>
          </form>
        )}
      </div>
    </div>
  );
}

export default TaskEdit;
