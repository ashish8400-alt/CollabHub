function Dashboard() {
return ( <div className="min-h-screen bg-gray-900 p-8 text-white">


  {/* Welcome Section */}
  <div className="mb-8">
    <h1 className="text-3xl font-bold">
      Welcome to CollabHub!
    </h1>

    <p className="mt-2 text-gray-400">
      Manage your projects and work with your team.
    </p>
  </div>


  {/* Statistics Cards */}
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

    {/* Total Projects */}
    <div className="rounded-xl border border-gray-800 bg-gray-950 p-6">
      <p className="text-gray-400">
        Total Projects
      </p>

      <h2 className="mt-3 text-3xl font-bold">
        12
      </h2>

      <p className="mt-2 text-sm text-green-400">
        Your team projects
      </p>
    </div>


    {/* Total Tasks */}
    <div className="rounded-xl border border-gray-800 bg-gray-950 p-6">
      <p className="text-gray-400">
        Total Tasks
      </p>

      <h2 className="mt-3 text-3xl font-bold">
        48
      </h2>

      <p className="mt-2 text-sm text-blue-400">
        Tasks in your workspace
      </p>
    </div>


    {/* Completed Tasks */}
    <div className="rounded-xl border border-gray-800 bg-gray-950 p-6">
      <p className="text-gray-400">
        Completed Tasks
      </p>

      <h2 className="mt-3 text-3xl font-bold">
        32
      </h2>

      <p className="mt-2 text-sm text-green-400">
        Tasks completed
      </p>
    </div>


    {/* Team Members */}
    <div className="rounded-xl border border-gray-800 bg-gray-950 p-6">
      <p className="text-gray-400">
        Team Members
      </p>

      <h2 className="mt-3 text-3xl font-bold">
        8
      </h2>

      <p className="mt-2 text-sm text-violet-400">
        People in your team
      </p>
    </div>

  </div>


  {/* Recent Projects Section */}
  <div className="mt-10">

    <h2 className="mb-5 text-2xl font-bold">
      Recent Projects
    </h2>

    <div className="rounded-xl border border-gray-800 bg-gray-950 p-6">

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">
            Website Development
          </h3>

          <p className="mt-2 text-sm text-gray-400">
            Building a modern website for our team.
          </p>
        </div>

        <span className="rounded-lg bg-green-500/10 px-3 py-2 text-sm text-green-400">
          Active
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mt-6">

        <div className="mb-2 flex justify-between text-sm">
          <span className="text-gray-400">
            Project Progress
          </span>

          <span>
            70%
          </span>
        </div>

        <div className="h-2 rounded-full bg-gray-800">
          <div className="h-2 w-[70%] rounded-full bg-violet-600"></div>
        </div>

      </div>

    </div>

  </div>


  {/* Tasks Section */}
  <div className="mt-10">

    <h2 className="mb-5 text-2xl font-bold">
      My Tasks
    </h2>

    <div className="rounded-xl border border-gray-800 bg-gray-950 p-6">

      <div className="flex items-center justify-between border-b border-gray-800 py-4">
        <p>
          Create the homepage design
        </p>

        <span className="rounded-lg bg-yellow-500/10 px-3 py-2 text-sm text-yellow-400">
          In Progress
        </span>
      </div>

      <div className="flex items-center justify-between border-b border-gray-800 py-4">
        <p>
          Connect the backend API
        </p>

        <span className="rounded-lg bg-blue-500/10 px-3 py-2 text-sm text-blue-400">
          Pending
        </span>
      </div>

      <div className="flex items-center justify-between py-4">
        <p>
          Complete the login page
        </p>

        <span className="rounded-lg bg-green-500/10 px-3 py-2 text-sm text-green-400">
          Completed
        </span>
      </div>

    </div>

  </div>

</div>


);
}

export default Dashboard;
