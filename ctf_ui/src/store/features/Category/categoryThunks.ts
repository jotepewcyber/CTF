import { createCategory, getCategories } from "@/lib/apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCategoriesThunk = createAsyncThunk(
  "categories/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getCategories();
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to fetch categories");
    }
  },
);

export const addCategoryThunk = createAsyncThunk(
  "categories/create",
  async (payload: { name: string }, { rejectWithValue }) => {
    try {
      const res = await createCategory(payload);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to add category");
    }
  },
);
