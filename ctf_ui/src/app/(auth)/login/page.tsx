"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { loginThunk } from "@/store/features/Auth/authThunks";
import LoginPage from "@/components/Login/gaming-login";
import LoginCard from "@/components/Login/LoginCard";

const initialForm = {
  username: "",
  password: "",
};

export default function LoginPageComponent() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [remember, setRemember] = useState(false);
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

  const validate = (): { [key: string]: string } => {
    const newErrors: { [key: string]: string } = {};
    if (!form.username) {
      newErrors.username = "Username is required";
    }
    if (!form.password) {
      newErrors.password = "Password is required";
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

    const result = await dispatch(
      loginThunk({
        username: form.username,
        password: form.password,
      }),
    );

    // @ts-ignore
    if (result?.meta?.requestStatus === "fulfilled") {
      if (remember) {
        localStorage.setItem("rememberMe", "true");
        localStorage.setItem("savedUsername", form.username);
      } else {
        localStorage.removeItem("rememberMe");
        localStorage.removeItem("savedUsername");
      }
      router.push("/dashboard");
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center px-4 py-12">
      <LoginPage.VideoBackground videoUrl="https://videos.pexels.com/video-files/8128311/8128311-uhd_2560_1440_25fps.mp4" />

      <div className="relative z-20 w-full max-w-md animate-fadeIn">
        <LoginCard
          form={form}
          errors={errors}
          touched={touched}
          remember={remember}
          status={status}
          error={error}
          onFormChange={handleChange}
          onRememberChange={setRemember}
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
