"use client";

import { Zap } from "lucide-react";

type Props = {
  name: string;
  startTime: string;
  endTime: string;
  isActive: boolean;
  isRunning: boolean;
};

export default function CompetitionInfo({
  name,
  startTime,
  endTime,
  isActive,
  isRunning,
}: Props) {
  const start = new Date(startTime);
  const end = new Date(endTime);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-300 tracking-tight">
          {name}
        </h1>
        <div className="h-1 w-20 bg-linear-to-r from-emerald-400 to-teal-300 rounded-full mt-2"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Start Time */}
        <div className="p-4 rounded-lg bg-slate-800/30 border border-emerald-500/20">
          <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            Start Time
          </p>
          <p className="text-emerald-100 mt-2 font-mono text-sm">
            {start.toLocaleString()}
          </p>
        </div>

        {/* End Time */}
        <div className="p-4 rounded-lg bg-slate-800/30 border border-emerald-500/20">
          <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            End Time
          </p>
          <p className="text-emerald-100 mt-2 font-mono text-sm">
            {end.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Status Badge */}
      <div className="flex items-center gap-4">
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
            isActive
              ? "bg-emerald-500/10 border-emerald-500/30"
              : "bg-slate-500/10 border-slate-500/30"
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full ${isActive ? "bg-emerald-400 animate-pulse" : "bg-slate-400"}`}
          ></div>
          <span
            className={`text-sm font-semibold ${isActive ? "text-emerald-300" : "text-slate-300"}`}
          >
            {isActive ? "Active" : "Inactive"}
          </span>
        </div>

        {isRunning && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/30">
            <Zap size={16} className="text-blue-400 animate-pulse" />
            <span className="text-sm font-semibold text-blue-300">Running</span>
          </div>
        )}
      </div>
    </div>
  );
}
