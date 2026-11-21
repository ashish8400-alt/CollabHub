import API from "./api";

// Fetch all projects
export const getMyProjects = async () => {
  const response = await API.get("/projects/my-projects");
  return response.data;
};

// Create project
export const createProject = async (name, description) => {
  const response = await API.post("/projects/create", {
    name,
    description,
  });

  return response.data;
};

// Update project
export const updateProject = async (projectId, data) => {
  const response = await API.put(`/projects/${projectId}`, data);
  return response.data;
};

// Delete project
export const deleteProject = async (projectId) => {
  const response = await API.delete(`/projects/${projectId}`);
  return response.data;
};

export const getProject = async (projectId) => {
  const response = await API.get(`/projects/${projectId}`);
  return response.data;
};