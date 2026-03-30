"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import { fetchUsersThunk } from "@/store/features/Users/usersThunks";
import UsersList from "@/components/Users/UsersList";
import EditUserModal from "@/components/Users/EditUserModal";
import { motion } from "framer-motion";
import { Users as UsersIcon, UserCheck } from "lucide-react";
import Lights from "@/components/Dashboard/dashboard";
import { User } from "@/types/users";

export default function UsersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.users);
  const loading = useSelector((state: RootState) => state.users.loading);
  const error = useSelector((state: RootState) => state.users.error);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    dispatch(fetchUsersThunk());
  }, [dispatch]);

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  return (
    <div className="relative w-full min-h-screen bg-black text-white">
      <div className="fixed inset-0 z-0 w-screen h-screen pointer-events-none">
        <Lights />
      </div>

      <div className="fixed inset-0 z-5 bg-black/20 pointer-events-none" />

      <div className="relative z-10 w-full py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <UsersIcon className="w-10 h-10 text-emerald-400" />
            <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-linear-to-r from-emerald-400 via-teal-300 to-emerald-400">
              Community Members
            </h1>
            <UserCheck className="w-10 h-10 text-emerald-400" />
          </div>
          <p className="text-emerald-200/80 text-lg max-w-2xl mx-auto">
            Meet the participants and members of Cognitia'26
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin mb-4" />
              <p className="text-emerald-200/80">
                Loading community members...
              </p>
            </motion.div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-xl bg-red-500/10 border border-red-500/30"
            >
              <p className="text-red-300 font-semibold">
                ❌ Error loading users: {error}
              </p>
            </motion.div>
          ) : (
            <>
              <UsersList users={users} onEditUser={handleEditUser} />
              <EditUserModal
                open={editModalOpen}
                onClose={() => {
                  setEditModalOpen(false);
                  setSelectedUser(null);
                }}
                user={selectedUser}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
