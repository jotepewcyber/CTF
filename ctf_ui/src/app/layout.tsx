"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import "./globals.css";
import Header from "@/components/Header/header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarPlClass = sidebarCollapsed ? "pl-20" : "pl-64";

  return (
    <html lang="en">
      <body className="min-h-screen w-full bg-[#020617] relative overflow-x-hidden">
        {/* Radial Emerald Glow Background */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage:
              "radial-gradient(circle 500px at 50% 300px, rgba(16,185,129,0.35), transparent)",
          }}
          aria-hidden="true"
        />
        {/* Layout Content (z-10 to render ABOVE background) */}
        <div className="relative z-10">
          <Sidebar
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            collapsed={sidebarCollapsed}
            setCollapsed={setSidebarCollapsed}
          />
          <div
            className={`transition-all duration-300 ${sidebarPlClass} min-h-screen`}
          >
            <Header
              onSidebarToggle={() => setSidebarOpen((o) => !o)}
              logout={() => {}}
            />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
