import {
  createQuestions,
  getQuestionDetail,
  getQuestionsByCategory,
  submitFlag,
} from "@/lib/apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchChallengesByCategoryThunk = createAsyncThunk(
  "challenges/fetchByCategory",
  async (categoryId: number, { rejectWithValue }) => {
    try {
      const res = await getQuestionsByCategory(categoryId);
      return { categoryId, challenges: res.data };
    } catch (err: any) {
      return rejectWithValue({
        categoryId,
        error: err.message || "Failed to fetch challenges",
      });
    }
  },
);

export const fetchChallengeDetailThunk = createAsyncThunk(
  "challenges/fetchDetail",
  async (challengeId: number, { rejectWithValue }) => {
    try {
      const res = await getQuestionDetail(challengeId);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to fetch challenge detail");
    }
  },
);

// ADMIN: create challenge
export const createChallengeThunk = createAsyncThunk(
  "challenges/create",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await createQuestions(data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to create challenge");
    }
  },
);

// SUBMIT FLAG
export const submitFlagThunk = createAsyncThunk(
  "challenges/submitFlag",
  async (
    payload: { challengeId: number; flag: string },
    { rejectWithValue },
  ) => {
    try {
      const res = await submitFlag(payload.challengeId, payload.flag);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data || err.message || "Flag submission failed",
      );
    }
  },
);
