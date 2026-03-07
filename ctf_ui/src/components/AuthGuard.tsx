"use client";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import type { RootState } from "@/store";

// List of routes that are considered public
const PUBLIC_PATHS = ["/", "/login", "/signup"];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If not on a public path
    if (!PUBLIC_PATHS.includes(pathname)) {
      const accessToken =
        typeof window !== "undefined" ? localStorage.getItem("access") : null;
      if (!user && !accessToken) {
        router.replace("/login");
      }
    }
  }, [user, pathname, router]);

  return <>{children}</>;
}
