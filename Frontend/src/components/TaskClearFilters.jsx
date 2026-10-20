function TaskClearFilters({ onClear }) {
  return (
    <div className="mb-6">
      <button
        type="button"
        onClick={onClear}
        className="rounded-lg border border-gray-700 px-4 py-2 text-gray-300 transition hover:bg-gray-800 hover:text-white"
      >
        Clear Filters
      </button>
    </div>
  );
}

export default TaskClearFilters;