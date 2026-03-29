"use client";

import { Trophy, Lock, Edit2, Trash2 } from "lucide-react";

type Props = {
  id: number;
  name: string;
  level: string;
  points: number;
  onClick?: () => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  isAdmin?: boolean;
};

const levelColors = {
  Easy: {
    bg: "bg-green-500/10",
    border: "border-green-500/30",
    text: "text-green-400",
    badge: "bg-green-500/20",
  },
  Medium: {
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/30",
    text: "text-yellow-400",
    badge: "bg-yellow-500/20",
  },
  Hard: {
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    text: "text-red-400",
    badge: "bg-red-500/20",
  },
};

export default function ChallengeCard({
  id,
  name,
  level,
  points,
  onClick,
  onEdit,
  onDelete,
  isAdmin,
}: Props) {
  const colors =
    levelColors[level as keyof typeof levelColors] || levelColors.Easy;

  return (
    <div
      className={`w-full p-5 rounded-lg border-2 transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/50 hover:border-emerald-500/50 active:scale-95 text-left group ${colors.bg} ${colors.border}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 flex-1">
          <Lock size={14} className={`${colors.text} shrink-0`} />
          <span
            className={`text-xs font-black uppercase tracking-wider ${colors.text}`}
          >
            {level}
          </span>
        </div>
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 group-hover:border-emerald-500/40 transition-colors">
          <Trophy size={12} className="text-emerald-400" />
          <span className="text-xs font-bold text-emerald-300">{points}</span>
        </div>
      </div>

      {/* Challenge Name */}
      <button
        onClick={onClick}
        className="w-full text-left hover:opacity-80 transition-opacity"
      >
        <h3 className="text-base font-bold text-emerald-100 group-hover:text-emerald-300 transition-colors line-clamp-2">
          {name}
        </h3>

        {/* Hover Indicator */}
        <div className="mt-3 h-0.5 w-0 bg-linear-to-r from-emerald-400 to-teal-400 group-hover:w-full transition-all duration-300"></div>
      </button>

      {/* Admin Actions */}
      {isAdmin && (
        <div className="flex gap-2 mt-4 pt-4 border-t border-emerald-500/10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(id);
            }}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/30 hover:border-blue-500/50 hover:bg-blue-500/20 text-blue-300 text-xs font-semibold transition-all duration-200 active:scale-95"
            title="Edit Challenge"
          >
            <Edit2 size={14} />
            <span className="hidden sm:inline">Edit</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(id);
            }}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/30 hover:border-red-500/50 hover:bg-red-500/20 text-red-300 text-xs font-semibold transition-all duration-200 active:scale-95"
            title="Delete Challenge"
          >
            <Trash2 size={14} />
            <span className="hidden sm:inline">Delete</span>
          </button>
        </div>
      )}
    </div>
  );
}
