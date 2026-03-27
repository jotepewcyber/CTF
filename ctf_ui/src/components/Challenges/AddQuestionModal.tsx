"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";
import {
  createChallengeThunk,
  fetchChallengesByCategoryThunk,
} from "@/store/features/Question/questionThunks";
import { X } from "lucide-react";

export default function AddQuestionModal({
  open,
  onClose,
  categoryId,
}: {
  open: boolean;
  onClose: () => void;
  categoryId: number;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const [form, setForm] = useState({
    name: "",
    description: "",
    hint: "",
    url: "",
    level: "Easy",
    points: 100,
    flag: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const payload = {
        ...form,
        category: categoryId,
        points: Number(form.points) || 0,
      };
      const res = await dispatch(createChallengeThunk(payload));
      if (createChallengeThunk.fulfilled.match(res)) {
        setForm({
          name: "",
          description: "",
          hint: "",
          url: "",
          level: "Easy",
          points: 100,
          flag: "",
        });
        dispatch(fetchChallengesByCategoryThunk(categoryId));
        onClose();
      } else {
        setError(
          typeof res.payload === "string"
            ? res.payload
            : "Failed to add question",
        );
      }
    } catch (err: any) {
      setError(err.message || "Failed to add question");
    }
    setLoading(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 border border-emerald-500/30 rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-emerald-500/10 rounded-lg transition-colors"
          aria-label="Close"
        >
          <X size={20} className="text-emerald-400" />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-black text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-300 mb-6">
          Add New Challenge
        </h2>

        {/* Divider */}
        <div className="h-px bg-linear-to-r from-transparent via-emerald-500/20 to-transparent mb-6"></div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1.5">
              Challenge Name
            </label>
            <input
              name="name"
              type="text"
              placeholder="e.g., SQL Injection Basics"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-lg bg-slate-800/50 border border-emerald-500/20 text-emerald-100 placeholder-emerald-400/30 focus:border-emerald-500/50 focus:outline-none transition-colors"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1.5">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Challenge description..."
              value={form.description}
              onChange={handleChange}
              rows={3}
              required
              className="w-full px-4 py-2.5 rounded-lg bg-slate-800/50 border border-emerald-500/20 text-emerald-100 placeholder-emerald-400/30 focus:border-emerald-500/50 focus:outline-none transition-colors resize-none"
            />
          </div>

          {/* Hint */}
          <div>
            <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1.5">
              Hint (Optional)
            </label>
            <input
              name="hint"
              type="text"
              placeholder="Helpful hint..."
              value={form.hint}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-800/50 border border-emerald-500/20 text-emerald-100 placeholder-emerald-400/30 focus:border-emerald-500/50 focus:outline-none transition-colors"
            />
          </div>

          {/* URL */}
          <div>
            <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1.5">
              Challenge URL
            </label>
            <input
              name="url"
              type="url"
              placeholder="https://..."
              value={form.url}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-800/50 border border-emerald-500/20 text-emerald-100 placeholder-emerald-400/30 focus:border-emerald-500/50 focus:outline-none transition-colors"
            />
          </div>

          {/* Level & Points Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1.5">
                Difficulty
              </label>
              <select
                name="level"
                value={form.level}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-slate-800/50 border border-emerald-500/20 text-emerald-100 focus:border-emerald-500/50 focus:outline-none transition-colors"
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1.5">
                Points
              </label>
              <input
                name="points"
                type="number"
                placeholder="100"
                value={form.points}
                onChange={handleChange}
                required
                min={1}
                className="w-full px-4 py-2.5 rounded-lg bg-slate-800/50 border border-emerald-500/20 text-emerald-100 placeholder-emerald-400/30 focus:border-emerald-500/50 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Flag */}
          <div>
            <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1.5">
              Flag
            </label>
            <input
              name="flag"
              type="text"
              placeholder="flag{...}"
              value={form.flag}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-lg bg-slate-800/50 border border-emerald-500/20 text-emerald-100 placeholder-emerald-400/30 focus:border-emerald-500/50 focus:outline-none transition-colors font-mono"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-red-300 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Divider */}
          <div className="h-px bg-linear-to-r from-transparent via-emerald-500/20 to-transparent my-6"></div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 rounded-lg bg-linear-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:shadow-lg hover:shadow-emerald-500/50 disabled:opacity-50 transition-all duration-200 active:scale-95"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Adding Challenge...
              </span>
            ) : (
              "Add Challenge"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
