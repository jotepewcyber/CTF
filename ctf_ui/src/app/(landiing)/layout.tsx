import LandingHeader from "@/components/Header/LandingHeader";
import "../globals.css";
import ReduxProvider from "@/providers/ReduxProvider";
import LandingFooter from "@/components/Footer/LandingFooter";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="w-full min-h-screen ">
        <LandingHeader />
        <ReduxProvider>{children}</ReduxProvider>
        {/* Footer */}
        <LandingFooter />
      </main>
    </>
  );
}
