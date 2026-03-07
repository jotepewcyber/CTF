import { createSlice } from "@reduxjs/toolkit";
import {
  loginThunk,
  signupThunk,
  fetchMeThunk,
  logoutThunk,
} from "./authThunks";

export interface AuthState {
  user: null | Record<string, any>;
  access: null | string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: null | string;
}

const initialState: AuthState = {
  user: null,
  access: typeof window !== "undefined" ? localStorage.getItem("access") : null,
  status: "idle",
  error: null,
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
    clearAuth: (state) => {
      state.user = null;
      state.access = null;
      state.status = "idle";
      state.error = null;
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
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.access = action.payload.access;
        state.error = null;
        try {
          if (typeof window !== "undefined" && action.payload.access) {
            localStorage.setItem("access", action.payload.access);
          }
        } catch {}
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Login failed";
      })

      // SIGNUP
      .addCase(signupThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signupThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.access = action.payload?.access || null; // just in case you want to log in user directly after signup
        state.error = null;
        try {
          if (typeof window !== "undefined" && action.payload?.access) {
            localStorage.setItem("access", action.payload.access);
          }
        } catch {}
      })
      .addCase(signupThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Signup failed";
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
      })
      .addCase(fetchMeThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Fetch user failed";
        state.user = null;
      })

      // LOGOUT
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.access = null;
        state.status = "idle";
        state.error = null;
        try {
          if (typeof window !== "undefined") {
            localStorage.removeItem("access");
          }
          if (typeof document !== "undefined") {
            document.cookie = "refresh_token=; Max-Age=0; path=/;";
            document.cookie = "access=; Max-Age=0; path=/;";
          }
        } catch {}
      });
  },
});

export const { setAccess, clearAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
