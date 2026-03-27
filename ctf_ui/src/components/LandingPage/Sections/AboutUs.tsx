"use client";

import CircularTestimonials from "@/components/ui-elements/About Us/CircularTestimonials";

const testimonials = [
  {
    quote:
      "I was impressed by the food! And I could really tell that they use high-quality ingredients. The staff was friendly and attentive. I'll definitely be back for more!",
    name: "Manish Prasad Gupta",
    designation: "Head",
    src: "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "This place exceeded all expectations! The atmosphere is inviting, and the staff truly goes above and beyond. I'll keep returning for more exceptional dining experience.",
    name: "Arunoday Tiwari",
    designation: "Co-ordinator",
    src: "https://images.unsplash.com/photo-1628749528992-f5702133b686?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
  },
  {
    quote:
      "Shining Yam is a hidden gem! The impeccable service and overall attention to detail created a memorable experience. I highly recommend it!",
    name: "Austin joel",
    designation: "Co-ordinator",
    src: "https://images.unsplash.com/photo-1524267213992-b76e8577d046?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
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
