"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { signupThunk } from "@/store/features/Auth/authThunks";
import { SignupForm } from "@/types/auth";
import LoginPage from "@/components/Login/gaming-login";
import SignupCard from "@/components/Signup/SignupCard";

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

const branches = [
  { value: "cse", label: "Computer Science" },
  { value: "ece", label: "Electronics & Communication" },
  { value: "ee", label: "Electrical Engineering" },
  { value: "me", label: "Mechanical Engineering" },
  { value: "ce", label: "Civil Engineering" },
];

export default function SignupPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [showPassword, setShowPassword] = useState(false);
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

  const validate = (): { [key: string]: string } => {
    const newErrors: { [key: string]: string } = {};
    if (!form.username) newErrors.username = "Username is required";
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!form.first_name) newErrors.first_name = "First name is required";
    if (!form.last_name) newErrors.last_name = "Last name is required";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentErrors = validate();
    setErrors(currentErrors);

    if (Object.keys(currentErrors).length !== 0) {
      setTouched({
        ...touched,
        ...Object.keys(currentErrors).reduce(
          (acc, field) => ({ ...acc, [field]: true }),
          {},
        ),
      });
      return;
    }

    let payload = { ...form };
    if (!form.avatar_url) delete payload.avatar_url;
    if (!form.course) delete payload.course;
    if (!form.branch) delete payload.branch;
    if (!form.year) delete payload.year;

    const result = await dispatch(signupThunk(payload));
    // @ts-ignore
    if (result?.meta?.requestStatus === "fulfilled") {
      router.push("/login");
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center px-4 py-12">
      <LoginPage.VideoBackground videoUrl="https://videos.pexels.com/video-files/8128311/8128311-uhd_2560_1440_25fps.mp4" />

      <div className="relative z-20 w-full max-w-2xl animate-fadeIn">
        <SignupCard
          form={form}
          errors={errors}
          touched={touched}
          showPassword={showPassword}
          courses={courses}
          branches={branches}
          status={status}
          error={error}
          onFormChange={handleChange}
          onShowPasswordToggle={() => setShowPassword(!showPassword)}
          onSubmit={handleSubmit}
        />
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 left-0 right-0 text-center text-white/60 text-sm z-20">
        © 2025 CTF Arena. All rights reserved.
      </footer>
    </div>
  );
}
