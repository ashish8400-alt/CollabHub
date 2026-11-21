import API from "./api";

export const createTask = async (projectId, data) => {
  const response = await API.post(`/tasks/${projectId}`, data);
  return response.data;
};

export const getProjectTasks = async (projectId) => {
  const response = await API.get(`/tasks/${projectId}`);
  return response.data;
};

export const getTask = async (taskId) => {
  const response = await API.get(`/tasks/single/${taskId}`);
  return response.data;
};

export const updateTask = async (taskId, data) => {
  const response = await API.put(`/tasks/single/${taskId}`, data);
  return response.data;
};

export const updateTaskStatus = async (taskId, status) => {
  const response = await API.put(`/tasks/status/${taskId}`, { status });
  return response.data;
};

export const deleteTask = async (taskId) => {
  const response = await API.delete(`/tasks/single/${taskId}`);
  return response.data;
};
