"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LandingHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [show, setShow] = useState(true);
  const lastScroll = useRef(0);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("access")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

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

  const navItems = [
    { href: "#aboutus", label: "About us" },
    { href: "#contactus", label: "Contact Us" },
    { href: "#results", label: "Results" },
  ];

  return (
    <>
      {/* Mobile Navbar */}
      <header
        className={`
          w-full flex items-center justify-between px-4 py-3 md:hidden
          fixed top-0 left-0 right-0 z-50
          bg-black border-b border-emerald-500/20
          transition-transform duration-300
          ${
            show
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0 pointer-events-none"
          }
        `}
      >
        <Link href="/" className="select-none flex items-center">
          <span className="text-lg font-black text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-300 tracking-wider">
            CTF Arena
          </span>
        </Link>

        <div className="relative" ref={menuRef}>
          <button
            className="
              flex items-center justify-center rounded-lg p-2
              border border-emerald-500/30
              bg-emerald-500/10 hover:bg-emerald-500/20 active:bg-emerald-500/30 transition
            "
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <X size={20} className="text-emerald-400" />
            ) : (
              <Menu size={20} className="text-emerald-400" />
            )}
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-black border border-emerald-500/30 rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col py-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2.5 text-emerald-200 hover:text-emerald-100 hover:bg-emerald-500/10 text-sm font-medium transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="h-px bg-linear-to-r from-transparent via-emerald-500/20 to-transparent my-2"></div>

              <button
                className="mx-3 px-4 py-2.5 bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-lg font-semibold shadow transition-all active:scale-95"
                onClick={() => {
                  setMenuOpen(false);
                  if (
                    typeof window !== "undefined" &&
                    localStorage.getItem("access")
                  ) {
                    router.push("/dashboard");
                  } else {
                    router.push("/login");
                  }
                }}
              >
                {isLoggedIn ? "Dashboard" : "Login"}
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Desktop Navbar */}
      <header
        className="
          fixed top-0 left-1/2 -translate-x-1/2 z-50
          items-center justify-between px-8 py-4
          rounded-b-2xl shadow-xl
          border border-emerald-500/20 border-t-0
          bg-black
          transition-all duration-300
          max-w-6xl w-[90vw]
          hidden md:flex
        "
      >
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-emerald-500/50 to-transparent rounded-t-2xl"></div>

        <Link href="/" className="select-none flex items-center">
          <span className="text-2xl font-black text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-300 tracking-tight">
            CTF Arena
          </span>
        </Link>

        <div className="flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-emerald-200 hover:text-emerald-100 text-sm font-semibold transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <button
          className="px-6 py-2.5 bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold rounded-lg shadow-lg transition-all active:scale-95"
          onClick={() => {
            if (
              typeof window !== "undefined" &&
              localStorage.getItem("access")
            ) {
              router.push("/dashboard");
            } else {
              router.push("/login");
            }
          }}
        >
          {isLoggedIn ? "Dashboard" : "Login"}
        </button>
      </header>

      <div className="hidden md:block h-20" />
    </>
  );
}
