import {
  createCompetition,
  deleteCompetition,
  getCompetitionInfo,
  getCompetitionsAdmin,
  updateCompetition,
} from "@/lib/apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCompetitionInfoThunk = createAsyncThunk(
  "competition/fetchInfo",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getCompetitionInfo();
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.detail || "No active competition found",
      );
    }
  },
);

export const fetchCompetitionsAdminThunk = createAsyncThunk(
  "competition/fetchAdminList",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getCompetitionsAdmin();
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to fetch competition list");
    }
  },
);

export const createCompetitionThunk = createAsyncThunk(
  "competition/create",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await createCompetition(data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to create competition");
    }
  },
);

export const updateCompetitionThunk = createAsyncThunk(
  "competition/update",
  async ({ id, data }: { id: number; data: any }, { rejectWithValue }) => {
    try {
      const res = await updateCompetition(id, data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to update competition");
    }
  },
);

export const deleteCompetitionThunk = createAsyncThunk(
  "competition/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      await deleteCompetition(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to delete competition");
    }
  },
);
