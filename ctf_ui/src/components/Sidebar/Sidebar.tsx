"use client";

import Link from "next/link";
import { useState } from "react";
import { navItems } from "./NavItems";

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

  return (
    <div>
      {/* Sidebar menu button (mobile hamburger) */}
      <button
        className="bg-green-500 dark:bg-green-700 text-white p-2 rounded-full shadow-lg border border-white/30 dark:border-gray-700 backdrop-blur focus:outline-none md:hidden"
        aria-label="Open sidebar"
        onClick={onClose}
        style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.18)" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      <div className="flex flex-1">
        {/* Sidebar - Desktop */}
        <aside
          className={`hidden md:flex flex-col shrink-0
            ${collapsed ? "w-20" : "w-64"}
            bg-white/90 dark:bg-[#161B22] backdrop-blur-md shadow-lg border-r border-gray-200 dark:border-gray-800 p-4 space-y-6 fixed top-0 left-0 h-full z-30 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
            ${sidebarTransitioning ? "overflow-hidden" : "overflow-y-auto"}
          `}
          style={{
            transition:
              "width 0.7s cubic-bezier(0.22, 1, 0.36, 1), padding 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
            willChange: "width, padding",
          }}
        >
          <div
            className={`flex flex-col items-center ${collapsed ? "px-0" : "px-2"} mb-6`}
          >
            <div
              className={`transition-all duration-300 text-theme-primary dark:text-green-400 tracking-tight flex items-center justify-center
                ${collapsed ? "w-10 h-10 text-lg font-bold rounded-full bg-green-100 dark:bg-green-900" : "text-2xl font-extrabold"}
              `}
            >
              {collapsed ? <span>C</span> : "Carbonsim"}
            </div>
            <button
              className="mt-2 text-gray-700 dark:text-gray-200 hover:text-green-500 p-2 rounded-full"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              onClick={() => {
                setSidebarTransitioning(true);
                setCollapsed(!collapsed);
                setTimeout(() => setSidebarTransitioning(false), 720);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={`w-6 h-6 ${collapsed ? "text-green-500" : ""}`}
              >
                <line
                  x1="4"
                  y1="7"
                  x2="20"
                  y2="7"
                  stroke={collapsed ? "#22c55e" : "currentColor"}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="4"
                  y1="12"
                  x2="20"
                  y2="12"
                  stroke={collapsed ? "#22c55e" : "currentColor"}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="4"
                  y1="17"
                  x2="20"
                  y2="17"
                  stroke={collapsed ? "#22c55e" : "currentColor"}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <nav className={`mt-2 space-y-2`}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center w-full rounded-lg transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer ${
                  collapsed
                    ? "justify-center px-0 py-2 gap-0"
                    : "justify-start px-3 py-2 gap-3 text-left"
                } text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#222c37] hover:text-theme-primary dark:hover:text-green-400`}
                title={collapsed ? item.name : undefined}
                onClick={onClose}
              >
                <span className="flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">
                  <item.icon />
                </span>
                <span
                  className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    collapsed ? "opacity-0 max-w-0" : "opacity-100 max-w-45"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Mobile sidebar overlay */}
        {open && (
          <button
            className="fixed inset-0 z-40 bg-black/40 dark:bg-black/60 backdrop-blur-sm md:hidden border-0 p-0 cursor-pointer"
            onClick={onClose}
            onKeyDown={(e) => e.key === "Escape" && onClose()}
            aria-label="Close sidebar"
          />
        )}

        {/* Mobile sidebar */}
        <aside
          className={`fixed top-0 left-0 h-full w-64 max-w-[80%] bg-white/95 dark:bg-[#161B22] shadow-lg border-r border-gray-200 dark:border-gray-800 p-6 space-y-6 z-50 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${open ? "translate-x-0" : "-translate-x-full"}`}
          style={{ willChange: "transform" }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="text-2xl font-extrabold text-theme-primary dark:text-green-400 tracking-tight">
              Carbonsim
            </div>
            <button
              className="text-gray-700 dark:text-gray-200 hover:text-green-500"
              aria-label="Close sidebar"
              onClick={onClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="block w-full text-left px-4 py-2 rounded-lg transition-all duration-200 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#222c37] hover:text-theme-primary dark:hover:text-green-400"
                onClick={onClose}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  );
}
