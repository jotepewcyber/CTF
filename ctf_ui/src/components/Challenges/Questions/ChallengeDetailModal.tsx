"use client";

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
import { X, Trophy, Lock, Link2, CheckCircle, XCircle } from "lucide-react";

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
  const [submitting, setSubmitting] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await dispatch(
        submitFlagThunk({ challengeId: challengeId!, flag }),
      ).unwrap();
      setFlag("");
    } catch (err: any) {
      setError(err?.toString() || "Incorrect flag");
    } finally {
      setSubmitting(false);
    }
  };

  if (!open || !challengeId) return null;

  const levelColors = {
    Easy: "text-green-400",
    Medium: "text-yellow-400",
    Hard: "text-red-400",
  };

  const levelBg = {
    Easy: "bg-green-500/10 border-green-500/30",
    Medium: "bg-yellow-500/10 border-yellow-500/30",
    Hard: "bg-red-500/10 border-red-500/30",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 border border-emerald-500/30 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-emerald-500/10 rounded-lg transition-colors z-10 bg-slate-800/50"
          aria-label="Close"
        >
          <X size={20} className="text-emerald-400" />
        </button>

        {!challenge ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-8 h-8 border-3 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin"></div>
            <p className="text-emerald-200 mt-4">Loading challenge...</p>
          </div>
        ) : (
          <div className="p-8 space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-3">
                <h2 className="text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-300 flex-1">
                  {challenge.name}
                </h2>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 shrink-0">
                  <Trophy size={16} className="text-emerald-400" />
                  <span className="text-sm font-bold text-emerald-300">
                    {challenge.points} pts
                  </span>
                </div>
              </div>

              {/* Level Badge */}
              <div
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${
                  levelBg[challenge.level as keyof typeof levelBg]
                }`}
              >
                <Lock size={14} />
                <span
                  className={`text-sm font-semibold ${
                    levelColors[challenge.level as keyof typeof levelColors]
                  }`}
                >
                  {challenge.level}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-linear-to-r from-transparent via-emerald-500/20 to-transparent"></div>

            {/* Challenge Details */}
            <div className="space-y-4">
              {/* Description */}
              <div>
                <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                  Description
                </h3>
                <p className="text-emerald-100/80 leading-relaxed">
                  {challenge.description}
                </p>
              </div>

              {/* Hint */}
              {challenge.hint && (
                <div>
                  <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                    Hint
                  </h3>
                  <p className="text-emerald-100/80 italic border-l-2 border-emerald-500/30 pl-3">
                    {challenge.hint}
                  </p>
                </div>
              )}

              {/* URL */}
              {challenge.url && (
                <div>
                  <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                    Challenge URL
                  </h3>
                  <a
                    href={challenge.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/40 text-emerald-300 hover:text-emerald-200 transition-colors group"
                  >
                    <Link2 size={16} />
                    <span className="underline group-hover:no-underline">
                      Open Challenge
                    </span>
                  </a>
                </div>
              )}

              {/* Solved Count */}
              {typeof challenge.solved_count !== "undefined" && (
                <div className="p-3 rounded-lg bg-slate-800/30 border border-emerald-500/10">
                  <p className="text-sm text-emerald-200/70">
                    <span className="font-semibold">Solved by:</span>{" "}
                    <span className="text-emerald-400 font-bold">
                      {challenge.solved_count}
                    </span>{" "}
                    player{challenge.solved_count !== 1 ? "s" : ""}
                  </p>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="h-px bg-linear-to-r from-transparent via-emerald-500/20 to-transparent"></div>

            {/* Flag Submission */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                  Submit Flag
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="flag{...}"
                    value={flag}
                    onChange={(e) => setFlag(e.target.value)}
                    required
                    disabled={submitting}
                    className="flex-1 px-4 py-2.5 rounded-lg bg-slate-800/50 border border-emerald-500/20 text-emerald-100 placeholder-emerald-400/30 focus:border-emerald-500/50 focus:outline-none transition-colors font-mono disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={submitting || !flag.trim()}
                    className="px-6 py-2.5 rounded-lg bg-linear-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:shadow-lg hover:shadow-emerald-500/50 disabled:opacity-50 transition-all duration-200 active:scale-95 whitespace-nowrap"
                  >
                    {submitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </span>
                    ) : (
                      "Submit Flag"
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-3">
                  <XCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
                  <p className="text-red-300 text-sm font-medium">{error}</p>
                </div>
              )}

              {/* Submission Result */}
              {submissionResult && (
                <div
                  className={`p-3 rounded-lg border flex items-start gap-3 ${
                    submissionResult.correct
                      ? "bg-green-500/10 border-green-500/30"
                      : "bg-red-500/10 border-red-500/30"
                  }`}
                >
                  {submissionResult.correct ? (
                    <>
                      <CheckCircle
                        size={18}
                        className="text-green-400 shrink-0 mt-0.5"
                      />
                      <p className="text-green-300 text-sm font-medium">
                        {submissionResult.message ||
                          "🎉 Correct flag! Well done!"}
                      </p>
                    </>
                  ) : (
                    <>
                      <XCircle
                        size={18}
                        className="text-red-400 shrink-0 mt-0.5"
                      />
                      <p className="text-red-300 text-sm font-medium">
                        {submissionResult.message ||
                          "❌ Incorrect flag. Try again!"}
                      </p>
                    </>
                  )}
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
