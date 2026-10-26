import { useState } from "react";

function TeamMemberList({
  members,
  selectedMember,
  onSelectMember,
  chats,
  unreadCounts,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="rounded-xl border border-gray-700 bg-gray-800 p-5">
      <h2 className="mb-5 text-xl font-semibold">Team Members</h2>

      {/* Search Member */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search members..."
        className="mb-5 w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-3 text-white outline-none focus:border-violet-500"
      />

      {/* Members List */}
      {filteredMembers.map((member) => {
        const memberMessages = chats[member.id] || [];
        const lastMessage =
          memberMessages.length > 0
            ? memberMessages[memberMessages.length - 1].text
            : "No messages yet";

        return (
          <button
            key={member.id}
            onClick={() => onSelectMember(member)}
            className={`mb-3 w-full rounded-lg p-4 text-left transition ${
              selectedMember.id === member.id
                ? "bg-violet-600"
                : "hover:bg-gray-700"
            }`}
          >
         <div className="flex items-center justify-between gap-3">
  <p className="font-medium">{member.name}</p>

  {unreadCounts[member.id] > 0 && (
    <span className="rounded-full bg-violet-600 px-2 py-1 text-xs">
      {unreadCounts[member.id]}
    </span>
  )}
</div>

            <p className="mt-1 truncate text-sm text-gray-300">
              {lastMessage}
            </p>
          </button>
        );
      })}

      {filteredMembers.length === 0 && (
        <p className="py-4 text-center text-sm text-gray-400">
          No team members found.
        </p>
      )}
    </div>
  );
}

export default TeamMemberList;