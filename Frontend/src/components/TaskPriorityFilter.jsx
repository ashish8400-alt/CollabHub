function TaskPriorityFilter({ priorityFilter, onPriorityChange }) {
  return (
    <div className="mb-6">
      <select
        value={priorityFilter}
        onChange={(e) => onPriorityChange(e.target.value)}
        className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-violet-500"
      >
        <option value="All">All Priorities</option>
        <option value="High">High Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="Low">Low Priority</option>
      </select>
    </div>
  );
}

export default TaskPriorityFilter;