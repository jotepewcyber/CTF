import React, { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";
import {
  createChallengeThunk,
  fetchChallengesByCategoryThunk,
} from "@/store/features/Question/questionThunks";

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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
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
      const res = await dispatch(createChallengeThunk(payload));
      if (createChallengeThunk.fulfilled.match(res)) {
        setForm({
          name: "",
          description: "",
          hint: "",
          url: "",
          level: "Easy",
          points: 100,
          flag: "",
        });
        dispatch(fetchChallengesByCategoryThunk(categoryId)); // refresh list
        onClose();
      } else {
        setError(
          typeof res.payload === "string"
            ? res.payload
            : "Failed to add category",
        );
      }
    } catch (err: any) {
      setError(err.message || "Failed to add question");
    }
    setLoading(false);
  };

  if (!open) return null;
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: 28,
          minWidth: 360,
          borderRadius: 10,
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 10,
            right: 14,
            fontSize: 22,
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
          &times;
        </button>
        <h2>Add New Question</h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
        >
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            required
          />
          <input
            name="hint"
            placeholder="Hint"
            value={form.hint}
            onChange={handleChange}
          />
          <input
            name="url"
            placeholder="URL"
            value={form.url}
            onChange={handleChange}
          />
          <select name="level" value={form.level} onChange={handleChange}>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
          <input
            name="points"
            type="number"
            placeholder="Points"
            value={form.points}
            onChange={handleChange}
            required
            min={1}
          />
          <input
            name="flag"
            placeholder="Flag"
            value={form.flag}
            onChange={handleChange}
            required
          />
          {error && <div style={{ color: "red" }}>{error}</div>}
          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Question"}
          </button>
        </form>
      </div>
    </div>
  );
}
