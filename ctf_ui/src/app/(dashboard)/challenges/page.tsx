"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import { fetchCategoriesThunk } from "@/store/features/Category/categoryThunks";
import AddCategoryButton from "@/components/ui-elements/AddCategoryButton";
import ChallengeCategory from "@/components/Challenges/ChallengeCategory";
import CategoryModal from "@/components/ui-elements/CategoryModal";
import AddCategoryForm from "@/components/Challenges/AddCategoryForm";
import { fetchMeThunk } from "@/store/features/Auth/authThunks";

export default function ChallengesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(
    (state: RootState) => state.category.categories,
  );
  const catLoading = useSelector((state: RootState) => state.category.loading);
  const user = useSelector((state: RootState) => state.auth.user);
  const isAdmin = user?.role === "admin";
  console.log("ChallengesPage rendered", { categories, catLoading, isAdmin });
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchMeThunk());
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
        <AddCategoryButton
          isAdmin={isAdmin}
          onClick={() => setModalOpen(true)}
        />
      </div>
      <CategoryModal open={modalOpen} onClose={() => setModalOpen(false)}>
        <AddCategoryForm onSuccess={() => setModalOpen(false)} />
      </CategoryModal>
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
