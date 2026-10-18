function ProjectDetails({ project, onClose }) {
  if (!project) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-lg rounded-xl border border-gray-700 bg-gray-800 p-6">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            Project Details
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-gray-400 hover:bg-gray-700 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Project Name */}
        <h3 className="mb-2 text-xl font-semibold text-white">
          {project.name}
        </h3>

        {/* Description */}
        <p className="mb-5 text-gray-400">
          {project.description || "No description available."}
        </p>

        {/* Status */}
        <div className="mb-4 flex justify-between">
          <span className="text-gray-400">Status</span>
          <span className="text-white">{project.status}</span>
        </div>

        {/* Progress */}
        <div className="mb-4 flex justify-between">
          <span className="text-gray-400">Progress</span>
          <span className="text-white">{project.progress}%</span>
        </div>

        {/* Team Members */}
        <div className="mb-6 flex justify-between">
          <span className="text-gray-400">Team Members</span>
          <span className="text-white">{project.members}</span>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full rounded-lg bg-violet-600 py-3 font-semibold text-white hover:bg-violet-700"
        >
          Close
        </button>

      </div>
    </div>
  );
}

export default ProjectDetails;