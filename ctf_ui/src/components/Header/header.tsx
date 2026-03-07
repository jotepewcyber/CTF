"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";

type HeaderProps = {
  user?: { name: string };
  logout: () => void;
  onSidebarToggle?: () => void;
};

export default function Header({ logout, onSidebarToggle }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(true);
  const lastScroll = useRef(0);

  // Scroll Hide Logic
  useEffect(() => {
    const onScroll = () => {
      const curr = window.scrollY;
      if (curr <= 0) {
        setShow(true);
        lastScroll.current = curr;
        return;
      }
      if (curr > lastScroll.current && curr > 50) {
        setShow(false);
      } else if (curr < lastScroll.current) {
        setShow(true);
      }
      lastScroll.current = curr;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Dropdown Close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <>
      {/* --- Mobile Header (below md) --- */}
      <header
        className={`
        w-full flex items-center justify-between px-2 py-2 md:hidden
        border-b border-gray-200 dark:border-gray-700
        bg-white dark:bg-gray-900 fixed top-0 left-0 right-0 z-40
        transition-transform duration-300 min-h-14
        ${show ? "translate-y-0" : "-translate-y-full"}
      `}
        style={{ height: "3.25rem" }}
      >
        <div className="flex items-center gap-2">
          <button
            className="flex items-center justify-center rounded-full p-2 border border-gray-200 dark:border-gray-700 mr-1"
            aria-label="Toggle sidebar"
            onClick={onSidebarToggle}
          >
            <Menu size={22} />
          </button>
          <div className="h-9 w-9 flex items-center justify-center rounded-full border border-gray-400 dark:border-gray-600 text-base font-bold bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200">
            C
          </div>
          <span className="ml-1 text-base font-extrabold font-mono text-gray-800 dark:text-white tracking-tight hidden xs:inline sm:inline">
            Carbonsim
          </span>
        </div>
        <div className="relative" ref={menuRef}>
          <button
            className="flex items-center gap-1 border border-gray-300 dark:border-gray-500 px-3 py-1 rounded-full bg-white dark:bg-gray-800 font-mono text-base hover:bg-gray-100 dark:hover:bg-gray-700 transition text-gray-800 dark:text-gray-200"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <ChevronDown size={18} className="mr-1" />
            Profile
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 overflow-hidden">
              <Link
                href="/profile"
                className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Your Profile
              </Link>
              <button
                className="block w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* --- Desktop Header (md and up) --- */}
      <header
        className={`
        mx-auto my-4 items-center justify-between px-6 py-2 rounded-full shadow-lg border border-gray-200 dark:border-gray-700
        bg-white dark:bg-gray-900 transition-all duration-300
        max-w-xl w-full sm:w-[80vw] hidden md:flex
        ${show ? "" : "opacity-0 pointer-events-none"}
      `}
        style={{ height: "3.25rem" }}
      >
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 flex items-center justify-center rounded-full border border-gray-400 dark:border-gray-600 text-base font-bold bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200">
            C
          </div>
          <span className="text-lg font-extrabold font-mono text-gray-800 dark:text-white tracking-tight">
            Carbonsim
          </span>
        </div>
        <div className="relative" ref={menuRef}>
          <button
            className="flex items-center gap-1 border border-gray-300 dark:border-gray-500 px-4 py-1.5 rounded-full bg-white dark:bg-gray-800 font-mono text-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition text-gray-800 dark:text-gray-200"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <ChevronDown size={20} className="mr-1" />
            Profile
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 overflow-hidden">
              <Link
                href="/profile"
                className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Your Profile
              </Link>
              <button
                className="block w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
