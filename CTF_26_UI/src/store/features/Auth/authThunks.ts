import { registerUser, loginUser, fetchMe, updateMe } from "@/lib/apiClient";
import { EditableUserFields } from "@/types/users";
import { createAsyncThunk } from "@reduxjs/toolkit";

// SIGNUP THUNK
export const signupThunk = createAsyncThunk(
  "auth/signup",
  async (form: any, { rejectWithValue }) => {
    try {
      const { data } = await registerUser(form);
      return data;
    } catch (err: any) {
      const errorDetail =
        err.response?.data?.detail || err.response?.data || err.message;
      return rejectWithValue(
        typeof errorDetail === "string"
          ? errorDetail
          : JSON.stringify(errorDetail),
      );
    }
  },
);

// LOGIN THUNK
export const loginThunk = createAsyncThunk(
  "auth/login",
  async (form: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const { data } = await loginUser(form);
      return data;
    } catch (err: any) {
      const errorDetail =
        err.response?.data?.detail || err.response?.data || err.message;
      return rejectWithValue(
        typeof errorDetail === "string"
          ? errorDetail
          : JSON.stringify(errorDetail),
      );
    }
  },
);

// FETCH ME THUNK
export const fetchMeThunk = createAsyncThunk(
  "auth/fetchMe",
  async (_, { getState, rejectWithValue }) => {
    // @ts-ignore
    const access = getState().auth.access;
    try {
      const { data } = await fetchMe(); // Use wrapper, pass token if you want
      return data;
    } catch (err: any) {
      const errorDetail =
        err.response?.data?.detail || err.response?.data || err.message;
      return rejectWithValue(
        typeof errorDetail === "string"
          ? errorDetail
          : JSON.stringify(errorDetail),
      );
    }
  },
);

export const updateProfileThunk = createAsyncThunk(
  "auth/updateProfile",
  async (formData: Partial<EditableUserFields>, { rejectWithValue }) => {
    try {
      // ✅ Only allow these fields to be sent to backend
      const allowedFields: (keyof EditableUserFields)[] = [
        "username",
        "first_name",
        "last_name",
        "email",
        "branch",
        "course",
        "year",
        "avatar_url",
      ];

      const sanitizedData: any = {};

      allowedFields.forEach((field) => {
        if (field in formData && formData[field] !== undefined) {
          sanitizedData[field] = formData[field];
        }
      });

      // ✅ Make API call with sanitized data
      const { data } = await updateMe(sanitizedData);

      console.log("✅ Update response:", data); // Debug log

      // ✅ IMPORTANT: Return complete user object, not just data.user
      // The backend should return the complete updated user
      return data.user || data || {};
    } catch (err: any) {
      const errorDetail =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        err.response?.data ||
        err.message;

      return rejectWithValue(
        typeof errorDetail === "string"
          ? errorDetail
          : JSON.stringify(errorDetail),
      );
    }
  },
);

// LOGOUT THUNK
export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      // Remove access token and cookies
      if (typeof window !== "undefined") {
        localStorage.removeItem("access");
      }
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
