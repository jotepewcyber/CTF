"use client";

import { motion } from "framer-motion";

export const ContactHeader = () => {
  return (
    <section className="w-full py-20 md:py-32 pt-32">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-transparent bg-clip-text bg-linear-to-r from-emerald-400 via-teal-300 to-emerald-400">
            Get In Touch
          </h1>
          <p className="text-lg md:text-xl text-emerald-200/80 max-w-3xl mx-auto">
            Have questions or facing any difficulties with Cognitia'26? We're
            here to help! Reach out to us through any of the channels below.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactHeader;
