import { useState } from "react";

function TaskForm({ onCreateTask, onCancel }) {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState("Medium");
  const [taskDueDate, setTaskDueDate] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (taskName.trim() === "" || taskDueDate === "") {
      return;
    }

    const newTask = {
      id: Date.now(),
      name: taskName.trim(),
      description: taskDescription.trim(),
      priority: taskPriority,
      dueDate: taskDueDate,
      status: "Pending",
    };

    onCreateTask(newTask);

    setTaskName("");
    setTaskDescription("");
    setTaskPriority("Medium");
    setTaskDueDate("");
  }

  return (
    <div className="mb-8 rounded-xl border border-gray-700 bg-gray-800 p-6">
      <h2 className="mb-5 text-xl font-bold">
        Create New Task
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Task Name */}
        <label className="mb-2 block text-sm text-gray-300">
          Task Name
        </label>

        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Enter task name"
          className="mb-4 w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white outline-none focus:border-violet-500"
          required
        />

        {/* Description */}
        <label className="mb-2 block text-sm text-gray-300">
          Description
        </label>

        <textarea
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Enter task description"
          rows="3"
          className="mb-4 w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white outline-none focus:border-violet-500"
        />

        {/* Priority */}
        <label className="mb-2 block text-sm text-gray-300">
          Priority
        </label>

        <select
          value={taskPriority}
          onChange={(e) => setTaskPriority(e.target.value)}
          className="mb-4 w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white outline-none focus:border-violet-500"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        {/* Due Date */}
        <label className="mb-2 block text-sm text-gray-300">
          Due Date
        </label>

        <input
          type="date"
          value={taskDueDate}
          onChange={(e) => setTaskDueDate(e.target.value)}
          className="mb-5 w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white outline-none focus:border-violet-500"
          required
        />

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded-lg bg-violet-600 px-5 py-3 font-semibold hover:bg-violet-700"
          >
            Create Task
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-600 px-5 py-3 font-semibold hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;