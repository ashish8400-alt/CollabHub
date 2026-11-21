import { useState, useEffect } from "react";
import {
  getMyProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../services/projectService";
import ProjectDetails from "../components/ProjectDetails";
import ProjectSummary from "../components/ProjectSummary";

function Projects() {
  const [showForm, setShowForm] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [selectedProject, setSelectedProject] = useState(null);

const [projects, setProjects] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
  async function fetchProjects() {
    try {
      const data = await getMyProjects();

      setProjects(data.projects);
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to fetch projects"
      );
    } finally {
      setLoading(false);
    }
  }

  fetchProjects();
}, []);


  // Create Project
  async function handleCreateProject(e) {
    e.preventDefault();

    if (projectName.trim() === "") {
      return;
    }
    try {
      const data = await createProject(projectName, description);
      setProjects((previousProjects) => [...previousProjects, data.project]);
      setProjectName("");
      setDescription("");
      setShowForm(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create project");
    }
  }

// Edit Project
async function handleEditProject(project) {
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

  const newStatus = window.prompt(
    "Enter status: Active, In Progress, Planning",
    project.status
  );

  if (newStatus === null) {
    return;
  }

  const validStatuses = ["Active", "In Progress", "Planning"];

  if (!validStatuses.includes(newStatus.trim())) {
    alert("Please enter a valid status.");
    return;
  }

  try {
    const data = await updateProject(project._id || project.id, {
      name: newName.trim(),
      description: newDescription.trim(),
    });
    setProjects((previousProjects) =>
      previousProjects.map((item) =>
        (item._id || item.id) === (project._id || project.id)
          ? data.project
          : item
      )
    );
  } catch (err) {
    alert(err.response?.data?.message || "Failed to update project");
  }
}


  // Delete Project
  async function handleDeleteProject(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    try {
      if (id && typeof id === "string" && id.length === 24) {
        await deleteProject(id);
      }
      setProjects((prev) =>
        prev.filter((project) => (project._id || project.id) !== id)
      );
    } catch (err) {
      console.error("Failed to delete project on server:", err);
      const errorMessage =
        err.response?.data?.message || "Failed to delete project. Please try again.";
      alert(errorMessage);
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

// Sort Projects
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
    <div className="mobile-content-padding min-h-full p-6 text-white md:p-8">

      {loading && <p>Loading projects...</p>}

{error && <p className="text-red-400">{error}</p>}

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

<ProjectSummary projects={projects} />

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
           key={project._id || project.id}
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
               👥 {project.members?.length || 0}  
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
                onClick={() => handleDeleteProject(project._id || project.id)}
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