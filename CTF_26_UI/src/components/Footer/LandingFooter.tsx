"use client";

import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

export default function LandingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black text-white border-t border-emerald-500/20">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-300">
              Cognitia'26
            </h3>
            <p className="text-emerald-200/70 text-sm leading-relaxed">
              The ultimate cybersecurity competition at NIT Meghalaya. Master
              CTF challenges and compete with the best.
            </p>
            <div className="flex gap-3 pt-4">
              <a
                href="https://x.com/ManishP42890265"
                className="w-10 h-10 rounded-full bg-emerald-500/20 hover:bg-emerald-500/40 flex items-center justify-center transition-all"
                title="Twitter"
                target="_blank"
              >
                <Twitter className="w-5 h-5 text-emerald-400" />
              </a>
              <a
                href="https://www.instagram.com/mnisprsd0201/"
                className="w-10 h-10 rounded-full bg-emerald-500/20 hover:bg-emerald-500/40 flex items-center justify-center transition-all"
                title="Instagram"
                target="_blank"
              >
                <Instagram className="w-5 h-5 text-emerald-400" />
              </a>
              <a
                href="https://www.linkedin.com/in/manish-prasad-gupta-053822258/"
                className="w-10 h-10 rounded-full bg-emerald-500/20 hover:bg-emerald-500/40 flex items-center justify-center transition-all"
                title="LinkedIn"
                target="_blank"
              >
                <Linkedin className="w-5 h-5 text-emerald-400" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-emerald-300 mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-emerald-200/70 hover:text-emerald-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#aboutus"
                  className="text-emerald-200/70 hover:text-emerald-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#results"
                  className="text-emerald-200/70 hover:text-emerald-400 transition-colors"
                >
                  Results
                </Link>
              </li>
              <li>
                <Link
                  href="#contactus"
                  className="text-emerald-200/70 hover:text-emerald-400 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-bold text-emerald-300 mb-6">
              Resources
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-emerald-200/70 hover:text-emerald-400 transition-colors"
                >
                  Rules & Regulations
                </a>
              </li>
              <li>
                <a
                  href="/learn-more"
                  className="text-emerald-200/70 hover:text-emerald-400 transition-colors"
                >
                  Learning References
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-emerald-200/70 hover:text-emerald-400 transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-emerald-300 mb-6">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-emerald-400 mt-1 shrink-0" />
                <div>
                  <p className="text-emerald-200/70 text-sm">Email</p>
                  <a
                    href="mailto:info@cognitia26.com"
                    className="text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    b22cs007@nitm.ac.in
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-emerald-400 mt-1 shrink-0" />
                <div>
                  <p className="text-emerald-200/70 text-sm">Phone</p>
                  <a
                    href="tel:+919876543210"
                    className="text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    +91 8732056328
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-400 mt-1 shrink-0" />
                <div>
                  <p className="text-emerald-200/70 text-sm">Location</p>
                  <p className="text-emerald-400">NIT Meghalaya, Sohra</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-emerald-500/20 my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Side */}
          <div className="text-emerald-200/70 text-sm text-center md:text-left">
            <p>
              © {currentYear} Cognitia'26 | NIT Meghalaya. All rights reserved.
            </p>
            <p className="mt-2">
              Designed & Developed with ❤️ for the cybersecurity community
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
