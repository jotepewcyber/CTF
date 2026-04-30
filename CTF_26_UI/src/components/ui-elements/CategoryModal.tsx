"use client";

import React from "react";
import { X } from "lucide-react";

export default function CategoryModal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 border border-emerald-500/30 rounded-2xl shadow-2xl w-full max-w-md p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 p-2 hover:bg-emerald-500/10 rounded-lg transition-colors"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={20} className="text-emerald-400" />
        </button>
        {children}
      </div>
    </div>
  );
}
