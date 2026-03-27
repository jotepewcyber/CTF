"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";
import {
  addCategoryThunk,
  fetchCategoriesThunk,
} from "@/store/features/Category/categoryThunks";
import { Plus } from "lucide-react";

export default function AddCategoryForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await dispatch(addCategoryThunk({ name }));
      if (addCategoryThunk.fulfilled.match(res)) {
        setName("");
        onSuccess();
        dispatch(fetchCategoriesThunk());
      } else {
        setError(
          typeof res.payload === "string"
            ? res.payload
            : "Failed to add category",
        );
      }
    } catch (err: any) {
      setError(err.message || "Failed to add category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-300">
          New Category
        </h2>
      </div>

      {/* Divider */}
      <div className="h-px bg-linear-to-r from-transparent via-emerald-500/20 to-transparent"></div>

      {/* Input Field */}
      <div>
        <label className="block text-sm font-semibold text-emerald-200 mb-2">
          Category Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={loading}
          placeholder="e.g., Web Security"
          className="w-full px-4 py-2.5 rounded-lg bg-slate-800/50 border border-emerald-500/20 text-emerald-100 placeholder-emerald-400/30 focus:border-emerald-500/50 focus:outline-none transition-colors disabled:opacity-50"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
          <p className="text-red-300 text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Divider */}
      <div className="h-px bg-linear-to-r from-transparent via-emerald-500/20 to-transparent"></div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || !name.trim()}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-linear-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:shadow-lg hover:shadow-emerald-500/50 disabled:opacity-50 transition-all duration-200"
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Adding...
          </>
        ) : (
          <>
            <Plus size={18} />
            Add Category
          </>
        )}
      </button>
    </form>
  );
}
