"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import * as React from "react";

interface PricingSectionProps {
  title: string;
  price: string;
  features: string[];
  customBgColor: string;
  bgButton: string;
  isYearly?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  customButtonColor:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"; // Restrict to valid button variants
}

export default function PricingCard({
  title,
  price,
  features,
  customBgColor,
  customButtonColor,
  bgButton,
  isYearly,
  onClick,
  isLoading,
}: PricingSectionProps) {
  return (
    <Card
      className={`w-full max-w-sm border border-zinc-800 rounded-2xl bg-gradient-to-b from-[#1e1e1e] to-[#111] text-white shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out ${customBgColor}`}
    >
      <CardHeader className="pb-2 space-y-4">
        <CardTitle className="text-4xl font-bold mt-2">
          {title.toLowerCase().charAt(0).toUpperCase() +
            title.toLowerCase().slice(1)}
        </CardTitle>
        <div>
          <p className="text-6xl font-bold">{price}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 mt-4">
        <div className="flex items-center text-sm gap-3 text-gray-300">
          {features}
        </div>
      </CardContent>
      <CardFooter className="mt-10">
        <Button
          className={`min-w-full ${bgButton}`}
          variant={customButtonColor}
          onClick={onClick}
        >
          {isLoading ? "Processing..." : "BUY NOW"}
        </Button>
      </CardFooter>
    </Card>
  );
}
