"use client";

import React from "react";

interface LoginFormProps {
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

export default function LoginForm({
  form,
  errors,
  touched,
  //   remember,
  status,
  error,
  onFormChange,
  //   onRememberChange,
  onSubmit,
}: LoginFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Username Input */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <svg
            className="w-5 h-5 text-white/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={onFormChange}
          onBlur={onFormChange}
          autoComplete="username"
          className="w-full pl-10 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-purple-500/50 transition-colors"
        />
      </div>
      {touched.username && errors.username && (
        <div className="text-red-400 text-sm flex items-center gap-2">
          <span>⚠️</span> {errors.username}
        </div>
      )}

      {/* Password Input */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <svg
            className="w-5 h-5 text-white/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={onFormChange}
          onBlur={onFormChange}
          autoComplete="current-password"
          className="w-full pl-10 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-purple-500/50 transition-colors"
        />
      </div>
      {touched.password && errors.password && (
        <div className="text-red-400 text-sm flex items-center gap-2">
          <span>⚠️</span> {errors.password}
        </div>
      )}

      {/* Remember Me & Forgot Password */}
      {/* <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="remember-me"
            checked={remember}
            onChange={(e) => onRememberChange(e.target.checked)}
            className="w-4 h-4 rounded cursor-pointer accent-purple-600"
          />
          <label
            htmlFor="remember-me"
            className="text-sm text-white/80 cursor-pointer hover:text-white transition-colors"
          >
            Remember me
          </label>
        </div>
        <a
          href="/forgot-password"
          className="text-sm text-white/80 hover:text-white transition-colors"
        >
          Forgot password?
        </a>
      </div> */}

      {/* Error Message */}
      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
          <p className="text-red-300 text-sm font-medium flex items-start gap-2">
            <span>❌</span>
            <span>
              {typeof error === "object" ? JSON.stringify(error) : error}
            </span>
          </p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === "loading"}
        className={`w-full py-3 rounded-lg ${
          status === "loading"
            ? "bg-purple-600/50 cursor-not-allowed"
            : "bg-purple-600 hover:bg-purple-700"
        } text-white font-medium transition-all duration-200 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 disabled:opacity-70 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40`}
      >
        {status === "loading" ? (
          <span className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Accessing CTF Arena...
          </span>
        ) : (
          "Enter CTF Arena"
        )}
      </button>
    </form>
  );
}
