"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import { fetchCategoriesThunk } from "@/store/features/Category/categoryThunks";
import AddCategoryButton from "@/components/ui-elements/AddCategoryButton";
import ChallengeCategory from "@/components/Challenges/ChallengeCategory";

export default function ChallengesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(
    (state: RootState) => state.category.categories,
  );
  const catLoading = useSelector((state: RootState) => state.category.loading);
  // Optionally, get role from user
  // const user = useSelector((state: RootState) => state.auth.user);
  // const isAdmin = user?.role === "admin";
  const isAdmin = true; // <-- Change based on your logic

  useEffect(() => {
    dispatch(fetchCategoriesThunk());
  }, [dispatch]);

  return (
    <div
      style={{
        padding: "36px 38px 16px 38px",
        background: "#fcfcff",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <AddCategoryButton isAdmin={isAdmin} />
      </div>
      <div>
        {catLoading ? (
          <div>Loading Categories...</div>
        ) : (
          categories.map((cat: any, idx: number) => (
            <ChallengeCategory
              key={cat.id}
              category={cat}
              idx={idx}
              isAdmin={isAdmin}
            />
          ))
        )}
      </div>
    </div>
  );
}
