"use client";

import React from "react";
import { SignupForm } from "@/types/auth";

interface SignupFormFieldsProps {
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
}

export default function SignupFormFields({
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
}: SignupFormFieldsProps) {
  return (
    <>
      {/* Row 1: Username & Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
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
            <div className="text-red-400 text-xs mt-1 flex items-center gap-1">
              <span>⚠️</span> {errors.username}
            </div>
          )}
        </div>

        <div>
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={onFormChange}
              onBlur={onFormChange}
              autoComplete="email"
              className="w-full pl-10 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>
          {touched.email && errors.email && (
            <div className="text-red-400 text-xs mt-1 flex items-center gap-1">
              <span>⚠️</span> {errors.email}
            </div>
          )}
        </div>
      </div>

      {/* Row 2: First Name & Last Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            name="first_name"
            type="text"
            placeholder="First Name"
            value={form.first_name}
            onChange={onFormChange}
            onBlur={onFormChange}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-purple-500/50 transition-colors"
          />
          {touched.first_name && errors.first_name && (
            <div className="text-red-400 text-xs mt-1 flex items-center gap-1">
              <span>⚠️</span> {errors.first_name}
            </div>
          )}
        </div>

        <div>
          <input
            name="last_name"
            type="text"
            placeholder="Last Name"
            value={form.last_name}
            onChange={onFormChange}
            onBlur={onFormChange}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-purple-500/50 transition-colors"
          />
          {touched.last_name && errors.last_name && (
            <div className="text-red-400 text-xs mt-1 flex items-center gap-1">
              <span>⚠️</span> {errors.last_name}
            </div>
          )}
        </div>
      </div>

      {/* Row 3: Password */}
      <div>
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
            type={showPassword ? "text" : "password"}
            placeholder="Password (min 6 characters)"
            value={form.password}
            onChange={onFormChange}
            onBlur={onFormChange}
            autoComplete="new-password"
            className="w-full pl-10 pr-10 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-purple-500/50 transition-colors"
          />
          <button
            type="button"
            onClick={onShowPasswordToggle}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
          >
            {showPassword ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        </div>
        {touched.password && errors.password && (
          <div className="text-red-400 text-xs mt-1 flex items-center gap-1">
            <span>⚠️</span> {errors.password}
          </div>
        )}
      </div>

      {/* Row 4: Course & Branch */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <select
            name="course"
            value={form.course}
            onChange={onFormChange}
            className="w-full px-3 py-2 bg-slate-800 border border-purple-500/50 rounded-lg text-white font-medium focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23fff' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.5rem center",
              backgroundSize: "1.5em 1.5em",
              paddingRight: "2.5rem",
            }}
          >
            <option value="" className="bg-slate-800 text-white font-medium">
              Select Course
            </option>
            {courses.map((c) => (
              <option
                key={c.value}
                value={c.value}
                className="bg-slate-800 text-white font-medium"
              >
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            name="branch"
            value={form.branch}
            onChange={onFormChange}
            className="w-full px-3 py-2 bg-slate-800 border border-purple-500/50 rounded-lg text-white font-medium focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23fff' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.5rem center",
              backgroundSize: "1.5em 1.5em",
              paddingRight: "2.5rem",
            }}
          >
            <option value="" className="bg-slate-800 text-white font-medium">
              Select Branch
            </option>
            {branches.map((b) => (
              <option
                key={b.value}
                value={b.value}
                className="bg-slate-800 text-white font-medium"
              >
                {b.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 5: Year & Avatar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            name="year"
            type="number"
            placeholder="Year (1-4)"
            value={form.year}
            onChange={onFormChange}
            min="1"
            max="4"
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-purple-500/50 transition-colors"
          />
        </div>

        <div>
          <input
            name="avatar_url"
            type="url"
            placeholder="Avatar URL (optional)"
            value={form.avatar_url}
            onChange={onFormChange}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-purple-500/50 transition-colors"
          />
        </div>
      </div>

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
        className={`w-full py-3 rounded-lg mt-6 ${
          status === "loading"
            ? "bg-purple-600/50 cursor-not-allowed"
            : "bg-purple-600 hover:bg-purple-700"
        } text-white font-medium transition-all duration-200 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 disabled:opacity-70 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40`}
      >
        {status === "loading" ? (
          <span className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Creating Account...
          </span>
        ) : (
          "Join CTF Arena"
        )}
      </button>

      {/* Global select styling */}
      <style jsx>{`
        select {
          color-scheme: dark;
        }
        select option {
          background-color: #1e293b;
          color: #ffffff;
          padding: 10px;
          font-weight: 500;
        }
        select option:hover {
          background-color: #334155;
          color: #ffffff;
        }
        select option:checked {
          background: linear-gradient(#a855f7, #a855f7);
          background-color: #a855f7;
          color: #ffffff;
        }
      `}</style>
    </>
  );
}
