import { createSlice } from "@reduxjs/toolkit";
import {
  fetchChallengeDetailThunk,
  fetchChallengesByCategoryThunk,
  submitFlagThunk,
} from "./questionThunks";

const QuestionSlice = createSlice({
  name: "challenges",
  initialState: {
    // categoryId to challenges map
    challenges: {} as Record<number, any[]>,
    loading: {} as Record<number, boolean>,
    loaded: {} as Record<number, boolean>,
    error: {} as Record<number, string>,
    currentChallenge: null as null | any, // for showing details/modal
    submissionResult: null as null | any,
  },
  reducers: {
    clearSubmissionResult(state) {
      state.submissionResult = null;
    },
    clearCurrentChallenge(state) {
      state.currentChallenge = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChallengesByCategoryThunk.pending, (state, action) => {
        state.loading[action.meta.arg] = true;
        state.error[action.meta.arg] = "";
      })
      .addCase(fetchChallengesByCategoryThunk.fulfilled, (state, action) => {
        state.challenges[action.payload.categoryId] = action.payload.challenges;
        state.loading[action.payload.categoryId] = false;
        state.loaded[action.payload.categoryId] = true;
      })
      .addCase(fetchChallengesByCategoryThunk.rejected, (state, action) => {
        const categoryId =
          (action.payload as any)?.categoryId ?? action.meta.arg;
        state.loading[categoryId] = false;
        state.loaded[categoryId] = true;
        state.error[categoryId] =
          (action.payload as any)?.error ||
          (action.error.message as string) ||
          "Unknown error";
      });
    builder.addCase(fetchChallengeDetailThunk.fulfilled, (state, action) => {
      state.currentChallenge = action.payload;
    });
    builder.addCase(submitFlagThunk.pending, (state) => {
      state.submissionResult = null;
    });
    builder.addCase(submitFlagThunk.fulfilled, (state, action) => {
      state.submissionResult = action.payload;
    });
    builder.addCase(submitFlagThunk.rejected, (state, action) => {
      state.submissionResult = {
        error: action.payload || "Flag submission failed",
      };
    });
  },
});

export const { clearSubmissionResult, clearCurrentChallenge } =
  QuestionSlice.actions;
export const questionReducer = QuestionSlice.reducer;
