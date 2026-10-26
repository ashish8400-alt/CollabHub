function TaskDetails({ task, onClose }) {
  if (!task) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-lg rounded-xl border border-gray-700 bg-gray-800 p-6 text-white">

        {/* Heading */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Task Details
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-gray-400 hover:bg-gray-700 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Task Name */}
        <h3 className="mb-2 text-xl font-semibold">
          {task.name}
        </h3>

        {/* Description */}
        <p className="mb-6 text-gray-400">
          {task.description || "No description available."}
        </p>

        {/* Priority */}
        <div className="mb-4 flex justify-between">
          <span className="text-gray-400">Priority</span>
          <span>{task.priority}</span>
        </div>

        {/* Status */}
        <div className="mb-4 flex justify-between">
          <span className="text-gray-400">Status</span>
          <span>{task.status}</span>
        </div>

        {/* Due Date */}
        <div className="mb-6 flex justify-between gap-4">
          <span className="text-gray-400">Due Date</span>

          <span>
            {new Date(task.dueDate + "T00:00:00").toLocaleDateString(
              "en-GB",
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            )}
          </span>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full rounded-lg bg-violet-600 py-3 font-semibold hover:bg-violet-700"
        >
          Close
        </button>

      </div>
    </div>
  );
}

export default TaskDetails;