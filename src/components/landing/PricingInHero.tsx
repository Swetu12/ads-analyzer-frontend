// @ts-nocheck
/* eslint-disable */

"use client";

import React from "react";
import ReactLenis from "lenis/react";
import PricingSection from "@/components/landing/PricingSection.tsx";
import { motion, Variants } from "framer-motion";
import { pricingData, pricingDataAnually } from "@/lib/constants/pricing";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
    filter: "blur(5px)",
  },
  end: {
    y: 0,
    opacity: 1,
    filter: "blur(0)",
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const Page = () => {
  const isYearly = true;
  return (
    <ReactLenis root={true}>
      <div className="relative isolate overflow-hidden">
        <main variants={heroVariant} initial="start" animate="end">
          <Tabs defaultValue="monthly">
            <TabsList className="flex justify-center bg-transparent">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>

            {/* Monthly Tabs Content */}
            <TabsContent value="monthly">
              <motion.div
                variants={heroVariant}
                initial="start"
                animate="end"
                className="flex flex-wrap justify-center gap-4 px-4 mt-6 md:mt-10 max-w-7xl mx-auto"
              >
                {pricingData.map((plan, index) => (
                  <motion.div
                    key={index}
                    variants={heroChildVariant}
                    className="w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(40%-0.66rem)] lg:w-[calc(30%-0.75rem)] xl:w-[calc(25%-0.8rem)]"
                  >
                    <PricingSection
                      {...plan}
                      isYearly={false}
                      bgButton={index === 1 ? "bg-[#1a1a1a]" : "bg-transparent"}
                      customButtonColor={index === 1 ? "outline" : "outline"}
                      customBgColor={index === 1 ? "bg-primary/90" : ""} // Set background color for second card (index === 1)
                    />
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
          <div className={`w-full flex justify-center  mt-10`}>
            <Link href="/pricing">
              <Button>See More</Button>
            </Link>
          </div>
        </main>
      </div>
    </ReactLenis>
  );
};

export default Page;
