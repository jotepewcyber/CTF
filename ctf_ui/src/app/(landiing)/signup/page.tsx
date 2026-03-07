"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { signupThunk } from "@/store/features/Auth/authThunks";
import { SignupForm } from "@/types/auth";

const initialForm: SignupForm = {
  username: "",
  email: "",
  password: "",
  first_name: "",
  last_name: "",
  avatar_url: "",
  course: "",
  branch: "",
  year: "",
  role: "user",
};
const courses = [
  { value: "btech", label: "BTech" },
  { value: "mca", label: "MCA" },
  { value: "mtech", label: "MTech" },
];

const roles = [
  { value: "user", label: "User" },
  { value: "admin", label: "Admin" },
];

export default function SignupPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector((state: RootState) => state.auth);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.username) newErrors.username = "Username is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";
    if (!form.first_name) newErrors.first_name = "First name is required";
    if (!form.last_name) newErrors.last_name = "Last name is required";
    // Add further as needed
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentErrors = validate();
    setErrors(currentErrors);

    if (Object.keys(currentErrors).length !== 0) {
      // Touch all fields with errors for immediate feedback
      setTouched({
        ...touched,
        ...Object.keys(currentErrors).reduce(
          (acc, field) => ({ ...acc, [field]: true }),
          {},
        ),
      });
      return;
    }

    // Prepare the payload—remove empty optional fields
    let payload = { ...form };
    if (!form.avatar_url) delete payload.avatar_url;
    if (!form.course) delete payload.course;
    if (!form.branch) delete payload.branch;
    if (!form.year) delete payload.year;
    if (!form.role) delete payload.role;

    const result = await dispatch(signupThunk(payload));
    // @ts-ignore
    if (result?.meta?.requestStatus === "fulfilled") {
      router.push("/login");
    }
    // Errors are handled by Redux (see error display below)
  };

  return (
    <main
      style={{
        maxWidth: 440,
        margin: "40px auto",
        padding: 30,
        background: "#fff",
        borderRadius: 6,
        boxShadow: "0 0 12px #0002",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: 16 }}>Sign Up</h1>
      <form onSubmit={handleSubmit} autoComplete="off">
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          onBlur={handleChange}
          autoComplete="username"
        />
        {touched.username && errors.username && (
          <div style={{ color: "red" }}>{errors.username}</div>
        )}

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          onBlur={handleChange}
          autoComplete="email"
        />
        {touched.email && errors.email && (
          <div style={{ color: "red" }}>{errors.email}</div>
        )}

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          onBlur={handleChange}
          autoComplete="new-password"
        />
        {touched.password && errors.password && (
          <div style={{ color: "red" }}>{errors.password}</div>
        )}

        <input
          name="first_name"
          placeholder="First Name"
          value={form.first_name}
          onChange={handleChange}
          onBlur={handleChange}
        />
        {touched.first_name && errors.first_name && (
          <div style={{ color: "red" }}>{errors.first_name}</div>
        )}

        <input
          name="last_name"
          placeholder="Last Name"
          value={form.last_name}
          onChange={handleChange}
          onBlur={handleChange}
        />
        {touched.last_name && errors.last_name && (
          <div style={{ color: "red" }}>{errors.last_name}</div>
        )}

        <input
          name="avatar_url"
          placeholder="Avatar URL (optional)"
          value={form.avatar_url}
          onChange={handleChange}
        />

        <select name="course" value={form.course} onChange={handleChange}>
          <option value="">Select Course</option>
          {courses.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>

        <input
          name="branch"
          placeholder="Branch"
          value={form.branch}
          onChange={handleChange}
        />

        <input
          name="year"
          type="number"
          placeholder="Year (e.g. 1)"
          value={form.year}
          onChange={handleChange}
          min="1"
        />

        <select name="role" value={form.role} onChange={handleChange}>
          {roles.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>

        {error && (
          <div style={{ color: "red", marginTop: 10 }}>
            {typeof error === "object" ? JSON.stringify(error) : error}
          </div>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          style={{
            width: "100%",
            marginTop: 18,
            padding: "10px 0",
            fontWeight: "bold",
            background: status === "loading" ? "#2a2" : "#262",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            fontSize: 17,
            cursor: status === "loading" ? "not-allowed" : "pointer",
          }}
        >
          {status === "loading" ? "Signing Up..." : "Sign Up"}
        </button>
        <div style={{ marginTop: 16, textAlign: "center" }}>
          Already have an account? <a href="/login">Login</a>
        </div>
      </form>
      <style jsx>{`
        input,
        select {
          display: block;
          width: 100%;
          margin: 8px 0;
          padding: 10px 7px;
          font-size: 17px;
          border: 1px solid #aaa;
          border-radius: 4px;
        }
        input:focus,
        select:focus {
          outline: 2px solid #7ec0ee;
        }
      `}</style>
    </main>
  );
}
