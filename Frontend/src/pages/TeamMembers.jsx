
function TeamMembers() {
  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white md:p-8">

      {/* Page Heading */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Team Members</h1>
          <p className="mt-2 text-gray-400">
            Meet your team and manage your workspace members.
          </p>
        </div>

        <button className="rounded-xl bg-violet-600 px-5 py-3 font-semibold transition hover:bg-violet-700">
          + Invite Member
        </button>
      </div>

      {/* Team Statistics */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

        <div className="rounded-xl border border-gray-700 bg-gray-800 p-5">
          <p className="text-sm text-gray-400">Total Members</p>
          <h2 className="mt-2 text-3xl font-bold">8</h2>
          <p className="mt-2 text-sm text-violet-400">
            Team workspace
          </p>
        </div>

        <div className="rounded-xl border border-gray-700 bg-gray-800 p-5">
          <p className="text-sm text-gray-400">Online Members</p>
          <h2 className="mt-2 text-3xl font-bold">2</h2>
          <p className="mt-2 text-sm text-green-400">
            ● Currently active
          </p>
        </div>

        <div className="rounded-xl border border-gray-700 bg-gray-800 p-5">
          <p className="text-sm text-gray-400">Team Admins</p>
          <h2 className="mt-2 text-3xl font-bold">1</h2>
          <p className="mt-2 text-sm text-blue-400">
            Workspace management
          </p>
        </div>

      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <input
          type="text"
          placeholder="Search members by name or email..."
          className="w-full rounded-xl border border-gray-700 bg-gray-800 p-3 outline-none transition focus:border-violet-500 sm:max-w-md"
        />

        <select className="rounded-xl border border-gray-700 bg-gray-800 p-3 text-gray-300 outline-none">
          <option>All Members</option>
          <option>Admins</option>
          <option>Members</option>
        </select>
      </div>

      {/* Members Heading */}
      <div className="mb-5">
        <h2 className="text-xl font-bold">All Team Members</h2>
        <p className="mt-1 text-sm text-gray-400">
          People working together in your workspace
        </p>
      </div>

      {/* Member Cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

        {/* Rahul */}
        <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6 transition hover:-translate-y-1 hover:border-violet-500">
          <div className="mb-5 flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 text-2xl font-bold">
                R
              </div>

              <div>
                <h3 className="font-bold">Rahul Sharma</h3>
                <p className="mt-1 text-sm text-gray-400">
                  Frontend Developer
                </p>
              </div>
            </div>

            <span className="rounded-full bg-green-900/50 px-3 py-1 text-xs text-green-400">
              Online
            </span>
          </div>

          <div className="mb-5 border-t border-gray-700 pt-4">
            <p className="text-sm text-gray-400">Email Address</p>
            <p className="mt-1 break-all text-sm">
              rahul@example.com
            </p>
          </div>

          <div className="flex items-center justify-between">
            <span className="rounded-lg bg-violet-900/50 px-3 py-2 text-sm text-violet-300">
              Member
            </span>

            <button className="rounded-lg border border-gray-600 px-4 py-2 text-sm transition hover:bg-gray-700">
              View Profile
            </button>
          </div>
        </div>

        {/* Priya */}
        <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6 transition hover:-translate-y-1 hover:border-pink-500">
          <div className="mb-5 flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-600 text-2xl font-bold">
                P
              </div>

              <div>
                <h3 className="font-bold">Priya Singh</h3>
                <p className="mt-1 text-sm text-gray-400">
                  UI/UX Designer
                </p>
              </div>
            </div>

            <span className="rounded-full bg-green-900/50 px-3 py-1 text-xs text-green-400">
              Online
            </span>
          </div>

          <div className="mb-5 border-t border-gray-700 pt-4">
            <p className="text-sm text-gray-400">Email Address</p>
            <p className="mt-1 break-all text-sm">
              priya@example.com
            </p>
          </div>

          <div className="flex items-center justify-between">
            <span className="rounded-lg bg-violet-900/50 px-3 py-2 text-sm text-violet-300">
              Member
            </span>

            <button className="rounded-lg border border-gray-600 px-4 py-2 text-sm transition hover:bg-gray-700">
              View Profile
            </button>
          </div>
        </div>

        {/* Aman */}
        <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6 transition hover:-translate-y-1 hover:border-blue-500">
          <div className="mb-5 flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold">
                A
              </div>

              <div>
                <h3 className="font-bold">Aman Verma</h3>
                <p className="mt-1 text-sm text-gray-400">
                  Backend Developer
                </p>
              </div>
            </div>

            <span className="rounded-full bg-yellow-900/50 px-3 py-1 text-xs text-yellow-400">
              Away
            </span>
          </div>

          <div className="mb-5 border-t border-gray-700 pt-4">
            <p className="text-sm text-gray-400">Email Address</p>
            <p className="mt-1 break-all text-sm">
              aman@example.com
            </p>
          </div>

          <div className="flex items-center justify-between">
            <span className="rounded-lg bg-violet-900/50 px-3 py-2 text-sm text-violet-300">
              Member
            </span>

            <button className="rounded-lg border border-gray-600 px-4 py-2 text-sm transition hover:bg-gray-700">
              View Profile
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default TeamMembers;

