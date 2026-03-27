"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import type { RootState, AppDispatch } from "@/store";
import {
  fetchCompetitionInfoThunk,
  updateCompetitionThunk,
  createCompetitionThunk,
  deleteCompetitionThunk,
} from "@/store/features/Competition/competitionThunks";
import { fetchMeThunk } from "@/store/features/Auth/authThunks";

import CompetitionForm from "@/components/Competition/CompetitionForm";
import DeleteConfirmation from "@/components/Competition/DeleteConfirmation";
import CompetitionInfo from "@/components/Competition/CompetitionInfo";
import CompetitionTimer from "@/components/Competition/CompetitionTimer";
import { Play, Edit, Trash2, Plus } from "lucide-react";
import Lights from "@/components/Dashboard/dashboard";

export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();
  const info = useSelector((state: RootState) => state.competition.info);
  const loading = useSelector((state: RootState) => state.competition.loading);
  const error = useSelector((state: RootState) => state.competition.error);
  const user = useSelector((state: RootState) => state.auth.user);
  const isAdmin = user?.role === "admin";

  const [formMode, setFormMode] = useState<"create" | "edit" | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [now, setNow] = useState(new Date());
  const [deleteLoading, setDeleteLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchMeThunk());
    dispatch(fetchCompetitionInfoThunk());
  }, [dispatch]);

  // Update current time every second for live countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCreateSubmit = async (payload: any) => {
    await dispatch(createCompetitionThunk(payload));
    setFormMode(null);
    dispatch(fetchCompetitionInfoThunk());
  };

  const handleEditSubmit = async (payload: any) => {
    await dispatch(updateCompetitionThunk({ id: info.id, data: payload }));
    setFormMode(null);
    dispatch(fetchCompetitionInfoThunk());
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await dispatch(deleteCompetitionThunk(info.id));
      setShowDeleteConfirm(false);
      dispatch(fetchCompetitionInfoThunk());
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin mx-auto"></div>
          <p className="text-emerald-200 mt-4 font-semibold">
            Loading competition...
          </p>
        </div>
      </div>
    );
  }

  if (error || !info) {
    return (
      <div className="relative w-full min-h-screen pt-15 md:pt-0">
        <Lights />
        <div className="relative z-40 w-full">
          {/* Top Section - Create Button */}
          <div className="px-6 md:px-12 py-6 border-b border-emerald-500/10 md:mt-4 md:rounded-xl md:mx-6 md:border">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-300">
                Dashboard
              </h1>
              {isAdmin && (
                <button
                  onClick={() => setFormMode("create")}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-linear-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-200 active:scale-95"
                >
                  <Plus size={20} />
                  New Competition
                </button>
              )}
            </div>
          </div>

          {/* Error Message */}
          <div className="px-6 md:px-12 py-12">
            <div className="max-w-3xl mx-auto p-8 rounded-xl bg-red-500/10 border border-red-500/30 backdrop-blur-sm">
              <p className="text-red-300 text-center font-medium text-lg">
                {error || "No competition found. Create one to get started!"}
              </p>
            </div>
          </div>

          {formMode && (
            <CompetitionForm
              mode={formMode}
              onSubmit={handleCreateSubmit}
              onCancel={() => setFormMode(null)}
            />
          )}
        </div>
      </div>
    );
  }

  const compStart = new Date(info.start_time);
  const compEnd = new Date(info.end_time);
  const isRunning = now >= compStart && now <= compEnd;

  return (
    <div className="relative w-full min-h-screen pt-15 md:pt-0">
      <Lights />
      <div className="relative z-40 w-full">
        {/* Header Section with Actions */}
        <div className="px-6 md:px-12 py-6 md:py-8 md:mt-4 md:mx-6 md:rounded-xl border-b md:border border-emerald-500/10 bg-linear-to-r from-slate-900/50 via-slate-900/30 to-slate-900/50 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-300">
                Dashboard
              </h1>
              <div className="h-1 w-24 bg-linear-to-r from-emerald-400 to-teal-300 rounded-full mt-2"></div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 w-full md:w-auto">
              {isRunning && (
                <button
                  onClick={() => router.push("/challenges")}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-linear-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-200 active:scale-95 flex-1 md:flex-none justify-center md:justify-start"
                >
                  <Play size={18} />
                  Start Competition
                </button>
              )}

              {isAdmin && (
                <>
                  <button
                    onClick={() => setFormMode("edit")}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/30 hover:border-blue-500/50 hover:bg-blue-500/20 font-semibold transition-all duration-200 active:scale-95 flex-1 md:flex-none justify-center"
                  >
                    <Edit size={18} />
                    <span className="hidden sm:inline">Edit</span>
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-500/10 text-red-300 border border-red-500/30 hover:border-red-500/50 hover:bg-red-500/20 font-semibold transition-all duration-200 active:scale-95 flex-1 md:flex-none justify-center"
                  >
                    <Trash2 size={18} />
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                </>
              )}

              {isAdmin && !isRunning && (
                <button
                  onClick={() => setFormMode("create")}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-linear-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-200 active:scale-95 flex-1 md:flex-none justify-center md:justify-start"
                >
                  <Plus size={18} />
                  New Competition
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="px-6 md:px-12 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Competition Info & Timer */}
            <div className="lg:col-span-2 space-y-8">
              {/* Competition Info */}
              <CompetitionInfo
                name={info.name}
                startTime={info.start_time}
                endTime={info.end_time}
                isActive={info.is_active}
                isRunning={isRunning}
              />

              {/* Timer - Pass live client time instead of server time */}
              <CompetitionTimer
                start={info.start_time}
                end={info.end_time}
                now={now}
              />
            </div>

            {/* Right Column - Quick Stats (Optional) */}
            <div className="lg:col-span-1">
              <div className="p-6 rounded-xl bg-linear-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 backdrop-blur-sm space-y-4">
                <h3 className="text-lg font-semibold text-emerald-300">
                  Competition Status
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-200/70">Status:</span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        isRunning
                          ? "bg-blue-500/20 text-blue-300"
                          : info.is_active
                            ? "bg-emerald-500/20 text-emerald-300"
                            : "bg-slate-500/20 text-slate-300"
                      }`}
                    >
                      {isRunning
                        ? "Running"
                        : info.is_active
                          ? "Active"
                          : "Inactive"}
                    </span>
                  </div>
                  <div className="h-px bg-linear-to-r from-transparent via-emerald-500/20 to-transparent"></div>
                  <div className="text-xs text-emerald-200/60">
                    <p>
                      Competition runs from your configured start to end time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Forms/Modals */}
        {formMode === "create" && (
          <CompetitionForm
            mode="create"
            onSubmit={handleCreateSubmit}
            onCancel={() => setFormMode(null)}
          />
        )}

        {formMode === "edit" && (
          <CompetitionForm
            mode="edit"
            initialData={info}
            onSubmit={handleEditSubmit}
            onCancel={() => setFormMode(null)}
          />
        )}

        {showDeleteConfirm && (
          <DeleteConfirmation
            onConfirm={handleDelete}
            onCancel={() => setShowDeleteConfirm(false)}
            loading={deleteLoading}
          />
        )}
      </div>
    </div>
  );
}
