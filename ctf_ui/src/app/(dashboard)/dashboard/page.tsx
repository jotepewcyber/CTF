"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import type { RootState, AppDispatch } from "@/store";
import {
  fetchCompetitionInfoThunk,
  updateCompetitionThunk,
  createCompetitionThunk,
  deleteCompetitionThunk,
} from "@/store/features/Competition/competitionThunks";
import CompetitionTimer from "@/components/Competition/CompetitionTimer";
import { fetchMeThunk } from "@/store/features/Auth/authThunks";
import { useRouter } from "next/navigation";

export default function CompetitionPage() {
  const dispatch = useDispatch<AppDispatch>();
  const info = useSelector((state: RootState) => state.competition.info);
  const loading = useSelector((state: RootState) => state.competition.loading);
  const error = useSelector((state: RootState) => state.competition.error);
  const user = useSelector((state: RootState) => state.auth.user);
  const isAdmin = user?.role === "admin";

  const [editMode, setEditMode] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [form, setForm] = useState<any>(null);
  const [createForm, setCreateForm] = useState({
    name: "CTF 1",
    start_time: "2026-04-01T09:00:00Z",
    end_time: "2026-04-01T17:00:00Z",
    is_active: true,
  });
  const router = useRouter();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    dispatch(fetchMeThunk());
    dispatch(fetchCompetitionInfoThunk());
  }, [dispatch]);

  useEffect(() => {
    if (info) setForm(info);
  }, [info]);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleEdit = () => {
    setEditMode(true);
    setForm(info);
  };
  const handleCancel = () => setEditMode(false);
  const handleCreateCancel = () => setCreateMode(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f: any) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleCreateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setCreateForm((f: any) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  function toDatetimeLocal(dt: string) {
    if (!dt) return "";
    const date = new Date(dt);
    if (isNaN(date.getTime())) return "";
    const tzOffset = date.getTimezoneOffset() * 60000;
    const localISOTime = new Date(date.getTime() - tzOffset)
      .toISOString()
      .slice(0, 16);
    return localISOTime;
  }

  function fromDatetimeLocal(localValue: string) {
    if (!localValue) return "";
    const localDate = new Date(localValue);
    return localDate.toISOString();
  }

  const handleSave = async () => {
    const payload = {
      ...form,
      start_time: fromDatetimeLocal(form.start_time),
      end_time: fromDatetimeLocal(form.end_time),
    };
    await dispatch(updateCompetitionThunk({ id: info.id, data: payload }));
    setEditMode(false);
    dispatch(fetchCompetitionInfoThunk());
  };

  const handleCreate = async () => {
    const payload = {
      ...createForm,
      start_time: fromDatetimeLocal(createForm.start_time),
      end_time: fromDatetimeLocal(createForm.end_time),
    };
    await dispatch(createCompetitionThunk(payload));
    setCreateMode(false);
    dispatch(fetchCompetitionInfoThunk());
  };

  const handleDelete = async () => {
    await dispatch(deleteCompetitionThunk(info.id));
    setShowDeleteConfirm(false);
    dispatch(fetchCompetitionInfoThunk());
  };

  if (loading) return <div>Loading competition info...</div>;
  if (error || !info)
    return (
      <div style={{ margin: "40px auto", maxWidth: 600 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "20px",
          }}
        >
          {isAdmin && (
            <button
              onClick={() => setCreateMode(true)}
              style={{
                padding: "10px 28px",
                fontSize: "1rem",
                fontWeight: 500,
                background: "#22c55e",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Create Competition
            </button>
          )}
        </div>

        {createMode && (
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
              background: "#fafbff",
              padding: 22,
              borderRadius: 7,
            }}
            onSubmit={(e) => {
              e.preventDefault();
              handleCreate();
            }}
          >
            <h2>Create New Competition</h2>
            <label>
              Name:
              <input
                name="name"
                type="text"
                value={createForm.name}
                onChange={handleCreateChange}
                required
              />
            </label>
            <label>
              Start Time:
              <input
                name="start_time"
                type="datetime-local"
                value={toDatetimeLocal(createForm.start_time)}
                onChange={handleCreateChange}
                required
              />
            </label>
            <label>
              End Time:
              <input
                name="end_time"
                type="datetime-local"
                value={toDatetimeLocal(createForm.end_time)}
                onChange={handleCreateChange}
                required
              />
            </label>
            <label>
              Active:
              <input
                type="checkbox"
                name="is_active"
                checked={createForm.is_active}
                onChange={handleCreateChange}
              />
            </label>
            <div style={{ display: "flex", gap: 8 }}>
              <button type="submit">Create</button>
              <button type="button" onClick={handleCreateCancel}>
                Cancel
              </button>
            </div>
          </form>
        )}

        <div style={{ color: "red" }}>
          {error || "No active competition found"}
        </div>
      </div>
    );

  const compStart = new Date(info.start_time);
  const compEnd = new Date(info.end_time);
  const isRunning = now >= compStart && now <= compEnd;

  return (
    <div style={{ margin: "40px auto", maxWidth: 600 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        {isAdmin && (
          <button
            onClick={() => setCreateMode(true)}
            style={{
              padding: "10px 28px",
              fontSize: "1rem",
              fontWeight: 500,
              background: "#22c55e",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Create Competition
          </button>
        )}
      </div>

      {createMode && (
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            background: "#fafbff",
            padding: 22,
            borderRadius: 7,
            marginBottom: 22,
          }}
          onSubmit={(e) => {
            e.preventDefault();
            handleCreate();
          }}
        >
          <h2>Create New Competition</h2>
          <label>
            Name:
            <input
              name="name"
              type="text"
              value={createForm.name}
              onChange={handleCreateChange}
              required
            />
          </label>
          <label>
            Start Time:
            <input
              name="start_time"
              type="datetime-local"
              value={toDatetimeLocal(createForm.start_time)}
              onChange={handleCreateChange}
              required
            />
          </label>
          <label>
            End Time:
            <input
              name="end_time"
              type="datetime-local"
              value={toDatetimeLocal(createForm.end_time)}
              onChange={handleCreateChange}
              required
            />
          </label>
          <label>
            Active:
            <input
              type="checkbox"
              name="is_active"
              checked={createForm.is_active}
              onChange={handleCreateChange}
            />
          </label>
          <div style={{ display: "flex", gap: 8 }}>
            <button type="submit">Create</button>
            <button type="button" onClick={handleCreateCancel}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {showDeleteConfirm && (
        <div
          style={{
            background: "#ffebee",
            border: "2px solid #f44336",
            padding: 20,
            borderRadius: 7,
            marginBottom: 22,
          }}
        >
          <h3 style={{ color: "#f44336", marginTop: 0 }}>Confirm Delete?</h3>
          <p>Are you sure you want to delete this competition?</p>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={handleDelete}
              style={{
                padding: "8px 16px",
                background: "#f44336",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Yes, Delete
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              style={{
                padding: "8px 16px",
                background: "#ccc",
                color: "#000",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <h1>{info.name}</h1>
      <CompetitionTimer
        start={info.start_time}
        end={info.end_time}
        now={info.now}
      />
      <div>Start: {new Date(info.start_time).toLocaleString()}</div>
      <div>End: {new Date(info.end_time).toLocaleString()}</div>
      <div>Status: {info.is_active ? "Active" : "Inactive"}</div>

      {isRunning && (
        <button
          onClick={() => router.push("/challenges")}
          style={{
            margin: "20px 0 16px 0",
            padding: "10px 28px",
            fontSize: "1.2rem",
            fontWeight: 500,
            background: "#22c55e",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            letterSpacing: "0.04em",
          }}
        >
          Start
        </button>
      )}

      {isAdmin && !editMode && (
        <div style={{ display: "flex", gap: 8, marginTop: 22 }}>
          <button
            onClick={handleEdit}
            style={{
              padding: "10px 28px",
              fontSize: "1rem",
              fontWeight: 500,
              background: "#2196F3",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Edit Competition
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            style={{
              padding: "10px 28px",
              fontSize: "1rem",
              fontWeight: 500,
              background: "#f44336",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Delete Competition
          </button>
        </div>
      )}

      {isAdmin && editMode && (
        <form
          style={{
            marginTop: 22,
            display: "flex",
            flexDirection: "column",
            gap: 14,
            background: "#fafbff",
            padding: 22,
            borderRadius: 7,
          }}
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <label>
            Name:
            <input
              name="name"
              type="text"
              value={form?.name || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Start Time:
            <input
              name="start_time"
              type="datetime-local"
              value={form ? toDatetimeLocal(form.start_time) : ""}
              onChange={handleChange}
            />
          </label>
          <label>
            End Time:
            <input
              name="end_time"
              type="datetime-local"
              value={form ? toDatetimeLocal(form.end_time) : ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Active:
            <input
              type="checkbox"
              name="is_active"
              checked={!!form?.is_active}
              onChange={(e) =>
                setForm((f: any) => ({ ...f, is_active: e.target.checked }))
              }
            />
          </label>
          <div style={{ display: "flex", gap: 8 }}>
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
