"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import { fetchMeThunk } from "@/store/features/Auth/authThunks";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Shield,
  Calendar,
  BookOpen,
  Award,
  Edit2,
  CheckCircle,
  XCircle,
  X,
  Save,
} from "lucide-react";
import Lights from "@/components/Dashboard/dashboard";
import { EditableUserFields } from "@/types/users";
import { useUpdateProfile } from "@/lib/hooks/useUpdateProfile";

export default function ProfilePage() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const status = useSelector((state: RootState) => state.auth.status);
  const error = useSelector((state: RootState) => state.auth.error);

  const { updateProfile } = useUpdateProfile();

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [failedAvatarUrl, setFailedAvatarUrl] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<EditableUserFields>>({
    first_name: "",
    last_name: "",
    email: "",
    branch: "",
    year: undefined,
    course: "",
    avatar_url: "",
  });

  // ✅ Fetch user on mount
  useEffect(() => {
    dispatch(fetchMeThunk());
  }, [dispatch]);

  // ✅ Load user data into form when entering edit mode
  useEffect(() => {
    if (user && isEditing) {
      setEditForm({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        branch: user.branch || "",
        year: user.year || undefined,
        course: user.course || "",
        avatar_url: user.avatar_url || "",
      });
    }
  }, [user, isEditing]);

  // ✅ Handle form input changes
  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "year") {
      setEditForm((f) => ({
        ...f,
        [name]: value ? Number(value) : undefined,
      }));
    } else {
      setEditForm((f) => ({
        ...f,
        [name]: value,
      }));
    }
  };

  // ✅ Handle form submission with hook
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await updateProfile(editForm);
    setIsLoading(false);

    if (success) {
      setIsEditing(false);
      // Reset failed avatar URL when edit is successful
      setFailedAvatarUrl(null);
    }
  };

  // ✅ Handle image load failure
  const handleAvatarLoadError = (failedUrl: string) => {
    console.warn(`Failed to load avatar from: ${failedUrl}`);
    setFailedAvatarUrl(failedUrl);
  };

  // ✅ Loading state
  if (status === "loading") {
    return (
      <div className="relative w-full min-h-screen bg-black text-white flex items-center justify-center pt-20">
        <Lights />
        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin mb-4"></div>
          <p className="text-emerald-200">Loading profile...</p>
        </div>
      </div>
    );
  }

  // ✅ Error state
  if (error) {
    return (
      <div className="relative w-full min-h-screen bg-black text-white pt-20">
        <Lights />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl bg-red-500/5 border border-red-500/20 backdrop-blur-sm"
          >
            <p className="text-red-300 font-semibold">❌ Error: {error}</p>
          </motion.div>
        </div>
      </div>
    );
  }

  // ✅ No user state
  if (!user) {
    return (
      <div className="relative w-full min-h-screen bg-black text-white pt-20">
        <Lights />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl bg-yellow-500/5 border border-yellow-500/20 backdrop-blur-sm"
          >
            <p className="text-yellow-300 font-semibold">
              ⚠️ No user information found.
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  const isAdmin = user?.role === "admin";

  return (
    <div className="relative w-full min-h-screen bg-black text-white">
      {/* Background */}
      <div className="fixed inset-0 z-0 w-screen h-screen pointer-events-none">
        <Lights />
      </div>

      {/* Overlay */}
      <div className="fixed inset-0 z-5 bg-black/20 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-linear-to-r from-emerald-400 via-teal-300 to-emerald-400 mb-2">
              My Profile
            </h1>
            <p className="text-emerald-200/80">
              Manage your account information and settings
            </p>
          </motion.div>

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl backdrop-blur-sm overflow-hidden"
          >
            {/* Header Background */}
            <div className="h-32 bg-linear-to-r from-emerald-500/10 to-teal-500/10 border-b border-emerald-500/10"></div>

            {/* Profile Content */}
            <div className="px-8 pb-8">
              {/* Avatar & Name Section */}
              <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16 mb-8">
                {/* Avatar */}
                <div className="w-32 h-32 rounded-full bg-linear-to-r from-emerald-500 to-teal-500 flex items-center justify-center border-4 border-black shadow-lg shrink-0 relative group">
                  {user.avatar_url && !failedAvatarUrl ? (
                    <>
                      <img
                        src={user.avatar_url}
                        alt={user.username}
                        className="w-full h-full rounded-full object-cover"
                        onError={() => handleAvatarLoadError(user.avatar_url)}
                        crossOrigin="anonymous"
                      />
                      {failedAvatarUrl && (
                        <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-xs text-center text-white">
                            Failed to load
                          </span>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2">
                      <User className="w-16 h-16 text-white" />
                      {failedAvatarUrl && (
                        <span className="text-xs text-center text-white/70">
                          Invalid URL
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Name & Role */}
                <div className="flex-1">
                  <h2 className="text-3xl font-black text-emerald-300 mb-1">
                    {user.first_name} {user.last_name}
                  </h2>
                  <p className="text-emerald-200/70 mb-3">@{user.username}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Role Badge */}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${
                        user.role === "admin"
                          ? "bg-red-500/10 text-red-300 border-red-500/20"
                          : user.role === "organizer"
                            ? "bg-yellow-500/10 text-yellow-300 border-yellow-500/20"
                            : "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
                      }`}
                    >
                      {user.role || "User"}
                    </span>

                    {/* Staff Badge */}
                    {user.is_staff && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20 backdrop-blur-sm">
                        Staff
                      </span>
                    )}

                    {/* Active Status */}
                    {user.is_active ? (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/10 text-green-300 border border-green-500/20 backdrop-blur-sm flex items-center gap-1">
                        <CheckCircle size={12} /> Active
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-300 border border-red-500/20 backdrop-blur-sm flex items-center gap-1">
                        <XCircle size={12} /> Inactive
                      </span>
                    )}
                  </div>
                </div>

                {/* Edit Button */}
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-3 rounded-lg bg-linear-to-r from-emerald-500/80 to-teal-500/80 text-white font-semibold hover:shadow-lg hover:shadow-emerald-500/50 transition-all flex items-center gap-2 backdrop-blur-sm whitespace-nowrap"
                  >
                    <Edit2 size={18} />
                    Edit Profile
                  </button>
                )}
              </div>

              {/* Divider */}
              <div className="h-px bg-linear-to-r from-transparent via-emerald-500/20 to-transparent mb-8"></div>

              {/* Edit Form */}
              {isEditing ? (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleEditSubmit}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-bold text-emerald-300 mb-4">
                    Edit Your Information
                  </h3>

                  {/* First & Last Name Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1.5">
                        First Name
                      </label>
                      <input
                        name="first_name"
                        type="text"
                        value={editForm.first_name || ""}
                        onChange={handleEditChange}
                        disabled={isLoading}
                        placeholder="Enter first name"
                        className="w-full px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-100 placeholder-emerald-400/30 focus:border-emerald-500/50 focus:outline-none transition-colors disabled:opacity-50 text-sm backdrop-blur-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1.5">
                        Last Name
                      </label>
                      <input
                        name="last_name"
                        type="text"
                        value={editForm.last_name || ""}
                        onChange={handleEditChange}
                        disabled={isLoading}
                        placeholder="Enter last name"
                        className="w-full px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-100 placeholder-emerald-400/30 focus:border-emerald-500/50 focus:outline-none transition-colors disabled:opacity-50 text-sm backdrop-blur-sm"
                      />
                    </div>
                  </div>

                  {/* Email & Branch Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1.5">
                        Email
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={editForm.email || ""}
                        onChange={handleEditChange}
                        disabled={isLoading}
                        placeholder="Enter email"
                        className="w-full px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-100 placeholder-emerald-400/30 focus:border-emerald-500/50 focus:outline-none transition-colors disabled:opacity-50 text-sm backdrop-blur-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1.5">
                        Branch
                      </label>
                      <input
                        name="branch"
                        type="text"
                        value={editForm.branch || ""}
                        onChange={handleEditChange}
                        disabled={isLoading}
                        placeholder="e.g., Computer Science"
                        className="w-full px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-100 placeholder-emerald-400/30 focus:border-emerald-500/50 focus:outline-none transition-colors disabled:opacity-50 text-sm backdrop-blur-sm"
                      />
                    </div>
                  </div>

                  {/* Year & Course Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1.5">
                        Year
                      </label>
                      <select
                        name="year"
                        value={editForm.year || ""}
                        onChange={handleEditChange}
                        disabled={isLoading}
                        className="w-full px-3 py-2 rounded-lg bg-emerald-500/40 border border-emerald-500/50 text-white focus:border-emerald-500/70 focus:outline-none transition-colors disabled:opacity-50 text-sm backdrop-blur-sm"
                      >
                        <option value="">Select Year</option>
                        <option value="1">1st Year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1.5">
                        Course
                      </label>
                      <input
                        name="course"
                        type="text"
                        value={editForm.course || ""}
                        onChange={handleEditChange}
                        disabled={isLoading}
                        placeholder="e.g., B.Tech"
                        className="w-full px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-100 placeholder-emerald-400/30 focus:border-emerald-500/50 focus:outline-none transition-colors disabled:opacity-50 text-sm backdrop-blur-sm"
                      />
                    </div>
                  </div>

                  {/* Avatar URL Row */}
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1.5">
                        Avatar URL
                      </label>
                      <input
                        name="avatar_url"
                        type="url"
                        value={editForm.avatar_url || ""}
                        onChange={(e) => {
                          handleEditChange(e);
                          // Reset failed avatar state when user edits
                          if (e.target.value !== user?.avatar_url) {
                            setFailedAvatarUrl(null);
                          }
                        }}
                        disabled={isLoading}
                        placeholder="https://example.com/avatar.jpg"
                        className="w-full px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-100 placeholder-emerald-400/30 focus:border-emerald-500/50 focus:outline-none transition-colors disabled:opacity-50 text-sm backdrop-blur-sm"
                      />
                      <p className="text-xs text-emerald-400/60 mt-1">
                        Provide a direct URL to your avatar image (HTTPS
                        recommended)
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3 pt-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-4 py-3 rounded-lg bg-linear-to-r from-emerald-500/80 to-teal-500/80 text-white font-semibold hover:shadow-lg hover:shadow-emerald-500/50 disabled:opacity-50 transition-all flex items-center justify-center gap-2 backdrop-blur-sm text-sm"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save size={16} />
                          Save Changes
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      disabled={isLoading}
                      className="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 hover:border-red-500/40 text-red-300 font-semibold transition-all flex items-center justify-center gap-2 backdrop-blur-sm disabled:opacity-50 text-sm"
                    >
                      <X size={16} />
                      Cancel
                    </button>
                  </div>
                </motion.form>
              ) : (
                <>
                  {/* Profile Information Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Information */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-bold text-emerald-300 mb-4 flex items-center gap-2">
                        <User size={20} />
                        Personal Information
                      </h3>

                      {/* Email */}
                      <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10 backdrop-blur-sm">
                        <p className="text-xs text-emerald-400/70 font-semibold mb-1 flex items-center gap-1">
                          <Mail size={14} /> Email Address
                        </p>
                        <p className="text-emerald-200">{user.email}</p>
                      </div>

                      {/* First Name */}
                      <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10 backdrop-blur-sm">
                        <p className="text-xs text-emerald-400/70 font-semibold mb-1">
                          First Name
                        </p>
                        <p className="text-emerald-200">{user.first_name}</p>
                      </div>

                      {/* Last Name */}
                      <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10 backdrop-blur-sm">
                        <p className="text-xs text-emerald-400/70 font-semibold mb-1">
                          Last Name
                        </p>
                        <p className="text-emerald-200">{user.last_name}</p>
                      </div>
                    </motion.div>

                    {/* Academic Information */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-bold text-emerald-300 mb-4 flex items-center gap-2">
                        <BookOpen size={20} />
                        Academic Information
                      </h3>

                      {/* Branch */}
                      <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10 backdrop-blur-sm">
                        <p className="text-xs text-emerald-400/70 font-semibold mb-1">
                          Branch
                        </p>
                        <p className="text-emerald-200">
                          {user.branch || "N/A"}
                        </p>
                      </div>

                      {/* Year */}
                      <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10 backdrop-blur-sm">
                        <p className="text-xs text-emerald-400/70 font-semibold mb-1">
                          Year
                        </p>
                        <p className="text-emerald-200">
                          {user.year ? `${user.year} Year` : "N/A"}
                        </p>
                      </div>

                      {/* Course */}
                      <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10 backdrop-blur-sm">
                        <p className="text-xs text-emerald-400/70 font-semibold mb-1">
                          Course
                        </p>
                        <p className="text-emerald-200">
                          {user.course || "N/A"}
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-linear-to-r from-transparent via-emerald-500/20 to-transparent my-8"></div>

                  {/* Account Information (Read-Only) */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-bold text-emerald-300 mb-4 flex items-center gap-2">
                      <Shield size={20} />
                      Account Information (Read-Only)
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Role */}
                      <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10 backdrop-blur-sm">
                        <p className="text-xs text-emerald-400/70 font-semibold mb-2">
                          Role
                        </p>
                        <p className="text-emerald-200 capitalize">
                          {user.role || "User"}
                        </p>
                      </div>

                      {/* Last Login */}
                      <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10 backdrop-blur-sm">
                        <p className="text-xs text-emerald-400/70 font-semibold mb-2 flex items-center gap-1">
                          <Calendar size={14} /> Last Login
                        </p>
                        <p className="text-emerald-200 text-sm">
                          {user.last_login
                            ? new Date(user.last_login).toLocaleDateString()
                            : "Never"}
                        </p>
                      </div>

                      {/* Superuser Status */}
                      <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10 backdrop-blur-sm">
                        <p className="text-xs text-emerald-400/70 font-semibold mb-2 flex items-center gap-1">
                          <Award size={14} /> Superuser
                        </p>
                        <p className="text-emerald-200">
                          {user.is_superuser ? "✓ Yes" : "✗ No"}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Admin Panel */}
                  {isAdmin && (
                    <>
                      <div className="h-px bg-linear-to-r from-transparent via-emerald-500/20 to-transparent my-8"></div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30 backdrop-blur-sm"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <Shield className="w-5 h-5 text-blue-400" />
                          <span className="font-semibold text-blue-300">
                            Admin Access
                          </span>
                        </div>
                        <p className="text-blue-200/70 text-sm">
                          You have administrative privileges. You can manage
                          users, categories, challenges, and competitions.
                        </p>
                      </motion.div>
                    </>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
