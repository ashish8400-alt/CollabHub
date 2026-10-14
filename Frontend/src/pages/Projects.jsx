function Projects() {
return ( <div className="min-h-screen bg-gray-900 p-8 text-white">


  {/* Page Heading */}
  <div className="mb-8 flex items-center justify-between">

    <div>
      <h1 className="text-3xl font-bold">
        My Projects
      </h1>

      <p className="mt-2 text-gray-400">
        Manage your team projects in one place.
      </p>
    </div>

    <button className="rounded-lg bg-violet-600 px-5 py-3 font-semibold hover:bg-violet-500">
      + Create Project
    </button>

  </div>


  {/* Project 1 */}
  <div className="mb-6 rounded-xl border border-gray-800 bg-gray-950 p-6">

    <div className="flex items-center justify-between">

      <div>
        <h2 className="text-xl font-bold">
          Website Development
        </h2>

        <p className="mt-2 text-gray-400">
          Developing a modern website for our organization.
        </p>
      </div>

      <span className="rounded-lg bg-green-500/10 px-3 py-2 text-sm text-green-400">
        Active
      </span>

    </div>

    <div className="mt-6">

      <div className="mb-2 flex justify-between">
        <p className="text-sm text-gray-400">
          Project Progress
        </p>

        <p className="text-sm">
          70%
        </p>
      </div>

      <div className="h-2 rounded-full bg-gray-800">
        <div className="h-2 w-[70%] rounded-full bg-violet-600"></div>
      </div>

    </div>

    <div className="mt-6 flex items-center justify-between border-t border-gray-800 pt-5">

      <p className="text-sm text-gray-400">
        Team Members: 4
      </p>

      <button className="rounded-lg border border-gray-700 px-4 py-2 hover:bg-gray-800">
        View Project
      </button>

    </div>

  </div>


  {/* Project 2 */}
  <div className="mb-6 rounded-xl border border-gray-800 bg-gray-950 p-6">

    <div className="flex items-center justify-between">

      <div>
        <h2 className="text-xl font-bold">
          CollabHub Application
        </h2>

        <p className="mt-2 text-gray-400">
          Building a platform for team collaboration.
        </p>
      </div>

      <span className="rounded-lg bg-blue-500/10 px-3 py-2 text-sm text-blue-400">
        In Progress
      </span>

    </div>

    <div className="mt-6">

      <div className="mb-2 flex justify-between">
        <p className="text-sm text-gray-400">
          Project Progress
        </p>

        <p className="text-sm">
          45%
        </p>
      </div>

      <div className="h-2 rounded-full bg-gray-800">
        <div className="h-2 w-[45%] rounded-full bg-blue-500"></div>
      </div>

    </div>

    <div className="mt-6 flex items-center justify-between border-t border-gray-800 pt-5">

      <p className="text-sm text-gray-400">
        Team Members: 6
      </p>

      <button className="rounded-lg border border-gray-700 px-4 py-2 hover:bg-gray-800">
        View Project
      </button>

    </div>

  </div>


  {/* Project 3 */}
  <div className="rounded-xl border border-gray-800 bg-gray-950 p-6">

    <div className="flex items-center justify-between">

      <div>
        <h2 className="text-xl font-bold">
          Mobile App Design
        </h2>

        <p className="mt-2 text-gray-400">
          Designing a user-friendly mobile application.
        </p>
      </div>

      <span className="rounded-lg bg-yellow-500/10 px-3 py-2 text-sm text-yellow-400">
        Planning
      </span>

    </div>

    <div className="mt-6">

      <div className="mb-2 flex justify-between">
        <p className="text-sm text-gray-400">
          Project Progress
        </p>

        <p className="text-sm">
          20%
        </p>
      </div>

      <div className="h-2 rounded-full bg-gray-800">
        <div className="h-2 w-[20%] rounded-full bg-yellow-500"></div>
      </div>

    </div>

    <div className="mt-6 flex items-center justify-between border-t border-gray-800 pt-5">

      <p className="text-sm text-gray-400">
        Team Members: 3
      </p>

      <button className="rounded-lg border border-gray-700 px-4 py-2 hover:bg-gray-800">
        View Project
      </button>

    </div>

  </div>

</div>

);
}

export default Projects;
