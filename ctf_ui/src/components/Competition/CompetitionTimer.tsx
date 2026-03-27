"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { useMemo } from "react";

interface CompetitionTimerProps {
  start: string;
  end: string;
  now: Date;
}

export default function CompetitionTimer({
  start,
  end,
  now,
}: CompetitionTimerProps) {
  const startTime = new Date(start);
  const endTime = new Date(end);

  const timeData = useMemo(() => {
    const current = now.getTime();
    const startMs = startTime.getTime();
    const endMs = endTime.getTime();

    // Calculate time remaining
    let remaining = 0;
    let status = "not-started";
    let progressPercent = 0;

    if (current < startMs) {
      // Competition hasn't started
      remaining = startMs - current;
      status = "not-started";
      progressPercent = 0;
    } else if (current >= startMs && current <= endMs) {
      // Competition is running
      remaining = endMs - current;
      status = "running";
      const totalDuration = endMs - startMs;
      const elapsed = current - startMs;
      progressPercent = (elapsed / totalDuration) * 100;
    } else {
      // Competition has ended
      remaining = 0;
      status = "ended";
      progressPercent = 100;
    }

    // Format time
    const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
      status,
      progressPercent,
      remaining,
    };
  }, [now, startTime, endTime]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "from-blue-500/20 to-cyan-500/20 border-blue-500/30";
      case "not-started":
        return "from-yellow-500/20 to-amber-500/20 border-yellow-500/30";
      case "ended":
        return "from-slate-500/20 to-gray-500/20 border-slate-500/30";
      default:
        return "from-emerald-500/20 to-teal-500/20 border-emerald-500/30";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "running":
        return {
          text: "Running",
          color: "bg-blue-500/20 text-blue-300 border-blue-500/30",
        };
      case "not-started":
        return {
          text: "Not Started",
          color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
        };
      case "ended":
        return {
          text: "Ended",
          color: "bg-slate-500/20 text-slate-300 border-slate-500/30",
        };
      default:
        return {
          text: "Unknown",
          color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
        };
    }
  };

  const badge = getStatusBadge(timeData.status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`p-8 rounded-xl bg-linear-to-br ${getStatusColor(timeData.status)} border backdrop-blur-sm`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Clock className="w-6 h-6 text-emerald-400" />
          <h3 className="text-2xl font-bold text-emerald-300">
            {timeData.status === "running"
              ? "Time Remaining"
              : timeData.status === "not-started"
                ? "Starts In"
                : "Competition Ended"}
          </h3>
        </div>
        <span
          className={`px-4 py-2 rounded-full text-sm font-semibold border ${badge.color}`}
        >
          {badge.text}
        </span>
      </div>

      {/* Countdown Display */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: "Days", value: timeData.days },
          { label: "Hours", value: timeData.hours },
          { label: "Minutes", value: timeData.minutes },
          { label: "Seconds", value: timeData.seconds },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="p-4 rounded-lg bg-black/40 border border-emerald-500/20 text-center"
          >
            <div className="text-3xl md:text-4xl font-black text-emerald-400 font-mono mb-2">
              {String(item.value).padStart(2, "0")}
            </div>
            <div className="text-sm text-emerald-200/70 uppercase tracking-wider">
              {item.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="h-2 rounded-full bg-black/50 overflow-hidden border border-emerald-500/20">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${timeData.progressPercent}%` }}
            transition={{ duration: 1, ease: "linear" }}
            className="h-full bg-linear-to-r from-emerald-500 to-teal-500"
          />
        </div>
        <p className="text-xs text-emerald-200/60 text-right">
          {Math.round(timeData.progressPercent)}% Complete
        </p>
      </div>
    </motion.div>
  );
}
