"use client";

import React from "react";
import LoginHeader from "./LoginHeader";
import LoginForm from "./LoginForm";
import LoginFooter from "./LoginFooter";

interface LoginCardProps {
  form: {
    username: string;
    password: string;
  };
  errors: { [key: string]: string };
  touched: { [key: string]: boolean };
  remember: boolean;
  status: string;
  error: string | null;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRememberChange: (checked: boolean) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function LoginCard({
  form,
  errors,
  touched,
  remember,
  status,
  error,
  onFormChange,
  onRememberChange,
  onSubmit,
}: LoginCardProps) {
  return (
    <div className="p-8 rounded-2xl backdrop-blur-sm bg-black/50 border border-white/10">
      <LoginHeader />
      <LoginForm
        form={form}
        errors={errors}
        touched={touched}
        remember={remember}
        status={status}
        error={error}
        onFormChange={onFormChange}
        onRememberChange={onRememberChange}
        onSubmit={onSubmit}
      />
      <LoginFooter />
    </div>
  );
}
