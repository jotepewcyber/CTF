"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";
import {
  createChallengeThunk,
  fetchChallengesByCategoryThunk,
  uploadChallengeFilesThunk,
} from "@/store/features/Question/questionThunks";
import { X, Upload, File } from "lucide-react";

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
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (index: number) => {
    setFiles((f) => f.filter((_, i) => i !== index));
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

      // Create challenge first
      const res = await dispatch(createChallengeThunk(payload)).unwrap();
      const challengeId = res.id;

      // Upload files if any
      if (files.length > 0) {
        await dispatch(
          uploadChallengeFilesThunk({ challengeId, files }),
        ).unwrap();
      }

      // Reset form
      setForm({
        name: "",
        description: "",
        hint: "",
        url: "",
        level: "Easy",
        points: 100,
        flag: "",
      });
      setFiles([]);

      // Refresh challenges list
      dispatch(fetchChallengesByCategoryThunk(categoryId));
      onClose();
    } catch (err: any) {
      setError(
        typeof err === "string"
          ? err
          : err?.message || "Failed to add challenge",
      );
    }
    setLoading(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm pt-20">
      <div className="bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 border border-emerald-500/30 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[calc(100vh-120px)] overflow-y-auto p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-emerald-500/10 rounded-lg transition-colors z-10"
          aria-label="Close"
        >
          <X size={20} className="text-emerald-400" />
        </button>

        {/* Header */}
        <h2 className="text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-300 mb-4 pr-8">
          Add Challenge
        </h2>

        {/* Divider */}
        <div className="h-px bg-linear-to-r from-transparent via-emerald-500/20 to-transparent mb-6"></div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name & URL Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1.5">
                Challenge Name
              </label>
              <input
                name="name"
                type="text"
                placeholder="e.g., SQL Injection"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-emerald-500/20 text-emerald-100 placeholder-emerald-400/30 focus:border-emerald-500/50 focus:outline-none transition-colors text-sm"
              />
            </div>
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
                className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-emerald-500/20 text-emerald-100 placeholder-emerald-400/30 focus:border-emerald-500/50 focus:outline-none transition-colors text-sm"
              />
            </div>
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
              rows={2}
              required
              className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-emerald-500/20 text-emerald-100 placeholder-emerald-400/30 focus:border-emerald-500/50 focus:outline-none transition-colors resize-none text-sm"
            />
          </div>

          {/* Hint & Flag Row */}
          <div className="grid grid-cols-2 gap-4">
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
                className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-emerald-500/20 text-emerald-100 placeholder-emerald-400/30 focus:border-emerald-500/50 focus:outline-none transition-colors text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1.5">
                Flag
              </label>
              <input
                name="flag"
                type="text"
                placeholder="CTF{...}"
                value={form.flag}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-emerald-500/20 text-emerald-100 placeholder-emerald-400/30 focus:border-emerald-500/50 focus:outline-none transition-colors font-mono text-sm"
              />
            </div>
          </div>

          {/* Level & Points Row */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1.5">
                Difficulty
              </label>
              <select
                name="level"
                value={form.level}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-emerald-500/20 text-emerald-100 focus:border-emerald-500/50 focus:outline-none transition-colors text-sm"
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
                className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-emerald-500/20 text-emerald-100 placeholder-emerald-400/30 focus:border-emerald-500/50 focus:outline-none transition-colors text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1.5">
                Attachments
              </label>
              <label className="flex items-center justify-center w-full px-3 py-2 rounded-lg border-2 border-dashed border-emerald-500/30 bg-slate-800/30 hover:border-emerald-500/50 cursor-pointer transition-colors">
                <div className="flex items-center gap-1">
                  <Upload size={14} className="text-emerald-400" />
                  <span className="text-xs text-emerald-200">Upload</span>
                </div>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  accept="*"
                />
              </label>
            </div>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="space-y-1 max-h-20 overflow-y-auto">
              {files.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between px-2 py-1 rounded-lg bg-slate-800/50 border border-emerald-500/10"
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <File size={14} className="text-emerald-400 shrink-0" />
                    <span className="text-xs text-emerald-200 truncate">
                      {file.name}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(idx)}
                    className="p-1 hover:bg-red-500/20 rounded transition-colors"
                  >
                    <X size={14} className="text-red-400" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-red-300 text-xs font-medium">{error}</p>
            </div>
          )}

          {/* Divider */}
          <div className="h-px bg-linear-to-r from-transparent via-emerald-500/20 to-transparent my-4"></div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 rounded-lg bg-linear-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:shadow-lg hover:shadow-emerald-500/50 disabled:opacity-50 transition-all duration-200 active:scale-95 text-sm"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Adding...
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
