import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import {
  fetchChallengeDetailThunk,
  submitFlagThunk,
} from "@/store/features/Question/questionThunks";
import {
  clearCurrentChallenge,
  clearSubmissionResult,
} from "@/store/features/Question/questionSlice";

export default function ChallengeDetailModal({
  open,
  onClose,
  challengeId,
}: {
  open: boolean;
  onClose: () => void;
  challengeId: number | null;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const challenge = useSelector(
    (state: RootState) => state.question.currentChallenge,
  );
  const [flag, setFlag] = useState("");
  const [error, setError] = useState("");
  const submissionResult = useSelector(
    (state: RootState) => state.question.submissionResult,
  );

  useEffect(() => {
    if (open && challengeId) {
      dispatch(fetchChallengeDetailThunk(challengeId));
      dispatch(clearSubmissionResult());
    }
    if (!open) {
      dispatch(clearCurrentChallenge());
      setFlag("");
      setError("");
    }
  }, [open, challengeId, dispatch]);

  if (!open || !challengeId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
      <div className="relative rounded-lg bg-white px-8 py-7 min-w-87.5 max-w-[95vw] shadow-lg">
        <button
          className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-red-500 transition-colors"
          onClick={onClose}
        >
          &times;
        </button>
        {!challenge ? (
          <div className="text-center text-gray-600 py-4">Loading...</div>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-2">{challenge.name}</h2>
            <div className="mb-1">
              <b>Description:</b> {challenge.description}
            </div>
            <div className="mb-1">
              <b>Hint:</b> {challenge.hint}
            </div>
            <div className="mb-1">
              <b>URL:</b>{" "}
              <a
                href={challenge.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800"
              >
                {challenge.url}
              </a>
            </div>
            <div className="mb-1">
              <b>Level:</b> {challenge.level}
            </div>
            <div className="mb-1">
              <b>Points:</b> {challenge.points}
            </div>
            {typeof challenge.solved_count !== "undefined" && (
              <div className="mb-2">
                <b>Solved Count:</b> {challenge.solved_count}
              </div>
            )}
            <form
              className="mt-4 flex flex-col sm:flex-row gap-2 items-start"
              onSubmit={(e) => {
                e.preventDefault();
                setError("");
                dispatch(submitFlagThunk({ challengeId, flag }))
                  .unwrap()
                  .then(() => setFlag(""))
                  .catch((err) =>
                    setError(err?.toString() || "Incorrect flag"),
                  );
              }}
            >
              <input
                type="text"
                placeholder="Your flag"
                value={flag}
                onChange={(e) => setFlag(e.target.value)}
                required
                className="px-3 py-2 border border-gray-300 rounded w-full sm:w-auto"
              />
              <button
                type="submit"
                className="px-5 py-2 rounded bg-green-600 hover:bg-green-700 text-white font-semibold"
              >
                Submit Flag
              </button>
            </form>
            {error && <div className="text-red-600 mt-2">{error}</div>}
            {submissionResult && (
              <div
                className={`mt-2 font-medium ${submissionResult.correct ? "text-green-700" : "text-red-600"}`}
              >
                {submissionResult.message ||
                  (submissionResult.correct
                    ? "Correct flag!"
                    : "Incorrect flag")}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
