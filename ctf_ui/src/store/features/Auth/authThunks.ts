import { createAsyncThunk } from "@reduxjs/toolkit";

// Adjust the API URL as per your real backend source!
const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000/api/accounts";

export const signupThunk = createAsyncThunk(
  "auth/signup",
  async (form: any, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data.detail || JSON.stringify(data));
      }
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || "Signup error");
    }
  },
);

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (form: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include", // needed for cookies from backend
      });
      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data.detail || JSON.stringify(data));
      }
      // { access: "...jwt..." }
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || "Login error");
    }
  },
);

export const fetchMeThunk = createAsyncThunk(
  "auth/fetchMe",
  async (_, { getState, rejectWithValue }) => {
    // @ts-ignore
    const access = getState().auth.access;
    try {
      const res = await fetch(`${API_BASE}/me/`, {
        method: "GET",
        headers: { Authorization: `Bearer ${access}` },
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data.detail || JSON.stringify(data));
      }
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || "Fetch user error");
    }
  },
);

/** LOGOUT THUNK -- client-side only */
export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      // Remove access token from localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("access");
        // Optionally: localStorage.removeItem("refresh");
      }
      // Remove cookies (works for non-HttpOnly cookies from JS)
      if (typeof document !== "undefined") {
        document.cookie = "refresh_token=; Max-Age=0; path=/;";
        document.cookie = "access=; Max-Age=0; path=/;";
      }
      return true;
    } catch (err: any) {
      return rejectWithValue(err.message || "Logout error");
    }
  },
);
