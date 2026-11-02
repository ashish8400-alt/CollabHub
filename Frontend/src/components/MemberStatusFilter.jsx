function MemberStatusFilter({ statusFilter, onStatusChange }) {
  return (
    <select
      value={statusFilter}
      onChange={(e) => onStatusChange(e.target.value)}
      className="rounded-xl border border-gray-700 bg-gray-800 p-3 text-gray-300 outline-none"
    >
      <option value="All">All Status</option>
      <option value="Online">Online</option>
      <option value="Away">Away</option>
      <option value="Inactive">Inactive</option>
    </select>
  );
}

export default MemberStatusFilter;