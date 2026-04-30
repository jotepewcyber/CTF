"use client";

import { Plus } from "lucide-react";

export default function AddCategoryButton({
  isAdmin,
  onClick,
}: {
  isAdmin: boolean;
  onClick?: () => void;
}) {
  if (!isAdmin) return null;

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-200 active:scale-95"
    >
      <Plus size={18} />
      Add Category
    </button>
  );
}
