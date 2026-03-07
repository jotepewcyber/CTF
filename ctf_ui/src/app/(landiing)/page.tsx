import LandingPage from "@/components/LandingPage/LandingPage";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LandingPage />
      <main>{children}</main>
    </>
  );
}
