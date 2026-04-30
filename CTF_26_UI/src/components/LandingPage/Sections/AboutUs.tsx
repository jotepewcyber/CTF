"use client";

import CircularTestimonials from "@/components/ui-elements/About Us/CircularTestimonials";

const testimonials = [
  {
    quote:
      "Every challenge is a step forward. Push your limits, think deeper, and unlock your true potential.",
    name: "Manish Prasad Gupta",
    designation: "Head",
    src: "https://res.cloudinary.com/mnisprsd/image/upload/v1775589001/pic_efogez.jpg",
  },
  {
    quote: "The quieter you become, the more you are able to hear !!",
    name: "Arunoday Tiwari",
    designation: "Co-ordinator",
    src: "https://res.cloudinary.com/mnisprsd/image/upload/v1775664176/arunoday_pmdfm7.jpg",
  },
  {
    quote: "Compile curiosity, debug complexity, and deploy ideas.",
    name: "Austin joel",
    designation: "Co-ordinator",
    src: "https://res.cloudinary.com/mnisprsd/image/upload/v1775674228/AUSTIN_y91enx.jpg",
  },
];

export const AboutUs = () => (
  <>
    <section id="aboutus">
      <div className="w-full relative">
        {/* Overlay heading */}
        <div className="w-full py-20 flex flex-col items-center justify-center pointer-events-none mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-8 text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-300">
            Network & Security Team
          </h2>
          <p className="text-emerald-200/80 text-center max-w-2xl">
            Cognitia'26: Where NIT Meghalaya's finest compete in the ultimate
            cybersecurity challenge
          </p>
        </div>

        {/* Testimonials section */}
        <div className="w-full py-20">
          <div className="flex flex-wrap gap-6 items-center justify-center relative">
            <div
              className="items-center justify-center relative flex"
              style={{ maxWidth: "1456px" }}
            >
              <CircularTestimonials
                testimonials={testimonials}
                autoplay={true}
                colors={{
                  name: "#f7f7ff",
                  designation: "#e1e1e1",
                  testimony: "#f1f1f7",
                  arrowBackground: "#0582CA",
                  arrowForeground: "#141414",
                  arrowHoverBackground: "#f7f7ff",
                }}
                fontSizes={{
                  name: "28px",
                  designation: "20px",
                  quote: "20px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default AboutUs;
