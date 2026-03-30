import type { Metadata } from "next";
import ReduxProvider from "@/providers/ReduxProvider";
import "./globals.css";
import { ToastProvider } from "@/components/ui-elements/toast";
import SplashCursor from "@/components/ui-elements/SplashCursor";
import AuthProvider from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "Cognitia'26 - CTF Platform",
  description: "Cybersecurity Capture The Flag Competition Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black">
        <ReduxProvider>
          <AuthProvider>
            <SplashCursor />
            <ToastProvider>{children}</ToastProvider>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
