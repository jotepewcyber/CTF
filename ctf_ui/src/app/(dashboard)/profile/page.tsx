"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import { fetchMeThunk } from "@/store/features/Auth/authThunks";

export default function ProfilePage() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const status = useSelector((state: RootState) => state.auth.status);
  const error = useSelector((state: RootState) => state.auth.error);

  useEffect(() => {
    dispatch(fetchMeThunk());
  }, [dispatch]);

  if (status === "loading") return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;
  if (!user) return <div>No user information found.</div>;

  return (
    <div>
      <h1>My Profile</h1>
      <ul>
        <li>
          <b>Username:</b> {user.username}
        </li>
        <li>
          <b>Email:</b> {user.email}
        </li>
        <li>
          <b>Role:</b> {user.role || user.is_admin ? "admin" : "user"}
        </li>
        {/* Add more fields as you want */}
      </ul>
    </div>
  );
}
