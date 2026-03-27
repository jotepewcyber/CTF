"use client";

import { AlertTriangle, X } from "lucide-react";

type DeleteConfirmationProps = {
  onConfirm: () => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
};

export default function DeleteConfirmation({
  onConfirm,
  onCancel,
  loading = false,
}: DeleteConfirmationProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className="relative bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 border border-red-500/30 rounded-2xl shadow-2xl w-full max-w-sm p-8 space-y-6">
        {/* Close Button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-2 hover:bg-red-500/10 rounded-lg transition-colors"
        >
          <X size={20} className="text-red-400" />
        </button>

        {/* Icon & Title */}
        <div className="flex flex-col items-center gap-4">
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
            <AlertTriangle size={32} className="text-red-400" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-black text-red-400">
              Delete Competition?
            </h3>
            <p className="text-sm text-emerald-200/60 mt-2">
              This action cannot be undone. All competition data will be
              permanently deleted.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-linear-to-r from-transparent via-red-500/20 to-transparent"></div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 px-4 py-2.5 rounded-lg bg-slate-700/50 text-emerald-200 hover:bg-slate-700 border border-slate-600 transition-all duration-200 disabled:opacity-50"
          >
            Keep It
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 px-4 py-2.5 rounded-lg bg-linear-to-r from-red-600 to-red-500 text-white font-semibold hover:shadow-lg hover:shadow-red-500/50 disabled:opacity-50 transition-all duration-200"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
