"use client";

import ReduxProvider from "@/providers/ReduxProvider";
import "@/app/globals.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <div className="relative w-full bg-black text-white">{children}</div>
    </ReduxProvider>
  );
}
