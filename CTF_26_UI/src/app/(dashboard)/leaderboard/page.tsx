"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import { fetchScoreboardThunk } from "@/store/features/Scoreboard/scoreboardThunks";
import ScoreboardTable from "@/components/Scoreboard/ScoreboardTable";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import Lights from "@/components/Dashboard/dashboard";

export default function LeaderboardPage() {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.scoreboard.users);
  const loading = useSelector((state: RootState) => state.scoreboard.loading);
  const error = useSelector((state: RootState) => state.scoreboard.error);

  useEffect(() => {
    dispatch(fetchScoreboardThunk());
  }, [dispatch]);

  return (
    <div className="relative w-full min-h-screen bg-black text-white">
      {/* Lights Background - Fixed */}
      <div className="fixed inset-0 z-0 w-screen h-screen pointer-events-none">
        <Lights />
      </div>

      {/* Dark Overlay */}
      <div className="fixed inset-0 z-5 bg-black/20 pointer-events-none" />

      {/* Content - Relative Z-10 */}
      <div className="relative z-10 w-full py-20 px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Trophy className="w-10 h-10 text-yellow-400" />
            <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-linear-to-r from-emerald-400 via-teal-300 to-emerald-400">
              Live Leaderboard
            </h1>
            <Trophy className="w-10 h-10 text-yellow-400" />
          </div>
          <p className="text-emerald-200/80 text-lg max-w-2xl mx-auto">
            Real-time rankings of top performers in Cognitia'26
          </p>
        </motion.div>

        {/* Content */}
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin mb-4" />
              <p className="text-emerald-200/80">Loading leaderboard...</p>
            </motion.div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-xl bg-red-500/10 border border-red-500/30"
            >
              <p className="text-red-300 font-semibold">
                ❌ Failed to load leaderboard: {error}
              </p>
            </motion.div>
          ) : (
            <ScoreboardTable users={users} />
          )}
        </div>
      </div>
    </div>
  );
}
