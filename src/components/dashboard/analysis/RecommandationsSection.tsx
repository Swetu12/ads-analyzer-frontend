import React from "react";
import { Target, Cpu } from "lucide-react";
import { Campaign } from "../data/mockData";
import { Card } from "@/components/ui/card";

interface RecommendationsSectionProps {
  campaign: Campaign;
}

export function RecommendationsSection({
  campaign,
}: RecommendationsSectionProps) {
  return (
    <div className="space-y-6">
      {/* Basic Recommendations */}
      <Card className="bg-[#1B2028]/50 border border-[#2C82A8]/40 rounded-2xl shadow-lg">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Target className="w-5 h-5 text-[#2C82A8]" />
            <h3 className="text-lg font-semibold text-white">
              Recommendations
            </h3>
          </div>

          <div className="space-y-4">
            {campaign.recommendations.map((item, index) => (
              <div
                key={index}
                className="bg-[#2C82A820] border border-[#2C82A840] rounded-lg p-4"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#2C82A8] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Advanced Recommendations */}
      <Card className="bg-[#1B2028]/50 border border-[#2C82A8]/40 rounded-2xl shadow-lg">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Cpu className="w-5 h-5 text-[#3893BB]" />
            <h3 className="text-lg font-semibold text-white">
              Advanced Recommendations
            </h3>
          </div>

          <div className="space-y-4">
            {campaign.advanced_recommendations.map((item, index) => (
              <div
                key={index}
                className="bg-[#3893BB20] border border-[#3893BB40] rounded-lg p-4"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#3893BB] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Cpu className="w-3 h-3 text-white" />
                  </div>
                  <p className="text-gray-300 text-sm">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
