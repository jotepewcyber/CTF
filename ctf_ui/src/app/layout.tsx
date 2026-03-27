// app/layout.tsx
import ReduxProvider from "@/providers/ReduxProvider";
import "./globals.css";
import { ToastProvider } from "@/components/ui-elements/toast";
import SplashCursor from "@/components/ui-elements/SplashCursor";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black">
        <ReduxProvider>
          <SplashCursor />
          <ToastProvider>{children}</ToastProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
