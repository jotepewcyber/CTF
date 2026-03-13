import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./features/Auth/authSlice";
import { categoryReducer } from "./features/Category/categorySlice";
import { questionReducer } from "./features/Question/questionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    question: questionReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
