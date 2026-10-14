function Sidebar() {
return ( <div className="flex min-h-screen w-64 flex-col border-r border-gray-800 bg-gray-950 p-5 text-white">


  {/* Logo */}
  <div className="mb-10">
    <h1 className="text-3xl font-bold">
      Collab<span className="text-violet-500">Hub</span>
    </h1>

    <p className="mt-2 text-sm text-gray-400">
      Work together, grow together.
    </p>
  </div>

  {/* Menu Heading */}
  <div className="mb-4">
    <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
      Main Menu
    </p>
  </div>

  {/* Dashboard */}
  <button className="mb-2 flex items-center gap-3 rounded-xl bg-violet-600 px-4 py-3 text-left text-white">
    <span>🏠</span>
    <span>Dashboard</span>
  </button>

  {/* Projects */}
  <button className="mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-left text-gray-400 transition hover:bg-gray-800 hover:text-white">
    <span>📁</span>
    <span>Projects</span>
  </button>

  {/* My Tasks */}
  <button className="mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-left text-gray-400 transition hover:bg-gray-800 hover:text-white">
    <span>✅</span>
    <span>My Tasks</span>
  </button>

  {/* Messages */}
  <button className="mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-left text-gray-400 transition hover:bg-gray-800 hover:text-white">
    <span>💬</span>
    <span>Messages</span>
  </button>

  {/* Notifications */}
  <button className="mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-left text-gray-400 transition hover:bg-gray-800 hover:text-white">
    <span>🔔</span>
    <span>Notifications</span>
  </button>

  {/* Settings */}
  <button className="mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-left text-gray-400 transition hover:bg-gray-800 hover:text-white">
    <span>⚙️</span>
    <span>Settings</span>
  </button>

  {/* Bottom Section */}
  <div className="mt-auto border-t border-gray-800 pt-5">

    <div className="mb-4 rounded-xl bg-gray-900 p-4">
      <h3 className="font-semibold text-white">
        Need Help?
      </h3>

      <p className="mt-2 text-sm text-gray-400">
        Contact your team administrator if you need any help.
      </p>

      <button className="mt-4 w-full rounded-lg bg-gray-800 px-3 py-2 text-sm text-white transition hover:bg-gray-700">
        Get Support
      </button>
    </div>

    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 font-bold">
        A
      </div>

      <div>
        <p className="font-medium text-white">
          My Account
        </p>

        <p className="text-sm text-gray-400">
          Manage Profile
        </p>
      </div>
    </div>

  </div>

</div>


);
}

export default Sidebar;
