import API from "./api";

export const sendMessage = async (receiver, message) => {
  const response = await API.post("/messages/send", { receiver, message });
  return response.data;
};

export const getMessageHistory = async (userId) => {
  const response = await API.get(`/messages/history/${userId}`);
  return response.data;
};
