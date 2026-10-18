function ProjectSummary({ projects }) {
  const totalProjects = projects.length;

  const activeProjects = projects.filter(
    (project) => project.status === "Active"
  ).length;

  const inProgressProjects = projects.filter(
    (project) => project.status === "In Progress"
  ).length;

  const planningProjects = projects.filter(
    (project) => project.status === "Planning"
  ).length;

  return (
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

      {/* Total Projects */}
      <div className="rounded-xl border border-gray-700 bg-gray-800 p-5">
        <p className="text-sm text-gray-400">
          Total Projects
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          {totalProjects}
        </h2>
      </div>

      {/* Active Projects */}
      <div className="rounded-xl border border-gray-700 bg-gray-800 p-5">
        <p className="text-sm text-gray-400">
          Active Projects
        </p>

        <h2 className="mt-2 text-3xl font-bold text-green-400">
          {activeProjects}
        </h2>
      </div>

      {/* In Progress */}
      <div className="rounded-xl border border-gray-700 bg-gray-800 p-5">
        <p className="text-sm text-gray-400">
          In Progress
        </p>

        <h2 className="mt-2 text-3xl font-bold text-blue-400">
          {inProgressProjects}
        </h2>
      </div>

      {/* Planning */}
      <div className="rounded-xl border border-gray-700 bg-gray-800 p-5">
        <p className="text-sm text-gray-400">
          Planning
        </p>

        <h2 className="mt-2 text-3xl font-bold text-yellow-400">
          {planningProjects}
        </h2>
      </div>

    </div>
  );
}

export default ProjectSummary;