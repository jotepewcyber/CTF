"use client";

import Link from "next/link";
import { useState } from "react";
import { navItems } from "./NavItems";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type SidebarProps = {
  collapsed: boolean;
  setCollapsed: (b: boolean) => void;
  open: boolean;
  onClose: () => void;
};

export default function Sidebar({
  collapsed,
  setCollapsed,
  open,
  onClose,
}: SidebarProps) {
  const [sidebarTransitioning, setSidebarTransitioning] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const isAdmin = user?.role === "admin";

  return (
    <div>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col shrink-0
          ${collapsed ? "w-20" : "w-72"}
          bg-linear-to-b from-slate-950 via-slate-900 to-slate-950
          backdrop-blur-xl shadow-2xl border-r border-emerald-500/20
          p-4 space-y-6 fixed top-0 left-0 h-full z-30
          transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${sidebarTransitioning ? "overflow-hidden" : "overflow-y-auto"}
        `}
        style={{
          transition:
            "width 0.7s cubic-bezier(0.22, 1, 0.36, 1), padding 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
          willChange: "width, padding",
        }}
      >
        {/* Logo Section */}
        <div
          className={`flex flex-col items-center ${collapsed ? "px-0" : "px-2"} transition-all duration-300`}
        >
          <div
            className={`flex items-center justify-center transition-all duration-300
              ${
                collapsed
                  ? "w-12 h-12 rounded-lg bg-linear-to-br from-emerald-400 to-teal-400 text-slate-900"
                  : "text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-300"
              }
            `}
          >
            {collapsed ? (
              <span className="font-bold">CTF</span>
            ) : (
              <span className="tracking-wider">CTF ARENA</span>
            )}
          </div>

          {!collapsed && (
            <div className="h-0.5 w-16 bg-linear-to-r from-emerald-400 to-teal-300 rounded-full mt-2 mx-auto"></div>
          )}

          {/* Collapse Button */}
          <button
            className="mt-4 text-emerald-400/60 hover:text-emerald-300 p-2 rounded-lg hover:bg-emerald-500/10 transition-all duration-200 active:scale-95"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={() => {
              setSidebarTransitioning(true);
              setCollapsed(!collapsed);
              setTimeout(() => setSidebarTransitioning(false), 720);
            }}
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-linear-to-r from-transparent via-emerald-500/20 to-transparent"></div>

        {/* Navigation */}
        <nav className="mt-2 space-y-1 flex-1">
          {navItems
            .filter((item) => !item.adminOnly || isAdmin)
            .map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center w-full rounded-lg transition-all duration-200
                  ${
                    collapsed
                      ? "justify-center px-2 py-3 gap-0"
                      : "justify-start px-3 py-2.5 gap-3 text-left"
                  }
                  text-emerald-200/70 hover:text-emerald-100
                  hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500/20
                  group relative
                `}
                title={collapsed ? item.name : undefined}
                onClick={onClose}
              >
                {/* Icon */}
                <span className="flex items-center justify-center shrink-0 w-5 h-5 text-emerald-400/80 group-hover:text-emerald-300 transition-colors">
                  <item.icon size={20} />
                </span>

                {/* Label */}
                <span
                  className={`whitespace-nowrap font-medium transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
                    ${
                      collapsed
                        ? "opacity-0 max-w-0 overflow-hidden"
                        : "opacity-100 max-w-full"
                    }
                  `}
                >
                  {item.name}
                </span>

                {/* Hover indicator */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-linear-to-b from-emerald-400 to-teal-400 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </Link>
            ))}
        </nav>

        {/* Admin Badge */}
        {isAdmin && (
          <div className="pt-4 border-t border-emerald-500/20">
            <div
              className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 ${
                collapsed ? "justify-center" : ""
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              {!collapsed && (
                <span className="text-xs font-semibold text-emerald-300">
                  Admin
                </span>
              )}
            </div>
          </div>
        )}
      </aside>

      {/* Mobile Overlay */}
      {open && (
        <button
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden border-0 p-0 cursor-default transition-opacity duration-300"
          onClick={onClose}
          onKeyDown={(e) => e.key === "Escape" && onClose()}
          aria-label="Close sidebar"
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 max-w-[90%] bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 backdrop-blur-xl shadow-2xl border-r border-emerald-500/20 p-6 space-y-6 z-50 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
        style={{ willChange: "transform" }}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-linear-to-br from-emerald-400 to-teal-400 flex items-center justify-center">
              <span className="font-black text-slate-900 text-sm">CF</span>
            </div>
            <div>
              <h1 className="text-lg font-black text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-300 tracking-wider">
                CTF
              </h1>
              <div className="h-0.5 w-8 bg-linear-to-r from-emerald-400 to-teal-300 rounded-full"></div>
            </div>
          </div>
          <button
            className="text-emerald-400/60 hover:text-emerald-300 p-2 rounded-lg hover:bg-emerald-500/10 transition-all duration-200 active:scale-95"
            aria-label="Close sidebar"
            onClick={onClose}
          >
            <X size={22} />
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-linear-to-r from-transparent via-emerald-500/20 to-transparent"></div>

        {/* Mobile Navigation */}
        <nav className="space-y-1">
          {navItems
            .filter((item) => !item.adminOnly || isAdmin)
            .map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg transition-all duration-200
                  text-emerald-200/70 hover:text-emerald-100
                  hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500/20
                  group"
                onClick={onClose}
              >
                <span className="flex items-center justify-center w-5 h-5 text-emerald-400/80 group-hover:text-emerald-300 transition-colors">
                  <item.icon size={20} />
                </span>
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
        </nav>

        {/* Mobile Admin Badge */}
        {isAdmin && (
          <div className="pt-4 border-t border-emerald-500/20">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-sm font-semibold text-emerald-300">
                Administrator
              </span>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
