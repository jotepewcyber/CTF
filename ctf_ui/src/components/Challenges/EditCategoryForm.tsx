"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";
import {
  updateCategoryThunk,
  fetchCategoriesThunk,
  deleteCategoryThunk,
} from "@/store/features/Category/categoryThunks";
import { Trash2 } from "lucide-react";

export default function EditCategoryForm({
  onSuccess,
  category,
}: {
  onSuccess: () => void;
  category: { id: number; name: string } | null;
}) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  // Prefill form when category changes
  useEffect(() => {
    if (category) {
      setName(category.name || "");
      setError("");
      setShowDeleteConfirm(false);
    }
  }, [category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category) return;

    setError("");
    setLoading(true);

    try {
      const res = await dispatch(
        updateCategoryThunk({
          categoryId: category.id,
          data: { name },
        }),
      );

      if (updateCategoryThunk.fulfilled.match(res)) {
        onSuccess();
        dispatch(fetchCategoriesThunk());
      } else {
        setError(
          typeof res.payload === "string"
            ? res.payload
            : "Failed to update category",
        );
      }
    } catch (err: any) {
      setError(err.message || "Failed to update category");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!category) return;

    setError("");
    setLoading(true);

    try {
      const res = await dispatch(deleteCategoryThunk(category.id));

      if (deleteCategoryThunk.fulfilled.match(res)) {
        onSuccess();
        dispatch(fetchCategoriesThunk());
      } else {
        setError(
          typeof res.payload === "string"
            ? res.payload
            : "Failed to delete category",
        );
      }
    } catch (err: any) {
      setError(err.message || "Failed to delete category");
    } finally {
      setLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  if (!category) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300">
          Edit Category
        </h2>
      </div>

      {/* Divider */}
      <div className="h-px bg-linear-to-r from-transparent via-blue-500/20 to-transparent"></div>

      {/* Input Field */}
      <div>
        <label className="block text-sm font-semibold text-blue-200 mb-2">
          Category Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={loading}
          placeholder="e.g., Web Security"
          className="w-full px-4 py-2.5 rounded-lg bg-slate-800/50 border border-blue-500/20 text-blue-100 placeholder-blue-400/30 focus:border-blue-500/50 focus:outline-none transition-colors disabled:opacity-50"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
          <p className="text-red-300 text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 space-y-3">
          <p className="text-red-300 text-sm font-medium">
            Are you sure you want to delete this category? All challenges in
            this category will also be deleted.
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              className="flex-1 px-3 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors disabled:opacity-50"
            >
              {loading ? "Deleting..." : "Yes, Delete"}
            </button>
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(false)}
              disabled={loading}
              className="flex-1 px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="h-px bg-linear-to-r from-transparent via-blue-500/20 to-transparent"></div>

      {/* Button Group */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading || !name.trim()}
          className="flex-1 px-4 py-3 rounded-lg bg-linear-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 disabled:opacity-50 transition-all duration-200 active:scale-95"
        >
          {loading ? "Updating..." : "Update Category"}
        </button>
        <button
          type="button"
          onClick={() => setShowDeleteConfirm(true)}
          disabled={loading}
          className="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 hover:border-red-500/50 hover:bg-red-500/20 text-red-300 font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50"
          title="Delete Category"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </form>
  );
}
