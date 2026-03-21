import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers } from "@/lib/apiClient";

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
