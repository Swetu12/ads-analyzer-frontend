import React from "react";
import { BarChart3, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Campaign } from "../data/mockData";
import { Card } from "@/components/ui/card";

interface PerformanceBreakdownSectionProps {
  campaign: Campaign;
}

export function PerformanceBreakdownSection({
  campaign,
}: PerformanceBreakdownSectionProps) {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-[#2C82A8]" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-400" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-[#2C82A8]";
      case "down":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <Card className="bg-[#1B2028]/50 border border-[#2C82A8]/40 rounded-2xl shadow-lg">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-6">
          <BarChart3 className="w-5 h-5 text-[#3893BB]" />
          <h3 className="text-lg font-semibold text-white">
            Performance Breakdown
          </h3>
        </div>

        <div className="space-y-4">
          {campaign.performance_breakdown.map((metric, index) => (
            <div
              key={index}
              className="bg-[#1B2028] border border-[#2C82A8]/30 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-white">{metric.metric}</h4>
                <div className="flex items-center space-x-1">
                  {getTrendIcon(metric.trend)}
                  <span
                    className={`text-sm font-medium ${getTrendColor(metric.trend)}`}
                  >
                    {metric.change > 0 ? "+" : ""}
                    {metric.change.toFixed(1)}%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <div>
                    <span className="text-gray-400">Current:</span>
                    <span className="ml-2 text-white font-medium">
                      {metric.metric.includes("Rate") ||
                      metric.metric.includes("CTR")
                        ? `${metric.current.toFixed(1)}%`
                        : metric.current.toFixed(2)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Previous:</span>
                    <span className="ml-2 text-gray-300">
                      {metric.metric.includes("Rate") ||
                      metric.metric.includes("CTR")
                        ? `${metric.previous.toFixed(1)}%`
                        : metric.previous.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-3">
                <div className="w-full bg-[#2C82A820] rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      metric.trend === "up"
                        ? "bg-[#2C82A8]"
                        : metric.trend === "down"
                          ? "bg-red-400"
                          : "bg-gray-400"
                    }`}
                    style={{
                      width: `${Math.min(Math.abs(metric.change) * 2, 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
