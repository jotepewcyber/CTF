import { createSlice } from "@reduxjs/toolkit";
import {
  loginThunk,
  signupThunk,
  fetchMeThunk,
  logoutThunk,
  updateProfileThunk,
} from "./authThunks";

export interface AuthState {
  user: null | Record<string, any>;
  access: null | string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: null | string;
  initialized: boolean;
  successMessage: null | string; // ✅ For success toasts
}

const initialState: AuthState = {
  user: null,
  access: typeof window !== "undefined" ? localStorage.getItem("access") : null,
  status: "idle",
  error: null,
  initialized: false,
  successMessage: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccess: (state, action) => {
      state.access = action.payload;
      try {
        if (typeof window !== "undefined") {
          if (action.payload) localStorage.setItem("access", action.payload);
          else localStorage.removeItem("access");
        }
      } catch {}
    },
    setInitialized: (state, action) => {
      state.initialized = action.payload;
    },
    clearAuth: (state) => {
      state.user = null;
      state.access = null;
      state.status = "idle";
      state.error = null;
      state.initialized = true;
      state.successMessage = null;
      try {
        if (typeof window !== "undefined") {
          localStorage.removeItem("access");
        }
        if (typeof document !== "undefined") {
          document.cookie = "refresh_token=; Max-Age=0; path=/;";
          document.cookie = "access=; Max-Age=0; path=/;";
        }
      } catch {}
    },
    // ✅ Clear success message after displaying
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.successMessage = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.access = action.payload.access;
        state.user = action.payload.user;
        state.error = null;
        state.initialized = true;
        state.successMessage = "Logged in successfully!"; // ✅ Success message
        try {
          if (typeof window !== "undefined" && action.payload.access) {
            localStorage.setItem("access", action.payload.access);
          }
        } catch {}
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Login failed";
        state.user = null;
        state.initialized = true;
        state.successMessage = null;
      })

      // SIGNUP
      .addCase(signupThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.successMessage = null;
      })
      .addCase(signupThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.access = action.payload?.access || null;
        state.user = action.payload?.user || null;
        state.error = null;
        state.initialized = true;
        state.successMessage = "Account created successfully!"; // ✅ Success message
        try {
          if (typeof window !== "undefined" && action.payload?.access) {
            localStorage.setItem("access", action.payload.access);
          }
        } catch {}
      })
      .addCase(signupThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Signup failed";
        state.user = null;
        state.initialized = true;
        state.successMessage = null;
      })

      // FETCH ME
      .addCase(fetchMeThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMeThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
        state.initialized = true;
      })
      .addCase(fetchMeThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Fetch user failed";
        state.user = null;
        state.initialized = true;
      })

      .addCase(updateProfileThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateProfileThunk.fulfilled, (state, action) => {
        state.status = "succeeded";

        if (state.user && action.payload) {
          state.user = {
            ...state.user, // Keep all existing fields
            ...action.payload, // Overwrite with updated fields
          };
        } else if (action.payload) {
          state.user = action.payload;
        }

        state.error = null;
        state.successMessage = "Profile updated successfully!";
      })
      .addCase(updateProfileThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Failed to update profile";
        state.successMessage = null;
      })
      // LOGOUT
      .addCase(logoutThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.successMessage = null;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.access = null;
        state.status = "idle";
        state.error = null;
        state.initialized = true;
        state.successMessage = "Logged out successfully!"; // ✅ Success message
        try {
          if (typeof window !== "undefined") {
            localStorage.removeItem("access");
          }
          if (typeof document !== "undefined") {
            document.cookie = "refresh_token=; Max-Age=0; path=/;";
            document.cookie = "access=; Max-Age=0; path=/;";
          }
        } catch {}
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Logout failed";
        state.initialized = true;
        state.successMessage = null;
      });
  },
});

export const { setAccess, setInitialized, clearAuth, clearSuccessMessage } =
  authSlice.actions;
export const authReducer = authSlice.reducer;
