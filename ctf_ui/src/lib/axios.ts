import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const api = axios.create({
  baseURL: `${BACKEND_URL}/api/`,
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

// 2. Refresh token if access expires
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If token expired and we haven't retried yet
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      typeof window !== "undefined"
    ) {
      originalRequest._retry = true;

      try {
        // ✅ Refresh token endpoint (cookie sent automatically via withCredentials)
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}accounts/refresh/`,
          {}, // Empty body
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          },
        );

        console.log("Token refreshed", res.data);
        const { access } = res.data;

        // ✅ Store new access token in localStorage
        localStorage.setItem("access", access);

        // ✅ Update header and retry original request
        originalRequest.headers["Authorization"] = `Bearer ${access}`;
        return api(originalRequest);
      } catch (refreshError) {
        // ✅ On refresh failure, clear localStorage and redirect to login
        localStorage.removeItem("access");

        // ✅ Redirect to login
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
