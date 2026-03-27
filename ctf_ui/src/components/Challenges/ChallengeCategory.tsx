"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import ChallengeCard from "./ChallengeCard";
import AddQuestionModal from "./AddQuestionModal";
import { fetchChallengesByCategoryThunk } from "@/store/features/Question/questionThunks";
import ChallengeDetailModal from "./Questions/ChallengeDetailModal";
import { ChevronDown, Plus, AlertCircle } from "lucide-react";

type Challenge = {
  id: number;
  name: string;
  level: string;
  points: number;
};

type Props = {
  category: { id: number; name: string };
  idx: number;
  isAdmin?: boolean;
};

const EMPTY: Challenge[] = [];

export default function ChallengeCategory({ category, idx, isAdmin }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedChallengeId, setSelectedChallengeId] = useState<number | null>(
    null,
  );

  const challenges = useSelector(
    (state: RootState) => state.question.challenges[category.id] || EMPTY,
  );
  const loading = useSelector(
    (state: RootState) => state.question.loading[category.id],
  );
  const loaded = useSelector(
    (state: RootState) => state.question.loaded[category.id],
  );
  const error = useSelector(
    (state: RootState) => state.question.error[category.id],
  );

  useEffect(() => {
    if (open && !loading && !loaded) {
      dispatch(fetchChallengesByCategoryThunk(category.id));
    }
  }, [open, category.id, loading, loaded, dispatch]);

  return (
    <div className="rounded-xl bg-linear-to-br from-slate-900/50 to-slate-800/50 border border-emerald-500/20 overflow-hidden hover:border-emerald-500/40 transition-all duration-200">
      {/* Category Header */}
      <div className="px-6 py-4 flex items-center justify-between hover:bg-emerald-500/5 transition-colors group">
        {/* Left Side - Category Info */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-4 flex-1 text-left hover:opacity-80 transition-opacity"
        >
          <span className="text-emerald-400 font-black text-lg">{idx + 1}</span>
          <h3 className="text-lg font-semibold text-emerald-100 group-hover:text-emerald-300 transition-colors">
            {category.name}
          </h3>
        </button>

        {/* Right Side - Actions */}
        <div className="flex items-center gap-3 ml-4">
          {isAdmin && (
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 hover:border-emerald-500/50 hover:bg-emerald-500/20 text-sm font-semibold transition-all duration-200 active:scale-95"
              title="Add Challenge"
            >
              <Plus size={14} />
              <span className="hidden sm:inline">Add</span>
            </button>
          )}
          <button
            onClick={() => setOpen((v) => !v)}
            className="p-1 hover:bg-emerald-500/10 rounded-lg transition-colors"
            aria-label={open ? "Collapse" : "Expand"}
          >
            <ChevronDown
              size={20}
              className={`text-emerald-400 transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Add Question Modal */}
      <AddQuestionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        categoryId={category.id}
      />

      {/* Category Content */}
      {open && (
        <div className="px-6 py-6 border-t border-emerald-500/10 bg-slate-900/30">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-5 h-5 border-2 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin"></div>
              <p className="ml-3 text-emerald-200">Loading challenges...</p>
            </div>
          ) : error ? (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-3">
              <AlertCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-red-300 text-sm font-medium">{error}</p>
                <button
                  onClick={() =>
                    dispatch(fetchChallengesByCategoryThunk(category.id))
                  }
                  className="mt-2 px-3 py-1 text-xs rounded bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors active:scale-95"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : loaded && challenges.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-emerald-200/60 text-sm">
                No challenges yet. More coming soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {challenges.map((c: Challenge) => (
                <ChallengeCard
                  key={c.id}
                  name={c.name}
                  level={c.level}
                  points={c.points}
                  onClick={() => {
                    setSelectedChallengeId(c.id);
                    setDetailModalOpen(true);
                  }}
                />
              ))}
            </div>
          )}

          {/* Detail Modal */}
          <ChallengeDetailModal
            open={detailModalOpen}
            onClose={() => {
              setDetailModalOpen(false);
              setSelectedChallengeId(null);
            }}
            challengeId={selectedChallengeId}
          />
        </div>
      )}
    </div>
  );
}
