import { useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskSearch from "../components/TaskSearch";
import TaskFilter from "../components/TaskFilter";
import TaskSort from "../components/TaskSort";
import TaskSummary from "../components/TaskSummary";
import TaskClearFilters from "../components/TaskClearFilters";
import TaskPriorityFilter from "../components/TaskPriorityFilter";


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
const [searchTerm, setSearchTerm] = useState("");
const [statusFilter, setStatusFilter] = useState("All");
const [sortBy, setSortBy] = useState("default");
const [priorityFilter, setPriorityFilter] = useState("All");



function handleCreateTask(newTask) {
  setTasks((previousTasks) => [...previousTasks, newTask]);
  setShowForm(false);
}


function handleDeleteTask(id) {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this task?"
  );

  if (confirmDelete) {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    );
  }
}


// Edit Task
function handleEditTask(task) {

  const newName = window.prompt("Enter task name:", task.name);

  if (newName === null || newName.trim() === "") {
    return;
  }

  const newDescription = window.prompt(
    "Enter task description:",
    task.description
  );

  if (newDescription === null) {
    return;
  }

  const newPriority = window.prompt(
    "Enter priority: High, Medium, Low",
    task.priority
  );

  if (newPriority === null) {
    return;
  }

  const validPriorities = ["High", "Medium", "Low"];

  if (!validPriorities.includes(newPriority.trim())) {
    alert("Please enter High, Medium, or Low.");
    return;
  }

  const newDueDate = window.prompt(
    "Enter due date (YYYY-MM-DD):",
    task.dueDate
  );

  if (newDueDate === null || newDueDate.trim() === "") {
    return;
  }

  setTasks((previousTasks) =>
    previousTasks.map((item) =>
      item.id === task.id
        ? {
            ...item,
            name: newName.trim(),
            description: newDescription.trim(),
            priority: newPriority.trim(),
            dueDate: newDueDate.trim(),
          }
        : item
    )
  );
}


// Change Task Status
function handleChangeTaskStatus(id, newStatus) {
  setTasks((previousTasks) =>
    previousTasks.map((task) =>
      task.id === id
        ? { ...task, status: newStatus }
        : task
    )
  );
}

const filteredTasks = tasks.filter((task) => {
  const matchesSearch = task.name
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  const matchesStatus =
    statusFilter === "All" || task.status === statusFilter;

  const matchesPriority =
    priorityFilter === "All" || task.priority === priorityFilter;

  return matchesSearch && matchesStatus && matchesPriority;
});


const sortedTasks = [...filteredTasks].sort((a, b) => {
  if (sortBy === "due-soon") {
    return a.dueDate.localeCompare(b.dueDate);
  }

  if (sortBy === "due-late") {
    return b.dueDate.localeCompare(a.dueDate);
  }

  if (sortBy === "priority") {
    const priorityOrder = {
      High: 1,
      Medium: 2,
      Low: 3,
    };

    return priorityOrder[a.priority] - priorityOrder[b.priority];
  }

  return 0;
});


return ( <div className="min-h-screen bg-gray-900 p-8 text-white">

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


{/* Task Summary Cards */}
<TaskSummary tasks={tasks} />



{/* Task Form */}
{showForm && (
  <TaskForm
    onCreateTask={handleCreateTask}
    onCancel={() => setShowForm(false)}
  />
)}



<TaskSearch
  searchTerm={searchTerm}
  onSearchChange={setSearchTerm}
/>

<TaskFilter
  statusFilter={statusFilter}
  onStatusChange={setStatusFilter}
/>


<TaskPriorityFilter
  priorityFilter={priorityFilter}
  onPriorityChange={setPriorityFilter}
/>


<TaskSort
  sortBy={sortBy}
  onSortChange={setSortBy}
/>

<TaskClearFilters
  onClear={() => {
    setSearchTerm("");
    setStatusFilter("All");
    setSortBy("default");
    setPriorityFilter("All");
  }}
/>



  {/* Task Cards */}
{sortedTasks.map((task) => (
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


      <select
  value={task.status}
  onChange={(e) =>
    handleChangeTaskStatus(task.id, e.target.value)
  }
  className={`rounded-lg px-3 py-2 text-sm outline-none ${
    task.status === "In Progress"
      ? "bg-blue-500/10 text-blue-400"
      : task.status === "Pending"
      ? "bg-yellow-500/10 text-yellow-400"
      : "bg-green-500/10 text-green-400"
  }`}
>
  <option value="Pending">Pending</option>
  <option value="In Progress">In Progress</option>
  <option value="Completed">Completed</option>
</select>


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

<button
  onClick={() => handleEditTask(task)}
  className="rounded-lg bg-amber-600 px-3 py-2 text-sm text-white hover:bg-amber-700"
>
  Edit
</button>



<button
  onClick={() => handleDeleteTask(task.id)}
  className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
>
  Delete
</button>

    </div>

  </div>
))}

</div>

);
}

export default Tasks;
