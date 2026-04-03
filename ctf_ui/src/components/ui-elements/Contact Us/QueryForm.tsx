"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader, Star } from "lucide-react";
import emailjs from "@emailjs/browser";

interface FeedbackFormData {
  name: string;
  email: string;
  feedbackType: string;
  websiteRating: number;
  competitionRating: number;
  satisfaction: string;
  enjoyed: boolean;
  subject: string;
  message: string;
}

export const FeedbackForm = () => {
  const [formData, setFormData] = useState<FeedbackFormData>({
    name: "",
    email: "",
    feedbackType: "General Feedback",
    websiteRating: 0,
    competitionRating: 0,
    satisfaction: "satisfied",
    enjoyed: true,
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Initialize EmailJS (do this once when component mounts)
  React.useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "");
  }, []);

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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleRating = (
    field: "websiteRating" | "competitionRating",
    value: number,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const StarRating = ({
    field,
    label,
    value,
  }: {
    field: "websiteRating" | "competitionRating";
    label: string;
    value: number;
  }) => (
    <div>
      <label className="block text-emerald-300 font-semibold mb-3">
        {label}
      </label>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRating(field, star)}
            disabled={loading}
            className="transition-all hover:scale-110"
          >
            <Star
              size={32}
              className={`${
                star <= value
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-400"
              } transition-all cursor-pointer hover:text-yellow-300`}
            />
          </button>
        ))}
      </div>
      <p className="text-emerald-200/60 text-sm mt-2">
        {value > 0 ? `Rating: ${value}/5` : "Click to rate"}
      </p>
    </div>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

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

      if (formData.websiteRating === 0 || formData.competitionRating === 0) {
        setError("Please rate both the website and competition");
        setLoading(false);
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError("Please enter a valid email address");
        setLoading(false);
        return;
      }

      // Send email via EmailJS
      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        {
          from_name: formData.name,
          from_email: formData.email,
          feedback_type: formData.feedbackType,
          website_rating: `${formData.websiteRating}/5`,
          competition_rating: `${formData.competitionRating}/5`,
          satisfaction: formData.satisfaction,
          enjoyed: formData.enjoyed ? "Yes, I enjoyed it!" : "Not as much",
          subject: formData.subject,
          message: formData.message,
          to_email: process.env.NEXT_PUBLIC_FEEDBACK_EMAIL || "",
        },
      );

      if (response.status === 200) {
        console.log("Feedback sent successfully:", response);
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          feedbackType: "General Feedback",
          websiteRating: 0,
          competitionRating: 0,
          satisfaction: "satisfied",
          enjoyed: true,
          subject: "",
          message: "",
        });

        // Reset success message after 4 seconds
        setTimeout(() => setSubmitted(false), 4000);
      }
    } catch (err) {
      console.error("Error submitting feedback:", err);
      setError(
        "Failed to submit feedback. Please try again or contact support.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full py-20 bg-linear-to-b from-black to-black/50">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-black mb-2 text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-300">
            Share Your Feedback
          </h2>
          <p className="text-emerald-200/80 mb-8">
            We'd love to hear your thoughts and suggestions to improve our
            platform and competition
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
                  Thank you for your feedback! We appreciate your input.
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
                disabled={loading}
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
                disabled={loading}
              />
            </div>

            {/* Feedback Type Dropdown */}
            <div>
              <label className="block text-emerald-300 font-semibold mb-2">
                Feedback Type
              </label>
              <select
                name="feedbackType"
                value={formData.feedbackType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-emerald-500/30 text-white focus:outline-none focus:border-emerald-400 focus:bg-black/70 transition-all"
                disabled={loading}
              >
                <option>General Feedback</option>
                <option>Positive Feedback</option>
                <option>Bug Report</option>
                <option>Feature Request</option>
                <option>UI/UX Suggestion</option>
                <option>Performance Issue</option>
                <option>Other</option>
              </select>
            </div>

            {/* Website Rating */}
            <StarRating
              field="websiteRating"
              label="How would you rate our website? ⭐"
              value={formData.websiteRating}
            />

            {/* Competition Rating */}
            <StarRating
              field="competitionRating"
              label="How would you rate the competition? ⭐"
              value={formData.competitionRating}
            />

            {/* Satisfaction Level */}
            <div>
              <label className="block text-emerald-300 font-semibold mb-3">
                Overall Satisfaction
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {["very_satisfied", "satisfied", "neutral"].map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-3 p-3 rounded-lg border border-emerald-500/30 bg-black/50 cursor-pointer hover:border-emerald-400 transition-all"
                  >
                    <input
                      type="radio"
                      name="satisfaction"
                      value={option}
                      checked={formData.satisfaction === option}
                      onChange={handleInputChange}
                      disabled={loading}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <span className="text-emerald-300 font-medium capitalize">
                      {option.replace("_", " ")}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Enjoyed Checkbox */}
            <div className="flex items-center gap-3 p-4 rounded-lg border border-emerald-500/30 bg-black/50">
              <input
                type="checkbox"
                name="enjoyed"
                checked={formData.enjoyed}
                onChange={handleCheckboxChange}
                disabled={loading}
                className="w-5 h-5 rounded cursor-pointer accent-emerald-400"
              />
              <label className="text-emerald-300 font-semibold cursor-pointer">
                I enjoyed the website and competition experience
              </label>
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
                placeholder="Brief subject of your feedback"
                disabled={loading}
              />
            </div>

            {/* Message Field */}
            <div>
              <label className="block text-emerald-300 font-semibold mb-2">
                Your Feedback <span className="text-red-400">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-emerald-500/30 text-white placeholder-emerald-200/40 focus:outline-none focus:border-emerald-400 focus:bg-black/70 transition-all resize-none"
                placeholder="Please share your detailed feedback..."
                disabled={loading}
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
                  Send Feedback
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default FeedbackForm;
