import { type FC } from "react";
// import FeaturesSection from "./Sections/Features";
// import Link from "next/link";
// import WhyChooseUs from "./Sections/WhyChooseUs";
import { Hero } from "./Sections/Hero";
// import Landing_bg_video from "/nature4edit.mp4"

const LandingPage: FC = () => {
  return (
    <div className="bg-white dark:bg-theme-dark text-theme-text-dark dark:text-theme-text-light min-h-screen relative overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0"
        // src={Landing_bg_video}
        src="/nature4edit.mp4"
      />
      <div className="relative z-10">
        {/* Hero */}
        <section className="">
          <Hero />
        </section>
        <section id="why-choose-us" className="py-16">
          {/* <WhyChooseUs /> */}
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
