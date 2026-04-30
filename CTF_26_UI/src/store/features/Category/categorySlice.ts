import { createSlice } from "@reduxjs/toolkit";
import { addCategoryThunk, fetchCategoriesThunk } from "./categoryThunks";

type Category = {
  id: string;
  name: string;
};
interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}
const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoriesThunk.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategoriesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder.addCase(addCategoryThunk.fulfilled, (state, action) => {
      state.categories.push(action.payload);
    });
  },
});

export const categoryReducer = categorySlice.reducer;
