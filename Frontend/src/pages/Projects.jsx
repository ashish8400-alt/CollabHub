import { useState } from "react";
import ProjectDetails from "../components/ProjectDetails";

function Projects() {
  const [showForm, setShowForm] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [selectedProject, setSelectedProject] = useState(null);

  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Website Development",
      description: "Developing a modern and responsive website.",
      progress: 70,
      status: "Active",
      members: 4,
    },
    {
      id: 2,
      name: "CollabHub Application",
      description:
        "Building a team collaboration and project management app.",
      progress: 45,
      status: "In Progress",
      members: 6,
    },
    {
      id: 3,
      name: "Mobile App Design",
      description:
        "Designing an intuitive and user-friendly mobile application.",
      progress: 20,
      status: "Planning",
      members: 3,
    },
  ]);

  // Create Project
  function handleCreateProject(e) {
    e.preventDefault();

    if (projectName.trim() === "") {
      return;
    }

    const newProject = {
      id: Date.now(),
      name: projectName.trim(),
      description: description.trim(),
      progress: 0,
      status: "Planning",
      members: 1,
    };

    setProjects([...projects, newProject]);

    setProjectName("");
    setDescription("");
    setShowForm(false);
  }

//Edit Project
  function handleEditProject(project) {
  const newName = window.prompt(
    "Enter project name:",
    project.name
  );

  if (newName === null || newName.trim() === "") {
    return;
  }

  const newDescription = window.prompt(
    "Enter project description:",
    project.description
  );

  if (newDescription === null) {
    return;
  }

  setProjects(
    projects.map((item) =>
      item.id === project.id
        ? {
            ...item,
            name: newName.trim(),
            description: newDescription.trim(),
          }
        : item
    )
  );
}


  // Delete Project
  function handleDeleteProject(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (confirmDelete) {
      setProjects(
        projects.filter((project) => project.id !== id)
      );
    }
  }

  // Search Projects
  // const filteredProjects = projects.filter((project) =>
  //   project.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const filteredProjects = projects.filter((project) => {
  const matchesSearch = project.name
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  const matchesStatus =
    statusFilter === "All" || project.status === statusFilter;

  return matchesSearch && matchesStatus;
});




const sortedProjects = [...filteredProjects].sort((a, b) => {
  if (sortBy === "name") {
    return a.name.localeCompare(b.name);
  }

  if (sortBy === "progress-high") {
    return b.progress - a.progress;
  }

  if (sortBy === "progress-low") {
    return a.progress - b.progress;
  }

  return 0;
});

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">

      {/* Heading */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>

          <p className="mt-2 text-gray-400">
            Manage and track all your team projects.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-lg bg-violet-600 px-5 py-3 font-semibold transition hover:bg-violet-700"
        >
          {showForm ? "Cancel" : "+ Create Project"}
        </button>
      </div>

      {/* Create Project Form */}
      {showForm && (
        <div className="mb-8 rounded-xl border border-gray-700 bg-gray-800 p-6">
          <h2 className="mb-5 text-xl font-bold">
            Create New Project
          </h2>

          <form onSubmit={handleCreateProject}>
            <div className="mb-4">
              <label className="mb-2 block text-sm text-gray-300">
                Project Name
              </label>

              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name"
                className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white outline-none focus:border-violet-500"
                required
              />
            </div>

            <div className="mb-5">
              <label className="mb-2 block text-sm text-gray-300">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter project description"
                rows="3"
                className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white outline-none focus:border-violet-500"
              />
            </div>

            <button
              type="submit"
              className="rounded-lg bg-violet-600 px-5 py-3 font-semibold transition hover:bg-violet-700"
            >
              Create Project
            </button>
          </form>
        </div>
      )}

      {/* Search Projects */}
      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search projects by name..."
          className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-violet-500"
        />
      </div>

      {/* Filter Projects */}
<div className="mb-6">
  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-violet-500"
  >
    <option value="All">All Projects</option>
    <option value="Active">Active</option>
    <option value="In Progress">In Progress</option>
    <option value="Planning">Planning</option>
  </select>
</div>

{/* Clear Filters Button */}
<div className="mb-6">
  <button
    onClick={() => {
      setSearchTerm("");
      setStatusFilter("All");
    }}
    className="rounded-lg border border-gray-700 px-4 py-2 text-gray-300 transition hover:bg-gray-800 hover:text-white"
  >
    Clear Filters
  </button>
</div>


{/* Sort Projects */}
<div className="mb-6">
  <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-violet-500"
  >
    <option value="default">Default Order</option>
    <option value="name">Name: A to Z</option>
    <option value="progress-high">Progress: High to Low</option>
    <option value="progress-low">Progress: Low to High</option>
  </select>
</div>


      {/* Project Cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">

        {sortedProjects.map((project) => (
          <div
            key={project.id}
            className="rounded-xl border border-gray-700 bg-gray-800 p-6 transition hover:border-violet-500/60"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600/20 text-2xl">
                📁
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  project.status === "Active"
                    ? "bg-green-500/20 text-green-400"
                    : project.status === "In Progress"
                    ? "bg-blue-500/20 text-blue-400"
                    : "bg-yellow-500/20 text-yellow-400"
                }`}
              >
                {project.status}
              </span>
            </div>

            <h2 className="mb-2 text-xl font-bold">
              {project.name}
            </h2>

            <p className="mb-6 min-h-12 text-sm leading-6 text-gray-400">
              {project.description || "No description provided."}
            </p>

            {/* Progress */}
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-gray-400">
                Progress
              </span>

              <span className="text-sm font-semibold">
                {project.progress}%
              </span>
            </div>

            <div className="mb-6 h-2 w-full rounded-full bg-gray-700">
              <div
                className="h-2 rounded-full bg-violet-500 transition-all"
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>

            {/* Team Members */}
            <div className="mb-5 flex items-center justify-between">
              <span className="text-sm text-gray-400">
                Team Members
              </span>

              <span className="rounded-lg bg-gray-700 px-3 py-1 text-sm">
                👥 {project.members}
              </span>
            </div>

            {/* Project Buttons */}
            <div className="flex gap-3">
              <button
  onClick={() => setSelectedProject(project)}
  className="flex-1 rounded-lg border border-gray-600 py-3 font-semibold transition hover:border-violet-500 hover:bg-violet-600"
>
  View Project
</button>


              <button
  onClick={() => handleEditProject(project)}
  className="rounded-lg bg-amber-600 px-4 py-3 font-semibold transition hover:bg-amber-700"
>
  Edit
</button>


              <button
                onClick={() => handleDeleteProject(project.id)}
                className="rounded-lg bg-red-600 px-4 py-3 font-semibold transition hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

      </div>

      {/* Empty Message */}
      {filteredProjects.length === 0 && (
        <div className="mt-6 rounded-xl border border-gray-700 bg-gray-800 p-10 text-center">
          <p className="text-gray-400">
            {projects.length === 0
              ? "No projects available."
              : "No matching projects found."}
          </p>
        </div>
      )}


{/* Project Details Popup */}
{selectedProject && (
  <ProjectDetails
    project={selectedProject}
    onClose={() => setSelectedProject(null)}
  />
)}

    </div>
  );
}

export default Projects;