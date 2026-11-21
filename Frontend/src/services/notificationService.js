import API from "./api";

export const getMyNotifications = async () => {
  const response = await API.get("/notifications/my");
  return response.data;
};

export const markNotificationAsRead = async (notificationId) => {
  const response = await API.put(`/notifications/read/${notificationId}`);
  return response.data;
};

export const markAllNotificationsAsRead = async () => {
  const response = await API.put("/notifications/read-all");
  return response.data;
};

export const getUnreadNotificationCount = async () => {
  const response = await API.get("/notifications/unread-count");
  return response.data;
};
