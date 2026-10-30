function EventSearch({ searchTerm, onSearchChange }) {
  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search events..."
        className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white outline-none focus:border-violet-500"
      />
    </div>
  );
}

export default EventSearch;