"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/header";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useSelector((state: RootState) => state.auth.user);
  const status = useSelector((state: RootState) => state.auth.status);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarPlClass = sidebarCollapsed ? "md:pl-20" : "md:pl-64";

  // ✅ Show loading only if currently fetching
  if (status === "loading" && !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-emerald-200 font-semibold">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden">
      {/* Radial Emerald Glow Background */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle 500px at 50% 300px, rgba(16,185,129,0.35), transparent)",
        }}
        aria-hidden="true"
      />

      {/* Layout Content */}
      <div className="relative z-10">
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />

        <div
          className={`transition-all duration-300 ${sidebarPlClass} h-screen overflow-y-auto`}
        >
          {/* Floating header */}
          <div className="sticky top-0 z-40">
            <Header onSidebarToggle={() => setSidebarOpen((o) => !o)} />
          </div>

          {/* Page content */}
          <div className="pt-6 px-6 md:px-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
