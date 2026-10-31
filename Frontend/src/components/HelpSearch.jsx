function HelpSearch({ searchTerm, onSearchChange }) {
  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder="Search for help..."
      className="w-full rounded-xl border border-gray-700 bg-gray-900 p-4 text-white outline-none focus:border-violet-500"
    />
  );
}

export default HelpSearch;