"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    id: 1,
    question: "How do I register for Cognitia'26?",
    answer:
      "You can register through our website by clicking the 'Register' button on the homepage. Fill in your details, select your team members, and submit. You'll receive a confirmation email with your registration ID.",
  },
  {
    id: 2,
    question: "What are the eligibility criteria?",
    answer:
      "Cognitia'26 is open to all students of NIT Meghalaya, regardless of their year or branch. No prior CTF experience is required. Everyone from freshers to final year students can participate.",
  },
  {
    id: 3,
    question: "Can I participate solo or only in teams?",
    answer:
      "You can participate both solo and in teams. Team size can be 1-4 members. Solo participants will be matched with other participants if they wish, or can compete individually.",
  },
  {
    id: 4,
    question: "What are the prize details?",
    answer:
      "Top 3 teams will receive prizes and certificates. 1st place: ₹10,000, 2nd place: ₹6,000, 3rd place: ₹4,000. All participants will receive certificates of participation.",
  },
  {
    id: 5,
    question: "What if I face technical issues during the competition?",
    answer:
      "Contact our technical team immediately via email (tech@cognitia26.com), phone (+91 91234 56789), or Discord. We have live support during the event to assist you.",
  },
  {
    id: 6,
    question: "Are there any prerequisites or skills required?",
    answer:
      "No specific prerequisites are required. Basic understanding of cybersecurity concepts is helpful but not mandatory. We welcome beginners and will have challenges for all difficulty levels.",
  },
];

export const FAQSection = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="w-full py-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-black mb-2 text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-300">
            Frequently Asked Questions
          </h2>
          <p className="text-emerald-200/80 mb-12">
            Find answers to common questions about Cognitia'26
          </p>

          <div className="space-y-4">
            {faqItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="rounded-lg border border-emerald-500/20 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full px-6 py-4 bg-emerald-500/10 hover:bg-emerald-500/15 transition-all flex items-center justify-between"
                >
                  <h3 className="text-lg font-semibold text-emerald-300 text-left">
                    {item.question}
                  </h3>
                  <motion.div
                    animate={{
                      rotate: expandedId === item.id ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-emerald-400 shrink-0" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {expandedId === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 py-4 bg-black/50 border-t border-emerald-500/20">
                        <p className="text-emerald-200/80 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
