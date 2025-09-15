"use client";

import * as React from "react";

import { motion } from "motion/react";
import * as variants from "@/lib/motionVariants";
import { overviewData } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import ReactPlayer from "react-player";

const Overview: React.FC = () => {
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
            {overviewData.sectionSubtitle}
          </motion.p>

          <motion.h2
            variants={variants.fadeInUp}
            initial={"start"}
            whileInView={"end"}
            viewport={{ once: true }}
            className={"section-title"}
          >
            {overviewData.sectionTitle}
          </motion.h2>

          <motion.p
            variants={variants.fadeInUp}
            initial={"start"}
            whileInView={"end"}
            viewport={{ once: true }}
            className={"section-text"}
          >
            {overviewData.sectionText}
          </motion.p>
        </div>

        <div>
          <motion.div
            className={"relative max-w-4xl mx-auto shadow-xl"}
            variants={variants.fadeInScale}
            initial={"start"}
            whileInView={"end"}
            viewport={{ once: true }}
          >
            <figure>
              <img
                src={`overview-banner.png`}
                width={900}
                height={601}
                alt={""}
              />
            </figure>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant={"secondary"}
                  size={"icon"}
                  className={
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150"
                  }
                >
                  <div className={"sr-only"}>Play Video</div>
                  <Play fill={"#fff"} size={50} />
                </Button>
              </DialogTrigger>

              <DialogContent
                className={
                  "p-0 overflow-hidden max-w-[640px] xl:max-w-[1000px ]"
                }
              >
                <AspectRatio ratio={16 / 9}>
                  <ReactPlayer
                    url={"https://youtu.be/cvd2XGJgLg"}
                    style={{
                      minWidth: "100%",
                      maxWidth: "100%",
                      minHeight: "100%",
                      maxHeight: "100%",
                    }}
                  />
                </AspectRatio>
              </DialogContent>
            </Dialog>
          </motion.div>

          <div
            className={
              "max-w-4xl mx-auto grid grid-cols-1 gap-5 mt-8 md:mt-16 xl:grid-cols-[3fr,2.5fr] xl:items-center"
            }
          >
            <motion.p
              className={
                "section-title text-center lg:max-w-[30ch] lg:mx-auto xl:text-left"
              }
              variants={variants.fadeInLeft}
              initial={"start"}
              whileInView={"end"}
              viewport={{ once: true }}
            >
              {overviewData.listTitle}
            </motion.p>

            <motion.div
              className={
                "flex flex-wrap justify-center gap-5 md:gap-10 xl:gap-8"
              }
              variants={variants.fadeInLeft}
              initial={"start"}
              whileInView={"end"}
            >
              {overviewData.list.map(({ title, text }, index) => (
                <motion.div
                  key={index}
                  className={"text-center"}
                  variants={variants.fadeInRight}
                >
                  <h3 className={"text-3xl"}>{title}</h3>
                  <p className={"text-muted-foreground"}>{text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
