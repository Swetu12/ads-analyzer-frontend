"use client";

import * as React from "react";
import { JSX, useCallback, useRef, useState } from "react";

import { frame, motion, useMotionValue } from "motion/react";
import { featureData } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

import * as variants from "@/lib/motionVariants";

const Feature: React.FC = () => {
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
            {featureData.sectionSubtitle}
          </motion.p>

          <motion.h2
            variants={variants.fadeInUp}
            initial={"start"}
            whileInView={"end"}
            viewport={{ once: true }}
            className={"section-title"}
          >
            {featureData.sectionTitle}
          </motion.h2>

          <motion.p
            variants={variants.fadeInUp}
            initial={"start"}
            whileInView={"end"}
            viewport={{ once: true }}
            className={"section-text"}
          >
            {featureData.sectionText}
          </motion.p>
        </div>

        <div className={"grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-6"}>
          {featureData.features.map(
            ({ icon, iconBoxColor, title, desc, imgSrc }, index) => (
              <FeatureCard
                key={index}
                classes={
                  index < 2
                    ? "md:col-span-2 lg:col-span-1 xl:col-span-3"
                    : "xl:col-span-2"
                }
              >
                <>
                  <div className={"p-8"}>
                    <motion.div
                      variants={variants.fadeInUp}
                      className={`w-16 h-16 grid place-items-center rounded-full flex-shrink-0 ${iconBoxColor}`}
                    >
                      {icon}
                    </motion.div>

                    <motion.h3
                      variants={variants.fadeInUp}
                      className={
                        "text-foreground text-xl font-medium mt-4 mb-3"
                      }
                    >
                      {title}
                    </motion.h3>

                    <motion.p
                      variants={variants.fadeInUp}
                      className={"text-muted-foreground line-clamp-2"}
                    >
                      {desc}
                    </motion.p>

                    <motion.div variants={variants.fadeInUp}>
                      <Button variant={"link"} className={"p-0 h-auto mt-3"}>
                        Learn More <ArrowRight />
                      </Button>
                    </motion.div>
                  </div>
                  {imgSrc && (
                    <motion.figure
                      className={"p-6 pt-0"}
                      variants={variants.fadeInUp}
                    >
                      <img src={imgSrc} alt={title} />
                    </motion.figure>
                  )}
                </>
              </FeatureCard>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default Feature;

type FeatureCardType = {
  classes?: string;
  children: JSX.Element;
};

const FeatureCard: React.FC<FeatureCardType> = ({ classes, children }) => {
  const glowRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [showGlow, setShowGlow] = useState<boolean>(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const rect = cardRef.current?.getBoundingClientRect();

      frame.read(() => {
        x.set(event.clientX - Number(rect?.left));
        y.set(event.clientY - Number(rect?.top));
      });
    },
    [x, y],
  );

  return (
    <motion.div
      variants={variants.staggerContainer}
      initial={"start"}
      whileInView={"end"}
      viewport={{ once: true }}
      className={`relative overflow-hidden p-[1px] ring ring-inset ring-zinc-800/50 rounded-[14px] ${classes}`}
    >
      <div
        ref={cardRef}
        onMouseMove={(event) => handleMouseMove(event)}
        onMouseOver={() => setShowGlow(true)}
        onMouseOut={() => setShowGlow(false)}
        className={
          "relative isolate bg-card backdrop-blur-md rounded-xl overflow-hidden"
        }
      >
        {children}
      </div>

      <motion.div
        ref={glowRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: Number(showGlow) }}
        style={{ x, y }}
        className={
          "absolute -top-[150px] -left-[150px] rounded-full -z-10 w-[300px] h-[300px] bg-foreground blur-[50px]"
        }
      ></motion.div>
    </motion.div>
  );
};
