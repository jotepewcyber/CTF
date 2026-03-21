import React, { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";
import {
  addCategoryThunk,
  fetchCategoriesThunk,
} from "@/store/features/Category/categoryThunks";

export default function AddCategoryForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await dispatch(addCategoryThunk({ name }));
      if (addCategoryThunk.fulfilled.match(res)) {
        setName("");
        onSuccess();
        dispatch(fetchCategoriesThunk());
      } else {
        setError(
          typeof res.payload === "string"
            ? res.payload
            : "Failed to add category",
        );
      }
    } catch (err: any) {
      setError(err.message || "Failed to add category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Category</h3>
      <div>
        <label>
          Name:&nbsp;
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
            style={{ padding: 8, border: "1px solid #ccc", borderRadius: 4 }}
          />
        </label>
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div style={{ marginTop: 12 }}>
        <button type="submit" disabled={loading || !name.trim()}>
          {loading ? "Adding..." : "Add Category"}
        </button>
      </div>
    </form>
  );
}
