"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/header";
import ReduxProvider from "@/providers/ReduxProvider";
// import AuthGuard from "@/components/AuthGuard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarPlClass = sidebarCollapsed ? "md:pl-20" : "md:pl-64";

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden">
      {/* Radial Emerald Glow Background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle 500px at 50% 300px, rgba(16,185,129,0.35), transparent)",
        }}
        aria-hidden="true"
      />
      {/* Layout Content (z-10 to render ABOVE background) */}
      <div className="relative">
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />

        <div
          className={`transition-all duration-300 ${sidebarPlClass}
                h-screen overflow-y-auto`}
        >
          {/* floating header */}
          <div className="sticky top-0 z-50">
            <Header onSidebarToggle={() => setSidebarOpen((o) => !o)} />
          </div>

          {/* page content */}
          <div className="pt-6">
            <ReduxProvider>
              {/* <AuthGuard> */}
              {children}
              {/* </AuthGuard> */}
            </ReduxProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
