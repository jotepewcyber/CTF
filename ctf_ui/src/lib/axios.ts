import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// 1. Attach token for every request
api.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 2. Refresh token if access expires (simplified version)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // If token expired and we have refresh, try to refresh token
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      typeof window !== "undefined"
    ) {
      originalRequest._retry = true;
      const refresh = localStorage.getItem("refresh");
      if (refresh) {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}accounts/refresh/`,
            {},
            { withCredentials: true }, // ENSURE this!!
          );
          console.log("Token refreshed", res.data);
          const { access } = res.data;
          localStorage.setItem("access", access);
          // Update header and retry
          originalRequest.headers["Authorization"] = `Bearer ${access}`;
          return api(originalRequest);
        } catch (refreshError) {
          // On failure, force logout
          localStorage.removeItem("access");
          // You might want to dispatch(logout()) here
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  },
);

export default api;
