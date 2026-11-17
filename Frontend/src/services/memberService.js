import API from "./api";

// Get project members
export const getProjectMembers = async (projectId) => {
  const response = await API.get(
    `/${projectId}/members`
  );

  return response.data;
};

// Add member
export const addMember = async (projectId, email) => {
  const response = await API.post(
    `/${projectId}/members`,
    { email }
  );

  return response.data;
};

// Remove member
export const removeMember = async (projectId, memberId) => {
  const response = await API.delete(
    `/${projectId}/members/${memberId}`
  );

  return response.data;
};