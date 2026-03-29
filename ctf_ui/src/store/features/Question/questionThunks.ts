import {
  createQuestions,
  deleteQuestion,
  getQuestionDetail,
  getQuestionsByCategory,
  submitFlag,
  updateQuestion,
  uploadChallengeFiles,
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

export const updateChallengeThunk = createAsyncThunk(
  "challenges/update",
  async (
    { challengeId, data }: { challengeId: number; data: any },
    { rejectWithValue },
  ) => {
    try {
      const res = await updateQuestion(challengeId, data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.detail || "Failed to update challenge",
      );
    }
  },
);

export const deleteChallengeThunk = createAsyncThunk(
  "challenges/delete",
  async (challengeId: number, { rejectWithValue }) => {
    try {
      await deleteQuestion(challengeId);
      return challengeId;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.detail || "Failed to delete challenge",
      );
    }
  },
);

export const uploadChallengeFilesThunk = createAsyncThunk(
  "challenges/uploadFiles",
  async (
    { challengeId, files }: { challengeId: number; files: File[] },
    { rejectWithValue },
  ) => {
    try {
      const res = await uploadChallengeFiles(challengeId, files);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.detail || "Failed to upload files",
      );
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
