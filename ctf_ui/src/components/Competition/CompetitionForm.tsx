"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

type CompetitionFormProps = {
  mode: "create" | "edit";
  initialData?: any;
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
};

export default function CompetitionForm({
  mode,
  initialData,
  onSubmit,
  onCancel,
}: CompetitionFormProps) {
  const [form, setForm] = useState(
    initialData || {
      name: "CTF 1",
      start_time: "2026-04-01T09:00:00Z",
      end_time: "2026-04-01T17:00:00Z",
      is_active: true,
    },
  );
  const [loading, setLoading] = useState(false);

  function toDatetimeLocal(dt: string) {
    if (!dt) return "";
    const date = new Date(dt);
    if (isNaN(date.getTime())) return "";
    const tzOffset = date.getTimezoneOffset() * 60000;
    const localISOTime = new Date(date.getTime() - tzOffset)
      .toISOString()
      .slice(0, 16);
    return localISOTime;
  }

  function fromDatetimeLocal(localValue: string) {
    if (!localValue) return "";
    const localDate = new Date(localValue);
    return localDate.toISOString();
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((f: any) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        start_time: fromDatetimeLocal(form.start_time),
        end_time: fromDatetimeLocal(form.end_time),
      };
      await onSubmit(payload);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Form Container */}
      <form
        onSubmit={handleSubmit}
        className="relative bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 border border-emerald-500/30 rounded-2xl shadow-2xl w-full max-w-md p-8 space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-300">
            {mode === "create" ? "New Competition" : "Edit Competition"}
          </h2>
          <button
            type="button"
            onClick={onCancel}
            className="p-2 hover:bg-emerald-500/10 rounded-lg transition-colors"
          >
            <X size={20} className="text-emerald-400" />
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-linear-to-r from-transparent via-emerald-500/20 to-transparent"></div>

        {/* Fields */}
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-emerald-200 mb-2">
              Competition Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-lg bg-slate-800/50 border border-emerald-500/20 text-emerald-100 placeholder-emerald-400/30 focus:border-emerald-500/50 focus:outline-none transition-colors"
              placeholder="e.g., CTF Championship 2026"
            />
          </div>

          {/* Start Time */}
          <div>
            <label className="block text-sm font-semibold text-emerald-200 mb-2">
              Start Time
            </label>
            <input
              type="datetime-local"
              name="start_time"
              value={toDatetimeLocal(form.start_time)}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-lg bg-slate-800/50 border border-emerald-500/20 text-emerald-100 focus:border-emerald-500/50 focus:outline-none transition-colors"
            />
          </div>

          {/* End Time */}
          <div>
            <label className="block text-sm font-semibold text-emerald-200 mb-2">
              End Time
            </label>
            <input
              type="datetime-local"
              name="end_time"
              value={toDatetimeLocal(form.end_time)}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-lg bg-slate-800/50 border border-emerald-500/20 text-emerald-100 focus:border-emerald-500/50 focus:outline-none transition-colors"
            />
          </div>

          {/* Active Status */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <input
              type="checkbox"
              name="is_active"
              checked={form.is_active}
              onChange={handleChange}
              className="w-4 h-4 rounded cursor-pointer"
            />
            <label className="text-sm font-medium text-emerald-200 cursor-pointer flex-1">
              Set as Active
            </label>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-linear-to-r from-transparent via-emerald-500/20 to-transparent"></div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 rounded-lg bg-slate-700/50 text-emerald-200 hover:bg-slate-700 border border-slate-600 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-linear-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:shadow-lg hover:shadow-emerald-500/50 disabled:opacity-50 transition-all duration-200"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Plus size={18} />
                {mode === "create" ? "Create" : "Save"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
