"use client";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { logoutThunk } from "@/store/features/Auth/authThunks";
import { clearSuccessMessage } from "@/store/features/Auth/authSlice";
import { useToast } from "@/components/ui-elements/toast";

type LogoutOptions = {
  redirectTo?: string;
  showMessage?: boolean;
};

export function useLogout() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { showToast } = useToast();
  const successMessage = useSelector(
    (state: RootState) => state.auth.successMessage,
  );

  // ✅ logout function
  const logout = useCallback(
    async (options: LogoutOptions = {}) => {
      const { redirectTo = "/login", showMessage = true } = options;

      try {
        // ✅ Dispatch thunk
        await dispatch(logoutThunk()).unwrap();

        // ✅ Show success message
        if (showMessage) {
          showToast(
            successMessage || "Logged out successfully!",
            "success",
            "bottom-right",
          );
        }

        // ✅ Clear state
        dispatch(clearSuccessMessage());

        // ✅ Redirect
        router.push(redirectTo);
      } catch (error: any) {
        console.error("❌ Logout error:", error);

        const errorMessage =
          error?.response?.data?.detail ||
          error?.response?.data?.error ||
          error?.message ||
          "Logout failed. Please try again.";

        showToast(String(errorMessage), "error", "bottom-right");
      }
    },
    [dispatch, router, showToast, successMessage],
  );

  return { logout };
}
