import API from "./api";

export const createComment = async (taskId, comment) => {
  const response = await API.post(`/comments/${taskId}`, { comment });
  return response.data;
};

export const getComments = async (taskId) => {
  const response = await API.get(`/comments/${taskId}`);
  return response.data;
};

export const deleteComment = async (commentId) => {
  const response = await API.delete(`/comments/${commentId}`);
  return response.data;
};
