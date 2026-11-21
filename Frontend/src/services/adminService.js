import API from "./api";

export const getAdminDashboard = async () => {
  const response = await API.get("/admin/dashboard");
  return response.data;
};
