import LandingHeader from "@/components/Header/LandingHeader";
import "../globals.css";
import LandingFooter from "@/components/Footer/LandingFooter";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LandingHeader />
      <div className="relative w-full bg-black text-white">{children}</div>
      <LandingFooter />
    </>
  );
}
