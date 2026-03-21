"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import { fetchScoreboardThunk } from "@/store/features/Scoreboard/scoreboardThunks";
import ScoreboardTable from "@/components/Scoreboard/ScoreboardTable";

export default function LeaderboardPage() {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.scoreboard.users);
  const loading = useSelector((state: RootState) => state.scoreboard.loading);
  const error = useSelector((state: RootState) => state.scoreboard.error);

  useEffect(() => {
    dispatch(fetchScoreboardThunk());
  }, [dispatch]);

  return (
    <div style={{ padding: 32, minHeight: "80vh" }}>
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>Scoreboard</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div style={{ color: "red" }}>Failed to load scoreboard: {error}</div>
      ) : (
        <ScoreboardTable users={users} />
      )}
    </div>
  );
}
