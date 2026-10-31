function ClearDateFilter({ selectedDate, onClear }) {
  if (!selectedDate) return null;

  return (
    <button
      onClick={onClear}
      className="mb-5 w-full rounded-lg border border-gray-700 px-4 py-2 text-gray-300 hover:bg-gray-700"
    >
      Show All Events
    </button>
  );
}

export default ClearDateFilter;