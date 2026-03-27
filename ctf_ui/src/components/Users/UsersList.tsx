"use client";

import { User } from "@/types/users";
import { motion } from "framer-motion";
import { Mail, BookOpen, GraduationCap, Shield } from "lucide-react";

export default function UsersList({ users }: { users: User[] }) {
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getGradientColor = (index: number) => {
    const colors = [
      "from-emerald-500 to-teal-500",
      "from-blue-500 to-cyan-500",
      "from-purple-500 to-pink-500",
      "from-yellow-500 to-orange-500",
    ];
    return colors[index % colors.length];
  };

  const getRoleBadgeColor = (role?: string) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "organizer":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "moderator":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default:
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Stats Header - 3 Cards Only */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 rounded-xl bg-linear-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
          <p className="text-emerald-200/70 text-sm mb-2">Total Members</p>
          <p className="text-3xl font-black text-emerald-400">{users.length}</p>
        </div>

        <div className="p-6 rounded-xl bg-linear-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
          <p className="text-blue-200/70 text-sm mb-2">Admins</p>
          <p className="text-3xl font-black text-blue-400">
            {users.filter((u) => u.role?.toLowerCase() === "admin").length}
          </p>
        </div>

        <div className="p-6 rounded-xl bg-linear-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
          <p className="text-purple-200/70 text-sm mb-2">Participants</p>
          <p className="text-3xl font-black text-purple-400">
            {
              users.filter(
                (u) =>
                  !["admin", "organizer", "moderator"].includes(
                    u.role?.toLowerCase() || "",
                  ),
              ).length
            }
          </p>
        </div>
      </div>

      {/* Users Grid - Desktop View */}
      <div className="hidden lg:grid grid-cols-1 gap-4 rounded-xl overflow-hidden border border-emerald-500/20 bg-black/40 backdrop-blur-sm">
        {/* Table Header */}
        <div className="grid grid-cols-7 gap-4 px-6 py-4 bg-linear-to-r from-emerald-500/10 to-teal-500/10 border-b border-emerald-500/20">
          <div className="text-emerald-300 font-bold text-sm">Avatar</div>
          <div className="text-emerald-300 font-bold text-sm">Username</div>
          <div className="text-emerald-300 font-bold text-sm">Full Name</div>
          <div className="text-emerald-300 font-bold text-sm">Email</div>
          <div className="text-emerald-300 font-bold text-sm">Branch</div>
          <div className="text-emerald-300 font-bold text-sm">Year</div>
          <div className="text-emerald-300 font-bold text-sm">Role</div>
        </div>

        {/* Table Body */}
        <div>
          {users.length > 0 ? (
            users.map((user, idx) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="grid grid-cols-7 gap-4 px-6 py-4 border-b border-emerald-500/10 hover:bg-emerald-500/5 transition-all items-center"
              >
                {/* Avatar */}
                <div>
                  {user.avatar_url ? (
                    <img
                      src={user.avatar_url}
                      alt={user.username}
                      width={40}
                      height={40}
                      className="rounded-full w-10 h-10 object-cover"
                    />
                  ) : (
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm bg-linear-to-r ${getGradientColor(idx)}`}
                    >
                      {getInitials(user.first_name, user.last_name)}
                    </div>
                  )}
                </div>

                {/* Username */}
                <div>
                  <p className="text-emerald-300 font-semibold">
                    {user.username}
                  </p>
                </div>

                {/* Full Name */}
                <div>
                  <p className="text-emerald-200/80 text-sm">
                    {user.first_name} {user.last_name}
                  </p>
                </div>

                {/* Email */}
                <div>
                  <a
                    href={`mailto:${user.email}`}
                    className="text-emerald-400 hover:text-emerald-300 text-sm break-all"
                  >
                    {user.email}
                  </a>
                </div>

                {/* Branch */}
                <div>
                  <span className="text-emerald-200/70 text-sm">
                    {user.branch || "-"}
                  </span>
                </div>

                {/* Year */}
                <div>
                  <span className="text-emerald-200/70 text-sm">
                    {user.year ? `${user.year} Year` : "-"}
                  </span>
                </div>

                {/* Role */}
                <div>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getRoleBadgeColor(user.role)}`}
                  >
                    {user.role || "Member"}
                  </span>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="p-8 text-center">
              <p className="text-emerald-200/50">No members found</p>
            </div>
          )}
        </div>
      </div>

      {/* Users Cards - Mobile View */}
      <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
        {users.length > 0 ? (
          users.map((user, idx) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/40 transition-all"
            >
              {/* Header with Avatar */}
              <div className="flex items-center gap-4 mb-4">
                {user.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt={user.username}
                    width={50}
                    height={50}
                    className="rounded-full w-12 h-12 object-cover"
                  />
                ) : (
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white bg-linear-to-r ${getGradientColor(idx)}`}
                  >
                    {getInitials(user.first_name, user.last_name)}
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-emerald-300 font-bold">{user.username}</p>
                  <p className="text-emerald-200/70 text-sm">
                    {user.first_name} {user.last_name}
                  </p>
                </div>
              </div>

              {/* Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-400" />
                  <a
                    href={`mailto:${user.email}`}
                    className="text-emerald-400 hover:text-emerald-300 text-sm break-all"
                  >
                    {user.email}
                  </a>
                </div>

                {user.branch && (
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-200/80 text-sm">
                      {user.branch}
                    </span>
                  </div>
                )}

                {user.year && (
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-200/80 text-sm">
                      {user.year} Year
                    </span>
                  </div>
                )}

                {user.role && (
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getRoleBadgeColor(user.role)}`}
                    >
                      {user.role}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full p-8 text-center">
            <p className="text-emerald-200/50">No members found</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
