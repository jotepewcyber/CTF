import api from "./axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Wrapper functions (customize as needed)
export const registerUser = (data: any) => api.post("accounts/register/", data);
export const loginUser = (data: any) => api.post("accounts/login/", data);
export const fetchMe = (token?: string) =>
  api.get(
    "accounts/me/",
    token ? { headers: { Authorization: `Bearer ${token}` } } : {},
  );
export const refreshAccess = () => api.post("accounts/refresh/");

// You can export the entire instance, too
export { api, BACKEND_URL };
