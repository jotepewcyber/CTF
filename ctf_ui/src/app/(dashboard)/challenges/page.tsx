"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import { fetchCategoriesThunk } from "@/store/features/Category/categoryThunks";
import AddCategoryButton from "@/components/ui-elements/AddCategoryButton";
import ChallengeCategory from "@/components/Challenges/ChallengeCategory";
import CategoryModal from "@/components/ui-elements/CategoryModal";
import AddCategoryForm from "@/components/Challenges/AddCategoryForm";
import EditCategoryForm from "@/components/Challenges/EditCategoryForm";
import { fetchMeThunk } from "@/store/features/Auth/authThunks";
import { fetchCompetitionInfoThunk } from "@/store/features/Competition/competitionThunks";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader } from "lucide-react";
import Lights from "@/components/Dashboard/dashboard";

export default function ChallengesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(
    (state: RootState) => state.category.categories,
  );
  const catLoading = useSelector((state: RootState) => state.category.loading);
  const user = useSelector((state: RootState) => state.auth.user);
  const isAdmin = user?.role === "admin";

  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const router = useRouter();
  const competition = useSelector((state: RootState) => state.competition.info);
  const competitionLoading = useSelector(
    (state: RootState) => state.competition.loading,
  );

  useEffect(() => {
    dispatch(fetchMeThunk());
    dispatch(fetchCategoriesThunk());
    dispatch(fetchCompetitionInfoThunk());
  }, [dispatch]);

  // Block if competition not running (ONLY for non-admins)
  useEffect(() => {
    // ✅ Admins can always access challenges
    if (isAdmin) {
      return;
    }

    // ✅ For regular users, block if competition not running
    if (!competitionLoading && competition) {
      const now = new Date();
      const start = new Date(competition.start_time);
      const end = new Date(competition.end_time);
      if (!competition.is_active || now < start) {
        router.replace("/competition?notstarted=1");
      } else if (now > end) {
        router.replace("/competition?ended=1");
      }
    }
  }, [isAdmin, competitionLoading, competition, router]);

  const handleEditCategory = (category: { id: number; name: string }) => {
    setSelectedCategory(category);
    setEditModalOpen(true);
  };

  // Show loading only for non-admins waiting for competition check
  if (!isAdmin && (competitionLoading || !competition)) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-slate-950/50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin mx-auto"></div>
          <p className="text-emerald-200 mt-4 font-semibold">
            Loading challenges...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen pt-15 md:pt-0">
      <Lights />

      <div className="relative w-full">
        {/* Header Section */}
        <div className="px-6 md:px-12 py-8 md:mt-4 md:mx-6 md:rounded-xl border-b md:border border-emerald-500/10 bg-linear-to-r from-slate-900/50 via-slate-900/30 to-slate-900/50 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-300">
                Challenges
              </h1>
              <p className="text-emerald-200/60 mt-2">
                {isAdmin
                  ? "Admin Panel - Manage all challenges"
                  : "Complete challenges to earn points"}
              </p>
            </div>
            <AddCategoryButton
              isAdmin={isAdmin}
              onClick={() => setModalOpen(true)}
            />
          </div>
        </div>

        {/* Admin Notice */}
        {isAdmin && competition && (
          <div className="px-6 md:px-12 py-4">
            <div className="max-w-4xl mx-auto p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-blue-300 text-sm">
                ℹ️ <span className="font-semibold">Admin Mode:</span> You can
                manage challenges even when the competition is not running.
              </p>
            </div>
          </div>
        )}

        {/* Add Category Modal */}
        <CategoryModal open={modalOpen} onClose={() => setModalOpen(false)}>
          <AddCategoryForm onSuccess={() => setModalOpen(false)} />
        </CategoryModal>

        {/* Edit Category Modal */}
        <CategoryModal
          open={editModalOpen}
          onClose={() => {
            setEditModalOpen(false);
            setSelectedCategory(null);
          }}
        >
          <EditCategoryForm
            onSuccess={() => setEditModalOpen(false)}
            category={selectedCategory}
          />
        </CategoryModal>

        {/* Categories Section */}
        <div className="px-6 md:px-12 py-8 md:py-12">
          {catLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader size={32} className="text-emerald-400 animate-spin" />
              <p className="text-emerald-200 mt-4">Loading categories...</p>
            </div>
          ) : categories.length === 0 ? (
            <div className="max-w-2xl mx-auto p-8 rounded-xl bg-slate-800/30 border border-emerald-500/20 text-center">
              <AlertCircle
                size={32}
                className="text-emerald-400 mx-auto mb-3"
              />
              <p className="text-emerald-200 font-medium">
                No categories available yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="space-y-6 max-w-4xl mx-auto">
              {categories.map((cat: any, idx: number) => (
                <ChallengeCategory
                  key={cat.id}
                  category={cat}
                  idx={idx}
                  isAdmin={isAdmin}
                  onEditCategory={handleEditCategory}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
