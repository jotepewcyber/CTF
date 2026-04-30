import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "@/lib/apiClient";
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

export const updateCategoryThunk = createAsyncThunk(
  "categories/update",
  async (
    { categoryId, data }: { categoryId: number; data: { name: string } },
    { rejectWithValue },
  ) => {
    try {
      const res = await updateCategory(categoryId, data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to update category");
    }
  },
);

export const deleteCategoryThunk = createAsyncThunk(
  "categories/delete",
  async (categoryId: number, { rejectWithValue }) => {
    try {
      await deleteCategory(categoryId);
      return categoryId;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to delete category");
    }
  },
);
