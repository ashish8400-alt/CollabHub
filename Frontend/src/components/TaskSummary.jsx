function TaskSummary({ tasks }) {
  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  return (
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

      {/* Total Tasks */}
      <div className="rounded-xl border border-gray-700 bg-gray-800 p-5">
        <p className="text-sm text-gray-400">Total Tasks</p>
        <h2 className="mt-2 text-3xl font-bold">{totalTasks}</h2>
      </div>

      {/* Pending Tasks */}
      <div className="rounded-xl border border-gray-700 bg-gray-800 p-5">
        <p className="text-sm text-gray-400">Pending</p>
        <h2 className="mt-2 text-3xl font-bold text-yellow-400">
          {pendingTasks}
        </h2>
      </div>

      {/* In Progress Tasks */}
      <div className="rounded-xl border border-gray-700 bg-gray-800 p-5">
        <p className="text-sm text-gray-400">In Progress</p>
        <h2 className="mt-2 text-3xl font-bold text-blue-400">
          {inProgressTasks}
        </h2>
      </div>

      {/* Completed Tasks */}
      <div className="rounded-xl border border-gray-700 bg-gray-800 p-5">
        <p className="text-sm text-gray-400">Completed</p>
        <h2 className="mt-2 text-3xl font-bold text-green-400">
          {completedTasks}
        </h2>
      </div>

    </div>
  );
}

export default TaskSummary;