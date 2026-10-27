function MessageSearch({ searchTerm, onSearchChange }) {
  return (
    <div className="mb-4 flex gap-3">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search messages..."
        className="min-w-0 flex-1 rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white outline-none focus:border-violet-500"
      />

      {searchTerm !== "" && (
        <button
          type="button"
          onClick={() => onSearchChange("")}
          className="rounded-lg border border-gray-700 px-4 py-3 text-gray-300 hover:bg-gray-700"
        >
          Clear
        </button>
      )}
    </div>
  );
}

export default MessageSearch;