function TaskFilter({ statusFilter, onStatusChange }) {
  return (
    <div className="mb-6">
      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-violet-500"
      >
        <option value="All">All Tasks</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
}

export default TaskFilter;