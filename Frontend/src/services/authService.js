import API from "./api";

// 1. Send Login credentials & request OTP
export const login = async (email, password) => {
  const response = await API.post("/auth/login", {
    email: email.trim().toLowerCase(),
    password,
  });
  return response.data;
};

// 2. Verify Login OTP and obtain JWT + User
export const verifyLoginOtp = async (email, otp) => {
  const response = await API.post("/auth/verify-login-otp", {
    email: email.trim().toLowerCase(),
    otp: otp.trim(),
  });
  return response.data;
};

// 3. Initiate Registration & send registration OTP
export const register = async (name, email, password) => {
  const response = await API.post("/auth/register", {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password,
  });
  return response.data;
};

// 4. Verify Registration OTP & activate user in database
export const verifyRegisterOtp = async (email, otp) => {
  const response = await API.post("/auth/verify-register-otp", {
    email: email.trim().toLowerCase(),
    otp: otp.trim(),
  });
  return response.data;
};

// 5. Fetch current user profile to validate session
export const getCurrentProfile = async () => {
  const response = await API.get("/profile/me");
  return response.data;
};
