function MemberClearFilters({ onClear }) {
  return (
    <button
      onClick={onClear}
      className="rounded-lg border border-gray-700 px-4 py-3 text-gray-300 hover:bg-gray-700"
    >
      Clear Filters
    </button>
  );
}

export default MemberClearFilters;