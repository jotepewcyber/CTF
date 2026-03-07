"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useLogout } from "@/lib/hooks/useLogout";

type HeaderProps = {
  onSidebarToggle?: () => void;
};

// Returns first letter of user's first_name or "C" as fallback for avatar
function getAvatarLetter(user: any) {
  return (user?.first_name?.[0] || "C").toUpperCase();
}
// Returns user's first_name or fallback "Profile"
function getUserDisplayName(user: any) {
  return user?.first_name || "Profile";
}

export default function Header({ onSidebarToggle }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(true);
  const lastScroll = useRef(0);
  const router = useRouter();
  const userFromRedux = useSelector((state: RootState) => state.auth.user);
  const [user, setUser] = useState<any>(userFromRedux);
  const { logout } = useLogout();

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

  // Hydrating the user from localStorage ONLY if Redux user is empty
  useEffect(() => {
    if (userFromRedux) {
      setUser(userFromRedux);
    } else {
      try {
        const userLS = localStorage.getItem("user");
        if (userLS) {
          // If you store the full user object in localStorage:
          setUser(JSON.parse(userLS));
          // If you store only the name string, like "Manish Gupta"
          // setUser({ first_name: userLS });
        }
      } catch {}
    }
  }, [userFromRedux]);

  // Brand bar for accent
  const BrandBar = (
    <div className="absolute left-0 right-0 top-0 h-1 rounded-t-2xl bg-[linear-gradient(90deg,#6ee7b7_0%,#34d399_50%,#a7f3d0_100%)] blur-[2px] opacity-80" />
  );

  const handleLogout = () => {
    logout(); // or logout({ redirectTo: "/login" })
  };

  return (
    <>
      {/* Mobile */}
      <header
        className={`
        w-full flex items-center justify-between px-3 py-2 md:hidden
        fixed top-0 left-0 right-0 z-110
        bg-white/80 backdrop-blur-md shadow-md border-b border-emerald-100
        transition-transform duration-300
        ${
          show
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }
      `}
        style={{ height: "3.25rem" }}
      >
        {/* Brand Hamburger & Logo */}
        <div className="flex items-center gap-2">
          <button
            className="flex items-center justify-center rounded-full p-2 border border-emerald-100 bg-white hover:bg-emerald-50 active:bg-emerald-100 transition mr-1"
            aria-label="Toggle sidebar"
            onClick={onSidebarToggle}
          >
            <Menu size={22} className="text-emerald-500" />
          </button>
          <span className="ml-1 text-xl font-extrabold font-mono text-emerald-500 drop-shadow tracking-tight select-none">
            CTF
          </span>
        </div>
        {/* Profile dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            className="
              flex items-center gap-2
              bg-white border border-emerald-100
              px-2.5 py-1 rounded-full
              text-emerald-700 font-semibold text-base
              transition focus:outline-none shadow
              hover:bg-emerald-50
            "
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="w-8 h-8 bg-emerald-100 flex items-center justify-center rounded-full font-bold text-emerald-700 shadow-inner">
              {getAvatarLetter(user)}
            </span>
            <span className="font-semibold text-base">
              {getUserDisplayName(user)}
            </span>
            <ChevronDown
              size={18}
              className={`ml-1 transition-transform text-emerald-700 ${menuOpen ? "rotate-180" : ""}`}
            />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-3 min-w-45 bg-white border border-emerald-100 rounded-xl shadow-lg z-50 overflow-hidden">
              {/* Show name/email info only */}
              <div className="py-2 px-4 border-b border-emerald-100 text-xs text-emerald-700 font-semibold">
                {getUserDisplayName(user)}
                <br />
                <span className="font-mono text-gray-400 text-xs">
                  {user?.email}
                </span>
              </div>
              {/* Profile link */}
              <Link
                href="/profile"
                className="block px-4 py-2 cursor-pointer text-emerald-700 hover:bg-emerald-50 transition-colors rounded text-sm"
                onMouseDown={(e) => {
                  e.preventDefault();
                  router.push("/profile");
                  setMenuOpen(false);
                }}
              >
                Profile
              </Link>
              {/* Logout button */}
              <button
                className="block w-full text-left px-4 py-2 cursor-pointer text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors rounded text-sm"
                onMouseDown={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Desktop */}
      <header
        className={`
    relative items-center justify-between
    px-6 py-2 rounded-2xl shadow-lg border border-emerald-100
    bg-white/80 backdrop-blur-md
    transition-transform duration-300
    hidden md:flex
    ${show ? "translate-y-0" : "-translate-y-full"}
  `}
      >
        {BrandBar}
        <div className="flex items-center gap-4">
          <div className="text-2xl font-bold font-mono text-emerald-600 tracking-tight select-none">
            CTF
          </div>
        </div>
        <div className="relative" ref={menuRef}>
          <button
            className="flex items-center gap-2
            bg-white border border-emerald-100
            px-3 py-1.5 rounded-full
            text-emerald-700 font-semibold text-base
            transition focus:outline-none shadow
            hover:bg-emerald-50"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="w-9 h-9 bg-emerald-100 flex items-center justify-center rounded-full font-bold text-emerald-700 text-[1.1rem] shadow-inner border-2 border-emerald-200">
              {getAvatarLetter(user)}
            </span>
            <span className="font-semibold text-base">
              {getUserDisplayName(user)}
            </span>
            <ChevronDown
              size={20}
              className={`transition-transform text-emerald-700 ${menuOpen ? "rotate-180" : ""}`}
            />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-3 min-w-52.5 bg-white border border-emerald-100 rounded-xl shadow-lg z-120 overflow-hidden">
              {/* Show name/email info only */}
              <div className="py-2 px-4 border-b border-emerald-100 text-xs text-emerald-700 font-semibold">
                {getUserDisplayName(user)}
                <br />
                <span className="font-mono text-gray-400 text-xs">
                  {user?.email}
                </span>
              </div>
              {/* Profile link */}
              <Link
                href="/profile"
                className="block px-4 py-2 text-emerald-700 hover:bg-emerald-50 transition-colors text-sm"
                onClick={() => setMenuOpen(false)}
              >
                Your Profile
              </Link>
              {/* Logout button */}
              <button
                className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors text-sm"
                onClick={() => {
                  handleLogout();
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
