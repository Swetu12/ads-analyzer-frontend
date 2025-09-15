"use client";

import * as React from "react";
import brand1 from "../../../public/brand-logo-1.svg";
import brand2 from "../../../public/brand-logo-2.svg";
import brand3 from "../../../public/brand-logo-3.svg";
import brand4 from "../../../public/brand-logo-4.svg";
import brand5 from "../../../public/brand-logo-5.svg";

import { motion } from "motion/react";

const brands = [brand1, brand2, brand3, brand4, brand5];

import * as variants from "@/lib/motionVariants";

const Brand: React.FC = () => {
  return (
    <section className={"section"}>
      <div className={"container max-w-screen-lg"}>
        <motion.p
          variants={variants.fadeInUp}
          initial={"start"}
          whileInView={"end"}
          viewport={{ once: true }}
          className={"text-center mb-4 md:mb-6"}
        >
          Powering data insight for today's startup and tomorrow's leader
        </motion.p>

        <motion.div
          variants={variants.staggerContainer}
          initial={"start"}
          whileInView={"end"}
          viewport={{ once: true }}
          className={"flex justify-center flex-wrap gap-5 md:gap-10"}
        >
          {brands.map((brand, index) => (
            <motion.figure key={index} variants={variants.fadeInUp}>
              <img src={brand} alt={""} className={"opacity-[0.6]"} />
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Brand;
