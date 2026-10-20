function TaskSort({ sortBy, onSortChange }) {
  return (
    <div className="mb-6">
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-violet-500"
      >
        <option value="default">Default Order</option>
        <option value="due-soon">Due Date: Earliest First</option>
        <option value="due-late">Due Date: Latest First</option>
        <option value="priority">Priority: High to Low</option>
      </select>
    </div>
  );
}

export default TaskSort;