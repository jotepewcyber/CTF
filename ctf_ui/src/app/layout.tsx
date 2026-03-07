// app/layout.tsx
import ReduxProvider from "@/providers/ReduxProvider";
import "./globals.css";
import { ToastProvider } from "@/components/ui-elements/toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <ToastProvider>{children}</ToastProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
