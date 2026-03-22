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
import { fetchCompetitionInfoThunk } from "@/store/features/Competition/competitionThunks";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const competition = useSelector((state: RootState) => state.competition.info);
  const competitionLoading = useSelector(
    (state: RootState) => state.competition.loading,
  );
  // const competitionError = useSelector(
  //   (state: RootState) => state.competition.error,
  // );

  useEffect(() => {
    dispatch(fetchMeThunk());
    dispatch(fetchCategoriesThunk());
    dispatch(fetchCompetitionInfoThunk());
  }, [dispatch]);

  // Block if competition not running
  useEffect(() => {
    if (!competitionLoading && competition) {
      const now = new Date();
      const start = new Date(competition.start_time);
      const end = new Date(competition.end_time);
      if (!competition.is_active || now < start) {
        // Option 1: Redirect
        router.replace("/competition?notstarted=1");
        // Option 2: To just show a message, set a local error state instead
      } else if (now > end) {
        router.replace("/competition?ended=1");
      }
    }
  }, [competition, competitionLoading, router]);

  if (competitionLoading || !competition)
    return <div>Loading competition status...</div>;

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
