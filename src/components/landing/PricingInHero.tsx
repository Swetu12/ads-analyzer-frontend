// @ts-nocheck
/* eslint-disable */

"use client";

import React, { useState } from "react";
import ReactLenis from "lenis/react";
import PricingSection from "@/components/landing/PricingSection.tsx";
import { motion, Variants } from "framer-motion";
import { pricingData, pricingDataAnually } from "@/lib/constants/pricing";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useUserStore } from "@/lib/stores/global/UserStore.ts";
import { toast, Toaster } from "sonner";

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
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useUserStore();

  const handleCheckOut = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/checkout_sessions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: user?.id }),
      });

      const data = await response.json();

      if (!user) {
        toast.error("User not authenticated");
        setLoading(false);
        return;
      } else if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error("No URL returned from the server");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error during checkout:", error);
      setLoading(false);
    }
  };

  return (
    <ReactLenis root={true}>
      <div className="relative isolate overflow-hidden">
        <Toaster position={`top-center`} richColors />
        <main variants={heroVariant} initial="start" animate="end">
          <Tabs defaultValue="monthly">
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
                      onClick={handleCheckOut}
                      isLoading={loading}
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
