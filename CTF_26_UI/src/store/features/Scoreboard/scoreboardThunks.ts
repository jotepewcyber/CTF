import { createAsyncThunk } from "@reduxjs/toolkit";
import { getScoreboard } from "@/lib/apiClient";

export const fetchScoreboardThunk = createAsyncThunk(
  "scoreboard/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getScoreboard();
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to fetch scoreboard");
    }
  },
);
