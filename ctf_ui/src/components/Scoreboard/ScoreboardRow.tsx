"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { Scoreboard } from "@/types/scoreboard";

interface ScoreboardRowProps extends Scoreboard {
  idx: number;
}

export default function ScoreboardRow({
  position,
  username,
  total_points,
  idx,
}: ScoreboardRowProps) {
  const getMedalColor = (pos: number) => {
    switch (pos) {
      case 1:
        return "bg-yellow-500/20 border-yellow-500/50";
      case 2:
        return "bg-slate-500/20 border-slate-500/50";
      case 3:
        return "bg-orange-500/20 border-orange-500/50";
      default:
        return "bg-emerald-500/5 border-emerald-500/20";
    }
  };

  const getMedalEmoji = (pos: number) => {
    switch (pos) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return null;
    }
  };

  const isTopThree = position <= 3;

  return (
    <motion.tr
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: idx * 0.05 }}
      className={`border-b border-emerald-500/10 hover:bg-emerald-500/5 transition-all ${getMedalColor(position)}`}
    >
      {/* Rank */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          {isTopThree ? (
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                position === 1
                  ? "bg-yellow-500"
                  : position === 2
                    ? "bg-slate-500"
                    : "bg-orange-500"
              }`}
            >
              {getMedalEmoji(position)}
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-emerald-500/20 text-emerald-300 font-bold">
              {position}
            </div>
          )}
        </div>
      </td>

      {/* Username */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white bg-linear-to-r ${
              position === 1
                ? "from-yellow-500 to-amber-500"
                : position === 2
                  ? "from-slate-400 to-slate-600"
                  : position === 3
                    ? "from-orange-400 to-orange-600"
                    : "from-emerald-500 to-teal-500"
            }`}
          >
            {username.charAt(0).toUpperCase()}
          </div>
          <span
            className={`font-semibold ${
              isTopThree ? "text-emerald-300" : "text-emerald-200/80"
            }`}
          >
            {username}
          </span>
        </div>
      </td>

      {/* Points */}
      <td className="px-6 py-4 text-right">
        <span
          className={`font-bold px-3 py-1 rounded-full ${
            position === 1
              ? "bg-yellow-500/20 text-yellow-400"
              : position === 2
                ? "bg-slate-500/20 text-slate-300"
                : position === 3
                  ? "bg-orange-500/20 text-orange-400"
                  : "bg-emerald-500/20 text-emerald-400"
          }`}
        >
          {total_points}
        </span>
      </td>

      {/* Status */}
      <td className="px-6 py-4 text-right">
        {isTopThree ? (
          <span className="text-yellow-400 font-semibold text-sm flex items-center justify-end gap-1">
            <Trophy className="w-4 h-4" />
            Top {position}
          </span>
        ) : (
          <span className="text-emerald-200/60 text-sm">#Rank {position}</span>
        )}
      </td>
    </motion.tr>
  );
}
