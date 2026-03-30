import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers, updateUser, deleteUser } from "@/lib/apiClient";

export const fetchUsersThunk = createAsyncThunk(
  "users/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getUsers();
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to fetch users");
    }
  },
);

export const updateUserThunk = createAsyncThunk(
  "users/update",
  async (
    { userId, data }: { userId: number; data: any },
    { rejectWithValue },
  ) => {
    try {
      const res = await updateUser(userId, data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.detail || "Failed to update user",
      );
    }
  },
);

export const deleteUserThunk = createAsyncThunk(
  "users/delete",
  async (userId: number, { rejectWithValue }) => {
    try {
      await deleteUser(userId);
      return userId;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.detail || "Failed to delete user",
      );
    }
  },
);
