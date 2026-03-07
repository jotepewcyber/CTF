"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { loginThunk } from "@/store/features/Auth/authThunks";

const initialForm = {
  username: "",
  password: "",
};

export default function LoginPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { status, error } = useSelector((state: RootState) => state.auth);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    const newErrors: typeof errors = {};
    if (!form.username) newErrors.username = "Username is required";
    if (!form.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentErrors = validate();
    setErrors(currentErrors);

    if (Object.keys(currentErrors).length > 0) {
      setTouched({
        ...touched,
        ...Object.keys(currentErrors).reduce(
          (acc, field) => ({ ...acc, [field]: true }),
          {},
        ),
      });
      return;
    }

    const result = await dispatch(loginThunk(form));
    // @ts-ignore
    if (result?.meta?.requestStatus === "fulfilled") {
      router.push("/dashboard");
    }
    // Error handled by Redux state
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
      <h1 style={{ textAlign: "center", marginBottom: 16 }}>Login</h1>
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
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          onBlur={handleChange}
          autoComplete="current-password"
        />
        {touched.password && errors.password && (
          <div style={{ color: "red" }}>{errors.password}</div>
        )}

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
          {status === "loading" ? "Logging in..." : "Login"}
        </button>
        <div style={{ marginTop: 16, textAlign: "center" }}>
          Don't have an account? <a href="/signup">Sign up</a>
        </div>
      </form>
      <style jsx>{`
        input {
          display: block;
          width: 100%;
          margin: 8px 0;
          padding: 10px 7px;
          font-size: 17px;
          border: 1px solid #aaa;
          border-radius: 4px;
        }
        input:focus {
          outline: 2px solid #7ec0ee;
        }
      `}</style>
    </main>
  );
}
