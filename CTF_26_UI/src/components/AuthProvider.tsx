"use client";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import { fetchMeThunk } from "@/store/features/Auth/authThunks";
import { setInitialized } from "@/store/features/Auth/authSlice";
import { usePathname, useRouter } from "next/navigation";

const PUBLIC_PATHS = ["/", "/login", "/signup", "/forgot-password"];

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useDispatch<AppDispatch>();
  const initialized = useSelector((state: RootState) => state.auth.initialized);
  const access = useSelector((state: RootState) => state.auth.access);
  const user = useSelector((state: RootState) => state.auth.user);
  const pathname = usePathname();
  const router = useRouter();
  const fetchAttempted = useRef(false); // ✅ Prevent multiple fetch attempts

  // ✅ Initialize auth ONCE on app load
  useEffect(() => {
    if (!initialized && !fetchAttempted.current) {
      fetchAttempted.current = true; // ✅ Mark that we've tried

      if (access) {
        console.log("🔄 AuthProvider: Fetching user (has access token)");
        dispatch(fetchMeThunk());
      } else {
        console.log("✅ AuthProvider: No token, marking initialized");
        dispatch(setInitialized(true));
      }
    }
  }, [dispatch, initialized, access]); // ✅ Remove fetchAttempted from deps

  // ✅ Guard protected routes
  useEffect(() => {
    if (initialized && !PUBLIC_PATHS.includes(pathname)) {
      const accessToken =
        typeof window !== "undefined" ? localStorage.getItem("access") : null;

      if (!user && !accessToken) {
        console.log("🚫 AuthProvider: No user/token, redirecting to login");
        router.replace("/login");
      }
    }
  }, [initialized, user, pathname, router]);

  // ✅ Redirect logged-in users away from auth pages
  useEffect(() => {
    if (
      initialized &&
      user &&
      (pathname === "/login" || pathname === "/signup")
    ) {
      console.log("📍 AuthProvider: User logged in, redirecting to dashboard");
      router.replace("/dashboard");
    }
  }, [initialized, user, pathname, router]);

  // ✅ Show loading screen only for protected routes
  if (!initialized && !PUBLIC_PATHS.includes(pathname)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-emerald-200 font-semibold">Initializing...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
