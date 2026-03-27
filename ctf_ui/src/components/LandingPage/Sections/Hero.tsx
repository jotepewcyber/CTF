"use client";

import SplashCursor from "@/components/ui-elements/SplashCursor";

export const Hero = () => {
  return (
    <div className="w-full relative">
      {/* Hero Content - Full Screen Height */}
      <div className="w-full h-screen flex flex-col items-center justify-center text-center px-4 relative">
        <h1 className="text-4xl md:text-6xl font-black mb-4 text-transparent bg-clip-text bg-linear-to-r from-emerald-400 via-teal-300 to-emerald-400 relative z-20">
          CTF Arena
        </h1>
        <p className="text-lg md:text-xl text-emerald-200/80 mb-8 relative z-20">
          Master cybersecurity through real-world Capture The Flag challenges
        </p>
        <button className="px-8 py-3 bg-linear-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-lg shadow-lg hover:shadow-emerald-500/50 transition-all active:scale-95 relative z-20">
          Get Started
        </button>
      </div>

      {/* Splash Cursor */}
      <SplashCursor />
    </div>
  );
};

export default Hero;
