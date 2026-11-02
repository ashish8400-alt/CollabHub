import { useState } from "react";
import InviteMemberForm from "../components/InviteMemberForm";

function TeamMembers() {
  const [showForm, setShowForm] = useState(false);


  const [members, setMembers] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@example.com",
      role: "Member",
      designation: "Frontend Developer",
      status: "Online",
    },
    {
      id: 2,
      name: "Priya Singh",
      email: "priya@example.com",
      role: "Member",
      designation: "UI/UX Designer",
      status: "Online",
    },
    {
      id: 3,
      name: "Aman Verma",
      email: "aman@example.com",
      role: "Member",
      designation: "Backend Developer",
      status: "Away",
    },
  ]);

const [searchTerm, setSearchTerm] = useState("");
const [roleFilter, setRoleFilter] = useState("All");

  // Add Member
  function handleAddMember(newMember) {
    setMembers((previousMembers) => [
      ...previousMembers,
      newMember,
    ]);

    setShowForm(false);
  }

  const filteredMembers = members.filter((member) => {
  const matchesSearch =
    (member.name + " " + member.email)
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

  const matchesRole =
    roleFilter === "All" || member.role === roleFilter;

  return matchesSearch && matchesRole;
});



  const onlineMembers = members.filter(
    (member) => member.status === "Online"
  ).length;

  const adminMembers = members.filter(
    (member) => member.role === "Admin"
  ).length;

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white md:p-8">

      {/* Page Heading */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            Team Members
          </h1>

          <p className="mt-2 text-gray-400">
            Meet your team and manage your workspace members.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-xl bg-violet-600 px-5 py-3 font-semibold transition hover:bg-violet-700"
        >
          {showForm ? "Cancel" : "+ Invite Member"}
        </button>
      </div>

      {/* Invite Member Form */}
      {showForm && (
        <InviteMemberForm
          onAddMember={handleAddMember}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Team Statistics */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

        <div className="rounded-xl border border-gray-700 bg-gray-800 p-5">
          <p className="text-sm text-gray-400">Total Members</p>
          <h2 className="mt-2 text-3xl font-bold">
            {members.length}
          </h2>
          <p className="mt-2 text-sm text-violet-400">
            Team workspace
          </p>
        </div>

        <div className="rounded-xl border border-gray-700 bg-gray-800 p-5">
          <p className="text-sm text-gray-400">Online Members</p>
          <h2 className="mt-2 text-3xl font-bold">
            {onlineMembers}
          </h2>
          <p className="mt-2 text-sm text-green-400">
            ● Currently active
          </p>
        </div>

        <div className="rounded-xl border border-gray-700 bg-gray-800 p-5">
          <p className="text-sm text-gray-400">Team Admins</p>
          <h2 className="mt-2 text-3xl font-bold">
            {adminMembers}
          </h2>
          <p className="mt-2 text-sm text-blue-400">
            Workspace management
          </p>
        </div>

      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <input
  type="text"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  placeholder="Search members by name or email..."
  className="w-full rounded-xl border border-gray-700 bg-gray-800 p-3 outline-none transition focus:border-violet-500 sm:max-w-md"
/>

       <select
  value={roleFilter}
  onChange={(e) => setRoleFilter(e.target.value)}
  className="rounded-xl border border-gray-700 bg-gray-800 p-3 text-gray-300 outline-none"
>
  <option value="All">All Members</option>
  <option value="Admin">Admins</option>
  <option value="Member">Members</option>
</select>
      </div>

      {/* Members Heading */}
      <div className="mb-5">
        <h2 className="text-xl font-bold">
          All Team Members
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          People working together in your workspace
        </p>
      </div>

      {/* Member Cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="rounded-2xl border border-gray-700 bg-gray-800 p-6 transition hover:-translate-y-1 hover:border-violet-500"
          >

            <div className="mb-5 flex items-start justify-between gap-3">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 text-2xl font-bold">
                  {member.name.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h3 className="font-bold">
                    {member.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-400">
                    {member.designation}
                  </p>
                </div>

              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs ${
                  member.status === "Online"
                    ? "bg-green-900/50 text-green-400"
                    : "bg-yellow-900/50 text-yellow-400"
                }`}
              >
                {member.status}
              </span>

            </div>

            <div className="mb-5 border-t border-gray-700 pt-4">
              <p className="text-sm text-gray-400">
                Email Address
              </p>

              <p className="mt-1 break-all text-sm">
                {member.email}
              </p>
            </div>

            <div className="flex items-center justify-between">

              <span className="rounded-lg bg-violet-900/50 px-3 py-2 text-sm text-violet-300">
                {member.role}
              </span>

              <button className="rounded-lg border border-gray-600 px-4 py-2 text-sm transition hover:bg-gray-700">
                View Profile
              </button>

            </div>

          </div>
        ))}

      </div>

{filteredMembers.length === 0 && (
  <p className="mt-6 text-center text-gray-400">
    No team members found.
  </p>
)}

    </div>
  );
}

export default TeamMembers;