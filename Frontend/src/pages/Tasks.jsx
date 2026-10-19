import { useState } from "react";
import TaskForm from "../components/TaskForm";


function Tasks() {


  const [tasks, setTasks] = useState([
  {
    id: 1,
    name: "Create Homepage Design",
    description: "Design the homepage for the CollabHub application.",
    priority: "High",
    dueDate: "2026-10-20",
    status: "In Progress",
  },
  {
    id: 2,
    name: "Connect Backend API",
    description: "Connect the frontend with the backend server.",
    priority: "Medium",
    dueDate: "2026-10-22",
    status: "Pending",
  },
  {
    id: 3,
    name: "Build Login Page",
    description: "Create a login page for registered users.",
    priority: "Low",
    dueDate: "2026-10-18",
    status: "Completed",
  },
]);

const [showForm, setShowForm] = useState(false);

function handleCreateTask(newTask) {
  setTasks((previousTasks) => [...previousTasks, newTask]);
  setShowForm(false);
}

return ( <div className="min-h-screen bg-gray-900 p-8 text-white">

  {/* Page Heading */}
  {/* Page Heading */}
<div className="mb-8 flex flex-wrap items-center justify-between gap-4">
  <div>
    <h1 className="text-3xl font-bold">My Tasks</h1>

    <p className="mt-2 text-gray-400">
      Manage your work and track your progress.
    </p>
  </div>

  <button
    onClick={() => setShowForm(!showForm)}
    className="rounded-lg bg-violet-600 px-5 py-3 font-semibold hover:bg-violet-700"
  >
    {showForm ? "Cancel" : "+ Add Task"}
  </button>
</div>


  {/* Task 1 */}
  {/* <div className="mb-5 rounded-xl border border-gray-800 bg-gray-950 p-6">

    <div className="flex items-center justify-between">

      <div>
        <h2 className="text-xl font-bold">
          Create Homepage Design
        </h2>

        <p className="mt-2 text-gray-400">
          Design the homepage for the CollabHub application.
        </p>
      </div>

      <span className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
        High Priority
      </span>

    </div>

    <div className="mt-5 flex items-center justify-between border-t border-gray-800 pt-4">

      <p className="text-sm text-gray-400">
        Due Date: 20 October 2026
      </p>

      <span className="rounded-lg bg-blue-500/10 px-3 py-2 text-sm text-blue-400">
        In Progress
      </span>

    </div>

  </div> */}


  {/* Task 2 */}
  {/* <div className="mb-5 rounded-xl border border-gray-800 bg-gray-950 p-6">

    <div className="flex items-center justify-between">

      <div>
        <h2 className="text-xl font-bold">
          Connect Backend API
        </h2>

        <p className="mt-2 text-gray-400">
          Connect the frontend with the backend server.
        </p>
      </div>

      <span className="rounded-lg bg-yellow-500/10 px-3 py-2 text-sm text-yellow-400">
        Medium Priority
      </span>

    </div>

    <div className="mt-5 flex items-center justify-between border-t border-gray-800 pt-4">

      <p className="text-sm text-gray-400">
        Due Date: 22 October 2026
      </p>

      <span className="rounded-lg bg-yellow-500/10 px-3 py-2 text-sm text-yellow-400">
        Pending
      </span>

    </div>

  </div> */}


  {/* Task 3 */}
  {/* <div className="mb-5 rounded-xl border border-gray-800 bg-gray-950 p-6">

    <div className="flex items-center justify-between">

      <div>
        <h2 className="text-xl font-bold">
          Build Login Page
        </h2>

        <p className="mt-2 text-gray-400">
          Create a login page for registered users.
        </p>
      </div>

      <span className="rounded-lg bg-green-500/10 px-3 py-2 text-sm text-green-400">
        Low Priority
      </span>

    </div>

    <div className="mt-5 flex items-center justify-between border-t border-gray-800 pt-4">

      <p className="text-sm text-gray-400">
        Due Date: 18 October 2026
      </p>

      <span className="rounded-lg bg-green-500/10 px-3 py-2 text-sm text-green-400">
        Completed
      </span>

    </div>

  </div> */}


{/* Task Form */}
{showForm && (
  <TaskForm
    onCreateTask={handleCreateTask}
    onCancel={() => setShowForm(false)}
  />
)}

  {/* Task Cards */}
{tasks.map((task) => (
  <div
    key={task.id}
    className="mb-5 rounded-xl border border-gray-800 bg-gray-950 p-6"
  >
    {/* Task Name and Priority */}
    <div className="flex items-center justify-between gap-4">

      <div>
        <h2 className="text-xl font-bold">
          {task.name}
        </h2>

        <p className="mt-2 text-gray-400">
          {task.description}
        </p>
      </div>

      <span
        className={`rounded-lg px-3 py-2 text-sm ${
          task.priority === "High"
            ? "bg-red-500/10 text-red-400"
            : task.priority === "Medium"
            ? "bg-yellow-500/10 text-yellow-400"
            : "bg-green-500/10 text-green-400"
        }`}
      >
        {task.priority} Priority
      </span>

    </div>

    {/* Due Date and Status */}
    <div className="mt-5 flex items-center justify-between gap-4 border-t border-gray-800 pt-4">

      <p className="text-sm text-gray-400">
        Due Date:{" "}
        {new Date(task.dueDate + "T00:00:00").toLocaleDateString(
          "en-GB",
          {
            day: "numeric",
            month: "long",
            year: "numeric",
          }
        )}
      </p>

      <span
        className={`rounded-lg px-3 py-2 text-sm ${
          task.status === "In Progress"
            ? "bg-blue-500/10 text-blue-400"
            : task.status === "Pending"
            ? "bg-yellow-500/10 text-yellow-400"
            : "bg-green-500/10 text-green-400"
        }`}
      >
        {task.status}
      </span>

    </div>

  </div>
))}

</div>

);
}

export default Tasks;
