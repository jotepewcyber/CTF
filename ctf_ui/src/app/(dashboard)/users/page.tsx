"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import { fetchUsersThunk } from "@/store/features/Users/usersThunks";
import UsersList from "@/components/Users/UsersList";

export default function UsersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.users);
  const loading = useSelector((state: RootState) => state.users.loading);
  const error = useSelector((state: RootState) => state.users.error);

  useEffect(() => {
    dispatch(fetchUsersThunk());
  }, [dispatch]);

  return (
    <div style={{ padding: 32 }}>
      <h1>Users</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div style={{ color: "red" }}>Error loading users: {error}</div>
      ) : (
        <UsersList users={users} />
      )}
    </div>
  );
}
