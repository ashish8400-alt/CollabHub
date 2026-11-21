import API from "./api";

export const getMyProfile = async () => {
  const response = await API.get("/profile/me");
  return response.data;
};

export const updateMyProfile = async (name) => {
  const response = await API.put("/profile/me", { name });
  return response.data;
};

export const uploadProfileImage = async (file) => {
  const formData = new FormData();
  formData.append("profileImage", file);
  const response = await API.put("/profile/image", formData);
  return response.data;
};

export const changePassword = async (currentPassword, newPassword) => {
  const response = await API.put("/profile/change-password", {
    currentPassword,
    newPassword,
  });
  return response.data;
};
