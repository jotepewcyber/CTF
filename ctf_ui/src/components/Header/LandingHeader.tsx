"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";
// import Image from "next/image";
// import LandingNavbarLogo from "../../assets/images/Logo_down_light.svg";

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

  // Hide on scroll (mobile only)
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

  // Dropdown close on outside click (mobile)
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

  // Brand bar
  const BrandBar = (
    <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-emerald-400 via-emerald-500 to-green-300 rounded-t-2xl opacity-80" />
  );

  const navItems = [
    { href: "#features", label: "Features" },
    { href: "#why-choose-us", label: "Why Choose Us" },
    { href: "#pricing", label: "Pricing" },
  ];

  return (
    <>
      {/* Mobile Navbar */}
      <header
        className={`
          w-full flex items-center justify-between px-2 py-1 md:hidden
          fixed top-0 left-0 right-0 z-110
          backdrop-blur-md shadow-lg border-b border-emerald-100/20
          transition-transform duration-300
          ${
            show
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0 pointer-events-none"
          }
        `}
        style={{ height: "3rem" }}
      >
        {/* Brand/Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="select-none flex items-center">
            {/* <Image
              src={LandingNavbarLogo}
              alt="CTF Logo"
              width={100}
              height={32}
              priority
              className="h-8 w-auto"
            /> */}
          </Link>
        </div>
        {/* Hamburger and dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            className="
              flex items-center justify-center rounded-full p-2
              border border-emerald-400
              bg-white/10 hover:bg-white/20 active:bg-white/30 transition
            "
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <Menu size={22} className="text-emerald-200" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-900 border border-emerald-200/30 rounded-xl shadow-xl z-50 overflow-hidden flex flex-col py-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-6 py-2 text-emerald-900 dark:text-emerald-100 hover:bg-emerald-50/80 dark:hover:bg-emerald-900/20 text-base font-medium transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {/* Login/Dashboard Button */}
              <button
                className="block px-6 py-2 mt-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-bold shadow transition-colors"
                onMouseDown={() => {
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
        className={`
          fixed top-0 left-0 right-0 z-110
          items-center justify-between px-8 py-3 rounded-b-2xl shadow-lg border-b border-emerald-200/25 bg-opacity-95 backdrop-blur-md transition-all duration-300 max-w-4xl w-[95vw] mx-auto hidden md:flex opacity-100
        `}
        style={{ height: "4.1rem", minHeight: 52 }}
      >
        {BrandBar}
        <div className="flex items-center gap-4">
          <Link href="/" className="select-none flex items-center">
            {/* <Image
              src={LandingNavbarLogo}
              alt="CTF Logo"
              width={140}
              height={40}
              priority
              className="h-10 w-auto"
            /> */}
          </Link>
        </div>
        <div className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-emerald-100 hover:text-white text-base font-semibold px-2 py-1.5 transition-colors rounded"
            >
              {item.label}
            </Link>
          ))}
          <button
            className="ml-4 px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg shadow transition-all"
            onMouseDown={() => {
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
      </header>
      {/* Add a spacer for fixed header */}
      <div className="hidden md:block" style={{ height: "4.1rem" }} />
    </>
  );
}
