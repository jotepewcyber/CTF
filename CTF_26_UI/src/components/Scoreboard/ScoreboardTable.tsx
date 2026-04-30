"use client";

import { motion } from "framer-motion";
import ScoreboardRow from "./ScoreboardRow";

type Props = {
  users: { username: string; total_points: number }[];
};

export default function ScoreboardTable({ users }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="rounded-xl overflow-hidden border border-emerald-500/20 bg-black/40 backdrop-blur-sm"
    >
      {/* Stats Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-linear-to-r from-emerald-500/10 to-teal-500/10 border-b border-emerald-500/20">
        <div className="text-center">
          <p className="text-emerald-200/70 text-sm mb-1">Total Participants</p>
          <p className="text-3xl font-black text-emerald-400">{users.length}</p>
        </div>
        <div className="text-center">
          <p className="text-emerald-200/70 text-sm mb-1">Top Score</p>
          <p className="text-3xl font-black text-yellow-400">
            {users.length > 0 ? users[0].total_points : 0}
          </p>
        </div>
        <div className="text-center">
          <p className="text-emerald-200/70 text-sm mb-1">Average Score</p>
          <p className="text-3xl font-black text-teal-400">
            {users.length > 0
              ? Math.round(
                  users.reduce((sum, u) => sum + u.total_points, 0) /
                    users.length,
                )
              : 0}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-emerald-500/20 bg-emerald-500/5">
              <th className="px-6 py-4 text-left text-emerald-300 font-bold text-sm">
                Rank
              </th>
              <th className="px-6 py-4 text-left text-emerald-300 font-bold text-sm">
                Username
              </th>
              <th className="px-6 py-4 text-right text-emerald-300 font-bold text-sm">
                Points
              </th>
              <th className="px-6 py-4 text-right text-emerald-300 font-bold text-sm">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, idx) => (
                <ScoreboardRow
                  key={user.username}
                  position={idx + 1}
                  username={user.username}
                  total_points={user.total_points}
                  idx={idx}
                />
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center">
                  <p className="text-emerald-200/50">
                    No participants yet. Be the first!
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-emerald-500/5 border-t border-emerald-500/20 text-center">
        <p className="text-emerald-200/70 text-sm">
          🔄 Leaderboard updates in real-time
        </p>
      </div>
    </motion.div>
  );
}
