import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import ChallengeCard from "./ChallengeCard";
import AddQuestionModal from "./AddQuestionModal";
import { fetchChallengesByCategoryThunk } from "@/store/features/Question/questionThunks";
import ChallengeDetailModal from "./Questions/ChallengeDetailModal";

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
    <div className="mb-8 bg-white rounded-xl shadow-md">
      <div className="py-3 px-6 text-lg font-semibold flex items-center justify-between">
        <div>
          {idx + 1}. {category.name}
        </div>
        <div className="flex items-center gap-3">
          {isAdmin && (
            <>
              <button
                className="text-sm px-3 py-0.75 rounded border border-gray-400 bg-gray-50 hover:bg-blue-100 mr-2 transition"
                onClick={() => setModalOpen(true)}
              >
                + Add Question
              </button>
              <AddQuestionModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                categoryId={category.id}
              />
            </>
          )}
          <button
            aria-label="Expand"
            onClick={() => setOpen((v) => !v)}
            className="border-none bg-transparent text-xl cursor-pointer focus:outline-none ml-2"
          >
            {open ? "▲" : "▼"}
          </button>
        </div>
      </div>
      {open && (
        <div className="px-6 pb-6 flex flex-wrap">
          {loading ? (
            <div className="text-gray-500 py-4">Loading...</div>
          ) : error ? (
            <div className="text-red-600 flex items-center gap-2">
              Error: {error}
              <button
                className="ml-2 px-2 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200 border border-red-200"
                onClick={() =>
                  dispatch(fetchChallengesByCategoryThunk(category.id))
                }
              >
                Retry
              </button>
            </div>
          ) : loaded && challenges.length === 0 ? (
            <div className="italic opacity-80 py-4">
              No questions found. Questions coming soon!
            </div>
          ) : (
            challenges.map((c: Challenge) => (
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
            ))
          )}
          {/* Detail modal at the bottom so it overlays everything */}
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
