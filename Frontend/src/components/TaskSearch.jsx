function TaskSearch({ searchTerm, onSearchChange }) {
  return (
    <div className="mb-6">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search tasks by name..."
        className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-violet-500"
      />
    </div>
  );
}

export default TaskSearch;