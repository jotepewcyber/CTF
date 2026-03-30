"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";
import {
  updateUserThunk,
  deleteUserThunk,
  fetchUsersThunk,
} from "@/store/features/Users/usersThunks";
import { X, Trash2, CheckCircle, XCircle } from "lucide-react";
import { User } from "@/types/users";

export default function EditUserModal({
  open,
  onClose,
  user,
}: {
  open: boolean;
  onClose: () => void;
  user: User | null;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    branch: "",
    year: "",
    course: "",
    role: "user",
    is_active: true,
    is_staff: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (user && open) {
      setForm({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        branch: user.branch || "",
        year: user.year ? String(user.year) : "",
        course: user.course || "",
        role: user.role || "user",
        is_active: user.is_active !== false,
        is_staff: user.is_staff === true,
      });
      setError("");
      setShowDeleteConfirm(false);
    }
  }, [user, open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, type, value } = e.target as
      | HTMLInputElement
      | HTMLSelectElement;

    if (type === "checkbox") {
      setForm((f) => ({
        ...f,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setError("");
    setLoading(true);

    try {
      const payload = {
        ...form,
        year: form.year ? Number(form.year) : null,
      };

      const res = await dispatch(
        updateUserThunk({ userId: user.id, data: payload }),
      );

      if (updateUserThunk.fulfilled.match(res)) {
        dispatch(fetchUsersThunk());
        onClose();
      } else {
        setError(
          typeof res.payload === "string"
            ? res.payload
            : "Failed to update user",
        );
      }
    } catch (err: any) {
      setError(err.message || "Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!user) return;

    setError("");
    setLoading(true);

    try {
      const res = await dispatch(deleteUserThunk(user.id));

      if (deleteUserThunk.fulfilled.match(res)) {
        dispatch(fetchUsersThunk());
        onClose();
      } else {
        setError(
          typeof res.payload === "string"
            ? res.payload
            : "Failed to delete user",
        );
      }
    } catch (err: any) {
      setError(err.message || "Failed to delete user");
    } finally {
      setLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  if (!open || !user) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm pt-20">
      <div className="bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 border border-blue-500/30 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[calc(100vh-120px)] overflow-y-auto p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-blue-500/10 rounded-lg transition-colors z-10"
          aria-label="Close"
        >
          <X size={20} className="text-blue-400" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300 mb-2 pr-8">
            Edit User
          </h2>
          <p className="text-blue-200/70 text-sm">
            User ID: {user.id} | Username:{" "}
            <span className="font-semibold">{user.username}</span>
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-linear-to-r from-transparent via-blue-500/20 to-transparent mb-6"></div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First & Last Name Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1.5">
                First Name
              </label>
              <input
                name="first_name"
                type="text"
                value={form.first_name}
                onChange={handleChange}
                disabled={loading}
                className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-blue-500/20 text-blue-100 placeholder-blue-400/30 focus:border-blue-500/50 focus:outline-none transition-colors disabled:opacity-50 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1.5">
                Last Name
              </label>
              <input
                name="last_name"
                type="text"
                value={form.last_name}
                onChange={handleChange}
                disabled={loading}
                className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-blue-500/20 text-blue-100 placeholder-blue-400/30 focus:border-blue-500/50 focus:outline-none transition-colors disabled:opacity-50 text-sm"
              />
            </div>
          </div>

          {/* Email & Branch Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1.5">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                disabled={loading}
                className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-blue-500/20 text-blue-100 placeholder-blue-400/30 focus:border-blue-500/50 focus:outline-none transition-colors disabled:opacity-50 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1.5">
                Branch
              </label>
              <input
                name="branch"
                type="text"
                value={form.branch}
                onChange={handleChange}
                disabled={loading}
                className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-blue-500/20 text-blue-100 placeholder-blue-400/30 focus:border-blue-500/50 focus:outline-none transition-colors disabled:opacity-50 text-sm"
              />
            </div>
          </div>

          {/* Year & Course Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1.5">
                Year
              </label>
              <input
                name="year"
                type="number"
                min="1"
                max="4"
                value={form.year}
                onChange={handleChange}
                disabled={loading}
                className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-blue-500/20 text-blue-100 placeholder-blue-400/30 focus:border-blue-500/50 focus:outline-none transition-colors disabled:opacity-50 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1.5">
                Course
              </label>
              <input
                name="course"
                type="text"
                value={form.course}
                onChange={handleChange}
                disabled={loading}
                className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-blue-500/20 text-blue-100 placeholder-blue-400/30 focus:border-blue-500/50 focus:outline-none transition-colors disabled:opacity-50 text-sm"
              />
            </div>
          </div>

          {/* Role & Is Staff Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1.5">
                Role
              </label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                disabled={loading}
                className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-blue-500/20 text-blue-100 focus:border-blue-500/50 focus:outline-none transition-colors disabled:opacity-50 text-sm"
              >
                <option value="user">User</option>
                <option value="organizer">Organizer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-800/50 border border-blue-500/20 hover:border-blue-500/40 cursor-pointer transition-colors w-full">
                <input
                  name="is_staff"
                  type="checkbox"
                  checked={form.is_staff}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-4 h-4 rounded cursor-pointer"
                />
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                  Staff Access
                </span>
              </label>
            </div>
          </div>

          {/* Active Status Row */}
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-800/50 border border-blue-500/20 hover:border-blue-500/40 cursor-pointer transition-colors">
              <input
                name="is_active"
                type="checkbox"
                checked={form.is_active}
                onChange={handleChange}
                disabled={loading}
                className="w-4 h-4 rounded cursor-pointer"
              />
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider flex-1">
                Account Active
              </span>
              {form.is_active ? (
                <CheckCircle size={16} className="text-green-400" />
              ) : (
                <XCircle size={16} className="text-red-400" />
              )}
            </div>
          </div>

          {/* User Info Display */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-slate-800/30 border border-blue-500/10">
            <div>
              <p className="text-xs text-blue-400/70 font-semibold mb-1">
                Last Login
              </p>
              <p className="text-xs text-blue-200">
                {user.last_login
                  ? new Date(user.last_login).toLocaleString()
                  : "Never"}
              </p>
            </div>
            <div>
              <p className="text-xs text-blue-400/70 font-semibold mb-1">
                Superuser Status
              </p>
              <p className="text-xs text-blue-200">
                {user.is_superuser ? "✓ Yes" : "✗ No"}
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-red-300 text-xs font-medium">{error}</p>
            </div>
          )}

          {/* Delete Confirmation */}
          {showDeleteConfirm && (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 space-y-3">
              <p className="text-red-300 text-sm font-semibold">
                ⚠️ Confirm Delete
              </p>
              <p className="text-red-300/80 text-xs">
                Are you sure you want to delete{" "}
                <span className="font-bold">"{user.username}"</span>? This
                action cannot be undone.
              </p>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={loading}
                  className="flex-1 px-3 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-semibold transition-colors disabled:opacity-50"
                >
                  {loading ? "Deleting..." : "Yes, Delete"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={loading}
                  className="flex-1 px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="h-px bg-linear-to-r from-transparent via-blue-500/20 to-transparent my-4"></div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-3 rounded-lg bg-linear-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 disabled:opacity-50 transition-all duration-200 active:scale-95 text-sm"
            >
              {loading ? "Updating..." : "Update User"}
            </button>
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              disabled={loading || showDeleteConfirm}
              className="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 hover:border-red-500/50 hover:bg-red-500/20 text-red-300 font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
              title="Delete User"
            >
              <Trash2 size={16} />
              <span>Delete User</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
