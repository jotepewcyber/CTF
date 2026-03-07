"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";
import { logoutThunk } from "@/store/features/Auth/authThunks";
import { useToast } from "@/components/ui-elements/toast";

type LogoutOptions = {
  redirectTo?: string;
  successMessage?: string;
  errorMessage?: string;
};

export function useLogout() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { showToast } = useToast();

  const logout = useCallback(
    async (options: LogoutOptions = {}) => {
      const {
        redirectTo = "/login",
        successMessage = "Logged out successfully.",
        errorMessage = "Logout failed. Please try again.",
      } = options;

      try {
        await dispatch(logoutThunk()).unwrap();
        showToast(successMessage, "success", "bottom-right");
        router.push(redirectTo);
      } catch (error: any) {
        const message =
          error?.response?.data?.detail ||
          error?.response?.data?.error ||
          error?.message ||
          errorMessage;

        showToast(String(message), "error", "bottom-right");
        throw error;
      }
    },
    [dispatch, router, showToast],
  );

  return { logout };
}
