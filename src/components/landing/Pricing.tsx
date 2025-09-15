"use client";

import * as React from "react";
import { pricingHeroData } from "@/lib/constants/pricing";
import { motion, Variants } from "motion/react";

const heroVariant: Variants = {
  start: {},
  end: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const heroChildVariant: Variants = {
  start: {
    y: 30,
    opacity: 0,
    filter: "blue(5px)",
  },
  end: {
    y: 0,
    opacity: 1,
    filter: "blue(0)",
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const Pricing = () => {
  return (
    <section className={"py-10 md:py-16"}>
      <motion.div
        variants={heroVariant}
        initial={"start"}
        animate={"end"}
        className={"container text-center"}
      >
        <div className={"max-w-screen-md mx-auto"}>
          <motion.p
            variants={heroChildVariant}
            className={
              "text-sm uppercase tracking-wider bg-secondary/50 text-secondary-foreground max-w-max mx-auto px-3 py-1 rounded-full border-t border-blue-500/10 backdrop-blur-3xl mb-6 md:mb-10"
            }
          >
            {pricingHeroData.sectionSubtitle}
          </motion.p>
          <motion.h2
            variants={heroChildVariant}
            className={
              "text-4xl font-semibold !leading-tight mb-4 md:text-5xl md:mb-5 lg:text-6xl"
            }
          >
            {pricingHeroData.sectionTitle}
            <span className={"relative isolate ms-4"}>
              {pricingHeroData.decoTitle}
              <span
                className={
                  "absolute -z-10 top-2 -left-6 -right-4 bottom-0.5 bg-foreground/5 rounded-full px-8 ms-3 border-t border-foreground/20 shadow-[inset_0px_0px_30px_0px] shadow-foreground/20 md:top-3 md:bottom-1 lg:top-4 lg:bottom-2"
                }
              ></span>
            </span>
          </motion.h2>
          <motion.p
            variants={heroChildVariant}
            className={"text-muted-foreground md:text-xl"}
          >
            {pricingHeroData.sectionText}
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
};
export default Pricing;
