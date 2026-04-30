"use client";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";
import { updateProfileThunk } from "@/store/features/Auth/authThunks";
import type { EditableUserFields } from "@/types/users";
import { useToast } from "@/components/ui-elements/toast";

export function useUpdateProfile() {
  const dispatch = useDispatch<AppDispatch>();
  const { showToast } = useToast();

  const updateProfile = useCallback(
    async (formData: Partial<EditableUserFields>) => {
      try {
        // ✅ Validate data
        const validData: Partial<EditableUserFields> = {};

        if (formData.first_name?.trim()) {
          validData.first_name = formData.first_name.trim();
        }

        if (formData.last_name?.trim()) {
          validData.last_name = formData.last_name.trim();
        }

        if (formData.email?.trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(formData.email)) {
            showToast(
              "Please enter a valid email address",
              "error",
              "bottom-right",
            );
            return false;
          }
          validData.email = formData.email.trim();
        }

        if (formData.branch?.trim()) {
          validData.branch = formData.branch.trim();
        }

        if (formData.course?.trim()) {
          validData.course = formData.course.trim();
        }

        if (formData.year !== undefined && formData.year !== null) {
          if (formData.year < 1 || formData.year > 4) {
            showToast("Year must be between 1 and 4", "error", "bottom-right");
            return false;
          }
          validData.year = formData.year;
        }

        // ✅ If no valid data, don't send
        if (Object.keys(validData).length === 0) {
          showToast("No changes made", "info", "bottom-right");
          return false;
        }

        // ✅ Dispatch thunk - updates Redux immediately
        const result = await dispatch(updateProfileThunk(validData)).unwrap();

        console.log("✅ Profile updated:", result);

        // ✅ Show success toast
        showToast("Profile updated successfully!", "success", "bottom-right");

        return true;
      } catch (error: any) {
        console.error("❌ Update profile error:", error);

        const errorMessage =
          error?.message ||
          error?.detail ||
          error?.response?.data?.detail ||
          "Failed to update profile";

        showToast(String(errorMessage), "error", "bottom-right");
        return false;
      }
    },
    [dispatch, showToast],
  );

  return { updateProfile };
}
