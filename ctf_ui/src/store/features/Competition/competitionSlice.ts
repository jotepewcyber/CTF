import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCompetitionInfoThunk,
  fetchCompetitionsAdminThunk,
} from "./competitionThunks";

const competitionSlice = createSlice({
  name: "competition",
  initialState: {
    info: null as any,
    loading: false,
    error: null as string | null,
    adminList: [] as any[],
    adminLoading: false,
    adminError: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompetitionInfoThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompetitionInfoThunk.fulfilled, (state, action) => {
        state.info = action.payload;
        state.loading = false;
      })
      .addCase(fetchCompetitionInfoThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(fetchCompetitionsAdminThunk.pending, (state) => {
        state.adminLoading = true;
        state.adminError = null;
      })
      .addCase(fetchCompetitionsAdminThunk.fulfilled, (state, action) => {
        state.adminList = action.payload;
        state.adminLoading = false;
      })
      .addCase(fetchCompetitionsAdminThunk.rejected, (state, action) => {
        state.adminLoading = false;
        state.adminError = action.payload as string;
      });
  },
});

export const competitionReducer = competitionSlice.reducer;
