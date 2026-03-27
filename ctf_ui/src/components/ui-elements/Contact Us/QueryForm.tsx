"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  category: string;
  subject: string;
  message: string;
}

export const QueryForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    category: "General Query",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate form
      if (
        !formData.name ||
        !formData.email ||
        !formData.subject ||
        !formData.message
      ) {
        setError("Please fill in all required fields");
        setLoading(false);
        return;
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Form submitted:", formData);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        category: "General Query",
        subject: "",
        message: "",
      });

      // Reset success message after 4 seconds
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full py-20">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-black mb-2 text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-300">
            Submit Your Query
          </h2>
          <p className="text-emerald-200/80 mb-8">
            Fill out the form below and we'll get back to you as soon as
            possible
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Success Message */}
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-4 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center gap-2"
              >
                <span className="text-2xl">✓</span>
                <p className="text-emerald-300 font-semibold">
                  Thank you for reaching out! We'll get back to you soon.
                </p>
              </motion.div>
            )}

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-4 rounded-lg bg-red-500/20 border border-red-500/40"
              >
                <p className="text-red-300 font-semibold">{error}</p>
              </motion.div>
            )}

            {/* Name Field */}
            <div>
              <label className="block text-emerald-300 font-semibold mb-2">
                Your Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-emerald-500/30 text-white placeholder-emerald-200/40 focus:outline-none focus:border-emerald-400 focus:bg-black/70 transition-all"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-emerald-300 font-semibold mb-2">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-emerald-500/30 text-white placeholder-emerald-200/40 focus:outline-none focus:border-emerald-400 focus:bg-black/70 transition-all"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="block text-emerald-300 font-semibold mb-2">
                Query Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-emerald-500/30 text-white focus:outline-none focus:border-emerald-400 focus:bg-black/70 transition-all"
              >
                <option>General Query</option>
                <option>Technical Issue</option>
                <option>Registration Help</option>
                <option>Prize & Rules</option>
                <option>Other</option>
              </select>
            </div>

            {/* Subject Field */}
            <div>
              <label className="block text-emerald-300 font-semibold mb-2">
                Subject <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-emerald-500/30 text-white placeholder-emerald-200/40 focus:outline-none focus:border-emerald-400 focus:bg-black/70 transition-all"
                placeholder="What is your query about?"
              />
            </div>

            {/* Message Field */}
            <div>
              <label className="block text-emerald-300 font-semibold mb-2">
                Message <span className="text-red-400">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-emerald-500/30 text-white placeholder-emerald-200/40 focus:outline-none focus:border-emerald-400 focus:bg-black/70 transition-all resize-none"
                placeholder="Tell us more about your query..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 bg-linear-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Query
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default QueryForm;
