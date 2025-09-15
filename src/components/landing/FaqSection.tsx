"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion.tsx";
import { faqData } from "@/lib/constants/FaqData";

export function FaqSection() {
  const [activeCategory, setActiveCategory] = useState(faqData[0].category);

  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Everything you need to know about our AI marketing platform
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* FAQ accordion */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-b from-[#1e1e1e] to-[#111] rounded-xl shadow-sm border border-gray-800"
            >
              {faqData
                .find((category) => category.category === activeCategory)
                ?.questions.map((faq, index) => (
                  <Accordion
                    key={index}
                    type="single"
                    collapsible
                    className="w-full"
                  >
                    <AccordionItem
                      value={`item-${index}`}
                      className="border-b border-gray-800"
                    >
                      <AccordionTrigger className="py-5 px-6 text-left hover:no-underline">
                        <span className="text-base md:text-lg font-medium">
                          {faq.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-5 pt-0">
                        <p className="text-gray-400">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
            </motion.div>
          </AnimatePresence>

          {/* Contact support section */}
          <div className="mt-12 text-center bg-gradient-to-b from-[#1e1e1e] to-[#111] p-8 rounded-xl border border-gray-800">
            <h3 className="text-xl font-semibold mb-2">
              Still have questions?
            </h3>
            <p className="text-gray-400 mb-6">
              Can't find the answer you're looking for? Please chat with our
              friendly team.
            </p>
            <button className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
