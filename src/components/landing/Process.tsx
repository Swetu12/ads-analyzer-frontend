"use client";

import * as React from "react";

import { motion } from "motion/react";
import * as variants from "@/lib/motionVariants";
import { processData } from "@/lib/constants";

const Process: React.FC = () => {
  return (
    <section className={"section"}>
      <div className={"container"}>
        <div className={"section-head"}>
          <motion.p
            variants={variants.fadeInUp}
            initial={"start"}
            whileInView={"end"}
            viewport={{ once: true }}
            className={"section-subtitle"}
          >
            {processData.sectionSubtitle}
          </motion.p>

          <motion.h2
            variants={variants.fadeInUp}
            initial={"start"}
            whileInView={"end"}
            viewport={{ once: true }}
            className={"section-title"}
          >
            {processData.sectionTitle}
          </motion.h2>

          <motion.p
            variants={variants.fadeInUp}
            initial={"start"}
            whileInView={"end"}
            viewport={{ once: true }}
            className={"section-text"}
          >
            {processData.sectionText}
          </motion.p>
        </div>

        <div className={"grid gap-14 lg:grid-cols-2 lg:items-center"}>
          <div className={"grid gap-7 lg:10"}>
            {processData.list.map(({ icon, text, title }, index) => (
              <motion.div
                key={index}
                className={"flex flex-col gap-4 md:flex-row lg:gap-7"}
                variants={variants.staggerContainer}
                initial={"start"}
                whileInView={"end"}
                viewport={{ once: true }}
              >
                <motion.div
                  className={
                    "w-16 h-16 grid place-items-center rounded-full border border-foreground/5 shrink-0"
                  }
                  variants={variants.fadeInScale}
                >
                  {icon}
                </motion.div>

                <div className={"grid gap-2 md:gap-3"}>
                  <motion.h3
                    className={"text-xl lg:text-2xl"}
                    variants={variants.fadeInLeft}
                  >
                    {title}
                  </motion.h3>

                  <motion.p
                    className={"text-sm text-muted-foreground md:text-base"}
                    variants={variants.fadeInLeft}
                  >
                    {text}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className={"max-lg:-order-1"}>
            <motion.figure
              className={
                "mx-auto bg-primary rounded-3xl max-w-[580px] overflow-hidden p-8 !pb-0"
              }
              variants={variants.fadeInUp}
              initial={"start"}
              whileInView={"end"}
              viewport={{ once: true }}
            >
              <img
                src={`/process-banner.png`}
                alt={""}
                width={500}
                height={528}
                className={"w-full h-full object-contain object-bottom"}
              />
            </motion.figure>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
