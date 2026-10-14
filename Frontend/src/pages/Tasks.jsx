function Tasks() {
return ( <div className="min-h-screen bg-gray-900 p-8 text-white">

  {/* Page Heading */}
  <div className="mb-8">
    <h1 className="text-3xl font-bold">
      My Tasks
    </h1>

    <p className="mt-2 text-gray-400">
      Manage your work and track your progress.
    </p>
  </div>


  {/* Task 1 */}
  <div className="mb-5 rounded-xl border border-gray-800 bg-gray-950 p-6">

    <div className="flex items-center justify-between">

      <div>
        <h2 className="text-xl font-bold">
          Create Homepage Design
        </h2>

        <p className="mt-2 text-gray-400">
          Design the homepage for the CollabHub application.
        </p>
      </div>

      <span className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
        High Priority
      </span>

    </div>

    <div className="mt-5 flex items-center justify-between border-t border-gray-800 pt-4">

      <p className="text-sm text-gray-400">
        Due Date: 20 October 2026
      </p>

      <span className="rounded-lg bg-blue-500/10 px-3 py-2 text-sm text-blue-400">
        In Progress
      </span>

    </div>

  </div>


  {/* Task 2 */}
  <div className="mb-5 rounded-xl border border-gray-800 bg-gray-950 p-6">

    <div className="flex items-center justify-between">

      <div>
        <h2 className="text-xl font-bold">
          Connect Backend API
        </h2>

        <p className="mt-2 text-gray-400">
          Connect the frontend with the backend server.
        </p>
      </div>

      <span className="rounded-lg bg-yellow-500/10 px-3 py-2 text-sm text-yellow-400">
        Medium Priority
      </span>

    </div>

    <div className="mt-5 flex items-center justify-between border-t border-gray-800 pt-4">

      <p className="text-sm text-gray-400">
        Due Date: 22 October 2026
      </p>

      <span className="rounded-lg bg-yellow-500/10 px-3 py-2 text-sm text-yellow-400">
        Pending
      </span>

    </div>

  </div>


  {/* Task 3 */}
  <div className="mb-5 rounded-xl border border-gray-800 bg-gray-950 p-6">

    <div className="flex items-center justify-between">

      <div>
        <h2 className="text-xl font-bold">
          Build Login Page
        </h2>

        <p className="mt-2 text-gray-400">
          Create a login page for registered users.
        </p>
      </div>

      <span className="rounded-lg bg-green-500/10 px-3 py-2 text-sm text-green-400">
        Low Priority
      </span>

    </div>

    <div className="mt-5 flex items-center justify-between border-t border-gray-800 pt-4">

      <p className="text-sm text-gray-400">
        Due Date: 18 October 2026
      </p>

      <span className="rounded-lg bg-green-500/10 px-3 py-2 text-sm text-green-400">
        Completed
      </span>

    </div>

  </div>

</div>


);
}

export default Tasks;
