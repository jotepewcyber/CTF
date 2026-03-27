"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

interface ContactMethodProps {
  icon: React.ReactNode;
  title: string;
  delay: number;
  children: React.ReactNode;
}

const MethodCard = ({ icon, title, delay, children }: ContactMethodProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/40 transition-all hover:bg-emerald-500/15"
  >
    {icon}
    <h3 className="text-xl font-bold text-emerald-300 mb-4">{title}</h3>
    {children}
  </motion.div>
);

export const ContactMethods = () => {
  return (
    <section className="w-full py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Email */}
          <MethodCard
            icon={<Mail className="w-8 h-8 text-emerald-400 mb-4" />}
            title="Email"
            delay={0.1}
          >
            <div className="space-y-3">
              <div>
                <p className="text-emerald-200/70 text-sm mb-1">General</p>
                <a
                  href="mailto:info@cognitia26.com"
                  className="text-emerald-400 hover:text-emerald-300 break-all text-sm"
                >
                  codingclub@nitm.ac.in
                </a>
              </div>
              <div>
                <p className="text-emerald-200/70 text-sm mb-1">Technical</p>
                <a
                  href="mailto:tech@cognitia26.com"
                  className="text-emerald-400 hover:text-emerald-300 break-all text-sm"
                >
                  b22cs007@nitm.ac.in
                </a>
              </div>
            </div>
          </MethodCard>

          {/* Phone */}
          <MethodCard
            icon={<Phone className="w-8 h-8 text-emerald-400 mb-4" />}
            title="Phone"
            delay={0.2}
          >
            <div className="space-y-3">
              <div>
                <p className="text-emerald-200/70 text-sm mb-1">General</p>
                <a
                  href="tel:+919876543210"
                  className="text-emerald-400 hover:text-emerald-300 text-sm"
                >
                  +91 873205628
                </a>
              </div>
              <div>
                <p className="text-emerald-200/70 text-sm mb-1">Technical</p>
                <a
                  href="tel:+919123456789"
                  className="text-emerald-400 hover:text-emerald-300 text-sm"
                >
                  +91 xxxxxxxx
                </a>
              </div>
            </div>
          </MethodCard>

          {/* Location */}
          <MethodCard
            icon={<MapPin className="w-8 h-8 text-emerald-400 mb-4" />}
            title="Venue"
            delay={0.3}
          >
            <p className="text-emerald-200/80 text-sm leading-relaxed">
              NIT Meghalaya
              <br />
              Sohra, Meghalaya
              <br />
              793108, India
            </p>
          </MethodCard>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/40 transition-all hover:bg-emerald-500/15"
          >
            <h3 className="text-xl font-bold text-emerald-300 mb-4">
              Follow Us
            </h3>
            <div className="flex gap-3 flex-wrap">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-emerald-500/20 hover:bg-emerald-500/40 flex items-center justify-center transition-all text-emerald-400 hover:text-emerald-300 font-bold"
                title="Discord"
              >
                D
              </a>
              <a
                href="https://x.com/ManishP42890265"
                className="w-10 h-10 rounded-full bg-emerald-500/20 hover:bg-emerald-500/40 flex items-center justify-center transition-all text-emerald-400 hover:text-emerald-300 font-bold"
                title="Twitter"
              >
                𝕏
              </a>
              <a
                href="https://www.instagram.com/mnisprsd0201/"
                className="w-10 h-10 rounded-full bg-emerald-500/20 hover:bg-emerald-500/40 flex items-center justify-center transition-all text-emerald-400 hover:text-emerald-300"
                title="Instagram"
              >
                📷
              </a>
              <a
                href="https://www.linkedin.com/in/manish-prasad-gupta-053822258/"
                className="w-10 h-10 rounded-full bg-emerald-500/20 hover:bg-emerald-500/40 flex items-center justify-center transition-all text-emerald-400 hover:text-emerald-300"
                title="LinkedIn"
              >
                💼
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactMethods;
