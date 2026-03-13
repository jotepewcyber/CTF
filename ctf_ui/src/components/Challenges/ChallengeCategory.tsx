import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import ChallengeCard from "./ChallengeCard";
import { fetchChallengesByCategoryThunk } from "@/store/features/Question/questionThunks";

type Challenge = {
  id: number;
  name: string;
  level: string;
  points: number;
};

type Props = {
  category: { id: number; name: string };
  idx: number;
  isAdmin?: boolean;
};

const EMPTY: any[] = [];

export default function ChallengeCategory({ category, idx, isAdmin }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = React.useState(false);

  const challenges = useSelector(
    (state: RootState) => state.question.challenges[category.id] || EMPTY,
  );
  const loading = useSelector(
    (state: RootState) => state.question.loading[category.id],
  );

  const loaded = useSelector(
    (state: RootState) => state.question.loaded[category.id],
  );
  const error = useSelector(
    (state: RootState) => state.question.error[category.id],
  );

  useEffect(() => {
    if (open && !loading && !loaded) {
      dispatch(fetchChallengesByCategoryThunk(category.id));
    }
  }, [open, category.id, loading, loaded, dispatch]);

  return (
    <div
      style={{
        marginBottom: 32,
        background: "#fff",
        borderRadius: 10,
        boxShadow: "0 2px 8px #e0e0eb",
      }}
    >
      <div
        style={{
          padding: "14px 24px",
          fontSize: 17,
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          {idx + 1}. {category.name}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {isAdmin && (
            <button
              style={{
                fontSize: 13,
                padding: "3px 10px",
                borderRadius: 6,
                marginRight: 10,
                border: "1px solid #999",
                background: "#fafbfe",
                cursor: "pointer",
              }}
              // onClick={...}
            >
              + Add Challenge
            </button>
          )}
          <button
            aria-label="Expand"
            onClick={() => setOpen((v) => !v)}
            style={{
              border: 0,
              background: "none",
              fontSize: 20,
              cursor: "pointer",
            }}
          >
            {open ? "▲" : "▼"}
          </button>
        </div>
      </div>
      {open && (
        <div
          style={{ padding: "14px 24px", display: "flex", flexWrap: "wrap" }}
        >
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>
              <span style={{ color: "red" }}>Error: {error}</span>{" "}
              <button
                onClick={() =>
                  dispatch(fetchChallengesByCategoryThunk(category.id))
                }
              >
                Retry
              </button>
            </div>
          ) : loaded && challenges.length === 0 ? (
            <div style={{ fontStyle: "italic", opacity: 0.8 }}>
              No questions found. Questions coming soon!
            </div>
          ) : (
            challenges.map((c: Challenge) => (
              <ChallengeCard
                key={c.id}
                name={c.name}
                level={c.level}
                points={c.points}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
