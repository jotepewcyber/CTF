"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Menu, LogOut, User } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useLogout } from "@/lib/hooks/useLogout"; // ✅ Import hook

type HeaderProps = {
  onSidebarToggle?: () => void;
};

function getAvatarLetter(user: any) {
  return (user?.first_name?.[0] || "C").toUpperCase();
}

function getUserDisplayName(user: any) {
  return user?.first_name || "Profile";
}

export default function Header({ onSidebarToggle }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(true);
  const lastScroll = useRef(0);

  const userFromRedux = useSelector((state: RootState) => state.auth.user);
  const [user, setUser] = useState<any>(userFromRedux);

  const { logout } = useLogout(); // ✅ Use hook

  // Hide on scroll
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

  // Dropdown close on outside click
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

  // Sync user from Redux
  useEffect(() => {
    if (userFromRedux) {
      setUser(userFromRedux);
    }
  }, [userFromRedux]);

  // ✅ Simple logout handler
  const handleLogout = async () => {
    await logout(); // ✅ That's it!
    setMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <header
        className={`
          w-full fixed top-0 left-0 right-0 z-50
          px-4 py-3 md:hidden
          bg-linear-to-r from-slate-950 via-slate-900 to-slate-950
          border-b border-emerald-500/20 shadow-xl
          transition-transform duration-300
          ${show ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <div className="flex items-center justify-between">
          {/* Left: Menu & Logo */}
          <div className="flex items-center gap-3">
            <button
              className="
                flex items-center justify-center
                w-10 h-10 rounded-lg
                bg-emerald-500/10 hover:bg-emerald-500/20
                border border-emerald-500/30 hover:border-emerald-500/50
                text-emerald-400 hover:text-emerald-300
                transition-all duration-200 active:scale-95
              "
              aria-label="Toggle sidebar"
              onClick={onSidebarToggle}
            >
              <Menu size={20} />
            </button>
            <div className="flex flex-col">
              <span className="text-lg font-black font-mono text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-300 tracking-wider">
                CTF
              </span>
              <div className="h-0.5 w-8 bg-linear-to-r from-emerald-400 to-teal-300 rounded-full"></div>
            </div>
          </div>

          {/* Right: Profile */}
          <div className="relative" ref={menuRef}>
            <button
              className="
                flex items-center gap-2.5
                px-3 py-1.5 rounded-xl
                bg-emerald-500/10 hover:bg-emerald-500/20
                border border-emerald-500/30 hover:border-emerald-500/50
                text-emerald-200 hover:text-emerald-100
                transition-all duration-200 active:scale-95
              "
              onClick={() => setMenuOpen((v) => !v)}
            >
              <div className="w-8 h-8 bg-linear-to-br from-emerald-400 to-teal-400 flex items-center justify-center rounded-lg font-bold text-slate-900 text-sm shadow-lg">
                {getAvatarLetter(user)}
              </div>
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${menuOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown Menu */}
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-slate-900/95 backdrop-blur-xl border border-emerald-500/30 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* User Info */}
                <div className="px-4 py-3 border-b border-emerald-500/20 bg-linear-to-r from-emerald-500/10 to-teal-500/10">
                  <p className="text-sm font-semibold text-emerald-200">
                    {getUserDisplayName(user)}
                  </p>
                  <p className="text-xs text-emerald-400/70 font-mono mt-1">
                    {user?.email}
                  </p>
                </div>

                {/* Menu Items */}
                <div className="py-1">
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-4 py-2.5 text-emerald-200 hover:text-emerald-100 hover:bg-emerald-500/10 transition-all duration-150 text-sm"
                    onClick={() => setMenuOpen(false)}
                  >
                    <User size={16} />
                    Your Profile
                  </Link>
                  <button
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-red-400/80 hover:text-red-300 hover:bg-red-500/10 transition-all duration-150 text-sm"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Desktop Header */}
      <header
        className={`
          relative hidden md:flex items-center justify-between
          mx-6 mt-4 px-6 py-3.5 rounded-xl
          bg-linear-to-r from-slate-950 via-slate-900 to-slate-950
          border border-emerald-500/20 shadow-2xl
          transition-all duration-300
          ${show ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"}
        `}
      >
        {/* Gradient Border Top */}
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-emerald-500/50 to-transparent rounded-t-xl"></div>

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-linear-to-br from-emerald-400 to-teal-400 shadow-lg">
            <span className="font-black text-slate-900 text-sm">CTF</span>
          </div>
          <div>
            <h1 className="text-xl font-black font-mono text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-300 tracking-wider">
              CTF ARENA
            </h1>
            <div className="h-0.5 w-12 bg-linear-to-r from-emerald-400 to-teal-300 rounded-full"></div>
          </div>
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            className="
              flex items-center gap-3
              px-4 py-2 rounded-lg
              bg-emerald-500/10 hover:bg-emerald-500/20
              border border-emerald-500/30 hover:border-emerald-500/50
              text-emerald-200 hover:text-emerald-100
              transition-all duration-200 active:scale-95
              group
            "
            onClick={() => setMenuOpen((v) => !v)}
          >
            <div className="w-9 h-9 bg-linear-to-br from-emerald-400 to-teal-400 flex items-center justify-center rounded-lg font-bold text-slate-900 shadow-lg group-hover:shadow-emerald-500/50 transition-shadow">
              {getAvatarLetter(user)}
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm font-semibold text-emerald-100">
                {getUserDisplayName(user)}
              </span>
              <span className="text-xs text-emerald-400/60">
                {user?.role === "admin" ? "Administrator" : "Participant"}
              </span>
            </div>
            <ChevronDown
              size={18}
              className={`ml-1 transition-transform duration-300 ${menuOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* Dropdown Menu */}
          {menuOpen && (
            <div className="absolute right-0 mt-3 w-64 bg-slate-900/95 backdrop-blur-xl border border-emerald-500/30 rounded-xl shadow-2xl z-120 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              {/* User Info Header */}
              <div className="px-4 py-3.5 border-b border-emerald-500/20 bg-linear-to-r from-emerald-500/10 to-teal-500/10">
                <p className="text-sm font-semibold text-emerald-200">
                  {getUserDisplayName(user)}
                </p>
                <p className="text-xs text-emerald-400/70 font-mono mt-1.5">
                  {user?.email}
                </p>
                {user?.role === "admin" && (
                  <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold text-emerald-300 bg-emerald-500/20 border border-emerald-500/30 rounded">
                    Admin
                  </span>
                )}
              </div>

              {/* Menu Items */}
              <div className="py-1">
                <Link
                  href="/profile"
                  className="flex items-center gap-3 px-4 py-2.5 text-emerald-200 hover:text-emerald-100 hover:bg-emerald-500/10 transition-all duration-150 text-sm group"
                  onClick={() => setMenuOpen(false)}
                >
                  <User size={16} className="group-hover:text-emerald-300" />
                  Your Profile
                </Link>
                <button
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-red-400/80 hover:text-red-300 hover:bg-red-500/10 transition-all duration-150 text-sm group"
                  onClick={handleLogout}
                >
                  <LogOut size={16} className="group-hover:text-red-400" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
