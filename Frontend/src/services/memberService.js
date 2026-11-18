import API from "./api";

export const getProjectMembers = async (projectId) => {
  const response = await API.get(`/members/${projectId}/members`);
  return response.data;
};

export const addMember = async (projectId, email) => {
  const response = await API.post(`/members/${projectId}/members`, {
    email,
  });
  return response.data;
};

export const removeMember = async (projectId, memberId) => {
  const response = await API.delete(
    `/members/${projectId}/members/${memberId}`
  );
  return response.data;
};