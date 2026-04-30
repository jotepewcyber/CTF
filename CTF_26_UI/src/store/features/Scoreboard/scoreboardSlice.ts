import { createSlice } from "@reduxjs/toolkit";
import { fetchScoreboardThunk } from "./scoreboardThunks";

type ScoreboardEntry = {
  username: string;
  total_points: number;
};

interface ScoreboardState {
  users: ScoreboardEntry[];
  loading: boolean;
  error: string | null;
}

const initialState: ScoreboardState = {
  users: [],
  loading: false,
  error: null,
};

const scoreboardSlice = createSlice({
  name: "scoreboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchScoreboardThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchScoreboardThunk.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchScoreboardThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const scoreboardReducer = scoreboardSlice.reducer;
