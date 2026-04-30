"use client";

import { useEffect } from "react";
import Galaxy from "@/components/ui-elements/Galaxy";
import AboutUs from "./Sections/AboutUs";
import ContactUs from "./Sections/ContactUs";
import { Hero } from "./Sections/Hero";
import Results from "./Sections/Results";

const LandingPage = () => {
  useEffect(() => {
    // Prevent body scroll on Galaxy
    document.body.style.overflow = "auto";
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-hidden -mt-20">
      {/* Galaxy Background - Fixed Once */}
      <div className="fixed inset-0 z-0 w-screen h-screen pointer-events-none">
        <Galaxy
          mouseRepulsion
          mouseInteraction
          density={1}
          glowIntensity={0.3}
          saturation={0}
          hueShift={140}
          twinkleIntensity={0.3}
          rotationSpeed={0.1}
          repulsionStrength={2}
          autoCenterRepulsion={0}
          starSpeed={0.5}
          speed={1}
        />
      </div>

      {/* Dark Overlay - Optional, adjust opacity as needed */}
      <div className="fixed inset-0 z-5 bg-black/30 pointer-events-none" />

      {/* Content Wrapper - Relative, floats on top */}
      <div className="relative z-10 w-full">
        {/* Hero Section */}
        <section id="hero" className="relative w-full pt-20 md:pt-0">
          <Hero />
        </section>

        {/* About Us Section */}
        <section id="aboutus" className="relative w-full py-20">
          <AboutUs />
        </section>

        {/* Contact Us Section */}
        <section id="contactus" className="relative w-full py-20">
          <ContactUs />
        </section>

        {/* Results Section */}
        <section id="results" className="relative w-full py-20">
          <Results />
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
