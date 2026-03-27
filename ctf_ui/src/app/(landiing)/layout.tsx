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
      <LandingHeader />
      <ReduxProvider>
        <div className="relative w-full bg-black text-white">{children}</div>
      </ReduxProvider>
      <LandingFooter />
    </>
  );
}
