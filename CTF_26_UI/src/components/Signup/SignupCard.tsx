"use client";

import React from "react";
import { SignupForm } from "@/types/auth";
import SignupHeader from "./SignupHeader";
import SignupFormFields from "./SignupFormFields";
import SignupFooter from "./SignupFooter";

interface SignupCardProps {
  form: SignupForm;
  errors: { [key: string]: string };
  touched: { [key: string]: boolean };
  showPassword: boolean;
  courses: { value: string; label: string }[];
  branches: { value: string; label: string }[];
  status: string;
  error: string | null;
  onFormChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  onShowPasswordToggle: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function SignupCard({
  form,
  errors,
  touched,
  showPassword,
  courses,
  branches,
  status,
  error,
  onFormChange,
  onShowPasswordToggle,
  onSubmit,
}: SignupCardProps) {
  return (
    <div className="p-8 rounded-2xl backdrop-blur-sm bg-black/50 border border-white/10">
      <SignupHeader />
      <form onSubmit={onSubmit} className="space-y-4" autoComplete="off">
        <SignupFormFields
          form={form}
          errors={errors}
          touched={touched}
          showPassword={showPassword}
          courses={courses}
          branches={branches}
          status={status}
          error={error}
          onFormChange={onFormChange}
          onShowPasswordToggle={onShowPasswordToggle}
        />
      </form>
      <SignupFooter />
    </div>
  );
}
