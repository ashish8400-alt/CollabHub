function HelpSearch({ searchTerm, onSearchChange }) {
  return (
    <div className="flex gap-3">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search for help..."
        className="w-full rounded-xl border border-gray-700 bg-gray-900 p-4 text-white outline-none focus:border-violet-500"
      />

      {searchTerm && (
        <button
          type="button"
          onClick={() => onSearchChange("")}
          className="rounded-lg bg-gray-700 px-4 hover:bg-gray-600"
        >
          Clear
        </button>
      )}
    </div>
  );
}

export default HelpSearch;